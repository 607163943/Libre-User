<script setup lang="ts">
import type { SearchLendForm } from '@/types/lend'
import { FilterOutlined } from '@ant-design/icons-vue'

const dateRange = defineModel<[string, string] | null>('dateRange', {
  required: true
})
const searchLendForm = defineModel<SearchLendForm>('searchLendForm', {
  required: true
})

const emit = defineEmits(['search'])
const handleSearch = () => {
  emit('search')
}
</script>
<template>
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
          <template #icon>
            <FilterOutlined />
          </template>
          筛选
        </a-button>
      </div>
    </div>
  </a-config-provider>
</template>
