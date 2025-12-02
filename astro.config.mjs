// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // رابط الموقع الرسمي (يستخدم لإنشاء sitemap و canonical URLs)
  site: 'https://splendid-crumble-330ff8.netlify.app',

  // التكاملات (Integrations)
  integrations: [
    react(), // دعم React Components
    sitemap() // إنشاء خريطة الموقع تلقائياً (sitemap.xml)
  ],
});
