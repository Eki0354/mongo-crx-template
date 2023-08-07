import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        options: path.resolve(__dirname, 'options.html'),
        popup: path.resolve(__dirname, 'popup.html')
      }
    }
  }
})
