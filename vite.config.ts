import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vite-project/',
  plugins: [react()],
})

// Path: vite-project/src/App.tsx