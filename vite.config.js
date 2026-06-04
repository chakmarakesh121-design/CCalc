import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        aiEstimator: resolve(__dirname, 'ai-estimator.html'),
        asphalt: resolve(__dirname, 'asphalt.html'),
        bricks: resolve(__dirname, 'bricks.html'),
        cement: resolve(__dirname, 'cement.html'),
        concrete: resolve(__dirname, 'concrete.html'),
        contact: resolve(__dirname, 'contact.html'),
        deck: resolve(__dirname, 'deck.html'),
        drywall: resolve(__dirname, 'drywall.html'),
        fence: resolve(__dirname, 'fence.html'),
        flooring: resolve(__dirname, 'flooring.html'),
        gravel: resolve(__dirname, 'gravel.html'),
        hvac: resolve(__dirname, 'hvac.html'),
        labour: resolve(__dirname, 'labour.html'),
        loanEmi: resolve(__dirname, 'loan-emi.html'),
        paint: resolve(__dirname, 'paint.html'),
        paver: resolve(__dirname, 'paver.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        rebar: resolve(__dirname, 'rebar.html'),
        roofing: resolve(__dirname, 'roofing.html'),
        squareFootage: resolve(__dirname, 'square-footage.html'),
        tiles: resolve(__dirname, 'tiles.html')
      }
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
