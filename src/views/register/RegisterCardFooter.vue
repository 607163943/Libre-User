<template>
  <div class="mt-10 text-center">
    <p class="text-sm text-[#404753]">
      已有账户?
      <router-link
        class="text-[#005daa] font-semibold hover:underline decoration-2 underline-offset-4 ml-1"
        :to="{ name: 'Login', replace: true }"
        >回到登录</router-link
      >
    </p>
  </div>
</template>
