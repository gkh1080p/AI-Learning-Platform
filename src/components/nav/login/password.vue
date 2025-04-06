<template>
    <el-form :model="loginForm" :rules="rules" ref="loginRef" label-position="top">
        <el-form-item label="账号" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入账号" clearable
                style="height: 44px; font-size: 16px" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" show-password placeholder="请输入密码" clearable
                style="height: 44px; font-size: 16px" />
        </el-form-item>
    </el-form>
    <!-- 按钮区 -->
    <div style="display: flex; justify-content: center;width: 100%;margin-bottom: 20px;">
        <el-button @click="login()">取消</el-button>
        <el-button type="primary" @click="submitLogin">登录</el-button>
    </div>

</template>
<script lang="ts">
import { ref } from "vue";
import { ElMessage } from 'element-plus'
export default {

    name: 'password',
    setup(props, context) {
       
        // 收集账号密码
        const loginForm = ref({
            username: '',
            password: ''
        })
        const rules = {
            username: [{ required: true, message: '请输入账号', trigger: 'blur' },
            {
                type: 'email',
                message: '邮箱格式不正确',
                trigger: ['blur', 'change']
            }],
            password: [{ required: true, message: '请输入密码', trigger: 'blur' },
            {
                min: 8,
                message: '密码不能少于8位',
                trigger: ['blur', 'change']
            }
            ]
        }
        const loginRef = ref()

        const login = () => {
            context.emit('closeDialog')
        }
        const submitLogin = () => {
            loginRef.value.validate((valid: boolean) => {
                if (valid) {
                    // 模拟登录
                    ElMessage.success('登录成功！')
                    //  重置表单
                    loginRef.value.resetFields()
                    //  关闭弹窗
                    login();
                } else {
                    ElMessage.error('请输入完整的账号和密码')
                }
            })
        }

        return {
            login,
            loginForm,
            rules,
            loginRef,
            submitLogin,
        }
    }
}


</script>