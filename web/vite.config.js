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
      },
    },
  }
});
