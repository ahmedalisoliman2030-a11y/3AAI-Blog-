/**
 * **Feature: professional-blog-cms, Property 2: معلومات بطاقة المقالة**
 * **Feature: professional-blog-cms, Property 3: تحويل Markdown إلى HTML**
 * 
 * اختبارات لحساب وقت القراءة وتنسيقه
 */

import { describe, it, expect } from 'vitest';
import { calculateReadingTime, formatReadingTime } from './reading-time';
import * as fc from 'fast-check';

describe('Reading Time - Properties 2 & 3', () => {
  it('should calculate reading time correctly', () => {
    const content = 'كلمة '.repeat(200); // 200 كلمة
    const readingTime = calculateReadingTime(content);
    expect(readingTime).toBe(1); // دقيقة واحدة
  });
  
  it('should return at least 1 minute for any content', () => {
    fc.assert(
      fc.property(
        fc.string(),
        (content) => {
          const readingTime = calculateReadingTime(content);
          return readingTime >= 1;
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should format reading time correctly in Arabic', () => {
    expect(formatReadingTime(1)).toBe('دقيقة واحدة');
    expect(formatReadingTime(2)).toBe('دقيقتان');
    expect(formatReadingTime(5)).toBe('5 دقائق');
    expect(formatReadingTime(15)).toBe('15 دقيقة');
  });
});
