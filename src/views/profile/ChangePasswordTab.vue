<script setup lang="ts">
import { ref } from 'vue'
import { updateUserPassword } from '@/api/user'
import type { UserPasswordSubmit } from '@/types/user'
import { message } from 'ant-design-vue'
import { LockOutlined, UnlockOutlined, SecurityScanOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 修改密码专属主题定制
const passwordTheme = {
  token: {
    colorPrimary: '#005daa',
    borderRadius: 4,
    colorBgContainer: '#e0e3e6',
    colorBorder: 'transparent',
    controlHeight: 46
  }
}

const router = useRouter()
const userStore = useUserStore()
// 修改密码
const handlePasswordReset = () => {
  const submitForm: UserPasswordSubmit = {
    oldPassword: passwordForm.value.oldPassword,
    newPassword: passwordForm.value.newPassword
  }
  updateUserPassword(submitForm)
    .then(() => {
      message.success('修改密码成功')
      userStore.setUserInfo(null)
      router.push({ name: 'Login' })
    })
    .catch((error) => console.log(error))
}
</script>

<template>
  <div class="animate-fade-in" id="security">
    <div class="flex items-start gap-6 mb-12">
      <div>
        <h2 class="text-2xl font-bold mb-1 font-headline">修改密码</h2>
      </div>
    </div>

    <a-config-provider :theme="passwordTheme">
      <a-form
        :model="passwordForm"
        layout="vertical"
        class="max-w-md space-y-6"
        @finish="handlePasswordReset"
      >
        <a-form-item
          label="旧密码"
          name="oldPassword"
          class="font-semibold text-on-surface-variant tracking-wide !mb-0"
        >
          <a-input-password v-model:value="passwordForm.oldPassword" placeholder="请输入旧密码">
            <template #prefix>
              <UnlockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item
          label="新密码"
          name="newPassword"
          class="font-semibold text-on-surface-variant tracking-wide !mb-0"
        >
          <a-input-password v-model:value="passwordForm.newPassword" placeholder="请输入新密码">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item
          label="确认新密码"
          name="confirmPassword"
          class="font-semibold text-on-surface-variant tracking-wide !mb-0"
        >
          <a-input-password
            v-model:value="passwordForm.confirmPassword"
            placeholder="请再次输入新密码"
          >
            <template #prefix>
              <SecurityScanOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <div class="pt-4 flex flex-col sm:flex-row items-center gap-6">
          <a-button
            type="primary"
            html-type="submit"
            class="w-full sm:w-auto px-8 !h-11 !font-semibold shadow-md hover:opacity-90 active:scale-95 transition-all text-sm tracking-wide"
          >
            保存
          </a-button>
        </div>
      </a-form>
    </a-config-provider>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
