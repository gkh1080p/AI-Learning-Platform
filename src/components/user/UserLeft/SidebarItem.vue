<template>
  <!-- 有子菜单 -->
  <el-sub-menu v-if="props.menuItem.children" :index="props.menuItem.path" :route="{ path: props.menuItem.path }">
    <template #title>
      <el-icon v-if="iconComponent"><component :is="iconComponent" /></el-icon>
      <span>{{ props.menuItem.name }}</span>
    </template>
    <SidebarItem v-for="child in props.menuItem.children" :key="child.path" :menu-item="child" />
  </el-sub-menu>

  <!-- 无子菜单 -->
  <el-menu-item v-else :index="props.menuItem.path" :route="{ path: props.menuItem.path }">
    <el-icon v-if="iconComponent"><component :is="iconComponent" /></el-icon>
    <span>{{ props.menuItem.name }}</span>
  </el-menu-item>
</template>

<script setup>
import { computed } from "vue";
import * as Icons from "@element-plus/icons-vue";

const props = defineProps({
  menuItem: Object, // 递归渲染菜单项
});

// 动态加载图标组件
const iconComponent = computed(() => Icons[props.menuItem.icon] || null);
</script>
