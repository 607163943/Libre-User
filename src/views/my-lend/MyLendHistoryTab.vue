<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { LendHistoryDataCount, SearchLendForm, MyLendHistoryTableData } from '@/types/lend'
import {
  getLendHistoryDataCount,
  pageQueryLendHistoryList,
  lendBook,
  renewBook,
  returnBook
} from '@/api/lend'
import { message } from 'ant-design-vue'

// --- 历史记录数据 ---
const historyStats = ref<LendHistoryDataCount>({
  lendCount: 42,
  overdueLendCount: 2
})

const defaultUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAkoBsiZJ2hHtjIUGSci32DthCHA7F3f7hbpggoNLNdtWMgw5R3yFF9FSQwUHO42uiD5IRyGQOSk-EGHQYlEnWc0t8QObpTaPPgQdllSUX8K2zBcALwKGhRg5ck8-MdqzLnZS8SfjvfRi6vGqt0kffCo01EcfR_oq1F2rxbS0FoCd_4jqvyV_rCiT7yk_RH4CtqlYdKC_BKIZZf64-qdCauVmnHnqo3fkdn45tEok4_8jDPFCDgqPhncmOnB3ESyuB7UDzIjxKyfuI'
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

// 借阅书籍
const handleLendBook = (bookId: number) => {
  lendBook(bookId)
    .then(() => {
      message.success('借阅成功')
      handleSearch()
      handleLendDataCount()
    })
    .catch((error) => console.log(error))
}

// 归还图书
const handleReturnBook = (bookId: number) => {
  returnBook(bookId)
    .then(() => {
      message.success('归还成功')
      handleSearch()
      handleLendDataCount()
    })
    .catch((error) => console.log(error))
}

// 续借图书
const handleRenewBook = (bookId: number) => {
  renewBook(bookId)
    .then(() => {
      message.success('续借成功')
      handleSearch()
    })
    .catch((error) => console.log(error))
}
</script>

<template>
  <div class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <div
        class="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-transparent hover:border-outline-variant/20 transition-all flex items-center gap-4"
      >
        <div class="bg-primary/10 p-3 rounded">
          <span class="material-symbols-outlined text-primary">book_2</span>
        </div>
        <div>
          <p class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
            借阅总数
          </p>
          <p class="text-3xl font-extrabold font-headline text-on-surface">
            {{ historyStats.lendCount }}
          </p>
        </div>
      </div>
      <div
        class="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-transparent hover:border-outline-variant/20 transition-all flex items-center gap-4"
      >
        <div class="bg-error/10 p-3 rounded">
          <span class="material-symbols-outlined text-error">priority_high</span>
        </div>
        <div>
          <p class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
            逾期归还
          </p>
          <p class="text-3xl font-extrabold font-headline text-error">
            {{ historyStats.overdueLendCount }}
          </p>
        </div>
      </div>
    </div>

    <a-config-provider
      :theme="{
        token: {
          colorPrimary: '#005daa',
          colorBorder: 'transparent',
          colorBgContainer: '#ffffff',
          borderRadius: 4
        }
      }"
    >
      <div
        class="bg-surface-container-low p-4 rounded-xl flex flex-col md:flex-row items-center gap-4"
      >
        <div class="w-full md:w-96">
          <a-input
            v-model:value="searchLendForm.keyword"
            placeholder="输入书名、作者、出版社、ISBN..."
            size="large"
            class="shadow-sm"
          >
            <template #prefix>
              <span class="material-symbols-outlined text-on-surface-variant text-lg mr-1"
                >search</span
              >
            </template>
          </a-input>
        </div>
        <div class="flex items-center gap-2 w-full md:w-auto">
          <a-range-picker
            v-model:value="dateRange"
            size="large"
            class="shadow-sm border-0"
            separator="至"
          />
          <a-button
            type="primary"
            size="large"
            @click="handleSearch"
            class="flex items-center gap-2 font-medium"
          >
            <template #icon
              ><span class="material-symbols-outlined text-sm align-middle"
                >filter_alt</span
              ></template
            >
            筛选
          </a-button>
        </div>
      </div>
    </a-config-provider>

    <div class="grid grid-cols-1 gap-4">
      <div
        v-for="book in historyBooks"
        :key="book.id"
        class="bg-surface-container-lowest p-6 rounded-lg shadow-sm flex flex-col md:flex-row gap-6 items-start hover:shadow-md transition-shadow"
      >
        <div
          class="w-full md:w-24 h-36 flex-shrink-0 bg-surface-container-highest rounded overflow-hidden shadow-inner border border-outline-variant/10"
        >
          <img
            :src="book.bookUrl || defaultUrl"
            alt="Book Cover"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="flex-grow space-y-4">
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-2">
            <div>
              <h3 class="text-xl font-bold text-on-surface tracking-tight font-headline">
                {{ book.bookName }}
              </h3>
              <p class="text-on-surface-variant font-medium">{{ book.authorName }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-6 pt-2">
            <div>
              <p class="text-[10px] uppercase font-bold text-outline tracking-widest">ISBN-13</p>
              <p class="text-sm font-mono text-on-surface">{{ book.isbn }}</p>
            </div>
            <div>
              <p class="text-[10px] uppercase font-bold text-outline tracking-widest">
                Borrowed Date
              </p>
              <p class="text-sm text-on-surface font-medium">{{ book.lendTime }}</p>
            </div>
            <div>
              <p class="text-[10px] uppercase font-bold text-outline tracking-widest">
                Returned Date
              </p>
              <p class="text-sm text-on-surface font-medium">{{ book.returnTime }}</p>
            </div>
          </div>
        </div>

        <a-config-provider :theme="{ token: { colorPrimary: '#005daa', borderRadius: 4 } }">
          <div class="w-full md:w-auto flex flex-row md:flex-col gap-2 pt-4 md:pt-0">
            <a-button
              v-if="book.state === 2"
              type="primary"
              size="large"
              class="flex-1 font-bold shadow-none border-0"
              @click="() => handleLendBook(book.id)"
              >再次借阅</a-button
            >
            <a-button
              v-if="book.state === 1 || book.state === 3"
              type="primary"
              size="large"
              class="flex-1 font-bold shadow-none border-0"
              @click="() => handleReturnBook(book.id)"
              >归还</a-button
            >
            <a-button
              v-if="book.state === 1 || book.state === 3"
              type="primary"
              size="large"
              class="flex-1 font-bold shadow-none border-0"
              @click="() => handleRenewBook(book.id)"
              >续借</a-button
            >
            <a-button
              size="large"
              class="flex-1 font-bold bg-surface-container-low text-on-surface-variant border-0 hover:bg-surface-container-high"
              @click="() => $router.push({ name: 'BookDetail', params: { id: book.id } })"
              >查看详情</a-button
            >
          </div>
        </a-config-provider>
      </div>
    </div>

    <div class="flex items-center justify-center pt-8">
      <a-config-provider :theme="{ token: { colorPrimary: '#005daa', borderRadius: 4 } }">
        <a-pagination
          v-model:current="searchLendForm.page"
          :total="total"
          show-less-items
          @change="handlePageChange"
        />
      </a-config-provider>
    </div>
  </div>
</template>
