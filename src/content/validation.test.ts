/**
 * **Feature: professional-blog-cms, Property 9: التحقق من صحة البيانات الوصفية**
 * **Feature: professional-blog-cms, Property 11: دعم التصنيفات والوسوم المتعددة**
 * 
 * اختبارات للتحقق من صحة البيانات الوصفية
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import * as fc from 'fast-check';

// Schema من config.ts
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  author: z.string().default('اسم الكاتب'),
  image: z.string().optional(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

describe('Content Validation - Properties 9 & 11', () => {
  it('should reject posts with missing required fields', () => {
    const invalidPost = {
      title: 'عنوان',
      // description مفقود
      date: new Date(),
      category: 'تقنية',
    };
    
    expect(() => blogSchema.parse(invalidPost)).toThrow();
  });
  
  it('should accept valid posts', () => {
    const validPost = {
      title: 'عنوان المقالة',
      description: 'وصف المقالة',
      date: new Date(),
      category: 'تقنية',
      tags: ['وسم1', 'وسم2'],
    };
    
    const result = blogSchema.parse(validPost);
    expect(result).toBeDefined();
    expect(result.title).toBe(validPost.title);
  });
  
  it('should support multiple tags', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 })),
        (tags) => {
          const post = {
            title: 'عنوان',
            description: 'وصف',
            date: new Date(),
            category: 'تقنية',
            tags: tags,
          };
          
          const result = blogSchema.parse(post);
          return result.tags.length === tags.length;
        }
      ),
      { numRuns: 100 }
    );
  });
  
  it('should have exactly one category', () => {
    const post = {
      title: 'عنوان',
      description: 'وصف',
      date: new Date(),
      category: 'تقنية',
      tags: [],
    };
    
    const result = blogSchema.parse(post);
    expect(typeof result.category).toBe('string');
    expect(result.category.length).toBeGreaterThan(0);
  });
});
