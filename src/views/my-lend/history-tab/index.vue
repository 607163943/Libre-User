<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { LendHistoryDataCount, SearchLendForm, MyLendHistoryTableData } from '@/types/lend'
import { getLendHistoryDataCount, pageQueryLendHistoryList } from '@/api/lend'
import FilterBar from '../FilterBar.vue'
import HistoryStats from './HistoryStats.vue'
import ListPage from '../ListPage.vue'
import HistoryList from './HistoryList.vue'

// --- 历史记录数据 ---
const historyStats = ref<LendHistoryDataCount>({
  lendCount: 42,
  overdueLendCount: 2
})
const historyBooks = ref<MyLendHistoryTableData[]>([])

const handleLendDataCount = () => {
  getLendHistoryDataCount()
    .then((res) => {
      historyStats.value = res.data.data
    })
    .catch((error) => console.log(error))
}

onMounted(() => {
  handleLendDataCount()
})

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

// 页面状态
const dateRange = ref<[string, string] | null>(null)

const total = ref(0)

const handleSearch = () => {
  searchLendForm.value.startDate = dateRange.value?.[0] || ''
  searchLendForm.value.endDate = dateRange.value?.[1] || ''
  usingSearchLendForm.value = { ...searchLendForm.value }
  pageQueryLendHistoryList(usingSearchLendForm.value)
    .then((res) => {
      historyBooks.value = res.data.data.data
      total.value = res.data.data.total
    })
    .catch((error) => console.log(error))
}

onMounted(() => {
  handleSearch()
})

const handlePageChange = () => {
  handleSearch()
}

const handleBookStatsChange = () => {
  handleSearch()
  handleLendDataCount()
}
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <HistoryStats :historyStats="historyStats" />

    <FilterBar
      v-model:dateRange="dateRange"
      v-model:searchLendForm="searchLendForm"
      @search="handleSearch"
    />

    <HistoryList
      :historyBooks="historyBooks"
      @bookStateChange="handleBookStatsChange"
      @renewBook="() => handleSearch()"
    />

    <ListPage :total="total" :pageForm="searchLendForm" @pageChange="handlePageChange" />
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
