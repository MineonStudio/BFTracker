import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/BFTracker/',
  plugins: [tailwindcss()],
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main:    resolve(__dirname, 'index.html'),
        player:  resolve(__dirname, 'player.html'),
        compare: resolve(__dirname, 'compare.html'),
        news:    resolve(__dirname, 'news.html'),
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
