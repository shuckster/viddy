<h1 align="center"><code>viddy</code> 🍊</h1>

<p align="center">
  <a href="https://github.com/shuckster/viddy/blob/master/LICENSE">
    <img
      alt="MIT license"
      src="https://img.shields.io/npm/l/viddy?style=plastic"
    /></a>
  <a href="https://bundlephobia.com/result?p=viddy">
    <img
      alt="npm bundle size"
      src="https://img.shields.io/bundlephobia/minzip/viddy?style=plastic"
    /></a>
  <a href="https://www.npmjs.com/package/viddy">
    <img
      alt="Version"
      src="https://img.shields.io/npm/v/viddy?style=plastic"
    /></a>
</p>

Find DOM selectors using an expressive query syntax, extract text and monitor changes. Viddy was written to help write E2E UI tests that reflect user-behaviour, and there's a handy integration for [Puppeteer](https://github.com/shuckster/viddy/wiki/Puppeteer-Integration).

```js
<body>
  <h1>A Strange Man</h1>
  <p>"Munchy-wunching lomticks of toast"</p>
</body>

viddy.for('lomticks of toast', { near: 'a strange man' })
// => 'body p'
```

Search by text, regular-expression, relative visual position, containment, and target parent nodes.

```js
viddy.forCta(/click here/i, { leftOf: 'heading' })
viddy.forInput('last name:', { below: 'first name' })
```

You can match/extract text, too:

```js
viddy.hasContent('lorum ipsum') // => false
viddy.matchText(/\d+\.\d+/, { rightOf: 'total' }) // => '1.99'
```

There's a helper that will resolve a `Promise` when DOM-updates have idled for a moment:

```js
viddy.waitForDomToIdle({ withinMs: 500 })
```

- 👀 [Overview](#overview)
- 📖 [Documentation](https://github.com/shuckster/viddy/wiki)
- 🤡 [Puppeteer integration](https://github.com/shuckster/viddy/wiki/Puppeteer-Integration)
- 📀 [Install / Use](#install--use)
- ✍️ [Credits](#credits)

## Overview

```js
import { viddy, viddyWell } from 'viddy'

// query (the following two are identical)
let sel = viddy.for('lomticks of toast')
let sel = viddy.for({ pattern: 'lomticks of toast' })

// query + specificity
let sel = viddy.for(/symphony: \d+/i, {
  leftOf: 'the fifth'
})

// target a parent element
let sel = viddy.for({
  pattern: /open/,
  near: 'your account',
  pickParent: 'button'
})
// The above will return:
// div > button > span > "Open"
//       ^^^^^^
// ...instead of the span.
```

The positional and containment options (`near`, `above`, `below`, `rightOf`, `leftOf`, `containedBy`) can be combined and/or compounded:

```js
let sels = viddyWell.for({
  pattern: /open/,
  near: {
    pattern: 'your account',
    rightOf: 'blog title',
    near: 'settings'
  }
})

// viddyWell returns an array of all matching selectors
```

View the [query specification](https://github.com/shuckster/viddy/wiki#query-specification).

## Install / Use

```
$ pnpm i viddy
```

```js
// ESM:
import { viddy, viddyWell } from 'viddy'

// CJS:
const { viddy, viddyWell } = require('viddy')
```

```html
<!-- Browser/UMD: -->
<script src="https://unpkg.com/viddy/dist/browser/viddy.browser.js"></script>
<script>
  const { viddy, viddyWell } = libViddy
</script>
```

# Credits

`viddy` was written by [Conan Theobald](https://github.com/shuckster/).

I hope you found it useful! If so, I like [coffee ☕️](https://www.buymeacoffee.com/shuckster) :)

## License

MIT licensed: See [LICENSE](LICENSE)
