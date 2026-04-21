<script setup lang="ts">
import { BankOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <div class="min-h-screen bg-[#f0f2f5] flex flex-col font-body text-on-surface antialiased">
    <main class="flex-grow flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-[400px]">
        <div class="flex flex-col items-center justify-center w-full mb-8">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-[#0075d5] flex items-center justify-center rounded-lg shadow-md"
            >
              <BankOutlined class="text-white" style="font-size: 24px" />
            </div>
            <span class="font-headline text-3xl font-extrabold tracking-tight text-[#005daa]"
              >Libre</span
            >
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm overflow-hidden p-8 md:p-10">
          <!-- 卡片内容区域 -->
          <slot name="login-card-header" />
          <slot name="login-card-content" />
          <slot name="login-card-footer" />
        </div>
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
