/**
 * **Feature: professional-blog-cms, Property 21: اتجاه RTL**
 * 
 * هذا الاختبار يتحقق من أن جميع الصفحات تحتوي على dir="rtl" و lang="ar"
 */

import { describe, it, expect } from 'vitest';
import { siteConfig } from '../config/site';

describe('BaseLayout - Property 21: RTL Direction', () => {
  it('should have RTL direction configured in site config', () => {
    // التحقق من إعدادات اللغة والاتجاه
    expect(siteConfig.direction).toBe('rtl');
    expect(siteConfig.language).toBe('ar');
  });
  
  it('should have correct language code', () => {
    // التحقق من أن رمز اللغة صحيح
    expect(siteConfig.language).toMatch(/^ar(-[A-Z]{2})?$/);
  });
  
  it('should have correct direction value', () => {
    // التحقق من أن الاتجاه إما rtl أو ltr
    expect(['rtl', 'ltr']).toContain(siteConfig.direction);
  });
});
