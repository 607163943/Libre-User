<script setup lang="ts">
import type { MyLendHistoryTableData } from '@/types/lend'
import { lendBook, renewBook, returnBook } from '@/api/lend'
import { message } from 'ant-design-vue'
import HistoryItem from './HistoryItem.vue'

const { historyBooks } = defineProps<{
  historyBooks: MyLendHistoryTableData[]
}>()

const emit = defineEmits(['bookStateChange', 'renewBook'])
// 借阅书籍
const handleLendBook = (bookId: number) => {
  lendBook(bookId)
    .then(() => {
      message.success('借阅成功')
      emit('bookStateChange')
    })
    .catch((error) => console.log(error))
}

// 归还图书
const handleReturnBook = (bookId: number) => {
  returnBook(bookId)
    .then(() => {
      message.success('归还成功')
      emit('bookStateChange')
    })
    .catch((error) => console.log(error))
}

// 续借图书
const handleRenewBook = (bookId: number) => {
  renewBook(bookId)
    .then(() => {
      message.success('续借成功')
      emit('renewBook')
    })
    .catch((error) => console.log(error))
}
</script>
<template>
  <div class="grid grid-cols-1 gap-4">
    <HistoryItem
      v-for="book in historyBooks"
      :key="book.id"
      :book="book"
      :handle-lend-book="handleLendBook"
      :handle-return-book="handleReturnBook"
      :handle-renew-book="handleRenewBook"
    />
  </div>
</template>
