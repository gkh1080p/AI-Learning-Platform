import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// 定义路由规则，使用懒加载方式引入组件
const routes: Array<RouteRecordRaw> = [
  // 首页路由
  {
    path: "/",
    name: "Home",
    component: () => import('../components/main/index.vue'),
  },

  // 个人中心路由
  {
    path: "/user",
    name: "User",
    component: () => import('../components/user/index.vue'),
    redirect: '/user/learn',
    children: [
      {
        path: 'learn', // 个人学习记录页面
        name: 'learn',
        components: {
          UserSelf: () => import('../components/user/UserRight/learn.vue'),
        },
      }
    ]
  },

  // 视频播放页面路由
  {
    path: '/video',
    name: 'video',
    component: () => import('../components/video/video.vue'),
    // 重定向到 tabList 并携带课程 id
    redirect: (to) => ({
      path: '/video/tabList',
      query: {
        course_id: to.query.id || localStorage.getItem('courseId') || '1'
      }
    }),
    children: [
      {
        path: 'tabList', // 课程目录页
        name: 'tabList',
        components: {
          video: () => import('../components/video/tabList.vue')
        },
      },
      {
        path: 'fileList', // 讲义查看页
        name: 'fileList',
        components: {
          video: () => import('../components/video/fileList.vue')
        }
      },
      {
        path: 'commentList', // 评论页
        name: 'commentList',
        components: {
          video: () => import('../components/video/commentList.vue')
        }
      }
    ]
  },

  // 登录注册相关页面
  {
    path: '/login',
    redirect: '/video/tabList',
    children: [
      {
        path: 'password', // 密码登录
        name: 'password',
        components: {
          default: () => import('../components/main/index.vue'),
          login: () => import('../components/nav/login/password.vue')
        }
      },
      {
        path: 'code', // 验证码登录
        name: 'code',
        components: {
          default: () => import('../components/main/index.vue'),
          login: () => import('../components/nav/login/code.vue')
        }
      },
      {
        path: 'register', // 注册页面
        name: 'register',
        components: {
          default: () => import('../components/main/index.vue'),
          login: () => import('../components/nav/login/register.vue')
        }
      },
      {
        path: 'retrieve', // 忘记密码页面
        name: 'retrieve',
        components: {
          default: () => import('../components/main/index.vue'),
          login: () => import('../components/nav/login/retrieve.vue')
        }
      },
    ]
  },

  // 工具分享页面
  {
    path: '/tool',
    name: 'tool',
    component: () => import('../components/tool/tool.vue')
  },

  // 查看更多页面
  {
    path: '/morefull',
    name: 'morefull',
    component: () => import('../components/morefull/morefull.vue')
  },
  //全部课程页面
  {
    path: "/allCourse",
    name: "allCourse",
    component: () => import('../components/allCourse/allcourse.vue'),
  },
  // 404 页面
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import('../components/notFound/notFound.vue'),
  },
  
];

// 创建路由实例，使用 HTML5 History 模式
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
