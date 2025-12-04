import siteData from './site.json';

export const siteConfig = {
  ...siteData,
  logo: {
    src: '/logo.png',
    alt: siteData.title,
    text: siteData.title,
  },
  // Navigation and Footer remain hardcoded for now or can be moved to JSON later
  navigation: [
    { label: 'الرئيسية', href: '/' },
    { label: 'المقالات', href: '/blog' },
    { label: 'التصنيفات', href: '/categories' },
    { label: 'من نحن', href: '/about' },
    { label: 'اتصل بنا', href: '/contact' },
  ],
  footer: {
    about: {
      title: 'من نحن',
      description: siteData.description,
    },
    links: [
      { label: 'من نحن', href: '/about' },
      { label: 'اتصل بنا', href: '/contact' },
      { label: 'سياسة الخصوصية', href: '/privacy' },
      { label: 'شروط الاستخدام', href: '/terms' },
    ],
    copyright: 'جميع الحقوق محفوظة',
  },
  postsPerPage: 10,
  language: 'ar',
  direction: 'rtl',
};

export type SiteConfig = typeof siteConfig;
