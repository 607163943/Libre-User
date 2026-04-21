<script setup lang="ts" generic="T extends object">
import { toRefs } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'

const props = defineProps<{
  form: T
  rules: Record<string, Rule[]>
  submitButtonText: string
  loading: boolean
}>()

// 加载标志
const { loading } = toRefs(props)

// 提交按钮文本
const { submitButtonText } = toRefs(props)

// 表单数据模型
const { form } = toRefs(props)

// 表单校验规则
const { rules } = toRefs(props)
defineEmits(['submit'])
</script>
<template>
  <a-form
    layout="vertical"
    :model="form"
    :rules="rules"
    @finish="() => $emit('submit')"
    class="archival-form"
  >
    <slot name="form-items" />

    <a-form-item class="pt-4">
      <a-button
        type="primary"
        html-type="submit"
        block
        size="large"
        :loading="loading"
        class="!h-12 !text-base !font-bold !bg-[#005daa] hover:!bg-[#0075d5] border-none transition-all active:scale-95"
      >
        <span v-if="loading">正在处理...</span>
        <span v-else class="flex items-center gap-2">
          {{ submitButtonText }}
        </span>
      </a-button>
    </a-form-item>
  </a-form>
</template>
