import request from '@/utils/request'
import type { searchMessageForm, MessageItem, MessageDetail } from '@/types/message'
import type { Result, PageResult } from '@/types/common'

// 获取消息列表
export const getMessageList = (form: searchMessageForm) => {
  return request.get<Result<PageResult<MessageItem[]>>>('/message', {
    params: form
  })
}

// 查看消息
export const getMessageDetail = (id: number) => {
  return request.get<Result<MessageDetail>>(`/message/${id}`)
}

// 统计未读取消息数量
export const getUnreadCount = () => {
  return request.get<Result<number>>(`/message/user/unread`)
}

// 标记全部已读
export const setMessageAllRead = () => {
  return request.put<Result<MessageDetail>>(`/message/read/all`)
}
