import { useState, useEffect } from 'react';
import { useReportsStore } from '@/stores/reports-store.ts';
import { REPORT_CATEGORIES } from '@/types/index.ts';
import type { ReportCategory } from '@/types/index.ts';
import { Modal } from '@/components/shared/Modal.tsx';

export function ReportEditorModal() {
  const { editorOpen, setEditorOpen, editingReport, addCustomReport, updateReport } = useReportsStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<ReportCategory>('Sonstiges');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (editingReport) {
      setTitle(editingReport.title);
      setContent(editingReport.content);
      setCategory(editingReport.category ?? 'Sonstiges');
      setTagsInput(editingReport.tags.join(', '));
    } else {
      setTitle('');
      setContent('');
      setCategory('Sonstiges');
      setTagsInput('');
    }
  }, [editingReport, editorOpen]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingReport) {
      updateReport(editingReport.id, title.trim(), content, category, tags);
    } else {
      addCustomReport(title.trim(), content, category, tags);
    }
  };

  return (
    <Modal
      open={editorOpen}
      onClose={() => setEditorOpen(false)}
      title={editingReport ? 'Bericht bearbeiten' : 'Neuer Bericht'}
      className="max-w-2xl"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Titel</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z.B. CTF Write-Up: HackTheBox - Machine X"
            className="w-full px-3 py-2 bg-bg-hover border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Kategorie</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ReportCategory)}
            className="w-full px-3 py-2 bg-bg-hover border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          >
            {REPORT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags (kommagetrennt)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="z.B. HackTheBox, Web, SQLi"
            className="w-full px-3 py-2 bg-bg-hover border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Inhalt (Markdown)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="# Titel&#10;&#10;Beschreibe deinen Bericht hier...&#10;&#10;## Schritte&#10;- Schritt 1&#10;- Schritt 2"
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
            disabled={!title.trim() || !content.trim()}
            className="px-4 py-2 text-sm rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editingReport ? 'Speichern' : 'Erstellen'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
