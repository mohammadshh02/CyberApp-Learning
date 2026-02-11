import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { useProgressStore } from '@/stores/progress-store.ts';
import { useScheduleStore } from '@/stores/schedule-store.ts';
import { cn, getDaysInMonth, getFirstDayOfMonth } from '@/lib/utils.ts';
import { Card } from '@/components/shared/Card.tsx';
import { Modal } from '@/components/shared/Modal.tsx';

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

export function CalendarView() {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [heatmapMode, setHeatmapMode] = useState(false);
  const { dailyLogs, completedTaskIds } = useProgressStore();
  const { blockedDates, blockDate, unblockDate } = useScheduleStore();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month + 1);
  const firstDay = (getFirstDayOfMonth(year, month + 1) + 6) % 7; // Monday-based

  // Build daily XP map
  const xpMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const log of dailyLogs) {
      map.set(log.date, log.xpEarned);
    }
    return map;
  }, [dailyLogs]);

  // Task count map
  const taskMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const log of dailyLogs) {
      map.set(log.date, log.tasksCompleted);
    }
    return map;
  }, [dailyLogs]);

  const maxXp = useMemo(() => Math.max(1, ...Array.from(xpMap.values())), [xpMap]);

  const navigate = (dir: number) => {
    const d = new Date(viewDate);
    d.setMonth(d.getMonth() + dir);
    setViewDate(d);
  };

  const getDateStr = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const today = new Date().toISOString().split('T')[0];

  const getDayColor = (day: number) => {
    const dateStr = getDateStr(day);
    if (blockedDates.has(dateStr)) return 'bg-danger/20 text-danger';
    const xp = xpMap.get(dateStr);
    if (xp !== undefined && xp > 0) {
      if (heatmapMode) {
        const intensity = Math.min(1, xp / maxXp);
        return intensity > 0.7 ? 'bg-success/80 text-white' :
               intensity > 0.3 ? 'bg-success/40 text-success' :
               'bg-success/20 text-success';
      }
      return 'bg-success/20 text-success';
    }
    if (dateStr < today && dateStr >= '2026-01-01') return 'bg-danger/10 text-danger/60';
    return '';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-bg-hover transition-colors">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-bold min-w-48 text-center">
            {MONTHS[month]} {year}
          </h2>
          <button onClick={() => navigate(1)} className="p-2 rounded-lg hover:bg-bg-hover transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
        <button
          onClick={() => setHeatmapMode(!heatmapMode)}
          className={cn(
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
            heatmapMode ? 'bg-accent text-white' : 'bg-bg-hover text-text-muted'
          )}
        >
          Heatmap
        </button>
      </div>

      {/* Calendar Grid */}
      <Card className="p-2 md:p-4">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {WEEKDAYS.map((day) => (
            <div key={day} className="text-center text-xs text-text-muted font-medium py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dateStr = getDateStr(day);
            const isToday = dateStr === today;
            const isBlocked = blockedDates.has(dateStr);
            const tasks = taskMap.get(dateStr) || 0;
            const xp = xpMap.get(dateStr) || 0;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(dateStr)}
                className={cn(
                  'aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all',
                  'hover:ring-1 hover:ring-accent/50',
                  getDayColor(day),
                  isToday && 'ring-2 ring-accent font-bold',
                )}
              >
                <span>{day}</span>
                {tasks > 0 && !heatmapMode && (
                  <span className="text-[8px] mt-0.5">{tasks}t</span>
                )}
                {heatmapMode && xp > 0 && (
                  <span className="text-[8px] mt-0.5">{xp}</span>
                )}
                {isBlocked && <Lock size={8} className="mt-0.5" />}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-text-muted">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-success/40" />
          <span>Erledigt</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-danger/20" />
          <span>Verpasst</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-danger/40" />
          <span>Blockiert</span>
        </div>
      </div>

      {/* Heatmap: Last 12 months */}
      <Card>
        <h3 className="text-sm font-medium mb-3">Streak-Heatmap (letzte 90 Tage)</h3>
        <div className="flex flex-wrap gap-[3px]">
          {Array.from({ length: 90 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - 89 + i);
            const dateStr = d.toISOString().split('T')[0];
            const xp = xpMap.get(dateStr) || 0;
            const intensity = xp > 0 ? Math.min(1, xp / Math.max(maxXp, 1)) : 0;
            return (
              <div
                key={dateStr}
                className={cn(
                  'w-3 h-3 rounded-sm',
                  intensity === 0 ? 'bg-bg-hover' :
                  intensity > 0.7 ? 'bg-success' :
                  intensity > 0.3 ? 'bg-success/60' :
                  'bg-success/30'
                )}
                title={`${dateStr}: ${xp} XP`}
              />
            );
          })}
        </div>
      </Card>

      {/* Day Detail Modal */}
      <Modal
        open={!!selectedDate}
        onClose={() => setSelectedDate(null)}
        title={selectedDate ? new Date(selectedDate).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ''}
      >
        {selectedDate && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-bg-hover rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{taskMap.get(selectedDate) || 0}</div>
                <div className="text-xs text-text-muted">Tasks</div>
              </div>
              <div className="bg-bg-hover rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-xp">{xpMap.get(selectedDate) || 0}</div>
                <div className="text-xs text-text-muted">XP</div>
              </div>
            </div>

            {blockedDates.has(selectedDate) ? (
              <button
                onClick={() => { unblockDate(selectedDate); setSelectedDate(null); }}
                className="w-full px-4 py-2 rounded-lg bg-danger/20 text-danger text-sm hover:bg-danger/30 transition-colors"
              >
                Blockierung aufheben
              </button>
            ) : (
              <button
                onClick={() => { blockDate(selectedDate, 'Blockiert'); setSelectedDate(null); }}
                className="w-full px-4 py-2 rounded-lg bg-bg-hover text-text-muted text-sm hover:bg-danger/20 hover:text-danger transition-colors"
              >
                Tag blockieren (Uni/Event/Urlaub)
              </button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
