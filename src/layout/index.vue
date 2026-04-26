<script setup lang="ts">
import Header from './Header.vue'
import Footer from './Footer.vue'
import Container from './Container.vue'
import UserInfo from './UserInfo.vue'
import ToolButton from './ToolButton.vue'
import HeaderMenu from './HeaderMenu.vue'
import HeaderLogo from './HeaderLogo.vue'
</script>

<template>
  <Container>
    <template #header>
      <Header>
        <!-- 左侧：Logo + 导航链接 -->
        <template #left>
          <HeaderLogo />
          <HeaderMenu />
        </template>

        <!-- 右侧：通知 / 设置 + 用户区域 -->
        <template #right>
          <ToolButton />
          <UserInfo />
        </template>
      </Header>
    </template>

    <template #content>
      <transition name="page-fade" mode="out-in">
        <router-view />
      </transition>
    </template>

    <template #footer>
      <Footer />
    </template>
  </Container>
</template>

<style>
.page-fade-enter-active {
  animation: pageFadeIn 0.35s ease-out;
}
.page-fade-leave-active {
  animation: pageFadeOut 0.2s ease-in;
}
@keyframes pageFadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes pageFadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
