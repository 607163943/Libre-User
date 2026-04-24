<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { SearchBook, SearchForm } from '@/types/search'
import { searchBooks } from '@/api/search'
import { useRoute } from 'vue-router'
import SearchList from './SearchList.vue'
import SearchBar from './SearchBar.vue'
import SearchPage from './SearchPage.vue'

const route = useRoute()
const searchForm = ref<SearchForm>({
  keyword: (route.query.q as string) || '',
  isDateSort: 0,
  state: null,
  page: 1,
  pageSize: 10
})

// 正在使用搜索表单
const usingSearchForm = ref<SearchForm>({
  keyword: '',
  isDateSort: 0,
  state: null,
  page: 1,
  pageSize: 10
})
const total = ref(0)

const isSearch = ref(false)
const bookList = ref<SearchBook[]>([])

/**
 * 处理搜索
 */
const handleSearch = () => {
  usingSearchForm.value = { ...searchForm.value }
  searchBooks(searchForm.value)
    .then((res) => {
      isSearch.value = true
      bookList.value = res.data.data.data
      total.value = res.data.data.total
    })
    .catch((error) => console.log(error))
}

onMounted(() => {
  handleSearch()
})

// 刷新搜索结果
const refreshSearch = () => {
  searchBooks(usingSearchForm.value)
    .then((res) => {
      isSearch.value = true
      bookList.value = res.data.data.data
      total.value = res.data.data.total
    })
    .catch((error) => console.log(error))
}
</script>

<template>
  <main class="flex-grow w-full max-w-[1440px] mx-auto px-8 py-6">
    <SearchBar
      v-model:searchForm="searchForm"
      v-model:usingSearchForm="usingSearchForm"
      :total="total"
      :isSearch="isSearch"
      @search="handleSearch"
    />

    <SearchList :bookList="bookList" :refreshSearch="refreshSearch" />

    <SearchPage :total="total" v-model:searchForm="searchForm" @pageChange="handleSearch" />
  </main>
</template>

<style></style>
