<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { UserLendHistoryTableData } from '@/types/user'
import type { LendHistoryDataCount } from '@/types/lend'
import type { PageForm } from '@/types/common'
import { getLendHistoryDataCount, lendBook, renewBook, returnBook } from '@/api/lend'
import { getUserLendHistoryList } from '@/api/user'
import { message } from 'ant-design-vue'

const tableTheme = {
  token: {
    colorPrimary: '#005daa',
    colorSplit: '#eceef1',
    paddingContentVerticalLG: 24
  },
  components: {
    Table: { headerBg: '#f2f4f7', headerColor: '#404753' }
  }
}

// --- 历史记录数据 ---
const historyStats = ref<LendHistoryDataCount>({
  lendCount: 42,
  overdueLendCount: 2
})

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

const columns = [
  { title: '书籍', dataIndex: 'book', key: 'book' },
  { title: '借阅日期', dataIndex: 'lendTime', key: 'lendTime' },
  { title: '归还日期', dataIndex: 'returnTime', key: 'returnTime' },
  { title: '状态', dataIndex: 'state', key: 'state' },
  { title: '操作', key: 'action' }
]

const pageForm = ref<PageForm>({
  page: 1,
  pageSize: 10
})
const total = ref(0)

const defaultUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD40Yb58WgKcrWwyWYVldLdmqeTqR7Lme3ivnWA3b8Oqnkx7Qn9A0RHtVp0kHMlCo8R60BFJC6jDDE9bFZd-JshPe0lQfy-M0UJHuQgxdfc-LKrl4VKij_6XoL8r73QH24LluVUTuCywO4hvRC-HBIOcHy1BYk7uNA4jOn3LP5lsN6nY5WgcZAv58JicR85-vyswZgzyVK2zrQLqkBdLHYsf4nndYDtcWrS5z2prDN-w7hWB9mNGedAHnn1hygaoF6a4X_UeXMxEq0'
const historyData = ref<UserLendHistoryTableData[]>([])

const handlePageQuery = () => {
  getUserLendHistoryList(pageForm.value).then((res) => {
    historyData.value = res.data.data.data
    total.value = res.data.data.total
  })
}

onMounted(() => {
  handlePageQuery()
})

// 借阅书籍
const handleLendBook = (bookId: number) => {
  lendBook(bookId)
    .then(() => {
      message.success('借阅成功')
      handlePageQuery()
      handleLendDataCount()
    })
    .catch((error) => console.log(error))
}

// 归还图书
const handleReturnBook = (bookId: number) => {
  returnBook(bookId)
    .then(() => {
      message.success('归还成功')
      handlePageQuery()
      handleLendDataCount()
    })
    .catch((error) => console.log(error))
}

// 续借图书
const handleRenewBook = (bookId: number) => {
  renewBook(bookId)
    .then(() => {
      message.success('续借成功')
      handlePageQuery()
    })
    .catch((error) => console.log(error))
}
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="space-y-2">
        <h2 class="text-2xl font-extrabold tracking-tight text-on-surface font-headline">
          历史借阅
        </h2>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div
        class="bg-surface-container-lowest p-6 rounded-lg transition-all hover:bg-surface-container shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border-t-2 border-primary"
      >
        <p class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
          累计借阅
        </p>
        <div class="flex items-baseline gap-2">
          <span class="font-headline text-3xl font-bold">{{ historyStats.lendCount }}</span>
          <span class="text-sm text-outline">本</span>
        </div>
      </div>
      <div
        class="bg-surface-container-lowest p-6 rounded-lg transition-all hover:bg-surface-container shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border-t-2 border-error"
      >
        <p class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
          逾期归还
        </p>
        <div class="flex items-baseline gap-2">
          <span class="font-headline text-3xl font-bold text-error">{{
            historyStats.overdueLendCount
          }}</span>
          <span class="text-sm text-error/70">本</span>
        </div>
      </div>
    </div>

    <a-config-provider :theme="tableTheme">
      <div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div class="px-8 py-6 flex justify-between items-center bg-surface-container-low/30">
          <h3 class="text-lg font-bold font-headline text-on-surface">Activity Log</h3>
        </div>

        <a-table
          :dataSource="historyData"
          :columns="columns"
          :pagination="false"
          class="history-table"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'book'">
              <div class="flex items-center gap-4">
                <div
                  class="w-10 h-14 bg-surface-container-highest rounded flex-shrink-0 overflow-hidden"
                >
                  <img :src="record.coverUrl || defaultUrl" class="w-full h-full object-cover" />
                </div>
                <div>
                  <div class="text-sm font-bold text-on-surface">{{ record.bookName }}</div>
                  <div class="text-xs text-on-surface-variant">{{ record.authorName }}</div>
                  <div class="text-xs text-on-surface-variant">{{ record.isbn }}</div>
                  <div class="text-xs text-on-surface-variant">{{ record.publisherName }}</div>
                </div>
              </div>
            </template>
            <template v-else-if="column.key === 'lendTime' || column.key === 'returnTime'">
              <span
                class="text-sm"
                :class="
                  record.returnDate === 'Overdue' && column.key === 'returnDate'
                    ? 'text-primary font-medium italic'
                    : 'text-on-surface-variant'
                "
              >
                {{ record[column.dataIndex as string] }}
              </span>
            </template>
            <template v-else-if="column.key === 'status'">
              <span
                v-if="record.statusType === 'default'"
                class="px-3 py-1 bg-surface-container text-on-surface-variant text-[10px] font-bold rounded-full uppercase tracking-tighter"
                >Returned</span
              >
              <span
                v-else-if="record.statusType === 'active'"
                class="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full uppercase tracking-tighter"
                >Active</span
              >
              <span
                v-else-if="record.statusType === 'error'"
                class="px-3 py-1 bg-tertiary text-on-tertiary text-[10px] font-bold rounded-full uppercase tracking-tighter"
                >Overdue</span
              >
            </template>
            <template v-else-if="column.key === 'action'">
              <a-button
                v-if="record.state === 1 || record.state === 3"
                type="primary"
                size="small"
                @click="() => handleReturnBook(record.id)"
                class="mr-2"
                >归还</a-button
              >
              <a-button
                v-if="record.state === 1 || record.state === 3"
                type="primary"
                size="small"
                @click="() => handleRenewBook(record.id)"
                >续借</a-button
              >
              <a-button v-else type="primary" size="small" @click="() => handleLendBook(record.id)"
                >借阅</a-button
              >
            </template>
          </template>
        </a-table>

        <a-pagination
          v-model:current="pageForm.page"
          v-model:pageSize="pageForm.pageSize"
          :total="total"
          :show-total="() => `共 ${total} 条`"
          @change="handlePageQuery"
          show-size-changer
          show-quick-jumper
          class="flex justify-end p-4 border-t border-outline-variant/20"
        />
      </div>
    </a-config-provider>
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
