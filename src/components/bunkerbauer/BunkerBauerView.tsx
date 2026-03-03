import { useState } from 'react';
import {
  Shield, ChevronDown, ChevronUp, Lock, Server, Database, Cpu,
  KeyRound, Layers, Eye, Wifi, WifiOff, MonitorSmartphone, AlertTriangle,
  CheckCircle2, XCircle, Fingerprint, HardDrive, Network, Globe,
  Zap, Award, Building2, Clock, Package, Factory, ShieldCheck,
  BarChart3, ArrowRight, MessageSquare, Users, Landmark, Target,
  ServerCrash, CircuitBoard,
  TrendingUp, Briefcase, Phone, Calendar, Rocket, Flame,
  DollarSign, Handshake, Megaphone, MapPin, HeartPulse, GraduationCap,
  Star, FileText, Play, Truck, Utensils, BookOpen,
  Banknote, Timer, Repeat, Cloud, Wrench,
} from 'lucide-react';
import { cn } from '@/lib/utils.ts';

/* ================================================================
   BUNKERBAUER TECHNOLOGIES — sayTEC Technologie-Kompendium
   Vollständige Referenz aus Schulung 26.02.2026 + GAP-Analyse
   ================================================================ */

// ===================== HERO =====================

function TechHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/60 via-indigo-800/40 to-purple-900/60 border border-blue-700/30 p-6 md:p-8">
      <div className="absolute top-4 right-4 opacity-10">
        <Shield size={140} />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="text-blue-400" size={28} />
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
            Bunkerbauer Technologies — sayTEC Kompendium
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black mb-2">
          Post Zero Trust<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Security by Design
          </span>
        </h1>
        <p className="text-text-muted text-sm mb-6 max-w-2xl leading-relaxed">
          Vollständige Technologie-Referenz basierend auf der sayTEC Vertriebsschulung vom 26.02.2026
          mit CEO Yakup Saygin. Alle Produkte, Architekturen, Kennzahlen und Verkaufsargumente.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Defence-in-Depth', value: '9 Stufen', sub: '3 DiD-Blöcke', icon: <Layers size={18} /> },
            { label: 'Backup-Speed', value: '60 TB/h', sub: 'größte Maschine', icon: <HardDrive size={18} /> },
            { label: 'HCI-Skalierung', value: '200 PB', sub: '200 Gbit/s Node-Komm.', icon: <Server size={18} /> },
            { label: 'EAL-4 Plus', value: 'Militär', sub: 'BSI-zertifiziert', icon: <Award size={18} /> },
          ].map((s) => (
            <div key={s.label} className="bg-blue-950/40 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">{s.icon}</div>
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

// ===================== POST ZERO TRUST =====================

function PostZeroTrustSection() {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-5 hover:bg-bg-hover/50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white"><Eye size={20} /></div>
            <div>
              <h2 className="font-bold text-sm">Post Zero Trust — Der Kernunterschied</h2>
              <p className="text-xs text-text-muted">Warum sayTRUST VPSC NICHT "Zero Trust" ist, sondern darüber hinausgeht</p>
            </div>
          </div>
          {expanded ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
          <div className="rounded-xl bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-700/20 p-4">
            <p className="text-sm font-bold text-amber-400 mb-2">Die zentrale Definition (Yakup Saygin, CEO sayTEC):</p>
            <blockquote className="text-sm text-text-muted italic border-l-2 border-amber-500 pl-3">
              "Zero Trust ist ein Policy-Modell. Post Zero Trust ist ein Security by Design Architekturmodell."
            </blockquote>
            <p className="text-xs text-text-muted mt-3">
              "Der Markt denkt Zugriff. Wir denken Angriffsarchitektur. Das ist ein <strong>architektonischer Unterschied</strong>, kein Feature-Unterschied."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-lg bg-red-500/5 border border-red-500/10 p-4">
              <h4 className="text-xs font-bold text-red-400 mb-2">Zero Trust (Markt)</h4>
              <ul className="text-xs text-text-muted space-y-1.5">
                <li className="flex items-start gap-1.5"><XCircle size={12} className="text-red-400 shrink-0 mt-0.5" />Identität + Policy + Proxy</li>
                <li className="flex items-start gap-1.5"><XCircle size={12} className="text-red-400 shrink-0 mt-0.5" />Kontrolle auf Zugriffsebene</li>
                <li className="flex items-start gap-1.5"><XCircle size={12} className="text-red-400 shrink-0 mt-0.5" />Verwaltung von Sessions</li>
                <li className="flex items-start gap-1.5"><XCircle size={12} className="text-red-400 shrink-0 mt-0.5" />Policy-Modell: "Wer darf rein?"</li>
              </ul>
            </div>
            <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-4">
              <h4 className="text-xs font-bold text-emerald-400 mb-2">Post Zero Trust (sayTRUST)</h4>
              <ul className="text-xs text-text-muted space-y-1.5">
                <li className="flex items-start gap-1.5"><CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />Kontrolle am Kommunikationsstartpunkt</li>
                <li className="flex items-start gap-1.5"><CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />Prozessisolierung im RAM</li>
                <li className="flex items-start gap-1.5"><CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />On-Demand-Verschlüsselung</li>
                <li className="flex items-start gap-1.5"><CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />Architekturmodell: "Wie entsteht Kommunikation?"</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold mb-2">3 Zero-Trust-Marktkategorien (alle unzureichend)</h4>
            <div className="grid md:grid-cols-3 gap-2">
              {[
                { name: 'Cloud Proxy', examples: 'Zscaler, Palo Alto', weakness: 'Traffic über externe Infra, Jurisdiktionsproblem (KRITIS!), externe Angriffsfläche' },
                { name: 'SDP / Proxy-Architektur', examples: 'Appgate, Akamai', weakness: 'Sichtbare Endpunkte, DoS/Exploit-Ziel, zentrale Angriffskonzentration' },
                { name: 'On-Prem Appliance', examples: 'Fortinet, Cisco', weakness: 'Client-Integrität nicht architektonisch erzwungen, Agent manipulierbar = Tunnel manipuliert' },
              ].map((cat) => (
                <div key={cat.name} className="rounded-lg bg-bg-hover p-3">
                  <h5 className="text-xs font-bold mb-1">{cat.name}</h5>
                  <p className="text-[10px] text-text-muted mb-1">({cat.examples})</p>
                  <p className="text-[10px] text-red-400">{cat.weakness}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===================== sayTRUST VPSC =====================

function VPSCSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-5 hover:bg-bg-hover/50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white"><KeyRound size={20} /></div>
            <div>
              <h2 className="font-bold text-sm">sayTRUST VPSC — Post Zero Trust Kommunikation</h2>
              <p className="text-xs text-text-muted">Virtual Private Secure Communication — KEIN VPN</p>
            </div>
          </div>
          {expanded ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-border pt-4">

          {/* 9-Stufen Defence-in-Depth */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Layers size={16} className="text-blue-400" /> 9-Stufen Defence-in-Depth (3 DiD-Blöcke)</h3>
            <div className="space-y-3">
              <div className="rounded-lg bg-blue-500/5 border border-blue-500/10 p-4">
                <h4 className="text-xs font-bold text-blue-400 mb-2">Block 1 — Identität & Kontrolle (DiD I) — VOR dem Tunnel</h4>
                <div className="space-y-1.5">
                  {[
                    'Stufe 1: Biometrie (Fingerabdruck auf Mikroprozessor) — Token unsichtbar für OS bis Auth erfolgreich',
                    'Stufe 2: PIN für Biometrie-Storage',
                    'Stufe 3: AES-256 Hardware-Verschlüsselung auf Token-Chip',
                    'Stufe 4: X.509 Benutzerzertifikat (2048-Bit) + Standort-/Berechtigungsprüfung',
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-text-muted">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-purple-500/5 border border-purple-500/10 p-4">
                <h4 className="text-xs font-bold text-purple-400 mb-2">Block 2 — RAM-basierte Sicherheitskommunikation (DiD II)</h4>
                <div className="space-y-1.5">
                  {[
                    'Stufe 5: VPSC-Client prüft im Prozessspeicher — nur erlaubte Apps getunnelt',
                    'Stufe 6: Personifizierter Perfect Forward Secrecy (PPFS) — neuer Schlüssel pro Session, regelmäßig erneuert',
                    'Stufe 7: APP-Socket direkt vom Arbeitsspeicher zum Zielnetzwerk getunnelt (Zero Footprint)',
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-text-muted">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px] font-bold">{i + 5}</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-4">
                <h4 className="text-xs font-bold text-emerald-400 mb-2">Block 3 — Zielnetzwerk- & Missbrauchskontrolle (DiD III)</h4>
                <div className="space-y-1.5">
                  {[
                    'Stufe 8: Manipulationskontrolle + bedingte Übertragung + gezielter Point-to-Point Zugriff',
                    'Stufe 9: Server überwacht alle Zugriffsversuche, prüft Zertifikat auf Unversehrtheit, gewährt/blockiert',
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-text-muted">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">{i + 8}</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 5 Sicherheitsstufen Alpha-Epsilon */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Shield size={16} className="text-amber-400" /> 5 Sicherheitsstufen (Alpha — Epsilon)</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {[
                { greek: 'α', name: 'Alpha', scope: 'Mensch & Maschine', detail: 'Kein Identitätsklau, kein Man-in-the-Middle, BYOD kein Einfluss', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
                { greek: 'β', name: 'Beta', scope: 'Fremdnetzwerk', detail: 'Kein Aushorchen, kein Einfluss von fremder HW und SW', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
                { greek: 'γ', name: 'Gamma', scope: 'Internet-Strecke', detail: 'Hops, ISP, MSP — kein Identitätsklau, kein MITM', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                { greek: 'δ', name: 'Delta', scope: 'Internes Netz', detail: 'DMZ, Client-LAN, Gäste-LAN — vollständige Isolation', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                { greek: 'ε', name: 'Epsilon', scope: 'Unternehmenswerte', detail: 'Erhalt, Schutz, Verfügbarkeit — PAM hochgradig geschützt', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
              ].map((stage) => (
                <div key={stage.greek} className={cn('rounded-lg border p-3 text-center', stage.color)}>
                  <div className="text-2xl font-black mb-1">{stage.greek}</div>
                  <div className="text-xs font-bold">{stage.name}</div>
                  <div className="text-[10px] font-medium mt-1">{stage.scope}</div>
                  <div className="text-[9px] text-text-muted mt-1">{stage.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Architekturkomponenten */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Cpu size={16} className="text-cyan-400" /> 3 Architekturkomponenten</h3>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="rounded-lg bg-bg-hover p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Server size={16} className="text-blue-400" />
                  <h4 className="text-xs font-bold">1. sayTRUST Access-Server</h4>
                </div>
                <ul className="text-[11px] text-text-muted space-y-1">
                  <li>Zentrale Steuer- und Kontrollinstanz</li>
                  <li>Policy- und Zertifikatsmanagement</li>
                  <li>Zentrale Bestückung der Arbeitsumgebung</li>
                  <li>Keine offene Gateway-Logik</li>
                </ul>
              </div>
              <div className="rounded-lg bg-bg-hover p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu size={16} className="text-purple-400" />
                  <h4 className="text-xs font-bold">2. Kommunikationsclient</h4>
                </div>
                <ul className="text-[11px] text-text-muted space-y-1">
                  <li>Läuft isoliert im Arbeitsspeicher (RAM)</li>
                  <li>Verschlüsselt eigenen RAM-Bereich</li>
                  <li>Tunnelaufbau aus geschütztem Kontext</li>
                  <li>Kein Netzbeitritt, keine OS-Abhängigkeit</li>
                </ul>
              </div>
              <div className="rounded-lg bg-bg-hover p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MonitorSmartphone size={16} className="text-emerald-400" />
                  <h4 className="text-xs font-bold">3. sayTRUST Access-Menü</h4>
                </div>
                <ul className="text-[11px] text-text-muted space-y-1">
                  <li>Identitätsgebundene Arbeitsumgebung</li>
                  <li>Bis zu <strong>30 konfigurierbare Funktions-Tabs</strong></li>
                  <li>Einheitliche Oberfläche — weltweit identisch</li>
                  <li>MS Apps, Citrix, VoIP, FileTransfer, Portable Apps, Web</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Client-PC-Kontrolle */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Lock size={16} className="text-red-400" /> Client-PC-Kontrolle während aktiver Sitzung</h3>
            <div className="rounded-lg bg-red-500/5 border border-red-500/10 p-4">
              <p className="text-xs text-text-muted mb-3">Während einer aktiven Verbindung stellt das System folgende Kontrollen sicher:</p>
              <div className="grid md:grid-cols-2 gap-2">
                {[
                  'Browser gesperrt während VDI-Sitzungen',
                  'TeamViewer und Remote-Desktop-Tools blockiert',
                  'Jegliche externe Kommunikation unterbunden',
                  'Parallele Kanäle blockiert',
                  'Bildschirmfreigabe-Missbrauch verhindert',
                  'Datenabfluss über Fremdkanäle unmöglich',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-text-muted">
                    <XCircle size={12} className="text-red-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* VPN-Vergleich */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Network size={16} className="text-orange-400" /> 4 VPN-Typen vs. sayTRUST als 5.</h3>
            <div className="space-y-2">
              {[
                { type: 'IPSec VPN', layer: 'Layer 3/4', risk: 'Client wird Teil des Zielnetzes. Lateral Movement möglich. Management-Domänen erreichbar. Kompromittierter Client = offenes Tor.', verdict: 'IT-Betrieb, keine Sicherheitsarchitektur' },
                { type: 'SSL VPN', layer: 'Browser-basiert', risk: 'Browser-Angriffsfläche. Plug-ins. Session Hijacking. Keine echte Endpunktkontrolle.', verdict: 'Sieht modern aus, bleibt clientabhängig' },
                { type: 'Proxy-basiert', layer: 'Proxy-Programm', risk: 'Manipulierbare Software. Tunnel-Missbrauch. Drittsoftware im Tunnel.', verdict: 'Kontrolle nicht an kritischster Stelle' },
                { type: 'Application Gateway', layer: 'Reverse-Proxy', risk: 'Ports müssen offen bleiben. Sichtbares Ziel im Internet. DoS/Exploit möglich.', verdict: 'Schützt Anwendungen, nicht Kommunikationsarchitektur' },
                { type: 'sayTRUST VPSC', layer: 'Layer 7 / RAM', risk: 'KEINE der oben genannten Schwachstellen. Kommunikation aus RAM, keine Netzwerkkopplung, Client unsichtbar.', verdict: 'Sichert jede kritische Schnittstelle der Kommunikation' },
              ].map((vpn) => (
                <div key={vpn.type} className={cn(
                  'rounded-lg p-3 text-xs',
                  vpn.type === 'sayTRUST VPSC'
                    ? 'bg-emerald-500/5 border border-emerald-500/10'
                    : 'bg-bg-hover'
                )}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn('font-bold', vpn.type === 'sayTRUST VPSC' ? 'text-emerald-400' : '')}>{vpn.type}</span>
                    <span className="text-[10px] text-text-muted">{vpn.layer}</span>
                  </div>
                  <p className="text-text-muted mb-1">{vpn.risk}</p>
                  <p className={cn('text-[10px] italic', vpn.type === 'sayTRUST VPSC' ? 'text-emerald-400' : 'text-red-400')}>{vpn.verdict}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Einwandbehandlung ZTNA */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><MessageSquare size={16} className="text-violet-400" /> Einwandbehandlung — ZTNA-Wettbewerb</h3>
            <div className="space-y-2">
              {[
                { objection: '"Wir haben bereits ZTNA von Zscaler."', answer: 'Sehr gut — dann haben Sie Zugriffskontrolle umgesetzt. Wie stellen Sie sicher, dass ein kompromittierter Client keine manipulierte Kommunikation startet?' },
                { objection: '"Unser Proxy ist doch sicher."', answer: 'Absolut. Aber was passiert, wenn der Angreifer sich VOR dem Proxy im Client-Prozess einklinkt?' },
                { objection: '"Zero Trust = Never Trust, Always Verify."', answer: 'Richtig. Aber verifizieren Sie nur Identität — oder auch die Integrität der Kommunikationsentstehung?' },
              ].map((item, i) => (
                <div key={i} className="rounded-lg bg-violet-500/5 border border-violet-500/10 p-3">
                  <p className="text-xs font-bold text-violet-400 mb-1">{item.objection}</p>
                  <p className="text-xs text-text-muted"><ArrowRight size={10} className="inline mr-1" />{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Unique Features */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Zap size={16} className="text-cyan-400" /> Einzigartige Features</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                { icon: <WifiOff size={14} />, title: 'Keine Internetabhängigkeit', desc: 'System funktioniert komplett ohne Internet. Kritisch für KRITIS, Militär, OT-Umgebungen.', color: 'text-red-400' },
                { icon: <Wifi size={14} />, title: 'Secure Wake-on-LAN (sWoL)', desc: 'PC über VPSC-Tunnel ein-/ausschalten, auch über mehrere Gateways. Weltweit einzigartig. Frankfurt (Oder) nutzt das.', color: 'text-emerald-400' },
                { icon: <Lock size={14} />, title: 'PAM integriert', desc: 'Privileged Access Management nativ eingebaut. Kein separater CyberArk/BeyondTrust nötig.', color: 'text-purple-400' },
                { icon: <KeyRound size={14} />, title: 'PKI + SSO + Passwort unified', desc: 'PKI, Single Sign-On, Passwortmanagement (KeePass auf Token) — alles integriert, ein System.', color: 'text-blue-400' },
                { icon: <Fingerprint size={14} />, title: 'Device-Based Lizenzierung', desc: 'Token = 1 Lizenz für unbegrenzt PCs (Token wandert mit). Software-Client = 1 Lizenz pro PC.', color: 'text-amber-400' },
                { icon: <Eye size={14} />, title: 'Zero Footprint / No-OS-Footprint', desc: 'Null Datenspuren auf dem Client. RAM wird nach Session gelöscht. Forensisch unwiederherstellbar.', color: 'text-cyan-400' },
              ].map((feat, i) => (
                <div key={i} className="rounded-lg bg-bg-hover p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={feat.color}>{feat.icon}</span>
                    <span className="text-xs font-bold">{feat.title}</span>
                  </div>
                  <p className="text-[11px] text-text-muted">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Token-Varianten */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Fingerprint size={16} className="text-amber-400" /> 7 Client-/Token-Varianten (parallel nutzbar)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { name: 'Mikroprozessor-Token', auth: 'AES-256 + Biometrie + Zertifikat + Passwort', highlight: true },
                { name: 'Flash-Token (Lexar)', auth: 'AES-256 + Biometrie + Zertifikat + Passwort', highlight: false },
                { name: 'Keypad-Token', auth: 'AES-256 + PIN-Pad + Zertifikat', highlight: false },
                { name: 'Secure MicroSD / SSD', auth: 'Zertifikat + Passwort + PIN', highlight: false },
                { name: 'USB Client', auth: 'Zertifikat + PIN', highlight: false },
                { name: 'Software Client', auth: 'Zertifikat + PIN', highlight: false },
                { name: 'Mobile App', auth: 'Zertifikat + PIN', highlight: false },
              ].map((t) => (
                <div key={t.name} className={cn('rounded-lg p-2.5 text-center', t.highlight ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-bg-hover')}>
                  <div className="text-xs font-bold mb-0.5">{t.name}</div>
                  <div className="text-[9px] text-text-muted">{t.auth}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Verschlüsselungs-Stack */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Lock size={16} className="text-emerald-400" /> Verschlüsselungs-Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                { label: 'Transport', value: 'TLS 1.3 + X.509' },
                { label: 'Symmetrisch', value: 'AES-256 Bit' },
                { label: 'Schlüsselaustausch', value: 'Diffie-Hellman PPFS' },
                { label: 'Hashing', value: 'SHA-256 / SHA-384' },
                { label: 'Asymmetrisch', value: 'RSA 2048-Bit' },
                { label: 'Random', value: '/dev/random (nicht urandom)' },
                { label: 'OpenSSL', value: 'Custom Compilations/Plattform' },
                { label: 'Token-Chip', value: 'Atmel AT32UC3A3, 84MHz' },
                { label: 'HW-AES', value: '22.8 MB/s, FIPS PUB 197' },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-bg-hover p-2 text-center">
                  <div className="text-[10px] text-text-muted">{item.label}</div>
                  <div className="text-xs font-bold">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

// ===================== sayFUSE BACKUP =====================

function BackupSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-5 hover:bg-bg-hover/50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white"><HardDrive size={20} /></div>
            <div>
              <h2 className="font-bold text-sm">sayFUSE Backup — Patentierte Air-Gap-Architektur</h2>
              <p className="text-xs text-text-muted">"sayFUSE ist kein Backup-Target. Es ist eine Backup-Restore & Archivierung <strong>Architektur</strong>."</p>
            </div>
          </div>
          {expanded ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-border pt-4">
          <div className="rounded-xl bg-gradient-to-r from-emerald-900/20 to-green-900/20 border border-emerald-700/20 p-4">
            <p className="text-sm font-bold text-emerald-400 mb-1">Kern-Positionierung:</p>
            <blockquote className="text-sm text-text-muted italic border-l-2 border-emerald-500 pl-3">
              "sayFUSE ist kein Backup-Target. Es ist eine Backup-Restore & Archivierung Architektur."
            </blockquote>
          </div>

          {/* Performance */}
          <div>
            <h3 className="text-sm font-bold mb-3">Performance (aktualisiert!)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { label: 'Live-Backup', value: 'bis 60 TB/h', sub: 'größte Maschine', highlight: true },
                { label: 'Migration', value: '18 TB/h', sub: '', highlight: false },
                { label: 'Dedup', value: '20 TB/h', sub: '90% Reduktion', highlight: false },
                { label: 'Auslagerung', value: '100 TB', sub: 'an einem Wochenende', highlight: false },
              ].map((p) => (
                <div key={p.label} className={cn('rounded-lg p-3 text-center', p.highlight ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-bg-hover')}>
                  <div className={cn('text-xl font-black', p.highlight ? 'text-emerald-400' : '')}>{p.value}</div>
                  <div className="text-[10px] text-text-muted">{p.label}</div>
                  {p.sub && <div className="text-[9px] text-text-muted">{p.sub}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* 4-Stufen-Konzept */}
          <div>
            <h3 className="text-sm font-bold mb-3">4-Stufen-Generationenkonzept</h3>
            <div className="space-y-2">
              {[
                { num: 1, name: 'Dedup-Sicherung', desc: 'Bis zu 90% Reduktion der Sicherungsdatenmenge. Dient unmittelbarer Wiederherstellung.', color: 'text-blue-400 bg-blue-500/10' },
                { num: 2, name: 'Tages-Backup auf Medien', desc: 'Jobgesteuert ein-/ausschalten. Läuft INTERN im sayFUSE OHNE Netzwerkressourcen.', color: 'text-purple-400 bg-purple-500/10' },
                { num: 3, name: 'Wochen-/Monatsmigration', desc: 'Automatisch im Hintergrund zu vollständigen Sicherungsdatensätzen migriert. Zeiteinsparung.', color: 'text-emerald-400 bg-emerald-500/10' },
                { num: 4, name: 'Physische Auslagerung', desc: 'Medien physisch entnehmbar. Verschlüsselt, EM-geschirmt, physisch gesichert. Air-Gap.', color: 'text-red-400 bg-red-500/10' },
              ].map((s) => (
                <div key={s.num} className={cn('flex items-start gap-3 rounded-lg p-3', s.color.split(' ')[1])}>
                  <span className={cn('shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black', s.color.split(' ')[1])}>{s.num}</span>
                  <div>
                    <div className={cn('text-xs font-bold', s.color.split(' ')[0])}>{s.name}</div>
                    <div className="text-[11px] text-text-muted">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Generationsprinzip */}
          <div className="rounded-lg bg-bg-hover p-4">
            <h4 className="text-xs font-bold mb-2">Großvater-Vater-Sohn Prinzip</h4>
            <p className="text-xs text-text-muted">3 Dedup + 4 Tages + 5 Wochen + 12 Monats = <strong>21 Medien = 1 Jahr</strong> vollständige Rückverfolgung</p>
          </div>

          {/* Patentierte Technologie */}
          <div className="rounded-lg bg-amber-500/5 border border-amber-500/10 p-4">
            <h4 className="text-xs font-bold text-amber-400 mb-2">PATENTIERT — Beseitigt Schwächen beider Welten</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-bold text-red-400 mb-1">Storage-basiert (Problem):</p>
                <p className="text-[10px] text-text-muted">Immer online = anfällig für Ransomware</p>
                <p className="text-[10px] font-bold text-emerald-400 mt-1">sayFUSE-Lösung:</p>
                <p className="text-[10px] text-text-muted">Laufwerke schalten jobgesteuert ab</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-red-400 mb-1">Band-basiert (Problem):</p>
                <p className="text-[10px] text-text-muted">Langsam, Start-Stopp, temperaturempfindlich</p>
                <p className="text-[10px] font-bold text-emerald-400 mt-1">sayFUSE-Lösung:</p>
                <p className="text-[10px] text-text-muted">Disk-Geschwindigkeit bis 60 TB/h</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===================== sayFUSE HCI =====================

function HCISection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-5 hover:bg-bg-hover/50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white"><ServerCrash size={20} /></div>
            <div>
              <h2 className="font-bold text-sm">sayFUSE HCI — Hyperkonvergente Infrastruktur</h2>
              <p className="text-xs text-text-muted">Alle Lizenzen inklusive. Skalierbar bis 200 PB. 200 Gbit/s Node-Kommunikation.</p>
            </div>
          </div>
          {expanded ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-border pt-4">

          {/* Key Performance */}
          <div>
            <h3 className="text-sm font-bold mb-3">Performance-Highlights</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { label: 'Skalierbarkeit', value: '200 PB', highlight: true },
                { label: 'Node-Kommunikation', value: '200 Gbit/s', sub: 'verschlüsselt', highlight: true },
                { label: 'S3 Lesen', value: '>160 GB/s', sub: '35-Node Config', highlight: false },
                { label: 'S3 Schreiben', value: '>90 GB/s', sub: '', highlight: false },
                { label: 'Disk Performance', value: '>630 GB/s', sub: '', highlight: false },
                { label: 'sayFUSE S (Big Data)', value: '150 GB/s', sub: 'Read/Write', highlight: true },
                { label: 'RAW Kapazität', value: '25 PB', sub: '35 Nodes', highlight: false },
                { label: 'Nutzbar (EC 7+2)', value: '20 PB', sub: '', highlight: false },
              ].map((p) => (
                <div key={p.label} className={cn('rounded-lg p-3 text-center', p.highlight ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-bg-hover')}>
                  <div className={cn('text-lg font-black', p.highlight ? 'text-purple-400' : '')}>{p.value}</div>
                  <div className="text-[10px] text-text-muted">{p.label}</div>
                  {p.sub && <div className="text-[9px] text-text-muted">{p.sub}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Symmetrisch vs Asymmetrisch */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Database size={16} className="text-indigo-400" /> Symmetrisch vs. Asymmetrisch HCI</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="rounded-lg bg-indigo-500/5 border border-indigo-500/10 p-4">
                <h4 className="text-xs font-bold text-indigo-400 mb-2">Symmetrisch</h4>
                <p className="text-xs text-text-muted mb-2">3+ identische sayFUSE UCI Nodes</p>
                <ul className="text-[11px] text-text-muted space-y-1">
                  <li>Jede Node ist vollwertig (Computing, Storage, Backup)</li>
                  <li>Jede Node kann andere vollwertig ersetzen</li>
                  <li>Beliebig skalierbar</li>
                  <li>Maximale Redundanz</li>
                </ul>
              </div>
              <div className="rounded-lg bg-pink-500/5 border border-pink-500/10 p-4">
                <h4 className="text-xs font-bold text-pink-400 mb-2">Asymmetrisch</h4>
                <p className="text-xs text-text-muted mb-2">1 sayFUSE Node + Computing-only Nodes</p>
                <ul className="text-[11px] text-text-muted space-y-1">
                  <li>sayFUSE Node: alle HW/SW Komponenten</li>
                  <li>Computing Nodes: nur Storage + Computing</li>
                  <li>Nicht gleichberechtigt</li>
                  <li>Kostengünstiger bei weniger Redundanz</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 6-Layer Architektur */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Layers size={16} className="text-cyan-400" /> 6-Layer UCI Architektur</h3>
            <div className="space-y-1.5">
              {[
                { num: 1, name: 'Manage-Layer', desc: 'Alle Steuerungskomponenten und Prozessaufgaben zentral überwacht und gesteuert', color: 'from-blue-500 to-blue-600' },
                { num: 2, name: 'Service-Layer', desc: 'Enthält alle erforderlichen Dienste und Lizenzen', color: 'from-indigo-500 to-indigo-600' },
                { num: 3, name: 'Computing & Storage-Layer', desc: 'Alle gängigen Storage-Funktionen und Methoden', color: 'from-purple-500 to-purple-600' },
                { num: 4, name: 'Virtuelle Storage-Disk-Layer', desc: 'NVMe, SSD, SAS, SATA parallel in unterschiedlichen Tiers', color: 'from-pink-500 to-pink-600' },
                { num: 5, name: 'Logic-Layer', desc: 'Erfassung und Steuerung der Datenblöcke und Paritäten über die Nodes', color: 'from-rose-500 to-rose-600' },
                { num: 6, name: 'Appliance/Backup-Layer', desc: 'Physikalische Backup-Library je Node', color: 'from-red-500 to-red-600' },
              ].map((layer) => (
                <div key={layer.num} className="flex items-center gap-3 rounded-lg bg-bg-hover p-2.5">
                  <div className={cn('w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold shrink-0', layer.color)}>
                    {layer.num}
                  </div>
                  <div>
                    <div className="text-xs font-bold">{layer.name}</div>
                    <div className="text-[10px] text-text-muted">{layer.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Einsatzszenarien */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Target size={16} className="text-amber-400" /> 4 Einsatzszenarien</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                { name: '1. Backup', desc: 'Reines Backup — DataDomain-Konkurrenz. sayFUSE ist kein Target, sondern Architektur.', color: 'text-emerald-400' },
                { name: '2. All-in-One Appliance', desc: 'Gesamte IT-Infrastruktur + Backup in einer Box. KMU-optimiert.', color: 'text-blue-400' },
                { name: '3. Cluster', desc: '2 Brandabschnitte, hochverfügbar. Nodes ersetzen Nodes. 1:n Konsistenz.', color: 'text-purple-400' },
                { name: '4. UCI/HCI', desc: 'Hyperkonvergent, max. skalierbar. Container, K8s, Multi-Tenancy, KRITIS.', color: 'text-amber-400' },
              ].map((s) => (
                <div key={s.name} className="rounded-lg bg-bg-hover p-3">
                  <div className={cn('text-xs font-bold mb-1', s.color)}>{s.name}</div>
                  <p className="text-[11px] text-text-muted">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Integrierte Services */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><CircuitBoard size={16} className="text-emerald-400" /> Integrierte Services (alle ohne Extra-Lizenzen)</h3>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Firewall', 'Router', 'OTP', 'Floating-IP', 'VPN', 'NaaS',
                'Server-Virtualisierung', 'VDI', 'Kubernetes', 'Billing',
                'Zero Trust (VPSC)', 'SSO', 'PKI', 'Monitoring',
                'Multi-Tenancy', 'Object-Storage (S3)', 'NFS/iSCSI-Storage',
                'Load Balancer', 'Live Migration', 'SW-Verteilung',
                'Geo-Replikation', 'KRITIS-Synchronisation',
                'Physikalische Backup-Library', 'Virtuelle Backup-Library',
              ].map((s) => (
                <span key={s} className="text-[10px] px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">{s}</span>
              ))}
            </div>
          </div>

          {/* KRITIS-Sync */}
          <div className="rounded-lg bg-red-500/5 border border-red-500/10 p-4">
            <h4 className="text-xs font-bold text-red-400 mb-2 flex items-center gap-1"><AlertTriangle size={14} /> KRITIS-Synchronisation</h4>
            <p className="text-xs text-text-muted">
              Gesetzliche Anforderung: Daten müssen <strong>200-500 km</strong> vom primären Datacenter entfernt gehalten werden.
              sayFUSE HCI unterstützt Geo-Replikation und Live-Synchronisation nativ für KRITIS-konforme Disaster Recovery.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}

// ===================== ZERTIFIZIERUNGEN =====================

function CertificationsSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Award size={16} className="text-amber-400" /> Zertifizierungen & Compliance</h3>
      <div className="grid md:grid-cols-2 gap-2">
        {[
          { cert: 'EAL-4 Plus (Common Criteria)', status: 'Zertifiziert', note: '"Plus steht für militärische Zwecke auch geeignet"', color: 'text-amber-400' },
          { cert: 'TeleTrusT "IT Security Made in Germany"', status: 'Zertifiziert', note: 'Rechtlich bindend: KEINE Backdoors', color: 'text-emerald-400' },
          { cert: 'TeleTrusT "IT Security Made in EU"', status: 'Zertifiziert', note: '', color: 'text-emerald-400' },
          { cert: 'greenhats Security-Siegel', status: '4.0/5 (sehr gut)', note: '', color: 'text-emerald-400' },
          { cert: 'Penetrationstest (Privia Security)', status: '15/15 bestanden', note: '15 Angriffsvektoren, 0 Schwachstellen', color: 'text-emerald-400' },
          { cert: 'CVE-Bilanz', status: '0 CVEs', note: 'Seit Bestehen kein einziger CVE', color: 'text-emerald-400' },
          { cert: 'DSGVO / ISO 27001', status: 'Konform', note: 'Designed as compliant', color: 'text-blue-400' },
          { cert: 'NIS2', status: 'Designed', note: '~40-50% der Anforderungen abgedeckt', color: 'text-blue-400' },
          { cert: 'GoBD / Basel II / KonTraG', status: 'Konform', note: 'Backup-Compliance', color: 'text-blue-400' },
          { cert: 'BSI C5 / BSI-Grundschutz', status: 'NICHT vorhanden', note: 'Status klären mit sayTEC', color: 'text-red-400' },
        ].map((c, i) => (
          <div key={i} className="flex items-start gap-2 rounded-lg bg-bg-hover p-2.5">
            {c.color === 'text-red-400' ? <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" /> : <CheckCircle2 size={14} className={cn(c.color, 'shrink-0 mt-0.5')} />}
            <div>
              <div className="text-xs font-bold">{c.cert}</div>
              <div className={cn('text-[10px] font-medium', c.color)}>{c.status}</div>
              {c.note && <div className="text-[9px] text-text-muted">{c.note}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================== CASE STUDY =====================

function CaseStudySection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Building2 size={16} className="text-emerald-400" /> Case Study: Stadt Frankfurt (Oder)</h3>
      <div className="rounded-xl bg-gradient-to-r from-emerald-900/20 to-green-900/20 border border-emerald-700/20 p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="text-2xl font-black text-emerald-400">1,9M</div>
            <div className="text-[10px] text-text-muted">EUR gespart</div>
            <div className="text-[9px] text-text-muted">am Tag der Installation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-blue-400">1 Tag</div>
            <div className="text-[10px] text-text-muted">Installation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-purple-400">1 Tag</div>
            <div className="text-[10px] text-text-muted">Schulung</div>
          </div>
        </div>
        <ul className="text-xs text-text-muted space-y-1">
          <li className="flex items-start gap-1.5"><CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />Nutzt Secure Wake-on-LAN über VPSC-Tunnel</li>
          <li className="flex items-start gap-1.5"><CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />Bis zu 40.000 User möglich</li>
          <li className="flex items-start gap-1.5"><CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />sayTRUST Lieferzeit: 1-2 Wochen</li>
        </ul>
      </div>
    </div>
  );
}

// ===================== KEY NUMBERS =====================

function KeyNumbersSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><BarChart3 size={16} className="text-blue-400" /> Alle Kennzahlen auf einen Blick</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          { cat: 'VPSC', items: [
            { label: 'Defence-in-Depth', value: '9 Stufen' },
            { label: 'Pentest', value: '15/15' },
            { label: 'CVEs', value: '0' },
            { label: 'Max. User', value: '40.000' },
            { label: 'Access-Menü Tabs', value: '30' },
            { label: 'Token-Varianten', value: '7' },
            { label: 'Lieferzeit', value: '1-2 Wochen' },
            { label: 'Installation', value: '1 Tag' },
          ]},
          { cat: 'Backup', items: [
            { label: 'Live-Backup', value: '60 TB/h' },
            { label: 'Migration', value: '18 TB/h' },
            { label: 'Dedup', value: '90%' },
            { label: 'Stufen', value: '4' },
            { label: 'Medien/Jahr', value: '21' },
            { label: 'Max Kapazität', value: '1.024 TB' },
            { label: 'Auslagerung', value: '100 TB/WE' },
            { label: 'Recovery', value: 'Minuten' },
          ]},
          { cat: 'HCI', items: [
            { label: 'Skalierbar bis', value: '200 PB' },
            { label: 'Node-Komm.', value: '200 Gbit/s' },
            { label: 'S3 Lesen', value: '>160 GB/s' },
            { label: 'S3 Schreiben', value: '>90 GB/s' },
            { label: 'Disk Perf.', value: '>630 GB/s' },
            { label: 'sayFUSE S R/W', value: '150 GB/s' },
            { label: 'Architektur', value: '6 Layer' },
            { label: 'Szenarien', value: '4' },
          ]},
          { cat: 'Business', items: [
            { label: 'Frankfurt (Oder)', value: '1,9M gespart' },
            { label: 'NIS2 Firmen', value: '29.500' },
            { label: 'BSI-Frist', value: '6. März 2026' },
            { label: 'Deal VPSC', value: '€50-80K' },
            { label: 'Deal HCI', value: '€150-500K' },
            { label: 'Deal Backup', value: '€5-200K' },
            { label: 'EAL Zert.', value: '4 Plus' },
            { label: 'Referenzen', value: 'Ministerien' },
          ]},
        ].map((group) => (
          <div key={group.cat}>
            <h4 className="text-[10px] font-bold text-accent mb-2 text-center">{group.cat}</h4>
            <div className="space-y-1">
              {group.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded bg-bg-hover px-2 py-1">
                  <span className="text-[9px] text-text-muted">{item.label}</span>
                  <span className="text-[10px] font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================== LIEFERZEITEN =====================

function DeliverySection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Clock size={16} className="text-cyan-400" /> Lieferzeiten & Implementierung</h3>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3 text-center">
          <div className="text-xs font-bold text-blue-400 mb-1">sayTRUST VPSC</div>
          <div className="text-lg font-black">1-2 Wochen</div>
          <div className="text-[10px] text-text-muted">Lieferung</div>
          <div className="text-lg font-black mt-1">1 Tag</div>
          <div className="text-[10px] text-text-muted">Installation + Schulung</div>
        </div>
        <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
          <div className="text-xs font-bold text-emerald-400 mb-1">sayFUSE Backup</div>
          <div className="text-lg font-black">2-4 Wochen</div>
          <div className="text-[10px] text-text-muted">Lieferung + Konfiguration</div>
        </div>
        <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-3 text-center">
          <div className="text-xs font-bold text-purple-400 mb-1">sayFUSE HCI</div>
          <div className="text-lg font-black">Komplexer</div>
          <div className="text-[10px] text-text-muted">Konfigurationsabhängig</div>
        </div>
      </div>
    </div>
  );
}

// ===================== ENFORCE TAC =====================

function EnforceTacSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Users size={16} className="text-violet-400" /> ENFORCE TAC 2026 — Ergebnisse (Petrus Lahm)</h3>
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center rounded-lg bg-violet-500/10 border border-violet-500/20 p-3">
          <div className="text-2xl font-black text-violet-400">140</div>
          <div className="text-[10px] text-text-muted">Kontakte geknüpft</div>
        </div>
        <div className="text-center rounded-lg bg-blue-500/10 border border-blue-500/20 p-3">
          <div className="text-sm font-black text-blue-400">Niederl. Verteidigungsminister</div>
          <div className="text-[10px] text-text-muted">Gespräch</div>
        </div>
        <div className="text-center rounded-lg bg-amber-500/10 border border-amber-500/20 p-3">
          <div className="text-sm font-black text-amber-400">Nigeria Brigadegeneral</div>
          <div className="text-[10px] text-text-muted">Gespräch</div>
        </div>
      </div>
    </div>
  );
}

// ===================== PRODUKTVARIANTEN-GUIDE =====================

function ProductGuideSection() {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Package size={16} className="text-amber-400" /> Produktvarianten-Auswahl: "Welche sayFUSE passt?"</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 text-text-muted font-medium">Bedarf</th>
              <th className="text-left py-2 px-3 text-text-muted font-medium">Empfehlung</th>
              <th className="text-left py-2 px-3 text-text-muted font-medium">Zielgruppe</th>
            </tr>
          </thead>
          <tbody>
            {[
              { need: 'Nur Backup & Restore', product: 'sayFUSE Backup', target: 'Unternehmen die DataDomain/Veeam ersetzen wollen' },
              { need: 'IT-Infra + Backup in einer Box', product: 'sayFUSE All-in-One', target: 'KMU ohne IT-Abteilung' },
              { need: 'Hochverfügbarkeit (2 Standorte)', product: 'sayFUSE Cluster', target: 'Unternehmen mit 2 Brandabschnitten' },
              { need: 'Maximale Skalierung + Cloud', product: 'sayFUSE UCI/HCI', target: 'KRITIS, Datacenter, Enterprise' },
              { need: 'Externes sicheres Kommunikation', product: 'sayTRUST VPSC', target: 'Jedes Unternehmen mit Remote-Zugriff' },
              { need: 'Komplettpaket (NIS2)', product: 'VPSC + HCI + Backup Bundle', target: 'Mittelstand 100-250 MA, €80-200K' },
            ].map((row, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-2 px-3 text-text-muted">{row.need}</td>
                <td className="py-2 px-3 font-bold">{row.product}</td>
                <td className="py-2 px-3 text-text-muted">{row.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===================== VERTRIEB / SALES BIBLE =====================

const VERTRIEB_TABS = [
  { id: 'versicherung', label: 'Versicherung', icon: ShieldCheck },
  { id: 'nis2-berater', label: 'NIS2-Berater', icon: GraduationCap },
  { id: 'kanaele', label: 'Kanäle', icon: Megaphone },
  { id: 'zielgruppen', label: 'Zielgruppen', icon: Target },
  { id: 'budget0', label: '€0-Budget', icon: Flame },
  { id: 'deals', label: 'Deal-Prep', icon: Briefcase },
  { id: 'skalierung', label: 'Skalierung', icon: Rocket },
  { id: 'pipeline', label: 'Pipeline', icon: Calendar },
] as const;

// --- Tab 1: Versicherungs-Partnerschaften ---

const VERSICHERER = [
  { name: 'Allianz Cyber Protect', focus: 'Großkunden, Konzerne', min: '€250K Umsatz', note: 'Marktführer DE, hohe Brand-Awareness' },
  { name: 'Hiscox CyberClear', focus: 'KMU, Freiberufler', min: '€5M Umsatz', note: 'Spezialist für kleine Unternehmen, schnelle Policierung' },
  { name: 'HDI Cyber', focus: 'Mittelstand, Industrie', min: '€10M Umsatz', note: 'Stark im produzierenden Gewerbe' },
  { name: 'Zurich Cyber Insurance', focus: 'Internationaler Mittelstand', min: '€50M Umsatz', note: 'Global Player, gutes Netzwerk' },
  { name: 'Munich Re / ERGO', focus: 'Enterprise, Rückversicherung', min: 'Individuell', note: 'Rückversicherer, beeinflusst Marktkonditionen' },
  { name: 'R+V Cyber-Police', focus: 'Genossenschaftl. Mittelstand', min: '€1M Umsatz', note: 'Volks-/Raiffeisenbank-Netzwerk' },
  { name: 'Gothaer Cyber', focus: 'Handwerk, KMU', min: '€500K Umsatz', note: 'Starkes Maklernetzwerk' },
  { name: 'Markel Cyber', focus: 'Tech-Unternehmen, Startups', min: '€2M Umsatz', note: 'Spezialist, flexible Bedingungen' },
];

const VERSICHERUNG_REVENUE = [
  { stream: 'BBT-Provision', desc: 'sayTEC-Produkte verkaufen & installieren', margin: '10-15%' },
  { stream: 'Versicherungsvermittlung', desc: 'Tippgeber-Provision oder IHK §34d', margin: '5-15% der Jahresprämie' },
  { stream: 'Jährliche Rezertifizierung', desc: 'Security-Audit für Versicherungs-Renewal', margin: '€2-5K/Jahr pro Kunde' },
];

// --- Tab 2: NIS2-Berater-Partnerschaften ---

const NIS2_PARTNER_TYPEN = [
  {
    typ: 'NIS2-Auditoren',
    icon: '🔍',
    problem: 'Erstellen Audit-Reports, aber haben keine technische Lösung für die Findings',
    angebot: 'BBT liefert die Technik: VPSC für Zugriff, Backup für Datensicherung, HCI für Infrastruktur',
    provision: '10-15% auf jeden vermittelten Deal',
    skript: 'Herr/Frau [Name], ich sehe Sie zertifizieren Unternehmen nach NIS2. Die meisten Ihrer Kunden stehen dann vor der Frage: Wer setzt die technischen Maßnahmen um? Genau da kommen wir ins Spiel — souveräne Technologie, Made in Germany, in 1-2 Wochen lieferbar.',
  },
  {
    typ: 'IT-Grundschutz-Berater',
    icon: '📋',
    problem: 'BSI-Grundschutz-Katalog fordert konkrete technische Controls',
    angebot: 'sayTRUST = Zugriffskontrolle (ORP.4), sayFUSE = Backup (CON.3), HCI = Verfügbarkeit (OPS.1)',
    provision: '10-15%',
    skript: 'Sie beraten nach BSI-Grundschutz — wir liefern die Technik, die Ihre Kunden für die Umsetzung brauchen. EAL-4 Plus zertifiziert, 0 CVEs, Made in Germany.',
  },
  {
    typ: 'ISMS-Consultants (ISO 27001)',
    icon: '📜',
    problem: 'ISMS aufbauen ist Papierarbeit — die technische Umsetzung fehlt',
    angebot: 'BBT-Stack deckt A.8 (Asset Mgmt), A.9 (Zugriff), A.12 (Betrieb), A.17 (Continuity) ab',
    provision: '10-20%',
    skript: 'ISO 27001 Annex A fordert technische Controls — wir haben den Stack, der Ihren Kunden bei der Implementierung hilft. Alles aus einer Hand, EAL-4 Plus.',
  },
  {
    typ: 'Datenschutzbeauftragte (DSB)',
    icon: '🛡️',
    problem: 'DSGVO fordert "technische und organisatorische Maßnahmen" — DSBs beraten, implementieren aber nicht',
    angebot: 'VPSC = Art. 32 (Verschlüsselung, Zugriffskontrolle), Backup = Art. 32 (Wiederherstellbarkeit)',
    provision: '10-15%',
    skript: 'Als DSB empfehlen Sie TOM nach Art. 32 DSGVO. Wir liefern die Technologie, die Ihre Empfehlungen konkret umsetzt — souverän, ohne Cloud-Abhängigkeit.',
  },
  {
    typ: 'Management-Berater (NIS2-Compliance)',
    icon: '💼',
    problem: 'Beraten Geschäftsführung zu Haftungsrisiken, brauchen aber Partner für die Technik',
    angebot: 'BBT als "preferred technology partner" — der Berater bleibt im Lead, wir liefern',
    provision: '15-20% (höher weil strategischer Zugang)',
    skript: 'Sie beraten CEOs zu NIS2-Haftung — wenn der Vorstand fragt "und wer macht die Technik?", sind wir die Antwort. Souverän, zertifiziert, schnell.',
  },
];

// --- Tab 3: Vertriebskanäle ---

const VERTRIEBSKANAELE = [
  { name: 'Direktvertrieb (Kaltakquise)', invest: '€0', ttd: '2-8 Wochen', icon: Phone,
    steps: ['Zielgruppe definieren (NIS2-pflichtig, >50 MA)', 'Entscheider recherchieren (GF, IT-Leiter, CISO)', 'Anrufen mit NIS2-Hook', 'Termin für 30-Min Demo', 'Präsentation + Angebot'],
    pros: ['Sofort startbar', 'Volle Kontrolle', 'Direkter Feedback-Loop'], cons: ['Zeitintensiv', 'Hohe Ablehnungsquote', 'Skaliert schlecht'] },
  { name: 'LinkedIn Outreach', invest: '€0', ttd: '2-6 Wochen', icon: Globe,
    steps: ['Profil optimieren (NIS2-Experte)', 'Zielgruppe als Kontakte hinzufügen', '4-Schritt Nachrichtensequenz senden', 'Content posten (1-2x/Woche)', 'Warme Leads telefonisch nachfassen'],
    pros: ['Kostenlos', 'Skalierbar', 'Social Proof'], cons: ['Braucht Konsistenz', 'Algorithmus-abhängig'] },
  { name: 'Referral-Partner (Tippgeber)', invest: '€0', ttd: '4-12 Wochen', icon: Handshake,
    steps: ['Steuerberater/Anwälte/Versicherungsmakler identifizieren', 'Lunch & Learn anbieten', 'Einfaches Tippgeber-Modell erklären (€500-2K pro Lead)', 'Material zur Verfügung stellen', 'Regelmäßig Follow-up'],
    pros: ['Warme Intros', 'Vertrauensvorschuss', 'Passives Lead-Gen'], cons: ['Aufbauzeit', 'Abhängig von Beziehung'] },
  { name: 'IT-Systemhäuser', invest: '€0-5K', ttd: '3-6 Monate', icon: Building2,
    steps: ['Bechtle/Controlware/Cancom Partnerprogramme recherchieren', 'Technischen Ansprechpartner finden', 'Joint Demo anbieten', 'Partnervertrag mit sayTEC klären', 'Gemeinsame Kundenbesuche'],
    pros: ['Großes Kundenportfolio', 'Bestehende Verträge', 'Enterprise-Zugang'], cons: ['Lange Sales-Zyklen', 'Margenabgabe', 'Bürokratie'] },
  { name: 'Distributoren', invest: '€0', ttd: '3-9 Monate', icon: Truck,
    steps: ['Exclusive Networks / ALSO kontaktieren', 'sayTEC-Listing prüfen', 'Gemeinsamen Go-to-Market planen', 'Reseller-Schulungen durchführen', 'Deal Registration nutzen'],
    pros: ['Breite Marktabdeckung', 'Logistik inklusive', 'Reseller-Netzwerk'], cons: ['Niedrigere Margen', 'Weniger Kontrolle'] },
  { name: 'MSP/MSSP', invest: '€0-2K', ttd: '2-4 Monate', icon: Server,
    steps: ['Managed Service Provider in Region identifizieren', 'sayTRUST als Managed Security Service positionieren', 'White-Label oder Co-Branded anbieten', 'Recurring Revenue Modell aufsetzen', 'Gemeinsame Kundenpräsentationen'],
    pros: ['Recurring Revenue', 'Skalierbar', 'Kunden-Stickiness'], cons: ['Technischer Support nötig', 'Revenue Sharing'] },
  { name: 'IHK-Events & Vorträge', invest: '€0', ttd: '4-8 Wochen', icon: Landmark,
    steps: ['Lokale IHK kontaktieren', 'Vortrag anbieten: "NIS2 — Was CEOs jetzt wissen müssen"', 'Teilnehmerliste erhalten', 'Follow-up innerhalb 48h', 'Interessenten in Pipeline überführen'],
    pros: ['Kostenlose Bühne', 'Qualifiziertes Publikum', 'Expertenstatus'], cons: ['Begrenzte Reichweite', 'Unregelmäßig'] },
  { name: 'Webinar-Funnel', invest: '€0-500', ttd: '2-6 Wochen', icon: Play,
    steps: ['Webinar-Thema: "NIS2-Deadline: Technische Umsetzung in 4 Wochen"', 'Landingpage erstellen (Calendly/Zoom)', 'LinkedIn + Email bewerben', 'Live-Demo mit sayTRUST', 'Follow-up: Angebot an Teilnehmer'],
    pros: ['Skalierbar', 'Lead-Qualifizierung', 'Aufzeichnung wiederverwendbar'], cons: ['Braucht Promotion', 'No-Show Rate 40-60%'] },
  { name: 'Messen & Events', invest: '€2-15K', ttd: 'Event-abhängig', icon: MapPin,
    steps: ['Relevante Messen auswählen (it-sa, secIT, Hannover Messe)', 'Standplatz buchen oder als Besucher/Speaker', 'Demo-Setup vorbereiten', 'Kontakte scannen/sammeln', 'Nachbereitung innerhalb 1 Woche'],
    pros: ['Face-to-Face', 'Viele Leads auf einmal', 'Branding'], cons: ['Kosten', 'Vorlaufzeit', 'Nicht jeder Lead qualifiziert'] },
  { name: 'Kulturbrücke (Diaspora)', invest: '€0', ttd: '2-8 Wochen', icon: Globe,
    steps: ['Arabische/türkische/internationale Unternehmer-Netzwerke aktivieren', 'Vertrauensvorsprung durch kulturelle Brücke nutzen', 'Auf Events der Communities präsent sein', 'Word-of-Mouth in enger Community', 'Mehrsprachige Materialien erstellen'],
    pros: ['Hohes Vertrauen', 'Schnelle Entscheidungen', 'Wenig Wettbewerb'], cons: ['Begrenzter Markt', 'Informelle Strukturen'] },
  { name: 'Government/Defense', invest: '€5-20K', ttd: '6-18 Monate', icon: Shield,
    steps: ['AFCEA/BWI Netzwerk nutzen', 'VS-NfD Zulassung vorbereiten', 'Referenzen: Ministerien, Frankfurt (Oder)', 'Ausschreibungen monitoren (TED, bund.de)', 'Konsortium mit Systemintegrator bilden'],
    pros: ['Riesige Deal-Größen', 'Langfristige Verträge', 'Referenzwert'], cons: ['Extrem lange Zyklen', 'Bürokratie', 'Zulassungen nötig'] },
  { name: 'Krankenhaus/Healthcare', invest: '€0-5K', ttd: '3-9 Monate', icon: HeartPulse,
    steps: ['KHZG-Budget Fenster nutzen (€645M noch verfügbar)', 'IT-Leiter direkt ansprechen', 'Referenz: Ransomware-Schutz + Backup', 'GEMFA Konferenz besuchen (Juli 2026)', 'NIS2 §28 Healthcare-Pflicht als Hook'],
    pros: ['Große Budgets (KHZG)', 'Hohe Dringlichkeit', 'Regulatorischer Druck'], cons: ['Beschaffungsprozesse', 'Vergaberecht', 'IT-Abteilungen unterbesetzt'] },
];

// --- Tab 4: Zielgruppen ---

const ZIELGRUPPEN = [
  { name: 'Krankenhäuser', best: true, markt: '~1.900 in DE', deal: '€150-400K', entscheider: 'IT-Leiter, Geschäftsführer',
    painpoints: ['Ransomware-Angst (Lukaskrankenhaus-Effekt)', 'KHZG-Budget muss abgerufen werden', 'NIS2 §28 Healthcare-Pflicht'],
    opener: 'Wie planen Sie, Ihr KHZG-Budget für IT-Sicherheit zu nutzen, bevor es verfällt?',
    wettbewerb: 'Secunet, Sophos, Cisco', produkte: 'VPSC + Backup + HCI Bundle' },
  { name: 'NIS2-pflichtige Unternehmen', best: true, markt: '29.500 Firmen in DE', deal: '€30-200K', entscheider: 'Geschäftsführer (persönlich haftbar!)',
    painpoints: ['CEO haftet persönlich ab März 2026', 'Kein internes Know-how für Umsetzung', 'Frist 6. März 2026 (BSI)'],
    opener: 'Wussten Sie, dass Sie als Geschäftsführer ab März persönlich für NIS2-Verstöße haften?',
    wettbewerb: 'Diverse IT-Dienstleister, aber wenige mit Made-in-Germany Stack', produkte: 'NIS2 Komplett-Stack' },
  { name: 'Steuerberater', best: true, markt: '~95.000 in DE', deal: '€12-21K', entscheider: 'Kanzleiinhaber',
    painpoints: ['Mandantendaten = höchste Sensibilität', 'Homeoffice-Zugriff unsicher', 'Kleine IT-Budgets aber hoher Schutzbedarf'],
    opener: 'Wie greifen Ihre Mitarbeiter im Homeoffice auf DATEV zu — per VPN?',
    wettbewerb: 'DATEV-eigene Lösungen, lokale IT-Dienstleister', produkte: '"Kanzlei Sicher" Bundle (VPSC)' },
  { name: 'Anwaltskanzleien', best: false, markt: '~65.000 in DE', deal: '€12-30K', entscheider: 'Managing Partner, IT-Verantwortlicher',
    painpoints: ['Mandantengeheimnis (§203 StGB)', 'Kanzlei-Standort + Homeoffice', 'Vertrauliche Dokumente'],
    opener: 'Wie stellen Sie sicher, dass Mandantendaten bei Remote-Zugriff geschützt sind — auch nach §203 StGB?',
    wettbewerb: 'Lokale IT, Microsoft 365', produkte: 'VPSC (ähnlich Kanzlei-Bundle)' },
  { name: 'Stadtwerke & Versorger', best: false, markt: '~900 Stadtwerke', deal: '€80-300K', entscheider: 'Geschäftsführer, IT-Leiter',
    painpoints: ['KRITIS-Einstufung', 'NIS2-Pflicht', 'Veraltete OT-Infrastruktur'],
    opener: 'Als KRITIS-Betreiber unterliegen Sie NIS2 — wie sieht Ihr Plan für die technische Umsetzung aus?',
    wettbewerb: 'Siemens, Schneider Electric, Claroty', produkte: 'VPSC + HCI + Backup (KRITIS-Stack)' },
  { name: 'Maschinenbau', best: false, markt: '~6.600 Firmen (VDMA)', deal: '€50-200K', entscheider: 'IT-Leiter, Werkleiter',
    painpoints: ['IP-Schutz (Konstruktionsdaten)', 'OT/IT-Konvergenz', 'Fernwartung unsicher'],
    opener: 'Wie schützen Sie Ihre Konstruktionsdaten bei Fernzugriff — auch vor Supply-Chain-Angriffen?',
    wettbewerb: 'Fortinet, Palo Alto, Cisco', produkte: 'VPSC für Fernwartung + Backup' },
  { name: 'Logistik & Transport', best: false, markt: '~60.000 Firmen', deal: '€20-100K', entscheider: 'IT-Leiter, Operations',
    painpoints: ['Echtzeit-Systeme dürfen nicht ausfallen', 'Viele Standorte/Niederlassungen', 'NIS2 für größere Speditionen'],
    opener: 'Was passiert mit Ihrem Betrieb, wenn Ihre IT 24 Stunden ausfällt — wie bei Maersk 2017?',
    wettbewerb: 'Standardlösungen, Cloud-Backup', produkte: 'VPSC + Backup' },
  { name: 'Lebensmittelindustrie', best: false, markt: '~6.000 Firmen >50 MA', deal: '€30-150K', entscheider: 'Geschäftsführer, IT-Leiter',
    painpoints: ['NIS2 "wichtige Einrichtungen"', 'Produktionsausfälle = verderbliche Ware', 'Geringe IT-Reife'],
    opener: 'Lebensmittelproduktion ist jetzt NIS2-pflichtig — wie sichern Sie Ihre Produktions-IT ab?',
    wettbewerb: 'Wenige spezialisierte Anbieter', produkte: 'NIS2 Starter bis Komplett' },
  { name: 'Kommunen & Verwaltung', best: false, markt: '~11.000 Gemeinden', deal: '€20-150K', entscheider: 'IT-Amt, Bürgermeister, Kämmerer',
    painpoints: ['Anhalt-Bitterfeld-Effekt', 'Vergaberecht & lange Zyklen', 'Homeoffice für Verwaltung'],
    opener: 'Nach Anhalt-Bitterfeld — wie schützt Ihre Kommune sich vor Ransomware?',
    wettbewerb: 'Dataport, AKDB, kommunale IT-Dienstleister', produkte: 'VPSC + Backup' },
  { name: 'Arztpraxen & MVZ', best: false, markt: '~100.000 Praxen', deal: '€5-15K', entscheider: 'Praxisinhaber',
    painpoints: ['Patientendaten (§203 StGB)', 'Digitalisierung der Praxis', 'Kleine Budgets'],
    opener: 'Wie sichern Sie Patientendaten, wenn ein Mitarbeiter von zuhause auf die Praxis-IT zugreift?',
    wettbewerb: 'CGM, medatixx IT-Dienstleister', produkte: 'VPSC (klein, 5-20 User)' },
  { name: 'Finanzsektor (DORA)', best: false, markt: '~2.000 Institute', deal: '€100-500K', entscheider: 'CISO, Vorstand',
    painpoints: ['DORA-Verordnung (Jan 2025)', 'BaFin-Prüfung', 'Drittanbieter-Risiko'],
    opener: 'DORA fordert digitale Resilienz — wie stellen Sie sicher, dass Ihre Zugriffslösung keine Drittanbieter-Abhängigkeit hat?',
    wettbewerb: 'Etablierte Banken-IT (Finastra, FIS)', produkte: 'VPSC + HCI (on-prem, kein Cloud-Risiko)' },
  { name: 'Bildung & Schulen', best: false, markt: '~40.000 Schulen + Unis', deal: '€10-50K', entscheider: 'Schulträger, IT-Verantwortlicher',
    painpoints: ['DigitalPakt-Budget', 'Datenschutz (Schülerdaten)', 'Remote Learning'],
    opener: 'Nutzen Sie noch VPN für den Fernzugriff auf Schulnetz-Ressourcen?',
    wettbewerb: 'Microsoft Education, Google Workspace', produkte: 'VPSC (Education-Lizenz)' },
  { name: 'VMware-Flüchtlinge', best: false, markt: 'Tausende nach Broadcom-Übernahme', deal: '€50-500K', entscheider: 'IT-Leiter, CTO',
    painpoints: ['Broadcom-Preiserhöhungen 300-500%', 'Lizenzunsicherheit', 'Migration dringend'],
    opener: 'Nach Broadcoms Preiserhöhung — haben Sie schon eine Alternative zu VMware evaluiert?',
    wettbewerb: 'Nutanix, Proxmox, OpenStack', produkte: 'sayFUSE HCI (VMware-Replacement)' },
  { name: 'Diaspora-Unternehmer', best: false, markt: '~150.000 arabische/türkische Unternehmen in DE', deal: '€12-80K', entscheider: 'Inhaber (oft = GF)',
    painpoints: ['Vertrauen in Community', 'Oft vernachlässigte IT-Security', 'Kulturelle Brücke fehlt'],
    opener: 'Persönliche Empfehlung aus der Community + NIS2-Relevanz',
    wettbewerb: 'Lokale IT-Dienstleister', produkte: 'VPSC + Backup (Standardpakete)' },
];

// --- Tab 5: €0-Budget Strategien ---

const BUDGET0_STRATEGIEN = [
  { name: 'Kaltakquise-Skript', icon: Phone,
    desc: 'Copy-paste fertiges Telefonskript für NIS2-Akquise',
    skript: `"Guten Tag [Name], hier ist [Ihr Name] von Bunkerbauer Technologies. Ich rufe an, weil ab März 2026 die NIS2-Richtlinie greift und Geschäftsführer persönlich haften. Wir helfen Unternehmen wie Ihrem, die technischen Anforderungen in 1-2 Wochen umzusetzen — mit zertifizierter Technologie Made in Germany. Hätten Sie nächste Woche 30 Minuten für eine kurze Demo?"` },
  { name: 'LinkedIn 4-Schritt Sequenz', icon: Globe,
    desc: 'Nachrichtensequenz über 14 Tage',
    skript: `Tag 1 (Connect): "Hallo [Name], als [Titel] bei [Firma] beschäftigen Sie sich sicher mit IT-Sicherheit. Ich teile regelmäßig Insights zu NIS2 — freue mich auf den Austausch!"
Tag 3 (Value): "[Name], wussten Sie: 29.500 Unternehmen in DE sind NIS2-pflichtig — und CEOs haften persönlich. Hier ein kurzer Überblick: [Link zu Content]"
Tag 7 (Case Study): "Ein Kunde hat am Tag der Installation €1,9M gespart. Soll ich Ihnen zeigen, wie? 30 Min reichen."
Tag 14 (Direct Ask): "[Name], ich kann Ihnen in einem kurzen Call zeigen, wie Sie NIS2-Compliance in 1-2 Wochen umsetzen. Wann passt es Ihnen?"` },
  { name: 'Referral-Netzwerk aktivieren', icon: Handshake,
    desc: 'Bestehende Kontakte als Tippgeber gewinnen',
    skript: `"[Name], du kennst doch viele Unternehmer in der Region. Wenn du jemanden kennst, der sich mit IT-Sicherheit oder NIS2 beschäftigt — stell uns vor. Für jeden erfolgreichen Deal gibt es €500-2.000 Tippgeber-Prämie."` },
  { name: 'Webinar "NIS2 für Geschäftsführer"', icon: Play,
    desc: '45-Min Live-Webinar mit Demo',
    skript: `Agenda: (1) NIS2-Pflichten in 5 Min erklärt (2) CEO-Haftung — was Sie riskieren (3) Live-Demo: IT-Sicherheit in 1 Tag umsetzen (4) Q&A. CTA: "Buchen Sie Ihre kostenlose NIS2-Erstberatung."` },
  { name: 'IHK-Vorträge', icon: Landmark,
    desc: 'Kostenlose Bühne bei lokaler IHK',
    skript: `Vortragsthema: "NIS2 — Was Geschäftsführer JETZT wissen müssen" — 30-45 Min Vortrag, Q&A, anschließend 1:1 Gespräche. IHK stellt Raum + Teilnehmerliste.` },
  { name: 'NIS2-Einseiter (Content)', icon: FileText,
    desc: 'PDF-Einseiter als Lead-Magnet',
    skript: `Inhalt: (1) Was ist NIS2? (2) Bin ich betroffen? (Schnellcheck) (3) Was muss ich tun? (4) Wie Bunkerbauer hilft. Verbreitung: LinkedIn, Email-Signatur, bei Events auslegen.` },
  { name: 'Partner Lunch & Learn', icon: Utensils,
    desc: 'Mittagessen mit potenziellen Partnern',
    skript: `Einladung an Steuerberater/Anwälte/Versicherungsmakler: "Darf ich Sie zum Mittagessen einladen? Ich möchte Ihnen zeigen, wie Sie Ihren Mandanten einen echten Mehrwert bieten können — und dabei mitverdienen."` },
  { name: 'Bestandskunden-Expansion', icon: TrendingUp,
    desc: 'Upsell bei bestehenden sayTEC-Kunden',
    skript: `"Sie nutzen bereits sayTRUST für [X User]. Durch NIS2 empfehlen wir, auch Backup und Infrastruktur abzusichern. Ich kann Ihnen ein Bundle-Angebot machen, das 15% günstiger ist als Einzelkomponenten."` },
  { name: 'Presse/PR (Wirtschaftszeitung)', icon: BookOpen,
    desc: 'Lokale Wirtschaftspresse als kostenlose Reichweite',
    skript: `Pressemitteilung: "Berliner IT-Sicherheitsfirma warnt: 29.500 Unternehmen in Deutschland nicht bereit für NIS2-Deadline" — mit Zitat von Mohammad Kaddurah. An: lokale IHK-Zeitung, regionale Wirtschaftspresse.` },
  { name: 'Video-Marketing (AI-Tools)', icon: Play,
    desc: '60-Sekunden Kurzvideos mit AI erstellen',
    skript: `Format: "Wussten Sie, dass...?" — NIS2-Fakt + BBT-Lösung in 60 Sekunden. Tools: HeyGen/Synthesia für AI-Avatar, Canva für Grafiken. Posten: LinkedIn 2x/Woche + YouTube Shorts.` },
];

// --- Tab 6: Deal-Vorbereitung ---

const DEAL_TYPEN = [
  { name: 'Türöffner', range: '€5-20K', icon: KeyRound, bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-400',
    desc: 'VPSC für 10-50 User — schneller Abschluss, Fuß in der Tür',
    inhalt: ['sayTRUST VPSC (10-50 Lizenzen)', 'Token oder Software-Client', '1 Tag Installation + Schulung'],
    zielgruppe: 'Kleine Kanzleien, Arztpraxen, Startups', cycle: '1-4 Wochen' },
  { name: 'KMU Standard', range: '€20-80K', icon: Building2, bg: 'bg-blue-500/5', border: 'border-blue-500/20', text: 'text-blue-400',
    desc: 'VPSC + Backup — solides Paket für kleine Mittelständler',
    inhalt: ['sayTRUST VPSC (50-200 User)', 'sayFUSE Backup', 'Installation + Schulung + 1 Jahr Support'],
    zielgruppe: 'KMU 50-250 Mitarbeiter', cycle: '4-8 Wochen' },
  { name: 'NIS2 Mittelstand', range: '€80-200K', icon: ShieldCheck, bg: 'bg-purple-500/5', border: 'border-purple-500/20', text: 'text-purple-400',
    desc: 'Kompletter NIS2-Compliance-Stack',
    inhalt: ['sayTRUST VPSC', 'sayFUSE Backup', 'sayFUSE HCI (optional)', 'NIS2 Compliance-Dokumentation', 'Jährliche Rezertifizierung'],
    zielgruppe: 'Mittelstand 250-1.000 MA, NIS2-pflichtig', cycle: '6-12 Wochen' },
  { name: 'Krankenhaus-Paket', range: '€150-400K', icon: HeartPulse, bg: 'bg-rose-500/5', border: 'border-rose-500/20', text: 'text-rose-400',
    desc: 'Speziell für Healthcare mit KHZG-Budget',
    inhalt: ['sayTRUST VPSC (500+ User)', 'sayFUSE Backup (große Datenmengen)', 'sayFUSE HCI', 'KHZG-konforme Dokumentation', '24/7 Support'],
    zielgruppe: 'Krankenhäuser, Klinikverbünde', cycle: '3-6 Monate' },
  { name: 'Enterprise/KRITIS', range: '€200K-1M+', icon: Factory, bg: 'bg-amber-500/5', border: 'border-amber-500/20', text: 'text-amber-400',
    desc: 'Maximale Konfiguration für kritische Infrastruktur',
    inhalt: ['Voller sayTEC Stack', 'HCI Cluster (multi-site)', 'Geo-Replikation', 'VS-NfD Konfiguration', 'Dedizierter Support'],
    zielgruppe: 'KRITIS-Betreiber, Behörden, Defense', cycle: '6-18 Monate' },
];

const BUNDLE_PAKETE = [
  { name: '"Kanzlei Sicher"', range: '€12-21K', inhalt: 'VPSC 10-30 User + Token + Installation', zielgruppe: 'Steuerberater, Anwälte', highlight: 'Schnellster Deal-Typ' },
  { name: '"NIS2 Starter"', range: '€30-80K', inhalt: 'VPSC 50-200 User + Backup + NIS2-Doku', zielgruppe: 'KMU mit NIS2-Pflicht', highlight: 'Brot-und-Butter Deal' },
  { name: '"NIS2 Komplett"', range: '€80-200K', inhalt: 'VPSC + Backup + HCI + Compliance-Paket', zielgruppe: 'Mittelstand 250+ MA', highlight: 'Höchste Provision' },
  { name: '"Krankenhaus-Rettung"', range: '€150-400K', inhalt: 'Full Stack + KHZG-Doku + 24/7 Support', zielgruppe: 'Krankenhäuser', highlight: 'KHZG-Budget nutzen!' },
  { name: '"VMware Flucht"', range: '€50-500K', inhalt: 'sayFUSE HCI als VMware-Replacement', zielgruppe: 'Broadcom-Geschädigte', highlight: 'Akuter Bedarf' },
  { name: '"KRITIS Festung"', range: '€200K-1M+', inhalt: 'Full Stack + Geo-Rep. + VS-NfD', zielgruppe: 'KRITIS, Verteidigung', highlight: 'Größte Deals' },
];

// --- Tab 7: Skalierungs-Playbook ---

const SKALIERUNGS_PHASEN = [
  { phase: '1. Fundament', zeit: 'Woche 1-4', revenue: '€0', icon: Layers, bg: 'bg-slate-500/5', border: 'border-slate-500/20', text: 'text-slate-400',
    tasks: ['Zielgruppen-Liste erstellen (Top 100 Firmen)', 'LinkedIn-Profil optimieren', 'Kaltakquise-Skripte vorbereiten', 'Erste 50 Anrufe/Woche', '5-10 LinkedIn-Connects/Tag', 'IHK-Vortrag anfragen'] },
  { phase: '2. Erste Deals', zeit: 'Monat 2-3', revenue: '€2-5K/Monat', icon: Zap, bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-400',
    tasks: ['Kanzlei-Sicher Deals abschließen (3-5 Stück)', 'Referral-Partner aktivieren (5 Tippgeber)', 'Erstes Webinar durchführen', 'Partner-Gespräche mit 2 Systemhäusern', 'LinkedIn Content regelmäßig posten'] },
  { phase: '3. Skalierung', zeit: 'Monat 4-6', revenue: '€5-15K/Monat', icon: TrendingUp, bg: 'bg-blue-500/5', border: 'border-blue-500/20', text: 'text-blue-400',
    tasks: ['NIS2-Starter Deals (2-3/Monat)', 'Krankenhaus-Pipeline aufbauen', 'Versicherungs-Partnerschaft starten', 'Messe-Auftritte (secIT, Hannover Messe)', 'Team: Erste Vertriebsunterstützung'] },
  { phase: '4. System', zeit: 'Monat 7-12', revenue: '€10-25K/Monat', icon: Factory, bg: 'bg-purple-500/5', border: 'border-purple-500/20', text: 'text-purple-400',
    tasks: ['NIS2-Komplett Deals (1-2/Quartal)', 'Krankenhaus-Deal closen', 'Festes Partner-Netzwerk (10+ Tippgeber)', 'Webinar-Funnel automatisiert', 'Zweiter Vertriebsmitarbeiter'] },
  { phase: '5. Wachstum', zeit: 'Jahr 2', revenue: '€20-40K/Monat', icon: Rocket, bg: 'bg-amber-500/5', border: 'border-amber-500/20', text: 'text-amber-400',
    tasks: ['Enterprise/KRITIS Deals', 'Regional expandieren', 'Eigenes MSP-Angebot aufbauen', 'Revenue: €500K+/Jahr Ziel', 'Team: 3-5 Vertriebsmitarbeiter'] },
];

const KPI_TABELLE = [
  { label: 'Anrufe/Woche', w1: '50', m1: '60', m3: '40', m6: '30', m12: '20' },
  { label: 'LinkedIn-Connects/Woche', w1: '50', m1: '30', m3: '20', m6: '15', m12: '10' },
  { label: 'Termine/Woche', w1: '2', m1: '4', m3: '6', m6: '8', m12: '10' },
  { label: 'Präsentationen/Monat', w1: '2', m1: '6', m3: '10', m6: '12', m12: '15' },
  { label: 'Offene Angebote', w1: '1', m1: '5', m3: '10', m6: '15', m12: '20' },
  { label: 'Abschlüsse/Monat', w1: '0', m1: '1', m3: '2', m6: '3', m12: '5' },
  { label: 'Revenue/Monat', w1: '€0', m1: '€2K', m3: '€8K', m6: '€15K', m12: '€25K' },
];

// --- Tab 8: Pipeline & Events ---

const AKTIVE_PIPELINE = [
  { name: 'Capgemini', status: 'Lead', kontakt: 'Jeff Augustin (WEF Davos) → Henrik Ljungström', next: 'Intro-Call arrangieren', potential: '€100K+' },
  { name: 'Sonic Suisse / Dr. Risch', status: 'Qualifiziert', kontakt: '~2.500 MA, Zoom mit Yakup Saygin', next: 'Zoom-Termin fixieren', potential: '€80-200K' },
  { name: 'VDMA (3.500+ Firmen)', status: 'Partner', kontakt: 'Maximilian Moser', next: 'Hannover Messe Standplatz nutzen', potential: 'Multiplikator' },
  { name: 'AFCEA Bonn', status: 'Netzwerk', kontakt: 'Verteidigung/Kommunikation', next: 'Nächstes Event besuchen', potential: 'Defense-Zugang' },
  { name: 'ENFORCE TAC Kontakte', status: '140 Leads', kontakt: 'Petrus Lahm', next: 'Systematisch nachfassen', potential: '€500K+ gesamt' },
];

const EVENTS_2026 = [
  { name: 'secIT Hannover', datum: 'März 2026', typ: 'Messe', prio: 'Hoch', action: 'Besuchen, Networking, Leads sammeln' },
  { name: 'Hannover Messe', datum: 'April 2026', typ: 'Messe', prio: 'Sehr Hoch', action: 'VDMA-Stand nutzen! Maschinenbau-Kontakte' },
  { name: 'GEMFA Konferenz', datum: 'Juli 2026', typ: 'Healthcare', prio: 'Hoch', action: 'Krankenhaus IT-Leiter treffen' },
  { name: 'it-sa Nürnberg', datum: 'Oktober 2026', typ: 'IT-Security', prio: 'Sehr Hoch', action: 'Größte IT-Security Messe in DE, eigener Stand?' },
];

// --- VertriebSection Component ---

function VertriebSection() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('versicherung');

  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-bg-hover transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600">
            <DollarSign size={20} className="text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold">Vertrieb — Sales Bible</h3>
            <p className="text-[10px] text-text-muted">8 Bereiche: Versicherung, NIS2-Berater, Kanäle, Zielgruppen, Strategien, Deals, Skalierung, Pipeline</p>
          </div>
        </div>
        {open ? <ChevronUp size={18} className="text-text-muted" /> : <ChevronDown size={18} className="text-text-muted" />}
      </button>

      {open && (
        <div className="border-t border-border">
          {/* Tab Navigation */}
          <div className="overflow-x-auto border-b border-border">
            <div className="flex min-w-max">
              {VERTRIEB_TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors',
                      activeTab === tab.id
                        ? 'bg-rose-500/20 text-rose-400 border-b-2 border-rose-400'
                        : 'text-text-muted hover:text-text hover:bg-bg-hover'
                    )}
                  >
                    <Icon size={14} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-5">
            {activeTab === 'versicherung' && <VersicherungTab />}
            {activeTab === 'nis2-berater' && <NIS2BeraterTab />}
            {activeTab === 'kanaele' && <KanaeleTab />}
            {activeTab === 'zielgruppen' && <ZielgruppenTab />}
            {activeTab === 'budget0' && <Budget0Tab />}
            {activeTab === 'deals' && <DealsTab />}
            {activeTab === 'skalierung' && <SkalierungTab />}
            {activeTab === 'pipeline' && <PipelineTab />}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Tab 1: Versicherung ---

function VersicherungTab() {
  const [openCard, setOpenCard] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div className="rounded-lg bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 p-4">
        <h4 className="text-sm font-bold mb-1 flex items-center gap-2"><ShieldCheck size={16} className="text-rose-400" /> Rundum-Dienstleistung: IT + Versicherung</h4>
        <p className="text-xs text-text-muted">IT übernehmen → sicher machen → versichern lassen. Drei Revenue-Streams aus einem Kunden.</p>
      </div>

      {/* 4-Schritte Flow */}
      <div>
        <h4 className="text-xs font-bold mb-3 text-rose-400">4-Schritte Ablauf</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { step: '1', title: 'Assessment', desc: 'IT-Security Ist-Zustand prüfen, NIS2-Gaps identifizieren' },
            { step: '2', title: 'Implementierung', desc: 'VPSC + Backup installieren (1-2 Wochen Lieferung, 1 Tag Install)' },
            { step: '3', title: 'Versicherungs-Readiness', desc: 'Zertifikat ausstellen: "NIS2-konform, Stand der Technik erfüllt"' },
            { step: '4', title: 'Cyber-Police', desc: 'Versicherungsmakler einschalten → Prämienreduktion 10-25%' },
          ].map((s) => (
            <div key={s.step} className="rounded-lg bg-bg-hover border border-border p-3 text-center">
              <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 font-black text-sm flex items-center justify-center mx-auto mb-2">{s.step}</div>
              <div className="text-xs font-bold mb-1">{s.title}</div>
              <div className="text-[10px] text-text-muted">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Streams */}
      <div>
        <h4 className="text-xs font-bold mb-2 text-rose-400">3 Revenue-Streams</h4>
        <div className="grid md:grid-cols-3 gap-2">
          {VERSICHERUNG_REVENUE.map((r) => (
            <div key={r.stream} className="rounded-lg bg-bg-hover border border-border p-3">
              <div className="text-xs font-bold mb-1">{r.stream}</div>
              <div className="text-[10px] text-text-muted mb-1">{r.desc}</div>
              <div className="text-xs font-bold text-rose-400">{r.margin}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Versicherer-Profile */}
      <div>
        <h4 className="text-xs font-bold mb-2 text-rose-400">8 Versicherer-Profile</h4>
        <div className="space-y-2">
          {VERSICHERER.map((v, i) => (
            <div key={v.name} className="rounded-lg bg-bg-hover border border-border overflow-hidden">
              <button onClick={() => setOpenCard(openCard === i ? null : i)} className="w-full flex items-center justify-between p-3 text-left hover:bg-bg-card transition-colors">
                <div>
                  <span className="text-xs font-bold">{v.name}</span>
                  <span className="text-[10px] text-text-muted ml-2">{v.focus}</span>
                </div>
                {openCard === i ? <ChevronUp size={14} className="text-text-muted" /> : <ChevronDown size={14} className="text-text-muted" />}
              </button>
              {openCard === i && (
                <div className="px-3 pb-3 border-t border-border pt-2 text-[10px] text-text-muted space-y-1">
                  <div><span className="font-bold text-text">Min. Umsatz:</span> {v.min}</div>
                  <div><span className="font-bold text-text">Note:</span> {v.note}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ansprache-Skript */}
      <div className="rounded-lg bg-rose-500/5 border border-rose-500/20 p-4">
        <h4 className="text-xs font-bold mb-2 flex items-center gap-2"><MessageSquare size={14} className="text-rose-400" /> Ansprache-Skript: Versicherungsmakler</h4>
        <div className="text-[11px] text-text-muted italic leading-relaxed">
          "Herr/Frau [Name], ich kontaktiere Sie, weil viele Ihrer Firmenkunden ab März 2026 NIS2-pflichtig sind.
          Wir machen die IT Ihrer Kunden nachweislich sicher — und Sie können dann die Cyber-Police platzieren.
          Das Ergebnis: Ihr Kunde ist geschützt, Sie verdienen an der Police, und wir an der Technik.
          Können wir 20 Minuten telefonieren, wie das konkret aussieht?"
        </div>
      </div>
    </div>
  );
}

// --- Tab 2: NIS2-Berater ---

function NIS2BeraterTab() {
  const [openCard, setOpenCard] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div className="rounded-lg bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 p-4">
        <h4 className="text-sm font-bold mb-1 flex items-center gap-2"><GraduationCap size={16} className="text-rose-400" /> NIS2-Berater brauchen Technik-Partner</h4>
        <p className="text-xs text-text-muted">Deren Problem: Sie beraten, aber brauchen technische Lösung → BBT liefert die Technik. Revenue-Sharing: Berater bringt Kunden, BBT liefert + installiert.</p>
      </div>

      <div className="space-y-3">
        {NIS2_PARTNER_TYPEN.map((p, i) => (
          <div key={p.typ} className="rounded-lg bg-bg-hover border border-border overflow-hidden">
            <button onClick={() => setOpenCard(openCard === i ? null : i)} className="w-full flex items-center justify-between p-3 text-left hover:bg-bg-card transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-lg">{p.icon}</span>
                <div>
                  <div className="text-xs font-bold">{p.typ}</div>
                  <div className="text-[10px] text-text-muted">Provision: {p.provision}</div>
                </div>
              </div>
              {openCard === i ? <ChevronUp size={14} className="text-text-muted" /> : <ChevronDown size={14} className="text-text-muted" />}
            </button>
            {openCard === i && (
              <div className="px-3 pb-3 border-t border-border pt-2 space-y-2">
                <div className="text-[10px]"><span className="font-bold text-rose-400">Deren Problem:</span> <span className="text-text-muted">{p.problem}</span></div>
                <div className="text-[10px]"><span className="font-bold text-emerald-400">Unser Angebot:</span> <span className="text-text-muted">{p.angebot}</span></div>
                <div className="rounded bg-rose-500/5 border border-rose-500/20 p-2">
                  <div className="text-[10px] font-bold text-rose-400 mb-1">Ansprache-Skript:</div>
                  <div className="text-[10px] text-text-muted italic">{p.skript}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Tab 3: Vertriebskanäle ---

function KanaeleTab() {
  const [openCard, setOpenCard] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      <div className="text-xs text-text-muted mb-2">12 Kanäle — jeweils mit Investment, Time-to-Deal & Step-by-Step Anleitung</div>
      {VERTRIEBSKANAELE.map((k, i) => {
        const Icon = k.icon;
        return (
          <div key={k.name} className="rounded-lg bg-bg-hover border border-border overflow-hidden">
            <button onClick={() => setOpenCard(openCard === i ? null : i)} className="w-full flex items-center justify-between p-3 text-left hover:bg-bg-card transition-colors">
              <div className="flex items-center gap-2">
                <Icon size={16} className="text-rose-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold">{i + 1}. {k.name}</div>
                  <div className="text-[10px] text-text-muted">Invest: {k.invest} · Time-to-Deal: {k.ttd}</div>
                </div>
              </div>
              {openCard === i ? <ChevronUp size={14} className="text-text-muted shrink-0" /> : <ChevronDown size={14} className="text-text-muted shrink-0" />}
            </button>
            {openCard === i && (
              <div className="px-3 pb-3 border-t border-border pt-2 space-y-2">
                <div>
                  <div className="text-[10px] font-bold text-rose-400 mb-1">Step-by-Step:</div>
                  <ol className="text-[10px] text-text-muted space-y-0.5 list-decimal list-inside">
                    {k.steps.map((s, j) => <li key={j}>{s}</li>)}
                  </ol>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[10px] font-bold text-emerald-400 mb-0.5">Pros:</div>
                    <ul className="text-[10px] text-text-muted space-y-0.5">
                      {k.pros.map((p, j) => <li key={j} className="flex items-start gap-1"><CheckCircle2 size={10} className="text-emerald-400 shrink-0 mt-0.5" />{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-amber-400 mb-0.5">Cons:</div>
                    <ul className="text-[10px] text-text-muted space-y-0.5">
                      {k.cons.map((c, j) => <li key={j} className="flex items-start gap-1"><AlertTriangle size={10} className="text-amber-400 shrink-0 mt-0.5" />{c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// --- Tab 4: Zielgruppen ---

function ZielgruppenTab() {
  const [openCard, setOpenCard] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      <div className="text-xs text-text-muted mb-2">14 Zielgruppen — Top 3 als "BEST" markiert</div>
      {ZIELGRUPPEN.map((z, i) => (
        <div key={z.name} className={cn('rounded-lg border overflow-hidden', z.best ? 'bg-rose-500/5 border-rose-500/30' : 'bg-bg-hover border-border')}>
          <button onClick={() => setOpenCard(openCard === i ? null : i)} className="w-full flex items-center justify-between p-3 text-left hover:bg-bg-card/50 transition-colors">
            <div className="flex items-center gap-2">
              <Target size={14} className={z.best ? 'text-rose-400' : 'text-text-muted'} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">{z.name}</span>
                  {z.best && <span className="text-[9px] font-bold bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded-full">BEST</span>}
                </div>
                <div className="text-[10px] text-text-muted">Markt: {z.markt} · Deal: {z.deal}</div>
              </div>
            </div>
            {openCard === i ? <ChevronUp size={14} className="text-text-muted shrink-0" /> : <ChevronDown size={14} className="text-text-muted shrink-0" />}
          </button>
          {openCard === i && (
            <div className="px-3 pb-3 border-t border-border pt-2 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div><span className="font-bold text-text">Entscheider:</span> <span className="text-text-muted">{z.entscheider}</span></div>
                <div><span className="font-bold text-text">Produkte:</span> <span className="text-text-muted">{z.produkte}</span></div>
                <div><span className="font-bold text-text">Wettbewerb:</span> <span className="text-text-muted">{z.wettbewerb}</span></div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-rose-400 mb-0.5">Painpoints:</div>
                <ul className="text-[10px] text-text-muted space-y-0.5">
                  {z.painpoints.map((p, j) => <li key={j} className="flex items-start gap-1"><AlertTriangle size={10} className="text-amber-400 shrink-0 mt-0.5" />{p}</li>)}
                </ul>
              </div>
              <div className="rounded bg-rose-500/5 border border-rose-500/20 p-2">
                <div className="text-[10px] font-bold text-rose-400 mb-0.5">Öffnungssatz:</div>
                <div className="text-[10px] text-text-muted italic">{z.opener}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// --- Tab 5: €0-Budget ---

function Budget0Tab() {
  const [openCard, setOpenCard] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 p-4 mb-2">
        <h4 className="text-sm font-bold mb-1 flex items-center gap-2"><Flame size={16} className="text-rose-400" /> €0-Budget: Sofort startbare Strategien</h4>
        <p className="text-xs text-text-muted">10 Strategien mit fertigen Skripten — kein Marketing-Budget nötig.</p>
      </div>
      {BUDGET0_STRATEGIEN.map((s, i) => {
        const Icon = s.icon;
        return (
          <div key={s.name} className="rounded-lg bg-bg-hover border border-border overflow-hidden">
            <button onClick={() => setOpenCard(openCard === i ? null : i)} className="w-full flex items-center justify-between p-3 text-left hover:bg-bg-card transition-colors">
              <div className="flex items-center gap-2">
                <Icon size={14} className="text-rose-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold">{i + 1}. {s.name}</div>
                  <div className="text-[10px] text-text-muted">{s.desc}</div>
                </div>
              </div>
              {openCard === i ? <ChevronUp size={14} className="text-text-muted shrink-0" /> : <ChevronDown size={14} className="text-text-muted shrink-0" />}
            </button>
            {openCard === i && (
              <div className="px-3 pb-3 border-t border-border pt-2">
                <div className="rounded bg-rose-500/5 border border-rose-500/20 p-3">
                  <div className="text-[10px] font-bold text-rose-400 mb-1">Skript / Anleitung:</div>
                  <div className="text-[10px] text-text-muted whitespace-pre-line leading-relaxed">{s.skript}</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// --- Tab 6: Deal-Vorbereitung ---

function DealsTab() {
  return (
    <div className="space-y-5">
      {/* Deal-Typen */}
      <div>
        <h4 className="text-xs font-bold mb-3 text-rose-400">5 Deal-Typen (klein → groß)</h4>
        <div className="space-y-2">
          {DEAL_TYPEN.map((d) => {
            const Icon = d.icon;
            return (
              <div key={d.name} className={`rounded-lg ${d.bg} border ${d.border} p-3`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className={d.text} />
                    <span className="text-xs font-bold">{d.name}</span>
                  </div>
                  <span className="text-xs font-black text-rose-400">{d.range}</span>
                </div>
                <p className="text-[10px] text-text-muted mb-2">{d.desc}</p>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span className="font-bold text-text">Inhalt:</span>
                    <ul className="text-text-muted mt-0.5 space-y-0.5">
                      {d.inhalt.map((item, j) => <li key={j} className="flex items-start gap-1"><CheckCircle2 size={9} className="text-emerald-400 shrink-0 mt-0.5" />{item}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div><span className="font-bold text-text">Zielgruppe:</span> <span className="text-text-muted">{d.zielgruppe}</span></div>
                    <div className="mt-1"><span className="font-bold text-text">Sales Cycle:</span> <span className="text-text-muted">{d.cycle}</span></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bundle-Pakete */}
      <div>
        <h4 className="text-xs font-bold mb-3 text-rose-400">6 Bundle-Pakete</h4>
        <div className="grid md:grid-cols-2 gap-2">
          {BUNDLE_PAKETE.map((b) => (
            <div key={b.name} className="rounded-lg bg-bg-hover border border-border p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold">{b.name}</span>
                <span className="text-xs font-black text-rose-400">{b.range}</span>
              </div>
              <div className="text-[10px] text-text-muted mb-1">{b.inhalt}</div>
              <div className="text-[10px] text-text-muted">Zielgruppe: {b.zielgruppe}</div>
              <div className="text-[9px] font-bold text-amber-400 mt-1">{b.highlight}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Land-and-Expand */}
      <div className="rounded-lg bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 p-4">
        <h4 className="text-xs font-bold mb-2 flex items-center gap-2"><TrendingUp size={14} className="text-rose-400" /> Land-and-Expand Strategie</h4>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded font-bold">1. Backup first</span>
          <ArrowRight size={12} className="text-text-muted" />
          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded font-bold">2. VPSC upsell</span>
          <ArrowRight size={12} className="text-text-muted" />
          <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded font-bold">3. HCI full stack</span>
        </div>
        <p className="text-[10px] text-text-muted mt-2">Einstieg mit kleinem Produkt (Backup €5K) → Vertrauen aufbauen → VPSC upsell (€20-80K) → HCI für vollen Stack (€150K+)</p>
      </div>
    </div>
  );
}

// --- Tab 7: Skalierung ---

function SkalierungTab() {
  return (
    <div className="space-y-5">
      {/* Phasen-Timeline */}
      <div>
        <h4 className="text-xs font-bold mb-3 text-rose-400">5 Phasen zum €500K+/Jahr</h4>
        <div className="space-y-2">
          {SKALIERUNGS_PHASEN.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.phase} className={`rounded-lg ${p.bg} border ${p.border} p-3`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className={p.text} />
                    <div>
                      <span className="text-xs font-bold">{p.phase}</span>
                      <span className="text-[10px] text-text-muted ml-2">{p.zeit}</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-rose-400">{p.revenue}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                  {p.tasks.map((t, j) => (
                    <div key={j} className="flex items-start gap-1 text-[10px] text-text-muted">
                      <CheckCircle2 size={9} className="text-emerald-400 shrink-0 mt-0.5" />{t}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* KPI-Tabelle */}
      <div>
        <h4 className="text-xs font-bold mb-2 text-rose-400">KPI-Entwicklung</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-1.5 px-2 text-text-muted font-medium">KPI</th>
                <th className="text-center py-1.5 px-2 text-text-muted font-medium">W1</th>
                <th className="text-center py-1.5 px-2 text-text-muted font-medium">M1</th>
                <th className="text-center py-1.5 px-2 text-text-muted font-medium">M3</th>
                <th className="text-center py-1.5 px-2 text-text-muted font-medium">M6</th>
                <th className="text-center py-1.5 px-2 text-text-muted font-medium">M12</th>
              </tr>
            </thead>
            <tbody>
              {KPI_TABELLE.map((row) => (
                <tr key={row.label} className="border-b border-border/50">
                  <td className="py-1.5 px-2 text-text-muted font-medium">{row.label}</td>
                  <td className="py-1.5 px-2 text-center">{row.w1}</td>
                  <td className="py-1.5 px-2 text-center">{row.m1}</td>
                  <td className="py-1.5 px-2 text-center">{row.m3}</td>
                  <td className="py-1.5 px-2 text-center font-bold text-blue-400">{row.m6}</td>
                  <td className="py-1.5 px-2 text-center font-bold text-rose-400">{row.m12}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- Tab 8: Pipeline & Events ---

function PipelineTab() {
  return (
    <div className="space-y-5">
      {/* Aktive Pipeline */}
      <div>
        <h4 className="text-xs font-bold mb-3 text-rose-400 flex items-center gap-2"><TrendingUp size={14} /> Aktive Pipeline</h4>
        <div className="space-y-2">
          {AKTIVE_PIPELINE.map((p) => (
            <div key={p.name} className="rounded-lg bg-bg-hover border border-border p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold">{p.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold bg-rose-500/20 text-rose-400 px-1.5 py-0.5 rounded-full">{p.status}</span>
                  <span className="text-[10px] font-bold text-emerald-400">{p.potential}</span>
                </div>
              </div>
              <div className="text-[10px] text-text-muted">{p.kontakt}</div>
              <div className="text-[10px] mt-1"><span className="font-bold text-amber-400">Next:</span> <span className="text-text-muted">{p.next}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Events 2026 */}
      <div>
        <h4 className="text-xs font-bold mb-3 text-rose-400 flex items-center gap-2"><Calendar size={14} /> Events-Kalender 2026</h4>
        <div className="grid md:grid-cols-2 gap-2">
          {EVENTS_2026.map((e) => (
            <div key={e.name} className={cn(
              'rounded-lg border p-3',
              e.prio === 'Sehr Hoch' ? 'bg-rose-500/5 border-rose-500/30' : 'bg-bg-hover border-border'
            )}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold">{e.name}</span>
                <span className={cn(
                  'text-[9px] font-bold px-1.5 py-0.5 rounded-full',
                  e.prio === 'Sehr Hoch' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                )}>{e.prio}</span>
              </div>
              <div className="text-[10px] text-text-muted">{e.datum} · {e.typ}</div>
              <div className="text-[10px] mt-1"><span className="font-bold text-text">Action:</span> <span className="text-text-muted">{e.action}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== GELDMASCHINE — Revenue Roadmap =====================

const REVENUE_PATHS = [
  {
    id: 'fast',
    label: 'Schnellstes Geld',
    icon: Timer,
    desc: 'Sortiert nach Time-to-Revenue — was bringt am schnellsten Cash?',
    color: 'from-emerald-500 to-green-600',
    cardBg: 'bg-emerald-500/5',
    cardBorder: 'border-emerald-500/20',
    accent: 'text-emerald-400',
    items: [
      { rank: 1, name: 'sayTRUST für Steuerberater', product: 'VPSC', deal: '€12-21K', cycle: '2-4 Wochen', margin: '~50%', monthly: '5 Deals = €60-105K', effort: 'Kaltakquise + IHK-Vortrag',
        why: 'Kein IT-Wissen, GoBD-Pflicht, Mandantengeheimnis. Entscheiden schnell, zahlen sofort.', hook: '"Wie greifen Ihre Mitarbeiter im Homeoffice auf DATEV zu — per VPN?"' },
      { rank: 2, name: 'sayTRUST für Anwälte', product: 'VPSC', deal: '€12-30K', cycle: '2-6 Wochen', margin: '~50%', monthly: '3 Deals = €36-90K', effort: 'Kaltakquise + Partner-Lunch',
        why: '§203 StGB Pflicht, BRAK warnt vor US-Cloud, schnelle Entscheider.', hook: '"Wie stellen Sie sicher, dass Mandantendaten bei Remote-Zugriff nach §203 StGB geschützt sind?"' },
      { rank: 3, name: 'sayTRUST für Arztpraxen', product: 'VPSC', deal: '€3-10K', cycle: '1-3 Wochen', margin: '~55%', monthly: '8 Deals = €24-80K', effort: 'Kaltakquise + Empfehlung',
        why: 'Patientendaten, ePA-Pflicht, null IT-Know-how. Kleinste Hürde.', hook: '"Wie sichern Sie Patientendaten, wenn Mitarbeiter von zuhause zugreifen?"' },
      { rank: 4, name: 'sayFUSE Backup standalone', product: 'Backup', deal: '€10-25K', cycle: '4-8 Wochen', margin: '~45%', monthly: '2 Deals = €20-50K', effort: 'Versicherungs-Argument',
        why: 'Cyber-Versicherung fordert Air-Gap. Backup als Sofortmaßnahme, kein großes Projekt.', hook: '"Ihre Versicherung zahlt nicht ohne Air-Gap-Backup. Wir lösen das in 1 Tag."' },
      { rank: 5, name: 'VMware-Replacement', product: 'HCI', deal: '€90-300K', cycle: '8-16 Wochen', margin: '~50%', monthly: '1 Deal = €90-300K', effort: 'LinkedIn + Direkt',
        why: 'Broadcom +150-1500% Preise. Budget bereits vorhanden, akute Schmerzgrenze.', hook: '"Nach Broadcoms Preiserhöhung — was kosten Sie VMware-Lizenzen jetzt pro Jahr?"' },
    ],
  },
  {
    id: 'effective',
    label: 'Höchster ROI pro Stunde',
    icon: Banknote,
    desc: 'Sortiert nach €/Stunde Kaltakquise — wo verdienst du am meisten pro investierter Stunde?',
    color: 'from-amber-500 to-yellow-600',
    cardBg: 'bg-amber-500/5',
    cardBorder: 'border-amber-500/20',
    accent: 'text-amber-400',
    items: [
      { rank: 1, name: 'VMware-Kunden', product: 'HCI', deal: '€90-300K', cycle: '8-16 Wo', margin: '~50%', monthly: '~€250/h ROI', effort: 'LinkedIn "VMware Admin" filtern',
        why: 'Höchster Deal-Wert × akuter Schmerz = bester ROI pro Anruf. 20 Anrufe → 1 Termin → 25% Close.', hook: '"Was kosten Sie VMware-Lizenzen nach der Broadcom-Übernahme? Wir sparen 71%."' },
      { rank: 2, name: 'Krankenhäuser (KHZG)', product: 'HCI+Backup', deal: '€150-400K', cycle: '3-9 Mo', margin: '~45%', monthly: '~€100/h ROI', effort: 'IT-Leiter direkt',
        why: '€645M KHZG-Budget noch verfügbar! Budget MUSS ausgegeben werden. 30 Anrufe → 1 Termin → 20% Close.', hook: '"Wie planen Sie, Ihr KHZG-Budget für IT-Sicherheit zu nutzen, bevor es verfällt?"' },
      { rank: 3, name: 'Stadtwerke/EVU', product: 'VPSC+HCI', deal: '€80-300K', cycle: '3-6 Mo', margin: '~48%', monthly: '~€100/h ROI', effort: 'VKU-Verband (1.600 Mitglieder)',
        why: 'KRITIS + NIS2 Doppelpflicht. Kein internes Security-Team. 25 Anrufe → 1 Termin → 25% Close.', hook: '"Als KRITIS-Betreiber unterliegen Sie NIS2 — wie sieht Ihr Plan für die technische Umsetzung aus?"' },
      { rank: 4, name: 'Steuerberater', product: 'VPSC', deal: '€12-21K', cycle: '2-4 Wo', margin: '~50%', monthly: '~€40/h ROI', effort: 'Massenakquise möglich',
        why: 'Kleinere Deals, aber schnellster Cycle + höchste Stückzahl. 15 Anrufe → 1 Termin → 40% Close.', hook: '"Seit Januar 2025 ist die E-Rechnung Pflicht. Sind Ihre Mandantendaten GoBD-konform gesichert?"' },
      { rank: 5, name: 'NIS2-pflichtige Firmen', product: 'Komplett', deal: '€30-200K', cycle: '4-12 Wo', margin: '~48%', monthly: '~€80/h ROI', effort: 'IHK-Listen + NIS2-Frist',
        why: '29.500 Firmen, CEO haftet persönlich. Höchster Druck = höchste Abschlussrate.', hook: '"Wussten Sie, dass Sie seit Dezember 2025 persönlich mit Privatvermögen haften?"' },
    ],
  },
  {
    id: 'recurring',
    label: 'Recurring Revenue',
    icon: Repeat,
    desc: 'Monatlich wiederkehrende Einnahmen — der Weg zur Million ohne jeden Monat bei 0 anzufangen',
    color: 'from-purple-500 to-violet-600',
    cardBg: 'bg-purple-500/5',
    cardBorder: 'border-purple-500/20',
    accent: 'text-purple-400',
    items: [
      { rank: 1, name: 'Managed sayTRUST (BB hostet)', product: 'VPSC', deal: '€500-2.000/Mo', cycle: 'Laufend', margin: '~70-90%', monthly: '10 Kunden = €5-20K/Mo', effort: '3-5 Nodes in Colocation',
        why: 'Du kaufst Nodes (EK ~€70K), stellst in RZ auf, verkaufst monatlich. Höchste Marge aller Modelle.', hook: '"Zero Trust as a Service — Sie zahlen nur was Sie nutzen, wir managen alles."' },
      { rank: 2, name: 'NIS2-Compliance-Monitoring', product: 'Beratung', deal: '€300-800/Mo', cycle: 'Laufend', margin: '~80%', monthly: '15 Kunden = €4,5-12K/Mo', effort: 'Quartals-Check + Report',
        why: 'Kunden brauchen laufende Compliance-Nachweise. Du prüfst quartärlich, erstellst Report. Reine Dienstleistung.', hook: '"NIS2 ist kein Einmalprojekt — wir überwachen Ihre Compliance laufend."' },
      { rank: 3, name: 'Support-Vertrag Premium', product: 'Alle', deal: '€200-500/Mo', cycle: 'Laufend', margin: '~60%', monthly: '20 Kunden = €4-10K/Mo', effort: 'Nach jedem HW-Verkauf anbieten',
        why: 'Automatisches Upsell nach jedem Deal. BB = 1st Level, sayTEC = 2nd Level. Kommt quasi von allein.', hook: '"Wollen Sie 24/7-Support oder Standard? Die meisten KRITIS-Kunden nehmen Premium."' },
      { rank: 4, name: 'NaaS Multi-Standort', product: 'HCI+VPSC', deal: '€1.500-6.000/Mo', cycle: 'Laufend', margin: '~85%', monthly: '5 Kunden = €7,5-30K/Mo', effort: 'Zentrale Nodes, Kunden remote',
        why: 'DER Killer: 1x Infrastruktur zentral, viele Standorte bedienen. Steuerberater-Ketten, MVZ, Pflegeheime.', hook: '"10 Standorte, 1 System, 0 lokale Server. Alles aus einer Hand, monatlich."' },
      { rank: 5, name: 'Virtuozzo-Lizenzen (Reseller)', product: 'HCI', deal: '€135/Core/Jahr', cycle: 'Jährlich', margin: '~40%', monthly: 'Automatisch bei HCI-Kunden', effort: 'Null — kommt mit HCI-Verkauf',
        why: 'Jeder HCI-Kunde braucht Virtuozzo-Lizenzen. Verlängern sich automatisch. Passives Einkommen.', hook: 'Kein Pitch nötig — ist Teil des HCI-Angebots.' },
    ],
  },
  {
    id: 'bigmoney',
    label: 'Big Money Deals',
    icon: Rocket,
    desc: 'Die großen Deals — wenige Abschlüsse, aber jeder verändert alles',
    color: 'from-rose-500 to-red-600',
    cardBg: 'bg-rose-500/5',
    cardBorder: 'border-rose-500/20',
    accent: 'text-rose-400',
    items: [
      { rank: 1, name: 'Serban DC Datacenter', product: 'DC-Vermittlung', deal: '€900K-3,6M Provision', cycle: '6-18 Mo', margin: '10%+ Provision', monthly: '1 Deal = Jahresgehalt x10', effort: 'Networking, Kontakte',
        why: '1 Rechenzentrum = €9-18M Baukosten. BB Provision ~10% Bau + >10% Hardware. Serban macht 60+ Projekte.', hook: '"Wir sind Partner des EU-Marktführers für Turn-Key Datacenter. Suchen Sie RZ-Kapazität?"' },
      { rank: 2, name: 'KRITIS-Komplettlösung', product: 'Alles', deal: '€200-500K', cycle: '6-12 Mo', margin: '~50%', monthly: '2 Deals/Jahr = €400K-1M', effort: 'Named Accounts, Systemhäuser',
        why: 'KRITIS-Betreiber brauchen den kompletten Stack. HCI + Backup + VPSC + Services = Volumen.', hook: '"Welche Ihrer KRITIS-Anforderungen sind noch offen? Wir decken 8 von 10 NIS2-Punkten ab."' },
      { rank: 3, name: 'Systemhaus-Partnerschaft', product: 'Alle', deal: '€800K-2,4M/Jahr (Channel)', cycle: '6-12 Mo Setup', margin: '~30-40% Marge', monthly: '8+ Deals/Jahr durch Partner', effort: 'Bechtle, Controlware überzeugen',
        why: '1 aktiver Systemhaus-Partner = 8 Deals/Jahr × €100K = €800K. Skaliert ohne eigene Kaltakquise.', hook: '"Wir bieten 25-40% Reseller-Marge auf Made-in-Germany Security. Ihr Portfolio fehlt Souveränität."' },
      { rank: 4, name: 'GCC/Middle East', product: 'HCI+VPSC', deal: '€200K-5M+', cycle: '6-24 Mo', margin: 'Premium', monthly: 'Projektbasiert', effort: 'Serban-Kontakte, Kulturbrücke',
        why: 'GCC Cybersecurity: USD 20→40 Mrd bis 2030. "Made in Germany" = Premium-Aufschlag.', hook: '"German Sovereign Technology — no Cloud Act, no backdoors, certified."' },
      { rank: 5, name: 'Krankenhaus-Großprojekt', product: 'HCI+Backup', deal: '€300-500K', cycle: '6-12 Mo', margin: '~45%', monthly: '€645M KHZG-Budget verfügbar', effort: 'GEMFA Konferenz, Direkt',
        why: 'Krankenhäuser mit 200-700 Betten. NIS2 + KRITIS + KHZG-Budget = dreifacher Trigger.', hook: '"Das KHZG-Budget verfällt — investieren Sie es in Sicherheit statt in veraltete Systeme."' },
    ],
  },
];

function GeldmaschinenSection() {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const path = REVENUE_PATHS[activeTab];

  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-5 hover:bg-bg-hover/50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white"><Banknote size={20} /></div>
            <div>
              <h2 className="font-bold text-sm">Geldmaschine — Revenue Roadmap</h2>
              <p className="text-xs text-text-muted">Schnellste & effektivste Wege zum Geld — nach Produkt & Logik sortiert</p>
            </div>
          </div>
          {expanded ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
          {/* Summary Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { label: 'Schnellster Deal', value: '1-3 Wo', sub: 'Arztpraxis VPSC', color: 'text-emerald-400' },
              { label: 'Höchster ROI/h', value: '€250/h', sub: 'VMware-Kunden', color: 'text-amber-400' },
              { label: 'Recurring Ziel', value: '€90K/Mo', sub: '30 Kunden, Monat 24', color: 'text-purple-400' },
              { label: 'Biggest Deal', value: '€3,6M', sub: '1 Serban DC Projekt', color: 'text-rose-400' },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-bg-hover border border-border p-3 text-center">
                <div className={cn('text-lg font-black', s.color)}>{s.value}</div>
                <div className="text-[10px] font-bold text-text">{s.label}</div>
                <div className="text-[9px] text-text-muted">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {REVENUE_PATHS.map((p, i) => {
              const Icon = p.icon;
              return (
                <button key={p.id} onClick={() => setActiveTab(i)} className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all',
                  activeTab === i ? `bg-gradient-to-r ${p.color} text-white shadow-lg` : 'bg-bg-hover text-text-muted hover:text-text'
                )}>
                  <Icon size={14} />
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Tab Description */}
          <div className={cn('rounded-lg border p-3', path.cardBg, path.cardBorder)}>
            <p className={cn('text-xs font-bold', path.accent)}>{path.desc}</p>
          </div>

          {/* Items */}
          <div className="space-y-2">
            {path.items.map((item) => (
              <RevPathCard key={item.name} item={item} accent={path.accent} cardBg={path.cardBg} cardBorder={path.cardBorder} />
            ))}
          </div>

          {/* Combined Projection */}
          <div className="rounded-xl bg-gradient-to-r from-emerald-900/20 via-purple-900/20 to-rose-900/20 border border-emerald-700/20 p-4">
            <h4 className="text-sm font-bold mb-3 flex items-center gap-2"><TrendingUp size={16} className="text-emerald-400" /> Kombinierter 3-Jahres-Pfad</h4>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { year: 'Jahr 1', revenue: '€0,7-2,2M', profit: '€265K-990K', focus: 'Direktverkauf + erste Recurring', color: 'text-emerald-400' },
                { year: 'Jahr 2', revenue: '€3,5-7,5M', profit: '€1,4-3M', focus: '+ Channel + Serban DC + 30 Recurring', color: 'text-amber-400' },
                { year: 'Jahr 3', revenue: '€5,5-11M', profit: '€2,2-4,5M', focus: '+ GCC + 60 Recurring + Scale', color: 'text-rose-400' },
              ].map((y) => (
                <div key={y.year} className="rounded-lg bg-bg-card/60 border border-border p-3 text-center">
                  <div className={cn('text-xs font-bold mb-1', y.color)}>{y.year}</div>
                  <div className="text-lg font-black">{y.revenue}</div>
                  <div className="text-[10px] text-text-muted">Umsatz</div>
                  <div className={cn('text-sm font-bold mt-1', y.color)}>{y.profit}</div>
                  <div className="text-[10px] text-text-muted">Gewinn</div>
                  <div className="text-[9px] text-text-muted mt-1 italic">{y.focus}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RevPathCard({ item, accent, cardBg, cardBorder }: { item: typeof REVENUE_PATHS[0]['items'][0]; accent: string; cardBg: string; cardBorder: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn('rounded-lg border overflow-hidden', cardBg, cardBorder)}>
      <button onClick={() => setOpen(!open)} className="w-full text-left p-3 hover:bg-bg-card/50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={cn('w-7 h-7 rounded-full flex items-center justify-center text-xs font-black', cardBg, accent)}>{item.rank}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold">{item.name}</span>
                <span className={cn('text-[9px] font-bold px-1.5 py-0.5 rounded-full', cardBg, accent)}>{item.product}</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-text-muted">
                <span>Deal: <strong className="text-text">{item.deal}</strong></span>
                <span>Cycle: <strong className="text-text">{item.cycle}</strong></span>
                <span>Marge: <strong className={accent}>{item.margin}</strong></span>
              </div>
            </div>
          </div>
          {open ? <ChevronUp size={14} className="text-text-muted" /> : <ChevronDown size={14} className="text-text-muted" />}
        </div>
      </button>
      {open && (
        <div className="px-3 pb-3 border-t border-border pt-2 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className={cn('text-[10px] font-bold mb-0.5', accent)}>Monatliches Potenzial:</div>
              <div className="text-xs font-bold">{item.monthly}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-text-muted mb-0.5">Aufwand:</div>
              <div className="text-xs text-text-muted">{item.effort}</div>
            </div>
          </div>
          <div>
            <div className={cn('text-[10px] font-bold mb-0.5', accent)}>Warum das funktioniert:</div>
            <div className="text-[11px] text-text-muted">{item.why}</div>
          </div>
          <div className="rounded bg-bg-card/80 border border-border p-2">
            <div className="text-[10px] font-bold text-text-muted mb-0.5">Öffnungssatz:</div>
            <div className="text-[11px] text-text-muted italic">"{item.hook}"</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===================== MAIN VIEW =====================

export function BunkerBauerView() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
      <TechHero />
      <GeldmaschinenSection />
      <PostZeroTrustSection />
      <VPSCSection />
      <BackupSection />
      <HCISection />
      <CertificationsSection />
      <CaseStudySection />
      <DeliverySection />
      <EnforceTacSection />
      <KeyNumbersSection />
      <ProductGuideSection />
      <VertriebSection />
    </div>
  );
}
