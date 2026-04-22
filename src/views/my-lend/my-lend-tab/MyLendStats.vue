<script setup lang="ts">
import type { LendDataCount } from '@/types/lend'
// --- 当前借阅数据 ---
const { currentStats } = defineProps<{
  currentStats: LendDataCount
}>()
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="bg-surface-container-lowest hover:bg-surface-container-low p-6 rounded-lg transition-all border-l-4 border-slate-300 shadow-sm group"
    >
      <p class="text-sm font-medium text-on-surface-variant mb-1">总借阅</p>
      <div class="flex items-end gap-2">
        <span class="text-3xl font-bold font-headline text-slate-700">
          {{ currentStats.currentLendCount }}
        </span>
        <span class="text-xs text-slate-500 mb-1.5 font-semibold"> 本书籍正在借阅 </span>
      </div>
    </div>
    <div
      class="bg-surface-container-lowest hover:bg-surface-container-low p-6 rounded-lg transition-all border-l-4 border-error/20 shadow-sm"
    >
      <p class="text-sm font-medium text-on-surface-variant mb-1">逾期</p>
      <div class="flex items-end gap-2">
        <span class="text-3xl font-bold font-headline text-error">{{
          currentStats.overdueLendCount
        }}</span>
        <span class="text-xs text-error mb-1.5 font-semibold">本借阅书籍已逾期</span>
      </div>
    </div>
    <!-- 即将逾期需要使用黄色警告进行修饰 -->
    <div
      class="bg-surface-container-lowest hover:bg-surface-container-low p-6 rounded-lg transition-all border-l-4 border-amber-500/20 shadow-sm group"
    >
      <p class="text-sm font-medium text-on-surface-variant mb-1">即将逾期</p>
      <div class="flex items-end gap-2">
        <span class="text-3xl font-bold font-headline text-amber-600">
          {{ currentStats.soonOverdueLendCount }}
        </span>
        <span class="text-xs text-amber-600 mb-1.5 font-semibold"> 本借阅书籍即将逾期 </span>
      </div>
    </div>
  </div>
</template>
