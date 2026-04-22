<script setup lang="ts">
import type { HomeTopLendBookItem } from '@/types/home'
const defaultUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuArFWzG46bx0mbdm4-Tz5bfN5S-Tumrb5G_noHTkH1dCVm6NdN60lvevKSM7vz_OBWEfZD8E7OXTuURfDL7z0ekkZybYRVRowfQmmU3H3TqYCpiFjFe8BSC-YYk07UqYY_Qm96_nKogl_GCHbC3eMfz9uE6vgVcvCAGa_ce7DidszFMiFXAJl0yjFX3bXMCPLIs1AVzKsmlMvg9y0yqoS_lVARDu-E1wfcfvIJQIMSd2rcptDW0mWh_L1zT-JmsxJccpXJu6nCzx4g'

const { book } = defineProps<{ book: HomeTopLendBookItem }>()
</script>
<template>
  <div
    @click="$router.push({ name: 'BookDetail', params: { id: book.id } })"
    class="flex items-center gap-4 p-3 rounded hover:bg-slate-50 transition-colors group cursor-pointer"
  >
    <div class="w-12 h-16 bg-slate-200 rounded shadow-sm overflow-hidden flex-shrink-0">
      <img :src="book.coverUrl || defaultUrl" class="w-full h-full object-cover" />
    </div>
    <div class="flex-grow">
      <h3 class="text-sm font-bold text-on-surface leading-snug">{{ book.bookName }}</h3>
      <p class="text-xs text-on-surface-variant">{{ book.authorName }} · {{ book.publishDate }}</p>
    </div>
    <div class="text-right">
      <span class="text-xs font-medium text-on-surface-variant">{{ book.lendCount }} 次</span>
    </div>
  </div>
</template>
