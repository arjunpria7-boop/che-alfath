import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Declare process to avoid TS error because @types/node is not available
declare var process: any;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Use process.cwd() to avoid TS error if Node types are missing
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Polyfill process.env.API_KEY for the browser build
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})