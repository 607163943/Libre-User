<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  ArrowRightOutlined
} from '@ant-design/icons-vue'
import type { RegisterForm, RegisterSubmitForm } from '@/types/register'
import { register } from '@/api/register'
import { useRouter } from 'vue-router'
import type { Rule } from 'ant-design-vue/es/form'
import { generateMD5 } from '@/utils/security-utils'

// 表单数据模型
const registerForm = ref<RegisterForm>({
  username: '',
  password: '',
  confirmPassword: ''
})

// 表单校验规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: async (_rule: Rule, value: string) => {
        if (value !== registerForm.value.password) {
          throw new Error('两次输入的密码不一致')
        }
      },
      trigger: 'change'
    }
  ]
}

const loading = ref(false)

const router = useRouter()
/**
 * 处理注册事件
 */
const handleRegister = () => {
  loading.value = true
  const tempForm: RegisterSubmitForm = {
    username: registerForm.value.username,
    password: generateMD5(registerForm.value.password)
  }
  register(tempForm)
    .then(() => {
      message.success('注册成功')
      router.push({ name: 'Login' })
    })
    .catch((error) => console.log(error))
    .finally(() => {
      loading.value = false
    })
}
</script>

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
        <div class="mb-10 text-center">
          <h1 class="text-2xl font-extrabold text-[#191c1e] tracking-tight mb-2">创建账户</h1>
          <p class="text-[#404753] text-sm">加入专业图书馆管理系统。</p>
        </div>

        <a-form
          layout="vertical"
          :model="registerForm"
          :rules="rules"
          @finish="handleRegister"
          class="archival-form"
        >
          <a-form-item name="username">
            <template #label>
              <span class="text-xs font-semibold uppercase tracking-wider text-[#404753]"
                >用户名</span
              >
            </template>
            <a-input
              v-model:value="registerForm.username"
              placeholder="请输入用户名"
              class="archival-input"
            >
              <template #prefix>
                <user-outlined class="text-slate-400" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password">
            <template #label>
              <span class="text-xs font-semibold uppercase tracking-wider text-[#404753]"
                >密码</span
              >
            </template>
            <a-input-password
              v-model:value="registerForm.password"
              placeholder="请输入密码"
              class="archival-input"
            >
              <template #prefix>
                <lock-outlined class="text-slate-400" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item name="confirmPassword" has-feedback>
            <template #label>
              <span class="text-xs font-semibold uppercase tracking-wider text-[#404753]"
                >确认密码</span
              >
            </template>
            <a-input-password
              v-model:value="registerForm.confirmPassword"
              placeholder="确认密码"
              class="archival-input"
            >
              <template #prefix>
                <safety-certificate-outlined class="text-slate-400" />
              </template>
            </a-input-password>
          </a-form-item>

          <div class="pt-4">
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-[#005daa] text-white font-bold py-3.5 rounded-sm shadow-md hover:bg-[#0075d5] transition-all active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              <span v-if="loading">正在处理...</span>
              <span v-else class="flex items-center gap-2">
                注册
                <arrow-right-outlined class="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </a-form>

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
      </div>
    </main>

    <footer class="flex flex-col items-center justify-center w-full mt-auto pb-8">
      <div class="flex gap-6 mb-4">
        <a class="text-xs text-slate-400 hover:text-[#005daa] underline opacity-80" href="#"
          >隐私政策</a
        >
        <a class="text-xs text-slate-400 hover:text-[#005daa] underline opacity-80" href="#"
          >服务条款</a
        >
        <a class="text-xs text-slate-400 hover:text-[#005daa] underline opacity-80" href="#"
          >帮助中心</a
        >
      </div>
      <div class="text-[10px] text-slate-500 uppercase tracking-widest opacity-50 font-medium">
        © 2024 Libre 图书管理系统
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* 修改 Ant Design Vue 原生样式以匹配设计稿 */

/* 1. 输入框基础样式定制 */
:deep(.ant-input-affix-wrapper) {
  padding: 10px 12px;
  background-color: #e0e3e6; /* surface-container-highest */
  border: none !important;
  border-radius: 2px;
  transition: all 0.2s;
}

:deep(.ant-input-affix-wrapper:hover) {
  background-color: #eceef1;
}

:deep(.ant-input-affix-wrapper-focused) {
  background-color: #ffffff !important;
  box-shadow: 0 0 0 1px #005daa !important;
}

/* 2. 内部 Input 样式 */
:deep(.ant-input) {
  background: transparent !important;
  font-size: 14px;
}

/* 3. 标签与间距微调 */
:deep(.ant-form-item) {
  margin-bottom: 24px;
}

:deep(.ant-form-item-label) {
  padding-bottom: 4px !important;
}

/* 4. 移除验证后的默认红色阴影，保持极简感 */
:deep(.ant-form-item-has-error .ant-input-affix-wrapper) {
  background-color: #fff1f0;
}

/* 5. 动画微调 */
.group:hover .anticon {
  color: #005daa;
}
</style>
