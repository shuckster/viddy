export function memo(fn, cache = new Map()) {
  return x => (cache.has(x) ? cache.get(x) : cache.set(x, fn(x)).get(x))
}

export function aside(fn) {
  return x => (fn(x), x)
}

export const mapOverObjectValues = (obj, fn) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = fn(value, key)
    return acc
  }, {})

// Maybe
//

export const Identity = x => x

export const Nothing = () => ({
  valueOf: () => undefined,
  toString: () => 'Nothing',
  map: () => Nothing(),
  chain: () => Nothing(),
  fork: (f /*, _*/) => f(),
  orElse: f => f(),
  ap: () => Nothing()
})

Nothing.of = () => Nothing()

export const Just = x => ({
  valueOf: () => x,
  toString: () => `Just(${x})`,
  map: f => Just(f(x)),
  chain: f => f(x),
  fork: (_, g) => g(x),
  orElse: () => Just(x),
  ap: m => m.map(x)
})

Just.of = x => Just(x)

export const safe = (predicate = x => x != null) => {
  const Maybe = x => {
    return predicate(x) ? Just(x) : Nothing()
  }
  Maybe.of = x => Maybe(x)
  return Maybe
}

export const maybeTry = f => {
  try {
    return Just(f())
  } catch (e) {
    return Nothing()
  }
}

export const Maybe = safe()

export const just = x => () => Just(x)
export const nothing = () => () => Nothing()
