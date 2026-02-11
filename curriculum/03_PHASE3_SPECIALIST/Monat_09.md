# MONAT 9 — RED TEAM BASICS + MALWARE BASICS + CFE-ZERTIFIZIERUNG

## DAS LEVEL: Junior Red Team Operator + Certified Fraud Examiner

> **REALISTISCHER HINWEIS:** Die CFE-Lernphase hat bereits in Monat 7-8 begonnen (begleitendes Studium des Fraud Examiners Manual, Übungsfragen). Monat 9 ist der Prüfungsmonat — die letzten 2 Wochen dienen der intensiven Wiederholung und Prüfungsablegung. Wer erst in Monat 9 mit dem CFE-Stoff anfängt, wird die Prüfung NICHT bestehen. Ab Monat 7: mindestens 3-5h/Woche CFE-Vorbereitung.

---

## Monats-Ziele (nicht verhandelbar)
- [ ] C2 Framework: Sliver oder Havoc aufgesetzt und benutzt
- [ ] AV/EDR Evasion: Verstehe warum und wie Malware AV umgeht
- [ ] Shellcode: Eigenen Shellcode geschrieben (Assembly)
- [ ] Malware-Analyse: 10 echte Samples in FlareVM analysiert
- [ ] CFE-Prüfung: BESTANDEN (Lernphase seit Monat 7-8, Monat 9 = Prüfung)
- [ ] OPSEC: Anonymisierungs-Techniken für Operationen verstanden
- [ ] Threat Modeling: STRIDE Framework angewendet
- [ ] HackTheBox Pro Lab: "Dante" begonnen

---

## WOCHE 33 — C2 FRAMEWORKS + EVASION

### Montag (Tag 225) — Command & Control

**06:30–08:30 | DEEP TECHNICAL: C2 Frameworks verstehen**

Jeder State-Sponsored Actor und jedes Red Team nutzt C2-Frameworks. Du musst sie verstehen — für Angriff UND Verteidigung.

**Sliver (BishopFox):**
- Open-Source, aktiv entwickelt, Golang
- Features: Implants (Beacon + Session), mTLS/HTTP/DNS/WireGuard
- `sliver > generate --mtls <IP> --os windows --arch amd64 --format exe`
- Warum Sliver? → Modern, gut dokumentiert, Community-Standard

**Cobalt Strike:**
- DER Industriestandard (kommerziell, ~$5.900/Jahr)
- Malleable C2 Profiles → C2-Traffic sieht aus wie normaler Traffic
- Beacon: Sleep, Jitter, SMB/TCP Pivot
- Du wirst Cobalt Strike in fast jedem APT-Report finden — verstehe es!

**Havoc:**
- Open-Source Alternative zu Cobalt Strike
- github.com/HavocFramework/Havoc
- Demon Agent, Custom Payloads, BOFs (Beacon Object Files)

**Was du in deinem Lab tun sollst:**
1. Sliver installieren (Go binary oder Docker)
2. Listener starten (MTLS + HTTP)
3. Implant generieren
4. Implant auf Windows VM ausführen
5. Session bekommen → Befehle ausführen
6. Pivoting üben (von einem kompromittierten Host zum nächsten)

**09:00–10:30 | INTELLIGENCE: AV/EDR Evasion verstehen**
- Warum? Du musst verstehen wie Malware Sicherheitssoftware umgeht
- **Statische Detection:** Signaturen, Hashes, YARA-Regeln
  - Evasion: Obfuskation, Packing, Polymorphismus, Metamorphismus
- **Dynamische Detection:** Behavior Monitoring, API Hooking, Sandbox
  - Evasion: Sleep, Environment Checks, Anti-Sandbox, API Unhooking
- **Heuristische Detection:** ML/AI-basiert
  - Evasion: Adversarial ML, Feature Manipulation
- **EDR-Spezifisch:** ETW (Event Tracing for Windows), Kernel Callbacks
  - Evasion: Direct Syscalls, Hardware Breakpoints, Callback Removal

**11:00–12:00 | CHALLENGES: HackTheBox**
- Pro Lab "Dante" starten (multi-machine AD-Netzwerk)

**18:30–20:00 | DEEP LEARNING: Shellcode schreiben**
- Eigenen Shellcode in x64 Assembly:
  - Einfachster: execve("/bin/sh", NULL, NULL) auf Linux
  - Windows: MessageBox via WinAPI
  - Null-Byte-Free machen
  - Tools: nasm, ld, objdump, pwntools
- Warum Assembly? → Verstehst du die unterste Ebene, verstehst du ALLES darüber

**21:00–22:30 | PROJEKT: C2 Lab dokumentieren**

---

## WOCHE 34 — MALWARE-ANALYSE INTENSIV

### Setup: FlareVM + REMnux Lab

**FlareVM (Mandiant):**
- Windows 10 VM → Installer-Script von github.com/mandiant/flare-vm
- Installiert 200+ Tools: x64dbg, Ghidra, PEStudio, ProcMon, Wireshark, FakeNet-NG, FLOSS, dnSpy

**REMnux (Lenny Zeltser):**
- Linux VM für Malware-Analyse
- INetSim für Netzwerk-Simulation (Malware "denkt" sie ist online)

**Analyse-Workflow für jedes Sample:**
1. **Statisch:** file, strings, FLOSS, PEStudio, DIE (Packer?), YARA
2. **Dynamisch:** ProcMon (File/Registry/Network), FakeNet (DNS/HTTP), Wireshark
3. **Debug:** x64dbg (Breakpoints auf CreateFile, WriteProcessMemory, VirtualAlloc)
4. **Report:** Executive Summary, IoCs, ATT&CK Mapping, YARA-Regel

**Samples von:**
- MalwareBazaar (bazaar.abuse.ch) — Getaggte Samples
- any.run — Interaktive Sandbox (anderen Analysen zuschauen)
- malware-traffic-analysis.net — PCAPs + Samples
- VX Underground (vx-underground.org) — Archiv + Papers

---

## WOCHE 35-36 — CFE PRÜFUNG

### CFE-Vorbereitungsstrategie

**Die CFE-Prüfung:**
- 4 Sektionen, jeweils 125 Fragen, insgesamt 500 Fragen
- Online-Prüfung, 75% zum Bestehen
- Sektionen:
  1. Financial Transactions and Fraud Schemes
  2. Law (US-fokussiert, aber auch internationale Fragen)
  3. Investigation
  4. Fraud Prevention and Deterrence

**Vorbereitungsplan (2 Wochen intensiv):**
- Woche 35: Alle 4 Sektionen durcharbeiten, Übungsfragen
- Woche 36: Schwächen identifizieren, gezielt wiederholen, Prüfung ablegen

**Warum CFE so wichtig ist:**
- Gold Standard in Fraud Investigation weltweit
- Türöffner bei: Schweizer Banken, Big Four, Kroll, FTI, Regierungsbehörden
- Zeigt Interdisziplinarität: Technik + Investigation + Legal + Business
- In Kombination mit deinen technischen Skills → extrem selten und wertvoll

---

## KPI-CHECKLISTE MONAT 9

| KPI | Ziel | Status |
|-----|------|--------|
| C2 Framework | Sliver/Havoc aufgesetzt + benutzt | [ ] |
| AV Evasion | Statisch + Dynamisch verstanden | [ ] |
| Shellcode | Eigenen Shellcode geschrieben | [ ] |
| Malware-Analyse | 10 echte Samples analysiert | [ ] |
| YARA | 5+ Regeln für echte Samples | [ ] |
| ATT&CK Mapping | Für jedes Sample durchgeführt | [ ] |
| CFE | BESTANDEN | [ ] |
| HTB Dante | Signifikanter Fortschritt | [ ] |
| OPSEC | Anonymisierung verstanden | [ ] |
| Blog | 2+ Red Team/Malware Write-ups | [ ] |

---

## PHASE 3 KOMPLETT — WAS DU JETZT KANNST

Nach 9 Monaten:
- **Web Hacking:** PortSwigger komplett, Bug Bounty aktiv, SQLi/XSS/SSRF/Deserialization
- **Active Directory:** Komplette AD Attack Chain, BloodHound, Mimikatz, Golden Ticket
- **Social Engineering:** HUMINT-Techniken, Phishing, Interview-Methoden
- **Red Team:** C2 Frameworks, Shellcode, Evasion, Post-Exploitation
- **Malware-Analyse:** 10+ echte Samples analysiert, YARA, FlareVM
- **CFE:** Zertifiziert als Fraud Examiner

**Du bist bereit für Phase 4: ADVANCED — Reverse Engineering + Binary Exploitation.**
