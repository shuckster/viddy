import { match, against, when, otherwise, anyOf, allOf } from 'match-iz'
import { isArray, isNumber, isString, isRegExp, isPojo } from 'match-iz'
import { includes, not, empty, pluck as $ } from 'match-iz'

import { ascending } from './utils/sort.mjs'
import { makeDebouncer } from './utils/async.mjs'

import {
  compose,
  Identity as Passthru,
  mapOverObjectValues,
  Maybe,
  MaybePopulatedArray,
  memo
} from '../puppeteer/fp.js'

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

const INPUT_CTAS = ['button', 'submit', 'reset', 'file']
const FORM_INPUTS = INPUT_CTAS.map(x => `input:not([type=${x}])`)
  .concat('select', 'textarea')
  .join(', ')

const FORM_CTAS = INPUT_CTAS.map(x => `input[type=${x}]`)
  .concat('a', 'button')
  .join(', ')

const DEFAULT_WAITFOR_TIMEOUT_IN_SECONDS = 5
const DEFAULT_IDLE_TIMEOUT_IN_MS = 500

// Runtime types
//

const isEmptyArray = allOf(isArray, empty)
const isPattern = anyOf(isString, isRegExp)
const isPatternOrPojo = anyOf(isPattern, isPojo)
const isOptionsWithPatternOrSelector = anyOf(
  allOf(isPojo, { pattern: isPattern }),
  allOf(isPojo, { selector: isString })
)
const isOptionsWithPatternNotSelector = allOf(isPojo, {
  pattern: isPattern,
  selector: not(isString)
})
const isOptionsWithoutPatternOrSelector = allOf(isPojo, {
  pattern: not(isPattern),
  selector: not(isString)
})
const isOptionsWithoutSelectorOrParent = allOf(isPojo, {
  selector: not(isString),
  pickParent: not(isString)
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

export { qsArray, selectorOfElement }

// Custom Error
//

export class ViddyError extends Error {
  constructor(
    fnName,
    args,
    { message = 'could not resolve query to any elements' } = {}
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

const viddyQuery = (...args) =>
  match(args)(
    when([isPattern])(searchForTextOrPattern),
    when([isPattern, isPojo])(([pattern, opts]) =>
      specificSearch([{ pattern, ...opts }])
    ),
    when([isPojo])(specificSearch),
    otherwise([])
  )

function viddyQueryNearby(selector) {
  return (...args) =>
    match(args)(
      when([isPattern])(([pattern]) =>
        specificSearch([{ selector, near: pattern }])
      ),
      when([isPattern, isOptionsWithoutSelectorOrParent])(([pattern, opts]) =>
        specificSearch([{ selector, near: { ...opts, pattern } }])
      ),
      when([isOptionsWithPatternNotSelector])(([{ pattern, ...rest }]) =>
        specificSearch([{ selector, near: { ...rest, pattern } }])
      ),
      when([{ selector: isString }])(([{ selector: userSelector, ...rest }]) =>
        specificSearch([{ ...rest, selector: userSelector }])
      ),
      otherwise([])
    )
}

function viddyQuerySelector(selector) {
  return (...args) =>
    compose(x => x.filter(against(when(anyOf(qsArray(selector)), true))))(
      match(args)(
        when([isPattern])(([pattern]) =>
          specificSearch([{ containedBy: { selector }, pattern }])
        ),
        when([isPattern, isOptionsWithoutSelectorOrParent])(([pattern, opts]) =>
          specificSearch([{ ...opts, containedBy: { selector }, pattern }])
        ),
        when([isOptionsWithPatternNotSelector])(([{ pattern, ...rest }]) =>
          specificSearch([{ ...rest, containedBy: { selector }, pattern }])
        ),
        when([isOptionsWithoutPatternOrSelector])(([opts]) =>
          specificSearch([{ ...opts, containedBy: { selector } }])
        ),
        when([{ selector: isString }])(
          ([{ selector: userSelector, ...rest }]) =>
            specificSearch([{ ...rest, selector: userSelector }])
        ),
        otherwise(specificSearch([{ selector }]))
      )
    )
}

const viddyQueryInput = viddyQueryNearby(FORM_INPUTS)
const viddyQueryCta = viddyQuerySelector(FORM_CTAS)

// Execute queries
//

function searchForTextOrPattern([textOrRegExp, selector = BODY_WILDCARD]) {
  const byTextContent = match(textOrRegExp)(
    when(isRegExp)(elementHasTextMatching),
    otherwise(elementHasText)
  )

  const all = qsArray(selector)
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

function specificSearch([options]) {
  return match(options)(
    when({ pattern: isPattern, selector: isString })(
      ({ pattern, selector, ...opts }) =>
        winnowElements(searchForTextOrPattern([pattern, selector]), opts)
    ),
    when({ pattern: isPattern })(({ pattern, ...opts }) =>
      winnowElements(searchForTextOrPattern([pattern]), opts)
    ),
    when({ selector: isString })(({ selector, ...opts }) =>
      winnowElements(qsArray(selector), opts)
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
            !isArray(above) ||
            (above.length > 0 && exclSelf(above).every(to => to.y > from.y))

          const isBelow =
            !isArray(below) ||
            (below.length > 0 && exclSelf(below).every(to => to.y < from.y))

          const isLeftOf =
            !isArray(leftOf) ||
            (leftOf.length > 0 && exclSelf(leftOf).every(to => to.x > from.x))

          const isRightOf =
            !isArray(rightOf) ||
            (rightOf.length > 0 && exclSelf(rightOf).every(to => to.x < from.x))

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

    const removeChangeListeners = installChangeListeners(FORM_INPUTS, checker)
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

function waitForCta(...args) {
  return baseWaitFor('waitForCta', makeCheckForElement, ...args)
  function makeCheckForElement({ args, done }) {
    return () => {
      const elementsOfInterest = viddyQueryCta(...args)
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

const isValidTimeoutOptions = anyOf(
  allOf(isPojo, { withinMs: isNumber }),
  allOf(isPojo, { timeoutInMs: isNumber }),
  allOf(isPojo, { withinMs: isNumber, timeoutInMs: isNumber })
)

function waitForDomToIdle(...args) {
  // Timeouts
  const {
    withinMs = DEFAULT_IDLE_TIMEOUT_IN_MS,
    timeoutInMs: _timeoutInMs = DEFAULT_WAITFOR_TIMEOUT_IN_SECONDS * 1000
  } = match(args)(
    when([$(isValidTimeoutOptions)])(Passthru),
    when([isPattern, $(isValidTimeoutOptions)])(Passthru),
    otherwise({})
  )
  const timeoutInMs = Math.max(_timeoutInMs, withinMs + 16)
  const timeoutError = new ViddyError('waitForDomToIdle', args, {
    message: `timed out after ${timeoutInMs}ms waiting for DOM idle`
  })

  // Query, if specified
  const queryWasSpecified = match(args)(
    when([isPattern])(true),
    when([isOptionsWithPatternOrSelector])(true),
    when([isPattern, isPojo])(true),
    otherwise(false)
  )
  const withinSelector = queryWasSpecified && viddy.for(...args)
  if (queryWasSpecified && !withinSelector) {
    throw new ViddyError('waitForDomToIdle', args, {
      message:
        'need resolvable query to monitor for DOM idle, ' +
        'or omit query to monitor all DOM changes'
    })
  }

  return new Promise((resolve, reject) => {
    const done = () => (resolve(), cleanup())
    const timeout = () => (reject(timeoutError), cleanup())
    const timeoutId = setTimeout(timeout, timeoutInMs)
    const [defer, stopChecker] = makeDebouncer(withinMs, done)

    const cleanup = () => {
      clearTimeout(timeoutId)
      stopChecker()
      removeObserver()
    }

    const removeObserver = observeMutations(defer, withinSelector)
    defer()
  })
}

// Inteface
//

function MaybeResultOf(fn) {
  return (...args) => Maybe(fn(...args))
}

function MaybeManyResultsOf(fn) {
  return (...args) => MaybePopulatedArray(fn(...args))
}

function FirstResultOf(fn) {
  return (...args) => fn(...args)[0]
}

function pluckFirstItem(x) {
  return x[0]
}

function ElementsToSelectors(fn) {
  return (...args) => fn(...args).map(selectorOfElement)
}

export const viddy = {
  for: FirstResultOf(ElementsToSelectors(viddyQuery)),
  forCta: FirstResultOf(ElementsToSelectors(viddyQueryCta)),
  forInput: FirstResultOf(ElementsToSelectors(viddyQueryInput)),

  waitFor: (...args) => waitFor(...args).then(pluckFirstItem),
  waitForCta: (...args) => waitForCta(...args).then(pluckFirstItem),
  waitForValue: (...args) => waitForValue(...args).then(pluckFirstItem),
  waitForDomToIdle,

  valueOf: FirstResultOf(valueOf),
  innerText: FirstResultOf(innerText),
  matchText: FirstResultOf(matchText),
  hasContent
}

viddy.when = MaybeResultOf(viddy.for)
viddy.whenCta = MaybeResultOf(viddy.forCta)
viddy.whenInput = MaybeResultOf(viddy.forInput)

export const viddyWell = {
  for: ElementsToSelectors(viddyQuery),
  forInput: ElementsToSelectors(viddyQueryInput),
  forCta: ElementsToSelectors(viddyQueryCta),

  waitFor,
  waitForCta,
  waitForValue,
  waitForDomToIdle,

  valueOf,
  innerText,
  matchText,
  hasContent
}

viddyWell.when = MaybeManyResultsOf(viddyWell.for)
viddyWell.whenCta = MaybeManyResultsOf(viddyWell.forCta)
viddyWell.whenInput = MaybeManyResultsOf(viddyWell.forInput)
