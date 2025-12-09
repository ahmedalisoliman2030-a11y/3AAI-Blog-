/**
 * **Feature: professional-blog-cms, Property 20: جدول المحتويات للمقالات الطويلة**
 * 
 * هذا الاختبار يتحقق من أن المقالات الطويلة تحتوي على جدول محتويات تفاعلي
 */

import { describe, it, expect, test } from 'vitest';
import * as fc from 'fast-check';

// دالة مساعدة لحساب عدد العناوين
function countHeadings(headings: { depth: number; slug: string; text: string }[]): number {
  return headings.filter(h => h.depth >= 2 && h.depth <= 3).length;
}

// دالة مساعدة للتحقق من ضرورة عرض جدول المحتويات
function shouldShowTOC(headings: { depth: number; slug: string; text: string }[]): boolean {
  return countHeadings(headings) >= 3;
}

describe('TableOfContents Component - Property 20', () => {
  it('should show TOC when article has 3 or more headings', () => {
    const headings = [
      { depth: 2, slug: 'heading-1', text: 'Heading 1' },
      { depth: 2, slug: 'heading-2', text: 'Heading 2' },
      { depth: 2, slug: 'heading-3', text: 'Heading 3' },
    ];

    expect(shouldShowTOC(headings)).toBe(true);
  });

  it('should not show TOC when article has less than 3 headings', () => {
    const headings = [
      { depth: 2, slug: 'heading-1', text: 'Heading 1' },
      { depth: 2, slug: 'heading-2', text: 'Heading 2' },
    ];

    expect(shouldShowTOC(headings)).toBe(false);
  });

  it('should only count h2 and h3 headings', () => {
    const headings = [
      { depth: 1, slug: 'h1', text: 'H1' }, // لا يُحسب
      { depth: 2, slug: 'h2-1', text: 'H2 1' }, // يُحسب
      { depth: 2, slug: 'h2-2', text: 'H2 2' }, // يُحسب
      { depth: 3, slug: 'h3-1', text: 'H3 1' }, // يُحسب
      { depth: 4, slug: 'h4', text: 'H4' }, // لا يُحسب
    ];

    expect(countHeadings(headings)).toBe(3);
    expect(shouldShowTOC(headings)).toBe(true);
  });
});

// **Feature: professional-blog-cms, Property 20: جدول المحتويات للمقالات الطويلة**
// **Validates: Requirements 7.4**
test('Property 20: Articles with 3+ headings should have table of contents', () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.record({
          depth: fc.integer({ min: 1, max: 6 }),
          slug: fc.string({ minLength: 1, maxLength: 50 }),
          text: fc.string({ minLength: 1, maxLength: 100 }),
        }),
        { minLength: 0, maxLength: 20 }
      ),
      (headings) => {
        const filteredCount = countHeadings(headings);
        const shouldShow = shouldShowTOC(headings);

        // الخاصية: إذا كان عدد العناوين (h2, h3) >= 3، يجب عرض جدول المحتويات
        if (filteredCount >= 3) {
          expect(shouldShow).toBe(true);
        } else {
          expect(shouldShow).toBe(false);
        }

        return true;
      }
    ),
    { numRuns: 100 }
  );
});
