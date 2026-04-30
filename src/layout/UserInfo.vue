<script setup lang="ts">
import { computed } from 'vue'
import { LoginOutlined, DownOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import DownMenu from './DownMenu.vue'

const userStore = useUserStore()
const router = useRouter()

/** 用户名首字母，用于头像占位 */
const avatarChar = computed<string>(() => {
  const name = userStore.userInfo?.name
  return name ? name.charAt(0).toUpperCase() : '?'
})
</script>
<template>
  <!-- ===== 已登录：头像 + 姓名 + 下拉菜单 ===== -->
  <template v-if="userStore.userInfo">
    <a-config-provider
      :theme="{
        components: {
          Dropdown: {
            borderRadiusLG: 10,
            paddingBlock: 6
          }
        }
      }"
    >
      <a-dropdown placement="bottomRight" :trigger="['hover']">
        <!-- 触发区域 -->
        <div
          class="flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors duration-200 select-none"
        >
          <a-avatar :size="34" class="bg-blue-600 text-white font-bold text-sm flex-shrink-0">{{
            avatarChar
          }}</a-avatar>
          <span class="hidden sm:inline text-sm font-medium text-slate-700 max-w-[96px] truncate">
            {{ userStore.userInfo.name }}
          </span>
          <DownOutlined class="text-slate-400 text-[10px]" />
        </div>

        <!-- 下拉菜单 -->
        <template #overlay>
          <DownMenu />
        </template>
      </a-dropdown>
    </a-config-provider>
  </template>

  <!-- ===== 未登录：提示文本 + 登录按钮 ===== -->
  <template v-else>
    <div class="flex items-center gap-3">
      <span class="hidden sm:inline text-xs text-slate-400 select-none"> 登录后解锁全部功能 </span>
      <a-config-provider
        :theme="{
          components: {
            Button: {
              colorPrimary: '#2563eb',
              borderRadius: 8,
              controlHeight: 34
            }
          }
        }"
      >
        <a-button
          type="primary"
          @click="router.push({ name: 'Login' })"
          class="flex items-center gap-1"
        >
          <template #icon><LoginOutlined /></template>
          登录
        </a-button>
      </a-config-provider>
    </div>
  </template>
</template>
