# MONAT 31-32: GEOSPATIAL INTELLIGENCE (GEOINT) & PHYSICAL TRACKING

> "In the age of satellites, no one hides." — Robert Cardillo, ehemaliger NGA-Direktor

---

## WOCHE 1-2: SATELLITE IMAGERY ANALYSIS

### Frei verfügbare Satellitenquellen

```
KOSTENLOSE QUELLEN:
├── Google Earth Pro (Desktop): Zeitreihen, historische Bilder
│   └── Download: google.com/earth/versions/ (kostenlos seit 2015)
├── Sentinel Hub (ESA): Sentinel-2 Bilder, 10m Auflösung
│   └── EO Browser: apps.sentinel-hub.com/eo-browser/
│   └── Updates alle 5 Tage
├── NASA Worldview: MODIS, VIIRS — großflächig, täglich
│   └── worldview.earthdata.nasa.gov
├── USGS Earth Explorer: Landsat-Daten, 30m Auflösung
│   └── earthexplorer.usgs.gov
└── OpenAerialMap: Drohnen- und Luftbilder
    └── openaerialmap.org

KOMMERZIELLE QUELLEN (High Resolution):
├── Maxar (DigitalGlobe): 30cm Auflösung, Militärstandard
│   └── SecureWatch Platform (Regierungskunden)
├── Planet Labs: Tägliche globale Abdeckung, 3-5m Auflösung
│   └── planet.com — Education/Research Zugang möglich
├── Airbus Defence & Space: Pléiades, SPOT — 50cm Auflösung
└── BlackSky: Near-Realtime, bis zu 15 Revisits/Tag

FÜR INVESTIGATION REICHT MEIST:
→ Google Earth (historisch) + Sentinel (aktuell) + Maxar (Detail wenn nötig)
```

### Change Detection — Veränderungen erkennen

Die Kernmethode von Satellite GEOINT: Vergleiche Bilder verschiedener Zeitpunkte.

```python
"""
Satellite Change Detection
Vergleiche Satellitenbilder verschiedener Zeitpunkte
"""
import numpy as np
from PIL import Image
import cv2

class SatelliteAnalyzer:
    def __init__(self):
        self.images = {}

    def load_image(self, label: str, filepath: str):
        """Lade Satellitenbild"""
        img = cv2.imread(filepath)
        self.images[label] = img
        print(f"[+] Loaded '{label}': {img.shape}")

    def change_detection(self, before_label: str, after_label: str,
                        threshold: int = 30):
        """
        Einfache Change Detection zwischen zwei Bildern
        Rot = Veränderung
        """
        before = self.images[before_label]
        after = self.images[after_label]

        # Bilder müssen gleiche Größe haben
        if before.shape != after.shape:
            after = cv2.resize(after, (before.shape[1], before.shape[0]))

        # Differenz berechnen
        diff = cv2.absdiff(before, after)
        gray_diff = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)

        # Threshold: Signifikante Änderungen markieren
        _, mask = cv2.threshold(gray_diff, threshold, 255, cv2.THRESH_BINARY)

        # Veränderungen rot hervorheben
        result = after.copy()
        result[mask > 0] = [0, 0, 255]  # Rot

        # Statistik
        changed_pixels = np.sum(mask > 0)
        total_pixels = mask.shape[0] * mask.shape[1]
        change_pct = (changed_pixels / total_pixels) * 100

        return {
            "result_image": result,
            "mask": mask,
            "changed_pixels": int(changed_pixels),
            "total_pixels": int(total_pixels),
            "change_percent": round(change_pct, 2)
        }

    def identify_structures(self, label: str):
        """
        Identifiziere Strukturen im Bild (Gebäude, Fahrzeuge, Straßen)
        Vereinfachte Version — produktionsreif wäre YOLO/Faster R-CNN
        """
        img = self.images[label]
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Edge Detection
        edges = cv2.Canny(gray, 50, 150)

        # Konturen finden
        contours, _ = cv2.findContours(
            edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
        )

        structures = []
        for contour in contours:
            area = cv2.contourArea(contour)
            if area > 500:  # Minimum Größe
                x, y, w, h = cv2.boundingRect(contour)
                aspect_ratio = w / max(h, 1)

                structure_type = "unknown"
                if 0.8 < aspect_ratio < 1.2 and area > 2000:
                    structure_type = "building_candidate"
                elif aspect_ratio > 3 or aspect_ratio < 0.3:
                    structure_type = "linear_structure"  # Straße/Zaun

                structures.append({
                    "position": (x, y),
                    "size": (w, h),
                    "area": int(area),
                    "type": structure_type
                })

        return structures
```

### Anwendungsfälle für Investigation

```
WAS DU MIT SATELLITENBILDERN ANALYSIEREN KANNST:

1. MILITÄRISCHE AKTIVITÄT:
   → Truppenbewegungen (Fahrzeuge, Zelte, Stellungen)
   → Raketenstarts (Brandspuren, Startrampen)
   → Schiffspositionierung (Häfen, Flottenstandorte)
   → Beispiel: Bellingcat's Analyse russischer Truppenbewegungen vor Ukraine-Invasion

2. FRAUD/FINANCIAL INVESTIGATION:
   → Fabrik existiert wirklich? (Due Diligence)
   → Lager voll oder leer? (Betrugsindikator)
   → Bauaktivität vs. gemeldete Ausgaben (Korruption)

3. ENVIRONMENTAL CRIME:
   → Illegale Abholzung (Change Detection über Monate)
   → Illegale Müllentsorgung
   → Ölverschmutzung (SAR Radar)

4. HUMAN RIGHTS:
   → Massengräber (Bodenveränderungen)
   → Zerstörung von Dörfern/Städten
   → Internierungslager (neue Strukturen)
   → Beispiel: AAAS Analysis of Satellite Images of Darfur

5. PERSON TRACKING:
   → Residenz einer Zielperson verifizieren
   → Fahrzeuge auf Privatgrundstück identifizieren
   → Bauaktivität (Reichtum/Lebensstil prüfen)
```

### Praktische Übungen Woche 1-2

**Tag 1-4: Google Earth Mastery**
- Installiere Google Earth Pro Desktop
- Übe mit historischen Bildern (Zeitleiste): Beobachte Veränderungen über Jahre
- Case Study: Finde Nordkoreas Yongbyon Nuclear Facility, vergleiche 2010 vs 2020
- Case Study: Tracke Bauaktivität an NEOM (Saudi-Arabien)
- Lerne KML/KMZ Dateien erstellen und importieren

**Tag 5-7: Sentinel Hub**
- Erstelle Account bei Sentinel Hub (kostenlos für Research)
- EO Browser: Finde aktuelle Bilder deiner Stadt
- Multispektral-Analyse: NDVI (Vegetationsindex) → Erkennt Veränderungen in Landnutzung
- Vergleiche: True Color vs. False Color vs. NDVI

**Tag 8-14: Bellingcat Case Studies nachvollziehen**
- Bellingcat's MH17 Investigation: Wie Buk-Raketensystem getrackt wurde
- Bellingcat's Skripal Investigation: GRU-Agenten identifiziert
- Bellingcat's Xinjiang Internierungslager-Analyse
- Reproduziere mindestens eine Analyse mit eigenen Tools

---

## WOCHE 3-4: RF GEOLOCATION & WIRELESS TRACKING

### Radio Frequency (RF) Geolocation

```
METHODEN DER RF-LOKALISIERUNG:

1. TRILATERATION (3+ Empfänger):
   → Signalstärke (RSSI) → Distanz schätzen
   → 3 Empfänger → Schnittpunkt = Position
   → Genauigkeit: 10-100m (abhängig von Umgebung)

2. TIME DIFFERENCE OF ARRIVAL (TDOA):
   → Zeitmessung: Signal kommt bei Empfänger A 2μs vor B an
   → Hyperbolische Schnitte → Position
   → Genauigkeit: 1-50m (mit synchronisierten Empfängern)
   → Wird von IMSI-Catchern und militärischen Systemen genutzt

3. ANGLE OF ARRIVAL (AOA):
   → Richtantennen bestimmen Winkel zum Sender
   → 2+ Empfänger → Schnittpunkt
   → Militärisch: Radar, SIGINT-Systeme

4. FINGERPRINTING:
   → RF-Umgebung (WiFi, Bluetooth, Mobilfunk) an Orten messen
   → Datenbank aufbauen
   → Neues Signal → Vergleich mit Datenbank → Standort
   → Google/Apple tun genau das (WiFi-basierte Lokalisierung)
```

### WiFi-basiertes Tracking

```python
"""
WiFi Intelligence — Tracking via Probe Requests und Access Points
"""

# THEORIE:
# Jedes WiFi-Gerät sendet "Probe Requests" — Anfragen nach bekannten Netzwerken
# Diese enthalten:
# - MAC-Adresse des Geräts (seit iOS 14/Android 10: randomisiert, aber...)
# - SSIDs der gesuchten Netzwerke (= wo warst du vorher?)
# - Signalstärke (= wie weit weg bist du?)

# TRACKING METHODEN:

# 1. Probe Request Monitoring
# Tool: Wireshark, Kismet, oder custom mit Scapy
# Erfordert: WiFi-Adapter im Monitor Mode

# Probe Request Capture mit Scapy (Linux, Monitor Mode):
from scapy.all import *
from collections import defaultdict
from datetime import datetime

class WiFiTracker:
    def __init__(self):
        self.devices = defaultdict(lambda: {
            "probes": set(),        # Gesuchte Netzwerke
            "first_seen": None,
            "last_seen": None,
            "signal_strength": [],
            "count": 0
        })

    def packet_handler(self, pkt):
        """Verarbeite jedes WiFi-Paket"""
        if pkt.haslayer(Dot11ProbeReq):
            mac = pkt[Dot11].addr2
            ssid = pkt[Dot11Elt].info.decode('utf-8', errors='ignore')
            now = datetime.now()

            if ssid:
                self.devices[mac]["probes"].add(ssid)

            self.devices[mac]["count"] += 1
            self.devices[mac]["last_seen"] = now

            if not self.devices[mac]["first_seen"]:
                self.devices[mac]["first_seen"] = now

            # Signal Strength (wenn verfügbar)
            signal = None
            if pkt.haslayer(RadioTap):
                try:
                    signal = pkt[RadioTap].dBm_AntSignal
                except AttributeError:
                    signal = None
                if signal is not None:
                    self.devices[mac]["signal_strength"].append(signal)

            # Ausgabe
            if ssid:
                print(f"[{now.strftime('%H:%M:%S')}] {mac} "
                      f"searching for: '{ssid}' "
                      f"(Signal: {signal if signal is not None else 'N/A'} dBm)")

    def start_capture(self, interface: str = "wlan0mon"):
        """Starte WiFi Monitoring"""
        print(f"[*] Starting WiFi tracking on {interface}")
        print("[*] Devices and their searched networks:")
        sniff(iface=interface, prn=self.packet_handler,
              filter="type mgt subtype probe-req")

    def generate_report(self):
        """Intelligence Report über erfasste Geräte"""
        report = []
        for mac, data in self.devices.items():
            avg_signal = (
                sum(data["signal_strength"]) / len(data["signal_strength"])
                if data["signal_strength"] else None
            )
            report.append({
                "mac": mac,
                "known_networks": list(data["probes"]),
                "network_count": len(data["probes"]),
                "first_seen": str(data["first_seen"]),
                "last_seen": str(data["last_seen"]),
                "packet_count": data["count"],
                "avg_signal_dbm": round(avg_signal, 1) if avg_signal else None,
                "intelligence_notes": self._analyze_probes(data["probes"])
            })

        return sorted(report, key=lambda x: x["packet_count"], reverse=True)

    def _analyze_probes(self, probes: set):
        """Analysiere gesuchte Netzwerke für Intelligence"""
        notes = []

        for ssid in probes:
            # Hotel-WiFi → Person reist
            hotel_keywords = ["hotel", "hilton", "marriott", "hyatt",
                            "sheraton", "holiday inn", "radisson"]
            if any(kw in ssid.lower() for kw in hotel_keywords):
                notes.append(f"Hotel network found: '{ssid}' → travel indicator")

            # Flughafen → Reiseaktivität
            airport_keywords = ["airport", "lounge", "lufthansa", "emirates"]
            if any(kw in ssid.lower() for kw in airport_keywords):
                notes.append(f"Airport network: '{ssid}' → recent air travel")

            # Firmen-WiFi → Arbeitgeber identifizieren
            corp_keywords = ["corp", "office", "internal", "-staff"]
            if any(kw in ssid.lower() for kw in corp_keywords):
                notes.append(f"Corporate network: '{ssid}' → employer indicator")

        return notes

# Verwendung:
# 1. WiFi-Adapter in Monitor Mode:
#    sudo airmon-ng start wlan0
# 2. Tracking starten:
#    tracker = WiFiTracker()
#    tracker.start_capture("wlan0mon")
```

### Wigle.net — Globale WiFi-Datenbank

```
WIGLE.NET:
→ Wardriving-Datenbank: 1+ Milliarde WiFi-Netzwerke mit GPS-Koordinaten
→ API: api.wigle.net (kostenloser Account, limitierte Abfragen)
→ Suche nach SSID, BSSID (MAC), oder Geo-Koordinaten

INVESTIGATION USE CASES:
1. "Wo befindet sich Netzwerk 'TargetHome_5G'?"
   → Wigle-Suche nach SSID → GPS-Koordinaten → Wohnadresse

2. "Welche Netzwerke existieren an Adresse X?"
   → Geo-Suche → alle SSIDs → Bewohner-Intelligence

3. "Wohin reist diese Person?"
   → Probe Requests erfassen → SSIDs → Wigle-Lookup jeder SSID
   → "Fritz!Box 7590 XY" → deutsche Heimadresse
   → "Marriott_Guest" → Hotel-Aufenthalt
   → "eduroam" → Universität
```

### BLE (Bluetooth Low Energy) Tracking

```
APPLE AIRTAG / TILE / SAMSUNG SMARTTAG:
→ BLE Beacons die von ALLEN iPhones/Android in der Nähe gelesen werden
→ Apple "Find My" Netzwerk: ~1 Milliarde Geräte als Tracker
→ Missbrauchspotential: AirTag an Zielperson → Echtzeit-Tracking
→ Apple's Anti-Stalking: "Unbekannter AirTag"-Warnung nach ~8-24h

PASSIVE BLE SCANNING:
→ Jedes Bluetooth-Gerät sendet Advertising Packets
→ MAC-Adresse (randomisiert, aber Muster erkennbar)
→ Device Name, Service UUIDs → Gerätetyp identifizieren
→ Tools: nRF Connect (Smartphone), hcitool (Linux), Ubertooth One (Hardware)
```

---

## WOCHE 5-6: VEHICLE, MARITIME & FLIGHT TRACKING

### Flugzeug-Tracking (ADS-B)

```
ADS-B (Automatic Dependent Surveillance-Broadcast):
→ Jedes Flugzeug sendet auf 1090 MHz:
  - Callsign (Flugnummer)
  - Position (GPS)
  - Altitude
  - Speed
  - Aircraft Type
  - ICAO 24-bit Address (eindeutige ID)

ÖFFENTLICHE TRACKER:
├── FlightRadar24: flightradar24.com (bester, aber Militär gefiltert)
├── FlightAware: flightaware.com
├── ADS-B Exchange: adsbexchange.com (UNGEFILTERT — auch Militär!)
│   └── DAS ist die Quelle für Investigation
├── OpenSky Network: opensky-network.org (akademisch, API, historisch)
└── Planefinder: planefinder.net

EIGENER ADS-B EMPFÄNGER:
→ RTL-SDR Dongle (~25 EUR) + Antenne + dump1090 Software
→ sudo apt install dump1090-mutability
→ dump1090 --interactive
→ Empfange alle Flugzeuge im Umkreis von ~300km

INVESTIGATION USE CASES:
1. Oligarchen-Jets: ICAO-Adresse → Registrierung → Besitzer
   → Tools: planespotters.net, icao24.net
   → Beispiel: @ElonJet, @RUOligarchJets auf Twitter

2. Rendition Flights: CIA-Flugzeuge getrackt über ADS-B
   → Bekannte CIA Front-Companies: Aero Contractors, Tepper Aviation

3. Militärische Überwachungsflüge: RC-135, P-8, E-3 AWACS
   → Auf ADS-B Exchange sichtbar (nicht auf FR24)

4. Drogenflüge: Ungewöhnliche Routen, kleine Flugzeuge, Nachtflüge
```

### Schiffs-Tracking (AIS)

```
AIS (Automatic Identification System):
→ Pflicht für Schiffe >300 GT (international) / >500 GT (national)
→ Sendet auf VHF:
  - MMSI (Maritime Mobile Service Identity)
  - Schiffsname, Typ, Größe
  - Position (GPS)
  - Kurs, Geschwindigkeit
  - Zielhafen

ÖFFENTLICHE TRACKER:
├── MarineTraffic: marinetraffic.com (bester)
├── VesselFinder: vesselfinder.com
├── MyShipTracking: myshiptracking.com
└── Global Fishing Watch: globalfishingwatch.org (Fischerei)

INVESTIGATION USE CASES:
1. Sanktionsumgehung: Russische Tanker mit AIS-Off → Dark Fleet
   → "AIS Gap Analysis": Wo hat das Schiff sein Signal ausgeschaltet?
   → Ship-to-Ship Transfer: Zwei Schiffe treffen sich auf See → Öl umladen

2. Illegaler Fischfang: Global Fishing Watch + AIS

3. Waffenlieferungen: Schiff von Nordkorea → Syrien tracken

4. Yachten: Oligarchen-Yachten tracken (OSINT Community macht das aktiv)
```

### Fahrzeug-Tracking (ALPR)

```
ALPR (Automatic License Plate Recognition):
→ Kameras die Kennzeichen automatisch lesen
→ In DE: Polizei (KESY), Maut (Toll Collect), privat (Parkplätze)
→ Rechtlich: Verdachtsunabhängige Massenerfassung = umstritten

OSINT-ZUGÄNGLICHE QUELLEN:
→ Google Street View: Kennzeichen oft lesbar (trotz Blur)
→ Social Media: Fotos mit sichtbaren Kennzeichen
→ Immobilienportale: Fotos mit Kennzeichen auf Auffahrt
→ Webcams: Öffentliche Verkehrskameras

INVESTIGATION:
→ Kennzeichen → Halterabfrage (nur für Behörden/Rechtsanwälte)
→ In DE: Halterabfrage über KBA oder Online-Dienste (z.B. für Unfälle)
→ OSINT: Kennzeichen + Google → Anzeigen, Foren, Social Media
```

---

## WOCHE 7-8: GEOINT CAPSTONE & MULTI-SOURCE INTEGRATION

### Multi-Source Geolocation

Die mächtigste Technik: Kombiniere ALLE Tracking-Quellen.

```
MULTI-SOURCE PERSON TRACKING:

Social Media PoL          → Person postet aus Restaurant um 19:00
    +
WiFi Probe Requests       → Gerät sucht "Restaurant_Guest_WiFi"
    +
Mobilfunk (Cell-ID)       → Handy in Zelle die Restaurant abdeckt
    +
Satellite Imagery         → Fahrzeug auf Parkplatz um 18:45
    +
Flight Data (ADS-B)       → Person landete um 16:00 am Flughafen
    +
Financial (Kreditkarte)   → Zahlung im Restaurant um 20:30

= VOLLSTÄNDIGE TIMELINE MIT HOHER KONFIDENZ
```

### SunCalc & Shadow Analysis

```
GEOLOCATION AUS SCHATTEN:

1. Schatten im Foto messen (Länge + Richtung)
2. Sonnenhöhe berechnen (abhängig von Datum + Uhrzeit + Breitengrad)
3. SunCalc.org: Gib Datum + Uhrzeit ein → Sonnenhöhe
4. Schattenrichtung → Himmelsrichtung → Orientierung des Fotos
5. Schattenlänge → Sonnenhöhe → Breitengrad (wenn Uhrzeit bekannt)
6. Kombiniert mit Landschaft/Gebäuden → Exakte Position

TOOLS:
→ SunCalc.org: Interaktive Sonnenstands-Karte
→ SunCalc.net: Sonnenposition + Schattenberechnung
→ Google Earth Pro: Sonnensimulation für jeden Ort + Zeitpunkt
→ Shadow Calculator: Schattenwinkel berechnen

BERÜHMTE FÄLLE:
→ Bellingcat: Geolokalisierung von ISIS-Videos anhand von Schatten
→ Citizen Lab: Standort von Überwachungsservern via Foto-Analyse
```

### Praktische Capstone-Übung

```
AUFGABE: FULL-SOURCE GEOINT INVESTIGATION

Szenario: Öffentliche Person (z.B. CEO eines börsennotierten Unternehmens)

1. Social Media Analysis:
   → Instagram/Twitter: Alle Posts mit Locations der letzten 6 Monate
   → EXIF-Daten aus Fotos extrahieren
   → Pattern of Life erstellen

2. Flight Tracking:
   → Firmenjet identifizieren (SEC Filings → Tail Number)
   → ADS-B Exchange: Alle Flüge der letzten 6 Monate
   → Korreliere mit Social Media Posts

3. Property Records:
   → Immobilienbesitz über öffentliche Register
   → Google Earth: Verifiziere Adressen, analysiere Grundstücke

4. Vehicle Intelligence:
   → Social Media Fotos: Kennzeichen/Fahrzeugmodell identifizieren

5. Maritime (wenn relevant):
   → Yacht identifizieren über Superyacht-Register
   → MarineTraffic: Tracke Bewegungen

6. Multi-Source Report:
   → Timeline erstellen
   → Netzwerk kartieren (wer reist mit der Person?)
   → Key Locations identifizieren
   → Anomalien finden (ungeplante Reisen, geheime Treffen?)
```

---

## DELIVERABLES MONAT 31-32

| # | Deliverable | Status |
|---|------------|--------|
| 1 | Satellite Change Detection Tool (Python + OpenCV) | [ ] |
| 2 | Google Earth Pro Analyse (3 Case Studies reproduziert) | [ ] |
| 3 | WiFi Tracking Lab (Probe Request Monitor) | [ ] |
| 4 | ADS-B Empfänger Setup (RTL-SDR + dump1090) | [ ] |
| 5 | Flight Investigation Report (eine öffentliche Person) | [ ] |
| 6 | Maritime Investigation (ein Schiff tracken über 30 Tage) | [ ] |
| 7 | Geolocation Challenge (10 Bilder korrekt lokalisiert) | [ ] |
| 8 | Shadow Analysis Übung (3 Fotos korrekt datiert/lokalisiert) | [ ] |
| 9 | Full-Source GEOINT Report (Capstone) | [ ] |
| 10 | Blog Post: "Open Source Satellite Intelligence for Investigations" | [ ] |

---

## QUELLEN

### Bücher
- **Rae Baker: Deep Dive** — OSINT Investigation incl. GEOINT
- **Michael Bazzell: OSINT Techniques** — Kapitel zu Geolocation
- **Eliot Higgins: We Are Bellingcat** — Case Studies mit GEOINT

### Online Kurse
- **Bellingcat Geolocation Guides** — bellingcat.com
- **Sector035 Geolocation Quizzes** — Twitter #OSINT
- **GeoGuessr** — geoguessr.com (Training für Geolocation-Instinkt)
- **Overpass Turbo** — overpass-turbo.eu (OpenStreetMap Queries)

### Videos
- **Benjamin Strick: Geolocation Tutorials** — YouTube
- **Bellingcat Webinars** — YouTube Channel
- **Quiztime Community** — Twitter #quiztime

### Daten
- **OpenCelliD** — opencellid.org (Cell Tower Database)
- **Wigle.net** — WiFi + Bluetooth + Cell Tower Map
- **ADS-B Exchange** — adsbexchange.com (ungefilterter Flugtracker)
- **OpenSky Network** — opensky-network.org (historische Flugdaten + API)
- **MarineTraffic** — marinetraffic.com
