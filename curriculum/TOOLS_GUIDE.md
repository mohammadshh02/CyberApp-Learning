# TOOLS GUIDE — Jedes Tool mit Setup, Priorität, Monat

## LEGENDE
- **P1** = Priorität 1 (MUSS beherrscht werden)
- **P2** = Priorität 2 (Sehr wichtig)
- **P3** = Priorität 3 (Nice-to-have, lerne wenn Zeit)

---

## OSINT TOOLS

| Tool | Setup | Priorität | Monat | Beschreibung |
|------|-------|-----------|-------|-------------|
| Maltego CE | maltego.com/downloads | P1 | 2 | Graph-basierte OSINT-Plattform |
| SpiderFoot | `pip install spiderfoot` | P1 | 2 | Automatisierte OSINT-Reconnaissance |
| Recon-ng | `pip install recon-ng` | P2 | 2 | Modular Reconnaissance Framework |
| theHarvester | `pip install theHarvester` | P1 | 2 | Email/Subdomain Enumeration |
| Sherlock | `pip install sherlock-project` | P2 | 2 | Username Hunting (400+ Sites) |
| Maigret | `pip install maigret` | P1 | 6 | Username Check (3000+ Sites) |
| Holehe | `pip install holehe` | P2 | 6 | Email → Account Check |
| GHunt | github.com/mxrch/GHunt | P2 | 6 | Google Account Investigation |
| Amass | `go install github.com/owasp-amass/amass/v4/...` | P1 | 2 | Subdomain Enumeration |
| Shodan CLI | `pip install shodan` | P1 | 1 | Internet-weite Device Search |
| MVT | `pip install mvt` | P1 | 4 | Mobile Verification Toolkit (Pegasus) |

## FORENSIK TOOLS

| Tool | Setup | Priorität | Monat | Beschreibung |
|------|-------|-----------|-------|-------------|
| Autopsy | autopsy.com/download | P1 | 3 | Disk Forensik GUI |
| Volatility 3 | `pip install volatility3` | P1 | 4 | Memory Forensik |
| KAPE | ericzimmerman.github.io | P1 | 4 | Artifact Collection + Processing |
| EZ Tools | ericzimmerman.github.io | P1 | 4 | Windows Forensik Toolkit |
| Wireshark | wireshark.org | P1 | 2 | Netzwerk-Analyse |
| FTK Imager | exterro.com | P2 | 3 | Forensische Image-Erstellung |
| plaso/log2timeline | `pip install plaso` | P2 | 4 | Super-Timeline Generator |
| FlareVM | github.com/mandiant/flare-vm | P1 | 9 | Malware Analysis VM |
| REMnux | remnux.org | P1 | 9 | Linux Malware Analysis VM |

## OFFENSIVE TOOLS

| Tool | Setup | Priorität | Monat | Beschreibung |
|------|-------|-----------|-------|-------------|
| Burp Suite | portswigger.net | P1 | 7 | Web Application Testing |
| Nmap | `apt install nmap` | P1 | 1 | Port Scanner + Service Detection |
| BloodHound | github.com/BloodHoundAD | P1 | 8 | AD Attack Path Visualization |
| Responder | github.com/lgandx/Responder | P1 | 8 | LLMNR/NBT-NS Poisoning |
| Impacket | `pip install impacket` | P1 | 8 | AD Attack Toolkit (Python) |
| CrackMapExec | github.com/byt3bl33d3r/CrackMapExec | P1 | 8 | AD Post-Exploitation |
| Sliver | github.com/BishopFox/sliver | P1 | 9 | C2 Framework |
| Hashcat | hashcat.net | P1 | 8 | GPU Password Cracking |
| Gobuster | `go install github.com/OJ/gobuster/v3` | P2 | 7 | Directory/Subdomain Brute Force |
| pwntools | `pip install pwntools` | P1 | 11 | Exploit Development Framework |
| Ghidra | ghidra-sre.org | P1 | 10 | Reverse Engineering |
| x64dbg | x64dbg.com | P1 | 10 | Windows Debugger |
| GDB + pwndbg | github.com/pwndbg/pwndbg | P1 | 10 | Linux Debugger |
| Frida | `pip install frida-tools` | P1 | 16 | Dynamic Instrumentation |
| AFL++ | github.com/AFLplusplus/AFLplusplus | P1 | 19 | Fuzzer |

## CRYPTO INVESTIGATION TOOLS

| Tool | Setup | Priorität | Monat | Beschreibung |
|------|-------|-----------|-------|-------------|
| OXT.me | oxt.me (Web) | P1 | 5 | Bitcoin-Transaktionsanalyse |
| Breadcrumbs | breadcrumbs.app | P1 | 5 | Crypto Investigation |
| Metasleuth | metasleuth.io | P2 | 5 | Cross-Chain Tracking |
| Etherscan | etherscan.io (Web) | P1 | 5 | Ethereum Explorer |
| Blockchair | blockchair.com (Web) | P2 | 5 | Multi-Chain Explorer |

## HARDWARE TOOLS

| Tool | Preis | Priorität | Monat | Beschreibung |
|------|-------|-----------|-------|-------------|
| Proxmark3 RDV4 | ~300€ | P1 | 17 | RFID/NFC Research |
| RTL-SDR V3 | ~30€ | P1 | 17 | SDR Empfänger |
| HackRF One | ~350€ | P2 | 17 | SDR Senden + Empfangen |
| Flipper Zero | ~170€ | P2 | 17 | Multi-Tool (Sub-GHz, RFID, NFC, IR) |
| WiFi Adapter (Alfa) | ~50€ | P1 | 17 | Monitor Mode für WiFi Auditing |
