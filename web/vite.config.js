import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
    proxy: {
      "/api": {
        target: "https://auth-flow-api.gaelgomes.dev",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyRes', function(proxyRes, req, res) {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
          });
        }
      },
    },
  }
});
