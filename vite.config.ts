import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The legacy page is still index.html at the repo root, so the React app's HTML template is
// app.html. `npm run build` bundles it, then scripts/prerender.mjs renders the page to plain
// HTML at build time and writes dist/index.html: content and the night theme show without JavaScript.
export default defineConfig({
  plugins: [react()],
  // Relative asset paths, so the built site works from any folder or sub-path, not only from a domain root.
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: { input: 'app.html' },
  },
});
