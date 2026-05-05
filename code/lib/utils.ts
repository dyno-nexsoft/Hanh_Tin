import { format } from "date-fns";
import { vi } from "date-fns/locale";

/**
 * Formats a date to a Vietnamese string.
 */
export function formatDate(date: Date): string {
  return format(date, "EEEE, dd MMMM yyyy", { locale: vi });
}

/**
 * Gets the number of days in a month.
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Gets the starting day of the week for a month (0 = Sunday).
 */
export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

