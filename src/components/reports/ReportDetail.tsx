import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { useReportsStore } from '@/stores/reports-store.ts';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer.tsx';
import { formatDate } from '@/lib/utils.ts';

export function ReportDetail() {
  const { reports, selectedReportId, selectReport, setEditingReport, deleteReport } = useReportsStore();
  const report = reports.find((r) => r.id === selectedReportId);

  if (!report) return null;

  const handleDelete = () => {
    if (confirm('Bericht wirklich löschen?')) {
      deleteReport(report.id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Back button + actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => selectReport(null)}
          className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
        >
          <ArrowLeft size={16} />
          Zurück
        </button>
        <div className="flex items-center gap-2">
          {report.type === 'custom' && (
            <button
              onClick={() => setEditingReport(report)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-bg-hover hover:bg-border transition-colors"
            >
              <Pencil size={14} />
              Bearbeiten
            </button>
          )}
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors"
          >
            <Trash2 size={14} />
            Löschen
          </button>
        </div>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            report.type === 'auto'
              ? 'bg-blue-500/10 text-blue-400'
              : 'bg-green-500/10 text-green-400'
          }`}>
            {report.type === 'auto' ? 'Auto' : 'Eigener'}
          </span>
          {report.category && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
              {report.category}
            </span>
          )}
          <span className="text-xs text-text-muted">{formatDate(report.createdAt)}</span>
        </div>
        <h1 className="text-xl font-bold">{report.title}</h1>
        {report.tags.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {report.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-bg-hover text-text-muted">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="bg-bg-card border border-border rounded-xl p-6">
        <MarkdownRenderer content={report.content} />
      </div>
    </div>
  );
}
