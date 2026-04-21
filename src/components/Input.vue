<script setup lang="ts">
import type { Component } from 'vue'
defineOptions({
  name: 'CommonInput'
})
const { placeholder, autocomplete, preIcon, type } = defineProps<{
  placeholder: string
  autocomplete?: string
  type?: 'text' | 'password'
  preIcon?: Component
}>()

const inputValue = defineModel<string>('inputValue')
</script>
<template>
  <template v-if="type === 'password'">
    <a-input-password
      v-model:value="inputValue"
      :placeholder="placeholder"
      size="large"
      class="!rounded-xl"
      :autocomplete="autocomplete"
    >
      <template #prefix>
        <component :is="preIcon" class="text-gray-400" />
      </template>
    </a-input-password>
  </template>
  <template v-else>
    <a-input
      v-model:value="inputValue"
      :placeholder="placeholder"
      size="large"
      class="!rounded-xl"
      :autocomplete="autocomplete"
    >
      <template #prefix>
        <component :is="preIcon" class="text-gray-400" />
      </template>
    </a-input>
  </template>
</template>
