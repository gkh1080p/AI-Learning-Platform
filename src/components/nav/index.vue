<template>
  <el-row :gutter="10" class="master">
    <el-col :span="2"></el-col>
    <!-- 课程分类（搜索框关闭时显示） -->
    <el-col :span="14" v-if="!isActive">
      <el-row :gutter="5">
        <el-col :span="4"><div class="nav">课程分类</div></el-col>
        <el-col :span="4"><div class="nav">课程分类</div></el-col>
        <el-col :span="4"><div class="nav">课程分类</div></el-col>
        <el-col :span="4"><div class="nav">课程分类</div></el-col>
        <el-col :span="8" class="custom-hidden-xs"></el-col>
      </el-row>
    </el-col>

    <!-- 搜索框（点击按钮后显示） -->
    <el-col :span="18" v-if="isActive">
      <el-input
        v-model="keyword"
        class="search-input"
        placeholder="请输入关键词"
        clearable
        ref="searchBox"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </el-col>

    <!-- 搜索按钮 -->
    <el-col :span="4" v-if="!isActive">
      <div class="search-container">
        <!-- 在模板中修改搜索按钮，添加 .stop 修饰符 -->
<el-button 
   
  class="search-btn" 
  type="primary" 
  @click.stop="openSearch"
>
  <el-icon><Search /></el-icon>
</el-button>
      </div>  
    </el-col>

    <!-- 登录/注册 -->
    <el-col :span="4" v-if="!isLogin">
      <el-row>
        <el-col :span="13"><el-button size="large" type="success">登录</el-button></el-col>
        <el-col :span="11"><el-button size="large" type="primary" plain>注册</el-button></el-col>
      </el-row>
    </el-col>
    <el-col :span="4" v-if="isLogin">
      <router-link to="/User"><el-button size="large" type="success" >个人主页</el-button></router-link> 
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Search } from "@element-plus/icons-vue";
import { useSearchInput } from "./index.ts";
import {  } from "element-plus";
export default {
  name: "TopNav",
  setup() {
    const { isActive,isLogin, keyword, searchBox, openSearch } = useSearchInput();
    return { isActive,isLogin, keyword, searchBox, openSearch };
  },
  components: { Search ,}
};
</script>

<style lang="less" scoped>
.master{
  display: flex;
  align-items: center;
  height: 100px; 
  background-color: #e5e5e5;
  
}
.nav {
  cursor: pointer;
  font-size: 22px;
  align-items: center;
  height: 100px;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}
.nav:hover{
  color: rgba(239, 50, 81, 0.6);
}

@media (max-width: 767px) {
  .custom-hidden-xs {
    display: none !important;
  }
}

.search-container {
  float: right;
}

.search-btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  right: 0;
}

.search-input {
  width: 100%;
  transition: width 0.3s ease-in-out;
}
</style>
