import { useMemo, useState } from 'react';
import {
  CheckCircle2, Circle, Flame, ArrowRight, AlertTriangle, RotateCcw,
  BookOpen, Search, Newspaper, Swords, Coffee,
  Dumbbell, Moon, Briefcase, Code, Monitor, Brain,
} from 'lucide-react';
import { useProgressStore } from '@/stores/progress-store.ts';
import { useSettingsStore } from '@/stores/settings-store.ts';
import { useScheduleStore } from '@/stores/schedule-store.ts';
import { getCurrentMonthIndex, getCurrentWeekInMonth, daysBetween } from '@/lib/scheduler.ts';
import { getStreakMultiplier, getXpForTaskType } from '@/lib/xp-engine.ts';
import { cn, getToday } from '@/lib/utils.ts';
import { Card } from '@/components/shared/Card.tsx';
import { XpBadge } from '@/components/shared/XpBadge.tsx';
import { ProgressBar } from '@/components/shared/ProgressBar.tsx';
import { DailyConfig } from '@/components/today/DailyConfig.tsx';
import { BadDayModal } from '@/components/today/BadDayModal.tsx';
import curriculum from '@/data/curriculum.json';
import { getAIMonthForCurriculumMonth } from '@/data/ai-curriculum.ts';
import type { TaskType } from '@/types/index.ts';

// Category icons + colors
const BLOCK_STYLES: Record<string, { icon: typeof BookOpen; color: string }> = {
  'DEEP TECHNICAL': { icon: Code, color: 'text-blue-400' },
  'OSINT': { icon: Search, color: 'text-emerald-400' },
  'OSINT / INVESTIGATION': { icon: Search, color: 'text-emerald-400' },
  'NEWS': { icon: Newspaper, color: 'text-amber-400' },
  'CHALLENGES': { icon: Swords, color: 'text-red-400' },
  'Mittagspause + Podcast': { icon: Coffee, color: 'text-neutral-400' },
  'SAYTEC': { icon: Briefcase, color: 'text-purple-400' },
  'GYM': { icon: Dumbbell, color: 'text-green-400' },
  'DEEP LEARNING': { icon: BookOpen, color: 'text-cyan-400' },
  'ISLAM': { icon: Moon, color: 'text-indigo-400' },
  'PROJEKT': { icon: Monitor, color: 'text-orange-400' },
  'AI SECURITY': { icon: Brain, color: 'text-pink-400' },
};

function getBlockStyle(category: string) {
  return BLOCK_STYLES[category] || { icon: BookOpen, color: 'text-text-muted' };
}

interface CurriculumTimeBlock {
  id: string;
  time: string;
  category: string;
  title: string;
  tasks: { id: string; text: string; type: TaskType; monthId: number; weekId?: string; dayId?: string; isCheckbox: boolean }[];
}

interface CurriculumDay {
  id: string;
  dayNumber: number;
  title: string;
  timeBlocks: CurriculumTimeBlock[];
}

interface RescheduledTaskInfo {
  id: string;
  text: string;
  category: string;
  time: string;
}

function findCurrentMonth(monthIndex: number) {
  const direct = curriculum.months.find(m => m.id === monthIndex);
  if (direct) return direct;
  for (const m of curriculum.months) {
    if (m.monthRange.includes('-')) {
      const [start, end] = m.monthRange.split('-').map(Number);
      if (monthIndex >= start && monthIndex <= end) return m;
    }
  }
  return curriculum.months[curriculum.months.length - 1];
}

export function TodayView() {
  const { completedTaskIds, completeTask, uncompleteTask, currentStreak } = useProgressStore();
  const { startDate } = useSettingsStore();
  const { getEntriesForDate } = useScheduleStore();
  const [badDayOpen, setBadDayOpen] = useState(false);

  const currentMonth = getCurrentMonthIndex(startDate);
  const currentWeek = getCurrentWeekInMonth(startDate);
  const multiplier = getStreakMultiplier(currentStreak);

  const monthData = findCurrentMonth(currentMonth);

  // Calculate current day in curriculum
  const todayData = useMemo<CurriculumDay | null>(() => {
    if (!monthData) return null;
    const start = new Date(startDate);
    const now = new Date();
    const diffDays = daysBetween(start, now);
    const dayInMonth = diffDays % 30;
    const dayNumber = dayInMonth + 1;
    const allDays = monthData.weeks.flatMap(w => w.days) as CurriculumDay[];
    return allDays.find(d => d.dayNumber === dayNumber) || null;
  }, [monthData, startDate]);

  // Build the timeBlocks list
  const timeBlocks = useMemo<CurriculumTimeBlock[]>(() => {
    if (todayData && todayData.timeBlocks.length > 0) {
      return todayData.timeBlocks as CurriculumTimeBlock[];
    }
    return curriculum.dailySchedule.map((block, i) => ({
      id: `sched_${i}`,
      time: block.time,
      category: block.block,
      title: block.block,
      tasks: [],
    }));
  }, [todayData]);

  // Collect all tasks for progress tracking
  const allDayTasks = useMemo(() => {
    return timeBlocks.flatMap(tb => tb.tasks);
  }, [timeBlocks]);

  // Load rescheduled tasks for today
  const rescheduledTasks = useMemo<RescheduledTaskInfo[]>(() => {
    const today = getToday();
    const entries = getEntriesForDate(today).filter(e => e.type === 'rescheduled');
    const tasks: RescheduledTaskInfo[] = [];
    for (const entry of entries) {
      if (entry.note) {
        try {
          const parsed = JSON.parse(entry.note) as RescheduledTaskInfo[];
          tasks.push(...parsed);
        } catch { /* ignore non-JSON notes */ }
      }
    }
    return tasks;
  }, [getEntriesForDate]);

  // AI Security tasks for current week
  const aiTasks = useMemo(() => {
    const aiMonth = getAIMonthForCurriculumMonth(currentMonth);
    if (!aiMonth) return [];
    const weekIdx = Math.max(0, Math.min(currentWeek - 1, aiMonth.weeks.length - 1));
    const aiWeek = aiMonth.weeks[weekIdx];
    if (!aiWeek) return [];
    return aiWeek.tasks.map(t => ({
      ...t,
      type: 'daily_task' as TaskType,
      isCheckbox: true,
    }));
  }, [currentMonth, currentWeek]);

  const aiWeekTopic = useMemo(() => {
    const aiMonth = getAIMonthForCurriculumMonth(currentMonth);
    if (!aiMonth) return null;
    const weekIdx = Math.max(0, Math.min(currentWeek - 1, aiMonth.weeks.length - 1));
    return aiMonth.weeks[weekIdx]?.topic || null;
  }, [currentMonth, currentWeek]);

  const aiMonthTitle = useMemo(() => {
    return getAIMonthForCurriculumMonth(currentMonth)?.title || null;
  }, [currentMonth]);

  // Monthly goals
  const goals = monthData?.goals || [];
  // Weekly goals
  const week = monthData?.weeks.find(w => w.weekNumber === currentWeek) || monthData?.weeks[0];
  const weekGoals = useMemo(() => {
    return (week?.goals || []).map((text: string, i: number) => ({
      id: `${week?.id}_wg_${i}`,
      text,
      type: 'weekly_task' as TaskType,
      monthId: monthData?.id || 0,
      isCheckbox: true,
    }));
  }, [week, monthData]);
  // KPIs
  const kpis = monthData?.kpis || [];

  // Totals (include rescheduled tasks + AI tasks)
  const allCheckable = [...allDayTasks, ...aiTasks, ...rescheduledTasks, ...goals, ...weekGoals, ...kpis];
  const completedCount = allCheckable.filter(t => completedTaskIds.has(t.id)).length;
  const totalCount = allCheckable.length;

  // Uncompleted day tasks for "Bad Day"
  const uncompletedDayTasks = useMemo(() => {
    return allDayTasks
      .filter(t => !completedTaskIds.has(t.id))
      .map(task => {
        const tb = timeBlocks.find(b => b.tasks.some(t => t.id === task.id));
        return {
          id: task.id,
          text: task.text,
          category: tb?.category || '',
          time: tb?.time || '',
        };
      });
  }, [allDayTasks, completedTaskIds, timeBlocks]);

  // Find the next uncompleted task
  const nextTaskId = useMemo(() => {
    // Check rescheduled tasks first
    for (const t of rescheduledTasks) {
      if (!completedTaskIds.has(t.id)) return t.id;
    }
    for (const tb of timeBlocks) {
      for (const task of tb.tasks) {
        if (!completedTaskIds.has(task.id)) return task.id;
      }
    }
    return null;
  }, [timeBlocks, rescheduledTasks, completedTaskIds]);

  // Find the block containing the next task
  const nextBlockId = useMemo(() => {
    for (const tb of timeBlocks) {
      for (const task of tb.tasks) {
        if (task.id === nextTaskId) return tb.id;
      }
    }
    return null;
  }, [timeBlocks, nextTaskId]);

  const handleToggle = (taskId: string, type: TaskType) => {
    if (completedTaskIds.has(taskId)) {
      uncompleteTask(taskId);
    } else {
      completeTask(taskId, type);
    }
  };

  if (!monthData) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h2 className="text-xl font-bold mb-2">Kein Curriculum-Daten</h2>
        <p className="text-text-muted">Bitte setze dein Start-Datum in den Einstellungen.</p>
      </div>
    );
  }

  const dayTitle = todayData?.title || new Date().toLocaleDateString('de-DE', { weekday: 'long' });

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{dayTitle}</h2>
            <p className="text-text-muted text-sm mt-0.5">
              Monat {monthData.monthRange} · Woche {currentWeek}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {multiplier > 1 && (
              <div className="flex items-center gap-1 text-streak text-xs font-bold">
                <Flame size={14} />
                {multiplier}x XP
              </div>
            )}
            {/* Bad Day Button */}
            {uncompletedDayTasks.length > 0 && (
              <button
                onClick={() => setBadDayOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors"
              >
                <AlertTriangle size={13} />
                Bad Day
              </button>
            )}
          </div>
        </div>
        <div className="mt-3">
          <ProgressBar value={completedCount} max={totalCount} showLabel />
        </div>
        <p className="text-xs text-text-muted mt-1">
          {completedCount} von {totalCount} Aufgaben erledigt
        </p>
      </div>

      {/* Daily Config — Activity Input */}
      <DailyConfig />

      {/* === NACHHOLAUFGABEN (Rescheduled) === */}
      {rescheduledTasks.length > 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center gap-2 px-4 py-3">
            <RotateCcw size={16} className="text-amber-400 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold">Nachholaufgaben</p>
              <p className="text-[10px] text-text-muted">Verschoben von einem vorherigen Tag</p>
            </div>
            <span className="text-[10px] text-text-muted">
              {rescheduledTasks.filter(t => completedTaskIds.has(t.id)).length}/{rescheduledTasks.length}
            </span>
          </div>
          <div className="px-4 pb-3 space-y-1">
            {rescheduledTasks.map((task) => {
              const done = completedTaskIds.has(task.id);
              const isNext = task.id === nextTaskId;
              return (
                <button
                  key={task.id}
                  onClick={() => handleToggle(task.id, 'daily_task')}
                  className={cn(
                    'w-full flex items-start gap-3 px-3 py-2 rounded-lg text-left transition-all',
                    'hover:bg-bg-hover group',
                    isNext && !done && 'bg-amber-500/10',
                    done && 'opacity-50',
                  )}
                >
                  {done ? (
                    <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                  ) : (
                    <Circle size={16} className={cn(
                      'shrink-0 mt-0.5',
                      isNext ? 'text-amber-400' : 'text-text-muted group-hover:text-amber-400',
                    )} />
                  )}
                  <div className="flex-1 min-w-0">
                    <span className={cn('text-sm block', done && 'line-through')}>{task.text}</span>
                    {task.time && (
                      <span className="text-[10px] text-text-muted">{task.category} · {task.time}</span>
                    )}
                  </div>
                  {done && <XpBadge amount={10} className="shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* === TAGESPLAN === */}
      {allDayTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold">Tagesplan</h3>

          {timeBlocks.map((tb) => {
            const blockTasks = tb.tasks;
            const isActiveBlock = tb.id === nextBlockId;
            const allBlockDone = blockTasks.length > 0 && blockTasks.every(t => completedTaskIds.has(t.id));
            const hasNoTasks = blockTasks.length === 0;
            const style = getBlockStyle(tb.category);
            const Icon = style.icon;

            return (
              <div
                key={tb.id}
                className={cn(
                  'rounded-xl border transition-all',
                  isActiveBlock
                    ? 'border-accent/50 bg-accent/5 ring-1 ring-accent/20'
                    : allBlockDone
                      ? 'border-border/50 bg-bg-card/50 opacity-60'
                      : hasNoTasks
                        ? 'border-border/50 bg-bg-card/60'
                        : 'border-border bg-bg-card',
                )}
              >
                {/* Block header */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <Icon size={16} className={cn(style.color, 'shrink-0')} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-text-muted">{tb.time}</span>
                      {isActiveBlock && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-accent">
                          <ArrowRight size={10} /> DU BIST HIER
                        </span>
                      )}
                    </div>
                    <p className={cn('text-sm font-medium', allBlockDone && 'line-through')}>
                      {tb.title}
                    </p>
                  </div>
                  {blockTasks.length > 0 && (
                    <span className="text-[10px] text-text-muted shrink-0">
                      {blockTasks.filter(t => completedTaskIds.has(t.id)).length}/{blockTasks.length}
                    </span>
                  )}
                </div>

                {/* Tasks */}
                {blockTasks.length > 0 && (
                  <div className="px-4 pb-3 space-y-1">
                    {blockTasks.map((task) => {
                      const done = completedTaskIds.has(task.id);
                      const isNext = task.id === nextTaskId;
                      const xp = getXpForTaskType(task.type || 'daily_task');
                      return (
                        <button
                          key={task.id}
                          onClick={() => handleToggle(task.id, task.type || 'daily_task')}
                          className={cn(
                            'w-full flex items-start gap-3 px-3 py-2 rounded-lg text-left transition-all',
                            'hover:bg-bg-hover group',
                            isNext && !done && 'bg-accent/5',
                            done && 'opacity-50',
                          )}
                        >
                          {done ? (
                            <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                          ) : (
                            <Circle size={16} className={cn(
                              'shrink-0 mt-0.5',
                              isNext ? 'text-accent' : 'text-text-muted group-hover:text-accent',
                            )} />
                          )}
                          <span className={cn('text-sm flex-1', done && 'line-through')}>
                            {task.text}
                          </span>
                          {done && <XpBadge amount={xp} className="shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* === AI SECURITY BLOCK (2h/Tag) === */}
      {aiTasks.length > 0 && (
        <div
          className={cn(
            'rounded-xl border transition-all',
            'border-pink-500/30 bg-pink-500/5',
          )}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <Brain size={16} className="text-pink-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-text-muted">2h/Tag</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-400 font-bold">AI</span>
              </div>
              <p className="text-sm font-medium">AI SECURITY — {aiMonthTitle}</p>
              {aiWeekTopic && (
                <p className="text-[10px] text-text-muted mt-0.5">Woche {currentWeek}: {aiWeekTopic}</p>
              )}
            </div>
            <span className="text-[10px] text-text-muted shrink-0">
              {aiTasks.filter(t => completedTaskIds.has(t.id)).length}/{aiTasks.length}
            </span>
          </div>
          <div className="px-4 pb-3 space-y-1">
            {aiTasks.map((task) => {
              const done = completedTaskIds.has(task.id);
              const xp = getXpForTaskType('daily_task');
              return (
                <button
                  key={task.id}
                  onClick={() => handleToggle(task.id, 'daily_task')}
                  className={cn(
                    'w-full flex items-start gap-3 px-3 py-2 rounded-lg text-left transition-all',
                    'hover:bg-bg-hover group',
                    done && 'opacity-50',
                  )}
                >
                  {done ? (
                    <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                  ) : (
                    <Circle size={16} className="text-text-muted shrink-0 mt-0.5 group-hover:text-pink-400" />
                  )}
                  <span className={cn('text-sm flex-1', done && 'line-through')}>
                    {task.text}
                  </span>
                  {done && <XpBadge amount={xp} className="shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Fallback: when no detailed day data, show dailySchedule template */}
      {allDayTasks.length === 0 && (
        <Card>
          <h3 className="text-sm font-bold mb-3">Tagesstruktur</h3>
          <p className="text-xs text-text-muted mb-3">
            Kein detaillierter Tagesplan fur diesen Tag. Nutze die Standard-Tagesstruktur:
          </p>
          <div className="space-y-1.5">
            {curriculum.dailySchedule.map((block, i) => {
              const style = getBlockStyle(block.block);
              const Icon = style.icon;
              return (
                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-bg-hover">
                  <Icon size={14} className={cn(style.color, 'shrink-0')} />
                  <span className="text-xs font-mono text-text-muted w-24 shrink-0">{block.time}</span>
                  <span className="text-sm">{block.block}</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Monthly Goals */}
      <Card>
        <h3 className="text-sm font-bold mb-3">
          Monats-Ziele ({goals.filter(g => completedTaskIds.has(g.id)).length}/{goals.length})
        </h3>
        <div className="space-y-1.5">
          {[...goals].sort((a, b) => {
            const aD = completedTaskIds.has(a.id) ? 1 : 0;
            const bD = completedTaskIds.has(b.id) ? 1 : 0;
            return aD - bD;
          }).map((goal) => {
            const done = completedTaskIds.has(goal.id);
            return (
              <button
                key={goal.id}
                onClick={() => handleToggle(goal.id, 'goal')}
                className={cn(
                  'w-full flex items-start gap-3 px-3 py-2 rounded-lg text-left transition-all',
                  'hover:bg-bg-hover group',
                  done && 'opacity-50'
                )}
              >
                {done ? (
                  <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                ) : (
                  <Circle size={16} className="text-text-muted shrink-0 mt-0.5 group-hover:text-accent" />
                )}
                <span className={cn('text-sm flex-1', done && 'line-through')}>
                  {goal.text}
                </span>
                {done && <XpBadge amount={100} className="shrink-0" />}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Week Goals */}
      {weekGoals.length > 0 && (
        <Card>
          <h3 className="text-sm font-bold mb-3">Woche {currentWeek} Ziele</h3>
          <div className="space-y-1.5">
            {[...weekGoals].sort((a, b) => {
              const aD = completedTaskIds.has(a.id) ? 1 : 0;
              const bD = completedTaskIds.has(b.id) ? 1 : 0;
              return aD - bD;
            }).map((task) => {
              const done = completedTaskIds.has(task.id);
              return (
                <button
                  key={task.id}
                  onClick={() => handleToggle(task.id, 'weekly_task')}
                  className={cn(
                    'w-full flex items-start gap-3 px-3 py-2 rounded-lg text-left transition-all',
                    'hover:bg-bg-hover group',
                    done && 'opacity-50'
                  )}
                >
                  {done ? (
                    <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                  ) : (
                    <Circle size={16} className="text-text-muted shrink-0 mt-0.5 group-hover:text-accent" />
                  )}
                  <span className={cn('text-sm flex-1', done && 'line-through')}>{task.text}</span>
                  {done && <XpBadge amount={50} className="shrink-0" />}
                </button>
              );
            })}
          </div>
        </Card>
      )}

      {/* KPIs */}
      {kpis.length > 0 && (
        <Card>
          <h3 className="text-sm font-bold mb-3">
            KPIs ({kpis.filter(k => completedTaskIds.has(k.id)).length}/{kpis.length})
          </h3>
          <div className="space-y-1.5">
            {[...kpis].sort((a, b) => {
              const aD = completedTaskIds.has(a.id) ? 1 : 0;
              const bD = completedTaskIds.has(b.id) ? 1 : 0;
              return aD - bD;
            }).map((kpi) => {
              const done = completedTaskIds.has(kpi.id);
              return (
                <button
                  key={kpi.id}
                  onClick={() => handleToggle(kpi.id, 'kpi')}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all',
                    'hover:bg-bg-hover group',
                    done && 'opacity-50'
                  )}
                >
                  {done ? (
                    <CheckCircle2 size={16} className="text-success shrink-0" />
                  ) : (
                    <Circle size={16} className="text-text-muted shrink-0 group-hover:text-accent" />
                  )}
                  <span className={cn('text-sm flex-1', done && 'line-through')}>{kpi.name}</span>
                  <span className="text-xs text-text-muted shrink-0">{kpi.target}</span>
                  {done && <XpBadge amount={100} className="shrink-0" />}
                </button>
              );
            })}
          </div>
        </Card>
      )}

      {/* Bad Day Modal */}
      <BadDayModal
        open={badDayOpen}
        onClose={() => setBadDayOpen(false)}
        uncompletedTasks={uncompletedDayTasks}
      />
    </div>
  );
}
