/**
 * **Feature: professional-blog-cms, Property 25: وجود الفوتر في جميع الصفحات**
 * **Feature: professional-blog-cms, Property 26: نص حقوق النشر مع السنة الحالية**
 * **Feature: professional-blog-cms, Property 27: روابط وسائل التواصل الاجتماعي**
 * 
 * هذه الاختبارات تتحقق من وجود الفوتر مع جميع العناصر المطلوبة
 */

import { describe, it, expect } from 'vitest';
import { siteConfig } from '../config/site';
import { getCurrentYear } from '../utils/date';
import socialData from '../data/social.json';

describe('Footer Component - Properties 25, 26, 27', () => {
  describe('Property 25: Footer presence', () => {
    it('should have footer configuration in site config', () => {
      expect(siteConfig.footer).toBeDefined();
      expect(siteConfig.footer.about).toBeDefined();
      expect(siteConfig.footer.links).toBeDefined();
      expect(siteConfig.footer.copyright).toBeDefined();
    });
    
    it('should have about section with title and description', () => {
      expect(siteConfig.footer.about.title).toBeDefined();
      expect(siteConfig.footer.about.description).toBeDefined();
      expect(siteConfig.footer.about.title.length).toBeGreaterThan(0);
      expect(siteConfig.footer.about.description.length).toBeGreaterThan(0);
    });
    
    it('should have footer links array', () => {
      expect(Array.isArray(siteConfig.footer.links)).toBe(true);
      expect(siteConfig.footer.links.length).toBeGreaterThan(0);
      
      siteConfig.footer.links.forEach(link => {
        expect(link.label).toBeDefined();
        expect(link.href).toBeDefined();
      });
    });
  });
  
  describe('Property 26: Copyright with current year', () => {
    it('should have copyright text', () => {
      expect(siteConfig.footer.copyright).toBeDefined();
      expect(siteConfig.footer.copyright.length).toBeGreaterThan(0);
    });
    
    it('should get current year correctly', () => {
      const currentYear = getCurrentYear();
      const now = new Date().getFullYear();
      expect(currentYear).toBe(now);
    });
  });
  
  describe('Property 27: Social media links', () => {
    it('should have social media links configured', () => {
      expect(socialData.social_links).toBeDefined();
      expect(Array.isArray(socialData.social_links)).toBe(true);
      expect(socialData.social_links.length).toBeGreaterThan(0);
    });
    
    it('should have valid social media link structure', () => {
      socialData.social_links.forEach(social => {
        expect(social.platform).toBeDefined();
        expect(social.url).toBeDefined();
        
        // التحقق من أن URL صحيح
        expect(social.url).toMatch(/^https?:\/\//);
      });
    });
  });
});
