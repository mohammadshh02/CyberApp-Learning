import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Plus, X, Zap } from 'lucide-react';
import { useDailyPlannerStore } from '@/stores/daily-planner-store.ts';
import { useSettingsStore } from '@/stores/settings-store.ts';
import { cn } from '@/lib/utils.ts';
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

  const [isOpen, setIsOpen] = useState(false);
  const [showAddBlock, setShowAddBlock] = useState(false);
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
    setShowAddBlock(false);
  };

  const handleQuickAdd = (tpl: { label: string; startTime: string; endTime: string; color?: string }) => {
    addPersonalBlock({
      label: tpl.label,
      startTime: tpl.startTime,
      endTime: tpl.endTime,
      color: tpl.color,
    });
  };

  // Filter templates not already added today
  const availablePresets = (personalBlockTemplates || []).filter(
    tpl => !todayConfig.personalBlocks.some(pb => pb.label === tpl.label)
  );

  return (
    <Card>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between"
      >
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Clock size={16} className="text-accent" />
          Tagesplan konfigurieren
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">
            {todayConfig.wakeUpTime}–{todayConfig.bedTime}
            {todayConfig.personalBlocks.length > 0 &&
              ` · ${todayConfig.personalBlocks.length} Block${todayConfig.personalBlocks.length > 1 ? 'e' : ''}`}
          </span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {/* Wake/Sleep Times */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-text-muted">Aufwachzeit</label>
              <input
                type="time"
                value={todayConfig.wakeUpTime}
                onChange={(e) => setWakeUpTime(e.target.value)}
                className="w-full mt-1 bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            <div>
              <label className="text-xs text-text-muted">Schlafenszeit</label>
              <input
                type="time"
                value={todayConfig.bedTime}
                onChange={(e) => setBedTime(e.target.value)}
                className="w-full mt-1 bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>

          {/* Personal Blocks */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-muted font-medium">Persönliche Blöcke</span>
              <button
                onClick={() => setShowAddBlock(true)}
                className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
              >
                <Plus size={14} />
                Hinzufügen
              </button>
            </div>

            {todayConfig.personalBlocks.length === 0 && !showAddBlock && (
              <p className="text-xs text-text-muted italic">Keine persönlichen Blöcke heute.</p>
            )}

            <div className="space-y-2">
              {todayConfig.personalBlocks.map((block) => (
                <div
                  key={block.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-hover"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <input
                    type="text"
                    value={block.label}
                    onChange={(e) => updatePersonalBlock(block.id, { label: e.target.value })}
                    className="flex-1 min-w-0 bg-transparent text-sm focus:outline-none"
                  />
                  <input
                    type="time"
                    value={block.startTime}
                    onChange={(e) => updatePersonalBlock(block.id, { startTime: e.target.value })}
                    className="w-24 bg-transparent text-xs text-text-muted focus:outline-none"
                  />
                  <span className="text-xs text-text-muted">–</span>
                  <input
                    type="time"
                    value={block.endTime}
                    onChange={(e) => updatePersonalBlock(block.id, { endTime: e.target.value })}
                    className="w-24 bg-transparent text-xs text-text-muted focus:outline-none"
                  />
                  <button
                    onClick={() => removePersonalBlock(block.id)}
                    className="text-text-muted hover:text-danger transition-colors shrink-0"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Block Form */}
            {showAddBlock && (
              <div className="mt-2 p-3 rounded-lg border border-border space-y-2">
                <input
                  type="text"
                  placeholder="Label (z.B. Gym, Mails)"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="w-full bg-bg-hover border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  autoFocus
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="time"
                    value={newStart}
                    onChange={(e) => setNewStart(e.target.value)}
                    className="bg-bg-hover border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                  <input
                    type="time"
                    value={newEnd}
                    onChange={(e) => setNewEnd(e.target.value)}
                    className="bg-bg-hover border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddBlock(false)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-bg-hover text-xs hover:bg-border transition-colors"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={handleAddBlock}
                    disabled={!newLabel.trim()}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-medium hover:bg-accent/80 transition-colors disabled:opacity-40"
                  >
                    Hinzufügen
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Presets */}
          {availablePresets.length > 0 && (
            <div>
              <span className="text-xs text-text-muted font-medium mb-2 block">
                <Zap size={12} className="inline mr-1" />
                Schnell hinzufügen
              </span>
              <div className="flex flex-wrap gap-2">
                {availablePresets.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => handleQuickAdd(tpl)}
                    className="px-3 py-1.5 rounded-lg bg-bg-hover text-xs hover:bg-accent/10 hover:text-accent transition-colors border border-border"
                  >
                    {tpl.label} ({tpl.startTime}–{tpl.endTime})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
