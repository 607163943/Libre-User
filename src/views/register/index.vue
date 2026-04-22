<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons-vue'
import type { RegisterForm, RegisterSubmitForm } from '@/types/register'
import { register } from '@/api/register'
import { useRouter } from 'vue-router'
import type { Rule } from 'ant-design-vue/es/form'
import { generateMD5 } from '@/utils/security-utils'
import SubmitForm from '@/components/SubmitForm.vue'
import RegisterContainer from './RegisterContainer.vue'
import RegisterCardFooter from './RegisterCardFooter.vue'
import RegisterCardHeader from './RegisterCardHeader.vue'
import Input from '@/components/Input.vue'

const loading = ref(false)

// 表单数据模型
const registerForm = ref<RegisterForm>({
  username: '',
  password: '',
  confirmPassword: ''
})

// 表单校验规则
const rules: Record<string, Rule[]> = {
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

const router = useRouter()

// 处理注册事件
const handleRegister = () => {
  loading.value = true
  const tempForm: RegisterSubmitForm = {
    username: registerForm.value.username,
    password: generateMD5(registerForm.value.password)
  }
  register(tempForm)
    .then(() => {
      message.success('注册成功')
      router.push({ name: 'Login', replace: true })
    })
    .catch((error) => console.log(error))
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <RegisterContainer>
    <template #register-card-header>
      <RegisterCardHeader />
    </template>
    <template #register-card-content>
      <SubmitForm
        :submitButtonText="'注册'"
        :loading="loading"
        :form="registerForm"
        :rules="rules"
        :submit="handleRegister"
      >
        <template #form-items>
          <a-form-item name="username" has-feedback>
            <template #label>
              <span class="text-xs font-semibold uppercase tracking-wider text-[#404753]"
                >用户名</span
              >
            </template>
            <Input
              v-model:inputValue="registerForm.username"
              :icon="UserOutlined"
              placeholder="请输入用户名"
              autocomplete="username"
              :size="'large'"
            />
          </a-form-item>

          <a-form-item name="password" has-feedback>
            <template #label>
              <span class="text-xs font-semibold uppercase tracking-wider text-[#404753]"
                >密码</span
              >
            </template>
            <Input
              v-model:inputValue="registerForm.password"
              :icon="LockOutlined"
              placeholder="请输入密码"
              :type="'password'"
              autocomplete="new-password"
              :size="'large'"
            />
          </a-form-item>

          <a-form-item name="confirmPassword" has-feedback>
            <template #label>
              <span class="text-xs font-semibold uppercase tracking-wider text-[#404753]"
                >确认密码</span
              >
            </template>
            <Input
              v-model:inputValue="registerForm.confirmPassword"
              :icon="SafetyCertificateOutlined"
              placeholder="确认密码"
              :type="'password'"
              autocomplete="new-password"
              :size="'large'"
            />
          </a-form-item>
        </template>
      </SubmitForm>
    </template>
    <template #register-card-footer>
      <RegisterCardFooter />
    </template>
  </RegisterContainer>
</template>

<style scoped></style>
