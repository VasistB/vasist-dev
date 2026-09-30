import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base path ensures builds load properly on GitHub Pages regardless of repository name or custom domain
  base: './',
})
