import { useState, useEffect, useCallback } from 'react';
import {
  Brain, Bot, Shield, Sword, Zap, ExternalLink, Clock, ChevronDown, ChevronUp,
  AlertTriangle, BookOpen, RefreshCw, Cpu, Target, Search, Code, Eye,
  Layers, Sparkles, GraduationCap, TrendingUp, AlertCircle, Rss,
} from 'lucide-react';
import { Card } from '@/components/shared/Card.tsx';
import { cn } from '@/lib/utils.ts';

// ===== TYPES =====

interface AiTool {
  id: string;
  name: string;
  category: 'offensive' | 'defensive' | 'general';
  description: string;
  useCase: string;
  url: string;
  tags: string[];
  isHot?: boolean;
}

interface AiConcept {
  id: string;
  name: string;
  description: string;
  whyItMatters: string;
  icon: React.ReactNode;
}

interface AiStat {
  value: string;
  label: string;
  source: string;
}

interface AiNewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: Date;
  sourceName: string;
  description: string;
}

// ===== STATIC DATA =====

const AI_STATS: AiStat[] = [
  { value: '82%', label: 'der Hacker nutzen AI im Workflow', source: 'Bugcrowd 2026' },
  { value: '74%', label: 'sagen AI erhöht den Wert von Hacking', source: 'Bugcrowd 2026' },
  { value: '#2', label: 'wertvollster Skill laut Hackern (51%)', source: 'Bugcrowd 2026' },
  { value: '95%', label: 'sehen Hacking weiterhin als Kunstform', source: 'Bugcrowd 2026' },
];

const AI_TOOLS: AiTool[] = [
  // Offensive
  {
    id: 'pentestgpt',
    name: 'PentestGPT',
    category: 'offensive',
    description: 'AI-gestütztes Pentesting-Framework. Nutzt LLMs um Angriffsvektoren vorzuschlagen, Findings zu erklären und den Pentesting-Prozess Schritt für Schritt zu begleiten.',
    useCase: 'Interaktive Pentesting-Sessions wo die AI dich durch Enumeration, Exploitation und Post-Exploitation führt.',
    url: 'https://github.com/GreyDGL/PentestGPT',
    tags: ['Pentesting', 'LLM', 'Open Source'],
    isHot: true,
  },
  {
    id: 'nuclei',
    name: 'Nuclei + AI Templates',
    category: 'offensive',
    description: 'Template-basierter Vulnerability Scanner von ProjectDiscovery. Mit AI-generierten Templates können neue CVEs und Angriffsmuster schneller abgedeckt werden.',
    useCase: 'Automatisiertes Scannen großer Angriffsflächen mit Community-Templates + eigene AI-generierte Templates.',
    url: 'https://github.com/projectdiscovery/nuclei',
    tags: ['Scanning', 'Automation', 'Open Source'],
    isHot: true,
  },
  {
    id: 'caido',
    name: 'Caido',
    category: 'offensive',
    description: 'Moderne Alternative zu Burp Suite. Lightweight Web Security Testing mit AI-Features für automatische Analyse von HTTP-Traffic und Vulnerability-Erkennung.',
    useCase: 'Web App Pentesting mit AI-unterstützter Request-Analyse und automatischem Fuzzing.',
    url: 'https://caido.io',
    tags: ['Web Security', 'Proxy', 'Modern'],
  },
  {
    id: 'burp-ai',
    name: 'Burp Suite + AI Extensions',
    category: 'offensive',
    description: 'Der Industriestandard für Web App Testing. Neue AI-Extensions wie BurpGPT analysieren Responses automatisch und generieren Payloads.',
    useCase: 'Web App Pentesting mit AI-gestützter Payload-Generierung und automatischer Vulnerability-Klassifikation.',
    url: 'https://portswigger.net/burp',
    tags: ['Web Security', 'Industry Standard', 'Extensions'],
  },
  {
    id: 'reconftw',
    name: 'ReconFTW',
    category: 'offensive',
    description: 'Automatisiertes Recon-Framework das 30+ Tools orchestriert. Kombiniert mit AI-Analyse der Ergebnisse wird Bug Bounty Recon massiv beschleunigt.',
    useCase: 'Full-Scope Reconnaissance: Subdomains, Ports, URLs, JS-Analyse, Screenshot-Capture — alles automatisiert.',
    url: 'https://github.com/six2dez/reconftw',
    tags: ['Recon', 'Automation', 'Bug Bounty'],
  },
  {
    id: 'claude-code-review',
    name: 'Claude / ChatGPT für Code Review',
    category: 'offensive',
    description: 'LLMs als Code-Auditing-Partner. Messy JavaScript, obfuskierten Code oder massive Codebases analysieren, Vulnerabilities identifizieren, Exploits verstehen.',
    useCase: 'Source Code Review: Code einfügen, nach Vulns fragen, Exploitation-Strategien diskutieren.',
    url: 'https://claude.ai',
    tags: ['Code Review', 'LLM', 'Universal'],
    isHot: true,
  },
  {
    id: 'openai-codex',
    name: 'GitHub Copilot / Codex',
    category: 'offensive',
    description: 'AI-Coding-Assistent der Security-Tools, Custom Scripts und Exploit-Code in Sekunden generiert. Spart Stunden bei Tool-Development.',
    useCase: 'Custom Exploit-Scripts, Automation-Tools, Payload-Generatoren on-the-fly erstellen.',
    url: 'https://github.com/features/copilot',
    tags: ['Coding', 'Automation', 'Scripts'],
  },
  // Defensive
  {
    id: 'darktrace',
    name: 'Darktrace',
    category: 'defensive',
    description: 'Enterprise AI für Threat Detection. Lernt "normales" Netzwerkverhalten und erkennt Anomalien in Echtzeit — APTs, Insider Threats, Zero-Days.',
    useCase: 'SOC-Umgebungen: Automatische Erkennung von Lateral Movement, C2-Traffic, Datenexfiltration.',
    url: 'https://darktrace.com',
    tags: ['NDR', 'Anomaly Detection', 'Enterprise'],
  },
  {
    id: 'crowdstrike-charlotte',
    name: 'CrowdStrike Charlotte AI',
    category: 'defensive',
    description: 'Generative AI für CrowdStrike Falcon. Natürliche Sprache für Threat Hunting, automatische Incident-Zusammenfassungen, Remediation-Empfehlungen.',
    useCase: 'Incident Response: "Zeig mir alle verdächtigen Prozesse der letzten 24h" in natürlicher Sprache.',
    url: 'https://www.crowdstrike.com/platform/charlotte-ai/',
    tags: ['EDR', 'Threat Hunting', 'Enterprise'],
    isHot: true,
  },
  {
    id: 'security-copilot',
    name: 'Microsoft Security Copilot',
    category: 'defensive',
    description: 'AI-Assistent für Security Teams. Integriert sich in Microsoft Sentinel, Defender, Intune. Analysiert Incidents, generiert Reports, automatisiert Response.',
    useCase: 'SOC-Analysten: Incident-Triage, KQL-Queries generieren, Threat Intelligence zusammenfassen.',
    url: 'https://www.microsoft.com/security/business/ai-machine-learning/microsoft-security-copilot',
    tags: ['SIEM', 'Microsoft', 'Enterprise'],
  },
  {
    id: 'sentinelone-purple',
    name: 'SentinelOne Purple AI',
    category: 'defensive',
    description: 'AI-gestütztes Threat Hunting und Analyse für SentinelOne Singularity. Natürliche Sprache für komplexe Queries über Endpoint-Daten.',
    useCase: 'Threat Hunting: "Finde alle Prozesse die PowerShell encoded commands nutzen" als Text-Query.',
    url: 'https://www.sentinelone.com/purple-ai/',
    tags: ['EDR', 'Threat Hunting', 'Enterprise'],
  },
  // General
  {
    id: 'owasp-llm',
    name: 'OWASP Top 10 for LLMs',
    category: 'general',
    description: 'Der Standard für LLM-Sicherheit. Definiert die 10 kritischsten Risiken: Prompt Injection, Data Leakage, Insecure Output Handling, Model Theft, etc.',
    useCase: 'Referenz für AI Security Assessments und Pentests von LLM-Applikationen.',
    url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/',
    tags: ['Standard', 'LLM Security', 'Reference'],
    isHot: true,
  },
  {
    id: 'garak',
    name: 'garak (LLM Vulnerability Scanner)',
    category: 'general',
    description: 'Open-Source-Scanner für LLM-Vulnerabilities. Testet auf Prompt Injection, Jailbreaks, Data Leakage, Hallucinations und andere LLM-spezifische Schwachstellen.',
    useCase: 'AI Red Teaming: Automatisierte Tests gegen LLM-Deployments um Schwachstellen zu finden.',
    url: 'https://github.com/NVIDIA/garak',
    tags: ['AI Red Team', 'LLM Testing', 'Open Source'],
  },
  {
    id: 'ai-exploit-db',
    name: 'AI Exploit Database / AVID',
    category: 'general',
    description: 'Datenbank für AI-Vulnerabilities und Incidents. Dokumentiert reale Angriffe auf AI-Systeme, Failure Modes und Mitigations.',
    useCase: 'Recherche: Welche AI-Angriffe gibt es? Welche Modelle wurden kompromittiert? Welche Defenses funktionieren?',
    url: 'https://avidml.org',
    tags: ['Database', 'Research', 'Incidents'],
  },
];

const AI_CONCEPTS: AiConcept[] = [
  {
    id: 'prompt-injection',
    name: 'Prompt Injection',
    description: 'Manipulation von LLM-Inputs um ungewollte Aktionen auszulösen. Direct Injection (User-Input) und Indirect Injection (über externe Datenquellen wie Webseiten, E-Mails, Dokumente).',
    whyItMatters: 'Die #1 Vulnerability in LLM-Applikationen. Jede App die User-Input an ein LLM weitergibt ist potenziell verwundbar.',
    icon: <AlertTriangle size={18} />,
  },
  {
    id: 'llm-owasp',
    name: 'OWASP LLM Top 10',
    description: 'Die 10 kritischsten Risiken für LLM-Applikationen: Prompt Injection, Insecure Output Handling, Training Data Poisoning, Model DoS, Supply Chain Vulns, etc.',
    whyItMatters: 'Der neue Standard den jeder Pentester kennen muss. Firmen deployen LLMs ohne Security Review — riesiger Markt.',
    icon: <Shield size={18} />,
  },
  {
    id: 'ai-red-teaming',
    name: 'AI Red Teaming',
    description: 'Systematisches Testen von AI-Systemen auf Schwachstellen, Bias, Hallucinations und ungewolltes Verhalten. Kombiniert traditionelles Red Teaming mit AI-spezifischen Techniken.',
    whyItMatters: 'Neues Feld mit wenig Experten. Google, Microsoft, OpenAI suchen alle AI Red Teamer — und zahlen Premium.',
    icon: <Target size={18} />,
  },
  {
    id: 'adversarial-ml',
    name: 'Adversarial Machine Learning',
    description: 'Angriffe auf ML-Modelle: Evasion Attacks (Inputs manipulieren), Poisoning (Training Data vergiften), Model Extraction (Modell stehlen), Membership Inference.',
    whyItMatters: 'Autonome Fahrzeuge, Gesichtserkennung, Fraud Detection — alles ML-basiert und alles angreifbar.',
    icon: <Cpu size={18} />,
  },
  {
    id: 'agent-security',
    name: 'AI Agent Security',
    description: 'Sicherheit von autonomen AI-Agenten die Tools nutzen, Code ausführen und mit externen Systemen interagieren. Neue Angriffsfläche: Tool Poisoning, Privilege Escalation via Agent.',
    whyItMatters: '2026 ist das Jahr der AI Agents. Jeder deployed sie, kaum jemand sichert sie ab. Massive Opportunity.',
    icon: <Bot size={18} />,
  },
  {
    id: 'rag-poisoning',
    name: 'RAG Poisoning',
    description: 'Manipulation von Retrieval-Augmented Generation Systemen. Einschleusen von bösartigen Dokumenten in die Wissensbasis die dann vom LLM als vertrauenswürdig behandelt werden.',
    whyItMatters: 'Jedes Unternehmen baut RAG-basierte Chatbots. Indirect Prompt Injection über Dokumente ist der Angriffsvektor.',
    icon: <Layers size={18} />,
  },
];

const AI_FEEDS = [
  { name: 'The Hacker News', feedUrl: 'https://feeds.feedburner.com/TheHackersNews', emoji: '🔴' },
  { name: 'BleepingComputer', feedUrl: 'https://www.bleepingcomputer.com/feed/', emoji: '💻' },
  { name: 'SecurityWeek', feedUrl: 'https://www.securityweek.com/feed/', emoji: '📰' },
];

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const AI_CACHE_KEY = 'sovereign-ai-news-cache';
const CACHE_TTL = 2 * 60 * 60 * 1000;

const AI_KEYWORDS = /\b(ai|artificial intelligence|llm|gpt|chatgpt|claude|copilot|machine learning|deep learning|neural|genai|generative|openai|anthropic|gemini|model|prompt injection|adversarial|rag|agent|autonomous)\b/i;

// ===== HELPERS =====

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function relativeTimeDE(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMs / 3600000);
  const diffD = Math.floor(diffMs / 86400000);
  if (diffMin < 1) return 'Gerade eben';
  if (diffMin < 60) return `vor ${diffMin} Min.`;
  if (diffH < 24) return `vor ${diffH} Std.`;
  if (diffD === 1) return 'Gestern';
  if (diffD < 7) return `vor ${diffD} Tagen`;
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
}

function parseRSS(xml: string, sourceName: string, emoji: string): AiNewsItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  if (doc.querySelector('parsererror')) return [];
  const items: AiNewsItem[] = [];
  const rssItems = doc.querySelectorAll('item');
  rssItems.forEach((item, i) => {
    if (i >= 30) return;
    const title = item.querySelector('title')?.textContent?.trim() || '';
    const link = item.querySelector('link')?.textContent?.trim() || '';
    const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
    const desc = item.querySelector('description')?.textContent?.trim() || '';
    const fullText = `${title} ${desc}`;
    if (title && link && AI_KEYWORDS.test(fullText)) {
      items.push({
        id: `${sourceName}-${i}`,
        title,
        link,
        pubDate: pubDate ? new Date(pubDate) : new Date(),
        sourceName: `${emoji} ${sourceName}`,
        description: stripHtml(desc).slice(0, 250),
      });
    }
  });
  return items;
}

// ===== COMPONENTS =====

function AiHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/20 via-bg-card to-accent/10 border border-purple-500/20 p-6 md:p-8 mb-6">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Brain size={24} className="text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">AI & HACKING</h1>
            <p className="text-xs text-text-muted">Tools, Konzepte & News — alles was du wissen musst</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {AI_STATS.map((s, i) => (
            <div key={i} className="bg-bg-card/60 backdrop-blur rounded-lg p-3 border border-border/50">
              <div className="text-xl font-black text-purple-400">{s.value}</div>
              <div className="text-[10px] text-text-muted leading-tight mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-purple-500/5 blur-3xl" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-accent/5 blur-3xl" />
    </div>
  );
}

function AiToolsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'offensive' | 'defensive' | 'general'>('all');

  const filtered = filter === 'all' ? AI_TOOLS : AI_TOOLS.filter(t => t.category === filter);

  const catLabel = { offensive: 'Offensive', defensive: 'Defensive', general: 'AI Security' };
  const catColor = { offensive: 'text-red-400 bg-red-400/10', defensive: 'text-blue-400 bg-blue-400/10', general: 'text-purple-400 bg-purple-400/10' };
  const catIcon = { offensive: <Sword size={14} />, defensive: <Shield size={14} />, general: <Brain size={14} /> };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
        <Zap size={20} className="text-purple-400" /> AI Tools Arsenal
      </h2>
      <p className="text-xs text-text-muted mb-4">{AI_TOOLS.length} kuratierte Tools für AI-gestütztes Hacking & Defense</p>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {(['all', 'offensive', 'defensive', 'general'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border',
            filter === f ? 'bg-purple-500 text-white border-purple-500' : 'bg-bg-card text-text-muted border-border hover:text-text'
          )}>
            {f === 'all' ? `Alle (${AI_TOOLS.length})` : `${catLabel[f]} (${AI_TOOLS.filter(t => t.category === f).length})`}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(tool => {
          const isOpen = expanded === tool.id;
          return (
            <Card key={tool.id} className={cn('cursor-pointer', isOpen && 'border-purple-500/30')}>
              <button className="w-full text-left" onClick={() => setExpanded(isOpen ? null : tool.id)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-sm">{tool.name}</h3>
                      {tool.isHot && <span className="text-[9px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded-full font-bold">HOT</span>}
                      <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-1', catColor[tool.category])}>
                        {catIcon[tool.category]} {catLabel[tool.category]}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted">{tool.description}</p>
                  </div>
                  {isOpen ? <ChevronUp size={16} className="text-text-muted shrink-0" /> : <ChevronDown size={16} className="text-text-muted shrink-0" />}
                </div>
              </button>

              {isOpen && (
                <div className="mt-3 pt-3 border-t border-border space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-text-muted uppercase">Use Case</span>
                    <p className="text-xs text-text-muted mt-1">{tool.useCase}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {tool.tags.map(t => (
                        <span key={t} className="text-[10px] bg-bg-hover text-text-muted px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-purple-400 hover:underline shrink-0">
                      Öffnen <ExternalLink size={10} />
                    </a>
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

function AiConceptsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
        <GraduationCap size={20} className="text-purple-400" /> AI Security Konzepte
      </h2>
      <p className="text-xs text-text-muted mb-4">Die wichtigsten Angriffsvektoren und Konzepte die du kennen musst</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {AI_CONCEPTS.map(concept => {
          const isOpen = expanded === concept.id;
          return (
            <Card key={concept.id} className={cn('cursor-pointer', isOpen && 'border-purple-500/30')}>
              <button className="w-full text-left" onClick={() => setExpanded(isOpen ? null : concept.id)}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                    {concept.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm mb-1">{concept.name}</h3>
                    <p className="text-xs text-text-muted">{concept.description}</p>
                  </div>
                </div>
              </button>
              {isOpen && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-purple-500/5">
                    <Sparkles size={12} className="text-purple-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-purple-400 uppercase">Warum es wichtig ist</span>
                      <p className="text-xs text-text-muted mt-0.5">{concept.whyItMatters}</p>
                    </div>
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

function AiNewsFeed() {
  const [news, setNews] = useState<AiNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAiNews = useCallback(async (force = false) => {
    if (!force) {
      try {
        const raw = localStorage.getItem(AI_CACHE_KEY);
        if (raw) {
          const data = JSON.parse(raw);
          if (Date.now() - data.fetchedAt < CACHE_TTL) {
            setNews(data.items.map((i: AiNewsItem & { pubDate: string }) => ({ ...i, pubDate: new Date(i.pubDate) })));
            setLoading(false);
            return;
          }
        }
      } catch { /* ignore */ }
    }

    setLoading(true);
    const allItems: AiNewsItem[] = [];

    const results = await Promise.allSettled(
      AI_FEEDS.map(async (source) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);
        try {
          const res = await fetch(CORS_PROXY + encodeURIComponent(source.feedUrl), { signal: controller.signal });
          if (!res.ok) throw new Error();
          const xml = await res.text();
          return parseRSS(xml, source.name, source.emoji);
        } finally { clearTimeout(timeout); }
      })
    );

    results.forEach(r => { if (r.status === 'fulfilled') allItems.push(...r.value); });
    allItems.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

    setNews(allItems);
    setError(allItems.length === 0);
    setLoading(false);

    try {
      localStorage.setItem(AI_CACHE_KEY, JSON.stringify({
        items: allItems.map(i => ({ ...i, pubDate: i.pubDate.toISOString() })),
        fetchedAt: Date.now(),
      }));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchAiNews(); }, [fetchAiNews]);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Rss size={20} className="text-purple-400" /> AI Security News
          </h2>
          <p className="text-xs text-text-muted mt-0.5">Automatisch gefiltert — nur AI-relevante Artikel</p>
        </div>
        <button onClick={() => fetchAiNews(true)} disabled={loading}
          className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-400 hover:bg-purple-500/20', loading && 'opacity-50')}>
          <RefreshCw size={14} className={cn(loading && 'animate-spin')} />
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12 gap-3">
          <RefreshCw size={20} className="animate-spin text-purple-400" />
          <span className="text-text-muted text-sm">AI News werden geladen...</span>
        </div>
      )}

      {error && !loading && (
        <Card className="p-6 text-center">
          <AlertCircle size={24} className="mx-auto text-text-muted mb-2" />
          <p className="text-xs text-text-muted">Feeds nicht erreichbar. Versuche es später erneut.</p>
        </Card>
      )}

      {!loading && news.length === 0 && !error && (
        <Card className="p-6 text-center">
          <Brain size={24} className="mx-auto text-text-muted mb-2" />
          <p className="text-xs text-text-muted">Aktuell keine AI-relevanten Artikel gefunden.</p>
        </Card>
      )}

      {!loading && news.length > 0 && (
        <div className="space-y-2">
          {news.slice(0, 15).map(item => (
            <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="block group">
              <Card className="p-3 hover:border-purple-500/30 transition-colors">
                <div className="flex items-start gap-3">
                  <Bot size={16} className="text-purple-400 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] text-text-muted">{item.sourceName}</span>
                      <span className="text-[10px] text-text-muted flex items-center gap-0.5">
                        <Clock size={8} /> {relativeTimeDE(item.pubDate)}
                      </span>
                    </div>
                    <h3 className="text-xs font-medium group-hover:text-purple-400 transition-colors leading-snug">{item.title}</h3>
                  </div>
                  <ExternalLink size={12} className="text-text-muted group-hover:text-purple-400 mt-0.5 shrink-0" />
                </div>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function AiResources() {
  const resources = [
    { name: 'OWASP Top 10 for LLMs', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', desc: 'Der Standard für LLM-Sicherheit' },
    { name: 'PortSwigger AI Labs', url: 'https://portswigger.net/web-security/llm-attacks', desc: 'Hands-on Labs für LLM-Angriffe' },
    { name: 'HackTheBox AI Challenges', url: 'https://www.hackthebox.com', desc: 'AI/ML Security Challenges' },
    { name: 'NVIDIA AI Red Team (garak)', url: 'https://github.com/NVIDIA/garak', desc: 'Open-Source LLM Vulnerability Scanner' },
    { name: 'Prompt Injection Playground', url: 'https://gandalf.lakera.ai', desc: 'Interaktives Training für Prompt Injection' },
    { name: 'AI Village (DEF CON)', url: 'https://aivillage.org', desc: 'Community für AI Security Research' },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
        <BookOpen size={20} className="text-purple-400" /> Lernressourcen
      </h2>
      <p className="text-xs text-text-muted mb-4">Die besten Ressourcen um AI Security zu lernen</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {resources.map(r => (
          <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="group">
            <Card className="p-3 hover:border-purple-500/30 transition-colors h-full">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold group-hover:text-purple-400 transition-colors">{r.name}</h3>
                  <p className="text-[10px] text-text-muted mt-0.5">{r.desc}</p>
                </div>
                <ExternalLink size={12} className="text-text-muted group-hover:text-purple-400 shrink-0 mt-0.5" />
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}

// ===== MAIN =====

export function AiView() {
  return (
    <div className="max-w-4xl mx-auto space-y-0">
      <AiHero />
      <AiToolsSection />
      <AiConceptsSection />
      <AiNewsFeed />
      <AiResources />
    </div>
  );
}
