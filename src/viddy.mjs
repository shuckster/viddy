import { match, when, otherwise, anyOf, allOf } from 'match-iz'
import { includes, not, empty, pluck as $ } from 'match-iz'
import { isArray, isNumber, isString, isRegExp, isPojo } from 'match-iz'

import { Identity as Passthru, mapOverObjectValues, memo } from './utils/fp.mjs'
import { ascending } from './utils/sort.mjs'

import {
  allAncestorsOf,
  calculateElementCenter,
  selectorOfElement,
  distanceBetweenEdgesOf,
  elementHasText,
  elementHasTextMatching,
  installChangeListeners,
  isElementVisible,
  isHtmlElement,
  observeMutations,
  qsArray,
  valueOfElement
} from './utils/elements.mjs'

const BODY_WILDCARD = 'body *'
const FORM_TAGS = 'input, select, textarea'
const DEFAULT_WAITFOR_TIMEOUT_IN_SECONDS = 5

// Runtime types
//

const isEmptyArray = allOf(isArray, empty)
const isPattern = anyOf(isString, isRegExp)
const isPatternOrPojo = anyOf(isPattern, isPojo)
const isOptionsWithoutSelectorOrParent = allOf(isPojo, {
  selector: not(isString),
  pickParent: not(isString)
})
const isOptionsWithPatternNotSelector = allOf(isPojo, {
  pattern: isPattern,
  selector: not(isString)
})
const isOptionsWithoutPatternOrSelector = allOf(isPojo, {
  pattern: not(isPattern),
  selector: not(isString)
})

// Serialization helpers
//

const rxSplit = '|<-REGEXP::FLAGS->|'
const isSerializedRegExp = allOf(isString, includes(rxSplit))
const serializeRegExp = rx => [rx.source, rx.flags].join(rxSplit)
const parseSerializedRegExp = str => new RegExp(...str.split(rxSplit))

export const serialize = (...args) =>
  JSON.stringify(args, (_, value) =>
    match(value)(when(isRegExp)(serializeRegExp), otherwise(value))
  )

export const unserialize = str =>
  JSON.parse(str, (_, value) =>
    match(value)(
      when(isSerializedRegExp)(parseSerializedRegExp),
      otherwise(value)
    )
  )

export class ViddyError extends Error {
  constructor(
    fnName,
    args,
    { message = 'could not resolve query to any elements' }
  ) {
    const serializeRegExp = rx => `/${rx.source}/${rx.flags}`
    const replacer = (_, value) =>
      isRegExp(value) ? serializeRegExp(value) : value
    const argMsg = JSON.stringify(args, replacer, 2)
    super(`${message}\n\nviddy.${fnName}(...${argMsg})\n`)
    this.name = 'ViddyError'
  }
}

// Main query/arguments interpreter
//

export { qsArray }

const viddyQuery = (...args) =>
  match(args)(
    when([isPattern])(searchForTextOrPattern),
    when([isPattern, isPojo])(searchWithOptions),
    when([isPojo])(specificSearch),
    otherwise([])
  )

function viddyQuerySelector(selector) {
  return (...args) =>
    match(args)(
      when([isPattern])(([pattern]) =>
        specificSearch([{ selector, near: pattern }])
      ),
      when([isPattern, isOptionsWithoutSelectorOrParent])(([pattern, opts]) =>
        specificSearch([{ ...opts, selector, near: pattern }])
      ),
      when([isOptionsWithPatternNotSelector])(([{ pattern, ...rest }]) =>
        specificSearch([{ ...rest, selector, near: pattern }])
      ),
      when([{ selector: isString }])(([{ selector: userSelector, ...rest }]) =>
        specificSearch([{ ...rest, selector: userSelector }])
      ),
      otherwise([])
    )
}

const viddyQueryInput = viddyQuerySelector(FORM_TAGS)

// Execute queries
//

function searchForTextOrPattern([textOrRegExp]) {
  const byTextContent = match(textOrRegExp)(
    when(isRegExp)(elementHasTextMatching),
    otherwise(elementHasText)
  )

  const all = qsArray(BODY_WILDCARD)
    .filter(isHtmlElement)
    .filter(isElementVisible)
    .filter(byTextContent)

  // Return the deepest result that contains the text/pattern,
  // otherwise we'll always return the document.body
  return all.filter(el => {
    const allWithoutSelf = all.filter(x => x !== el)
    return allWithoutSelf.every(x => !el.contains(x))
  })
}

function searchWithOptions([textOrRegExp, options]) {
  return winnowElements(searchForTextOrPattern([textOrRegExp]), options)
}

function specificSearch([options]) {
  return match(options)(
    when({ selector: isString })(({ selector, ...opts }) =>
      winnowElements(qsArray(selector), opts)
    ),
    when({ pattern: isPattern })(({ pattern, ...opts }) =>
      winnowElements(searchForTextOrPattern([pattern]), opts)
    ),
    otherwise(() => winnowElements(qsArray(BODY_WILDCARD), options))
  )
}

// Parse/interpret containment, nearest, parent
//

const resolveOptions = options => ({
  ...options,
  ...['near', 'above', 'below', 'leftOf', 'rightOf', 'containedBy'].reduce(
    (acc, key) => ({
      ...acc,
      [key]: match(options[key])(
        when(isPatternOrPojo)(viddyQuery),
        when(isArray)(args => viddyQuery(...args)),
        otherwise(null)
      )
    }),
    {}
  )
})

function winnowElements(elements, options = {}) {
  const { near, containedBy, pickParent, ...positionalOptions } =
    resolveOptions(options)

  const hasPositionalOptions = Object.keys(positionalOptions).length > 0
  const getPositionOf = memo(calculateElementCenter)
  const getParentsOf = memo(allAncestorsOf)
  const byDepthsEqualToFirstResult = ({ depth }, _, [$]) => depth === $.depth

  const withContainmentDepths = isArray(containedBy)
    ? containedBy => {
        const lineages = containedBy.map(getParentsOf)
        const withContainerDepth = el => lines =>
          lines
            .map((ctr, depth) => ({ contained: ctr.contains(el), depth, el }))
            .filter(({ contained }) => contained)[0]

        return el => lineages.map(withContainerDepth(el))[0]
      }
    : () => el => ({ depth: 0, el })

  const byRelativePosition = hasPositionalOptions
    ? positionalOptions => {
        const { above, below, leftOf, rightOf } = mapOverObjectValues(
          positionalOptions,
          x => (isArray(x) ? x.map(getPositionOf) : x)
        )
        return fromEl => {
          const exclSelf = arr => arr.filter(x => x.el !== fromEl)
          const from = getPositionOf(fromEl)
          const isAbove =
            !isArray(above) || exclSelf(above).every(to => to.y > from.y)

          const isBelow =
            !isArray(below) || exclSelf(below).every(to => to.y < from.y)

          const isLeftOf =
            !isArray(leftOf) || exclSelf(leftOf).every(to => to.x > from.x)

          const isRightOf =
            !isArray(rightOf) || exclSelf(rightOf).every(to => to.x < from.x)

          return isAbove && isBelow && isLeftOf && isRightOf
        }
      }
    : () => () => true

  const withDistancesTo = isArray(near)
    ? proximalTo => {
        const proximals = proximalTo.map(getPositionOf)

        return fromEl => {
          const proximalsWithoutSelf = proximals.filter(x => x.el !== fromEl)
          const from = getPositionOf(fromEl)
          return proximalsWithoutSelf.map(to => ({
            from: fromEl,
            distance: distanceBetweenEdgesOf(to, from)
          }))[0]
        }
      }
    : () => from => ({ distance: 0, from })

  const selectParentsIfSpecified = isString(pickParent)
    ? pickParent => {
        const parents = qsArray(pickParent)
        return el => getParentsOf(el).find(it => parents.includes(it))
      }
    : () => Passthru

  return (
    elements
      // Filter by containment
      .map(withContainmentDepths(containedBy))
      .filter(Boolean)
      .sort(ascending('depth'))
      .filter(byDepthsEqualToFirstResult)
      .map(({ el }) => el)

      // Filter by position
      .filter(byRelativePosition(positionalOptions))
      .map(withDistancesTo(near))
      .filter(Boolean)
      .sort(ascending('distance'))
      .map(({ from }) => from)

      // Select parent instead of self
      .map(selectParentsIfSpecified(pickParent))
      .filter(Boolean)
  )
}

// Main API implementation
//

function hasContent(...args) {
  return !!viddyQuery(...args)[0]
}

function selectorOf(...args) {
  return viddyQuery(...args).map(selectorOfElement)
}

function valueOf(...args) {
  return viddyQueryInput(...args).map(valueOfElement)
}

function innerText(...args) {
  return viddyQuery(...args).map(el => el.innerText)
}

function matchText(pattern, ...opts) {
  const _opts = match(opts)(
    when(isEmptyArray)(() => [pattern]),
    when([isArray])(([args]) => args),
    when([isPattern])(([pattern]) => ({ pattern })),
    when([isOptionsWithoutPatternOrSelector])(([options]) => [
      { ...options, pattern }
    ]),
    otherwise(() => opts)
  )

  return innerText(..._opts)
    .map(text =>
      match(pattern)(
        when(isRegExp)(pattern => {
          const result = text.match(pattern) ?? [undefined]
          return result.length > 1 || result.groups !== undefined
            ? result
            : result[0]
        }),
        when(isString)(text),
        otherwise(null)
      )
    )
    .filter(anyOf(isString, isArray))
}

function baseWaitFor(fnName = 'baseWaitFor', makeCheckForElement, ...args) {
  const timeoutInMs = match(args)(
    // waitFor signature
    when([{ timeoutInMs: $(isNumber) }])(Passthru),
    when([isPattern, { timeoutInMs: $(isNumber) }])(Passthru),

    // waitForValue signature
    when([isPattern, isPattern, { timeoutInMs: $(isNumber) }])(Passthru),

    otherwise(DEFAULT_WAITFOR_TIMEOUT_IN_SECONDS * 1000)
  )

  const timeoutError = new ViddyError(fnName, args, {
    message: `timed out after ${timeoutInMs}ms trying to resolve query`
  })

  return new Promise((resolve, reject) => {
    const done = val => (resolve(val), cleanup())
    const timeout = () => (reject(timeoutError), cleanup())
    const checker = makeCheckForElement({ done, args })
    const timerId = setTimeout(timeout, timeoutInMs)

    const cleanup = () => {
      clearTimeout(timerId)
      removeObserver()
      removeChangeListeners()
    }

    const removeChangeListeners = installChangeListeners(FORM_TAGS, checker)
    const removeObserver = observeMutations(checker)
    checker()
  })
}

function waitFor(...args) {
  return baseWaitFor('waitFor', makeCheckForElement, ...args)
  function makeCheckForElement({ args, done }) {
    return () => {
      const elementsOfInterest = viddyQuery(...args)
      if (elementsOfInterest.length) {
        done(elementsOfInterest.map(selectorOfElement))
      }
    }
  }
}

function waitForValue(value, ...args) {
  if (!args.length) {
    throw new ViddyError('waitForValue', args, {
      message: 'no query specified'
    })
  }
  return baseWaitFor('waitForValue', makeCheckForElement, ...[value, ...args])
  function makeCheckForElement({ args, done }) {
    return () => {
      const elsWithMatchingValues = viddyQueryInput(...args.slice(1))
        .map(el => ({ el, value: valueOfElement(el) }))
        .filter(({ value: elValue }) =>
          match([value, elValue])(
            when([isRegExp, isString])(([rx]) => rx.test(elValue)),
            when([isString, isString])(
              ([val]) => val.toLowerCase() === elValue.toLowerCase()
            )
          )
        )
        .map(({ el }) => el)

      if (elsWithMatchingValues.length) {
        done(elsWithMatchingValues.map(selectorOfElement))
      }
    }
  }
}

// Inteface
//

function FirstResultOf(fn) {
  return (...args) => fn(...args)[0]
}

export const viddy = {
  for: FirstResultOf(viddyQuery),
  forInput: FirstResultOf(viddyQueryInput),
  selectorOf: FirstResultOf(selectorOf),
  valueOf: FirstResultOf(valueOf),
  waitFor: (...args) => waitFor(...args).then(x => x[0]),
  waitForValue: (...args) => waitForValue(...args).then(x => x[0]),
  innerText: FirstResultOf(innerText),
  matchText: FirstResultOf(matchText),
  hasContent
}

export const viddyWell = {
  for: viddyQuery,
  forInput: viddyQueryInput,
  selectorOf,
  valueOf,
  waitFor,
  waitForValue,
  innerText,
  matchText,
  hasContent
}
