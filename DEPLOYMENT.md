# دليل النشر - مدونة 3AAI

هذا الدليل يشرح كيفية نشر مدونتك على الإنترنت وجعلها متاحة للجميع مجاناً باستخدام Netlify.

---

## المتطلبات

1. حساب على [GitHub](https://github.com/)
2. حساب على [Netlify](https://www.netlify.com/)

---

## الخطوة 1: رفع الكود إلى GitHub

1. أنشئ مستودعاً جديداً (New Repository) على GitHub.
2. ارفع ملفات مشروعك إلى هذا المستودع:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

## الخطوة 2: النشر على Netlify

1. سجل الدخول إلى Netlify.
2. اضغط على **"Add new site"** ثم **"Import from an existing project"**.
3. اختر **GitHub**.
4. اختر المستودع الذي أنشأته.
5. في إعدادات البناء (Build Settings):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. اضغط **Deploy site**.

---

## الخطوة 3: إعداد لوحة التحكم (Decap CMS)

لكي تعمل لوحة التحكم (`/admin`)، يجب تفعيل خدمة الهوية (Identity) وإعداد GitHub OAuth.

### 1. تفعيل Identity
1. في لوحة تحكم Netlify لموقعك، اذهب إلى **Site configuration** > **Identity**.
2. اضغط **Enable Identity**.
3. في قسم **Registration**، تأكد من أنها **Open** (أو Invite only إذا كنت تريد تقييد الوصول).
4. في قسم **External providers**، أضف **GitHub**.
5. في قسم **Services** > **Git Gateway**، اضغط **Enable Git Gateway**.

### 2. إعداد GitHub OAuth (مهم جداً)
1. اذهب إلى إعدادات المطورين في GitHub: [Developer Settings](https://github.com/settings/developers).
2. اضغط **New OAuth App**.
3. املأ البيانات:
   - **Application Name:** 3AAI Blog CMS
   - **Homepage URL:** رابط موقعك على Netlify (مثلاً `https://my-blog.netlify.app`)
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
4. احفظ `Client ID` و `Client Secret`.
5. عد إلى Netlify > **Site configuration** > **Identity** > **External providers** > **GitHub**.
6. أدخل الـ `Client ID` و `Client Secret` هناك.

---

## الخطوة 4: ضبط النطاق (Domain) - اختياري

1. في Netlify، اذهب إلى **Domain management**.
2. اضغط **Add custom domain**.
3. أدخل نطاقك الخاص (مثلاً `www.yourdomain.com`) واتبع التعليمات لربطه.

---

## الخطوة 5: تحديث إعدادات الموقع

بعد النشر والحصول على الرابط النهائي، لا تنسَ تحديث ملف `src/config/site.ts` برابط الموقع الجديد:

```typescript
export const siteConfig = {
  // ...
  url: 'https://your-new-site.com',
};
```

ثم ارفع التغييرات إلى GitHub ليقوم Netlify بتحديث الموقع تلقائياً.

---

## مبروك! 🎉

موقعك الآن يعمل، ويمكنك الدخول إلى لوحة التحكم عبر:
`https://your-new-site.com/admin`
