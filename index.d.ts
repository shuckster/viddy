// Queries
//

export type CSSSelectorString = string
export type TPattern = string | RegExp
export type TViddyQuery = TPattern | TViddyOpts | TViddyQueryTuple
export type TViddyQueryTuple = [TPattern, TViddyOpts]

export type TViddyPattern = {
  pattern: TPattern
}

export type TViddySelector = {
  selector: CSSSelectorString
}

export type TViddyOpts = (TViddyPattern | TViddySelector) & {
  pickParent?: CSSSelectorString
  near?: TViddyQuery
  above?: TViddyQuery
  below?: TViddyQuery
  leftOf?: TViddyQuery
  rightOf?: TViddyQuery
  containedBy?: TViddyQuery
  withinMs?: number
  timeoutInMs?: number
}

// Function signatures
//

type TQueryMethod<TReturn> = (
  pattern: TViddyQuery,
  opts?: TViddyOpts
) => TReturn

type TQueryMatchMethod<TReturn> = (
  needle: TPattern,
  pattern: TViddyQuery,
  opts?: TViddyOpts
) => TReturn

type TQueryValueMethod<TReturn> = (
  value: TPattern,
  pattern: TViddyQuery,
  opts?: TViddyOpts
) => TReturn

// Monadic return
//

type TNothing<T = void> = {
  valueOf: () => T
  exists: () => TNothing<T>
  absent: (f: () => U) => TJust<U>
}

type TJust<T = string> = {
  valueOf: () => T
  exists: (f: (x: T) => U) => TJust<U>
  absent: () => TJust<T>
}

type TMonadicReturn<T, U> = TJust<T> | TNothing<U>

// APIs
//

export type TViddyApi = {
  /**
   * Return element selector matching query
   * @example
   * viddy.for('element with text')
   * viddy.for(/regex/i, { near: 'element with text' })
   * viddy.for({ pattern: /regex/i, pickParent: 'p' })
   * viddy.for({ selector: 'p', leftOf: 'text' })
   */
  for: TQueryMethod<CSSSelectorString | undefined>

  /**
   * Return nearest *button* or *anchor* matching query
   * @example
   * viddy.forCta('element with text')
   * viddy.forCta(/regex/i, { near: 'element with text' })
   * viddy.forCta({ pattern: /regex/i, pickParent: 'p' })
   * viddy.forCta({ selector: 'p', leftOf: 'text' })
   */
  forCta: TQueryMethod<CSSSelectorString | undefined>

  /**
   * Return nearest *input* (textual or checkboxes/radios, not buttons), *select*, or *textarea* matching query
   * @example
   * viddy.forInput('element with text')
   * viddy.forInput(/regex/i, { near: 'element with text' })
   * viddy.forInput({ pattern: /regex/i, pickParent: 'p' })
   * viddy.forInput({ selector: 'p', leftOf: 'text' })
   */
  forInput: TQueryMethod<CSSSelectorString | undefined>

  /**
   * Return element selector matching query
   * @example
   * viddy.when('element with text')
   *   .exists(sel => 'found' + sel)
   *   .absent(() => 'not found')
   *   .valueOf()
   *
   * viddy.when(/regex/i, { near: 'element with text' })
   * viddy.when({ pattern: /regex/i, pickParent: 'p' })
   * viddy.when({ selector: 'p', leftOf: 'text' })
   */
  when: TQueryMethod<TMonadicReturn<CSSSelectorString, void>>

  /**
   * Return nearest *button* or *anchor* matching query
   * @example
   * viddy.whenCta('element with text')
   *   .exists(sel => 'found' + sel)
   *   .absent(() => 'not found')
   *   .valueOf()
   *
   * viddy.whenCta(/regex/i, { near: 'element with text' })
   * viddy.whenCta({ pattern: /regex/i, pickParent: 'p' })
   * viddy.whenCta({ selector: 'p', leftOf: 'text' })
   */
  whenCta: TQueryMethod<TMonadicReturn<CSSSelectorString, void>>

  /**
   * Return nearest *input* (textual or checkboxes/radios, not buttons), *select*, or *textarea* matching query
   * @example
   * viddy.whenInput('element with text')
   *   .exists(sel => 'found' + sel)
   *   .absent(() => 'not found')
   *   .valueOf()
   *
   * viddy.whenInput(/regex/i, { near: 'element with text' })
   * viddy.whenInput({ pattern: /regex/i, pickParent: 'p' })
   * viddy.whenInput({ selector: 'p', leftOf: 'text' })
   */
  whenInput: TQueryMethod<TMonadicReturn<CSSSelectorString, void>>

  /**
   * Return Promise that awaits the query, returning matching elements
   * @example
   * viddy.waitFor('element with text')
   * viddy.waitFor(/regex/i, { near: 'element with text' })
   * viddy.waitFor({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitFor({ selector: 'p', leftOf: 'text' })
   */
  waitFor: TQueryMethod<Promise<CSSSelectorString>>

  /**
   * Return Promise that awaits the query, returning matching call-to-action elements (buttons, anchors)
   * @example
   * viddy.waitForCta('element with text')
   * viddy.waitForCta(/regex/i, { near: 'element with text' })
   * viddy.waitForCta({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitForCta({ selector: 'p', leftOf: 'text' })
   */
  waitForCta: TQueryMethod<Promise<CSSSelectorString>>

  /**
   * Return Promise that awaits the query, returning nearest matching *input*, *select*, or *textarea* elements
   * @example
   * viddy.waitForValue('exact value', 'element with text')
   * viddy.waitForValue(/okay/i, { selector: 'select', near: 'Choose:' })
   * viddy.waitForValue('on', { selector: 'input[type=checkbox]' })
   */
  waitForValue: TQueryValueMethod<Promise<CSSSelectorString>>

  /**
   * Return Promise that waits for entire DOM to stop updating, or a portion of it if a query is specified
   * @example
   * viddy.waitForDomToIdle('near this element', { withinMs: 500 })
   * viddy.waitForDomToIdle({ pattern: 'near this element', timeoutInMs: 10000 })
   *
   * // Specifying no pattern will wait for the entire page to be idle.
   * viddy.waitForDomToIdle()
   * viddy.waitForDomToIdle({ withinMs: 500, timeoutInMs: 10000 })
   */
  waitForDomToIdle: TQueryMethod<Promise<any>>

  /**
   * Return value of nearest *input*, *select*, or *textarea* matching query
   * @example
   * viddy.valueOf('element with text')
   * viddy.valueOf(/regex/i, { near: 'element with text' })
   * viddy.valueOf({ pattern: /regex/i, pickParent: 'p' })
   * viddy.valueOf({ selector: 'p', leftOf: 'text' })
   */
  valueOf: TQueryMethod<any>

  /**
   * Return innerText of the elements matching query
   * @example
   * viddy.innerText('element with text')
   * viddy.innerText(/regex/i, { near: 'element with text' })
   * viddy.innerText({ pattern: /regex/i, pickParent: 'p' })
   * viddy.innerText({ selector: 'p', leftOf: 'text' })
   */
  innerText: TQueryMethod<string | undefined>

  /**
   * Searches innerText of query for needle. If needle is a string, all innerText is returned. If needle is a RegExp, the portion of text matching it will be returned. If capture-groups are specified in the RegExp, the full match-array will be returned
   * @example
   * viddy.matchText('needle', 'element with text')
   * viddy.matchText(/needle/i, { selector: 'select', near: 'Choose:' })
   */
  matchText: TQueryMatchMethod<string | undefined>

  /**
   * Return true if elements are found matching the query
   * @example
   * viddy.hasContent('element with text')
   * viddy.hasContent(/regex/i, { near: 'element with text' })
   * viddy.hasContent({ pattern: /regex/i, pickParent: 'p' })
   * viddy.hasContent({ selector: 'p', leftOf: 'text' })
   */
  hasContent: TQueryMethod<boolean>
}

export type TViddyWellApi = {
  /**
   * Return element selector matching query
   * @example
   * viddy.for('element with text')
   * viddy.for(/regex/i, { near: 'element with text' })
   * viddy.for({ pattern: /regex/i, pickParent: 'p' })
   * viddy.for({ selector: 'p', leftOf: 'text' })
   */
  for: TQueryMethod<CSSSelectorString[]>

  /**
   * Return nearest *button* or *anchor* matching query
   * @example
   * viddy.forCta('element with text')
   * viddy.forCta(/regex/i, { near: 'element with text' })
   * viddy.forCta({ pattern: /regex/i, pickParent: 'p' })
   * viddy.forCta({ selector: 'p', leftOf: 'text' })
   */
  forCta: TQueryMethod<CSSSelectorString[]>

  /**
   * Return nearest *input* (textual or checkboxes/radios, not buttons), *select*, or *textarea* matching query
   * @example
   * viddy.forInput('element with text')
   * viddy.forInput(/regex/i, { near: 'element with text' })
   * viddy.forInput({ pattern: /regex/i, pickParent: 'p' })
   * viddy.forInput({ selector: 'p', leftOf: 'text' })
   */
  forInput: TQueryMethod<CSSSelectorString[]>

  /**
   * Return Promise that awaits the query, returning matching elements
   * @example
   * viddy.waitFor('element with text')
   * viddy.waitFor(/regex/i, { near: 'element with text' })
   * viddy.waitFor({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitFor({ selector: 'p', leftOf: 'text' })
   */
  waitFor: TQueryMethod<Promise<CSSSelectorString[]>>

  /**
   * Return Promise that awaits the query, returning matching call-to-action elements (buttons, anchors)
   * @example
   * viddy.waitForCta('element with text')
   * viddy.waitForCta(/regex/i, { near: 'element with text' })
   * viddy.waitForCta({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitForCta({ selector: 'p', leftOf: 'text' })
   */
  waitForCta: TQueryMethod<Promise<CSSSelectorString[]>>

  /**
   * Return Promise that awaits the query, returning nearest matching *input*, *select*, or *textarea* elements
   * @example
   * viddy.waitForValue('exact value', 'element with text')
   * viddy.waitForValue(/okay/i, { selector: 'select', near: 'Choose:' })
   * viddy.waitForValue('on', { selector: 'input[type=checkbox]' })
   */
  waitForValue: TQueryValueMethod<Promise<CSSSelectorString[]>>

  /**
   * Return Promise that waits for entire DOM to stop updating, or a portion of it if a query is specified
   * @example
   * viddy.waitForDomToIdle('near this element', { withinMs: 500 })
   * viddy.waitForDomToIdle({ pattern: 'near this element', timeoutInMs: 10000 })
   *
   * // Specifying no pattern will wait for the entire page to be idle.
   * viddy.waitForDomToIdle()
   * viddy.waitForDomToIdle({ withinMs: 500, timeoutInMs: 10000 })
   */
  waitForDomToIdle: TQueryMethod<Promise<any>>

  /**
   * Return value of nearest *input*, *select*, or *textarea* matching query
   * @example
   * viddy.valueOf('element with text')
   * viddy.valueOf(/regex/i, { near: 'element with text' })
   * viddy.valueOf({ pattern: /regex/i, pickParent: 'p' })
   * viddy.valueOf({ selector: 'p', leftOf: 'text' })
   */
  valueOf: TQueryMethod<any[]>

  /**
   * Return innerText of the elements matching query
   * @example
   * viddy.innerText('element with text')
   * viddy.innerText(/regex/i, { near: 'element with text' })
   * viddy.innerText({ pattern: /regex/i, pickParent: 'p' })
   * viddy.innerText({ selector: 'p', leftOf: 'text' })
   */
  innerText: TQueryMethod<string[]>

  /**
   * Searches innerText of query for needle. If needle is a string, all innerText is returned. If needle is a RegExp, the portion of text matching it will be returned. If capture-groups are specified in the RegExp, the full match-array will be returned
   * @example
   * viddy.matchText('needle', 'element with text')
   * viddy.matchText(/needle/i, { selector: 'select', near: 'Choose:' })
   */
  matchText: TQueryMatchMethod<string[]>

  /**
   * Return true if elements are found matching the query
   * @example
   * viddy.hasContent('element with text')
   * viddy.hasContent(/regex/i, { near: 'element with text' })
   * viddy.hasContent({ pattern: /regex/i, pickParent: 'p' })
   * viddy.hasContent({ selector: 'p', leftOf: 'text' })
   */
  hasContent: TQueryMethod<boolean>
}

declare module 'viddy' {
  export function serialize(...args: any[]): string
  export function unserialize(argStr: string): any
  export function qsArray(selector: string): Element[]
  export function selectorOfElement(element: Element): string | void

  export const ViddyError: Error
  export const viddy: TViddyApi
  export const viddyWell: TViddyWellApi
}

export type TViddyInApi = {
  /**
   * Return element selector matching query
   * @example
   * viddy.for('element with text')
   * viddy.for(/regex/i, { near: 'element with text' })
   * viddy.for({ pattern: /regex/i, pickParent: 'p' })
   * viddy.for({ selector: 'p', leftOf: 'text' })
   */
  for: TQueryMethod<Promise<CSSSelectorString>>

  /**
   * Return nearest *button* or *anchor* matching query
   * @example
   * viddy.forCta('element with text')
   * viddy.forCta(/regex/i, { near: 'element with text' })
   * viddy.forCta({ pattern: /regex/i, pickParent: 'p' })
   * viddy.forCta({ selector: 'p', leftOf: 'text' })
   */
  forCta: TQueryMethod<Promise<CSSSelectorString>>

  /**
   * Return nearest *input* (textual or checkboxes/radios, not buttons), *select*, or *textarea* matching query
   * @example
   * viddy.forInput('element with text')
   * viddy.forInput(/regex/i, { near: 'element with text' })
   * viddy.forInput({ pattern: /regex/i, pickParent: 'p' })
   * viddy.forInput({ selector: 'p', leftOf: 'text' })
   */
  forInput: TQueryValueMethod<Promise<CSSSelectorString>>

  /**
   * Return Promise that awaits the query, returning matching elements
   * @example
   * viddy.waitFor('element with text')
   * viddy.waitFor(/regex/i, { near: 'element with text' })
   * viddy.waitFor({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitFor({ selector: 'p', leftOf: 'text' })
   */
  waitFor: TQueryMethod<Promise<CSSSelectorString>>

  /**
   * Return Promise that awaits the query, returning matching call-to-action elements (buttons, anchors)
   * @example
   * viddy.waitForCta('element with text')
   * viddy.waitForCta(/regex/i, { near: 'element with text' })
   * viddy.waitForCta({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitForCta({ selector: 'p', leftOf: 'text' })
   */
  waitForCta: TQueryMethod<Promise<CSSSelectorString>>

  /**
   * Return Promise that awaits the query, returning nearest matching *input*, *select*, or *textarea* elements
   * @example
   * viddy.waitForValue('exact value', 'element with text')
   * viddy.waitForValue(/okay/i, { selector: 'select', near: 'Choose:' })
   * viddy.waitForValue('on', { selector: 'input[type=checkbox]' })
   */
  waitForValue: TQueryValueMethod<Promise<CSSSelectorString>>

  /**
   * Return Promise that waits for entire DOM to stop updating, or a portion of it if a query is specified
   * @example
   * viddy.waitForDomToIdle('near this element', { withinMs: 500 })
   * viddy.waitForDomToIdle({ pattern: 'near this element', timeoutInMs: 10000 })
   *
   * // Specifying no pattern will wait for the entire page to be idle.
   * viddy.waitForDomToIdle()
   * viddy.waitForDomToIdle({ withinMs: 500, timeoutInMs: 10000 })
   */
  waitForDomToIdle: TQueryMethod<Promise<any>>

  /**
   * Return value of nearest *input*, *select*, or *textarea* matching query
   * @example
   * viddy.valueOf('element with text')
   * viddy.valueOf(/regex/i, { near: 'element with text' })
   * viddy.valueOf({ pattern: /regex/i, pickParent: 'p' })
   * viddy.valueOf({ selector: 'p', leftOf: 'text' })
   */
  valueOf: TQueryMethod<Promise<any>>

  /**
   * Return innerText of the elements matching query
   * @example
   * viddy.innerText('element with text')
   * viddy.innerText(/regex/i, { near: 'element with text' })
   * viddy.innerText({ pattern: /regex/i, pickParent: 'p' })
   * viddy.innerText({ selector: 'p', leftOf: 'text' })
   */
  innerText: TQueryMethod<Promise<string>>

  /**
   * Searches innerText of query for needle. If needle is a string, all innerText is returned. If needle is a RegExp, the portion of text matching it will be returned. If capture-groups are specified in the RegExp, the full match-array will be returned
   * @example
   * viddy.matchText('needle', 'element with text')
   * viddy.matchText(/needle/i, { selector: 'select', near: 'Choose:' })
   */
  matchText: TQueryMatchMethod<Promise<string>>

  /**
   * Return true if elements are found matching the query
   * @example
   * viddy.hasContent('element with text')
   * viddy.hasContent(/regex/i, { near: 'element with text' })
   * viddy.hasContent({ pattern: /regex/i, pickParent: 'p' })
   * viddy.hasContent({ selector: 'p', leftOf: 'text' })
   */
  hasContent: TQueryMethod<boolean>
}

export type TViddyWellInApi = {
  /**
   * Return element selector matching query
   * @example
   * viddy.for('element with text')
   * viddy.for(/regex/i, { near: 'element with text' })
   * viddy.for({ pattern: /regex/i, pickParent: 'p' })
   * viddy.for({ selector: 'p', leftOf: 'text' })
   */
  for: TQueryMethod<Promise<CSSSelectorString[]>>

  /**
   * Return nearest *button* or *anchor* matching query
   * @example
   * viddy.forCta('element with text')
   * viddy.forCta(/regex/i, { near: 'element with text' })
   * viddy.forCta({ pattern: /regex/i, pickParent: 'p' })
   * viddy.forCta({ selector: 'p', leftOf: 'text' })
   */
  forCta: TQueryMethod<Promise<CSSSelectorString[]>>

  /**
   * Return nearest *input* (textual or checkboxes/radios, not buttons), *select*, or *textarea* matching query
   * @example
   * viddy.forInput('element with text')
   * viddy.forInput(/regex/i, { near: 'element with text' })
   * viddy.forInput({ pattern: /regex/i, pickParent: 'p' })
   * viddy.forInput({ selector: 'p', leftOf: 'text' })
   */
  forInput: TQueryValueMethod<Promise<CSSSelectorString[]>>

  /**
   * Return Promise that awaits the query, returning matching elements
   * @example
   * viddy.waitFor('element with text')
   * viddy.waitFor(/regex/i, { near: 'element with text' })
   * viddy.waitFor({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitFor({ selector: 'p', leftOf: 'text' })
   */
  waitFor: TQueryMethod<Promise<CSSSelectorString[]>>

  /**
   * Return Promise that awaits the query, returning matching call-to-action elements (buttons, anchors)
   * @example
   * viddy.waitForCta('element with text')
   * viddy.waitForCta(/regex/i, { near: 'element with text' })
   * viddy.waitForCta({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitForCta({ selector: 'p', leftOf: 'text' })
   */
  waitForCta: TQueryMethod<Promise<CSSSelectorString[]>>

  /**
   * Return Promise that awaits the query, returning nearest matching *input*, *select*, or *textarea* elements
   * @example
   * viddy.waitForValue('exact value', 'element with text')
   * viddy.waitForValue(/okay/i, { selector: 'select', near: 'Choose:' })
   * viddy.waitForValue('on', { selector: 'input[type=checkbox]' })
   */
  waitForValue: TQueryValueMethod<Promise<CSSSelectorString[]>>

  /**
   * Return Promise that waits for entire DOM to stop updating, or a portion of it if a query is specified
   * @example
   * viddy.waitForDomToIdle('near this element', { withinMs: 500 })
   * viddy.waitForDomToIdle({ pattern: 'near this element', timeoutInMs: 10000 })
   *
   * // Specifying no pattern will wait for the entire page to be idle.
   * viddy.waitForDomToIdle()
   * viddy.waitForDomToIdle({ withinMs: 500, timeoutInMs: 10000 })
   */
  waitForDomToIdle: TQueryMethod<Promise<any>>

  /**
   * Return value of nearest *input*, *select*, or *textarea* matching query
   * @example
   * viddy.valueOf('element with text')
   * viddy.valueOf(/regex/i, { near: 'element with text' })
   * viddy.valueOf({ pattern: /regex/i, pickParent: 'p' })
   * viddy.valueOf({ selector: 'p', leftOf: 'text' })
   */
  valueOf: TQueryMethod<Promise<any>>

  /**
   * Return innerText of the elements matching query
   * @example
   * viddy.innerText('element with text')
   * viddy.innerText(/regex/i, { near: 'element with text' })
   * viddy.innerText({ pattern: /regex/i, pickParent: 'p' })
   * viddy.innerText({ selector: 'p', leftOf: 'text' })
   */
  innerText: TQueryMethod<Promise<string[]>>

  /**
   * Searches innerText of query for needle. If needle is a string, all innerText is returned. If needle is a RegExp, the portion of text matching it will be returned. If capture-groups are specified in the RegExp, the full match-array will be returned
   * @example
   * viddy.matchText('needle', 'element with text')
   * viddy.matchText(/needle/i, { selector: 'select', near: 'Choose:' })
   */
  matchText: TQueryMatchMethod<Promise<string[]>>

  /**
   * Return true if elements are found matching the query
   * @example
   * viddy.hasContent('element with text')
   * viddy.hasContent(/regex/i, { near: 'element with text' })
   * viddy.hasContent({ pattern: /regex/i, pickParent: 'p' })
   * viddy.hasContent({ selector: 'p', leftOf: 'text' })
   */
  hasContent: TQueryMethod<boolean>
}

declare module 'viddy/puppeteer' {
  /**
   * Inject viddy API into a Puppeteer page object
   * @example
   * const { viddyIn } = require('viddy/puppeteer')
   * // later...
   * const page = await browser.newPage()
   * const viddy = viddyIn(page)
   *
   * await viddy.waitFor('text')
   */
  export function viddyIn(page: Object): TViddyInApi

  /**
   * Inject viddyWell API into a Puppeteer page object
   * @example
   * const { viddyWellIn } = require('viddy/puppeteer')
   * // later...
   * const page = await browser.newPage()
   * const viddy = viddyWellIn(page)
   *
   * await viddy.waitFor('text')
   */
  export function viddyWellIn(page: Object): TViddyWellInApi
}
