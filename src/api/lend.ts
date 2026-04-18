import request from '@/utils/request'
import type { Result, PageResult } from '@/types/common'
import type {
  LendDataCount,
  LendHistoryDataCount,
  MyLendTableData,
  SearchLendForm,
  MyLendHistoryTableData
} from '@/types/lend'

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

/**
 * 获取历史借阅统计信息
 */
export const getLendHistoryDataCount = () => {
  return request.get<Result<LendHistoryDataCount>>('/lend/my-lend/history/data')
}

/**
 * 获取历史借阅记录
 */
export const pageQueryLendHistoryList = (params: SearchLendForm) => {
  return request.get<Result<PageResult<MyLendHistoryTableData[]>>>('/lend/my-lend/history', {
    params
  })
}
