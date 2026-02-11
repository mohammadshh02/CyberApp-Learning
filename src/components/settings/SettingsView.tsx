import { useState } from 'react';
import { Moon, Sun, Calendar, Download, Upload, Trash2, AlertTriangle, Clock, Plus, X } from 'lucide-react';
import { useSettingsStore } from '@/stores/settings-store.ts';
import { exportAllData, importAllData, clearAllData } from '@/lib/db.ts';
import { cn } from '@/lib/utils.ts';
import { Card } from '@/components/shared/Card.tsx';
import { Modal } from '@/components/shared/Modal.tsx';
import type { RescheduleStrategy } from '@/types/index.ts';

const DAY_LABELS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

export function SettingsView() {
  const {
    theme, startDate, rescheduleStrategy, catchUpMaxExtraTasks,
    defaultWakeUpTime, defaultBedTime, personalBlockTemplates,
    setTheme, setStartDate, setRescheduleStrategy, setCatchUpMaxExtraTasks,
    setDefaultWakeUpTime, setDefaultBedTime, addTemplate, removeTemplate, updateTemplate,
  } = useSettingsStore();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [newTplLabel, setNewTplLabel] = useState('');
  const [newTplStart, setNewTplStart] = useState('09:00');
  const [newTplEnd, setNewTplEnd] = useState('12:00');
  const [newTplDays, setNewTplDays] = useState<number[]>([]);

  const handleAddTemplate = () => {
    if (!newTplLabel.trim()) return;
    addTemplate({
      label: newTplLabel.trim(),
      startTime: newTplStart,
      endTime: newTplEnd,
      activeDays: newTplDays,
    });
    setNewTplLabel('');
    setNewTplStart('09:00');
    setNewTplEnd('12:00');
    setNewTplDays([]);
    setShowAddTemplate(false);
  };

  const toggleDay = (day: number) => {
    setNewTplDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleExport = async () => {
    const data = await exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sovereign-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        await importAllData(text);
        setImportStatus('Daten erfolgreich importiert! Seite wird neu geladen...');
        setTimeout(() => window.location.reload(), 1500);
      } catch {
        setImportStatus('Fehler beim Import. Bitte prüfe die Datei.');
      }
    };
    input.click();
  };

  const handleClear = async () => {
    await clearAllData();
    setShowClearConfirm(false);
    window.location.reload();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-bold">Einstellungen</h2>

      {/* Theme */}
      <Card>
        <h3 className="text-sm font-medium mb-3">Erscheinungsbild</h3>
        <div className="flex gap-3">
          <button
            onClick={() => setTheme('dark')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all',
              theme === 'dark' ? 'border-accent bg-accent/10' : 'border-border hover:border-text-muted'
            )}
          >
            <Moon size={18} />
            <span className="text-sm font-medium">Dark</span>
          </button>
          <button
            onClick={() => setTheme('light')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all',
              theme === 'light' ? 'border-accent bg-accent/10' : 'border-border hover:border-text-muted'
            )}
          >
            <Sun size={18} />
            <span className="text-sm font-medium">Light</span>
          </button>
        </div>
      </Card>

      {/* Start Date */}
      <Card>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Calendar size={16} className="text-accent" />
          Start-Datum
        </h3>
        <p className="text-xs text-text-muted mb-3">
          Wann hast du mit OPERATION SOVEREIGN begonnen? Dies bestimmt welcher Monat/Woche aktuell angezeigt wird.
        </p>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full bg-bg-hover border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
      </Card>

      {/* Reschedule Strategy */}
      <Card>
        <h3 className="text-sm font-medium mb-3">Reschedule-Strategie</h3>
        <p className="text-xs text-text-muted mb-3">
          Was passiert wenn du Tage verpasst?
        </p>
        <div className="space-y-2">
          {[
            { id: 'catch-up' as RescheduleStrategy, label: 'Catch-Up Modus', desc: 'Verpasste Tasks auf die nächsten Tage verteilen' },
            { id: 'shift' as RescheduleStrategy, label: 'Shift Modus', desc: 'Gesamten Zeitplan nach hinten verschieben' },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setRescheduleStrategy(opt.id)}
              className={cn(
                'w-full flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all',
                rescheduleStrategy === opt.id ? 'border-accent bg-accent/10' : 'border-border hover:border-text-muted'
              )}
            >
              <div className={cn(
                'w-4 h-4 mt-0.5 rounded-full border-2 shrink-0',
                rescheduleStrategy === opt.id ? 'border-accent bg-accent' : 'border-text-muted'
              )} />
              <div>
                <div className="text-sm font-medium">{opt.label}</div>
                <div className="text-xs text-text-muted mt-0.5">{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {rescheduleStrategy === 'catch-up' && (
          <div className="mt-4">
            <label className="text-xs text-text-muted">Max. Extra-Tasks pro Tag</label>
            <input
              type="number"
              min={1}
              max={5}
              value={catchUpMaxExtraTasks}
              onChange={(e) => setCatchUpMaxExtraTasks(parseInt(e.target.value) || 2)}
              className="w-full mt-1 bg-bg-hover border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        )}
      </Card>

      {/* Daily Planner Defaults */}
      <Card>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Clock size={16} className="text-accent" />
          Tagesplan-Vorlagen
        </h3>
        <p className="text-xs text-text-muted mb-4">
          Standard-Zeiten und wiederkehrende persönliche Blöcke für den täglichen Planer.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-xs text-text-muted">Standard-Aufwachzeit</label>
            <input
              type="time"
              value={defaultWakeUpTime}
              onChange={(e) => setDefaultWakeUpTime(e.target.value)}
              className="w-full mt-1 bg-bg-hover border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div>
            <label className="text-xs text-text-muted">Standard-Schlafenszeit</label>
            <input
              type="time"
              value={defaultBedTime}
              onChange={(e) => setDefaultBedTime(e.target.value)}
              className="w-full mt-1 bg-bg-hover border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-text-muted font-medium">Wiederkehrende Blöcke</span>
            <button
              onClick={() => setShowAddTemplate(true)}
              className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
            >
              <Plus size={14} />
              Hinzufügen
            </button>
          </div>

          {(personalBlockTemplates || []).length === 0 && !showAddTemplate && (
            <p className="text-xs text-text-muted italic">Keine Vorlagen. Füge z.B. "Gym", "Minijob" hinzu.</p>
          )}

          <div className="space-y-2">
            {(personalBlockTemplates || []).map((tpl) => (
              <div
                key={tpl.id}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-bg-hover"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{tpl.label}</div>
                  <div className="text-xs text-text-muted">
                    {tpl.startTime}–{tpl.endTime}
                    {tpl.activeDays.length > 0
                      ? ` · ${tpl.activeDays.map(d => DAY_LABELS[d]).join(', ')}`
                      : ' · Jeden Tag'}
                  </div>
                </div>
                <button
                  onClick={() => removeTemplate(tpl.id)}
                  className="text-text-muted hover:text-danger transition-colors shrink-0"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {showAddTemplate && (
            <div className="mt-3 p-3 rounded-lg border border-border space-y-3">
              <input
                type="text"
                placeholder="Label (z.B. Gym, Minijob)"
                value={newTplLabel}
                onChange={(e) => setNewTplLabel(e.target.value)}
                className="w-full bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-text-muted">Start</label>
                  <input
                    type="time"
                    value={newTplStart}
                    onChange={(e) => setNewTplStart(e.target.value)}
                    className="w-full mt-1 bg-bg-hover border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-text-muted">Ende</label>
                  <input
                    type="time"
                    value={newTplEnd}
                    onChange={(e) => setNewTplEnd(e.target.value)}
                    className="w-full mt-1 bg-bg-hover border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">Aktive Tage (leer = jeden Tag)</label>
                <div className="flex gap-1">
                  {DAY_LABELS.map((label, i) => (
                    <button
                      key={i}
                      onClick={() => toggleDay(i)}
                      className={cn(
                        'w-8 h-8 rounded-lg text-xs font-medium transition-all',
                        newTplDays.includes(i)
                          ? 'bg-accent text-white'
                          : 'bg-bg-hover text-text-muted hover:bg-border'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddTemplate(false)}
                  className="flex-1 px-3 py-2 rounded-lg bg-bg-hover text-sm hover:bg-border transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleAddTemplate}
                  disabled={!newTplLabel.trim()}
                  className="flex-1 px-3 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/80 transition-colors disabled:opacity-40"
                >
                  Speichern
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Data Management */}
      <Card>
        <h3 className="text-sm font-medium mb-3">Daten-Management</h3>
        <div className="space-y-2">
          <button
            onClick={handleExport}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-hover hover:bg-accent/10 transition-colors text-sm"
          >
            <Download size={18} className="text-accent" />
            <div className="text-left">
              <div className="font-medium">Daten exportieren</div>
              <div className="text-xs text-text-muted">Backup als JSON herunterladen</div>
            </div>
          </button>

          <button
            onClick={handleImport}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-hover hover:bg-accent/10 transition-colors text-sm"
          >
            <Upload size={18} className="text-accent" />
            <div className="text-left">
              <div className="font-medium">Daten importieren</div>
              <div className="text-xs text-text-muted">Backup-Datei laden</div>
            </div>
          </button>

          {importStatus && (
            <div className="text-xs text-accent px-4 py-2">{importStatus}</div>
          )}

          <button
            onClick={() => setShowClearConfirm(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-hover hover:bg-danger/10 transition-colors text-sm"
          >
            <Trash2 size={18} className="text-danger" />
            <div className="text-left">
              <div className="font-medium text-danger">Alle Daten löschen</div>
              <div className="text-xs text-text-muted">Fortschritt komplett zurücksetzen</div>
            </div>
          </button>
        </div>
      </Card>

      {/* Clear Confirmation Modal */}
      <Modal open={showClearConfirm} onClose={() => setShowClearConfirm(false)} title="Daten löschen?">
        <div className="text-center space-y-4">
          <AlertTriangle size={48} className="text-danger mx-auto" />
          <p className="text-sm text-text-muted">
            Dies löscht deinen gesamten Fortschritt, alle Badges, Streaks und XP.
            <br /><strong>Diese Aktion kann nicht rückgängig gemacht werden!</strong>
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowClearConfirm(false)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-bg-hover text-sm font-medium hover:bg-border transition-colors"
            >
              Abbrechen
            </button>
            <button
              onClick={handleClear}
              className="flex-1 px-4 py-2.5 rounded-xl bg-danger text-white text-sm font-medium hover:bg-danger/80 transition-colors"
            >
              Alles löschen
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
