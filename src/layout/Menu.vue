<script setup lang="ts">
import { computed } from 'vue'
import {
  MessageOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  DownOutlined
} from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { logout } from '@/api/login'

defineOptions({
  name: 'LayoutMenu'
})

const userStore = useUserStore()
const router = useRouter()

/** 用户名首字母，用于头像占位 */
const avatarChar = computed<string>(() => {
  const name = userStore.userInfo?.name
  return name ? name.charAt(0).toUpperCase() : '?'
})

const onMenuClick = ({ key }: { key: string }) => {
  if (key === 'profile') {
    router.push({ name: 'Profile' })
  } else if (key === 'logout') {
    logout()
      .then(() => {
        userStore.setUserInfo(null)
        router.push({ name: 'Login' })
      })
      .catch((error) => console.log(error))
  }
}
</script>

<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="flex justify-between items-center px-8 h-16 w-full max-w-[1440px] mx-auto">
      <!-- 左侧：Logo + 导航链接 -->
      <div class="flex items-center gap-8">
        <span
          class="text-2xl font-bold text-blue-600 tracking-tight cursor-pointer select-none"
          @click="() => $router.push({ name: 'Home' })"
          >Libre</span
        >

        <div class="hidden md:flex gap-6">
          <RouterLink
            class="text-blue-600 border-b-2 border-blue-600 font-semibold px-1 py-4 text-sm"
            :to="{ name: 'Home' }"
            >首页</RouterLink
          >
          <RouterLink
            class="text-slate-600 hover:text-blue-500 transition-colors px-1 py-4 text-sm"
            :to="{ name: 'Search' }"
            >检索</RouterLink
          >
          <RouterLink
            class="text-slate-600 hover:text-blue-500 transition-colors px-1 py-4 text-sm"
            :to="{ name: 'MyLend' }"
            >我的借阅</RouterLink
          >
        </div>
      </div>

      <!-- 右侧：通知 / 设置 + 用户区域 -->
      <div class="flex items-center gap-4">
        <!-- 工具按钮 -->
        <div class="flex items-center gap-1">
          <a-badge :count="0" dot>
            <a-button type="text" class="flex items-center justify-center">
              <template #icon><MessageOutlined /></template>
            </a-button>
          </a-badge>
          <a-button type="text" class="flex items-center justify-center">
            <template #icon><SettingOutlined /></template>
          </a-button>
        </div>

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
                <a-avatar
                  :size="34"
                  class="bg-blue-600 text-white font-bold text-sm flex-shrink-0"
                  >{{ avatarChar }}</a-avatar
                >
                <span
                  class="hidden sm:inline text-sm font-medium text-slate-700 max-w-[96px] truncate"
                >
                  {{ userStore.userInfo.name }}
                </span>
                <DownOutlined class="text-slate-400 text-[10px]" />
              </div>

              <!-- 下拉菜单 -->
              <template #overlay>
                <a-menu @click="onMenuClick" class="libre-user-menu min-w-[140px]">
                  <a-menu-item key="profile">
                    <template #icon><UserOutlined /></template>
                    个人中心
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="logout" danger>
                    <template #icon><LogoutOutlined /></template>
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-config-provider>
        </template>

        <!-- ===== 未登录：提示文本 + 登录按钮 ===== -->
        <template v-else>
          <div class="flex items-center gap-3">
            <span class="hidden sm:inline text-xs text-slate-400 select-none">
              登录后解锁全部功能
            </span>
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
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* 下拉菜单项悬停色微调 */
:deep(.libre-user-menu .ant-menu-item:hover) {
  background-color: #eff6ff;
}

:deep(.libre-user-menu .ant-menu-item-danger:hover) {
  background-color: #fff1f0;
}
</style>
