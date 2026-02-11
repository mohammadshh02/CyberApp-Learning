# MONAT 8 — SOCIAL ENGINEERING + NETWORK ATTACKS + ACTIVE DIRECTORY

## DAS LEVEL: Red Team Operator

Social Engineering ist die Waffe der Geheimdienste. Active Directory ist das Herz jedes Unternehmens. Netzwerk-Angriffe sind der Weg rein.

---

## Monats-Ziele (nicht verhandelbar)
- [ ] Active Directory: Kerberoasting, AS-REP Roasting, Pass-the-Hash, DCSync, Golden Ticket
- [ ] BloodHound: Attack Paths in AD visualisieren und ausnutzen
- [ ] Network Attacks: ARP Spoofing, MITM, LLMNR/NBT-NS Poisoning, Relay Attacks
- [ ] Social Engineering: PEACE Model, Pretexting, Phishing-Kampagne aufsetzen
- [ ] Responder + ntlmrelayx beherrscht
- [ ] Mimikatz: Credential Extraction verstanden
- [ ] HackTheBox: 10+ AD-Maschinen gerootet
- [ ] HUMINT-Grundlagen: Interview-Techniken für Fraud Investigation
- [ ] GoPhish: Phishing-Simulation aufgesetzt
- [ ] Cialdini "Influence" komplett gelesen

---

## WOCHE 29 — ACTIVE DIRECTORY ATTACKS

### Montag (Tag 197) — AD Fundamentals + Enumeration

**06:30–08:30 | DEEP TECHNICAL: Active Directory Internals**
- AD ist das #1 Ziel bei jedem Unternehmen und jeder Regierung
- Verstehe die Grundlagen (BEVOR du angreifst):
  - Domain Controller, Forest, Domain, OU, GPO
  - Kerberos Authentication (TGT, TGS, Service Ticket)
  - NTLM Authentication (Challenge-Response)
  - LDAP (Lightweight Directory Access Protocol)
  - SMB (Server Message Block)
  - DNS in AD (integriert, nicht separat)
- **Resource:** "Active Directory Basics" auf HackTricks (book.hacktricks.xyz)
- **Resource:** The Hacker Recipes (thehacker.recipes) — Exzellent für AD

**09:00–10:30 | PRAXIS: AD Lab aufbauen**
- Baue ein AD Lab in VirtualBox/VMware:
  1. Windows Server 2019/2022 als Domain Controller
  2. 2x Windows 10 Clients
  3. Netzwerk: Internal Network (Host-Only)
  4. AD installieren: `Install-WindowsFeature AD-Domain-Services`
  5. Domain promoten: `Install-ADDSForest`
  6. User, Groups, OUs erstellen
  7. Schwachstellen einbauen: SPN-Accounts, AS-REP-fähige User, Local Admin reuse
- Alternative: GOAD (Game of Active Directory) — vorgefertigtes verwundbares AD Lab

**11:00–12:00 | CHALLENGES: HackTheBox**
- Starte mit AD-Maschinen: Forest, Sauna, Monteverde
- Oder: TryHackMe "Attacktive Directory"

**18:30–20:00 | DEEP LEARNING: Kerberos Deep Dive**
- Kerberos-Ablauf im Detail:
  1. AS-REQ: Client → KDC (Username + Timestamp verschlüsselt mit User-Hash)
  2. AS-REP: KDC → Client (TGT verschlüsselt mit krbtgt-Hash)
  3. TGS-REQ: Client → KDC (TGT + SPN des gewünschten Service)
  4. TGS-REP: KDC → Client (Service Ticket verschlüsselt mit Service-Account-Hash)
  5. AP-REQ: Client → Service (Service Ticket)
- **Warum du das verstehen musst:**
  - Kerberoasting: Service Tickets sind mit dem Service-Account-Passwort verschlüsselt → Offline crackbar
  - AS-REP Roasting: Accounts ohne Pre-Authentication → TGT offline crackbar
  - Golden Ticket: krbtgt-Hash = unlimited access forever
  - Silver Ticket: Service-Account-Hash = Access zu dem Service

**21:00–22:30 | PROJEKT: AD Attack Cheat Sheet**

---

### Dienstag-Freitag — AD Attack Chain

**Dienstag:** Enumeration (BloodHound, PowerView, ldapsearch) + LLMNR/NBT-NS Poisoning (Responder)
**Mittwoch:** Kerberoasting + AS-REP Roasting + Hashcat für Kerberos-Hashes
**Donnerstag:** Pass-the-Hash + Pass-the-Ticket + Overpass-the-Hash
**Freitag:** DCSync + Golden Ticket + Silver Ticket + Skeleton Key

---

## WOCHE 30 — SOCIAL ENGINEERING + HUMINT

### Fokus: Intelligence-Grade Social Engineering

**Dies ist NICHT "Phishing-Emails schicken". Das ist HUMINT (Human Intelligence).**

### Montag (Tag 204) — HUMINT für Investigations

**06:30–08:30 | DEEP TECHNICAL: Interview-Techniken**

**Das PEACE Model (UK/Europa Standard):**
- **P**lanning and Preparation — Vorbereitung auf das Interview
- **E**ngage and Explain — Rapport aufbauen, Ablauf erklären
- **A**ccount — Freie Erzählung, offene Fragen
- **C**larify, Challenge, Close — Widersprüche ansprechen, Details klären
- **E**valuate — Interview bewerten, nächste Schritte

**Wicklander-Zulawski (ACFE-Standard):**
- Phase 1: Information-Gathering Interview (nicht anklagend)
- Phase 2: Admission-Seeking Interview (bei starker Evidenz)
- Theme Development (Gesichtswahrende Rationalisierungen anbieten)

**Kognitive Interview-Technik:**
- Mentale Wiederherstellung des Kontexts
- Alles berichten (auch scheinbar Irrelevantes)
- Zeitliche Reihenfolge ändern
- Perspektive wechseln

**09:00–10:30 | INTELLIGENCE: Cialdini Anwenden**
- "Influence" von Cialdini — 6 Prinzipien:
  1. **Reciprocity** — Gibst du mir, geb ich dir
  2. **Commitment/Consistency** — Kleine Zusage → große Zusage
  3. **Social Proof** — Andere machen es auch
  4. **Authority** — Experten vertrauen
  5. **Liking** — Sympathie = Vertrauen
  6. **Scarcity** — Begrenzte Verfügbarkeit = Dringlichkeit
- Analyse: Wie nutzen Betrüger diese Prinzipien?
- Analyse: Wie nutzt man sie in einer Investigation? (Ethisch!)

**18:30–20:00 | DEEP LEARNING: Phishing-Kampagne aufsetzen (Lab)**
- GoPhish installieren: github.com/gophish/gophish
- Lab-Setup (NUR gegen eigene Infrastruktur!):
  1. GoPhish Server aufsetzen
  2. Email-Template erstellen
  3. Landing Page erstellen
  4. Kampagne starten (an eigene Test-Accounts)
  5. Ergebnisse analysieren: Öffnungsrate, Klickrate, Credential-Eingabe

---

## WOCHE 31-32 — NETWORK ATTACKS + PIVOTING

### Woche 31: Network-Level Attacks
- **ARP Spoofing:** Bettercap → MITM im Netzwerk
- **LLMNR/NBT-NS Poisoning:** Responder → NTLMv2-Hashes capturen
- **NTLM Relay:** ntlmrelayx → Hashes nicht cracken, sondern weiterleiten
- **SMB Relay Attacks:** Von einem kompromittierten Host zum nächsten
- **IPv6 DNS Takeover:** mitm6 → IPv6 DHCP Spoofing

### Woche 32: Post-Exploitation + Pivoting
- **Mimikatz:** Credential Extraction (sekurlsa::logonpasswords, lsadump::sam)
- **Rubeus:** Kerberos Toolkit (.NET)
- **Pivoting:** SSH Tunneling, Chisel, Ligolo-ng
- **Lateral Movement:** PsExec, WMI, WinRM, DCOM
- **Persistence:** Scheduled Tasks, Registry, Services, WMI Events

---

## KPI-CHECKLISTE MONAT 8

| KPI | Ziel | Status |
|-----|------|--------|
| AD Lab | Eigenes Lab aufgebaut | [ ] |
| BloodHound | Attack Paths identifiziert | [ ] |
| Kerberoasting | Verstanden + durchgeführt | [ ] |
| Pass-the-Hash | Verstanden + durchgeführt | [ ] |
| DCSync | Verstanden + durchgeführt | [ ] |
| Golden Ticket | Verstanden + durchgeführt | [ ] |
| Responder | LLMNR/NBT-NS Poisoning | [ ] |
| ntlmrelayx | Relay-Angriff | [ ] |
| Mimikatz | Credential Extraction | [ ] |
| GoPhish | Phishing-Simulation | [ ] |
| PEACE Model | Verstanden + geübt | [ ] |
| Cialdini | "Influence" komplett gelesen | [ ] |
| HTB | 10+ AD-Maschinen | [ ] |
| Pivoting | Chisel/Ligolo-ng | [ ] |
| Blog | 2+ AD/SE Write-ups | [ ] |
