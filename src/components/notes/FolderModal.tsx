import { useState, useEffect } from 'react';
import { useNotesStore } from '@/stores/notes-store.ts';
import { Modal } from '@/components/shared/Modal.tsx';

const FOLDER_COLORS = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b',
  '#10b981', '#06b6d4', '#ef4444', '#64748b',
];

export function FolderModal() {
  const { folderModalOpen, setFolderModalOpen, editingFolder, addFolder, updateFolder } = useNotesStore();

  const [name, setName] = useState('');
  const [color, setColor] = useState(FOLDER_COLORS[0]);

  useEffect(() => {
    if (editingFolder) {
      setName(editingFolder.name);
      setColor(editingFolder.color ?? FOLDER_COLORS[0]);
    } else {
      setName('');
      setColor(FOLDER_COLORS[0]);
    }
  }, [editingFolder, folderModalOpen]);

  const handleSave = () => {
    if (!name.trim()) return;
    if (editingFolder) {
      updateFolder(editingFolder.id, name.trim(), color);
    } else {
      addFolder(name.trim(), color);
    }
  };

  return (
    <Modal
      open={folderModalOpen}
      onClose={() => setFolderModalOpen(false)}
      title={editingFolder ? 'Ordner umbenennen' : 'Neuer Ordner'}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z.B. CTF Notes, Recherche, Tools"
            className="w-full px-3 py-2 bg-bg-hover border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Farbe</label>
          <div className="flex gap-2">
            {FOLDER_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-lg transition-all ${color === c ? 'ring-2 ring-offset-2 ring-offset-bg-card ring-accent scale-110' : 'hover:scale-105'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setFolderModalOpen(false)}
            className="px-4 py-2 text-sm rounded-lg bg-bg-hover hover:bg-border transition-colors"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="px-4 py-2 text-sm rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editingFolder ? 'Speichern' : 'Erstellen'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
