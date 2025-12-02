// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // رابط الموقع الرسمي (يستخدم لإنشاء sitemap و canonical URLs)
  site: 'http://localhost:4321', // يجب تحديثه عند النشر

  // التكاملات (Integrations)
  integrations: [
    react(), // دعم React Components
    sitemap() // إنشاء خريطة الموقع تلقائياً (sitemap.xml)
  ],
});
