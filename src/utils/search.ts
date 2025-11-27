/**
 * Search utility functions with Arabic support
 */

/**
 * Normalize Arabic text for search by removing diacritics
 */
export function normalizeArabicText(text: string): string {
  if (!text) return '';
  
  // Remove Arabic diacritics (tashkeel)
  return text
    .replace(/[\u064B-\u065F]/g, '') // Remove diacritics
    .replace(/[\u0670]/g, '') // Remove superscript alef
    .toLowerCase()
    .trim();
}

/**
 * Search for a query in text with Arabic support
 */
export function searchInText(text: string, query: string): boolean {
  if (!query || !text) return true;
  
  const normalizedText = normalizeArabicText(text);
  const normalizedQuery = normalizeArabicText(query);
  
  return normalizedText.includes(normalizedQuery);
}

/**
 * Filter posts by search query
 */
export function filterPostsByQuery(posts: any[], query: string): any[] {
  if (!query || query.trim() === '') return posts;
  
  return posts.filter(post => {
    return (
      searchInText(post.data.title, query) ||
      searchInText(post.data.description, query) ||
      searchInText(post.body || '', query)
    );
  });
}

/**
 * Filter posts by category
 */
export function filterPostsByCategory(posts: any[], category: string | null): any[] {
  if (!category) return posts;
  return posts.filter(post => post.data.category === category);
}

/**
 * Filter posts by tag
 */
export function filterPostsByTag(posts: any[], tag: string | null): any[] {
  if (!tag) return posts;
  return posts.filter(post => (post.data.tags || []).includes(tag));
}
