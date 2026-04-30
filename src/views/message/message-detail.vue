<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BankOutlined, ArrowLeftOutlined } from '@ant-design/icons-vue'
import { getMessageDetail } from '@/api/message'
import { useRoute } from 'vue-router'
import type { MessageDetail } from '@/types/message'

const route = useRoute()

// 响应式数据
const messageData = ref<MessageDetail>({
  id: 0,
  title: '',
  content: '',
  createTime: '',
  type: 0
})

const handleGetMessageDetail = async (id: number) => {
  getMessageDetail(id).then((res) => {
    messageData.value = res.data.data
  })
}

// 初始化请求数据
onMounted(() => {
  handleGetMessageDetail(Number(route.params.id))
})
</script>

<template>
  <div class="min-h-screen bg-[#f7f9fc] p-4 md:p-8 font-sans text-[#191c1e]">
    <main class="px-4">
      <div class="mb-8 flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <a-config-provider :theme="{ token: { colorPrimary: '#005daa' } }">
            <a-button
              type="link"
              class="p-0 mb-2 flex items-center gap-1 group"
              @click="() => $router.back()"
            >
              <template #icon><ArrowLeftOutlined /></template>
              <span class="group-hover:translate-x-[-2px] transition-transform">返回</span>
            </a-button>
          </a-config-provider>
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">图书到期提醒</h1>
        </div>
      </div>

      <a-card :bordered="false" class="rounded-xl shadow-md overflow-hidden">
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#005daa]"
            >
              <BankOutlined />
            </div>
            <div>
              <h3 class="font-bold text-lg text-slate-800">系统通知</h3>
              <p class="text-xs text-slate-500">Libre 数字化图书馆流通部</p>
            </div>
          </div>
          <div class="md:text-right">
            <p class="text-xs text-slate-400">发送时间</p>
            <p class="text-sm font-semibold text-slate-700">
              {{ messageData.createTime || '未知' }}
            </p>
          </div>
        </div>

        <a-divider class="my-6" />

        <div class="py-2">
          {{ messageData.content }}
        </div>
      </a-card>
    </main>
  </div>
</template>

<style scoped>
/* 局部定制卡片阴影 */
:deep(.ant-card) {
  box-shadow: 0 12px 32px rgba(0, 93, 170, 0.04);
}
</style>
