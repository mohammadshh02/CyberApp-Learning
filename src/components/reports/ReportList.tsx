import { Search } from 'lucide-react';
import { useReportsStore } from '@/stores/reports-store.ts';
import { REPORT_CATEGORIES } from '@/types/index.ts';
import type { ReportType, ReportCategory } from '@/types/index.ts';
import { Card } from '@/components/shared/Card.tsx';
import { formatDate } from '@/lib/utils.ts';

export function ReportList() {
  const {
    searchQuery, setSearchQuery,
    filterType, setFilterType,
    filterCategory, setFilterCategory,
    selectReport, getFilteredReports,
  } = useReportsStore();

  const reports = getFilteredReports();

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Berichte durchsuchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-bg-hover border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as ReportType | 'all')}
          className="px-3 py-2 bg-bg-hover border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="all">Alle Typen</option>
          <option value="auto">Automatisch</option>
          <option value="custom">Eigene</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as ReportCategory | 'all')}
          className="px-3 py-2 bg-bg-hover border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="all">Alle Kategorien</option>
          {REPORT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* List */}
      {reports.length === 0 ? (
        <div className="text-center py-12 text-text-muted">
          <p className="text-lg mb-1">Keine Berichte gefunden</p>
          <p className="text-sm">Erstelle einen neuen Bericht oder generiere einen automatischen Report.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {reports.map((report) => (
            <Card
              key={report.id}
              hover
              onClick={() => selectReport(report.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
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
                  </div>
                  <h3 className="font-medium truncate">{report.title}</h3>
                  <p className="text-sm text-text-muted line-clamp-2 mt-1">
                    {report.content.replace(/[#*\[\]`]/g, '').slice(0, 150)}...
                  </p>
                  {report.tags.length > 0 && (
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {report.tags.map((tag) => (
                        <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-bg-hover text-text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-xs text-text-muted whitespace-nowrap">
                  {formatDate(report.createdAt)}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
