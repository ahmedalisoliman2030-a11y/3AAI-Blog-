import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },

    singletons: {
        siteSettings: singleton({
            label: 'إعدادات الموقع',
            path: 'src/config/site',
            format: { data: 'json' },
            schema: {
                title: fields.text({
                    label: 'عنوان الموقع',
                    validation: { length: { min: 1 } },
                }),
                description: fields.text({
                    label: 'وصف الموقع',
                    multiline: true,
                }),
                url: fields.url({
                    label: 'رابط الموقع',
                }),
                author: fields.object({
                    name: fields.text({ label: 'اسم الكاتب' }),
                    bio: fields.text({ label: 'نبذة عن الكاتب' }),
                    avatar: fields.image({
                        label: 'الصورة الشخصية',
                        directory: 'public/images/authors',
                        publicPath: '/images/authors/',
                    }),
                    email: fields.text({ label: 'البريد الإلكتروني' }),
                }, { label: 'معلومات الكاتب' }),
                social: fields.object({
                    twitter: fields.url({ label: 'Twitter' }),
                    github: fields.url({ label: 'GitHub' }),
                    linkedin: fields.url({ label: 'LinkedIn' }),
                }, { label: 'روابط التواصل الاجتماعي' }),
            },
        }),

        contactPage: singleton({
            label: 'صفحة اتصل بنا',
            path: 'src/content/contact/data',
            format: { data: 'json' },
            schema: {
                // عنوان الصفحة
                pageTitle: fields.text({
                    label: 'عنوان الصفحة',
                    defaultValue: 'اتصل بنا',
                }),
                pageSubtitle: fields.text({
                    label: 'النص التوضيحي',
                    multiline: true,
                    defaultValue: 'نحن هنا للإجابة على استفساراتك. لا تتردد في التواصل معنا.',
                }),

                // معلومات التواصل
                contactInfo: fields.object({
                    email: fields.text({
                        label: 'البريد الإلكتروني',
                        defaultValue: 'contact@example.com',
                    }),
                    location: fields.text({
                        label: 'العنوان/الموقع',
                        defaultValue: 'المملكة العربية السعودية',
                    }),
                    phone: fields.text({
                        label: 'رقم الهاتف (اختياري)',
                    }),
                }, { label: 'معلومات التواصل' }),

                // نصوص النموذج
                formLabels: fields.object({
                    nameLabel: fields.text({ label: 'حقل الاسم', defaultValue: 'الاسم' }),
                    namePlaceholder: fields.text({ label: 'placeholder الاسم', defaultValue: 'اسمك الكريم' }),
                    emailLabel: fields.text({ label: 'حقل البريد', defaultValue: 'البريد الإلكتروني' }),
                    emailPlaceholder: fields.text({ label: 'placeholder البريد', defaultValue: 'example@domain.com' }),
                    subjectLabel: fields.text({ label: 'حقل الموضوع', defaultValue: 'الموضوع' }),
                    subjectPlaceholder: fields.text({ label: 'placeholder الموضوع', defaultValue: 'موضوع الرسالة' }),
                    messageLabel: fields.text({ label: 'حقل الرسالة', defaultValue: 'الرسالة' }),
                    messagePlaceholder: fields.text({ label: 'placeholder الرسالة', defaultValue: 'اكتب رسالتك هنا...' }),
                    submitButton: fields.text({ label: 'نص زر الإرسال', defaultValue: 'إرسال الرسالة' }),
                }, { label: 'نصوص النموذج' }),

                // إعدادات النموذج
                formSettings: fields.object({
                    formAction: fields.text({
                        label: 'رابط إرسال النموذج (مثل Formspree)',
                        description: 'اتركه فارغاً إذا لم تُفعّل خدمة إرسال',
                    }),
                    showForm: fields.checkbox({
                        label: 'إظهار النموذج؟',
                        defaultValue: true,
                    }),
                }, { label: 'إعدادات النموذج' }),
            },
        }),
    },

    collections: {
        blog: collection({
            label: 'المقالات',
            slugField: 'slug',
            path: 'src/content/blog/*',
            format: { contentField: 'body' },
            entryLayout: 'content',
            schema: {
                slug: fields.slug({ name: { label: 'الرابط (Slug)' } }),
                title: fields.text({
                    label: 'العنوان',
                    validation: { length: { min: 1 } },
                }),
                description: fields.text({
                    label: 'الوصف',
                    multiline: true,
                }),
                date: fields.date({
                    label: 'تاريخ النشر',
                    defaultValue: { kind: 'today' },
                }),
                author: fields.text({
                    label: 'الكاتب',
                    defaultValue: 'أحمد علي',
                }),
                image: fields.image({
                    label: 'الصورة البارزة',
                    directory: 'public/images/blog',
                    publicPath: '/images/blog/',
                }),
                category: fields.select({
                    label: 'التصنيف',
                    options: [
                        { label: 'أخبار', value: 'أخبار' },
                        { label: 'تقنية', value: 'تقنية' },
                        { label: 'تطوير', value: 'تطوير' },
                        { label: 'شروحات', value: 'شروحات' },
                        { label: 'نشر', value: 'نشر' },
                        { label: 'CMS', value: 'CMS' },
                        { label: 'Astro', value: 'Astro' },
                    ],
                    defaultValue: 'تقنية',
                }),
                tags: fields.array(
                    fields.text({ label: 'وسم' }),
                    {
                        label: 'الوسوم',
                        itemLabel: (props) => props.value || 'وسم جديد',
                    }
                ),
                draft: fields.checkbox({
                    label: 'مسودة؟',
                    defaultValue: false,
                }),
                body: fields.document({
                    label: 'المحتوى',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: {
                        directory: 'public/images/blog',
                        publicPath: '/images/blog/',
                    },
                }),
            },
        }),

        authors: collection({
            label: 'المؤلفون',
            slugField: 'slug',
            path: 'src/content/authors/*',
            format: { contentField: 'body' },
            schema: {
                slug: fields.slug({ name: { label: 'الرابط (Slug)' } }),
                name: fields.text({
                    label: 'الاسم',
                    validation: { length: { min: 1 } },
                }),
                role: fields.text({
                    label: 'الوظيفة/الدور',
                }),
                avatar: fields.image({
                    label: 'الصورة الشخصية',
                    directory: 'public/images/authors',
                    publicPath: '/images/authors/',
                }),
                bio: fields.text({
                    label: 'النبذة المختصرة',
                    multiline: true,
                }),
                social: fields.object({
                    twitter: fields.url({ label: 'Twitter' }),
                    github: fields.url({ label: 'GitHub' }),
                    linkedin: fields.url({ label: 'LinkedIn' }),
                }, {
                    label: 'روابط التواصل الاجتماعي',
                }),
                body: fields.document({
                    label: 'السيرة الذاتية الكاملة',
                    formatting: true,
                }),
            },
        }),

        pages: collection({
            label: 'الصفحات الثابتة',
            slugField: 'slug',
            path: 'src/content/pages/*',
            format: { contentField: 'body' },
            schema: {
                slug: fields.slug({ name: { label: 'الرابط (Slug)' } }),
                title: fields.text({
                    label: 'العنوان',
                    validation: { length: { min: 1 } },
                }),
                description: fields.text({
                    label: 'الوصف',
                    multiline: true,
                }),
                image: fields.image({
                    label: 'صورة الغلاف',
                    directory: 'public/images/pages',
                    publicPath: '/images/pages/',
                }),
                body: fields.document({
                    label: 'المحتوى',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: {
                        directory: 'public/images/pages',
                        publicPath: '/images/pages/',
                    },
                }),
            },
        }),
    },
});
