import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import MongoCrx from 'vite-plugin-mongo-crx'
import manifest from './manifest.config'

export default defineConfig({
  plugins: [MongoCrx({ manifest }), vue()],
  build: {
    rollupOptions: {
      input: {
        options: path.resolve(__dirname, 'options.html'),
        popup: path.resolve(__dirname, 'popup.html')
      }
    }
  }
})
