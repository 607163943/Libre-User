<script setup lang="ts">
import { MessageOutlined } from '@ant-design/icons-vue'
import { getUnreadCount } from '@/api/message'
import { onMounted, ref } from 'vue'
const unReadCount = ref(0)
const loadData = () => {
  getUnreadCount().then((res) => {
    unReadCount.value = res.data.data
  })
}
onMounted(() => {
  loadData()
})
</script>
<template>
  <a-config-provider
    :theme="{
      components: {
        Button: {
          fontSize: 20,
          paddingInline: 12
        }
      }
    }"
  >
    <!-- 工具按钮 -->
    <div class="flex items-center">
      <a-badge :count="unReadCount" dot>
        <a-button
          type="text"
          class="flex items-center justify-center !p-6"
          @click="() => $router.push({ name: 'Message' })"
        >
          <template #icon><MessageOutlined /></template>
        </a-button>
      </a-badge>
    </div>
  </a-config-provider>
</template>
