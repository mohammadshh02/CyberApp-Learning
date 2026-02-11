import { useState } from 'react';
import { Modal } from '@/components/shared/Modal.tsx';
import { useGlossaryStore } from '@/stores/glossary-store.ts';
import { GLOSSARY_CATEGORIES } from '@/types/index.ts';
import type { GlossaryCategory } from '@/types/index.ts';

export function AddTermModal() {
  const { addModalOpen, setAddModalOpen, addCustomTerm } = useGlossaryStore();
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [category, setCategory] = useState<GlossaryCategory>('Allgemein');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim() || !definition.trim()) return;
    await addCustomTerm({ term: term.trim(), definition: definition.trim(), category });
    setTerm('');
    setDefinition('');
    setCategory('Allgemein');
    setAddModalOpen(false);
  };

  return (
    <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)} title="Neuen Begriff hinzufügen">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Begriff</label>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="z.B. Zero Trust"
            className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Definition</label>
          <textarea
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="Erklärung des Begriffs..."
            rows={4}
            className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent resize-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Kategorie</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as GlossaryCategory)}
            className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-text text-sm focus:outline-none focus:border-accent"
          >
            {GLOSSARY_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => setAddModalOpen(false)}
            className="flex-1 px-4 py-2 text-sm rounded-lg border border-border hover:bg-bg-hover transition-colors"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 text-sm rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
          >
            Hinzufügen
          </button>
        </div>
      </form>
    </Modal>
  );
}
