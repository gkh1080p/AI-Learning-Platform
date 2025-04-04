import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router"; 

// 导入页面组件
// 首页
import Home from '../components/main/index.vue';
// 出错页面 
import notFound from "../components/notFound/notFound.vue";
// 个人中心
import User from '../components/user/index.vue';
// 个人中心的页面路由
import learn from  '../components/user/UserRight/learn.vue'
//视频播放页面
import video from "../components/video/video.vue";

// 定义路由规则
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user",
    name: "User",
    component: User,
    redirect: '/user/learn',
    children:[
      {
        path: 'learn', // 相对路径，
        name:'learn',
        components : {  
          UserSelf: learn, // 右侧边栏内容
        },
      }
    ]
  },
  {
    path:'/vodei',
    name:'vodei',
    component:video,
    props: route => ({ id: route.query.id })

  },
  {
    path: "/:catchAll(.*)", // 捕获所有未匹配的路由
    name: "NotFound",
    component: notFound,
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式
  routes,
});

// 导出路由实例
export default router;
