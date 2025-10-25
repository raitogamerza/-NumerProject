import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true,          // listen on 0.0.0.0 for Docker
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,  // better file watching in Docker/WSL
    },
    hmr: {
      port: 5173,
    },
  },
})
