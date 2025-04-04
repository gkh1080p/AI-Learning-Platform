<template>
  <TopNav></TopNav>
  <router-view>
  </router-view>

</template>
   


<script>

import TopNav from '@/components/nav/index.vue'
import Home from '@/components/main/index.vue'
import { ElButton } from 'element-plus';
export default{
  components:{Home,TopNav,ElButton}
}
</script>
<style lang="less" scoped>

</style>

