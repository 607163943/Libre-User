<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { getUserLendTotal } from '@/api/home'
import HotLendBookList from './HotLendBookList.vue'
import LatestBookList from './LatestBookList.vue'

const router = useRouter()

interface HomeDataCard {
  label: string
  title: string
  icon: string
  value: number
  unit: string
  color: string
}

// 搜索
const searchQuery = ref<string>('')
// 搜索回调
const onSearch = (searchValue: string) => {
  // 跳转到搜索页并携带查询参数
  router.push({ name: 'Search', query: { q: searchValue } })
}

// 用户借阅统计
const userStore = useUserStore()
const stats = ref<HomeDataCard[]>([
  {
    label: 'Active Loans',
    title: '当前借阅',
    icon: 'book',
    value: 5,
    unit: '当前借阅',
    color: '#005daa'
  },
  {
    label: 'Warning',
    title: '即将逾期',
    icon: 'schedule',
    value: 1,
    unit: '即将逾期',
    color: '#934600'
  },
  {
    label: 'Overdue',
    title: '已逾期',
    icon: 'priority_high',
    value: 0,
    unit: '已逾期',
    color: '#ba1a1a'
  }
])

/**
 * 获取用户借阅统计
 */
const handleUserLendTotal = () => {
  if (!userStore.userInfo) {
    return
  }
  getUserLendTotal().then((res) => {
    stats.value[0]!.value = res.data.data.lendCount
    stats.value[1]!.value = res.data.data.soonOverdueCount
    stats.value[2]!.value = res.data.data.overdueCount
  })
}

onMounted(() => {
  handleUserLendTotal()
})
</script>

<template>
  <main class="flex-grow w-full max-w-[1440px] mx-auto px-8 py-12">
    <header class="mb-16 flex flex-col md:flex-row gap-12">
      <div class="w-full md:w-1/3">
        <h1 class="text-5xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">
          Libre
        </h1>
        <p class="text-on-surface-variant text-sm uppercase tracking-widest font-label">
          图书馆管理系统
        </p>
      </div>
      <div class="flex-grow w-full">
        <a-config-provider
          :theme="{
            components: {
              Input: {
                controlHeight: 60,
                fontSize: 20
              },
              Button: {
                controlHeight: 60,
                fontSize: 20
              }
            }
          }"
        >
          <a-input-search
            v-model:value="searchQuery"
            placeholder="输入书名、作者或 ISBN 开始搜索..."
            @search="onSearch"
            enter-button
            class="libre-search-input"
          >
          </a-input-search>
        </a-config-provider>
      </div>
    </header>

    <!-- 用户借阅统计卡片（登陆后可见） -->
    <section v-if="userStore.userInfo" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <a-card v-for="stat in stats" :key="stat.title" :bordered="false" class="stat-card">
        <div class="flex justify-between items-start mb-4">
          <span class="text-on-surface-variant font-label text-xs uppercase tracking-widest">{{
            stat.label
          }}</span>
          <span class="material-symbols-outlined" :style="{ color: stat.color }">{{
            stat.icon
          }}</span>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-headline font-bold text-on-surface">{{ stat.value }}</span>
          <span class="text-sm text-on-surface-variant">{{ stat.unit }}</span>
        </div>
      </a-card>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 热门借阅图书列表 -->
      <HotLendBookList />

      <LatestBookList />
    </section>
  </main>
</template>

<style scoped>
/* 搜索框深度美化 */
:deep(.libre-search-input .ant-input-wrapper .ant-input-affix-wrapper) {
  background-color: #e0e3e6;
  border: none;
  border-radius: 8px;
  padding-left: 1rem;
  font-size: 1.125rem;
}

:deep(.libre-search-input .ant-input-search-button) {
  border: none;
  background-color: #005daa; /* primary */
  border-radius: 0 8px 8px 0;
}

:deep(.libre-search-input .ant-input-affix-wrapper-focused) {
  box-shadow: 0 0 0 2px rgba(0, 93, 170, 0.2);
  background-color: #ffffff;
}

/* 统计卡片样式微调 */
.stat-card {
  background-color: #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;
}

.stat-card:hover {
  background-color: #e6e8eb; /* surface-container-high */
  transform: translateY(-2px);
}
</style>
