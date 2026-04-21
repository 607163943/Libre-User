<script setup lang="ts">
import { MessageOutlined } from '@ant-design/icons-vue'
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
      <a-badge :count="0" dot>
        <a-button type="text" class="flex items-center justify-center !p-6">
          <template #icon><MessageOutlined /></template>
        </a-button>
      </a-badge>
    </div>
  </a-config-provider>
</template>
