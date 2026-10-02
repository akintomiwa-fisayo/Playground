import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // `route-sage` includes its Node CLI in the published package. Some browser
  // dependency optimizers select that entry and crash on `fileURLToPath`.
  // Keep the CLI for route generation, but alias client imports to this
  // browser-only implementation.
  resolve: {
    alias: {
      'route-sage': fileURLToPath(new URL('./src/lib/route-sage-runtime.ts', import.meta.url)),
    },
  },
})
