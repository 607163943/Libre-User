<script setup lang="ts">
import type { MyLendHistoryTableData } from '@/types/lend'
const { book, handleLendBook, handleReturnBook, handleRenewBook } = defineProps<{
  book: MyLendHistoryTableData
  handleLendBook: (bookId: number) => void
  handleReturnBook: (bookId: number) => void
  handleRenewBook: (bookId: number) => void
}>()

const defaultUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAkoBsiZJ2hHtjIUGSci32DthCHA7F3f7hbpggoNLNdtWMgw5R3yFF9FSQwUHO42uiD5IRyGQOSk-EGHQYlEnWc0t8QObpTaPPgQdllSUX8K2zBcALwKGhRg5ck8-MdqzLnZS8SfjvfRi6vGqt0kffCo01EcfR_oq1F2rxbS0FoCd_4jqvyV_rCiT7yk_RH4CtqlYdKC_BKIZZf64-qdCauVmnHnqo3fkdn45tEok4_8jDPFCDgqPhncmOnB3ESyuB7UDzIjxKyfuI'
</script>
<template>
  <div
    class="bg-surface-container-lowest p-6 rounded-lg flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-surface-container-low transition-colors group border border-transparent hover:border-outline-variant/20 shadow-sm"
  >
    <div
      class="w-24 h-32 flex-shrink-0 bg-surface-container-highest rounded overflow-hidden shadow-sm group-hover:shadow-md transition-shadow relative"
    >
      <img :src="book.bookUrl || defaultUrl" alt="Book Cover" class="w-full h-full object-cover" />
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
          <p class="text-[10px] uppercase font-bold text-outline tracking-widest">Borrowed Date</p>
          <p class="text-sm text-on-surface font-medium">{{ book.lendTime }}</p>
        </div>
        <div>
          <p class="text-[10px] uppercase font-bold text-outline tracking-widest">Returned Date</p>
          <p class="text-sm text-on-surface font-medium">{{ book.returnTime }}</p>
        </div>
      </div>
    </div>

    <a-config-provider :theme="{ token: { colorPrimary: '#005daa', borderRadius: 4 } }">
      <div class="w-full md:w-auto flex flex-row md:flex-col gap-2">
        <a-button
          v-if="book.state === 2"
          type="primary"
          class="font-semibold shadow-none border-0 px-8"
          @click="() => handleLendBook(book.id)"
          >再次借阅</a-button
        >
        <a-button
          v-if="book.state === 1 || book.state === 3"
          type="primary"
          class="font-semibold shadow-none border-0 px-8"
          @click="() => handleReturnBook(book.id)"
          >归还</a-button
        >
        <a-button
          v-if="book.state === 1 || book.state === 3"
          type="primary"
          class="font-semibold shadow-none border-0 px-8"
          @click="() => handleRenewBook(book.id)"
          >续借</a-button
        >
        <a-button
          class="flex-1 font-bold bg-surface-container-low text-on-surface-variant border-0 hover:bg-surface-container-high"
          @click="() => $router.push({ name: 'BookDetail', params: { id: book.id } })"
          >查看详情</a-button
        >
      </div>
    </a-config-provider>
  </div>
</template>
