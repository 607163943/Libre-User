<script setup lang="ts">
import type { SearchForm } from '@/types/search'
const searchForm = defineModel<SearchForm>('searchForm', {
  required: true
})
const { total } = defineProps<{
  total: number
}>()

defineEmits(['pageChange'])
</script>

<template>
  <div class="mt-12 flex justify-center" v-if="total > 0">
    <a-config-provider :theme="{ token: { colorPrimary: '#005daa' } }">
      <a-pagination
        v-model:current="searchForm.page"
        :total="total"
        :show-size-changer="false"
        show-less-items
        @change="() => $emit('pageChange')"
      />
    </a-config-provider>
  </div>
</template>
