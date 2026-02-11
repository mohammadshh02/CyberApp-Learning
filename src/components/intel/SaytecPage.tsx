import {
  ArrowLeft, Plus, ExternalLink, Pencil, Trash2, FileText, Link as LinkIcon,
} from 'lucide-react';
import { useIntelStore } from '@/stores/intel-store.ts';
import { COMPANIES } from '@/data/companies.ts';
import { AddNoteModal } from './AddNoteModal.tsx';
import { AddDocRefModal } from './AddDocRefModal.tsx';

const saytec = COMPANIES.find((c) => c.isFeatured)!;

export function SaytecPage() {
  const {
    setViewMode, getNotesForCompany, getDocRefsForCompany,
    setNoteModalOpen, setDocRefModalOpen, setEditingNote,
    deleteNote, deleteDocRef,
  } = useIntelStore();

  const notes = getNotesForCompany(saytec.id);
  const docRefs = getDocRefsForCompany(saytec.id);

  return (
    <div className="space-y-6">
      {/* Zuruck-Button */}
      <button
        onClick={() => setViewMode('overview')}
        className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
      >
        <ArrowLeft size={16} /> Zuruck zur Ubersicht
      </button>

      {/* Header */}
      <div className="bg-bg-card border border-accent/30 rounded-xl p-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold">{saytec.name}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-text-muted">
              <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{saytec.category}</span>
              <span>{saytec.country}</span>
              {saytec.founded && <span>Gegr. {saytec.founded}</span>}
            </div>
          </div>
          {saytec.website && (
            <a
              href={saytec.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-accent hover:underline shrink-0"
            >
              Website <ExternalLink size={12} />
            </a>
          )}
        </div>
        <p className="text-sm text-text-muted mt-3 leading-relaxed">{saytec.description}</p>
      </div>

      {/* Produkte */}
      <div>
        <h3 className="text-sm font-bold mb-3">Produkte</h3>
        <div className="space-y-3">
          {saytec.products.map((p, i) => (
            <div key={i} className="bg-bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold">{p.name}</span>
                {p.type && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent">{p.type}</span>
                )}
              </div>
              <p className="text-xs text-text-muted leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technologien */}
      <div>
        <h3 className="text-sm font-bold mb-3">Technologien & Konzepte</h3>
        <div className="flex flex-wrap gap-2">
          {saytec.technologies.map((t, i) => (
            <span key={i} className="px-3 py-1.5 text-xs rounded-lg bg-bg-card border border-border font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Infrastruktur */}
      <div>
        <h3 className="text-sm font-bold mb-3">Infrastruktur</h3>
        <div className="bg-bg-card border border-border rounded-xl p-4">
          <span className="text-xs font-bold text-accent">{saytec.infrastructureType}</span>
          <p className="text-xs text-text-muted mt-2 leading-relaxed">{saytec.infrastructureNotes}</p>
        </div>
      </div>

      {/* Warum wichtig */}
      <div>
        <h3 className="text-sm font-bold mb-3">Warum wichtig?</h3>
        <div className="bg-bg-card border border-accent/20 rounded-xl p-4">
          <p className="text-sm text-text-muted leading-relaxed italic">{saytec.whyItMatters}</p>
        </div>
      </div>

      {/* Notizen */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold">Notizen ({notes.length})</h3>
          <button
            onClick={() => setNoteModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
          >
            <Plus size={14} /> Neue Notiz
          </button>
        </div>
        {notes.length === 0 ? (
          <p className="text-xs text-text-muted bg-bg-card border border-border rounded-xl p-4 text-center">
            Noch keine Notizen. Klicke auf "Neue Notiz", um Wissen festzuhalten.
          </p>
        ) : (
          <div className="space-y-2">
            {notes.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map((note) => (
              <div key={note.id} className="bg-bg-card border border-border rounded-xl p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="text-sm font-medium truncate">{note.title}</h4>
                    <p className="text-xs text-text-muted mt-1 whitespace-pre-wrap">{note.content}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setEditingNote(note)}
                      className="p-1.5 rounded-lg hover:bg-bg-hover transition-colors text-text-muted hover:text-text"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-1.5 rounded-lg hover:bg-bg-hover transition-colors text-text-muted hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-text-muted mt-2">
                  {new Date(note.updatedAt).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dokument-Referenzen */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold">Dokumente ({docRefs.length})</h3>
          <button
            onClick={() => setDocRefModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
          >
            <Plus size={14} /> Neue Referenz
          </button>
        </div>
        {docRefs.length === 0 ? (
          <p className="text-xs text-text-muted bg-bg-card border border-border rounded-xl p-4 text-center">
            Noch keine Dokument-Referenzen. Speichere Links zu Whitepapers, Dokumentation etc.
          </p>
        ) : (
          <div className="space-y-2">
            {docRefs.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((doc) => (
              <div key={doc.id} className="bg-bg-card border border-border rounded-xl p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-accent shrink-0" />
                      <h4 className="text-sm font-medium truncate">{doc.title}</h4>
                    </div>
                    <p className="text-xs text-text-muted mt-1">{doc.description}</p>
                    {doc.filePath && (
                      <p className="text-[10px] text-text-muted mt-1 font-mono">{doc.filePath}</p>
                    )}
                    {doc.url && (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] text-accent hover:underline mt-1"
                      >
                        <LinkIcon size={10} /> {doc.url}
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => deleteDocRef(doc.id)}
                    className="p-1.5 rounded-lg hover:bg-bg-hover transition-colors text-text-muted hover:text-red-400 shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <AddNoteModal companyId={saytec.id} />
      <AddDocRefModal companyId={saytec.id} />
    </div>
  );
}
