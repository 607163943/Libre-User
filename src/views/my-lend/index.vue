<script setup lang="ts">
import { ref } from 'vue'
import MyLendTab from './MyLendTab.vue'
import MyLendHistoryTab from './MyLendHistoryTab.vue'

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

    <MyLendHistoryTab v-else-if="activeTab === 'history'" />
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

/* 图标设定 */
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

/* 字体设定 */
.font-body {
  font-family: 'Inter', sans-serif;
}
.font-headline {
  font-family: 'Manrope', sans-serif;
}
</style>
