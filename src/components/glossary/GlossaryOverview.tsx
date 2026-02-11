import { Search, Plus, ChevronDown, ChevronRight, Trash2, CheckCircle2 } from 'lucide-react';
import { useGlossaryStore } from '@/stores/glossary-store.ts';
import { GLOSSARY_CATEGORIES } from '@/types/index.ts';
import type { GlossaryCategory } from '@/types/index.ts';
import { cn } from '@/lib/utils.ts';

export function GlossaryOverview() {
  const {
    filteredTerms, searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    expandedTermId, setExpandedTermId,
    flashcardProgress, removeCustomTerm, setAddModalOpen,
  } = useGlossaryStore();

  return (
    <div className="space-y-4">
      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Begriff suchen..."
            className="w-full pl-9 pr-3 py-2 bg-bg-card border border-border rounded-lg text-sm text-text focus:outline-none focus:border-accent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as GlossaryCategory | 'all')}
          className="px-3 py-2 bg-bg-card border border-border rounded-lg text-sm text-text focus:outline-none focus:border-accent"
        >
          <option value="all">Alle Kategorien</option>
          {GLOSSARY_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
        >
          <Plus size={16} />
          Hinzufügen
        </button>
      </div>

      {/* Results count */}
      <p className="text-xs text-text-muted">
        {filteredTerms.length} {filteredTerms.length === 1 ? 'Begriff' : 'Begriffe'} gefunden
      </p>

      {/* Terms list */}
      <div className="space-y-2">
        {filteredTerms.map((entry) => {
          const isExpanded = expandedTermId === entry.id;
          const progress = flashcardProgress.get(entry.id);
          const isKnown = progress?.known === true;

          return (
            <div key={entry.id} className="bg-bg-card border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedTermId(isExpanded ? null : entry.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-bg-hover transition-colors"
              >
                {isExpanded ? <ChevronDown size={16} className="text-text-muted shrink-0" /> : <ChevronRight size={16} className="text-text-muted shrink-0" />}
                <span className="font-medium text-sm flex-1">{entry.term}</span>
                <div className="flex items-center gap-2 shrink-0">
                  {isKnown && <CheckCircle2 size={14} className="text-success" />}
                  {entry.isCustom && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-xp/20 text-xp font-medium">EIGENER</span>
                  )}
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/20 text-accent font-medium">
                    {entry.category}
                  </span>
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-3 border-t border-border">
                  <p className="text-sm text-text-muted pt-3 leading-relaxed">{entry.definition}</p>
                  {entry.isCustom && (
                    <button
                      onClick={() => removeCustomTerm(entry.id)}
                      className="mt-3 flex items-center gap-1 text-xs text-danger hover:text-danger/80 transition-colors"
                    >
                      <Trash2 size={12} /> Löschen
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {filteredTerms.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            <p className="text-sm">Keine Begriffe gefunden.</p>
            {searchQuery && <p className="text-xs mt-1">Versuche einen anderen Suchbegriff.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
