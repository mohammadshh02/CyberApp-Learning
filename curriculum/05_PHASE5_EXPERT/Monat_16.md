# MONAT 16 — MOBILE SECURITY: Android/iOS, Frida, Corellium

## DAS LEVEL: Citizen Lab / Lookout / Kaspersky Mobile Research

Mobile Devices sind das #1 Ziel für State-Sponsored Surveillance. Pegasus. Predator. FinSpy. Wenn du für eine Regierung arbeitest oder Surveillance aufdeckst, musst du Mobile verstehen.

---

## Monats-Ziele (nicht verhandelbar)
- [ ] Frida: Dynamic Instrumentation auf Android + iOS beherrscht
- [ ] Android: APK Reverse Engineering (jadx, apktool), Root Detection Bypass
- [ ] iOS: Backup Forensik, MVT für Spyware Detection, XNU Basics
- [ ] Spyware-Analyse: Mindestens 1 Pegasus/Predator Report komplett studiert
- [ ] Objection: Frida-powered Mobile Exploration
- [ ] 5+ Android Apps analysiert (CTF oder Real-World)
- [ ] SSL Pinning Bypass beherrscht
- [ ] Mobile Threat Landscape Report geschrieben

---

## WOCHE 61 — ANDROID SECURITY

### Montag (Tag 421)

**06:30–08:30 | DEEP TECHNICAL: Android Internals für Security**
- Android Architektur: Linux Kernel → HAL → Android Runtime (ART) → Framework → Apps
- Security Model: App Sandbox, Permissions, SELinux, Verified Boot
- Attack Surface: Binder IPC, System Services, GPU Drivers, Baseband
- APK-Struktur: classes.dex, AndroidManifest.xml, resources, native libs

**09:00–10:30 | PRAXIS: APK Reverse Engineering**
```bash
# Android RE Toolkit
# 1. APK extrahieren
apktool d target.apk -o target_decoded

# 2. Java-Code decompilieren
jadx target.apk -d target_jadx

# 3. In Ghidra/IDA: Native Libraries (.so Dateien) analysieren

# 4. Dynamic Analysis mit Frida
frida -U -f com.target.app -l script.js --no-pause
```

```javascript
// Frida Script: SSL Pinning Bypass (Universal)
Java.perform(function() {
    var TrustManager = Java.use('javax.net.ssl.X509TrustManager');
    var SSLContext = Java.use('javax.net.ssl.SSLContext');

    // Custom TrustManager der alles akzeptiert
    var TrustManagerImpl = Java.registerClass({
        name: 'com.custom.TrustManager',
        implements: [TrustManager],
        methods: {
            checkClientTrusted: function(chain, authType) {},
            checkServerTrusted: function(chain, authType) {},
            getAcceptedIssuers: function() { return []; }
        }
    });

    // SSL Context mit unserem TrustManager
    var context = SSLContext.getInstance("TLS");
    context.init(null, [TrustManagerImpl.$new()], null);

    console.log("[+] SSL Pinning bypassed!");
});

// Frida Script: Root Detection Bypass
Java.perform(function() {
    // Häufige Root-Detection-Methoden hooken
    var Runtime = Java.use('java.lang.Runtime');
    Runtime.exec.overload('java.lang.String').implementation = function(cmd) {
        if (cmd.indexOf('su') !== -1 || cmd.indexOf('busybox') !== -1) {
            console.log("[+] Root detection bypass: " + cmd);
            throw new Error("not found");
        }
        return this.exec(cmd);
    };

    var File = Java.use('java.io.File');
    File.exists.implementation = function() {
        var path = this.getAbsolutePath();
        if (path.indexOf('/su') !== -1 || path.indexOf('Superuser') !== -1
            || path.indexOf('Magisk') !== -1) {
            console.log("[+] Root path hidden: " + path);
            return false;
        }
        return this.exists();
    };
});
```

**11:00–12:00 | CHALLENGES:**
- DIVA (Damn Insecure and Vulnerable App) → Android Security Challenges
- Oder: OWASP MSTG CrackMes (github.com/OWASP/owasp-mastg)

**18:30–20:00 | DEEP LEARNING: Spyware-Analyse**
- Studiere: Citizen Lab "HIDE AND SEEK" Report (Pegasus 2018)
- Studiere: Amnesty Tech "Forensic Methodology Report" (Pegasus 2021)
- Studiere: Google TAG Reports über Predator (Cytrox/Intellexa)
- Was du lernen sollst:
  - Welche Artefakte hinterlässt Pegasus auf iOS? (Prozessnamen, Domains, SQLite-Einträge)
  - Wie nutzt Pegasus 0-Click Exploits? (iMessage, WhatsApp)
  - Wie wurde die Infrastruktur kartiert? (OSINT auf C2-Server)
  - MVT Indicators of Compromise

**21:00–22:30 | PROJEKT: Mobile Security Blog-Post**

---

## WOCHE 62 — iOS SECURITY + FORENSIK

### Fokus
- iOS Internals: XNU Kernel, Sandbox, SEP, Code Signing
- iOS Backup Forensik: iTunes Backup analysieren
- MVT in der Praxis: iOS-Backup gegen aktuelle IoCs prüfen
- Corellium verstehen (auch wenn zu teuer für privat — wissen was möglich ist)
- Jonathan Levin's "*OS Internals" Bücher als Referenz

## WOCHE 63-64 — ADVANCED + BASEBAND

### Woche 63: Frida Advanced
- Frida Stalker (Code Tracing)
- Native Function Hooking (nicht nur Java)
- Frida + Ghidra Workflow für Mobile RE

### Woche 64: Baseband + Cellular Security
- Was ist ein Baseband? (Separater Prozessor für Mobilfunk)
- Warum ist es relevant? (IMSI Catcher, SS7 Attacks, Baseband Exploits)
- GSM/LTE Architektur verstehen (IMSI, TMSI, Authentication)
- Studiere: Natalie Silvanovich (Google P0) Baseband Research

---

## KPI-CHECKLISTE MONAT 16

| KPI | Ziel | Status |
|-----|------|--------|
| Frida | Android + iOS Hooks | [ ] |
| Android RE | 5+ APKs analysiert | [ ] |
| SSL Pinning | Bypass beherrscht | [ ] |
| iOS Forensik | Backup-Analyse | [ ] |
| MVT | Pegasus-Detection | [ ] |
| Spyware Reports | 3+ Reports studiert | [ ] |
| Baseband | Grundlagen verstanden | [ ] |
| Blog | Mobile Security Post | [ ] |
