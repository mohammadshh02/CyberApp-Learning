import { useState } from 'react';
import { Moon, Sun, Calendar, Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { useSettingsStore } from '@/stores/settings-store.ts';
import { exportAllData, importAllData, clearAllData } from '@/lib/db.ts';
import { cn } from '@/lib/utils.ts';
import { Card } from '@/components/shared/Card.tsx';
import { Modal } from '@/components/shared/Modal.tsx';
import type { RescheduleStrategy } from '@/types/index.ts';

export function SettingsView() {
  const {
    theme, startDate, rescheduleStrategy, catchUpMaxExtraTasks,
    setTheme, setStartDate, setRescheduleStrategy, setCatchUpMaxExtraTasks,
  } = useSettingsStore();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

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
