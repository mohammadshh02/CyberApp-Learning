import { FolderOpen, FolderPlus, Pencil, Trash2 } from 'lucide-react';
import { useNotesStore } from '@/stores/notes-store.ts';
import { cn } from '@/lib/utils.ts';

export function FolderSidebar() {
  const {
    folders, notes,
    selectedFolderId, setSelectedFolderId,
    setFolderModalOpen, setEditingFolder, deleteFolder,
    getNotesCountForFolder,
  } = useNotesStore();

  const allCount = notes.length;
  const noFolderCount = getNotesCountForFolder(null);

  const handleDeleteFolder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Ordner löschen? Notizen werden zu "Ohne Ordner" verschoben.')) {
      deleteFolder(id);
    }
  };

  const handleEditFolder = (folder: typeof folders[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingFolder(folder);
  };

  return (
    <div className="space-y-1">
      {/* All notes */}
      <button
        onClick={() => setSelectedFolderId('all')}
        className={cn(
          'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
          selectedFolderId === 'all'
            ? 'bg-accent/10 text-accent font-medium'
            : 'text-text-muted hover:bg-bg-hover hover:text-text'
        )}
      >
        <span className="flex items-center gap-2">
          <FolderOpen size={16} />
          Alle Notizen
        </span>
        <span className="text-xs opacity-60">{allCount}</span>
      </button>

      {/* No folder */}
      <button
        onClick={() => setSelectedFolderId('none')}
        className={cn(
          'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
          selectedFolderId === 'none'
            ? 'bg-accent/10 text-accent font-medium'
            : 'text-text-muted hover:bg-bg-hover hover:text-text'
        )}
      >
        <span className="flex items-center gap-2">
          <FolderOpen size={16} />
          Ohne Ordner
        </span>
        <span className="text-xs opacity-60">{noFolderCount}</span>
      </button>

      {/* Divider */}
      {folders.length > 0 && <hr className="border-border my-2" />}

      {/* Folders */}
      {folders.map((folder) => (
        <div
          key={folder.id}
          onClick={() => setSelectedFolderId(folder.id)}
          className={cn(
            'group w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer',
            selectedFolderId === folder.id
              ? 'bg-accent/10 text-accent font-medium'
              : 'text-text-muted hover:bg-bg-hover hover:text-text'
          )}
        >
          <span className="flex items-center gap-2 min-w-0">
            <span
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ backgroundColor: folder.color ?? '#64748b' }}
            />
            <span className="truncate">{folder.name}</span>
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs opacity-60 mr-1">
              {getNotesCountForFolder(folder.id)}
            </span>
            <button
              onClick={(e) => handleEditFolder(folder, e)}
              className="opacity-0 group-hover:opacity-60 hover:!opacity-100 p-0.5 transition-opacity"
            >
              <Pencil size={12} />
            </button>
            <button
              onClick={(e) => handleDeleteFolder(folder.id, e)}
              className="opacity-0 group-hover:opacity-60 hover:!opacity-100 p-0.5 text-red-400 transition-opacity"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      ))}

      {/* Add folder button */}
      <button
        onClick={() => setFolderModalOpen(true)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-muted hover:bg-bg-hover hover:text-text transition-colors"
      >
        <FolderPlus size={16} />
        Neuer Ordner
      </button>
    </div>
  );
}
