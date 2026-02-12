import type { DailyLog, AutoReportPeriod } from '@/types/index.ts';

interface ReportData {
  completedTaskIds: Set<string>;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  dailyLogs: DailyLog[];
  level: number;
  levelTitle: string;
}

function getWeekRange(): { start: string; end: string; label: string } {
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const fmt = (d: Date) => d.toISOString().split('T')[0];
  const fmtDE = (d: Date) => d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return {
    start: fmt(monday),
    end: fmt(sunday),
    label: `${fmtDE(monday)} - ${fmtDE(sunday)}`,
  };
}

function getMonthRange(): { start: string; end: string; label: string } {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const fmt = (d: Date) => d.toISOString().split('T')[0];
  const monthName = now.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });

  return {
    start: fmt(first),
    end: fmt(last),
    label: monthName,
  };
}

function getLogsInRange(logs: DailyLog[], start: string, end: string): DailyLog[] {
  return logs.filter((l) => l.date >= start && l.date <= end).sort((a, b) => a.date.localeCompare(b.date));
}

export function generateAutoReport(
  period: AutoReportPeriod,
  data: ReportData,
): { title: string; content: string; periodStart: string; periodEnd: string } {
  if (period === 'weekly') {
    return generateWeeklyReport(data);
  }
  return generateMonthlyReport(data);
}

function generateWeeklyReport(data: ReportData) {
  const range = getWeekRange();
  const logs = getLogsInRange(data.dailyLogs, range.start, range.end);

  const totalTasks = logs.reduce((s, l) => s + l.tasksCompleted, 0);
  const totalXp = logs.reduce((s, l) => s + l.xpEarned, 0);
  const activeDays = logs.length;

  let content = `# Wochenbericht\n\n`;
  content += `**Zeitraum:** ${range.label}\n\n`;
  content += `## Zusammenfassung\n\n`;
  content += `- **Aufgaben erledigt:** ${totalTasks}\n`;
  content += `- **XP verdient:** ${totalXp.toLocaleString('de-DE')}\n`;
  content += `- **Aktive Tage:** ${activeDays}/7\n`;
  content += `- **Aktueller Streak:** ${data.currentStreak} Tage\n\n`;

  if (logs.length > 0) {
    content += `## Tagesübersicht\n\n`;
    content += `| Datum | Aufgaben | XP |\n`;
    content += `|-------|----------|----|\n`;
    for (const log of logs) {
      const d = new Date(log.date).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });
      content += `| ${d} | ${log.tasksCompleted} | ${log.xpEarned} |\n`;
    }
    content += `\n`;
  }

  content += `## Status\n\n`;
  content += `- **Level:** ${data.level} (${data.levelTitle})\n`;
  content += `- **Gesamt-XP:** ${data.totalXp.toLocaleString('de-DE')}\n`;
  content += `- **Längster Streak:** ${data.longestStreak} Tage\n`;

  return {
    title: `Wochenbericht ${range.label}`,
    content,
    periodStart: range.start,
    periodEnd: range.end,
  };
}

function generateMonthlyReport(data: ReportData) {
  const range = getMonthRange();
  const logs = getLogsInRange(data.dailyLogs, range.start, range.end);

  const totalTasks = logs.reduce((s, l) => s + l.tasksCompleted, 0);
  const totalXp = logs.reduce((s, l) => s + l.xpEarned, 0);
  const activeDays = logs.length;
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

  let content = `# Monatsbericht\n\n`;
  content += `**Zeitraum:** ${range.label}\n\n`;
  content += `## KPIs\n\n`;
  content += `- **Aufgaben erledigt:** ${totalTasks}\n`;
  content += `- **XP verdient:** ${totalXp.toLocaleString('de-DE')}\n`;
  content += `- **Aktive Tage:** ${activeDays}/${daysInMonth}\n`;
  content += `- **Aktivitätsrate:** ${daysInMonth > 0 ? Math.round((activeDays / daysInMonth) * 100) : 0}%\n\n`;

  content += `## Level-Fortschritt\n\n`;
  content += `- **Aktuelles Level:** ${data.level} (${data.levelTitle})\n`;
  content += `- **Gesamt-XP:** ${data.totalXp.toLocaleString('de-DE')}\n`;
  content += `- **Gesamt erledigte Aufgaben:** ${data.completedTaskIds.size}\n\n`;

  content += `## Streak\n\n`;
  content += `- **Aktueller Streak:** ${data.currentStreak} Tage\n`;
  content += `- **Längster Streak:** ${data.longestStreak} Tage\n\n`;

  if (logs.length > 0) {
    content += `## Wochen-Übersicht\n\n`;

    // Group by week
    const weeks = new Map<number, DailyLog[]>();
    for (const log of logs) {
      const d = new Date(log.date);
      const weekStart = new Date(d);
      const day = d.getDay();
      weekStart.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
      const weekKey = Math.floor(weekStart.getTime() / 86400000);
      if (!weeks.has(weekKey)) weeks.set(weekKey, []);
      weeks.get(weekKey)!.push(log);
    }

    let weekNum = 1;
    for (const [, weekLogs] of weeks) {
      const wTasks = weekLogs.reduce((s, l) => s + l.tasksCompleted, 0);
      const wXp = weekLogs.reduce((s, l) => s + l.xpEarned, 0);
      content += `- **Woche ${weekNum}:** ${wTasks} Aufgaben, ${wXp} XP (${weekLogs.length} aktive Tage)\n`;
      weekNum++;
    }
  }

  return {
    title: `Monatsbericht ${range.label}`,
    content,
    periodStart: range.start,
    periodEnd: range.end,
  };
}
