/**
 * @module viddy/playwright
 */

/* globals libViddy */

module.exports = {
  viddyIn,
  viddyWellIn
}

const path = require('path')
const { readFileSync } = require('fs')
const { serialize } = require('../../')

const libMatchiz = require('match-iz')
const { Maybe, MaybePopulatedArray, Identity } = require('../fp')
const { match, when, otherwise } = libMatchiz
const { anyOf } = libMatchiz
const { isString, isRegExp, isPojo, isNumber } = libMatchiz

const isPattern = anyOf(isString, isRegExp)

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

    for(...options) {
      return page.evaluate(argStr => {
        const { viddy } = libViddy
        const [args] = libViddy.unserialize(argStr)
        const value = viddy.for(...args)
        return value === undefined
          ? Promise.reject(new libViddy.ViddyError('for', args))
          : Promise.resolve(value)
      }, serialize(options))
    },

    forCta(...options) {
      return page.evaluate(argStr => {
        const { viddy } = libViddy
        const [args] = libViddy.unserialize(argStr)
        const value = viddy.forCta(...args)
        return value === undefined
          ? Promise.reject(new libViddy.ViddyError('forCta', args))
          : Promise.resolve(value)
      }, serialize(options))
    },

    forInput(...options) {
      return page.evaluate(argStr => {
        const { viddy } = libViddy
        const [args] = libViddy.unserialize(argStr)
        const value = viddy.forInput(...args)
        return value === undefined
          ? Promise.reject(new libViddy.ViddyError('forInput', args))
          : Promise.resolve(value)
      }, serialize(options))
    },

    when(...options) {
      return page
        .evaluate(argStr => {
          const { viddy } = libViddy
          const [args] = libViddy.unserialize(argStr)
          return viddy.for(...args)
        }, serialize(options))
        .then(Maybe.of)
    },

    whenCta(...options) {
      return page
        .evaluate(argStr => {
          const { viddy } = libViddy
          const [args] = libViddy.unserialize(argStr)
          return viddy.forCta(...args)
        }, serialize(options))
        .then(Maybe.of)
    },

    whenInput(...options) {
      return page
        .evaluate(argStr => {
          const { viddy } = libViddy
          const [args] = libViddy.unserialize(argStr)
          return viddy.forInput(...args)
        }, serialize(options))
        .then(Maybe.of)
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
        (cfg) => {
          const { viddy } = libViddy
          const [ value, args ] = libViddy.unserialize(cfg)
          return viddy.waitForValue(value, ...args)
        },
        serialize(
          value,
          applyTimeoutIfNotSpecified(options, waitForTimeoutInMs)
        )
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

    for(...options) {
      return page.evaluate(argStr => {
        const { viddyWell } = libViddy
        const [args] = libViddy.unserialize(argStr)
        return viddyWell.for(...args)
      }, serialize(options))
    },

    forCta(...options) {
      return page.evaluate(argStr => {
        const { viddyWell } = libViddy
        const [args] = libViddy.unserialize(argStr)
        return viddyWell.forCta(...args)
      }, serialize(options))
    },

    forInput(...options) {
      return page.evaluate(argStr => {
        const { viddyWell } = libViddy
        const [args] = libViddy.unserialize(argStr)
        return viddyWell.forInput(...args)
      }, serialize(options))
    },

    when(...options) {
      return page
        .evaluate(argStr => {
          const { viddyWell } = libViddy
          const [args] = libViddy.unserialize(argStr)
          return viddyWell.for(...args)
        }, serialize(options))
        .then(MaybePopulatedArray.of)
    },

    whenCta(...options) {
      return page
        .evaluate(argStr => {
          const { viddyWell } = libViddy
          const [args] = libViddy.unserialize(argStr)
          return viddyWell.forCta(...args)
        }, serialize(options))
        .then(MaybePopulatedArray.of)
    },

    whenInput(...options) {
      return page
        .evaluate(argStr => {
          const { viddyWell } = libViddy
          const [args] = libViddy.unserialize(argStr)
          return viddyWell.forInput(...args)
        }, serialize(options))
        .then(MaybePopulatedArray.of)
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
    // console.log('viddy helpers already injected')
    return
  }
  const viddyPath = path.dirname(require.resolve('../../'))
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
