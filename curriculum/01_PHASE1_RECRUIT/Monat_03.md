# MONAT 3 — Forensik-Einstieg + Advanced Scraping + Erste Investigation

## Monats-Ziele (nicht verhandelbar)
- [ ] Digital Forensics: Autopsy + Volatility Basics beherrschen
- [ ] Python: Async/Await, Datenbankanbindung, eigenes CLI-Tool publiziert
- [ ] Web Scraping: Selenium + BeautifulSoup für dynamische Seiten
- [ ] OSINT: Erste vollständige professionelle Investigation
- [ ] Netzwerk: Subnetting, Routing, Firewall-Konzepte
- [ ] TryHackMe: 90+ Rooms total, "SOC Level 1" Path begonnen
- [ ] OverTheWire: Natas komplett (0-33)
- [ ] CFE-Vorbereitungsmaterial bestellt und Kapitel 1-3 gelesen
- [ ] 10 Blog-Posts total (4 Monat 1 + 4 Monat 2 + 2 Monat 3), GitHub 3+ Repos
- [ ] Professioneller OSINT-Report geschrieben (min. 5 Seiten)

---

## WOCHE 9 — TAG FÜR TAG

### Montag (Tag 57) — Digital Forensics Einstieg

**06:30–08:30 | DEEP TECHNICAL: Forensik-Grundlagen + Autopsy**
- Verstehe den Forensik-Prozess:
  1. **Identification** — Was ist das Beweismaterial?
  2. **Preservation** — Integrität sichern (Write-Blocker, Hashing)
  3. **Collection** — Forensische Kopie erstellen (dd, FTK Imager)
  4. **Examination** — Daten extrahieren und organisieren
  5. **Analysis** — Schlussfolgerungen ziehen
  6. **Presentation** — Report schreiben
- Autopsy installieren: autopsy.com/download
- NIST CFReDS Testimage herunterladen: cfreds.nist.gov
- Autopsy: Neuen Case erstellen → Image laden → Interface kennenlernen

```python
# Forensik-Grundlagen: Datei-Hashing für Chain of Custody
import hashlib
import os

def hash_file(filepath, algorithms=['md5', 'sha256']):
    """Berechne Hashes für forensische Verifizierung."""
    results = {}
    for algo in algorithms:
        hasher = hashlib.new(algo)
        with open(filepath, 'rb') as f:
            while chunk := f.read(8192):
                hasher.update(chunk)
        results[algo] = hasher.hexdigest()
    return results

def verify_integrity(filepath, known_hash, algorithm='sha256'):
    """Verifiziere Datei-Integrität gegen bekannten Hash."""
    computed = hash_file(filepath, [algorithm])
    match = computed[algorithm] == known_hash.lower()
    return {
        'file': filepath,
        'algorithm': algorithm,
        'computed': computed[algorithm],
        'expected': known_hash.lower(),
        'integrity': 'VERIFIED' if match else 'FAILED'
    }

def create_evidence_log(evidence_dir, output_file='evidence_log.csv'):
    """Erstelle forensisches Evidence-Log mit Hashes."""
    import csv
    from datetime import datetime

    with open(output_file, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['Timestamp', 'Filename', 'Size', 'MD5', 'SHA256'])
        for root, dirs, files in os.walk(evidence_dir):
            for filename in files:
                filepath = os.path.join(root, filename)
                size = os.path.getsize(filepath)
                hashes = hash_file(filepath)
                writer.writerow([
                    datetime.now().isoformat(),
                    filepath,
                    size,
                    hashes['md5'],
                    hashes['sha256']
                ])
    print(f"[+] Evidence log created: {output_file}")
```

**09:00–10:30 | OSINT: Advanced Domain Investigation**
- Kombiniere alle gelernten Tools für eine vollständige Domain-Analyse:
  1. WHOIS + historische WHOIS-Daten (whoisology.com)
  2. DNS-History (securitytrails.com)
  3. Subdomain-Enumeration (Amass + theHarvester + crt.sh)
  4. Technologie-Stack (Wappalyzer + BuiltWith)
  5. Wayback Machine (web.archive.org) — Historische Versionen
  6. Certificate Transparency (crt.sh)
- Aufgabe: Analysiere eine verdächtige Domain aus PhishTank

**10:30–11:00 | NEWS**

**11:00–12:00 | CHALLENGES: TryHackMe**
- Starte "SOC Level 1" Learning Path
- Room: "Intro to Digital Forensics"
- Room: "Windows Forensics 1"

**12:00–13:00 | Mittagspause + Podcast**
- Darknet Diaries Episode 54: "NotPetya" (Relevanz für Forensik)

**13:00–16:00 | SAYTEC**

**16:00–18:00 | GYM**

**18:30–20:00 | DEEP LEARNING: File Systems für Forensik**
- Verstehe NTFS: MFT, $MFT, $LogFile, $UsnJrnl, Alternate Data Streams
- Verstehe ext4: Inodes, Superblocks, Journal
- Warum wichtig? → Gelöschte Dateien, Zeitstempel-Analyse, Metadaten
- Lese: "Digital Forensics with Kali Linux" Kapitel 1-2
- Oder: 13Cubed YouTube — "Introduction to NTFS" (kostenlos, exzellent)

**20:00–21:00 | ISLAM**

**21:00–22:30 | PROJEKT: Evidence-Hashing-Tool fertigstellen**
- CLI-Tool: `python3 evidence.py --dir /path/to/evidence --output log.csv`
- Verifizierungsmodus: `python3 evidence.py --verify file.img --hash abc123`

---

### Dienstag (Tag 58) — Memory Forensics + Selenium

**06:30–08:30 | DEEP TECHNICAL: Python Selenium für OSINT**
```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def setup_browser(headless=True):
    """Browser-Setup für OSINT (mit Headless-Option)."""
    options = webdriver.ChromeOptions()
    if headless:
        options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    # User-Agent setzen (kein Bot-Fingerprint)
    options.add_argument(
        'user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    )
    return webdriver.Chrome(options=options)

def screenshot_website(url, output_path):
    """Website-Screenshot für OSINT-Dokumentation."""
    driver = setup_browser()
    try:
        driver.get(url)
        time.sleep(3)  # Warten auf JS-Rendering
        driver.save_screenshot(output_path)
        title = driver.title
        return {'url': url, 'title': title, 'screenshot': output_path}
    finally:
        driver.quit()

def scrape_dynamic_content(url, css_selector, wait_time=10):
    """Dynamischen Content laden (JavaScript-gerenderte Seiten)."""
    driver = setup_browser()
    try:
        driver.get(url)
        elements = WebDriverWait(driver, wait_time).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, css_selector))
        )
        return [el.text for el in elements]
    finally:
        driver.quit()
```

**09:00–10:30 | OSINT: Cryptocurrency OSINT Intro**
- Blockchain-Grundlagen verstehen: Wallets, Transaktionen, Blöcke
- Free Tools kennenlernen:
  - blockchain.com/explorer — Bitcoin Explorer
  - etherscan.io — Ethereum Explorer
  - oxt.me — Bitcoin-Transaktionsanalyse
  - Breadcrumbs (breadcrumbs.app) — Free Tier
  - Metasleuth (metasleuth.io) — Cross-Chain Tracking
- Aufgabe: Finde die Bitcoin-Adresse eines bekannten Ransomware-Falls → Tracke die Transaktionen

**11:00–12:00 | CHALLENGES: TryHackMe**
- Room: "Volatility" (Memory Forensics)
- Room: "Autopsy" (Disk Forensics)

**18:30–20:00 | DEEP LEARNING: Memory Forensics mit Volatility 3**
- Volatility 3 installieren: `pip install volatility3`
- MemLabs herunterladen (GitHub: stuxnet999/MemLabs) — CTF-Style Memory Challenges
- MemLabs Lab 1 starten:
  - `python3 vol.py -f MemLabs-Lab1.raw windows.pslist` — Prozesse auflisten
  - `python3 vol.py -f MemLabs-Lab1.raw windows.netscan` — Netzwerkverbindungen
  - `python3 vol.py -f MemLabs-Lab1.raw windows.cmdline` — Command Lines
  - `python3 vol.py -f MemLabs-Lab1.raw windows.filescan` — Dateien im Speicher
  - `python3 vol.py -f MemLabs-Lab1.raw windows.dumpfiles` — Dateien extrahieren

**21:00–22:30 | PROJEKT: MemLabs Lab 1 lösen + Write-up**

---

### Mittwoch (Tag 59) — Autopsy Deep Dive + Network Forensics

**06:30–08:30 | DEEP TECHNICAL: Autopsy Mastery**
- NIST Hacking Case Image in Autopsy laden
- Analysiere:
  1. Timeline Analysis — Wann passierte was?
  2. Web History — Welche Seiten besucht?
  3. Email Artifacts — Kommunikation
  4. File Carving — Gelöschte Dateien wiederherstellen
  5. Hash Analysis — Bekannte Bad Files (NSRL, Custom)
  6. Keyword Search — Nach verdächtigen Begriffen suchen
- Erstelle einen Mini-Report (1 Seite)

**09:00–10:30 | OSINT: Social Engineering Research**
- "The Art of Deception" von Kevin Mitnick — Kapitel 1-3
- Verstehe Pretexting: Was ist legal, was nicht?
- Rechtliche Grenzen in Deutschland:
  - Passive Recherche öffentlicher Infos → Legal
  - Fake-Profile für Investigation → Grauzone
  - Impersonation von Behörden → Strafbar
  - Aufnahme ohne Einwilligung → §201 StGB (strafbar!)

**11:00–12:00 | CHALLENGES: TryHackMe**
- Room: "DFIR: An Introduction"
- Room: "Windows Event Logs"

**18:30–20:00 | DEEP LEARNING: Netzwerk-Forensik Basics**
- Wireshark: malware-traffic-analysis.net → PCAP Exercise #1
- Lerne:
  - Statistics → Conversations → Wer spricht mit wem?
  - Follow TCP Stream → Was wird übertragen?
  - Export Objects → HTTP → Dateien aus Traffic extrahieren
  - Verdächtige DNS-Anfragen identifizieren (DGA, C2-Domains)

**21:00–22:30 | PROJEKT: Network Forensics Write-up**

---

### Donnerstag (Tag 60) — Python Async + Report Writing

**06:30–08:30 | DEEP TECHNICAL: Python asyncio**
```python
import asyncio
import aiohttp

async def fetch_url(session, url):
    """Asynchroner HTTP-Request."""
    try:
        async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as response:
            return {
                'url': url,
                'status': response.status,
                'content_type': response.headers.get('Content-Type', ''),
                'server': response.headers.get('Server', '')
            }
    except Exception as e:
        return {'url': url, 'error': str(e)}

async def mass_url_check(urls):
    """Prüfe viele URLs gleichzeitig (10x schneller als sequentiell)."""
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        return await asyncio.gather(*tasks)

async def subdomain_bruteforce(domain, wordlist_path):
    """Async Subdomain-Bruteforce."""
    import socket

    with open(wordlist_path) as f:
        words = [line.strip() for line in f if line.strip()]

    found = []

    async def check_subdomain(sub):
        hostname = f"{sub}.{domain}"
        try:
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(None, socket.gethostbyname, hostname)
            found.append({'subdomain': hostname, 'ip': result})
            print(f"  [+] Found: {hostname} -> {result}")
        except socket.gaierror:
            pass

    # Batch-Verarbeitung (100 gleichzeitig)
    batch_size = 100
    for i in range(0, len(words), batch_size):
        batch = words[i:i+batch_size]
        await asyncio.gather(*[check_subdomain(w) for w in batch])

    return found

# Ausführen:
# asyncio.run(subdomain_bruteforce("example.com", "subdomains.txt"))
```

**09:00–10:30 | OSINT: Report Writing lernen**
- Studiere das Format professioneller OSINT-Reports:
  1. **Executive Summary** (1 Seite, für Nicht-Techniker)
  2. **Scope & Methodology** (Was wurde untersucht, wie?)
  3. **Findings** (Chronologisch oder thematisch)
  4. **Evidence** (Screenshots, Hashes, URLs mit Zeitstempeln)
  5. **Analysis** (Was bedeuten die Findings?)
  6. **Recommendations** (Was sollte getan werden?)
- Aufgabe: Nimm deine Domain-Investigation von letzte Woche → Formatiere sie als professionellen Report

**11:00–12:00 | CHALLENGES: TryHackMe**
- Room: "Investigating Windows"
- Room: "Memory Forensics"

**18:30–20:00 | DEEP LEARNING: Subnetting Mastery**
- Subnetting MUSS sitzen. Ohne Subnetting kein Netzwerk-Verständnis.
- Lerne:
  - CIDR-Notation (/24, /16, /8)
  - Netzwerk-Adresse, Broadcast, Host-Range berechnen
  - Subnetting-Tabelle auswendig:
    - /24 = 256 IPs, /25 = 128, /26 = 64, /27 = 32, /28 = 16
  - Private IP-Ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
- Übe: subnettingpractice.com (bis du 20 Aufgaben in Folge richtig hast)
- TryHackMe Room: "Intro to Networking" (Subnetting Section)

**21:00–22:30 | PROJEKT: Async OSINT Tool auf GitHub**

---

### Freitag (Tag 61) — Erste professionelle Investigation

**06:30–08:30 | DEEP TECHNICAL: Python — Projekt zusammenführen**
- Finales OSINT-Framework zusammenbauen:
  - Modular: DNS, WHOIS, Subdomain, Port Scan, Social Media, Screenshot
  - Async: Schnelle parallele Abfragen
  - Reports: JSON + HTML Output
  - CLI: `python3 recon.py --target domain.com --modules all --output html`

**09:00–12:00 | OSINT INVESTIGATION: 3 Stunden Fokus**
- **Ziel: Eine vollständige professionelle Investigation durchführen**
- Wähle ein Ziel (Vorschläge):
  - Eine Phishing-Domain aus PhishTank
  - Eine verdächtige Domain die du bei der Arbeit (Saytec) gesehen hast
  - Eine öffentliche Fraud-Domain (Fake-Shop, Scam-Seite)
- Durchführung:
  1. Alle OSINT-Tools anwenden die du kennst
  2. Alles dokumentieren (Screenshots mit Zeitstempel!)
  3. Ergebnisse in Maltego-Graph zusammenführen
  4. 5-Seiten-Report schreiben (Executive Summary, Findings, Evidence)
  5. Auf GitHub als "Case Study" veröffentlichen (anonymisiert!)

**13:00–16:00 | SAYTEC**

**18:30–20:00 | DEEP LEARNING: CFE-Vorbereitung beginnen**
- CFE (Certified Fraud Examiner) Materialien bestellen:
  - ACFE Website: acfe.com
  - CFE Exam Prep Course bestellen
  - "Fraud Examiners Manual" bestellen
- Starte mit Kapitel 1: "Fraud Examination Methodology"
- Warum CFE? → Gold Standard für Fraud Investigation → Türöffner bei Banken und Kanzleien

**21:00–22:30 | PROJEKT: Investigation Report finalisieren**

---

## WOCHE 10-11 — Erweiterte Forensik + CTF-Praxis

### Woche 10 Fokus
- **Montag:** Eric Zimmerman Tools kennenlernen (MFTECmd, PECmd, LECmd, Registry Explorer)
- **Dienstag:** Windows Registry Forensik (SAM, SYSTEM, SOFTWARE, NTUSER.DAT)
- **Mittwoch:** MemLabs Lab 2 + 3 lösen
- **Donnerstag:** CyberDefenders — "Seized" Challenge
- **Freitag:** Netzwerk-Forensik: PCAP-Analyse von malware-traffic-analysis.net

### Woche 11 Fokus
- **Montag:** Log Analysis (Windows Event Logs: Security, System, Application)
- **Dienstag:** Timeline-Analyse (Super-Timeline mit Autopsy oder plaso/log2timeline)
- **Mittwoch:** TryHackMe "Investigating with Splunk" + "Splunk 101"
- **Donnerstag:** CyberDefenders — "DumpMe" Challenge (Memory Forensics)
- **Freitag:** Python: SQLite3-Datenbank für Investigation-Ergebnisse

---

## WOCHE 12 — Phase 1 Capstone + Phase 2 Vorbereitung

### Montag (Tag 78) — Capstone-Projekt Start

**Capstone: Vollständige Fraud-Domain-Investigation**

Führe eine komplette Investigation durch, die ALLE Fähigkeiten aus Phase 1 kombiniert:

1. **OSINT-Reconnaissance** (alle Tools)
   - Domain-Info, DNS, WHOIS, Subdomains
   - Social Media, Email-Adressen
   - Technologie-Stack, Hosting
   - Wayback Machine historische Analyse

2. **Netzwerk-Analyse**
   - Port-Scan der IP
   - Service-Detection
   - SSL/TLS-Zertifikat-Analyse

3. **Basic Forensics**
   - Website-Screenshots (Beweissicherung)
   - Hash-Dokumentation
   - Timeline der Aktivitäten

4. **Python-Automatisierung**
   - Eigenes Tool für die Reconnaissance
   - Automatisierte Report-Generierung

5. **Professioneller Report** (10+ Seiten)
   - Executive Summary
   - Scope & Methodology
   - Chronologische Findings
   - Evidence (Screenshots, Hashes, Rohdaten)
   - Analysis & Attribution
   - Recommendations
   - Appendices

### Dienstag-Donnerstag — Capstone ausarbeiten

### Freitag (Tag 82) — Phase 1 Review

**Kompletter Review:**
- Alle KPIs der 3 Monate durchgehen
- GitHub-Profil prüfen: Wie viele Repos? Wie viele Commits?
- Blog-Posts zählen: Mindestens 6?
- Skills-Selbstbewertung (1-10):
  - Python: ___/10
  - Linux: ___/10
  - Networking: ___/10
  - OSINT: ___/10
  - Forensik: ___/10
  - Report Writing: ___/10
- Was war die größte Lektion?
- Was hat am meisten Spaß gemacht? → Das ist dein Spezialisierungs-Hinweis!

### Samstag — Deep Work (8h)
- 4h: Capstone-Report polieren
- 4h: Phase 2 Materialien vorbereiten (Downloads, Bücher, Tools)

### Sonntag — Übergang zu Phase 2
- Blog-Post: "Phase 1 Complete — 3 Months of Cybersecurity Training"
- Monat 4 Datei öffnen → Phase 2 beginnt morgen

---

## KPI-CHECKLISTE MONAT 3

| KPI | Ziel | Status |
|-----|------|--------|
| Autopsy | Case erstellt, Image analysiert | [ ] |
| Volatility 3 | 3+ Plugins beherrscht | [ ] |
| MemLabs | Lab 1-3 gelöst | [ ] |
| CyberDefenders | 2+ Challenges gelöst | [ ] |
| Python Selenium | Dynamische Seiten scrapen | [ ] |
| Python asyncio | Async HTTP-Requests | [ ] |
| Python CLI | Publiziertes Tool mit argparse | [ ] |
| OSINT Report | 5+ Seiten professioneller Report | [ ] |
| Crypto OSINT | Bitcoin-Transaktionen getrackt | [ ] |
| NTFS Forensik | MFT, ADS, Timestamps verstanden | [ ] |
| Memory Forensik | Prozesse, Netzwerk, Dateien extrahiert | [ ] |
| Netzwerk-Forensik | PCAP analysiert, Angriff identifiziert | [ ] |
| Subnetting | 20 Aufgaben fehlerfrei | [ ] |
| Log Analysis | Windows Event Logs analysiert | [ ] |
| CFE | Kapitel 1-3 gelesen | [ ] |
| OverTheWire Natas | Komplett (0-33) | [ ] |
| TryHackMe | 90+ Rooms total | [ ] |
| Blog | 10 Posts total | [ ] |
| GitHub | 3+ Repos | [ ] |
| Capstone | 10-Seiten Investigation Report | [ ] |

---

## PHASE 1 KOMPLETT — WAS DU JETZT KANNST

Nach 3 Monaten:
- **Python:** OOP, APIs, Regex, Scraping, Async, CLI-Tools bauen
- **Linux:** Daily Driver, Command Line, Scripting, OverTheWire komplett
- **Netzwerk:** TCP/IP, DNS, HTTP, Wireshark, Nmap, Subnetting
- **OSINT:** 20+ Tools beherrscht, professionelle Reports, Maltego Graphs
- **Forensik:** Autopsy, Volatility, Memory + Disk + Netzwerk Forensics Basics
- **Report Writing:** Professionelle Investigation Reports
- **Blog + GitHub:** Sichtbare Online-Präsenz

**Du bist bereit für Phase 2: OPERATOR.**
