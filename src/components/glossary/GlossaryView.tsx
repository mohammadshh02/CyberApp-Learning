import { BookOpen, Layers } from 'lucide-react';
import { useGlossaryStore } from '@/stores/glossary-store.ts';
import { GLOSSARY_CATEGORIES } from '@/types/index.ts';
import { cn } from '@/lib/utils.ts';
import { GlossaryOverview } from './GlossaryOverview.tsx';
import { GlossaryFlashcards } from './GlossaryFlashcards.tsx';
import { AddTermModal } from './AddTermModal.tsx';

export function GlossaryView() {
  const { mode, setMode, getProgressForCategory } = useGlossaryStore();

  const overall = getProgressForCategory('all');

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">Glossar</h1>
        <p className="text-sm text-text-muted mt-1">
          {overall.total} Begriffe — {overall.known} gewusst, {overall.reviewed} gelernt
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('overview')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors',
            mode === 'overview'
              ? 'bg-accent text-white font-medium'
              : 'bg-bg-card border border-border text-text-muted hover:bg-bg-hover'
          )}
        >
          <BookOpen size={16} /> Übersicht
        </button>
        <button
          onClick={() => setMode('flashcards')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors',
            mode === 'flashcards'
              ? 'bg-accent text-white font-medium'
              : 'bg-bg-card border border-border text-text-muted hover:bg-bg-hover'
          )}
        >
          <Layers size={16} /> Karteikarten
        </button>
      </div>

      {/* Category progress grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {GLOSSARY_CATEGORIES.map((cat) => {
          const prog = getProgressForCategory(cat);
          const pct = prog.total > 0 ? Math.round((prog.known / prog.total) * 100) : 0;
          return (
            <div key={cat} className="bg-bg-card border border-border rounded-lg p-3">
              <p className="text-[11px] font-medium truncate">{cat}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-text-muted">{prog.known}/{prog.total}</span>
                <span className={cn(
                  'text-[10px] font-bold',
                  pct >= 80 ? 'text-success' : pct >= 40 ? 'text-warning' : 'text-text-muted'
                )}>
                  {pct}%
                </span>
              </div>
              <div className="mt-1 h-1 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: pct >= 80 ? 'var(--color-success)' : pct >= 40 ? 'var(--color-warning)' : 'var(--color-accent)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Active view */}
      {mode === 'overview' ? <GlossaryOverview /> : <GlossaryFlashcards />}

      {/* Add modal */}
      <AddTermModal />
    </div>
  );
}
