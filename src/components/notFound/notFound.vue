<!-- src/views/NotFound.vue -->
<template>
    <div class="not-found-container">
      <div class="content">
        <h1 class="error-code">404</h1>
        <h2 class="error-message">Oops! 页面不存在</h2>
        <p class="sub-text">您访问的页面可能已被删除或暂时不可用</p>
        <router-link to="/" class="home-link">
          <el-button type="primary" size="large">返回首页</el-button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  // 不需要复杂逻辑时，setup 可以直接为空
  </script>
  
  <style scoped>
  .not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f7fa;
  }
  
  .content {
    text-align: center;
    padding: 40px;
    border-radius: 8px;
    background: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .error-code {
    font-size: 120px;
    color: #f56c6c;
    margin: 0;
    line-height: 1;
  }
  
  .error-message {
    font-size: 24px;
    color: #606266;
    margin: 20px 0;
  }
  
  .sub-text {
    color: #909399;
    margin-bottom: 30px;
  }
  
  .home-link {
    text-decoration: none;
  }
  </style>