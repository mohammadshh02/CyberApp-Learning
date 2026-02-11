import { useState } from 'react';
import { Clock, Plus, X, Zap, AlarmClock, Moon } from 'lucide-react';
import { useDailyPlannerStore } from '@/stores/daily-planner-store.ts';
import { useSettingsStore } from '@/stores/settings-store.ts';
import { Card } from '@/components/shared/Card.tsx';

export function DailyConfig() {
  const {
    todayConfig,
    setWakeUpTime,
    setBedTime,
    addPersonalBlock,
    removePersonalBlock,
    updatePersonalBlock,
  } = useDailyPlannerStore();
  const { personalBlockTemplates } = useSettingsStore();

  const [newLabel, setNewLabel] = useState('');
  const [newStart, setNewStart] = useState('09:00');
  const [newEnd, setNewEnd] = useState('12:00');

  if (!todayConfig) return null;

  const handleAddBlock = () => {
    if (!newLabel.trim()) return;
    addPersonalBlock({
      label: newLabel.trim(),
      startTime: newStart,
      endTime: newEnd,
    });
    setNewLabel('');
    setNewStart('09:00');
    setNewEnd('12:00');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddBlock();
    }
  };

  const handleQuickAdd = (tpl: { label: string; startTime: string; endTime: string; color?: string }) => {
    addPersonalBlock({
      label: tpl.label,
      startTime: tpl.startTime,
      endTime: tpl.endTime,
      color: tpl.color,
    });
  };

  const availablePresets = (personalBlockTemplates || []).filter(
    tpl => !todayConfig.personalBlocks.some(pb => pb.label === tpl.label)
  );

  const sorted = [...todayConfig.personalBlocks].sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <Card>
      <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
        <Clock size={16} className="text-accent" />
        Mein Tag heute
      </h3>

      {/* Wake / Sleep — always visible, prominent */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-bg-hover border border-border">
          <AlarmClock size={16} className="text-amber-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-text-muted leading-tight">Aufgestanden</p>
            <input
              type="time"
              value={todayConfig.wakeUpTime}
              onChange={(e) => setWakeUpTime(e.target.value)}
              className="w-full bg-transparent text-sm font-bold focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-bg-hover border border-border">
          <Moon size={16} className="text-indigo-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-text-muted leading-tight">Schlafen</p>
            <input
              type="time"
              value={todayConfig.bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              className="w-full bg-transparent text-sm font-bold focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section header */}
      <p className="text-xs font-bold text-text-muted mb-2">
        Meine Aktivitaten ({sorted.length})
      </p>
      <p className="text-[10px] text-text-muted mb-3">
        Trage ein, was du heute vorhast — der Lernplan passt sich automatisch an.
      </p>

      {/* Inline add row — always visible */}
      <div className="flex items-center gap-2 mb-3 p-2 rounded-xl border border-accent/30 bg-accent/5">
        <Plus size={14} className="text-accent shrink-0" />
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="z.B. Arbeit, Gym, Arzt, Einkaufen..."
          className="flex-1 min-w-0 bg-transparent text-sm placeholder:text-text-muted/50 focus:outline-none"
          autoComplete="off"
        />
        <input
          type="time"
          value={newStart}
          onChange={(e) => setNewStart(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[5.5rem] bg-transparent text-xs text-text-muted focus:outline-none"
        />
        <span className="text-xs text-text-muted">–</span>
        <input
          type="time"
          value={newEnd}
          onChange={(e) => setNewEnd(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[5.5rem] bg-transparent text-xs text-text-muted focus:outline-none"
        />
        <button
          onClick={handleAddBlock}
          disabled={!newLabel.trim()}
          className="px-2.5 py-1 rounded-lg bg-accent text-white text-xs font-medium hover:bg-accent/80 transition-colors disabled:opacity-30 shrink-0"
        >
          +
        </button>
      </div>

      {/* Quick presets */}
      {availablePresets.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Zap size={12} className="text-text-muted mt-1" />
          {availablePresets.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => handleQuickAdd(tpl)}
              className="px-2.5 py-1 rounded-lg bg-bg-hover text-[11px] hover:bg-accent/10 hover:text-accent transition-colors border border-border"
            >
              {tpl.label} ({tpl.startTime}–{tpl.endTime})
            </button>
          ))}
        </div>
      )}

      {/* Activity list */}
      {sorted.length === 0 ? (
        <div className="text-center py-4 text-text-muted">
          <p className="text-xs">Noch keine Aktivitaten eingetragen.</p>
          <p className="text-[10px] mt-0.5">Tippe oben ein, was du heute vorhast.</p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {sorted.map((block) => (
            <div
              key={block.id}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-hover group"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <input
                type="text"
                value={block.label}
                onChange={(e) => updatePersonalBlock(block.id, { label: e.target.value })}
                className="flex-1 min-w-0 bg-transparent text-sm font-medium focus:outline-none"
              />
              <input
                type="time"
                value={block.startTime}
                onChange={(e) => updatePersonalBlock(block.id, { startTime: e.target.value })}
                className="w-[5.5rem] bg-transparent text-xs text-text-muted focus:outline-none"
              />
              <span className="text-xs text-text-muted">–</span>
              <input
                type="time"
                value={block.endTime}
                onChange={(e) => updatePersonalBlock(block.id, { endTime: e.target.value })}
                className="w-[5.5rem] bg-transparent text-xs text-text-muted focus:outline-none"
              />
              <button
                onClick={() => removePersonalBlock(block.id)}
                className="text-text-muted hover:text-red-400 transition-colors shrink-0 opacity-0 group-hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
