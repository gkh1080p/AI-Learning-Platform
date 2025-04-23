<template>
  <el-row :gutter="10" class="master">
    <el-col :span="2"></el-col>
    <!-- 课程分类（搜索框关闭时显示） -->
    <el-col :span="14" v-if="!isActive">
      <el-row :gutter="1">
        <el-col :span="4">
          <router-link to="/" >
            <div class="nav ">
              <el-image class="nav_one" style="width: 100px; height: 100px" src="https://i.imgur.com/EJ3x16E.png"
                fit="contain" />
            </div>
          </router-link>
        </el-col>
        <el-col :span="4">
          <div class="nav">教师系统</div>
        </el-col>
        <el-col :span="4">
          <router-link to="/allCourse" class="nav_link">
            <div class="nav">全部课程</div>
          </router-link>
        </el-col>
        <el-col :span="4">
          <router-link to="/tool" class="tool">
            <div class="nav">工具箱</div>
          </router-link>
        </el-col>
        <el-col :span="8" class="custom-hidden-xs"></el-col>
      </el-row>
    </el-col>

    <!-- 搜索框（点击按钮后显示） -->
    <el-col :span="18" v-if="isActive">
      <el-input v-model="keyword" class="search-input" placeholder="请输入关键词" clearable ref="searchBox">
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
      </el-input>
    </el-col>

    <!-- 搜索按钮 -->
    <el-col :span="4" v-if="!isActive">
      <div class="search-container">
        <!-- 在模板中修改搜索按钮，添加 .stop 修饰符 -->
        <el-button class="search-btn" type="primary" @click.stop="openSearch">
          <el-icon>
            <Search />
          </el-icon>
        </el-button>
      </div>
    </el-col>

    <!-- 登录/注册 -->
    <el-col :span="4" v-if="!isLogin">
      <el-row>
        <el-col :span="13" class="Login">
          <el-button size="large" type="success" @click="openLogin">
            登录
          </el-button>
        </el-col>
        <el-col :span="11" class="register">
          <el-button size="large" type="primary" plain @click="openLogin_register">注册</el-button>
        </el-col>
      </el-row>
    </el-col>
    <!-- 已经登录完成 -->
    <el-col :span="4" v-if="isLogin">
      <router-link to="/User"><el-image class="userImg" style="width: 45px; height: 45px"
          src="https://i.imgur.com/ys4iemx.jpeg" fit="cover" /></router-link>
    </el-col>
  </el-row>


  <!-- 登录弹窗 -->
  <el-dialog v-model="dialogVisible" :title="$route.path === '/login/register' ? '注册用户' : '用户登录'" width="500px"
    :before-close="handleClose" class="login-dialog" center>
    <!-- 表单内容 -->
    <div class="form-wrapper">
      <router-view name="login" @closeDialog="dialogVisible = false"></router-view>
      <div class="password_or_code" v-if="$route.path !== '/login/register'">
        <el-link @click="$router.push('/login/password')">密码登录</el-link>
        <el-divider direction="vertical" />
        <el-link @click="$router.push('/login/code')">验证码登录</el-link>
        <el-divider direction="vertical" />
        <el-link @click="$router.push('/login/retrieve')">忘记密码?</el-link>
      </div>
    </div>


  </el-dialog>

</template>

<script lang="ts">
import { Search } from "@element-plus/icons-vue";
import { useSearchInput } from "./index.ts";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import router from "../../router/index.ts";
export default {
  name: "TopNav",
  setup() {
    // 弹窗标志
    const dialogVisible = ref(false)
    const router = useRouter()
    const openLogin = () => {
      dialogVisible.value = true
      router.push('/login/password')
    }
    const openLogin_register = () => {
      dialogVisible.value = true
      router.push('/login/register')
    }
    const handleClose = () => {
      dialogVisible.value = false
    }


    const { isActive, isLogin, keyword, searchBox, openSearch } = useSearchInput();
    return {
      isActive,
      isLogin,
      keyword,
      searchBox,
      openSearch,
      //登录所需变量
      dialogVisible,
      handleClose,
      openLogin,
      openLogin_register
    };
  },
  components: { Search, }
};
</script>

<style lang="less" scoped>
.master {
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
  text-decoration: none;
  color: black;
  
}

.nav_one {
  display: block;
  width: 200px;
  border-radius: 20px;
}

.nav:hover {
  color: #fe9900;
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

// 用户头像样式
.userImg {
  border-radius: 50%;
}

.Login {
  display: flex;
  justify-content: end;
  padding-right: 20px;
}

// 弹窗样式
.login-dialog .form-wrapper {
  padding: 10px 0;
}

.el-dialog__header {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input {
  width: 100%;
}

.password_or_code {
  display: flex;
  justify-content: center;
  user-select: none;
  /* 禁止选中 */
}

// 工具箱格式
.tool{
  text-decoration: none !important; /* 强制所有元素无下划线 */
  color: black;
}

// Remove underline from 全部课程 link
.nav_link {
  text-decoration: none !important;
  color: black;
}

</style>
