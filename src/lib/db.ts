import Dexie, { type Table } from 'dexie';
import type { TaskProgress, UnlockedBadge, ScheduleEntry, DailyLog, DailyPlanConfig, GlossaryEntry, FlashcardProgress, IntelNote, IntelDocRef } from '@/types/index.ts';

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
  customGlossaryTerms!: Table<GlossaryEntry, string>;
  flashcardProgress!: Table<FlashcardProgress, number>;
  intelNotes!: Table<IntelNote, string>;
  intelDocRefs!: Table<IntelDocRef, string>;

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
    this.version(3).stores({
      progress: '++id, taskId, completedAt',
      badges: '++id, badgeId, unlockedAt',
      schedule: '++id, date, type',
      dailyLog: '++id, &date',
      settings: 'key',
      dailyPlans: '++id, &date',
      customGlossaryTerms: 'id, category',
      flashcardProgress: '++id, &termId',
    });
    this.version(4).stores({
      progress: '++id, taskId, completedAt',
      badges: '++id, badgeId, unlockedAt',
      schedule: '++id, date, type',
      dailyLog: '++id, &date',
      settings: 'key',
      dailyPlans: '++id, &date',
      customGlossaryTerms: 'id, category',
      flashcardProgress: '++id, &termId',
      intelNotes: 'id, companyId, updatedAt',
      intelDocRefs: 'id, companyId',
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
  const [progress, badges, schedule, dailyLog, settings, dailyPlans, customGlossaryTerms, flashcardProgress, intelNotes, intelDocRefs] = await Promise.all([
    db.progress.toArray(),
    db.badges.toArray(),
    db.schedule.toArray(),
    db.dailyLog.toArray(),
    db.settings.toArray(),
    db.dailyPlans.toArray(),
    db.customGlossaryTerms.toArray(),
    db.flashcardProgress.toArray(),
    db.intelNotes.toArray(),
    db.intelDocRefs.toArray(),
  ]);
  return JSON.stringify({ progress, badges, schedule, dailyLog, settings, dailyPlans, customGlossaryTerms, flashcardProgress, intelNotes, intelDocRefs }, null, 2);
}

export async function importAllData(json: string): Promise<void> {
  const data = JSON.parse(json);
  await db.transaction('rw', [db.progress, db.badges, db.schedule, db.dailyLog, db.settings, db.dailyPlans, db.customGlossaryTerms, db.flashcardProgress, db.intelNotes, db.intelDocRefs], async () => {
    await db.progress.clear();
    await db.badges.clear();
    await db.schedule.clear();
    await db.dailyLog.clear();
    await db.settings.clear();
    await db.dailyPlans.clear();
    await db.customGlossaryTerms.clear();
    await db.flashcardProgress.clear();
    await db.intelNotes.clear();
    await db.intelDocRefs.clear();

    if (data.progress) await db.progress.bulkAdd(data.progress);
    if (data.badges) await db.badges.bulkAdd(data.badges);
    if (data.schedule) await db.schedule.bulkAdd(data.schedule);
    if (data.dailyLog) await db.dailyLog.bulkAdd(data.dailyLog);
    if (data.settings) await db.settings.bulkAdd(data.settings);
    if (data.dailyPlans) await db.dailyPlans.bulkAdd(data.dailyPlans);
    if (data.customGlossaryTerms) await db.customGlossaryTerms.bulkAdd(data.customGlossaryTerms);
    if (data.flashcardProgress) await db.flashcardProgress.bulkAdd(data.flashcardProgress);
    if (data.intelNotes) await db.intelNotes.bulkAdd(data.intelNotes);
    if (data.intelDocRefs) await db.intelDocRefs.bulkAdd(data.intelDocRefs);
  });
}

export async function clearAllData(): Promise<void> {
  await db.transaction('rw', [db.progress, db.badges, db.schedule, db.dailyLog, db.settings, db.dailyPlans, db.customGlossaryTerms, db.flashcardProgress, db.intelNotes, db.intelDocRefs], async () => {
    await db.progress.clear();
    await db.badges.clear();
    await db.schedule.clear();
    await db.dailyLog.clear();
    await db.settings.clear();
    await db.dailyPlans.clear();
    await db.customGlossaryTerms.clear();
    await db.flashcardProgress.clear();
    await db.intelNotes.clear();
    await db.intelDocRefs.clear();
  });
}
