# MONAT 33-34: HUMINT OPS, COUNTER-INTELLIGENCE & ADVANCED SPYWARE RE

> "The best intelligence comes from people, not machines." — Jede Geheimdienstschule weltweit

---

## WOCHE 1-3: HUMINT OPERATIONS — INTELLIGENCE-GRADE

### Jenseits von Social Engineering

In Monat 8 hast du Social Engineering Basics gelernt (Cialdini, PEACE Model). Jetzt geht es um **operationelles HUMINT** — wie Nachrichtendienste tatsächlich menschliche Quellen führen.

### Der Intelligence Cycle (Angewandt auf HUMINT)

```
1. PLANNING & DIRECTION
   → Was müssen wir wissen? (Intelligence Requirements)
   → Wer könnte es wissen? (Target Identification)
   → Wie kommen wir an die Person ran? (Access Assessment)

2. COLLECTION
   → Elicitation: Information gewinnen ohne Fragen zu stellen
   → Recruitment Cycle: Spot → Assess → Develop → Recruit → Handle
   → Technical Support: Überwachung, Kommunikation, Legende

3. PROCESSING
   → Source Grading: A1 bis F6 (Zuverlässigkeit + Glaubwürdigkeit)
   → Bias Assessment: Warum sagt die Quelle was sie sagt?
   → Corroboration: Andere Quellen bestätigen?

4. ANALYSIS
   → ACH (Analysis of Competing Hypotheses)
   → Timeline Reconstruction
   → Link Analysis

5. DISSEMINATION
   → Intelligence Report (Classified Format)
   → Briefing
```

### Elicitation — Die Kernkompetenz

Elicitation ist die Kunst, Informationen aus Menschen zu gewinnen **ohne dass sie merken dass sie befragt werden**. Es ist die wichtigste HUMINT-Technik und legal (im Gegensatz zu Bestechung oder Nötigung).

```
ELICITATION TECHNIQUES:

1. FLATTERY + APPEAL TO EGO
   → "Sie müssen der Experte für X sein..."
   → Person fühlt sich geschmeichelt → teilt Details
   → Funktioniert besonders gut bei Executives und Technikern

2. DELIBERATE FALSE STATEMENT
   → "Ich habe gehört dass Firma X jetzt Produkt Y nutzt"
   → Person korrigiert: "Nein, wir nutzen Z seit letztem Quartal"
   → Du hast die echte Information ohne zu fragen

3. ASSUMED KNOWLEDGE
   → Tu so als wüsstest du bereits 80% → Person füllt die 20% auf
   → "Der Migration-Prozess lief ja bis März..."
   → "Eigentlich war es April, weil wir noch Problem X hatten"

4. BRACKETING
   → Gib absichtlich falsche Extreme an
   → "Der Deal war wohl 50 Millionen?" (zu hoch)
   → "Nein, so viel nicht, eher um die 20"

5. MUTUAL INTEREST / QUID PRO QUO
   → Teile eigene (unwichtige) Information → Gegenseitigkeit
   → "Bei uns hatten wir auch Probleme mit Active Directory..."
   → Person teilt eigene AD-Probleme (= Schwachstellen-Intel)

6. ARTIFICIAL URGENCY
   → "Ich muss bis morgen wissen ob..." → Zeitdruck → weniger Nachdenken

7. COMMON GROUND
   → Gleiche Uni, gleicher Sport, gleiche Kinder → Vertrauen → offener

8. OBLIQUE REFERENCE
   → Sprich über ein ähnliches Thema → Person macht die Verbindung selbst
   → Statt "Hat ihr Unternehmen Ransomware-Probleme?"
   → "Haben Sie den Ransomware-Angriff auf [Konkurrent] mitbekommen?"
   → "Ja, furchtbar. Wir hatten auch fast... [Information]"
```

### Interview-Methoden für Investigation

```
PEACE MODEL (UK Standard — ethisch, effektiv):

P — Planning & Preparation
  → Recherche VOR dem Interview
  → Ziel definieren: Was genau muss ich erfahren?
  → Fragen vorbereiten (Trichter: offen → spezifisch)
  → Logistik: Ort, Zeit, Aufzeichnung, Zeugen

E — Engage & Explain
  → Rapport aufbauen (Small Talk, Gemeinsamkeiten)
  → Zweck erklären (oder Legende nutzen)
  → Rechtliche Situation erklären (wenn Ermittlung)
  → Erwartungen setzen

A — Account (Kernstück)
  → Offene Fragen: "Erzählen Sie mir über..."
  → Cognitive Interview: "Versetzen Sie sich zurück in den Moment..."
  → TED: Tell, Explain, Describe
  → KEINE Suggestivfragen
  → KEINE Unterbrechungen in der freien Erzählung
  → Notiere Widersprüche, aber konfrontiere NICHT sofort

C — Closure
  → Zusammenfassen was gesagt wurde
  → Fehlende Punkte klären
  → Möglichkeit für Ergänzungen geben
  → Nächste Schritte erklären

E — Evaluation
  → Aussage vs. bekannte Fakten
  → Widersprüche analysieren
  → Source Grading
  → Weitere Fragen für Follow-Up

KINESICS (Körpersprache):
→ WARNUNG: "Lügendetektionv" über Körpersprache ist wissenschaftlich
   NICHT zuverlässig. Nervosität ≠ Lüge.
→ ABER: Veränderungen im Verhalten bei bestimmten Fragen sind
   Indikatoren für Unbehagen → vertiefen
→ Baseline zuerst: Wie verhält sich die Person bei neutralen Fragen?
→ Abweichung: Plötzlich anders bei bestimmtem Thema? → Investigate
```

### Pretexting — Verdeckte Informationsgewinnung

```
PRETEXTING FÜR OSINT-INVESTIGATIONS:

Ein "Pretext" ist eine glaubwürdige Rolle/Geschichte die du annimmst
um Informationen zu gewinnen. ACHTUNG: Sich als Polizist/Beamter
ausgeben = STRAFBAR (Amtsanmaßung, §132 StGB).

LEGALE PRETEXTS:
├── Journalist (tatsächlich legal, auch ohne Presseausweis)
├── Researcher/Student (dein echter Status!)
├── Potential Customer/Business Partner
├── Conference Attendee
├── Recruiter
└── Mitarbeiter einer Firma (deine eigene, nicht fälschlich)

AUFBAU EINES PRETEXTS:
1. Rolle definieren (wer bin ich?)
2. Ziel definieren (was will ich erfahren?)
3. Backstory (warum kontaktiere ich diese Person?)
4. Props (Visitenkarten, Website, LinkedIn-Profil)
5. Exit Strategy (wie beende ich das Gespräch natürlich?)
6. OPSEC (was wenn die Person mich überprüft?)

BEISPIEL:
Ziel: Erfahre welches SIEM eine Bank nutzt
Pretext: "Ich bin Student an der RUB und schreibe meine
         Masterarbeit über SIEM-Deployment in der Finanzbranche.
         Wären Sie bereit für ein kurzes anonymisiertes Interview?"
→ 100% legal, 100% glaubwürdig (du BIST Student an der RUB)
→ Die meisten Leute helfen gerne Studenten
→ Vorbereitung: Tatsächlich wissen was SIEMs sind, gute Fragen
```

---

## WOCHE 4-5: COUNTER-INTELLIGENCE & OPERATIONAL SECURITY

### Deine eigene Sicherheit als Operator

```
THREAT MODEL FÜR INTELLIGENCE OPERATORS:

WER BEDROHT DICH?
├── Level 1: Zufällige Kriminelle (Drive-by, Phishing)
│   → Standard IT-Security reicht
├── Level 2: Gezielte Cyberkriminelle (Ransomware-Gruppe die merkt
│   dass du sie investigierst)
│   → Separate Infrastruktur, gehärtete Systeme
├── Level 3: Organisierte Gruppen (Kartelle, organisierte Kriminalität)
│   → OPSEC-kritisch, physische Sicherheit
├── Level 4: Nation-State (wenn du APTs trackst oder für Regierung arbeitest)
│   → Maximum OPSEC, Compartmentalization
└── Level 5: Dein eigener Arbeitgeber/Staat (Whistleblower-Szenario)
    → Tails, Air-Gapped Systeme, keine digitalen Spuren
```

### Compartmentalization

```
TRENNE ALLES:

GERÄT-EBENE:
├── Persönlicher Laptop: Social Media, Banking, Privat
├── Investigation-Laptop: OSINT, Forensik, Analyse
│   └── Separate Login-Credentials
│   └── Festplatte verschlüsselt (LUKS/VeraCrypt)
│   └── Kein Zugang zu persönlichen Accounts
├── Burner-Gerät: Sock Puppets, Dark Web
│   └── Tails OS (amnesisch)
│   └── Nie im eigenen Netzwerk benutzen
└── Analyse-VM: Malware-Analyse (isoliert, kein Netzwerk)

NETZWERK-EBENE:
├── Heim-WiFi: Persönliches
├── VPN 1 (Mullvad): Investigation-Arbeit
├── VPN 2 (anderer Provider): Sock Puppets
├── Tor: Dark Web, sensitive Recherche
└── Public WiFi: Für hochsensitive Operationen (Café, Bibliothek)

IDENTITÄTS-EBENE:
├── Echter Name: LinkedIn, Konferenzen, Blog
├── Pseudonym: CTF, HackTheBox, Bug Bounty
├── Sock Puppet A: OSINT auf Facebook/VK
├── Sock Puppet B: Dark Web Foren
└── Sock Puppet C: Zielgruppenspezifisch

KOMMUNIKATIONS-EBENE:
├── Persönlich: Signal (echte Nummer)
├── Investigation: ProtonMail (separate Nummer)
├── Quellen-Kommunikation: Signal/Wire mit Burner-Nummer
└── Emergency: Vorher vereinbarter Dead Drop / Steganographie
```

### Anti-Surveillance Measures

```
DIGITAL:
├── Browser: Tor Browser / Brave (Fingerprint-Schutz)
├── DNS: DoH/DoT (verschlüsselte DNS-Anfragen)
├── Metadaten: MAT2 (PDF, Bilder), ExifTool
├── Kommunikation: Signal (Disappearing Messages), Wire
├── Storage: VeraCrypt (Hidden Volumes), LUKS
├── OS: Tails (amnesisch) oder Whonix (Tor-transparent)
└── Hardware: USB-Condom (Datenblockierung), Faraday Bag (Telefon)

PHYSISCH:
├── Surveillance Detection Route (SDR):
│   → Längerer Weg zu einem Meeting
│   → Einbahnstraßen, U-Bahn-Wechsel, Stopps
│   → Prüfe ob jemand folgt (gleiche Person 3x = Überwachung)
├── Telefon in Faraday Bag bei sensiblen Meetings
├── Kein Telefon zum Meeting mitnehmen (Cell-Tower Location)
├── Sichere Treffpunkte: Draußen, keine Kameras, laut
└── Counter-Technical Surveillance:
    → RF-Detektor (Wanzen finden)
    → TSCM Sweep (professionell)
    → WiFi-Scanner (unbekannte Geräte finden)
```

### Praktische Übungen Counter-Intelligence

**Selbst-Assessment:**
1. Google deinen echten Namen — was findet ein Angreifer?
2. Prüfe haveibeenpwned.com — welche Leaks betreffen dich?
3. PimEyes mit deinem Foto — wo bist du im Netz?
4. Erstelle dein eigenes Threat Model
5. Implementiere Compartmentalization für deine Geräte

---

## WOCHE 6-8: ADVANCED SPYWARE REVERSE ENGINEERING

### Pegasus Deep Dive — Technische Analyse

```
PEGASUS INFECTION CHAINS (Öffentlich dokumentiert):

1. TRIDENT (2016) — iOS 9.3.5
   → 3 Zero-Days: Safari WebKit RCE + Kernel Info Leak + Kernel Code Exec
   → Entdeckt von Ahmed Mansoor (UAE Dissident) + Citizen Lab
   → Infection: Klick auf SMS-Link → Safari → Exploit → Jailbreak → Implant

2. KISMET (2020) — iOS 13.x
   → Zero-Click via iMessage
   → Exploit in IMTranscoderAgent (Bildverarbeitung)
   → Keine User-Interaktion nötig

3. FORCEDENTRY (2021) — iOS 14.x
   → Zero-Click via iMessage
   → Exploit in CoreGraphics PDF-Parser (GIF verpacktes PDF)
   → JBIG2 Decompressor als Turing-Complete VM missbraucht (!)
   → Google P0 Analyse: "The most technically sophisticated exploit
      we've ever seen" (Ian Beer & Samuel Groß)

4. Aktuelle Versionen (2023+):
   → Vermutlich über iMessage, FaceTime, HomeKit
   → Apple: Lockdown Mode als Schutz (seit iOS 16)
```

### Forensische Pegasus-Erkennung

```bash
# Mobile Verification Toolkit (MVT) — Amnesty International
# DAS Tool zur Erkennung von Pegasus und anderer Spyware

# Installation:
pip install mvt

# iOS Analyse (aus iTunes Backup oder sysdiagnose):

# 1. iTunes Backup erstellen (verschlüsselt = mehr Daten):
#    Verbinde iPhone → iTunes/Finder → Backup (verschlüsselt)

# 2. Backup entschlüsseln:
mvt-ios decrypt-backup -p "backup_password" \
    -d /output/decrypted \
    /path/to/encrypted/backup

# 3. Backup analysieren mit IOCs:
mvt-ios check-backup \
    -o /output/results \
    -i pegasus_iocs.stix2 \
    /output/decrypted

# 4. Sysdiagnose analysieren (tiefere Analyse):
# Auf iPhone: Einstellungen → Datenschutz → Analysedaten → sysdiagnose
mvt-ios check-sysdiagnose \
    -o /output/sysdiag_results \
    -i pegasus_iocs.stix2 \
    /path/to/sysdiagnose.tar.gz

# Android Analyse:
# 1. ADB Backup erstellen:
#    adb backup -all -shared -nosystem

# 2. APKs überprüfen:
mvt-android check-apks \
    -o /output/android_results \
    /path/to/apks/

# 3. Android Backup analysieren:
mvt-android check-backup \
    -o /output/android_results \
    /path/to/backup

# IOC-Quellen:
# - Amnesty International: github.com/AmnestyTech/investigations
# - Citizen Lab: citizenlab.ca (IOCs in Reports)
# - ESET Research
# - Lookout Threat Intelligence
```

### Spyware Reverse Engineering Workflow

```
WENN DU EIN SPYWARE-SAMPLE HAST:

1. IDENTIFICATION
   ├── Hashes: SHA256 → VirusTotal, MalwareBazaar
   ├── Strings: strings binary | grep -i "http\|phone\|sms\|gps\|record"
   ├── File Type: file binary → ELF (Android), Mach-O (iOS), PE (Windows)
   └── Packer Detection: DIE, Detect It Easy

2. STATIC ANALYSIS
   ├── Ghidra / IDA Pro: Decompile
   ├── Capability Mapping:
   │   ├── Microphone Access → Audio Recording
   │   ├── Camera Access → Photo/Video Capture
   │   ├── SMS Read → Message Interception
   │   ├── Contacts Read → Contact Exfiltration
   │   ├── GPS/Location → Tracking
   │   ├── File System Access → Data Theft
   │   ├── Keylogging → Credential Theft
   │   └── Screen Capture → Visual Surveillance
   ├── C2 Protocol Analysis: Wie kommuniziert es nach Hause?
   └── Persistence Mechanism: Wie überlebt es Reboot?

3. DYNAMIC ANALYSIS (In Sandbox!)
   ├── Android: Frida + Android Emulator oder Corellium
   ├── iOS: Corellium (Cloud iOS Emulation, teuer aber einzigartig)
   ├── Network: Capture C2-Traffic (mitmproxy, Burp)
   ├── API Calls: strace (Linux), dtrace (macOS), Frida hooks
   └── Behavioral: Was tut es in den ersten 60 Sekunden?

4. ATTRIBUTION
   ├── C2 Infrastructure → Passive DNS → WHOIS → Registrant
   ├── Code Similarities → YARA Rules gegen bekannte Spyware-Familien
   ├── Language Artifacts → Compiler-Sprache, Kommentare, Zeitzone
   └── TTP Mapping → MITRE ATT&CK für Mobile
```

### YARA Rules für Spyware-Erkennung

```yara
rule Pegasus_Indicators {
    meta:
        description = "Detects potential Pegasus/NSO Group indicators"
        author = "Investigation Training"
        reference = "Amnesty International, Citizen Lab"

    strings:
        // Bekannte Pegasus Prozessnamen
        $proc1 = "bh" ascii       // Pegasus agent name
        $proc2 = "roleaboutd" ascii
        $proc3 = "pcaborede" ascii
        $proc4 = "RollingStock" ascii

        // Bekannte C2 Domains (historisch)
        $domain1 = "revolution.sfrfrsgr.com" ascii
        $domain2 = "arabnews365.com" ascii

        // Pegasus Filesystem Artifacts
        $path1 = "/private/var/tmp/" ascii
        $path2 = "com.apple.CrashReporter" ascii

        // Verdächtige iOS Capabilities
        $cap1 = "AVAudioSession" ascii
        $cap2 = "CLLocationManager" ascii
        $cap3 = "CNContactStore" ascii
        $cap4 = "PHPhotoLibrary" ascii

    condition:
        (2 of ($proc*)) or
        (any of ($domain*)) or
        (3 of ($cap*) and any of ($path*))
}

rule FinSpy_Indicators {
    meta:
        description = "Detects potential FinFisher/FinSpy indicators"
        reference = "CCC Analysis, Kaspersky"

    strings:
        $s1 = "FINFISHER" ascii nocase
        $s2 = "finspy" ascii nocase
        $s3 = {6D 6F 64 75 6C 65 73 2F}  // "modules/"
        $config = {78 9C}   // zlib compressed config (common in FinSpy)

        // FinSpy Module Names
        $mod1 = "PHONE" ascii
        $mod2 = "SMSWATCH" ascii
        $mod3 = "LOCATION" ascii
        $mod4 = "CALLRECORD" ascii

    condition:
        (any of ($s1, $s2)) or
        (3 of ($mod*))
}

rule Predator_Indicators {
    meta:
        description = "Detects potential Predator/Alien spyware"
        reference = "Cisco Talos, Citizen Lab"

    strings:
        // Predator Loader (Alien)
        $alien1 = "alien" ascii nocase
        $loader = {48 8B 05 ?? ?? ?? ?? 48 85 C0 74}

        // Python-basierte Module (Predator nutzt Python!)
        $py1 = "import frida" ascii
        $py2 = "socket.connect" ascii
        $py3 = "/data/local/tmp" ascii

        // Bekannte Predator Infrastructure
        $infra1 = "cytrox" ascii nocase
        $infra2 = "intellexa" ascii nocase

    condition:
        (2 of ($alien*, $loader)) or
        (2 of ($py*) and any of ($infra*))
}
```

---

## DELIVERABLES MONAT 33-34

| # | Deliverable | Status |
|---|------------|--------|
| 1 | Elicitation Technique Guide (mit Szenarien) | [ ] |
| 2 | PEACE Interview Template + Checkliste | [ ] |
| 3 | Persönliches Threat Model + OPSEC Implementation | [ ] |
| 4 | Compartmentalized Setup (3 separate Identitäten) | [ ] |
| 5 | Counter-Surveillance Checklist (digital + physisch) | [ ] |
| 6 | Pegasus FORCEDENTRY Analyse (P0 Paper Summary) | [ ] |
| 7 | MVT Lab: Eigenes iPhone/Android scannen | [ ] |
| 8 | YARA Rules für 3 Spyware-Familien | [ ] |
| 9 | Spyware Capability Comparison Matrix | [ ] |
| 10 | Blog Post: "Mobile Spyware Detection for Journalists" | [ ] |

---

## QUELLEN

### HUMINT
- **CIA: The Art of Intelligence** — Robert Baer (Memoiren, nicht Lehrbuch)
- **Psychology of Intelligence Analysis** — Richards Heuer (CIA, kostenlos von cia.gov)
- **Structured Analytic Techniques** — Heuer & Pherson
- **Critical Thinking for Strategic Intelligence** — Pherson & Pherson
- **FBI Law Enforcement Bulletin** — Elicitation Techniques Articles

### Counter-Intelligence
- **Michael Bazzell: Extreme Privacy** — 4th Edition
- **Kevin Mitnick: The Art of Invisibility** — Persönliche OPSEC
- **Grugq: OPSEC Presentations** — YouTube/Conference Talks
- **EFF Surveillance Self-Defense** — ssd.eff.org

### Spyware Analysis
- **Google Project Zero: FORCEDENTRY Analysis** — googleprojectzero.blogspot.com
- **Amnesty International: Forensic Methodology** — github.com/AmnestyTech
- **Citizen Lab Reports** — citizenlab.ca (ALLE Pegasus/Predator Reports)
- **Cisco Talos: Predator Analysis** — blog.talosintelligence.com
- **Kaspersky GReAT: FinSpy Analysis** — securelist.com
- **Lookout: Pegasus Technical Analysis** — lookout.com
