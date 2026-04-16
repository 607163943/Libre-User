import request from '@/utils/request'
import type { Result } from '@/types/common'

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
