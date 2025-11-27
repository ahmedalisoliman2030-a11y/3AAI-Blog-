export const siteConfig = {
  title: 'مدونتي الاحترافية',
  description: 'مدونة عربية احترافية تقدم محتوى متنوع وقيم',
  url: 'https://myblog.com',
  author: {
    name: 'اسم الكاتب',
    bio: 'كاتب ومطور ويب متخصص في التقنيات الحديثة',
    avatar: '/images/avatar.jpg',
    email: 'author@myblog.com',
  },
  logo: {
    src: '/images/logo.svg',
    alt: 'شعار المدونة',
    text: 'مدونتي',
  },
  social: [
    { platform: 'twitter', url: 'https://twitter.com/myblog', icon: 'twitter' },
    { platform: 'github', url: 'https://github.com/myblog', icon: 'github' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/myblog', icon: 'linkedin' },
  ],
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
      description: 'مدونة عربية متخصصة في تقديم محتوى تقني وثقافي عالي الجودة',
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
