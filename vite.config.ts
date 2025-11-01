import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/site-studio-jacilene-felix--jf/',
  // Fix: Define process.env.API_KEY for use in client-side code, as per Gemini API guidelines.
  // This reads VITE_API_KEY from the build environment and replaces process.env.API_KEY in the code.
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY)
  }
})