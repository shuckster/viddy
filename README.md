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
viddy.valueOf('Country:')
viddy.selectorOf(/click/i, { below: 'your account' })
viddy.for({ selector: 'p', near: 'news at 11' })
viddy.waitForValue('mr sniffs', 'Name:', {
  timeoutInMs: 5000
})
```

Search by text, regular-expression, relative visual position, containment, and target parent nodes.

Helps with writing UI tests that reflect user-behaviour.

Integrates with [Puppeteer](#puppeteer-integration).

- [Overview](#overview)
- [API](#api)
- [Install](#install)
- [Query examples](#query-examples)
- [Query specification](#query-specification)
- [Puppeteer integration](#puppeteer-integration)
- [Credits](#credits)

## Overview:

```js
import { viddy, viddyWell } from 'viddy'

// pattern
let el = viddy.for('lomticks of toast')

// pattern + specificity
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

## API:

- `viddy` methods return a single result, or `undefined`.
- `viddyWell` returns an array of results in order of likeliness.

Nearly all API methods share the same function signature:

| methods                          | resolves query to                                                                                                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `viddy.for(...)`                 | a DOM element                                                                                                                                                                       |
| `viddy.forInput(...)`            | same as `viddy.for`, but prefers `input`, `select`, and `textarea` elements                                                                                                         |
| `viddy.selectorOf(...)`          | a unique CSS selector that points to the element                                                                                                                                    |
| `viddy.valueOf(...)`             | uses `viddy.forInput` to find an input and return its value                                                                                                                         |
| `viddy.waitFor(...)`             | Promise that returns a CSS selector, waiting first for the element to appear in the DOM if necessary, within a timeout set with option `{ timeoutInMs }` that defaults to 5 seconds |
| `viddy.waitForValue(value, ...)` | Waits for a form input with the specified value, resolves a Promise with its CSS selector if found                                                                                  |
| `viddy.waitForIdle(...)`         | Waits for the DOM to stop updating within 500ms, timing out after 5 seconds. Change these with { withinMs: 500, timeoutInMs: 5000 } options                                         |
| `viddy.innerText(...)`           | Extract the innerText of an element                                                                                                                                                 |
| `viddy.matchText(...)`           | innerText, or, if a RegExp is used, the portion of text matching it will be returned. If capture-groups are specified in the RegExp, the full match-array will be returned          |
| `viddy.hasContent(...)`          | true/false (for both `viddy`/`viddyWell`)                                                                                                                                           |

Note that the `viddy.waitForValue()` signature differs in that a string/RegExp value is expected as the first argument, eg:

```js
const css = await viddy.waitForValue('uk', 'Country:')
// select#country
```

## Install:

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

# Query examples:

```js
// Get the most likely match (or undefined
// if nothing found)
viddy.for({
  pattern: /regexp/,
  above: { pattern: 'title' }
})

viddy.for({
  selector: 'p > a',
  below: { pattern: /regexp/ }
})

// Except for `selector` and `pickParent`,
// a string or RegExp implies { pattern }
viddy.for('text')
viddy.for(/regex/)
viddy.for('text', { leftOf: 'title' })
viddy.for('text', { rightOf: /regexp/ })
viddy.for('text', { containedBy: { selector: 'p' } })

// Return an ancestor using `pickParent`:
viddy.for('text', { pickParent: 'button' })
// body > button > span with "text"
//        \__returns the button

// Combos!
viddy.for('text', {
  near: 'this',
  containedBy: {
    selector: 'p',
    below: ['that', { near: 'title' }]
  },
  pickParent: 'p'
})
```

## Query specification:

`viddy` accepts objects in the following format:

```js
Query {
  pattern: String|RegExp
  selector: CSSSelectorString
  pickParent: CSSSelectorString
  near: Query
  above: Query
  below: Query
  leftOf: Query
  rightOf: Query
  containedBy: Query
}
```

More detail in the [index.d.ts](./index.d.ts) file.

| props         | used for                                                                                 |
| ------------- | ---------------------------------------------------------------------------------------- |
| `pattern`     | Visible innerText to search. If a string, the match will be case-insensitive             |
| `selector`    | You can use a regular CSS selector instead of `pattern` (but not in conjunction with it) |
| `near`        | Filter elements by how close they are to this one                                        |
| `above`       | Choose only elements above this one                                                      |
| `below`       | Choose only elements below this one                                                      |
| `leftOf`      | Choose only elements to the left of this one                                             |
| `rightOf`     | Choose only elements to the right of this one                                            |
| `containedBy` | Choose only elements that are contained within this one                                  |
| `pickParent`  | Walk up the DOM tree from the result and return the parent that matches this selector    |

Either `pattern` OR `selector` can be specified, not both.

```js
viddy.for({
  pattern: 'this',
  near: {
    pattern: 'that',
    containedBy: {
      selector: 'div',
      below: 'title'
    }
  },
  pickParent: 'p'
})

// Alternative syntax for the above:
viddy.for('this', {
  near: [
    'that',
    {
      containedBy: { selector: 'div', below: 'title' }
    }
  ],
  pickParent: 'p'
})
```

## Puppeteer integration:

`viddyIn` will inject the `viddy` API into a [Puppeteer](https://github.com/puppeteer/puppeteer) `page`. Essentially, it just drops the browser-build of `viddy` into the page you want and offers some wrappers around `page.evaluate()` to access the API.

The [test suite](./tests/) uses it, so you can take a look there if you want to see some working examples.

Unlike the core `viddy` API, the Puppeteer methods will _all_ return `Promises`, and with the exception of `.hasContent()` will reject with an error if they fail.

Use `viddyWellIn` to access the array-returning versions. (These do not reject, but instead resolve their Promises to empty arrays when they fail.)

```js
const { viddyIn /*, viddyWellIn */ } = require('viddy/puppeteer')

async(() => {
  let browser = await puppeteer.launch()
  let page = await browser.newPage()
  let viddy = await viddyIn(page)

  await viddy.hasContent('hello')
  // true | false

  await viddy.innerText('hello')
  // "hello, world!"

  const sel = await viddy.selectorOf(/click here/i, {
    above: 'title'
  })

  // ^ Unique selector of the first match in the page
  // Since it returns a selector, you can use it with
  // other Puppeteer methods like page.click:

  await page.click(sel)

  await viddy
    .waitFor(/click here/i, { below: 'title' })
    .then(sel => page.click(sel))

  // ^ waitFor() returns a selector just like
  // selectorOf() but it'll wait up to 5
  // seconds for the page to contain the query
  // if it doesn't exist

  // Change the timeout like this:
  viddy.waitFor.timesOutAfterMs(1000) // 1 second

  // Or specify an ad-hoc timeout in the Query object:
  await viddy.waitFor(/click here/i, {
    below: 'title',
    timoutInMs: 1000
  })

  let result = await viddy.matchText(/\d+\.\d+/, {
    near: 'again'
  })

  // ^ If matchText pattern is a RegExp, only the text
  // matching it will be returned. If it's a RegExp
  // with capture-groups, the full result-array
  // will be returned. If the pattern is a string,
  // the full innerText will be returned

  // With our powers combined:
  await viddy
    .selectorOf(/click here/i, { below: 'title' })
    .then(sel => page.click(sel))
    .then(() => viddy.waitFor(/\d+\.\d+/, { timeoutInMs: 2000 }))
    .then(sel => viddy.innerText({ selector: sel }))
    .then(console.log)

  await browser.close()
})()
```

# Credits

`viddy` was written by [Conan Theobald](https://github.com/shuckster/).

I hope you found it useful! If so, I like [coffee ☕️](https://www.buymeacoffee.com/shuckster) :)

## License

MIT licensed: See [LICENSE](LICENSE)
