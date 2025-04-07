// utils/request.js
import axios from 'axios'

// 创建实例
const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE, // 替换成你的后端接口地址
  timeout: 5000, // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 你可以在这里统一添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // 添加其他默认 headers
    config.headers['Content-Type'] = 'application/json'

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 根据实际接口结构调整返回数据
    if (response.status === 200) {
      return response.data
    } else {
      console.error('接口请求异常', response)
      return Promise.reject(new Error(response.statusText))
    }
  },
  error => {
    console.error('网络错误', error)
    return Promise.reject(error)
  }
)

export default service
