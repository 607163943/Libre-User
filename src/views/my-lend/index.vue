<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { LendDataCount } from '@/types/lend'
import MyLendTab from './MyLendTab.vue'

type TabType = 'current' | 'history'

interface HistoryBook {
  id: string
  title: string
  author: string
  isbn: string
  borrowedDate: string
  returnedDate: string
  coverImage: string
}

// 页面状态
const activeTab = ref<TabType>('current')
const currentPage = ref<number>(1)

// --- 历史记录数据 ---
const historyStats = ref<LendDataCount>({
  currentLendCount: 42,
  overdueLendCount: 2,
  soonOverdueLendCount: 12
})

const historyBooks = ref<HistoryBook[]>([])

const fetchHistoryData = async () => {
  // TODO: [API Request] 发起请求获取「历史借阅」统计数据和列表
  // const response = await api.getBorrowingHistory({ page: currentPage.value, search: searchQuery.value });
  // historyBooks.value = response.data;

  // Mock Data 赋值
  historyBooks.value = [
    {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      isbn: '978-0525559474',
      borrowedDate: 'Oct 12, 2023',
      returnedDate: 'Oct 26, 2023',
      coverImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAkoBsiZJ2hHtjIUGSci32DthCHA7F3f7hbpggoNLNdtWMgw5R3yFF9FSQwUHO42uiD5IRyGQOSk-EGHQYlEnWc0t8QObpTaPPgQdllSUX8K2zBcALwKGhRg5ck8-MdqzLnZS8SfjvfRi6vGqt0kffCo01EcfR_oq1F2rxbS0FoCd_4jqvyV_rCiT7yk_RH4CtqlYdKC_BKIZZf64-qdCauVmnHnqo3fkdn45tEok4_8jDPFCDgqPhncmOnB3ESyuB7UDzIjxKyfuI'
    },
    {
      id: '2',
      title: 'Klara and the Sun',
      author: 'Kazuo Ishiguro',
      isbn: '978-0593318171',
      borrowedDate: 'Sep 05, 2023',
      returnedDate: 'Sep 19, 2023',
      coverImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDeJxMkr1TZDUL6azHqVTJa4j12X090R_EsbqxqyexidKSY48KGjEJugLlRvxyYKn6ZXfSr1ORY48Goi4LrKkmmcTdIcbAshVF9glU-WlFgGr-4xUCsatb_XIfuvBKlg2QIV4oArek89lFu6N5ZXmwW-wTB2SXJWuKOBgeseM_dlsdTWVR7Q0wAwiHzSGIGCFpjM98T1P3plVM8cOitvlsoz_-wMAHMNKX-3knkBaQ1NxwVfY8L1_-Fr682O2e9rpZ0DidifJz_AL0'
    },
    {
      id: '3',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      isbn: '978-0593135204',
      borrowedDate: 'Aug 10, 2023',
      returnedDate: 'Aug 24, 2023',
      coverImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBaIVopDccCFryQeGwXbM-QxeL6xUbttrpe69eO4SwevaS8Mo7ayCjZYos0baD7ehM-JpKg7DkuS-Ca6agkhYqm3ThZC0cwqm7Hm6ipdkkZbaNLrTdi1qLMxbgkP5xAuFzSC9JrPGbVW90_q83NpNy_KRxcDYyotKl2V-BxGcngy0EKL6D_gwl3R-_lSHyJEbBM7ABDVQAyXV9K-zjr3mdfuBDuM7wg9ajwiPwr9f4TnRTeEM7IogZhnkWvK2B3-ReDi1U0gBjljKc'
    }
  ]
}

// ==========================================
// 3. 生命周期Hooks
// ==========================================
onMounted(() => {
  fetchHistoryData()
})

// ==========================================
// 4. 事件处理
// ==========================================
const handleFilterSearch = () => {
  // TODO: [Trigger] 基于 searchQuery 和 dateRange 发起重新筛选的请求
  if (activeTab.value === 'current') {
  } else {
    currentPage.value = 1
    fetchHistoryData()
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchHistoryData()
}
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

    <div v-else-if="activeTab === 'history'" class="space-y-8">
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
              {{ historyStats.currentLendCount }}
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
              v-model:value="searchQuery"
              placeholder="Search by title, author, or ISBN..."
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
              @click="handleFilterSearch"
              class="flex items-center gap-2 font-medium"
            >
              <template #icon
                ><span class="material-symbols-outlined text-sm align-middle"
                  >filter_alt</span
                ></template
              >
              Filter
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
            <img :src="book.coverImage" alt="Book Cover" class="w-full h-full object-cover" />
          </div>

          <div class="flex-grow space-y-4">
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-2">
              <div>
                <h3 class="text-xl font-bold text-on-surface tracking-tight font-headline">
                  {{ book.title }}
                </h3>
                <p class="text-on-surface-variant font-medium">{{ book.author }}</p>
              </div>
              <span
                class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200 uppercase tracking-tighter"
                >Returned</span
              >
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
                <p class="text-sm text-on-surface font-medium">{{ book.borrowedDate }}</p>
              </div>
              <div>
                <p class="text-[10px] uppercase font-bold text-outline tracking-widest">
                  Returned Date
                </p>
                <p class="text-sm text-on-surface font-medium">{{ book.returnedDate }}</p>
              </div>
            </div>
          </div>

          <a-config-provider :theme="{ token: { colorPrimary: '#005daa', borderRadius: 4 } }">
            <div class="w-full md:w-auto flex flex-row md:flex-col gap-2 pt-4 md:pt-0">
              <a-button type="primary" size="large" class="flex-1 font-bold shadow-none border-0"
                >Borrow Again</a-button
              >
              <a-button
                size="large"
                class="flex-1 font-bold bg-surface-container-low text-on-surface-variant border-0 hover:bg-surface-container-high"
                >Details</a-button
              >
            </div>
          </a-config-provider>
        </div>
      </div>

      <div class="flex items-center justify-center pt-8">
        <a-config-provider :theme="{ token: { colorPrimary: '#005daa', borderRadius: 4 } }">
          <a-pagination
            v-model:current="currentPage"
            :total="50"
            show-less-items
            @change="handlePageChange"
          />
        </a-config-provider>
      </div>
    </div>
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
