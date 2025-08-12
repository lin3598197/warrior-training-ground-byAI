import { defineConfig } from 'vite'

export default defineConfig({
  base: '/warrior-training-ground-byAI/',
  build: {
    outDir: 'dist',
    assetsDir: 'static'
  },
  server: {
    port: 5174
  }
})
