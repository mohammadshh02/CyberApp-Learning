import { Menu, Crosshair } from 'lucide-react';
import { useAppStore } from '@/stores/app-store.ts';
import { useProgressStore } from '@/stores/progress-store.ts';
import { getLevelInfo } from '@/lib/xp-engine.ts';
import { formatXp } from '@/lib/utils.ts';

const VIEW_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  today: 'Heute',
  calendar: 'Kalender',
  curriculum: 'Curriculum',
  glossary: 'Glossar',
  intel: 'Wissensdatenbank',
  achievements: 'Achievements',
  settings: 'Einstellungen',
};

export function Header() {
  const { activeView, setMobileMenuOpen } = useAppStore();
  const { totalXp, currentStreak } = useProgressStore();
  const levelInfo = getLevelInfo(totalXp);

  return (
    <header className="md:hidden sticky top-0 z-30 bg-bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileMenuOpen(true)} className="p-1">
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <Crosshair size={18} className="text-accent" />
            <h1 className="text-sm font-bold">{VIEW_TITLES[activeView]}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          {currentStreak > 0 && (
            <span className="text-streak font-bold">{currentStreak}d</span>
          )}
          <span className="text-xp font-bold">LVL {levelInfo.level}</span>
          <span className="text-text-muted">{formatXp(totalXp)} XP</span>
        </div>
      </div>
    </header>
  );
}
