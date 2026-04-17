<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { LendDataCount, MyLendTableData, SearchLendForm } from '@/types/lend'
import { getLendDataCount, pageQueryLendList, renewBook } from '@/api/lend'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'

// 页面状态
const dateRange = ref<[string, string] | null>(null)

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

onMounted(() => {
  handleLendDataCount()
})

// 当前借阅记录表格数据
const defaultUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAPCVRC1rtDPpzB3p-leDtzCkbJcP1Hlb3F4iYXgAQrzeMzmLl24RUS1Fli-j1oYACqM56tR4UokEsHNC5KDOvex6r3VGckWdddjTbI1u-3MjXReZ8Ba5eoTi08eliamyWjTex2VTaBbKQzqGN7HhOUXYtDKgr4z4NH3-g4VKYpZ8fD2J6Ja9akdLnNkpWOvLitalJfCOuD0uacB14lRDF9rlK1fY1mtNp2TA2q2KQ9Sf59axUo5kGbDeKtbPKlFy74O1zRyWcUMK0'
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

onMounted(() => {
  handleSearch()
})

const handlePageChange = () => {
  handleSearch()
}

/**
 * 核心逻辑计算：天数与百分比
 */
const handleTimeStats = (book: MyLendTableData) => {
  const now = dayjs()
  const start = dayjs(book.lendTime)
  const end = dayjs(book.dueTime)

  // 总借阅时长 (天)
  const totalDuration = end.diff(start, 'day')
  console.log(start)
  console.log(totalDuration)
  // 距离到期剩余时长 (天)
  const remaining = end.diff(now, 'day')
  console.log(now)
  console.log(remaining)

  // 计算百分比：(剩余天数 / 总天数) * 100
  // 如果剩余天数为负，说明已逾期，百分比设为 0
  const rawPercent = (remaining / (totalDuration || 1)) * 100
  const percent = Math.max(0, Math.min(100, Math.round(rawPercent)))

  book.remaining = remaining < 0 ? 0 : remaining
  book.isOverdue = remaining < 0
  book.isCritical = remaining >= 0 && remaining <= 3
  book.percent = percent
}

/**
 * 动态样式与配置
 */
const getUIConfig = (book: MyLendTableData) => {
  if (book.isOverdue) {
    return { color: '#ba1a1a', label: '已逾期', textClass: 'text-error', sub: '请立即归还' }
  }
  if (book.isCritical) {
    return { color: '#d97706', label: '即将逾期', textClass: 'text-amber-600', sub: '建议尽快续借' }
  }
  return { color: '#005daa', label: '借阅中', textClass: 'text-primary', sub: '状态良好' }
}

/**
 * 续借图书
 */
const handleRenew = (bookId: number) => {
  renewBook(bookId)
    .then(() => {
      message.success('续借成功')
      // 继续获取旧搜索条件下的数据
      searchLendForm.value = { ...usingSearchLendForm.value }
      handleSearch()
    })
    .catch((error) => console.log(error))
}
</script>
<template>
  <div class="space-y-8">
    <!-- 我的借阅统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="bg-surface-container-lowest hover:bg-surface-container-low p-6 rounded-lg transition-all border-l-4 border-slate-300 shadow-sm group"
      >
        <p class="text-sm font-medium text-on-surface-variant mb-1">总借阅</p>
        <div class="flex items-end gap-2">
          <span class="text-3xl font-bold font-headline text-slate-700">
            {{ currentStats.currentLendCount }}
          </span>
          <span class="text-xs text-slate-500 mb-1.5 font-semibold"> 本书籍正在借阅 </span>
        </div>
      </div>
      <div
        class="bg-surface-container-lowest hover:bg-surface-container-low p-6 rounded-lg transition-all border-l-4 border-error/20 shadow-sm"
      >
        <p class="text-sm font-medium text-on-surface-variant mb-1">逾期</p>
        <div class="flex items-end gap-2">
          <span class="text-3xl font-bold font-headline text-error">{{
            currentStats.overdueLendCount
          }}</span>
          <span class="text-xs text-error mb-1.5 font-semibold">本借阅书籍已逾期</span>
        </div>
      </div>
      <!-- 即将逾期需要使用黄色警告进行修饰 -->
      <div
        class="bg-surface-container-lowest hover:bg-surface-container-low p-6 rounded-lg transition-all border-l-4 border-amber-500/20 shadow-sm group"
      >
        <p class="text-sm font-medium text-on-surface-variant mb-1">即将逾期</p>
        <div class="flex items-end gap-2">
          <span class="text-3xl font-bold font-headline text-amber-600">
            {{ currentStats.soonOverdueLendCount }}
          </span>
          <span class="text-xs text-amber-600 mb-1.5 font-semibold"> 本借阅书籍即将逾期 </span>
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

    <div class="space-y-4">
      <div
        v-for="book in currentBooks"
        :key="book.id"
        class="bg-surface-container-lowest p-6 rounded-lg flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-surface-container-low transition-colors group border border-transparent hover:border-outline-variant/20 shadow-sm"
      >
        <div
          class="w-24 h-32 flex-shrink-0 bg-surface-container-highest rounded overflow-hidden shadow-sm group-hover:shadow-md transition-shadow relative"
        >
          <img
            :src="book.bookUrl || defaultUrl"
            alt="Book Cover"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="flex-grow grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="md:col-span-2">
            <h3 class="text-xl font-bold text-on-surface mb-1 font-headline">
              {{ book.bookName }}
            </h3>
            <p class="text-sm text-on-surface-variant mb-2">
              by {{ book.authorName }} •
              <span class="font-mono text-xs">ISBN: {{ book.isbn }}</span>
            </p>
          </div>

          <div class="flex flex-col justify-center">
            <span
              class="text-xs text-on-surface-variant font-medium uppercase tracking-tighter mb-1"
              >借阅时间范围</span
            >
            <p class="text-sm font-semibold">{{ book.lendTime }} — {{ book.dueTime }}</p>
          </div>

          <div class="flex items-center gap-4">
            <a-config-provider
              :theme="{
                token: { colorPrimary: getUIConfig(book).color }
              }"
            >
              <a-progress
                type="dashboard"
                :percent="book.percent"
                :size="52"
                :strokeWidth="10"
                :gapDegree="60"
              >
                <template #format>
                  <div class="flex flex-col items-center justify-center leading-none">
                    <span
                      class="text-xs font-bold font-headline"
                      :style="{ color: getUIConfig(book).color }"
                    >
                      {{ book.remaining }}
                    </span>
                    <span class="text-[8px] scale-90 text-on-surface-variant">天</span>
                  </div>
                </template>
              </a-progress>
            </a-config-provider>

            <div class="flex flex-col justify-center">
              <div class="flex items-center gap-1.5">
                <span class="text-xs font-bold leading-tight" :class="getUIConfig(book).textClass">
                  {{ getUIConfig(book).label }}
                </span>
                <span v-if="book.isOverdue" class="material-symbols-outlined text-error text-xs"
                  >warning</span
                >
              </div>
              <span class="text-[10px] text-on-surface-variant mt-0.5 whitespace-nowrap">
                {{ book.isOverdue ? '逾期记录将影响信用' : `剩余还书时间: ${book.remaining} 天` }}
              </span>
            </div>
          </div>
        </div>

        <a-config-provider :theme="{ token: { colorPrimary: '#005daa', borderRadius: 4 } }">
          <div class="flex flex-row md:flex-col gap-2 w-full md:w-auto">
            <a-button
              type="primary"
              size="middle"
              class="font-semibold shadow-none border-0 px-8"
              @click="() => handleRenew(book.id)"
            >
              续借
            </a-button>
            <a-button
              size="middle"
              class="font-semibold bg-surface-container-high text-on-surface border-0 hover:bg-surface-variant"
              @click="() => $router.push({ name: 'BookDetail', params: { id: book.id } })"
              >查看详情</a-button
            >
          </div>
        </a-config-provider>
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
  </div>
</template>
