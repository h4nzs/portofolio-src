import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base: '/portofolio/', // Uncomment this for GitHub Pages deployment
  optimizeDeps: {
    include: ['framer-motion'],
  },
})
