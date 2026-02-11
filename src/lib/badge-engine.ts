import type { Badge, UserStats, BadgeCategory } from '@/types/index.ts';

export const BADGES: Badge[] = [
  // Milestone badges
  { id: 'first_blood', name: 'First Blood', description: 'Erste Task erledigt', icon: 'Swords', category: 'milestone', condition: (s) => s.tasksCompleted >= 1 },
  { id: 'ten_tasks', name: 'Getting Started', description: '10 Tasks erledigt', icon: 'Flame', category: 'milestone', condition: (s) => s.tasksCompleted >= 10 },
  { id: 'fifty_tasks', name: 'Half Century', description: '50 Tasks erledigt', icon: 'Trophy', category: 'milestone', condition: (s) => s.tasksCompleted >= 50 },
  { id: 'hundred_tasks', name: 'Centurion', description: '100 Tasks erledigt', icon: 'Medal', category: 'milestone', condition: (s) => s.tasksCompleted >= 100 },
  { id: 'five_hundred_tasks', name: 'Task Machine', description: '500 Tasks erledigt', icon: 'Zap', category: 'milestone', condition: (s) => s.tasksCompleted >= 500 },
  { id: 'phase_1_complete', name: 'Recruit Complete', description: 'Phase 1 abgeschlossen', icon: 'Shield', category: 'milestone', condition: (s) => s.phasesCompleted >= 1 },
  { id: 'phase_2_complete', name: 'Operator Complete', description: 'Phase 2 abgeschlossen', icon: 'ShieldCheck', category: 'milestone', condition: (s) => s.phasesCompleted >= 2 },
  { id: 'phase_3_complete', name: 'Specialist Complete', description: 'Phase 3 abgeschlossen', icon: 'ShieldAlert', category: 'milestone', condition: (s) => s.phasesCompleted >= 3 },
  { id: 'all_phases', name: 'Sovereign', description: 'Alle 7 Phasen abgeschlossen', icon: 'Crown', category: 'milestone', condition: (s) => s.phasesCompleted >= 7 },
  { id: 'level_10', name: 'Double Digits', description: 'Level 10 erreicht', icon: 'TrendingUp', category: 'milestone', condition: (s) => s.level >= 10 },
  { id: 'level_25', name: 'Quarter Mark', description: 'Level 25 erreicht', icon: 'Star', category: 'milestone', condition: (s) => s.level >= 25 },
  { id: 'level_50', name: 'Maximum Power', description: 'Level 50 erreicht', icon: 'Sparkles', category: 'milestone', condition: (s) => s.level >= 50 },

  // Streak badges
  { id: 'streak_7', name: '7-Day Streak', description: '7 Tage in Folge aktiv', icon: 'Flame', category: 'streak', condition: (s) => s.longestStreak >= 7 },
  { id: 'streak_14', name: '14-Day Streak', description: '14 Tage in Folge aktiv', icon: 'Flame', category: 'streak', condition: (s) => s.longestStreak >= 14 },
  { id: 'streak_30', name: '30-Day Streak', description: '30 Tage in Folge aktiv', icon: 'Flame', category: 'streak', condition: (s) => s.longestStreak >= 30 },
  { id: 'streak_100', name: '100-Day Streak', description: '100 Tage in Folge aktiv', icon: 'Flame', category: 'streak', condition: (s) => s.longestStreak >= 100 },
  { id: 'streak_365', name: 'Year-Long Grind', description: '365 Tage in Folge aktiv', icon: 'Flame', category: 'streak', condition: (s) => s.longestStreak >= 365 },

  // Skill badges
  { id: 'osint_master', name: 'OSINT Master', description: 'OSINT Skill auf 80+', icon: 'Search', category: 'skill', condition: (s) => (s.skillScores['OSINT'] ?? 0) >= 80 },
  { id: 'pentest_pro', name: 'Pentest Pro', description: 'Pentest Skill auf 80+', icon: 'Bug', category: 'skill', condition: (s) => (s.skillScores['Pentest'] ?? 0) >= 80 },
  { id: 'forensik_expert', name: 'Forensik-Experte', description: 'Forensik Skill auf 80+', icon: 'Microscope', category: 'skill', condition: (s) => (s.skillScores['Forensik'] ?? 0) >= 80 },
  { id: 'code_warrior', name: 'Code Warrior', description: '50+ Code-Übungen gemacht', icon: 'Code', category: 'skill', condition: (s) => s.codeExercisesDone >= 50 },
  { id: 'bookworm', name: 'Bookworm', description: '100+ Buchkapitel gelesen', icon: 'BookOpen', category: 'skill', condition: (s) => s.booksRead >= 100 },

  // Certification badges
  { id: 'cert_cfe', name: 'CFE Certified', description: 'Certified Fraud Examiner bestanden', icon: 'Award', category: 'certification', condition: (s) => s.certificationsEarned >= 1 },
  { id: 'cert_oscp', name: 'OSCP Certified', description: 'OSCP bestanden', icon: 'Award', category: 'certification', condition: (s) => s.certificationsEarned >= 2 },
  { id: 'cert_triple', name: 'Triple Certified', description: '3+ Zertifizierungen', icon: 'Award', category: 'certification', condition: (s) => s.certificationsEarned >= 3 },

  // Special badges
  { id: 'night_owl', name: 'Night Owl', description: '10+ Tasks nach 22:00 erledigt', icon: 'Moon', category: 'special', condition: (s) => s.nightOwlCount >= 10 },
  { id: 'weekend_warrior', name: 'Weekend Warrior', description: '20+ Tasks am Wochenende erledigt', icon: 'Calendar', category: 'special', condition: (s) => s.weekendWarriorCount >= 20 },
  { id: 'tool_master', name: 'Tool Master', description: '30+ Tools eingerichtet', icon: 'Wrench', category: 'special', condition: (s) => s.toolsSetup >= 30 },
];

export function checkNewBadges(stats: UserStats, alreadyUnlocked: string[]): Badge[] {
  return BADGES.filter(
    (badge) => !alreadyUnlocked.includes(badge.id) && badge.condition(stats)
  );
}

export function getBadgesByCategory(category: BadgeCategory): Badge[] {
  return BADGES.filter((b) => b.category === category);
}

export function getBadgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}
