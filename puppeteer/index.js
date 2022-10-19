/**
 * @module viddy/puppeteer
 */

/* globals libViddy */

module.exports = {
  viddyIn,
  viddyWellIn
}

const path = require('path')
const { readFileSync } = require('fs')
const { serialize } = require('../')

const libMatchiz = require('match-iz')
const { match, when, otherwise } = libMatchiz
const { anyOf } = libMatchiz
const { isString, isRegExp, isPojo, isNumber } = libMatchiz

const isPattern = anyOf(isString, isRegExp)
const Identity = x => x

let waitForTimeoutInMs = 5 * 1000

async function viddyIn(page) {
  await injectViddyHelpersIn(page)

  const api = {
    hasContent(...options) {
      return page.evaluate(argStr => {
        const { viddy } = libViddy
        const [args] = libViddy.unserialize(argStr)
        return viddy.hasContent(...args)
      }, serialize(options))
    },

    valueOf(...options) {
      return page.evaluate(argStr => {
        const { viddy } = libViddy
        const [args] = libViddy.unserialize(argStr)
        const value = viddy.valueOf(...args)
        return value === undefined
          ? Promise.reject(new libViddy.ViddyError('valueOf', args))
          : Promise.resolve(value)
      }, serialize(options))
    },

    innerText(...options) {
      return page.evaluate(argStr => {
        const { viddy } = libViddy
        const [args] = libViddy.unserialize(argStr)
        const text = viddy.innerText(...args)
        return text === undefined
          ? Promise.reject(new libViddy.ViddyError('innerText', args))
          : Promise.resolve(text)
      }, serialize(options))
    },

    matchText(...options) {
      return page.evaluate(argStr => {
        const { viddy } = libViddy
        const [args] = libViddy.unserialize(argStr)
        const text = viddy.matchText(...args)
        return text === undefined
          ? Promise.reject(new libViddy.ViddyError('matchText', args))
          : Promise.resolve(text)
      }, serialize(options))
    },

    waitFor(...options) {
      return page.evaluate(argStr => {
        const { viddy } = libViddy
        const [args] = libViddy.unserialize(argStr)
        return viddy.waitFor(...args)
      }, serialize(applyTimeoutIfNotSpecified(options, waitForTimeoutInMs)))
    },

    waitForCta(...options) {
      return page.evaluate(argStr => {
        const { viddy } = libViddy
        const [args] = libViddy.unserialize(argStr)
        return viddy.waitForCta(...args)
      }, serialize(applyTimeoutIfNotSpecified(options, waitForTimeoutInMs)))
    },

    waitForValue(value, ...options) {
      return page.evaluate(
        (valueStr, argStr) => {
          const { viddy } = libViddy
          const [value] = libViddy.unserialize(valueStr)
          const [args] = libViddy.unserialize(argStr)
          return viddy.waitForValue(value, ...args)
        },
        serialize(value),
        serialize(applyTimeoutIfNotSpecified(options, waitForTimeoutInMs))
      )
    },

    waitForDomToIdle(...options) {
      return page.evaluate(argStr => {
        const { viddy } = libViddy
        const [args] = libViddy.unserialize(argStr)
        return viddy.waitForDomToIdle(...args)
      }, serialize(applyTimeoutIfNotSpecified(options, waitForTimeoutInMs)))
    }
  }
  api.waitFor.timesOutAfterMs = ms => (waitForTimeoutInMs = ms)
  return api
}

async function viddyWellIn(page) {
  await injectViddyHelpersIn(page)

  const api = {
    hasContent(...options) {
      return page.evaluate(argStr => {
        const { viddyWell } = libViddy
        const [args] = libViddy.unserialize(argStr)
        return viddyWell.hasContent(...args)
      }, serialize(options))
    },

    valueOf(...options) {
      return page.evaluate(argStr => {
        const { viddyWell } = libViddy
        const [args] = libViddy.unserialize(argStr)
        return viddyWell.valueOf(...args)
      }, serialize(options))
    },

    innerText(...options) {
      return page.evaluate(argStr => {
        const { viddyWell } = libViddy
        const [args] = libViddy.unserialize(argStr)
        return viddyWell.innerText(...args)
      }, serialize(options))
    },

    matchText(...options) {
      return page.evaluate(argStr => {
        const { viddyWell } = libViddy
        const [args] = libViddy.unserialize(argStr)
        return viddyWell.matchText(...args)
      }, serialize(options))
    },

    waitFor(...options) {
      return page.evaluate(argStr => {
        const { viddyWell } = libViddy
        const [args] = libViddy.unserialize(argStr)
        return viddyWell.waitFor(...args)
      }, serialize(applyTimeoutIfNotSpecified(options, waitForTimeoutInMs)))
    },

    waitForCta(...options) {
      return page.evaluate(argStr => {
        const { viddyWell } = libViddy
        const [args] = libViddy.unserialize(argStr)
        return viddyWell.waitForCta(...args)
      }, serialize(applyTimeoutIfNotSpecified(options, waitForTimeoutInMs)))
    },

    waitForValue(value, ...options) {
      return page.evaluate(
        (valueStr, argStr) => {
          const { viddyWell } = libViddy
          const [value] = libViddy.unserialize(valueStr)
          const [args] = libViddy.unserialize(argStr)
          return viddyWell.waitForValue(value, ...args)
        },
        serialize(value),
        serialize(applyTimeoutIfNotSpecified(options, waitForTimeoutInMs))
      )
    },

    waitForDomToIdle(...options) {
      return page.evaluate(argStr => {
        const { viddyWell } = libViddy
        const [args] = libViddy.unserialize(argStr)
        return viddyWell.waitForDomToIdle(...args)
      }, serialize(applyTimeoutIfNotSpecified(options, waitForTimeoutInMs)))
    }
  }
  api.waitFor.timesOutAfterMs = ms => (waitForTimeoutInMs = ms)
  return api
}

function applyTimeoutIfNotSpecified(options, defaultTimeoutInMs) {
  return match(options)(
    when([{ timeoutInMs: isNumber }])(Identity),
    when([isPattern, { timeoutInMs: isNumber }])(Identity),
    when([isPojo])(([opts]) => [{ ...opts, timeoutInMs: defaultTimeoutInMs }]),
    when([isPattern, isPojo])(([pattern, opts]) => [
      pattern,
      { ...opts, timeoutInMs: defaultTimeoutInMs }
    ]),
    otherwise(Identity)
  )
}

// Inject browser-build of viddy into page
//

async function injectViddyHelpersIn(page) {
  if (await page.evaluate(() => window._viddyHelpersAvailable)) {
    console.log('viddy helpers already injected')
    return
  }
  const viddyPath = path.dirname(require.resolve('../'))
  const inject = injectIn(page)
  await inject(path.join(viddyPath, '../browser/viddy.browser.js'))
  await page.evaluate(() => (window._viddyHelpersAvailable = true))
}

function injectIn(page) {
  return src => {
    const _src = readFileSync(src, 'utf8')
    return page.evaluate(_src)
  }
}
