import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// @vercel/analytics v2 reads process.env.NODE_ENV at boot to decide
// between the production tracker (/_vercel/insights/script.js) and the
// debug-only tracker (va.vercel-scripts.com/v1/script.debug.js, which
// logs to console and never reports). Vite is supposed to replace
// process.env.NODE_ENV automatically for production builds, but the
// replacement wasn't reaching the @vercel/analytics module in our
// Vercel builds — the bundle was shipping with NODE_ENV="development"
// baked in, silently dropping all analytics events.
//
// Explicit define overrides whatever default Vite is (or isn't) doing.
// Uses the runtime NODE_ENV at build time, defaulting to "production"
// so `npm run build` and Vercel prod builds always bake in production.
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
})
