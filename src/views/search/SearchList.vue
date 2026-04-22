<script setup lang="ts">
import type { SearchBook } from '@/types/search'
import SearchItem from './SearchItem.vue'
const { bookList, refreshSearch } = defineProps<{
  bookList: SearchBook[]
  refreshSearch: () => void
}>()
</script>
<template>
  <div class="space-y-4">
    <SearchItem v-for="book in bookList" :key="book.isbn" :book="book" @refresh="refreshSearch" />
  </div>
</template>
