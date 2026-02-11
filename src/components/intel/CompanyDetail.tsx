import { ExternalLink, ArrowRight } from 'lucide-react';
import { Modal } from '@/components/shared/Modal.tsx';
import { useIntelStore } from '@/stores/intel-store.ts';

export function CompanyDetail() {
  const { companies, selectedCompanyId, selectCompany, openSaytecPage } = useIntelStore();
  const company = companies.find((c) => c.id === selectedCompanyId);

  if (!company) return null;

  return (
    <Modal open={!!selectedCompanyId} onClose={() => selectCompany(null)} title={company.name}>
      <div className="space-y-5">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{company.category}</span>
          <span className="text-text-muted">{company.country}</span>
          {company.founded && <span className="text-text-muted">Gegr. {company.founded}</span>}
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:underline"
            >
              Website <ExternalLink size={12} />
            </a>
          )}
        </div>

        {/* Beschreibung */}
        <p className="text-sm text-text-muted leading-relaxed">{company.description}</p>

        {/* Produkte */}
        <div>
          <h3 className="text-sm font-bold mb-2">Produkte</h3>
          <div className="space-y-2">
            {company.products.map((p, i) => (
              <div key={i} className="bg-bg rounded-lg p-3 border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{p.name}</span>
                  {p.type && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg-hover text-text-muted">{p.type}</span>
                  )}
                </div>
                <p className="text-xs text-text-muted">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologien */}
        <div>
          <h3 className="text-sm font-bold mb-2">Technologien</h3>
          <div className="flex flex-wrap gap-1.5">
            {company.technologies.map((t, i) => (
              <span key={i} className="px-2 py-1 text-[11px] rounded-lg bg-bg border border-border">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Infrastruktur */}
        <div>
          <h3 className="text-sm font-bold mb-2">Infrastruktur</h3>
          <div className="bg-bg rounded-lg p-3 border border-border">
            <span className="text-xs font-medium text-accent">{company.infrastructureType}</span>
            <p className="text-xs text-text-muted mt-1">{company.infrastructureNotes}</p>
          </div>
        </div>

        {/* Warum wichtig */}
        <div>
          <h3 className="text-sm font-bold mb-2">Warum wichtig?</h3>
          <p className="text-sm text-text-muted leading-relaxed italic">{company.whyItMatters}</p>
        </div>

        {/* SAYTEC Button */}
        {company.isFeatured && (
          <button
            onClick={() => {
              selectCompany(null);
              openSaytecPage();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-colors"
          >
            Details ansehen <ArrowRight size={16} />
          </button>
        )}
      </div>
    </Modal>
  );
}
