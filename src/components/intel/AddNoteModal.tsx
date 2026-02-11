import { useState, useEffect } from 'react';
import { Modal } from '@/components/shared/Modal.tsx';
import { useIntelStore } from '@/stores/intel-store.ts';

interface AddNoteModalProps {
  companyId: string;
}

export function AddNoteModal({ companyId }: AddNoteModalProps) {
  const { noteModalOpen, setNoteModalOpen, editingNote, addNote, updateNote } = useIntelStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNote, noteModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    if (editingNote) {
      await updateNote(editingNote.id, title.trim(), content.trim());
    } else {
      await addNote(companyId, title.trim(), content.trim());
    }
  };

  return (
    <Modal
      open={noteModalOpen}
      onClose={() => setNoteModalOpen(false)}
      title={editingNote ? 'Notiz bearbeiten' : 'Neue Notiz'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Titel</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z.B. VPSC-Protokoll Analyse"
            className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Inhalt</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Deine Notizen..."
            rows={6}
            className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent resize-none"
            required
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => setNoteModalOpen(false)}
            className="flex-1 px-4 py-2 text-sm rounded-lg border border-border hover:bg-bg-hover transition-colors"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 text-sm rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
          >
            {editingNote ? 'Speichern' : 'Hinzufugen'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
