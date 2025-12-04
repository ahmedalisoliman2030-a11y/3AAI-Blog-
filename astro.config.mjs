// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  // رابط الموقع الرسمي (يستخدم لإنشاء sitemap و canonical URLs)
  site: 'https://dawen.3aai.in',

  // التكاملات (Integrations)
  integrations: [
    react(), // دعم React Components
    sitemap(), // إنشاء خريطة الموقع تلقائياً (sitemap.xml)
    markdoc(), // دعم Markdoc (.mdoc files)
    keystatic(), // نظام إدارة المحتوى (Keystatic CMS)
  ],

  output: 'static', // مطلوب لـ Keystatic
});
