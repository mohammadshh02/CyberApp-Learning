import { useEffect } from 'react';
import { useAppStore } from './stores/app-store.ts';
import { useProgressStore } from './stores/progress-store.ts';
import { useScheduleStore } from './stores/schedule-store.ts';
import { useSettingsStore } from './stores/settings-store.ts';
import { AppShell } from './components/layout/AppShell.tsx';
import { Dashboard } from './components/dashboard/Dashboard.tsx';
import { TodayView } from './components/today/TodayView.tsx';
import { CalendarView } from './components/calendar/CalendarView.tsx';
import { CurriculumView } from './components/curriculum/CurriculumView.tsx';
import { AchievementsView } from './components/achievements/AchievementsView.tsx';
import { SettingsView } from './components/settings/SettingsView.tsx';

function App() {
  const { activeView } = useAppStore();
  const initProgress = useProgressStore((s) => s.init);
  const initSchedule = useScheduleStore((s) => s.init);
  const initSettings = useSettingsStore((s) => s.init);

  useEffect(() => {
    initSettings();
    initProgress();
    initSchedule();
  }, [initSettings, initProgress, initSchedule]);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'today': return <TodayView />;
      case 'calendar': return <CalendarView />;
      case 'curriculum': return <CurriculumView />;
      case 'achievements': return <AchievementsView />;
      case 'settings': return <SettingsView />;
      default: return <Dashboard />;
    }
  };

  return (
    <AppShell>
      {renderView()}
    </AppShell>
  );
}

export default App;
