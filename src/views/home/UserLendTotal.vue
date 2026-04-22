<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { getUserLendTotal } from '@/api/home'

interface HomeDataCard {
  label: string
  title: string
  icon: string
  value: number
  unit: string
  color: string
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
  <a-card v-for="stat in stats" :key="stat.title" :bordered="false" class="stat-card">
    <div class="flex justify-between items-start mb-4">
      <span class="text-on-surface-variant font-label text-xs uppercase tracking-widest">{{
        stat.label
      }}</span>
      <span class="material-symbols-outlined" :style="{ color: stat.color }">{{ stat.icon }}</span>
    </div>
    <div class="flex items-baseline gap-2">
      <span class="text-4xl font-headline font-bold text-on-surface">{{ stat.value }}</span>
      <span class="text-sm text-on-surface-variant">{{ stat.unit }}</span>
    </div>
  </a-card>
</template>

<style scoped>
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
