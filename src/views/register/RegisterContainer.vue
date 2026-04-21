<script setup lang="ts"></script>
<template>
  <div class="bg-[#f7f9fc] font-sans text-[#191c1e] min-h-screen flex flex-col">
    <header class="flex flex-col items-center justify-center w-full px-6 pt-12">
      <div class="text-2xl font-bold text-[#005daa] mb-2 font-headline">Libre</div>
      <div class="h-1 w-12 bg-[#005daa] rounded-full opacity-20"></div>
    </header>

    <main class="flex-grow flex items-center justify-center p-6">
      <div
        class="w-full max-w-[420px] bg-white rounded-lg p-8 md:p-10 shadow-sm border border-slate-100"
      >
        <slot name="register-card-header" />
        <slot name="register-card-content" />
        <slot name="register-card-footer" />
      </div>
    </main>

    <footer class="flex flex-col items-center justify-center w-full pb-8">
      <div class="flex flex-wrap justify-center gap-6 mb-4">
        <span class="text-xs text-slate-400 underline transition-colors">隐私政策</span>
        <span class="text-xs text-slate-400 underline transition-colors">服务条款</span>
        <span class="text-xs text-slate-400 underline transition-colors">帮助中心</span>
      </div>
      <p class="text-xs text-slate-500 opacity-80">© 2026 Libre</p>
    </footer>
  </div>
</template>
