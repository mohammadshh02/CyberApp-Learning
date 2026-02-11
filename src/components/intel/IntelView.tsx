import { Database, Building2, Shield } from 'lucide-react';
import { useIntelStore } from '@/stores/intel-store.ts';
import { INTEL_CATEGORIES } from '@/types/index.ts';
import { cn } from '@/lib/utils.ts';
import { IntelOverview } from './IntelOverview.tsx';
import { CompanyDetail } from './CompanyDetail.tsx';
import { SaytecPage } from './SaytecPage.tsx';

export function IntelView() {
  const { companies, viewMode, setViewMode } = useIntelStore();

  const categoryCount = (cat: string) => companies.filter((c) => c.category === cat).length;

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">Wissensdatenbank</h1>
        <p className="text-sm text-text-muted mt-1">
          {companies.length} Unternehmen in {INTEL_CATEGORIES.length} Kategorien
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('overview')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors',
            viewMode === 'overview'
              ? 'bg-accent text-white font-medium'
              : 'bg-bg-card border border-border text-text-muted hover:bg-bg-hover',
          )}
        >
          <Building2 size={16} /> Ubersicht
        </button>
        <button
          onClick={() => setViewMode('saytec')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors',
            viewMode === 'saytec'
              ? 'bg-accent text-white font-medium'
              : 'bg-bg-card border border-border text-text-muted hover:bg-bg-hover',
          )}
        >
          <Shield size={16} /> SAYTEC:EU
        </button>
      </div>

      {/* Kategorie-Grid */}
      {viewMode === 'overview' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {INTEL_CATEGORIES.map((cat) => {
            const count = categoryCount(cat);
            return (
              <div key={cat} className="bg-bg-card border border-border rounded-lg p-3">
                <p className="text-[11px] font-medium truncate">{cat}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-text-muted">{count} Firmen</span>
                  <Database size={12} className="text-text-muted" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Active view */}
      {viewMode === 'overview' ? <IntelOverview /> : <SaytecPage />}

      {/* Company detail modal */}
      <CompanyDetail />
    </div>
  );
}
