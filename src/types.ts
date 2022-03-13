import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void
export declare interface R<T> {
  code: number
  message: string
  data: T
}
