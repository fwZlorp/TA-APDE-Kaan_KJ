import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,     // ← erlaubt Zugriff von außen (z. B. vom Handy)
    port: 5173,     // ← Standardport von Vite
  },
});

