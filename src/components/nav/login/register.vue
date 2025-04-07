<!-- 忘记密码 -->
<template>
  <el-form :model="form" :rules="rules" ref="retrieveFormRef" label-position="top">
    <!-- 邮箱 -->
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱" clearable @blur="debounceValidate('email')" />
    </el-form-item>

    <!-- 人机验证码（加法题） -->
    <el-form-item :label="`请输入验证码（${captcha.question}）`" prop="captchaInput">
      <el-input v-model="form.captchaInput" placeholder="请输入答案" clearable  @blur="debounceValidate('captchaInput')"/>
    </el-form-item>

    <!-- 邮箱验证码 -->
    <el-form-item label="邮箱验证码" prop="emailCode">
      <div style="display: flex; gap: 10px">
        <el-input v-model="form.emailCode" placeholder="请输入验证码" clearable style="flex: 1" @blur="debounceValidate('emailCode')"/>
        <el-button :disabled="!canSendCode" @click="sendEmailCode">获取验证码</el-button>
      </div>
    </el-form-item>

    <!-- 新密码 -->
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码" show-password @blur="debounceValidate('newPassword')" />
    </el-form-item>
    <!-- 确认密码 -->
    <el-form-item label="确认新密码" prop="confirmPassword">
      <el-input v-model="form.confirmPassword" placeholder="请再次输入新密码" show-password  @blur="debounceValidate('confirmPassword')" />
    </el-form-item>

    <!-- 操作按钮 -->
    <div style="text-align: right; margin-top: 20px;margin-bottom:20px;display: flex;justify-content: center;">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">确认</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { debounce } from '@/components/utils/debounce' // 引入防抖函数
export default defineComponent({
  name: 'retrieve',
  emits: ['closeDialog'],
  setup(_, { emit }) {
    // 表单数据
    const form = reactive({
      email: '',
      captchaInput: '',
      emailCode: '',
      newPassword: '',
      confirmPassword: '',
    })

    // 简单人机验证码
    const captcha = reactive({
      question: '',
      answer: 0,
    })

    // 创建加法验证码
    const generateCaptcha = () => {
      const a = Math.floor(Math.random() * 10)
      const b = Math.floor(Math.random() * 10)
      captcha.question = `${a} + ${b}`
      captcha.answer = a + b
    }

    generateCaptcha()

    // 是否可发送验证码
    const canSendCode = computed(() => {
      return form.email && parseInt(form.captchaInput) === captcha.answer
    })

    // 表单验证规则
    const rules: FormRules = {
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: ['blur'] },
      ],
      captchaInput: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        {
          validator: (_rule, value, callback) => {
            if (parseInt(value) !== captcha.answer) {
              callback(new Error('验证码错误'))
            } else {
              callback()
            }
          },
          trigger: 'blur',
        },
      ],
      emailCode: [{ required: true, message: '请输入邮箱验证码', trigger: 'blur' }],
      newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 8, message: '密码长度不能少于8位', trigger: ['blur'] },
      ],
      confirmPassword: [
        { required: true, message: '请确认新密码', trigger: 'blur' },
        {
          validator: (_: any, value: string, callback: any) => {
            if (value !== form.newPassword) {
              callback(new Error('两次输入的密码不一致'))
            } else {
              callback()
            }
          },
          trigger: 'blur',
        },
      ],
    }

    const retrieveFormRef = ref<FormInstance>()

    // 发送邮箱验证码
    const sendEmailCode = () => {
      if (!canSendCode.value) {
        ElMessage.error('请填写正确的邮箱和验证码')
        return
      }
      ElMessage.success(`验证码已发送至 ${form.email}`)
      // 模拟发送验证码逻辑
    }

    // 提交重置
    const submit = () => {
      retrieveFormRef.value?.validate((valid: boolean) => {
        if (valid) {
          ElMessage.success('密码重置成功')
          emit('closeDialog')
        } else {
          ElMessage.error('请完整填写表单')
        }
      })
    }

    // 取消按钮
    const cancel = () => {
      emit('closeDialog')
    }

    // 防抖的验证函数
    const debounceValidate = debounce((field: string) => {
      retrieveFormRef.value?.validateField(field)
    }, 500)
    return {
      form,
      captcha,
      rules,
      canSendCode,
      retrieveFormRef,
      sendEmailCode,
      submit,
      cancel,
      debounceValidate
    }
  },
})
</script>

<style scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>
