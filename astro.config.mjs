// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), image()],
  vite: {
    plugins: [tailwindcss()],
  },
});