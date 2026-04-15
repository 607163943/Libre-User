import request from '@/utils/request'
import type { HomeUserLendTotal, HomeTopLendBook, HomeTopLatestBook } from '@/types/home'
import type { Result } from '@/types/common'

/**
 * 获取用户借阅统计
 * @returns Promise<HomeUserLendTotal>
 */
export const getUserLendTotal = () => {
  return request.get<Result<HomeUserLendTotal>>('/home/user/lend/total')
}

/**
 * 获取热门借阅书籍
 * @returns Promise<HomeTopLendBook>
 */
export const getTopLendBook = () => {
  return request.get<Result<HomeTopLendBook>>('/home/top/lend/book')
}

/**
 * 获取最新入馆书籍
 * @returns Promise<HomeTopLatestBook>
 */
export const getTopLatestBook = () => {
  return request.get<Result<HomeTopLatestBook>>('/home/top/latest/book')
}
