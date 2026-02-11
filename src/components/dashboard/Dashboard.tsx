import { useMemo } from 'react';
import {
  Target, Flame, Zap, BookOpen, Award, TrendingUp,
  ChevronRight, Calendar,
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { useProgressStore } from '@/stores/progress-store.ts';
import { useSettingsStore } from '@/stores/settings-store.ts';
import { useAppStore } from '@/stores/app-store.ts';
import { getLevelInfo } from '@/lib/xp-engine.ts';
import { getCurrentMonthIndex, getDateString } from '@/lib/scheduler.ts';
import { formatXp, percentage, getPhaseColor } from '@/lib/utils.ts';
import { ProgressBar } from '@/components/shared/ProgressBar.tsx';
import { Card } from '@/components/shared/Card.tsx';
import curriculum from '@/data/curriculum.json';
import { PHASE_DEFINITIONS, SKILL_CATEGORIES } from '@/types/index.ts';

export function Dashboard() {
  const { totalXp, currentStreak, longestStreak, completedTaskIds, dailyLogs } = useProgressStore();
  const { startDate } = useSettingsStore();
  const { setActiveView } = useAppStore();
  const levelInfo = getLevelInfo(totalXp);
  const currentMonth = getCurrentMonthIndex(startDate);

  // Calculate total trackable items
  const totalGoals = curriculum.months.reduce((s, m) => s + m.goals.length, 0);
  const totalKPIs = curriculum.months.reduce((s, m) => s + m.kpis.length, 0);
  const totalItems = totalGoals + totalKPIs;
  const completedCount = completedTaskIds.size;

  // Current phase
  const currentPhase = PHASE_DEFINITIONS.find(p =>
    p.months.includes(currentMonth)
  ) || PHASE_DEFINITIONS[0];

  // XP chart data (last 14 days)
  const xpChartData = useMemo(() => {
    const data: { date: string; xp: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = getDateString(d);
      const log = dailyLogs.find(l => l.date === dateStr);
      data.push({
        date: d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }),
        xp: log?.xpEarned ?? 0,
      });
    }
    return data;
  }, [dailyLogs]);

  // Skill radar data
  const skillData = SKILL_CATEGORIES.map(skill => {
    const monthSkillMap: Record<string, number[]> = {
      'OSINT': [1, 2, 3, 6, 25, 26],
      'Pentest': [7, 8, 9, 13, 14, 15],
      'Forensik': [3, 4, 5],
      'Kryptographie': [5],
      'Reverse Engineering': [10, 11, 19, 20, 21],
      'Social Engineering': [8],
      'Netzwerk': [1, 2, 17],
      'Programmierung': [1, 2, 3, 10],
      'Mobile Security': [16],
      'Intelligence': [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    };
    const relevantMonths = monthSkillMap[skill] || [];
    const relevantGoals = curriculum.months
      .filter(m => relevantMonths.includes(m.id))
      .flatMap(m => m.goals);
    const completed = relevantGoals.filter(g => completedTaskIds.has(g.id)).length;
    const total = relevantGoals.length || 1;
    return { skill, value: Math.round((completed / total) * 100) };
  });

  // Phase progress
  const phaseProgress = PHASE_DEFINITIONS.map(phase => {
    const phaseGoals = curriculum.months
      .filter(m => phase.months.includes(m.id))
      .flatMap(m => m.goals);
    const completed = phaseGoals.filter(g => completedTaskIds.has(g.id)).length;
    return { ...phase, completed, total: phaseGoals.length };
  });

  // Next certifications
  const nextCerts = curriculum.certifications
    .filter(c => c.month >= currentMonth)
    .slice(0, 3);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-accent" />
            <span className="text-xs text-text-muted">Fortschritt</span>
          </div>
          <div className="text-2xl font-bold">{percentage(completedCount, totalItems)}%</div>
          <ProgressBar value={completedCount} max={totalItems} size="sm" className="mt-2" />
          <div className="text-xs text-text-muted mt-1">{completedCount} / {totalItems}</div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-xp" />
            <span className="text-xs text-text-muted">Level</span>
          </div>
          <div className="text-2xl font-bold text-xp">{levelInfo.level}</div>
          <ProgressBar value={levelInfo.xpRequired} max={levelInfo.xpForNext} color="var(--color-xp)" size="sm" className="mt-2" />
          <div className="text-xs text-text-muted mt-1">{formatXp(totalXp)} XP total</div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-2">
            <Flame size={16} className="text-streak" />
            <span className="text-xs text-text-muted">Streak</span>
          </div>
          <div className="text-2xl font-bold text-streak">{currentStreak}d</div>
          <div className="text-xs text-text-muted mt-2">Longest: {longestStreak}d</div>
          {currentStreak >= 7 && (
            <div className="text-xs text-streak mt-1">
              {currentStreak >= 30 ? '2.0x' : currentStreak >= 14 ? '1.5x' : '1.25x'} XP
            </div>
          )}
        </Card>

        <Card onClick={() => setActiveView('curriculum')} hover>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={16} style={{ color: currentPhase.color }} />
            <span className="text-xs text-text-muted">Phase</span>
          </div>
          <div className="text-lg font-bold" style={{ color: currentPhase.color }}>
            {currentPhase.name}
          </div>
          <div className="text-xs text-text-muted mt-1">Monat {currentMonth} / 36</div>
          <ProgressBar value={currentMonth} max={36} color={currentPhase.color} size="sm" className="mt-2" />
        </Card>
      </div>

      {/* Middle Row: XP Chart + Skill Radar */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-xp" />
            XP-Verlauf (14 Tage)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={xpChartData}>
              <defs>
                <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-xp)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--color-xp)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: 'var(--color-text)' }}
              />
              <Area type="monotone" dataKey="xp" stroke="var(--color-xp)" fill="url(#xpGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Target size={16} className="text-accent" />
            Skill-Radar
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={skillData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--color-text-muted)', fontSize: 9 }} />
              <Radar dataKey="value" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Phase Progress */}
      <Card>
        <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
          <Award size={16} className="text-accent" />
          Phasen-Fortschritt
        </h3>
        <div className="space-y-3">
          {phaseProgress.map((phase) => (
            <div key={phase.id} className="flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: phase.color }}
              />
              <div className="w-28 text-xs font-medium truncate">{phase.name}</div>
              <div className="flex-1">
                <ProgressBar
                  value={phase.completed}
                  max={phase.total}
                  color={phase.color}
                  size="sm"
                />
              </div>
              <div className="text-xs text-text-muted w-16 text-right">
                {phase.completed}/{phase.total}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Certifications */}
      {nextCerts.length > 0 && (
        <Card>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Calendar size={16} className="text-warning" />
            Nächste Zertifizierungen
          </h3>
          <div className="space-y-2">
            {nextCerts.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between p-2 rounded-lg bg-bg-hover/50">
                <div>
                  <div className="text-sm font-medium">{cert.name}</div>
                  <div className="text-xs text-text-muted">{cert.cost}</div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-text-muted">Monat {cert.month}</span>
                  <ChevronRight size={14} className="text-text-muted" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
