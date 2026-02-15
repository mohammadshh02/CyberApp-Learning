import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Globe, Shield, Sword, BookOpen, Award, Briefcase, DollarSign,
  ChevronDown, ChevronUp, Star, Clock, Tag, Check, MapPin, Users,
  Coffee, Zap, Lock, Eye, Terminal, Wifi, TrendingUp, ArrowRight,
  Layers, Target, Crosshair, Binary, Bug, Search, FileSearch, Brain,
  Server, Network, Fingerprint, AlertTriangle, Cpu, MonitorSmartphone,
} from 'lucide-react';
import { Card } from '@/components/shared/Card.tsx';
import { cn } from '@/lib/utils.ts';
import { useAppStore } from '@/stores/app-store.ts';
import type {
  LifestyleLocation, VisionSkill, DeepDive, FamousCase,
  CertTimeline, CareerPath, IncomeScenario, MasterplanPhase,
} from '@/data/vision-data.ts';
import {
  LIFESTYLE_LOCATIONS, SKILLS_ARSENAL, DEEP_DIVES, FAMOUS_CASES,
  CERTIFICATIONS_TIMELINE, CAREER_PATHS, INCOME_SCENARIOS, MASTERPLAN_PHASES,
} from '@/data/vision-data.ts';

// --- Constants ---------------------------------------------------------------

const SECTION_IDS = [
  'masterplan', 'lifestyle', 'skills-arsenal', 'deep-dives', 'famous-cases',
  'certifications', 'career-paths', 'income',
] as const;
type SectionId = (typeof SECTION_IDS)[number];

const SECTION_LABELS: Record<SectionId, string> = {
  masterplan: 'Masterplan',
  lifestyle: 'Lifestyle', 'skills-arsenal': 'Skills Arsenal',
  'deep-dives': 'Deep Dives', 'famous-cases': 'Famous Cases',
  certifications: 'Certifications', 'career-paths': 'Career Paths',
  income: 'Income',
};

const PHASE_BG: Record<number, string> = {
  1: 'bg-phase-1', 2: 'bg-phase-2', 3: 'bg-phase-3', 4: 'bg-phase-4',
  5: 'bg-phase-5', 6: 'bg-phase-6', 7: 'bg-phase-7',
};
const PHASE_TXT: Record<number, string> = {
  1: 'text-phase-1', 2: 'text-phase-2', 3: 'text-phase-3', 4: 'text-phase-4',
  5: 'text-phase-5', 6: 'text-phase-6', 7: 'text-phase-7',
};

const CAT_ICONS: Record<string, React.ReactNode> = {
  OSINT: <Search size={14} />, Pentest: <Bug size={14} />,
  Forensik: <Fingerprint size={14} />, Kryptographie: <Lock size={14} />,
  'Reverse Engineering': <Binary size={14} />,
  'Social Engineering': <Brain size={14} />,
  Netzwerk: <Network size={14} />, Programmierung: <Terminal size={14} />,
  'Mobile Security': <MonitorSmartphone size={14} />,
  Intelligence: <Eye size={14} />, 'Cloud Security': <Server size={14} />,
  'Wireless/RF': <Wifi size={14} />,
  'Threat Intelligence': <AlertTriangle size={14} />,
  Hardware: <Cpu size={14} />,
};

// --- localStorage helpers ----------------------------------------------------

function getDeepDiveCompleted(id: string): boolean {
  try { return localStorage.getItem(`vision-deepdive-${id}`) === 'true'; }
  catch { return false; }
}

function setDeepDiveCompleted(id: string, done: boolean): void {
  try {
    if (done) localStorage.setItem(`vision-deepdive-${id}`, 'true');
    else localStorage.removeItem(`vision-deepdive-${id}`);
  } catch { /* silent */ }
}

// --- useAnimatedCounter hook -------------------------------------------------

function useAnimatedCounter(target: number, duration = 1200): number {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (target <= 0) return;
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCurrent(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return current;
}

// --- Shared sub-components ---------------------------------------------------

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star key={i} size={12}
          className={cn(i < rating ? 'text-warning fill-warning' : 'text-text-muted/30')} />
      ))}
    </div>
  );
}

function SectionHeader({ id, icon, title, subtitle, count }: {
  id: string; icon: React.ReactNode; title: string;
  subtitle?: string; count?: number;
}) {
  return (
    <div id={id} className="scroll-mt-24 pt-8 pb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            {title}
            {count !== undefined && (
              <span className="text-sm font-normal text-text-muted">({count})</span>
            )}
          </h2>
          {subtitle && <p className="text-sm text-text-muted mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="h-px bg-border mt-4" />
    </div>
  );
}

// --- 1. VisionHero -----------------------------------------------------------

function VisionHero() {
  const skills = useAnimatedCounter(42, 1000);
  const certs = useAnimatedCounter(12, 1200);
  const rateMin = useAnimatedCounter(350, 1400);
  const rateMax = useAnimatedCounter(1500, 1800);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-bg-card via-bg-card to-accent/20 border border-border">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-8 text-8xl font-black text-accent select-none">S</div>
        <div className="absolute bottom-4 left-8 text-6xl font-black text-accent select-none">07</div>
      </div>
      <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={20} className="text-accent" />
          <span className="text-xs font-medium tracking-widest uppercase text-accent">
            Mission Briefing
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
          OPERATION <span className="text-accent">SOVEREIGN</span>
        </h1>
        <p className="text-text-muted max-w-2xl mb-8 text-sm md:text-base">
          Your 36-month transformation from zero to elite cybersecurity operator.
          Intelligence, offensive security, digital forensics, and sovereign-grade
          tradecraft — all in one mission plan.
        </p>
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-lg">
          <div>
            <div className="text-2xl md:text-4xl font-black text-accent">{skills}</div>
            <div className="text-xs md:text-sm text-text-muted mt-1">Elite Skills</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-black text-success">{certs}</div>
            <div className="text-xs md:text-sm text-text-muted mt-1">Certifications</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-black text-warning">
              <span className="text-lg md:text-2xl">CHF</span>{' '}
              {rateMin}<span className="text-text-muted text-lg md:text-2xl">–</span>{rateMax}
            </div>
            <div className="text-xs md:text-sm text-text-muted mt-1">Per Hour</div>
          </div>
        </div>
      </div>
      <div className="h-1 flex">
        {[1, 2, 3, 4, 5, 6, 7].map((p) => (
          <div key={p} className={cn('flex-1', PHASE_BG[p])} />
        ))}
      </div>
    </div>
  );
}

// --- 2. VisionTOC (desktop sidebar) ------------------------------------------

function VisionTOC({ activeSection, onNavigate }: {
  activeSection: SectionId | null; onNavigate: (id: SectionId) => void;
}) {
  return (
    <nav className="hidden lg:block sticky top-24 w-48 shrink-0 self-start">
      <div className="text-xs font-medium tracking-widest uppercase text-text-muted mb-4">
        Contents
      </div>
      <ul className="space-y-1">
        {SECTION_IDS.map((id) => {
          const active = activeSection === id;
          return (
            <li key={id}>
              <button
                onClick={() => onNavigate(id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-all',
                  active
                    ? 'text-accent bg-accent/10 font-medium'
                    : 'text-text-muted hover:text-text hover:bg-bg-hover',
                )}
              >
                <span className={cn(
                  'w-1.5 h-1.5 rounded-full shrink-0 transition-colors',
                  active ? 'bg-accent' : 'bg-text-muted/30',
                )} />
                {SECTION_LABELS[id]}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// --- 2b. MobileTOC (horizontal scroll nav for mobile) ------------------------

function MobileTOC({ activeSection, onNavigate }: {
  activeSection: SectionId | null; onNavigate: (id: SectionId) => void;
}) {
  return (
    <div className="lg:hidden sticky top-0 z-20 bg-bg/80 backdrop-blur-md border-b border-border -mx-4 px-4 py-2">
      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
        {SECTION_IDS.map((id) => {
          const active = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap',
                active
                  ? 'bg-accent text-white'
                  : 'bg-bg-card text-text-muted border border-border hover:text-text',
              )}
            >
              {SECTION_LABELS[id]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- 3. LifestyleSection -----------------------------------------------------

function LifestyleSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div>
      <SectionHeader id="lifestyle" icon={<Globe size={20} />}
        title="Lifestyle Locations" subtitle="Where elite cyber operators live and work"
        count={LIFESTYLE_LOCATIONS.length} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LIFESTYLE_LOCATIONS.map((loc: LifestyleLocation) => {
          const open = expandedId === loc.id;
          return (
            <Card key={loc.id} hover onClick={() => setExpandedId(open ? null : loc.id)}>
              <div className="flex items-start gap-3">
                <div className="text-3xl">{loc.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base">{loc.city}</h3>
                    <span className="text-xs text-text-muted">{loc.country}</span>
                  </div>
                  <p className="text-sm text-accent mt-0.5">{loc.tagline}</p>
                </div>
                {open ? <ChevronUp size={18} className="text-text-muted shrink-0" />
                       : <ChevronDown size={18} className="text-text-muted shrink-0" />}
              </div>
              {open && (
                <div className="mt-4 pt-4 border-t border-border space-y-4 text-sm">
                  <p className="text-text-muted">{loc.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted mb-1.5">
                        <Users size={12} /> Clients
                      </div>
                      <ul className="space-y-1">
                        {loc.clients.map((c, i) => (
                          <li key={i} className="text-xs text-text-muted flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-accent shrink-0" />{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted mb-1.5">
                        <Coffee size={12} /> Meeting Culture
                      </div>
                      <p className="text-xs text-text-muted">{loc.meetingCulture}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-bg-hover">
                    <DollarSign size={14} className="text-success" />
                    <span className="text-xs font-medium">{loc.hourlyRate}</span>
                  </div>
                  {loc.highlights && loc.highlights.length > 0 && (
                    <div>
                      <div className="text-xs font-medium text-text-muted mb-1.5">Highlights</div>
                      <div className="flex flex-wrap gap-1.5">
                        {loc.highlights.map((h, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">{h}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {loc.whyYourSkills && (
                    <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-success mb-1">
                        <Target size={12} /> Why Your Skills Matter Here
                      </div>
                      <p className="text-xs text-text-muted">{loc.whyYourSkills}</p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// --- 4. SkillsArsenalSection -------------------------------------------------

function SkillsArsenalSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const skillsByPhase = SKILLS_ARSENAL.reduce<Record<number, VisionSkill[]>>((acc, s) => {
    (acc[s.phase] ??= []).push(s); return acc;
  }, {});
  const phases = Object.keys(skillsByPhase).map(Number).sort((a, b) => a - b);

  return (
    <div>
      <SectionHeader id="skills-arsenal" icon={<Sword size={20} />}
        title="Skills Arsenal" subtitle="42 elite capabilities across 7 phases"
        count={SKILLS_ARSENAL.length} />
      <div className="space-y-6">
        {phases.map((phase) => (
          <div key={phase}>
            <div className="flex items-center gap-3 mb-3">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold', PHASE_BG[phase])}>
                {phase}
              </div>
              <h3 className={cn('font-bold text-sm', PHASE_TXT[phase])}>Phase {phase}</h3>
              <span className="text-xs text-text-muted">{skillsByPhase[phase].length} skills</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skillsByPhase[phase].map((skill: VisionSkill) => {
                const open = expandedId === skill.id;
                return (
                  <Card key={skill.id} hover onClick={() => setExpandedId(open ? null : skill.id)}>
                    <div className="flex items-start gap-2.5">
                      <div className="text-text-muted mt-0.5">
                        {CAT_ICONS[skill.category] || <Layers size={14} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{skill.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <StarRating rating={skill.difficulty} />
                          <span className={cn('text-[10px] px-1.5 py-0.5 rounded font-medium text-white', PHASE_BG[skill.phase])}>
                            P{skill.phase}
                          </span>
                        </div>
                      </div>
                      {open ? <ChevronUp size={14} className="text-text-muted shrink-0" />
                             : <ChevronDown size={14} className="text-text-muted shrink-0" />}
                    </div>
                    {open && (
                      <div className="mt-3 pt-3 border-t border-border space-y-3 text-xs">
                        {skill.longDesc && <p className="text-text-muted">{skill.longDesc}</p>}
                        {skill.realWorldUse && (
                          <div className="p-2 rounded-lg bg-accent/5 border border-accent/10">
                            <div className="font-medium text-accent mb-1 flex items-center gap-1">
                              <Crosshair size={10} /> Real World Use
                            </div>
                            <p className="text-text-muted">{skill.realWorldUse}</p>
                          </div>
                        )}
                        {skill.tools && skill.tools.length > 0 && (
                          <div>
                            <div className="font-medium text-text-muted mb-1">Tools</div>
                            <div className="flex flex-wrap gap-1">
                              {skill.tools.map((t, i) => (
                                <span key={i} className="px-1.5 py-0.5 rounded bg-bg-hover text-text-muted">{t}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {skill.months && skill.months.length > 0 && (
                          <div className="flex items-center gap-1.5 text-text-muted">
                            <Clock size={10} /> Months: {skill.months.map((m) => `M${m}`).join(', ')}
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 5. DeepDivesSection -----------------------------------------------------

function DeepDivesSection() {
  const [revealedSections, setRevealedSections] = useState<Record<string, number>>({});
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    const s = new Set<string>();
    DEEP_DIVES.forEach((dd: DeepDive) => { if (getDeepDiveCompleted(dd.id)) s.add(dd.id); });
    return s;
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const revealNext = (aid: string, total: number) => {
    setRevealedSections((p) => ({ ...p, [aid]: Math.min((p[aid] ?? 0) + 1, total) }));
  };
  const toggleComplete = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); setDeepDiveCompleted(id, false); }
      else { next.add(id); setDeepDiveCompleted(id, true); }
      return next;
    });
  };

  return (
    <div>
      <SectionHeader id="deep-dives" icon={<BookOpen size={20} />}
        title="Deep Dives" subtitle="In-depth analysis and knowledge articles"
        count={DEEP_DIVES.length} />
      <div className="space-y-4">
        {DEEP_DIVES.map((article: DeepDive) => {
          const open = expandedId === article.id;
          const done = completedIds.has(article.id);
          const total = article.sections?.length ?? 0;
          const revealed = revealedSections[article.id] ?? 0;
          const allRevealed = revealed >= total;

          return (
            <Card key={article.id} className="relative">
              {done && (
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-1 text-xs text-success bg-success/10 px-2 py-0.5 rounded-full">
                    <Check size={12} /> Completed
                  </div>
                </div>
              )}
              <button onClick={() => setExpandedId(open ? null : article.id)} className="w-full text-left">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-xp/10 flex items-center justify-center text-xp shrink-0">
                    <BookOpen size={18} />
                  </div>
                  <div className="flex-1 min-w-0 pr-16">
                    <h3 className="font-bold text-sm">{article.title}</h3>
                    {article.subtitle && (
                      <p className="text-xs text-text-muted mt-0.5">{article.subtitle}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      {article.readingTime && (
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <Clock size={10} /> {article.readingTime}
                        </span>
                      )}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Tag size={10} className="text-text-muted" />
                          {article.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-bg-hover text-text-muted">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {open ? <ChevronUp size={16} className="text-text-muted shrink-0 mt-1" />
                         : <ChevronDown size={16} className="text-text-muted shrink-0 mt-1" />}
                </div>
              </button>
              {open && total > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-1.5 rounded-full bg-bg-hover overflow-hidden">
                      <div className="h-full rounded-full bg-xp transition-all duration-500"
                        style={{ width: `${total > 0 ? (revealed / total) * 100 : 0}%` }} />
                    </div>
                    <span className="text-xs text-text-muted shrink-0">{revealed}/{total} sections</span>
                  </div>
                  <div className="space-y-3">
                    {article.sections?.slice(0, revealed).map((sec, i) => (
                      <div key={i} className="p-3 rounded-lg bg-bg-hover/50 animate-slide-up">
                        {sec.heading && <h4 className="text-sm font-medium mb-1">{sec.heading}</h4>}
                        <p className="text-xs text-text-muted leading-relaxed">{sec.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    {!allRevealed && (
                      <button onClick={(e) => { e.stopPropagation(); revealNext(article.id, total); }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-xs font-medium hover:bg-accent/80 transition-colors">
                        Next Section <ArrowRight size={12} />
                      </button>
                    )}
                    {allRevealed && (
                      <button onClick={(e) => { e.stopPropagation(); toggleComplete(article.id); }}
                        className={cn('flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors',
                          done ? 'bg-success/10 text-success hover:bg-success/20'
                               : 'bg-bg-hover text-text-muted hover:bg-bg-hover/80')}>
                        <Check size={12} /> {done ? 'Completed' : 'Mark Complete'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// --- 6. FamousCasesSection ---------------------------------------------------

function FamousCasesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div>
      <SectionHeader id="famous-cases" icon={<FileSearch size={20} />}
        title="Famous Cases" subtitle="Landmark cybersecurity incidents and investigations"
        count={FAMOUS_CASES.length} />
      <div className="relative pl-8 space-y-6">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />
        {FAMOUS_CASES.map((c: FamousCase) => {
          const open = expandedId === c.id;
          return (
            <div key={c.id} className="relative">
              <div className="absolute -left-5 top-1 w-4 h-4 rounded-full border-2 border-accent bg-bg flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              </div>
              <Card hover onClick={() => setExpandedId(open ? null : c.id)}>
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-accent/10 text-accent shrink-0">{c.year}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm">{c.title}</h3>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2">{c.summary}</p>
                    {c.skillTags && c.skillTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {c.skillTags.map((t, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-bg-hover text-text-muted">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  {open ? <ChevronUp size={14} className="text-text-muted shrink-0" />
                         : <ChevronDown size={14} className="text-text-muted shrink-0" />}
                </div>
                {open && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3 text-xs">
                    {c.story && (
                      <div>
                        <h4 className="font-medium text-text mb-1.5">Full Story</h4>
                        <p className="text-text-muted leading-relaxed">{c.story}</p>
                      </div>
                    )}
                    {c.outcome && (
                      <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                        <div className="font-medium text-success mb-1 flex items-center gap-1">
                          <Check size={10} /> Outcome
                        </div>
                        <p className="text-text-muted">{c.outcome}</p>
                      </div>
                    )}
                    {c.impact && (
                      <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
                        <div className="font-medium text-warning mb-1 flex items-center gap-1">
                          <Zap size={10} /> Impact
                        </div>
                        <p className="text-text-muted">{c.impact}</p>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- 7. CertsSection ---------------------------------------------------------

function CertsSection() {
  return (
    <div>
      <SectionHeader id="certifications" icon={<Award size={20} />}
        title="Certifications Timeline" subtitle="Professional certifications across your journey"
        count={CERTIFICATIONS_TIMELINE.length} />

      {/* Desktop horizontal timeline */}
      <div className="hidden md:block relative">
        <div className="absolute left-0 right-0 top-16 h-px bg-border" />
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {CERTIFICATIONS_TIMELINE.map((cert: CertTimeline) => (
            <div key={cert.id} className="relative flex-shrink-0 w-52">
              <div className="flex justify-center mb-2">
                <div className={cn('w-3 h-3 rounded-full mt-14 relative z-10', PHASE_BG[cert.phase] || 'bg-accent')} />
              </div>
              <Card className="mt-4">
                <div className="text-center">
                  <div className={cn('inline-block text-xs font-bold px-2 py-0.5 rounded text-white mb-2', PHASE_BG[cert.phase] || 'bg-accent')}>
                    {cert.abbreviation}
                  </div>
                  <h4 className="text-xs font-medium mb-1">{cert.name}</h4>
                  <div className="text-[10px] text-text-muted mb-2">Month {cert.month}</div>
                  <div className="flex justify-center mb-2"><StarRating rating={cert.prestige} /></div>
                  <div className="mb-2">
                    <div className="text-[10px] text-text-muted mb-1">Difficulty</div>
                    <div className="h-1.5 rounded-full bg-bg-hover overflow-hidden">
                      <div className={cn('h-full rounded-full', cert.difficulty >= 4 ? 'bg-danger' : cert.difficulty >= 3 ? 'bg-warning' : 'bg-success')}
                        style={{ width: `${(cert.difficulty / 5) * 100}%` }} />
                    </div>
                  </div>
                  {cert.salaryImpact && (
                    <div className="text-[10px] text-success font-medium">{cert.salaryImpact}</div>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="md:hidden relative pl-8 space-y-4">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />
        {CERTIFICATIONS_TIMELINE.map((cert: CertTimeline) => (
          <div key={cert.id} className="relative">
            <div className={cn('absolute -left-5 top-3 w-4 h-4 rounded-full', PHASE_BG[cert.phase] || 'bg-accent')} />
            <Card>
              <div className="flex items-start gap-3">
                <div className={cn('text-xs font-bold px-2 py-0.5 rounded text-white shrink-0', PHASE_BG[cert.phase] || 'bg-accent')}>
                  {cert.abbreviation}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium">{cert.name}</h4>
                  <div className="text-xs text-text-muted mt-0.5">Month {cert.month}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <StarRating rating={cert.prestige} />
                    <div className="flex-1 h-1.5 rounded-full bg-bg-hover overflow-hidden max-w-20">
                      <div className={cn('h-full rounded-full', cert.difficulty >= 4 ? 'bg-danger' : cert.difficulty >= 3 ? 'bg-warning' : 'bg-success')}
                        style={{ width: `${(cert.difficulty / 5) * 100}%` }} />
                    </div>
                  </div>
                  {cert.salaryImpact && <div className="text-xs text-success mt-1.5">{cert.salaryImpact}</div>}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 8. CareerPathsSection ---------------------------------------------------

function CareerPathsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div>
      <SectionHeader id="career-paths" icon={<Briefcase size={20} />}
        title="Career Paths" subtitle="Where Operation Sovereign can take you"
        count={CAREER_PATHS.length} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CAREER_PATHS.map((path: CareerPath) => {
          const open = expandedId === path.id;
          return (
            <Card key={path.id} hover onClick={() => setExpandedId(open ? null : path.id)} className="flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Briefcase size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm">{path.title}</h3>
                  {path.salaryRange && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <DollarSign size={12} className="text-success" />
                      <span className="text-xs text-success font-medium">{path.salaryRange}</span>
                    </div>
                  )}
                  {path.location && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-text-muted" />
                      <span className="text-xs text-text-muted">{path.location}</span>
                    </div>
                  )}
                </div>
                {open ? <ChevronUp size={14} className="text-text-muted shrink-0" />
                       : <ChevronDown size={14} className="text-text-muted shrink-0" />}
              </div>
              {open && (
                <div className="pt-3 border-t border-border space-y-3 text-xs mt-auto">
                  {path.dayInLife && (
                    <div>
                      <h4 className="font-medium text-text mb-1.5 flex items-center gap-1">
                        <Clock size={10} /> A Day in the Life
                      </h4>
                      <p className="text-text-muted leading-relaxed">{path.dayInLife}</p>
                    </div>
                  )}
                  {path.entryRequirements && path.entryRequirements.length > 0 && (
                    <div>
                      <h4 className="font-medium text-text mb-1.5 flex items-center gap-1">
                        <Target size={10} /> Entry Requirements
                      </h4>
                      <ul className="space-y-1">
                        {path.entryRequirements.map((r, i) => (
                          <li key={i} className="text-text-muted flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />{r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    {path.pros && path.pros.length > 0 && (
                      <div>
                        <h4 className="font-medium text-success mb-1.5">Pros</h4>
                        <ul className="space-y-1">
                          {path.pros.map((p, i) => (
                            <li key={i} className="text-text-muted flex items-start gap-1.5">
                              <span className="text-success mt-0.5 shrink-0">+</span>{p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {path.cons && path.cons.length > 0 && (
                      <div>
                        <h4 className="font-medium text-danger mb-1.5">Cons</h4>
                        <ul className="space-y-1">
                          {path.cons.map((c, i) => (
                            <li key={i} className="text-text-muted flex items-start gap-1.5">
                              <span className="text-danger mt-0.5 shrink-0">-</span>{c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// --- Masterplan Section ------------------------------------------------------

function MasterplanSection() {
  return (
    <div>
      <SectionHeader id="masterplan" icon={<Crosshair size={20} />}
        title="MASTERPLAN" subtitle="Von 23 zum Commander — dein Weg zur eigenen Cyber-Armee"
        count={MASTERPLAN_PHASES.length} />

      {/* Vision statement */}
      <Card className="mb-6 bg-gradient-to-r from-accent/10 via-bg-card to-accent/5 border-accent/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
            <Target size={24} className="text-accent" />
          </div>
          <div>
            <h3 className="font-bold text-sm mb-1">Das Endgame</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Keine Lernplattform. Keine Kurse. Du baust eine <span className="text-accent font-semibold">dezentrale Cybersecurity-Agentur</span> als
              Paid Community. Echte Aufträge, echtes Geld, echte Erfahrung. Du akquirierst die Deals,
              dein System verteilt sie, deine Armee liefert. Mit 30 bist du der Commander.
            </p>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-6">
          {MASTERPLAN_PHASES.map((phase: MasterplanPhase, idx: number) => (
            <div key={phase.id} className="relative pl-16">
              {/* Timeline dot */}
              <div className={cn(
                'absolute left-4 w-5 h-5 rounded-full border-2 flex items-center justify-center',
                phase.status === 'current'
                  ? 'bg-accent border-accent shadow-lg shadow-accent/30'
                  : phase.status === 'endgame'
                    ? 'bg-gradient-to-br from-accent to-success border-success shadow-lg shadow-success/30'
                    : 'bg-bg-card border-border'
              )}>
                {phase.status === 'current' && (
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
                {phase.status === 'endgame' && (
                  <Crosshair size={10} className="text-white" />
                )}
              </div>

              {/* Age badge */}
              <div className="absolute left-14 -top-0.5">
                <span className={cn(
                  'text-[10px] font-bold px-2 py-0.5 rounded-full',
                  phase.status === 'current'
                    ? 'bg-accent/20 text-accent'
                    : phase.status === 'endgame'
                      ? 'bg-success/20 text-success'
                      : 'bg-bg-hover text-text-muted'
                )}>
                  {phase.age} Jahre
                </span>
              </div>

              <Card className={cn(
                'mt-6',
                phase.status === 'current' && 'border-accent/30',
                phase.status === 'endgame' && 'border-success/30 bg-gradient-to-r from-bg-card to-success/5'
              )}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={cn(
                        'font-black text-sm tracking-wide',
                        phase.status === 'current' && 'text-accent',
                        phase.status === 'endgame' && 'text-success'
                      )}>
                        {phase.title}
                      </h3>
                      {phase.status === 'current' && (
                        <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium animate-pulse">
                          DU BIST HIER
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted">{phase.subtitle}</p>
                  </div>
                  <span className="text-[10px] text-text-muted shrink-0">{phase.years}</span>
                </div>

                <p className="text-xs text-text-muted leading-relaxed mb-3">{phase.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {phase.milestones.map((m, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <div className={cn(
                        'w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5',
                        phase.status === 'current' ? 'bg-accent/10' : phase.status === 'endgame' ? 'bg-success/10' : 'bg-bg-hover'
                      )}>
                        {phase.status === 'endgame'
                          ? <Crosshair size={8} className="text-success" />
                          : <ArrowRight size={8} className={phase.status === 'current' ? 'text-accent' : 'text-text-muted'} />
                        }
                      </div>
                      <span className="text-text-muted">{m}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Content Strategy callout */}
        <Card className="mt-8 border-border">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
            <Layers size={14} /> Content-Strategie
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-accent/5 border border-accent/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold bg-accent/20 text-accent px-2 py-0.5 rounded-full">JETZT — 23-26</span>
              </div>
              <h5 className="text-xs font-bold mb-1">Dokumentieren, nicht kreieren</h5>
              <ul className="text-[11px] text-text-muted space-y-1">
                <li className="flex items-start gap-1.5"><ArrowRight size={10} className="mt-0.5 text-accent shrink-0" />CTF Write-Ups veröffentlichen (machst du eh)</li>
                <li className="flex items-start gap-1.5"><ArrowRight size={10} className="mt-0.5 text-accent shrink-0" />GitHub-Projekte pflegen (zeigt echte Skills)</li>
                <li className="flex items-start gap-1.5"><ArrowRight size={10} className="mt-0.5 text-accent shrink-0" />Ab und zu LinkedIn-Post (was du gerade lernst)</li>
                <li className="flex items-start gap-1.5"><Clock size={10} className="mt-0.5 text-text-muted shrink-0" />15 Min./Tag extra — kein Zeitverlust</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-success/5 border border-success/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold bg-success/20 text-success px-2 py-0.5 rounded-full">AB 26+ — ESTABLISHMENT</span>
              </div>
              <h5 className="text-xs font-bold mb-1">Content-Maschine AN</h5>
              <ul className="text-[11px] text-text-muted space-y-1">
                <li className="flex items-start gap-1.5"><ArrowRight size={10} className="mt-0.5 text-success shrink-0" />RUB-Abschluss + OSCP + echte Projekte = Autorität</li>
                <li className="flex items-start gap-1.5"><ArrowRight size={10} className="mt-0.5 text-success shrink-0" />Jeder Post ist glaubwürdig weil du es GETAN hast</li>
                <li className="flex items-start gap-1.5"><ArrowRight size={10} className="mt-0.5 text-success shrink-0" />Case Studies, Videos, Deep Dives veröffentlichen</li>
                <li className="flex items-start gap-1.5"><ArrowRight size={10} className="mt-0.5 text-success shrink-0" />Audience aufbauen → Fundament für Community-Launch</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Studium Integration callout */}
        <Card className="mt-4 border-border">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
            <BookOpen size={14} /> RUB IT-Sicherheit — Studium-Integration
          </h4>
          <p className="text-xs text-text-muted mb-3">
            Dein Studium und der Sovereign-Plan sind <span className="text-accent font-semibold">kein Widerspruch</span> — die RUB
            deckt Kryptographie, Netzwerksicherheit, Systemsicherheit und Reverse Engineering ab. Du lernst nicht doppelt, du lernst <span className="font-semibold text-text">verstärkt</span>.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { sem: 'Sem. 2 (jetzt)', desc: '2 Module — entspannt, Vollgas Sovereign-Plan', active: true },
              { sem: 'Sem. 3', desc: '1. Semester nachholen — mehr Uni-Last, Cyber reduziert', active: false },
              { sem: 'Sem. 4+', desc: 'Versetzt aber stabil — beides parallel', active: false },
              { sem: '~2029', desc: 'Abschluss — 1 Jahr später, aber mit doppeltem Skill-Stack', active: false },
            ].map((s, i) => (
              <div key={i} className={cn(
                'flex-1 min-w-[140px] p-2 rounded-lg text-[11px] border',
                s.active ? 'bg-accent/5 border-accent/20' : 'bg-bg-hover border-border'
              )}>
                <span className={cn('font-bold block mb-0.5', s.active ? 'text-accent' : 'text-text-muted')}>{s.sem}</span>
                <span className="text-text-muted">{s.desc}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Flywheel callout at the bottom */}
        <Card className="mt-4 border-accent/20">
          <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-3 flex items-center gap-2">
            <Zap size={14} /> Das Flywheel
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-text-muted">
            {[
              'Du akquirierst Klienten',
              'Auftrag → Community',
              'Top 3 liefern & verdienen',
              'Members wachsen',
              'Bessere Ergebnisse',
              'Mehr Klienten',
              'Dein Name = Marke',
            ].map((step, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="bg-bg-hover px-2.5 py-1 rounded-full">{step}</span>
                {i < 6 && <ArrowRight size={12} className="text-accent" />}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// --- 9. IncomeSection --------------------------------------------------------

function IncomeSection() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  const maxSalary = Math.max(
    ...INCOME_SCENARIOS.map((s: IncomeScenario) => s.salaryNumeric || 0), 1
  );

  return (
    <div ref={sectionRef}>
      <SectionHeader id="income" icon={<DollarSign size={20} />}
        title="Income Scenarios" subtitle="Projected earning potential at each stage"
        count={INCOME_SCENARIOS.length} />
      <div className="space-y-4">
        {INCOME_SCENARIOS.map((s: IncomeScenario, idx: number) => {
          const barW = s.salaryNumeric && maxSalary > 0
            ? (s.salaryNumeric / maxSalary) * 100 : 0;
          return (
            <Card key={s.id}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent font-bold text-sm shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className="font-bold text-sm">{s.title}</h3>
                    <span className="text-sm font-bold text-success shrink-0">{s.salary}</span>
                  </div>
                  {s.timeline && (
                    <div className="text-xs text-text-muted mb-2 flex items-center gap-1">
                      <Clock size={10} /> {s.timeline}
                    </div>
                  )}
                  {s.description && <p className="text-xs text-text-muted mb-3">{s.description}</p>}
                  <div className="h-3 rounded-full bg-bg-hover overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: animated ? `${barW}%` : '0%',
                        transitionDelay: `${idx * 150}ms`,
                        background: 'linear-gradient(90deg, var(--color-accent), var(--color-success))',
                      }} />
                  </div>
                  {s.salaryNumeric && (
                    <div className="text-[10px] text-text-muted mt-1 text-right">
                      CHF {s.salaryNumeric.toLocaleString('de-CH')}/yr
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <Card className="mt-6 bg-gradient-to-r from-bg-card to-accent/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <TrendingUp size={24} className="text-accent" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Income Growth Trajectory</h3>
            <p className="text-xs text-text-muted mt-0.5">
              From entry-level analyst to sovereign operator — your skills compound over time.
              The combination of certifications, real-world experience, and specialized knowledge
              creates exponential earning potential.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// --- Main VisionView ---------------------------------------------------------

export function VisionView() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const sectionRefs = useRef<Map<SectionId, HTMLElement>>(new Map());

  const registerRef = useCallback(
    (id: SectionId) => (el: HTMLElement | null) => {
      if (el) sectionRefs.current.set(id, el);
      else sectionRefs.current.delete(id);
    }, []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        let bestRatio = 0;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            best = entry;
          }
        }
        if (best) {
          const id = best.target.getAttribute('data-section') as SectionId;
          if (id) setActiveSection(id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback((id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-0">
      {/* Hero banner */}
      <VisionHero />

      {/* Mobile navigation (horizontal scroll tabs, visible only on small screens) */}
      <MobileTOC activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main layout: desktop sidebar + scrollable content */}
      <div className="flex gap-8 mt-6">
        {/* Desktop sticky sidebar TOC (hidden on mobile, shown on lg+) */}
        <VisionTOC activeSection={activeSection} onNavigate={handleNavigate} />

        {/* Content sections */}
        <div className="flex-1 min-w-0 space-y-2">
          <div ref={registerRef('masterplan')} data-section="masterplan">
            <MasterplanSection />
          </div>

          <div ref={registerRef('lifestyle')} data-section="lifestyle">
            <LifestyleSection />
          </div>

          <div ref={registerRef('skills-arsenal')} data-section="skills-arsenal">
            <SkillsArsenalSection />
          </div>

          <div ref={registerRef('deep-dives')} data-section="deep-dives">
            <DeepDivesSection />
          </div>

          <div ref={registerRef('famous-cases')} data-section="famous-cases">
            <FamousCasesSection />
          </div>

          <div ref={registerRef('certifications')} data-section="certifications">
            <CertsSection />
          </div>

          <div ref={registerRef('career-paths')} data-section="career-paths">
            <CareerPathsSection />
          </div>

          <div ref={registerRef('income')} data-section="income">
            <IncomeSection />
          </div>

          {/* Bottom spacer so last section can scroll into IntersectionObserver zone */}
          <div className="h-32" />
        </div>
      </div>
    </div>
  );
}
