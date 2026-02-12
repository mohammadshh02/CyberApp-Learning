import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { useNotesStore } from '@/stores/notes-store.ts';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer.tsx';
import { formatDate } from '@/lib/utils.ts';

export function NoteDetail() {
  const {
    notes, folders, selectedNoteId, selectNote,
    setEditingNote, deleteNote,
    resolveWikiLink, noteTitleExists,
  } = useNotesStore();

  const note = notes.find((n) => n.id === selectedNoteId);
  if (!note) return null;

  const folder = note.folderId ? folders.find((f) => f.id === note.folderId) : null;

  const handleDelete = () => {
    if (confirm('Notiz wirklich löschen?')) {
      deleteNote(note.id);
    }
  };

  const handleWikiLink = (title: string) => {
    const linked = resolveWikiLink(title);
    if (linked) {
      selectNote(linked.id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Back button + actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => selectNote(null)}
          className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
        >
          <ArrowLeft size={16} />
          Zurück
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditingNote(note)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-bg-hover hover:bg-border transition-colors"
          >
            <Pencil size={14} />
            Bearbeiten
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors"
          >
            <Trash2 size={14} />
            Löschen
          </button>
        </div>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          {folder && (
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <span
                className="w-2 h-2 rounded-sm"
                style={{ backgroundColor: folder.color ?? '#64748b' }}
              />
              {folder.name}
            </span>
          )}
          <span className="text-xs text-text-muted">{formatDate(note.updatedAt)}</span>
        </div>
        <h1 className="text-xl font-bold">{note.title}</h1>
        {note.tags.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {note.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-bg-hover text-text-muted">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="bg-bg-card border border-border rounded-xl p-6">
        <MarkdownRenderer
          content={note.content}
          onWikiLink={handleWikiLink}
          resolveWikiLink={noteTitleExists}
        />
      </div>
    </div>
  );
}
