import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import path from 'node:path';

export default defineConfig({
  base: '/',
  plugins: [react(), mdx({ providerImportSource: '@mdx-js/react' })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@3d': path.resolve(__dirname, 'src/3d'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@content': path.resolve(__dirname, 'src/content'),
    },
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          react: ['react', 'react-dom', 'react-router-dom'],
          dnd: ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
          mdx: ['@mdx-js/react'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
