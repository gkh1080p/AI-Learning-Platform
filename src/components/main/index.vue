<template>
  <div class="first">
    <Carousel ></Carousel>
    <ListClass></ListClass> 
  </div>
</template>
<script lang="ts">
import Carousel from './Carousel/index.vue';
import ListClass from './ListClass/index.vue';
export default {
  name:'Home',
  components: {
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