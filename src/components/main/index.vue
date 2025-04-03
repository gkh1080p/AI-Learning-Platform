<template>
  <div class="first">
    <TopNav></TopNav>
    <Carousel ></Carousel>
    <ListClass class="BaseClass"></ListClass> 
  </div>
</template>
<script lang="ts">
import TopNav from './top_nav/index.vue';
import Carousel from './Carousel/index.vue';
import ListClass from './ListClass/index.vue';
export default {
  name:'Main',
  components: {
    TopNav,
    Carousel,
    ListClass
  }
};

</script>
<style lang="less" scoped> 
.first{
  width: 100%;
}

</style>