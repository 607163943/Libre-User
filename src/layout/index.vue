<script setup lang="ts">
import Menu from './Menu.vue'
import Footer from './Footer.vue'
</script>

<template>
  <div class="bg-surface text-on-surface min-h-screen flex flex-col font-body">
    <Menu />
    <router-view />

    <Footer />
  </div>
</template>

<style>
/* 字体家族适配 */
.font-body,
.font-label {
  font-family: 'Inter', sans-serif;
}
</style>
