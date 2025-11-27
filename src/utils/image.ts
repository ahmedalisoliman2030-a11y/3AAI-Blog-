/**
 * التحقق من أن الصورة لها نص بديل (alt text)
 */
export function validateAltText(alt: string | undefined): boolean {
  return alt !== undefined && alt.trim().length > 0;
}

/**
 * التحقق من أن الصورة محلية أو خارجية
 */
export function isExternalImage(src: string): boolean {
  return src.startsWith('http://') || src.startsWith('https://');
}

/**
 * التحقق من صيغة الصورة
 */
export function isValidImageFormat(src: string): boolean {
  const validFormats = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
  const lowerSrc = src.toLowerCase();
  return validFormats.some(format => lowerSrc.endsWith(format));
}

/**
 * توليد srcset للصور المتجاوبة
 */
export function generateSrcSet(baseSrc: string, widths: number[]): string {
  if (isExternalImage(baseSrc)) {
    // للصور الخارجية، نعيد الصورة الأصلية فقط
    return '';
  }
  
  // للصور المحلية، نولد srcset بأحجام مختلفة
  return widths
    .map(width => `${baseSrc}?w=${width} ${width}w`)
    .join(', ');
}

/**
 * توليد sizes attribute للصور المتجاوبة
 */
export function generateSizes(breakpoints?: { [key: string]: string }): string {
  if (!breakpoints) {
    return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px';
  }
  
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
    .join(', ');
}

/**
 * الحصول على الصورة الافتراضية إذا لم تكن الصورة موجودة
 */
export function getDefaultImage(): string {
  return '/images/default-post.jpg';
}
