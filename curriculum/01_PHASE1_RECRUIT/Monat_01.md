# MONAT 1 — FOUNDATIONS: Python + Linux + OSINT + Netzwerk

## Monats-Ziele (nicht verhandelbar)
- [ ] Python Kapitel 1–10 (Automate the Boring Stuff) abgeschlossen
- [ ] OverTheWire Bandit Level 0–15 gelöst
- [ ] TryHackMe: 30+ Rooms abgeschlossen
- [ ] OSINT: 15+ Tools hands-on getestet
- [ ] Erstes Python+OSINT Script geschrieben
- [ ] Blog aufgesetzt (GitHub Pages)
- [ ] Linux als Daily Driver für alle Security-Arbeit
- [ ] Rechtliche Grundlagen gelesen und verstanden

### Rechtliche Grundlagen (parallel zu Woche 1-4)

Parallel zu allen technischen Inhalten MUSST du die rechtlichen Rahmenbedingungen kennen:

- **§202a StGB (Ausspähen von Daten):** Unbefugter Zugang zu besonders gesicherten Daten ist strafbar.
- **§202b StGB (Abfangen von Daten):** Unbefugtes Abfangen nichtöffentlicher Datenübermittlungen ist strafbar.
- **§202c StGB (Vorbereiten):** Bereits das Beschaffen von Hacking-Tools mit Schadensabsicht kann strafbar sein.
- **CFAA (USA):** Grundlagen kennen — betrifft dich bei internationalen Bug Bounties.
- **Responsible Disclosure:** Sicherheitslücken immer verantwortungsvoll melden. Koordinierte Offenlegung über Bug-Bounty-Plattformen oder direkt an den Hersteller.
- **GOLDENE REGEL:** IMMER schriftliche Genehmigung (Scope of Work, Rules of Engagement) holen bevor du ein System testest. Kein Pentest ohne Vertrag. Keine Ausnahmen.
- Leseempfehlung: CCC Hackerethik (ccc.de/de/hackerethik) und PTES Pre-Engagement Section.

---

## WOCHE 1 — TAG FÜR TAG

### Montag (Tag 1) — Der Anfang

**06:30–08:30 | DEEP TECHNICAL: Python Basics**
- automatetheboringstuff.com/2e/chapter1
- Kapitel 1: Python Basics (Expressions, Datentypen, Variablen)
- Kapitel 2: Flow Control (if/else, while, for, break, continue)
- Aufgabe: Schreibe einen einfachen Passwort-Generator
- Setup: Python 3.12+ installieren, VS Code mit Python Extension
```python
# Dein erstes Security-Script: Passwort-Generator
import random
import string

def generate_password(length=16):
    chars = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(chars) for _ in range(length))

for i in range(5):
    print(generate_password())
```

**09:00–10:30 | OSINT: Framework + Mindset**
- osintframework.com durchklicken — verstehe die Kategorien
- Erstelle eine Mindmap (Papier oder draw.io): OSINT-Kategorien
  - Username → Email → Phone → IP → Domain → Social Media → Geolocation → Image
- Installiere: Firefox mit diesen Extensions:
  - Wappalyzer, BuiltWith, Shodan, User-Agent Switcher, FoxyProxy
- Lies: Michael Bazzell "OSINT Techniques" Kapitel 1–2

**10:30–11:00 | NEWS**
- thehackernews.com — Top 3 Stories lesen
- bleepingcomputer.com — Top 3 Stories lesen
- Abonniere: tl;dr sec Newsletter (tldrsec.com)

**11:00–12:00 | CHALLENGES: TryHackMe Start**
- Account erstellen auf tryhackme.com
- Room: "Tutorial" (TryHackMe kennenlernen)
- Room: "Starting Out in Cyber Sec"
- Starte: "Introduction to Cyber Security" Learning Path

**12:00–13:00 | Mittagspause + Podcast**
- Darknet Diaries Episode 1: "The Phreaker" (Einstieg in die Szene)

**13:00–16:00 | SAYTEC**

**16:00–18:00 | GYM**

**18:30–20:00 | DEEP LEARNING: Linux Basics**
- Buch: "The Linux Command Line" von William Shotts (kostenlos: linuxcommand.org)
- Kapitel 1–3: Navigation, Dateisystem, Befehle
- Installiere eine Linux VM (Kali Linux) in VirtualBox/VMware
- Oder: Windows WSL2 mit Kali einrichten
- Befehle üben: ls, cd, pwd, cat, less, head, tail, grep, find, chmod, chown

**20:00–21:00 | ISLAM**

**21:00–22:30 | PROJEKT: Blog Setup**
- GitHub Account erstellen (falls nicht vorhanden)
- GitHub Pages Blog aufsetzen mit Hugo oder Jekyll
- Theme: einfach, clean, professionell
- Erster Post: "Tag 1 — Meine Cybersecurity Journey beginnt"
- Warum Blog? → Hiring Managers checken GitHub + Blog ZUERST

---

### Dienstag (Tag 2) — Python + DNS OSINT

**06:30–08:30 | DEEP TECHNICAL: Python**
- Kapitel 2 (Vertiefung): Flow Control vollständig
- Kapitel 3: Functions (def, return, scope, local/global)
- Aufgabe: Schreibe einen Brute-Force Login Simulator (gegen dein eigenes Script)
```python
# Brute-Force Simulator (nur zum Lernen — NIE gegen echte Systeme!)
import itertools
import string

def brute_force_pin(target_pin, max_length=4):
    attempts = 0
    for length in range(1, max_length + 1):
        for combo in itertools.product(string.digits, repeat=length):
            attempts += 1
            guess = ''.join(combo)
            if guess == target_pin:
                return guess, attempts
    return None, attempts

pin, tries = brute_force_pin("1337")
print(f"PIN gefunden: {pin} nach {tries} Versuchen")
```

**09:00–10:30 | OSINT: Domain Intelligence**
- WHOIS Lookup: whois.domaintools.com — Suche 5 Domains
- crt.sh — Certificate Transparency Logs durchsuchen
- DNSDumpster.com — DNS Reconnaissance
- SecurityTrails.com — Historische DNS-Records
- ViewDNS.info — Reverse IP, DNS Report
- Aufgabe: Nimm eine beliebige Firma und finde:
  - Alle Subdomains
  - IP-Adressen
  - Mail-Server
  - Historische DNS-Änderungen
  - Wer hat die Domain registriert?

**10:30–11:00 | NEWS** (wie Montag)

**11:00–12:00 | CHALLENGES: TryHackMe**
- Room: "Linux Fundamentals Part 1"
- Beginne: OverTheWire Bandit (overthewire.org/wargames/bandit)
  - Level 0 → Level 3

**18:30–20:00 | DEEP LEARNING: Linux + Netzwerk**
- Linux Command Line Buch: Kapitel 4–6 (Manipulating Files)
- Netzwerk-Grundlagen: Was ist TCP/IP? DNS? HTTP?
- Video: Professor Messer Network+ (YouTube) — erste 3 Videos

**21:00–22:30 | PROJEKT: Erste OSINT-Investigation**
- Wähle eine öffentliche Person (Politiker, CEO, Influencer)
- Finde NUR mit öffentlichen Quellen:
  - Alle Social Media Profile
  - Email-Adressen (Hunter.io, phonebook.cz)
  - Verbundene Domains/Websites
  - Berufliche Geschichte
- Dokumentiere alles in einem Markdown-File
- WICHTIG: Nur legale, öffentliche Quellen. Keine Hacks.

---

### Mittwoch (Tag 3) — Python Listen + Email OSINT

**06:30–08:30 | DEEP TECHNICAL: Python**
- Kapitel 4: Lists (Listen, Tupel, Referenzen)
- Kapitel 5: Dictionaries (Key-Value Pairs, get(), setdefault())
- Aufgabe: Baue einen einfachen Port-Scanner
```python
# Einfacher Port Scanner
import socket

def scan_port(host, port):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((host, port))
        sock.close()
        return result == 0
    except:
        return False

target = "scanme.nmap.org"  # Nmap's offizielles Test-Target
common_ports = [21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 995, 3306, 3389, 8080]

print(f"Scanning {target}...")
for port in common_ports:
    if scan_port(target, port):
        print(f"  Port {port}: OPEN")
```

**09:00–10:30 | OSINT: Email Intelligence**
- Hunter.io — Finde Emails einer Organisation
- phonebook.cz — Email + Domain Suche
- Have I Been Pwned (haveibeenpwned.com) — Breach-Check
- EmailRep.io — Email Reputation Check
- Epieos.com — Google Account Investigation von Email
- Holehe (github.com/megadose/holehe) — installieren + testen
  - `pip install holehe`
  - `holehe test@example.com`
  - Zeigt auf welchen Plattformen die Email registriert ist
- Aufgabe: Finde alle registrierten Accounts einer Test-Email

**11:00–12:00 | CHALLENGES**
- TryHackMe: "Linux Fundamentals Part 2"
- OverTheWire Bandit: Level 4–6

**18:30–20:00 | DEEP LEARNING**
- Bazzell Buch Kapitel 3–4 (OSINT Techniques)
- Social Engineering Buch starten: "Influence" von Robert Cialdini
  - Kapitel 1: Weapons of Influence (Automatische Compliance-Muster)

**21:00–22:30 | PROJEKT: Python + OSINT kombinieren**
- Baue dein erstes OSINT-Tool:
```python
# Email OSINT Script
import requests
import json

def check_hibp(email):
    """Check Have I Been Pwned (benötigt API Key)"""
    # Für den Anfang: manuell auf haveibeenpwned.com checken
    print(f"Check HIBP manually: https://haveibeenpwned.com/account/{email}")

def check_emailrep(email):
    """Check EmailRep.io"""
    url = f"https://emailrep.io/{email}"
    headers = {"User-Agent": "OSINT-Tool-Learning"}
    try:
        r = requests.get(url, headers=headers)
        data = r.json()
        print(f"\n--- EmailRep Results for {email} ---")
        print(f"Reputation: {data.get('reputation', 'N/A')}")
        print(f"Suspicious: {data.get('suspicious', 'N/A')}")
        print(f"References: {data.get('references', 'N/A')}")
        details = data.get('details', {})
        print(f"Profiles: {details.get('profiles', [])}")
    except Exception as e:
        print(f"Error: {e}")

email = input("Enter email to investigate: ")
check_hibp(email)
check_emailrep(email)
```

---

### Donnerstag (Tag 4) — Python Strings + Geolocation OSINT

**06:30–08:30 | DEEP TECHNICAL: Python**
- Kapitel 6: Strings (Manipulation, f-strings, Methoden)
- Kapitel 7: Pattern Matching mit Regular Expressions
- Regex ist ESSENTIELL für Security. Übe auf regex101.com
- Aufgabe: Schreibe einen Regex-basierten Log Parser
```python
import re

# Apache Log Parser
log_line = '192.168.1.100 - - [10/Feb/2026:06:30:00 +0100] "GET /admin HTTP/1.1" 403 287'

pattern = r'(\d+\.\d+\.\d+\.\d+) .* \[(.+?)\] "(\w+) (.+?) .+" (\d+) (\d+)'
match = re.match(pattern, log_line)

if match:
    ip, timestamp, method, path, status, size = match.groups()
    print(f"IP: {ip}")
    print(f"Time: {timestamp}")
    print(f"Request: {method} {path}")
    print(f"Status: {status}")
    if status.startswith('4') or status.startswith('5'):
        print("⚠ Suspicious request!")
```

**09:00–10:30 | OSINT: Geolocation**
- Google Earth Pro installieren (kostenlos)
- SunCalc.org — Sonnenstand für Chronolocation
- Peakfinder.org — Bergidentifikation
- Overpass Turbo (overpass-turbo.eu) — OpenStreetMap Queries
- GeoGuessr spielen (ja, ernsthaft — baut echte Geolocation Skills)
- Aufgabe: Nimm 5 zufällige Fotos und bestimme den Aufnahmeort

**11:00–12:00 | CHALLENGES**
- TryHackMe: "Linux Fundamentals Part 3"
- OverTheWire Bandit: Level 7–9
- TryHackMe: "OhSINT" Room (OSINT Challenge)

**18:30–20:00 | DEEP LEARNING**
- Netzwerk: TCP/IP Grundlagen vertiefen
- Wireshark installieren + erste Capture starten
- Video: "Wireshark Tutorial for Beginners" (Chris Greer, YouTube)
- Capture deinen eigenen Netzwerkverkehr, filtere nach HTTP, DNS

**21:00–22:30 | PROJEKT: OSINT Investigation fortsetzen**
- Erweitere deine Investigation von Dienstag
- Füge Geolocation-Daten hinzu
- Beginne einen Timeline-Abschnitt
- Schreibe alles im Report-Format

---

### Freitag (Tag 5) — Python Dateien + Social Media OSINT

**06:30–08:30 | DEEP TECHNICAL: Python**
- Kapitel 8: Input Validation
- Kapitel 9: Reading and Writing Files (open, read, write, with)
- Aufgabe: Schreibe einen File Hash Calculator
```python
import hashlib
import sys
import os

def hash_file(filepath):
    """Calculate MD5, SHA1, SHA256 of a file"""
    md5 = hashlib.md5()
    sha1 = hashlib.sha1()
    sha256 = hashlib.sha256()

    with open(filepath, 'rb') as f:
        while chunk := f.read(8192):
            md5.update(chunk)
            sha1.update(chunk)
            sha256.update(chunk)

    return {
        'MD5': md5.hexdigest(),
        'SHA1': sha1.hexdigest(),
        'SHA256': sha256.hexdigest()
    }

if len(sys.argv) > 1:
    filepath = sys.argv[1]
    if os.path.exists(filepath):
        hashes = hash_file(filepath)
        print(f"\nFile: {filepath}")
        print(f"Size: {os.path.getsize(filepath)} bytes")
        for algo, h in hashes.items():
            print(f"{algo}: {h}")
    else:
        print(f"File not found: {filepath}")
else:
    print("Usage: python hash_file.py <filepath>")
```

**09:00–10:30 | OSINT: Social Media**
- Sherlock installieren: `pip install sherlock-project`
  - `sherlock username` — findet Accounts auf 300+ Plattformen
- Maigret (github.com/soxoj/maigret) — noch mächtiger als Sherlock
  - `pip install maigret`
  - `maigret username`
- WhatsMyName (whatsmyname.app) — Username Enumeration
- Social-Analyzer (github.com/qeeqbox/social-analyzer)
- Aufgabe: Nimm einen öffentlichen Username und finde alle Profile

**11:00–12:00 | CHALLENGES**
- TryHackMe: "Sakura Room" (OSINT Challenge — hervorragend!)
- Weekly Report: Dokumentiere was du diese Woche gelernt hast

**18:30–20:00 | DEEP LEARNING**
- Bazzell Buch Kapitel 5–6
- Cialdini "Influence" Kapitel 2: Reciprocation

**21:00–22:30 | PROJEKT: Erstes Python+OSINT Tool**
- Kombiniere alles aus der Woche:
```python
# OSINT Aggregator v0.1
import subprocess
import os
from datetime import datetime

def run_investigation(target_username):
    """Run multiple OSINT tools against a username"""
    report_dir = f"investigations/{target_username}_{datetime.now().strftime('%Y%m%d')}"
    os.makedirs(report_dir, exist_ok=True)

    print(f"\n{'='*60}")
    print(f"OSINT Investigation: {target_username}")
    print(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"Report Directory: {report_dir}")
    print(f"{'='*60}\n")

    # Sherlock
    print("[*] Running Sherlock...")
    os.system(f"sherlock {target_username} --output {report_dir}/sherlock_results.txt")

    # Add more tools as you learn them
    print(f"\n[+] Investigation complete. Results in: {report_dir}/")

if __name__ == "__main__":
    username = input("Target username: ")
    run_investigation(username)
```

---

### Samstag (Tag 6) — Deep Work

**08:00–12:00 | DEEP INVESTIGATION (4h)**
- Finde einen echten, öffentlich dokumentierten Scam-Fall
- Recherchiere den Fall komplett:
  - Welche Domains wurden benutzt?
  - Whois-Daten der Domains
  - Social Media Profile der Scammer
  - Welche Zahlungsmethoden?
  - Wie wurde der Scam aufgedeckt?
- Dokumentiere alles als professionellen Report
- Quellen: BBC, Krebs on Security, BleepingComputer, Scam-Warnungen

**13:00–17:00 | CHALLENGES + REVIEW (4h)**
- PicoCTF (picoctf.org) — Melde dich an, löse 5+ Challenges
- Python Review: Gehe nochmal durch alle Konzepte der Woche
- Löse 3 Coding Challenges auf codewars.com oder leetcode.com (Easy)
- TryHackMe: "Intro to Offensive Security" Path weiter

---

### Sonntag (Tag 7) — Review + Planung

**09:00–12:00 | REVIEW + PLANUNG (3h)**

**Wochenreview-Template (nutze das JEDE Woche):**
```markdown
# Woche 1 Review

## Was ich gelernt habe
- Python: [spezifische Konzepte]
- OSINT: [Tools + Techniken]
- Linux: [Befehle + Konzepte]
- Challenges: [gelöste Rooms/Levels]

## Was ich gebaut habe
- [Scripts, Tools, Reports]

## Wo ich Probleme hatte
- [Spezifische Schwierigkeiten]

## KPIs
- Python Kapitel abgeschlossen: _/10
- TryHackMe Rooms: _/30 (Monats-Ziel)
- OverTheWire Levels: _/15
- OSINT Tools getestet: _/15
- Blog Posts geschrieben: _

## Plan für nächste Woche
- [Prioritäten]
```

**Rest des Tages: FREI + Islam**

---

## WOCHE 2 — Python Regex + Reconnaissance Tools

### Fokus der Woche
- Python: Kapitel 7–9 vertiefen (Regex, Files, Web Scraping Intro)
- OSINT Tools: Maltego CE, SpiderFoot, VirusTotal
- Linux: OverTheWire Bandit Level 10–15
- TryHackMe: 8+ weitere Rooms
- Social Engineering: Cialdini Kapitel 3–4

### Montag
**06:30–08:30** Python Regex Deep Dive: regex101.com üben, 20+ Patterns schreiben
- IP-Adressen extrahieren: `\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b`
- Email-Adressen: `[\w.+-]+@[\w-]+\.[\w.]+`
- URLs: `https?://[\w./\-?=&%+#]+`
- Schreibe einen Log-Analyzer der alle IPs, Emails, URLs aus einer Datei extrahiert

**09:00–10:30** OSINT: Maltego CE installieren + Tutorial
- Maltego Community Edition (kostenlos) herunterladen
- Transforms verstehen: Entity → Transform → Neue Entities
- Übung: Domain → DNS → IPs → Whois → Emails → Social Media
- Erstelle einen Maltego-Graphen für eine Firma deiner Wahl

**11:00–12:00** TryHackMe: "Nmap" Room + "Network Services" Room

**18:30–20:00** OverTheWire Bandit Level 10–12 + Linux Buch Kapitel 7–9

**21:00–22:30** Projekt: Erweitere deinen Log-Parser zu einem vollständigen Tool

### Dienstag
**06:30–08:30** Python: Web Requests kennenlernen
```python
import requests

# VirusTotal API (kostenloser API Key)
VT_API_KEY = "YOUR_KEY_HERE"  # Registriere dich auf virustotal.com

def check_virustotal(domain):
    url = f"https://www.virustotal.com/api/v3/domains/{domain}"
    headers = {"x-apikey": VT_API_KEY}
    r = requests.get(url, headers=headers)
    if r.status_code == 200:
        data = r.json()
        attrs = data['data']['attributes']
        print(f"Domain: {domain}")
        print(f"Reputation: {attrs.get('reputation', 'N/A')}")
        stats = attrs.get('last_analysis_stats', {})
        print(f"Malicious: {stats.get('malicious', 0)}")
        print(f"Suspicious: {stats.get('suspicious', 0)}")
        print(f"Clean: {stats.get('harmless', 0)}")
```

**09:00–10:30** OSINT: SpiderFoot
- SpiderFoot HX (cloud) oder SpiderFoot Open Source installieren
- `pip install spiderfoot` → `sf -l 127.0.0.1:5001`
- Starte einen Scan gegen eine Test-Domain
- Vergleiche Ergebnisse mit Maltego

**11:00–12:00** TryHackMe: "OSINT" Learning Path Rooms

**18:30–20:00** Netzwerk: DNS Deep Dive
- Wie funktioniert DNS Resolution? (Root → TLD → Authoritative)
- DNS Record Types: A, AAAA, MX, TXT, CNAME, NS, SOA, PTR
- dig, nslookup, host Befehle üben
- DNS Recon: `dnsrecon -d target.com`

**21:00–22:30** Blog Post schreiben: "Meine Top 5 OSINT Tools nach Woche 2"

### Mittwoch
**06:30–08:30** Python: File I/O + CSV/JSON
- CSV-Dateien lesen/schreiben (csv module)
- JSON-Dateien parsen (json module)
- Aufgabe: Schreibe ein Tool das OSINT-Ergebnisse als JSON speichert

**09:00–10:30** OSINT: VirusTotal + Threat Intelligence
- VirusTotal.com: Domain, IP, Hash Lookups
- AbuseIPDB.com: IP Reputation
- Shodan.io: Account erstellen, erste Suchen
- Censys.io: Internet-Geräte durchsuchen
- Aufgabe: Finde alle Geräte einer Organisation über Shodan

**11:00–12:00** OverTheWire Bandit Level 13–15 + TryHackMe Rooms

**18:30–20:00** Linux: Permissions, Users, Groups, Bash Scripting Basics

**21:00–22:30** Projekt: OSINT Results Aggregator erweitern (JSON Export)

### Donnerstag
**06:30–08:30** Python: Error Handling + Modules
- try/except/finally
- Eigene Module erstellen
- pip packages: requests, beautifulsoup4, python-whois

**09:00–10:30** OSINT: Reverse Image Search + Exif
- Google Reverse Image Search
- Yandex Reverse Image (oft bessere Ergebnisse als Google!)
- TinEye
- PimEyes.com (Gesichtserkennung — verstehe wie es funktioniert)
- ExifTool installieren: Foto-Metadaten auslesen
- Aufgabe: Finde den Ursprung von 5 Bildern

**11:00–12:00** TryHackMe: "Searchlight" Room + "Geolocating Images" Room

**18:30–20:00** Cialdini "Influence" Kapitel 3–4: Commitment & Consistency, Social Proof

**21:00–22:30** Projekt: Exif Data Extractor in Python
```python
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS

def get_exif(image_path):
    img = Image.open(image_path)
    exif_data = img._getexif()
    if exif_data:
        for tag_id, value in exif_data.items():
            tag = TAGS.get(tag_id, tag_id)
            print(f"{tag}: {value}")
```

### Freitag
**06:30–08:30** Python: Klassen + OOP Basics (nur Grundlagen — nicht zu tief)

**09:00–10:30** OSINT: theHarvester + Recon-ng
- theHarvester: `theHarvester -d target.com -b all`
- Recon-ng: Framework starten, Module laden, Workspace erstellen
- Vergleiche: Maltego vs SpiderFoot vs theHarvester vs Recon-ng

**11:00–12:00** Wochenreview Challenges + TryHackMe

**18:30–20:00** Netzwerk: HTTP/HTTPS verstehen, Wireshark HTTP Capture analysieren

**21:00–22:30** Weekly Report + Blog Post

### Samstag (4h + 4h)
**Deep Work (4h):** Komplette OSINT Investigation einer Organisation
**Challenges (4h):** PicoCTF + TryHackMe + Bandit

### Sonntag
Review + KPIs + Woche 3 Planung

---

## WOCHE 3 — Python APIs + Shodan + Username OSINT

### Fokus
- Python: requests, BeautifulSoup, APIs, Web Scraping
- OSINT: Shodan API, Censys, Username OSINT, Phone OSINT
- Linux: Bash Scripting, Cron Jobs
- TryHackMe: 8+ Rooms
- Buch: Bazzell Kapitel 7–10

### Tägliche Highlights

**Montag:** Python requests Library Deep Dive + Shodan API
```python
import shodan

SHODAN_API_KEY = "YOUR_KEY"
api = shodan.Shodan(SHODAN_API_KEY)

# Suche nach verwundbaren Webcams
results = api.search("webcamxp")
print(f"Results found: {results['total']}")
for result in results['matches'][:5]:
    print(f"IP: {result['ip_str']}")
    print(f"Port: {result['port']}")
    print(f"Org: {result.get('org', 'N/A')}")
    print(f"Country: {result.get('location', {}).get('country_name', 'N/A')}")
    print("---")
```

**Dienstag:** BeautifulSoup + Web Scraping (ethisch, eigene Seiten oder erlaubte)
**Mittwoch:** Phone OSINT (Truecaller, PhoneInfoga, Numverify)
**Donnerstag:** Advanced Username OSINT (Maigret, Blackbird, Social-Analyzer)
**Freitag:** Eigenes OSINT-Dashboard bauen (Flask Web App)
**Samstag:** Deep Investigation: Echten Scam-Fall komplett dokumentieren
**Sonntag:** Review + Blog Post: "Building My First OSINT Tool in Python"

---

## WOCHE 4 — Netzwerk Deep + Professioneller Report

### Fokus
- Netzwerk: TCP/IP Stack, Wireshark Advanced, DNS Security
- Python: Scapy (Netzwerk-Programmierung)
- OSINT: Professionellen Report schreiben
- GitHub Repository veröffentlichen
- TryHackMe: "Pre Security" Path abschließen

### Tägliche Highlights

**Montag:** TCP/IP Deep Dive + Wireshark Filters
- tcp.flags.syn == 1 (SYN Scan erkennen)
- http.request.method == "POST" (Form Submissions)
- dns.qry.name contains "suspicious" (DNS Queries filtern)

**Dienstag:** Scapy Netzwerk-Programmierung
```python
from scapy.all import *

# ARP Scan des lokalen Netzwerks
def arp_scan(network):
    arp_request = ARP(pdst=network)
    broadcast = Ether(dst="ff:ff:ff:ff:ff:ff")
    packet = broadcast/arp_request
    answered = srp(packet, timeout=2, verbose=False)[0]

    devices = []
    for sent, received in answered:
        devices.append({
            'ip': received.psrc,
            'mac': received.hwsrc
        })
    return devices

# Nur im eigenen Netzwerk verwenden!
devices = arp_scan("192.168.1.0/24")
for d in devices:
    print(f"IP: {d['ip']}  MAC: {d['mac']}")
```

**Mittwoch:** DNS Security (DNSSEC, DNS over HTTPS, DNS Tunneling Erkennung)
**Donnerstag:** Professionellen OSINT Report schreiben (Template aus Fraud-Agent)
**Freitag:** GitHub Repository erstellen: "osint-toolkit" — alle Scripts der letzten 4 Wochen
**Samstag:** Capstone: Komplette Investigation mit Report + Präsentation
**Sonntag:** Monat 1 Review + KPIs prüfen + Monat 2 vorbereiten

---

## MONAT 1 — KPI CHECKLISTE

| KPI | Ziel | Erreicht? |
|-----|------|-----------|
| Python Kapitel (Automate the Boring Stuff) | 1–10 | [ ] |
| Eigene Python Scripts geschrieben | 10+ | [ ] |
| TryHackMe Rooms | 30+ | [ ] |
| OverTheWire Bandit Levels | 0–15 | [ ] |
| OSINT Tools hands-on getestet | 15+ | [ ] |
| OSINT Investigations dokumentiert | 3+ | [ ] |
| Blog Posts geschrieben | 4+ | [ ] |
| GitHub Repository erstellt | 1 | [ ] |
| Bücher gelesen (Kapitel) | Bazzell 1–10, Cialdini 1–4, Linux CLI 1–9 | [ ] |
| Podcasts gehört | 8+ Episoden | [ ] |

---

## TOOLS DIESES MONATS (Setup-Checkliste)

- [ ] Python 3.12+ installiert
- [ ] VS Code mit Python Extension
- [ ] Linux VM (Kali) oder WSL2
- [ ] Firefox mit Security Extensions
- [ ] Maltego CE
- [ ] SpiderFoot
- [ ] Sherlock (`pip install sherlock-project`)
- [ ] Maigret (`pip install maigret`)
- [ ] Holehe (`pip install holehe`)
- [ ] theHarvester
- [ ] Recon-ng
- [ ] Wireshark
- [ ] ExifTool
- [ ] Shodan Account (kostenlos)
- [ ] VirusTotal Account (API Key)
- [ ] TryHackMe Account
- [ ] PicoCTF Account
- [ ] GitHub Account + Pages Blog

---

## SOCIAL ENGINEERING THREAD — MONAT 1

**Buch:** Robert Cialdini — "Influence: The Psychology of Persuasion"
**Kapitel pro Woche:**
- Woche 1: Kap. 1 — Weapons of Influence
- Woche 2: Kap. 2 — Reciprocation
- Woche 3: Kap. 3 — Commitment & Consistency
- Woche 4: Kap. 4 — Social Proof

**Praktische Übung:**
- Analysiere 5 Phishing-Emails (findest du auf phishtank.org)
- Welche Cialdini-Prinzipien werden genutzt?
- Wie würdest du sie verbessern? (Defensive Perspektive!)

---

> **Nächste Datei:** [Monat_02.md](Monat_02.md) — Advanced Python, Netzwerk-Tiefe, Forensik-Intro
