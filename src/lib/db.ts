import Dexie, { type Table } from 'dexie';
import type { TaskProgress, UnlockedBadge, ScheduleEntry, DailyLog, DailyPlanConfig } from '@/types/index.ts';

export interface SettingsRecord {
  key: string;
  value: string;
}

export class SovereignDB extends Dexie {
  progress!: Table<TaskProgress, number>;
  badges!: Table<UnlockedBadge, number>;
  schedule!: Table<ScheduleEntry, number>;
  dailyLog!: Table<DailyLog, number>;
  settings!: Table<SettingsRecord, string>;
  dailyPlans!: Table<DailyPlanConfig, number>;

  constructor() {
    super('sovereign-tracker');
    this.version(1).stores({
      progress: '++id, taskId, completedAt',
      badges: '++id, badgeId, unlockedAt',
      schedule: '++id, date, type',
      dailyLog: '++id, &date',
      settings: 'key',
    });
    this.version(2).stores({
      progress: '++id, taskId, completedAt',
      badges: '++id, badgeId, unlockedAt',
      schedule: '++id, date, type',
      dailyLog: '++id, &date',
      settings: 'key',
      dailyPlans: '++id, &date',
    });
  }
}

export const db = new SovereignDB();

export async function getSetting(key: string): Promise<string | undefined> {
  const record = await db.settings.get(key);
  return record?.value;
}

export async function setSetting(key: string, value: string): Promise<void> {
  await db.settings.put({ key, value });
}

export async function exportAllData(): Promise<string> {
  const [progress, badges, schedule, dailyLog, settings, dailyPlans] = await Promise.all([
    db.progress.toArray(),
    db.badges.toArray(),
    db.schedule.toArray(),
    db.dailyLog.toArray(),
    db.settings.toArray(),
    db.dailyPlans.toArray(),
  ]);
  return JSON.stringify({ progress, badges, schedule, dailyLog, settings, dailyPlans }, null, 2);
}

export async function importAllData(json: string): Promise<void> {
  const data = JSON.parse(json);
  await db.transaction('rw', [db.progress, db.badges, db.schedule, db.dailyLog, db.settings, db.dailyPlans], async () => {
    await db.progress.clear();
    await db.badges.clear();
    await db.schedule.clear();
    await db.dailyLog.clear();
    await db.settings.clear();
    await db.dailyPlans.clear();

    if (data.progress) await db.progress.bulkAdd(data.progress);
    if (data.badges) await db.badges.bulkAdd(data.badges);
    if (data.schedule) await db.schedule.bulkAdd(data.schedule);
    if (data.dailyLog) await db.dailyLog.bulkAdd(data.dailyLog);
    if (data.settings) await db.settings.bulkAdd(data.settings);
    if (data.dailyPlans) await db.dailyPlans.bulkAdd(data.dailyPlans);
  });
}

export async function clearAllData(): Promise<void> {
  await db.transaction('rw', [db.progress, db.badges, db.schedule, db.dailyLog, db.settings, db.dailyPlans], async () => {
    await db.progress.clear();
    await db.badges.clear();
    await db.schedule.clear();
    await db.dailyLog.clear();
    await db.settings.clear();
    await db.dailyPlans.clear();
  });
}
