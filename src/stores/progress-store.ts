import { create } from 'zustand';
import { db } from '@/lib/db.ts';
import { calculateXp, getLevelInfo } from '@/lib/xp-engine.ts';
import { checkNewBadges } from '@/lib/badge-engine.ts';
import { getToday } from '@/lib/utils.ts';
import type { TaskType, UserStats, TaskProgress, DailyLog, UnlockedBadge } from '@/types/index.ts';

interface ProgressState {
  completedTaskIds: Set<string>;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  unlockedBadgeIds: string[];
  dailyLogs: DailyLog[];
  stats: UserStats;
  xpAnimation: { amount: number; visible: boolean } | null;
  levelUpAnimation: { level: number; title: string; visible: boolean } | null;
  badgeAnimation: { name: string; icon: string; visible: boolean } | null;

  init: () => Promise<void>;
  completeTask: (taskId: string, type: TaskType) => Promise<void>;
  uncompleteTask: (taskId: string) => Promise<void>;
  isCompleted: (taskId: string) => boolean;
  dismissXpAnimation: () => void;
  dismissLevelUp: () => void;
  dismissBadge: () => void;
}

function buildStats(
  completedIds: Set<string>,
  totalXp: number,
  streak: number,
  longestStreak: number,
  badges: string[],
  dailyLogs: DailyLog[]
): UserStats {
  const levelInfo = getLevelInfo(totalXp);
  return {
    totalXp,
    level: levelInfo.level,
    tasksCompleted: completedIds.size,
    currentStreak: streak,
    longestStreak,
    phasesCompleted: 0,
    monthsCompleted: 0,
    certificationsEarned: 0,
    codeExercisesDone: 0,
    booksRead: 0,
    toolsSetup: 0,
    kpisCompleted: 0,
    totalDaysActive: dailyLogs.length,
    weekendWarriorCount: 0,
    nightOwlCount: 0,
    completedTasksByType: {} as Record<TaskType, number>,
    completedTasksByPhase: {},
    skillScores: {},
  };
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  completedTaskIds: new Set<string>(),
  totalXp: 0,
  currentStreak: 0,
  longestStreak: 0,
  unlockedBadgeIds: [],
  dailyLogs: [],
  stats: buildStats(new Set(), 0, 0, 0, [], []),
  xpAnimation: null,
  levelUpAnimation: null,
  badgeAnimation: null,

  init: async () => {
    const progressRecords = await db.progress.toArray();
    const badgeRecords = await db.badges.toArray();
    const logRecords = await db.dailyLog.toArray();

    const completedIds = new Set(progressRecords.map((p: TaskProgress) => p.taskId));
    const totalXp = progressRecords.reduce((sum: number, p: TaskProgress) => sum + p.xpEarned, 0);
    const badgeIds = badgeRecords.map((b: UnlockedBadge) => b.badgeId);

    // Calculate streak
    const sortedLogs = [...logRecords].sort((a, b) => b.date.localeCompare(a.date));
    let streak = 0;
    let longestStreak = 0;
    const today = getToday();
    let checkDate = today;

    for (const log of sortedLogs) {
      if (log.date === checkDate) {
        streak++;
        const prev = new Date(checkDate);
        prev.setDate(prev.getDate() - 1);
        checkDate = prev.toISOString().split('T')[0];
      } else {
        break;
      }
    }

    // Calculate longest streak from all logs
    let tempStreak = 0;
    const allDates = logRecords.map((l: DailyLog) => l.date).sort();
    for (let i = 0; i < allDates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prev = new Date(allDates[i - 1]);
        const curr = new Date(allDates[i]);
        const diff = (curr.getTime() - prev.getTime()) / 86400000;
        tempStreak = diff === 1 ? tempStreak + 1 : 1;
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    }

    const stats = buildStats(completedIds, totalXp, streak, longestStreak, badgeIds, logRecords);

    set({
      completedTaskIds: completedIds,
      totalXp,
      currentStreak: streak,
      longestStreak,
      unlockedBadgeIds: badgeIds,
      dailyLogs: logRecords,
      stats,
    });
  },

  completeTask: async (taskId, type) => {
    const state = get();
    if (state.completedTaskIds.has(taskId)) return;

    const xp = calculateXp(type, state.currentStreak);
    const oldLevel = getLevelInfo(state.totalXp).level;

    // Save to DB
    await db.progress.add({
      taskId,
      completedAt: new Date(),
      xpEarned: xp,
    });

    // Update daily log
    const today = getToday();
    const existingLog = await db.dailyLog.where('date').equals(today).first();
    if (existingLog) {
      await db.dailyLog.update(existingLog.id!, {
        tasksCompleted: existingLog.tasksCompleted + 1,
        xpEarned: existingLog.xpEarned + xp,
      });
    } else {
      await db.dailyLog.add({
        date: today,
        tasksCompleted: 1,
        xpEarned: xp,
        streakDay: state.currentStreak + 1,
      });
    }

    const newCompleted = new Set(state.completedTaskIds);
    newCompleted.add(taskId);
    const newTotalXp = state.totalXp + xp;
    const newLevel = getLevelInfo(newTotalXp).level;

    // Recalculate streak
    const logs = await db.dailyLog.toArray();
    const newStats = buildStats(newCompleted, newTotalXp, state.currentStreak, state.longestStreak, state.unlockedBadgeIds, logs);

    // Check for new badges
    const newBadges = checkNewBadges(newStats, state.unlockedBadgeIds);
    const newBadgeIds = [...state.unlockedBadgeIds];
    for (const badge of newBadges) {
      await db.badges.add({ badgeId: badge.id, unlockedAt: new Date() });
      newBadgeIds.push(badge.id);
    }

    set({
      completedTaskIds: newCompleted,
      totalXp: newTotalXp,
      dailyLogs: logs,
      unlockedBadgeIds: newBadgeIds,
      stats: { ...newStats, level: newLevel },
      xpAnimation: { amount: xp, visible: true },
      levelUpAnimation: newLevel > oldLevel ? { level: newLevel, title: getLevelInfo(newTotalXp).title, visible: true } : state.levelUpAnimation,
      badgeAnimation: newBadges.length > 0 ? { name: newBadges[0].name, icon: newBadges[0].icon, visible: true } : state.badgeAnimation,
    });
  },

  uncompleteTask: async (taskId) => {
    const state = get();
    if (!state.completedTaskIds.has(taskId)) return;

    const progressRecord = await db.progress.where('taskId').equals(taskId).first();
    if (progressRecord) {
      const xp = progressRecord.xpEarned;
      await db.progress.delete(progressRecord.id!);

      const newCompleted = new Set(state.completedTaskIds);
      newCompleted.delete(taskId);
      const newTotalXp = Math.max(0, state.totalXp - xp);
      const logs = await db.dailyLog.toArray();
      const newStats = buildStats(newCompleted, newTotalXp, state.currentStreak, state.longestStreak, state.unlockedBadgeIds, logs);

      set({
        completedTaskIds: newCompleted,
        totalXp: newTotalXp,
        stats: newStats,
      });
    }
  },

  isCompleted: (taskId) => get().completedTaskIds.has(taskId),

  dismissXpAnimation: () => set({ xpAnimation: null }),
  dismissLevelUp: () => set({ levelUpAnimation: null }),
  dismissBadge: () => set({ badgeAnimation: null }),
}));
