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
const { currentBooks } = defineProps<{
  currentBooks: MyLendTableData[]
}>()

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
  <MyLendListItem
    v-for="book in currentBooks"
    :key="book.id"
    :book="book"
    :handleRenew="handleRenew"
    :handleReturn="handleReturn"
  />
</template>
