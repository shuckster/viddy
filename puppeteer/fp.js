const compose =
  (...fns) =>
  x =>
    fns.reduceRight((acc, fn) => fn(acc), x)

function memo(fn, cache = new Map()) {
  return x => (cache.has(x) ? cache.get(x) : cache.set(x, fn(x)).get(x))
}

function aside(fn) {
  return x => (fn(x), x)
}

const mapOverObjectValues = (obj, fn) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = fn(value, key)
    return acc
  }, {})

//
// Maybe
//

const Identity = x => x

const Nothing = () => ({
  valueOf: () => undefined,
  toString: () => 'Nothing',
  map: () => Nothing(),
  chain: () => Nothing(),
  exists: () => Nothing(),
  fork: (f /*, _*/) => f(),
  orElse: f => f(),
  absent: f => Just(f()),
  ap: () => Nothing()
})

Nothing.of = () => Nothing()

const Just = x => ({
  valueOf: () => x,
  toString: () => `Just(${x})`,
  map: f => Just(f(x)),
  chain: f => f(x),
  exists: f => Just(f(x)),
  fork: (_, g) => g(x),
  orElse: () => Just(x),
  absent: () => Just(x),
  ap: m => m.map(x)
})

Just.of = x => Just(x)

const safe = (predicate = x => x != null) => {
  const Maybe = x => {
    return predicate(x) ? Just(x) : Nothing()
  }
  Maybe.of = x => Maybe(x)
  return Maybe
}

const maybeTry = f => {
  try {
    return Just(f())
  } catch (e) {
    return Nothing()
  }
}

const Maybe = safe()
const MaybePopulatedArray = safe(x => Array.isArray(x) && x.length > 0)

const just = x => () => Just(x)
const nothing = () => () => Nothing()

module.exports = {
  compose,
  memo,
  aside,
  mapOverObjectValues,

  Identity,
  Nothing,
  Just,
  safe,
  maybeTry,
  Maybe,
  MaybePopulatedArray,
  just,
  nothing
}
