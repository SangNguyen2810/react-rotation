import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'



export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/contexts': resolve(__dirname, './src/contexts'),
      '@/utils': resolve(__dirname, './src/utils'),
      '@/constants': resolve(__dirname, './src/constants'),
      '@/assets': resolve(__dirname, './src/assets'),
    },
  },
})
