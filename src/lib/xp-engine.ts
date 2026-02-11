import type { TaskType, LevelInfo, UserStats } from '@/types/index.ts';

const XP_VALUES: Record<TaskType, number> = {
  daily_task: 10,
  weekly_task: 50,
  goal: 100,
  kpi: 100,
  certification: 500,
  code_exercise: 25,
  book_chapter: 15,
  tool_setup: 10,
  project: 50,
};

export function getXpForTaskType(type: TaskType): number {
  return XP_VALUES[type] ?? 10;
}

export function getStreakMultiplier(streakDays: number): number {
  if (streakDays >= 30) return 2.0;
  if (streakDays >= 14) return 1.5;
  if (streakDays >= 7) return 1.25;
  if (streakDays >= 3) return 1.1;
  return 1.0;
}

export function calculateXp(type: TaskType, streakDays: number): number {
  const base = getXpForTaskType(type);
  const mult = getStreakMultiplier(streakDays);
  return Math.round(base * mult);
}

export function xpRequiredForLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.5));
}

export function getTotalXpForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += xpRequiredForLevel(i);
  }
  return total;
}

export function getLevelFromXp(totalXp: number): number {
  let level = 1;
  let accumulated = 0;
  while (level < 50) {
    const needed = xpRequiredForLevel(level);
    if (accumulated + needed > totalXp) break;
    accumulated += needed;
    level++;
  }
  return level;
}

export function getLevelTitle(level: number): string {
  if (level <= 7) return 'Recruit';
  if (level <= 14) return 'Operator';
  if (level <= 21) return 'Specialist';
  if (level <= 28) return 'Advanced';
  if (level <= 35) return 'Expert';
  if (level <= 42) return 'Sovereign';
  return 'Intelligence Operator';
}

export function getLevelPhase(level: number): number {
  if (level <= 7) return 1;
  if (level <= 14) return 2;
  if (level <= 21) return 3;
  if (level <= 28) return 4;
  if (level <= 35) return 5;
  if (level <= 42) return 6;
  return 7;
}

export function getLevelInfo(totalXp: number): LevelInfo {
  const level = getLevelFromXp(totalXp);
  const xpForCurrentLevel = getTotalXpForLevel(level);
  const xpForNextLevel = xpRequiredForLevel(level);
  return {
    level,
    title: getLevelTitle(level),
    xpRequired: totalXp - xpForCurrentLevel,
    xpForNext: xpForNextLevel,
    phase: getLevelPhase(level),
  };
}

export function calculateSkillScores(stats: UserStats): Record<string, number> {
  const base = stats.skillScores ?? {};
  return {
    OSINT: Math.min(100, (base['OSINT'] ?? 0)),
    Pentest: Math.min(100, (base['Pentest'] ?? 0)),
    Forensik: Math.min(100, (base['Forensik'] ?? 0)),
    Kryptographie: Math.min(100, (base['Kryptographie'] ?? 0)),
    'Reverse Engineering': Math.min(100, (base['Reverse Engineering'] ?? 0)),
    'Social Engineering': Math.min(100, (base['Social Engineering'] ?? 0)),
    Netzwerk: Math.min(100, (base['Netzwerk'] ?? 0)),
    Programmierung: Math.min(100, (base['Programmierung'] ?? 0)),
    'Mobile Security': Math.min(100, (base['Mobile Security'] ?? 0)),
    Intelligence: Math.min(100, (base['Intelligence'] ?? 0)),
  };
}
