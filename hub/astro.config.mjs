import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ragmha.github.io',
  base: `${process.env.SITE_BASE ?? '/field-guides'}/`,
});
