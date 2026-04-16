import type { PageForm } from './common'

export interface SearchBook {
  id: number
  bookName: string
  authorName: string
  publisherName: string
  isbn: string
  coverUrl: string
  publishDate: string
  state: number
  dueTime: string
}

export interface SearchForm extends PageForm {
  keyword: string
  isDateSort: number
  state: number | null
}
