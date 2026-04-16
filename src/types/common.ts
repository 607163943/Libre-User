export interface Result<T> {
  code: number
  data: T
  msg: string
}

export interface PageResult<T> {
  data: T
  total: number
}

export interface PageForm {
  page: number
  pageSize: number
}
