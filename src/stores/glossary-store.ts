import { create } from 'zustand';
import { db } from '@/lib/db.ts';
import { GLOSSARY_ENTRIES } from '@/data/glossary.ts';
import type { GlossaryEntry, GlossaryCategory, GlossaryMode, FlashcardProgress } from '@/types/index.ts';

interface GlossaryState {
  allTerms: GlossaryEntry[];
  customTerms: GlossaryEntry[];
  flashcardProgress: Map<string, FlashcardProgress>;
  mode: GlossaryMode;
  searchQuery: string;
  selectedCategory: GlossaryCategory | 'all';
  expandedTermId: string | null;
  filteredTerms: GlossaryEntry[];

  // Flashcard state
  flashcardQueue: GlossaryEntry[];
  currentCardIndex: number;
  isFlipped: boolean;
  sessionKnown: number;
  sessionTotal: number;

  // Modal
  addModalOpen: boolean;

  // Actions
  init: () => Promise<void>;
  setMode: (mode: GlossaryMode) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: GlossaryCategory | 'all') => void;
  setExpandedTermId: (id: string | null) => void;
  setAddModalOpen: (open: boolean) => void;
  addCustomTerm: (term: Omit<GlossaryEntry, 'id' | 'isCustom'>) => Promise<void>;
  removeCustomTerm: (id: string) => Promise<void>;
  startFlashcards: (category: GlossaryCategory | 'all', onlyUnknown: boolean) => void;
  flipCard: () => void;
  markKnown: () => Promise<void>;
  markUnknown: () => Promise<void>;
  nextCard: () => void;
  getProgressForCategory: (cat: GlossaryCategory | 'all') => { total: number; known: number; reviewed: number };
}

function filterAndSort(terms: GlossaryEntry[], query: string, category: GlossaryCategory | 'all'): GlossaryEntry[] {
  let result = terms;
  if (category !== 'all') {
    result = result.filter((t) => t.category === category);
  }
  if (query.trim()) {
    const q = query.toLowerCase().trim();
    result = result.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    );
  }
  return result.sort((a, b) => a.term.localeCompare(b.term, 'de'));
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const useGlossaryStore = create<GlossaryState>((set, get) => ({
  allTerms: [],
  customTerms: [],
  flashcardProgress: new Map(),
  mode: 'overview',
  searchQuery: '',
  selectedCategory: 'all',
  expandedTermId: null,
  filteredTerms: [],
  flashcardQueue: [],
  currentCardIndex: 0,
  isFlipped: false,
  sessionKnown: 0,
  sessionTotal: 0,
  addModalOpen: false,

  init: async () => {
    const customTerms = await db.customGlossaryTerms.toArray();
    const progressArr = await db.flashcardProgress.toArray();
    const progressMap = new Map<string, FlashcardProgress>();
    for (const p of progressArr) {
      progressMap.set(p.termId, p);
    }
    const allTerms = [...GLOSSARY_ENTRIES, ...customTerms];
    set({
      customTerms,
      allTerms,
      flashcardProgress: progressMap,
      filteredTerms: filterAndSort(allTerms, '', 'all'),
    });
  },

  setMode: (mode) => set({
    mode,
    ...(mode === 'flashcards' ? { flashcardQueue: [], currentCardIndex: 0, isFlipped: false } : {}),
  }),

  setSearchQuery: (searchQuery) => {
    const { allTerms, selectedCategory } = get();
    set({ searchQuery, filteredTerms: filterAndSort(allTerms, searchQuery, selectedCategory) });
  },

  setSelectedCategory: (selectedCategory) => {
    const { allTerms, searchQuery } = get();
    set({ selectedCategory, filteredTerms: filterAndSort(allTerms, searchQuery, selectedCategory) });
  },

  setExpandedTermId: (expandedTermId) => set({ expandedTermId }),
  setAddModalOpen: (addModalOpen) => set({ addModalOpen }),

  addCustomTerm: async (termData) => {
    const id = `custom_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const entry: GlossaryEntry = { ...termData, id, isCustom: true };
    await db.customGlossaryTerms.put(entry);
    const { allTerms, searchQuery, selectedCategory } = get();
    const newAll = [...allTerms, entry];
    set({
      customTerms: [...get().customTerms, entry],
      allTerms: newAll,
      filteredTerms: filterAndSort(newAll, searchQuery, selectedCategory),
    });
  },

  removeCustomTerm: async (id) => {
    await db.customGlossaryTerms.delete(id);
    const { allTerms, searchQuery, selectedCategory } = get();
    const newAll = allTerms.filter((t) => t.id !== id);
    set({
      customTerms: get().customTerms.filter((t) => t.id !== id),
      allTerms: newAll,
      filteredTerms: filterAndSort(newAll, searchQuery, selectedCategory),
    });
  },

  startFlashcards: (category, onlyUnknown) => {
    const { allTerms, flashcardProgress } = get();
    let pool = category === 'all' ? allTerms : allTerms.filter((t) => t.category === category);
    if (onlyUnknown) {
      pool = pool.filter((t) => {
        const p = flashcardProgress.get(t.id);
        return !p || !p.known;
      });
    }
    const queue = shuffle(pool);
    set({
      flashcardQueue: queue,
      currentCardIndex: 0,
      isFlipped: false,
      sessionKnown: 0,
      sessionTotal: queue.length,
      mode: 'flashcards',
    });
  },

  flipCard: () => set({ isFlipped: !get().isFlipped }),

  markKnown: async () => {
    const { flashcardQueue, currentCardIndex, flashcardProgress } = get();
    const card = flashcardQueue[currentCardIndex];
    if (!card) return;

    const existing = flashcardProgress.get(card.id);
    const now = new Date().toISOString();
    const updated: FlashcardProgress = {
      ...(existing || { termId: card.id, reviewCount: 0, correctCount: 0 }),
      known: true,
      lastReviewedAt: now,
      reviewCount: (existing?.reviewCount || 0) + 1,
      correctCount: (existing?.correctCount || 0) + 1,
    };

    if (existing?.id) {
      await db.flashcardProgress.update(existing.id, updated);
    } else {
      const newId = await db.flashcardProgress.add(updated);
      updated.id = newId;
    }

    const newMap = new Map(flashcardProgress);
    newMap.set(card.id, updated);

    set({
      flashcardProgress: newMap,
      sessionKnown: get().sessionKnown + 1,
      isFlipped: false,
      currentCardIndex: currentCardIndex + 1,
    });
  },

  markUnknown: async () => {
    const { flashcardQueue, currentCardIndex, flashcardProgress } = get();
    const card = flashcardQueue[currentCardIndex];
    if (!card) return;

    const existing = flashcardProgress.get(card.id);
    const now = new Date().toISOString();
    const updated: FlashcardProgress = {
      ...(existing || { termId: card.id, reviewCount: 0, correctCount: 0 }),
      known: false,
      lastReviewedAt: now,
      reviewCount: (existing?.reviewCount || 0) + 1,
      correctCount: existing?.correctCount || 0,
    };

    if (existing?.id) {
      await db.flashcardProgress.update(existing.id, updated);
    } else {
      const newId = await db.flashcardProgress.add(updated);
      updated.id = newId;
    }

    const newMap = new Map(flashcardProgress);
    newMap.set(card.id, updated);

    set({
      flashcardProgress: newMap,
      isFlipped: false,
      currentCardIndex: currentCardIndex + 1,
    });
  },

  nextCard: () => {
    set({ isFlipped: false, currentCardIndex: get().currentCardIndex + 1 });
  },

  getProgressForCategory: (cat) => {
    const { allTerms, flashcardProgress } = get();
    const terms = cat === 'all' ? allTerms : allTerms.filter((t) => t.category === cat);
    let known = 0;
    let reviewed = 0;
    for (const t of terms) {
      const p = flashcardProgress.get(t.id);
      if (p) {
        reviewed++;
        if (p.known) known++;
      }
    }
    return { total: terms.length, known, reviewed };
  },
}));
