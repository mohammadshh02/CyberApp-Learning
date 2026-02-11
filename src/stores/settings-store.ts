import { create } from 'zustand';
import { getSetting, setSetting } from '@/lib/db.ts';
import type { AppSettings, RescheduleStrategy } from '@/types/index.ts';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  startDate: new Date().toISOString().split('T')[0],
  rescheduleStrategy: 'catch-up',
  catchUpMaxExtraTasks: 2,
  sidebarCollapsed: false,
};

interface SettingsState extends AppSettings {
  init: () => Promise<void>;
  setTheme: (theme: 'dark' | 'light') => void;
  setStartDate: (date: string) => void;
  setRescheduleStrategy: (strategy: RescheduleStrategy) => void;
  setCatchUpMaxExtraTasks: (max: number) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  ...DEFAULT_SETTINGS,

  init: async () => {
    const theme = (await getSetting('theme')) as 'dark' | 'light' | undefined;
    const startDate = await getSetting('startDate');
    const strategy = (await getSetting('rescheduleStrategy')) as RescheduleStrategy | undefined;
    const maxExtra = await getSetting('catchUpMaxExtraTasks');

    const settings: Partial<AppSettings> = {};
    if (theme) settings.theme = theme;
    if (startDate) settings.startDate = startDate;
    if (strategy) settings.rescheduleStrategy = strategy;
    if (maxExtra) settings.catchUpMaxExtraTasks = parseInt(maxExtra);

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
}));
