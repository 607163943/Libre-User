export interface HomeUserLendTotal {
  lendCount: number
  soonOverdueCount: number
  overdueCount: number
}

export interface HomeTopLendBookItem {
  id: number
  bookName: string
  authorName: string
  coverUrl: string
  publishDate: string
  lendCount: number
}

export interface HomeTopLendBook {
  homeTopLendBookItemList: HomeTopLendBookItem[]
}

export interface HomeTopLatestBookItem {
  id: number
  bookName: string
  authorName: string
  coverUrl: string
  publishDate: string
  createTime: string
}

export interface HomeTopLatestBook {
  homeTopLatestBookItemList: HomeTopLatestBookItem[]
}
