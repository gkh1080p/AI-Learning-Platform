//**样式 */
import './assets/main.css'
import 'element-plus/dist/index.css'; 
// 路由
import router from "./router"; // 导入路由
// Font Awesome图标
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp as fasThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as farThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'


// 添加需要的图标到库中
library.add(fasThumbsUp, farThumbsUp, faFire)


const app = createApp(App)
// 全局注册组件
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router); // 注册路由
app.use(ElementPlus) // 引入 Element Plus
app.mount('#app')
