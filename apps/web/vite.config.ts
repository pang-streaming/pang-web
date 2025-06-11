import { defineConfig } from 'vite';
import type { PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()] as PluginOption[],
});
