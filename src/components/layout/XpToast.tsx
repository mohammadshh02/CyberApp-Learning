import { useEffect } from 'react';
import { useProgressStore } from '@/stores/progress-store.ts';
import { Sparkles, Trophy } from 'lucide-react';

export function XpToast() {
  const { xpAnimation, levelUpAnimation, badgeAnimation, dismissXpAnimation, dismissLevelUp, dismissBadge } = useProgressStore();

  useEffect(() => {
    if (xpAnimation?.visible) {
      const timer = setTimeout(dismissXpAnimation, 2000);
      return () => clearTimeout(timer);
    }
  }, [xpAnimation, dismissXpAnimation]);

  useEffect(() => {
    if (levelUpAnimation?.visible) {
      const timer = setTimeout(dismissLevelUp, 4000);
      return () => clearTimeout(timer);
    }
  }, [levelUpAnimation, dismissLevelUp]);

  useEffect(() => {
    if (badgeAnimation?.visible) {
      const timer = setTimeout(dismissBadge, 3000);
      return () => clearTimeout(timer);
    }
  }, [badgeAnimation, dismissBadge]);

  return (
    <>
      {/* XP Toast */}
      {xpAnimation?.visible && (
        <div className="fixed top-4 right-4 z-50 animate-slide-up">
          <div className="bg-xp/20 border border-xp/30 rounded-xl px-4 py-2 flex items-center gap-2 backdrop-blur-lg">
            <Sparkles size={16} className="text-xp" />
            <span className="text-xp font-bold text-sm">+{xpAnimation.amount} XP</span>
          </div>
        </div>
      )}

      {/* Level Up Toast */}
      {levelUpAnimation?.visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="animate-xp-pop bg-bg-card border-2 border-xp rounded-2xl px-8 py-6 text-center shadow-2xl pointer-events-auto">
            <div className="text-4xl mb-2">LEVEL UP!</div>
            <div className="text-xp text-2xl font-bold mb-1">Level {levelUpAnimation.level}</div>
            <div className="text-text-muted text-sm">{levelUpAnimation.title}</div>
          </div>
        </div>
      )}

      {/* Badge Toast */}
      {badgeAnimation?.visible && (
        <div className="fixed top-4 right-4 z-50 animate-slide-up">
          <div className="bg-warning/20 border border-warning/30 rounded-xl px-4 py-3 flex items-center gap-3 backdrop-blur-lg">
            <Trophy size={20} className="text-warning" />
            <div>
              <div className="text-xs text-warning font-medium">Badge freigeschaltet!</div>
              <div className="text-sm font-bold">{badgeAnimation.name}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
