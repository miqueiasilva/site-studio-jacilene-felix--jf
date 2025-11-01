import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/site-studio-jacilene-felix-jf/',
  // The 'define' block for the API key has been removed as all AI features are currently disabled for testing.
})