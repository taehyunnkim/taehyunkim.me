// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import icon from 'astro-icon';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://taehyunkim.me',
  integrations: [react(), icon(), mdx()]
});