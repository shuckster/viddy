import { match, when, otherwise, defined, isFunction } from 'match-iz'
import { just, maybeTry } from '../../integrations/fp.js'
import { makeDebouncer } from './async.mjs'
import { finder } from '@medv/finder'

export const isHtmlElement = el => el instanceof HTMLElement
export const isElementVisible = el => el.offsetParent !== null

export const qsArray = selector =>
  maybeTry(() => document.querySelectorAll(selector))
    .map(Array.from)
    .orElse(just([]))
    .valueOf()

export function allAncestorsOf(element) {
  const ancestors = []
  let nextAncestor = element.parentNode

  while (nextAncestor && nextAncestor !== document) {
    ancestors.push(nextAncestor)
    nextAncestor = nextAncestor.parentNode
  }
  return ancestors
}

export function calculateElementCenter(el) {
  const { top, left, width, height } = el.getBoundingClientRect()
  const halfWidth = width / 2
  const halfHeight = height / 2
  const x = left + halfWidth
  const y = top + halfHeight
  return { el, x, y, halfWidth, halfHeight }
}

// https://stackoverflow.com/a/50261758/127928
export function distanceBetweenEdgesOf(r1, r2) {
  const dx = r2.x - r1.x
  const dy = r2.y - r1.y
  const p1 = getIntersection(dx, dy, r1.x, r1.y, r1.halfWidth, r1.halfHeight)
  const p2 = getIntersection(-dx, -dy, r2.x, r2.y, r2.halfWidth, r2.halfHeight)
  return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}

function getIntersection(dx, dy, cx, cy, w, h) {
  return Math.abs(dy / dx) < h / w
    ? { x: cx + (dx > 0 ? w : -w), y: cy + (dy * w) / Math.abs(dx) }
    : { x: cx + (dx * h) / Math.abs(dy), y: cy + (dy > 0 ? h : -h) }
}

export function elementHasText(text) {
  const textLower = text.toLowerCase()
  return el => {
    return (
      // Accessing innerText can trigger a reflow, so avoid it
      el.textContent.toLowerCase().includes(textLower) &&
      el.innerText.toLowerCase().includes(textLower)
    )
  }
}

export const elementHasTextMatching = regExp => el =>
  regExp.test(el.textContent) && regExp.test(el.innerText)

export function selectorOfElement(el) {
  if (!(el instanceof Element)) {
    return
  }
  if (typeof global === 'undefined' && typeof window !== 'undefined') {
    /**
     * @fixme this was done for `optimal-select` to work in the browser.
     * I'm not sure if it's still needed for `finder`, but will leave
     * it here for now.
     */
    // eslint-disable-next-line no-global-assign
    global = window
  }
  return finder(el)
}

export function valueOfElement(el) {
  return match(el)(
    when({ val: isFunction })(el => el.val()),
    when({ tagName: 'SELECT', multiple: true })(({ options }) =>
      Array.from(options).reduce(
        (acc, opt) => (opt.selected ? acc.concat(opt.value) : acc),
        []
      )
    ),
    when({ type: 'checkbox', value: defined })(el =>
      el.checked ? el.value : ''
    ),
    when({ type: 'checkbox' })(el => (el.checked ? 'checked' : '')),
    when({ contenteditable: true })(el => el.innerHTML),
    otherwise(el => el.value)
  )
}

export function observeMutations(callback, withinSelector) {
  const observer = withinSelector
    ? new MutationObserver(handleSpecificMutation)
    : new MutationObserver(handleAnyMutation)

  observer.observe(document.body, {
    childList: true,
    attributes: true,
    subtree: true
  })

  return () => observer.disconnect()

  function handleAnyMutation(mutations) {
    setTimeout(() => callback(mutations), 1)
  }

  function handleSpecificMutation(mutations) {
    const elementsOfInterest = qsArray(withinSelector)

    for (const mutation of mutations) {
      const mutatedElement = mutation.target
      if (elementsOfInterest.some(el => mutatedElement.contains(el))) {
        setTimeout(() => callback(), 1)
        break
      }
    }
  }
}

export const installChangeListeners = (sel, cb) => {
  const [handler, cancel] = makeDebouncer(32, cb)
  const cancellers = qsArray(sel)
    .map(el => {
      el.addEventListener('change', handler, { passive: true })
      return () => el.removeEventListener('change', handler)
    })
    .concat(() => document.body.removeEventListener('click', handler))
    .concat(() => document.body.removeEventListener('keyup', handler))
    .concat(cancel)

  document.body.addEventListener('click', handler, { passive: true })
  document.body.addEventListener('keyup', handler, { passive: true })
  return () => cancellers.forEach(removeListener => removeListener())
}
