import { z, defineCollection } from "astro:content";

// تعريف مجموعة المقالات (Blog Posts)
const blogCollection = defineCollection({
  type: 'content', // نوع المحتوى: ملفات Markdown
  schema: z.object({
    title: z.string(), // عنوان المقال
    description: z.string(), // وصف مختصر للمقال (يظهر في البطاقات و SEO)
    date: z.coerce.date(), // تاريخ النشر
    author: z.string().default('اسم الكاتب'), // اسم الكاتب (الافتراضي: اسم الكاتب)
    image: z.string().optional(), // صورة المقال (اختياري)
    category: z.string(), // تصنيف المقال
    tags: z.array(z.string()).default([]), // الوسوم (Tags)
    draft: z.boolean().default(false), // حالة المسودة (true: لا يظهر في الموقع)
  }),
});

// تعريف مجموعة الصفحات الثابتة (Static Pages)
// مثل: من نحن، سياسة الخصوصية، إلخ.
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(), // عنوان الصفحة
    description: z.string(), // وصف الصفحة (SEO)
    image: z.string().optional(), // صورة الغلاف (اختياري)
  }),
});

// تعريف مجموعة المؤلفين (Authors)
const authorsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(), // اسم المؤلف
    role: z.string(), // المسمى الوظيفي
    avatar: z.string().optional(), // صورة المؤلف
    bio: z.string(), // نبذة مختصرة
    social: z.object({ // روابط التواصل الاجتماعي
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
