import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// @vercel/analytics v2 reads process.env.NODE_ENV at boot to decide
// between the production tracker (/_vercel/insights/script.js) and the
// debug-only tracker (va.vercel-scripts.com/v1/script.debug.js, which
// only logs to console). Vite's automatic NODE_ENV replacement wasn't
// reaching the dependency in our Vercel builds, so the bundle shipped
// with NODE_ENV="development" baked in — silently dropping every event.
//
// Tie the define to Vite's own `mode` (always "production" for
// `vite build`) instead of the runtime process.env.NODE_ENV, so the
// replacement is bulletproof regardless of how Vercel's build runner
// happens to set environment variables.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
  },
}))
