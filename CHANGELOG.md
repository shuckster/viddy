# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## [3.0.0] - 2025-05-24

### Added 

- PlayWright integration

## [2.2.3] - 2023-09-10

### Changed

- Performance improvement for `for*`/`waitFor*` methods

## [2.2.2] - 2023-05-09

### Fixed

- Puppeteer types for `when`/`whenCta`/`whenInput`

## [2.2.0] - 2023-03-15

### Added

- New `when`/`whenCta`/`whenInput` APIs for branching logic. They accept queries like `for`/`forCta`/`forInput`, but return an object with `exists`, `absent`, and `valueOf` methods:

```js
let result = viddy
  .when('Country:')
  .exists(sel => `found: ${sel}`)
  .absent(() => 'sorry, not found')
  .valueOf()
```

For the Puppeteer integration:

```js
let result = (await viddy.when('Country:'))
  .exists(sel => `found: ${sel}`)
  .absent(() => 'sorry, not found')
  .valueOf()

// Or...
await viddy.when('Country:').then(({ exists, absent }) => {
  exists(sel => console.log(`found: ${sel}`))
  absent(() => console.log('sorry, not found'))
})
```

Available in both `viddy` and `viddyWell`.

### Updated

- Use `@medv/finder` for CSS selector generation, replacing `optimal-select`

## [2.1.1] - 2023-03-04

### Updated

- README fix

## [2.1.0] - 2023-03-04

### Added

- Exports `selectorOfElement`

### Updated

- README tweaks, typo fix

### Fixed

- `installChangeListeners` should clean-up debounce timer

## [2.0.3] - 2022-11-03

### Updated

- README tweaks

## [2.0.1] - 2022-10-19

### Fixed

- Fix typedefs

## [2.0.0] - 2022-10-19

### Changed

BREAKING CHANGES

- `selectorOf` has been removed, and `for`, `forCta`, and `forInput` have all been updated to return CSS selector strings instead of DOM elements. Pass the result to `document.querySelector` to get the element.

- `waitForIdle` has been renamed `waitForDomToIdle` to better describe its behaviour.

### Added

- Puppeteer integration is now at parity with regular API, as it now supports `for`, `forCta`, `forInput`, and removes `selectorOf`.

### Fixed

- If the positional selectors `above`, `below`, `leftOf`, and `rightOf` could not find a match, the main query would often still incorrectly return an element/selector.

- Puppeteer integration API calls were not throwing correct error messages due to `new` not being used before `throw`.

## [1.5.0] - 2022-06-14

### Updated

- Use `optimal-select` for more reliable CSS selector generation

## [1.4.1] - 2022-05-07

### Updated

- README tweaks after Wiki added

## [1.4.0] - 2022-04-30

### Updated

- Permit `selector` to be used in combination with `pattern`

## [1.3.4] - 2022-04-15

### Removed / Fixed

- Remove `browser` setting from `package.json`; seems to cause issues with CodeSandbox build process, and isn't really necessary since the browser-build is something that's interacted with manually.

## [1.3.3] - 2022-04-11

### Added

- Really add `viddy.waitForCta` to README

## [1.3.1] - 2022-04-10

### Added

- Add `viddy.forCta` + `viddy.waitForCta` to README

## [1.3.0] - 2022-04-10

### Added

- Call-to-action specific APIs: `viddy.forCta` + `viddy.waitForCta`. Tries to target only buttons and anchors.

## [1.2.2] - 2022-04-01

### Fixed

- JSDoc: remove HTML tags from description as they interfere with VS Code autocompletion

## [1.2.1] - 2022-03-31

### Fixed

- viddy.matchText() had wrong typedef, documentation

## [1.2.0] - 2022-03-31

### Updated

- viddy.matchText() at top of README
- JSDoc for all API methods

## [1.1.2] - 2022-03-30

### Fixed

- viddy.waitForIdle() was not accepting user-defined timeoutInMs

## [1.1.1] - 2022-03-30

### Update

- index.d.ts updates for viddy.waitForIdle()

## [1.1.0] - 2022-03-30

### Added

- viddy.waitForIdle()

```js
// Returns Promise that resolves when DOM updates stop
// happening within 500ms, timing out after 5 seconds
viddy.waitForIdle()

// Change timeouts:
viddy.waitForIdle({ withinMs: 500, timeoutInMs: 5000 })

// Restrict idle-monitoring to a specific element using
// a regular viddy query:
viddy.waitForIdle('main menu', { pickParent: 'nav' })
```

## [1.0.2] - 2022-03-30

### Fixed

- Respect timeoutInMs in waitForValue in shorthand call-signature:

```js
viddy.waitForValue('value', 'Label:', { timeoutInMs: 1000 })
```

## [1.0.1] - 2022-03-30

### Updated

- README link, add Puppeteer keyword

## [1.0.0] - 2022-03-29

### Added

- viddy :)
