import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The playground imports the package straight from src/, so edits show up without a build
export default defineConfig({
  root: 'playground',
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@cendra\/ui\/styles\.css$/, replacement: new URL('src/styles/index.css', import.meta.url).pathname },
      { find: /^@cendra\/ui$/, replacement: new URL('src/index.ts', import.meta.url).pathname },
    ],
  },
  server: { fs: { allow: ['..'] } },
  build: { outDir: '../dist-playground', emptyOutDir: true },
});
