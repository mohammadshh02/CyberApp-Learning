# MONAT 4 — DIGITAL FORENSICS: Disk, Memory, Logs, Timelines (Intelligence-Grade)

## WARUM DIESES LEVEL?

Standard-Forensik = Autopsy aufmachen und rumscrollen. Das kann jeder nach einem SANS-Kurs.

**Intelligence-Grade Forensik** = Du analysierst ein Gerät das von einem APT kompromittiert wurde. Du findest Spuren von Pegasus auf einem iPhone. Du rekonstruierst eine komplette Timeline eines Angriffs den kein AV erkannt hat. Du extrahierst verschlüsselte Kommunikation aus Memory-Dumps. Das ist das Level von Mandiant FLARE, Kaspersky GReAT, Citizen Lab.

---

## Monats-Ziele (nicht verhandelbar)
- [ ] Volatility 3: Alle wichtigen Plugins beherrscht + eigenes Plugin-Script
- [ ] KAPE: Artifact Collection + Processing Pipeline aufgebaut
- [ ] Eric Zimmerman Tools: Komplettes Windows-Forensik-Toolkit beherrscht
- [ ] Timeline-Analyse: Super-Timeline mit plaso/log2timeline erstellt
- [ ] Malware-Triage: 5 echte Malware-Samples analysiert (von MalwareBazaar)
- [ ] CyberDefenders: 5+ Challenges gelöst
- [ ] Erste YARA-Regeln geschrieben
- [ ] Mobile Forensik: MVT (Mobile Verification Toolkit) für Pegasus-Detection getestet
- [ ] Anti-Forensik: Verstehen wie Angreifer Spuren verwischen
- [ ] Blog: 2+ detaillierte Forensik-Write-ups

---

## DIE QUELLEN DIE KEINER KENNT

### Wo Intelligence-Grade Forensik-Wissen wirklich herkommt

**Primärquellen (direkt von den Forschern):**
- **Citizen Lab (citizenlab.ca)** — University of Toronto. Die haben Pegasus entdeckt und dokumentiert. Jeder Report ist eine Masterclass in Mobile Forensik.
- **Google TAG (Threat Analysis Group)** Blog — blog.google/threat-analysis-group — Tracking von State-Sponsored Actors
- **Google Project Zero Blog** — googleprojectzero.blogspot.com — Die tiefsten technischen Analysen von 0-Days
- **Amnesty Tech** — amnesty.org/en/tech — Haben MVT entwickelt. Reports über staatliche Überwachung
- **Microsoft MSTIC Blog** — microsoft.com/en-us/security/blog — Nation-State Actor Tracking
- **Mandiant (Google Cloud) Blog** — mandiant.com/resources/blog — APT-Reports, Forensik-Methodik
- **Kaspersky Securelist** — securelist.com — Tiefste APT-Analysen. GReAT-Team ist unübertroffen
- **ESET WeLiveSecurity** — welivesecurity.com — Exzellente APT-Forschung (besonders Osteuropa)
- **Volexity Blog** — volexity.com/blog — Memory Forensics Pioniere. Haben SolarWinds-Angriff entdeckt.
- **CrowdStrike Blog** — crowdstrike.com/blog — Threat Actor Tracking, OverWatch Reports

**Akademische Quellen:**
- **DFRWS (Digital Forensic Research Workshop)** — dfrws.org — Papers und Challenges. THE akademische Forensik-Community
- **USENIX Security Proceedings** — usenix.org/conferences — Beste akademische Security-Papers
- **IEEE S&P Proceedings** — Forensik-relevante Forschung auf höchstem Niveau
- **electrospaces.net** — Niederländischer Forscher der NSA/GCHQ-Dokumente technisch analysiert

**Leaked/Declassified Documents:**
- **Snowden-Archiv (The Intercept)** — theintercept.com/snowden-sidtoday — NSA-Interna
- **Vault 7 (WikiLeaks)** — CIA Hacking-Tools Documentation
- **Shadow Brokers Leaks** — NSA Exploit-Tools (EternalBlue etc.)
- **FinFisher/FinSpy Leaks (2014)** — Surveillance-Software Dokumentation
- **Hacking Team Leak (2015)** — 400GB interner Daten eines Spyware-Anbieters

**Telegram/Discord/Communities:**
- **vx-underground.org** — Größtes Malware-Archiv + Papers + Community
- **MalwareBazaar (bazaar.abuse.ch)** — Malware-Samples tagbar nach Familie
- **any.run** — Interaktive Sandbox, du kannst anderen Analysen zuschauen
- **DFIR Discord Servers** — 13Cubed Community, SANS DFIR Community

---

## WOCHE 13 — ADVANCED MEMORY FORENSICS

### Montag (Tag 85) — Volatility 3 Mastery

**06:30–08:30 | DEEP TECHNICAL: Volatility 3 Deep Dive**

Nicht nur Plugins ausführen — VERSTEHE was sie tun:

```python
# Volatility 3 Essentials — Was jedes Plugin wirklich tut

# 1. PROZESSE
# windows.pslist — Durchläuft die EPROCESS Doppelt-Verkettete Liste
# Schwäche: Rootkits können sich aus der Liste aushängen (DKOM)
# Gegenmaßnahme: windows.psscan — Scannt POOL_TAGS im Speicher
# → Findet auch versteckte Prozesse die sich aus der Liste entfernt haben

# 2. NETZWERK
# windows.netscan — Scannt nach _TCP_ENDPOINT und _UDP_ENDPOINT Strukturen
# Findet: Offene Verbindungen, Listening Ports, auch geschlossene
# → Schlüssel für C2-Erkennung

# 3. CODE INJECTION
# windows.malfind — Sucht nach:
#   - Memory Regions mit PAGE_EXECUTE_READWRITE (RWX)
#   - Sections ohne zugeordnete Datei
#   - Bekannte Shellcode-Patterns (MZ Header in injected regions)
# → DAS Schlüssel-Plugin für Malware-Erkennung

# 4. REGISTRY
# windows.registry.printkey — Registry aus Memory extrahieren
# Warum aus Memory statt von Disk?
# → Memory hat den AKTUELLEN Zustand, Disk kann manipuliert sein
# → Malware ändert oft Registry nur im Speicher

# 5. KOMMANDOZEILEN
# windows.cmdline — Zeigt Commandline-Argumente aller Prozesse
# → Erkennt verdächtige PowerShell-Commands, Encoded Scripts

# ADVANCED: Eigenes Volatility-Script
"""
Aufgabe: Schreibe ein Python-Script das Volatility-Output parsed
und automatisch verdächtige Indikatoren flaggt:
- Prozesse mit verdächtigen Eltern (svchost.exe spawnt cmd.exe)
- Ungewöhnliche Netzwerkverbindungen (hohe Ports, bekannte C2-Ports)
- RWX Memory Regions
- Prozesse die von /tmp oder /Users/*/Downloads laufen
"""
import subprocess
import json
import re

class MemoryAnalyzer:
    def __init__(self, memory_dump):
        self.dump = memory_dump
        self.alerts = []

    def run_plugin(self, plugin_name):
        cmd = f"python3 vol.py -f {self.dump} {plugin_name} --output json"
        result = subprocess.run(cmd.split(), capture_output=True, text=True)
        return json.loads(result.stdout) if result.stdout else []

    def check_suspicious_parents(self):
        """Prüfe Parent-Child-Beziehungen."""
        suspicious_combos = {
            'svchost.exe': ['cmd.exe', 'powershell.exe', 'wscript.exe'],
            'explorer.exe': ['mshta.exe', 'regsvr32.exe'],
            'winword.exe': ['cmd.exe', 'powershell.exe', 'certutil.exe'],
            'excel.exe': ['cmd.exe', 'powershell.exe'],
        }
        processes = self.run_plugin('windows.pstree')
        for proc in processes:
            parent = proc.get('ParentImageFileName', '').lower()
            child = proc.get('ImageFileName', '').lower()
            if parent in suspicious_combos:
                if child in suspicious_combos[parent]:
                    self.alerts.append({
                        'severity': 'HIGH',
                        'type': 'Suspicious Parent-Child',
                        'detail': f"{parent} -> {child} (PID: {proc.get('PID')})"
                    })

    def check_network_connections(self):
        """Prüfe Netzwerkverbindungen auf C2-Indikatoren."""
        suspicious_ports = [4444, 5555, 8080, 8443, 1337, 31337, 6667]
        connections = self.run_plugin('windows.netscan')
        for conn in connections:
            port = conn.get('ForeignPort', 0)
            if port in suspicious_ports:
                self.alerts.append({
                    'severity': 'MEDIUM',
                    'type': 'Suspicious Port',
                    'detail': f"Connection to port {port}: {conn}"
                })

    def generate_report(self):
        print(f"\n{'='*60}")
        print(f"MEMORY FORENSICS ALERT REPORT")
        print(f"Image: {self.dump}")
        print(f"Alerts: {len(self.alerts)}")
        print(f"{'='*60}\n")
        for alert in sorted(self.alerts, key=lambda x: x['severity']):
            print(f"[{alert['severity']}] {alert['type']}: {alert['detail']}")
```

**09:00–10:30 | INTELLIGENCE: APT-Tracking lernen**
- MITRE ATT&CK Framework (attack.mitre.org) — Das ist die Sprache die JEDER in der Branche spricht
- Lerne die Taktiken: Initial Access → Execution → Persistence → Privilege Escalation → Defense Evasion → Credential Access → Discovery → Lateral Movement → Collection → C2 → Exfiltration
- Studiere 3 APT-Gruppen im Detail:
  - **APT28 (Fancy Bear / Forest Blizzard)** — Russlands GRU. Relevant für Deutschland
  - **APT29 (Cozy Bear / Midnight Blizzard)** — Russlands SVR. SolarWinds-Angriff
  - **NSO Group Tools (Pegasus)** — Kommerziell, aber State-Sponsored genutzt
- Für jede Gruppe: ATT&CK Matrix durchgehen, IoCs sammeln, Reports lesen

**10:30–11:00 | NEWS**
- Ab jetzt: Zusätzlich zu den normalen News lese täglich:
  - Securelist.com (Kaspersky) — neue APT-Berichte
  - Google TAG Blog — State-Sponsored Activity
  - Citizen Lab — Surveillance Reports

**11:00–12:00 | CHALLENGES: CyberDefenders**
- Challenge: "Seized" — Windows Disk Forensik
- Oder: "GetPDF" — Malware-Analyse von PDF

**12:00–13:00 | Mittagspause + Podcast**
- Darknet Diaries Episode 100: "Ransom" (Forensik in Ransomware-Fällen)

**13:00–16:00 | SAYTEC**

**16:00–18:00 | GYM**

**18:30–20:00 | DEEP LEARNING: Anti-Forensik verstehen**
- Warum? Du musst wissen wie Angreifer Spuren verwischen, um sie trotzdem zu finden.
- Techniken die du kennen musst:
  - **Timestomping:** Zeitstempel fälschen ($STANDARD_INFORMATION vs $FILENAME in NTFS)
  - **Log Clearing:** Event Logs löschen (Event ID 1102 = Security Log cleared)
  - **Memory-Only Malware:** Lebt nur im RAM, kein File auf Disk
  - **Fileless Malware:** PowerShell, WMI, .NET in-memory execution
  - **Data Destruction:** Secure Delete, SDelete, TRIM auf SSDs
  - **Steganographie:** Daten in Bildern verstecken
- Gegenmaßnahmen für jede Technik:
  - Timestomping → $MFT $FILENAME Timestamps vergleichen (die kann man NICHT fälschen)
  - Log Clearing → USN Journal hat separate Timeline, Shadow Copies prüfen
  - Memory-Only → Memory Dump SOFORT bei Incident Response (nicht zuerst Disk!)
  - Fileless → ETW (Event Tracing for Windows), PowerShell ScriptBlock Logging

**20:00–21:00 | ISLAM**

**21:00–22:30 | PROJEKT: MemLabs Lab 4 + 5**

---

### Dienstag (Tag 86) — YARA Rules + Malware Triage

**06:30–08:30 | DEEP TECHNICAL: YARA Rule Writing**

```
// YARA — Die Sprache der Malware-Erkennung
// Wird benutzt von: CrowdStrike, Mandiant, BKA, BSI, NSA

rule Suspicious_PowerShell_Encoded {
    meta:
        author = "DeinName"
        description = "Detects base64-encoded PowerShell commands"
        severity = "medium"
        reference = "ATT&CK T1059.001"

    strings:
        $ps1 = "powershell" nocase
        $ps2 = "pwsh" nocase
        $enc1 = "-encodedcommand" nocase
        $enc2 = "-enc " nocase
        $enc3 = "-e " nocase
        $b64 = /[A-Za-z0-9+\/]{50,}={0,2}/ // Langer Base64 String

    condition:
        any of ($ps*) and (any of ($enc*) or $b64)
}

rule Cobalt_Strike_Beacon_Indicators {
    meta:
        author = "DeinName"
        description = "Detects Cobalt Strike Beacon patterns"
        severity = "critical"
        reference = "ATT&CK S0154"

    strings:
        $sleep = { 73 6C 65 65 70 }  // "sleep"
        $pipe = "\\\\.\\pipe\\msagent_" nocase
        $default_config = { 00 00 00 00 00 00 00 00 00 00 ?? ?? 00 00 }
        $watermark = "MSSE-" // Microsoft Security Essentials watermark spoof

    condition:
        2 of them
}

rule Pegasus_Indicators {
    meta:
        author = "DeinName"
        description = "Indicators associated with NSO Pegasus infrastructure"
        severity = "critical"
        reference = "Citizen Lab / Amnesty Tech Reports"

    strings:
        $domain1 = "bfrfrg.info" nocase
        $domain2 = "dfrglk.info" nocase
        $process1 = "bh" // Pegasus process name on iOS
        $ipc = "/var/tmp/jb_" // Jailbreak indicator path

    condition:
        any of them
}
```

**09:00–10:30 | INTELLIGENCE: Mobile Forensik + Pegasus Detection**
- **MVT (Mobile Verification Toolkit)** — Entwickelt von Amnesty International
  - `pip install mvt`
  - Kann iOS-Backups auf Pegasus-Indikatoren prüfen
  - Nutzt IoCs von Amnesty + Citizen Lab
  - `mvt-ios check-backup --iocs pegasus.stix2 /path/to/backup`
- Studiere: Amnesty International "Forensic Methodology Report" (2021)
  - Wie sie Pegasus auf 67 Telefonen identifiziert haben
  - Welche Artefakte Pegasus hinterlässt (Prozessnamen, Domains, Datenbankeinträge)
- Studiere: Citizen Lab "Hide and Seek" Report
  - Wie NSO Groups Infrastruktur kartiert wurde

**11:00–12:00 | CHALLENGES: CyberDefenders**
- Challenge: "DumpMe" — Memory Forensics
- Oder: "Ulysses" — Advanced Disk Forensics

**18:30–20:00 | DEEP LEARNING: Eric Zimmerman Tools Deep Dive**
- **KAPE (Kroll Artifact Parser and Extractor):**
  - Download: ericzimmerman.github.io
  - Targets: Was sammeln (Registry, Event Logs, Prefetch, $MFT, Browser)
  - Modules: Wie verarbeiten (EZ Tools, RegRipper, etc.)
  - Aufgabe: KAPE gegen ein Test-Image laufen lassen → Ergebnisse in Timeline Explorer laden
- **Timeline Explorer:** Die CSV/TSV-Dateien von EZ-Tools laden und filtern
- **Registry Explorer:** Registry Hives laden → Autoruns, USB-History, User Activity

**21:00–22:30 | PROJEKT: YARA-Regel-Collection auf GitHub**
- Repository: "yara-rules" mit eigenen Regeln
- Kategorien: Ransomware, C2-Frameworks, Suspicious-Scripts, APT-Indicators

---

### Mittwoch-Freitag — Pattern fortsetzen

**Mittwoch:** Windows Event Log Analyse (Event ID Cheat Sheet: 4624/4625 Logon, 4688 Process Creation, 7045 Service Install, 1102 Audit Log Cleared) + CyberDefenders "Boss of the SOC"

**Donnerstag:** Super-Timeline erstellen mit plaso/log2timeline + PCAP-Analyse von Malware-Traffic

**Freitag:** Erste Malware-Sample-Analyse (MalwareBazaar → FlareVM → ProcMon + Wireshark + x64dbg)

---

## WOCHE 14-16 — Advanced Forensik-Szenarien

### Woche 14: Incident Response Simulation
- Baue ein IR-Lab: Windows VM als "Opfer" + REMnux als Netzwerk-Monitor
- Simuliere einen Angriff (Atomic Red Team Tests)
- Führe komplette IR durch: Memory Dump → Disk Image → Log Collection → Timeline → Report
- Schreibe einen IR-Report im Mandiant-Format

### Woche 15: Advanced Memory Forensics
- Rootkit-Erkennung in Memory (DKOM, SSDT Hooking, IDT Hooking)
- Process Hollowing erkennen
- Reflective DLL Injection erkennen
- Cobalt Strike Beacon in Memory finden und konfigurieren extrahieren

### Woche 16: Mobile + Cloud Forensik Intro
- iOS Backup-Forensik: iTunes Backup → Artefakte extrahieren
- Android Forensik: ADB + Logical Extraction
- MVT in der Praxis: iOS-Backup gegen Pegasus-IoCs prüfen
- Cloud Forensik Intro: AWS CloudTrail Logs analysieren

---

## KPI-CHECKLISTE MONAT 4

| KPI | Ziel | Status |
|-----|------|--------|
| Volatility 3 | Alle Core-Plugins + Custom Script | [ ] |
| KAPE | Artifact Collection Pipeline | [ ] |
| EZ Tools | MFTECmd, PECmd, LECmd, RECmd beherrscht | [ ] |
| Timeline | Super-Timeline erstellt | [ ] |
| YARA | 10+ eigene Regeln geschrieben | [ ] |
| Malware Triage | 5 echte Samples analysiert | [ ] |
| MVT | Pegasus-Detection getestet | [ ] |
| Anti-Forensik | Alle Techniken + Gegenmaßnahmen | [ ] |
| APT-Tracking | 3 APT-Gruppen studiert (ATT&CK) | [ ] |
| CyberDefenders | 5+ Challenges gelöst | [ ] |
| Event Logs | Key Event IDs beherrscht | [ ] |
| IR-Report | Vollständiger IR-Report geschrieben | [ ] |
| Blog | 2+ Forensik-Write-ups | [ ] |

---

## INTELLIGENCE SOURCES — Die echten Quellen

### Tier 1: Direkte APT/Surveillance Intelligence
| Quelle | URL | Was du bekommst |
|--------|-----|----------------|
| Citizen Lab | citizenlab.ca | Pegasus/Predator/Spyware Reports |
| Google TAG | blog.google/threat-analysis-group | State-Sponsored Actor Tracking |
| Google Project Zero | googleprojectzero.blogspot.com | 0-Day Analyse auf höchstem Level |
| Kaspersky Securelist | securelist.com | APT-Forschung (Equation Group etc.) |
| Mandiant Blog | mandiant.com/resources/blog | APT-Reports, IoCs |
| Microsoft MSTIC | microsoft.com/security/blog | Nation-State Actor Reports |
| Amnesty Tech | amnesty.org/tech | Surveillance Tech Reports |
| ESET Research | welivesecurity.com | APT-Forschung Osteuropa |
| Volexity | volexity.com/blog | Memory Forensics, APT |

### Tier 2: Exploit/Vulnerability Intelligence
| Quelle | URL | Was du bekommst |
|--------|-----|----------------|
| Zerodium Prices | zerodium.com/program.html | Was 0-Days wert sind |
| Pwn2Own Results | zerodayinitiative.com | Aktuelle Exploit-Chains |
| cve.org | cve.org | Vulnerability Database |
| exploit-db | exploit-db.com | Public Exploits |
| Packet Storm | packetstormsecurity.com | Exploits + Papers |

### Tier 3: Surveillance Industry Intelligence
| Quelle | URL | Was du bekommst |
|--------|-----|----------------|
| Surveillance Industry Index | surveillanceindustry.org | Firmen-Datenbank |
| Privacy International | privacyinternational.org | Surveillance Tech Reports |
| Electronic Frontier Foundation | eff.org | Digital Rights + Surveillance |
| The Intercept | theintercept.com | Investigativer Journalismus |
| electrospaces.net | electrospaces.net | NSA/GCHQ technische Analyse |
