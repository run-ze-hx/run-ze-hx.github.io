import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/my-tech-blog/', // 替换为你的仓库名
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
})
