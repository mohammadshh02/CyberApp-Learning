# MONATE 19-21 — FUZZING, FIRMWARE, EXPLOIT DEVELOPMENT

## DAS LEVEL: Du findest 0-Days. Nicht "du lernst über 0-Days". Du FINDEST sie.

---

## MONATS-ZIELE (über 3 Monate)
- [ ] Fuzzing: AFL++, LibFuzzer, Syzkaller (Kernel Fuzzing) beherrscht
- [ ] Eigene Fuzzing-Harness geschrieben für ein Open-Source-Projekt
- [ ] Firmware RE: Binwalk + QEMU Emulation für IoT-Firmware
- [ ] Exploit Development: Vollständige Exploit-Chain (Bug → Exploit → Bypass → Reliability)
- [ ] Erstes CVE beantragt (oder signifikanter Fortschritt)
- [ ] Browser Exploitation: V8/SpiderMonkey Grundlagen verstanden
- [ ] 3 P0 Blog-Posts studiert und analysiert (vollständige Reproduktion ist optional/fortgeschritten)
- [ ] Pwn2Own Write-ups analysiert
- [ ] GCFA oder GOSI bestanden (SANS Zertifizierung)

---

## MONAT 19 — FUZZING

### Die Methodik

**Schritt 1: Target Selection**
- Software die komplexen, untrusted Input verarbeitet (Parser, Codecs, Deserializer)
- Priorität: Targets die NICHT schon von OSS-Fuzz abgedeckt werden
- Oder: Besserer Harness für bereits gefuzzte Targets

**Schritt 2: Harness Writing (80% der Skill)**
```c
// AFL++ Fuzzing Harness Beispiel
// Für eine hypothetische Bild-Parsing-Bibliothek

#include <stdio.h>
#include <stdlib.h>
#include "target_library.h"

int main(int argc, char *argv[]) {
    if (argc < 2) return 1;

    // Datei lesen
    FILE *f = fopen(argv[1], "rb");
    if (!f) return 1;

    fseek(f, 0, SEEK_END);
    long size = ftell(f);
    fseek(f, 0, SEEK_SET);

    unsigned char *data = malloc(size);
    fread(data, 1, size, f);
    fclose(f);

    // Target-Funktion aufrufen
    parse_image(data, size);  // DAS ist was wir fuzzen

    free(data);
    return 0;
}

// Kompilieren mit AFL++:
// afl-clang-fast -o harness harness.c -ltarget_library -fsanitize=address
// Fuzzen:
// afl-fuzz -i corpus/ -o findings/ -- ./harness @@
```

**Schritt 3: Corpus + Dictionary**
- Seed Corpus: Echte Testdateien sammeln (Test Suites, reale Dateien)
- Dictionary: Konstanten, Magic Bytes aus dem Target extrahieren

**Schritt 4: Scale**
- Viele Cores. Cloud Fuzzing (Spot Instances). Tage bis Wochen laufen lassen.

**Schritt 5: Triage**
- AddressSanitizer (ASan), MemorySanitizer (MSan), UBSan
- Crashes deduplizieren
- Exploitability bestimmen

---

## MONAT 20 — FIRMWARE + IoT

### Firmware-Analyse Workflow

```bash
# 1. Firmware extrahieren
binwalk -e firmware.bin
# Oder: jefferson (JFFS2), sasquatch (SquashFS), ubi_reader (UBIFS)

# 2. Dateisystem analysieren
ls _firmware.bin.extracted/squashfs-root/
# → etc/passwd, etc/shadow (Default Credentials?)
# → usr/bin/* (Custom Binaries → RE in Ghidra)
# → etc/*.conf (Konfiguration, Hardcoded Credentials)

# 3. Emulation mit QEMU
# Full System:
qemu-system-arm -M versatilepb -kernel firmware_kernel -dtb board.dtb -drive file=rootfs.img
# User Mode (einzelne Binaries):
qemu-arm -L /path/to/rootfs ./target_binary

# 4. Analyse
# → Ghidra: ARM-Binaries reverse-engineeren
# → Frida: Dynamic Instrumentation (wenn emuliert)
# → Netzwerk-Analyse: Welche Ports, welche Protokolle?
```

### Targets für Übung
- Damn Vulnerable Router Firmware (DVRF)
- EMUX (ARM-X Nachfolger) — IoT Firmware Emulation
- Echte Router-Firmware: TP-Link, Netgear (Firmware von Hersteller-Website)
- Alte CVEs reproduzieren (Netgear, D-Link haben umfangreiche History)

---

## MONAT 21 — EXPLOIT DEVELOPMENT + CVE HUNTING

### Der Weg zum ersten CVE

1. **Target wählen:** Wenig-auditierte Software, Open Source, C/C++
2. **Source Code Audit:** Manuelle Code-Review auf Memory Corruption
3. **Fuzzing:** AFL++ mit gutem Harness + ASan
4. **Bug gefunden → Triage:** Ist es exploitbar?
5. **Exploit schreiben:** PoC der die Auswirkung zeigt
6. **Report:** CVE beantragen über cve.org oder direkt beim Vendor
7. **Disclosure:** Coordinated Disclosure (90 Tage Standard)

### Browser Exploitation Intro
- V8 (Chrome): Turbofan JIT → Type Confusion → Arbitrary R/W
- JavaScriptCore (Safari): DFG/FTL JIT
- "Attacking JavaScript Engines" von Samuel Groß (saelo) — DAS Paper
- Browser CTF Challenges auf GitHub: browser-pwn
- V8 Sandbox (2024+) → Neues Forschungsfeld

---

## KPI-CHECKLISTE MONATE 19-21

| KPI | Ziel | Status |
|-----|------|--------|
| AFL++ | Harness geschrieben + Fuzzing-Kampagne | [ ] |
| LibFuzzer | Mindestens 1 Target | [ ] |
| Syzkaller | Kernel Fuzzing verstanden | [ ] |
| Firmware RE | 3+ Firmware-Images analysiert | [ ] |
| QEMU | Emulation aufgesetzt | [ ] |
| Exploit Chain | Mindestens 1 vollständig | [ ] |
| CVE | Beantragt oder signifikanter Fortschritt | [ ] |
| Browser Exploitation | V8/JSC Grundlagen | [ ] |
| P0 Posts | 3+ studiert + analysiert | [ ] |
| GCFA/GOSI | Bestanden | [ ] |
