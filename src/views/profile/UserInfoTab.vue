<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { UserProfileInfo, UserInfo } from '@/types/user'
import { getUserProfile, updateUserProfile } from '@/api/user'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/user'

// 定义表单数据
const formState = ref<UserProfileInfo>({
  name: '张三',
  email: 'zhangsan@libre.org',
  phone: '+86 138 0000 0000'
})

// 主题配置，局部修改输入框和按钮的样式以贴近原设计方案
const themeConfig = {
  token: {
    colorPrimary: '#005daa',
    borderRadius: 4,
    colorBgContainer: '#e0e3e6', // 对应 bg-surface-container-highest
    colorBorder: 'transparent',
    controlHeight: 44 // 增加高度以贴近原设计的 py-3
  }
}

// 保存个人信息
const userStore = useUserStore()
const handleSave = () => {
  console.log('保存个人信息', formState.value)
  updateUserProfile(formState.value)
    .then(() => {
      message.success('保存成功')
      handleUserInfo()
      userStore.setUserInfo({ ...userStore.userInfo, name: formState.value.name } as UserInfo)
    })
    .catch((error) => console.log(error))
}

// 上传头像
const handleUpload = () => {
  // TODO: 此处触发上传头像的逻辑与 API 请求
  console.log('触发上传头像')
}

// 获取用户信息
const handleUserInfo = async () => {
  getUserProfile()
    .then((res) => {
      formState.value = res.data.data
    })
    .catch((error) => console.log(error))
}

onMounted(() => {
  handleUserInfo()
})
</script>

<template>
  <div class="space-y-8 animate-fade-in" id="profile">
    <div>
      <h2 class="text-2xl font-bold mb-1 font-headline">个人信息</h2>
    </div>

    <a-config-provider :theme="themeConfig">
      <a-form layout="vertical" class="max-w-2xl space-y-6" :model="formState" @finish="handleSave">
        <div class="flex items-center gap-8 py-4">
          <div class="relative group">
            <img
              alt="Profile"
              class="w-24 h-24 rounded-lg object-cover ring-4 ring-surface-container-high"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtSNJaQ2gmW3ozMrpJcutfKW98sP99Bl9nkB054gmQSxRQfvceat7hEU--RNz2dO_ZjjKU9ZvPqaNCsduYwZ4kt8nO8P3HAI--BayxGQYtxBVUL6QTLSH9J9MVwLIltmVucQ6xTKYhzHwq4pEwwTfGupKSILdWs-LMM79vFuk12Gps8f1q2a6228idAtiKkoS0OzoecxvjquLfGKogAFeZ1CndQ_CbDLRL6LuIEzRcC8TKy_mpbFYbe16ZFdAaiQ9j5JnW5AqqaP0"
            />
            <button
              class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity"
              type="button"
              @click="handleUpload"
            >
              <span class="material-symbols-outlined text-white">用户头像</span>
            </button>
          </div>
          <div>
            <button
              class="px-4 py-2 bg-secondary-container text-on-secondary-container text-sm font-semibold rounded hover:brightness-95 transition-all"
              type="button"
              @click="handleUpload"
            >
              上传新图片
            </button>
            <p class="text-xs text-on-surface-variant mt-2">JPG, GIF or PNG. Max size of 800K</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <a-form-item
            label="用户姓名"
            name="name"
            class="!mb-0 font-semibold text-on-surface-variant"
          >
            <a-input v-model:value="formState.name" class="text-sm px-4 shadow-none" />
          </a-form-item>

          <a-form-item
            label="邮箱地址"
            name="email"
            class="!mb-0 font-semibold text-on-surface-variant"
          >
            <a-input
              v-model:value="formState.email"
              type="email"
              class="text-sm px-4 shadow-none"
            />
          </a-form-item>

          <a-form-item
            label="电话号码"
            name="phone"
            class="md:col-span-2 !mb-0 font-semibold text-on-surface-variant mt-4"
          >
            <a-input v-model:value="formState.phone" type="tel" class="text-sm px-4 shadow-none" />
          </a-form-item>
        </div>

        <div class="pt-4">
          <a-button
            type="primary"
            html-type="submit"
            class="px-8 !h-12 !font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
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
