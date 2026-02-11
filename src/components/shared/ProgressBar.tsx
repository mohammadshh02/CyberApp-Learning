import { cn } from '@/lib/utils.ts';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ value, max, color, size = 'md', showLabel, className }: ProgressBarProps) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-text-muted mb-1">
          <span>{value} / {max}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className={cn('w-full bg-bg-hover rounded-full overflow-hidden', heights[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out')}
          style={{
            width: `${pct}%`,
            backgroundColor: color || 'var(--color-accent)',
          }}
        />
      </div>
    </div>
  );
}
