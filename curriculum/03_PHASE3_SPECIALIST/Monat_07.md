# MONAT 7 — WEB APPLICATION HACKING (PortSwigger komplett)

## DAS LEVEL: Orange Tsai, nicht "OWASP Top 10 auswendig lernen"

Orange Tsai fand ProxyLogon und ProxyShell in Microsoft Exchange — Single Vulnerabilities die Hunderttausende Server weltweit kompromittierten. Er begann mit Web Security. Das ist dein Einstieg in Offensive Security.

---

## Monats-Ziele (nicht verhandelbar)
- [ ] PortSwigger Web Security Academy: 80–100 Labs gelöst (Fokus: SQLi, XSS, CSRF, SSRF, Auth, Access Control) — restliche Labs fortlaufend in Monat 8-9
- [ ] Burp Suite: Repeater, Intruder, Scanner, Extensions beherrscht
- [ ] SQL Injection: UNION-Based, Blind, Error-Based, Time-Based, Second-Order
- [ ] XSS: Reflected, Stored, DOM-Based, Mutation XSS
- [ ] SSRF: Basic, Blind, via Header Injection
- [ ] Deserialization: Java, PHP, Python, .NET
- [ ] Request Smuggling: CL.TE, TE.CL, TE.TE
- [ ] API Security: REST, GraphQL Enumeration + Exploitation
- [ ] Bug Bounty Account erstellt (HackerOne + Intigriti)
- [ ] Erste Bug Bounty Submission (auch wenn es ein Duplicate ist)

---

## WOCHE 25 — SQL INJECTION + BURP SUITE

### Montag (Tag 169) — Burp Suite Mastery + SQLi Fundamentals

**06:30–08:30 | DEEP TECHNICAL: Burp Suite Professional Setup**
- Burp Suite Professional kaufen (oder: Community Edition zum Lernen)
- Interface beherrschen:
  - **Proxy:** Browser-Traffic abfangen und modifizieren
  - **Repeater:** Requests manuell modifizieren und senden
  - **Intruder:** Automatisierte Angriffe (Brute Force, Fuzzing)
  - **Scanner:** Automatische Vulnerability-Erkennung
  - **Decoder:** Encoding/Decoding (Base64, URL, HTML)
  - **Comparer:** Request/Response vergleichen
- Extensions installieren:
  - **Autorize** — Authorization Testing
  - **Logger++** — Enhanced Logging
  - **Turbo Intruder** — Python-basierter schneller Intruder
  - **Param Miner** — Hidden Parameter Discovery
  - **ActiveScan++** — Enhanced Active Scanning
  - **J2EEScan** — Java EE Vulnerabilities

**09:00–12:00 | PortSwigger Academy: SQL Injection (3 Stunden Block)**
- portswigger.net/web-security/sql-injection
- ALLE Labs in Reihenfolge:
  1. Retrieving hidden data
  2. Subverting application logic
  3. UNION attacks (determining columns, extracting data)
  4. Examining the database (version, tables, columns)
  5. Blind SQL Injection (conditional responses, errors, time delays)
  6. Second-order SQL Injection

**18:30–20:00 | DEEP LEARNING: SQL Injection Theorie**
- Verstehe WARUM SQLi funktioniert (nicht nur Payloads kopieren):
  - Wie Datenbanken Queries parsen
  - Prepared Statements vs String Concatenation
  - MySQL vs PostgreSQL vs MSSQL vs Oracle — Unterschiede in Syntax
  - Information_schema Exploitation
  - File Read/Write via SQLi (LOAD_FILE, INTO OUTFILE)
  - OS Command Execution via SQLi (xp_cmdshell MSSQL)

**21:00–22:30 | PROJEKT: SQLi Cheat Sheet erstellen**
- Eigenes Cheat Sheet mit allen Payloads, kategorisiert nach DB-Typ
- Auf GitHub veröffentlichen

---

### Dienstag-Freitag (Tage 170-173) — PortSwigger Marathon

**Dienstag:** XSS (Reflected, Stored, DOM) — Alle PortSwigger XSS Labs
**Mittwoch:** Authentication + Access Control — Alle Labs + Business Logic Vulnerabilities
**Donnerstag:** SSRF + XXE — Server-Side Attacks
**Freitag:** CSRF + CORS + Clickjacking — Client-Side Attacks

---

## WOCHE 26-28 — ADVANCED WEB ATTACKS

### Woche 26: Deserialization + Request Smuggling
- **Insecure Deserialization** — Java (ysoserial), PHP (phpggc), Python (pickle), .NET
- **HTTP Request Smuggling** — CL.TE, TE.CL, TE.TE
  - James Kettle's Research: portswigger.net/research/http-desync-attacks
  - Alle PortSwigger Labs lösen
  - Verstehe: Warum Frontend/Backend unterschiedlich Content-Length/Transfer-Encoding interpretieren

### Woche 27: Advanced Injection + API Hacking
- **Server-Side Template Injection (SSTI)** — Jinja2, Twig, Freemarker
- **OS Command Injection** — Direct, Blind, Out-of-Band
- **GraphQL Exploitation** — Introspection, Injection, Authorization Bypass
- **REST API Testing** — Rate Limiting, BOLA/IDOR, Mass Assignment
- **WebSocket Security** — Interception, Injection

### Woche 28: Expert Labs + Bug Bounty Start
- PortSwigger Expert-Level Labs (die härtesten)
- **Bug Bounty vorbereiten:**
  1. HackerOne Account erstellen
  2. Intigriti Account erstellen
  3. Lese 20 Disclosed Reports (Reports lesen > Reports schreiben)
  4. Wähle ein Programm (Start: VDPs = Vulnerability Disclosure Programs, kein Geld aber einfacher)
  5. Reconnaissance auf dem Target (Subdomain Enum, Tech Stack, Parameter Discovery)
  6. Teste systematisch (NICHT random herumklicken)
- **Realistisch:** Dein erster Bug kommt wahrscheinlich erst in 2-4 Wochen aktiver Suche

---

## KPI-CHECKLISTE MONAT 7

| KPI | Ziel | Status |
|-----|------|--------|
| PortSwigger | ALLE Apprentice Labs | [ ] |
| PortSwigger | ALLE Practitioner Labs | [ ] |
| PortSwigger | 50%+ Expert Labs | [ ] |
| Burp Suite | Repeater, Intruder, Scanner | [ ] |
| SQLi | UNION + Blind + Time-Based | [ ] |
| XSS | Reflected + Stored + DOM | [ ] |
| SSRF | Basic + Blind | [ ] |
| Deserialization | 2+ Sprachen | [ ] |
| Request Smuggling | CL.TE + TE.CL | [ ] |
| API Hacking | GraphQL + REST | [ ] |
| Bug Bounty | Account + erste Reconnaissance | [ ] |
| Blog | 2+ Web Security Write-ups | [ ] |
