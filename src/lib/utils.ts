import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'short',
  });
}

export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatNumber(n: number): string {
  return n.toLocaleString('de-DE');
}

export function formatXp(xp: number): string {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}k`;
  }
  return xp.toString();
}

export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function getPhaseColor(phaseId: number): string {
  const colors: Record<number, string> = {
    1: '#3b82f6',
    2: '#8b5cf6',
    3: '#ec4899',
    4: '#f59e0b',
    5: '#ef4444',
    6: '#10b981',
    7: '#06b6d4',
  };
  return colors[phaseId] ?? '#64748b';
}

export function getMonthsInPhase(phaseId: number): number[] {
  const mapping: Record<number, number[]> = {
    1: [1, 2, 3],
    2: [4, 5, 6],
    3: [7, 8, 9],
    4: [10, 11, 12],
    5: [13, 14, 15, 16, 17, 18],
    6: [19, 20, 21, 22, 23, 24],
    7: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  };
  return mapping[phaseId] ?? [];
}

export function getPhaseForMonth(month: number): number {
  if (month <= 3) return 1;
  if (month <= 6) return 2;
  if (month <= 9) return 3;
  if (month <= 12) return 4;
  if (month <= 18) return 5;
  if (month <= 24) return 6;
  return 7;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay();
}
