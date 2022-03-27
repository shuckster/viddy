import { isString } from 'match-iz'

export const ascending = prop =>
  isString(prop) ? (a, b) => a[prop] - b[prop] : (a, b) => a - b

export const descending = prop =>
  isString(prop) ? (a, b) => b[prop] - a[prop] : (a, b) => b - a
