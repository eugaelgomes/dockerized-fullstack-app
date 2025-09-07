import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
    proxy: {
      "/api": {
        target: "http://server:8080",
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('proxyRes', function(proxyRes, req, res) {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
          });
        }
      },
    },
  }
});
