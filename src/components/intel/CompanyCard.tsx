import { cn } from '@/lib/utils.ts';
import type { CompanyProfile } from '@/types/index.ts';

interface CompanyCardProps {
  company: CompanyProfile;
  onClick: () => void;
}

export function CompanyCard({ company, onClick }: CompanyCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left bg-bg-card border rounded-xl p-4 transition-all hover:bg-bg-hover',
        company.isFeatured
          ? 'border-accent/50 ring-1 ring-accent/20'
          : 'border-border',
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-bold truncate">{company.name}</h3>
        <span className="text-xs shrink-0">{company.country}</span>
      </div>
      <span className="inline-block px-2 py-0.5 text-[10px] font-medium rounded-full bg-accent/10 text-accent mb-2">
        {company.category}
      </span>
      <p className="text-xs text-text-muted line-clamp-2">{company.description}</p>
      <div className="flex items-center gap-2 mt-3 text-[10px] text-text-muted">
        <span>{company.products.length} Produkte</span>
        <span>·</span>
        <span>{company.technologies.length} Technologien</span>
      </div>
    </button>
  );
}
