import { create } from 'zustand';
import { db } from '@/lib/db.ts';
import { generateAutoReport } from '@/lib/report-generator.ts';
import { useProgressStore } from './progress-store.ts';
import { getLevelInfo } from '@/lib/xp-engine.ts';
import type { Report, ReportType, ReportCategory, AutoReportPeriod } from '@/types/index.ts';

type FilterType = ReportType | 'all';

interface ReportsState {
  reports: Report[];
  searchQuery: string;
  filterType: FilterType;
  filterCategory: ReportCategory | 'all';
  selectedReportId: string | null;
  editorOpen: boolean;
  editingReport: Report | null;

  init: () => Promise<void>;
  addCustomReport: (title: string, content: string, category: ReportCategory, tags: string[]) => Promise<void>;
  generateReport: (period: AutoReportPeriod) => Promise<void>;
  updateReport: (id: string, title: string, content: string, category: ReportCategory, tags: string[]) => Promise<void>;
  deleteReport: (id: string) => Promise<void>;
  setSearchQuery: (q: string) => void;
  setFilterType: (t: FilterType) => void;
  setFilterCategory: (c: ReportCategory | 'all') => void;
  selectReport: (id: string | null) => void;
  setEditorOpen: (open: boolean) => void;
  setEditingReport: (report: Report | null) => void;
  getFilteredReports: () => Report[];
}

export const useReportsStore = create<ReportsState>((set, get) => ({
  reports: [],
  searchQuery: '',
  filterType: 'all',
  filterCategory: 'all',
  selectedReportId: null,
  editorOpen: false,
  editingReport: null,

  init: async () => {
    const reports = await db.reports.toArray();
    set({ reports: reports.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
  },

  addCustomReport: async (title, content, category, tags) => {
    const now = new Date().toISOString();
    const report: Report = {
      id: `rpt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      type: 'custom',
      title,
      content,
      category,
      tags,
      createdAt: now,
      updatedAt: now,
    };
    await db.reports.put(report);
    set({
      reports: [report, ...get().reports],
      editorOpen: false,
      editingReport: null,
    });
  },

  generateReport: async (period) => {
    const progress = useProgressStore.getState();
    const levelInfo = getLevelInfo(progress.totalXp);

    const result = generateAutoReport(period, {
      completedTaskIds: progress.completedTaskIds,
      totalXp: progress.totalXp,
      currentStreak: progress.currentStreak,
      longestStreak: progress.longestStreak,
      dailyLogs: progress.dailyLogs,
      level: levelInfo.level,
      levelTitle: levelInfo.title,
    });

    const now = new Date().toISOString();
    const report: Report = {
      id: `rpt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      type: 'auto',
      title: result.title,
      content: result.content,
      tags: [period === 'weekly' ? 'Woche' : 'Monat'],
      period,
      periodStart: result.periodStart,
      periodEnd: result.periodEnd,
      createdAt: now,
      updatedAt: now,
    };
    await db.reports.put(report);
    set({ reports: [report, ...get().reports] });
  },

  updateReport: async (id, title, content, category, tags) => {
    const now = new Date().toISOString();
    const reports = get().reports.map((r) =>
      r.id === id ? { ...r, title, content, category, tags, updatedAt: now } : r,
    );
    const updated = reports.find((r) => r.id === id);
    if (updated) await db.reports.put(updated);
    set({ reports, editorOpen: false, editingReport: null });
  },

  deleteReport: async (id) => {
    await db.reports.delete(id);
    set({
      reports: get().reports.filter((r) => r.id !== id),
      selectedReportId: get().selectedReportId === id ? null : get().selectedReportId,
    });
  },

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setFilterType: (filterType) => set({ filterType }),
  setFilterCategory: (filterCategory) => set({ filterCategory }),
  selectReport: (selectedReportId) => set({ selectedReportId }),
  setEditorOpen: (editorOpen) => {
    if (!editorOpen) set({ editingReport: null });
    set({ editorOpen });
  },
  setEditingReport: (editingReport) => set({ editingReport, editorOpen: !!editingReport }),

  getFilteredReports: () => {
    const { reports, searchQuery, filterType, filterCategory } = get();
    let result = reports;

    if (filterType !== 'all') {
      result = result.filter((r) => r.type === filterType);
    }
    if (filterCategory !== 'all') {
      result = result.filter((r) => r.category === filterCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.content.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    return result;
  },
}));
