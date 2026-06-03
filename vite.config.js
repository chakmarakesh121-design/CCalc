import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cement: resolve(__dirname, 'cement.html'),
        concrete: resolve(__dirname, 'concrete.html'),
        bricks: resolve(__dirname, 'bricks.html'),
        paint: resolve(__dirname, 'paint.html'),
        tiles: resolve(__dirname, 'tiles.html'),
        labour: resolve(__dirname, 'labour.html'),
        hvac: resolve(__dirname, 'hvac.html'),
        roofing: resolve(__dirname, 'roofing.html'),
        flooring: resolve(__dirname, 'flooring.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacy: resolve(__dirname, 'privacy.html')
      }
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
