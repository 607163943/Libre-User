<script setup lang="ts">
import type { SearchBook } from '@/types/search'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { lendBook, returnBook } from '@/api/lend'
import { message } from 'ant-design-vue'

const userStore = useUserStore()

const defaultUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAYi20JdC9t4riSW0UppAZKpp5av_a031bTcNnb1lhxTIaNFg-wOIsY8fRf713F7RIMIWdzs1CrQ2hvtLHhH21D6xyuff02K4DT52JjqTj8RgxZqvZPXhZUFJ0xwfLfwdJ_uzBDcY8q5lT8XV5ZNs1D7KSkxyfs2ajrRHPE6XR_NWksPR_39U6nwbl5EVu7lAwmlVOx4g2uDk2NU3deXP6w8WvWYwpQiTFERhO_0DdeKEhkf8ZDJWL5jXGTW3gKc1qUekYk4e4bB7Y'

const { book } = defineProps<{
  book: SearchBook
}>()

const router = useRouter()
// 处理借阅图书
const handleLendBook = (bookId: number) => {
  if (!userStore.userInfo) {
    router.push({ name: 'Login' })
    return
  }
  lendBook(bookId)
    .then(() => {
      message.success('借阅成功')
      refreshSearch()
    })
    .catch((error) => console.log(error))
}

// 刷新搜索结果
const emit = defineEmits(['refresh'])
const refreshSearch = () => {
  emit('refresh')
}

// 处理归还图书
const handleReturnBook = (bookId: number) => {
  returnBook(bookId)
    .then(() => {
      message.success('归还成功')
      refreshSearch()
    })
    .catch((error) => console.log(error))
}
</script>
<template>
  <div
    class="bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-200 p-5 rounded-xl flex items-center gap-6 group"
  >
    <div
      class="w-20 h-28 bg-surface-container-highest rounded shadow-sm flex-shrink-0 overflow-hidden"
    >
      <img
        :src="book.coverUrl || defaultUrl"
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div class="flex-grow flex flex-col justify-between h-28 py-1">
      <div>
        <div class="flex items-center gap-3">
          <h3
            class="text-lg font-bold text-on-surface group-hover:text-primary transition-colors font-headline"
          >
            {{ book.bookName }}
          </h3>
          <a-tag
            :color="book.state === 1 || book.state === 3 ? 'default' : 'green'"
            class="rounded-full border-none px-2 font-bold text-[10px]"
          >
            {{ book.state === 1 || book.state === 3 ? '已借阅' : '可借阅' }}
          </a-tag>
        </div>
        <p class="text-on-surface-variant text-sm mt-0.5">{{ book.authorName }}</p>
      </div>

      <div class="flex items-center gap-6">
        <div class="flex flex-col">
          <span class="text-[10px] text-outline uppercase font-semibold tracking-tighter"
            >ISBN-13</span
          >
          <span class="text-xs font-mono text-on-surface-variant">{{ book.isbn }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-[10px] text-outline uppercase font-semibold tracking-tighter">
            出版社
          </span>
          <span class="text-xs text-tertiary font-medium">
            {{ book.publisherName }}
          </span>
        </div>
        <div class="flex flex-col">
          <span class="text-[10px] text-outline uppercase font-semibold tracking-tighter">
            出版日期
          </span>
          <span class="text-xs text-tertiary font-medium">
            {{ book.publishDate }}
          </span>
        </div>
        <div
          class="flex flex-col"
          v-if="userStore.userInfo && (book.state === 1 || book.state === 3)"
        >
          <span class="text-[10px] text-outline uppercase font-semibold tracking-tighter">
            归还日期
          </span>
          <span class="text-xs text-tertiary font-medium">
            {{ book.dueTime }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex gap-3">
      <a-config-provider
        :theme="{
          token: {
            colorPrimary: '#005daa',
            borderRadius: 4
          }
        }"
      >
        <a-button
          type="text"
          class="bg-secondary-container text-on-secondary-container font-bold h-10 px-5"
          @click="() => $router.push({ name: 'BookDetail', params: { id: book.id } })"
        >
          查看详情
        </a-button>
        <a-button
          v-if="userStore.userInfo && (book.state === 1 || book.state === 3)"
          type="primary"
          class="font-bold h-10 px-5 shadow-none hover:shadow-lg transition-all"
          @click="() => handleReturnBook(book.id)"
        >
          归还
        </a-button>
        <a-button
          v-else
          type="primary"
          class="font-bold h-10 px-5 shadow-none hover:shadow-lg transition-all"
          @click="() => handleLendBook(book.id)"
        >
          借阅
        </a-button>
      </a-config-provider>
    </div>
  </div>
</template>
