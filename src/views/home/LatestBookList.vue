<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTopLatestBook } from '@/api/home'
import type { HomeTopLatestBook } from '@/types/home'
import LatestBookItem from './LatestBookItem.vue'
// 最新入馆书籍
const newArrivals = ref<HomeTopLatestBook>({
  homeTopLatestBookItemList: []
})

// 生命周期
onMounted(() => {
  getTopLatestBook()
    .then((res) => {
      newArrivals.value = res.data.data
    })
    .catch((error) => console.log(error))
})
</script>
<template>
  <!-- 最新入馆图书列表 -->
  <div class="bg-white rounded-lg overflow-hidden flex flex-col shadow-sm">
    <div class="p-6 pb-0 flex items-center justify-between">
      <h2 class="text-xl font-headline font-bold text-on-surface">最新入馆 (New Arrivals)</h2>
    </div>
    <div class="p-6 flex flex-col gap-3">
      <LatestBookItem
        v-for="book in newArrivals.homeTopLatestBookItemList"
        :key="book.id"
        :book="book"
      />
    </div>
  </div>
</template>
