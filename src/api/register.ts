import request from '@/utils/request'
import type { RegisterSubmitForm } from '@/types/register'
import type { Result } from '@/types/common'
/**
 * 用户注册
 * @param data 注册表单
 * @returns Promise<Result<null>>
 */
export const register = (data: RegisterSubmitForm) => {
  return request.post<Result<null>>('/register', data)
}
