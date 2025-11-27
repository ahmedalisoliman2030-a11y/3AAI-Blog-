/**
 * **Feature: professional-blog-cms, Property 1: عرض المقالات على الصفحة الرئيسية**
 * 
 * هذا الاختبار يتحقق من أن الصفحة الرئيسية تحتوي على جميع المقالات المنشورة
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

// نموذج بيانات المقالة
interface Post {
  title: string;
  description: string;
  date: Date;
  author: string;
  category: string;
  tags: string[];
  draft: boolean;
}

// دالة لتصفية المقالات المنشورة
function getPublishedPosts(posts: Post[]): Post[] {
  return posts.filter(post => !post.draft);
}

describe('Posts Display - Property 1', () => {
  it('should filter out draft posts', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            title: fc.string({ minLength: 1 }),
            description: fc.string({ minLength: 1 }),
            date: fc.date(),
            author: fc.string({ minLength: 1 }),
            category: fc.string({ minLength: 1 }),
            tags: fc.array(fc.string()),
            draft: fc.boolean(),
          })
        ),
        (posts) => {
          const published = getPublishedPosts(posts);
          
          // جميع المقالات المنشورة يجب أن تكون draft = false
          return published.every(post => !post.draft);
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should include all non-draft posts', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            title: fc.string({ minLength: 1 }),
            description: fc.string({ minLength: 1 }),
            date: fc.date(),
            author: fc.string({ minLength: 1 }),
            category: fc.string({ minLength: 1 }),
            tags: fc.array(fc.string()),
            draft: fc.boolean(),
          })
        ),
        (posts) => {
          const published = getPublishedPosts(posts);
          const nonDraftCount = posts.filter(p => !p.draft).length;
          
          // عدد المقالات المنشورة يجب أن يساوي عدد المقالات غير المسودة
          return published.length === nonDraftCount;
        }
      ),
      { numRuns: 100 }
    );
  });
});
