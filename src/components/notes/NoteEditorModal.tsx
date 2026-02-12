import { useState, useEffect } from 'react';
import { useNotesStore } from '@/stores/notes-store.ts';
import { Modal } from '@/components/shared/Modal.tsx';

export function NoteEditorModal() {
  const { editorOpen, setEditorOpen, editingNote, folders, selectedFolderId, addNote, updateNote } = useNotesStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [folderId, setFolderId] = useState<string | ''>('');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setFolderId(editingNote.folderId ?? '');
      setTagsInput(editingNote.tags.join(', '));
    } else {
      setTitle('');
      setContent('');
      // Pre-select current folder if one is active
      const preselect = selectedFolderId !== 'all' && selectedFolderId !== 'none' ? selectedFolderId : '';
      setFolderId(preselect);
      setTagsInput('');
    }
  }, [editingNote, editorOpen, selectedFolderId]);

  const handleSave = () => {
    if (!title.trim()) return;
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    const folder = folderId || null;

    if (editingNote) {
      updateNote(editingNote.id, title.trim(), content, folder, tags);
    } else {
      addNote(title.trim(), content, folder, tags);
    }
  };

  return (
    <Modal
      open={editorOpen}
      onClose={() => setEditorOpen(false)}
      title={editingNote ? 'Notiz bearbeiten' : 'Neue Notiz'}
      className="max-w-2xl"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Titel</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z.B. Nmap Cheatsheet"
            className="w-full px-3 py-2 bg-bg-hover border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ordner</label>
          <select
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            className="w-full px-3 py-2 bg-bg-hover border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="">Ohne Ordner</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags (kommagetrennt)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="z.B. Tools, Netzwerk, Cheatsheet"
            className="w-full px-3 py-2 bg-bg-hover border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Inhalt (Markdown) — <span className="text-text-muted font-normal">{"[[Wiki Links]]"} werden automatisch verlinkt</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={"# Nmap Cheatsheet\n\nSiehe auch [[Wireshark Basics]]\n\n## Basic Scan\n```\nnmap -sV target\n```"}
            rows={14}
            className="w-full px-3 py-2 bg-bg-hover border border-border rounded-lg text-sm font-mono resize-y focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setEditorOpen(false)}
            className="px-4 py-2 text-sm rounded-lg bg-bg-hover hover:bg-border transition-colors"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="px-4 py-2 text-sm rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editingNote ? 'Speichern' : 'Erstellen'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
