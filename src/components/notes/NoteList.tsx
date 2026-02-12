import { Search, Plus } from 'lucide-react';
import { useNotesStore } from '@/stores/notes-store.ts';
import { Card } from '@/components/shared/Card.tsx';
import { formatDate } from '@/lib/utils.ts';

export function NoteList() {
  const {
    folders, searchQuery, setSearchQuery,
    selectNote, setEditorOpen, getFilteredNotes,
  } = useNotesStore();

  const notes = getFilteredNotes();

  const getFolderName = (folderId: string | null) => {
    if (!folderId) return null;
    return folders.find((f) => f.id === folderId)?.name ?? null;
  };

  const getFolderColor = (folderId: string | null) => {
    if (!folderId) return undefined;
    return folders.find((f) => f.id === folderId)?.color;
  };

  return (
    <div className="space-y-4">
      {/* Search + Add */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Notizen durchsuchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-bg-hover border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <button
          onClick={() => setEditorOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors shrink-0"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Neue Notiz</span>
        </button>
      </div>

      {/* Notes */}
      {notes.length === 0 ? (
        <div className="text-center py-12 text-text-muted">
          <p className="text-lg mb-1">Keine Notizen gefunden</p>
          <p className="text-sm">Erstelle deine erste Notiz.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notes.map((note) => {
            const folderName = getFolderName(note.folderId);
            const folderColor = getFolderColor(note.folderId);
            return (
              <Card key={note.id} hover onClick={() => selectNote(note.id)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {folderName && (
                        <span className="flex items-center gap-1 text-xs text-text-muted">
                          <span
                            className="w-2 h-2 rounded-sm"
                            style={{ backgroundColor: folderColor ?? '#64748b' }}
                          />
                          {folderName}
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium truncate">{note.title}</h3>
                    <p className="text-sm text-text-muted line-clamp-2 mt-1">
                      {note.content.replace(/[#*\[\]`]/g, '').slice(0, 120)}
                    </p>
                    {note.tags.length > 0 && (
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {note.tags.map((tag) => (
                          <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-bg-hover text-text-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-text-muted whitespace-nowrap">
                    {formatDate(note.updatedAt)}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
