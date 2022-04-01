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

// APIs
//

export type TViddyApi = {
  /**
   * Return element matching query
   * @example
   * viddy.for('element with text')
   * viddy.for(/regex/i, { near: 'element with text' })
   * viddy.for({ pattern: /regex/i, pickParent: 'p' })
   * viddy.for({ selector: 'p', leftOf: 'text' })
   */
  for: TQueryMethod<Element | undefined>

  /**
   * Return nearest *input*, *select*, or *textarea* matching query
   * @example
   * viddy.forInput('element with text')
   * viddy.forInput(/regex/i, { near: 'element with text' })
   * viddy.forInput({ pattern: /regex/i, pickParent: 'p' })
   * viddy.forInput({ selector: 'p', leftOf: 'text' })
   */
  forInput: TQueryMethod<Element | undefined>

  /**
   * Return unique CSS selector matching query
   * @example
   * viddy.selectorOf('element with text')
   * viddy.selectorOf(/regex/i, { near: 'element with text' })
   * viddy.selectorOf({ pattern: /regex/i, pickParent: 'p' })
   * viddy.selectorOf({ selector: 'p', leftOf: 'text' })
   */
  selectorOf: TQueryMethod<CSSSelectorString | undefined>

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
   * Return Promise that awaits the query, returning matching elements
   * @example
   * viddy.waitFor('element with text')
   * viddy.waitFor(/regex/i, { near: 'element with text' })
   * viddy.waitFor({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitFor({ selector: 'p', leftOf: 'text' })
   */
  waitFor: TQueryMethod<Promise<CSSSelectorString>>

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
   * viddy.waitForIdle()
   * viddy.waitForIdle('element with text')
   * viddy.waitForIdle(/regex/i, { near: 'element with text' })
   * viddy.waitForIdle({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitForIdle({ selector: 'p', leftOf: 'text' })
   */
  waitForIdle: TQueryMethod<Promise<any>>

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
   * Return element matching query
   * @example
   * viddy.for('element with text')
   * viddy.for(/regex/i, { near: 'element with text' })
   * viddy.for({ pattern: /regex/i, pickParent: 'p' })
   * viddy.for({ selector: 'p', leftOf: 'text' })
   */
  for: TQueryMethod<Element[]>

  /**
   * Return nearest *input*, *select*, or *textarea* matching query
   * @example
   * viddy.forInput('element with text')
   * viddy.forInput(/regex/i, { near: 'element with text' })
   * viddy.forInput({ pattern: /regex/i, pickParent: 'p' })
   * viddy.forInput({ selector: 'p', leftOf: 'text' })
   */
  forInput: TQueryMethod<Element[]>

  /**
   * Return unique CSS selector matching query
   * @example
   * viddy.selectorOf('element with text')
   * viddy.selectorOf(/regex/i, { near: 'element with text' })
   * viddy.selectorOf({ pattern: /regex/i, pickParent: 'p' })
   * viddy.selectorOf({ selector: 'p', leftOf: 'text' })
   */
  selectorOf: TQueryMethod<CSSSelectorString[]>

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
   * Return Promise that awaits the query, returning matching elements
   * @example
   * viddy.waitFor('element with text')
   * viddy.waitFor(/regex/i, { near: 'element with text' })
   * viddy.waitFor({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitFor({ selector: 'p', leftOf: 'text' })
   */
  waitFor: TQueryMethod<Promise<CSSSelectorString[]>>

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
   * viddy.waitForIdle()
   * viddy.waitForIdle('element with text')
   * viddy.waitForIdle(/regex/i, { near: 'element with text' })
   * viddy.waitForIdle({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitForIdle({ selector: 'p', leftOf: 'text' })
   */
  waitForIdle: TQueryMethod<Promise<any>>

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

  export const ViddyError: Error
  export const viddy: TViddyApi
  export const viddyWell: TViddyWellApi
}

export type TViddyInApi = {
  /**
   * Return unique CSS selector matching query
   * @example
   * viddy.selectorOf('element with text')
   * viddy.selectorOf(/regex/i, { near: 'element with text' })
   * viddy.selectorOf({ pattern: /regex/i, pickParent: 'p' })
   * viddy.selectorOf({ selector: 'p', leftOf: 'text' })
   */
  selectorOf: TQueryMethod<Promise<CSSSelectorString>>

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
   * Return Promise that awaits the query, returning matching elements
   * @example
   * viddy.waitFor('element with text')
   * viddy.waitFor(/regex/i, { near: 'element with text' })
   * viddy.waitFor({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitFor({ selector: 'p', leftOf: 'text' })
   */
  waitFor: TQueryMethod<Promise<CSSSelectorString>>

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
   * viddy.waitForIdle()
   * viddy.waitForIdle('element with text')
   * viddy.waitForIdle(/regex/i, { near: 'element with text' })
   * viddy.waitForIdle({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitForIdle({ selector: 'p', leftOf: 'text' })
   */
  waitForIdle: TQueryMethod<Promise<any>>

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
   * Return unique CSS selector matching query
   * @example
   * viddy.selectorOf('element with text')
   * viddy.selectorOf(/regex/i, { near: 'element with text' })
   * viddy.selectorOf({ pattern: /regex/i, pickParent: 'p' })
   * viddy.selectorOf({ selector: 'p', leftOf: 'text' })
   */
  selectorOf: TQueryMethod<Promise<CSSSelectorString[]>>

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
   * Return Promise that awaits the query, returning matching elements
   * @example
   * viddy.waitFor('element with text')
   * viddy.waitFor(/regex/i, { near: 'element with text' })
   * viddy.waitFor({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitFor({ selector: 'p', leftOf: 'text' })
   */
  waitFor: TQueryMethod<Promise<CSSSelectorString[]>>

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
   * viddy.waitForIdle()
   * viddy.waitForIdle('element with text')
   * viddy.waitForIdle(/regex/i, { near: 'element with text' })
   * viddy.waitForIdle({ pattern: /regex/i, pickParent: 'p' })
   * viddy.waitForIdle({ selector: 'p', leftOf: 'text' })
   */
  waitForIdle: TQueryMethod<Promise<any>>

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
