import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  publicDir: 'data',
  test: {
    environment: 'node',
  },
})
