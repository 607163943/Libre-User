import type { PageForm } from './common'

export interface LendDataCount {
  currentLendCount: number
  overdueLendCount: number
  soonOverdueLendCount: number
}

export interface LendHistoryDataCount {
  lendCount: number
  overdueLendCount: number
}

export interface SearchLendForm extends PageForm {
  keyword: string
  startDate: string
  endDate: string
}

export interface MyLendTableData {
  id: number
  bookName: string
  bookUrl: string
  authorName: string
  publisherName: string
  isbn: string
  lendTime: string
  dueTime: string

  // UI计算数据
  remaining: number
  isOverdue: boolean
  isCritical: boolean
  percent: number
}

export interface MyLendHistoryTableData {
  id: number
  bookName: string
  bookUrl: string
  authorName: string
  publisherName: string
  isbn: string
  lendTime: string
  returnTime: string
  state: number
}
