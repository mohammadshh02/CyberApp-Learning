import { FileText, CalendarDays, CalendarRange, Plus } from 'lucide-react';
import { useReportsStore } from '@/stores/reports-store.ts';
import { ReportList } from './ReportList.tsx';
import { ReportDetail } from './ReportDetail.tsx';
import { ReportEditorModal } from './ReportEditorModal.tsx';

export function ReportsView() {
  const { reports, selectedReportId, generateReport, setEditorOpen } = useReportsStore();

  const autoCount = reports.filter((r) => r.type === 'auto').length;
  const customCount = reports.filter((r) => r.type === 'custom').length;

  if (selectedReportId) {
    return (
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <ReportDetail />
        <ReportEditorModal />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText size={24} className="text-accent" />
          Berichte
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Automatische Fortschrittsberichte und eigene Write-Ups
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{reports.length}</p>
          <p className="text-xs text-text-muted">Gesamt</p>
        </div>
        <div className="bg-bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{autoCount}</p>
          <p className="text-xs text-text-muted">Automatisch</p>
        </div>
        <div className="bg-bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{customCount}</p>
          <p className="text-xs text-text-muted">Eigene</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => generateReport('weekly')}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
        >
          <CalendarDays size={16} />
          Wochenbericht generieren
        </button>
        <button
          onClick={() => generateReport('monthly')}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
        >
          <CalendarRange size={16} />
          Monatsbericht generieren
        </button>
        <button
          onClick={() => setEditorOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors"
        >
          <Plus size={16} />
          Neuer Bericht
        </button>
      </div>

      {/* Report List */}
      <ReportList />

      {/* Editor Modal */}
      <ReportEditorModal />
    </div>
  );
}
