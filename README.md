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

Find DOM elements using an expressive query syntax, extract text and monitor changes.

```js
viddy.for({ selector: 'p', near: 'news at 11' })
viddy.forCta('click here', { leftOf: 'heading' })
viddy.valueOf('country:')
viddy.selectorOf('logout', { below: 'your account' })
viddy.matchText(/\d+\.\d+/, { rightOf: 'total' })
viddy.waitForIdle({ withinMs: 500 })
viddy.waitForValue('mr sniffs', 'Name:', {
  timeoutInMs: 5000
})
```

Search by text, regular-expression, relative visual position, containment, and target parent nodes.

Helps with writing UI tests that reflect user-behaviour.

Integrates with [Puppeteer](https://github.com/shuckster/viddy/wiki/Puppeteer-Integration).

- 👀 [Overview](#overview)
- 📖 [Documentation](https://github.com/shuckster/viddy/wiki)
- 🤡 [Puppeteer integration](https://github.com/shuckster/viddy/wiki/Puppeteer-Integration)
- ✍️ [Credits](#credits)

## Overview

```js
import { viddy, viddyWell } from 'viddy'

// query
let el = viddy.for('lomticks of toast')

// query + specificity
let el = viddy.for(/symphony: \d+/i, {
  leftOf: 'the fifth'
})

// target a parent element of your query
let el = viddy.for({
  pattern: /open/,
  near: 'your account',
  pickParent: 'button'
})
```

The positional and containment options (`near`, `above`, `below`, `rightOf`, `leftOf`, `containedBy`) can be combined and/or compounded:

```js
let els = viddyWell.for({
  pattern: /open/,
  near: {
    pattern: 'your account',
    rightOf: 'blog title',
    near: 'settings'
  }
})
```

View the [query specification](https://github.com/shuckster/viddy/wiki#query-specification).

## Install

```
$ pnpm i viddy
```

```js
// ESM:
import { viddy } from 'viddy'

// CJS:
const { viddy } = require('viddy')
```

```html
<!-- Browser/UMD: -->
<script src="https://unpkg.com/viddy/dist/browser/viddy.browser.js"></script>
<script>
  const { viddy } = libViddy
</script>
```

# Credits

`viddy` was written by [Conan Theobald](https://github.com/shuckster/).

I hope you found it useful! If so, I like [coffee ☕️](https://www.buymeacoffee.com/shuckster) :)

## License

MIT licensed: See [LICENSE](LICENSE)
