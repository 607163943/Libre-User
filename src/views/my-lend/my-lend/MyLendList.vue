<script setup lang="ts">
import type { MyLendTableData, SearchLendForm } from '@/types/lend'
import { renewBook, returnBook } from '@/api/lend'
import { message } from 'ant-design-vue'
import MyLendListItem from './MyLendListItem.vue'

const searchLendForm = defineModel<SearchLendForm>('searchLendForm', {
  required: true
})
const usingSearchLendForm = defineModel<SearchLendForm>('usingSearchLendForm', {
  required: true
})

// 当前借阅记录表格数据
const defaultUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAPCVRC1rtDPpzB3p-leDtzCkbJcP1Hlb3F4iYXgAQrzeMzmLl24RUS1Fli-j1oYACqM56tR4UokEsHNC5KDOvex6r3VGckWdddjTbI1u-3MjXReZ8Ba5eoTi08eliamyWjTex2VTaBbKQzqGN7HhOUXYtDKgr4z4NH3-g4VKYpZ8fD2J6Ja9akdLnNkpWOvLitalJfCOuD0uacB14lRDF9rlK1fY1mtNp2TA2q2KQ9Sf59axUo5kGbDeKtbPKlFy74O1zRyWcUMK0'
const { currentBooks } = defineProps<{
  currentBooks: MyLendTableData[]
}>()
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

const emit = defineEmits(['bookStatsChange'])

/**
 * 续借图书
 */
const handleRenew = (bookId: number) => {
  renewBook(bookId)
    .then(() => {
      message.success('续借成功')
      // 继续获取旧搜索条件下的数据
      searchLendForm.value = { ...usingSearchLendForm.value }
      emit('bookStatsChange')
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
      // 继续获取旧搜索条件下的数据
      searchLendForm.value = { ...usingSearchLendForm.value }
      emit('bookStatsChange')
    })
    .catch((error) => console.log(error))
}
</script>
<template>
  <div
    v-for="book in currentBooks"
    :key="book.id"
    class="bg-surface-container-lowest p-6 rounded-lg flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-surface-container-low transition-colors group border border-transparent hover:border-outline-variant/20 shadow-sm"
  >
    <div
      class="w-24 h-32 flex-shrink-0 bg-surface-container-highest rounded overflow-hidden shadow-sm group-hover:shadow-md transition-shadow relative"
    >
      <img :src="book.bookUrl || defaultUrl" alt="Book Cover" class="w-full h-full object-cover" />
    </div>

    <div class="flex-grow grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="md:col-span-2">
        <h3 class="text-xl font-bold text-on-surface mb-1 font-headline">
          {{ book.bookName }}
        </h3>
        <p class="text-sm text-on-surface-variant mb-2">
          作者: {{ book.authorName }} •
          <span class="font-mono text-xs">ISBN: {{ book.isbn }}</span>
        </p>
        <!-- 出版社 -->
        <p class="text-sm text-on-surface-variant mb-2">出版社: {{ book.publisherName }}</p>
      </div>

      <div class="flex flex-col justify-center">
        <span class="text-xs text-on-surface-variant font-medium uppercase tracking-tighter mb-1"
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
          @click="() => handleReturn(book.id)"
        >
          归还
        </a-button>
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
</template>
