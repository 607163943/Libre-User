<script setup lang="ts"></script>
<template>
  <div class="mt-8 text-center border-t border-gray-100 pt-6">
    <p class="text-gray-500 text-sm">
      还没有账号？
      <router-link
        class="font-semibold text-[#005daa] hover:underline transition-colors"
        :to="{ name: 'Register', replace: true }"
        >立即注册</router-link
      >
    </p>
  </div>
</template>
