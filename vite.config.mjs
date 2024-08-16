import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  optimizeDeps: {
    include: ['jwt-decode']
  },
  base: '/',
  define: {
    global: 'window'
  },

  server: {
    open: true,
    // host: '192.168.1.9',
    port: 3000
  },
  preview: {
    open: true,
    port: 3000
  }
});
