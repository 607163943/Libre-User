import type { PageForm } from './common'

export interface searchMessageForm extends PageForm {
  type: number
}

export interface MessageItem {
  id: number
  content: string
  title: string
  createTime: string
  isRead: number
  type: number
}

export interface MessageDetail {
  id: number
  content: string
  title: string
  createTime: string
  type: number
}
