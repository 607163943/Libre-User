import request from '@/utils/request'
import type { SearchForm, SearchBook } from '@/types/search'
import type { PageResult, Result } from '@/types/common'

/**
 * 搜索图书
 * @param form 搜索表单
 * @returns 搜索结果
 */
export const searchBooks = (form: SearchForm) => {
  return request.get<Result<PageResult<SearchBook[]>>>('/search', {
    params: form
  })
}
