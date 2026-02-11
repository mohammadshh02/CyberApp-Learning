import { useMemo, useState } from 'react';
import { CheckCircle2, Circle, Clock, ChevronDown, ChevronUp, Flame } from 'lucide-react';
import { useProgressStore } from '@/stores/progress-store.ts';
import { useSettingsStore } from '@/stores/settings-store.ts';
import { getCurrentMonthIndex, getCurrentWeekInMonth } from '@/lib/scheduler.ts';
import { getStreakMultiplier } from '@/lib/xp-engine.ts';
import { cn } from '@/lib/utils.ts';
import { Card } from '@/components/shared/Card.tsx';
import { XpBadge } from '@/components/shared/XpBadge.tsx';
import { ProgressBar } from '@/components/shared/ProgressBar.tsx';
import curriculum from '@/data/curriculum.json';
import type { TaskType } from '@/types/index.ts';

export function TodayView() {
  const { completedTaskIds, completeTask, uncompleteTask, currentStreak, totalXp } = useProgressStore();
  const { startDate } = useSettingsStore();
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);

  const currentMonth = getCurrentMonthIndex(startDate);
  const currentWeek = getCurrentWeekInMonth(startDate);
  const multiplier = getStreakMultiplier(currentStreak);

  // Get today's month data
  const monthData = curriculum.months.find(m => m.id === currentMonth);

  // Get current week's tasks and goals
  const todayTasks = useMemo(() => {
    if (!monthData) return { goals: [], weekGoals: [], dailySchedule: curriculum.dailySchedule };

    const goals = monthData.goals.map(g => ({
      ...g,
      type: 'goal' as TaskType,
    }));

    // Get week data if available
    const week = monthData.weeks.find(w => w.weekNumber === currentWeek) || monthData.weeks[0];
    const weekGoals = week?.goals.map((text, i) => ({
      id: `${week.id}_wg_${i}`,
      text,
      type: 'weekly_task' as TaskType,
      monthId: monthData.id,
      isCheckbox: true,
    })) || [];

    return { goals, weekGoals, dailySchedule: curriculum.dailySchedule };
  }, [monthData, currentWeek]);

  // KPIs for this month
  const kpis = monthData?.kpis || [];

  // Calculate today's progress
  const allTasks = [
    ...todayTasks.goals,
    ...todayTasks.weekGoals,
    ...kpis,
  ];
  const completedToday = allTasks.filter(t => completedTaskIds.has(t.id)).length;
  const totalToday = allTasks.length;

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

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold">Monat {monthData.monthRange}</h2>
        <p className="text-text-muted text-sm mt-1">{monthData.title.split('—')[1]?.trim() || monthData.title}</p>
        <div className="flex items-center gap-4 mt-3">
          <ProgressBar value={completedToday} max={totalToday} showLabel className="flex-1" />
          {multiplier > 1 && (
            <div className="flex items-center gap-1 text-streak text-xs font-bold">
              <Flame size={14} />
              {multiplier}x XP
            </div>
          )}
        </div>
      </div>

      {/* Daily Schedule */}
      <Card>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Clock size={16} className="text-accent" />
          Tagesstruktur
        </h3>
        <div className="space-y-1">
          {todayTasks.dailySchedule.map((block, i) => {
            const isExpanded = expandedBlock === block.time;
            const isWorkBlock = !['Frühstück', 'Mittagspause + Podcast', 'Abendessen', 'GYM', 'ISLAM'].some(x => block.block.includes(x));
            return (
              <div key={i}>
                <button
                  onClick={() => setExpandedBlock(isExpanded ? null : block.time)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                    isWorkBlock ? 'hover:bg-bg-hover' : 'opacity-60'
                  )}
                >
                  <span className="text-xs text-text-muted w-24 shrink-0 font-mono">{block.time}</span>
                  <span className={cn('text-sm flex-1', isWorkBlock && 'font-medium')}>{block.block}</span>
                  {isWorkBlock && (isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                </button>
                {isExpanded && isWorkBlock && (
                  <div className="ml-28 pl-3 border-l border-border mb-2 text-xs text-text-muted">
                    Aktueller Fokus: Monat {currentMonth}, Woche {currentWeek}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Monthly Goals */}
      <Card>
        <h3 className="text-sm font-medium mb-3">Monats-Ziele ({todayTasks.goals.filter(g => completedTaskIds.has(g.id)).length}/{todayTasks.goals.length})</h3>
        <div className="space-y-1.5">
          {todayTasks.goals.map((goal) => {
            const done = completedTaskIds.has(goal.id);
            return (
              <button
                key={goal.id}
                onClick={() => handleToggle(goal.id, 'goal')}
                className={cn(
                  'w-full flex items-start gap-3 px-3 py-2 rounded-lg text-left transition-all',
                  'hover:bg-bg-hover group',
                  done && 'opacity-60'
                )}
              >
                {done ? (
                  <CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" />
                ) : (
                  <Circle size={18} className="text-text-muted shrink-0 mt-0.5 group-hover:text-accent" />
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
      {todayTasks.weekGoals.length > 0 && (
        <Card>
          <h3 className="text-sm font-medium mb-3">Woche {currentWeek} Ziele</h3>
          <div className="space-y-1.5">
            {todayTasks.weekGoals.map((task) => {
              const done = completedTaskIds.has(task.id);
              return (
                <button
                  key={task.id}
                  onClick={() => handleToggle(task.id, 'weekly_task')}
                  className={cn(
                    'w-full flex items-start gap-3 px-3 py-2 rounded-lg text-left transition-all',
                    'hover:bg-bg-hover group',
                    done && 'opacity-60'
                  )}
                >
                  {done ? (
                    <CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" />
                  ) : (
                    <Circle size={18} className="text-text-muted shrink-0 mt-0.5 group-hover:text-accent" />
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
          <h3 className="text-sm font-medium mb-3">KPIs ({kpis.filter(k => completedTaskIds.has(k.id)).length}/{kpis.length})</h3>
          <div className="space-y-1.5">
            {kpis.map((kpi) => {
              const done = completedTaskIds.has(kpi.id);
              return (
                <button
                  key={kpi.id}
                  onClick={() => handleToggle(kpi.id, 'kpi')}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all',
                    'hover:bg-bg-hover group',
                    done && 'opacity-60'
                  )}
                >
                  {done ? (
                    <CheckCircle2 size={18} className="text-success shrink-0" />
                  ) : (
                    <Circle size={18} className="text-text-muted shrink-0 group-hover:text-accent" />
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
    </div>
  );
}
