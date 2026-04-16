<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { SearchBook, SearchForm } from '@/types/search'
import { searchBooks } from '@/api/search'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { lendBook, returnBook } from '@/api/lend'
import { message } from 'ant-design-vue'

const route = useRoute()
const userStore = useUserStore()
const searchForm = ref<SearchForm>({
  keyword: (route.query.q as string) || '',
  isDateSort: 0,
  state: null,
  page: 1,
  pageSize: 10
})

// 正在使用搜索表单
const usingSearchForm = ref<SearchForm>({
  keyword: '',
  isDateSort: 0,
  state: null,
  page: 1,
  pageSize: 10
})
const total = ref(0)

const isSearch = ref(false)
const defaultUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAYi20JdC9t4riSW0UppAZKpp5av_a031bTcNnb1lhxTIaNFg-wOIsY8fRf713F7RIMIWdzs1CrQ2hvtLHhH21D6xyuff02K4DT52JjqTj8RgxZqvZPXhZUFJ0xwfLfwdJ_uzBDcY8q5lT8XV5ZNs1D7KSkxyfs2ajrRHPE6XR_NWksPR_39U6nwbl5EVu7lAwmlVOx4g2uDk2NU3deXP6w8WvWYwpQiTFERhO_0DdeKEhkf8ZDJWL5jXGTW3gKc1qUekYk4e4bB7Y'
const bookList = ref<SearchBook[]>([])

/**
 * 处理搜索
 */
const handleSearch = () => {
  usingSearchForm.value = { ...searchForm.value }
  searchBooks(searchForm.value)
    .then((res) => {
      isSearch.value = true
      bookList.value = res.data.data.data
      total.value = res.data.data.total
    })
    .catch((error) => console.log(error))
}

onMounted(() => {
  handleSearch()
})

const router = useRouter()
/**
 * 处理借阅图书
 * @param bookId 图书ID
 */
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
const refreshSearch = () => {
  searchBooks(usingSearchForm.value)
    .then((res) => {
      isSearch.value = true
      bookList.value = res.data.data.data
      total.value = res.data.data.total
    })
    .catch((error) => console.log(error))
}

/**
 * 处理归还图书
 * @param bookId 图书ID
 */
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
  <main class="flex-grow w-full max-w-[1440px] mx-auto px-8 py-6">
    <div class="sticky top-16 z-40 bg-background/80 backdrop-blur-xl pb-2 -mx-8 px-8 mb-6">
      <div class="flex flex-col gap-6">
        <a-config-provider
          :theme="{
            token: {
              colorPrimary: '#005daa',
              borderRadius: 8,
              controlHeightLarge: 48,
              colorBgContainer: '#eceef1', // surface-container
              colorBorder: 'transparent'
            },
            components: {
              Input: {
                controlHeight: 56,
                fontSize: 20
              },
              Select: {
                colorBgContainer: '#f2f4f7' // surface-container-low
              }
            }
          }"
        >
          <div
            class="bg-surface-container-lowest rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4 items-center"
          >
            <div class="relative w-full md:flex-grow">
              <a-input-search
                v-model:value="searchForm.keyword"
                placeholder="输入书名、作者、出版社或ISBN"
                enter-button
                @search="handleSearch"
              >
              </a-input-search>

              <div class="mt-2">
                <p
                  class="text-on-surface-variant text-sm"
                  v-if="isSearch && usingSearchForm.keyword"
                >
                  找到 {{ total }} 条关于 "{{ usingSearchForm.keyword }}" 的结果
                </p>
              </div>
            </div>

            <div class="flex gap-2 w-full md:w-auto mt-2">
              <a-select
                v-model:value="searchForm.isDateSort"
                class="min-w-[140px] flex-grow"
                placeholder="排序规则"
                @change="handleSearch"
              >
                <a-select-option :value="0">按相关性排序</a-select-option>
                <a-select-option :value="1">按时间排序</a-select-option>
              </a-select>

              <!-- 仅登录后显示该排序规则 -->
              <a-select
                v-model:value="searchForm.state"
                class="min-w-[140px] flex-grow"
                v-if="userStore.userInfo"
                @change="handleSearch"
                placeholder="指定借阅状态"
              >
                <a-select-option :value="null">所有书籍</a-select-option>
                <a-select-option :value="1">借阅书籍</a-select-option>
                <a-select-option :value="3">逾期书籍</a-select-option>
              </a-select>
            </div>
          </div>
        </a-config-provider>
      </div>
    </div>

    <div class="space-y-4">
      <div
        v-for="book in bookList"
        :key="book.isbn"
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
    </div>

    <div class="mt-12 flex justify-center" v-if="total > 0">
      <a-config-provider :theme="{ token: { colorPrimary: '#005daa' } }">
        <a-pagination
          v-model:current="searchForm.page"
          :total="total"
          :show-size-changer="false"
          show-less-items
          @change="handleSearch"
        />
      </a-config-provider>
    </div>
  </main>
</template>

<style></style>
