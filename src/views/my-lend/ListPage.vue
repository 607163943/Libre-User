<script setup lang="ts">
import type { PageForm } from '@/types/common'

const pageForm = defineModel<PageForm>('pageForm', {
  required: true
})
const { total } = defineProps<{
  total: number
}>()
defineEmits(['pageChange'])
</script>
<template>
  <div class="flex items-center justify-center pt-8">
    <a-config-provider :theme="{ token: { colorPrimary: '#005daa', borderRadius: 4 } }">
      <a-pagination
        v-model:current="pageForm.page"
        :total="total"
        show-less-items
        @change="() => $emit('pageChange')"
      />
    </a-config-provider>
  </div>
</template>
