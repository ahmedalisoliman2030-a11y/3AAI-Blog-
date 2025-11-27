# دليل استخدام نظام الصور

## نظرة عامة

هذا الدليل يشرح كيفية استخدام نظام إدارة الصور في المدونة الاحترافية.

## إضافة صورة لمقالة

### 1. إضافة الصورة إلى المشروع

ضع الصورة في مجلد `public/images/`:

```
public/
└── images/
    ├── post-1.jpg
    ├── post-2.png
    └── featured-image.webp
```

### 2. تحديث frontmatter المقالة

في ملف Markdown الخاص بالمقالة:

```markdown
---
title: "عنوان المقالة"
description: "وصف المقالة"
date: 2024-01-15
author: "اسم الكاتب"
image: "/images/post-1.jpg"  # أضف هذا السطر
category: "تقنية"
tags: ["برمجة", "تطوير"]
---

محتوى المقالة...
```

## استخدام مكون OptimizedImage

### الاستخدام الأساسي

```astro
---
import OptimizedImage from '../components/OptimizedImage.astro';
---

<OptimizedImage
  src="/images/my-image.jpg"
  alt="وصف الصورة"
/>
```

## أفضل الممارسات

### 1. استخدم النص البديل دائماً
```astro
<!-- ✅ جيد -->
<OptimizedImage src="/images/cat.jpg" alt="قطة جميلة تلعب" />

<!-- ❌ سيء -->
<OptimizedImage src="/images/cat.jpg" alt="" />
```

### 2. استخدم lazy loading للصور خارج viewport
```astro
<!-- ✅ جيد - صورة في أسفل الصفحة -->
<OptimizedImage src="/images/photo.jpg" alt="..." loading="lazy" />

<!-- ✅ جيد - صورة في أعلى الصفحة -->
<OptimizedImage src="/images/hero.jpg" alt="..." loading="eager" />
```

### 3. استخدم الصيغ المناسبة
- **JPG**: للصور الفوتوغرافية
- **PNG**: للصور مع شفافية أو رسومات
- **WebP**: للصور المحسّنة (أصغر حجماً)
- **SVG**: للأيقونات والرسومات المتجهة

للمزيد من التفاصيل، راجع `IMAGE_SYSTEM_IMPLEMENTATION.md`
