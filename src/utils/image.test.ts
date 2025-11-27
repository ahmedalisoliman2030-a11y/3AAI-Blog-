import { describe, it, expect, test } from 'vitest';
import * as fc from 'fast-check';
import {
  validateAltText,
  isExternalImage,
  isValidImageFormat,
  generateSrcSet,
  generateSizes,
  getDefaultImage,
} from './image';

describe('Image Utilities', () => {
  describe('validateAltText', () => {
    it('should return true for valid alt text', () => {
      expect(validateAltText('صورة جميلة')).toBe(true);
      expect(validateAltText('A beautiful image')).toBe(true);
    });

    it('should return false for empty or undefined alt text', () => {
      expect(validateAltText('')).toBe(false);
      expect(validateAltText('   ')).toBe(false);
      expect(validateAltText(undefined)).toBe(false);
    });
  });

  describe('isExternalImage', () => {
    it('should return true for external URLs', () => {
      expect(isExternalImage('https://example.com/image.jpg')).toBe(true);
      expect(isExternalImage('http://example.com/image.png')).toBe(true);
    });

    it('should return false for local paths', () => {
      expect(isExternalImage('/images/local.jpg')).toBe(false);
      expect(isExternalImage('./images/local.png')).toBe(false);
      expect(isExternalImage('images/local.webp')).toBe(false);
    });
  });

  describe('isValidImageFormat', () => {
    it('should return true for valid image formats', () => {
      expect(isValidImageFormat('image.jpg')).toBe(true);
      expect(isValidImageFormat('image.jpeg')).toBe(true);
      expect(isValidImageFormat('image.png')).toBe(true);
      expect(isValidImageFormat('image.webp')).toBe(true);
      expect(isValidImageFormat('image.svg')).toBe(true);
      expect(isValidImageFormat('image.gif')).toBe(true);
    });

    it('should return false for invalid formats', () => {
      expect(isValidImageFormat('document.pdf')).toBe(false);
      expect(isValidImageFormat('video.mp4')).toBe(false);
    });

    it('should be case insensitive', () => {
      expect(isValidImageFormat('IMAGE.JPG')).toBe(true);
      expect(isValidImageFormat('Image.PNG')).toBe(true);
    });
  });

  describe('generateSrcSet', () => {
    it('should return empty string for external images', () => {
      const result = generateSrcSet('https://example.com/image.jpg', [400, 800]);
      expect(result).toBe('');
    });

    it('should generate srcset for local images', () => {
      const result = generateSrcSet('/images/local.jpg', [400, 800, 1200]);
      expect(result).toContain('400w');
      expect(result).toContain('800w');
      expect(result).toContain('1200w');
    });
  });

  describe('getDefaultImage', () => {
    it('should return default image path', () => {
      const result = getDefaultImage();
      expect(result).toBe('/images/default-post.jpg');
    });
  });
});

// **Feature: professional-blog-cms, Property 10: دعم الصور المحلية والخارجية**
// **Validates: Requirements 4.3**
test('Property 10: Local and external images should both be handled correctly', () => {
  fc.assert(
    fc.property(
      fc.oneof(
        // صور محلية
        fc.constantFrom(
          '/images/test.jpg',
          './images/test.png',
          'images/test.webp',
          '/public/image.svg'
        ),
        // صور خارجية
        fc.webUrl().map((url: string) => `${url}/image.jpg`)
      ),
      (imageSrc: string) => {
        const isExternal = isExternalImage(imageSrc);
        
        // الخاصية: يجب أن نتمكن من تحديد ما إذا كانت الصورة محلية أو خارجية بشكل صحيح
        if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
          expect(isExternal).toBe(true);
        } else {
          expect(isExternal).toBe(false);
        }
        
        return true;
      }
    ),
    { numRuns: 100 }
  );
});

// **Feature: professional-blog-cms, Property 28: دعم صيغ الصور المتعددة**
// **Validates: Requirements 10.1**
test('Property 28: Multiple image formats should be supported', () => {
  fc.assert(
    fc.property(
      fc.constantFrom('.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'),
      fc.string({ minLength: 1, maxLength: 20 }).filter((s: string) => !s.includes('.')),
      (extension: string, filename: string) => {
        const imagePath = `${filename}${extension}`;
        const isValid = isValidImageFormat(imagePath);
        
        // الخاصية: جميع الصيغ المدعومة يجب أن تُعتبر صحيحة
        expect(isValid).toBe(true);
        
        return true;
      }
    ),
    { numRuns: 100 }
  );
});

// **Feature: professional-blog-cms, Property 31: نص بديل للصور**
// **Validates: Requirements 10.4**
test('Property 31: All images must have alt text', () => {
  fc.assert(
    fc.property(
      fc.option(fc.string(), { nil: undefined }),
      (altText: string | undefined) => {
        const isValid = validateAltText(altText);
        
        // الخاصية: الصور يجب أن يكون لها نص بديل غير فارغ
        if (altText === undefined || altText.trim().length === 0) {
          expect(isValid).toBe(false);
        } else {
          expect(isValid).toBe(true);
        }
        
        return true;
      }
    ),
    { numRuns: 100 }
  );
});
