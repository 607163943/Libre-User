<script setup lang="ts">
import { ref } from 'vue'
import MyLendTab from './my-lend-tab/index.vue'
import HistoryTab from './history-tab/index.vue'

type TabType = 'current' | 'history'

// 页面状态
const activeTab = ref<TabType>('current')
</script>

<template>
  <main class="pt-8 pb-16 px-6 max-w-7xl mx-auto flex-grow w-full space-y-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="max-w-2xl border-l-4 border-primary pl-6">
        <h1 class="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">
          {{ activeTab === 'current' ? '我的借阅' : '借阅历史' }}
        </h1>
      </div>

      <div class="flex bg-surface-container-low p-1 rounded-lg shrink-0">
        <button
          @click="activeTab = 'current'"
          :class="
            activeTab === 'current'
              ? 'bg-surface-container-lowest text-primary shadow-sm'
              : 'text-on-surface-variant hover:text-primary'
          "
          class="px-6 py-2 text-sm font-semibold rounded-lg transition-all"
        >
          我的借阅
        </button>
        <button
          @click="activeTab = 'history'"
          :class="
            activeTab === 'history'
              ? 'bg-surface-container-lowest text-primary shadow-sm'
              : 'text-on-surface-variant hover:text-primary'
          "
          class="px-6 py-2 text-sm font-semibold rounded-lg transition-all"
        >
          借阅历史
        </button>
      </div>
    </div>
    <MyLendTab v-if="activeTab === 'current'" />

    <HistoryTab v-else-if="activeTab === 'history'" />
  </main>
</template>

<style scoped></style>
