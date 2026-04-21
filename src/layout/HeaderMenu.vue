<script setup lang="ts">
import { useRoute } from 'vue-router'

// 导航列表
type MenuItem = {
  label: string
  name: string
}
const menuItems: MenuItem[] = [
  { label: '首页', name: 'Home' },
  { label: '检索', name: 'Search' },
  { label: '我的借阅', name: 'MyLend' }
]
const route = useRoute()

/** 导航链接激活样式 */
const navClass = (routeName: string) =>
  route.name === routeName
    ? 'text-blue-600 border-b-2 border-blue-600 font-semibold px-1 py-4 text-sm'
    : 'text-slate-600 hover:text-blue-500 transition-colors px-1 py-4 text-sm'
</script>
<template>
  <div class="hidden md:flex gap-6">
    <RouterLink
      v-for="menuItem in menuItems"
      :key="menuItem.name"
      :class="navClass(menuItem.name)"
      :to="{ name: menuItem.name }"
      >{{ menuItem.label }}</RouterLink
    >
  </div>
</template>
