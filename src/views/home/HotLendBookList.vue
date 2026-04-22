<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTopLendBook } from '@/api/home'
import type { HomeTopLendBook } from '@/types/home'
import HotLendBookItem from './HotLendBookItem.vue'

// 热门借阅书籍
const trendingBooks = ref<HomeTopLendBook>({
  homeTopLendBookItemList: []
})

/**
 * 获取热门借阅书籍
 */
const handleTopLendBook = () => {
  getTopLendBook()
    .then((res) => {
      trendingBooks.value = res.data.data
    })
    .catch((error) => console.log(error))
}

onMounted(() => {
  handleTopLendBook()
})
</script>
<template>
  <!-- 热门借阅图书列表 -->
  <div class="bg-white rounded-lg overflow-hidden flex flex-col shadow-sm">
    <div class="p-6 pb-0 flex items-center justify-between">
      <h2 class="text-xl font-headline font-bold text-on-surface">热门借阅 (Trending)</h2>
    </div>
    <div class="p-6 flex flex-col gap-3">
      <HotLendBookItem
        v-for="book in trendingBooks.homeTopLendBookItemList"
        :key="book.id"
        :book="book"
      />
    </div>
  </div>
</template>
