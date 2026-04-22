<script setup lang="ts">
import type { SearchForm } from '@/types/search'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const searchForm = defineModel<SearchForm>('searchForm', {
  required: true
})

// 正在使用搜索表单
const usingSearchForm = defineModel<SearchForm>('usingSearchForm', {
  required: true
})
const { total, isSearch } = defineProps<{
  total: number
  isSearch: boolean
}>()

// 处理搜索
const emit = defineEmits(['search']) // 传递事件
const handleSearch = () => {
  emit('search')
}
</script>
<template>
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
              <p class="text-on-surface-variant text-sm" v-if="isSearch && usingSearchForm.keyword">
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
</template>
