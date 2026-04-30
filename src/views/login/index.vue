<script setup lang="ts">
import { ref } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { LoginForm } from '@/types/login'
import { login } from '@/api/login'
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import { generateMD5 } from '@/utils/security-utils'
import SubmitForm from '@/components/SubmitForm.vue'
import Input from '@/components/Input.vue'
import LoginContainer from './LoginContainer.vue'
import LoginCardHeader from './LoginCardHeader.vue'
import LoginCardFooter from './LoginCardFooter.vue'

// 定义表单数据结构
const loginForm = ref<LoginForm>({
  username: '',
  password: ''
})

const loading = ref(false)

const userStore = useUserStore()
const router = useRouter()
// 表单检验规则
const rules: Record<string, Rule[]> = {
  username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }]
}
/**
 * 处理登录逻辑
 */
const handleLogin = async () => {
  loading.value = true

  // 密码md5加密
  const tempLoginForm = { ...loginForm.value }
  tempLoginForm.password = generateMD5(tempLoginForm.password)
  login(tempLoginForm)
    .then((res) => {
      userStore.setUserInfo(res.data.data)
      message.success('登录成功')
      router.push({ name: 'Home', replace: true })
    })
    .catch((error) => console.log(error))
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <LoginContainer>
    <template #login-card-header>
      <LoginCardHeader />
    </template>
    <template #login-card-content>
      <SubmitForm
        :loading="loading"
        :rules="rules"
        :form="loginForm"
        submitButtonText="登录"
        @submit="handleLogin"
      >
        <template #form-items>
          <a-form-item label="用户名" name="username" has-feedback>
            <Input
              v-model:inputValue="loginForm.username"
              placeholder="请输入用户名"
              autocomplete="username"
              :preIcon="UserOutlined"
              :size="'large'"
            />
          </a-form-item>

          <a-form-item label="密码" name="password" has-feedback>
            <Input
              v-model:inputValue="loginForm.password"
              placeholder="请输入密码"
              autocomplete="current-password"
              :preIcon="LockOutlined"
              type="password"
              :size="'large'"
            />
          </a-form-item>
        </template>
      </SubmitForm>
    </template>
    <template #login-card-footer>
      <LoginCardFooter />
    </template>
  </LoginContainer>
</template>

<style scoped>
/* 如果有特殊的自定义动画或 Ant Design 样式覆盖可以写在这里 */
:deep(.ant-input-affix-wrapper-lg) {
  padding: 10px 15px;
}
</style>
