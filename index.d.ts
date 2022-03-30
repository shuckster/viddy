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

export type TViddyApi = {
  for: (pattern: TViddyQuery, opts?: TViddyOpts) => Element | undefined
  forInput: (pattern: TViddyQuery, opts?: TViddyOpts) => Element | undefined

  selectorOf: (
    pattern: TViddyQuery,
    opts?: TViddyOpts
  ) => CSSSelectorString | undefined

  valueOf: (pattern: TViddyQuery, opts?: TViddyOpts) => any

  waitFor: (
    pattern: TViddyQuery,
    opts?: TViddyOpts
  ) => Promise<CSSSelectorString>

  waitForValue: (
    value: TPattern,
    pattern: TViddyQuery,
    opts?: TViddyOpts
  ) => Promise<CSSSelectorString>

  waitForIdle: (pattern: TViddyQuery, opts?: TViddyOpts) => Promise<any>
  innerText: (pattern: TViddyQuery, opts?: TViddyOpts) => string | undefined
  matchText: (pattern: TViddyQuery, opts?: TViddyOpts) => string | undefined
  hasContent: (pattern: TViddyQuery, opts?: TViddyOpts) => boolean
}

export type TViddyWellApi = {
  for: (pattern: TViddyQuery, opts?: TViddyOpts) => Element[]
  forInput: (pattern: TViddyQuery, opts?: TViddyOpts) => Element[]
  selectorOf: (pattern: TViddyQuery, opts?: TViddyOpts) => CSSSelectorString[]
  valueOf: (pattern: TViddyQuery, opts?: TViddyOpts) => any[]

  waitFor: (
    pattern: TViddyQuery,
    opts?: TViddyOpts
  ) => Promise<CSSSelectorString[]>

  waitForValue: (
    value: TPattern,
    pattern: TViddyQuery,
    opts?: TViddyOpts
  ) => Promise<CSSSelectorString[]>

  waitForIdle: (pattern: TViddyQuery, opts?: TViddyOpts) => Promise<any>
  innerText: (pattern: TViddyQuery, opts?: TViddyOpts) => string[]
  matchText: (pattern: TViddyQuery, opts?: TViddyOpts) => string[]
  hasContent: (pattern: TViddyQuery, opts?: TViddyOpts) => boolean
}

declare module 'viddy' {
  export function serialize(...args: any[]): string
  export function unserialize(argStr: string): any
  export function qsArray(selector: string): Element[]

  export const viddy: TViddyApi
  export const viddyWell: TViddyWellApi
}

export type TViddyInApi = {
  selectorOf: (
    pattern: TViddyQuery,
    opts?: TViddyOpts
  ) => Promise<CSSSelectorString>

  valueOf: (pattern: TViddyQuery, opts?: TViddyOpts) => Promise<any>

  waitFor: (
    pattern: TViddyQuery,
    opts?: TViddyOpts
  ) => Promise<CSSSelectorString>

  waitForValue: (
    value: TPattern,
    pattern: TViddyQuery,
    opts?: TViddyOpts
  ) => Promise<CSSSelectorString>

  waitForIdle: (pattern: TViddyQuery, opts?: TViddyOpts) => Promise<any>
  innerText: (pattern: TViddyQuery, opts?: TViddyOpts) => Promise<string>
  matchText: (pattern: TViddyQuery, opts?: TViddyOpts) => Promise<string>
  hasContent: (pattern: TViddyQuery, opts?: TViddyOpts) => boolean
}

export type TViddyWellInApi = {
  selectorOf: (
    pattern: TViddyQuery,
    opts?: TViddyOpts
  ) => Promise<CSSSelectorString[]>

  valueOf: (pattern: TViddyQuery, opts?: TViddyOpts) => Promise<any>

  waitFor: (
    pattern: TViddyQuery,
    opts?: TViddyOpts
  ) => Promise<CSSSelectorString[]>

  waitForValue: (
    value: TPattern,
    pattern: TViddyQuery,
    opts?: TViddyOpts
  ) => Promise<CSSSelectorString[]>

  waitForIdle: (pattern: TViddyQuery, opts?: TViddyOpts) => Promise<any>
  innerText: (pattern: TViddyQuery, opts?: TViddyOpts) => Promise<string[]>
  matchText: (pattern: TViddyQuery, opts?: TViddyOpts) => Promise<string[]>
  hasContent: (pattern: TViddyQuery, opts?: TViddyOpts) => boolean
}

declare module 'viddy/puppeteer' {
  /**
   * @example
   * const { viddyIn } = require('viddy/puppeteer')
   * // later...
   * const page = await browser.newPage()
   * const viddy = viddyIn(page)
   *
   * await viddy.waitFor('text')
   * @param page Puppeteer page-object
   * @returns {TViddyInApi}
   */
  export function viddyIn(page: Object): TViddyInApi

  /**
   * @example
   * const { viddyWellIn } = require('viddy/puppeteer')
   * // later...
   * const page = await browser.newPage()
   * const viddy = viddyWellIn(page)
   *
   * await viddy.waitFor('text')
   * @param page Puppeteer page-object
   * @returns {TViddyWellInApi}
   */
  export function viddyWellIn(page: Object): TViddyWellInApi
}
