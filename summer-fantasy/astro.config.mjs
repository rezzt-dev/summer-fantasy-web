// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import path from 'node:path';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@/components': path.resolve('./src/components'),
        '@/layouts': path.resolve('./src/layouts'),
        '@/styles': path.resolve('./src/styles'),
      },
    },
    plugins: [tailwindcss()],
  },
  integrations: [react()],
});
