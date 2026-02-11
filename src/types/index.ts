// ===== CURRICULUM TYPES =====

export type ParsingStrategy =
  | 'full_daily'
  | 'partial_daily'
  | 'weekly_only'
  | 'topic_based'
  | 'business';

export interface Phase {
  id: number;
  name: string;
  codename: string;
  months: number[];
  color: string;
  description: string;
}

export interface CurriculumMonth {
  id: number;
  monthRange: string; // e.g. "1" or "13-15"
  title: string;
  phase: number;
  strategy: ParsingStrategy;
  goals: GoalItem[];
  weeks: CurriculumWeek[];
  kpis: KPIItem[];
  tools: ToolItem[];
  codeBlocks: CodeBlock[];
  rawContent: string;
}

export interface CurriculumWeek {
  id: string; // e.g. "w1", "w13"
  weekNumber: number;
  title: string;
  days: CurriculumDay[];
  goals: string[];
}

export interface CurriculumDay {
  id: string;
  dayNumber: number;
  title: string;
  timeBlocks: TimeBlock[];
}

export interface TimeBlock {
  id: string;
  time: string; // e.g. "06:30-08:30"
  category: string; // e.g. "DEEP TECHNICAL"
  title: string;
  tasks: TaskItem[];
}

export interface TaskItem {
  id: string;
  text: string;
  type: TaskType;
  monthId: number;
  weekId?: string;
  dayId?: string;
  isCheckbox: boolean;
}

export type TaskType =
  | 'goal'
  | 'daily_task'
  | 'weekly_task'
  | 'kpi'
  | 'tool_setup'
  | 'certification'
  | 'code_exercise'
  | 'book_chapter'
  | 'project';

export interface GoalItem {
  id: string;
  text: string;
  monthId: number;
}

export interface KPIItem {
  id: string;
  name: string;
  target: string;
  monthId: number;
}

export interface ToolItem {
  id: string;
  name: string;
  setup: string;
  priority: string;
  month: number;
  description: string;
}

export interface CodeBlock {
  id: string;
  language: string;
  code: string;
  context: string;
  monthId: number;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  month: string;
  reason: string;
  category: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  abbreviation: string;
  month: number;
  cost: string;
  reason: string;
}

export interface Curriculum {
  phases: Phase[];
  months: CurriculumMonth[];
  books: BookItem[];
  certifications: CertificationItem[];
  tools: ToolItem[];
  dailySchedule: { time: string; block: string }[];
}

// ===== PROGRESS TYPES =====

export interface TaskProgress {
  id?: number;
  taskId: string;
  completedAt: Date;
  xpEarned: number;
}

export interface DailyLog {
  id?: number;
  date: string; // YYYY-MM-DD
  tasksCompleted: number;
  xpEarned: number;
  streakDay: number;
}

// ===== BADGE TYPES =====

export type BadgeCategory =
  | 'milestone'
  | 'streak'
  | 'skill'
  | 'certification'
  | 'special';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  condition: (stats: UserStats) => boolean;
}

export interface UnlockedBadge {
  id?: number;
  badgeId: string;
  unlockedAt: Date;
}

// ===== SCHEDULE TYPES =====

export type RescheduleStrategy = 'shift' | 'catch-up';

export interface ScheduleEntry {
  id?: number;
  date: string;
  type: 'normal' | 'blocked' | 'rescheduled';
  taskIds: string[];
  note?: string;
}

// ===== USER STATS =====

export interface UserStats {
  totalXp: number;
  level: number;
  tasksCompleted: number;
  currentStreak: number;
  longestStreak: number;
  phasesCompleted: number;
  monthsCompleted: number;
  certificationsEarned: number;
  codeExercisesDone: number;
  booksRead: number;
  toolsSetup: number;
  kpisCompleted: number;
  totalDaysActive: number;
  weekendWarriorCount: number;
  nightOwlCount: number;
  completedTasksByType: Record<TaskType, number>;
  completedTasksByPhase: Record<number, number>;
  skillScores: Record<string, number>;
}

// ===== DAILY PLANNER TYPES =====

export interface PersonalBlock {
  id: string;
  label: string;
  startTime: string;   // "16:00"
  endTime: string;      // "18:00"
  color?: string;
}

export interface DailyPlanConfig {
  id?: number;
  date: string;           // "2026-02-11"
  wakeUpTime: string;     // "07:30"
  bedTime: string;        // "22:30"
  personalBlocks: PersonalBlock[];
}

export interface GeneratedBlock {
  id: string;
  startTime: string;
  endTime: string;
  label: string;
  type: 'learning' | 'personal' | 'break';
  curriculumBlockIndex?: number;
  durationMinutes: number;
}

export interface PersonalBlockTemplate {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  activeDays: number[];   // 0=So, 1=Mo...6=Sa (leer = jeden Tag)
  color?: string;
}

// ===== SETTINGS =====

export interface AppSettings {
  theme: 'dark' | 'light';
  startDate: string; // ISO date
  rescheduleStrategy: RescheduleStrategy;
  catchUpMaxExtraTasks: number;
  sidebarCollapsed: boolean;
  defaultWakeUpTime: string;
  defaultBedTime: string;
  personalBlockTemplates: PersonalBlockTemplate[];
}

// ===== VIEW TYPES =====

export type ViewId =
  | 'dashboard'
  | 'today'
  | 'calendar'
  | 'curriculum'
  | 'glossary'
  | 'achievements'
  | 'settings';

// ===== GLOSSARY TYPES =====

export const GLOSSARY_CATEGORIES = [
  'Python', 'Linux', 'Netzwerk', 'OSINT', 'Forensik', 'Kryptographie',
  'Penetration Testing', 'Social Engineering', 'Reverse Engineering',
  'Malware Analysis', 'Mobile Security', 'Wireless/RF', 'Active Directory',
  'Blockchain/Crypto Tracing', 'AML/Compliance', 'Threat Intelligence', 'Allgemein',
] as const;
export type GlossaryCategory = typeof GLOSSARY_CATEGORIES[number];

export interface GlossaryEntry {
  id: string;
  term: string;
  definition: string;
  category: GlossaryCategory;
  isCustom: boolean;
}

export interface FlashcardProgress {
  id?: number;
  termId: string;
  known: boolean;
  lastReviewedAt: string;
  reviewCount: number;
  correctCount: number;
}

export type GlossaryMode = 'overview' | 'flashcards';

// ===== LEVEL SYSTEM =====

export interface LevelInfo {
  level: number;
  title: string;
  xpRequired: number;
  xpForNext: number;
  phase: number;
}

export const PHASE_DEFINITIONS: Phase[] = [
  { id: 1, name: 'RECRUIT', codename: 'Phase 1', months: [1, 2, 3], color: 'var(--color-phase-1)', description: 'Funktionale Basis — Coden, Linux, Netzwerk, OSINT' },
  { id: 2, name: 'OPERATOR', codename: 'Phase 2', months: [4, 5, 6], color: 'var(--color-phase-2)', description: 'Forensik + Crypto Tracing + Advanced OSINT' },
  { id: 3, name: 'SPECIALIST', codename: 'Phase 3', months: [7, 8, 9], color: 'var(--color-phase-3)', description: 'Offensive Security + Social Engineering' },
  { id: 4, name: 'ADVANCED', codename: 'Phase 4', months: [10, 11, 12], color: 'var(--color-phase-4)', description: 'Reverse Engineering, Binary Exploitation' },
  { id: 5, name: 'EXPERT', codename: 'Phase 5', months: [13, 14, 15, 16, 17, 18], color: 'var(--color-phase-5)', description: 'OSCP, Advanced Exploitation, Mobile Security' },
  { id: 6, name: 'SOVEREIGN', codename: 'Phase 6', months: [19, 20, 21, 22, 23, 24], color: 'var(--color-phase-6)', description: 'Vulnerability Research, 0-Day, Staatlicher Einstieg' },
  { id: 7, name: 'INTELLIGENCE', codename: 'Level 2', months: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], color: 'var(--color-phase-7)', description: 'Full-Spectrum Intelligence Operations' },
];

export const LEVEL_TITLES: Record<string, string> = {
  '1-7': 'Recruit',
  '8-14': 'Operator',
  '15-21': 'Specialist',
  '22-28': 'Advanced',
  '29-35': 'Expert',
  '36-42': 'Sovereign',
  '43-50': 'Intelligence Operator',
};

export const SKILL_CATEGORIES = [
  'OSINT', 'Pentest', 'Forensik', 'Kryptographie',
  'Reverse Engineering', 'Social Engineering', 'Netzwerk',
  'Programmierung', 'Mobile Security', 'Intelligence',
] as const;

export type SkillCategory = typeof SKILL_CATEGORIES[number];
