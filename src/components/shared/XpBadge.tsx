import { cn } from '@/lib/utils.ts';

interface XpBadgeProps {
  amount: number;
  className?: string;
  animated?: boolean;
}

export function XpBadge({ amount, className, animated }: XpBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold',
        'bg-xp/20 text-xp',
        animated && 'animate-xp-pop',
        className
      )}
    >
      +{amount} XP
    </span>
  );
}
