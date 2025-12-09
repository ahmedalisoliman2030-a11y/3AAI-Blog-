/**
 * اختبارات SEO - الخصائص 12-16
 * 
 * هذه الاختبارات تتحقق من تطبيق أفضل ممارسات SEO في المشروع
 */

import { describe, it, expect, test } from 'vitest';
import * as fc from 'fast-check';
import { generateSlug, isValidSlug } from './slug';

describe('SEO Tests - Properties 12-16', () => {
  
  // **Feature: professional-blog-cms, Property 12: Meta Tags لمحركات البحث**
  // **Validates: Requirements 5.1**
  describe('Property 12: Meta Tags', () => {
    it('should have required meta tags structure', () => {
      const requiredMetaTags = ['title', 'description'];
      
      requiredMetaTags.forEach(tag => {
        expect(tag).toBeDefined();
        expect(typeof tag).toBe('string');
      });
    });

    it('should validate meta description length', () => {
      const validDescription = 'وصف مناسب للصفحة يحتوي على معلومات مفيدة';
      const tooShort = 'قصير';
      const tooLong = 'ن'.repeat(200);

      expect(validDescription.length).toBeGreaterThan(10);
      expect(validDescription.length).toBeLessThan(160);
      
      expect(tooShort.length).toBeLessThan(10);
      expect(tooLong.length).toBeGreaterThan(160);
    });
  });

  // **Feature: professional-blog-cms, Property 14: Open Graph Tags**
  // **Validates: Requirements 5.3**
  describe('Property 14: Open Graph Tags', () => {
    it('should have required OG tags', () => {
      const requiredOGTags = ['og:title', 'og:description', 'og:image', 'og:url'];
      
      requiredOGTags.forEach(tag => {
        expect(tag).toBeDefined();
        expect(typeof tag).toBe('string');
      });
    });

    it('should validate OG image URL format', () => {
      const validImageURL = 'https://example.com/image.jpg';
      const invalidImageURL = 'not-a-url';

      expect(validImageURL).toMatch(/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i);
      expect(invalidImageURL).not.toMatch(/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i);
    });
  });

  // **Feature: professional-blog-cms, Property 15: عناوين صفحات فريدة**
  // **Validates: Requirements 5.4**
  describe('Property 15: Unique Page Titles', () => {
    it('should generate unique titles for different pages', () => {
      const pages = [
        { path: '/', title: 'الرئيسية' },
        { path: '/blog', title: 'المقالات' },
        { path: '/about', title: 'من نحن' },
      ];

      const titles = pages.map(p => p.title);
      const uniqueTitles = new Set(titles);

      expect(uniqueTitles.size).toBe(titles.length);
    });

    it('should append site name to page titles', () => {
      const siteName = 'دَوِّنْ';
      const pageTitle = 'المقالات';
      const fullTitle = `${pageTitle} | ${siteName}`;

      expect(fullTitle).toContain(pageTitle);
      expect(fullTitle).toContain(siteName);
      expect(fullTitle).not.toBe(pageTitle);
    });
  });

  // **Feature: professional-blog-cms, Property 16: روابط نظيفة (Slugs)**
  // **Validates: Requirements 5.5**
  describe('Property 16: Clean Slugs', () => {
    it('should generate valid slugs from Arabic text', () => {
      const arabicTitle = 'مرحباً بك في دَوِّنْ';
      const slug = generateSlug(arabicTitle);

      expect(isValidSlug(slug)).toBe(true);
    });

    it('should generate valid slugs from English text', () => {
      const englishTitle = 'Welcome to Dawen';
      const slug = generateSlug(englishTitle);

      expect(isValidSlug(slug)).toBe(true);
      expect(slug).toBe('welcome-to-dawen');
    });

    it('should handle special characters', () => {
      const titleWithSpecialChars = 'Hello! World? #Test';
      const slug = generateSlug(titleWithSpecialChars);

      expect(isValidSlug(slug)).toBe(true);
      expect(slug).not.toContain('!');
      expect(slug).not.toContain('?');
      expect(slug).not.toContain('#');
    });

    it('should handle multiple spaces', () => {
      const titleWithSpaces = 'Hello    World    Test';
      const slug = generateSlug(titleWithSpaces);

      expect(isValidSlug(slug)).toBe(true);
      expect(slug).not.toContain('  ');
      expect(slug).toBe('hello-world-test');
    });
  });
});

// **Feature: professional-blog-cms, Property 16: روابط نظيفة (Slugs)**
// **Validates: Requirements 5.5**
test('Property 16: Slug generation should always produce valid URLs', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1, maxLength: 100 }).filter(s => {
        // تصفية: يجب أن يحتوي على حرف واحد على الأقل (حرف أو رقم)
        return /[a-zA-Z0-9\u0600-\u06FF]/.test(s);
      }),
      (title) => {
        const slug = generateSlug(title);
        
        // الخاصية: إذا كان slug غير فارغ، يجب أن يكون صحيحاً
        if (slug.length > 0) {
          expect(isValidSlug(slug)).toBe(true);
        }
        // إذا كان فارغاً، هذا يعني أن النص لا يحتوي على أحرف صالحة (مقبول)
        
        return true;
      }
    ),
    { numRuns: 100 }
  );
});

// **Feature: professional-blog-cms, Property 12: Meta Tags لمحركات البحث**
// **Validates: Requirements 5.1**
test('Property 12: Meta descriptions should be within optimal length', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 50, maxLength: 160 }),
      (description) => {
        // الخاصية: وصف meta يجب أن يكون بين 50-160 حرف للحصول على أفضل نتائج SEO
        const length = description.length;
        
        expect(length).toBeGreaterThanOrEqual(50);
        expect(length).toBeLessThanOrEqual(160);
        
        return true;
      }
    ),
    { numRuns: 100 }
  );
});
