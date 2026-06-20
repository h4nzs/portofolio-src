import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://h4nzs.github.io',
  base: '/portofolio/',
  integrations: [react(), sitemap()],
  build: {
    assets: '_assets',
  },
});
