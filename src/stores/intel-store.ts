import { create } from 'zustand';
import { db } from '@/lib/db.ts';
import { COMPANIES } from '@/data/companies.ts';
import type { CompanyProfile, IntelCategory, IntelNote, IntelDocRef, IntelViewMode } from '@/types/index.ts';

interface IntelState {
  companies: CompanyProfile[];
  filteredCompanies: CompanyProfile[];
  searchQuery: string;
  selectedCategory: IntelCategory | 'all';
  viewMode: IntelViewMode;
  selectedCompanyId: string | null;
  notes: IntelNote[];
  docRefs: IntelDocRef[];
  noteModalOpen: boolean;
  docRefModalOpen: boolean;
  editingNote: IntelNote | null;

  init: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: IntelCategory | 'all') => void;
  setViewMode: (mode: IntelViewMode) => void;
  selectCompany: (id: string | null) => void;
  openSaytecPage: () => void;
  setNoteModalOpen: (open: boolean) => void;
  setDocRefModalOpen: (open: boolean) => void;
  setEditingNote: (note: IntelNote | null) => void;
  addNote: (companyId: string, title: string, content: string) => Promise<void>;
  updateNote: (id: string, title: string, content: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  addDocRef: (companyId: string, title: string, description: string, filePath?: string, url?: string) => Promise<void>;
  deleteDocRef: (id: string) => Promise<void>;
  getNotesForCompany: (companyId: string) => IntelNote[];
  getDocRefsForCompany: (companyId: string) => IntelDocRef[];
}

function filterAndSort(
  companies: CompanyProfile[],
  query: string,
  category: IntelCategory | 'all',
): CompanyProfile[] {
  let result = companies;
  if (category !== 'all') {
    result = result.filter((c) => c.category === category);
  }
  if (query.trim()) {
    const q = query.toLowerCase().trim();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.products.some((p) => p.name.toLowerCase().includes(q)) ||
        c.technologies.some((t) => t.toLowerCase().includes(q)),
    );
  }
  return result.sort((a, b) => a.name.localeCompare(b.name, 'de'));
}

export const useIntelStore = create<IntelState>((set, get) => ({
  companies: COMPANIES,
  filteredCompanies: filterAndSort(COMPANIES, '', 'all'),
  searchQuery: '',
  selectedCategory: 'all',
  viewMode: 'overview',
  selectedCompanyId: null,
  notes: [],
  docRefs: [],
  noteModalOpen: false,
  docRefModalOpen: false,
  editingNote: null,

  init: async () => {
    const notes = await db.intelNotes.toArray();
    const docRefs = await db.intelDocRefs.toArray();
    set({ notes, docRefs });
  },

  setSearchQuery: (searchQuery) => {
    const { companies, selectedCategory } = get();
    set({ searchQuery, filteredCompanies: filterAndSort(companies, searchQuery, selectedCategory) });
  },

  setSelectedCategory: (selectedCategory) => {
    const { companies, searchQuery } = get();
    set({ selectedCategory, filteredCompanies: filterAndSort(companies, searchQuery, selectedCategory) });
  },

  setViewMode: (viewMode) => set({ viewMode }),

  selectCompany: (selectedCompanyId) => set({ selectedCompanyId }),

  openSaytecPage: () => set({ viewMode: 'saytec', selectedCompanyId: null }),

  setNoteModalOpen: (noteModalOpen) => {
    if (!noteModalOpen) set({ editingNote: null });
    set({ noteModalOpen });
  },

  setDocRefModalOpen: (docRefModalOpen) => set({ docRefModalOpen }),

  setEditingNote: (editingNote) => set({ editingNote, noteModalOpen: !!editingNote }),

  addNote: async (companyId, title, content) => {
    const now = new Date().toISOString();
    const note: IntelNote = {
      id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      companyId,
      title,
      content,
      createdAt: now,
      updatedAt: now,
    };
    await db.intelNotes.put(note);
    set({ notes: [...get().notes, note], noteModalOpen: false, editingNote: null });
  },

  updateNote: async (id, title, content) => {
    const now = new Date().toISOString();
    const notes = get().notes.map((n) =>
      n.id === id ? { ...n, title, content, updatedAt: now } : n,
    );
    const updated = notes.find((n) => n.id === id);
    if (updated) await db.intelNotes.put(updated);
    set({ notes, noteModalOpen: false, editingNote: null });
  },

  deleteNote: async (id) => {
    await db.intelNotes.delete(id);
    set({ notes: get().notes.filter((n) => n.id !== id) });
  },

  addDocRef: async (companyId, title, description, filePath, url) => {
    const ref: IntelDocRef = {
      id: `doc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      companyId,
      title,
      description,
      filePath,
      url,
      createdAt: new Date().toISOString(),
    };
    await db.intelDocRefs.put(ref);
    set({ docRefs: [...get().docRefs, ref], docRefModalOpen: false });
  },

  deleteDocRef: async (id) => {
    await db.intelDocRefs.delete(id);
    set({ docRefs: get().docRefs.filter((r) => r.id !== id) });
  },

  getNotesForCompany: (companyId) => get().notes.filter((n) => n.companyId === companyId),

  getDocRefsForCompany: (companyId) => get().docRefs.filter((r) => r.companyId === companyId),
}));
