# MONAT 2 — Advanced Python + Maltego + Netzwerk-Deep-Dive + OverTheWire

## Monats-Ziele (nicht verhandelbar)
- [ ] Python: OOP, APIs, Regex, Scraping, eigenes OSINT-Tool (500+ Zeilen)
- [ ] Maltego: 10+ Transforms beherrschen, eigenes Transform schreiben
- [ ] OverTheWire: Bandit komplett (Level 0-33), Natas Level 0-15
- [ ] Netzwerk: TCP/IP Illustrated Kapitel 1-8, Wireshark-Fluenz
- [ ] TryHackMe: 60+ Rooms total, "Pre Security" + "Jr Penetration Tester" Paths
- [ ] SpiderFoot: Vollständiger Scan einer Test-Domain
- [ ] 4 Blog-Posts geschrieben (Write-ups)
- [ ] Erstes CTF teilgenommen (auch wenn 0 Punkte)

---

## WOCHE 5 — TAG FÜR TAG

### Montag (Tag 29) — Python OOP + Maltego Einstieg

**06:30–08:30 | DEEP TECHNICAL: Python OOP**
- Automate the Boring Stuff Kapitel 11-12 (Web Scraping, Excel)
- Dann: Learnpython.org → OOP Section
- Konzepte: Classes, Objects, __init__, self, Inheritance, Methods
- Aufgabe: Schreibe eine `Target`-Klasse für OSINT-Daten

```python
# Target-Klasse für OSINT Investigation
class Target:
    def __init__(self, name, email=None, phone=None):
        self.name = name
        self.email = email
        self.phone = phone
        self.usernames = []
        self.social_media = {}
        self.domains = []
        self.ip_addresses = []
        self.notes = []

    def add_username(self, platform, username):
        self.usernames.append(username)
        self.social_media[platform] = username

    def add_domain(self, domain):
        self.domains.append(domain)

    def add_note(self, note):
        from datetime import datetime
        self.notes.append({
            'timestamp': datetime.now().isoformat(),
            'content': note
        })

    def generate_report(self):
        report = f"=== OSINT Report: {self.name} ===\n"
        report += f"Email: {self.email or 'Unknown'}\n"
        report += f"Phone: {self.phone or 'Unknown'}\n"
        report += f"\nUsernames found: {len(self.usernames)}\n"
        for platform, user in self.social_media.items():
            report += f"  [{platform}] {user}\n"
        report += f"\nDomains: {', '.join(self.domains) or 'None'}\n"
        report += f"IPs: {', '.join(self.ip_addresses) or 'None'}\n"
        report += f"\nNotes ({len(self.notes)}):\n"
        for note in self.notes:
            report += f"  [{note['timestamp']}] {note['content']}\n"
        return report

# Nutzung:
target = Target("Max Mustermann", email="max@test.de")
target.add_username("Twitter", "@maxmuster")
target.add_username("GitHub", "maxmustermann")
target.add_domain("mustermann-consulting.de")
target.add_note("Domain registriert am 2024-03-15")
print(target.generate_report())
```

**09:00–10:30 | OSINT: Maltego Einstieg**
- Maltego CE (Community Edition) installieren: maltego.com/downloads
- Account erstellen → Maltego starten → Interface kennenlernen
- Erste Transforms testen:
  - Person → Email Addresses
  - Domain → DNS Names
  - Email → Social Media Profiles
- Tutorial durcharbeiten: maltego.com/categories/tutorial
- Aufgabe: Erstelle einen Graph für eine öffentliche Test-Domain (z.B. tesla.com)
- Verstehe: Entities, Transforms, Machines, Graph Layouts

**10:30–11:00 | NEWS**
- thehackernews.com + bleepingcomputer.com + tldrsec.com Newsletter

**11:00–12:00 | CHALLENGES: OverTheWire Bandit 16-20**
- Level 16: SSL-Verbindung zu Port mit ncat/openssl
- Level 17: Diff zwischen zwei Dateien
- Level 18: Ausgesperrt? ssh mit Command ausführen
- Level 19: setuid Binary nutzen
- Level 20: Netzwerk-Verbindung aufbauen für Login
- **Schreibe für jedes Level eine kurze Notiz: Was war der Trick?**

**12:00–13:00 | Mittagspause + Podcast**
- Darknet Diaries Episode 29: "Stuxnet" (relevant für Exploit Dev Motivation)

**13:00–16:00 | SAYTEC**

**16:00–18:00 | GYM**

**18:30–20:00 | DEEP LEARNING: Netzwerk — TCP/IP Illustrated**
- TCP/IP Illustrated Vol. 1 Kapitel 1-2 (Introduction, Internet Address Architecture)
- Alternative (wenn Buch zu dicht): "Computer Networking: A Top-Down Approach" Kurose/Ross Kapitel 1
- Wireshark parallel installieren → Interface kennenlernen
- Capture starten → eigenen Webtraffic anschauen → HTTP Request finden
- Verstehe: OSI Model (7 Schichten) vs TCP/IP Model (4 Schichten)

**20:00–21:00 | ISLAM**

**21:00–22:30 | PROJEKT: Blog Write-up**
- Write-up für OverTheWire Bandit Level 16-20
- Format: Problem → Analyse → Lösung → Lessons Learned
- In Blog veröffentlichen

---

### Dienstag (Tag 30) — Python Regex + Wireshark Deep Dive

**06:30–08:30 | DEEP TECHNICAL: Python Regex**
- Automate the Boring Stuff Kapitel 7: Pattern Matching mit Regex
- regex101.com → Übe Patterns interaktiv
- Security-relevante Regex-Patterns:

```python
import re

# IP-Adressen aus Logs extrahieren
def extract_ips(text):
    pattern = r'\b(?:\d{1,3}\.){3}\d{1,3}\b'
    return list(set(re.findall(pattern, text)))

# Email-Adressen extrahieren
def extract_emails(text):
    pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    return list(set(re.findall(pattern, text)))

# URLs extrahieren
def extract_urls(text):
    pattern = r'https?://[^\s<>"\'{}|\\^`\[\]]+'
    return list(set(re.findall(pattern, text)))

# Hash-Erkennung (MD5, SHA1, SHA256)
def identify_hash(hash_string):
    hash_string = hash_string.strip()
    if re.match(r'^[a-fA-F0-9]{32}$', hash_string):
        return "MD5"
    elif re.match(r'^[a-fA-F0-9]{40}$', hash_string):
        return "SHA1"
    elif re.match(r'^[a-fA-F0-9]{64}$', hash_string):
        return "SHA256"
    return "Unknown"

# Log-Analyse: Failed SSH Logins
def parse_auth_log(log_content):
    pattern = r'Failed password for (?:invalid user )?(\S+) from (\S+) port (\d+)'
    results = re.findall(pattern, log_content)
    attackers = {}
    for user, ip, port in results:
        if ip not in attackers:
            attackers[ip] = {'attempts': 0, 'users': set()}
        attackers[ip]['attempts'] += 1
        attackers[ip]['users'].add(user)
    return attackers
```

**09:00–10:30 | OSINT: Maltego Transforms Deep Dive**
- Transforms systematisch durchgehen:
  - DNS: Domain → DNS Names, MX Records, NS Records
  - WHOIS: Domain → WHOIS Info → Registrant Details
  - Email: Email → Breached Databases (HaveIBeenPwned Transform)
  - Person: Name → Social Media → Connections
- Aufgabe: Baue einen kompletten Maltego-Graph für eine Public Domain:
  1. Starte mit Domain
  2. DNS-Auflösung
  3. WHOIS-Daten
  4. Email-Adressen finden
  5. Social Media verknüpfen
  6. **Screenshot machen → Blog-Post darüber schreiben**

**10:30–11:00 | NEWS**

**11:00–12:00 | CHALLENGES: TryHackMe**
- Room: "Intro to Networking" (Networking-Grundlagen)
- Room: "HTTP in Detail"
- Room: "DNS in Detail"

**12:00–13:00 | Mittagspause + Podcast**
- Risky Business Podcast (aktuelle Folge)

**13:00–16:00 | SAYTEC**

**16:00–18:00 | GYM**

**18:30–20:00 | DEEP LEARNING: Wireshark Mastery**
- Wireshark offiziell: wireshark.org/docs/wsug_html_chunked
- Kapitel: "Capturing Live Network Data"
- Filter lernen:
  - Display Filter: `http`, `dns`, `tcp.port == 80`, `ip.addr == 192.168.1.1`
  - `http.request.method == "POST"` → Credentials in unverschlüsseltem Traffic
  - `dns.qry.name contains "malware"` → Verdächtige DNS-Anfragen
  - `tcp.flags.syn == 1 && tcp.flags.ack == 0` → SYN-Scans erkennen
- Aufgabe: Eigenen Traffic capturen und einen HTTP-Login finden (z.B. testphp.vulnweb.com)

**20:00–21:00 | ISLAM**

**21:00–22:30 | PROJEKT: Python Regex-Tool erweitern**
- Baue die Regex-Funktionen in ein CLI-Tool um
- `python3 loganalyzer.py --file auth.log --extract ips`
- argparse lernen für CLI-Argumente

---

### Mittwoch (Tag 31) — Python APIs + Netzwerk Layer 2/3

**06:30–08:30 | DEEP TECHNICAL: Python + APIs (requests)**
- `pip install requests`
- API-Grundlagen: GET, POST, Headers, JSON, Status Codes, API Keys

```python
import requests
import json

# VirusTotal API - Datei-Hash prüfen
def check_virustotal(api_key, file_hash):
    url = f"https://www.virustotal.com/api/v3/files/{file_hash}"
    headers = {"x-apikey": api_key}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        stats = data['data']['attributes']['last_analysis_stats']
        return {
            'malicious': stats['malicious'],
            'undetected': stats['undetected'],
            'total': sum(stats.values()),
            'detection_rate': f"{stats['malicious']}/{sum(stats.values())}"
        }
    return None

# AbuseIPDB - IP-Reputation prüfen
def check_abuseipdb(api_key, ip_address):
    url = "https://api.abuseipdb.com/api/v2/check"
    headers = {"Key": api_key, "Accept": "application/json"}
    params = {"ipAddress": ip_address, "maxAgeInDays": 90}
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()['data']
        return {
            'ip': data['ipAddress'],
            'abuse_score': data['abuseConfidenceScore'],
            'country': data['countryCode'],
            'isp': data['isp'],
            'total_reports': data['totalReports']
        }
    return None

# Shodan API - Host-Info
def shodan_host(api_key, ip_address):
    url = f"https://api.shodan.io/shodan/host/{ip_address}?key={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return {
            'ip': data['ip_str'],
            'org': data.get('org', 'Unknown'),
            'os': data.get('os', 'Unknown'),
            'ports': data.get('ports', []),
            'vulns': data.get('vulns', [])
        }
    return None
```

**09:00–10:30 | OSINT: SpiderFoot Setup + Scan**
- SpiderFoot installieren: `pip install spiderfoot` oder Docker
- Web-Interface starten: `sf -l 127.0.0.1:5001`
- Neuen Scan erstellen:
  - Target: Eine eigene oder Test-Domain
  - Module: Alle aktivieren für ersten Scan
  - Scan laufen lassen (~30-60 min)
- Ergebnisse analysieren:
  - Welche Subdomains gefunden?
  - Welche Email-Adressen?
  - Welche Technologien?
  - Gibt es Leaks oder Credentials?

**10:30–11:00 | NEWS**

**11:00–12:00 | CHALLENGES: TryHackMe**
- Room: "Nmap" (Port Scanning fundamentals)
- Lerne: `-sS`, `-sV`, `-sC`, `-O`, `-A`, `--script`, Timing `-T4`

**12:00–13:00 | Mittagspause + Podcast**
- Darknet Diaries Episode 53: "Shadow Brokers" (NSA Tools geleaked)

**13:00–16:00 | SAYTEC**

**16:00–18:00 | GYM**

**18:30–20:00 | DEEP LEARNING: Netzwerk Layer 2 + 3**
- TCP/IP Illustrated Kapitel 3-4 (Link Layer, ARP)
- Verstehe: MAC-Adressen, Ethernet Frames, ARP Protocol, ARP Spoofing
- Wireshark: ARP Traffic capturen → verstehe Request/Reply
- TryHackMe Room: "Intro to LAN"
- Aufgabe: Zeichne das Netzwerk deines Heimnetzwerks (Router, Geräte, IPs)

**20:00–21:00 | ISLAM**

**21:00–22:30 | PROJEKT: Multi-API OSINT Tool**
- Kombiniere VirusTotal + AbuseIPDB + Shodan in EINEM Tool
- Input: IP-Adresse oder Hash
- Output: Konsolidierter Report

---

### Donnerstag (Tag 32) — Python Scraping + Netzwerk TCP/UDP

**06:30–08:30 | DEEP TECHNICAL: Python Web Scraping**
- `pip install beautifulsoup4 lxml`
- Verstehe: HTML-Struktur, CSS-Selektoren, XPath

```python
import requests
from bs4 import BeautifulSoup
import csv

# OSINT: Öffentliche Mitarbeiter-Informationen sammeln
def scrape_company_employees(company_name):
    """
    Scrape öffentlich verfügbare Infos.
    WICHTIG: Nur öffentlich zugängliche Daten!
    Respektiere robots.txt und Rate-Limits.
    """
    results = []
    # Beispiel: Öffentliche GitHub-Organisation
    url = f"https://api.github.com/orgs/{company_name}/members"
    headers = {"Accept": "application/vnd.github.v3+json"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        for member in response.json():
            user_url = f"https://api.github.com/users/{member['login']}"
            user_data = requests.get(user_url, headers=headers).json()
            results.append({
                'username': member['login'],
                'name': user_data.get('name', ''),
                'email': user_data.get('email', ''),
                'bio': user_data.get('bio', ''),
                'blog': user_data.get('blog', ''),
                'repos': user_data.get('public_repos', 0)
            })
    return results

# Google Dorking automatisieren (nur gegen eigene Domains!)
def generate_dorks(domain):
    dorks = [
        f'site:{domain} filetype:pdf',
        f'site:{domain} filetype:xlsx',
        f'site:{domain} filetype:doc',
        f'site:{domain} "password" OR "passwort"',
        f'site:{domain} inurl:admin',
        f'site:{domain} inurl:login',
        f'site:{domain} intitle:"index of"',
        f'site:{domain} ext:sql',
        f'site:{domain} ext:env',
        f'site:{domain} ext:log',
    ]
    return dorks
```

**09:00–10:30 | OSINT: Recon-ng Framework**
- Installieren: `git clone https://github.com/lanmaster53/recon-ng.git`
- Oder: `pip install recon-ng`
- Marketplace kennenlernen: `marketplace search`, `marketplace install`
- Wichtige Module:
  - `recon/domains-hosts/hackertarget` — Subdomains finden
  - `recon/hosts-ports/shodan_ip` — Port-Infos
  - `recon/contacts-credentials/hibp_breach` — Breach-Daten
  - `recon/profiles-profiles/namechk` — Username-Check
- Aufgabe: Workspace erstellen → Domain als Seed → 5 Module laufen lassen → Report generieren

**10:30–11:00 | NEWS**

**11:00–12:00 | CHALLENGES: OverTheWire Bandit 21-25**
- Level 21-23: Cron Jobs analysieren
- Level 24: Brute Force Script schreiben
- Level 25-26: Shell-Escape aus eingeschränkter Umgebung

**12:00–13:00 | Mittagspause + Podcast**

**13:00–16:00 | SAYTEC**

**16:00–18:00 | GYM**

**18:30–20:00 | DEEP LEARNING: TCP und UDP Deep Dive**
- TCP/IP Illustrated Kapitel 5-6 (IP, TCP)
- Verstehe TCP 3-Way Handshake: SYN → SYN-ACK → ACK
- Verstehe: Sequence Numbers, Window Size, Flags (SYN, ACK, FIN, RST, PSH, URG)
- UDP: Connectionless, kein Handshake, schneller aber unzuverlässig
- Wireshark: TCP-Handshake live beobachten (filtere: `tcp.flags.syn == 1`)
- TryHackMe Room: "Protocols and Servers"

**20:00–21:00 | ISLAM**

**21:00–22:30 | PROJEKT: Erweitertes OSINT-Tool**
- Füge Web Scraping zum Multi-API Tool hinzu
- HTML-Reports generieren mit Template

---

### Freitag (Tag 33) — Python Concurrency + Maltego Custom Transforms

**06:30–08:30 | DEEP TECHNICAL: Python Threading + Async**
- `threading` und `concurrent.futures` Module
- Warum? OSINT-Tools müssen schnell sein → parallele API-Calls

```python
import concurrent.futures
import requests
import time

def check_username_on_platform(platform_url, username):
    """Prüfe ob Username auf einer Plattform existiert."""
    url = platform_url.format(username=username)
    try:
        response = requests.get(url, timeout=5)
        return {
            'platform': platform_url,
            'username': username,
            'exists': response.status_code == 200,
            'status_code': response.status_code
        }
    except requests.exceptions.RequestException:
        return {
            'platform': platform_url,
            'username': username,
            'exists': None,
            'status_code': 'Error'
        }

# Username-Checker mit Threading
def check_username_everywhere(username):
    platforms = [
        "https://github.com/{username}",
        "https://twitter.com/{username}",
        "https://www.reddit.com/user/{username}",
        "https://www.instagram.com/{username}/",
        "https://medium.com/@{username}",
        "https://keybase.io/{username}",
    ]

    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = {
            executor.submit(check_username_on_platform, url, username): url
            for url in platforms
        }
        for future in concurrent.futures.as_completed(futures):
            results.append(future.result())

    found = [r for r in results if r['exists']]
    print(f"\n[+] Username '{username}' found on {len(found)}/{len(results)} platforms:")
    for r in found:
        print(f"    ✓ {r['platform'].split('/')[2]}")
    return results
```

**09:00–10:30 | OSINT: Maltego Custom Transform schreiben**
- Maltego Transform Hub → TRX (Transform Server)
- Oder: Lokale Transforms mit Python
- Aufgabe: Schreibe einen Custom Transform der eine Email nimmt und auf HaveIBeenPwned prüft

**10:30–11:00 | NEWS**

**11:00–12:00 | CHALLENGES: TryHackMe**
- Room: "Wireshark 101"
- Room: "Nmap Live Host Discovery"

**12:00–13:00 | Mittagspause**

**13:00–16:00 | SAYTEC**

**16:00–18:00 | GYM**

**18:30–20:00 | DEEP LEARNING: Netzwerk Services**
- Kapitel 7-8 TCP/IP Illustrated (DNS, DHCP)
- DNS verstehen: A, AAAA, MX, NS, CNAME, TXT, SOA Records
- `dig`, `nslookup`, `host` — DNS-Tools auf CLI
- Wireshark DNS-Traffic analysieren

**20:00–21:00 | ISLAM**

**21:00–22:30 | PROJEKT: Blog + GitHub**
- Write-up: "Building an OSINT Tool with Python" (Tutorial-Style)
- Code auf GitHub pushen mit gutem README

---

## WOCHE 6 — Advanced Python + Netzwerk-Analyse

### Montag (Tag 36) — Error Handling + Nmap Scripting

**06:30–08:30 | DEEP TECHNICAL: Python Error Handling + Logging**
```python
import logging
import sys

# Professionelles Logging-Setup
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('osint_tool.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger('OSINTTool')

class OSINTScanner:
    def __init__(self, config_file=None):
        self.logger = logging.getLogger('OSINTTool.Scanner')
        self.results = []

    def scan_target(self, target):
        self.logger.info(f"Starting scan for: {target}")
        try:
            # DNS Lookup
            self.logger.info("Phase 1: DNS Resolution")
            dns_results = self._dns_lookup(target)
            self.results.extend(dns_results)

            # WHOIS
            self.logger.info("Phase 2: WHOIS Lookup")
            whois_data = self._whois_lookup(target)
            self.results.append(whois_data)

        except Exception as e:
            self.logger.error(f"Scan failed: {e}", exc_info=True)
            raise

        self.logger.info(f"Scan complete. {len(self.results)} results found.")
        return self.results
```

**09:00–10:30 | OSINT: theHarvester + Amass**
- `pip install theHarvester` oder `apt install theharvester`
- `theHarvester -d target.com -b all -l 500`
- Amass: `go install github.com/owasp-amass/amass/v4/...`
- `amass enum -d target.com` → Subdomain Enumeration
- Vergleiche Ergebnisse: theHarvester vs Amass vs SpiderFoot

**11:00–12:00 | CHALLENGES: OverTheWire Bandit 26-33 (Abschluss!)**
- Bandit KOMPLETT abschließen
- Blog-Post: "OverTheWire Bandit Complete Walkthrough — Key Lessons"

**18:30–20:00 | DEEP LEARNING: Netzwerk-Analyse Praxis**
- malware-traffic-analysis.net → ersten PCAP herunterladen
- In Wireshark öffnen → Was siehst du?
- Lerne: Follow TCP Stream, Export Objects, Statistics → Conversations

**21:00–22:30 | PROJEKT: Bandit-Writeup finalisieren + GitHub**

---

### Dienstag-Freitag (Tage 37-40) — Patterns fortsetzen

**Dienstag:** Python Datenbankanbindung (SQLite3) + TryHackMe "OWASP Top 10" + Netzwerk HTTP/HTTPS Deep Dive
**Mittwoch:** Python Socket Programming + OverTheWire Natas 0-7 + Netzwerk Firewall/NAT Konzepte
**Donnerstag:** Python argparse CLI + TryHackMe "Burp Suite Basics" + Wireshark HTTP-Analyse
**Freitag:** Python Unit Testing + Natas 8-15 + Netzwerk VPN/Proxy Konzepte

---

## WOCHE 7 — OSINT Advanced + Netzwerk-Scanning

### Fokus diese Woche
- **Python:** Subprocess, OS-Module, System-Interaction
- **OSINT:** Geolocation, Image Analysis, Social Media OSINT
- **Netzwerk:** Scanning, Enumeration, Service Detection
- **Challenges:** TryHackMe "Advent of Cyber" (falls verfügbar) oder weiter Natas

### Montag (Tag 43) — Geolocation OSINT

**06:30–08:30 | DEEP TECHNICAL: Python + Subprocess**
```python
import subprocess
import json

def run_nmap_scan(target, ports="1-1000"):
    """Nmap-Scan mit Python-Wrapper."""
    cmd = ['nmap', '-sV', '-sC', '-p', ports, '-oX', '-', target]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
        return result.stdout
    except subprocess.TimeoutExpired:
        return "Scan timed out"

def run_whois(domain):
    """WHOIS-Abfrage."""
    result = subprocess.run(['whois', domain], capture_output=True, text=True)
    return result.stdout

def automated_recon(target):
    """Automatisierte Reconnaissance Pipeline."""
    print(f"[*] Starting recon for: {target}")

    # Phase 1: DNS
    print("[*] Phase 1: DNS Resolution")
    dns = subprocess.run(['dig', '+short', target], capture_output=True, text=True)
    ips = dns.stdout.strip().split('\n')
    print(f"    Found IPs: {ips}")

    # Phase 2: WHOIS
    print("[*] Phase 2: WHOIS")
    whois_data = run_whois(target)

    # Phase 3: Nmap
    print("[*] Phase 3: Port Scan")
    for ip in ips:
        if ip:
            scan = run_nmap_scan(ip)
            print(f"    Scan for {ip} complete")

    return {"target": target, "ips": ips, "whois": whois_data}
```

**09:00–10:30 | OSINT: Geolocation Training**
- SunCalc (suncalc.org) — Sonnenstand berechnen für Chronolocation
- Overpass Turbo (overpass-turbo.eu) — OpenStreetMap Abfragen
- Google Earth Pro → Historische Satellitenbilder
- PeakFinder (peakfinder.org) — Berge identifizieren
- **Übung:** @quiztime auf Twitter/X folgen → Tagesaufgabe lösen
- **Übung:** GeoGuessr spielen (30 Min) — baut echte Geolocation-Skills

**11:00–12:00 | CHALLENGES: TryHackMe**
- Room: "Network Services" (SMB, Telnet, FTP)
- Room: "Network Services 2" (NFS, SMTP, MySQL)

**18:30–20:00 | DEEP LEARNING: Netzwerk-Scanning Theorie**
- Nmap Doku: nmap.org/book/man.html (offizielles Handbuch)
- Scan-Typen verstehen:
  - TCP Connect Scan (-sT): Vollständiger 3-Way-Handshake
  - SYN Scan (-sS): Halb-offen, schneller, default
  - UDP Scan (-sU): Langsam aber wichtig
  - OS Detection (-O): Fingerprinting
  - Version Detection (-sV): Service + Version
  - Script Scan (-sC): NSE Scripts

**21:00–22:30 | PROJEKT: Automated Recon Script**
- Kombiniere alle bisherigen Tools in ein Master-Script
- Input: Domain
- Output: HTML-Report mit DNS, WHOIS, Ports, OSINT-Daten

---

### Dienstag-Freitag (Tage 44-47) — Patterns fortsetzen

**Dienstag:** Image OSINT (Reverse Image Search, EXIF-Analyse, PimEyes Verständnis) + TryHackMe "Linux Fundamentals Part 3"
**Mittwoch:** Social Media OSINT (Sherlock, Maigret, Holehe) + TryHackMe "Active Reconnaissance"
**Donnerstag:** Dark Web OSINT Verständnis (Tor, .onion, Monitoring-Theorie) + TryHackMe "Passive Reconnaissance"
**Freitag:** OSINT Report Writing (erste professionelle Investigation) + TryHackMe "Vulnerability"

---

## WOCHE 8 — Capstone: Eigenes OSINT-Framework + Erstes CTF

### Montag (Tag 50) — Framework-Architektur

**06:30–08:30 | DEEP TECHNICAL: OSINT Framework bauen**
```python
"""
OSINT Investigation Framework — Monat 2 Capstone Project
Architektur: Modular, Plugin-basiert, Report-fähig
"""
import json
import os
from datetime import datetime
from abc import ABC, abstractmethod

class Module(ABC):
    """Basis-Klasse für alle OSINT-Module."""

    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.results = []

    @abstractmethod
    def run(self, target):
        pass

    def get_results(self):
        return self.results

class DNSModule(Module):
    def __init__(self):
        super().__init__("DNS Lookup", "Resolve DNS records for target domain")

    def run(self, target):
        import subprocess
        record_types = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME']
        for rtype in record_types:
            result = subprocess.run(
                ['dig', '+short', rtype, target],
                capture_output=True, text=True
            )
            if result.stdout.strip():
                self.results.append({
                    'type': rtype,
                    'records': result.stdout.strip().split('\n')
                })
        return self.results

class EmailModule(Module):
    def __init__(self):
        super().__init__("Email Hunter", "Find email addresses for target")

    def run(self, target):
        # Placeholder — hier APIs anbinden
        self.results.append({'source': 'placeholder', 'emails': []})
        return self.results

class Investigation:
    """Hauptklasse für eine OSINT-Investigation."""

    def __init__(self, case_name, target):
        self.case_name = case_name
        self.target = target
        self.created = datetime.now().isoformat()
        self.modules = []
        self.findings = {}

    def add_module(self, module):
        self.modules.append(module)

    def run_all(self):
        for module in self.modules:
            print(f"[*] Running: {module.name}")
            module.run(self.target)
            self.findings[module.name] = module.get_results()
            print(f"    Found {len(module.get_results())} results")

    def generate_report(self, output_dir="reports"):
        os.makedirs(output_dir, exist_ok=True)
        report = {
            'case_name': self.case_name,
            'target': self.target,
            'created': self.created,
            'completed': datetime.now().isoformat(),
            'findings': self.findings
        }
        filepath = os.path.join(output_dir, f"{self.case_name}_{self.target}.json")
        with open(filepath, 'w') as f:
            json.dump(report, f, indent=2)
        print(f"[+] Report saved: {filepath}")
        return filepath

# Nutzung:
if __name__ == "__main__":
    inv = Investigation("test_case_001", "example.com")
    inv.add_module(DNSModule())
    inv.add_module(EmailModule())
    inv.run_all()
    inv.generate_report()
```

**09:00–10:30 | OSINT: Erste echte Mini-Investigation**
- Wähle ein öffentliches Ziel (z.B. eine Phishing-Domain aus PhishTank)
- Führe eine komplette OSINT-Investigation durch:
  1. Domain-Info (WHOIS, DNS)
  2. Hosting-Info (IP, Provider)
  3. Technologie-Stack (Wappalyzer, BuiltWith)
  4. Verbundene Domains/IPs
  5. Timeline der Domain-Registrierung
- Erstelle einen professionellen 1-Seiten-Report

**11:00–12:00 | CHALLENGES: Erstes CTF vorbereiten**
- CTFtime.org → nächstes Anfänger-CTF finden
- Oder: PicoCTF Archive durcharbeiten (3-5 Challenges)

**21:00–22:30 | PROJEKT: Framework-Code auf GitHub + README**
- Professionelles README mit: Installation, Usage, Screenshots
- Gib dem Tool einen Namen → dein erster "richtiger" GitHub-Star-Kandidat

---

### Dienstag-Donnerstag — Framework ausbauen + CTF-Prep
- **Module hinzufügen:** WHOIS, Subdomain Enum, Port Scan, Screenshot
- **HTML-Report Generator** statt nur JSON
- **TryHackMe:** "Jr Penetration Tester" Path weitermachen

### Freitag (Tag 54) — Review + Nächsten Monat planen
- **Alle Monats-Ziele überprüfen** (Checkliste oben)
- Lücken identifizieren → Wochenende zum Aufholen nutzen

### Samstag — Deep Work (8h)
- 4h: OSINT Framework polieren + auf GitHub pushen
- 4h: Erstes CTF teilnehmen (CyberDefenders oder PicoCTF)

### Sonntag — Review + Planung (3h)
- Blog-Post: "Month 2 Review — What I Learned"
- Monat 3 Datei öffnen → nächste Woche planen

---

## KPI-CHECKLISTE MONAT 2

| KPI | Ziel | Status |
|-----|------|--------|
| Python OOP | Classes + Inheritance verstanden | [ ] |
| Python APIs | 3+ APIs integriert | [ ] |
| Python Regex | Log-Analyse Script | [ ] |
| Python Scraping | BeautifulSoup + requests | [ ] |
| Python Threading | Parallele API-Calls | [ ] |
| OSINT Framework | Eigenes Tool (500+ Zeilen) | [ ] |
| Maltego | 10+ Transforms + Custom Transform | [ ] |
| SpiderFoot | Vollständiger Scan durchgeführt | [ ] |
| Recon-ng | 5+ Module benutzt | [ ] |
| theHarvester | Domain Scan | [ ] |
| Wireshark | Display Filter beherrscht | [ ] |
| TCP/IP | 3-Way Handshake erklären können | [ ] |
| DNS | Record-Typen + dig/nslookup | [ ] |
| Nmap | Alle Scan-Typen kennen | [ ] |
| OverTheWire | Bandit KOMPLETT (0-33) | [ ] |
| OverTheWire | Natas 0-15 | [ ] |
| TryHackMe | 60+ Rooms total | [ ] |
| Blog | 4 Posts geschrieben | [ ] |
| CTF | Erstes CTF teilgenommen | [ ] |
| GitHub | OSINT-Tool mit gutem README | [ ] |

---

## SOCIAL ENGINEERING NEBENTHREAD (Monat 2)

**Buch:** Robert Cialdini — "Influence" Kapitel 3-4 (Social Proof, Liking)
**Podcast:** Darknet Diaries — Social Engineering Episodes (EP 12, 50, 69)
**Praxis:** Analysiere 3 Phishing-Emails (Sammle sie aus Spam-Ordner):
- Welche Cialdini-Prinzipien werden benutzt?
- Welche technischen Indikatoren verraten den Phishing-Versuch?
- Schreibe eine kurze Analyse für jede Email
