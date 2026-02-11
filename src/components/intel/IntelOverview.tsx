import { Search } from 'lucide-react';
import { useIntelStore } from '@/stores/intel-store.ts';
import { INTEL_CATEGORIES } from '@/types/index.ts';
import type { IntelCategory } from '@/types/index.ts';
import { CompanyCard } from './CompanyCard.tsx';

export function IntelOverview() {
  const {
    filteredCompanies, searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory, selectCompany,
  } = useIntelStore();

  return (
    <div className="space-y-4">
      {/* Suche + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Firma, Produkt oder Technologie suchen..."
            className="w-full pl-9 pr-3 py-2 bg-bg-card border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as IntelCategory | 'all')}
          className="px-3 py-2 bg-bg-card border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent"
        >
          <option value="all">Alle Kategorien</option>
          {INTEL_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Ergebnis-Zahler */}
      <p className="text-xs text-text-muted">
        {filteredCompanies.length} {filteredCompanies.length === 1 ? 'Unternehmen' : 'Unternehmen'} gefunden
      </p>

      {/* Company-Liste */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredCompanies.map((c) => (
          <CompanyCard key={c.id} company={c} onClick={() => selectCompany(c.id)} />
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12 text-text-muted">
          <p className="text-sm">Keine Unternehmen gefunden.</p>
          <p className="text-xs mt-1">Versuche einen anderen Suchbegriff oder Kategorie.</p>
        </div>
      )}
    </div>
  );
}
