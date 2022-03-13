export const jointPrefix = <T>(prefix: string, api: T) => {
  return Object.freeze(
    Object.fromEntries(Object.entries(api).map(([k, v]) => [k, `${prefix}${v}`]))
  ) as unknown as Readonly<T>
}
