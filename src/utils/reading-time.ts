/**
 * حساب وقت القراءة المتوقع للمقالة
 * @param content محتوى المقالة
 * @param wordsPerMinute عدد الكلمات في الدقيقة (الافتراضي: 200)
 * @returns وقت القراءة بالدقائق
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  // إزالة HTML tags والأحرف الخاصة
  const cleanContent = content.replace(/<[^>]*>/g, '').replace(/[^\w\s\u0600-\u06FF]/g, ' ');
  
  // حساب عدد الكلمات
  const words = cleanContent.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // حساب الدقائق (على الأقل دقيقة واحدة)
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return Math.max(1, minutes);
}

/**
 * تنسيق وقت القراءة للعرض
 * @param minutes عدد الدقائق
 * @returns نص منسق بالعربية
 */
export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return 'دقيقة واحدة';
  } else if (minutes === 2) {
    return 'دقيقتان';
  } else if (minutes <= 10) {
    return `${minutes} دقائق`;
  } else {
    return `${minutes} دقيقة`;
  }
}
