import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// @vercel/analytics v2 reads process.env.VERCEL_ENV at boot to decide
// between the production tracker and the debug-only tracker. Vite only
// exposes VITE_*-prefixed env vars to the client, so VERCEL_ENV resolves
// to undefined in the bundle and the SDK silently falls into debug mode
// (loads va.vercel-scripts.com/v1/script.debug.js, no events reported).
// Inject the value statically at build time. Vercel sets VERCEL_ENV to
// "production" on prod deploys; fall back to "production" for local builds.
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VERCEL_ENV': JSON.stringify(process.env.VERCEL_ENV || 'production'),
    'process.env.NEXT_PUBLIC_VERCEL_ENV': JSON.stringify(process.env.VERCEL_ENV || 'production'),
  },
})
