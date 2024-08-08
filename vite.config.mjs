// https://github.com/vitejs/vite/discussions/3448
// import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  optimizeDeps: {
    include: ['jwt-decode']
  },
  base: '/all',
  define: {
    global: 'window'
  },

  server: {
    open: true,
    // host: '192.168.1.45',
    port: 3000
  },
  preview: {
    open: true,
    port: 3000
  }
});
