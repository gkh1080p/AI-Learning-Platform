<template>
    <div>  
      <div class="user">
        <img src="../../../assets/user.jpg" alt="" class="userimg" />
        <div class="title">Hi~~ 早上好</div>
      </div>
  
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        background-color="#434a50"
        text-color="#fbfbfb"
        active-text-color="#ffd04b"
        :router="true"
        :unique-opened="true"
      >
        <SidebarItem v-for="item in menuData" :key="item.path" :menu-item="item" />
      </el-menu>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useRoute } from "vue-router";
  import SidebarItem from "./SidebarItem.vue";
  
  const route = useRoute();
  const activeMenu = computed(() => route.path);
  
  const menuData = ref([
    {
      path: "/user/SelfMessage",
      name: "信息设置",
      icon: "House",
    },
    {
      path: "/user",
      name: "个人进度",
      icon: "User",
      children: [
        {
          path: "/user/learn",
          name: "学习",
        },
        {
          path: "/user/add",
          name: "添加用户",
        },
      ],
    },
    {
      path: "/user/settings",
      name: "系统设置",
      icon: "Setting",
      children: [
        {
          path: "/user/settings/general",
          name: "通用设置",
        },
        {
          path: "/user/settings/security",
          name: "安全设置",
          children: [
            {
              path: "/user/settings/security/password",
              name: "修改密码",
            },
          ],
        },
      ],
    },
  ]);
  </script>
  
  
  <style scoped>
  .el-menu-vertical {
    width: 100%;
    height: 500px;
  }
  .user {
    width: 99.7%;
    height: 100px;
    padding-left: 10px;
    margin: 0%;
    background-color: #4d5256;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .userimg {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    
  }
  .title {
    height: 100px;
    line-height: 100px;
    text-align: center;
    margin-left: 20px;
  }
  </style>
  