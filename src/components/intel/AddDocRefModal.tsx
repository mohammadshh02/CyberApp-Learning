import { useState } from 'react';
import { Modal } from '@/components/shared/Modal.tsx';
import { useIntelStore } from '@/stores/intel-store.ts';

interface AddDocRefModalProps {
  companyId: string;
}

export function AddDocRefModal({ companyId }: AddDocRefModalProps) {
  const { docRefModalOpen, setDocRefModalOpen, addDocRef } = useIntelStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filePath, setFilePath] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    await addDocRef(
      companyId,
      title.trim(),
      description.trim(),
      filePath.trim() || undefined,
      url.trim() || undefined,
    );
    setTitle('');
    setDescription('');
    setFilePath('');
    setUrl('');
  };

  return (
    <Modal
      open={docRefModalOpen}
      onClose={() => setDocRefModalOpen(false)}
      title="Dokument-Referenz hinzufugen"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Titel</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z.B. sayTRUST Whitepaper"
            className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Beschreibung</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Worum geht es in dem Dokument?"
            rows={3}
            className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent resize-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dateipfad <span className="text-text-muted">(optional)</span></label>
          <input
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            placeholder="z.B. /docs/saytrust-whitepaper.pdf"
            className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">URL <span className="text-text-muted">(optional)</span></label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => setDocRefModalOpen(false)}
            className="flex-1 px-4 py-2 text-sm rounded-lg border border-border hover:bg-bg-hover transition-colors"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 text-sm rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
          >
            Hinzufugen
          </button>
        </div>
      </form>
    </Modal>
  );
}
