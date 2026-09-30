import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // If deploying to GitHub Pages under a subpath (e.g. username.github.io/portfolio),
  // set base: '/portfolio/'
  base: '/',
})
