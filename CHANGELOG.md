# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

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
