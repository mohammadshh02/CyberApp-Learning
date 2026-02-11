# MONAT 11 — BUFFER OVERFLOWS, ROP, HEAP + MOBILE FORENSIK INTRO

## Monats-Ziele (nicht verhandelbar)
- [ ] Stack Buffer Overflow: Vanilla + mit NX/DEP Bypass (ret2libc, ROP)
- [ ] ASLR Bypass: Information Leaks, Partial Overwrites
- [ ] ROP Emporium: Alle 8 Challenges gelöst
- [ ] Heap Exploitation: Use-After-Free, Double Free, Tcache Poisoning
- [ ] pwn.college: 30+ Challenges gelöst
- [ ] pwntools: Exploit-Scripts schreiben
- [ ] Format String Attacks: Read + Write primitives
- [ ] Mobile Forensik: iOS Backup Analysis + Android ADB Extraction
- [ ] CAMS-Vorbereitung begonnen (Anti-Money Laundering Specialist)

---

## WOCHE 41 — STACK EXPLOITATION

### Montag (Tag 281)

**06:30–08:30 | DEEP TECHNICAL: Stack Buffer Overflow — Von Grund auf**

```python
# EXPLOIT DEVELOPMENT MIT PWNTOOLS
from pwn import *

# Beispiel: Stack Buffer Overflow (kein ASLR, kein NX)
context.arch = 'amd64'

# 1. Offset finden (bis Return Address überschrieben)
# Methode: Cyclic Pattern
pattern = cyclic(200)
# In GDB: `run < <(python3 -c "from pwn import *; print(cyclic(200))")``
# Crash → RIP-Wert lesen → cyclic_find(value) → Offset

# 2. Shellcode
shellcode = asm(shellcraft.sh())  # Generiert /bin/sh Shellcode

# 3. Exploit
offset = 72  # Beispiel-Offset
buffer_addr = 0x7fffffffde00  # Beispiel-Adresse des Buffers

payload = shellcode                    # Shellcode am Anfang
payload += b'A' * (offset - len(shellcode))  # Padding bis Return Address
payload += p64(buffer_addr)            # Return Address → Shellcode

# 4. Senden
p = process('./vulnerable_binary')
p.sendline(payload)
p.interactive()  # Shell!
```

**09:00–10:30 | PRAXIS: pwn.college**
- Module in Reihenfolge:
  1. Program Interaction
  2. Assembly Crash Course
  3. Debugging Refresher
  4. Memory Errors
  5. Shellcode Injection
  6. Sandboxing
  7. Return Oriented Programming
- Heute: Module 1-3 starten

**11:00–12:00 | CHALLENGES: ROP Emporium**
- ropemporium.com → Challenge 1: "ret2win"
- x86-64 Version zuerst, dann ARM wenn Zeit

**18:30–20:00 | DEEP LEARNING: NX/DEP + ASLR**
- **NX (No-Execute) / DEP:** Stack ist nicht mehr ausführbar → Shellcode auf Stack funktioniert nicht
  - Bypass: Return-to-libc (ret2libc) → system("/bin/sh")
  - Bypass: ROP (Return Oriented Programming) → Gadgets aus existierendem Code nutzen
- **ASLR:** Adressen sind randomisiert → Adressen raten funktioniert nicht
  - Bypass: Information Leak (printf Format String, andere Leaks)
  - Bypass: Partial Overwrite (nur niedrige Bytes überschreiben)
  - Bypass: Brute Force (nur bei 32-bit realistisch)
- **Stack Canaries:** Zufälliger Wert vor Return Address
  - Bypass: Format String Leak → Canary lesen → In Exploit einbauen
  - Bypass: Brute Force bei Forking Servers (Byte-für-Byte)

**21:00–22:30 | PROJEKT: Erste Exploits für CTF-Challenges**

---

## WOCHE 42-43 — HEAP EXPLOITATION + FORMAT STRINGS

### Woche 42: Heap
- how2heap (github.com/shellphish/how2heap) — Die Heap-Bibel
- Konzepte: Chunks, Bins (Fast/Small/Large/Unsorted), Tcache
- Attacks:
  - **Use-After-Free:** Objekt wird freigegeben, Pointer bleibt → Neues Objekt an gleicher Stelle → Kontrolle
  - **Double Free:** Zweimal free() → Chunk in Freelist zweimal → Arbitrary Allocation
  - **Tcache Poisoning (glibc 2.26+):** Tcache fd-Pointer überschreiben → Arbitrary Allocation
  - **House of Force, House of Spirit, House of Lore** — Klassische Heap-Techniken

### Woche 43: Format Strings + Mobile Forensik Start
- Format String: `%x` (Stack lesen), `%n` (Speicher schreiben), `%s` (Strings lesen)
- Mobile Forensik:
  - iOS: iTunes Backup → iBackup Viewer, iExplorer, mvt-ios
  - Android: ADB → Logical Extraction, App-Daten, Databases
  - Cellebrite Reader (kostenloser Viewer für Cellebrite-Extracts)

---

## WOCHE 44 — CAPSTONE + CAMS START

### Capstone
- Schreibe einen funktionierenden Exploit für ein echtes CVE (ältere, gut-dokumentierte)
- Vorschläge: CVE-2016-5195 (Dirty COW), oder ein CTF-Challenge aus pwnable.tw
- Dokumentiere den gesamten Prozess als Blog-Post

### CAMS (Certified Anti-Money Laundering Specialist)
- ACAMS Website: acams.org
- Materialien bestellen
- Kapitel 1-3 lesen (AML-Grundlagen, Regulatorischer Rahmen)
- Warum CAMS? → Essentiell für Schweizer Finanzsektor-Arbeit

---

## KPI-CHECKLISTE MONAT 11

| KPI | Ziel | Status |
|-----|------|--------|
| Stack Overflow | Vanilla + NX-Bypass | [ ] |
| ROP | Alle ROP Emporium Challenges | [ ] |
| ASLR Bypass | Info Leak + Partial Overwrite | [ ] |
| Heap | UAF + Double Free + Tcache | [ ] |
| Format String | Read + Write Primitives | [ ] |
| pwn.college | 30+ Challenges | [ ] |
| pwntools | Exploit-Scripts | [ ] |
| Mobile Forensik | iOS + Android Basics | [ ] |
| CAMS | Kapitel 1-3 | [ ] |
| Blog | 2+ Exploit Write-ups | [ ] |
