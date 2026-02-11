import { useState } from 'react';
import { Clock, ChevronDown, ChevronUp, BookOpen, User, Coffee } from 'lucide-react';
import { useDailyPlannerStore } from '@/stores/daily-planner-store.ts';
import { useSettingsStore } from '@/stores/settings-store.ts';
import { getCurrentMonthIndex, getCurrentWeekInMonth } from '@/lib/scheduler.ts';
import { getTotalLearningMinutes, getDefaultLearningMinutes } from '@/lib/daily-scheduler.ts';
import { cn } from '@/lib/utils.ts';
import { Card } from '@/components/shared/Card.tsx';
import type { GeneratedBlock } from '@/types/index.ts';

const TYPE_STYLES: Record<GeneratedBlock['type'], { bg: string; border: string; icon: typeof BookOpen }> = {
  learning: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: BookOpen },
  personal: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: User },
  break: { bg: 'bg-neutral-500/10', border: 'border-neutral-500/30', icon: Coffee },
};

export function GeneratedSchedule() {
  const { generatedSchedule } = useDailyPlannerStore();
  const { startDate } = useSettingsStore();
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);

  const currentMonth = getCurrentMonthIndex(startDate);
  const currentWeek = getCurrentWeekInMonth(startDate);

  const totalLearning = getTotalLearningMinutes(generatedSchedule);
  const defaultLearning = getDefaultLearningMinutes();
  const learningHours = Math.floor(totalLearning / 60);
  const learningMins = totalLearning % 60;

  if (generatedSchedule.length === 0) {
    return (
      <Card>
        <div className="text-center py-6 text-text-muted text-sm">
          Konfiguriere deinen Tagesplan oben, um den Zeitplan zu generieren.
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Clock size={16} className="text-accent" />
          Tagesstruktur
        </h3>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span
            className={cn(
              'font-mono',
              totalLearning < defaultLearning * 0.7 ? 'text-amber-400' : 'text-emerald-400'
            )}
          >
            {learningHours}h{learningMins > 0 ? ` ${learningMins}m` : ''} Lernzeit
          </span>
          <span>/ {Math.floor(defaultLearning / 60)}h Standard</span>
        </div>
      </div>

      <div className="space-y-1">
        {generatedSchedule.map((block) => {
          const style = TYPE_STYLES[block.type];
          const Icon = style.icon;
          const isExpanded = expandedBlock === block.id;
          const isLearning = block.type === 'learning';

          return (
            <div key={block.id}>
              <button
                onClick={() => isLearning && setExpandedBlock(isExpanded ? null : block.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors border',
                  style.bg,
                  style.border,
                  isLearning ? 'hover:brightness-110 cursor-pointer' : 'cursor-default',
                  block.type === 'break' && 'opacity-60'
                )}
              >
                <Icon size={14} className="shrink-0 text-text-muted" />
                <span className="text-xs text-text-muted w-24 shrink-0 font-mono">
                  {block.startTime}–{block.endTime}
                </span>
                <span className={cn('text-sm flex-1', isLearning && 'font-medium')}>
                  {block.label}
                </span>
                <span className="text-xs text-text-muted shrink-0">
                  {block.durationMinutes}min
                </span>
                {isLearning && (
                  isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                )}
              </button>
              {isExpanded && isLearning && (
                <div className="ml-12 pl-3 border-l border-blue-500/30 mb-1 py-1 text-xs text-text-muted">
                  Aktueller Fokus: Monat {currentMonth}, Woche {currentWeek}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          Lernen
        </div>
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          Persönlich
        </div>
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-500" />
          Pause
        </div>
      </div>
    </Card>
  );
}
