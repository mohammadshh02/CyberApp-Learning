import type { RescheduleStrategy, ScheduleEntry, TaskItem } from '@/types/index.ts';

export function getDateString(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function daysBetween(a: Date, b: Date): number {
  const msPerDay = 86400000;
  return Math.round((b.getTime() - a.getTime()) / msPerDay);
}

export function getCurrentMonthIndex(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diffDays = daysBetween(start, now);
  return Math.max(1, Math.min(36, Math.floor(diffDays / 30) + 1));
}

export function getCurrentWeekInMonth(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diffDays = daysBetween(start, now);
  const dayInMonth = diffDays % 30;
  return Math.floor(dayInMonth / 7) + 1;
}

export function getDayOfWeek(date: Date = new Date()): number {
  return date.getDay(); // 0=Sun, 1=Mon...
}

export function isWeekend(date: Date = new Date()): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export interface RescheduleResult {
  adjustedEntries: ScheduleEntry[];
  message: string;
}

export function rescheduleShift(
  missedTasks: TaskItem[],
  fromDate: string,
  existingSchedule: ScheduleEntry[]
): RescheduleResult {
  if (missedTasks.length === 0) {
    return { adjustedEntries: [], message: 'Keine verpassten Tasks.' };
  }

  const entries: ScheduleEntry[] = [];
  const startDate = new Date(fromDate);

  // Shift all future tasks by the number of missed days
  const missedDays = 1;
  let currentDate = addDays(startDate, 1);

  for (const task of missedTasks) {
    entries.push({
      date: getDateString(currentDate),
      type: 'rescheduled',
      taskIds: [task.id],
      note: `Verschoben von ${fromDate}`,
    });
  }

  // Also shift existing future entries
  for (const entry of existingSchedule) {
    if (entry.date > fromDate) {
      const originalDate = new Date(entry.date);
      const newDate = addDays(originalDate, missedDays);
      entries.push({
        ...entry,
        date: getDateString(newDate),
        type: 'rescheduled',
        note: `Shift: +${missedDays} Tag(e)`,
      });
    }
  }

  return {
    adjustedEntries: entries,
    message: `${missedTasks.length} Tasks um ${missedDays} Tag(e) verschoben.`,
  };
}

export function rescheduleCatchUp(
  missedTasks: TaskItem[],
  fromDate: string,
  maxExtraPerDay: number = 2
): RescheduleResult {
  if (missedTasks.length === 0) {
    return { adjustedEntries: [], message: 'Keine verpassten Tasks.' };
  }

  const entries: ScheduleEntry[] = [];
  const startDate = new Date(fromDate);
  let dayOffset = 1;
  let tasksPlaced = 0;

  // Sort by priority: certifications first, then KPIs, then goals, then rest
  const priorityOrder: Record<string, number> = {
    certification: 0,
    kpi: 1,
    goal: 2,
    weekly_task: 3,
    daily_task: 4,
    code_exercise: 5,
    book_chapter: 6,
    tool_setup: 7,
    project: 8,
  };

  const sorted = [...missedTasks].sort(
    (a, b) => (priorityOrder[a.type] ?? 9) - (priorityOrder[b.type] ?? 9)
  );

  while (tasksPlaced < sorted.length) {
    const dayDate = addDays(startDate, dayOffset);
    const dayTaskIds: string[] = [];

    for (let i = 0; i < maxExtraPerDay && tasksPlaced < sorted.length; i++) {
      dayTaskIds.push(sorted[tasksPlaced].id);
      tasksPlaced++;
    }

    entries.push({
      date: getDateString(dayDate),
      type: 'rescheduled',
      taskIds: dayTaskIds,
      note: `Catch-Up: ${dayTaskIds.length} Extra-Tasks`,
    });

    dayOffset++;
  }

  const daysNeeded = dayOffset - 1;
  return {
    adjustedEntries: entries,
    message: `${missedTasks.length} Tasks auf ${daysNeeded} Tage verteilt (max. ${maxExtraPerDay}/Tag).`,
  };
}

export function reschedule(
  strategy: RescheduleStrategy,
  missedTasks: TaskItem[],
  fromDate: string,
  existingSchedule: ScheduleEntry[],
  maxExtraPerDay: number = 2
): RescheduleResult {
  if (strategy === 'shift') {
    return rescheduleShift(missedTasks, fromDate, existingSchedule);
  }
  return rescheduleCatchUp(missedTasks, fromDate, maxExtraPerDay);
}
