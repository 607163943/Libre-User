<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTopLendBook } from '@/api/home'
import type { HomeTopLendBook } from '@/types/home'

const router = useRouter()

// 热门借阅书籍
const defaultUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuArFWzG46bx0mbdm4-Tz5bfN5S-Tumrb5G_noHTkH1dCVm6NdN60lvevKSM7vz_OBWEfZD8E7OXTuURfDL7z0ekkZybYRVRowfQmmU3H3TqYCpiFjFe8BSC-YYk07UqYY_Qm96_nKogl_GCHbC3eMfz9uE6vgVcvCAGa_ce7DidszFMiFXAJl0yjFX3bXMCPLIs1AVzKsmlMvg9y0yqoS_lVARDu-E1wfcfvIJQIMSd2rcptDW0mWh_L1zT-JmsxJccpXJu6nCzx4g'
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
      <div
        v-for="book in trendingBooks.homeTopLendBookItemList"
        :key="book.id"
        @click="router.push({ name: 'BookDetail', params: { id: book.id } })"
        class="flex items-center gap-4 p-3 rounded hover:bg-slate-50 transition-colors group cursor-pointer"
      >
        <div class="w-12 h-16 bg-slate-200 rounded shadow-sm overflow-hidden flex-shrink-0">
          <img :src="book.coverUrl || defaultUrl" class="w-full h-full object-cover" />
        </div>
        <div class="flex-grow">
          <h3 class="text-sm font-bold text-on-surface leading-snug">{{ book.bookName }}</h3>
          <p class="text-xs text-on-surface-variant">
            {{ book.authorName }} · {{ book.publishDate }}
          </p>
        </div>
        <div class="text-right">
          <span class="text-xs font-medium text-on-surface-variant">{{ book.lendCount }} 次</span>
        </div>
      </div>
    </div>
  </div>
</template>
