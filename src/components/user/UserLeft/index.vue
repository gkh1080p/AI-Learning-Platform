<template>
    <div class="user">
        <img src="../../../assets/user.jpg" alt="" class="userimg">
        <div class="title">Hi~~ 早上好</div>
    </div>
    <el-menu  :default-active="activeMenu" class="el-menu-vertical" background-color="#434a50" text-color="#fbfbfb"
        active-text-color="#ffd04b" :router="true" :unique-opened="true">
        <SidebarItem v-for="item in menuData" :key="item.path" :menu-item="item" />
    </el-menu>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import SidebarItem from "./SidebarItem.vue"; // 递归组件
export default {
    name: 'UserLeft',
    setup() {
        // 当前激活菜单
        const route = useRoute();
        const activeMenu = computed(() => route.path);

        // 菜单数据
        const menuData = ref([
            {
                path: "/dashboard",
                name: "首页",
                icon: "House",
            },
            {
                path: "/user",
                name: "用户管理",
                icon: "User",
                children: [
                    {
                        path: "/user/list",
                        name: "用户列表",
                    },
                    {
                        path: "/user/add",
                        name: "添加用户",
                    },
                ],
            },
            {
                path: "/settings",
                name: "系统设置",
                icon: "Setting",
                children: [
                    {
                        path: "/settings/general",
                        name: "通用设置",
                    },
                    {
                        path: "/settings/security",
                        name: "安全设置",
                        children: [
                            {
                                path: "/settings/security/password",
                                name: "修改密码",
                            },
                        ],
                    },
                ],
            },
        ]);

        return { route, activeMenu, menuData }
    },
    components: {
        SidebarItem,
    },
}


</script>

<style scoped>
.el-menu-vertical {
    width: 100%;
    height: 500px;
}
.user{
    width: 99.7%;
    height: 100px;
    padding-left: 10px;
    margin: 0%;
    background-color: #4d5256;
    box-sizing: border-box;
    display: flex;
    justify-items: center;
    
}
.userimg{
    width: 80px;
    height: 80px;
    border-radius: 50%  ;
    margin-top: 10px;
}
.title{
    height: 100px;
    line-height: 100px;
    text-align: center;
    margin-left: 20px;
}


</style>