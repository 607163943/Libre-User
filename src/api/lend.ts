import request from '@/utils/request'
import type { Result, PageResult } from '@/types/common'
import type { LendDataCount, MyLendTableData, SearchLendForm } from '@/types/lend'

/**
 * 借阅图书
 * @param bookId 图书ISBN
 * @returns 借阅结果
 */
export const lendBook = (bookId: number) => {
  return request.post<Result<void>>(`/lend/${bookId}`)
}

/**
 * 归还图书
 */
export const returnBook = (bookId: number) => {
  return request.patch<Result<void>>(`/lend/return/${bookId}`)
}

/**
 * 获取借阅统计信息
 */
export const getLendDataCount = () => {
  return request.get<Result<LendDataCount>>('/lend/my-lend/data')
}

/**
 * 获取借阅记录
 */
export const pageQueryLendList = (params: SearchLendForm) => {
  return request.get<Result<PageResult<MyLendTableData[]>>>('/lend/my-lend', { params })
}

/**
 * 续借图书
 */
export const renewBook = (bookId: number) => {
  return request.patch<Result<void>>(`/lend/renew/${bookId}`)
}
