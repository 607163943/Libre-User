<script setup lang="ts">
import { ref } from 'vue'
import { UserOutlined, LockOutlined, BankOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { LoginForm } from '@/types/login'
import { login } from '@/api/login'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

// 定义表单数据结构
const loginForm = ref<LoginForm>({
  username: '',
  password: ''
})

const loading = ref(false)

const userStore = useUserStore()
const router = useRouter()

/**
 * 处理登录逻辑
 */
const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    message.warning('请输入用户名和密码')
    return
  }

  loading.value = true

  login(loginForm.value)
    .then((res) => {
      userStore.setUserInfo(res.data.data)
      message.success('登录成功')
      router.push({ name: 'Home' })
    })
    .catch((error) => console.log(error))
    .finally(() => {
      loading.value = false
    })
}
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
              <BankOutlined class="text-white text-xl" />
            </div>
            <span class="font-headline text-3xl font-extrabold tracking-tight text-[#005daa]"
              >Libre</span
            >
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm overflow-hidden p-8 md:p-10">
          <div class="mb-8">
            <h1 class="font-headline text-2xl font-bold text-gray-900 mb-2">欢迎回来</h1>
            <p class="text-gray-500 text-sm">请输入您的凭据以访问档案系统。</p>
          </div>

          <a-form layout="vertical" :model="loginForm" @finish="handleLogin">
            <a-form-item label="用户名" name="username">
              <a-input
                v-model:value="loginForm.username"
                placeholder="请输入用户名"
                size="large"
                class="!rounded"
              >
                <template #prefix>
                  <UserOutlined class="text-gray-400" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item label="密码" name="password">
              <a-input-password
                v-model:value="loginForm.password"
                placeholder="请输入密码"
                size="large"
                class="!rounded"
              >
                <template #prefix>
                  <LockOutlined class="text-gray-400" />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                block
                size="large"
                :loading="loading"
                class="!h-12 !text-base !font-bold !bg-[#005daa] hover:!bg-[#0075d5] border-none transition-all active:scale-95"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>

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
        </div>
      </div>
    </main>

    <footer class="flex flex-col items-center justify-center w-full pb-8">
      <div class="flex flex-wrap justify-center gap-6 mb-4">
        <a
          class="text-xs text-slate-400 hover:text-blue-500 underline transition-colors"
          href="javascript:;"
          >隐私政策</a
        >
        <a
          class="text-xs text-slate-400 hover:text-blue-500 underline transition-colors"
          href="javascript:;"
          >服务条款</a
        >
        <a
          class="text-xs text-slate-400 hover:text-blue-500 underline transition-colors"
          href="javascript:;"
          >帮助中心</a
        >
      </div>
      <p class="text-xs text-slate-500 opacity-80">© 2024 Libre 图书管理系统</p>
    </footer>
  </div>
</template>

<style scoped>
/* 如果有特殊的自定义动画或 Ant Design 样式覆盖可以写在这里 */
:deep(.ant-input-affix-wrapper-lg) {
  padding: 10px 15px;
}
</style>
