<template>
  <el-form :model="form" :rules="rules" ref="codeFormRef" label-position="top">
    <!-- 邮箱 -->
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱" clearable />
    </el-form-item>

    <!-- 人机校验码（比如 3 + 4） -->
    <el-form-item prop="captchaInput">
  <template #label>
    请输入验证码（{{ captcha.question }}）
  </template>
  <el-input v-model="form.captchaInput" placeholder="请输入答案" clearable />
</el-form-item>


    <!-- 邮箱验证码 -->
    <el-form-item label="邮箱验证码" prop="emailCode">
      <el-input
        v-model="form.emailCode"
        placeholder="请输入验证码"
        clearable
        style="width: 60%"
      />
      <el-button
        style="margin-left: 10px"
        :disabled="!canSendCode"
        @click="sendEmailCode"
      >
        获取验证码
      </el-button>
    </el-form-item>
  </el-form>

  <!-- 底部按钮 -->
  <div style="text-align: right; margin-top: 20px">
    <el-button @click="cancel">取消</el-button>
    <el-button type="primary" @click="submit">确认</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 表单数据
const form = reactive({
  email: '',
  captchaInput: '',
  emailCode: '',
})

// 验证规则
const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] },
  ],
  captchaInput: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    {
      validator: (_:any, value:any, callback:any) => {
        if (parseInt(value) !== captcha.answer) {
          callback(new Error('验证码错误'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  emailCode: [
    { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
  ],
}

// 表单引用
const codeFormRef = ref()

// 简单人机校验问题
const captcha = reactive({
  question: '',
  answer: 0,
})

// 生成校验题
function generateCaptcha() {
  const a = Math.floor(Math.random() * 10)
  const b = Math.floor(Math.random() * 10)
  captcha.question = `${a} + ${b} = ?`
  captcha.answer = a + b
}
generateCaptcha()

// 是否允许发送验证码
const canSendCode = computed(() => {
  return form.email && parseInt(form.captchaInput) === captcha.answer
})

// 模拟发送验证码
function sendEmailCode() {
  if (!canSendCode.value) {
    ElMessage.error('请填写正确的邮箱和验证码')
    return
  }
  ElMessage.success(`验证码已发送到邮箱 ${form.email}！`)
}

// 点击确认按钮
function submit() {
  codeFormRef.value.validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('登录成功！')
      emit('closeDialog') // 关闭弹窗
    } else {
      ElMessage.error('请完整填写表单')
    }
  })
}

// 取消按钮
function cancel() {
  emit('closeDialog')
}

// 向父组件触发关闭弹窗事件
const emit = defineEmits(['closeDialog'])
</script>

<style scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>
