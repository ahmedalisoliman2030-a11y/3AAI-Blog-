/**
 * Security Middleware للمشروع
 * يضيف رؤوس أمان متوازنة لحماية الموقع دون منع الوظائف الضرورية
 */

import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
    const response = await next();

    // رؤوس الأمان الأساسية
    const headers = new Headers(response.headers);

    // منع تضمين الموقع في iframe من نطاقات أخرى (حماية من Clickjacking)
    headers.set('X-Frame-Options', 'SAMEORIGIN');

    // منع المتصفح من تخمين نوع المحتوى
    headers.set('X-Content-Type-Options', 'nosniff');

    // حماية من XSS في المتصفحات القديمة
    headers.set('X-XSS-Protection', '1; mode=block');

    // سياسة إحالة متوازنة
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // سياسة الأذونات - منع الوصول للكاميرا، الميكروفون، والموقع الجغرافي
    headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=()'
    );

    // Content Security Policy متوازنة
    // تسمح بالموارد الضرورية مع الحفاظ على الأمان
    const cspDirectives = [
        "default-src 'self'",
        // Scripts: نفس النطاق + inline (لـ Astro) + eval (لـ Keystatic في التطوير)
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com",
        // Styles: نفس النطاق + inline + Google Fonts
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        // الصور: نفس النطاق + data URIs + https
        "img-src 'self' data: blob: https:",
        // الخطوط: نفس النطاق + data URIs + Google Fonts
        "font-src 'self' data: https://fonts.gstatic.com",
        // الاتصالات: نفس النطاق + blob
        "connect-src 'self' blob:",
        // Frames: نفس النطاق فقط
        "frame-src 'self'",
        // منع تحميل الأوبجكتات (Flash، وغيرها)
        "object-src 'none'",
        // تحديد النطاق الأساسي
        "base-uri 'self'",
        // تحديد نطاقات النماذج
        "form-action 'self'",
        // ترقية الطلبات غير الآمنة إلى HTTPS
        "upgrade-insecure-requests",
    ];

    headers.set('Content-Security-Policy', cspDirectives.join('; '));

    // إنشاء استجابة جديدة مع الرؤوس المحدثة
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
};
