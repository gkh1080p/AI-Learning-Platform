//**样式 */
import './assets/main.css'
import 'element-plus/dist/index.css'; 
// //图标
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

app.use(ElementPlus) // 引入 Element Plus

app.mount('#app')
