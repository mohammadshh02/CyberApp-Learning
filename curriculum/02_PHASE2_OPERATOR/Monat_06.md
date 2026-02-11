# MONAT 6 — ADVANCED OSINT + Erste echte Investigation + Report Writing

## DAS LEVEL: Bellingcat/Citizen Lab Investigation Quality

Du schreibst nicht mehr "ich habe ein paar Domains recherchiert". Du führst eine Investigation durch die du einem Staatsanwalt, einem FINMA-Regulator oder einem BND-Abteilungsleiter vorlegen könntest.

---

## Monats-Ziele (nicht verhandelbar)
- [ ] Person-Tracking: Vollständige digitale Existenz einer Testperson kartiert
- [ ] Geolocation: 20+ @quiztime Challenges gelöst, GeoGuessr 2000+ Rating
- [ ] Telegram/Dark Web OSINT: Monitoring-Setup aufgebaut
- [ ] Facial Recognition OSINT: PimEyes, Yandex Reverse Image verstanden
- [ ] Corporate Investigation: Firmennetzwerk komplett aufgedeckt
- [ ] OSINT-Report: 15+ Seiten professioneller Report (Gerichts-Standard)
- [ ] ACH (Analysis of Competing Hypotheses): Angewendet
- [ ] CFE: Kapitel 7-10 gelesen
- [ ] Eigenes OSINT-Toolkit v2.0 auf GitHub (1000+ Zeilen)
- [ ] Erste Trace Labs CTF Teilnahme (oder ähnliches OSINT-CTF)

---

## DIE METHODIK: Wie Geheimdienste wirklich tracken

### Die Intelligence-Cycle für OSINT (nicht der Anfänger-Version)

**1. Requirements Definition** — Was GENAU willst du wissen?
- Nicht: "Finde Infos über Person X"
- Sondern: "Identifiziere alle digitalen Accounts, physischen Adressen der letzten 5 Jahre, Geschäftsverbindungen und Finanznetzwerke von Person X"

**2. Collection Plan** — Welche Quellen in welcher Reihenfolge?
- Start: Name → Email → Phone → Username → Social Media → Connections → Addresses → Financial
- Jede Information wird zum Pivot-Punkt für die nächste Suche

**3. Collection** — Systematisch, nicht zufällig
- Jede Quelle, jedes Tool, jedes Ergebnis wird protokolliert
- Zeitstempel für ALLES (Webseiten ändern sich)
- Screenshots + Wayback Machine Archivierung

**4. Processing** — Rohdaten strukturieren
- Deduplizierung, Kategorisierung, Timeline-Erstellung
- Maltego-Graph für Visualisierung

**5. Analysis** — Die eigentliche Intelligence-Arbeit
- ACH (Analysis of Competing Hypotheses) — mehrere Hypothesen aufstellen und systematisch testen
- Timeline Analysis — Chronologische Rekonstruktion
- Link Analysis — Verbindungen zwischen Entitäten
- Pattern of Life — Verhaltens-Muster erkennen

**6. Production** — Der Report
- Muss vor Gericht bestehen können
- Jede Aussage durch Beweis gestützt
- Klare Trennung: Fakt vs. Schlussfolgerung

---

## WOCHE 21 — PERSON-TRACKING (Intelligence-Grade)

### Montag (Tag 141) — Die Methodik

**06:30–08:30 | DEEP TECHNICAL: Person-Tracking Pipeline**

```python
"""
Intelligence-Grade Person Tracking Framework
WARNUNG: Nur für autorisierte Investigations verwenden!
Alle Methoden nutzen ausschließlich öffentlich verfügbare Quellen.
"""
import json
import hashlib
from datetime import datetime

class PersonInvestigation:
    def __init__(self, case_id, analyst_name):
        self.case_id = case_id
        self.analyst = analyst_name
        self.created = datetime.now().isoformat()
        self.seed_data = {}
        self.findings = []
        self.timeline = []
        self.connections = []
        self.hypotheses = []

    def add_seed(self, data_type, value, source="Initial"):
        """Seed-Daten hinzufügen (Ausgangsinformationen)."""
        self.seed_data[data_type] = {
            'value': value,
            'source': source,
            'timestamp': datetime.now().isoformat()
        }

    def add_finding(self, category, data, source, confidence):
        """
        Finding hinzufügen mit Quellenangabe und Confidence-Level.
        confidence: HIGH / MEDIUM / LOW / UNVERIFIED
        """
        finding = {
            'id': f"F-{len(self.findings)+1:04d}",
            'category': category,
            'data': data,
            'source': source,
            'confidence': confidence,
            'timestamp': datetime.now().isoformat(),
            'hash': hashlib.sha256(json.dumps(data, sort_keys=True).encode()).hexdigest()[:16]
        }
        self.findings.append(finding)
        return finding['id']

    def add_timeline_event(self, date, event, source, finding_id=None):
        """Timeline-Event hinzufügen."""
        self.timeline.append({
            'date': date,
            'event': event,
            'source': source,
            'finding_id': finding_id
        })
        self.timeline.sort(key=lambda x: x['date'])

    def add_connection(self, entity1, entity2, relationship, source):
        """Verbindung zwischen Entitäten."""
        self.connections.append({
            'entity1': entity1,
            'entity2': entity2,
            'relationship': relationship,
            'source': source,
            'timestamp': datetime.now().isoformat()
        })

    def ach_add_hypothesis(self, hypothesis):
        """Hypothese für ACH hinzufügen."""
        self.hypotheses.append({
            'hypothesis': hypothesis,
            'supporting_evidence': [],
            'contradicting_evidence': [],
            'status': 'ACTIVE'
        })

    def generate_report(self):
        """Professionellen Investigation Report generieren."""
        report = []
        report.append(f"{'='*70}")
        report.append(f"INVESTIGATION REPORT")
        report.append(f"Case ID: {self.case_id}")
        report.append(f"Analyst: {self.analyst}")
        report.append(f"Created: {self.created}")
        report.append(f"Generated: {datetime.now().isoformat()}")
        report.append(f"{'='*70}")
        report.append(f"\n1. EXECUTIVE SUMMARY")
        report.append(f"   Total Findings: {len(self.findings)}")
        report.append(f"   Timeline Events: {len(self.timeline)}")
        report.append(f"   Connections Mapped: {len(self.connections)}")
        report.append(f"\n2. SEED DATA")
        for dtype, data in self.seed_data.items():
            report.append(f"   {dtype}: {data['value']} (Source: {data['source']})")
        report.append(f"\n3. FINDINGS")
        for f in self.findings:
            report.append(f"   [{f['id']}] [{f['confidence']}] {f['category']}: {f['data']}")
            report.append(f"          Source: {f['source']}")
        report.append(f"\n4. TIMELINE")
        for t in self.timeline:
            report.append(f"   {t['date']} — {t['event']} (Source: {t['source']})")
        report.append(f"\n5. CONNECTIONS")
        for c in self.connections:
            report.append(f"   {c['entity1']} --[{c['relationship']}]--> {c['entity2']}")
        return '\n'.join(report)
```

**09:00–10:30 | INTELLIGENCE: Person-Tracking in der Praxis**

Die tatsächliche Sequenz (aus öffentlichen Quellen zusammengestellt):

1. **Seed Data** → Starte mit was du hast (Name, Email, Phone, Username, Foto)
2. **Email Pivot:**
   - holehe → Auf welchen Seiten registriert?
   - HaveIBeenPwned → Breach-Daten → Weitere Emails, Passwort-Muster
   - Epieos → Google Account Investigation
   - hunter.io → Business-Email-Muster
3. **Username Pivot:**
   - Maigret (3000+ Sites) → Alle Plattformen finden
   - sherlock → Cross-Platform
   - whatsmyname.app → Username-Checking
4. **Phone Pivot:**
   - Truecaller → Name/Adresse
   - sync.me → Adressbuch-Lookups
   - CallerID APIs
   - WhatsApp/Telegram → Profilbild, Status, Online-Zeiten
5. **Photo Pivot:**
   - Yandex Reverse Image (besser als Google für Gesichter!)
   - PimEyes → Gesichtserkennung im Internet
   - TinEye → Wo wurde das Bild noch verwendet?
   - EXIF-Daten → GPS-Koordinaten, Kamera-Info
6. **Social Media Deep Dive:**
   - Instagram: Locations, Hashtags, Tagged Photos, Followers-Graph
   - Twitter/X: Tweet-History, Replies, Followers-Analysis
   - LinkedIn: Beruflicher Werdegang, Connections
   - Facebook: Groups, Events, Friends
7. **Address Pivot:**
   - Google Maps + Street View
   - Grundbuchamt (Deutschland) → Eigentümer
   - Companies House (UK) / Handelsregister → Firmenverbindungen
   - Property Records
8. **Financial Pivot:**
   - Handelsregister → Firmenbeteiligungen
   - OpenCorporates → Internationale Firmensuche
   - Bankruptcy Records
   - Crypto Wallets (wenn bekannt)
9. **Pattern of Life:**
   - Posting-Zeiten → Schlafmuster → Zeitzone → Standort
   - Check-in Locations → Häufige Orte
   - Kontakt-Netzwerk → Wer interagiert am meisten?

**11:00–12:00 | CHALLENGES: OSINT CTF**
- Hacktoria (hacktoria.com) — Story-driven OSINT Challenges
- Oder: ozint.eu — Europäische OSINT Challenges

**18:30–20:00 | DEEP LEARNING: ACH (Analysis of Competing Hypotheses)**
- Lies: Richards Heuer — "Psychology of Intelligence Analysis" (kostenlos von cia.gov)
- Kapitel 8: Analysis of Competing Hypotheses
- ACH-Methodik:
  1. Identifiziere alle möglichen Hypothesen
  2. Liste alle Beweisstücke auf
  3. Für jedes Beweisstück: Unterstützt/Widerspricht es welche Hypothese?
  4. Fokussiere auf DIAGNOSTISCHE Evidenz (die zwischen Hypothesen unterscheidet)
  5. Eliminiere Hypothesen die durch glaubwürdige Evidenz widerlegt werden
  6. Die überlebende Hypothese ist die wahrscheinlichste

**21:00–22:30 | PROJEKT: Übe Person-Tracking (an dir selbst!)**
- Führe eine komplette Investigation an deiner EIGENEN Online-Präsenz durch
- Was kann ein Angreifer/Arbeitgeber/Geheimdienst über dich finden?
- Dokumentiere alles → Das ist gleichzeitig dein Counter-OSINT Audit

---

## WOCHE 22-24 — Advanced OSINT + Investigation + Report

### Woche 22: Corporate Investigation
- Firmennetzwerk aufdecken (Handelsregister, OpenCorporates, LinkedIn)
- Beneficial Ownership ermitteln (wer steht wirklich dahinter?)
- Shell Company Detection (Merkmale: gleiche Adresse, gleicher Director, no website)
- UBO-Registries in der EU nutzen

### Woche 23: Geolocation + Image Intelligence
- @quiztime täglich 1 Challenge (seit Monat 2, jetzt Expert-Level)
- Satellitenbilder analysieren (Sentinel Hub, Google Earth Pro)
- Video-Geolocation (YouTube Videos → Standort bestimmen)
- Chronolocation (Sonnenstand → SunCalc → Zeitpunkt bestimmen)

### Woche 24: Capstone — Professionelle Investigation
- **15-Seiten Report** über eine reale Investigation
- Muss folgende Elemente enthalten:
  1. Executive Summary (1 Seite)
  2. Scope & Methodology (1 Seite)
  3. Target Background (1 Seite)
  4. Chronological Findings (4-5 Seiten)
  5. Evidence Documentation (3-4 Seiten, Screenshots mit Hashes)
  6. Analysis & Attribution (2 Seiten, ACH angewandt)
  7. Recommendations (1 Seite)
  8. Appendices (Maltego Graph, Timeline-Diagramm)
- **DIESEN REPORT ZEIGST DU BEI BEWERBUNGEN**

---

## PHASE 2 ABSCHLUSS — WAS DU JETZT KANNST

Nach 6 Monaten bist du KEIN Anfänger mehr. Du hast:
- **Forensik:** Memory + Disk + Netzwerk + Mobile Forensik-Grundlagen. YARA-Regeln. Anti-Forensik-Verständnis.
- **Crypto Investigation:** Bitcoin + Ethereum Tracing. AML-Framework. Reale Fälle analysiert.
- **OSINT:** Intelligence-Grade Person-Tracking. Corporate Investigation. Geolocation. Professionelle Reports.
- **Python:** 2000+ Zeilen eigener Security-Tools auf GitHub.
- **Analytical Skills:** ACH, Timeline-Analyse, Link-Analyse auf Intelligence-Niveau.
- **CFE-Vorbereitung:** Kapitel 1-10 gelesen, Grundlagen sitzen.

**Du bist bereit für Phase 3: SPECIALIST — Offensive Security + Social Engineering.**
