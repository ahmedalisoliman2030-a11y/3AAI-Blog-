/**
 * توليد slug نظيف من النص
 * @param text النص المراد تحويله
 * @returns slug نظيف
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // استبدال المسافات بشرطات
    .replace(/\s+/g, '-')
    // إزالة الأحرف الخاصة (الاحتفاظ بالأحرف والأرقام والشرطات فقط)
    .replace(/[^\w\u0600-\u06FF-]/g, '')
    // إزالة الشرطات المتعددة
    .replace(/-+/g, '-')
    // إزالة الشرطات من البداية والنهاية
    .replace(/^-+|-+$/g, '');
}

/**
 * التحقق من صحة slug
 * @param slug الـ slug المراد التحقق منه
 * @returns true إذا كان صحيحاً
 */
export function isValidSlug(slug: string): boolean {
  // يجب أن يحتوي فقط على أحرف صغيرة، أرقام، أحرف عربية، وشرطات
  const slugPattern = /^[a-z0-9\u0600-\u06FF-]+$/;
  return slugPattern.test(slug) && !slug.startsWith('-') && !slug.endsWith('-');
}
