<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUserLendList } from '@/api/user'
import { getLendDataCount, renewBook, returnBook } from '@/api/lend'
import type { UserLendTableData } from '@/types/user'
import type { LendDataCount } from '@/types/lend'
import type { PageForm } from '@/types/common'
import { message } from 'ant-design-vue'

const tableTheme = {
  token: {
    colorPrimary: '#005daa',
    colorSplit: 'rgba(224, 227, 230, 0.3)', // border-surface-variant/30
    paddingContentVerticalLG: 20
  },
  components: {
    Table: {
      headerBg: '#f2f4f7', // bg-surface-container-low
      headerColor: '#404753' // text-on-surface-variant
    }
  }
}

// --- 当前借阅数据 ---
const currentStats = ref<LendDataCount>({
  currentLendCount: 12,
  overdueLendCount: 2,
  soonOverdueLendCount: 5
})
const handleLendDataCount = () => {
  getLendDataCount()
    .then((res) => {
      currentStats.value = res.data.data
    })
    .catch((error) => console.log(error))
}

const columns = [
  { title: '借阅书籍', dataIndex: 'book', key: 'book' },
  { title: '应还日期', dataIndex: 'dueTime', key: 'dueTime' },
  { title: '状态', dataIndex: 'state', key: 'state' },
  {
    title: '操作',
    key: 'action'
  }
]

const defaultUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD40Yb58WgKcrWwyWYVldLdmqeTqR7Lme3ivnWA3b8Oqnkx7Qn9A0RHtVp0kHMlCo8R60BFJC6jDDE9bFZd-JshPe0lQfy-M0UJHuQgxdfc-LKrl4VKij_6XoL8r73QH24LluVUTuCywO4hvRC-HBIOcHy1BYk7uNA4jOn3LP5lsN6nY5WgcZAv58JicR85-vyswZgzyVK2zrQLqkBdLHYsf4nndYDtcWrS5z2prDN-w7hWB9mNGedAHnn1hygaoF6a4X_UeXMxEq0'
const lendData = ref<UserLendTableData[]>([])
const pageForm = ref<PageForm>({
  page: 1,
  pageSize: 10
})

const total = ref(0)

const pageQuery = () => {
  getUserLendList(pageForm.value)
    .then((res) => {
      lendData.value = res.data.data.data
      total.value = res.data.data.total
    })
    .catch((error) => console.log(error))
}

onMounted(() => {
  handleLendDataCount()
  pageQuery()
})

/**
 * 续借图书
 */
const handleRenew = (bookId: number) => {
  renewBook(bookId)
    .then(() => {
      message.success('续借成功')
      pageQuery()
      handleLendDataCount()
    })
    .catch((error) => console.log(error))
}

/**
 * 归还图书
 */
const handleReturn = (bookId: number) => {
  returnBook(bookId)
    .then(() => {
      message.success('归还成功')
      pageQuery()
      handleLendDataCount()
    })
    .catch((error) => console.log(error))
}
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <div class="flex justify-between items-end">
      <div class="border-surface-container-high">
        <h2 class="font-headline text-2xl font-extrabold tracking-tight">个人借阅</h2>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div
        class="bg-surface-container-lowest p-6 rounded-lg transition-all hover:bg-surface-container shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border-t-2 border-primary"
      >
        <p class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
          当前借阅
        </p>
        <div class="flex items-baseline gap-2">
          <span class="font-headline text-3xl font-bold">{{ currentStats.currentLendCount }}</span>
          <span class="text-sm text-outline">本</span>
        </div>
      </div>
      <div
        class="bg-surface-container-lowest p-6 rounded-lg transition-all hover:bg-surface-container shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border-t-2 border-tertiary"
      >
        <p class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
          即将逾期
        </p>
        <div class="flex items-baseline gap-2">
          <span class="font-headline text-3xl font-bold text-tertiary">{{
            currentStats.soonOverdueLendCount
          }}</span>
          <span class="text-sm text-tertiary/70">本</span>
        </div>
      </div>
      <div
        class="bg-surface-container-lowest p-6 rounded-lg transition-all hover:bg-surface-container shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border-t-2 border-error"
      >
        <p class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
          逾期借阅
        </p>
        <div class="flex items-baseline gap-2">
          <span class="font-headline text-3xl font-bold text-error">{{
            currentStats.overdueLendCount
          }}</span>
          <span class="text-sm text-error/70">本</span>
        </div>
      </div>
    </div>

    <a-config-provider :theme="tableTheme">
      <div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div class="px-8 py-6 flex justify-between items-center bg-surface-container-low/50">
          <h3 class="font-headline font-bold text-lg">借阅列表</h3>
          <router-link
            :to="{ name: 'MyLend' }"
            class="text-sm font-semibold text-primary hover:underline transition-all flex items-center gap-1 cursor-pointer"
          >
            更多
          </router-link>
        </div>

        <a-table :dataSource="lendData" :columns="columns" :pagination="false" class="custom-table">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'book'">
              <div class="flex items-center gap-4">
                <div
                  class="w-10 h-14 bg-surface-container flex-shrink-0 rounded shadow-sm overflow-hidden border border-outline-variant/20"
                >
                  <img :src="record.coverUrl || defaultUrl" class="w-full h-full object-cover" />
                </div>
                <div>
                  <p
                    class="font-semibold text-sm hover:text-primary transition-colors cursor-pointer"
                  >
                    {{ record.bookName }}
                  </p>
                  <p class="text-xs text-on-surface-variant">{{ record.authorName }}</p>
                  <p class="text-xs text-on-surface-variant">{{ record.publisherName }}</p>
                </div>
              </div>
            </template>
            <template v-else-if="column.key === 'dueTime'">
              <span class="text-sm font-medium text-on-surface-variant">
                {{ record.dueTime }}
              </span>
            </template>
            <template v-else-if="column.key === 'state'">
              <a-tag
                v-if="record.state === 1"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200"
              >
                借阅中
              </a-tag>
              <a-tag
                v-else-if="record.state === 3"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-tertiary border border-orange-200"
              >
                已逾期
              </a-tag>
            </template>
            <template v-else-if="column.key === 'action'">
              <a-button
                type="primary"
                size="small"
                class="mr-2"
                @click="() => handleRenew(record.id)"
                >续借</a-button
              >
              <a-button type="primary" size="small" @click="() => handleReturn(record.id)"
                >归还</a-button
              >
            </template>
          </template>
        </a-table>
        <a-pagination
          v-model:current="pageForm.page"
          v-model:pageSize="pageForm.pageSize"
          :total="total"
          :show-total="() => `共 ${total} 条`"
          @change="pageQuery"
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
