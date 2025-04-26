import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  viewTransitions: true,
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'plastic'
    },
  },
});