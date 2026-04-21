<script setup lang="ts">
defineOptions({
  name: 'LayoutFooter'
})
</script>
<template>
  <footer class="bg-slate-50 py-12 mt-auto">
    <div class="flex flex-col items-center gap-4 w-full border-t border-slate-200 pt-8">
      <div class="flex gap-8 text-xs font-inter uppercase tracking-wider">
        <span class="text-slate-500">关于</span>
        <span class="text-slate-500">隐私政策</span>
        <span class="text-slate-500">联系支持</span>
      </div>
      <p class="text-xs font-inter uppercase tracking-wider text-slate-500">© 2026 Libre</p>
    </div>
  </footer>
</template>
