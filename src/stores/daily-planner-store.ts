import { create } from 'zustand';
import { db } from '@/lib/db.ts';
import { generateDailySchedule } from '@/lib/daily-scheduler.ts';
import { useSettingsStore } from '@/stores/settings-store.ts';
import curriculum from '@/data/curriculum.json';
import type { DailyPlanConfig, GeneratedBlock, PersonalBlock } from '@/types/index.ts';

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

interface DailyPlannerState {
  todayConfig: DailyPlanConfig | null;
  generatedSchedule: GeneratedBlock[];
  isConfigured: boolean;

  init: () => Promise<void>;
  setWakeUpTime: (time: string) => void;
  setBedTime: (time: string) => void;
  addPersonalBlock: (block: Omit<PersonalBlock, 'id'>) => void;
  removePersonalBlock: (id: string) => void;
  updatePersonalBlock: (id: string, updates: Partial<PersonalBlock>) => void;
  regenerateSchedule: () => void;
  saveToDB: () => Promise<void>;
}

export const useDailyPlannerStore = create<DailyPlannerState>((set, get) => ({
  todayConfig: null,
  generatedSchedule: [],
  isConfigured: false,

  init: async () => {
    const today = getTodayDate();

    // Try to load existing plan for today
    const existing = await db.dailyPlans.where('date').equals(today).first();

    if (existing) {
      const config = existing;
      const schedule = generateDailySchedule(config, curriculum.dailySchedule);
      set({ todayConfig: config, generatedSchedule: schedule, isConfigured: true });
      return;
    }

    // Create default from settings templates
    const settings = useSettingsStore.getState();
    const dayOfWeek = new Date().getDay(); // 0=Sun...6=Sat

    const activeTemplates = (settings.personalBlockTemplates || [])
      .filter(t => t.activeDays.length === 0 || t.activeDays.includes(dayOfWeek))
      .map(t => ({
        id: t.id,
        label: t.label,
        startTime: t.startTime,
        endTime: t.endTime,
        color: t.color,
      }));

    const config: DailyPlanConfig = {
      date: today,
      wakeUpTime: settings.defaultWakeUpTime || '06:30',
      bedTime: settings.defaultBedTime || '22:30',
      personalBlocks: activeTemplates,
    };

    const schedule = generateDailySchedule(config, curriculum.dailySchedule);
    set({ todayConfig: config, generatedSchedule: schedule, isConfigured: false });

    // Auto-save to DB
    await db.dailyPlans.add(config);
    const saved = await db.dailyPlans.where('date').equals(today).first();
    if (saved) {
      set({ todayConfig: saved });
    }
  },

  setWakeUpTime: (time: string) => {
    const { todayConfig } = get();
    if (!todayConfig) return;

    const updated = { ...todayConfig, wakeUpTime: time };
    const schedule = generateDailySchedule(updated, curriculum.dailySchedule);
    set({ todayConfig: updated, generatedSchedule: schedule, isConfigured: true });
    get().saveToDB();
  },

  setBedTime: (time: string) => {
    const { todayConfig } = get();
    if (!todayConfig) return;

    const updated = { ...todayConfig, bedTime: time };
    const schedule = generateDailySchedule(updated, curriculum.dailySchedule);
    set({ todayConfig: updated, generatedSchedule: schedule, isConfigured: true });
    get().saveToDB();
  },

  addPersonalBlock: (block: Omit<PersonalBlock, 'id'>) => {
    const { todayConfig } = get();
    if (!todayConfig) return;

    const newBlock: PersonalBlock = {
      ...block,
      id: `pb_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    };

    const updated = {
      ...todayConfig,
      personalBlocks: [...todayConfig.personalBlocks, newBlock],
    };
    const schedule = generateDailySchedule(updated, curriculum.dailySchedule);
    set({ todayConfig: updated, generatedSchedule: schedule, isConfigured: true });
    get().saveToDB();
  },

  removePersonalBlock: (id: string) => {
    const { todayConfig } = get();
    if (!todayConfig) return;

    const updated = {
      ...todayConfig,
      personalBlocks: todayConfig.personalBlocks.filter(b => b.id !== id),
    };
    const schedule = generateDailySchedule(updated, curriculum.dailySchedule);
    set({ todayConfig: updated, generatedSchedule: schedule, isConfigured: true });
    get().saveToDB();
  },

  updatePersonalBlock: (id: string, updates: Partial<PersonalBlock>) => {
    const { todayConfig } = get();
    if (!todayConfig) return;

    const updated = {
      ...todayConfig,
      personalBlocks: todayConfig.personalBlocks.map(b =>
        b.id === id ? { ...b, ...updates } : b
      ),
    };
    const schedule = generateDailySchedule(updated, curriculum.dailySchedule);
    set({ todayConfig: updated, generatedSchedule: schedule, isConfigured: true });
    get().saveToDB();
  },

  regenerateSchedule: () => {
    const { todayConfig } = get();
    if (!todayConfig) return;

    const schedule = generateDailySchedule(todayConfig, curriculum.dailySchedule);
    set({ generatedSchedule: schedule });
  },

  saveToDB: async () => {
    const { todayConfig } = get();
    if (!todayConfig) return;

    if (todayConfig.id) {
      await db.dailyPlans.put(todayConfig);
    } else {
      const existing = await db.dailyPlans.where('date').equals(todayConfig.date).first();
      if (existing) {
        await db.dailyPlans.update(existing.id!, {
          wakeUpTime: todayConfig.wakeUpTime,
          bedTime: todayConfig.bedTime,
          personalBlocks: todayConfig.personalBlocks,
        });
        set({ todayConfig: { ...todayConfig, id: existing.id } });
      }
    }
  },
}));
