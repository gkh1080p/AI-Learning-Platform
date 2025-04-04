import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router"; 

// 导入页面组件
import Home from '../components/main/index.vue';
import User from '../components/user/index.vue';
// import About from "@/views/About.vue";
// import NotFound from "@/views/NotFound.vue";

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
  },
//   {
//     path: "/user/:id", // 动态路由
//     name: "User",
//     component: () => import("@/views/User.vue"), // 懒加载组件
//     props: true, // 将路由参数作为组件的 props 传递
//   },
//   {
//     path: "/:catchAll(.*)", // 捕获所有未匹配的路由
//     name: "NotFound",
//     component: NotFound,
//   },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式
  routes,
});

// 导出路由实例
export default router;
