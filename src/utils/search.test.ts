/**
 * Property-based tests for search functionality
 * **Feature: professional-blog-cms, Property 6: نتائج البحث**
 * **Validates: Requirements 3.1**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { 
  normalizeArabicText, 
  searchInText, 
  filterPostsByQuery,
  filterPostsByCategory,
  filterPostsByTag
} from './search';

describe('Search Functionality - Property 6: نتائج البحث', () => {
  /**
   * Property: For any search query, all returned results must contain 
   * the keyword in title, description, or content
   */
  it('should return only posts that contain the search query in title, description, or body', () => {
    fc.assert(
      fc.property(
        // Generate random posts
        fc.array(
          fc.record({
            slug: fc.string(),
            data: fc.record({
              title: fc.string({ minLength: 1 }),
              description: fc.string({ minLength: 1 }),
              category: fc.string(),
              tags: fc.array(fc.string()),
            }),
            body: fc.string(),
          }),
          { minLength: 1, maxLength: 20 }
        ),
        // Generate random search query
        fc.string({ minLength: 1, maxLength: 20 }),
        (posts, query) => {
          const results = filterPostsByQuery(posts, query);
          
          // All results must contain the query in title, description, or body
          return results.every(post => 
            searchInText(post.data.title, query) ||
            searchInText(post.data.description, query) ||
            searchInText(post.body || '', query)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Empty query should return all posts
   */
  it('should return all posts when query is empty', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            slug: fc.string(),
            data: fc.record({
              title: fc.string(),
              description: fc.string(),
              category: fc.string(),
              tags: fc.array(fc.string()),
            }),
            body: fc.string(),
          }),
          { maxLength: 20 }
        ),
        (posts) => {
          const emptyQueries = ['', '   ', '\t', '\n'];
          
          return emptyQueries.every(query => {
            const results = filterPostsByQuery(posts, query);
            return results.length === posts.length;
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Search should be case-insensitive
   */
  it('should perform case-insensitive search', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        (title, query) => {
          const post = {
            slug: 'test',
            data: {
              title: title,
              description: '',
              category: 'test',
              tags: [],
            },
            body: '',
          };
          
          const lowerResults = filterPostsByQuery([post], query.toLowerCase());
          const upperResults = filterPostsByQuery([post], query.toUpperCase());
          const mixedResults = filterPostsByQuery([post], query);
          
          // All variations should return the same results
          return lowerResults.length === upperResults.length &&
                 upperResults.length === mixedResults.length;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Arabic text search should work with and without diacritics
   */
  it('should search Arabic text correctly with or without diacritics', () => {
    const arabicPosts = [
      {
        slug: 'arabic-1',
        data: {
          title: 'مَقَالَة عَرَبِيَّة',
          description: 'وَصْف المَقَالَة',
          category: 'تقنية',
          tags: ['عربي'],
        },
        body: 'مُحْتَوَى المَقَالَة',
      },
      {
        slug: 'arabic-2',
        data: {
          title: 'مقالة أخرى',
          description: 'وصف آخر',
          category: 'تطوير',
          tags: ['برمجة'],
        },
        body: 'محتوى آخر',
      },
    ];

    // Search with diacritics
    const resultsWithDiacritics = filterPostsByQuery(arabicPosts, 'مَقَالَة');
    // Search without diacritics
    const resultsWithoutDiacritics = filterPostsByQuery(arabicPosts, 'مقالة');
    
    // Both should return the same results
    expect(resultsWithDiacritics.length).toBe(resultsWithoutDiacritics.length);
    expect(resultsWithDiacritics.length).toBeGreaterThan(0);
  });
});

describe('Search Functionality - Property 7: تصفية حسب التصنيف', () => {
  /**
   * **Feature: professional-blog-cms, Property 7: تصفية حسب التصنيف**
   * **Validates: Requirements 3.2**
   * 
   * Property: For any category, the category page must contain only posts 
   * that belong to that category
   */
  it('should return only posts from the specified category', () => {
    fc.assert(
      fc.property(
        // Generate random posts with categories
        fc.array(
          fc.record({
            slug: fc.string(),
            data: fc.record({
              title: fc.string(),
              description: fc.string(),
              category: fc.constantFrom('تقنية', 'تطوير', 'تصميم', 'أخبار'),
              tags: fc.array(fc.string()),
            }),
            body: fc.string(),
          }),
          { minLength: 1, maxLength: 20 }
        ),
        fc.constantFrom('تقنية', 'تطوير', 'تصميم', 'أخبار'),
        (posts, category) => {
          const results = filterPostsByCategory(posts, category);
          
          // All results must have the specified category
          return results.every(post => post.data.category === category);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Null category should return all posts
   */
  it('should return all posts when category is null', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            slug: fc.string(),
            data: fc.record({
              title: fc.string(),
              description: fc.string(),
              category: fc.string(),
              tags: fc.array(fc.string()),
            }),
            body: fc.string(),
          }),
          { maxLength: 20 }
        ),
        (posts) => {
          const results = filterPostsByCategory(posts, null);
          return results.length === posts.length;
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Search Functionality - Property 8: تصفية حسب الوسم', () => {
  /**
   * **Feature: professional-blog-cms, Property 8: تصفية حسب الوسم**
   * **Validates: Requirements 3.3**
   * 
   * Property: For any tag, the tag page must contain only posts 
   * that have that tag in their tags array
   */
  it('should return only posts that contain the specified tag', () => {
    fc.assert(
      fc.property(
        // Generate random posts with tags
        fc.array(
          fc.record({
            slug: fc.string(),
            data: fc.record({
              title: fc.string(),
              description: fc.string(),
              category: fc.string(),
              tags: fc.array(fc.constantFrom('React', 'Vue', 'Astro', 'TypeScript', 'JavaScript')),
            }),
            body: fc.string(),
          }),
          { minLength: 1, maxLength: 20 }
        ),
        fc.constantFrom('React', 'Vue', 'Astro', 'TypeScript', 'JavaScript'),
        (posts, tag) => {
          const results = filterPostsByTag(posts, tag);
          
          // All results must have the specified tag
          return results.every(post => (post.data.tags || []).includes(tag));
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Null tag should return all posts
   */
  it('should return all posts when tag is null', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            slug: fc.string(),
            data: fc.record({
              title: fc.string(),
              description: fc.string(),
              category: fc.string(),
              tags: fc.array(fc.string()),
            }),
            body: fc.string(),
          }),
          { maxLength: 20 }
        ),
        (posts) => {
          const results = filterPostsByTag(posts, null);
          return results.length === posts.length;
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Search Functionality - Property 24: البحث بالعربية', () => {
  /**
   * **Feature: professional-blog-cms, Property 24: البحث بالعربية**
   * **Validates: Requirements 8.5**
   * 
   * Property: For any search query with Arabic characters, 
   * the system must return correct results containing the Arabic text
   */
  it('should correctly search Arabic text', () => {
    const arabicQueries = [
      'مقالة',
      'تقنية',
      'برمجة',
      'تطوير',
      'محتوى',
      'عربي',
      'أخبار',
      'تصميم'
    ];

    arabicQueries.forEach(query => {
      const posts = [
        {
          slug: 'test-1',
          data: {
            title: `${query} جديدة`,
            description: 'وصف',
            category: 'test',
            tags: [],
          },
          body: '',
        },
        {
          slug: 'test-2',
          data: {
            title: 'عنوان آخر',
            description: `${query} في الوصف`,
            category: 'test',
            tags: [],
          },
          body: '',
        },
        {
          slug: 'test-3',
          data: {
            title: 'عنوان ثالث',
            description: 'وصف',
            category: 'test',
            tags: [],
          },
          body: `محتوى يحتوي على ${query}`,
        },
        {
          slug: 'test-4',
          data: {
            title: 'لا يحتوي',
            description: 'لا يحتوي',
            category: 'test',
            tags: [],
          },
          body: 'لا يحتوي',
        },
      ];

      const results = filterPostsByQuery(posts, query);
      
      // Should find the 3 posts that contain the query
      expect(results.length).toBe(3);
      
      // All results should contain the query
      results.forEach(post => {
        const found = 
          searchInText(post.data.title, query) ||
          searchInText(post.data.description, query) ||
          searchInText(post.body, query);
        expect(found).toBe(true);
      });
    });
  });

  /**
   * Property: Arabic search should handle mixed Arabic and English
   */
  it('should handle mixed Arabic and English search', () => {
    const posts = [
      {
        slug: 'mixed-1',
        data: {
          title: 'مقالة عن React',
          description: 'تعلم React بالعربية',
          category: 'تقنية',
          tags: ['React', 'عربي'],
        },
        body: 'محتوى عن React',
      },
      {
        slug: 'mixed-2',
        data: {
          title: 'Vue.js للمبتدئين',
          description: 'دليل Vue',
          category: 'تطوير',
          tags: ['Vue'],
        },
        body: 'شرح Vue',
      },
    ];

    // Search for English term
    const reactResults = filterPostsByQuery(posts, 'React');
    expect(reactResults.length).toBe(1);
    expect(reactResults[0].slug).toBe('mixed-1');

    // Search for Arabic term
    const arabicResults = filterPostsByQuery(posts, 'مقالة');
    expect(arabicResults.length).toBe(1);
    expect(arabicResults[0].slug).toBe('mixed-1');
  });
});
