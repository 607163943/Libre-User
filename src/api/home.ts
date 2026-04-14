import request from '@/utils/request'
import type { HomeUserLendTotal } from '@/types/home'
import type { Result } from '@/types/common'

/**
 * 获取用户借阅统计
 * @returns Promise<HomeUserLendTotal>
 */
export const getUserLendTotal = () => {
  return request.get<Result<HomeUserLendTotal>>('/home/user/lend/total')
}
