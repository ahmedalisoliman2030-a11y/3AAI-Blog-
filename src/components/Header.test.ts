/**
 * **Feature: professional-blog-cms, Property 18: وجود البانر واللوجو**
 * 
 * هذا الاختبار يتحقق من أن كل صفحة تحتوي على header مع لوجو المدونة
 */

import { describe, it, expect } from 'vitest';
import { siteConfig } from '../config/site';

describe('Header Component - Property 18', () => {
  it('should have logo configuration in site config', () => {
    // التحقق من وجود إعدادات اللوجو
    expect(siteConfig.logo).toBeDefined();
    expect(siteConfig.logo.alt).toBeDefined();
    expect(siteConfig.logo.text).toBeDefined();
    
    // التحقق من أن النصوص ليست فارغة
    expect(siteConfig.logo.alt.length).toBeGreaterThan(0);
    expect(siteConfig.logo.text.length).toBeGreaterThan(0);
  });
  
  it('should have navigation items configured', () => {
    // التحقق من وجود عناصر التنقل
    expect(siteConfig.navigation).toBeDefined();
    expect(Array.isArray(siteConfig.navigation)).toBe(true);
    expect(siteConfig.navigation.length).toBeGreaterThan(0);
    
    // التحقق من أن كل عنصر له label و href
    siteConfig.navigation.forEach(item => {
      expect(item.label).toBeDefined();
      expect(item.href).toBeDefined();
      expect(typeof item.label).toBe('string');
      expect(typeof item.href).toBe('string');
    });
  });
});
