<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MyLendTableData, SearchLendForm, LendDataCount } from '@/types/lend'
import { pageQueryLendList, getLendDataCount } from '@/api/lend'
import dayjs from 'dayjs'
import MyLendStats from './MyLendStats.vue'
import FilterBar from '../FilterBar.vue'
import MyLendList from './MyLendList.vue'
import MyLendPage from '../ListPage.vue'
// 我的借阅统计
const currentStats = ref<LendDataCount>({
  currentLendCount: 0,
  overdueLendCount: 0,
  soonOverdueLendCount: 0
})
const handleLendDataCount = () => {
  getLendDataCount()
    .then((res) => {
      currentStats.value = res.data.data
    })
    .catch((error) => console.log(error))
}

onMounted(() => {
  handleLendDataCount()
})

// 页面状态
const dateRange = ref<[string, string] | null>(null)

// 当前借阅记录表格数据
const currentBooks = ref<MyLendTableData[]>([])

const searchLendForm = ref<SearchLendForm>({
  keyword: '',
  startDate: '',
  endDate: '',
  page: 1,
  pageSize: 10
})

const usingSearchLendForm = ref<SearchLendForm>({
  keyword: '',
  startDate: '',
  endDate: '',
  page: 1,
  pageSize: 10
})

const total = ref(0)

const handleSearch = () => {
  searchLendForm.value.startDate = dateRange.value?.[0] || ''
  searchLendForm.value.endDate = dateRange.value?.[1] || ''
  usingSearchLendForm.value = { ...searchLendForm.value }
  pageQueryLendList(usingSearchLendForm.value)
    .then((res) => {
      currentBooks.value = res.data.data.data
      currentBooks.value.forEach((book) => {
        handleTimeStats(book)
      })
      total.value = res.data.data.total
    })
    .catch((error) => console.log(error))
}

// 处理图书状态改变事件
const handleBookStatsChange = () => {
  handleSearch()
  handleLendDataCount()
}

onMounted(() => {
  handleSearch()
})

/**
 * 核心逻辑计算：天数与百分比
 */
const handleTimeStats = (book: MyLendTableData) => {
  const now = dayjs()
  const start = dayjs(book.lendTime)
  const end = dayjs(book.dueTime)

  // 总借阅时长 (天)
  const totalDuration = end.diff(start, 'day')
  // 距离到期剩余时长 (天)
  const remaining = end.diff(now, 'day')

  // 计算百分比：(剩余天数 / 总天数) * 100
  // 如果剩余天数为负，说明已逾期，百分比设为 0
  const rawPercent = (remaining / (totalDuration || 1)) * 100
  const percent = Math.max(0, Math.min(100, Math.round(rawPercent)))

  book.remaining = remaining < 0 ? 0 : remaining
  book.isOverdue = remaining < 0
  book.isCritical = remaining >= 0 && remaining <= 3
  book.percent = percent
}
</script>
<template>
  <div class="space-y-8 animate-fade-in">
    <!-- 我的借阅统计卡片 -->
    <MyLendStats :currentStats="currentStats" />

    <FilterBar
      v-model:dateRange="dateRange"
      v-model:searchLendForm="searchLendForm"
      @search="handleSearch"
    />

    <div class="space-y-4">
      <MyLendList
        :currentBooks="currentBooks"
        :searchLendForm="searchLendForm"
        :usingSearchLendForm="usingSearchLendForm"
        @bookStatsChange="handleBookStatsChange"
      />

      <MyLendPage :pageForm="searchLendForm" :total="total" @pageChange="() => handleSearch()" />
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
