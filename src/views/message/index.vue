<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CheckCircleOutlined, InfoCircleOutlined, PayCircleOutlined } from '@ant-design/icons-vue'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import type { searchMessageForm } from '@/types/message'
import type { MessageItem } from '@/types/message'
import { getMessageList, getUnreadCount } from '@/api/message'
// --- 局部主题配置 (a-config-provider) ---
const tabsTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    marginLG: 0
  }
}

const listTheme: ThemeConfig = {
  token: {
    paddingContentVerticalLG: 16
  }
}

// 搜索
const searchForm = ref<searchMessageForm>({
  page: 1,
  pageSize: 10,
  type: 0
})

const loading = ref(false)

// 模拟数据
const messageList = ref<MessageItem[]>([])

// --- 业务逻辑 ---
const handleSearch = async () => {
  loading.value = true
  // TODO: 请求后端消息列表接口 [cite: 4]
  getMessageList(searchForm.value).then((res) => {
    messageList.value = res.data.data.data
  })
  // const res = await getMessageList({ page: currentPage.value, status: activeKey.value });
  loading.value = false
}

const unReadCount = ref(0)

const handleUnReadCount = () => {
  getUnreadCount().then((res) => {
    unReadCount.value = res.data.data
  })
}

const markAllAsRead = () => {
  // TODO: 调用全部已读接口
  messageList.value.forEach((msg) => (msg.isRead = 1))
}

onMounted(() => {
  handleSearch()
  handleUnReadCount()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-8">
    <main class="py-8 px-4">
      <h2 class="text-2xl font-semibold mb-6">我的消息</h2>

      <div
        class="bg-white rounded-lg shadow-sm border p-6 flex flex-col h-[calc(100vh-160px)] min-h-[500px]"
      >
        <div class="flex justify-between items-center mb-4 border-b shrink-0">
          <a-config-provider :theme="tabsTheme">
            <a-tabs v-model:activeKey="searchForm.type" @change="handleSearch" :tab-bar-gutter="32">
              <a-tab-pane :key="0" tab="全部消息" />
              <a-tab-pane :key="1" :tab="unReadCount === 0 ? `未读` : `未读 (${unReadCount})`" />
              <a-tab-pane :key="2" tab="已读" />
            </a-tabs>
          </a-config-provider>

          <a-button type="link" @click="markAllAsRead" class="pb-3"> 全部标记为已读 </a-button>
        </div>

        <div class="flex-1 overflow-y-auto pr-2">
          <a-config-provider :theme="listTheme">
            <a-list :loading="loading" item-layout="horizontal" :data-source="messageList">
              <template #renderItem="{ item }">
                <a-list-item
                  class="hover:bg-gray-50 transition-colors cursor-pointer px-4"
                  @click="() => $router.push({ name: 'MessageDetail', params: { id: item.id } })"
                >
                  <a-list-item-meta>
                    <template #title>
                      <div class="flex justify-between items-center">
                        <div class="flex items-center space-x-2">
                          <div
                            v-if="item.isRead === 0"
                            class="w-2 h-2 rounded-full bg-red-500"
                          ></div>
                          <span
                            :class="[
                              'font-medium',
                              item.isRead === 1 ? 'text-gray-500' : 'text-gray-800'
                            ]"
                          >
                            {{ item.title }}
                          </span>
                        </div>
                        <span class="text-sm text-gray-400 font-normal">{{ item.createTime }}</span>
                      </div>
                    </template>
                    <template #description>
                      <div class="mt-1 text-gray-600">
                        {{ item.content }}
                      </div>
                    </template>
                    <template #avatar>
                      <div class="mt-1">
                        <info-circle-outlined
                          v-if="item.type === 1"
                          class="text-orange-500 text-lg"
                        />
                        <check-circle-outlined
                          v-else-if="item.type === 2"
                          class="text-green-500 text-lg"
                        />
                        <pay-circle-outlined v-else class="text-blue-500 text-lg" />
                      </div>
                    </template>
                  </a-list-item-meta>
                </a-list-item>
              </template>
            </a-list>
          </a-config-provider>
        </div>

        <div class="flex justify-center mt-4 pt-4 shrink-0 border-t">
          <a-pagination
            v-model:current="searchForm.page"
            :total="50"
            :show-size-changer="false"
            :hideOnSinglePage="true"
            @change="handleSearch"
          >
            <template #itemRender="{ type, originalElement }">
              <component
                :is="originalElement"
                v-if="type === 'page' || type === 'prev' || type === 'next'"
              />
            </template>
          </a-pagination>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* 针对 Ant Design 默认样式的微调，配合 Tailwind 使用 */
:deep(.ant-tabs-nav) {
  margin-bottom: 0 !important;
}
:deep(.ant-tabs-nav::before) {
  border-bottom: none !important;
}
:deep(.ant-list-item) {
  border-bottom: 1px solid #f0f0f0;
}
:deep(.ant-list-item:last-child) {
  border-bottom: none;
}
</style>
