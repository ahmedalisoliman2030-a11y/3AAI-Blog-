/**
 * تنسيق التاريخ بالصيغة العربية
 * @param date التاريخ
 * @param format نوع التنسيق (full, short, numeric)
 * @returns التاريخ منسق بالعربية
 */
export function formatDate(date: Date, format: 'full' | 'short' | 'numeric' = 'full'): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'numeric' ? '2-digit' : 'long',
    day: 'numeric',
  };

  if (format === 'short') {
    options.month = 'short';
  }

  return new Intl.DateTimeFormat('ar-SA', options).format(date);
}

/**
 * الحصول على السنة الحالية
 * @returns السنة الحالية
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * حساب الفرق بين تاريخين بالأيام
 * @param date1 التاريخ الأول
 * @param date2 التاريخ الثاني
 * @returns الفرق بالأيام
 */
export function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
}

/**
 * التحقق من أن التاريخ حديث (خلال آخر 7 أيام)
 * @param date التاريخ
 * @returns true إذا كان حديثاً
 */
export function isRecent(date: Date): boolean {
  const days = daysBetween(date, new Date());
  return days <= 7;
}
