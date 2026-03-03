import { useState, useEffect, useCallback } from 'react';
import {
  Moon, Sun, Dumbbell, BookOpen, Clock, Check, ChevronDown, ChevronUp,
  Flame, Star, Heart, Coffee, Sunset, Sunrise, CalendarDays, Trophy,
  RotateCcw,
} from 'lucide-react';
import { cn } from '@/lib/utils.ts';

/* ================================================================
   RAMADAN 2026 — Düsseldorf / Assalam Moschee
   18. Februar – 19. März 2026 (30 Tage)
   ================================================================ */

const RAMADAN_START = new Date('2026-02-18T00:00:00');
const RAMADAN_END   = new Date('2026-03-20T00:00:00');
const TOTAL_DAYS = 30;
const TOTAL_JUZ = 30;

// ---------- prayer times (approximate Düsseldorf) ----------

interface PrayerDay {
  day: number;
  date: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

function generatePrayerTimes(): PrayerDay[] {
  const days: PrayerDay[] = [];
  const start = new Date(RAMADAN_START);

  // Approximate linear interpolation Düsseldorf Feb 18 → Mar 19
  const fajrStart = 5 * 60 + 50;   // 05:50
  const fajrEnd   = 4 * 60 + 45;   // 04:45
  const maghribStart = 17 * 60 + 55; // 17:55
  const maghribEnd   = 18 * 60 + 50; // 18:50
  const sunriseStart = 7 * 60 + 30;
  const sunriseEnd   = 6 * 60 + 25;
  const ishaStart    = 19 * 60 + 25;
  const ishaEnd      = 20 * 60 + 20;

  for (let i = 0; i < TOTAL_DAYS; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const t = i / (TOTAL_DAYS - 1);

    const fmt = (mins: number) => {
      const h = Math.floor(mins / 60);
      const m = Math.round(mins % 60);
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };
    const lerp = (a: number, b: number) => a + (b - a) * t;

    days.push({
      day: i + 1,
      date: d.toISOString().slice(0, 10),
      fajr: fmt(lerp(fajrStart, fajrEnd)),
      sunrise: fmt(lerp(sunriseStart, sunriseEnd)),
      dhuhr: '12:35',
      asr: fmt(lerp(15 * 60 + 30, 16 * 60 + 5)),
      maghrib: fmt(lerp(maghribStart, maghribEnd)),
      isha: fmt(lerp(ishaStart, ishaEnd)),
    });
  }
  return days;
}

const PRAYER_TIMES = generatePrayerTimes();

// ---------- daily schedule blocks ----------

interface ScheduleBlock {
  time: string;
  label: string;
  type: 'prayer' | 'study' | 'quran' | 'gym' | 'rest' | 'ibadah' | 'meal';
  icon: string;
  description: string;
}

const DAILY_SCHEDULE: ScheduleBlock[] = [
  { time: '05:00–05:30', label: 'Suhoor', type: 'meal', icon: '🍽️', description: 'Proteinreich: Eier, Haferflocken, Banane, viel Wasser. Mind. 40g Protein.' },
  { time: '05:30–05:50', label: 'Fajr Gebet', type: 'prayer', icon: '🕌', description: 'Assalam Moschee oder zuhause. Fajr Sunnah + Fard.' },
  { time: '05:50–06:30', label: 'Quran — ½ Juz', type: 'quran', icon: '📖', description: 'Erste Hälfte des Tages-Juz (~10 Seiten). Ruhig, konzentriert.' },
  { time: '06:30–08:30', label: 'Deep Work Block 1', type: 'study', icon: '💻', description: 'Cybersecurity: Labs, HackTheBox, TryHackMe, CTFs. Höchste Konzentration.' },
  { time: '08:30–08:45', label: 'Pause + Dhikr', type: 'ibadah', icon: '📿', description: 'Frische Luft, Dhikr, Augen ausruhen.' },
  { time: '08:45–10:45', label: 'Deep Work Block 2', type: 'study', icon: '📚', description: 'Uni-Stoff: Prüfungsvorbereitung, Vorlesungsmaterial, Übungen.' },
  { time: '11:00–12:00', label: 'Arabisch + kalifat.com', type: 'ibadah', icon: '🕋', description: 'Arabisch lesen lernen, kalifat.com Artikel, Ibn Yakub Videos.' },
  { time: '12:00–12:30', label: 'Dhuhr Gebet', type: 'prayer', icon: '🕌', description: 'Dhuhr Sunnah + Fard. Kurze Dua.' },
  { time: '12:30–13:00', label: 'Power Nap', type: 'rest', icon: '😴', description: '30 Min Schlaf. KRITISCH bei 5h Nachtschlaf! Timer stellen.' },
  { time: '13:00–15:00', label: 'Deep Work Block 3', type: 'study', icon: '🔒', description: 'Cybersecurity: Projekte, GitHub, Portfolio, Zertifizierungsvorbereitung.' },
  { time: '15:00–15:30', label: 'Asr Gebet', type: 'prayer', icon: '🕌', description: 'Asr Sunnah + Fard.' },
  { time: '15:30–17:00', label: 'Leichte Arbeit + Videos', type: 'study', icon: '📝', description: 'Ibn Yakub Videos, Glossar pflegen, News lesen, Dokumentation.' },
  { time: '17:00–18:00', label: 'Quran — ½ Juz + Dua', type: 'quran', icon: '📖', description: 'Zweite Hälfte des Tages-Juz. Letzte Stunde vor Iftar = beste Dua-Zeit!' },
  { time: '~18:00', label: 'Iftar + Maghrib', type: 'meal', icon: '🌙', description: 'Datteln + Wasser → Maghrib Gebet → Hauptmahlzeit. Protein-Fokus!' },
  { time: '18:30–19:30', label: 'Essen + Verdauung', type: 'rest', icon: '☕', description: 'In Ruhe essen. Mind. 80g Protein bei Iftar.' },
  { time: '19:30–20:00', label: 'Isha Gebet', type: 'prayer', icon: '🕌', description: 'Isha Fard vorbereiten für Tarawih.' },
  { time: '20:00–21:30', label: 'Tarawih', type: 'prayer', icon: '🕌', description: 'Tarawih in der Assalam Moschee Düsseldorf. 20 Rakaat.' },
  { time: '21:45–23:00', label: 'Gym (jeden 2. Tag)', type: 'gym', icon: '💪', description: 'Push/Pull/Legs Split mit Arm-Fokus. 10-15 Min Incline Walk danach.' },
  { time: '21:45–22:30', label: 'Ibadah (Nicht-Gym)', type: 'ibadah', icon: '📿', description: 'kalifat.com, Ibn Yakub, Arabisch üben. Nur an Nicht-Gym-Tagen.' },
  { time: '23:00–00:00', label: 'Entspannung + Schlafen', type: 'rest', icon: '🛏️', description: 'Leichte Lektüre, Witr Gebet, dann schlafen um 00:00.' },
];

// ---------- gym plan ----------

interface GymDay {
  id: string;
  name: string;
  focus: string;
  exercises: { name: string; sets: string; notes?: string }[];
}

const GYM_SPLITS: GymDay[] = [
  {
    id: 'push',
    name: 'Tag A — PUSH',
    focus: 'Brust + Schultern + Trizeps',
    exercises: [
      { name: 'Bench Press', sets: '4×10', notes: 'Controlled tempo' },
      { name: 'Overhead Press', sets: '3×12' },
      { name: 'Incline Dumbbell Press', sets: '3×12' },
      { name: 'Cable Flyes', sets: '3×15' },
      { name: 'Tricep Pushdowns', sets: '4×15', notes: 'Arm-Fokus!' },
      { name: 'Skull Crushers', sets: '3×12', notes: 'Arm-Fokus!' },
      { name: 'Overhead Tricep Extension', sets: '3×15', notes: 'Arm-Fokus!' },
      { name: 'Incline Walk', sets: '10-15 Min', notes: 'Fettverbrennung' },
    ],
  },
  {
    id: 'pull',
    name: 'Tag B — PULL',
    focus: 'Rücken + Bizeps',
    exercises: [
      { name: 'Pull-Ups', sets: '4×8-10', notes: 'Weighted wenn möglich' },
      { name: 'Barbell Rows', sets: '4×10' },
      { name: 'Cable Rows', sets: '3×12' },
      { name: 'Face Pulls', sets: '3×15' },
      { name: 'Barbell Curls', sets: '4×12', notes: 'Arm-Fokus!' },
      { name: 'Hammer Curls', sets: '3×12', notes: 'Arm-Fokus!' },
      { name: 'Incline Dumbbell Curls', sets: '3×15', notes: 'Arm-Fokus!' },
      { name: 'Incline Walk', sets: '10-15 Min', notes: 'Fettverbrennung' },
    ],
  },
  {
    id: 'legs',
    name: 'Tag C — LEGS + CORE',
    focus: 'Beine + Core + Cardio',
    exercises: [
      { name: 'Squats', sets: '4×10' },
      { name: 'Romanian Deadlift', sets: '3×12' },
      { name: 'Leg Press', sets: '3×12' },
      { name: 'Walking Lunges', sets: '3×12 each' },
      { name: 'Calf Raises', sets: '4×15' },
      { name: 'Hanging Leg Raises', sets: '3×12' },
      { name: 'Plank', sets: '3×45s' },
      { name: 'Incline Walk', sets: '15 Min', notes: 'Fettverbrennung' },
    ],
  },
];

// ---------- quran juz list ----------

const JUZ_NAMES: string[] = [
  'Alif-Lam-Mim', 'Sayaqul', 'Tilkar-Rusul', 'Lan Tanaloo', 'Wal-Muhsanat',
  'La Yuhibbu', 'Wa Idha Sami\'u', 'Wa Lau Annana', 'Qalal-Mala', 'Wa A\'lamu',
  'Ya\'tadhiruna', 'Wa Ma Min Dabbah', 'Wa Ma Ubarri\'u', 'Rubama', 'Subhanal-Ladhi',
  'Qal Alam', 'Iqtarab', 'Qad Aflaha', 'Wa Qalal-Ladhina', 'Amman Khalaqa',
  'Utlu Ma Uhiya', 'Wa Man Yaqnut', 'Wa Mali', 'Faman Azlamu', 'Ilaihi Yuraddu',
  'Ha-Mim', 'Qala Fama Khatbukum', 'Qad Sami\'a', 'Tabarakal-Ladhi', 'Amma',
];

// ---------- localStorage helpers ----------

const LS_KEY_QURAN = 'ramadan-quran-progress';
const LS_KEY_GYM   = 'ramadan-gym-log';
const LS_KEY_CHECKLIST = 'ramadan-daily-checklist';

interface QuranProgress {
  completedJuz: number[];
}

interface GymLog {
  [date: string]: string; // date → split id
}

interface DailyChecklist {
  [date: string]: string[]; // date → completed item ids
}

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function saveJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ---------- checklist items ----------

const DAILY_CHECKLIST_ITEMS = [
  { id: 'fajr', label: 'Fajr Gebet', icon: '🕌' },
  { id: 'quran-morning', label: 'Quran ½ Juz (Morgens)', icon: '📖' },
  { id: 'deep-work-1', label: 'Deep Work Block 1 (Cyber)', icon: '💻' },
  { id: 'deep-work-2', label: 'Deep Work Block 2 (Uni)', icon: '📚' },
  { id: 'arabisch', label: 'Arabisch / kalifat.com', icon: '🕋' },
  { id: 'dhuhr', label: 'Dhuhr Gebet', icon: '🕌' },
  { id: 'deep-work-3', label: 'Deep Work Block 3 (Projekte)', icon: '🔒' },
  { id: 'asr', label: 'Asr Gebet', icon: '🕌' },
  { id: 'quran-evening', label: 'Quran ½ Juz (Abends)', icon: '📖' },
  { id: 'maghrib', label: 'Maghrib / Iftar', icon: '🌙' },
  { id: 'isha', label: 'Isha Gebet', icon: '🕌' },
  { id: 'tarawih', label: 'Tarawih (Assalam Moschee)', icon: '🕌' },
  { id: 'witr', label: 'Witr Gebet', icon: '🤲' },
];

// ================================================================
//  COMPONENTS
// ================================================================

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function getRamadanDay(): number {
  const now = new Date();
  const diff = Math.floor((now.getTime() - RAMADAN_START.getTime()) / 86400000);
  if (diff < 0) return 0;
  if (diff >= TOTAL_DAYS) return TOTAL_DAYS + 1;
  return diff + 1;
}

function getDaysUntilRamadan(): number {
  const now = new Date();
  const diff = Math.ceil((RAMADAN_START.getTime() - now.getTime()) / 86400000);
  return Math.max(0, diff);
}

// ----- Hero -----

function RamadanHero() {
  const ramadanDay = getRamadanDay();
  const daysUntil = getDaysUntilRamadan();
  const isActive = ramadanDay >= 1 && ramadanDay <= TOTAL_DAYS;
  const isOver = ramadanDay > TOTAL_DAYS;

  const todayPrayer = isActive ? PRAYER_TIMES[ramadanDay - 1] : PRAYER_TIMES[0];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/80 via-emerald-800/60 to-teal-900/80 border border-emerald-700/30 p-6 md:p-8">
      <div className="absolute top-4 right-4 opacity-10">
        <Moon size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <Moon className="text-emerald-400" size={28} />
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
            Ramadan 2026
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black mb-1">
          {isOver ? 'Ramadan Mubarak!' : isActive ? `Tag ${ramadanDay} von ${TOTAL_DAYS}` : 'Ramadan Countdown'}
        </h1>
        <p className="text-text-muted text-sm mb-4">
          {isOver
            ? 'Ramadan 2026 ist abgeschlossen. Möge Allah deine Ibadah annehmen.'
            : isActive
              ? `${TOTAL_DAYS - ramadanDay} Tage verbleibend — Düsseldorf / Assalam Moschee`
              : `Noch ${daysUntil} Tage bis Ramadan beginnt — 18. Februar 2026`}
        </p>

        {/* Progress bar */}
        {isActive && (
          <div className="mb-4">
            <div className="h-2 rounded-full bg-emerald-950/50 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${(ramadanDay / TOTAL_DAYS) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>18. Feb</span>
              <span>{Math.round((ramadanDay / TOTAL_DAYS) * 100)}%</span>
              <span>19. Mär</span>
            </div>
          </div>
        )}

        {/* Today's prayer times */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[
            { label: 'Fajr', time: todayPrayer.fajr, icon: <Sunrise size={14} /> },
            { label: 'Sunrise', time: todayPrayer.sunrise, icon: <Sun size={14} /> },
            { label: 'Dhuhr', time: todayPrayer.dhuhr, icon: <Sun size={14} /> },
            { label: 'Asr', time: todayPrayer.asr, icon: <Sun size={14} /> },
            { label: 'Maghrib', time: todayPrayer.maghrib, icon: <Sunset size={14} /> },
            { label: 'Isha', time: todayPrayer.isha, icon: <Moon size={14} /> },
          ].map((p) => (
            <div key={p.label} className="bg-emerald-950/40 rounded-lg p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-400 mb-0.5">
                {p.icon}
                <span className="text-[10px] uppercase">{p.label}</span>
              </div>
              <span className="text-sm font-bold">{p.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----- Stats Row -----

function StatsRow({ quranProgress, gymLog }: { quranProgress: QuranProgress; gymLog: GymLog }) {
  const ramadanDay = getRamadanDay();
  const juzDone = quranProgress.completedJuz.length;
  const gymDays = Object.keys(gymLog).length;
  const isActive = ramadanDay >= 1 && ramadanDay <= TOTAL_DAYS;

  const stats = [
    { label: 'Quran', value: `${juzDone}/${TOTAL_JUZ}`, sub: 'Juz gelesen', icon: <BookOpen size={18} className="text-emerald-400" />, pct: (juzDone / TOTAL_JUZ) * 100 },
    { label: 'Gym', value: `${gymDays}`, sub: 'Trainings', icon: <Dumbbell size={18} className="text-blue-400" />, pct: Math.min(100, (gymDays / 15) * 100) },
    { label: 'Tag', value: isActive ? `${ramadanDay}` : '—', sub: `von ${TOTAL_DAYS}`, icon: <CalendarDays size={18} className="text-amber-400" />, pct: isActive ? (ramadanDay / TOTAL_DAYS) * 100 : 0 },
    { label: 'Fasten', value: isActive ? `${Math.round((ramadanDay / TOTAL_DAYS) * 100)}%` : '—', sub: 'abgeschlossen', icon: <Moon size={18} className="text-purple-400" />, pct: isActive ? (ramadanDay / TOTAL_DAYS) * 100 : 0 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="bg-bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            {s.icon}
            <span className="text-xs text-text-muted uppercase tracking-wider">{s.label}</span>
          </div>
          <div className="text-2xl font-black">{s.value}</div>
          <div className="text-xs text-text-muted">{s.sub}</div>
          <div className="mt-2 h-1.5 rounded-full bg-bg-hover overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${s.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ----- Daily Schedule -----

function DailyScheduleSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const typeColors: Record<string, string> = {
    prayer: 'border-l-emerald-500 bg-emerald-500/5',
    study: 'border-l-blue-500 bg-blue-500/5',
    quran: 'border-l-amber-500 bg-amber-500/5',
    gym: 'border-l-red-500 bg-red-500/5',
    rest: 'border-l-purple-500 bg-purple-500/5',
    ibadah: 'border-l-teal-500 bg-teal-500/5',
    meal: 'border-l-orange-500 bg-orange-500/5',
  };

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={20} className="text-emerald-400" />
        <h2 className="text-lg font-bold">Tagesplan</h2>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { type: 'prayer', label: 'Gebet' },
          { type: 'study', label: 'Studium' },
          { type: 'quran', label: 'Quran' },
          { type: 'ibadah', label: 'Ibadah' },
          { type: 'gym', label: 'Gym' },
          { type: 'meal', label: 'Mahlzeit' },
          { type: 'rest', label: 'Pause' },
        ].map((l) => (
          <span key={l.type} className={cn('text-[10px] px-2 py-0.5 rounded-full border', typeColors[l.type])}>
            {l.label}
          </span>
        ))}
      </div>

      <div className="space-y-1">
        {DAILY_SCHEDULE.map((block, i) => {
          const key = `${i}-${block.label}`;
          const isOpen = expanded === key;
          return (
            <button
              key={key}
              onClick={() => setExpanded(isOpen ? null : key)}
              className={cn(
                'w-full text-left border-l-4 rounded-lg px-3 py-2 transition-all',
                typeColors[block.type],
                isOpen && 'ring-1 ring-emerald-500/30'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm shrink-0">{block.icon}</span>
                  <span className="text-xs text-text-muted shrink-0 w-24">{block.time}</span>
                  <span className="text-sm font-medium truncate">{block.label}</span>
                </div>
                {isOpen ? <ChevronUp size={14} className="text-text-muted shrink-0" /> : <ChevronDown size={14} className="text-text-muted shrink-0" />}
              </div>
              {isOpen && (
                <p className="text-xs text-text-muted mt-2 ml-6 leading-relaxed">{block.description}</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ----- Quran Tracker -----

function QuranTracker({ progress, setProgress }: {
  progress: QuranProgress;
  setProgress: (p: QuranProgress) => void;
}) {
  const toggleJuz = (juz: number) => {
    const completed = progress.completedJuz.includes(juz)
      ? progress.completedJuz.filter((j) => j !== juz)
      : [...progress.completedJuz, juz];
    const next = { completedJuz: completed };
    setProgress(next);
    saveJson(LS_KEY_QURAN, next);
  };

  const resetAll = () => {
    const next: QuranProgress = { completedJuz: [] };
    setProgress(next);
    saveJson(LS_KEY_QURAN, next);
  };

  const done = progress.completedJuz.length;

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-amber-400" />
          <h2 className="text-lg font-bold">Quran Tracker</h2>
          <span className="text-xs text-text-muted">({done}/{TOTAL_JUZ} Juz)</span>
        </div>
        <button onClick={resetAll} className="text-xs text-text-muted hover:text-red-400 transition-colors flex items-center gap-1">
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      <div className="mb-3 h-2 rounded-full bg-bg-hover overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
          style={{ width: `${(done / TOTAL_JUZ) * 100}%` }}
        />
      </div>
      <p className="text-xs text-text-muted mb-4">
        {done === TOTAL_JUZ ? 'Alhamdulillah! Du hast den Quran komplett durchgelesen!' : `Noch ${TOTAL_JUZ - done} Juz verbleibend`}
      </p>

      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {JUZ_NAMES.map((name, i) => {
          const juz = i + 1;
          const isDone = progress.completedJuz.includes(juz);
          return (
            <button
              key={juz}
              onClick={() => toggleJuz(juz)}
              title={`Juz ${juz}: ${name}`}
              className={cn(
                'relative aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-bold transition-all border',
                isDone
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                  : 'bg-bg-hover border-border text-text-muted hover:border-amber-500/30'
              )}
            >
              {isDone && <Check size={12} className="absolute top-0.5 right-0.5 text-amber-400" />}
              <span>{juz}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-5 md:grid-cols-10 gap-1">
        {JUZ_NAMES.map((name, i) => (
          <span key={i} className="text-[8px] text-text-muted text-center truncate">{name}</span>
        ))}
      </div>
    </div>
  );
}

// ----- Gym Tracker -----

function GymTracker({ gymLog, setGymLog }: {
  gymLog: GymLog;
  setGymLog: (g: GymLog) => void;
}) {
  const today = getToday();
  const [expandedSplit, setExpandedSplit] = useState<string | null>(null);

  const logWorkout = (splitId: string) => {
    const next = { ...gymLog, [today]: splitId };
    setGymLog(next);
    saveJson(LS_KEY_GYM, next);
  };

  const removeWorkout = () => {
    const next = { ...gymLog };
    delete next[today];
    setGymLog(next);
    saveJson(LS_KEY_GYM, next);
  };

  const todaySplit = gymLog[today];

  // Generate calendar for Ramadan
  const ramadanDays: { date: string; day: number; split?: string }[] = [];
  for (let i = 0; i < TOTAL_DAYS; i++) {
    const d = new Date(RAMADAN_START);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    ramadanDays.push({ date: dateStr, day: i + 1, split: gymLog[dateStr] });
  }

  const splitColors: Record<string, string> = {
    push: 'bg-red-500/20 border-red-500/40 text-red-400',
    pull: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
    legs: 'bg-green-500/20 border-green-500/40 text-green-400',
  };

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Dumbbell size={20} className="text-red-400" />
        <h2 className="text-lg font-bold">Gym Tracker</h2>
        <span className="text-xs text-text-muted">(jeden 2. Tag — Arms-Fokus)</span>
      </div>

      {/* Today's workout */}
      <div className="mb-4 p-3 rounded-lg bg-bg-hover border border-border">
        <p className="text-xs text-text-muted mb-2">Heute ({today}):</p>
        {todaySplit ? (
          <div className="flex items-center gap-2">
            <span className={cn('px-2 py-1 rounded text-xs font-bold border', splitColors[todaySplit])}>
              {todaySplit.toUpperCase()}
            </span>
            <span className="text-sm text-emerald-400">Training eingetragen!</span>
            <button onClick={removeWorkout} className="ml-auto text-xs text-text-muted hover:text-red-400">Entfernen</button>
          </div>
        ) : (
          <div className="flex gap-2">
            {GYM_SPLITS.map((s) => (
              <button
                key={s.id}
                onClick={() => logWorkout(s.id)}
                className={cn('px-3 py-1.5 rounded-lg text-xs font-bold border transition-all hover:scale-105', splitColors[s.id])}
              >
                {s.id.toUpperCase()}
              </button>
            ))}
            <span className="text-xs text-text-muted self-center ml-2">← Klicke um heutiges Training zu loggen</span>
          </div>
        )}
      </div>

      {/* Gym calendar */}
      <div className="grid grid-cols-10 md:grid-cols-15 gap-1 mb-4">
        {ramadanDays.map((d) => (
          <div
            key={d.date}
            title={`Tag ${d.day}: ${d.split ? d.split.toUpperCase() : 'Kein Training'}`}
            className={cn(
              'aspect-square rounded flex items-center justify-center text-[10px] font-bold',
              d.split ? splitColors[d.split] : 'bg-bg-hover text-text-muted',
              d.date === today && 'ring-1 ring-emerald-400'
            )}
          >
            {d.day}
          </div>
        ))}
      </div>

      {/* Split details */}
      <div className="space-y-2">
        {GYM_SPLITS.map((split) => (
          <div key={split.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedSplit(expandedSplit === split.id ? null : split.id)}
              className="w-full flex items-center justify-between p-3 hover:bg-bg-hover transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={cn('px-2 py-0.5 rounded text-xs font-bold border', splitColors[split.id])}>
                  {split.id.toUpperCase()}
                </span>
                <span className="text-sm font-medium">{split.name}</span>
                <span className="text-xs text-text-muted">— {split.focus}</span>
              </div>
              {expandedSplit === split.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {expandedSplit === split.id && (
              <div className="px-3 pb-3 space-y-1">
                {split.exercises.map((ex, i) => (
                  <div key={i} className="flex items-center justify-between text-sm py-1 border-b border-border/50 last:border-0">
                    <span>{ex.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-muted">{ex.sets}</span>
                      {ex.notes && <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400">{ex.notes}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ----- Daily Checklist -----

function DailyChecklistSection({ checklist, setChecklist }: {
  checklist: DailyChecklist;
  setChecklist: (c: DailyChecklist) => void;
}) {
  const today = getToday();
  const todayItems = checklist[today] || [];

  const toggle = (id: string) => {
    const current = checklist[today] || [];
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    const updated = { ...checklist, [today]: next };
    setChecklist(updated);
    saveJson(LS_KEY_CHECKLIST, updated);
  };

  const done = todayItems.length;
  const total = DAILY_CHECKLIST_ITEMS.length;

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Check size={20} className="text-emerald-400" />
          <h2 className="text-lg font-bold">Tages-Checklist</h2>
          <span className="text-xs text-text-muted">({done}/{total})</span>
        </div>
        {done === total && (
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
            <Trophy size={14} /> Perfekter Tag!
          </span>
        )}
      </div>

      <div className="mb-3 h-2 rounded-full bg-bg-hover overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all"
          style={{ width: `${(done / total) * 100}%` }}
        />
      </div>

      <div className="space-y-1">
        {DAILY_CHECKLIST_ITEMS.map((item) => {
          const isDone = todayItems.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left',
                isDone ? 'bg-emerald-500/10 line-through text-text-muted' : 'bg-bg-hover hover:bg-bg-hover/80'
              )}
            >
              <div className={cn(
                'w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all',
                isDone ? 'border-emerald-500 bg-emerald-500' : 'border-border'
              )}>
                {isDone && <Check size={12} className="text-white" />}
              </div>
              <span className="text-sm">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ----- Prayer Times Calendar -----

function PrayerTimesTable() {
  const [showAll, setShowAll] = useState(false);
  const today = getToday();
  const visible = showAll ? PRAYER_TIMES : PRAYER_TIMES.slice(0, 7);

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Moon size={20} className="text-emerald-400" />
          <h2 className="text-lg font-bold">Gebetszeiten — Düsseldorf</h2>
        </div>
        <button onClick={() => setShowAll(!showAll)} className="text-xs text-emerald-400 hover:underline">
          {showAll ? 'Weniger anzeigen' : `Alle ${TOTAL_DAYS} Tage`}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-text-muted border-b border-border">
              <th className="text-left py-2 pr-2">Tag</th>
              <th className="text-left py-2 px-2">Datum</th>
              <th className="text-center py-2 px-2">Fajr</th>
              <th className="text-center py-2 px-2">Sunrise</th>
              <th className="text-center py-2 px-2">Dhuhr</th>
              <th className="text-center py-2 px-2">Asr</th>
              <th className="text-center py-2 px-2">Maghrib</th>
              <th className="text-center py-2 px-2">Isha</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr
                key={p.day}
                className={cn(
                  'border-b border-border/50',
                  p.date === today && 'bg-emerald-500/10 font-bold'
                )}
              >
                <td className="py-1.5 pr-2 font-bold">{p.day}</td>
                <td className="py-1.5 px-2 text-text-muted">{p.date.slice(5)}</td>
                <td className="py-1.5 px-2 text-center">{p.fajr}</td>
                <td className="py-1.5 px-2 text-center text-text-muted">{p.sunrise}</td>
                <td className="py-1.5 px-2 text-center">{p.dhuhr}</td>
                <td className="py-1.5 px-2 text-center">{p.asr}</td>
                <td className="py-1.5 px-2 text-center font-bold text-amber-400">{p.maghrib}</td>
                <td className="py-1.5 px-2 text-center">{p.isha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----- Nutrition Tips -----

function NutritionSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Coffee size={20} className="text-orange-400" />
        <h2 className="text-lg font-bold">Ernährung + Lean werden</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-lg bg-orange-500/5 border border-orange-500/20 p-4">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
            <Sunrise size={16} className="text-orange-400" /> Suhoor (~05:00)
          </h3>
          <ul className="text-xs space-y-1 text-text-muted">
            <li>4 Eier (scrambled oder gekocht) — 24g Protein</li>
            <li>Haferflocken mit Milch — langsame Energie</li>
            <li>Banane + Datteln — Kalium + natürlicher Zucker</li>
            <li>500ml+ Wasser — Hydration ist key!</li>
            <li>Optional: Whey Shake — extra 25g Protein</li>
          </ul>
          <p className="text-[10px] text-orange-400 mt-2 font-bold">Ziel: ~50g Protein + komplexe Carbs + Hydration</p>
        </div>

        <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-4">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
            <Sunset size={16} className="text-amber-400" /> Iftar (~18:00+)
          </h3>
          <ul className="text-xs space-y-1 text-text-muted">
            <li>3 Datteln + Wasser zum Brechen</li>
            <li>Maghrib Gebet (Pause für Magen)</li>
            <li>Hähnchen/Fisch + Reis — 40-50g Protein</li>
            <li>Salat + Gemüse — Mikronährstoffe</li>
            <li>Vor dem Gym: noch ein Snack (Joghurt, Nüsse)</li>
            <li>Nach dem Gym: Whey Shake — 25g Protein</li>
          </ul>
          <p className="text-[10px] text-amber-400 mt-2 font-bold">Ziel: 80-100g Protein + ausgewogene Mahlzeit</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-4">
        <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
          <Flame size={16} className="text-emerald-400" /> Warum du an Ramadan leaner wirst
        </h3>
        <ul className="text-xs space-y-1 text-text-muted">
          <li><strong>Natürliches Kaloriendefizit:</strong> 2 Mahlzeiten statt 3-4 = weniger Kalorien automatisch</li>
          <li><strong>Intermittent Fasting:</strong> ~14-16h Fastenperiode → erhöhte Fettverbrennung</li>
          <li><strong>Protein-Fokus:</strong> Mind. 120g/Tag verteilt auf Suhoor + Iftar → Muskelerhalt</li>
          <li><strong>Incline Walking:</strong> 10-15 Min nach jedem Gym → extra Kalorienverbrennung</li>
          <li><strong>Kein Snacking:</strong> Keine Versuchungen tagsüber = saubere Ernährung</li>
        </ul>
      </div>
    </div>
  );
}

// ----- Motivation Quote -----

function MotivationBanner() {
  const quotes = [
    { text: 'Ramadan ist nicht nur Verzicht — es ist die ultimative Disziplin-Challenge.', source: 'Mindset' },
    { text: '30 Tage Fasten + Deep Work + Gym = du kommst als anderer Mensch raus.', source: 'Ziel' },
    { text: 'Während andere schlafen und essen, baust du dein Imperium.', source: 'Motivation' },
    { text: 'Jeder Juz ist ein Level-Up für deine Seele. Jede Session ein Level-Up für dein Skill.', source: 'Balance' },
  ];

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((prev) => (prev + 1) % quotes.length), 8000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <div className="rounded-xl bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-700/20 p-4 flex items-center gap-3">
      <Star className="text-amber-400 shrink-0" size={20} />
      <div>
        <p className="text-sm font-medium italic">&ldquo;{quotes[idx].text}&rdquo;</p>
        <p className="text-[10px] text-text-muted mt-0.5">{quotes[idx].source}</p>
      </div>
      <Heart className="text-red-400 shrink-0 ml-auto" size={16} />
    </div>
  );
}

// ----- Weekly Overview -----

function WeeklyOverview() {
  const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const rows = [
    { label: 'Bibliothek', data: ['BIB', 'BIB', 'BIB', '—', '—', 'BIB', '—'], highlight: [0, 1, 2, 5] },
    { label: 'Gym', data: ['—', 'GYM', '—', 'GYM', '—', 'GYM', '—'], highlight: [1, 3, 5] },
    { label: 'Moschee', data: ['F+T', 'T', 'F+T', 'T', 'Jummah!', 'T', 'T'], highlight: [4] },
  ];

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays size={20} className="text-purple-400" />
        <h2 className="text-lg font-bold">Wochen-Rhythmus</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-3 text-text-muted w-24" />
              {weekDays.map((d) => (
                <th key={d} className="text-center py-2 px-2 font-bold">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-border/50">
                <td className="py-2 pr-3 font-medium text-text-muted">{row.label}</td>
                {row.data.map((cell, i) => (
                  <td
                    key={i}
                    className={cn(
                      'text-center py-2 px-2',
                      row.highlight.includes(i) && 'text-emerald-400 font-bold'
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-text-muted">
        <span>F = Fajr in Moschee</span>
        <span>T = Tarawih</span>
        <span>BIB = Bibliothek (Deep Work)</span>
        <span className="text-amber-400">Freitag = Jummah + leichterer Tag</span>
      </div>
    </div>
  );
}

// ----- Sleep Schedule -----

function SleepSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Moon size={20} className="text-indigo-400" />
        <h2 className="text-lg font-bold">Schlaf-Optimierung</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="rounded-lg bg-indigo-500/5 border border-indigo-500/20 p-3 text-center">
          <div className="text-2xl font-black text-indigo-400">5h</div>
          <div className="text-xs text-text-muted">Kernschlaf</div>
          <div className="text-[10px] text-text-muted mt-1">00:00 – 05:00</div>
        </div>
        <div className="rounded-lg bg-purple-500/5 border border-purple-500/20 p-3 text-center">
          <div className="text-2xl font-black text-purple-400">30m</div>
          <div className="text-xs text-text-muted">Power Nap</div>
          <div className="text-[10px] text-text-muted mt-1">12:30 – 13:00</div>
        </div>
        <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3 text-center">
          <div className="text-2xl font-black text-emerald-400">5.5h</div>
          <div className="text-xs text-text-muted">Gesamt/Tag</div>
          <div className="text-[10px] text-text-muted mt-1">Machbar für 30 Tage</div>
        </div>
      </div>

      <div className="mt-4 text-xs text-text-muted space-y-1">
        <p><strong>Tipps:</strong></p>
        <ul className="list-disc list-inside space-y-0.5">
          <li>Wecker auf 04:50 (10 Min vor Suhoor) — kein Snooze!</li>
          <li>Power Nap nach Dhuhr ist PFLICHT bei 5h Nachtschlaf</li>
          <li>Kein Koffein nach Iftar — stört den kurzen Schlaf</li>
          <li>Schlafmaske + Ohrstöpsel für maximale Schlafqualität</li>
          <li>Am Wochenende 30-60 Min extra Schlaf erlaubt</li>
        </ul>
      </div>
    </div>
  );
}

// ================================================================
//  MAIN VIEW
// ================================================================

export function RamadanView() {
  const [quranProgress, setQuranProgress] = useState<QuranProgress>(() =>
    loadJson(LS_KEY_QURAN, { completedJuz: [] })
  );
  const [gymLog, setGymLog] = useState<GymLog>(() =>
    loadJson(LS_KEY_GYM, {})
  );
  const [checklist, setChecklist] = useState<DailyChecklist>(() =>
    loadJson(LS_KEY_CHECKLIST, {})
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
      {/* Hero */}
      <RamadanHero />

      {/* Motivation */}
      <MotivationBanner />

      {/* Stats */}
      <StatsRow quranProgress={quranProgress} gymLog={gymLog} />

      {/* Daily Checklist */}
      <DailyChecklistSection checklist={checklist} setChecklist={setChecklist} />

      {/* Daily Schedule */}
      <DailyScheduleSection />

      {/* Quran Tracker */}
      <QuranTracker progress={quranProgress} setProgress={setQuranProgress} />

      {/* Gym Tracker */}
      <GymTracker gymLog={gymLog} setGymLog={setGymLog} />

      {/* Weekly Overview */}
      <WeeklyOverview />

      {/* Prayer Times */}
      <PrayerTimesTable />

      {/* Nutrition */}
      <NutritionSection />

      {/* Sleep */}
      <SleepSection />

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:bg-emerald-500 transition-colors"
      >
        <ChevronUp size={20} />
      </button>
    </div>
  );
}
