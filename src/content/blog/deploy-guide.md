---
title: "انشر مدونتك في دقائق مع Netlify"
description: "دليل خطوة بخطوة لنشر مدونتك مجاناً على Netlify وتفعيل لوحة التحكم."
date: 2025-12-04
author: "أحمد علي"
image: "/images/blog/deploy-guide.png"
category: "نشر"
tags: ["Netlify", "Hosting", "Deployment"]
draft: false
---

# نشر موقعك لم يكن أسهل من قبل

بفضل التكامل العميق مع **Netlify**، يمكنك نشر مدونتك وجعلها متاحة للعالم في أقل من 5 دقائق.

## الطريقة السحرية (Deploy Button)

في ملف `README` للمشروع، ستجد زر **"Deploy to Netlify"**.
بمجرد الضغط عليه:
1. سيطلب منك Netlify الاتصال بـ GitHub.
2. سيقوم بنسخ المستودع لحسابك.
3. سيبدأ عملية البناء والنشر فوراً.

ومبروك! موقعك يعمل على رابط `https://your-site.netlify.app`.

## خطوة هامة: تفعيل لوحة التحكم

بعد النشر، ولأسباب أمنية، تحتاج لربط GitHub يدوياً لتعمل لوحة التحكم:

1. اذهب إلى **GitHub Developer Settings** وأنشئ **OAuth App**.
   - Homepage URL: رابط موقعك الجديد.
   - Callback URL: `https://api.netlify.com/auth/done`
   
2. انسخ `Client ID` و `Client Secret`.

3. اذهب إلى لوحة تحكم Netlify لموقعك:
   - **Site Settings** > **Access control** > **OAuth**
   - اضغط **Install provider** واختر **GitHub**.
   - الصق البيانات.

الآن، اذهب إلى `/admin` وسجل الدخول واستمتع بالتدوين!
