import { defineConfig } from 'vite';
export default defineConfig({
  base: '/udupi-observatory/',
  build: { outDir: 'dist', chunkSizeWarningLimit: 1700 },
  server: { port: 4174, strictPort: true },
  preview: { port: 4174, strictPort: true }
});
