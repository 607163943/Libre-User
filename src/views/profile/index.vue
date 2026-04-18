<script setup lang="ts">
import { ref } from 'vue'
import UserInfo from './UserInfoTab.vue'
import ChangePasswordTab from './ChangePasswordTab.vue'
import MyLendTab from './MyLendTab.vue'
import HistoryTab from './HistoryTab.vue'
import {
  UserOutlined,
  LockOutlined,
  BookOutlined,
  HistoryOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'
// 定义侧边栏菜单选项
const menuItems = [
  { key: 'profile', icon: UserOutlined, label: '个人信息', component: UserInfo },
  { key: 'password', icon: LockOutlined, label: '修改密码', component: ChangePasswordTab },
  { key: 'lend', icon: BookOutlined, label: '个人借阅', component: MyLendTab },
  { key: 'history', icon: HistoryOutlined, label: '借阅历史', component: HistoryTab }
]
import { logout } from '@/api/login'
import { useRouter } from 'vue-router'

const activeTab = ref('profile')
const router = useRouter()

const handleLogout = () => {
  logout().then(() => {
    // 跳转到登录页面
    router.push({ name: 'Login' })
  })
}
</script>

<template>
  <main class="flex-grow pt-24 pb-12 px-6 bg-[#f0f2f5]">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      <aside class="w-full md:w-64 flex-shrink-0">
        <div class="bg-surface-container-low rounded-xl p-4 space-y-1 shadow-sm">
          <div class="px-4 py-2 mb-2">
            <h2
              class="font-headline font-bold text-sm tracking-widest text-on-surface-variant uppercase"
            >
              个人中心
            </h2>
          </div>

          <a
            v-for="item in menuItems"
            :key="item.key"
            @click="activeTab = item.key"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer"
            :class="
              activeTab === item.key
                ? 'bg-surface-container-lowest text-primary shadow-sm border-l-4 border-primary font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-high font-medium'
            "
          >
            <component :is="item.icon" class="text-[20px]" />
            <span class="text-sm">{{ item.label }}</span>
          </a>

          <div class="pt-6 px-4">
            <div class="h-[1px] bg-outline-variant/30 w-full mb-6"></div>
          </div>
          <a
            @click="handleLogout"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error-container/20 transition-colors cursor-pointer"
          >
            <component :is="LogoutOutlined" class="text-[20px]" />
            <span class="text-sm font-medium">退出登录</span>
          </a>
        </div>
      </aside>

      <section class="flex-1 bg-surface-container-lowest md:bg-transparent rounded-lg p-6 md:p-0">
        <component :is="menuItems.find((m) => m.key === activeTab)?.component" />
      </section>
    </div>
  </main>
</template>

<style>
/* 全局需要的字体和图标基础样式 */
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
  display: inline-block;
  vertical-align: middle;
}
.font-headline {
  font-family: 'Manrope', sans-serif;
}
.font-body {
  font-family: 'Inter', sans-serif;
}
</style>
