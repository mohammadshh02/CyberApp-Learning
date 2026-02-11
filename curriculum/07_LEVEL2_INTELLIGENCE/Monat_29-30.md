# MONAT 29-30: NETWORK SURVEILLANCE, TOR DE-ANONYMISIERUNG & DARK WEB OPERATIONS

> "We kill people based on metadata." — General Michael Hayden, ehemaliger NSA/CIA-Direktor

---

## WOCHE 1-2: DEEP PACKET INSPECTION & NETZWERK-SURVEILLANCE

### Wie Staaten Internet-Traffic überwachen

```
ISP-LEVEL SURVEILLANCE:

Internet Traffic
    ↓
┌───────────────────────────────────┐
│  DPI Engine (Deep Packet Inspection) │
│  ├── Protocol Detection            │
│  │   ├── HTTP/HTTPS (SNI)         │
│  │   ├── DNS Queries              │
│  │   ├── VPN Protocols            │
│  │   ├── Tor Entry/Exit           │
│  │   └── P2P / Messaging          │
│  ├── Content Filtering (optional)  │
│  ├── Metadata Extraction           │
│  │   ├── Source/Dest IP            │
│  │   ├── Timestamps               │
│  │   ├── Packet Sizes             │
│  │   ├── Flow Duration            │
│  │   └── TLS Fingerprint (JA3)    │
│  └── Selectors (XKEYSCORE-Stil)   │
│      ├── Email-Adresse            │
│      ├── Telefonnummer            │
│      ├── IP-Adresse               │
│      └── Keywords                 │
└───────────────────────────────────┘
    ↓                    ↓
[Erlaubter Traffic]  [Kopie an Behörde]

KOMMERZIELLE DPI-SYSTEME:
├── Sandvine (Kanada): PacketLogic
│   └── Benutzt von: Ägypten (Injection), Türkei (Zensur), Belarus
│   └── Citizen Lab: "The Rise and Fall of Sandvine" Reports
├── Huawei: Integriert in Netzwerk-Equipment
│   └── Benutzt von: China (Great Firewall), diverse afrikanische Staaten
├── Allot Communications (Israel)
│   └── ISP-Level Traffic Management + Interception
├── Procera Networks (jetzt Sandvine)
└── NICE Systems (Israel): Massendatenerfassung
```

### NetFlow/IPFIX — Metadata at Scale

```
WAS NETFLOW ERFASST (ohne Inhalt):
- Source IP + Port
- Destination IP + Port
- Protokoll (TCP/UDP/ICMP)
- Byte Count
- Packet Count
- Start/End Timestamp
- TCP Flags
- Input/Output Interface

WARUM DAS REICHT:
→ "Wer kommuniziert mit wem, wann, wie oft, wie viel"
→ Besuch auf whistleblower-website.org → IP sichtbar
→ VPN-Nutzung sichtbar (Verbindung zu VPN-IP, Protokoll)
→ Tor-Nutzung sichtbar (Verbindung zu Tor Guard Nodes)
→ Pattern: 50MB Upload jeden Dienstag 23:00 → regelmäßiger Datenexfil?
```

```python
"""
NetFlow Analyzer — Metadata Intelligence
Analysiert NetFlow v5/v9/IPFIX Daten für Investigation
"""
import json
from datetime import datetime
from collections import defaultdict
from ipaddress import ip_address, ip_network

class NetFlowAnalyzer:
    def __init__(self):
        self.flows = []
        self.suspicious_ips = set()
        self.tor_exits = set()
        self.vpn_ranges = []

    def load_tor_exits(self, filepath: str):
        """Lade aktuelle Tor Exit Node Liste"""
        # https://check.torproject.org/torbulkexitlist
        with open(filepath) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    self.tor_exits.add(line)
        print(f"[+] Loaded {len(self.tor_exits)} Tor exit nodes")

    def load_flows(self, flow_data: list):
        """Lade NetFlow Records"""
        self.flows = flow_data

    def detect_tor_usage(self):
        """Finde Verbindungen zu/von Tor-Netzwerk"""
        tor_connections = []
        for flow in self.flows:
            src = flow.get("src_ip", "")
            dst = flow.get("dst_ip", "")

            if src in self.tor_exits or dst in self.tor_exits:
                tor_connections.append({
                    "timestamp": flow.get("timestamp"),
                    "src": src,
                    "dst": dst,
                    "bytes": flow.get("bytes", 0),
                    "type": "tor_exit" if dst in self.tor_exits
                            else "tor_incoming"
                })

            # Tor Guard Nodes: Port 9001 oder 443 + bekannte IPs
            dst_port = flow.get("dst_port", 0)
            if dst_port == 9001:
                tor_connections.append({
                    "timestamp": flow.get("timestamp"),
                    "src": src,
                    "dst": dst,
                    "port": dst_port,
                    "type": "tor_guard_connection"
                })

        return tor_connections

    def detect_vpn_usage(self):
        """Finde VPN-Verbindungen"""
        vpn_indicators = []
        for flow in self.flows:
            dst_port = flow.get("dst_port", 0)
            protocol = flow.get("protocol", "")

            # OpenVPN: UDP 1194, TCP 443 (disguised)
            # WireGuard: UDP 51820
            # IPSec: UDP 500 (IKE), UDP 4500 (NAT-T), Protocol 50 (ESP)
            # L2TP: UDP 1701

            vpn_ports = {1194, 51820, 500, 4500, 1701}
            if dst_port in vpn_ports:
                vpn_indicators.append({
                    "timestamp": flow.get("timestamp"),
                    "src": flow.get("src_ip"),
                    "dst": flow.get("dst_ip"),
                    "port": dst_port,
                    "protocol": protocol,
                    "vpn_type": self._identify_vpn_type(dst_port, protocol)
                })

        return vpn_indicators

    def analyze_communication_patterns(self, target_ip: str):
        """Kommunikationsmuster einer IP analysieren"""
        contacts = defaultdict(lambda: {
            "count": 0, "bytes_sent": 0, "bytes_recv": 0,
            "first_seen": None, "last_seen": None, "ports": set()
        })

        for flow in self.flows:
            src = flow.get("src_ip", "")
            dst = flow.get("dst_ip", "")
            ts = flow.get("timestamp")

            if src == target_ip:
                peer = dst
                contacts[peer]["bytes_sent"] += flow.get("bytes", 0)
            elif dst == target_ip:
                peer = src
                contacts[peer]["bytes_recv"] += flow.get("bytes", 0)
            else:
                continue

            contacts[peer]["count"] += 1
            contacts[peer]["ports"].add(flow.get("dst_port", 0))

            if not contacts[peer]["first_seen"] or ts < contacts[peer]["first_seen"]:
                contacts[peer]["first_seen"] = ts
            if not contacts[peer]["last_seen"] or ts > contacts[peer]["last_seen"]:
                contacts[peer]["last_seen"] = ts

        # Convert sets to lists for JSON serialization
        result = {}
        for peer, data in contacts.items():
            data["ports"] = list(data["ports"])
            result[peer] = data

        return dict(sorted(
            result.items(),
            key=lambda x: x[1]["count"],
            reverse=True
        ))

    def detect_data_exfiltration(self, threshold_mb: float = 100):
        """Ungewöhnlich große Datenübertragungen finden"""
        large_transfers = []
        threshold_bytes = threshold_mb * 1024 * 1024

        for flow in self.flows:
            if flow.get("bytes", 0) > threshold_bytes:
                large_transfers.append({
                    "timestamp": flow.get("timestamp"),
                    "src": flow.get("src_ip"),
                    "dst": flow.get("dst_ip"),
                    "bytes": flow.get("bytes"),
                    "mb": round(flow.get("bytes", 0) / (1024*1024), 2),
                    "duration": flow.get("duration"),
                    "port": flow.get("dst_port")
                })

        return sorted(large_transfers, key=lambda x: x["bytes"], reverse=True)

    def detect_beaconing(self, target_ip: str = None,
                         interval_tolerance: float = 0.1):
        """C2 Beaconing erkennen: regelmäßige Verbindungen in festen Intervallen"""
        # Gruppiere Flows nach Src-Dst Paaren
        pairs = defaultdict(list)
        for flow in self.flows:
            if target_ip and flow.get("src_ip") != target_ip:
                continue
            key = (flow.get("src_ip"), flow.get("dst_ip"))
            pairs[key].append(flow.get("timestamp"))

        beacons = []
        for (src, dst), timestamps in pairs.items():
            if len(timestamps) < 5:
                continue

            timestamps.sort()
            intervals = []
            for i in range(1, len(timestamps)):
                t1 = datetime.fromisoformat(timestamps[i-1])
                t2 = datetime.fromisoformat(timestamps[i])
                intervals.append((t2 - t1).total_seconds())

            if not intervals:
                continue

            avg_interval = sum(intervals) / len(intervals)
            if avg_interval == 0:
                continue

            # Prüfe ob Intervalle regelmäßig sind
            deviations = [
                abs(i - avg_interval) / avg_interval
                for i in intervals
            ]
            avg_deviation = sum(deviations) / len(deviations)

            if avg_deviation < interval_tolerance:
                beacons.append({
                    "src": src,
                    "dst": dst,
                    "avg_interval_sec": round(avg_interval, 1),
                    "connection_count": len(timestamps),
                    "regularity": round(1 - avg_deviation, 3),
                    "assessment": "LIKELY C2 BEACON"
                                 if avg_deviation < 0.05
                                 else "POSSIBLE BEACON"
                })

        return sorted(beacons, key=lambda x: x["regularity"], reverse=True)

    def _identify_vpn_type(self, port, protocol):
        mapping = {
            1194: "OpenVPN",
            51820: "WireGuard",
            500: "IPSec-IKE",
            4500: "IPSec-NAT-T",
            1701: "L2TP"
        }
        return mapping.get(port, "Unknown")

    def generate_intelligence_report(self, target_ip: str):
        """Vollständigen Intelligence Report für eine IP generieren"""
        return {
            "target": target_ip,
            "analysis_date": datetime.now().isoformat(),
            "communication_partners": self.analyze_communication_patterns(target_ip),
            "tor_usage": self.detect_tor_usage(),
            "vpn_usage": self.detect_vpn_usage(),
            "large_transfers": self.detect_data_exfiltration(),
            "beaconing": self.detect_beaconing(target_ip)
        }
```

### JA3/JA3S TLS Fingerprinting

```
WAS IST JA3?
→ Hash des TLS Client Hello (Extensions, Cipher Suites, Curves)
→ Jede Software hat einen einzigartigen TLS-Fingerprint
→ Tor Browser, Malware, spezifische Apps sind identifizierbar
→ AUCH DURCH VERSCHLÜSSELUNG HINDURCH

Beispiel:
→ Tor Browser JA3: 769,47-53-5-10-49171-49172-49161-49162-50-56-19-4,...
→ Chrome JA3: 769,4865-4866-4867-49195-49199-49196-49200-52393-52392,...
→ Cobalt Strike Beacon: Spezifischer JA3 Hash (IOC!)

Tools:
→ ja3er.com — Online Lookup
→ Zeek (Bro) IDS: Generiert JA3 automatisch
→ Wireshark: Display Filter: tls.handshake.ja3
→ Suricata: JA3 Hash Rules
```

---

## WOCHE 3-4: TOR DE-ANONYMISIERUNG

### Wie Tor funktioniert (Wiederholung auf tieferem Level)

```
ONION ROUTING:

User → [Guard Node] → [Middle Relay] → [Exit Node] → Ziel-Server
         (kennt User)    (kennt nichts)   (kennt Ziel)

Verschlüsselung:
User verschlüsselt 3x: E_guard(E_middle(E_exit(Payload)))
→ Guard entschlüsselt Schicht 1, sieht nur Middle-Adresse
→ Middle entschlüsselt Schicht 2, sieht nur Exit-Adresse
→ Exit entschlüsselt Schicht 3, sieht Payload + Ziel

KEIN EINZELNER KNOTEN KENNT SOWOHL USER ALS AUCH ZIEL.
```

### Bekannte De-Anonymisierungstechniken

**1. Traffic Correlation Attack (End-to-End)**
```
Voraussetzung: Angreifer kontrolliert/beobachtet SOWOHL
den Traffic am Guard Node ALS AUCH am Exit Node

Methode:
→ Timing-Analyse: Pakete die um 14:03:05.123 beim Guard ankommen
  und um 14:03:05.456 beim Exit rausgehen = korrelierbar
→ Volume-Analyse: 1.5MB Upload bei Guard → 1.5MB Download bei Exit
→ Packet-Size-Analyse: Muster in Paketgrößen

Wer kann das?
→ NSA/GCHQ: Beobachten genug Internet-Traffic (Upstream Collection)
→ Nationale ISPs: Sehen allen Traffic in ihrem Land
→ IX-Betreiber: DE-CIX Frankfurt sieht ~30% des europäischen Traffics

Verteidigung:
→ Tor nutzt Padding (begrenzt effektiv)
→ Vanguards: Zusätzliche Guard-Schicht (seit 2018)
→ Timing-Obfuscation: Schwierig ohne massive Latenz
```

**2. Guard Node Attack**
```
→ Tor-User benutzt denselben Guard Node für 2-3 Monate
→ Wenn Angreifer Guard Nodes betreibt:
  → Wahrscheinlichkeit dass User über DEINEN Guard geht:
    Anzahl_deiner_Guards / Gesamte_Guards × Bandwidth_Weight
→ NSA/GCHQ: Betreiben vermutlich Tor-Nodes (Snowden-Dokumente: "EGOTISTICAL GIRAFFE")

→ Sybil Attack: Massenhaft Nodes betreiben um Wahrscheinlichkeit zu erhöhen
→ Directory Authority Compromise: Manipuliere welche Nodes als "gut" gelten
```

**3. Browser Exploits**
```
→ FBI Operation "Torpedo" (2012): JavaScript-Exploit auf Tor Hidden Service
  → NIT (Network Investigative Technique) = Browser-Exploit
  → Exploit erzwingt Verbindung OHNE Tor → echte IP enthüllt
  → Über 1.000 Nutzer de-anonymisiert

→ FBI vs. Playpen (2015): Ähnlich, größere Skala
  → Single Warrant für ALLE Besucher eines Hidden Service
  → Massiver Rechtsstreit über "Rule 41" Jurisdiction

→ Verteidigung: Tor Browser auf höchster Sicherheitsstufe (kein JavaScript)
```

**4. Website Fingerprinting**
```
→ Tor verschlüsselt, aber Paket-Muster bleiben sichtbar
→ Jede Website hat ein einzigartiges "Fingerprint" von:
  → Anzahl Pakete
  → Richtung (Upload/Download Muster)
  → Timing zwischen Paketen
  → Gesamtgröße

→ Machine Learning Classifier: ~90%+ Accuracy bei geschlossenem Set
  (= wenn du weißt WELCHE Seiten der User besuchen könnte)
→ Open-World: Deutlich schwieriger, ~50-70%

→ Papers:
  "Website Fingerprinting at Internet Scale" (Panchenko et al.)
  "Deep Fingerprinting" (Sirinam et al., CCS 2018) — CNN-basiert
```

**5. Onion Service De-Anonymisierung**
```
→ Hidden Services haben eigene Schwachstellen:
  → HSDir Attack: Betreibe HSDir-Node, sehe welche Hidden Services
    bei dir registriert sind
  → Timing: Erstelle Verbindungen zum Hidden Service, korreliere
    mit beobachtetem Traffic
  → Application-Layer Leaks: Hidden Service enthält echte IP in
    HTTP-Headers, Fehlermeldungen, SSL-Zertifikaten

→ Tor Project: OnionBalance, Vanguards — Schutzmaßnahmen
```

### Praktische Übung: Traffic Analysis

```python
"""
Tor Traffic Detector — Erkennt Tor-Nutzung in NetFlow/PCAP
"""
import json
from datetime import datetime

class TorTrafficAnalyzer:
    def __init__(self):
        self.known_guards = set()      # Bekannte Guard Nodes
        self.known_exits = set()       # Bekannte Exit Nodes
        self.known_bridges = set()     # Bekannte Bridge Nodes
        self.directory_authorities = {  # Die 9 Tor DirAuths
            "128.31.0.34",      # moria1 (MIT)
            "86.59.21.38",      # tor26
            "194.109.206.212",  # dizum
            "131.188.40.189",   # gabelmoo
            "193.23.244.244",   # dannenberg
            "171.25.193.9",     # maatuska
            "154.35.175.225",   # Faravahar
            "199.58.81.140",    # longclaw
            "204.13.164.118"    # bastet
        }

    def load_consensus(self, consensus_file: str):
        """
        Lade Tor Network Consensus
        Download: https://metrics.torproject.org/collector/recent/relay-descriptors/consensuses/
        """
        with open(consensus_file) as f:
            for line in f:
                if line.startswith('r '):
                    parts = line.split()
                    # Format: r <nickname> <identity> ... <IP> <ORPort> <DirPort>
                    if len(parts) >= 7:
                        ip = parts[6]
                        self.known_guards.add(ip)
                if 'Exit' in line and line.startswith('s '):
                    # Markiere als Exit Node
                    pass  # Parsing vereinfacht

    def analyze_pcap_metadata(self, flows: list):
        """
        Analysiere Flows auf Tor-Indikatoren
        """
        findings = {
            "direct_tor": [],
            "possible_bridge": [],
            "directory_auth": [],
            "obfs4_possible": []
        }

        for flow in flows:
            dst_ip = flow.get("dst_ip", "")
            dst_port = flow.get("dst_port", 0)
            src_ip = flow.get("src_ip", "")

            # Direkte Verbindung zu bekanntem Guard/Exit
            if dst_ip in self.known_guards or dst_ip in self.known_exits:
                findings["direct_tor"].append({
                    "src": src_ip,
                    "dst": dst_ip,
                    "port": dst_port,
                    "timestamp": flow.get("timestamp"),
                    "confidence": "HIGH"
                })

            # Verbindung zu Directory Authority
            if dst_ip in self.directory_authorities:
                findings["directory_auth"].append({
                    "src": src_ip,
                    "dst": dst_ip,
                    "note": "Tor Directory Authority connection",
                    "confidence": "VERY HIGH"
                })

            # Tor's typischer Port: 9001 (OR), 9030 (Dir)
            if dst_port in (9001, 9030):
                findings["direct_tor"].append({
                    "src": src_ip,
                    "dst": dst_ip,
                    "port": dst_port,
                    "confidence": "MEDIUM"
                })

            # obfs4 Bridge Detection (schwieriger):
            # → Port 443 + unbekannte IP + TLS mit speziellem Fingerprint
            # → Paketgröße-Analyse: obfs4 hat Padding
            if dst_port == 443 and dst_ip not in self.known_guards:
                packet_size = flow.get("avg_packet_size", 0)
                if 500 < packet_size < 600:  # obfs4 typisch
                    findings["obfs4_possible"].append({
                        "src": src_ip,
                        "dst": dst_ip,
                        "note": "Possible obfs4 bridge (unusual packet sizes on 443)",
                        "confidence": "LOW"
                    })

        return findings

    def correlation_attack_simulation(self, entry_flows: list,
                                       exit_flows: list,
                                       time_window_ms: int = 500):
        """
        Simuliere Traffic Correlation Attack
        entry_flows: Flows am Guard Node
        exit_flows: Flows am Exit Node
        """
        correlations = []

        for entry in entry_flows:
            entry_time = datetime.fromisoformat(entry["timestamp"])
            entry_size = entry.get("bytes", 0)

            for exit_flow in exit_flows:
                exit_time = datetime.fromisoformat(exit_flow["timestamp"])
                exit_size = exit_flow.get("bytes", 0)

                time_diff_ms = abs(
                    (exit_time - entry_time).total_seconds() * 1000
                )
                size_diff_pct = (
                    abs(entry_size - exit_size) / max(entry_size, 1)
                ) if entry_size > 0 else 1

                if time_diff_ms < time_window_ms and size_diff_pct < 0.15:
                    correlations.append({
                        "entry_src": entry.get("src_ip"),
                        "exit_dst": exit_flow.get("dst_ip"),
                        "time_diff_ms": round(time_diff_ms, 1),
                        "size_diff_pct": round(size_diff_pct * 100, 1),
                        "confidence": "HIGH" if time_diff_ms < 100
                                     else "MEDIUM"
                    })

        return correlations
```

---

## WOCHE 5-6: DARK WEB OPERATIONS

### Dark Web Infrastruktur

```
LAYERS OF THE DARK WEB:

Surface Web (Google-indexiert): ~5% des Internets
    ↓
Deep Web (nicht indexiert, aber legal zugänglich): ~90%
    ├── Datenbanken, Paywalls, Intranet
    └── Normale Webseiten hinter Login
    ↓
Dark Web (spezielle Software nötig): ~5%
    ├── Tor Hidden Services (.onion)
    │   ├── Marktplätze (Drogen, Waffen, Daten)
    │   ├── Foren (Hacking, Fraud, Extremismus)
    │   ├── Leak Sites (Ransomware Groups)
    │   ├── Whistleblower Plattformen (SecureDrop)
    │   └── Legitime Services (Facebook, NYT, BBC .onion)
    ├── I2P (.i2p)
    │   └── Dezentraler, weniger erforscht
    └── Freenet
        └── Zensurresistenter Datastore
```

### Investigation Methodology

```
DARK WEB INVESTIGATION WORKFLOW:

1. PREPARATION
   ├── Dediziertes Gerät oder VM (Whonix empfohlen)
   ├── Tor Browser (aktuellste Version)
   ├── Keine persönlichen Accounts, keine echte IP
   ├── Screenshots mit MAT2 (Metadaten strippen)
   └── Evidence Preservation Plan (Hashing, Chain of Custody)

2. COLLECTION
   ├── Marktplatz-Monitoring: Profile, Listings, Reviews
   ├── Forum-Scraping: Posts, User-Profile, PGP-Keys
   ├── Leak Site Monitoring: Ransomware-Opfer, Datenlecks
   ├── Chat-Monitoring: Telegram, Jabber/XMPP, Matrix
   └── Cryptocurrency Addresses: Wallets aus Marktplatz-Listings

3. CORRELATION
   ├── Username-Reuse: Dark Web Username → Surface Web
   ├── PGP Key Analysis: Email in PGP Key → Identität
   ├── Writing Style Analysis (Stylometry): Sprachstil → Verdächtiger
   ├── Zeitstempel-Analyse: Posting-Zeiten → Zeitzone → Location
   ├── Crypto Tracing: Wallet → Exchange → KYC Identity
   └── Technical OPSEC Failures: IP Leaks, Metadata in Dateien

4. IDENTIFICATION
   ├── Pivoting: Ein Datenpunkt → nächster → nächster
   ├── Social Engineering: Sock Puppet in Forum → Vertrauen → Information
   └── Law Enforcement Cooperation: Ergebnisse → Behörden
```

### Schlüssel-Techniken für Dark Web OSINT

**Username Analysis:**
```python
"""
Dark Web Username Correlation
Finde Surface-Web-Accounts von Dark-Web-Usernamen
"""
import asyncio
import aiohttp

# Bekannte Username-Check-Services:
PLATFORMS = {
    "github": "https://github.com/{username}",
    "twitter": "https://twitter.com/{username}",
    "reddit": "https://www.reddit.com/user/{username}",
    "keybase": "https://keybase.io/{username}",
    "telegram": "https://t.me/{username}",
    "instagram": "https://www.instagram.com/{username}/",
    "hackthebox": "https://app.hackthebox.com/users/{username}",
    "ctftime": "https://ctftime.org/user/{username}",
}

# Erweitert: Nutze Sherlock oder Maigret für 3000+ Plattformen
# pip install maigret
# maigret darkweb_username --timeout 10 --no-color
```

**PGP Key Intelligence:**
```python
"""
PGP keys enthalten oft Identitätsinformationen:
- Email-Adressen (auch alte)
- Name (manchmal echt)
- Erstellungsdatum
- Key Server Uploads (mit Zeitstempel + IP möglich)
"""
import subprocess
import re

def analyze_pgp_key(key_text: str):
    """Extrahiere Intelligence aus einem PGP Public Key"""
    # Importiere Key temporär
    result = subprocess.run(
        ["gpg", "--with-colons", "--import-options", "show-only",
         "--import"],
        input=key_text, capture_output=True, text=True
    )

    findings = {
        "uids": [],          # User IDs (Name + Email)
        "creation_date": None,
        "key_id": None,
        "algorithm": None,
        "subkeys": []
    }

    for line in result.stdout.split('\n'):
        parts = line.split(':')
        if parts[0] == 'pub':
            findings["key_id"] = parts[4]
            findings["creation_date"] = parts[5]
            findings["algorithm"] = parts[3]
        elif parts[0] == 'uid':
            uid = parts[9]
            findings["uids"].append(uid)
            # Email extrahieren
            email_match = re.search(r'<(.+?)>', uid)
            if email_match:
                findings["email"] = email_match.group(1)
        elif parts[0] == 'sub':
            findings["subkeys"].append({
                "key_id": parts[4],
                "created": parts[5]
            })

    return findings

# Suche PGP Keys auf Key Servern:
# gpg --keyserver hkps://keys.openpgp.org --search-keys "darkweb_username"
# gpg --keyserver hkps://keyserver.ubuntu.com --search-keys "email@example.com"
```

**Stylometry — Schreibstilanalyse:**
```python
"""
Stylometry: Identifiziere Autoren anhand ihres Schreibstils
Nützlich wenn Dark-Web-User auch Surface-Web-Posts schreiben
"""
from collections import Counter
import re
import math

class StylometryAnalyzer:
    def __init__(self):
        self.profiles = {}

    def create_profile(self, author_id: str, texts: list):
        """Erstelle Stilprofil aus mehreren Texten eines Autors"""
        all_text = " ".join(texts)
        words = all_text.lower().split()

        profile = {
            # Lexikalische Features
            "avg_word_length": sum(len(w) for w in words) / max(len(words), 1),
            "vocabulary_richness": len(set(words)) / max(len(words), 1),
            "avg_sentence_length": self._avg_sentence_length(all_text),

            # Zeichensetzung
            "comma_rate": all_text.count(',') / max(len(words), 1),
            "exclamation_rate": all_text.count('!') / max(len(words), 1),
            "question_rate": all_text.count('?') / max(len(words), 1),
            "ellipsis_rate": all_text.count('...') / max(len(words), 1),

            # Häufige Wörter (Function Words)
            "function_words": self._function_word_freq(words),

            # N-Grams (Zeichenebene)
            "char_bigrams": self._top_ngrams(all_text, 2, 50),
            "char_trigrams": self._top_ngrams(all_text, 3, 50),

            # Spezifische Muster
            "uses_british_spelling": self._check_british(all_text),
            "capitalization_style": self._capitalization_pattern(texts),
            "emoji_usage": bool(re.search(r'[\U0001F600-\U0001F64F]', all_text)),
        }

        self.profiles[author_id] = profile
        return profile

    def compare(self, profile_a: str, profile_b: str):
        """Vergleiche zwei Stilprofile"""
        if profile_a not in self.profiles or profile_b not in self.profiles:
            return None

        a = self.profiles[profile_a]
        b = self.profiles[profile_b]

        # Euklidische Distanz über numerische Features
        numeric_features = [
            "avg_word_length", "vocabulary_richness",
            "avg_sentence_length", "comma_rate",
            "exclamation_rate", "question_rate"
        ]

        distance = 0
        for feature in numeric_features:
            diff = (a.get(feature, 0) - b.get(feature, 0)) ** 2
            distance += diff

        distance = math.sqrt(distance)

        # Function Word Correlation
        fw_correlation = self._dict_correlation(
            a.get("function_words", {}),
            b.get("function_words", {})
        )

        return {
            "feature_distance": round(distance, 4),
            "function_word_correlation": round(fw_correlation, 4),
            "same_author_likelihood": "HIGH" if distance < 0.5 and fw_correlation > 0.8
                                     else "MEDIUM" if distance < 1.0
                                     else "LOW"
        }

    def _avg_sentence_length(self, text):
        sentences = re.split(r'[.!?]+', text)
        lengths = [len(s.split()) for s in sentences if s.strip()]
        return sum(lengths) / max(len(lengths), 1)

    def _function_word_freq(self, words):
        function_words = [
            "the", "a", "an", "is", "was", "were", "are", "been",
            "be", "have", "has", "had", "do", "does", "did", "will",
            "would", "could", "should", "may", "might", "shall",
            "can", "need", "dare", "ought", "used", "to", "of",
            "in", "for", "on", "with", "at", "by", "from", "as",
            "into", "through", "during", "before", "after", "above",
            "below", "between", "but", "and", "or", "nor", "not",
            "so", "yet", "both", "either", "neither", "each", "every",
            "all", "both", "few", "more", "most", "other", "some",
            "such", "no", "only", "own", "same", "than", "too", "very",
            "just", "because", "if", "when", "where", "how", "what",
            "which", "who", "whom", "this", "that", "these", "those",
            "i", "me", "my", "myself", "we", "our", "you", "your",
            "he", "him", "his", "she", "her", "it", "its", "they", "them"
        ]
        total = max(len(words), 1)
        return {fw: words.count(fw) / total for fw in function_words if words.count(fw) > 0}

    def _top_ngrams(self, text, n, top):
        ngrams = [text[i:i+n] for i in range(len(text)-n+1)]
        return dict(Counter(ngrams).most_common(top))

    def _check_british(self, text):
        british = ["colour", "favour", "honour", "behaviour", "organised", "realise"]
        return any(w in text.lower() for w in british)

    def _capitalization_pattern(self, texts):
        all_caps = sum(1 for t in texts if t == t.upper())
        return "ALL_CAPS" if all_caps > len(texts) * 0.5 else "normal"

    def _dict_correlation(self, d1, d2):
        all_keys = set(list(d1.keys()) + list(d2.keys()))
        if not all_keys:
            return 0
        v1 = [d1.get(k, 0) for k in all_keys]
        v2 = [d2.get(k, 0) for k in all_keys]
        n = len(v1)
        sum1 = sum(v1)
        sum2 = sum(v2)
        sum1_sq = sum(x**2 for x in v1)
        sum2_sq = sum(x**2 for x in v2)
        sum_prod = sum(v1[i]*v2[i] for i in range(n))
        num = sum_prod - (sum1 * sum2 / n)
        den = math.sqrt((sum1_sq - sum1**2/n) * (sum2_sq - sum2**2/n))
        return num / den if den != 0 else 0
```

---

## WOCHE 7-8: DNS INTELLIGENCE & INFRASTRUCTURE MAPPING

### Passive DNS

Passive DNS sammelt DNS-Auflösungen über Zeit. Statt "was löst domain.com JETZT auf" kannst du fragen "was hat domain.com JEMALS aufgelöst" und "welche anderen Domains lösten auf dieselbe IP auf".

```
PASSIVE DNS QUELLEN:
├── Farsight DNSDB (kommerziell, bester Datensatz)
│   └── API: https://api.dnsdb.info/
├── SecurityTrails (kommerziell + Free Tier)
│   └── Historische DNS, WHOIS, Subdomains
├── VirusTotal (DNS Resolution History)
├── RiskIQ/PassiveTotal (jetzt Microsoft)
├── Robtex (Free, limitiert)
├── DNSlytics (Free Tier)
└── CertStream (Certificate Transparency Logs)

INVESTIGATION USE CASES:
1. "Welche Domains teilen sich eine IP?"
   → Shared Hosting → gleicher Akteur?
2. "Wohin hat evil-domain.com früher aufgelöst?"
   → Alte Infrastruktur → weitere Domains
3. "Welche neuen Domains lösen auf bekannte C2-IP auf?"
   → Proaktive Threat Intelligence
4. "Welche Nameserver benutzt ein Akteur?"
   → Nameserver-Cluster → gesamte Infrastruktur mappen
```

```python
"""
DNS Intelligence Tool — Infrastructure Mapping
"""
import dns.resolver
import whois
import requests
import json
from datetime import datetime

class DNSIntelligence:
    def __init__(self, vt_api_key: str = None, st_api_key: str = None):
        self.vt_key = vt_api_key
        self.st_key = st_api_key

    def full_dns_recon(self, domain: str):
        """Vollständige DNS-Aufklärung einer Domain"""
        results = {
            "domain": domain,
            "timestamp": datetime.now().isoformat(),
            "records": {},
            "subdomains": [],
            "historical": [],
            "shared_hosting": [],
            "whois": {}
        }

        # Aktuelle DNS Records
        record_types = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'SOA', 'CNAME']
        for rtype in record_types:
            try:
                answers = dns.resolver.resolve(domain, rtype)
                results["records"][rtype] = [
                    str(rdata) for rdata in answers
                ]
            except Exception:
                pass

        # WHOIS
        try:
            w = whois.whois(domain)
            results["whois"] = {
                "registrar": w.registrar,
                "creation_date": str(w.creation_date),
                "expiration_date": str(w.expiration_date),
                "name_servers": w.name_servers,
                "registrant": getattr(w, 'name', None) or "REDACTED",
                "emails": getattr(w, 'emails', []) or []
            }
        except Exception as e:
            results["whois"]["error"] = str(e)

        # Certificate Transparency
        results["certificates"] = self._ct_lookup(domain)

        return results

    def _ct_lookup(self, domain: str):
        """Certificate Transparency Log Suche"""
        url = f"https://crt.sh/?q=%.{domain}&output=json"
        try:
            resp = requests.get(url, timeout=30)
            if resp.status_code == 200:
                certs = resp.json()
                # Unique Subdomains aus CT Logs
                subdomains = set()
                for cert in certs:
                    name = cert.get("name_value", "")
                    for subdomain in name.split('\n'):
                        subdomain = subdomain.strip().lower()
                        if subdomain.endswith(domain):
                            subdomains.add(subdomain)
                return {
                    "total_certificates": len(certs),
                    "unique_subdomains": sorted(subdomains),
                    "subdomain_count": len(subdomains)
                }
        except Exception as e:
            return {"error": str(e)}

    def map_infrastructure(self, domains: list):
        """Mappe die gesamte Infrastruktur einer Gruppe von Domains"""
        ip_to_domains = {}
        ns_to_domains = {}

        for domain in domains:
            recon = self.full_dns_recon(domain)

            # IP-Mapping
            for ip in recon["records"].get("A", []):
                if ip not in ip_to_domains:
                    ip_to_domains[ip] = []
                ip_to_domains[ip].append(domain)

            # NS-Mapping
            for ns in recon["records"].get("NS", []):
                ns = ns.rstrip('.')
                if ns not in ns_to_domains:
                    ns_to_domains[ns] = []
                ns_to_domains[ns].append(domain)

        return {
            "shared_ips": {
                ip: domains for ip, domains in ip_to_domains.items()
                if len(domains) > 1
            },
            "shared_nameservers": {
                ns: domains for ns, domains in ns_to_domains.items()
                if len(domains) > 1
            },
            "total_unique_ips": len(ip_to_domains),
            "total_unique_ns": len(ns_to_domains)
        }
```

---

### Blockchain-Analyse für Intelligence

Kryptowährungs-Tracking ist ein zunehmend kritischer Bestandteil moderner Intelligence-Arbeit (aufbauend auf Crypto Tracing aus Monat 5):

**Kommerzielle Plattformen (Awareness):**
- **Chainalysis Reactor:** Industriestandard bei BKA, FBI, Europol. Visualisiert Transaktionsflüsse, identifiziert Exchanges, Mixer, Darknet-Markets.
- **TRM Labs:** Stark bei Cross-Chain-Analyse und DeFi-Monitoring.
- Beide kosten 50.000+ EUR/Jahr — du lernst sie am Arbeitsplatz (LEA, Big4, Kroll).

**Open-Source Tools:**
- **Breadcrumbs.app:** Kostenloses Tool für BTC/ETH-Adress-Analyse und Transaktions-Graphen.
- **OXT.me:** Open-Source Bitcoin Explorer mit Cluster-Analyse.
- **Etherscan / Blockchain.com:** Basis-Explorer.

**Schlüsselkonzepte:**
- **Address Clustering:** Common-Input-Ownership-Heuristik gruppiert Adressen derselben Entität.
- **Exchange Attribution:** Bekannte Exchange-Adressen → KYC → Deanonymisierung.
- **Cross-Chain Tracking:** Chain-Hopping-Analyse (BTC → Monero → ETH) korreliert Zeitstempel und Beträge.
- **Mixer Detection:** CoinJoin/Wasabi/Whirlpool erzeugen erkennbare Transaktionsmuster.

---

## DELIVERABLES MONAT 29-30

| # | Deliverable | Status |
|---|------------|--------|
| 1 | NetFlow Analyzer Tool (Python) | [ ] |
| 2 | JA3 Fingerprint Cheatsheet | [ ] |
| 3 | Tor De-Anonymisierung Research Paper (Zusammenfassung) | [ ] |
| 4 | Traffic Correlation Attack Simulation | [ ] |
| 5 | Dark Web Investigation Methodology Document | [ ] |
| 6 | Username Correlation Tool | [ ] |
| 7 | Stylometry Analyzer (Python) | [ ] |
| 8 | DNS Intelligence Tool (Python) | [ ] |
| 9 | Infrastructure Map eines APT (aus öffentlichen Reports) | [ ] |
| 10 | Blog Post: "How Traffic Analysis Works" | [ ] |

---

## QUELLEN

### Akademische Papers (Pflichtlektüre)
- "Users Get Routed: Traffic Correlation on Tor" (Johnson et al., CCS 2013)
- "Website Fingerprinting at Internet Scale" (Panchenko et al., NDSS 2016)
- "Deep Fingerprinting" (Sirinam et al., CCS 2018)
- "SeaGlass: City-Wide IMSI-Catcher Detection" (Ney et al., PETS 2017)

### Bücher
- **James Bamford: The Shadow Factory** — NSA Surveillance
- **Glenn Greenwald: No Place to Hide** — Snowden Technical Details
- **Barton Gellman: Dark Mirror** — XKEYSCORE, PRISM Details
- **Andy Greenberg: Sandworm** — Russian Cyber Operations

### Online
- Snowden Archive (The Intercept) — XKEYSCORE, UPSTREAM, PRISM Dokumente
- Tor Project Research: https://research.torproject.org/
- Citizen Lab Reports — DPI, Sandvine, Netsweeper
- netzpolitik.org — Deutsche Überwachungspolitik
