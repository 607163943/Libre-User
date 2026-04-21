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
      <router-view />
    </template>

    <template #footer>
      <Footer />
    </template>
  </Container>
</template>

<style></style>
