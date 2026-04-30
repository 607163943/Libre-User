import axios, { AxiosError } from 'axios'
import { useUserStore } from '@/stores/modules/user'
import router from '@/router'
import { message } from 'ant-design-vue'
import type { Result } from '@/types/common'

const instance = axios.create({
  baseURL: '/api/app',
  timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    if (userStore.userInfo) {
      config.headers[userStore.userInfo.tokenName] = userStore.userInfo.tokenValue
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error: AxiosError<Result<object>>) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const res = error.response
    // 认证失败
    if (res?.status === 401) {
      const userStore = useUserStore()
      userStore.setUserInfo(null)
      router.push({ name: 'Login' })
      message.error('登录已过期，请重新登录')
    }

    // 走后端接口的错误响应
    if (res?.data?.msg) {
      message.error(res.data.msg)
    } else {
      // 未知错误响应
      message.error('操作失败，请联系管理员！')
    }

    return Promise.reject(error)
  }
)

export default instance
