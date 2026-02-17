import { useEffect } from 'react';
import { useAppStore } from './stores/app-store.ts';
import { useProgressStore } from './stores/progress-store.ts';
import { useScheduleStore } from './stores/schedule-store.ts';
import { useSettingsStore } from './stores/settings-store.ts';
import { useDailyPlannerStore } from './stores/daily-planner-store.ts';
import { useGlossaryStore } from './stores/glossary-store.ts';
import { useIntelStore } from './stores/intel-store.ts';
import { useReportsStore } from './stores/reports-store.ts';
import { useNotesStore } from './stores/notes-store.ts';
import { AppShell } from './components/layout/AppShell.tsx';
import { Dashboard } from './components/dashboard/Dashboard.tsx';
import { TodayView } from './components/today/TodayView.tsx';
import { CalendarView } from './components/calendar/CalendarView.tsx';
import { CurriculumView } from './components/curriculum/CurriculumView.tsx';
import { GlossaryView } from './components/glossary/GlossaryView.tsx';
import { AchievementsView } from './components/achievements/AchievementsView.tsx';
import { IntelView } from './components/intel/IntelView.tsx';
import { ReportsView } from './components/reports/ReportsView.tsx';
import { NotesView } from './components/notes/NotesView.tsx';
import { SettingsView } from './components/settings/SettingsView.tsx';
import { VisionView } from './components/vision/VisionView.tsx';
import { NewsView } from './components/news/NewsView.tsx';
import { AiView } from './components/ai/AiView.tsx';

function App() {
  const { activeView } = useAppStore();
  const initProgress = useProgressStore((s) => s.init);
  const initSchedule = useScheduleStore((s) => s.init);
  const initSettings = useSettingsStore((s) => s.init);
  const initDailyPlanner = useDailyPlannerStore((s) => s.init);
  const initGlossary = useGlossaryStore((s) => s.init);
  const initIntel = useIntelStore((s) => s.init);
  const initReports = useReportsStore((s) => s.init);
  const initNotes = useNotesStore((s) => s.init);

  useEffect(() => {
    initSettings().then(() => {
      initDailyPlanner();
    });
    initProgress();
    initSchedule();
    initGlossary();
    initIntel();
    initReports();
    initNotes();
  }, [initSettings, initProgress, initSchedule, initDailyPlanner, initGlossary, initIntel, initReports, initNotes]);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'today': return <TodayView />;
      case 'calendar': return <CalendarView />;
      case 'curriculum': return <CurriculumView />;
      case 'glossary': return <GlossaryView />;
      case 'intel': return <IntelView />;
      case 'news': return <NewsView />;
      case 'ai': return <AiView />;
      case 'vision': return <VisionView />;
      case 'reports': return <ReportsView />;
      case 'notes': return <NotesView />;
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
