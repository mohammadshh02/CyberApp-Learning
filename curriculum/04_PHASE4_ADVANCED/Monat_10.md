# MONAT 10 — C + ASSEMBLY + GHIDRA: Die Elite-Trennung beginnt

## WARUM DIESES MONAT ALLES VERÄNDERT

Hier trennen sich die Wege. 95% der "Cybersecurity-Leute" können kein Assembly lesen, keinen C-Code debuggen, kein Binary reverse-engineeren. Sie bleiben bei Web-Pentesting und Nmap-Scans. Die restlichen 5% — die Project Zero Researcher, die Exploit-Entwickler, die Kaspersky GReAT-Analysten — verstehen die Maschine auf unterster Ebene.

---

## Monats-Ziele (nicht verhandelbar)
- [ ] C: Pointer, Memory Layout, Buffer Overflows, Heap-Allokation verstanden
- [ ] x86-64 Assembly: Lesen + Schreiben, Calling Conventions, System Calls
- [ ] Ghidra: 20+ Crackmes gelöst, Real-World Binary reverse-engineert
- [ ] GDB/pwndbg: Debugging auf Instruktionsebene
- [ ] "Hacking: Art of Exploitation" Kapitel 1-4 durchgearbeitet
- [ ] OpenSecurityTraining2 x86-64 Assembly Kurs abgeschlossen
- [ ] Microcorruption: 10+ Challenges gelöst
- [ ] Erster Flare-On Challenge gelöst (aus vergangenen Jahren)
- [ ] Eigenen Disassembler-Script in Python geschrieben

---

## WOCHE 37 — C PROGRAMMING (SECURITY-FOKUSSIERT)

### Montag (Tag 253)

**06:30–08:30 | DEEP TECHNICAL: C — Die Sprache der Maschine**

**BUCH: "Hacking: The Art of Exploitation" von Jon Erickson (2. Auflage)**
- DAS Buch. Es lehrt C, Assembly und Exploitation zusammen im Security-Kontext.
- Kapitel 2: Programming — C von Grund auf, aber für Hacker

**Was du in C lernen musst (und NICHTS mehr):**

```c
// 1. POINTER — Das Herz von Exploitation
#include <stdio.h>
#include <string.h>

int main() {
    char buffer[64];
    char *ptr = buffer;

    // ptr zeigt auf den Anfang von buffer
    printf("buffer address: %p\n", buffer);
    printf("ptr value:      %p\n", ptr);
    printf("ptr+10:         %p\n", ptr + 10);  // Pointer Arithmetic

    // GEFAHR: Buffer Overflow
    strcpy(buffer, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    // 72 A's in einen 64-byte Buffer = OVERFLOW
    // Überschreibt was NACH dem Buffer im Speicher liegt

    return 0;
}

// 2. MEMORY LAYOUT — Wo lebt was?
/*
    HIGH ADDRESSES
    ┌──────────────┐
    │    Stack      │  ← Lokale Variablen, Return Addresses
    │    ↓          │     WÄCHST NACH UNTEN
    │              │
    │    ↑          │
    │    Heap       │  ← malloc/free, dynamisch
    │              │     WÄCHST NACH OBEN
    ├──────────────┤
    │    BSS        │  ← Uninitialisierte globale Variablen
    ├──────────────┤
    │    Data       │  ← Initialisierte globale Variablen
    ├──────────────┤
    │    Text       │  ← Der Programmcode (READ-ONLY)
    └──────────────┘
    LOW ADDRESSES

    WARUM DAS WICHTIG IST:
    - Stack Overflow → Return Address überschreiben → Code Execution
    - Heap Overflow → Metadata überschreiben → Arbitrary Write
    - Use-After-Free → Dangling Pointer → Code Execution
*/

```

**Beispiel 3: Function Pointers — Ziel für Angreifer:**
```c
#include <stdio.h>

void safe_function() { printf("Safe!\n"); }
void evil_function() { printf("PWNED!\n"); }

int main() {
    void (*func_ptr)() = safe_function;
    func_ptr();  // Ruft safe_function auf

    // Wenn ein Angreifer func_ptr überschreiben kann:
    func_ptr = evil_function;
    func_ptr();  // Ruft evil_function auf → PWNED
    return 0;
}
```

**09:00–10:30 | PRAXIS: OpenSecurityTraining2**
- ost2.fyi → "Architecture 1001: x86-64 Assembly"
- Kostenlos, exzellent, von Xeno Kovah (ehemals MITRE)
- Starte Modul 1 + 2

**11:00–12:00 | CHALLENGES: Crackmes**
- crackmes.one → Difficulty 1 → Ghidra öffnen → Lösen
- Ziel: 3 Crackmes heute

**18:30–20:00 | DEEP LEARNING: x86-64 Assembly Grundlagen**
- Register: RAX, RBX, RCX, RDX, RSI, RDI, RBP, RSP, RIP, R8-R15
- Stack: PUSH, POP, CALL, RET
- Key Instructions: MOV, LEA, ADD, SUB, CMP, TEST, JMP/JE/JNE, XOR
- Flags: ZF (Zero), CF (Carry), SF (Sign), OF (Overflow)
- Calling Convention (System V AMD64 ABI): RDI, RSI, RDX, RCX, R8, R9 für erste 6 Argumente

**21:00–22:30 | PROJEKT: Assembly Hello World + Shellcode**

---

## WOCHE 38-39 — GHIDRA MASTERY + REVERSE ENGINEERING

### Fokus
- "The Ghidra Book" von Chris Eagle (No Starch Press) parallel lesen
- Ghidra-Interface: CodeBrowser, Decompiler, Function Graph, Cross-References
- Lerne: Funktionen umbenennen, Datentypen definieren, Strukturen erstellen
- Ghidra Scripting (Java + Python) für Automatisierung
- **Übungen:** Crackmes.one Difficulty 1-3 (30+ lösen)
- **Advanced:** Microcorruption (MSP430 Assembly, aber Konzepte übertragbar)

## WOCHE 40 — CAPSTONE: REAL-WORLD BINARY + FLARE-ON

- Flare-On Challenge (vergangenes Jahr) → Challenge 1-3 lösen
- ODER: Echtes Malware-Sample in Ghidra reverse-engineeren
- Detaillierten RE-Report schreiben

---

## KPI-CHECKLISTE MONAT 10

| KPI | Ziel | Status |
|-----|------|--------|
| C | Pointer, Memory Layout, Overflows | [ ] |
| x86-64 ASM | Lesen + Schreiben | [ ] |
| Ghidra | 20+ Crackmes gelöst | [ ] |
| GDB/pwndbg | Instruktions-Level Debugging | [ ] |
| OST2 | x86-64 Kurs abgeschlossen | [ ] |
| Microcorruption | 10+ Challenges | [ ] |
| Flare-On | Challenge 1-3 | [ ] |
| Erickson Buch | Kapitel 1-4 | [ ] |
| Blog | 2+ RE Write-ups | [ ] |
