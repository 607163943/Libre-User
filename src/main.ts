import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css'
import './styles/index.css'
import Antd from 'ant-design-vue'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Antd)

app.mount('#app')
