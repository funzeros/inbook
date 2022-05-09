interface IObj {
  [k: string]: unknown
  [k: number]: unknown
}

interface R<T> {
  code: number
  message: string
  data: T
}

type PageParams<T = IObj> = {
  page: number
  pageSize: number
} & Partial<T>

interface PageResult<T = IObj> {
  page: number
  pageSize: number
  records: UnwrapRefSimple<T[]>
  total: number
}

type PageResultKey = keyof PageResult

type PageFn<T = IObj> = (data: PageParams) => Promise<R<PageResult<T>>>

type strnum = string | number
