<template>
    <el-sub-menu v-if="menuItem.children" :index="menuItem.path">
      <template #title>
        <el-icon><component :is="menuItem.icon || 'Menu'"></component></el-icon>
        <span>{{ menuItem.name }}</span>
      </template>
      <SidebarItem v-for="child in menuItem.children" :key="child.path" :menu-item="child" />
    </el-sub-menu>
  
    <el-menu-item v-else :index="menuItem.path">
      <el-icon v-if="menuItem.icon"><component :is="menuItem.icon"></component></el-icon>
      <span>{{ menuItem.name }}</span>
    </el-menu-item>
  </template>
  
  <script setup>
  defineProps({
    menuItem: Object, // 递归渲染菜单项
  });
  </script>
  