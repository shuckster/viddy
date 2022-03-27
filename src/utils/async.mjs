export function makeDeferredPromise() {
  let _resolve, _reject
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
  return [promise, _resolve, _reject]
}

export function makeDebouncer(ms, fn) {
  const [run, clear] = RunAfter(ms, fn)
  const debouncer = (...args) => (clear(), run(...args))
  return [debouncer, clear]
}

export function RunAfter(ms, fn) {
  let id
  const clear = () => clearTimeout(id)
  const run = (...args) => {
    id = setTimeout(fn, ms, ...args)
  }
  return [run, clear]
}
