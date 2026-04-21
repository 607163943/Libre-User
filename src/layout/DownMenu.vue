<script setup lang="ts">
import { UserOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { logout } from '@/api/login'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

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

<style scoped>
/* 下拉菜单项悬停色微调 */
:deep(.libre-user-menu .ant-menu-item:hover) {
  background-color: #eff6ff;
}

:deep(.libre-user-menu .ant-menu-item-danger:hover) {
  background-color: #fff1f0;
}
</style>
