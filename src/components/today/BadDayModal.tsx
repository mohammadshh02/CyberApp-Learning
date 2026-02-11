import { useState } from 'react';
import { AlertTriangle, ArrowRight, CalendarDays } from 'lucide-react';
import { Modal } from '@/components/shared/Modal.tsx';
import { useScheduleStore } from '@/stores/schedule-store.ts';
import { getToday } from '@/lib/utils.ts';
import { cn } from '@/lib/utils.ts';

interface ReschedulableTask {
  id: string;
  text: string;
  category: string;
  time: string;
}

interface BadDayModalProps {
  open: boolean;
  onClose: () => void;
  uncompletedTasks: ReschedulableTask[];
}

function addDaysToDate(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function formatDateDE(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  });
}

type Strategy = 'tomorrow' | 'spread';

export function BadDayModal({ open, onClose, uncompletedTasks }: BadDayModalProps) {
  const { addEntry } = useScheduleStore();
  const [strategy, setStrategy] = useState<Strategy>('tomorrow');
  const [saving, setSaving] = useState(false);

  const today = getToday();
  const tomorrow = addDaysToDate(today, 1);
  const day2 = addDaysToDate(today, 2);
  const day3 = addDaysToDate(today, 3);

  const count = uncompletedTasks.length;

  // Preview: how tasks would be distributed
  const spreadDays = 3;
  const perDay = Math.ceil(count / spreadDays);
  const spreadPreview = [
    { date: tomorrow, tasks: uncompletedTasks.slice(0, perDay) },
    { date: day2, tasks: uncompletedTasks.slice(perDay, perDay * 2) },
    { date: day3, tasks: uncompletedTasks.slice(perDay * 2) },
  ].filter(d => d.tasks.length > 0);

  const handleConfirm = async () => {
    if (count === 0) return;
    setSaving(true);

    // Build serialized task data for the note field
    const serializeTasks = (tasks: ReschedulableTask[]) =>
      JSON.stringify(tasks.map(t => ({ id: t.id, text: t.text, category: t.category, time: t.time })));

    if (strategy === 'tomorrow') {
      await addEntry({
        date: tomorrow,
        type: 'rescheduled',
        taskIds: uncompletedTasks.map(t => t.id),
        note: serializeTasks(uncompletedTasks),
      });
    } else {
      for (const day of spreadPreview) {
        await addEntry({
          date: day.date,
          type: 'rescheduled',
          taskIds: day.tasks.map(t => t.id),
          note: serializeTasks(day.tasks),
        });
      }
    }

    setSaving(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Bad Day — Aufgaben verschieben">
      <div className="space-y-5">
        {/* Status */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">
              {count} offene {count === 1 ? 'Aufgabe' : 'Aufgaben'} heute
            </p>
            <p className="text-xs text-text-muted mt-0.5">
              Kein Problem — verschiebe sie und hole sie nach.
            </p>
          </div>
        </div>

        {count === 0 ? (
          <p className="text-sm text-text-muted text-center py-4">
            Alle Aufgaben erledigt — kein Bad Day!
          </p>
        ) : (
          <>
            {/* Strategy selection */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-text-muted">Wie verschieben?</p>

              <button
                onClick={() => setStrategy('tomorrow')}
                className={cn(
                  'w-full flex items-start gap-3 p-3 rounded-xl border transition-all text-left',
                  strategy === 'tomorrow'
                    ? 'border-accent bg-accent/5 ring-1 ring-accent/20'
                    : 'border-border hover:bg-bg-hover',
                )}
              >
                <ArrowRight size={16} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Alles auf morgen</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    {count} Aufgaben erscheinen morgen ({formatDateDE(tomorrow)}) zusatzlich zum regularen Plan.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setStrategy('spread')}
                className={cn(
                  'w-full flex items-start gap-3 p-3 rounded-xl border transition-all text-left',
                  strategy === 'spread'
                    ? 'border-accent bg-accent/5 ring-1 ring-accent/20'
                    : 'border-border hover:bg-bg-hover',
                )}
              >
                <CalendarDays size={16} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Auf 3 Tage verteilen</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    {spreadPreview.map(d => `${formatDateDE(d.date)}: ${d.tasks.length}`).join(' · ')} Aufgaben
                  </p>
                </div>
              </button>
            </div>

            {/* Preview */}
            <div>
              <p className="text-xs font-bold text-text-muted mb-2">Vorschau — verschobene Aufgaben</p>
              <div className="max-h-40 overflow-y-auto space-y-1 scrollbar-thin">
                {uncompletedTasks.map(task => (
                  <div key={task.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-hover text-xs">
                    <span className="text-text-muted font-mono w-24 shrink-0">{task.time}</span>
                    <span className="truncate">{task.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Confirm */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-border hover:bg-bg-hover transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleConfirm}
                disabled={saving}
                className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-accent hover:bg-accent-hover text-white font-medium transition-colors disabled:opacity-50"
              >
                {saving ? 'Speichern...' : 'Verschieben'}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
