import { NotebookPen } from 'lucide-react';
import { useNotesStore } from '@/stores/notes-store.ts';
import { FolderSidebar } from './FolderSidebar.tsx';
import { NoteList } from './NoteList.tsx';
import { NoteDetail } from './NoteDetail.tsx';
import { NoteEditorModal } from './NoteEditorModal.tsx';
import { FolderModal } from './FolderModal.tsx';

export function NotesView() {
  const { selectedNoteId, folders, selectedFolderId, setSelectedFolderId } = useNotesStore();

  if (selectedNoteId) {
    return (
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <NoteDetail />
        <NoteEditorModal />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <NotebookPen size={24} className="text-accent" />
          Notizen
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Wiki-artige Notizen mit Ordnern, Tags und [[Wiki Links]]
        </p>
      </div>

      {/* Mobile folder select */}
      <div className="md:hidden">
        <select
          value={selectedFolderId}
          onChange={(e) => setSelectedFolderId(e.target.value)}
          className="w-full px-3 py-2 bg-bg-hover border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="all">Alle Notizen</option>
          <option value="none">Ohne Ordner</option>
          {folders.map((f) => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6">
        {/* Sidebar (desktop only) */}
        <div className="hidden md:block w-56 shrink-0">
          <div className="sticky top-6">
            <FolderSidebar />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <NoteList />
        </div>
      </div>

      {/* Modals */}
      <NoteEditorModal />
      <FolderModal />
    </div>
  );
}
