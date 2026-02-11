import { useState } from 'react';
import { Shuffle, RotateCcw, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { useGlossaryStore } from '@/stores/glossary-store.ts';
import { GLOSSARY_CATEGORIES } from '@/types/index.ts';
import type { GlossaryCategory } from '@/types/index.ts';
import { cn } from '@/lib/utils.ts';
import { ProgressBar } from '@/components/shared/ProgressBar.tsx';

export function GlossaryFlashcards() {
  const {
    flashcardQueue, currentCardIndex, isFlipped,
    sessionKnown, sessionTotal,
    flipCard, markKnown, markUnknown, startFlashcards, setMode,
  } = useGlossaryStore();

  const [filterCat, setFilterCat] = useState<GlossaryCategory | 'all'>('all');
  const [onlyUnknown, setOnlyUnknown] = useState(false);

  const currentCard = flashcardQueue[currentCardIndex];
  const isSessionDone = flashcardQueue.length > 0 && currentCardIndex >= flashcardQueue.length;
  const hasQueue = flashcardQueue.length > 0;

  // Not started yet
  if (!hasQueue) {
    return (
      <div className="space-y-6">
        <div className="bg-bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-sm">Karteikarten konfigurieren</h3>
          <div>
            <label className="block text-xs text-text-muted mb-1">Kategorie</label>
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value as GlossaryCategory | 'all')}
              className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-sm text-text focus:outline-none focus:border-accent"
            >
              <option value="all">Alle Kategorien</option>
              {GLOSSARY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyUnknown}
              onChange={(e) => setOnlyUnknown(e.target.checked)}
              className="rounded accent-accent"
            />
            <span className="text-sm">Nur unbekannte Begriffe</span>
          </label>
          <button
            onClick={() => startFlashcards(filterCat, onlyUnknown)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
          >
            <Shuffle size={18} /> Starten
          </button>
        </div>
      </div>
    );
  }

  // Session done
  if (isSessionDone) {
    const pct = sessionTotal > 0 ? Math.round((sessionKnown / sessionTotal) * 100) : 0;
    return (
      <div className="space-y-6">
        <div className="bg-bg-card border border-border rounded-xl p-6 text-center space-y-4">
          <div className="text-4xl">
            {pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📚'}
          </div>
          <h3 className="font-bold text-lg">Session beendet!</h3>
          <div className="space-y-2">
            <p className="text-sm text-text-muted">
              <span className="text-success font-bold">{sessionKnown}</span> von{' '}
              <span className="font-bold">{sessionTotal}</span> Begriffen gewusst ({pct}%)
            </p>
            <ProgressBar value={sessionKnown} max={sessionTotal} color="var(--color-success)" size="md" />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => startFlashcards(filterCat, onlyUnknown)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
            >
              <RotateCcw size={16} /> Nochmal
            </button>
            <button
              onClick={() => setMode('overview')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-border text-sm rounded-lg hover:bg-bg-hover transition-colors"
            >
              <ArrowLeft size={16} /> Übersicht
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active card
  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>Karte {currentCardIndex + 1} von {sessionTotal}</span>
          <span className="text-success">{sessionKnown} gewusst</span>
        </div>
        <ProgressBar value={currentCardIndex} max={sessionTotal} color="var(--color-accent)" size="sm" />
      </div>

      {/* Flip card */}
      <div
        className={cn('flashcard-container cursor-pointer', isFlipped && 'flipped')}
        onClick={flipCard}
      >
        <div className="flashcard-inner min-h-[260px]">
          {/* Front */}
          <div className="flashcard-front bg-bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center min-h-[260px]">
            <span className="text-[10px] px-2 py-0.5 rounded bg-accent/20 text-accent font-medium mb-4">
              {currentCard.category}
            </span>
            <h2 className="text-2xl font-bold text-center">{currentCard.term}</h2>
            <p className="text-xs text-text-muted mt-4">Tippe zum Umdrehen</p>
          </div>
          {/* Back */}
          <div className="flashcard-back bg-bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center min-h-[260px]">
            <span className="text-[10px] px-2 py-0.5 rounded bg-accent/20 text-accent font-medium mb-4">
              {currentCard.category}
            </span>
            <h3 className="text-sm font-bold mb-3">{currentCard.term}</h3>
            <p className="text-sm text-text-muted text-center leading-relaxed">{currentCard.definition}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      {isFlipped && (
        <div className="flex gap-3 animate-slide-up">
          <button
            onClick={markUnknown}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-danger/10 border border-danger/30 text-danger text-sm font-medium rounded-lg hover:bg-danger/20 transition-colors"
          >
            <XCircle size={18} /> Nicht gewusst
          </button>
          <button
            onClick={markKnown}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-success/10 border border-success/30 text-success text-sm font-medium rounded-lg hover:bg-success/20 transition-colors"
          >
            <CheckCircle2 size={18} /> Gewusst
          </button>
        </div>
      )}
    </div>
  );
}
