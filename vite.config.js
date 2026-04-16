import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main:    resolve(__dirname, 'index.html'),
        player:  resolve(__dirname, 'player.html'),
        compare: resolve(__dirname, 'compare.html'),
        detail:  resolve(__dirname, 'detail.html'),
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
