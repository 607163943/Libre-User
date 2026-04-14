<script setup lang="ts">
defineOptions({
  name: 'LayoutFooter'
})
</script>
<template>
  <footer class="bg-slate-50 py-12 mt-auto">
    <div class="flex flex-col items-center gap-4 w-full border-t border-slate-200 pt-8">
      <div class="flex gap-8 text-xs font-inter uppercase tracking-wider">
        <a class="text-slate-500 hover:text-blue-500" href="#">About</a>
        <a class="text-slate-500 hover:text-blue-500" href="#">Privacy Policy</a>
        <a class="text-slate-500 hover:text-blue-500" href="#">Contact Support</a>
      </div>
      <p class="text-xs font-inter uppercase tracking-wider text-slate-500">
        © 2026 Libre Library Management System | 毕业设计项目
      </p>
    </div>
  </footer>
</template>
