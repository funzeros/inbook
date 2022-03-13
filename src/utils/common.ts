import { isArrayLike } from 'lodash-unified'

export const sleep = (time = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const between = (value: number, min: number, max: number, edge = true) => {
  return edge ? value >= min && value <= max : value > min && value < max
}

export const isMin = (v: string | number | never[], m: number) => {
  return (isArrayLike(v) ? v.length : v) < m
}
export const isMax = (v: string | number | never[], m: number) => {
  return (isArrayLike(v) ? v.length : v) > m
}
