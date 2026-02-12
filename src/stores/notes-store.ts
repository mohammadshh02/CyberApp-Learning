import { create } from 'zustand';
import { db } from '@/lib/db.ts';
import type { NoteFolder, WikiNote } from '@/types/index.ts';

interface NotesState {
  folders: NoteFolder[];
  notes: WikiNote[];
  searchQuery: string;
  selectedFolderId: string | 'all' | 'none';
  selectedNoteId: string | null;
  editorOpen: boolean;
  editingNote: WikiNote | null;
  folderModalOpen: boolean;
  editingFolder: NoteFolder | null;

  init: () => Promise<void>;
  // Folders
  addFolder: (name: string, color?: string) => Promise<void>;
  updateFolder: (id: string, name: string, color?: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
  setFolderModalOpen: (open: boolean) => void;
  setEditingFolder: (folder: NoteFolder | null) => void;
  // Notes
  addNote: (title: string, content: string, folderId: string | null, tags: string[]) => Promise<void>;
  updateNote: (id: string, title: string, content: string, folderId: string | null, tags: string[]) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  selectNote: (id: string | null) => void;
  setEditorOpen: (open: boolean) => void;
  setEditingNote: (note: WikiNote | null) => void;
  // Filtering
  setSearchQuery: (q: string) => void;
  setSelectedFolderId: (id: string | 'all' | 'none') => void;
  getFilteredNotes: () => WikiNote[];
  // Wiki link resolution
  resolveWikiLink: (title: string) => WikiNote | undefined;
  noteTitleExists: (title: string) => boolean;
  getNotesCountForFolder: (folderId: string | null) => number;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  folders: [],
  notes: [],
  searchQuery: '',
  selectedFolderId: 'all',
  selectedNoteId: null,
  editorOpen: false,
  editingNote: null,
  folderModalOpen: false,
  editingFolder: null,

  init: async () => {
    const [folders, notes] = await Promise.all([
      db.noteFolders.toArray(),
      db.wikiNotes.toArray(),
    ]);
    set({
      folders: folders.sort((a, b) => a.name.localeCompare(b.name, 'de')),
      notes: notes.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    });
  },

  // --- Folders ---
  addFolder: async (name, color) => {
    const now = new Date().toISOString();
    const folder: NoteFolder = {
      id: `folder_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name,
      color,
      createdAt: now,
      updatedAt: now,
    };
    await db.noteFolders.put(folder);
    const folders = [...get().folders, folder].sort((a, b) => a.name.localeCompare(b.name, 'de'));
    set({ folders, folderModalOpen: false, editingFolder: null });
  },

  updateFolder: async (id, name, color) => {
    const now = new Date().toISOString();
    const folders = get().folders.map((f) =>
      f.id === id ? { ...f, name, color, updatedAt: now } : f,
    );
    const updated = folders.find((f) => f.id === id);
    if (updated) await db.noteFolders.put(updated);
    set({
      folders: folders.sort((a, b) => a.name.localeCompare(b.name, 'de')),
      folderModalOpen: false,
      editingFolder: null,
    });
  },

  deleteFolder: async (id) => {
    // Move notes in this folder to "no folder"
    const notes = get().notes.map((n) =>
      n.folderId === id ? { ...n, folderId: null, updatedAt: new Date().toISOString() } : n,
    );
    for (const note of notes) {
      if (note.folderId === null) {
        await db.wikiNotes.put(note);
      }
    }
    await db.noteFolders.delete(id);
    set({
      folders: get().folders.filter((f) => f.id !== id),
      notes,
      selectedFolderId: get().selectedFolderId === id ? 'all' : get().selectedFolderId,
    });
  },

  setFolderModalOpen: (folderModalOpen) => {
    if (!folderModalOpen) set({ editingFolder: null });
    set({ folderModalOpen });
  },

  setEditingFolder: (editingFolder) => set({ editingFolder, folderModalOpen: !!editingFolder }),

  // --- Notes ---
  addNote: async (title, content, folderId, tags) => {
    const now = new Date().toISOString();
    const note: WikiNote = {
      id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      title,
      content,
      folderId,
      tags,
      createdAt: now,
      updatedAt: now,
    };
    await db.wikiNotes.put(note);
    set({
      notes: [note, ...get().notes],
      editorOpen: false,
      editingNote: null,
    });
  },

  updateNote: async (id, title, content, folderId, tags) => {
    const now = new Date().toISOString();
    const notes = get().notes.map((n) =>
      n.id === id ? { ...n, title, content, folderId, tags, updatedAt: now } : n,
    );
    const updated = notes.find((n) => n.id === id);
    if (updated) await db.wikiNotes.put(updated);
    set({ notes, editorOpen: false, editingNote: null });
  },

  deleteNote: async (id) => {
    await db.wikiNotes.delete(id);
    set({
      notes: get().notes.filter((n) => n.id !== id),
      selectedNoteId: get().selectedNoteId === id ? null : get().selectedNoteId,
    });
  },

  selectNote: (selectedNoteId) => set({ selectedNoteId }),
  setEditorOpen: (editorOpen) => {
    if (!editorOpen) set({ editingNote: null });
    set({ editorOpen });
  },
  setEditingNote: (editingNote) => set({ editingNote, editorOpen: !!editingNote }),

  // --- Filtering ---
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedFolderId: (selectedFolderId) => set({ selectedFolderId }),

  getFilteredNotes: () => {
    const { notes, searchQuery, selectedFolderId } = get();
    let result = notes;

    if (selectedFolderId === 'none') {
      result = result.filter((n) => n.folderId === null);
    } else if (selectedFolderId !== 'all') {
      result = result.filter((n) => n.folderId === selectedFolderId);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    return result;
  },

  // --- Wiki Links ---
  resolveWikiLink: (title) => {
    return get().notes.find((n) => n.title.toLowerCase() === title.toLowerCase());
  },

  noteTitleExists: (title) => {
    return get().notes.some((n) => n.title.toLowerCase() === title.toLowerCase());
  },

  getNotesCountForFolder: (folderId) => {
    if (folderId === null) {
      return get().notes.filter((n) => n.folderId === null).length;
    }
    return get().notes.filter((n) => n.folderId === folderId).length;
  },
}));
