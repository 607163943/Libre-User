<script setup lang="ts">
import type { LendHistoryDataCount } from '@/types/lend'

const { historyStats } = defineProps<{ historyStats: LendHistoryDataCount }>()
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div
      class="bg-surface-container-lowest hover:bg-surface-container-low p-6 rounded-lg transition-all border-l-4 border-slate-300 shadow-sm group"
    >
      <p class="text-sm font-medium text-on-surface-variant mb-1">累计借阅</p>
      <div class="flex items-end gap-2">
        <span class="text-3xl font-bold font-headline text-slate-700">
          {{ historyStats.lendCount }}
        </span>
        <span class="text-xs text-slate-500 mb-1.5 font-semibold"> 本书籍 </span>
      </div>
    </div>

    <div
      class="bg-surface-container-lowest hover:bg-surface-container-low p-6 rounded-lg transition-all border-l-4 border-error/20 shadow-sm"
    >
      <p class="text-sm font-medium text-on-surface-variant mb-1">共</p>
      <div class="flex items-end gap-2">
        <span class="text-3xl font-bold font-headline text-error">{{
          historyStats.overdueLendCount
        }}</span>
        <span class="text-xs text-error mb-1.5 font-semibold">本借阅书籍逾期归还</span>
      </div>
    </div>
  </div>
</template>
