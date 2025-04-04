<template>
    <el-row class="userhome"> 
      <el-col :span="6" class="user_left">
        <UserLeft></UserLeft>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="17" class="user_right">
        <router-view name="UserSelf" >
        </router-view>
      </el-col>
    </el-row>
</template>

<script lang="ts">
import learn from './UserRight/learn.vue';
import UserLeft from './UserLeft/index.vue'
export default {
  name: "User",
  setup() {
  
    return {  };
  },
  components:{UserLeft,learn}
 
};
</script>

<style lang="less" scoped>
*{
  padding: 0%;
  margin: 0%;
}
.userhome{
  margin-top: 1%;
  margin-left: 15%;
  margin-right: 15%;
}
.user_left{
  box-sizing: border-box;
}
// .user_right {
//   height: 200px;
//   background-color: blue;
// }
</style>