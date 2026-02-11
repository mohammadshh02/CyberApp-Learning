import { create } from 'zustand';
import { db } from '@/lib/db.ts';
import type { ScheduleEntry } from '@/types/index.ts';

interface ScheduleState {
  entries: ScheduleEntry[];
  blockedDates: Set<string>;
  init: () => Promise<void>;
  blockDate: (date: string, note?: string) => Promise<void>;
  unblockDate: (date: string) => Promise<void>;
  addEntry: (entry: Omit<ScheduleEntry, 'id'>) => Promise<void>;
  getEntriesForDate: (date: string) => ScheduleEntry[];
  isBlocked: (date: string) => boolean;
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  entries: [],
  blockedDates: new Set<string>(),

  init: async () => {
    const entries = await db.schedule.toArray();
    const blocked = new Set(
      entries.filter((e: ScheduleEntry) => e.type === 'blocked').map((e: ScheduleEntry) => e.date)
    );
    set({ entries, blockedDates: blocked });
  },

  blockDate: async (date, note) => {
    await db.schedule.add({
      date,
      type: 'blocked',
      taskIds: [],
      note: note || 'Blockiert',
    });
    const entries = await db.schedule.toArray();
    const blocked = new Set(get().blockedDates);
    blocked.add(date);
    set({ entries, blockedDates: blocked });
  },

  unblockDate: async (date) => {
    const record = await db.schedule
      .where('date').equals(date)
      .and((e: ScheduleEntry) => e.type === 'blocked')
      .first();
    if (record?.id) {
      await db.schedule.delete(record.id);
    }
    const entries = await db.schedule.toArray();
    const blocked = new Set(get().blockedDates);
    blocked.delete(date);
    set({ entries, blockedDates: blocked });
  },

  addEntry: async (entry) => {
    await db.schedule.add(entry as ScheduleEntry);
    const entries = await db.schedule.toArray();
    set({ entries });
  },

  getEntriesForDate: (date) => {
    return get().entries.filter((e) => e.date === date);
  },

  isBlocked: (date) => get().blockedDates.has(date),
}));
