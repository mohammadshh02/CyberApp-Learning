import {
  Swords, Flame, Trophy, Medal, Zap, Shield, ShieldCheck, ShieldAlert,
  Crown, TrendingUp, Star, Sparkles, Search, Bug, Microscope, Code,
  BookOpen, Award, Moon, Calendar, Wrench,
} from 'lucide-react';
import { useProgressStore } from '@/stores/progress-store.ts';
import { getLevelInfo } from '@/lib/xp-engine.ts';
import { formatXp } from '@/lib/utils.ts';
import { cn } from '@/lib/utils.ts';
import { Card } from '@/components/shared/Card.tsx';
import { ProgressBar } from '@/components/shared/ProgressBar.tsx';
import { BADGES } from '@/lib/badge-engine.ts';
import type { BadgeCategory } from '@/types/index.ts';

const ICON_MAP: Record<string, React.ReactNode> = {
  Swords: <Swords size={24} />,
  Flame: <Flame size={24} />,
  Trophy: <Trophy size={24} />,
  Medal: <Medal size={24} />,
  Zap: <Zap size={24} />,
  Shield: <Shield size={24} />,
  ShieldCheck: <ShieldCheck size={24} />,
  ShieldAlert: <ShieldAlert size={24} />,
  Crown: <Crown size={24} />,
  TrendingUp: <TrendingUp size={24} />,
  Star: <Star size={24} />,
  Sparkles: <Sparkles size={24} />,
  Search: <Search size={24} />,
  Bug: <Bug size={24} />,
  Microscope: <Microscope size={24} />,
  Code: <Code size={24} />,
  BookOpen: <BookOpen size={24} />,
  Award: <Award size={24} />,
  Moon: <Moon size={24} />,
  Calendar: <Calendar size={24} />,
  Wrench: <Wrench size={24} />,
};

const CATEGORY_LABELS: Record<BadgeCategory, string> = {
  milestone: 'Meilensteine',
  streak: 'Streaks',
  skill: 'Skills',
  certification: 'Zertifizierungen',
  special: 'Spezial',
};

const CATEGORY_COLORS: Record<BadgeCategory, string> = {
  milestone: 'text-accent',
  streak: 'text-streak',
  skill: 'text-success',
  certification: 'text-warning',
  special: 'text-xp',
};

export function AchievementsView() {
  const { totalXp, currentStreak, longestStreak, unlockedBadgeIds, stats } = useProgressStore();
  const levelInfo = getLevelInfo(totalXp);

  const categories = ['milestone', 'streak', 'skill', 'certification', 'special'] as BadgeCategory[];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Level Card */}
      <Card className="text-center py-8">
        <div className="text-6xl font-black text-xp mb-2">{levelInfo.level}</div>
        <div className="text-xl font-bold mb-1">{levelInfo.title}</div>
        <div className="text-sm text-text-muted mb-4">{formatXp(totalXp)} XP total</div>
        <div className="max-w-xs mx-auto">
          <ProgressBar value={levelInfo.xpRequired} max={levelInfo.xpForNext} color="var(--color-xp)" size="lg" showLabel />
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Tasks erledigt', value: stats.tasksCompleted, icon: <Zap size={16} className="text-accent" /> },
          { label: 'Streak (aktuell)', value: `${currentStreak}d`, icon: <Flame size={16} className="text-streak" /> },
          { label: 'Streak (longest)', value: `${longestStreak}d`, icon: <Flame size={16} className="text-warning" /> },
          { label: 'Badges', value: `${unlockedBadgeIds.length}/${BADGES.length}`, icon: <Trophy size={16} className="text-warning" /> },
          { label: 'Tage aktiv', value: stats.totalDaysActive, icon: <Calendar size={16} className="text-success" /> },
          { label: 'XP gesamt', value: formatXp(totalXp), icon: <Sparkles size={16} className="text-xp" /> },
        ].map((stat, i) => (
          <Card key={i}>
            <div className="flex items-center gap-2 mb-1">
              {stat.icon}
              <span className="text-xs text-text-muted">{stat.label}</span>
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Badge Grid by Category */}
      {categories.map((category) => {
        const badges = BADGES.filter(b => b.category === category);
        const unlocked = badges.filter(b => unlockedBadgeIds.includes(b.id));

        return (
          <Card key={category}>
            <h3 className={cn('text-sm font-medium mb-4 flex items-center gap-2', CATEGORY_COLORS[category])}>
              {CATEGORY_LABELS[category]}
              <span className="text-text-muted font-normal">{unlocked.length}/{badges.length}</span>
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {badges.map((badge) => {
                const isUnlocked = unlockedBadgeIds.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={cn(
                      'flex flex-col items-center text-center p-3 rounded-xl transition-all',
                      isUnlocked
                        ? 'bg-bg-hover'
                        : 'opacity-30 grayscale'
                    )}
                  >
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center mb-2',
                      isUnlocked ? CATEGORY_COLORS[category] : 'text-text-muted',
                      isUnlocked && 'bg-bg-card border border-border'
                    )}>
                      {ICON_MAP[badge.icon] || <Trophy size={24} />}
                    </div>
                    <div className="text-xs font-medium">{badge.name}</div>
                    <div className="text-[10px] text-text-muted mt-0.5 line-clamp-2">{badge.description}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
