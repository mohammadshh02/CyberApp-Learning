// OT/ICS Security Curriculum — Parallel-Track zum Hauptcurriculum
// 12 Monate, 4 Wochen pro Monat, ~5 Tasks pro Woche
// Ziel: Vom Null zum unersetzlichen OT-Security-Experten

export interface OTWeek {
  topic: string;
  tasks: { id: string; text: string }[];
}

export interface OTMonth {
  monthRange: string;
  title: string;
  weeks: OTWeek[];
}

export const OT_CURRICULUM: OTMonth[] = [

  // ===== MONAT 1: OT/ICS GRUNDLAGEN — Die zwei Welten verstehen =====
  {
    monthRange: '1',
    title: 'OT/ICS Grundlagen — Was ist Operational Technology?',
    weeks: [
      {
        topic: 'IT vs OT — Die zwei Welten',
        tasks: [
          { id: 'ot_1_1_1', text: 'Lies: NIST SP 800-82 Rev 3 "Guide to Operational Technology Security" — Kapitel 1-2 (kostenlos auf nist.gov)' },
          { id: 'ot_1_1_2', text: 'Verstehe den Unterschied: IT = Vertraulichkeit zuerst (CIA), OT = Verfügbarkeit zuerst (AIC) — Warum das ALLES ändert' },
          { id: 'ot_1_1_3', text: 'Recherchiere: 5 reale OT-Angriffe (Stuxnet 2010, Ukraine Power Grid 2015/2016, TRITON/TRISIS 2017, Oldsmar Water 2021, Colonial Pipeline 2021)' },
          { id: 'ot_1_1_4', text: 'Notiz schreiben: "Warum kann ein Fehler in OT Menschen töten?" — Vergleiche IT-Ausfall vs OT-Ausfall mit konkreten Beispielen' },
          { id: 'ot_1_1_5', text: 'Video: SANS ICS "Introduction to ICS/SCADA" (YouTube, kostenlos) — Grundverständnis aufbauen' },
        ],
      },
      {
        topic: 'SCADA, DCS, PLC — Industrielle Steuerungssysteme',
        tasks: [
          { id: 'ot_1_2_1', text: 'Lerne: Was ist eine SPS/PLC (Speicherprogrammierbare Steuerung)? Wie liest sie Sensoren und steuert Aktoren?' },
          { id: 'ot_1_2_2', text: 'Lerne: Was ist SCADA? Wie überwacht es verteilte Anlagen (Wasser, Strom, Gas) über große Distanzen?' },
          { id: 'ot_1_2_3', text: 'Lerne: Was ist ein DCS (Distributed Control System)? Wann DCS vs SCADA? (Raffinerie = DCS, Stromnetz = SCADA)' },
          { id: 'ot_1_2_4', text: 'Lerne: HMI (Human Machine Interface) — Die Bildschirme die Operatoren sehen. Warum sind sie Angriffsziel #1?' },
          { id: 'ot_1_2_5', text: 'Recherchiere: Die 5 größten PLC-Hersteller und ihren Marktanteil: Siemens, Rockwell/Allen-Bradley, Schneider Electric, ABB, Mitsubishi' },
        ],
      },
      {
        topic: 'Das Purdue-Modell — OT-Netzwerk-Architektur',
        tasks: [
          { id: 'ot_1_3_1', text: 'Zeichne das Purdue-Modell (6 Level): Level 0 (Physischer Prozess) → Level 1 (Sensoren/Aktoren) → Level 2 (Steuerung) → Level 3 (Operations) → DMZ → Level 4-5 (Enterprise IT)' },
          { id: 'ot_1_3_2', text: 'Verstehe: Warum ist die DMZ zwischen Level 3 und Level 4 DIE kritische Grenze? Was passiert wenn sie fehlt?' },
          { id: 'ot_1_3_3', text: 'Lies: SANS-Poster "ICS Network Architecture" (kostenlos downloadbar) — Ausdrucken und aufhängen' },
          { id: 'ot_1_3_4', text: 'Recherchiere: Wie sieht ein typisches Wasserwerk-Netzwerk aus? Zeichne es mit Purdue-Leveln' },
          { id: 'ot_1_3_5', text: 'Recherchiere: Wie sieht ein typisches Kraftwerk-Netzwerk aus? Wo sitzen SCADA-Server, Historian, Engineering Workstation?' },
        ],
      },
      {
        topic: 'Industrielle Protokolle — Überblick',
        tasks: [
          { id: 'ot_1_4_1', text: 'Überblick: Die 7 wichtigsten OT-Protokolle und wo sie eingesetzt werden: Modbus, S7comm, OPC-UA, DNP3, Profinet, EtherNet/IP, BACnet' },
          { id: 'ot_1_4_2', text: 'Verstehe: Warum haben die meisten OT-Protokolle KEINE eingebaute Authentifizierung oder Verschlüsselung? (Historischer Kontext: Air-Gapped Netze)' },
          { id: 'ot_1_4_3', text: 'Vergleiche: Modbus (1979, einfach, kein Auth) vs OPC-UA (2008, modern, TLS-fähig) — Evolution der OT-Protokolle' },
          { id: 'ot_1_4_4', text: 'Recherchiere: Welche Branchen nutzen welche Protokolle? (Energie = DNP3/IEC 61850, Fertigung = Profinet/EtherNet/IP, Gebäude = BACnet)' },
          { id: 'ot_1_4_5', text: 'Lies: ICS-CERT "Recommended Practices" auf cisa.gov — Überblick über alle CISA OT-Security-Ressourcen' },
        ],
      },
    ],
  },

  // ===== MONAT 2: INDUSTRIELLE PROTOKOLLE DEEP DIVE =====
  {
    monthRange: '2',
    title: 'Industrielle Protokolle — Die Sprache der Maschinen',
    weeks: [
      {
        topic: 'Modbus TCP/RTU — Das Urprotokoll der Industrie',
        tasks: [
          { id: 'ot_2_1_1', text: 'Lies: Modbus Application Protocol Specification v1.1b3 (modbus.org) — Function Codes verstehen (01=Read Coils, 03=Read Holding Registers, 05=Write Single Coil, 16=Write Multiple Registers)' },
          { id: 'ot_2_1_2', text: 'Verstehe: Modbus RTU (Seriell, RS-485) vs Modbus TCP (Ethernet, Port 502) — Wann welches? RTU in alten Anlagen, TCP in modernen' },
          { id: 'ot_2_1_3', text: 'Praktisch: Installiere "diagslave" oder "ModRSsim2" als Modbus-Simulator und verbinde mit "mbpoll" Client' },
          { id: 'ot_2_1_4', text: 'Praktisch: Schreibe ein Python-Script mit "pymodbus" das Register einer simulierten SPS ausliest — verstehe Unit ID, Function Code, Register Address' },
          { id: 'ot_2_1_5', text: 'Sicherheitsanalyse: Warum ist Modbus gefährlich? Keine Auth, kein Encryption, jeder im Netz kann Register schreiben. Wie verteidigt man sich? (Netzwerk-Segmentierung + Monitoring)' },
        ],
      },
      {
        topic: 'Siemens S7comm + Profinet',
        tasks: [
          { id: 'ot_2_2_1', text: 'Verstehe: S7comm Protokoll (Port 102/TCP, ISO-TSAP) — Wie kommuniziert TIA Portal mit einer S7-1500? Funktionscodes: Read/Write Variables, Upload/Download Program, Start/Stop PLC' },
          { id: 'ot_2_2_2', text: 'Recherchiere: S7comm vs S7comm-Plus — S7-1200/1500 nutzen verschlüsseltes S7comm-Plus, ältere S7-300/400 nutzen unverschlüsseltes S7comm. Warum ist das relevant?' },
          { id: 'ot_2_2_3', text: 'Verstehe: Profinet — Siemens Industrial Ethernet (Layer 2, kein IP nötig). Profinet IO (Real-Time I/O) vs Profinet CBA (Component Based Automation)' },
          { id: 'ot_2_2_4', text: 'Wireshark: Fange S7comm-Traffic ab (Filter: s7comm). Analysiere: Welche Function Codes siehst du? Was bedeuten die Parameter?' },
          { id: 'ot_2_2_5', text: 'Sicherheitsanalyse: Lies den CVE zu S7-300 "Stop PLC" Schwachstelle — Mit einem einzigen Paket kann man eine S7-300 stoppen. Was bedeutet das für eine Produktionsanlage?' },
        ],
      },
      {
        topic: 'OPC-UA — Der moderne Standard',
        tasks: [
          { id: 'ot_2_3_1', text: 'Verstehe: OPC-UA (Unified Architecture) — Plattformunabhängig, eingebaute Security (X.509 Zertifikate, TLS Encryption, Authentication). Der Nachfolger von OPC Classic/DA/HDA' },
          { id: 'ot_2_3_2', text: 'Verstehe: OPC-UA Adressraum — Nodes, Objects, Variables, Methods. Wie ein OPC-UA Server seine Daten strukturiert' },
          { id: 'ot_2_3_3', text: 'Praktisch: Installiere "open62541" oder "python-opcua" und setze einen OPC-UA Test-Server auf. Verbinde mit "UaExpert" Client (Unified Automation, kostenlos)' },
          { id: 'ot_2_3_4', text: 'Sicherheitsanalyse: OPC-UA Security Modes — None, Sign, SignAndEncrypt. Viele Implementierungen laufen mit "None". Wie findest du das raus? Wie überzeugst du den Kunden das zu ändern?' },
          { id: 'ot_2_3_5', text: 'Lies: BSI TR-02103 "OPC UA Security Analysis" — Die offizielle BSI-Bewertung von OPC-UA Security' },
        ],
      },
      {
        topic: 'DNP3, EtherNet/IP, BACnet',
        tasks: [
          { id: 'ot_2_4_1', text: 'DNP3 (Distributed Network Protocol): Port 20000/TCP. Haupteinsatz: Stromnetze + Wasserversorgung. Verstehe: DNP3 Secure Authentication (SA v5) — Wie es Replay-Angriffe verhindert' },
          { id: 'ot_2_4_2', text: 'EtherNet/IP: Port 44818/TCP, 2222/UDP. Rockwell/Allen-Bradley-Welt. CIP (Common Industrial Protocol) über Ethernet. Verstehe: Implicit vs Explicit Messaging' },
          { id: 'ot_2_4_3', text: 'BACnet: Port 47808/UDP. Gebäudeautomation (Heizung, Lüftung, Klima, Aufzüge). BACnet/IP vs BACnet/MSTP. Warum sind smarte Gebäude ein Einfallstor?' },
          { id: 'ot_2_4_4', text: 'Vergleichstabelle erstellen: Alle 7 Protokolle mit Port, Verschlüsselung (ja/nein), Authentifizierung (ja/nein), typische Branche, typische Schwachstelle' },
          { id: 'ot_2_4_5', text: 'Lies: Dragos "ICS Protocol Primer" oder SANS "ICS Security Protocols" Whitepaper — Zusammenfassung aller OT-Protokolle mit Security-Bewertung' },
        ],
      },
    ],
  },

  // ===== MONAT 3: OT-NETZWERK-ANALYSE MIT WIRESHARK =====
  {
    monthRange: '3',
    title: 'OT-Netzwerk-Analyse mit Wireshark',
    weeks: [
      {
        topic: 'Wireshark ICS-Filter einrichten',
        tasks: [
          { id: 'ot_3_1_1', text: 'Setup: Wireshark mit allen ICS-Dissektoren installieren. Verifiziere: Werden Modbus, S7comm, DNP3, OPC-UA, EtherNet/IP als Protokolle erkannt?' },
          { id: 'ot_3_1_2', text: 'ICS Display Filter lernen: "mbtcp" (Modbus TCP), "s7comm" (Siemens), "dnp3", "opcua", "enip" (EtherNet/IP), "bacnet"' },
          { id: 'ot_3_1_3', text: 'Wireshark Coloring Rules für ICS erstellen: Grün = normale Read-Requests, Rot = Write-Requests, Gelb = Stop/Start PLC, Orange = Firmware Upload' },
          { id: 'ot_3_1_4', text: 'Lade ICS-PCAP-Samples herunter: netresec.com, github.com/automayt/ICS-pcap — Öffne jedes und identifiziere das Protokoll' },
          { id: 'ot_3_1_5', text: 'Erstelle ein Wireshark-Profil "ICS-Analysis" mit optimierten Spalten: Time, Source, Destination, Protocol, Function Code, Register/Address, Info' },
        ],
      },
      {
        topic: 'Modbus Traffic Analysis',
        tasks: [
          { id: 'ot_3_2_1', text: 'Praktisch: Starte deinen Modbus-Simulator (aus Monat 2) und fange den Traffic mit Wireshark ab. Identifiziere: Query, Response, Unit ID, Function Code' },
          { id: 'ot_3_2_2', text: 'Analyse: Wie erkennst du einen Modbus-Write-Angriff? Filter: mbtcp.func_code == 5 OR mbtcp.func_code == 6 OR mbtcp.func_code == 15 OR mbtcp.func_code == 16' },
          { id: 'ot_3_2_3', text: 'Anomalie-Erkennung: Was ist "normal" bei Modbus? Regelmäßige Read-Zyklen alle 100ms. Was ist anomal? Plötzliche Writes, neue Source-IPs, ungewöhnliche Function Codes' },
          { id: 'ot_3_2_4', text: 'Schreibe: Python-Script mit Scapy das Modbus-Traffic parst und verdächtige Writes markiert (Function Code 5, 6, 15, 16 von unbekannten IPs)' },
          { id: 'ot_3_2_5', text: 'Übung: Finde in einem PCAP die Stelle wo ein Angreifer Modbus-Register überschreibt — Welche Adresse? Welcher Wert? Was könnte das physisch auslösen?' },
        ],
      },
      {
        topic: 'S7comm & Profinet Traffic Analysis',
        tasks: [
          { id: 'ot_3_3_1', text: 'S7comm Filter: "s7comm.param.func == 0x04" (Read), "s7comm.param.func == 0x05" (Write), "s7comm.param.func == 0x28" (PLC Control/Stop)' },
          { id: 'ot_3_3_2', text: 'Analyse: Wie erkennst du einen PLC-Stop-Angriff? Filter: s7comm.param.func == 0x28 — Jemand sendet "Stop PLC" an eine S7-300' },
          { id: 'ot_3_3_3', text: 'Profinet Filter: "pn_io" — Analysiere Real-Time I/O Frames. Verstehe: Cycle Counter, Data Status, welche I/O-Daten transportiert werden' },
          { id: 'ot_3_3_4', text: 'Praktisch: Lade S7comm-PCAP von einem CTF oder ICS-Lab herunter. Rekonstruiere: Welche SPS, welche Daten gelesen, ob Programm geändert wurde' },
          { id: 'ot_3_3_5', text: 'Schreibe: Wireshark Lua-Dissector oder tshark-Script das S7comm-Writes in einer Logdatei sammelt (Timestamp, Source IP, Register, Wert)' },
        ],
      },
      {
        topic: 'OPC-UA & DNP3 Traffic Analysis',
        tasks: [
          { id: 'ot_3_4_1', text: 'OPC-UA Filter: "opcua" — Analysiere: Security Mode (None vs SignAndEncrypt), Service Requests (Browse, Read, Write, Subscribe)' },
          { id: 'ot_3_4_2', text: 'OPC-UA Security Audit: Finde in einem PCAP heraus ob OPC-UA mit Security Mode "None" läuft. Wie würdest du das dem Kunden melden?' },
          { id: 'ot_3_4_3', text: 'DNP3 Filter: "dnp3" — Verstehe: Master/Outstation-Kommunikation, Function Codes (Read=1, Write=2, Direct Operate=3, Cold Restart=13)' },
          { id: 'ot_3_4_4', text: 'DNP3 Anomalie: Filter für gefährliche DNP3-Befehle: dnp3.al.func == 13 (Cold Restart), dnp3.al.func == 14 (Warm Restart), dnp3.al.func == 3 (Direct Operate)' },
          { id: 'ot_3_4_5', text: 'Capstone: Erstelle eine "ICS Traffic Analysis Checkliste" mit allen Filtern, Anomalie-Indikatoren und Eskalationskriterien für jeden Protokolltyp' },
        ],
      },
    ],
  },

  // ===== MONAT 4: IEC 62443 — DER Standard für OT-Security =====
  {
    monthRange: '4',
    title: 'IEC 62443 — DER Standard für industrielle Cybersecurity',
    weeks: [
      {
        topic: 'IEC 62443 Überblick + Struktur',
        tasks: [
          { id: 'ot_4_1_1', text: 'Verstehe: IEC 62443 besteht aus 4 Teilen: 62443-1 (Allgemein), 62443-2 (Policies & Procedures), 62443-3 (System Security), 62443-4 (Component Security)' },
          { id: 'ot_4_1_2', text: 'Verstehe die 3 Rollen: Asset Owner (Betreiber), System Integrator (Anlagenbauer), Component Supplier (Hersteller) — Jeder hat andere Pflichten unter IEC 62443' },
          { id: 'ot_4_1_3', text: 'Lies: ISA "Quick Start Guide to IEC 62443" (isa.org) — 20-Seiten-Zusammenfassung des gesamten Standards' },
          { id: 'ot_4_1_4', text: 'Vergleiche: IEC 62443 vs ISO 27001 — 27001 = IT-fokussiert, 62443 = OT-fokussiert. Wo überschneiden sie sich? Wo nicht?' },
          { id: 'ot_4_1_5', text: 'Recherchiere: Welche Firmen in Deutschland sind nach IEC 62443 zertifiziert? (Siemens, Phoenix Contact, WAGO, Pilz, HIMA) — Warum ist das für Kunden relevant?' },
        ],
      },
      {
        topic: 'Zones & Conduits Design',
        tasks: [
          { id: 'ot_4_2_1', text: 'IEC 62443-3-2: Zone = Gruppe von Assets mit gleichem Security Level. Conduit = Kommunikationsweg zwischen Zonen. Zeichne ein Beispiel-Netzwerk mit 5 Zonen und 3 Conduits' },
          { id: 'ot_4_2_2', text: 'Praxis: Nimm ein typisches Produktionsnetzwerk (Büro-IT, Engineering, SCADA, SPS-Netz, Safety) und definiere Zonen nach IEC 62443-3-2' },
          { id: 'ot_4_2_3', text: 'Conduit-Regeln: Welche Kommunikation ist zwischen den Zonen erlaubt? Erstelle eine Kommunikationsmatrix (Zone A → Zone B: Protokoll, Port, Richtung)' },
          { id: 'ot_4_2_4', text: 'Firewall-Regeln ableiten: Übersetze deine Kommunikationsmatrix in konkrete Firewall-Regeln (Source, Dest, Port, Protocol, Action)' },
          { id: 'ot_4_2_5', text: 'Praxisübung: Zeichne das Zones & Conduits Diagramm für ein Wasserwerk (3 Pumpstationen, 1 Leitwarte, IT-Netz, Remote-Zugriff für Wartung)' },
        ],
      },
      {
        topic: 'Security Levels (SL 1-4) + Risk Assessment',
        tasks: [
          { id: 'ot_4_3_1', text: 'IEC 62443 Security Levels: SL 1 (Casual Violation), SL 2 (Intentional, einfache Mittel), SL 3 (Sophisticated, IACS-spezifisch), SL 4 (State-sponsored) — Welches Level braucht welche Anlage?' },
          { id: 'ot_4_3_2', text: 'Target SL vs Achieved SL vs Capability SL — Verstehe den Unterschied: Was der Betreiber WILL vs was das System KANN vs was ERREICHT wurde' },
          { id: 'ot_4_3_3', text: 'Risk Assessment nach IEC 62443-3-2: 1) Assets identifizieren, 2) Bedrohungen ermitteln, 3) Risiko bewerten (Eintrittswahrscheinlichkeit × Auswirkung), 4) Target SL je Zone festlegen' },
          { id: 'ot_4_3_4', text: 'Praxisübung: Führe eine Risk Assessment für eine fiktive Chemiefabrik durch — 3 Zonen, jeweils Target SL bestimmen, Maßnahmen ableiten' },
          { id: 'ot_4_3_5', text: 'Foundational Requirements (FR): FR 1 (Access Control), FR 2 (Use Control), FR 3 (System Integrity), FR 4 (Data Confidentiality), FR 5 (Restricted Data Flow), FR 6 (Timely Response), FR 7 (Resource Availability)' },
        ],
      },
      {
        topic: 'CSMS — Cybersecurity Management System',
        tasks: [
          { id: 'ot_4_4_1', text: 'IEC 62443-2-1: CSMS aufbauen — Policies, Procedures, Rollen & Verantwortlichkeiten, Training, Risikomanagement, Change Management, Incident Response' },
          { id: 'ot_4_4_2', text: 'Erstelle: Eine CSMS-Policy-Vorlage für einen mittelständischen Produktionsbetrieb — Deckblatt, Scope, Rollen, Risikobewertung, Maßnahmenkatalog' },
          { id: 'ot_4_4_3', text: 'Change Management in OT: Warum ist das ANDERS als in IT? Ein Firmware-Update an einer SPS kann die Produktion stoppen. Prozess: Test → Genehmigung → Wartungsfenster → Rollback-Plan' },
          { id: 'ot_4_4_4', text: 'Patch Management in OT: Die Realität: 26% der ICS-Schwachstellen haben KEINE Patches (Dragos 2026). Compensating Controls: Netzwerk-Segmentierung, Monitoring, Virtual Patching' },
          { id: 'ot_4_4_5', text: 'Lies: TÜV SÜD "IEC 62443 Implementation Guide" oder ISA "IACS Cybersecurity" Schulungsunterlagen — Zusammenfassung des gesamten CSMS-Prozesses' },
        ],
      },
    ],
  },

  // ===== MONAT 5: NIS2 + KRITIS — REGULATORIK VERSTEHEN =====
  {
    monthRange: '5',
    title: 'NIS2 + KRITIS — Regulatorik für OT-Security',
    weeks: [
      {
        topic: 'NIS2UmsuCG im Detail',
        tasks: [
          { id: 'ot_5_1_1', text: 'Lies: NIS2UmsuCG Volltext (Bundesgesetzblatt, Dezember 2025). Fokus: §28 (Betroffene Einrichtungen), §30 (Risikomanagement), §31 (Meldepflichten), §38 (GF-Haftung)' },
          { id: 'ot_5_1_2', text: 'Verstehe §28: "Besonders wichtige Einrichtungen" (>250 MA oder >50M€ Umsatz IN bestimmten Sektoren) vs "Wichtige Einrichtungen" (>50 MA oder >10M€). Welche Sektoren? Energie, Wasser, Transport, Gesundheit, Chemie, Produktion...' },
          { id: 'ot_5_1_3', text: 'Verstehe §30: Die 10 Pflichtmaßnahmen — Risikoanalyse, Incident Management, Business Continuity, Lieferkette, Beschaffung, Wirksamkeit, Cyberhygiene, Krypto, Zugang, MFA' },
          { id: 'ot_5_1_4', text: 'Verstehe §38: PERSÖNLICHE Haftung der Geschäftsführung — Bußgeld bis 2% des Jahresumsatzes. GF MÜSSEN an Schulungen teilnehmen. Das ist dein Verkaufsargument #1' },
          { id: 'ot_5_1_5', text: 'Erstelle: NIS2-Checkliste mit allen 10 Pflichtmaßnahmen, jeweiligem §-Verweis, und konkreten OT-spezifischen Umsetzungsbeispielen' },
        ],
      },
      {
        topic: 'KRITIS-Dachgesetz + §8a BSIG',
        tasks: [
          { id: 'ot_5_2_1', text: 'Lies: §8a BSIG — KRITIS-Betreiber müssen "angemessene organisatorische und technische Vorkehrungen" nachweisen. Nachweis alle 2 Jahre gegenüber dem BSI' },
          { id: 'ot_5_2_2', text: 'Verstehe: KRITIS-Sektoren und Schwellenwerte — Energie (500.000 versorgte Personen), Wasser (500.000), IT/TK, Gesundheit, Transport, Ernährung, Finanz, Siedlungsabfall' },
          { id: 'ot_5_2_3', text: 'SzA-Pflicht (Systeme zur Angriffserkennung): Seit 1. Mai 2023 Pflicht für alle KRITIS-Betreiber. BSI Orientierungshilfe lesen — 3 Stufen: Protokollierung, Detektion, Reaktion' },
          { id: 'ot_5_2_4', text: 'KRITIS-Dachgesetz (Januar 2026): Physische Resilienz + Cyber zusammen. Betreiber müssen Risikoanalysen, Resilienzpläne, Meldepflichten für physische UND digitale Vorfälle erfüllen' },
          { id: 'ot_5_2_5', text: 'Recherchiere: openkritis.de — Wie viele KRITIS-Betreiber gibt es? (~1.300 mit ~2.100 Anlagen). Plus ~29.500 durch NIS2 neu betroffene' },
        ],
      },
      {
        topic: 'BSI IT-Grundschutz für OT',
        tasks: [
          { id: 'ot_5_3_1', text: 'BSI IT-Grundschutz-Kompendium: Baustein IND (Industrielle IT) — IND.1 (Prozessleit- und Automatisierungstechnik), IND.2 (ICS-Komponenten), IND.3 (Programmierbare Logik) lesen' },
          { id: 'ot_5_3_2', text: 'Verstehe: BSI IT-Grundschutz Vorgehensweise — Strukturanalyse → Schutzbedarfsfeststellung → Modellierung → IT-Grundschutz-Check → Risikoanalyse → Umsetzung' },
          { id: 'ot_5_3_3', text: 'Praxisübung: Wende BSI IND.1 auf ein fiktives Produktionsunternehmen an — Welche Anforderungen gelten? Welche sind bereits erfüllt? Gap-Analyse erstellen' },
          { id: 'ot_5_3_4', text: 'Vergleiche: BSI IT-Grundschutz + IEC 62443 + ISO 27001 — Wie passen sie zusammen? Mapping-Tabelle erstellen (Grundschutz-Baustein → IEC 62443 FR → ISO 27001 Annex A)' },
          { id: 'ot_5_3_5', text: 'Recherchiere: Branchenspezifische Sicherheitsstandards (B3S) — Wasser/Abwasser, Strom/Gas, Pharma, Lebensmittel. Jeder Sektor hat eigene Standards auf Basis von §8a' },
        ],
      },
      {
        topic: 'NIS2 Gap-Analyse Methodik — So verdienst du Geld',
        tasks: [
          { id: 'ot_5_4_1', text: 'Gap-Analyse Prozess: 1) Betroffenheitsanalyse (IST der Kunde NIS2-pflichtig?), 2) Ist-Aufnahme, 3) Soll-Anforderungen, 4) Gap identifizieren, 5) Maßnahmenplan, 6) Priorisierung, 7) Budget-Schätzung' },
          { id: 'ot_5_4_2', text: 'Erstelle: Gap-Analyse-Template (Excel/Notion) mit allen 10 NIS2-Pflichtmaßnahmen, Reifegradstufen (0-5), Ist-Stand, Soll-Stand, Gap, Maßnahme, Verantwortlicher, Deadline' },
          { id: 'ot_5_4_3', text: 'Erstelle: GF-Schulung "NIS2 für Geschäftsführer" (30min Präsentation) — Wer ist betroffen? Was droht? §38 Haftung. Was muss JETZT passieren?' },
          { id: 'ot_5_4_4', text: 'Kalkulation: Was kostet eine NIS2-Gap-Analyse? Rechne: ~3-5 Tage Vor-Ort + 2-3 Tage Report-Erstellung × dein Tagessatz. Für einen Mittelständler: €8.000-20.000' },
          { id: 'ot_5_4_5', text: 'Übe: Führe eine Probe-Gap-Analyse an einem fiktiven Unternehmen durch (200 MA, Maschinenbau, keine bisherige IT-Sec-Abteilung). Schreibe den vollständigen Report' },
        ],
      },
    ],
  },

  // ===== MONAT 6: OT ASSET DISCOVERY & VULNERABILITY MANAGEMENT =====
  {
    monthRange: '6',
    title: 'OT Asset Discovery & Vulnerability Management',
    weeks: [
      {
        topic: 'Passive OT-Netzwerk-Erkennung',
        tasks: [
          { id: 'ot_6_1_1', text: 'KRITISCH: NIEMALS aktive Scans (nmap, Nessus) in Produktions-OT-Netzwerken! Eine SPS kann bei einem SYN-Scan abstürzen. IMMER passiv — Netzwerk-TAP oder SPAN-Port + Wireshark/Zeek' },
          { id: 'ot_6_1_2', text: 'Setup: Netzwerk-TAP verstehen — Passiver Hardware-Tap vs SPAN-Port am Switch. Wo platziert man den TAP? Zwischen IT/OT-DMZ und am OT-Core-Switch' },
          { id: 'ot_6_1_3', text: 'Praktisch: Zeek (ehemals Bro) IDS installieren und auf ICS-PCAP anwenden — Zeek erkennt automatisch Modbus, DNP3, S7comm Sessions' },
          { id: 'ot_6_1_4', text: 'Asset-Inventar aus Traffic erstellen: Aus passivem Monitoring eine Liste aller OT-Geräte ableiten — IP, MAC, Protokoll, Hersteller (OUI-Lookup), Rolle im Netzwerk' },
          { id: 'ot_6_1_5', text: 'Vergleiche: Kommerzielle Lösungen — Nozomi Networks Guardian (passives Monitoring), Claroty CTD (DPI für OT), Dragos Platform (Threat Detection) — Funktionen, Preise, Deployment' },
        ],
      },
      {
        topic: 'Shodan & Censys für ICS-Suche',
        tasks: [
          { id: 'ot_6_2_1', text: 'Shodan ICS-Suche: Lerne die Filter — "port:502" (Modbus), "port:102" (S7comm), "port:44818" (EtherNet/IP), "port:20000" (DNP3), "port:4840" (OPC-UA)' },
          { id: 'ot_6_2_2', text: 'Shodan CLI: "shodan search port:502 country:DE" — Wie viele Modbus-Geräte sind in Deutschland direkt aus dem Internet erreichbar? (Das sollte NULL sein, ist es aber nicht)' },
          { id: 'ot_6_2_3', text: 'Censys: Alternative zu Shodan. Suche nach ICS-Geräten mit: "services.port=102 AND location.country=Germany" — Vergleiche die Ergebnisse mit Shodan' },
          { id: 'ot_6_2_4', text: 'Ethik & Recht: Du darfst Shodan/Censys für Recherche nutzen, aber NICHT auf gefundene Systeme zugreifen (§202a StGB). Für Kunden: Nur mit schriftlicher Genehmigung' },
          { id: 'ot_6_2_5', text: 'Erstelle: Report "Öffentlich erreichbare ICS-Systeme in Deutschland" mit Shodan-Daten — Anonymisiert, als Beispiel für Kundenpräsentationen' },
        ],
      },
      {
        topic: 'Nmap ICS-Scripts (sicher anwenden)',
        tasks: [
          { id: 'ot_6_3_1', text: 'WARNUNG: Nmap NUR in isolierten Lab-Umgebungen oder mit expliziter schriftlicher Genehmigung! In Produktionsnetzen kann nmap PLCs crashen!' },
          { id: 'ot_6_3_2', text: 'Nmap ICS NSE-Scripts kennenlernen: modbus-discover, s7-info, enip-info, dnp3-info, fox-info, pcworx-info, bacnet-info, codesys-v2-discover' },
          { id: 'ot_6_3_3', text: 'Lab-Übung: Gegen Conpot (ICS Honeypot) scannen: "nmap -sT -p 502 --script modbus-discover <conpot-ip>" — Analysiere die Ergebnisse' },
          { id: 'ot_6_3_4', text: 'Lab-Übung: S7-Info gegen simulierte SPS: "nmap -sT -p 102 --script s7-info <target>" — Liest Modultyp, Seriennummer, Firmware-Version aus' },
          { id: 'ot_6_3_5', text: 'Dokumentiere: "Sichere OT-Scanning-Methodik" — Wann nmap OK (Lab, Honeypot), wann NIE (Produktion), Alternativen (passives Monitoring)' },
        ],
      },
      {
        topic: 'OT Vulnerability Management',
        tasks: [
          { id: 'ot_6_4_1', text: 'ICS-CERT Advisories: cisa.gov/ics-advisories — Abonniere den RSS-Feed. Lerne: Wie liest man ein ICS-CERT Advisory? (Vendor, Produkt, CVSS, Mitigation)' },
          { id: 'ot_6_4_2', text: 'Das OT-Patching-Dilemma: 26% der ICS-Schwachstellen haben KEINE Patches (Dragos 2026). OT-Systeme laufen 15-25 Jahre. Manche PLCs haben KEIN Update-Mechanismus' },
          { id: 'ot_6_4_3', text: 'Compensating Controls wenn Patching unmöglich: 1) Netzwerk-Segmentierung (Zone isolieren), 2) Monitoring (Anomalie-Erkennung), 3) Virtual Patching (IDS/IPS-Regeln), 4) Zugriffsbeschränkung' },
          { id: 'ot_6_4_4', text: 'Praxisübung: Suche auf ICS-CERT nach aktuellen Schwachstellen für Siemens S7 — Erstelle einen Vulnerability Report mit CVSS, betroffenen Versionen, und empfohlenen Maßnahmen' },
          { id: 'ot_6_4_5', text: 'Erstelle: OT Vulnerability Management Policy — Wie sieht ein sinnvoller Prozess aus? Triage (kritisch/hoch/mittel/niedrig), Bewertung im OT-Kontext (Safety Impact!), Entscheidungsbaum (Patch/Mitigate/Accept)' },
        ],
      },
    ],
  },

  // ===== MONAT 7: OT-MONITORING & ANGRIFFSERKENNUNG (SzA) =====
  {
    monthRange: '7',
    title: 'OT-Monitoring & Angriffserkennung (SzA)',
    weeks: [
      {
        topic: 'BSI SzA-Anforderungen verstehen',
        tasks: [
          { id: 'ot_7_1_1', text: 'Lies: BSI "Orientierungshilfe zum Einsatz von Systemen zur Angriffserkennung" (bsi.bund.de) — Pflicht seit 1. Mai 2023 für KRITIS' },
          { id: 'ot_7_1_2', text: 'Verstehe die 3 SzA-Stufen: Stufe 1 "Protokollierung" (Logs sammeln), Stufe 2 "Detektion" (Anomalien erkennen), Stufe 3 "Reaktion" (automatische Gegenmaßnahmen)' },
          { id: 'ot_7_1_3', text: 'BSI-Prüfkatalog: Wie bewertet das BSI die SzA-Umsetzung? Reifegrade 0-5 pro Bereich. KRITIS-Betreiber müssen nachweisen, dass sie mindestens Stufe 3 erreichen' },
          { id: 'ot_7_1_4', text: 'OT-spezifische SzA: In IT reichen SIEM + EDR. In OT brauchst du zusätzlich: ICS-Protocol-DPI, Anomalie-Erkennung für Modbus/S7comm/OPC-UA, Baseline-Monitoring für PLC-Programme' },
          { id: 'ot_7_1_5', text: 'Erstelle: SzA-Implementierungsplan für ein mittelständisches Unternehmen — Welche Logs? Welche Tools? Welche Alarme? Wer reagiert? Budget-Schätzung?' },
        ],
      },
      {
        topic: 'Nozomi Networks Guardian',
        tasks: [
          { id: 'ot_7_2_1', text: 'Nozomi Networks Guardian: Passiver OT-Monitoring-Sensor. DPI für 100+ OT-Protokolle. Automatische Asset-Erkennung. Anomalie-Erkennung. Vulnerability Assessment.' },
          { id: 'ot_7_2_2', text: 'Architektur: Guardian Sensor (vor Ort, an SPAN-Port) → Vantage (Cloud-Management) oder CMC (On-Premises). Wie deployed man das in einem Produktionsnetzwerk?' },
          { id: 'ot_7_2_3', text: 'Recherchiere: Nozomi Networks Partner-Programm — Wie wird man Partner? Welche Trainings gibt es? Zertifizierungen? (Das ist ein Weg um als Freelancer Nozomi-Projekte zu bekommen)' },
          { id: 'ot_7_2_4', text: 'Lies: Nozomi Networks Whitepaper "OT/IoT Security Report" — Aktuelle Bedrohungslandschaft aus Sicht eines OT-Monitoring-Anbieters' },
          { id: 'ot_7_2_5', text: 'Vergleiche: Nozomi vs Claroty vs Dragos — Stärken/Schwächen, Preismodell, Protokoll-Unterstützung, Deployment-Optionen, Kundentyp (Enterprise vs Mittelstand)' },
        ],
      },
      {
        topic: 'Claroty xDome + Dragos Platform',
        tasks: [
          { id: 'ot_7_3_1', text: 'Claroty xDome: Full-Stack CPS (Cyber-Physical Systems) Protection. Asset Discovery, Vulnerability Management, Threat Detection, Secure Access. Gartner Leader 2025' },
          { id: 'ot_7_3_2', text: 'Dragos Platform: ICS-fokussierte Threat Intelligence + Detection. Stärke: Threat Activity Groups (CHERNOVITE, ELECTRUM, KAMACITE, etc.) — Wer greift ICS an?' },
          { id: 'ot_7_3_3', text: 'Dragos WorldView: ICS Threat Intelligence Service. OT-spezifische IOCs, Vulnerability Advisories, Threat Actor Profiles. Warum braucht OT eigene Threat Intel?' },
          { id: 'ot_7_3_4', text: 'Recherchiere: Dragos "5 Critical Controls for ICS/OT": 1) ICS Incident Response, 2) Defensible Architecture, 3) ICS Visibility/Monitoring, 4) Secure Remote Access, 5) Risk-Based Vulnerability Management' },
          { id: 'ot_7_3_5', text: 'Entscheide: Wenn du EINEM Kunden EIN Tool empfehlen müsstest — welches und warum? Schreibe eine 1-seitige Empfehlung mit Begründung' },
        ],
      },
      {
        topic: 'SIEM-Integration für OT',
        tasks: [
          { id: 'ot_7_4_1', text: 'OT-Logs in SIEM: Welche Logs gibt es in OT? Firewall-Logs, Switch-Logs, Historian-Logs, HMI-Logs, Windows Event Logs von Engineering Workstations, ICS-Monitoring-Alerts' },
          { id: 'ot_7_4_2', text: 'Splunk für OT: Splunk OT Security Add-on — Modbus/DNP3/OPC-UA Logs parsen. Dashboards für OT-Sicherheit erstellen. Korrelation IT/OT-Events' },
          { id: 'ot_7_4_3', text: 'Elastic SIEM für OT: Packetbeat für ICS-Protokolle. Filebeat für OT-Gerätewarnungen. Kibana-Dashboards für OT-Security erstellen' },
          { id: 'ot_7_4_4', text: 'Use Cases erstellen: 5 SIEM-Alarme für OT: 1) Neue IP im OT-Netz, 2) Write-Befehl an PLC von unbekannter IP, 3) PLC-Programm geändert, 4) Engineering-Workstation mit Internet-Verbindung, 5) Remote-Zugriff außerhalb Wartungsfenster' },
          { id: 'ot_7_4_5', text: 'Praxisübung: Richte in einem Lab Splunk/Elastic ein. Importiere ICS-PCAPs als Logs. Erstelle ein Dashboard mit den 5 OT-spezifischen Use Cases. Screenshot für Portfolio' },
        ],
      },
    ],
  },

  // ===== MONAT 8: OT INCIDENT RESPONSE =====
  {
    monthRange: '8',
    title: 'OT Incident Response — Wenn es brennt',
    weeks: [
      {
        topic: 'IR in OT vs IT — Was ist fundamental anders?',
        tasks: [
          { id: 'ot_8_1_1', text: 'Die goldene Regel: In OT darfst du NICHT einfach Systeme isolieren/abschalten. Eine Raffinerie abschalten = Explosion möglich. Ein Wasserwerk stoppen = Stadt ohne Wasser. SAFETY FIRST, immer.' },
          { id: 'ot_8_1_2', text: 'OT-IR-Phasen: 1) Erkennung, 2) Eskalation (OT-Team + Safety-Ingenieur!), 3) Eindämmung (ohne Produktionsstopp), 4) Eradikation, 5) Recovery, 6) Lessons Learned' },
          { id: 'ot_8_1_3', text: 'Lies: NIST SP 800-82 Rev 3 Kapitel 6 "Incident Response" — OT-spezifische IR-Empfehlungen' },
          { id: 'ot_8_1_4', text: 'Lies: ICS-CERT "Recommended Practice: Developing an Industrial Control Systems Cybersecurity Incident Response Capability" (cisa.gov)' },
          { id: 'ot_8_1_5', text: 'Erstelle: OT-IR-Playbook-Vorlage — Rollen (IR-Lead, OT-Engineer, Safety, Management, BSI-Melder), Kommunikationskette, Eskalationsstufen, Entscheidungsbaum' },
        ],
      },
      {
        topic: 'ICS-spezifische Malware verstehen',
        tasks: [
          { id: 'ot_8_2_1', text: 'Stuxnet (2010): Der erste ICS-Wurm. Zielte auf Siemens S7-300 PLCs in iranischen Urananreicherungsanlagen. Manipulierte Zentrifugen-Drehzahlen. Verstehe den Angriffsweg: USB → Windows → WinCC → S7-300' },
          { id: 'ot_8_2_2', text: 'Industroyer/CrashOverride (2016): Angriff auf ukrainisches Stromnetz. Spricht direkt IEC 61850, IEC 104, OPC DA. Schaltete Umspannwerke ab → 225.000 Menschen ohne Strom' },
          { id: 'ot_8_2_3', text: 'TRITON/TRISIS (2017): Zielte auf Safety Instrumented Systems (SIS) — Schneider Triconex. Hätte physische Zerstörung/Menschenleben kosten können. Der gefährlichste ICS-Angriff' },
          { id: 'ot_8_2_4', text: 'Pipedream/INCONTROLLER (2022): Modular, zielt auf Schneider + OMRON PLCs + OPC-UA. Kann PLCs umprogrammieren, stoppen, manipulieren. Von US-Gov abgefangen BEVOR eingesetzt' },
          { id: 'ot_8_2_5', text: 'FrostyGoop (2024): Erster Angriff der Modbus TCP direkt nutzt. Angriff auf ukrainische Heizungsanlage im Winter. 600 Gebäude ohne Heizung bei -20°C. Lies: Dragos Report dazu' },
        ],
      },
      {
        topic: 'Isolierung ohne Produktionsstillstand',
        tasks: [
          { id: 'ot_8_3_1', text: 'Technik: Micro-Segmentierung — Verdächtige Zone isolieren durch dynamische Firewall-Regeln, OHNE die Zone komplett abzuschneiden. Nur verdächtige Flows blockieren' },
          { id: 'ot_8_3_2', text: 'Technik: Engineering Workstation isolieren — Die häufigste Eintrittspforte. USB-Stick → EWS → PLC. EWS vom Netz nehmen, PLC läuft weiter im "Run"-Modus' },
          { id: 'ot_8_3_3', text: 'Technik: Backup-Überprüfung — PLC-Programme aus Backup vs aktueller Stand vergleichen. Wurde das PLC-Programm manipuliert? Tools: Siemens SIMATIC, TIA Portal Project Compare' },
          { id: 'ot_8_3_4', text: 'Praxisübung: Simuliere einen Vorfall: "Unbekannte IP sendet Modbus-Writes an PLC-Zone". Durchlaufe dein IR-Playbook Schritt für Schritt. Dokumentiere jede Entscheidung' },
          { id: 'ot_8_3_5', text: 'Kommunikation: Wie kommunizierst du mit dem Anlagen-Operator? Sie verstehen kein "Lateral Movement". Sage: "Jemand versucht die Steuerung der Pumpe X zu übernehmen. Wir blockieren den Zugriff."' },
        ],
      },
      {
        topic: 'BSI-Meldepflichten + Forensik-Report',
        tasks: [
          { id: 'ot_8_4_1', text: 'NIS2 Meldepflichten: §32 — Erstmeldung innerhalb 24h ("Was ist passiert?"), Update innerhalb 72h ("Wie schlimm?"), Abschlussbericht innerhalb 1 Monat' },
          { id: 'ot_8_4_2', text: 'BSI Meldeportal: meldestelle.bsi.bund.de — Wie meldet man? Welche Informationen werden verlangt? Übe eine Probemeldung (nicht absenden!)' },
          { id: 'ot_8_4_3', text: 'OT-Forensik Besonderheiten: PLCs haben keine Standard-Logs. Historian-Daten = dein bester Freund (Prozessdaten mit Zeitstempel). Netzwerk-Captures > Disk-Forensik in OT' },
          { id: 'ot_8_4_4', text: 'Erstelle: Incident Report Vorlage für OT — Executive Summary, Timeline, betroffene Systeme (mit Purdue-Level), Angriffsvektor, Impact (Safety/Produktion/Daten), Maßnahmen, Empfehlungen' },
          { id: 'ot_8_4_5', text: 'Lessons Learned: Nach jedem Vorfall — Was hat funktioniert? Was nicht? Welche Segmentierung hätte den Angriff verhindert? Welche Monitoring-Regel hat gefehlt? Update das CSMS' },
        ],
      },
    ],
  },

  // ===== MONAT 9: HANDS-ON LABS — GRFICSv2 & CONPOT =====
  {
    monthRange: '9',
    title: 'Hands-On Labs — ICS-Umgebungen selbst aufbauen',
    weeks: [
      {
        topic: 'GRFICSv2 Lab Setup + Modbus-Interaktion',
        tasks: [
          { id: 'ot_9_1_1', text: 'GRFICSv2 installieren: github.com/Fortiphyd/GRFICSv2 — Virtual ICS mit OpenPLC, ScadaBR, simuliertem Chemischen Prozess. Braucht VirtualBox/VMware' },
          { id: 'ot_9_1_2', text: 'Netzwerk verstehen: GRFICSv2 hat 3 Netze — Corporate (IT), DMZ, Control (OT). Identifiziere: HMI, PLC, Engineering Workstation, Historian' },
          { id: 'ot_9_1_3', text: 'Modbus-Registrar lesen: Verbinde mbpoll mit der simulierten PLC. Lese Holding Registers aus — Was bedeuten die Werte? (Temperatur, Druck, Ventilstellung)' },
          { id: 'ot_9_1_4', text: 'Angriff simulieren: Schreibe mit pymodbus einen neuen Wert in ein Holding Register — Was passiert im simulierten Prozess? Ändert sich die Temperatur/der Druck?' },
          { id: 'ot_9_1_5', text: 'Verteidigung: Setze eine Firewall-Regel die Modbus-Writes nur von der Engineering Workstation erlaubt. Teste: Funktioniert dein Angriff noch?' },
        ],
      },
      {
        topic: 'Conpot Honeypot aufsetzen + analysieren',
        tasks: [
          { id: 'ot_9_2_1', text: 'Conpot installieren: github.com/mushorg/conpot — ICS/SCADA Honeypot. Simuliert Siemens S7-200, Guardian AST (Tanküberwachung), Modbus, SNMP, HTTP' },
          { id: 'ot_9_2_2', text: 'Conpot konfigurieren: templates/default/ — Passe den Honeypot an eine "realistische" Anlage an (z.B. Wasseraufbereitung oder Tankstelle)' },
          { id: 'ot_9_2_3', text: 'Scanne deinen Conpot mit nmap ICS-Scripts: Wie sieht er aus? Würde ein Angreifer ihn für echt halten? Was verrät ihn als Honeypot?' },
          { id: 'ot_9_2_4', text: 'Analyse: Wenn du Conpot am Internet exponierst (NUR in kontrollierter Umgebung!) — Wer scannt? Welche Modbus-Befehle werden gesendet? Welche Shodan-Bots findest du?' },
          { id: 'ot_9_2_5', text: 'Report: Schreibe einen "OT Honeypot Analysis Report" — Deployment, Findings, Angreifer-Verhalten, Empfehlungen für echte Netzwerke' },
        ],
      },
      {
        topic: 'OpenPLC + S7comm Simulation',
        tasks: [
          { id: 'ot_9_3_1', text: 'OpenPLC installieren: openplcproject.com — Open-Source SPS-Runtime. Läuft auf Linux/Raspberry Pi. Programmierbar mit IEC 61131-3 (Ladder Diagram, Structured Text)' },
          { id: 'ot_9_3_2', text: 'Erstelle ein Ladder-Diagram-Programm: Einfache Pumpensteuerung — Wenn Sensor > Schwellwert → Pumpe AN, sonst AUS. Lade es auf OpenPLC' },
          { id: 'ot_9_3_3', text: 'ScadaBR: Open-Source SCADA/HMI. Verbinde ScadaBR mit OpenPLC über Modbus. Erstelle ein Dashboard das deine Pumpensteuerung visualisiert' },
          { id: 'ot_9_3_4', text: 'Snap7: Python-Bibliothek für S7comm. Installiere und verbinde mit einem S7-Simulator (snap7 enthält einen). Lese DB (Datenbausteine), lese/schreibe Merker, lese Inputs/Outputs' },
          { id: 'ot_9_3_5', text: 'Capstone Lab: Baue ein komplettes Mini-ICS: OpenPLC (Steuerung) + ScadaBR (HMI) + Wireshark (Monitoring). Führe einen Angriff durch. Erkenne ihn mit deinem Monitoring. Dokumentiere alles.' },
        ],
      },
      {
        topic: 'pymodbus Scripting + Fortgeschrittene Labs',
        tasks: [
          { id: 'ot_9_4_1', text: 'pymodbus Masterclass: Schreibe einen Modbus-Scanner der alle aktiven Unit IDs (1-247) findet und für jede die Holding Registers ausliest' },
          { id: 'ot_9_4_2', text: 'Schreibe: Modbus-Fuzzer mit pymodbus — Sende ungültige Function Codes, zu große Pakete, falsche Unit IDs. Wie reagiert die PLC? (NUR im Lab!)' },
          { id: 'ot_9_4_3', text: 'Schreibe: Modbus Traffic Replayer — Capture normalen Traffic mit Scapy, replay ihn später. Verstehe: Warum ist Replay ein Problem bei Modbus? (Kein Sequenznummer/Nonce)' },
          { id: 'ot_9_4_4', text: 'Schreibe: OT-Anomalie-Detektor — Python-Script das Modbus-Traffic überwacht und alarmiert bei: neuer Source-IP, Write-Befehl, ungewöhnlichem Register-Zugriff' },
          { id: 'ot_9_4_5', text: 'Portfolio: Alle Lab-Scripts auf GitHub veröffentlichen (OHNE destruktive Payloads). README mit Erklärung und Screenshots. Das ist dein Beweis dass du hands-on kannst.' },
        ],
      },
    ],
  },

  // ===== MONAT 10: OT PENETRATION TESTING =====
  {
    monthRange: '10',
    title: 'OT Penetration Testing — Kontrolliert angreifen',
    weeks: [
      {
        topic: 'OT Pentest Methodik',
        tasks: [
          { id: 'ot_10_1_1', text: 'OT-Pentest ≠ IT-Pentest: Kein aktives Scanning in Produktion. Kein Exploit gegen laufende PLCs. Kein DoS. Alles abgesprochen, zeitlich begrenzt, mit Rollback-Plan und Operator im Raum' },
          { id: 'ot_10_1_2', text: 'IEC 62443-basierte Pentest-Methodik: 1) Scope definieren (welche Zonen), 2) Passive Reconnaissance, 3) Kontrollierte aktive Tests (nur im Wartungsfenster), 4) Findings nach FR 1-7 kategorisieren' },
          { id: 'ot_10_1_3', text: 'Rules of Engagement für OT: Schriftlich! Safety-Grenzen definieren. Notfall-Kontakt. Sofortiger Abbruch bei Anomalie. Kein Test an Safety-Systemen (SIS) ohne Safety-Engineer' },
          { id: 'ot_10_1_4', text: 'Lies: PTES (Penetration Testing Execution Standard) ICS-Erweiterung + OWASP ICS Security Testing Guide' },
          { id: 'ot_10_1_5', text: 'Erstelle: OT-Pentest-Angebots-Template — Scope, Methodik, Ausschlüsse, Zeitplan, Deliverables, Haftung, Notfall-Kontakte' },
        ],
      },
      {
        topic: 'PLC Discovery & Enumeration',
        tasks: [
          { id: 'ot_10_2_1', text: 'Passive Discovery: ARP-Tabelle des OT-Switches auslesen. MAC-OUI-Lookup (Siemens: 00:0E:8C, Rockwell: 00:00:BC, Schneider: 00:80:F4). Jede PLC verrät ihren Hersteller durch die MAC' },
          { id: 'ot_10_2_2', text: 'Protokoll-spezifische Enumeration: Modbus Unit ID Scan (1-247), S7comm CPU Info Request, EtherNet/IP List Identity, OPC-UA GetEndpoints, BACnet Who-Is' },
          { id: 'ot_10_2_3', text: 'Firmware-Version identifizieren: Über S7comm (s7-info) oder EtherNet/IP (enip-info) die genaue Firmware lesen → CVE-Datenbank prüfen → Bekannte Schwachstellen?' },
          { id: 'ot_10_2_4', text: 'Netzwerk-Topologie rekonstruieren: Aus passivem Traffic + Switch-Konfiguration die Purdue-Level-Zuordnung ableiten. Wo fehlt Segmentierung?' },
          { id: 'ot_10_2_5', text: 'Lab-Übung: Führe eine vollständige Enumeration in GRFICSv2 durch — Dokumentiere jedes Gerät, IP, Firmware, offene Ports, Protokolle, Schwachstellen' },
        ],
      },
      {
        topic: 'SCADA-Angriffsvektoren',
        tasks: [
          { id: 'ot_10_3_1', text: 'Man-in-the-Middle auf Modbus: Mit Ettercap/Bettercap ARP-Spoofing → Modbus-Traffic abfangen → Werte manipulieren (Operator sieht "alles OK" während PLC andere Befehle bekommt)' },
          { id: 'ot_10_3_2', text: 'Replay-Angriff: Modbus hat keine Sequenznummern. Capture einen "Ventil öffnen"-Befehl → Replay → Ventil öffnet sich erneut. Demonstriere warum Modbus ohne Monitoring gefährlich ist' },
          { id: 'ot_10_3_3', text: 'PLC-Programm-Manipulation: In GRFICSv2: Lade das PLC-Programm herunter, modifiziere die Logik (z.B. Schwellwert ändern), lade es wieder hoch. Der Operator merkt nichts auf dem HMI' },
          { id: 'ot_10_3_4', text: 'HMI-Angriff: Viele HMIs laufen auf Windows mit Webbrowser. XSS/SQL-Injection in Web-HMIs testen (NUR im Lab). VNC/RDP ohne Passwort auf HMI-Terminals suchen' },
          { id: 'ot_10_3_5', text: 'IT-zu-OT Pivoting: Beginne in der IT-Zone → finde den Jump-Host/VPN → überquere die DMZ → Zugriff auf Engineering Workstation → Zugriff auf PLC. Dokumentiere jeden Schritt' },
        ],
      },
      {
        topic: 'OT-Pentest Report Writing',
        tasks: [
          { id: 'ot_10_4_1', text: 'Report-Struktur: Executive Summary (für GF, 1 Seite), Technical Findings (für IT/OT-Team, detailliert), Risk Matrix (Eintrittswahrscheinlichkeit × Impact, mit Safety-Dimension)' },
          { id: 'ot_10_4_2', text: 'Finding-Format: Titel, CVSS + OT-Safety-Rating, Beschreibung, Beweis (Screenshot/PCAP), betroffene Purdue-Level, Risiko für Produktion, Risiko für Safety, Empfehlung, Priorität' },
          { id: 'ot_10_4_3', text: 'OT-spezifische Empfehlungen: Nicht einfach "Patch installieren". Sondern: "Wartungsfenster planen, Backup erstellen, Patch im Staging testen, Operator informieren, nach Patch OT-Funktion verifizieren"' },
          { id: 'ot_10_4_4', text: 'Praxisübung: Schreibe einen vollständigen OT-Pentest-Report für dein GRFICSv2-Lab — Mindestens 5 Findings, priorisiert, mit konkreten Empfehlungen' },
          { id: 'ot_10_4_5', text: 'Portfolio: Anonymisierter Pentest-Report (Lab-basiert) auf deine Website/GitHub — Zeigt Kunden dass du professionell dokumentierst' },
        ],
      },
    ],
  },

  // ===== MONAT 11: VENDOR-SPEZIFISCH — SIEMENS, ROCKWELL, SCHNEIDER =====
  {
    monthRange: '11',
    title: 'Vendor Deep-Dive — Siemens, Rockwell, Schneider',
    weeks: [
      {
        topic: 'Siemens S7 + TIA Portal',
        tasks: [
          { id: 'ot_11_1_1', text: 'Siemens S7-Produktlinie: S7-300 (Legacy, ABGEKÜNDIGT), S7-400 (Legacy, High-End), S7-1200 (Compact), S7-1500 (Modern, Flaggschiff). Kenne die Unterschiede und Security-Features jeder Generation' },
          { id: 'ot_11_1_2', text: 'TIA Portal (Totally Integrated Automation): Siemens Engineering-Software. Verstehe: Projekt-Struktur, Programm-Blöcke (OB, FC, FB, DB), Online/Offline-Vergleich, Passwortschutz-Optionen' },
          { id: 'ot_11_1_3', text: 'S7-1500 Security Features: Know-Protection (Bausteinschutz), Access Protection (CPU-Passwort-Level 1-4), Secure Communication (TLS für S7comm-Plus), Integrity Check' },
          { id: 'ot_11_1_4', text: 'Siemens ProductCERT: cert-portal.siemens.com — Siemens eigenes Security Advisory Portal. Abonnieren! Monatliche Patches ("Patch Tuesday" für Siemens)' },
          { id: 'ot_11_1_5', text: 'Recherchiere: Siemens SINEC NMS (Network Management System) — Wie Siemens OT-Netzwerk-Management und Security kombiniert. Ist das eine Alternative zu Nozomi/Claroty?' },
        ],
      },
      {
        topic: 'Allen-Bradley / Rockwell Automation',
        tasks: [
          { id: 'ot_11_2_1', text: 'Rockwell Produktlinie: MicroLogix (Legacy), CompactLogix, ControlLogix (High-End). Kommunikation über EtherNet/IP + CIP (Common Industrial Protocol)' },
          { id: 'ot_11_2_2', text: 'Studio 5000 / RSLogix: Rockwells Engineering-Software. Programmierung in Ladder Diagram, Structured Text, Function Block. Projekt-Upload/Download verstehen' },
          { id: 'ot_11_2_3', text: 'Rockwell Security: CIP Security (TLS + DTLS für EtherNet/IP), FactoryTalk Security (User Auth + Audit Trail), Firmware Signature Verification' },
          { id: 'ot_11_2_4', text: 'Schwachstellen: Rockwell hat historisch viele CVEs (ControlLogix Remote Code Execution, RSLinx Buffer Overflow). Recherchiere aktuelle ICS-CERT Advisories für Rockwell' },
          { id: 'ot_11_2_5', text: 'Nordamerika-Dominanz: Rockwell = #1 in USA/Kanada. Siemens = #1 in Europa. Warum ist das relevant? Deutsche Firmen mit US-Werken haben BEIDE Welten → Du brauchst beide Skills' },
        ],
      },
      {
        topic: 'Schneider Electric + Safety Systems',
        tasks: [
          { id: 'ot_11_3_1', text: 'Schneider Produktlinie: Modicon M340, M580 (PLC), EcoStruxure (Plattform), Triconex (SAFETY System — das Ziel von TRITON-Malware!)' },
          { id: 'ot_11_3_2', text: 'Triconex Safety System: Safety Instrumented System (SIS). Wenn die PLC versagt, verhindert Triconex physische Katastrophen (Explosion, Überdruck). TRITON-Malware zielte darauf — verstehe WARUM das so gefährlich war' },
          { id: 'ot_11_3_3', text: 'Verstehe: Safety vs Security — IEC 61508/61511 (Safety) + IEC 62443 (Security). Safety schützt Menschen vor der Maschine. Security schützt die Maschine vor Angreifern. BEIDES ist nötig' },
          { id: 'ot_11_3_4', text: 'Schneider Cybersecurity Services: schneider-electric.com/cybersecurity — Eigene Consulting-Praxis. Wettbewerber für dich? Oder Partner? (Schneider empfiehlt externe Auditoren)' },
          { id: 'ot_11_3_5', text: 'SIL (Safety Integrity Level): SIL 1 (niedrig) bis SIL 4 (höchst). Chemie/Öl&Gas brauchen SIL 3-4. Verstehe: Ein Cyberangriff der das SIL-Rating kompromittiert = sofortige Anlagenstilllegung' },
        ],
      },
      {
        topic: 'ABB, Honeywell, Emerson + Zusammenfassung',
        tasks: [
          { id: 'ot_11_4_1', text: 'ABB: Stark in Energieerzeugung + Robotik. ABB Ability (Digital Platform). ABB 800xA (DCS). ABB hat eigene Cybersecurity-Services (abb.com/cybersecurity)' },
          { id: 'ot_11_4_2', text: 'Honeywell: Stark in Öl&Gas + Gebäude. Experion PKS (DCS). Honeywell Forge Cybersecurity. Honeywell Secure Connection (Remote Access)' },
          { id: 'ot_11_4_3', text: 'Emerson: Stark in Prozessindustrie. DeltaV DCS. Emerson Cybersecurity Services. AMS Device Manager für Asset-Monitoring' },
          { id: 'ot_11_4_4', text: 'Erstelle: Vendor-Vergleichstabelle — Siemens vs Rockwell vs Schneider vs ABB vs Honeywell: Stärken, Schwächen, typische Branchen, Security-Features, Kommunikationsprotokolle, Marktanteil DE' },
          { id: 'ot_11_4_5', text: 'Entscheide: Auf welchen 2 Vendors fokussierst du dich? (Empfehlung für DE: Siemens + Schneider = 70%+ Marktanteil in DACH). Plane entsprechende Trainings/Zertifizierungen' },
        ],
      },
    ],
  },

  // ===== MONAT 12: OT-CONSULTING BUSINESS AUFBAUEN =====
  {
    monthRange: '12',
    title: 'OT-Security Business aufbauen — Vom Lerner zum Experten',
    weeks: [
      {
        topic: 'GICSP-Prüfungsvorbereitung',
        tasks: [
          { id: 'ot_12_1_1', text: 'GICSP (GIAC Global Industrial Cyber Security Professional): DER Gold-Standard für OT-Security. Prüfung: 115 Fragen, 3 Stunden, Open-Book (eigene Notizen erlaubt)' },
          { id: 'ot_12_1_2', text: 'GICSP-Domains: IT/OT Convergence, ICS Components, ICS Protocols, ICS Attacks, ICS Security Architecture, ICS Risk Management, ICS Incident Response' },
          { id: 'ot_12_1_3', text: 'Vorbereitung: SANS ICS515 "ICS Visibility, Detection, and Response" ($8,925 USA / ~€8.500 EU). Alternative: Selbststudium mit NIST 800-82, IEC 62443, und deinen 11 Monate OT-Wissen' },
          { id: 'ot_12_1_4', text: 'GICSP-Index erstellen: Weil Open-Book — erstelle einen perfekten Index deiner Materialien (alphabetisch nach Thema, mit Seitenzahlen). DAS entscheidet über Bestehen' },
          { id: 'ot_12_1_5', text: 'Prüfung buchen: giac.org — ~$949 Prüfungsgebühr (ohne Kurs). 2 Übungstests inklusive. Zeitplan: 4 Wochen intensive Vorbereitung, dann Prüfung' },
        ],
      },
      {
        topic: 'Zertifizierungen + Weiterbildungen',
        tasks: [
          { id: 'ot_12_2_1', text: 'TÜV NIS2-Experte: 4 Tage, ~€1.400, TÜV NORD CERT Zertifikat. 75-Minuten-Prüfung, 40 MC-Fragen. Sofort buchbar. Guter Einstieg für NIS2-Beratung' },
          { id: 'ot_12_2_2', text: '§8a Prüfverfahrenskompetenz: 3 Tage, ~€1.590, BSI-anerkannt. Pflicht wenn du bei KRITIS-Audits mitwirken willst. Buche bei TÜV oder ähnlichem Anbieter' },
          { id: 'ot_12_2_3', text: 'ISA/IEC 62443 Certificate Program: 4 Kurse → "ISA/IEC 62443 Cybersecurity Expert". IC32 (Using 62443), IC33 (System Design), IC34 (Zone/Conduit), IC37 (Maintenance). Jeweils 2-3 Tage, ~€1.500-2.000' },
          { id: 'ot_12_2_4', text: 'Vendor-Trainings: Nozomi Networks Certified Engineer, Claroty Certified Analyst, Dragos Platform Training — Jeder Vendor bietet Partner-Trainings. Wähle 1 und zertifiziere dich' },
          { id: 'ot_12_2_5', text: 'Zertifizierungsplan erstellen: Monat 12-13: TÜV NIS2 + §8a. Monat 14-16: ISA IC32/IC33. Monat 17-18: GICSP. Monat 19-20: Vendor-Zertifizierung. Budget: ~€15.000-20.000 total' },
        ],
      },
      {
        topic: 'Kundenakquise für KRITIS/NIS2',
        tasks: [
          { id: 'ot_12_3_1', text: 'Zielgruppe definieren: Mittelstand (50-250 MA) in Sektoren: Maschinenbau, Chemie, Wasser/Abwasser, Stadtwerke, Lebensmittel. Die haben NIS2-Pflicht aber KEIN internes OT-Security-Team' },
          { id: 'ot_12_3_2', text: 'Akquise-Kanäle: 1) IHK-Veranstaltungen zu NIS2, 2) Branchenverbände (VDI, VDMA, ZVEI), 3) LinkedIn-Beiträge zu OT-Security, 4) BSI-Partnernetzwerk, 5) Stadtwerke direkt kontaktieren' },
          { id: 'ot_12_3_3', text: 'Erster Kontakt: "Sind Sie NIS2-betroffen? Wir bieten eine kostenlose 30-Minuten-Erstberatung." → Betroffenheitsanalyse als Türöffner → Gap-Analyse als erstes Projekt (€8.000-20.000)' },
          { id: 'ot_12_3_4', text: 'Referenzen aufbauen: Die ersten 3 Kunden unter Marktpreis (50% Rabatt) nehmen — dafür Referenzerlaubnis + Case Study. BSI CyberRisikoCheck braucht 3 Referenzen' },
          { id: 'ot_12_3_5', text: 'Netzwerk: Besuche die it-sa (Nürnberg, jährlich), SANS ICS Summit, S4 Conference, Hannover Messe (Industrie). Dort triffst du Kunden UND Partner' },
        ],
      },
      {
        topic: 'Dein OT-Security-Angebot strukturieren',
        tasks: [
          { id: 'ot_12_4_1', text: 'Service-Katalog erstellen: 1) NIS2-Betroffenheitsanalyse (kostenlos, Türöffner), 2) NIS2 Gap-Analyse (€8-20K), 3) GF-Haftungsschulung (€2-5K), 4) OT Asset Inventory (€5-15K), 5) IEC 62443 Netzwerk-Segmentierung (€15-50K)' },
          { id: 'ot_12_4_2', text: 'Recurring Revenue planen: Managed OT-Monitoring (€2-5K/Monat), IR-Retainer (€1.5-4K/Monat), jährliche Re-Assessments, GF-Schulungs-Updates. DAS ist der echte Firmenwert' },
          { id: 'ot_12_4_3', text: 'Partnerschaften aufbauen: Nozomi/Claroty/Dragos Reseller-Vertrag → Du verkaufst deren Monitoring + deine Dienstleistung drumrum. Marge auf Hardware/Software + Consulting-Umsatz' },
          { id: 'ot_12_4_4', text: 'Team aufbauen: Ab Kunde #5 brauchst du Unterstützung. Junior OT-Analyst (du bildest aus), Vertrieb (IHK/Branchenkenntnis), Admin/Buchhaltung. Ziel: 3-5 Leute in Jahr 3' },
          { id: 'ot_12_4_5', text: 'Businessplan finalisieren: Revenue-Ziel Jahr 1: €100-200K, Jahr 2: €300-500K, Jahr 3: €500K-1M. Basierend auf 5-10 Mittelstandskunden × €20-50K Erstprojekt + Recurring' },
        ],
      },
    ],
  },
];

// Hilfsfunktion: OT-Monat für aktuellen Curriculum-Monat finden
export function getOTMonthForCurriculumMonth(monthIndex: number): OTMonth | null {
  // Direct match
  const direct = OT_CURRICULUM.find(m => m.monthRange === String(monthIndex));
  if (direct) return direct;

  // For months > 12 without specific OT data, cycle through month 10-12 content
  // (Advanced OT content keeps being relevant)
  if (monthIndex > 12) {
    const cycleMonth = ((monthIndex - 10) % 3) + 10;
    return OT_CURRICULUM.find(m => m.monthRange === String(cycleMonth)) || null;
  }

  return null;
}
