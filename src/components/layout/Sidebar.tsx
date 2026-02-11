import {
  LayoutDashboard, CalendarDays, BookOpen, Trophy, Settings, Sun,
  ChevronLeft, ChevronRight, Crosshair, BookA,
} from 'lucide-react';
import { useAppStore } from '@/stores/app-store.ts';
import { useProgressStore } from '@/stores/progress-store.ts';
import { getLevelInfo } from '@/lib/xp-engine.ts';
import { cn, formatXp } from '@/lib/utils.ts';
import { ProgressBar } from '@/components/shared/ProgressBar.tsx';
import type { ViewId } from '@/types/index.ts';

const NAV_ITEMS: { id: ViewId; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'today', label: 'Heute', icon: <Sun size={20} /> },
  { id: 'calendar', label: 'Kalender', icon: <CalendarDays size={20} /> },
  { id: 'curriculum', label: 'Curriculum', icon: <BookOpen size={20} /> },
  { id: 'glossary', label: 'Glossar', icon: <BookA size={20} /> },
  { id: 'achievements', label: 'Achievements', icon: <Trophy size={20} /> },
  { id: 'settings', label: 'Einstellungen', icon: <Settings size={20} /> },
];

export function Sidebar() {
  const { activeView, setActiveView, sidebarCollapsed, toggleSidebar } = useAppStore();
  const { totalXp, currentStreak } = useProgressStore();
  const levelInfo = getLevelInfo(totalXp);

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col bg-bg-card border-r border-border h-screen sticky top-0 transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
          <Crosshair size={18} className="text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="min-w-0">
            <h1 className="text-sm font-bold truncate">SOVEREIGN</h1>
            <p className="text-xs text-text-muted truncate">TRACKER</p>
          </div>
        )}
      </div>

      {/* Level info */}
      {!sidebarCollapsed && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-xp">LVL {levelInfo.level}</span>
            <span className="text-xs text-text-muted">{levelInfo.title}</span>
          </div>
          <ProgressBar value={levelInfo.xpRequired} max={levelInfo.xpForNext} color="var(--color-xp)" size="sm" />
          <div className="flex justify-between mt-2 text-xs text-text-muted">
            <span>{formatXp(totalXp)} XP</span>
            {currentStreak > 0 && <span className="text-streak">{currentStreak}d streak</span>}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
              activeView === item.id
                ? 'bg-accent/10 text-accent font-medium'
                : 'text-text-muted hover:bg-bg-hover hover:text-text'
            )}
          >
            {item.icon}
            {!sidebarCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={toggleSidebar}
        className="p-3 border-t border-border text-text-muted hover:text-text transition-colors"
      >
        {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
}
