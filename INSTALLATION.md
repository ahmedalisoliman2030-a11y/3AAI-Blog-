# دليل التثبيت - مدونة 3AAI

## المتطلبات الأساسية

- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn أو pnpm
- Git
- محرر نصوص (VS Code موصى به)

---

## خطوات التثبيت

### 1. استنساخ المشروع

```bash
git clone https://github.com/yourusername/3aai-blog.git
cd 3aai-blog
```

### 2. تثبيت الاعتماديات

```bash
npm install
```

### 3. تشغيل الخادم المحلي

```bash
npm run dev
```

سيعمل الموقع على: `http://localhost:4321`

---

## إعداد Decap CMS (لوحة التحكم)

### الخطوة 1: إنشاء GitHub OAuth App

1. اذهب إلى: https://github.com/settings/developers
2. اضغط على "New OAuth App"
3. املأ البيانات:
   - **Application name:** 3AAI Blog CMS
   - **Homepage URL:** `https://yourdomain.com`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
4. احفظ `Client ID` و `Client Secret`

### الخطوة 2: إعداد Netlify Identity (إذا كنت تستخدم Netlify)

1. في لوحة تحكم Netlify، اذهب إلى **Identity**
2. اضغط على **Enable Identity**
3. في **Settings > Identity > External providers**، أضف GitHub
4. أدخل `Client ID` و `Client Secret`

### الخطوة 3: الوصول إلى لوحة التحكم

بعد النشر، اذهب إلى: `https://yourdomain.com/admin`

---

## التخصيص

### تحديث معلومات الموقع

عدّل ملف `src/config/site.ts`:

```typescript
export const siteConfig = {
  title: 'اسم مدونتك',
  description: 'وصف مدونتك',
  url: 'https://yourdomain.com',
  // ... باقي الإعدادات
};
```

### تغيير الشعار

استبدل الملف `public/logo.png` بشعارك الخاص.

### تخصيص الألوان

عدّل ملف `src/styles/global.css`:

```css
:root {
  --color-primary: #3b82f6; /* لونك الأساسي */
  --color-background: #000000; /* لون الخلفية */
  /* ... */
}
```

---

## البناء للإنتاج

```bash
npm run build
```

سيتم إنشاء المجلد `dist/` الذي يحتوي على الملفات الجاهزة للنشر.

---

## النشر

### Netlify (موصى به)

1. ادفع المشروع إلى GitHub
2. اربط المستودع بـ Netlify
3. إعدادات البناء:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

### Vercel

1. ادفع المشروع إلى GitHub
2. استورد المشروع في Vercel
3. سيتم اكتشاف الإعدادات تلقائياً

---

## استكشاف الأخطاء

### خطأ في تثبيت الاعتماديات

```bash
rm -rf node_modules package-lock.json
npm install
```

### الموقع لا يعمل محلياً

تأكد من:
- تشغيل `npm run dev`
- المنفذ 4321 غير مستخدم
- تثبيت جميع الاعتماديات

---

## الدعم

للمساعدة أو الإبلاغ عن مشاكل، افتح Issue على GitHub.
