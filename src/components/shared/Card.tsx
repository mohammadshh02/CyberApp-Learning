import type { ReactNode } from 'react';
import { cn } from '@/lib/utils.ts';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className, onClick, hover }: CardProps) {
  return (
    <div
      className={cn(
        'bg-bg-card border border-border rounded-xl p-4',
        hover && 'hover:bg-bg-hover cursor-pointer transition-colors',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
