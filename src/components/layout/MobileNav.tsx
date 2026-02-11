import {
  LayoutDashboard, CalendarDays, BookOpen, Trophy, Sun, BookA, Database,
} from 'lucide-react';
import { useAppStore } from '@/stores/app-store.ts';
import { cn } from '@/lib/utils.ts';
import type { ViewId } from '@/types/index.ts';

const NAV_ITEMS: { id: ViewId; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Home', icon: <LayoutDashboard size={20} /> },
  { id: 'today', label: 'Heute', icon: <Sun size={20} /> },
  { id: 'calendar', label: 'Kalender', icon: <CalendarDays size={20} /> },
  { id: 'curriculum', label: 'Lernen', icon: <BookOpen size={20} /> },
  { id: 'glossary', label: 'Glossar', icon: <BookA size={20} /> },
  { id: 'intel', label: 'Intel', icon: <Database size={20} /> },
  { id: 'achievements', label: 'Badges', icon: <Trophy size={20} /> },
];

export function MobileNav() {
  const { activeView, setActiveView } = useAppStore();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={cn(
              'flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors min-w-0',
              activeView === item.id
                ? 'text-accent'
                : 'text-text-muted'
            )}
          >
            {item.icon}
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
