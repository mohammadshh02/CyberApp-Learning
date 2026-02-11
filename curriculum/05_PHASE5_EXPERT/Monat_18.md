# MONAT 18 — SURVEILLANCE-THEORIE: SIGINT, Lawful Interception, Intelligence Studies

## DAS LEVEL: Du verstehst wie staatliche Überwachung funktioniert — technisch und rechtlich

Dieses Monat ist THEORIE-INTENSIV. Kein Hacking, kein Coding — reines Verständnis der Surveillance-Landschaft. Ohne dieses Wissen kannst du nicht für einen Geheimdienst arbeiten und nicht gegen Surveillance verteidigen.

---

## Monats-Ziele (nicht verhandelbar)
- [ ] SIGINT: NSA-Fähigkeiten (Snowden-Dokumente) systematisch studiert
- [ ] Lawful Interception: ETSI-Standards, Deutsche TKÜ/Quellen-TKÜ verstanden
- [ ] Spyware-Markt: Pegasus, Predator, FinSpy — Capabilities + Detection
- [ ] Rechtlich: §100a/100b StPO, G10-Gesetz, BND-Gesetz verstanden
- [ ] Intelligence Analysis: Structured Analytic Techniques angewendet
- [ ] Surveillance-Industrie: Firmen, Produkte, Export-Kontrolle
- [ ] Snowden-Archiv: 20+ Schlüssel-Dokumente gelesen
- [ ] 3 Bücher gelesen (siehe unten)
- [ ] GCFA oder GOSI Prep begonnen (SANS Zertifizierung)

---

## WOCHE 69 — SIGINT VERSTEHEN

### Was öffentlich bekannt ist (aus deklassifizierten Dokumenten + Snowden)

**NSA Programme:**
- **PRISM:** Zugriff auf Tech-Provider (Google, Apple, Microsoft, Facebook) unter FISA Section 702
- **UPSTREAM (FAIRVIEW, STORMBREW, BLARNEY):** Abgriff an Glasfaserkabeln und Internet-Backbone
- **XKEYSCORE:** "Google für SIGINT" — Suchsystem für alle gesammelten Daten
- **TEMPORA (GCHQ):** Britisches Programm zum Anzapfen von Unterseekabeln
- **BULLRUN/EDGEHILL:** Programme zur Untergrabung von Verschlüsselungsstandards
- **QUANTUM:** Paket-Injektion in Netzwerk-Traffic → FOXACID Exploit-Server
- **TURBINE/TURBULENCE:** Automatisiertes Exploit-Management
- **ANT Catalog:** Hardware/Software-Implants (DEITYBOUNCE, JETPLOW, DROPOUTJEEP, COTTONMOUTH)

**Die Schlüsselquellen:**
- electrospaces.net — Technische Analyse der Snowden-Dokumente
- The Intercept Snowden Archive
- James Bamford Bücher: "The Puzzle Palace", "Body of Secrets", "The Shadow Factory"

---

## WOCHE 70 — LAWFUL INTERCEPTION

### ETSI LI Standards (Europäischer Standard)

```
Law Enforcement Agency (LEA)
         |
    LEMF (Law Enforcement Monitoring Facility)
         |
   HI1 (Administrativ) / HI2 (Metadaten) / HI3 (Inhalt)
         |
   Mediation/Delivery Function
         |
   Internal Interception Function (IIF)
         |
   Telecom-Netzwerk (Switches, Router, Session Border Controller)
```

- **HI1:** Administrative Schnittstelle für Abhöranordnungen
- **HI2:** Liefert IRI (Intercept Related Information) — Metadaten
- **HI3:** Liefert CC (Content of Communication) — der eigentliche Inhalt

### Deutschland — Rechtlicher Rahmen

**§100a StPO (Telekommunikationsüberwachung / TKÜ):**
- Richterliche Anordnung erforderlich
- Nur bei schweren Straftaten (Terrorismus, Mord, Drogenhandel etc.)
- Befristet auf 3 Monate, verlängerbar

**§100b StPO (Online-Durchsuchung):**
- Infiltration eines Geräts zur Durchsuchung gespeicherter Daten
- Rechtliche Grundlage für den "Staatstrojaner"

**Quellen-TKÜ (§100a Abs. 1 S. 2-3 StPO):**
- Abgriff von Kommunikation AUF DEM GERÄT, BEVOR Verschlüsselung
- Deutschlands Antwort auf Ende-zu-Ende-Verschlüsselung
- Technisch: Trojaner der z.B. WhatsApp-Nachrichten vor der Verschlüsselung abfängt
- **Historisch:** Digitask (Original-Bundestrojaner, 2011 vom CCC reverse-engineert)
- **FinFisher:** Münchener Firma, Büros 2020 durchsucht, Insolvenz 2022

### Bücher für diesen Monat
1. **"No Place to Hide" von Glenn Greenwald** — Snowden-Enthüllungen
2. **"Dark Mirror" von Barton Gellman** — Technische Details der Snowden-Dokumente
3. **"Sandworm" von Andy Greenberg** — Russische Cyber-Operationen

---

## WOCHE 71-72 — SPYWARE-MARKT + INTELLIGENCE ANALYSIS

### Die kommerzielle Surveillance-Industrie

| Firma | Produkt | Fähigkeiten | Status |
|-------|---------|------------|--------|
| NSO Group | Pegasus | 0-Click iOS/Android Full Compromise | US-Sanktionsliste seit 2021 |
| Intellexa/Cytrox | Predator | 1-Click/0-Click Mobile Exploit | EU-Sanktionsliste |
| Candiru | DevilsTongue | Windows + Mobile Spyware | US-Sanktionsliste |
| FinFisher | FinSpy | Mobile + Desktop Überwachung | Insolvent seit 2022 |
| Hacking Team | RCS | Mobile + Desktop | 2015 gehackt, umbenannt |
| Paragon Solutions | Graphite | Mobile Interception | Neuerer Akteur, wenig öffentlich |

### Structured Analytic Techniques (für Intelligence-Arbeit)
- **Richards Heuer — "Psychology of Intelligence Analysis"** (kostenlos von CIA.gov)
- **Heuer & Pherson — "Structured Analytic Techniques"**
- Techniken:
  - ACH (schon gelernt in Monat 6)
  - Key Assumptions Check
  - Devil's Advocacy
  - Red Team Analysis
  - Indicators and Warnings
  - Scenario Analysis

---

## PHASE 5 ABSCHLUSS

Nach 18 Monaten hast du:
- **OSCP** — Bewiesene Offensive Skills
- **Mobile Security** — Frida, iOS/Android, Spyware-Erkennung
- **Wireless/RF** — SDR, WiFi, RFID, Proxmark3
- **Surveillance-Theorie** — SIGINT, Lawful Interception, Spyware-Markt, Intelligence Analysis
- **CFE + CAMS** — Fraud + AML Zertifizierungen

**Du bist bereit für Phase 6: SOVEREIGN — Vulnerability Research + Staatlicher Einstieg.**
