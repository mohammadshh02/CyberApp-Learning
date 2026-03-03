import { useState } from 'react';
import {
  Zap, Shield, Cpu, Bug, Brain, Gavel, Siren, ChevronDown, ChevronUp,
  TrendingUp, Users, Lock, Award, Target, AlertTriangle, Factory,
  Wifi, Microscope, Rocket, DollarSign, Crown, Star, Crosshair,
  Globe, Landmark, Flame, Building2, Droplets, Fuel,
  Briefcase, Phone, Banknote, Video, Clock, FileCheck,
  Truck, Heart, Scale, Wheat, Megaphone, ArrowRight, Package,
  HandCoins, Hospital, Anchor, ServerCrash, ShieldAlert, KeyRound, MessageSquare,
  CircuitBoard, Stethoscope, ShieldCheck, Ship, GraduationCap, MapPin, Bolt,
} from 'lucide-react';
import { cn } from '@/lib/utils.ts';

/* ================================================================
   SHORTCUT VIEW — Die AI-sichere Cybersecurity-Strategie 2026
   Basierend auf umfangreicher Marktrecherche (ISC2, SANS, BLS,
   Glassdoor, ZipRecruiter, SecurityWeek, WEF, Bugcrowd, etc.)
   ================================================================ */

// ===================== DATA =====================

interface UltraNiche {
  id: string;
  rank: number;
  name: string;
  icon: React.ReactNode;
  color: string;
  practitioners: string;
  hourlyRate: string;
  salaryRange: string;
  aiReplaceable: string;
  demandLevel: string;
  marketSize?: string;
  growthRate?: string;
  dacRelevance: string;
  description: string;
  whyAiProof: string[];
  keySkills: string[];
  certifications: string[];
  realWorldUse: string;
  entryPath: string;
  timeToMaster: string;
}

const ULTRA_NICHES: UltraNiche[] = [
  {
    id: 'ot-ics',
    rank: 1,
    name: 'OT/ICS/SCADA Security',
    icon: <Factory size={24} />,
    color: 'from-orange-500 to-red-600',
    practitioners: '~15.000-30.000 weltweit',
    hourlyRate: 'CHF 250-400+/h',
    salaryRange: '$102K-$209K (angestellt)',
    aiReplaceable: 'Unmöglich — physische Anlagen, Legacy-Systeme, Safety-kritisch',
    demandLevel: 'KRITISCH — größte Lücke in der gesamten Cybersecurity (ISC2)',
    marketSize: '$20.55 Mrd. (2026) → $41.82 Mrd. (2033)',
    growthRate: '10.86% CAGR',
    dacRelevance: 'Deutschland = Industrie 4.0 Weltmeister. Jede Fabrik, jedes Kraftwerk, jede Wasseranlage braucht OT-Security. Schweiz: Pharma + Energie. Fast KEINE Freelancer verfügbar.',
    description: 'Schutz von industriellen Steuerungssystemen — Kraftwerke, Wasserwerke, Fabriken, Transportsysteme. Die meisten Anlagen laufen auf 20+ Jahre alter Software. Über die Hälfte der ICS-Profis haben weniger als 5 Jahre Erfahrung. Oft gibt es nur 1-2 Personen pro Anlage für OT-Security.',
    whyAiProof: [
      'Erfordert physischen Zugang zu industriellen Anlagen',
      'Legacy-Protokolle (Modbus, DNP3, OPC) — keine AI-Tools dafür',
      'Jede Anlage ist einzigartig — kein standardisierbarer Ansatz',
      'Falscher automatisierter Patch kann physische Zerstörung verursachen',
      'Verständnis von Physik + Engineering + IT gleichzeitig nötig',
    ],
    keySkills: ['Modbus/DNP3/OPC Protokolle', 'SPS/PLC Programmierung', 'Network Segmentation', 'IEC 62443', 'NERC CIP Compliance', 'Air-Gap Assessment', 'Safety-System Analyse'],
    certifications: ['GICSP (GIAC)', 'GRID (GIAC)', 'ICS-CERT Training', 'SANS ICS515'],
    realWorldUse: '2021: Colonial Pipeline — ein Ransomware-Angriff legte die größte US-Benzinpipeline lahm. Ein OT-Security-Experte hätte die IT/OT-Segmentierung verhindern können. Schaden: $4.4M Lösegeld + Benzinknappheit an der US-Ostküste.',
    entryPath: 'Netzwerk-Grundlagen → IT-Security Basis → ICS/SCADA Kurse (SANS ICS410) → GICSP Zertifizierung → Praktikum bei Energieversorger/Industriebetrieb',
    timeToMaster: '18-24 Monate (nach IT-Security Basis)',
  },
  {
    id: 'exploit-dev',
    rank: 2,
    name: 'Exploit Development / Zero-Day Research',
    icon: <Bug size={24} />,
    color: 'from-red-500 to-pink-600',
    practitioners: '~3.000-5.000 weltweit',
    hourlyRate: 'CHF 300+/h (Consulting) oder $100K-$9M pro Finding',
    salaryRange: '$130K-$276K (angestellt) / bis $9M pro Zero-Day',
    aiReplaceable: 'Unmöglich — erfordert kreatives laterales Denken gegen unbekannte Ziele',
    demandLevel: 'HOCH — winziger globaler Talent-Pool',
    marketSize: 'Zero-Day-Preise steigen 44% jährlich',
    dacRelevance: 'Weltweit einsetzbar. Crowdfense zahlt bis $30M für Exploits. Bug Bounties global. Kein lokaler Wettbewerb — du konkurrierst mit <5.000 Menschen weltweit.',
    description: 'Das Finden und Ausnutzen von bisher unbekannten Sicherheitslücken in Software und Hardware. Die OSEE-Zertifizierung hat nur ~100 Holder weltweit. Zero-Day-Preise steigen jährlich um 44%, weil Produkte immer sicherer werden und Exploits wertvoller.',
    whyAiProof: [
      'Exploit-Chains erfordern kreatives Multi-Step-Reasoning über System-Schichten',
      'Zero-Day-Entdeckung hängt von unkonventionellem Denken ab',
      'Jedes Zielsystem ist architektonisch einzigartig',
      'Zuverlässige Exploits schreiben erfordert Hardware-Software-Interaktionsverständnis',
      'AI kann bekannte Patterns finden, aber keine working Exploits für neue Targets entwickeln',
    ],
    keySkills: ['x86/ARM Assembly', 'Stack/Heap Overflow', 'ROP/JOP Chains', 'Kernel Exploitation', 'Browser Exploitation', 'Fuzzing (AFL, LibFuzzer)', 'Ghidra/IDA Pro', 'WinDbg/GDB'],
    certifications: ['OSEE (~100 Holder!)', 'OSCE3 (~500-1.000 Holder)', 'OSED', 'GXPN (~2.600 Holder)'],
    realWorldUse: 'Crowdfense bietet aktuell: iOS Zero-Click $5-7M, Android Full Chain $5M, SMS/MMS Zero-Click bis $9M. Ein einzelner Zero-Day kann mehr einbringen als ein ganzes Jahresgehalt als CISO.',
    entryPath: 'C/C++ Programmierung → Assembly (x86, ARM) → Buffer Overflows → OSCP → OSED → OSEE. Parallel: CTFs (pwn-Kategorie), CVE-Hunting',
    timeToMaster: '24-36 Monate (nach Programmier-Basis)',
  },
  {
    id: 'ai-red-team',
    rank: 3,
    name: 'AI Red Teaming',
    icon: <Brain size={24} />,
    color: 'from-purple-500 to-violet-600',
    practitioners: '<5.000 weltweit (brandneues Feld)',
    hourlyRate: 'CHF 250-350+/h',
    salaryRange: '$150K-$253K (angestellt) / $640K+ bei Top AI Labs',
    aiReplaceable: 'Unmöglich — erfordert kreatives adversariales Denken GEGEN AI-Systeme',
    demandLevel: 'EXPLOSIV — 60% der Organisationen werden AI Red Teaming bis 2026 einsetzen',
    growthRate: 'Schnellstes Wachstum aller Cybersecurity-Nischen',
    dacRelevance: 'EU AI Act schreibt adversariales Testen vor. Deutsche Industrie setzt massiv AI ein → braucht AI-Security. Kaum DACH-Experten verfügbar. Schweizer Banken = AI-Early-Adopters.',
    description: 'Das gezielte Angreifen und Testen von AI/ML-Systemen — Prompt Injection, Model Evasion, Data Poisoning, Jailbreaks, Model Extraction. Ein KOMPLETT neues Feld das erst seit 2024 existiert. OffSec hat gerade den AI-300 Kurs gelaunched.',
    whyAiProof: [
      'Fundamentell adversarial — erfordert menschliche Kreativität gegen Maschinen',
      'Neue Jailbreaks erfordern Denken AUSSERHALB der Training-Distribution',
      'Ethisches Urteil über schädliche Outputs braucht Menschen',
      'Sich schnell ändernde Angriffsfläche — Modelle ändern sich ständig',
      'Social Engineering von AI-Systemen erfordert psychologisches Verständnis',
    ],
    keySkills: ['Prompt Injection', 'Adversarial ML', 'Data Poisoning', 'RLHF/DPO Angriffe', 'Model Extraction', 'LLM Jailbreaking', 'OWASP LLM Top 10', 'RAG Poisoning'],
    certifications: ['OffSec AI-300 (NEU)', 'AIRTA+ / AIRTP+ (LearnPrompting)', 'HackTheBox AI Red Teamer Path'],
    realWorldUse: 'Jedes Unternehmen das AI einsetzt (also JEDES), braucht jemanden der die AI-Systeme auf Schwachstellen testet. EU AI Act Artikel 9 verlangt Risikobewertungen für High-Risk AI. ChatGPT, Claude, Gemini — alle haben Red Teams. Die nächste Generation von Pentests.',
    entryPath: 'ML/AI Grundlagen → OWASP LLM Top 10 → HackTheBox AI Path → OffSec AI-300 → Eigene Jailbreak-Forschung → Bug Bounties bei AI-Firmen',
    timeToMaster: '12-18 Monate (mit IT-Security Basis)',
  },
  {
    id: 'firmware-hw',
    rank: 4,
    name: 'Firmware & Hardware Hacking',
    icon: <Cpu size={24} />,
    color: 'from-cyan-500 to-blue-600',
    practitioners: '~5.000-10.000 weltweit',
    hourlyRate: 'CHF 250-400+/h',
    salaryRange: '$142K-$283K (90th Percentile)',
    aiReplaceable: 'Physisch unmöglich — Löten, Oszilloskop, Side-Channel, physische Manipulation',
    demandLevel: 'HOCH — IoT-Explosion (40 Mrd. Geräte bis 2030)',
    dacRelevance: 'Schweiz: Medizintechnik, Uhren-Industrie (Smartwatches), Pharma-IoT. Deutschland: Automotive, Industrie-IoT. Kaum Freelancer in DACH.',
    description: 'Analyse und Exploitation von Firmware in eingebetteten Systemen — IoT-Geräte, medizinische Geräte, Automotive ECUs, industrielle Controller. Erfordert physischen Zugang, Lötkolben, Logic Analyzer, und tiefes Verständnis von Hardware-Architekturen.',
    whyAiProof: [
      'Erfordert physische Interaktion mit Hardware — Löten, Probing, Messen',
      'Jede Hardware-Plattform hat einzigartige Architektur und Peripherie',
      'Side-Channel-Analyse hängt von analogen/physischen Messungen ab',
      'Firmware Reverse Engineering erfordert Verständnis von Custom Silicon',
      'Safety-kritische Umgebungen (Medizin, Auto) erfordern menschliche Aufsicht',
    ],
    keySkills: ['JTAG/SWD Debugging', 'SPI/I2C/UART Analyse', 'Side-Channel Attacks', 'Fault Injection', 'Firmware Extraction', 'ARM/MIPS Assembly', 'Ghidra/IDA für Embedded', 'Oscilloscope/Logic Analyzer'],
    certifications: ['Keine standardisierten — Skill wird über CTFs, CVEs, Talks demonstriert', 'GIAC GICSP (für industrielle Geräte)', 'DEF CON Hardware Hacking Village'],
    realWorldUse: 'Forscher haben Tesla-Autopilot über Hardware-Glitching geknackt, Herzschrittmacher über Bluetooth gehackt, und Smart-Home-Geräte als Botnetz-Knoten missbraucht. Jedes IoT-Gerät das du zuhause hast ist ein potenzielles Ziel.',
    entryPath: 'Elektronik-Grundlagen → Arduino/Raspberry Pi → Firmware-Dump Tools → Ghidra für Embedded → DEF CON HW Village → Eigene CVEs finden',
    timeToMaster: '18-24 Monate (erfordert Hardware-Investition ~€500-1.000)',
  },
  {
    id: 'expert-witness',
    rank: 5,
    name: 'Expert Witness / Forensik-Gutachter',
    icon: <Gavel size={24} />,
    color: 'from-amber-500 to-yellow-600',
    practitioners: 'Wenige Tausend weltweit (qualifiziert)',
    hourlyRate: 'CHF 400-1.200+/h',
    salaryRange: '$250-$1.500/h (Gerichtsaussage)',
    aiReplaceable: 'Unmöglich — Gericht erfordert menschliche Aussage und Verantwortlichkeit',
    demandLevel: 'HOCH — steigende Cybercrime-Fälle, Regulierung verschärft sich',
    dacRelevance: 'Deutsche Gerichte: Sachverständige (JVEG). Schweizer Gerichte: Gutachter. Extrem wenige qualifizierte Cyber-Forensik-Gutachter im DACH-Raum. Stundensätze in der Schweiz bei CHF 400+.',
    description: 'Als Sachverständiger vor Gericht über Cyberangriffe, Datendiebstahl, digitale Forensik aussagen. Erfordert nicht nur technisches Wissen, sondern auch die Fähigkeit, komplexe technische Sachverhalte für Richter und Anwälte verständlich zu erklären.',
    whyAiProof: [
      'Gerichte verlangen menschliche Aussage — AI kann nicht als Zeuge auftreten',
      'Jemand muss rechtlich/moralisch verantwortlich sein für forensische Befunde',
      'Chain-of-Custody erfordert physische Beweissicherung',
      'Richter und Anwälte brauchen jemanden der Fragen beantwortet',
      'Ethische Urteilsfähigkeit bei Privacy-Tradeoffs nötig',
    ],
    keySkills: ['Digitale Forensik', 'Chain-of-Custody', 'Beweissicherung', 'Gerichtsaussage', 'Gutachten schreiben', 'DSGVO/BDSG Kenntnisse', 'Kommunikation für Nicht-Techniker'],
    certifications: ['GCFA (GIAC Forensic Analyst)', 'GCFE (GIAC Forensic Examiner)', 'EnCE (EnCase Certified)', 'CCE (Certified Computer Examiner)'],
    realWorldUse: 'Bei jedem größeren Datenleck, Ransomware-Angriff oder Wirtschaftsspionage-Fall werden forensische Gutachter benötigt. Deutsche Gerichte zahlen nach JVEG, aber private Mandanten (Konzerne, Versicherungen) zahlen Marktpreise — CHF 400-1.200+/h.',
    entryPath: 'DFIR-Grundlagen → GCFA/GCFE → Forensik-Praxis bei Behörde oder Beratung → Gerichts-Erfahrung sammeln → Eigene Sachverständigen-Praxis',
    timeToMaster: '24-36 Monate (+ Gerichtserfahrung)',
  },
  {
    id: 'dfir',
    rank: 6,
    name: 'Incident Response (DFIR)',
    icon: <Siren size={24} />,
    color: 'from-rose-500 to-red-600',
    practitioners: '~20.000 weltweit (spezialisiert)',
    hourlyRate: 'CHF 250-400+/h (Retainer)',
    salaryRange: '$113K-$200K+ (angestellt)',
    aiReplaceable: 'Kaum — Vor-Ort-Arbeit, Krisenkommunikation, physische Beweissicherung',
    demandLevel: 'HOCH — 2.365 signifikante Cyberangriffe allein 2023',
    dacRelevance: 'Jedes deutsche Unternehmen >250 MA muss nach NIS2 Incident-Response-Pläne haben. Schweizer FINMA verlangt IR-Readiness. Retainer-Modell = planbares Einkommen.',
    description: 'Vor-Ort-Reaktion auf Cyberangriffe — Beweissicherung, System-Isolierung, Forensik, Kommunikation mit Management/Behörden/Presse. Die "Feuerwehr" der Cybersecurity. Erfordert Ruhe unter Druck und Entscheidungsfähigkeit mit unvollständigen Informationen.',
    whyAiProof: [
      'Physische Beweissicherung und Disk-Imaging vor Ort',
      'Entscheidungen unter Druck mit unvollständigen Informationen',
      'Koordination von Legal, PR, Engineering, Management',
      'Jeder Vorfall ist einzigartig — kein Playbook passt 1:1',
      'Kommunikation mit Vorstand, Behörden und Öffentlichkeit',
    ],
    keySkills: ['Disk Imaging', 'Memory Forensics', 'Log Analysis', 'Malware Triage', 'Network Forensics', 'Timeline Analysis', 'Krisenmanagement', 'Stakeholder-Kommunikation'],
    certifications: ['GCIH (GIAC Incident Handler)', 'GCFA (GIAC Forensic Analyst)', 'GNFA (GIAC Network Forensic Analyst)', 'SANS FOR508/FOR572'],
    realWorldUse: 'Wenn ein Krankenhaus von Ransomware getroffen wird, braucht man SOFORT einen IR-Spezialisten vor Ort. Kein AI-Tool kann zum Rechenzentrum fahren, Server isolieren, und gleichzeitig dem Klinikdirektor erklären was passiert ist.',
    entryPath: 'Blue Team Grundlagen → GCIH → Forensik-Praxis → GCFA → IR-Team bei MSSP oder Big4 → Eigene IR-Retainer',
    timeToMaster: '18-24 Monate',
  },
];

// ---- Dying Skills (what AI replaces) ----

interface DyingSkill {
  name: string;
  reason: string;
  timeline: string;
}

const DYING_SKILLS: DyingSkill[] = [
  { name: 'Tier-1 SOC Analyst (Alert-Triage)', reason: 'AI übernimmt 50%+ der Aufgaben bis 2028 (Gartner)', timeline: '2026-2028' },
  { name: 'Basis-Vulnerability-Scanning', reason: 'Automatisierte Tools ersetzen Scanner-basierte Pentests', timeline: '2025-2027' },
  { name: 'Compliance-Administration (manuell)', reason: 'AI-GRC-Plattformen automatisieren Dokumentation', timeline: '2026-2028' },
  { name: 'Einfache Log-Analyse', reason: 'SIEM + AI-Triage filtert automatisch', timeline: '2025-2027' },
  { name: 'Entry-Level Pentesting (nur Scanner)', reason: 'Stellenanzeigen für Security Analysts -53% seit 2022', timeline: '2024-2026' },
];

// ---- Rare Certs ----

interface RareCert {
  name: string;
  holders: string;
  difficulty: number; // 1-5
  issuer: string;
  examFormat: string;
  salaryImpact: string;
  focus: string;
}

const RARE_CERTS: RareCert[] = [
  { name: 'OSEE', holders: '~100 weltweit', difficulty: 5, issuer: 'OffSec', examFormat: '72h Exam — in-person Kurs nötig', salaryImpact: '+$50-80K', focus: 'Advanced Windows Exploit Development' },
  { name: 'OSCE3', holders: '~500-1.000 weltweit', difficulty: 5, issuer: 'OffSec', examFormat: '3 separate 48h Exams (OSWE+OSEP+OSED)', salaryImpact: '+$40-60K', focus: 'Multi-Domain Elite Offensive Security' },
  { name: 'GXPN', holders: '~2.600 weltweit', difficulty: 4, issuer: 'GIAC/SANS', examFormat: 'Proctored Exam + Advisory Board', salaryImpact: '+$30-50K', focus: 'Exploit Research & Advanced Pentesting' },
  { name: 'GREM', holders: '<10.000 weltweit', difficulty: 4, issuer: 'GIAC/SANS', examFormat: 'Proctored Exam', salaryImpact: '+$25-40K', focus: 'Reverse Engineering Malware' },
  { name: 'GICSP', holders: '~5.000-10.000', difficulty: 3, issuer: 'GIAC/SANS', examFormat: 'Proctored Exam', salaryImpact: '+$20-35K', focus: 'Industrial Cyber Security' },
  { name: 'GRID', holders: '~2.000-5.000', difficulty: 4, issuer: 'GIAC/SANS', examFormat: 'Proctored Exam', salaryImpact: '+$25-40K', focus: 'ICS Incident Response & Defense' },
  { name: 'OSED', holders: '<5.000', difficulty: 4, issuer: 'OffSec', examFormat: '48h Exam', salaryImpact: '+$30-50K', focus: 'Windows Exploit Development' },
  { name: 'AI-300 (OSAI)', holders: '<1.000 (NEU 2025)', difficulty: 3, issuer: 'OffSec', examFormat: '24h Exam', salaryImpact: '+$20-40K', focus: 'AI Red Teaming' },
];

// ---- Market stats ----

const MARKET_STATS = [
  { label: 'Offene Stellen', value: '4.8M', sub: 'weltweit unbesetzt (ISC2)', icon: <Users size={18} /> },
  { label: 'Arbeitslosenquote', value: '~0%', sub: 'in Cybersecurity', icon: <TrendingUp size={18} /> },
  { label: 'Wachstumsrate', value: '29%', sub: 'bis 2034 prognostiziert (BLS)', icon: <Rocket size={18} /> },
  { label: 'DE Markt', value: '€14 Mrd.', sub: '→ €24 Mrd. bis 2030', icon: <DollarSign size={18} /> },
];

// ---- Recommended path ----

interface PathStep {
  phase: string;
  months: string;
  title: string;
  focus: string[];
  cert?: string;
  outcome: string;
}

const RECOMMENDED_PATH: PathStep[] = [
  {
    phase: 'FOUNDATION',
    months: 'Monat 1-6',
    title: 'Basis + Erste Differenzierung',
    focus: [
      'Python, Linux, Netzwerk (wie geplant)',
      'OSCP-Vorbereitung parallel starten',
      'AI/ML Grundlagen + OWASP LLM Top 10',
      'Erste CTFs (pwn + web)',
    ],
    cert: 'CompTIA Security+ / eJPT',
    outcome: 'Solide Basis + erste AI-Security Kenntnisse',
  },
  {
    phase: 'DIFFERENZIERUNG',
    months: 'Monat 7-12',
    title: 'Nischen-Einstieg',
    focus: [
      'OSCP bestehen',
      'AI Red Teaming starten (HackTheBox Path + OffSec AI-300)',
      'Hardware Hacking Basics (Arduino, Firmware-Dumps)',
      'Erste ICS/SCADA Exposure (SANS ICS410 Material)',
    ],
    cert: 'OSCP + OffSec AI-300',
    outcome: 'OSCP + AI Red Team Cert = bereits Top 5% Kombination',
  },
  {
    phase: 'SPEZIALISIERUNG',
    months: 'Monat 13-18',
    title: 'Deep Niche Dive',
    focus: [
      'Exploit Development (OSED Vorbereitung)',
      'Firmware RE mit Ghidra (IoT-Geräte)',
      'ICS/SCADA tiefergehend (GICSP Vorbereitung)',
      'Bug Bounties starten (AI-fokussiert)',
    ],
    cert: 'OSED + GICSP',
    outcome: 'Rare Cert Combo — <10.000 Menschen weltweit haben beide',
  },
  {
    phase: 'ELITE',
    months: 'Monat 19-24',
    title: 'Ultra-Rare Status',
    focus: [
      'OSCE3 Track (OSWE + OSEP + OSED)',
      'Forensik-Grundlagen für Expert Witness Path',
      'Erste Freelance-Aufträge (CHF 200+/h)',
      'Community aufbauen mit echten Case Studies',
    ],
    cert: 'OSCE3 Teilcerts + GCFA',
    outcome: 'Top 0.1% — weltweit unter ~1.000 Menschen mit diesem Skill-Stack',
  },
  {
    phase: 'SOVEREIGN',
    months: 'Monat 25-36',
    title: 'Marktdominanz',
    focus: [
      'OSEE anstreben (die Krone)',
      'Expert Witness Praxis starten',
      'Retainer-Verträge (IR + Consulting)',
      'Cyber Army Community mit echten Aufträgen',
      'CHF 350-1.200/h für spezialisierte Aufträge',
    ],
    cert: 'OSEE (wenn ~100 Holder → du bist einer davon)',
    outcome: 'Unerreichbar. Kein AI, kein Wettbewerber kann dich ersetzen.',
  },
];

// ---- Zero-Day Prices ----

interface ZeroDayPrice {
  target: string;
  price: string;
  broker: string;
}

const ZERO_DAY_PRICES: ZeroDayPrice[] = [
  { target: 'SMS/MMS Zero-Click Full Chain', price: 'bis $9M', broker: 'Crowdfense' },
  { target: 'iOS Zero-Click Full Chain', price: '$5M-$7M', broker: 'Crowdfense' },
  { target: 'Android Full Chain', price: 'bis $5M', broker: 'Crowdfense' },
  { target: 'WhatsApp/iMessage Zero-Day', price: '$3M-$5M', broker: 'Crowdfense' },
  { target: 'Chrome Zero-Day', price: 'bis $3M', broker: 'Crowdfense' },
  { target: 'iOS Full Chain (Zero-Click)', price: 'bis $2.5M', broker: 'Zerodium' },
  { target: 'Microsoft Outlook RCE', price: '$400K', broker: 'Zerodium' },
];

// ---- OT/ICS Global Markets ----

interface GlobalMarket {
  region: string;
  icon: React.ReactNode;
  color: string;
  clients: string;
  sectors: string[];
  rate: string;
  whyOT: string;
}

const GLOBAL_OT_MARKETS: GlobalMarket[] = [
  {
    region: 'Deutschland',
    icon: <Building2 size={18} />,
    color: 'text-blue-400',
    clients: '29.000 NIS2-pflichtige Unternehmen',
    sectors: ['Automotive (VW, BMW, Bosch)', 'Chemie (BASF, Bayer)', 'Energie (RWE, E.ON)', 'Maschinenbau', 'Pharma'],
    rate: '€150-250/h',
    whyOT: 'Industrie 4.0 Weltmeister. NIS2 seit Dez 2025. €2,3 Mrd. jährliche Compliance-Kosten. BSI-Registrierung bis März 2026 Pflicht.',
  },
  {
    region: 'Schweiz',
    icon: <Landmark size={18} />,
    color: 'text-emerald-400',
    clients: 'Pharma, Energie, Finanzinfrastruktur',
    sectors: ['Roche & Novartis (Pharma-Produktion)', 'Axpo & Alpiq (Energie)', 'SBB (Transport)', 'Nestlé (Lebensmittel)'],
    rate: 'CHF 250-400/h',
    whyOT: 'Höchste Stundensätze in Europa. Pharma-Produktion ist 100% OT-abhängig. Fast NULL OT-Freelancer verfügbar.',
  },
  {
    region: 'Golf-Staaten (UAE, Saudi)',
    icon: <Fuel size={18} />,
    color: 'text-amber-400',
    clients: 'Saudi Aramco, ADNOC, NEOM, Qatar Energy',
    sectors: ['Öl & Gas Raffinerien', 'Petrochemie', 'Wasserentsalzung', 'Smart City (NEOM)', 'Stromnetze'],
    rate: '$400-800/h (steuerfrei)',
    whyOT: 'Größte OT-Infrastruktur der Welt. Nationale Sicherheit = unbegrenzte Budgets. Steuerfreies Einkommen. Extremer Mangel an lokalen Experten.',
  },
  {
    region: 'Asien (Singapur, Japan, Korea)',
    icon: <Globe size={18} />,
    color: 'text-cyan-400',
    clients: 'Halbleiter, Automotive, Schwerindustrie',
    sectors: ['TSMC, Samsung (Chip-Fabriken)', 'Toyota, Hyundai (Automotive)', 'Kraftwerke', 'Wasseraufbereitung'],
    rate: '$200-500/h',
    whyOT: 'Asiens Fertigungsindustrie ist das Rückgrat der Weltwirtschaft. Steigende Regulierung. Kaum lokale OT-Security-Expertise.',
  },
  {
    region: 'USA & Nordamerika',
    icon: <Flame size={18} />,
    color: 'text-red-400',
    clients: 'Energieversorger, Wasserwerke, DoE',
    sectors: ['Stromnetze (NERC CIP)', 'Öl-Pipelines', 'Wasserwerke', 'Chemie-Anlagen', 'Verteidigung'],
    rate: '$250-500/h',
    whyOT: 'Colonial Pipeline hat die Nation aufgeweckt. CISA drängt auf OT-Security. Massive Budgets für kritische Infrastruktur.',
  },
  {
    region: 'Europa (UK, Skandinavien, NL)',
    icon: <Droplets size={18} />,
    color: 'text-purple-400',
    clients: 'Energieversorger, Offshore-Wind, Wasserwerke',
    sectors: ['Nordsee Öl/Gas (UK, Norwegen)', 'Offshore-Windparks', 'Wasserinfrastruktur', 'Pharma (Irland)'],
    rate: '£200-400/h / €180-350/h',
    whyOT: 'NIS2 gilt EU-weit. UK hat eigene OT-Regulierung. Skandinavien investiert massiv in Energie-Security.',
  },
];

// ---- Generational Wealth Timeline ----

interface WealthPhase {
  year: string;
  title: string;
  income: string;
  incomeNum: number;
  description: string;
  milestones: string[];
  color: string;
}

const WEALTH_TIMELINE: WealthPhase[] = [
  {
    year: 'Jahr 1-2',
    title: 'FOUNDATION',
    income: '€80-120K brutto',
    incomeNum: 100,
    description: 'Erste OT/ICS-Aufträge über freelancermap.de + GULP. NIS2-Compliance-Beratung. 2-3 Kunden gleichzeitig.',
    milestones: ['GICSP Zertifizierung', 'Erste 3 NIS2-Kunden', 'Profil auf freelancermap.de', 'IEC 62443 Grundlagen'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    year: 'Jahr 3-5',
    title: 'ETABLIERUNG',
    income: '€200-350K brutto',
    incomeNum: 275,
    description: 'Schweizer Markt erschließen. Retainer-Verträge. 4-5 Stammkunden. Du wählst deine Projekte.',
    milestones: ['Schweizer Klienten (Pharma, Energie)', 'Retainer-Modell (€15-25K/Monat Basis)', 'GRID + IEC 62443 Expert', 'Erste Gulf-Kontakte aufbauen'],
    color: 'from-cyan-500 to-emerald-500',
  },
  {
    year: 'Jahr 5-8',
    title: 'INTERNATIONAL',
    income: '€350-600K brutto',
    incomeNum: 475,
    description: 'Gulf-Staaten und Asien dazu. Öl/Gas, Petrochemie, Smart Cities. Steuerfreie Projekte in UAE/Saudi. Erste Investments.',
    milestones: ['Saudi Aramco / ADNOC Projekte', 'Steuerfreies Einkommen Gulf', 'Erste Immobilien-Investments', 'Team aufbauen (2-3 Leute)'],
    color: 'from-emerald-500 to-amber-500',
  },
  {
    year: 'Jahr 8-12',
    title: 'BOUTIQUE',
    income: '€600K-1.2M brutto',
    incomeNum: 900,
    description: 'Eigene OT-Security-Boutique. 5-10 Spezialisten. Du akquirierst — dein Team liefert. DACH + Gulf + Asien.',
    milestones: ['Eigene Firma mit 5-10 Operatoren', 'Rahmenverträge mit Konzernen', 'Expert Witness als Premium-Add-On', 'Generational Wealth Portfolio aufbauen'],
    color: 'from-amber-500 to-orange-500',
  },
  {
    year: 'Jahr 12+',
    title: 'GENERATIONAL WEALTH',
    income: '€1M+ / Jahr',
    incomeNum: 1200,
    description: 'Dein Name ist die Marke. Immobilien, Investments, passive Einkommen. Du arbeitest weil du willst — nicht weil du musst.',
    milestones: ['Immobilien-Portfolio', 'Investment-Portfolio', 'Deine Marke = Branchenstandard', 'Vollständige finanzielle Souveränität'],
    color: 'from-orange-500 to-red-500',
  },
];

// ===================== BUNKER BAUER TEC — QUICK MONEY PLAYBOOK DATA =====================

interface BBTProduct {
  name: string;
  icon: React.ReactNode;
  color: string;
  tagline: string;
  description: string;
  features: string[];
  killerFact: string;
  dealValue: string;
  provision: string;
  targetGroups: string[];
}

const BBT_PRODUCTS: BBTProduct[] = [
  {
    name: 'VPSC (VPN-Killer)',
    icon: <KeyRound size={20} />,
    color: 'from-blue-500 to-cyan-600',
    tagline: 'Zero Trust auf Anwendungsebene — architektonisch unknackbar',
    description: 'KEIN VPN-Variant — fundamental anderes Kommunikationsmodell. Layer 7 (App-Ebene), keine Netzwerk-Kopplung, Client wird NIE Mitglied des Remote-Netzwerks. RAM-only Tunnel, eigene CA, 32-Bit Mikroprozessor-Token (Atmel AT32UC3A3, 84MHz, FIPS PUB 197 AES-Engine). Token ist für OS komplett UNSICHTBAR bis Fingerabdruck verifiziert.',
    features: [
      'Layer 7 App-Ebene (NICHT Netzwerk-Layer wie VPN)',
      'RAM-only = null Datenspuren, forensisch unwiederherstellbar',
      '9-Stufen Defence-in-Depth (3 Sicherheitsblöcke)',
      'Mikroprozessor-Token: 32-Bit AVR32, 84MHz, HW-AES 22.8 MB/s',
      '3-Faktor: Biometrie + X.509 Zertifikat (2048-Bit) + PIN',
      'Eigene CA — akzeptiert NUR eigene Zertifikate (kein Supply-Chain-Risiko)',
      'Personifizierter Perfect Forward Secrecy (PPFS) pro User',
      'TLS 1.3 + AES-256 + SHA-384 + RSA 2048',
      '/dev/random (nicht /dev/urandom) für Krypto-Zufallszahlen',
      'Custom OpenSSL-Compilations pro Plattform',
      'Integriert: SSO, Portable Apps, Browser, VoIP, Wake-on-LAN, File-Transfer',
      'Citrix-Gateway OHNE Receiver/NetScaler-Lizenzen',
      'RDP-Gateway OHNE offene Ports nach außen',
      'INP (Internal Network Protection) — Microsegmentierung im LAN',
      'Localhost-Shares: Remote-Shares an 127.0.0.1 gebunden',
      'OT/ICS-Isolation: Produktionsanlagen abgeschirmt',
      '15/15 Pentest (Privia Security, 15 Angriffsvektoren)',
      'TeleTrusT: Keine Backdoors (rechtlich bindend)',
      '0 CVEs + greenhats Security-Siegel (4.0/5)',
    ],
    killerFact: 'Architektonisch ANDERS als VPN: Kein virtueller NIC, keine IP aus dem Zielnetz, Client kennt Remote-Netzwerk nicht. Lateral Movement ist nicht schwer — es ist UNMÖGLICH. Der Token ist ein vollwertiger 32-Bit Microcontroller (nicht nur ein USB-Stick), unsichtbar für das OS bis Fingerprint passt.',
    dealValue: '€50.000-80.000 (200 User, Mittelstand)',
    provision: '€5.000-12.000 pro Deal (10-15%)',
    targetGroups: ['Mittelstand', 'Steuerberater', 'Kanzleien', 'Gesundheitswesen', 'KRITIS', 'Maschinenbau (OT-Isolation)', 'Schulen (EDUPLUS)'],
  },
  {
    name: 'Bunker Bauer HCI',
    icon: <ServerCrash size={20} />,
    color: 'from-purple-500 to-indigo-600',
    tagline: 'Hyperkonvergente Infrastruktur — Drei Tresore in einem Tresor',
    description: 'Min. 3 identische All-in-One Nodes + Backup. ALLE Lizenzen inklusive (Clustering, Compute, Storage, K8s, Monitoring, Zero Trust, PKI, SSO, Billing, Multi-Tenancy). Ethernet-basiert (kein SAN/FC nötig). Fehlertolerant, beliebig skalierbar.',
    features: [
      'Alle Lizenzen inklusive — keine Zusatzkosten',
      'Skalierbar bis 200 PB (Messwerte vorhanden)',
      'S3-Benchmark: >160 GB/s Lesen, >90 GB/s Schreiben',
      'Disk-Performance: >630 GB/s (35 Nodes, 25 PB)',
      'Drei-Zonen-KRITIS-Modell (Kern/Netzwerke/Außen)',
      'Integriert: Router, LB, Firewall, VPN, K8s, VDI, S3/NFS/iSCSI',
      'NVMe + SAS + SATA parallel, Tier-System konfigurierbar',
      'Thin Provisioning, Erasure Coding, Replikation pro VM wählbar',
      'Multi-Tenancy: vollständig isolierte IaaS pro Mandant',
      'Web Panel + CLI + API Administration',
      'Ethernet-only (kein SAN/Fibre Channel nötig)',
      'Kein Migrationsaufwand bei Erweiterung',
      'EBOOST-Paket (Energie), EDUPLUS-Paket (Bildung)',
      '100% On-Premise, kein CLOUD Act',
    ],
    killerFact: 'S3-Messwerte (nicht Marketing): 35 Nodes = 20 PB nutzbar, >160 GB/s Lesen, >630 GB/s Disk. Drei-Zonen-Sicherheitsmodell für KRITIS. ALLE Lizenzen inklusive — VMware/Nutanix verlangen teure Extra-Lizenzen für jeden Service. Broadcom VMware-Preiserhöhungen 150-1500%.',
    dealValue: '€150.000-500.000 (KRITIS-Betreiber)',
    provision: '€15.000-50.000 pro Deal (10%)',
    targetGroups: ['Mittelstand ohne IT-Abteilung', 'KRITIS-Betreiber', 'Stadtwerke', 'Krankenhäuser', 'Schulen', 'Energieversorger'],
  },
  {
    name: 'Bunker Bauer Backup',
    icon: <Package size={20} />,
    color: 'from-emerald-500 to-green-600',
    tagline: 'Patentierte Technologie — Disk-Speed + physischer Air-Gap',
    description: 'Patentiert: Vereint Disk-Geschwindigkeit mit Tape-artiger physischer Medienentnahme. 4-Stufen-Generationenkonzept (Dedup→Tages→Wochen→Auslagerung). Laufwerke schalten jobgesteuert ab. Recovery in Minuten.',
    features: [
      'PATENTIERTE Hybrid-Technologie (Disk-Speed + physische Entnahme)',
      'Bis 60 TB/h Live-Backup, 18 TB/h Migration, 20 TB/h Dedup',
      '4-Stufen-Generationen: Dedup (90%) → Tages → Wochen/Monat → Auslagerung',
      'Großvater-Vater-Sohn: 21 Medien = 1 Jahr Rückverfolgung',
      'Stufe 2 läuft INTERN ohne Netzwerkbelastung',
      'Laufwerke schalten jobgesteuert ein/ab (Air-Gap)',
      'Medien physisch entnehmbar (Ransomware-proof)',
      'AES-256 verschlüsselt, WORM-Schutz',
      'Hot Standby: Kritische Server offline bereit, Recovery in Minuten',
      '100 TB Auslagerung an einem Wochenende',
      '6-24 Backup-Laufwerke, bis 1.024 TB Kapazität',
      'Bis zu 1.000 Sicherungsströme pro Medium',
      'Basel & KonTraG-konform',
      'Aufwärts-/abwärtskompatibel (alte Medien weiternutzbar)',
      'Kein Start-Stopp (anders als Tape), keine Reinigungsmedien',
      'Nx10/25/40/100 Gbit/s Netzwerkanbindung',
    ],
    killerFact: 'PATENTIERT — nicht kopierbar. Stufe 2 (Tages-Backup) läuft komplett intern OHNE Netzwerk. Direkter Vergleich: FAST LTA Silent Brick = ähnliche Idee, aber nur Storage-Target. sayFUSE = komplettes 4-Stufen-Generationen-SYSTEM mit Dedup (90%), interner Migration und physischer Auslagerung.',
    dealValue: '€5.000-8.000 (Einzelprodukt) / Teil von €200K+ Komplettpaketen',
    provision: '€1.500-50.000+ (je nach Paket)',
    targetGroups: ['JEDER mit Ransomware-Angst', 'Steuerberater (GoBD/Basel)', 'Krankenhäuser', 'KRITIS'],
  },
];

interface RevenueModel {
  name: string;
  icon: React.ReactNode;
  description: string;
  yourRole: string;
  provision: string;
  example: string;
  difficulty: string;
}

const REVENUE_MODELS: RevenueModel[] = [
  {
    name: 'Tippgeber-Provision',
    icon: <Phone size={18} />,
    description: 'Nur die Einführung (Warm Intro). Dein Partner macht den Rest.',
    yourRole: 'Warm Intro herstellen — das wars',
    provision: '3-7% des Dealwerts',
    example: 'Du kennst einen IT-Leiter → Warm Intro → Partner schließt €200K Deal → Du bekommst €10.000',
    difficulty: 'Sofort startbar',
  },
  {
    name: 'Qualifizierter Lead',
    icon: <Briefcase size={18} />,
    description: 'Intro + Erstgespräch + Bedarfsanalyse. Du filterst und qualifizierst.',
    yourRole: 'Erstgespräch führen, Bedarf klären, Termin für Partner setzen',
    provision: '10-15% des Dealwerts',
    example: 'VPSC für Mittelstand (200 User) → Dealwert €60K → Deine Provision €6.000-9.000',
    difficulty: 'Ab Woche 2',
  },
  {
    name: 'Full Cycle Vermittlung',
    icon: <HandCoins size={18} />,
    description: 'Kompletter Sales-Cycle: Lead → Präsentation → PoC → Abschluss.',
    yourRole: 'Alles — von Akquise bis Vertragsunterschrift',
    provision: '15-25% des Dealwerts',
    example: 'Komplettpaket Krankenhaus (VPSC+HCI+Backup) → Dealwert €400K → Deine Provision €60-100K',
    difficulty: 'Ab Monat 3',
  },
];

interface TargetCustomer {
  priority: number;
  name: string;
  icon: React.ReactNode;
  count: string;
  dealValue: string;
  whyNow: string;
  startable: string;
}

const TARGET_CUSTOMERS: TargetCustomer[] = [
  { priority: 1, name: 'Steuerberater', icon: <Scale size={16} />, count: '~95.000 in DE', dealValue: '€12-21K', whyNow: 'GoBD + E-Rechnung seit Jan 2025 Pflicht + Mandantengeheimnis', startable: 'Sofort' },
  { priority: 1, name: 'Rechtsanwälte', icon: <Gavel size={16} />, count: '~160.000 in DE', dealValue: '€5-20K', whyNow: 'Mandantenvertraulichkeit + DSGVO + Berufspflichten', startable: 'Sofort' },
  { priority: 1, name: 'Arztpraxen / MVZ', icon: <Heart size={16} />, count: '~100.000 in DE', dealValue: '€3-10K', whyNow: 'Patientendaten = höchste Schutzklasse, eHealth', startable: 'Sofort' },
  { priority: 2, name: 'Stadtwerke / EVU', icon: <Zap size={16} />, count: '~900 (120 in NRW)', dealValue: '€100K+', whyNow: 'KRITIS + NIS2, kein IT-Security-Team, regionale Partner bevorzugt', startable: 'Ab Monat 3' },
  { priority: 2, name: 'Krankenhäuser (200-700 Betten)', icon: <Hospital size={16} />, count: '~1.000 in DE', dealValue: '€150K+', whyNow: 'NIS2 + KHZG-Budget (645 Mio €!) muss ausgegeben werden', startable: 'Ab Monat 3' },
  { priority: 2, name: 'Maschinenbau / Auto-Zulieferer', icon: <Factory size={16} />, count: '~6.500 (1.000+ NIS2)', dealValue: '€80K+', whyNow: 'OT/IT-Konvergenz, Supply-Chain-Druck von OEMs', startable: 'Ab Monat 3' },
  { priority: 2, name: 'Logistik / Spedition', icon: <Truck size={16} />, count: '~3.000 (50+ MA)', dealValue: '€50K+', whyNow: 'NIS2 Transport-Sektor, extrem schlecht digitalisiert', startable: 'Ab Monat 3' },
  { priority: 2, name: 'Lebensmittel-Industrie', icon: <Wheat size={16} />, count: '~1.500 (50+ MA)', dealValue: '€80K+', whyNow: 'NIS2 Food-Sektor, denken an Hygiene nicht Cybersecurity, ZERO Konkurrenz', startable: 'Ab Monat 3' },
  { priority: 3, name: 'KRITIS-Betreiber', icon: <ShieldAlert size={16} />, count: '~4.500 direkt', dealValue: '€100K-1M+', whyNow: 'BSI-Pflicht, Bußgelder, Meldepflicht, KRITIS-Dachgesetz Jan 2026', startable: 'Ab Monat 6' },
  { priority: 3, name: 'Behörden / Ministerien', icon: <Landmark size={16} />, count: 'Alle Ebenen', dealValue: '€100K-5M+', whyNow: 'Souveränität, CLOUD Act, BSI-Vorgaben. BEREITS im Einsatz!', startable: 'Ab Monat 6' },
  { priority: 3, name: 'VAE / Golf-Staaten', icon: <Globe size={16} />, count: 'Smart Gov + Vision 2030', dealValue: '€200K-50M+', whyNow: 'Sovereign Cloud, Made in Germany = Premium, kein US-Zugriff', startable: 'Ab Monat 6-12' },
  { priority: 3, name: 'Afghanische/Iranische Diaspora', icon: <Users size={16} />, count: '~700.000 in DE', dealValue: '€5-20K', whyNow: 'Viele Unternehmer, vertrauen DIR sofort (Sprache+Kultur)', startable: 'Sofort' },
];

interface BlueOceanStrategy {
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  howTo: string[];
  potential: string;
  cost: string;
  timeline: string;
}

const BLUE_OCEAN_STRATEGIES: BlueOceanStrategy[] = [
  {
    name: 'NIS2-Feuerwehr',
    icon: <FileCheck size={18} />,
    color: 'text-red-400',
    description: 'NIS2-pflichtige Unternehmen kontaktieren die es noch nicht wissen. Dann Lösung vermitteln.',
    howTo: ['IHK-Mitgliederlisten nach Branchen filtern', 'NIS2-betroffene Branchen identifizieren', 'Anrufen: "Wissen Sie dass Ihr GF persönlich haftet?"', 'Termin vereinbaren → Bunker Bauer präsentieren'],
    potential: '29.000+ Unternehmen × 10% Conversion = 2.900 potentielle Deals',
    cost: '0 EUR',
    timeline: 'Sofort — FRIST 6. März 2026!',
  },
  {
    name: 'Supply-Chain-Druck',
    icon: <Package size={18} />,
    color: 'text-orange-400',
    description: 'NIS2 zwingt große Firmen, auch Zulieferer zur Compliance. Zulieferer haben Angst, Kunden zu verlieren.',
    howTo: ['Große NIS2-Firmen im Bundesanzeiger finden (kostenlos)', 'Deren Zulieferer finden (Wer-zu-Wem.de, LinkedIn, IHK)', '"Ihr Hauptkunde muss NIS2 umsetzen — Sie auch, sonst Auslistung"', 'Angst vor Umsatzverlust > Angst vor Bußgeld'],
    potential: 'Zulieferer entscheiden SCHNELLER — kürzerer Sales-Cycle',
    cost: '0 EUR',
    timeline: 'Sofort',
  },
  {
    name: 'Steuerberater-Paket',
    icon: <Scale size={18} />,
    color: 'text-emerald-400',
    description: 'Standardisiertes "Kanzlei Sicher"-Paket: VPSC + Backup = GoBD-konform + Mandantengeheimnis.',
    howTo: ['VPSC (10-20 User): €5.000-10.000', 'Bunker Bauer Backup: €5.000-8.000', 'Setup + Einweisung: €2.000-3.000', 'Total: €12.000-21.000 pro Kanzlei → Deine Provision (15%): €1.800-3.150'],
    potential: '5 Kanzleien/Monat = €9.000-15.750/Monat',
    cost: '0 EUR',
    timeline: 'Ab Woche 2',
  },
  {
    name: 'Krankenhaus-Retter',
    icon: <Hospital size={18} />,
    color: 'text-cyan-400',
    description: 'KHZG: 4,3 Mrd € Förderung — 15% PFLICHT für IT-Security = 645 Mio €. Viele haben Budget NOCH NICHT ausgegeben.',
    howTo: ['Krankenhäuser identifizieren die noch KHZG-Budget haben', 'NIS2 + KRITIS-Dachgesetz als Druck nutzen', 'Bunker Bauer als NIS2+KRITIS-konforme Lösung präsentieren', 'Ransomware auf Kliniken +46% in Q1 2025 als Argument'],
    potential: 'EIN großer Krankenhaus-Deal = 6 Monate Lebenshaltungskosten',
    cost: '0 EUR',
    timeline: 'Ab Monat 3-6',
  },
  {
    name: 'Kulturbrücke DACH-Orient',
    icon: <Globe size={18} />,
    color: 'text-amber-400',
    description: 'Deutsche Security-Lösungen in den Nahen Osten bringen. Dari/Paschto + Deutsch = MONOPOL.',
    howTo: ['"Made in Germany" = Premium im Nahen Osten', 'VAE-Kontakte über Partner bereits vorhanden', 'Sovereign Cloud Nachfrage: Kein US-Cloud-Act-Zugriff', 'ME CyberSec Markt: $16,75 Mrd → $26 Mrd bis 2030'],
    potential: 'Deals €200K-50M+ — steuerfrei in UAE. ZERO Konkurrenz.',
    cost: '0 EUR (Kontakte vorhanden)',
    timeline: 'Ab Monat 6-12',
  },
  {
    name: 'Webinar-Maschine',
    icon: <Video size={18} />,
    color: 'text-purple-400',
    description: 'Kostenlose Webinare: "NIS2 — Was Geschäftsführer JETZT wissen müssen". Am Ende: Bunker Bauer Demo.',
    howTo: ['Zoom Free (40 Min reicht)', 'LinkedIn-Post: "Kostenloses Webinar: NIS2 für [Branche]"', '30 Min Vortrag + 10 Min Produkt-Demo', 'Follow-up mit allen Teilnehmern'],
    potential: '10-50 Teilnehmer/Webinar, 2-5 warme Leads → 2 Webinare/Monat = 4-10 Leads',
    cost: '0 EUR',
    timeline: 'Ab Woche 3',
  },
  {
    name: '€0 Video-Marketing',
    icon: <Megaphone size={18} />,
    color: 'text-pink-400',
    description: '90-Sekunden-Video mit "39 Sekunden"-Hook. AI-Tools, null Kosten, 4 Plattformen.',
    howTo: ['ChatGPT/DALL-E → Bilder generieren', 'CapCut → Kostenloser Schnitt + Animation', 'ElevenLabs → Deutsches Voice-Over', '4 Formate: Website (120s), LinkedIn (60s), Reels (30-60s), YouTube Pre-Roll (15-30s)'],
    potential: 'Organische Reichweite → Inbound-Leads, die ZU DIR kommen',
    cost: '0 EUR',
    timeline: 'An einem Nachmittag produzierbar',
  },
];

const FEAR_STATS = [
  { stat: 'Alle 39 Sekunden ein Cyberangriff', source: 'University of Maryland' },
  { stat: 'Cybercrime-Schäden: $11,9 BILLIONEN/Jahr', source: 'Cybersecurity Ventures' },
  { stat: 'KI-Angriffe +72% in 12 Monaten', source: 'IBM X-Force' },
  { stat: 'VPN-Schwachstellen +82,5% (2020-2025)', source: 'Top10VPN 2024' },
  { stat: 'Ransomware-Angriffe +355% seit 2020', source: 'Cybersecurity Ventures' },
  { stat: '60% der KMU machen nach Angriff zu (6 Mo.)', source: 'Hiscox Report' },
  { stat: 'Ransomware-Forderung Ø $1,13 Mio.', source: 'Sophos 2025' },
  { stat: 'Supply-Chain-Schäden: $60 Mrd. → $138 Mrd. (2031)', source: 'MarketsAndMarkets' },
];

const KILLER_ARGUMENTS = {
  trust: [
    '15/15 Pentest (Privia Security, 15 Angriffsvektoren, 0 Schwachstellen)',
    'TeleTrusT: Rechtlich bindende Erklärung — KEINE Backdoors',
    'Bei deutschen Ministerien im produktiven Einsatz',
    'greenhats Security-Siegel (Maturity "sehr gut" 4.0/5)',
    'Eigene CA — keine externe Zertifizierungsstelle, kein Supply-Chain-Risiko',
  ],
  technical: [
    'KEIN VPN — Layer 7 App-Ebene, Client wird NIE Netzmitglied',
    '32-Bit Mikroprozessor-Token (Atmel, 84MHz, HW-AES, FIPS 197)',
    'RAM-only + eigene CA + Custom OpenSSL + /dev/random',
    'Patentierte Backup-Technologie (Disk-Speed + physische Entnahme)',
    'S3-Benchmark: >160 GB/s Lesen, >630 GB/s Disk (35 Nodes, gemessen)',
  ],
  market: [
    'Sweet Spot: Mittelstand 50-500 MA ohne IT-Team (NIS2-Panik)',
    'genua = Behörden/NATO, Zscaler = Cloud-First → BBT = On-Premise Mittelstand',
    'VPSC + HCI + Backup deckt ~40-50% der NIS2-Anforderungen',
    'NIS2: 29.500 Unternehmen, BSI-Frist 6. März 2026',
    'Broadcom VMware +150-1500% → Kunden suchen Alternative',
  ],
  honestLimitations: [
    'Null Gartner/Forrester Coverage — Enterprise-Einkauf schwierig',
    'genua (Bundesdruckerei) hat BSI CC EAL4+, NATO, 250K Bundeswehr-Lizenzen',
    'FAST LTA Silent Brick: ähnliche Backup-Idee, 21.6 TB/h, Veeam-Ready',
    'Proxmox VE (1.5M Hosts, kostenlos) und SUSE Harvester = EU HCI-Alternativen',
    'NIS2 braucht auch: ISMS, SIEM, IR-Plan, Training, Supply-Chain-Assessment',
  ],
};

// ===================== MONEY GLITCHES — WO DAS GELD FLIESST 2026 =====================

interface MoneyGlitch {
  id: number;
  law: string;
  product: string;
  why: string;
  target: string;
  dealSize: string;
  icon: React.ReactNode;
  color: string;
  urgency: 'JETZT' | 'Q3 2026' | 'LAUFEND';
}

const MONEY_GLITCHES: MoneyGlitch[] = [
  {
    id: 1,
    law: 'NIS2 (BSI-Frist 6. März 2026)',
    product: 'VPSC + Backup + HCI',
    why: 'GF haftet PERSÖNLICH. 8/10 Anforderungen abgedeckt. 30-40% noch nicht angefangen.',
    target: '29.500 Firmen (50+ MA, €10M+ Umsatz)',
    dealSize: '€5.000-200.000',
    icon: <ShieldAlert size={16} />,
    color: 'text-red-400',
    urgency: 'JETZT',
  },
  {
    id: 2,
    law: 'KRITIS-Dachgesetz',
    product: 'VPSC + HCI',
    why: '"Stand der Technik" Pflicht, BSI-Nachweis alle 2 Jahre',
    target: '4.500 Betreiber + 30.000 Zulieferer',
    dealSize: '€10.000-100.000',
    icon: <Factory size={16} />,
    color: 'text-orange-400',
    urgency: 'JETZT',
  },
  {
    id: 3,
    law: 'DORA Finanzsektor',
    product: 'VPSC + Backup',
    why: 'IKT-Risikomanagement, Incident Response, Resilienz-Tests Pflicht',
    target: 'Alle Banken / Versicherungen / Fintechs',
    dealSize: '€10.000-80.000',
    icon: <Banknote size={16} />,
    color: 'text-emerald-400',
    urgency: 'JETZT',
  },
  {
    id: 4,
    law: 'VMware/Broadcom-Flüchtlinge',
    product: 'sayFUSE HCI',
    why: '+150-1500% Preiserhöhung. 74% suchen Alternative. Budget-Gap €75k-800k frei.',
    target: '50.000-100.000 VMware-Kunden in DE',
    dealSize: '€50.000-500.000',
    icon: <ServerCrash size={16} />,
    color: 'text-purple-400',
    urgency: 'JETZT',
  },
  {
    id: 5,
    law: 'Krankenhaus-Transformationsfonds',
    product: 'HCI + Backup',
    why: '€50 Mrd. über 10 Jahre, IT-Security förderfähig. Ransomware-Panik nach Klinik-Angriffen.',
    target: '~2.000 Kliniken + 150.000 Praxen',
    dealSize: '€20.000-200.000',
    icon: <Hospital size={16} />,
    color: 'text-pink-400',
    urgency: 'JETZT',
  },
  {
    id: 6,
    law: 'Cyber Resilience Act (CRA)',
    product: 'Backup + VPSC',
    why: 'Meldepflicht ab Sept 2026, sichere Infrastruktur für Hersteller',
    target: 'IoT / Software-Hersteller in der EU',
    dealSize: '€5.000-30.000',
    icon: <CircuitBoard size={16} />,
    color: 'text-cyan-400',
    urgency: 'Q3 2026',
  },
  {
    id: 7,
    law: 'Reedereien / Maritime (NIS2-KRITIS)',
    product: 'VPSC',
    why: 'Schiff-Land Verschlüsselung, NIS2 Maritime-Sektor, OT-Isolation',
    target: 'Hapag-Lloyd, Döhle, deutsche Reedereien',
    dealSize: '€20.000-100.000',
    icon: <Ship size={16} />,
    color: 'text-blue-400',
    urgency: 'JETZT',
  },
  {
    id: 8,
    law: 'Cyber-Versicherungspflicht',
    product: 'Backup (Air-Gap)',
    why: 'Versicherer VERLANGEN Air-Gap-Backup. 10-25% Prämienreduktion. Ohne = keine Police.',
    target: 'Jedes versicherte Unternehmen in DE',
    dealSize: '€10.000-80.000',
    icon: <ShieldCheck size={16} />,
    color: 'text-emerald-400',
    urgency: 'LAUFEND',
  },
  {
    id: 9,
    law: 'Digitalpakt Schule 2.0',
    product: 'VPSC + HCI',
    why: '€5 Mrd. für sichere Schul-IT, Datenschutz für Minderjährige',
    target: '40.000 Schulen',
    dealSize: '€2.000-10.000',
    icon: <GraduationCap size={16} />,
    color: 'text-yellow-400',
    urgency: 'LAUFEND',
  },
  {
    id: 10,
    law: 'Arztpraxen (ePA-Pflicht)',
    product: 'VPSC',
    why: 'Elektronische Patientenakte → sichere Kommunikation Pflicht',
    target: '100.000+ Praxen',
    dealSize: '€1.000-5.000',
    icon: <Stethoscope size={16} />,
    color: 'text-pink-400',
    urgency: 'JETZT',
  },
  {
    id: 11,
    law: 'Kommunen (OZG 2.0)',
    product: 'VPSC + HCI',
    why: 'Digitale Verwaltung, Bürgerdaten schützen, Anhalt-Bitterfeld als Warnung',
    target: '11.000 Kommunen',
    dealSize: '€5.000-50.000',
    icon: <Landmark size={16} />,
    color: 'text-indigo-400',
    urgency: 'LAUFEND',
  },
  {
    id: 12,
    law: 'Energie / Stadtwerke (KRITIS)',
    product: 'VPSC + HCI',
    why: 'KRITIS-Pflicht, OT-Isolation, Netzleittechnik absichern',
    target: 'Tausende Stadtwerke',
    dealSize: '€10.000-50.000',
    icon: <Bolt size={16} />,
    color: 'text-amber-400',
    urgency: 'JETZT',
  },
  {
    id: 13,
    law: 'Rechtsanwaltskanzleien',
    product: 'VPSC + Backup',
    why: 'BRAK warnt vor US-Cloud, Anwaltsgeheimnis, 165.000 Anwälte ohne sichere IT',
    target: '~40.000 Kanzleien in DE',
    dealSize: '€5.000-50.000',
    icon: <Gavel size={16} />,
    color: 'text-violet-400',
    urgency: 'LAUFEND',
  },
];

const SALES_CHANNELS = [
  { rank: 1, name: 'IT-Systemhäuser', share: '40-50%', examples: 'Bechtle, Controlware, regionale', priority: 'HÖCHSTE', timeToRevenue: '6-12 Mo.' },
  { rank: 2, name: 'Distributor-Netzwerk', share: '20-25%', examples: 'Exclusive Networks, ALSO', priority: 'HOCH', timeToRevenue: '3-6 Mo.' },
  { rank: 3, name: 'Direktvertrieb', share: '10-15%', examples: 'Named Accounts, KRITIS', priority: 'MITTEL', timeToRevenue: 'Sofort' },
  { rank: 4, name: 'MSP / MSSP', share: '5-10%', examples: 'Managed Service Provider', priority: 'MITTEL', timeToRevenue: '9-18 Mo.' },
  { rank: 5, name: 'Tippgeber / Referral', share: '5-8%', examples: 'Anwälte, Steuerberater', priority: 'LOW COST / HIGH ROI', timeToRevenue: '3-6 Mo.' },
];

const TOP_KEYWORDS = [
  { keyword: 'NIS2 / NIS2 Richtlinie', volume: '15.000-30.000', cpc: '€3-8', relevance: 5 },
  { keyword: 'VMware Alternative', volume: '5.000-15.000', cpc: '€5-10', relevance: 5 },
  { keyword: 'GF Haftung IT Sicherheit', volume: '1.000-3.000', cpc: '€3-6', relevance: 5 },
  { keyword: 'Ransomware Schutz', volume: '3.000-8.000', cpc: '€5-12', relevance: 4 },
  { keyword: 'VPN Alternative / Ersatz', volume: '2.000-5.000', cpc: '€4-8', relevance: 4 },
  { keyword: 'Digitale Souveränität', volume: '1.000-3.000', cpc: '€2-5', relevance: 4 },
];

interface IncomeProjection {
  label: string;
  year1: string;
  monthly: string;
  color: string;
  details: string;
}

const INCOME_PROJECTIONS: IncomeProjection[] = [
  {
    label: 'Konservativ',
    year1: '€59.000',
    monthly: '~€5.000',
    color: 'text-blue-400',
    details: '12 Steuerberater + 6 Kanzleien + 3 Mittelstand + 5 Tippgeber',
  },
  {
    label: 'Realistisch',
    year1: '€156.500',
    monthly: '~€13.000',
    color: 'text-emerald-400',
    details: '15 Steuerberater + 8 Kanzleien + 5 Mittelstand + 2 große Deals + 10 Tippgeber',
  },
  {
    label: 'Optimistisch',
    year1: '€300.000',
    monthly: '~€25.000',
    color: 'text-amber-400',
    details: '20 Klein + 10 Mittel + 3 Groß + 1 Enterprise + 15 Tippgeber',
  },
];

const ACTION_PLAN_WEEKS = [
  { week: 'Woche 1', tasks: ['Provisionsmodell mit Petrus klären', 'LinkedIn-Profil optimieren', '50 Steuerberater + 50 Anwälte + 50 Arztpraxen listen', 'VPSC Präsentation auswendig lernen'] },
  { week: 'Woche 2', tasks: ['10 Kaltakquise-Anrufe (Steuerberater)', '10 Kaltakquise-Anrufe (Kanzleien)', 'NIS2-Einseiter als Lead Magnet erstellen', 'LinkedIn: Erster Post über VPN-Sicherheit'] },
  { week: 'Woche 3', tasks: ['20 weitere Anrufe', 'Erste 2-3 Termine vereinbaren', 'IHK-Event identifizieren', 'LinkedIn: Post über NIS2-Pflichten'] },
  { week: 'Woche 4', tasks: ['Erste Präsentation beim Kunden', 'Feedback sammeln, Pitch verbessern', '3 neue LinkedIn-Kontakte/Tag', 'Review: Was hat funktioniert?'] },
];

interface CompetitorComparison {
  feature: string;
  bbt: string;
  competitors: string;
  bbtWins: boolean;
}

const COMPETITOR_MATRIX: CompetitorComparison[] = [
  { feature: 'Architektur', bbt: 'Layer 7 App-Ebene, kein Netzwerk-Coupling', competitors: 'VPN = Layer 3/4 Netzwerk-Tunnel', bbtWins: true },
  { feature: 'Token-Technologie', bbt: '32-Bit Mikroprozessor, HW-AES, FIPS 197', competitors: 'FIDO2/Passkeys (offener Standard, aber kein Arbeitsplatz)', bbtWins: true },
  { feature: 'Backup-Konzept', bbt: 'Patentiert: 4-Stufen + physischer Air-Gap', competitors: 'FAST LTA: ähnlich (21 TB/h). Veeam: logischer Air-Gap', bbtWins: true },
  { feature: 'HCI S3-Performance', bbt: '>160 GB/s Lesen, >630 GB/s Disk (gemessen)', competitors: 'Nutanix/VMware: stärker im Enterprise, aber teurer', bbtWins: true },
  { feature: 'Alle Lizenzen inkl.', bbt: 'Ja — K8s, LB, FW, PKI, SSO, Monitoring, Billing', competitors: 'Nutanix/VMware: jeder Service extra lizenziert', bbtWins: true },
  { feature: 'On-Premise Souveränität', bbt: '100% DE, kein CLOUD Act', competitors: 'Proxmox (AT, kostenlos), genua (DE, BSI EAL4+)', bbtWins: true },
  { feature: 'Analyst Coverage', bbt: 'Null Gartner/Forrester (größte Schwäche)', competitors: 'Zscaler/Nutanix/Veeam = Gartner Leaders', bbtWins: false },
  { feature: 'Zertifizierungen', bbt: 'TeleTrusT ITSMIG/ITSMIE, greenhats, Pentest', competitors: 'genua: BSI CC EAL4+, NATO RESTRICTED', bbtWins: false },
  { feature: 'Preis-Komplexität', bbt: 'All-in-One Paket, eine Rechnung', competitors: 'Multi-Vendor = 30-40% teurer über 3 Jahre', bbtWins: true },
  { feature: 'OT/ICS-Isolation', bbt: 'VPSC isoliert Produktionsnetze nativ', competitors: 'Kaum ein ZTNA-Anbieter adressiert OT direkt', bbtWins: true },
];

const OBJECTION_HANDLING = [
  { objection: '"Wir nutzen schon Cisco/Palo Alto VPN"', response: 'VPSC ist KEIN VPN — es ist ein anderes Kommunikationsmodell. VPN koppelt Netzwerke (Layer 3), VPSC tunnelt einzelne App-Sockets aus dem RAM (Layer 7). Ihr Client wird NIE Mitglied des Remote-Netzwerks — Lateral Movement ist architektonisch unmöglich. Cisco CVE-2025-20212, SonicWall MFA umgangen. Privia Security Pentest: 15 Angriffsvektoren, 0 Schwachstellen.' },
  { objection: '"Wir sind Cloud-First (AWS/Azure)"', response: 'CLOUD Act ist real, aber das Argument ist am stärksten bei Cloud/SaaS, schwächer bei reinem On-Premise. Für NIS2-pflichtige Unternehmen mit sensiblen Daten (Patientendaten, Mandantengeheimnis, KRITIS) ist On-Premise die sicherste Option. Wir: 100% deutsch, eigene CA, keine US-Jurisdiktion.' },
  { objection: '"Wir haben Cyber-Versicherung"', response: 'Versicherung verhindert nichts — sie zahlt danach. Ausfallkosten: $5.600/MINUTE. Unser patentiertes 4-Stufen-Backup: Dedup (90% Reduktion) → Tages-Backup (intern, ohne Netzwerk) → Wochen-Migration → physische Auslagerung. Drives schalten jobgesteuert ab. Recovery in Minuten. 100 TB am Wochenende auslagerbar.' },
  { objection: '"Kein Budget für neue Plattform"', response: 'Was zahlen Sie für Cisco + Veeam + Storage + Networking + separate Lizenzen? Bei uns: ALLE Lizenzen inklusive (K8s, LB, FW, PKI, SSO, Monitoring, Billing). Eine Rechnung. Broadcom hat VMware-Preise um 150-1500% erhöht — 74% der IT-Leader suchen Alternativen.' },
  { objection: '"Kennen wir nicht — kein Gartner-Leader"', response: 'Ehrlich: Wir sind nicht im Gartner MQ. Aber: TeleTrusT-zertifiziert (rechtlich bindend: keine Backdoors), 15/15 Pentest, bei Ministerien im Einsatz, S3-Benchmarks mit >160 GB/s gemessen. Für den Mittelstand sind wir die pragmatischere Lösung als Zscaler (Cloud-only, US) oder Nutanix (teuer, Extra-Lizenzen).' },
  { objection: '"Gibt es nicht auch Proxmox/FAST LTA?"', response: 'Ja — Proxmox ist gut für HCI (kostenlos, österreichisch). FAST LTA ist gut für Air-Gap-Backup (21 TB/h). Aber: Keiner bietet das GESAMTPAKET (HCI + Zero Trust + Backup + PKI + SSO) aus einer Hand mit allen Lizenzen inklusive. Bei uns: ein Anbieter, ein Support, ein System.' },
];

// ===================== COMPONENTS =====================

function ShortcutHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-900/60 via-amber-800/40 to-orange-900/60 border border-amber-700/30 p-6 md:p-8">
      <div className="absolute top-4 right-4 opacity-10">
        <Zap size={140} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <Zap className="text-amber-400" size={28} />
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
            SHORTCUT — AI-sichere Strategie
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black mb-2">
          Die 6 Skills die dich<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
            unersetzbar machen
          </span>
        </h1>
        <p className="text-text-muted text-sm mb-6 max-w-2xl leading-relaxed">
          Basierend auf Analyse von ISC2, SANS, BLS, Glassdoor, SecurityWeek, WEF, Bugcrowd und
          hunderten Quellen. Diese Skills haben die <strong>wenigste Konkurrenz</strong>, die <strong>höchsten
          Stundensätze</strong>, und sind <strong>unmöglich durch AI zu ersetzen</strong>.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {MARKET_STATS.map((s) => (
            <div key={s.label} className="bg-amber-950/40 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                {s.icon}
              </div>
              <div className="text-xl font-black">{s.value}</div>
              <div className="text-[10px] text-text-muted">{s.label}</div>
              <div className="text-[9px] text-text-muted">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoreInsight() {
  return (
    <div className="rounded-xl bg-gradient-to-r from-red-900/20 to-amber-900/20 border border-red-700/20 p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={20} />
        <div>
          <h3 className="font-bold text-sm mb-2">Die Kern-Erkenntnis</h3>
          <p className="text-sm text-text-muted leading-relaxed">
            <strong>AI ersetzt keine Cybersecurity-Jobs</strong> — es verschiebt WAS gefragt ist.
            Tier-1 SOC Analysten (Alert-Triage) verschwinden. Aber <strong>4.8 Millionen Stellen sind
            weltweit unbesetzt</strong>. Der Trick: Nicht breit lernen, sondern <strong>tief in die
            6 Nischen</strong> eintauchen, die physisch, kreativ oder zu spezialisiert für AI sind.
            Ein OSEE-Holder (100 Menschen weltweit) verdient mehr als ein CISO. Ein OT-Security-Berater
            hat NULL Konkurrenz in der DACH-Region. <strong>Das ist dein Shortcut.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

function NicheCard({ niche }: { niche: UltraNiche }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 hover:bg-bg-hover/50 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={cn('w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shrink-0', niche.color)}>
              {niche.icon}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">#{niche.rank}</span>
                <h3 className="font-bold text-sm">{niche.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {niche.hourlyRate}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {niche.practitioners}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  AI: Unmöglich
                </span>
              </div>
            </div>
          </div>
          {expanded ? <ChevronUp size={16} className="shrink-0 text-text-muted" /> : <ChevronDown size={16} className="shrink-0 text-text-muted" />}
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
          <p className="text-sm text-text-muted leading-relaxed">{niche.description}</p>

          <div className="grid md:grid-cols-2 gap-3">
            {/* Demand & Market */}
            <div className="rounded-lg bg-bg-hover p-3">
              <h4 className="text-xs font-bold mb-2 flex items-center gap-1"><TrendingUp size={12} className="text-emerald-400" /> Nachfrage & Markt</h4>
              <div className="text-xs text-text-muted space-y-1">
                <p><strong>Demand:</strong> {niche.demandLevel}</p>
                {niche.marketSize && <p><strong>Markt:</strong> {niche.marketSize}</p>}
                {niche.growthRate && <p><strong>Wachstum:</strong> {niche.growthRate}</p>}
                <p><strong>Gehalt:</strong> {niche.salaryRange}</p>
              </div>
            </div>

            {/* DACH Relevance */}
            <div className="rounded-lg bg-bg-hover p-3">
              <h4 className="text-xs font-bold mb-2 flex items-center gap-1"><Target size={12} className="text-amber-400" /> DACH-Relevanz</h4>
              <p className="text-xs text-text-muted">{niche.dacRelevance}</p>
            </div>
          </div>

          {/* Why AI-proof */}
          <div className="rounded-lg bg-red-500/5 border border-red-500/10 p-3">
            <h4 className="text-xs font-bold mb-2 flex items-center gap-1"><Shield size={12} className="text-red-400" /> Warum AI das NICHT ersetzen kann</h4>
            <ul className="text-xs text-text-muted space-y-1">
              {niche.whyAiProof.map((reason, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <Lock size={10} className="text-red-400 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills & Certs */}
          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-lg bg-bg-hover p-3">
              <h4 className="text-xs font-bold mb-2">Key Skills</h4>
              <div className="flex flex-wrap gap-1">
                {niche.keySkills.map((s) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">{s}</span>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-bg-hover p-3">
              <h4 className="text-xs font-bold mb-2">Zertifizierungen</h4>
              <div className="flex flex-wrap gap-1">
                {niche.certifications.map((c) => (
                  <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Real World Use */}
          <div className="rounded-lg bg-bg-hover p-3">
            <h4 className="text-xs font-bold mb-2 flex items-center gap-1"><Crosshair size={12} className="text-purple-400" /> Real-World Anwendung</h4>
            <p className="text-xs text-text-muted">{niche.realWorldUse}</p>
          </div>

          {/* Entry Path & Time */}
          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-3">
              <h4 className="text-xs font-bold mb-1 text-emerald-400">Einstiegspfad</h4>
              <p className="text-xs text-text-muted">{niche.entryPath}</p>
            </div>
            <div className="rounded-lg bg-purple-500/5 border border-purple-500/10 p-3">
              <h4 className="text-xs font-bold mb-1 text-purple-400">Zeit bis Mastery</h4>
              <p className="text-xs text-text-muted">{niche.timeToMaster}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DyingSkillsSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={20} className="text-red-400" />
        <h2 className="text-lg font-bold">Skills die AI ERSETZT — Finger weg!</h2>
      </div>
      <div className="space-y-2">
        {DYING_SKILLS.map((s) => (
          <div key={s.name} className="flex items-center justify-between p-3 rounded-lg bg-red-500/5 border border-red-500/10">
            <div>
              <span className="text-sm font-medium line-through text-text-muted">{s.name}</span>
              <p className="text-[10px] text-text-muted">{s.reason}</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 shrink-0">{s.timeline}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RareCertsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Award size={20} className="text-amber-400" />
        <h2 className="text-lg font-bold">Ultra-Rare Zertifizierungen</h2>
        <span className="text-xs text-text-muted">(die dich sofort separieren)</span>
      </div>
      <div className="space-y-2">
        {RARE_CERTS.map((cert) => (
          <div key={cert.name} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === cert.name ? null : cert.name)}
              className="w-full flex items-center justify-between p-3 hover:bg-bg-hover transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-amber-400 w-16">{cert.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">{cert.holders}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={10} className={i < cert.difficulty ? 'text-amber-400 fill-amber-400' : 'text-border'} />
                  ))}
                </div>
              </div>
              {expanded === cert.name ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {expanded === cert.name && (
              <div className="px-3 pb-3 text-xs text-text-muted space-y-1 border-t border-border pt-2">
                <p><strong>Issuer:</strong> {cert.issuer}</p>
                <p><strong>Exam:</strong> {cert.examFormat}</p>
                <p><strong>Fokus:</strong> {cert.focus}</p>
                <p><strong>Gehalts-Impact:</strong> <span className="text-emerald-400">{cert.salaryImpact}</span></p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ZeroDayPrices() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign size={20} className="text-emerald-400" />
        <h2 className="text-lg font-bold">Zero-Day Marktpreise 2026</h2>
        <span className="text-xs text-text-muted">(+44% jährlich)</span>
      </div>
      <p className="text-xs text-text-muted mb-3">
        Crowdfense hat aktuell ein $30M Exploit-Acquisition-Programm. Ein einzelner Zero-Day kann mehr einbringen als 10 Jahre Gehalt.
      </p>
      <div className="space-y-1.5">
        {ZERO_DAY_PRICES.map((z, i) => (
          <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-bg-hover">
            <span className="text-sm">{z.target}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted">{z.broker}</span>
              <span className="text-sm font-black text-emerald-400">{z.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendedPathSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Crown size={20} className="text-amber-400" />
        <h2 className="text-lg font-bold">Dein Shortcut-Pfad — 36 Monate zum Top 0.1%</h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-amber-500" />

        <div className="space-y-6">
          {RECOMMENDED_PATH.map((step, i) => {
            const phaseColors = [
              'border-blue-500/30 bg-blue-500/5',
              'border-cyan-500/30 bg-cyan-500/5',
              'border-purple-500/30 bg-purple-500/5',
              'border-red-500/30 bg-red-500/5',
              'border-amber-500/30 bg-amber-500/5',
            ];
            const dotColors = [
              'bg-blue-500',
              'bg-cyan-500',
              'bg-purple-500',
              'bg-red-500',
              'bg-amber-500',
            ];

            return (
              <div key={i} className="relative pl-12">
                {/* Timeline dot */}
                <div className={cn('absolute left-3.5 w-3 h-3 rounded-full border-2 border-bg-card', dotColors[i])} />

                <div className={cn('rounded-lg border p-4', phaseColors[i])}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold tracking-widest text-text-muted uppercase">{step.phase}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-bg-hover">{step.months}</span>
                  </div>
                  <h4 className="font-bold text-sm mb-2">{step.title}</h4>
                  <ul className="text-xs text-text-muted space-y-1 mb-2">
                    {step.focus.map((f, j) => (
                      <li key={j} className="flex items-start gap-1.5">
                        <Zap size={10} className="text-amber-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {step.cert && (
                    <div className="flex items-center gap-2 mb-1">
                      <Award size={12} className="text-amber-400" />
                      <span className="text-[10px] font-bold text-amber-400">{step.cert}</span>
                    </div>
                  )}
                  <p className="text-[10px] text-emerald-400 font-medium mt-1">{step.outcome}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OTFocusBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600/30 via-red-600/20 to-amber-600/30 border border-orange-500/30 p-6 md:p-8">
      <div className="absolute top-4 right-6 opacity-10">
        <Factory size={120} />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Factory className="text-orange-400" size={22} />
          <span className="text-[10px] font-bold tracking-widest text-orange-400 uppercase">
            Marktrecherche-Ergebnis — Dein #1 Wealth Path
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black mb-2">
          OT/ICS/SCADA Security =<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
            Generational Wealth
          </span>
        </h2>
        <p className="text-sm text-text-muted mb-5 max-w-2xl leading-relaxed">
          Basierend auf Marktrecherche Feb 2026: <strong>29.000 deutsche Firmen</strong> sind gesetzlich verpflichtet (NIS2),
          OT-Security einzuführen. Es gibt <strong>~50-100 Freelancer</strong> in ganz DACH dafür. Der OT-Security-Markt
          wächst von <strong>$21 Mrd. (2025) auf $130 Mrd. (2035)</strong>. Kein AI kann physische Anlagen hacken.
          Das ist kein 5-Jahres-Trend — das ist eine <strong>Lebenskarriere mit internationaler Reichweite</strong>.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-orange-950/50 rounded-lg p-3 text-center">
            <div className="text-xl font-black text-orange-400">29.000</div>
            <div className="text-[10px] text-text-muted">NIS2-Firmen in DE</div>
          </div>
          <div className="bg-orange-950/50 rounded-lg p-3 text-center">
            <div className="text-xl font-black text-emerald-400">~50-100</div>
            <div className="text-[10px] text-text-muted">OT-Freelancer DACH</div>
          </div>
          <div className="bg-orange-950/50 rounded-lg p-3 text-center">
            <div className="text-xl font-black text-amber-400">$130 Mrd.</div>
            <div className="text-[10px] text-text-muted">Markt bis 2035</div>
          </div>
          <div className="bg-orange-950/50 rounded-lg p-3 text-center">
            <div className="text-xl font-black text-red-400">20,6%</div>
            <div className="text-[10px] text-text-muted">CAGR Wachstum</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlobalMarketsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Globe size={20} className="text-cyan-400" />
        <h2 className="text-lg font-bold">Internationale OT/ICS-Märkte</h2>
      </div>
      <p className="text-xs text-text-muted mb-4">
        Kraftwerke, Fabriken, Raffinerien gibt es auf jedem Kontinent. OT/ICS-Security ist <strong>global einsetzbar</strong> — du bist an keinen Standort gebunden.
      </p>
      <div className="space-y-2">
        {GLOBAL_OT_MARKETS.map((m) => (
          <div key={m.region} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === m.region ? null : m.region)}
              className="w-full flex items-center justify-between p-3 hover:bg-bg-hover transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className={cn('shrink-0', m.color)}>{m.icon}</span>
                <div>
                  <span className="text-sm font-bold">{m.region}</span>
                  <span className="text-[10px] text-text-muted ml-2">{m.clients}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  {m.rate}
                </span>
                {expanded === m.region ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
            </button>
            {expanded === m.region && (
              <div className="px-3 pb-3 space-y-2 border-t border-border pt-2">
                <div className="flex flex-wrap gap-1">
                  {m.sectors.map((s) => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">{s}</span>
                  ))}
                </div>
                <p className="text-xs text-text-muted">{m.whyOT}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WealthTimelineSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Crown size={20} className="text-amber-400" />
        <h2 className="text-lg font-bold">OT/ICS Wealth-Pfad</h2>
        <span className="text-xs text-text-muted">Vom Freelancer zum Generational Wealth</span>
      </div>
      <p className="text-xs text-text-muted mb-5">
        Dein Hacker-Pfad bleibt bestehen. OT/ICS ist der <strong>Wealth-Multiplikator</strong> darauf — die Spezialisierung die aus Skills echtes Vermögen macht.
      </p>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 via-amber-500 to-red-500" />

        <div className="space-y-5">
          {WEALTH_TIMELINE.map((phase, i) => (
            <div key={i} className="relative pl-12">
              <div className={cn(
                'absolute left-3.5 w-3 h-3 rounded-full border-2 border-bg-card bg-gradient-to-br',
                phase.color,
              )} />

              <div className="rounded-lg border border-border bg-bg-hover/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest text-text-muted uppercase">{phase.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-bg-hover">{phase.year}</span>
                  </div>
                  <span className={cn('text-sm font-black text-transparent bg-clip-text bg-gradient-to-r', phase.color)}>
                    {phase.income}
                  </span>
                </div>

                <p className="text-xs text-text-muted mb-3">{phase.description}</p>

                {/* Income bar */}
                <div className="h-2 rounded-full bg-bg-hover mb-3 overflow-hidden">
                  <div
                    className={cn('h-full rounded-full bg-gradient-to-r', phase.color)}
                    style={{ width: `${Math.min((phase.incomeNum / 1200) * 100, 100)}%` }}
                  />
                </div>

                <div className="flex flex-wrap gap-1">
                  {phase.milestones.map((m) => (
                    <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== BUNKER BAUER TEC COMPONENTS =====================

function BBTBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/60 via-indigo-800/40 to-purple-900/60 border border-blue-500/30 p-6 md:p-8">
      <div className="absolute top-4 right-6 opacity-10">
        <ShieldAlert size={130} />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="text-blue-400" size={22} />
          <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">
            Bunker Bauer Tec — Quick Money Playbook
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black mb-2">
          Middleman-Strategie:<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            €0 Startkapital → €13K/Monat
          </span>
        </h2>
        <p className="text-sm text-text-muted mb-5 max-w-2xl leading-relaxed">
          Du brauchst kein Geld um Geld zu verdienen. Du brauchst <strong>ZUGANG</strong>. Bunker Bauer Tec
          Produkte sind bei <strong>Ministerien im Einsatz</strong>, haben <strong>0 CVEs</strong>, und
          <strong> 29.000 Unternehmen</strong> MÜSSEN bis <strong>6. März 2026</strong> NIS2 umsetzen.
          Du vermittelst — du kassierst Provision. Kein Bullshit-Consulting.
        </p>

        {/* NIS2 Urgency Banner */}
        <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-4 mb-5 animate-pulse">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="text-red-400" size={18} />
            <span className="text-sm font-black text-red-400">NIS2-FRIST: 6. MÄRZ 2026 — ~2 WOCHEN!</span>
          </div>
          <p className="text-xs text-text-muted">
            29.500 Unternehmen müssen sich beim BSI registrieren. Geschäftsführer haften <strong>PERSÖNLICH mit Privatvermögen</strong>.
            Strafen bis <strong>10 Mio € oder 2% Jahresumsatz</strong>. Keine Übergangsfrist — gilt SOFORT.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-blue-950/50 rounded-lg p-3 text-center">
            <div className="text-xl font-black text-blue-400">€0</div>
            <div className="text-[10px] text-text-muted">Startkapital nötig</div>
          </div>
          <div className="bg-blue-950/50 rounded-lg p-3 text-center">
            <div className="text-xl font-black text-emerald-400">3</div>
            <div className="text-[10px] text-text-muted">Produkte zum Verkaufen</div>
          </div>
          <div className="bg-blue-950/50 rounded-lg p-3 text-center">
            <div className="text-xl font-black text-amber-400">29.000</div>
            <div className="text-[10px] text-text-muted">NIS2-pflichtige Firmen</div>
          </div>
          <div className="bg-blue-950/50 rounded-lg p-3 text-center">
            <div className="text-xl font-black text-red-400">0 CVEs</div>
            <div className="text-[10px] text-text-muted">vs. dutzende bei Cisco</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BBTProductsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Package size={20} className="text-blue-400" />
        <h2 className="text-lg font-bold">Die 3 Produkte — Was du verkaufst</h2>
      </div>
      <p className="text-xs text-text-muted mb-4">
        Drei Säulen: <strong>VPSC + HCI + Backup</strong>. Ein System, totale Sicherheit, Made in Germany. Du brauchst kein eigenes Produkt — du hast ZUGANG zu Elite-Produkten.
      </p>
      <div className="space-y-3">
        {BBT_PRODUCTS.map((p) => (
          <div key={p.name} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === p.name ? null : p.name)}
              className="w-full flex items-center justify-between p-4 hover:bg-bg-hover/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className={cn('w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shrink-0', p.color)}>
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold">{p.name}</h3>
                  <p className="text-[10px] text-text-muted">{p.tagline}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 hidden md:inline">
                  {p.provision}
                </span>
                {expanded === p.name ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
            </button>
            {expanded === p.name && (
              <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                <p className="text-xs text-text-muted">{p.description}</p>
                <div className="flex flex-wrap gap-1">
                  {p.features.map((f) => (
                    <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">{f}</span>
                  ))}
                </div>
                <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3">
                  <p className="text-xs text-red-400 font-medium">{p.killerFact}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  <div className="bg-bg-hover rounded-lg p-2">
                    <span className="text-[10px] text-text-muted">Dealwert:</span>
                    <p className="text-xs font-bold text-emerald-400">{p.dealValue}</p>
                  </div>
                  <div className="bg-bg-hover rounded-lg p-2">
                    <span className="text-[10px] text-text-muted">Deine Provision:</span>
                    <p className="text-xs font-bold text-amber-400">{p.provision}</p>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted">Zielgruppen:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.targetGroups.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FearStatsSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle size={20} className="text-red-400" />
        <h2 className="text-lg font-bold">Fear-Selling Zahlen</h2>
        <span className="text-xs text-text-muted">(copy-paste für jeden Pitch)</span>
      </div>
      <div className="grid md:grid-cols-2 gap-2 mb-4">
        {FEAR_STATS.map((f, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-red-500/5 border border-red-500/10">
            <span className="text-xs font-bold text-red-400">{f.stat}</span>
            <span className="text-[9px] text-text-muted shrink-0 ml-2">{f.source}</span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-3">
          <h4 className="text-xs font-bold mb-2 flex items-center gap-1 text-emerald-400">
            <Shield size={12} /> Vertrauens-Argumente
          </h4>
          <ul className="text-xs text-text-muted space-y-1">
            {KILLER_ARGUMENTS.trust.map((a, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <Award size={10} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-blue-500/5 border border-blue-500/10 p-3">
          <h4 className="text-xs font-bold mb-2 flex items-center gap-1 text-blue-400">
            <KeyRound size={12} /> Technische Killer
          </h4>
          <ul className="text-xs text-text-muted space-y-1">
            {KILLER_ARGUMENTS.technical.map((a, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <Lock size={10} className="text-blue-400 shrink-0 mt-0.5" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-amber-500/5 border border-amber-500/10 p-3">
          <h4 className="text-xs font-bold mb-2 flex items-center gap-1 text-amber-400">
            <Target size={12} /> Markt-Positionierung
          </h4>
          <ul className="text-xs text-text-muted space-y-1">
            {KILLER_ARGUMENTS.market.map((a, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <TrendingUp size={10} className="text-amber-400 shrink-0 mt-0.5" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-red-500/5 border border-red-500/10 p-3">
          <h4 className="text-xs font-bold mb-2 flex items-center gap-1 text-red-400">
            <AlertTriangle size={12} /> Ehrliche Limitierungen
          </h4>
          <ul className="text-xs text-text-muted space-y-1">
            {KILLER_ARGUMENTS.honestLimitations.map((a, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <Siren size={10} className="text-red-400 shrink-0 mt-0.5" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ready-to-use Pitch */}
      <div className="mt-4 rounded-lg bg-amber-500/5 border border-amber-500/20 p-4">
        <h4 className="text-xs font-bold mb-2 flex items-center gap-1 text-amber-400">
          <Megaphone size={12} /> Fertiger Pitch (copy-paste)
        </h4>
        <p className="text-xs text-text-muted italic leading-relaxed">
          "Wussten Sie, dass Sie sich bis zum 6. März beim BSI registrieren müssen?
          Ihr Geschäftsführer haftet PERSÖNLICH — mit seinem Privatvermögen.
          Die Strafen gehen bis 10 Millionen Euro. Keine Übergangsfrist.
          Ich habe eine Made-in-Germany Lösung die bei deutschen Ministerien im Einsatz ist,
          im Pen-Test 15/15 bestanden hat — null Schwachstellen, null CVEs.
          Wollen Sie 30 Minuten investieren um zu hören wie das funktioniert?"
        </p>
      </div>
    </div>
  );
}

function RevenueModelsSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <HandCoins size={20} className="text-emerald-400" />
        <h2 className="text-lg font-bold">3 Provisionsmodelle</h2>
        <span className="text-xs text-text-muted">€0 Startkapital</span>
      </div>
      <p className="text-xs text-text-muted mb-4">
        Über <strong>90% aller Cybersecurity-Ausgaben</strong> fließen durch Partner/Reseller. Du brauchst kein eigenes Produkt — du brauchst ZUGANG. Und den hast du.
      </p>
      <div className="space-y-3">
        {REVENUE_MODELS.map((m) => (
          <div key={m.name} className="border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-emerald-400">{m.icon}</div>
              <h3 className="text-sm font-bold">{m.name}</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {m.provision}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 ml-auto">
                {m.difficulty}
              </span>
            </div>
            <p className="text-xs text-text-muted mb-2">{m.description}</p>
            <div className="text-xs text-text-muted mb-1"><strong>Deine Rolle:</strong> {m.yourRole}</div>
            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2 mt-2">
              <p className="text-xs text-emerald-400"><strong>Beispiel:</strong> {m.example}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Big Deal Examples */}
      <div className="mt-4 rounded-lg bg-amber-500/5 border border-amber-500/10 p-4">
        <h4 className="text-xs font-bold mb-2 text-amber-400">Große Deal-Beispiele:</h4>
        <div className="space-y-1 text-xs text-text-muted">
          <div className="flex justify-between"><span>HCI für KRITIS-Betreiber</span><span className="text-emerald-400 font-bold">€15.000-50.000 Provision</span></div>
          <div className="flex justify-between"><span>Komplettpaket Krankenhaus</span><span className="text-emerald-400 font-bold">€20.000-100.000 Provision</span></div>
          <div className="flex justify-between"><span>Regierungs-Deal über Partner</span><span className="text-amber-400 font-bold">€25.000-500.000 Provision</span></div>
        </div>
      </div>
    </div>
  );
}

function TargetCustomersSection() {
  const [showPriority, setShowPriority] = useState(1);

  const filtered = TARGET_CUSTOMERS.filter((c) => c.priority === showPriority);

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Target size={20} className="text-amber-400" />
        <h2 className="text-lg font-bold">Zielkunden-Matrix</h2>
        <span className="text-xs text-text-muted">(priorisiert)</span>
      </div>
      <p className="text-xs text-text-muted mb-4">
        Total adressierbarer Markt allein Priorität 2: <strong>12.900+ Unternehmen</strong>. Wähle deine Priorität:
      </p>

      {/* Priority Tabs */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3].map((p) => (
          <button
            key={p}
            onClick={() => setShowPriority(p)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-bold transition-colors',
              showPriority === p
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-bg-hover text-text-muted hover:text-text-primary',
            )}
          >
            {p === 1 ? 'Sofort starten' : p === 2 ? 'Ab Monat 3' : 'Ab Monat 6+'}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((c) => (
          <div key={c.name} className="flex items-center gap-3 p-3 rounded-lg bg-bg-hover/50 border border-border">
            <div className="text-amber-400 shrink-0">{c.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-bold">{c.name}</span>
                <span className="text-[10px] text-text-muted">{c.count}</span>
              </div>
              <p className="text-[10px] text-text-muted">{c.whyNow}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-bold text-emerald-400">{c.dealValue}</div>
              <div className="text-[9px] text-text-muted">{c.startable}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlueOceanSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Rocket size={20} className="text-purple-400" />
        <h2 className="text-lg font-bold">Blue Ocean Strategien</h2>
        <span className="text-xs text-text-muted">(alle €0 Startkosten)</span>
      </div>
      <p className="text-xs text-text-muted mb-4">
        7 Strategien die <strong>niemand sonst macht</strong>. Du verkaufst nicht Produkte — du verkaufst <strong>Compliance-Rettung + Angst-Lösung</strong>. Komplett anderer Pitch.
      </p>
      <div className="space-y-2">
        {BLUE_OCEAN_STRATEGIES.map((s) => (
          <div key={s.name} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === s.name ? null : s.name)}
              className="w-full flex items-center justify-between p-3 hover:bg-bg-hover/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className={cn('shrink-0', s.color)}>{s.icon}</span>
                <div>
                  <span className="text-sm font-bold">{s.name}</span>
                  <span className="text-[10px] text-text-muted ml-2">{s.cost} Startkosten</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0 hidden md:inline">
                  {s.timeline}
                </span>
                {expanded === s.name ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
            </button>
            {expanded === s.name && (
              <div className="px-3 pb-3 space-y-2 border-t border-border pt-2">
                <p className="text-xs text-text-muted">{s.description}</p>
                <div className="rounded-lg bg-bg-hover p-2">
                  <h4 className="text-[10px] font-bold mb-1">Schritte:</h4>
                  <ul className="text-xs text-text-muted space-y-0.5">
                    {s.howTo.map((step, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <ArrowRight size={10} className="text-purple-400 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2">
                  <p className="text-xs text-emerald-400 font-medium">{s.potential}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function IncomeProjectionSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Banknote size={20} className="text-emerald-400" />
        <h2 className="text-lg font-bold">Einkommens-Projektion Jahr 1</h2>
      </div>
      <div className="space-y-3 mb-4">
        {INCOME_PROJECTIONS.map((p) => (
          <div key={p.label} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className={cn('text-sm font-bold', p.color)}>{p.label}</span>
              <div className="text-right">
                <span className={cn('text-lg font-black', p.color)}>{p.year1}</span>
                <span className="text-[10px] text-text-muted ml-2">({p.monthly}/Mo.)</span>
              </div>
            </div>
            <p className="text-[10px] text-text-muted">{p.details}</p>
            {/* Bar */}
            <div className="h-2 rounded-full bg-bg-hover mt-2 overflow-hidden">
              <div
                className={cn('h-full rounded-full', p.color === 'text-blue-400' ? 'bg-blue-500' : p.color === 'text-emerald-400' ? 'bg-emerald-500' : 'bg-amber-500')}
                style={{ width: `${p.label === 'Konservativ' ? 20 : p.label === 'Realistisch' ? 52 : 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Timeline */}
      <div className="rounded-lg bg-bg-hover p-4">
        <h4 className="text-xs font-bold mb-3">Monatlicher Verlauf:</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-20 text-text-muted shrink-0">Mo. 1-2:</span>
            <div className="flex-1 h-3 bg-bg-card rounded-full overflow-hidden"><div className="h-full bg-red-500/30 rounded-full" style={{ width: '0%' }} /></div>
            <span className="text-text-muted w-28 text-right">€0 (Aufbau)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-20 text-text-muted shrink-0">Mo. 3-4:</span>
            <div className="flex-1 h-3 bg-bg-card rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: '15%' }} /></div>
            <span className="text-blue-400 w-28 text-right">€2-5K</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-20 text-text-muted shrink-0">Mo. 5-6:</span>
            <div className="flex-1 h-3 bg-bg-card rounded-full overflow-hidden"><div className="h-full bg-cyan-500 rounded-full" style={{ width: '30%' }} /></div>
            <span className="text-cyan-400 w-28 text-right">€5-10K</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-20 text-text-muted shrink-0">Mo. 7-12:</span>
            <div className="flex-1 h-3 bg-bg-card rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: '55%' }} /></div>
            <span className="text-emerald-400 w-28 text-right">€8-20K</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-20 text-text-muted shrink-0">Mo. 13-24:</span>
            <div className="flex-1 h-3 bg-bg-card rounded-full overflow-hidden"><div className="h-full bg-amber-500 rounded-full" style={{ width: '85%' }} /></div>
            <span className="text-amber-400 w-28 text-right">€15-40K</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionPlanSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Clock size={20} className="text-orange-400" />
        <h2 className="text-lg font-bold">Wochen-Aktionsplan</h2>
        <span className="text-xs text-text-muted">(sofort starten)</span>
      </div>
      <div className="space-y-3">
        {ACTION_PLAN_WEEKS.map((w, wi) => (
          <div key={w.week} className="border border-border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                'text-[10px] font-bold px-2 py-0.5 rounded-full',
                wi === 0 ? 'bg-red-500/20 text-red-400' : wi === 1 ? 'bg-orange-500/20 text-orange-400' : wi === 2 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400',
              )}>
                {w.week}
              </span>
            </div>
            <ul className="text-xs text-text-muted space-y-1">
              {w.tasks.map((t, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <div className="w-3.5 h-3.5 rounded border border-border shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Scaling phases */}
      <div className="mt-4 grid md:grid-cols-2 gap-3">
        <div className="rounded-lg bg-cyan-500/5 border border-cyan-500/10 p-3">
          <h4 className="text-xs font-bold text-cyan-400 mb-1">Monat 2-3: Skalierung</h4>
          <ul className="text-[10px] text-text-muted space-y-0.5">
            <li>50+ Kontakte/Woche</li>
            <li>5-10 Termine/Monat</li>
            <li>LinkedIn: 3 Posts/Woche</li>
            <li>Erste Branchenevents</li>
          </ul>
        </div>
        <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-3">
          <h4 className="text-xs font-bold text-emerald-400 mb-1">Monat 4-6: System</h4>
          <ul className="text-[10px] text-text-muted space-y-0.5">
            <li>CRM aufbauen (HubSpot Free)</li>
            <li>Erster großer Deal (€50K+ Ziel)</li>
            <li>Webinar-Pipeline starten</li>
            <li>Empfehlungsnetzwerk aktiv</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function KulturbrueckeSection() {
  return (
    <div className="rounded-xl bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-700/20 p-5">
      <div className="flex items-center gap-2 mb-2">
        <Globe size={20} className="text-amber-400" />
        <h2 className="text-lg font-bold">Kulturbrücke DACH-Orient</h2>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">MONOPOL-Position</span>
      </div>
      <p className="text-xs text-text-muted mb-4">
        Dari/Paschto + Deutsch + CyberSec-Wissen = <strong>NIEMAND sonst hat dieses Profil</strong>. Deutsche Lösungen im Nahen Osten. "Made in Germany" = GOLD wert. Null Konkurrenz.
      </p>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="bg-bg-hover rounded-lg p-3">
          <h4 className="text-xs font-bold text-amber-400 mb-1">VAE & Gulf</h4>
          <p className="text-[10px] text-text-muted">Smart Gov, Vision 2030, NEOM, Aramco. Steuerfreies Einkommen. Sovereign Cloud Nachfrage. Deals €200K-50M+</p>
        </div>
        <div className="bg-bg-hover rounded-lg p-3">
          <h4 className="text-xs font-bold text-amber-400 mb-1">Diaspora in DE</h4>
          <p className="text-[10px] text-text-muted">~700.000 Afghanen/Iraner in DE. Viele Unternehmer. Vertrauen DIR sofort (Sprache+Kultur). DSGVO+CyberSec auf Dari = einzigartig.</p>
        </div>
        <div className="bg-bg-hover rounded-lg p-3">
          <h4 className="text-xs font-bold text-amber-400 mb-1">BND/ZITiS/BKA</h4>
          <p className="text-[10px] text-text-muted">Brauchen DRINGEND Dari/Paschto-Sprecher mit IT-Skills. Übersetzer: €75-150/h. Dein Profil = EXTREM selten.</p>
        </div>
      </div>
    </div>
  );
}

function BBTToolsSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Cpu size={20} className="text-cyan-400" />
        <h2 className="text-lg font-bold">Gratis Tools — Alles was du brauchst</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          { name: 'CRM', tool: 'HubSpot Free / Notion', icon: <Users size={14} /> },
          { name: 'Webinar', tool: 'Zoom Free (40 Min)', icon: <Video size={14} /> },
          { name: 'Präsentation', tool: 'Google Slides / Canva', icon: <Megaphone size={14} /> },
          { name: 'Termine', tool: 'Calendly Free', icon: <Clock size={14} /> },
          { name: 'Pipeline', tool: 'Google Sheets', icon: <TrendingUp size={14} /> },
          { name: 'Video', tool: 'CapCut + ElevenLabs', icon: <Video size={14} /> },
          { name: 'Business-Nr.', tool: 'Sipgate Free', icon: <Phone size={14} /> },
          { name: 'Dokumente', tool: 'Google Docs', icon: <FileCheck size={14} /> },
        ].map((t) => (
          <div key={t.name} className="bg-bg-hover rounded-lg p-2 text-center">
            <div className="text-cyan-400 flex justify-center mb-1">{t.icon}</div>
            <div className="text-[10px] font-bold">{t.name}</div>
            <div className="text-[9px] text-text-muted">{t.tool}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompetitorMatrixSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <Crosshair size={20} className="text-red-400" />
        <h2 className="text-lg font-bold">Konkurrenz-Vergleich</h2>
        <span className="text-xs text-text-muted">Warum Bunker Bauer Tec GEWINNT</span>
      </div>
      <p className="text-xs text-text-muted mb-4">
        Bunker Bauer Tec ist der <strong>EINZIGE Anbieter</strong> der physische + digitale + operative Sicherheit in EINEM Ökosystem vereint. Kein Cisco, kein Palo Alto, kein Zscaler kann das.
      </p>
      <div className="space-y-1.5">
        {COMPETITOR_MATRIX.map((c) => (
          <div key={c.feature} className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-bg-hover/50 text-xs">
            <div className="font-bold">{c.feature}</div>
            <div className="text-emerald-400">{c.bbt}</div>
            <div className="text-red-400/70">{c.competitors}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] font-bold text-text-muted px-2.5">
        <span>Feature</span>
        <span className="text-emerald-400">Bunker Bauer Tec</span>
        <span className="text-red-400">Konkurrenz</span>
      </div>
    </div>
  );
}

function ObjectionHandlingSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare size={20} className="text-purple-400" />
        <h2 className="text-lg font-bold">Einwandbehandlung</h2>
        <span className="text-xs text-text-muted">(Antworten auf jeden Einwand)</span>
      </div>
      <p className="text-xs text-text-muted mb-4">
        Die 5 häufigsten Einwände und deine <strong>sofort einsetzbaren Antworten</strong>. Auswendig lernen = jeden Deal gewinnen.
      </p>
      <div className="space-y-2">
        {OBJECTION_HANDLING.map((o, i) => (
          <div key={i} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full flex items-center justify-between p-3 hover:bg-bg-hover/50 transition-colors text-left"
            >
              <span className="text-xs font-bold text-red-400">{o.objection}</span>
              {expanded === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {expanded === i && (
              <div className="px-3 pb-3 border-t border-border pt-2">
                <p className="text-xs text-emerald-400 leading-relaxed">{o.response}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MoneyGlitchesSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? MONEY_GLITCHES : MONEY_GLITCHES.slice(0, 6);

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-1">
        <Flame size={20} className="text-orange-400" />
        <h2 className="text-lg font-bold">Money Glitches 2026</h2>
        <span className="text-xs text-text-muted">— Wo sayTEC direkt reinpasst</span>
      </div>
      <p className="text-[10px] text-text-muted mb-3">
        13 Geldströme durch Gesetze, Marktverschiebungen & regulatorischen Druck. Jeder = offene Tür für BBT-Produkte.
      </p>

      <div className="space-y-2">
        {visible.map((g) => (
          <div key={g.id} className="border border-border rounded-lg p-3 hover:bg-bg-hover/50 transition-colors">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={cn('shrink-0', g.color)}>{g.icon}</span>
              <span className="text-xs font-bold flex-1">{g.law}</span>
              <span className={cn(
                'text-[9px] font-black px-1.5 py-0.5 rounded-full border',
                g.urgency === 'JETZT' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                g.urgency === 'Q3 2026' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                'bg-blue-500/10 text-blue-400 border-blue-500/20'
              )}>
                {g.urgency}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 text-[10px]">
              <div>
                <span className="text-text-muted block">Produkt</span>
                <span className="font-bold text-emerald-400">{g.product}</span>
              </div>
              <div>
                <span className="text-text-muted block">Zielgruppe</span>
                <span className="font-medium">{g.target}</span>
              </div>
              <div>
                <span className="text-text-muted block">Deal-Größe</span>
                <span className="font-bold text-amber-400">{g.dealSize}</span>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-text-muted block">Warum</span>
                <span>{g.why}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {MONEY_GLITCHES.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 w-full flex items-center justify-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors py-2 rounded-lg bg-amber-500/5 border border-amber-500/10"
        >
          {showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showAll ? 'Weniger anzeigen' : `Alle ${MONEY_GLITCHES.length} Money Glitches anzeigen`}
        </button>
      )}

      <div className="mt-3 rounded-lg bg-gradient-to-r from-red-900/20 to-amber-900/20 border border-red-700/20 p-3">
        <p className="text-[10px] text-text-muted leading-relaxed">
          <strong className="text-red-400">Zeitfenster 2026-2027:</strong> NIS2 + VMware-Krise + Ransomware-Angst = einmaliges Fenster.
          Wer jetzt die Kundenbeziehungen aufbaut, besitzt sie für das nächste Jahrzehnt.
          <strong className="text-amber-400"> Nach 2027 sind die meisten migriert.</strong>
        </p>
      </div>
    </div>
  );
}

function SalesChannelsSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp size={20} className="text-emerald-400" />
        <h2 className="text-lg font-bold">Vertriebskanäle</h2>
        <span className="text-xs text-text-muted">85-95% über Channel</span>
      </div>
      <p className="text-[10px] text-text-muted mb-3">
        Der Mittelstand kauft IT NICHT direkt. Er fragt seinen IT-Systemhaus-Partner. → 80% Channel, 15% Direkt, 5% Tippgeber.
      </p>
      <div className="space-y-1.5">
        {SALES_CHANNELS.map((c) => (
          <div key={c.rank} className="grid grid-cols-12 gap-2 items-center p-2 rounded-lg bg-bg-hover/30 text-[10px]">
            <div className="col-span-1">
              <span className="font-black text-amber-400">#{c.rank}</span>
            </div>
            <div className="col-span-3">
              <span className="font-bold text-xs">{c.name}</span>
            </div>
            <div className="col-span-2">
              <span className="font-bold text-emerald-400">{c.share}</span>
            </div>
            <div className="col-span-3 text-text-muted">
              {c.examples}
            </div>
            <div className="col-span-2">
              <span className={cn(
                'px-1.5 py-0.5 rounded-full text-[9px] font-bold border',
                c.priority === 'HÖCHSTE' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                c.priority === 'HOCH' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                'bg-blue-500/10 text-blue-400 border-blue-500/20'
              )}>
                {c.priority}
              </span>
            </div>
            <div className="col-span-1 text-text-muted text-right">
              {c.timeToRevenue}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid md:grid-cols-3 gap-2">
        <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-2.5">
          <h4 className="text-[10px] font-bold text-emerald-400 mb-1">Tippgeber Tier 1</h4>
          <p className="text-[9px] text-text-muted">Steuerberater, Anwälte → €500-1.000 Flat + 3-5% Deal</p>
        </div>
        <div className="rounded-lg bg-amber-500/5 border border-amber-500/10 p-2.5">
          <h4 className="text-[10px] font-bold text-amber-400 mb-1">Tippgeber Tier 2</h4>
          <p className="text-[9px] text-text-muted">IT-Berater, NIS2-Advisors → 8-12% Erstjahr + 3-5% Recurring</p>
        </div>
        <div className="rounded-lg bg-purple-500/5 border border-purple-500/10 p-2.5">
          <h4 className="text-[10px] font-bold text-purple-400 mb-1">Channel Tier 3</h4>
          <p className="text-[9px] text-text-muted">Systemhäuser, MSPs → 25-40% Reseller-Marge</p>
        </div>
      </div>
    </div>
  );
}

function TopKeywordsSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-1">
        <Globe size={20} className="text-cyan-400" />
        <h2 className="text-lg font-bold">Top-Keywords für Google Ads / SEO</h2>
      </div>
      <p className="text-[10px] text-text-muted mb-3">
        NIS2-Keywords sind noch günstig (€3-8 CPC). Fenster schließt sich wenn mehr Vendor targetieren.
      </p>
      <div className="space-y-1">
        {TOP_KEYWORDS.map((k, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-center p-2 rounded-lg bg-bg-hover/30 text-[10px]">
            <div className="col-span-5 font-bold">{k.keyword}</div>
            <div className="col-span-3">
              <span className="text-text-muted">Vol: </span>
              <span className="text-cyan-400 font-bold">{k.volume}</span>
            </div>
            <div className="col-span-2">
              <span className="text-text-muted">CPC: </span>
              <span className="text-amber-400 font-bold">{k.cpc}</span>
            </div>
            <div className="col-span-2 flex gap-0.5 justify-end">
              {Array.from({ length: k.relevance }).map((_, j) => (
                <Star key={j} size={8} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10 p-2.5">
        <h4 className="text-[10px] font-bold text-cyan-400 mb-1">Sofort Landingpages erstellen:</h4>
        <div className="flex flex-wrap gap-1.5">
          {['NIS2 Compliance DE', 'VMware Alternative Made in Germany', 'GF-Haftung NIS2', 'Ransomware-sicheres Backup', 'Zero Trust Mittelstand'].map((p, i) => (
            <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-bg-hover border border-border text-text-muted">{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BBTRulesSection() {
  const rules = [
    'VERKAUFE NIE. Berate immer.',
    'Verstehe das Produkt BESSER als der Hersteller.',
    'Höre zu bevor du sprichst — 80% Zuhören, 20% Reden.',
    'Eine warme Einführung > 100 Kaltakquisen.',
    'Nimm nie Geld von beiden Seiten — Transparenz immer.',
    'Liefere WERT bevor du etwas verlangst.',
    'Follow up. IMMER. 80% der Deals nach dem 5. Follow-up.',
    'Dokumentiere jede Interaktion im CRM.',
    'Diversifiziere — nicht nur Bunker Bauer.',
    'Der Deal ist erst fertig wenn der Kunde GLÜCKLICH ist.',
  ];

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Crown size={20} className="text-amber-400" />
        <h2 className="text-lg font-bold">Die 10 Connector-Regeln</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        {rules.map((r, i) => (
          <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-bg-hover/50">
            <span className="text-[10px] font-black text-amber-400 bg-amber-500/10 w-5 h-5 rounded flex items-center justify-center shrink-0">
              {i + 1}
            </span>
            <span className="text-xs text-text-muted">{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinalMessage() {
  return (
    <div className="rounded-xl bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-700/20 p-6 text-center">
      <Crown className="text-amber-400 mx-auto mb-3" size={32} />
      <h3 className="text-xl font-black mb-2">
        Der Shortcut ist nicht weniger zu lernen.<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
          Es ist das RICHTIGE zu lernen.
        </span>
      </h3>
      <p className="text-sm text-text-muted max-w-xl mx-auto leading-relaxed">
        4.8 Millionen offene Stellen. ~100 OSEE-Holder. ~5.000 OT-Security-Spezialisten.
        Null AI kann Löten, vor Gericht aussagen, oder kreative Zero-Days finden.
        Du musst nicht alles können — du musst das können, was <strong>niemand sonst kann</strong>.
      </p>
    </div>
  );
}

// ===================== MAIN VIEW =====================

export function ShortcutView() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
      <ShortcutHero />
      <CoreInsight />

      {/* OT/ICS Focus — Generational Wealth Path */}
      <OTFocusBanner />

      {/* Global OT/ICS Markets */}
      <GlobalMarketsSection />

      {/* Wealth Timeline */}
      <WealthTimelineSection />

      {/* ========== BUNKER BAUER TEC — QUICK MONEY PLAYBOOK ========== */}
      <BBTBanner />
      <MoneyGlitchesSection />
      <BBTProductsSection />
      <CompetitorMatrixSection />
      <FearStatsSection />
      <ObjectionHandlingSection />
      <SalesChannelsSection />
      <TopKeywordsSection />
      <RevenueModelsSection />
      <TargetCustomersSection />
      <BlueOceanSection />
      <IncomeProjectionSection />
      <ActionPlanSection />
      <KulturbrueckeSection />
      <BBTToolsSection />
      <BBTRulesSection />

      {/* ========== CYBERSECURITY NICHES ========== */}
      {/* Ultra Niches */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Microscope size={20} className="text-amber-400" />
          <h2 className="text-lg font-bold">Die 6 Ultra-Nischen</h2>
          <span className="text-xs text-text-muted">(klicke zum Aufklappen)</span>
        </div>
        <div className="space-y-3">
          {ULTRA_NICHES.map((n) => (
            <NicheCard key={n.id} niche={n} />
          ))}
        </div>
      </div>

      {/* Dying Skills Warning */}
      <DyingSkillsSection />

      {/* Rare Certs */}
      <RareCertsSection />

      {/* Zero-Day Prices */}
      <ZeroDayPrices />

      {/* Recommended Path */}
      <RecommendedPathSection />

      {/* Final Message */}
      <FinalMessage />
    </div>
  );
}
