import { create } from 'zustand';
import { getSetting, setSetting } from '@/lib/db.ts';
import type { AppSettings, RescheduleStrategy, PersonalBlockTemplate } from '@/types/index.ts';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  startDate: new Date().toISOString().split('T')[0],
  rescheduleStrategy: 'catch-up',
  catchUpMaxExtraTasks: 2,
  sidebarCollapsed: false,
  defaultWakeUpTime: '06:30',
  defaultBedTime: '22:30',
  personalBlockTemplates: [],
};

interface SettingsState extends AppSettings {
  init: () => Promise<void>;
  setTheme: (theme: 'dark' | 'light') => void;
  setStartDate: (date: string) => void;
  setRescheduleStrategy: (strategy: RescheduleStrategy) => void;
  setCatchUpMaxExtraTasks: (max: number) => void;
  setDefaultWakeUpTime: (time: string) => void;
  setDefaultBedTime: (time: string) => void;
  addTemplate: (template: Omit<PersonalBlockTemplate, 'id'>) => void;
  removeTemplate: (id: string) => void;
  updateTemplate: (id: string, updates: Partial<PersonalBlockTemplate>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  ...DEFAULT_SETTINGS,

  init: async () => {
    const theme = (await getSetting('theme')) as 'dark' | 'light' | undefined;
    const startDate = await getSetting('startDate');
    const strategy = (await getSetting('rescheduleStrategy')) as RescheduleStrategy | undefined;
    const maxExtra = await getSetting('catchUpMaxExtraTasks');
    const wakeUp = await getSetting('defaultWakeUpTime');
    const bedTime = await getSetting('defaultBedTime');
    const templatesJson = await getSetting('personalBlockTemplates');

    const settings: Partial<AppSettings> = {};
    if (theme) settings.theme = theme;
    if (startDate) settings.startDate = startDate;
    if (strategy) settings.rescheduleStrategy = strategy;
    if (maxExtra) settings.catchUpMaxExtraTasks = parseInt(maxExtra);
    if (wakeUp) settings.defaultWakeUpTime = wakeUp;
    if (bedTime) settings.defaultBedTime = bedTime;
    if (templatesJson) {
      try { settings.personalBlockTemplates = JSON.parse(templatesJson); } catch { /* ignore */ }
    }

    // Apply theme
    document.documentElement.setAttribute('data-theme', settings.theme || DEFAULT_SETTINGS.theme);

    set(settings);
  },

  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    setSetting('theme', theme);
    set({ theme });
  },

  setStartDate: (date) => {
    setSetting('startDate', date);
    set({ startDate: date });
  },

  setRescheduleStrategy: (strategy) => {
    setSetting('rescheduleStrategy', strategy);
    set({ rescheduleStrategy: strategy });
  },

  setCatchUpMaxExtraTasks: (max) => {
    setSetting('catchUpMaxExtraTasks', max.toString());
    set({ catchUpMaxExtraTasks: max });
  },

  setDefaultWakeUpTime: (time) => {
    setSetting('defaultWakeUpTime', time);
    set({ defaultWakeUpTime: time });
  },

  setDefaultBedTime: (time) => {
    setSetting('defaultBedTime', time);
    set({ defaultBedTime: time });
  },

  addTemplate: (template) => {
    const id = `tpl_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const newTemplate: PersonalBlockTemplate = { ...template, id };
    const updated = [...(useSettingsStore.getState().personalBlockTemplates || []), newTemplate];
    setSetting('personalBlockTemplates', JSON.stringify(updated));
    set({ personalBlockTemplates: updated });
  },

  removeTemplate: (id) => {
    const updated = (useSettingsStore.getState().personalBlockTemplates || []).filter(t => t.id !== id);
    setSetting('personalBlockTemplates', JSON.stringify(updated));
    set({ personalBlockTemplates: updated });
  },

  updateTemplate: (id, updates) => {
    const updated = (useSettingsStore.getState().personalBlockTemplates || []).map(t =>
      t.id === id ? { ...t, ...updates } : t
    );
    setSetting('personalBlockTemplates', JSON.stringify(updated));
    set({ personalBlockTemplates: updated });
  },
}));
