import { createApp } from 'vue'
import { createPinia } from 'pinia' // 引入 Pinia
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(createPinia()) // 使用 Pinia
app.use(router)
app.use(ElementPlus)
app.mount('#app')
