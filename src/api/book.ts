import request from '@/utils/request'
import type { BookDetail } from '@/types/book'
import type { Result } from '@/types/common'

/**
 * 获取书籍详情
 * @param id 书籍ID
 * @returns
 */
export const getBookDetail = (id: number) => {
  return request.get<Result<BookDetail>>(`/book/${id}`)
}
