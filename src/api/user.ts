import request from '@/utils/request'
import type {
  UserProfileInfo,
  UserPasswordSubmit,
  UserLendTableData,
  UserLendHistoryTableData
} from '@/types/user'
import type { Result, PageForm, PageResult } from '@/types/common'

// 获取用户信息
export const getUserProfile = () => {
  return request.get<Result<UserProfileInfo>>('/user/profile')
}

// 更新用户信息
export const updateUserProfile = (data: UserProfileInfo) => {
  return request.put<Result<void>>('/user/profile', data)
}

// 修改密码
export const updateUserPassword = (data: UserPasswordSubmit) => {
  return request.patch<Result<void>>('/user/profile/password', data)
}

// 分页查询我的借阅
export const getUserLendList = (params: PageForm) => {
  return request.get<Result<PageResult<UserLendTableData[]>>>('/user/profile/my-lend', { params })
}

// 分页查询历史借阅
export const getUserLendHistoryList = (params: PageForm) => {
  return request.get<Result<PageResult<UserLendHistoryTableData[]>>>('/user/profile/history', {
    params
  })
}
