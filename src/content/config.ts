import { z, defineCollection } from "astro:content";

/**
 * تعريف مجموعة المقالات (Blog Posts)
 * تحتوي على جميع المقالات المنشورة في المدونة.
 */
const blogCollection = defineCollection({
  type: 'content', // نوع المحتوى: ملفات Markdown
  schema: z.object({
    /** عنوان المقال */
    title: z.string(),
    /** وصف مختصر للمقال (يظهر في البطاقات و SEO) */
    description: z.string(),
    /** تاريخ النشر */
    date: z.coerce.date(),
    /** اسم الكاتب (الافتراضي: اسم الكاتب) */
    author: z.string().default('اسم الكاتب'),
    /** صورة المقال (اختياري) */
    image: z.string().optional(),
    /** تصنيف المقال */
    category: z.string(),
    /** الوسوم (Tags) */
    tags: z.array(z.string()).default([]),
    /** حالة المسودة (true: لا يظهر في الموقع) */
    draft: z.boolean().default(false),
  }),
});

/**
 * تعريف مجموعة الصفحات الثابتة (Static Pages)
 * مثل: من نحن، سياسة الخصوصية، إلخ.
 */
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    /** عنوان الصفحة */
    title: z.string(),
    /** وصف الصفحة (SEO) */
    description: z.string(),
    /** صورة الغلاف (اختياري) */
    image: z.string().optional(),
  }),
});

/**
 * تعريف مجموعة المؤلفين (Authors)
 * معلومات عن كتاب المقالات في المدونة.
 */
const authorsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    /** اسم المؤلف */
    name: z.string(),
    /** المسمى الوظيفي */
    role: z.string(),
    /** صورة المؤلف */
    avatar: z.string().optional(),
    /** نبذة مختصرة */
    bio: z.string(),
    /** روابط التواصل الاجتماعي */
    social: z.object({
      twitter: z.string().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  pages: pagesCollection,
  authors: authorsCollection,
};
