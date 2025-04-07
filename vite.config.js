import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 取消代理
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://118.178.132.54:8080',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})
