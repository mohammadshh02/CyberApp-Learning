import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== TYPES =====
interface Phase {
  id: number;
  name: string;
  codename: string;
  months: number[];
  color: string;
  description: string;
}

interface GoalItem { id: string; text: string; monthId: number; }
interface KPIItem { id: string; name: string; target: string; monthId: number; }
interface ToolItem { id: string; name: string; setup: string; priority: string; month: number; description: string; }
interface CodeBlock { id: string; language: string; code: string; context: string; monthId: number; }
interface BookItem { id: string; title: string; author: string; month: string; reason: string; category: string; }
interface CertificationItem { id: string; name: string; abbreviation: string; month: number; cost: string; reason: string; }

interface TimeBlock { id: string; time: string; category: string; title: string; tasks: TaskItem[]; }
interface CurriculumDay { id: string; dayNumber: number; title: string; timeBlocks: TimeBlock[]; }
interface CurriculumWeek { id: string; weekNumber: number; title: string; days: CurriculumDay[]; goals: string[]; }

interface TaskItem {
  id: string; text: string; type: string; monthId: number;
  weekId?: string; dayId?: string; isCheckbox: boolean;
}

interface CurriculumMonth {
  id: number; monthRange: string; title: string; phase: number;
  strategy: string; goals: GoalItem[]; weeks: CurriculumWeek[];
  kpis: KPIItem[]; tools: ToolItem[]; codeBlocks: CodeBlock[];
  rawContent: string;
}

// ===== HELPERS =====
let idCounter = 0;
function genId(prefix: string): string {
  return `${prefix}_${++idCounter}`;
}

function getPhaseForMonth(m: number): number {
  if (m <= 3) return 1;
  if (m <= 6) return 2;
  if (m <= 9) return 3;
  if (m <= 12) return 4;
  if (m <= 18) return 5;
  if (m <= 24) return 6;
  return 7;
}

function getStrategy(m: number): string {
  if (m <= 3) return 'full_daily';
  if (m <= 12) return 'partial_daily';
  if (m <= 21) return 'weekly_only';
  if (m <= 24) return 'business';
  return 'topic_based';
}

function parseMonthRange(filename: string): { months: number[]; range: string } {
  const match = filename.match(/Monat_(\d+)(?:-(\d+))?\.md/);
  if (!match) return { months: [], range: '' };
  const start = parseInt(match[1]);
  const end = match[2] ? parseInt(match[2]) : start;
  const months: number[] = [];
  for (let i = start; i <= end; i++) months.push(i);
  return { months, range: match[2] ? `${start}-${end}` : `${start}` };
}

// ===== EXTRACTION =====

function extractGoals(content: string, monthId: number): GoalItem[] {
  const goals: GoalItem[] = [];
  const lines = content.split('\n');
  let inGoals = false;

  for (const line of lines) {
    if (line.match(/^##\s.*[Zz]iel/i) || line.match(/^##\s.*Monats-Ziel/i) || line.match(/^##\s.*DELIVERABLES/i)) {
      inGoals = true;
      continue;
    }
    if (inGoals && line.startsWith('##')) {
      inGoals = false;
      continue;
    }
    // Checkbox list items
    if (inGoals && line.match(/^-\s*\[[ x]\]/i)) {
      const text = line.replace(/^-\s*\[[ x]\]\s*/, '').trim();
      if (text) {
        goals.push({ id: genId('goal'), text, monthId });
      }
    }
    // Deliverables table rows with [ ]
    if (inGoals && line.startsWith('|') && line.includes('[ ]')) {
      const cells = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length >= 2) {
        const text = cells[1] || cells[0];
        if (text && !text.match(/^-+$/) && text !== 'Deliverable') {
          goals.push({ id: genId('goal'), text, monthId });
        }
      }
    }
  }
  return goals;
}

function extractKPIs(content: string, monthId: number): KPIItem[] {
  const kpis: KPIItem[] = [];
  const lines = content.split('\n');
  let inKPI = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/KPI/i) && (line.startsWith('#') || line.startsWith('|'))) {
      inKPI = true;
      continue;
    }
    if (inKPI && line.startsWith('|') && !line.match(/^[\|\s-]+$/)) {
      const cells = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length >= 2 && !cells[0].match(/^-+$/) && cells[0] !== 'KPI') {
        kpis.push({
          id: genId('kpi'),
          name: cells[0],
          target: cells[1],
          monthId,
        });
      }
    }
    if (inKPI && !line.startsWith('|') && line.trim() !== '') {
      if (!line.startsWith('#')) inKPI = false;
    }
  }
  return kpis;
}

function extractCodeBlocks(content: string, monthId: number): CodeBlock[] {
  const blocks: CodeBlock[] = [];
  const regex = /```(\w*)\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const lang = match[1] || 'text';
    const code = match[2].trim();
    // Find context: line before the code block
    const beforeIdx = content.lastIndexOf('\n', match.index - 1);
    const contextLine = beforeIdx >= 0
      ? content.substring(content.lastIndexOf('\n', beforeIdx - 1) + 1, beforeIdx).trim()
      : '';
    blocks.push({
      id: genId('code'),
      language: lang,
      code,
      context: contextLine,
      monthId,
    });
  }
  return blocks;
}

function extractTools(content: string, monthId: number): ToolItem[] {
  const tools: ToolItem[] = [];
  const lines = content.split('\n');
  let inTools = false;

  for (const line of lines) {
    if (line.match(/TOOLS|Setup-Checkliste/i) && line.startsWith('#')) {
      inTools = true;
      continue;
    }
    if (inTools && line.startsWith('#')) {
      inTools = false;
    }
    if (inTools && line.match(/^-\s*\[[ x]\]/)) {
      const text = line.replace(/^-\s*\[[ x]\]\s*/, '').trim();
      tools.push({
        id: genId('tool'),
        name: text.split('(')[0].split('`')[0].trim(),
        setup: text,
        priority: 'P1',
        month: monthId,
        description: text,
      });
    }
  }
  return tools;
}

function extractWeeksAndDays(content: string, monthId: number, strategy: string): CurriculumWeek[] {
  const weeks: CurriculumWeek[] = [];
  const lines = content.split('\n');

  if (strategy === 'full_daily' || strategy === 'partial_daily') {
    let currentWeek: CurriculumWeek | null = null;
    let currentDay: CurriculumDay | null = null;
    let currentBlock: TimeBlock | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Week header: ## WOCHE N or ### Woche N
      const weekMatch = line.match(/^#{2,3}\s+(?:WOCHE|Woche)\s+(\d+)/);
      if (weekMatch) {
        if (currentWeek) weeks.push(currentWeek);
        const weekNum = parseInt(weekMatch[1]);
        currentWeek = {
          id: `m${monthId}_w${weekNum}`,
          weekNumber: weekNum,
          title: line.replace(/^#+\s+/, '').trim(),
          days: [],
          goals: [],
        };
        currentDay = null;
        currentBlock = null;
        continue;
      }

      // Day header: ### Montag (Tag N) or **Montag:**
      const dayMatch = line.match(/^###\s+(Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)\s*\(Tag\s+(\d+)\)/);
      if (dayMatch && currentWeek) {
        const dayNum = parseInt(dayMatch[2]);
        currentDay = {
          id: `m${monthId}_d${dayNum}`,
          dayNumber: dayNum,
          title: dayMatch[1],
          timeBlocks: [],
        };
        currentWeek.days.push(currentDay);
        currentBlock = null;
        continue;
      }

      // Also check for ### Montag/Dienstag etc without Tag number
      const dayMatch2 = line.match(/^###\s+(Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)$/);
      if (dayMatch2 && currentWeek) {
        const dayNames = ['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'];
        const dayIdx = dayNames.indexOf(dayMatch2[1]);
        const dayNum = (currentWeek.weekNumber - 1) * 7 + dayIdx + 1;
        currentDay = {
          id: `m${monthId}_d${dayNum}`,
          dayNumber: dayNum,
          title: dayMatch2[1],
          timeBlocks: [],
        };
        currentWeek.days.push(currentDay);
        currentBlock = null;
        continue;
      }

      // Time block: **06:30–08:30 | DEEP TECHNICAL: ...**
      const blockMatch = line.match(/^\*\*(\d{2}:\d{2}[–-]\d{2}:\d{2})\s*\|\s*(.+?)(?::\s*(.+?))?\*\*/);
      if (blockMatch && currentDay) {
        currentBlock = {
          id: genId('tb'),
          time: blockMatch[1],
          category: blockMatch[2].trim(),
          title: blockMatch[3]?.trim() || blockMatch[2].trim(),
          tasks: [],
        };
        currentDay.timeBlocks.push(currentBlock);
        continue;
      }

      // Also handle **06:30–08:30** pattern without pipe
      const blockMatch2 = line.match(/^\*\*(\d{2}:\d{2}[–-]\d{2}:\d{2})\*\*\s*(.*)/);
      if (blockMatch2 && currentDay) {
        currentBlock = {
          id: genId('tb'),
          time: blockMatch2[1],
          category: '',
          title: blockMatch2[2].trim(),
          tasks: [],
        };
        currentDay.timeBlocks.push(currentBlock);
        continue;
      }

      // Tasks: lines starting with - within a time block or day
      if (line.match(/^-\s+/) && (currentBlock || currentDay)) {
        const text = line.replace(/^-\s+/, '').trim();
        const isCheckbox = line.includes('[ ]') || line.includes('[x]');
        const cleanText = text.replace(/\[[ x]\]\s*/, '');

        if (cleanText && !cleanText.startsWith('**') && cleanText.length > 3) {
          const task: TaskItem = {
            id: genId('task'),
            text: cleanText,
            type: 'daily_task',
            monthId,
            weekId: currentWeek?.id,
            dayId: currentDay?.id,
            isCheckbox,
          };
          if (currentBlock) {
            currentBlock.tasks.push(task);
          }
        }
      }
    }
    if (currentWeek) weeks.push(currentWeek);
  } else {
    // weekly_only, topic_based, business: extract section-based weeks
    let currentWeek: CurriculumWeek | null = null;
    const sectionRegex = /^#{2,3}\s+(?:WOCHE|Woche|MONAT|Monat)\s+(\d+)/;

    for (const line of lines) {
      const weekMatch = line.match(sectionRegex);
      if (weekMatch) {
        if (currentWeek) weeks.push(currentWeek);
        const weekNum = parseInt(weekMatch[1]);
        currentWeek = {
          id: `m${monthId}_w${weekNum}`,
          weekNumber: weekNum,
          title: line.replace(/^#+\s+/, '').trim(),
          days: [],
          goals: [],
        };
        continue;
      }

      // Extract week-level tasks (checkboxes or bullet points)
      if (currentWeek && line.match(/^-\s+/)) {
        const text = line.replace(/^-\s+/, '').replace(/\[[ x]\]\s*/, '').trim();
        if (text && text.length > 3) {
          currentWeek.goals.push(text);
        }
      }
    }
    if (currentWeek) weeks.push(currentWeek);

    // If no weeks found, create a single default week
    if (weeks.length === 0) {
      // Extract all section headers as topics
      const topicWeek: CurriculumWeek = {
        id: `m${monthId}_w1`,
        weekNumber: 1,
        title: 'Themenübersicht',
        days: [],
        goals: [],
      };

      for (const line of lines) {
        if (line.match(/^###\s+/) && !line.match(/Monats-Ziel/i)) {
          topicWeek.goals.push(line.replace(/^#+\s+/, '').trim());
        }
      }
      if (topicWeek.goals.length > 0) weeks.push(topicWeek);
    }
  }

  return weeks;
}

// ===== FILE DISCOVERY =====

function findMdFiles(baseDir: string): { filepath: string; months: number[]; range: string }[] {
  const results: { filepath: string; months: number[]; range: string }[] = [];
  const phaseDirs = fs.readdirSync(baseDir).filter(d => {
    const fullPath = path.join(baseDir, d);
    return fs.statSync(fullPath).isDirectory() && d.match(/^\d{2}_/);
  });

  for (const dir of phaseDirs) {
    const dirPath = path.join(baseDir, dir);
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const { months, range } = parseMonthRange(file);
      if (months.length > 0) {
        results.push({
          filepath: path.join(dirPath, file),
          months,
          range,
        });
      }
    }
  }

  return results.sort((a, b) => a.months[0] - b.months[0]);
}

// ===== BOOKS PARSER =====

function parseBooks(filepath: string): BookItem[] {
  if (!fs.existsSync(filepath)) return [];
  const content = fs.readFileSync(filepath, 'utf-8');
  const books: BookItem[] = [];
  const lines = content.split('\n');
  let currentCategory = '';

  for (const line of lines) {
    if (line.startsWith('###')) {
      currentCategory = line.replace(/^#+\s+/, '').trim();
    }
    if (line.startsWith('|') && !line.match(/^[\|\s-]+$/) && !line.match(/Buch\s*\|/i) && !line.match(/^#/i)) {
      const cells = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length >= 4 && !cells[0].match(/^-+$/) && cells[0] !== '#') {
        const titleIdx = cells.length >= 5 ? 1 : 0;
        books.push({
          id: genId('book'),
          title: cells[titleIdx],
          author: cells[titleIdx + 1],
          month: cells[titleIdx + 2],
          reason: cells[titleIdx + 3] || '',
          category: currentCategory,
        });
      }
    }
  }
  return books;
}

// ===== CERTIFICATIONS PARSER =====

function parseCertifications(filepath: string): CertificationItem[] {
  if (!fs.existsSync(filepath)) return [];
  const content = fs.readFileSync(filepath, 'utf-8');
  const certs: CertificationItem[] = [];
  const lines = content.split('\n');

  // Parse the timeline table
  let inTimeline = false;
  for (const line of lines) {
    if (line.match(/TIMELINE/i) && line.startsWith('#')) {
      inTimeline = true;
      continue;
    }
    if (inTimeline && line.startsWith('|') && !line.match(/^[\|\s-]+$/) && !line.match(/Monat\s*\|/i)) {
      const cells = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length >= 4) {
        const monthStr = cells[0].replace(/[+~]/g, '').trim();
        const monthNum = parseInt(monthStr) || 0;
        const name = cells[1];
        const abbr = name.match(/\(([^)]+)\)/)?.[1] || name.split(' ')[0];
        certs.push({
          id: genId('cert'),
          name,
          abbreviation: abbr,
          month: monthNum,
          cost: cells[2],
          reason: cells[3],
        });
      }
    }
    if (inTimeline && line.startsWith('#') && !line.match(/TIMELINE/i)) {
      inTimeline = false;
    }
  }
  return certs;
}

// ===== TOOLS GUIDE PARSER =====

function parseToolsGuide(filepath: string): ToolItem[] {
  if (!fs.existsSync(filepath)) return [];
  const content = fs.readFileSync(filepath, 'utf-8');
  const tools: ToolItem[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    if (line.startsWith('|') && !line.match(/^[\|\s-]+$/) && !line.match(/Tool\s*\|/i)) {
      const cells = line.split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length >= 5 && !cells[0].match(/^-+$/)) {
        const monthStr = cells[3]?.replace(/[+~]/g, '').trim();
        const month = parseInt(monthStr) || 0;
        tools.push({
          id: genId('gtool'),
          name: cells[0],
          setup: cells[1],
          priority: cells[2],
          month,
          description: cells[4] || '',
        });
      }
    }
  }
  return tools;
}

// ===== MAIN =====

function main() {
  const curriculumDir = path.resolve(__dirname, '..', 'curriculum');
  const outputPath = path.resolve(__dirname, '..', 'src', 'data', 'curriculum.json');

  console.log('Parsing curriculum from:', curriculumDir);

  // Find all month MD files
  const mdFiles = findMdFiles(curriculumDir);
  console.log(`Found ${mdFiles.length} month files`);

  // Parse phases
  const phases: Phase[] = [
    { id: 1, name: 'RECRUIT', codename: 'Phase 1', months: [1, 2, 3], color: '#3b82f6', description: 'Funktionale Basis — Coden, Linux, Netzwerk, OSINT' },
    { id: 2, name: 'OPERATOR', codename: 'Phase 2', months: [4, 5, 6], color: '#8b5cf6', description: 'Forensik + Crypto Tracing + Advanced OSINT' },
    { id: 3, name: 'SPECIALIST', codename: 'Phase 3', months: [7, 8, 9], color: '#ec4899', description: 'Offensive Security + Social Engineering' },
    { id: 4, name: 'ADVANCED', codename: 'Phase 4', months: [10, 11, 12], color: '#f59e0b', description: 'Reverse Engineering, Binary Exploitation' },
    { id: 5, name: 'EXPERT', codename: 'Phase 5', months: [13, 14, 15, 16, 17, 18], color: '#ef4444', description: 'OSCP, Advanced Exploitation, Mobile Security' },
    { id: 6, name: 'SOVEREIGN', codename: 'Phase 6', months: [19, 20, 21, 22, 23, 24], color: '#10b981', description: 'Vulnerability Research, 0-Day, Staatlicher Einstieg' },
    { id: 7, name: 'INTELLIGENCE', codename: 'Level 2', months: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], color: '#06b6d4', description: 'Full-Spectrum Intelligence Operations' },
  ];

  // Parse each month file
  const months: CurriculumMonth[] = [];
  for (const { filepath, months: monthNums, range } of mdFiles) {
    const content = fs.readFileSync(filepath, 'utf-8');
    const primaryMonth = monthNums[0];
    const strategy = getStrategy(primaryMonth);

    // Extract title from first H1
    const titleMatch = content.match(/^#\s+(.+)/m);
    const title = titleMatch ? titleMatch[1].trim() : `Monat ${range}`;

    const goals = extractGoals(content, primaryMonth);
    const kpis = extractKPIs(content, primaryMonth);
    const codeBlocks = extractCodeBlocks(content, primaryMonth);
    const tools = extractTools(content, primaryMonth);
    const weeks = extractWeeksAndDays(content, primaryMonth, strategy);

    console.log(`  Month ${range}: ${goals.length} goals, ${kpis.length} KPIs, ${weeks.length} weeks, ${codeBlocks.length} code blocks`);

    months.push({
      id: primaryMonth,
      monthRange: range,
      title,
      phase: getPhaseForMonth(primaryMonth),
      strategy,
      goals,
      weeks,
      kpis,
      tools,
      codeBlocks,
      rawContent: content,
    });
  }

  // Parse supplementary files
  const booksPath = path.join(curriculumDir, 'BÜCHER_GUIDE.md');
  const certsPath = path.join(curriculumDir, 'ZERTIFIZIERUNGEN.md');
  const toolsPath = path.join(curriculumDir, 'TOOLS_GUIDE.md');

  const books = parseBooks(booksPath);
  const certifications = parseCertifications(certsPath);
  const globalTools = parseToolsGuide(toolsPath);

  console.log(`\nBooks: ${books.length}, Certifications: ${certifications.length}, Tools: ${globalTools.length}`);

  // Daily schedule
  const dailySchedule = [
    { time: '06:30–08:30', block: 'DEEP TECHNICAL' },
    { time: '08:30–09:00', block: 'Frühstück' },
    { time: '09:00–10:30', block: 'OSINT / INVESTIGATION' },
    { time: '10:30–11:00', block: 'NEWS' },
    { time: '11:00–12:00', block: 'CHALLENGES' },
    { time: '12:00–13:00', block: 'Mittagspause + Podcast' },
    { time: '13:00–16:00', block: 'SAYTEC (Arbeit)' },
    { time: '16:00–18:00', block: 'GYM' },
    { time: '18:00–18:30', block: 'Abendessen' },
    { time: '18:30–20:00', block: 'DEEP LEARNING' },
    { time: '20:00–21:00', block: 'ISLAM' },
    { time: '21:00–22:30', block: 'PROJEKT-ZEIT' },
  ];

  const curriculum = {
    phases,
    months,
    books,
    certifications,
    tools: globalTools,
    dailySchedule,
  };

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(curriculum, null, 2));

  // Also write a compact version without rawContent
  const compactMonths = months.map(m => ({ ...m, rawContent: undefined }));
  const compactCurriculum = { ...curriculum, months: compactMonths };
  const compactPath = outputPath.replace('.json', '.compact.json');
  fs.writeFileSync(compactPath, JSON.stringify(compactCurriculum));

  console.log(`\nOutput written to: ${outputPath}`);
  console.log(`Compact output: ${compactPath}`);
  console.log(`Total months: ${months.length}`);

  // Stats
  const totalGoals = months.reduce((sum, m) => sum + m.goals.length, 0);
  const totalKPIs = months.reduce((sum, m) => sum + m.kpis.length, 0);
  const totalWeeks = months.reduce((sum, m) => sum + m.weeks.length, 0);
  const totalCode = months.reduce((sum, m) => sum + m.codeBlocks.length, 0);
  console.log(`Total goals: ${totalGoals}, KPIs: ${totalKPIs}, Weeks: ${totalWeeks}, Code blocks: ${totalCode}`);
}

main();
