# MONAT 27-28: TELECOM SURVEILLANCE & COMMUNICATIONS INTELLIGENCE

> "Give me your metadata, and I'll tell you everything about your life." — NSA General Counsel Stewart Baker

Dieses Modul macht dich zum Experten für Telekommunikationsüberwachung — wie Staaten kommunikation überwachen, wie die Technik funktioniert, und wie man es erkennt und analysiert.

---

## WOCHE 1-2: SS7 — DAS GLOBALE MOBILFUNK-BACKBONE

### Was ist SS7?

Signaling System 7 ist das Protokoll-Set das seit den 1970ern weltweit Mobilfunknetze verbindet. Es wurde für eine geschlossene Welt von ~20 staatlichen Telefongesellschaften designed — **ohne jegliche Authentifizierung oder Verschlüsselung.**

Heute haben tausende Unternehmen SS7-Zugang, darunter MVNOs, Roaming-Hubs und Unternehmen in Ländern mit laxer Regulierung. Das macht SS7 zum Einfallstor für staatliche und nicht-staatliche Überwachung.

### SS7-Architektur

```
                    ┌─────────────────────┐
                    │   Home Location      │
                    │   Register (HLR)     │
                    │   - IMSI Database    │
                    │   - Subscriber Data  │
                    │   - Current Location │
                    └─────────┬───────────┘
                              │ MAP Protocol
                              │
    ┌──────────┐    ┌─────────┴───────────┐    ┌──────────┐
    │ Visiting  │    │   Signal Transfer    │    │ Visiting  │
    │ MSC/VLR   │◄──►│   Point (STP)        │◄──►│ MSC/VLR   │
    │ (Netz A)  │    │   - Message Routing  │    │ (Netz B)  │
    └─────┬────┘    └─────────────────────┘    └─────┬────┘
          │                                          │
    ┌─────┴────┐                                ┌────┴─────┐
    │   BSC    │                                │   BSC    │
    │          │                                │          │
    └─────┬────┘                                └────┬─────┘
          │                                          │
    ┌─────┴────┐                                ┌────┴─────┐
    │   BTS    │                                │   BTS    │
    │ (Tower)  │                                │ (Tower)  │
    └─────┬────┘                                └────┬─────┘
          │                                          │
       [Handy A]                                  [Handy B]

Schlüssel-Identifiers:
- IMSI: International Mobile Subscriber Identity (auf SIM)
- IMEI: International Mobile Equipment Identity (im Gerät)
- MSISDN: Telefonnummer
- TMSI: Temporäre ID (wechselt, soll IMSI schützen)
```

### SS7-Angriffe (Theorie — verstehen, nicht ausführen)

**1. Location Tracking (Send Routing Info / Any Time Interrogation)**
```
Angreifer sendet MAP ATI (Any Time Interrogation) an HLR:
"Wo ist MSISDN +49176XXXXXXXX gerade?"

HLR antwortet mit:
- Cell-ID (= welcher Mobilfunkturm)
- VLR-Adresse (= welches Netz/Land)
- Alter der Information

→ Genauigkeit: 50m (urban) bis 30km (rural)
→ Kein Zugriff auf das Gerät nötig
→ Opfer merkt NICHTS
```

**2. SMS Interception (Register SS)**
```
Angreifer registriert sich als neues MSC für die Zielnummer:
"SMS für +49176XXXXXXXX bitte an mein MSC weiterleiten"

HLR aktualisiert Routing:
→ Alle eingehenden SMS gehen zum Angreifer
→ Angreifer liest, leitet weiter an echtes MSC
→ Opfer empfängt SMS normal (mit Verzögerung)
→ 2FA-SMS (Banking, Social Media) abgefangen
```

**3. Call Interception**
```
Ähnlich wie SMS Interception:
Angreifer registriert Proxy-MSC
→ Calls werden über Angreifer geroutet
→ Angreifer kann mithören und aufzeichnen
→ Funktioniert international (Roaming-Protokoll)
```

**4. Denial of Service**
```
Cancel Location + Insert Subscriber Data:
→ HLR wird mitgeteilt dass Subscriber in neuem VLR ist
→ Altes VLR löscht Subscriber
→ Neues VLR existiert nicht → Telefon unerreichbar
```

### SS7-Schutzmaßnahmen

- **SS7 Firewalls:** Mobilfunkanbieter filtern verdächtige SS7-Nachrichten (GSMA Kategorie 1-3)
- **SMS Home Routing:** SMS werden nicht mehr direkt geroutet sondern über Home-Netz
- **Diameter (4G/5G Signaling):** Nachfolger von SS7, hat ähnliche Probleme
- **End-to-End Encryption:** Signal, WhatsApp — schützt Content, nicht Metadaten

### Schlüssel-Forschung zum Studieren

- **Tobias Engel: "Locating Mobile Phones using SS7"** — 25C3 (2008) und 31C3 (2014)
- **Karsten Nohl (SRLabs): "Mobile Self-Defense"** — 31C3 (2014)
- **Philippe Langlois: SS7map** — Kartierung globaler SS7-Schwachstellen
- **Citizen Lab: "Running in Circles"** — SS7 Abuse für Überwachung (2020)
- **Department of Homeland Security: "SS7 Vulnerabilities" Report** (2017)

### Lab-Übung: Osmocom GSM-Netz

```bash
# WARNUNG: Ein eigenes GSM-Netz zu betreiben ist in Deutschland
# ohne BNetzA-Genehmigung ILLEGAL. Nur im abgeschirmten Faraday-Cage
# oder mit SDR im Empfangsmodus (passiv, legal).

# Osmocom ist die Open-Source GSM/UMTS/LTE Stack Implementation
# Zum VERSTEHEN der Protokolle — nicht zum Angreifen

# Installation (Ubuntu/Debian):
sudo apt-get install osmocom-bb osmo-bsc osmo-msc osmo-hlr

# Oder über Docker:
# https://osmocom.org/projects/docker-playground/wiki

# Studiere die Architektur:
# - OsmoHLR: Home Location Register
# - OsmoMSC: Mobile Switching Center
# - OsmoBSC: Base Station Controller
# - OsmoBTS: Base Transceiver Station

# Wireshark SS7-Dissector:
# Wireshark kann SS7/MAP/TCAP/SCCP nativ decodieren
# Capture Filter: sctp oder m3ua
# Display Filter: gsm_map || sccp || tcap || isup

# Öffentliche SS7-Captures zum Analysieren:
# https://wiki.wireshark.org/SampleCaptures → SS7/SIGTRAN Captures
```

---

## WOCHE 3-4: IMSI-CATCHER & CELLULAR SURVEILLANCE

### Wie IMSI-Catcher funktionieren

```
NORMALER ABLAUF:
Handy → BTS (echter Turm) → BSC → MSC → Netzwerk

IMSI-CATCHER:
Handy → [IMSI Catcher] → BTS (echter Turm) → ...

Der IMSI-Catcher:
1. Simuliert einen Mobilfunkturm (BTS)
2. Sendet stärkeres Signal als echter Turm
3. Handy verbindet sich automatisch (stärkstes Signal)
4. Erzwingt Downgrade auf 2G (GSM) → keine Verschlüsselung
5. Erfasst IMSI, IMEI, TMSI
6. Kann SMS/Calls mitlesen (bei 2G)
7. Leitet Traffic an echtes Netz weiter (transparent für Opfer)
```

**Kommerzielle IMSI-Catcher:**
- **StingRay (Harris Corporation):** Meistverbreitet bei US Law Enforcement, ~500.000 USD
- **Hailstorm (Harris):** Neuere Version, kann auch 4G
- **DRT Box (DRT/Boeing):** Militärische Version, flugzeuggestützt
- **Rohde & Schwarz:** Deutsche Hersteller, an BKA/BfV/BND geliefert

**Günstige/DIY-Optionen (Forschungszwecke):**
- **BladeRF x40/xA9:** SDR Board, ~400-500 EUR + OpenBTS/Osmocom Software
- **USRP B200/B210 (Ettus Research):** Professionelleres SDR, ~1.000-2.000 EUR
- **LimeSDR:** Open-Source SDR, ~300 EUR

### IMSI-Catcher-Erkennung

```python
"""
IMSI-Catcher Detection Konzepte
Basierend auf SnoopSnitch, CellGuard und manueller OpenCelliD-Vergleichsmethodik
"""

# Indikatoren für IMSI-Catcher:

DETECTION_INDICATORS = {
    "forced_2g_downgrade": {
        "description": "Netzwerk zwingt Handy von 4G/3G auf 2G (GSM)",
        "severity": "HIGH",
        "check": "Monitoring von RRC Connection Release mit Redirect auf GSM",
        "tool": "SnoopSnitch (Android, Root erforderlich)"
    },
    "encryption_downgrade": {
        "description": "A5/0 (keine Verschlüsselung) statt A5/1 oder A5/3",
        "severity": "CRITICAL",
        "check": "Cipher Mode Command mit A5/0",
        "tool": "Wireshark + GSM-Capture oder SnoopSnitch"
    },
    "new_unknown_tower": {
        "description": "Neuer Turm mit unbekannter Cell-ID erscheint plötzlich",
        "severity": "MEDIUM",
        "check": "Vergleich mit bekannter Cell-ID Datenbank",
        "tool": "OpenCelliD (opencellid.org), WiGLE (wigle.net)"
    },
    "unusual_signal_strength": {
        "description": "Signal deutlich stärker als üblich (IMSI-Catcher nah)",
        "severity": "MEDIUM",
        "check": "RSSI/RSRP Monitoring",
        "tool": "Network Signal Info (Android)"
    },
    "missing_neighboring_cells": {
        "description": "Echter Turm meldet Nachbar-Zellen, IMSI-Catcher nicht",
        "severity": "HIGH",
        "check": "System Information Messages analysieren",
        "tool": "SnoopSnitch"
    },
    "silent_sms": {
        "description": "Type-0 SMS (nicht angezeigte SMS zum Location Update)",
        "severity": "HIGH",
        "check": "SMS-Monitoring auf unsichtbare SMS",
        "tool": "SnoopSnitch"
    },
    "paging_anomalies": {
        "description": "IMSI statt TMSI in Paging Requests",
        "severity": "CRITICAL",
        "check": "Paging Request Typ 1 mit IMSI",
        "tool": "Wireshark GSM oder SnoopSnitch"
    }
}

# OpenCelliD API — Bekannte Türme verifizieren
import requests

def check_cell_tower(mcc, mnc, lac, cell_id, api_key):
    """
    Prüfe ob ein Turm in der OpenCelliD Datenbank existiert
    MCC=262 (Deutschland), MNC=01 (Telekom), 02 (Vodafone), 03 (O2)
    """
    url = "https://opencellid.org/cell/get"
    params = {
        "key": api_key,
        "mcc": mcc,
        "mnc": mnc,
        "lac": lac,
        "cellid": cell_id,
        "format": "json"
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        return {
            "found": True,
            "lat": data.get("lat"),
            "lon": data.get("lon"),
            "samples": data.get("samples"),
            "created": data.get("created")
        }
    else:
        return {
            "found": False,
            "warning": "UNKNOWN TOWER — Possible IMSI Catcher"
        }
```

### Werkzeuge zur Erkennung

**SnoopSnitch (Android):**
- Open Source von SRLabs (Karsten Nohl)
- Benötigt gerootetes Android mit Qualcomm-Baseband
- Erkennt: Silent SMS, IMSI-Catcher, SS7 Attacks
- Download: https://opensource.srlabs.de/projects/snoopsnitch

**CellGuard (iOS):**
- Open Source, verfügbar für iPhones mit iOS 16+
- Vergleicht Zellinformationen mit Apple Location Service + OpenCelliD
- Erkennt verdächtige Zellen und potentielle IMSI-Catcher auf Apple-Geräten

**Manuelle Erkennung via OpenCelliD:**
- Vergleiche beobachtete Cell-IDs mit opencellid.org Datenbank
- Unbekannte Türme = potentielle IMSI-Catcher
- Tools: Network Signal Info (Android) → Cell-ID auslesen → API-Abfrage gegen OpenCelliD

> **Hinweis:** AIMSICD ist seit 2016 nicht mehr maintained und funktioniert auf modernen Android-Versionen nicht.

**SeaGlass (University of Washington):**
- Forschungsprojekt: City-Scale IMSI-Catcher Detection
- Sensoren in Autos die durch die Stadt fahren und Anomalien melden
- Paper: "SeaGlass: Enabling City-Wide IMSI-Catcher Detection"

---

## WOCHE 5-6: LAWFUL INTERCEPTION — WIE STAATEN LEGAL ÜBERWACHEN

### ETSI Lawful Interception Standard

Die European Telecommunications Standards Institute (ETSI) hat den Industriestandard für legale Telekommunikationsüberwachung definiert. **Jeder europäische Provider MUSS diese Schnittstellen implementieren.**

```
ETSI LI Architektur (TS 102 232, ES 201 671):

┌──────────────┐     ┌──────────────────┐     ┌──────────────┐
│  LEA          │     │  LEMF             │     │  Provider     │
│ (Behörde:     │     │ (Mediation        │     │ (Telekom,    │
│  BKA, LKA,    │◄────│  Function)        │◄────│  Vodafone,   │
│  Zoll, BND)   │ HI3 │                   │ HI2 │  O2...)      │
└──────────────┘     └──────────────────┘     └──────────────┘
                           │
                           │ HI1 (Admin Interface)
                           │
                     ┌─────┴──────┐
                     │ Richterlicher│
                     │ Beschluss   │
                     └────────────┘

Handover Interfaces:
- HI1: Administrative Interface (Anordnung aktivieren/deaktivieren)
- HI2: Intercept Related Information (IRI) = METADATEN
       → Wer ruft wen an, wann, wie lange, von wo
       → IP-Adressen, URLs, Email-Header
- HI3: Content of Communication (CC) = INHALT
       → Tatsächliche Gespräche, SMS-Text, Email-Body
       → Bei VoIP: RTP Streams
       → Bei Daten: Full Packet Capture
```

### Deutsche Rechtsgrundlagen

```
TELEKOMMUNIKATIONSÜBERWACHUNG (TKÜ):
─────────────────────────────────────

§100a StPO — Klassische TKÜ:
├── Was: Inhalt + Metadaten von Telekommunikation
├── Wer anordnet: Richter (Eilfall: Staatsanwalt, 3 Tage Bestätigung)
├── Voraussetzung: Verdacht einer Katalogstraftat (§100a Abs. 2)
│   ├── Mord, Totschlag
│   ├── Bandendiebstahl, schwerer Raub
│   ├── Drogenhandel
│   ├── Geldwäsche, Terrorismusfinanzierung
│   ├── Kinderpornographie
│   ├── Cybercrime (§202a-d, §303a-b StGB)
│   └── Und ~50 weitere Straftaten
├── Dauer: Max 3 Monate, verlängerbar
└── Provider MUSS umsetzen (TKÜV — TK-Überwachungsverordnung)

§100b StPO — Quellen-TKÜ (Staatstrojaner):
├── Was: Installation von Software auf Endgerät
│   └── Zweck: Verschlüsselte Kommunikation VOR Verschlüsselung abgreifen
├── Wer: Nur durch Richter angeordnet
├── Voraussetzung: Schwere Katalogstraftaten (enger als §100a)
├── Beschränkung: NUR laufende Kommunikation, KEINE Durchsuchung
│   └── Theorie: Nur WhatsApp/Signal mitlesen, nicht Festplatte durchsuchen
│   └── Praxis: Technisch schwer zu trennen (Diskussion Bundesverfassungsgericht)
└── Wer liefert: ZITiS entwickelt die Tools, BKA setzt ein

§100g StPO — Verkehrsdaten (Metadaten):
├── Was: Verbindungsdaten (wer, wann, wo, wie lange) OHNE Inhalt
├── Wer: Richter
├── Voraussetzung: Straftat von erheblicher Bedeutung
└── Niedrigere Schwelle als §100a

§100i StPO — IMSI-Catcher:
├── Was: Technische Mittel zur Ermittlung von IMSI/IMEI
│   └── = Gesetzliche Grundlage für IMSI-Catcher-Einsatz
├── Wer: Richter (Eilfall: Staatsanwalt)
├── Voraussetzung: Straftat von erheblicher Bedeutung
└── Zusätzlich erlaubt: Standortermittlung
```

### Quellen-TKÜ / Staatstrojaner im Detail

```
WIE DER STAATSTROJANER FUNKTIONIERT:

1. Infektion:
   ├── Methode A: Physischer Zugriff auf Gerät (beschlagnahmt oder bei Durchsuchung)
   ├── Methode B: Netzwerk-Injection (bei Kooperation mit ISP/Provider)
   │   └── Redirecting von Download → trojanisierte Version
   ├── Methode C: Spear Phishing (Email/SMS mit Exploit)
   └── Methode D: Exploit (0-day, wie bei Pegasus)

2. Was er kann (legal erlaubt):
   ├── Messenger mitlesen (WhatsApp, Signal, Telegram)
   │   └── Screenshots vor Verschlüsselung / nach Entschlüsselung
   ├── VoIP-Gespräche aufzeichnen
   ├── Tastatureingaben loggen (umstritten)
   └── Laufende Kommunikation in Echtzeit an LEA übermitteln

3. Was er NICHT darf (legal):
   ├── Festplatte durchsuchen (= Online-Durchsuchung, §100b vs §100c)
   ├── Kamera/Mikrofon aktivieren (= Große Lauschangriff, §100c)
   ├── Dateien manipulieren
   └── Sich auf andere Geräte ausbreiten

4. Wer liefert die Software:
   ├── FinFisher/FinSpy (München) — An BKA geliefert, Firma insolvent 2022
   ├── Pegasus (NSO Group, Israel) — BKA hat 2021 eine Version gekauft
   ├── Eigenentwicklung ZITiS — "RCIS" (Remote Communication Interception Software)
   └── Predator (Intellexa/Cytrox) — Europäisch, an mehrere EU-Staaten verkauft

5. Probleme:
   ├── Technisch: Schwer "nur Kommunikation" zu erfassen ohne Vollzugriff
   ├── Rechtlich: BVerfG-Urteile setzen enge Grenzen
   ├── Praktisch: Moderne Betriebssysteme erschweren Installation
   └── Politisch: Massenüberwachungs-Bedenken (CCC, netzpolitik.org)
```

### Technische Umsetzung bei Providern

```
WIE TELEKOM/VODAFONE/O2 ÜBERWACHUNG UMSETZEN:

1. Richterlicher Beschluss geht an Provider
2. Provider aktiviert LI in seinem System:
   ├── Sprache: Kopie des Calls wird an LEMF gespiegelt
   ├── SMS: Kopie jeder SMS
   ├── Daten: Deep Packet Inspection (DPI) kopiert relevanten Traffic
   │   ├── Email-Inhalte (wenn unverschlüsselt)
   │   ├── HTTP-Requests (URLs, Formulardaten)
   │   ├── DNS-Queries
   │   └── Bei HTTPS: nur Metadaten (SNI, IP, Zeitstempel)
   └── Metadaten: CDR (Call Detail Records), IPDR (IP Detail Records)

3. Daten werden über gesicherte Leitung an Behörde übertragen
   ├── Format: ETSI-konform (ASN.1 kodiert)
   └── Verschlüsselt: TLS/IPSec

PROVIDER-INFRASTRUKTUR:
├── Utimaco LIMS (Lawful Interception Management System) — Deutsche Firma
├── SS8 Intercept (US)
├── Ericsson Interception Management System
├── Nokia Siemens Intelligence Solutions (kontrovers: an Iran verkauft)
└── Trovicor (Siemens-Ausgründung, an Bahrain/Ägypten/Syrien verkauft)
```

### Praktische Übungen Woche 5-6

**Tag 29-32: ETSI-Standards studieren**
- Lade ETSI TS 102 232 herunter (kostenlos bei etsi.org)
- Verstehe die Handover-Interfaces HI1, HI2, HI3
- Zeichne die Architektur auf Papier
- Lese die TKÜV (Telekommunikations-Überwachungsverordnung) — gesetze-im-internet.de

**Tag 33-35: Deutsche Rechtsgrundlagen**
- §100a-100i StPO lesen und zusammenfassen
- BVerfG-Urteil zum Staatstrojaner (2008, "Online-Durchsuchung") studieren
- netzpolitik.org Archiv zu Quellen-TKÜ durcharbeiten
- Vergleich: Deutschland vs UK (RIPA/IPA) vs USA (CALEA/FISA)

**Tag 36-38: Provider-Seite verstehen**
- Transparency Reports lesen: Telekom, Vodafone, O2
- Wie viele Überwachungsanordnungen pro Jahr? (~20.000 in DE)
- BNetzA Jahresstatistik zur TKÜ analysieren
- Utimaco LIMS Dokumentation studieren (soweit öffentlich)

**Tag 39-42: Wireshark LI-Analyse**
- Wireshark mit LI-Dissektoren: ETSI LI, HI2, HI3
- Sample Captures analysieren
- Verstehe wie IRI (Metadaten) vs CC (Content) aussehen
- Erstelle eine Cheatsheet für LI-Protokollanalyse

---

## WOCHE 7-8: 5G SECURITY & ZUKUNFT DER ÜBERWACHUNG

### 5G Sicherheitsverbesserungen (und neue Schwachstellen)

```
WAS 5G BESSER MACHT:
├── SUPI/SUCI: IMSI wird verschlüsselt übertragen
│   ├── SUPI (Subscription Permanent Identifier) = die echte ID
│   └── SUCI (Subscription Concealed Identifier) = verschlüsselt
│   └── → IMSI-Catcher können IMSI nicht mehr direkt erfassen
├── Bessere Authentifizierung: 5G-AKA (Authentication and Key Agreement)
├── Integrity Protection auf User Plane (optional!)
└── Network Slicing Isolation

WAS 5G NICHT LÖST:
├── Lawful Interception ist eingebaut (3GPP TS 33.127, 33.128)
│   └── 5G hat DEDIZIERTE LI-Architektur — besser als bei 4G
├── SUCI-Verschlüsselung kann vom Operator deaktiviert werden
├── Downgrade-Attacks auf 4G/3G/2G weiterhin möglich
│   └── Fake-5G-Basisstation die zu LTE redirected
├── Baseband-Chips weiterhin angreifbar (Samsung, Qualcomm, MediaTek)
├── Roaming über GTP (GPRS Tunneling Protocol) hat ähnliche Probleme wie SS7
└── Metadaten (wer, wann, wo) sind auch in 5G für Provider sichtbar

NEUE ANGRIFFSFLÄCHEN IN 5G:
├── Network Slicing: Slice-Isolation kann durchbrochen werden
├── Edge Computing (MEC): Mehr Angriffspunkte
├── API-basierte Architektur: HTTP/2 + JSON statt SS7 → Web-Angriffe
├── SEPP (Security Edge Protection Proxy): Neue Roaming-Security, aber Fehler möglich
└── NFV/SDN: Virtualisierung = Software-Schwachstellen in Netzwerk-Equipment
```

### Zukunft der Kommunikationsüberwachung

```
TRENDS 2025-2030:

1. END-TO-END ENCRYPTION EVERYWHERE
   → Problem für klassische LI: Provider kann Inhalt nicht mehr liefern
   → Lösung der Behörden: Client-Side Scanning, Quellen-TKÜ, Backdoor-Debatte
   → EU: Chat Control Verordnung (umstritten)
   → UK: Online Safety Act (Scanning-Pflicht)

2. QUANTUM-RESISTANT CRYPTOGRAPHY
   → Post-Quantum-Krypto wird Standard (NIST PQC: CRYSTALS-Kyber, Dilithium)
   → Harvest-Now-Decrypt-Later: Geheimdienste speichern verschlüsselten
     Traffic JETZT um ihn mit Quantencomputern SPÄTER zu entschlüsseln
   → BND/NSA tun das nachweislich (Snowden-Dokumente)

3. SATELLITENINTERNET (Starlink, OneWeb)
   → Überwachung schwieriger: kein lokaler ISP mehr
   → Aber: Starlink muss lokale Gesetze befolgen (Deutschland hat Gateway)
   → Signalanalyse: Terminalgröße macht Nutzer identifizierbar

4. MESH-NETZWERKE & P2P
   → Briar, Meshtastic, LoRa-basierte Kommunikation
   → Keine zentrale Infrastruktur → kein LI-Ansatzpunkt
   → Problem für Behörden, Chance für Oppositionelle
```

### Praktische Übungen Woche 7-8

**Tag 43-46: 5G Security Deep Dive**
- 3GPP TS 33.501 (5G Security) studieren (Kapitel zu SUPI/SUCI, AKA)
- 3GPP TS 33.127 (5G Lawful Interception) — wie LI in 5G funktioniert
- Paper: "A Formal Analysis of 5G Authentication" (Basin et al., CCS 2018)
- Vergleiche: Was wird besser, was bleibt unsicher

**Tag 47-49: Baseband Security**
- Google Project Zero: Baseband-Vulnerability Research (2023-2024)
  - "Multiple Internet to Baseband Remote Code Execution Vulnerabilities in Exynos Modems"
- Understand: Warum Baseband-Exploits so wertvoll sind (kein OS-Schutz)
- Tools: Firmwire (Baseband-Firmware-Emulator von FirmWire Team)

**Tag 50-52: Satellite Communication Security**
- Paper: "A Wake-Up Call for SATCOM Security" (Ruhr University, Black Hat 2014!)
  → HGI-Forschung! Nutze dein Netzwerk
- Starlink Security Research: Lennert Wouters (KU Leuven) — Fault Injection auf Starlink User Terminal
- DVB-S/S2 Protocol Security
- SDR für Satellitenempfang: RTL-SDR + SatDump

**Tag 53-56: Capstone — Communications Intelligence Report**
- Erstelle einen vollständigen Report:
  "Kommunikationsüberwachung in Deutschland 2026: Technische Fähigkeiten, Rechtliche Grenzen, Zukunft"
- Beinhaltet: SS7, LI, Quellen-TKÜ, 5G, Satellit
- Format: Intelligence Briefing (Executive Summary, Details, Assessment)
- Blog-Post-Version veröffentlichen (anonymisiert)

---

## DELIVERABLES MONAT 27-28

| # | Deliverable | Status |
|---|------------|--------|
| 1 | SS7-Architektur Cheatsheet (visuell) | [ ] |
| 2 | Wireshark SS7-Analyse Übungen (10 Captures) | [ ] |
| 3 | IMSI-Catcher Detection Script (Python) | [ ] |
| 4 | Deutsche TKÜ-Rechtsgrundlagen Zusammenfassung | [ ] |
| 5 | ETSI LI-Architektur Diagramm + Erklärung | [ ] |
| 6 | 5G Security Assessment (was besser/schlechter) | [ ] |
| 7 | Baseband Security Research Notes | [ ] |
| 8 | Capstone: Communications Intelligence Report | [ ] |
| 9 | Blog Post über Telecom Surveillance | [ ] |

---

## QUELLEN & WEITERFÜHREND

### Pflicht-Vorträge (Video)
- Tobias Engel: "Locating Mobile Phones using SS7" (31C3, 2014)
- Karsten Nohl: "Mobile Self-Defense" (31C3, 2014)
- Karsten Nohl & Luca Melette: "SS7: Locate. Track. Manipulate." (2014)
- Harald Welte: "Running your own GSM stack on a phone" (OsmocomBB)
- Lennert Wouters: "Glitched on Earth by Humans: A Black-Box Security Evaluation of the SpaceX Starlink User Terminal" (Black Hat 2022)

### Bücher
- **Tobias Engel: SS7 Research Collection** — Blog + Papers
- **GSMA IR.82: Security for SS7** — Industry Guidelines
- **3GPP TS 33.501: 5G Security Architecture** — Der Standard
- **James Bamford: The Shadow Factory** — NSA Surveillance Infrastructure
- **Barton Gellman: Dark Mirror** — Technical Snowden Details

### Online
- SRLabs Research: https://srlabs.de/
- Osmocom Project: https://osmocom.org/
- 3GPP Specifications: https://www.3gpp.org/specifications
- ETSI Standards: https://www.etsi.org/
- netzpolitik.org — Deutsche Überwachungspolitik
- BNetzA TKÜ-Statistik — Jährlicher Report
