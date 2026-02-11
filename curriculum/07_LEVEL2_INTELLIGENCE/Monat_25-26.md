# MONAT 25-26: ADVANCED PERSON TRACKING & IDENTITY INTELLIGENCE

> "Finding people who don't want to be found is 20% technology, 80% methodology." — Michael Bazzell, ex-FBI

Du hast jetzt 24 Monate Cybersecurity-Fundament. Ab jetzt wirst du zum **Intelligence Operator** — jemand der Personen findet, identifiziert und ihre Netzwerke kartiert auf einem Niveau das über Standard-OSINT hinausgeht.

---

## WOCHE 1-2: FACIAL RECOGNITION & VISUAL INTELLIGENCE

### Theorie: Wie Gesichtserkennung funktioniert

**Die Technologie:**
- Face Detection (Gesicht im Bild finden) → Face Alignment (normalisieren) → Feature Extraction (128-512 dimensionaler Vektor) → Matching (Cosine Similarity gegen Datenbank)
- Moderne Systeme: ArcFace, CosFace, SphereFace — alle basierend auf Deep CNNs
- Accuracy: >99.8% bei frontalen Aufnahmen, sinkt drastisch bei Winkel >45°, schlechter Beleuchtung, Masken

**Kommerzielle Systeme (kennen, nicht nutzen):**
- Clearview AI: 30+ Milliarden Bilder aus Social Media gescrapt. Nur für Law Enforcement. Illegal in der EU (DSGVO-Verstöße, Bußgelder in Frankreich, UK, Italien, Griechenland)
- PimEyes: Öffentlich zugänglich, sucht Gesichter im offenen Web. ~30 EUR/Monat. Ethisch umstritten, aber legal nutzbar für eigene Bilder
- Search4Faces: Durchsucht VK (Russisches Social Network). Extrem nützlich für OSINT in russischsprachigem Raum
- FaceCheck.id: Durchsucht Mugshots, Social Media, News. Pay-per-search
- TinEye / Google Reverse Image: Nicht Gesichtserkennung, aber Bild-Matching

**Open-Source Tools:**
```python
# DeepFace — Unified Facial Recognition Framework
# Unterstützt: VGG-Face, Facenet, OpenFace, DeepFace, ArcFace, Dlib, SFace

pip install deepface

from deepface import DeepFace

# Gesichter in zwei Bildern vergleichen
result = DeepFace.verify(
    img1_path="person_foto1.jpg",
    img2_path="verdaechtiger.jpg",
    model_name="ArcFace",        # Bestes Modell für Accuracy
    detector_backend="retinaface" # Bester Detektor
)
print(f"Verified: {result['verified']}")
print(f"Distance: {result['distance']}")
print(f"Threshold: {result['threshold']}")

# Gesicht in einer Datenbank suchen
dfs = DeepFace.find(
    img_path="zielperson.jpg",
    db_path="/pfad/zur/bilddatenbank/",
    model_name="ArcFace"
)
print(dfs)  # Alle Matches mit Similarity Score

# Gesichtsattribute analysieren (Alter, Geschlecht, Emotion, Ethnie)
analysis = DeepFace.analyze(
    img_path="person.jpg",
    actions=["age", "gender", "emotion", "race"]
)
```

```python
# InsightFace — Production-Grade Facial Recognition
pip install insightface onnxruntime

import insightface
import cv2
import numpy as np

# Modell laden
app = insightface.app.FaceAnalysis(name='buffalo_l')
app.prepare(ctx_id=0, det_size=(640, 640))

# Bild laden und Gesichter erkennen
img = cv2.imread("gruppe_foto.jpg")
faces = app.get(img)

for face in faces:
    bbox = face.bbox.astype(int)           # Bounding Box
    embedding = face.embedding              # 512-dim Feature Vector
    age = face.age                          # Geschätztes Alter
    gender = 'M' if face.gender == 1 else 'F'

    print(f"Position: {bbox}")
    print(f"Alter: ~{age}, Geschlecht: {gender}")
    print(f"Embedding Shape: {embedding.shape}")

# Zwei Gesichter vergleichen
def compare_faces(face1_embedding, face2_embedding):
    """Cosine Similarity — >0.4 = wahrscheinlich gleiche Person"""
    similarity = np.dot(face1_embedding, face2_embedding) / (
        np.linalg.norm(face1_embedding) * np.linalg.norm(face2_embedding)
    )
    return similarity
```

### Praktische Übungen Woche 1-2

**Tag 1-3: Setup & Grundlagen**
- DeepFace und InsightFace installieren und mit eigenen Fotos testen
- Verstehe die Limitationen: Winkel, Beleuchtung, Auflösung, Alterung, Verkleidung
- Teste mit Fotos gleicher Person über 10+ Jahre Abstand
- Baue eine kleine Bilddatenbank (50 Bilder von öffentlichen Figuren) und teste Suche

**Tag 4-7: PimEyes & Search4Faces Methodology**
- Erstelle PimEyes-Account (Free Tier reicht zum Testen)
- Methodology: Bild beschaffen → PimEyes → Ergebnisse mit anderen OSINT-Quellen korrelieren
- Übe mit öffentlichen Personen: Finde alle Online-Präsenzen nur von einem Foto
- Search4Faces für VK-Suche testen

**Tag 8-10: OSINT Facial Recognition Pipeline**
```
Foto der Zielperson
    ↓
PimEyes/FaceCheck → Webseiten mit diesem Gesicht
    ↓
Reverse Image Search (Google, Yandex, TinEye) → Weitere Kontexte
    ↓
Social Media Korrelation → Accounts identifizieren
    ↓
DeepFace Verify → Bestätigung dass es dieselbe Person ist
    ↓
Metadaten-Extraktion aus gefundenen Bildern → Geolocation, Zeitstempel
    ↓
Report
```

**Tag 11-14: Eigenes Tool bauen**
```python
"""
FaceHunter — Automatisierte Gesichtssuche in Bilddatenbank
Für Investigation-Workflows
"""
import os
import json
import hashlib
from datetime import datetime
from deepface import DeepFace

class FaceHunter:
    def __init__(self, database_path: str):
        self.db_path = database_path
        self.results = []
        self.model = "ArcFace"

    def build_database(self, image_folder: str):
        """Scanne einen Ordner und indexiere alle Gesichter"""
        print(f"[*] Indexing faces in {image_folder}...")
        for root, dirs, files in os.walk(image_folder):
            for f in files:
                if f.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp')):
                    filepath = os.path.join(root, f)
                    try:
                        # Gesichter extrahieren und embeddings speichern
                        faces = DeepFace.represent(
                            img_path=filepath,
                            model_name=self.model,
                            enforce_detection=False
                        )
                        for i, face in enumerate(faces):
                            entry = {
                                "file": filepath,
                                "face_index": i,
                                "embedding": face["embedding"],
                                "hash": hashlib.md5(
                                    filepath.encode()
                                ).hexdigest()
                            }
                            self.results.append(entry)
                            print(f"  [+] Found face in {f} (#{i})")
                    except Exception as e:
                        print(f"  [-] Error processing {f}: {e}")

        # Datenbank speichern
        db_file = os.path.join(self.db_path, "face_db.json")
        with open(db_file, 'w') as fh:
            json.dump(self.results, fh)
        print(f"[*] Database saved: {len(self.results)} faces indexed")

    def search(self, target_image: str, threshold: float = 0.68):
        """Suche ein Gesicht in der Datenbank"""
        print(f"[*] Searching for face in {target_image}...")

        try:
            results = DeepFace.find(
                img_path=target_image,
                db_path=self.db_path,
                model_name=self.model,
                threshold=threshold,
                enforce_detection=False
            )

            matches = []
            for df in results:
                if not df.empty:
                    for _, row in df.iterrows():
                        matches.append({
                            "file": row.get("identity", "unknown"),
                            "distance": row.get("distance", 0),
                            "confidence": 1 - row.get("distance", 0)
                        })

            matches.sort(key=lambda x: x["confidence"], reverse=True)
            return matches

        except Exception as e:
            print(f"[-] Search error: {e}")
            return []

    def generate_report(self, target_image: str, matches: list):
        """Investigation Report generieren"""
        report = f"""
=== FACIAL RECOGNITION INVESTIGATION REPORT ===
Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}
Target Image: {target_image}
Model: {self.model}
Matches Found: {len(matches)}

--- RESULTS ---
"""
        for i, match in enumerate(matches, 1):
            report += f"""
Match #{i}:
  File: {match['file']}
  Confidence: {match['confidence']:.2%}
  Distance: {match['distance']:.4f}
"""
        return report

# Verwendung
hunter = FaceHunter(database_path="./face_investigation")
hunter.build_database("/pfad/zu/gesammelten/bildern")
matches = hunter.search("zielperson.jpg")
report = hunter.generate_report("zielperson.jpg", matches)
print(report)
```

---

## WOCHE 3-4: PATTERN OF LIFE ANALYSIS

### Was ist Pattern of Life?

Pattern of Life (PoL) ist eine Intelligence-Methode die aus Datenpunkten über Zeit das **vorhersagbare Verhalten** einer Person rekonstruiert:
- Wann verlässt die Person das Haus?
- Welche Routen nutzt sie?
- Wo arbeitet sie, wo kauft sie ein, wo trifft sie Kontakte?
- Welche Abweichungen vom Muster gibt es? (= möglicherweise interessant)

Militärische Nachrichtendienste nutzen PoL seit Jahrzehnten für Targeting. In der zivilen Investigation nutzt du es für:
- Fraud Investigation: Zeigen dass jemand nicht dort war wo er behauptet
- Missing Persons: Vorhersagen wo eine Person sein könnte
- Threat Assessment: Routine eines Angreifers verstehen
- Due Diligence: Tatsächliche Aktivitäten vs. behauptete Aktivitäten

### Datenquellen für PoL

```
SOCIAL MEDIA (primär):
├── Instagram: Locations, Zeitstempel, Kontakte, Gewohnheiten
├── Twitter/X: Posting-Zeiten → Schlafrhythmus, Locations, Interessen
├── Facebook: Check-ins, Events, Beziehungen, Gruppen
├── LinkedIn: Arbeitsort, Geschäftsreisen, Konferenzen
├── Strava/Komoot: Exakte Lauf/Fahrrad-Routen mit GPS (!)
├── Foursquare/Swarm: Check-in Historie
└── Google Reviews: Besuchte Orte mit Zeitstempel

METADATEN:
├── EXIF-Daten in Fotos: GPS, Kamera, Zeitstempel
├── WiFi-Probe Requests: MAC-Adressen an bekannten Locations
├── Bluetooth/BLE: AirTag-ähnliches Tracking
└── Mobilfunk-Metadaten: Zellinformationen (bei LI)

ÖFFENTLICHE RECORDS:
├── Handelsregister: Firmenanschriften, Geschäftsführer
├── Grundbucheinträge: Immobilienbesitz
├── Fahrzeugregister: KFZ-Zulassungen
├── Flugdaten: Passenger Name Records (PNR)
└── Schiffsdaten: AIS-Transponder
```

### PoL-Analyse Framework

```python
"""
Pattern of Life Analyzer
Korreliert Datenpunkte über Zeit und Ort
"""
import json
from datetime import datetime, timedelta
from collections import defaultdict
from dataclasses import dataclass, field
from typing import Optional

@dataclass
class DataPoint:
    """Ein einzelner Datenpunkt über eine Zielperson"""
    timestamp: datetime
    location: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    source: str = ""            # z.B. "Instagram", "Twitter", "EXIF"
    activity: str = ""          # z.B. "Post", "Check-in", "Photo"
    contacts: list = field(default_factory=list)
    raw_data: dict = field(default_factory=dict)
    confidence: float = 1.0     # 0-1, wie sicher ist der Datenpunkt

class PatternOfLifeAnalyzer:
    def __init__(self, subject_id: str):
        self.subject_id = subject_id
        self.datapoints: list[DataPoint] = []

    def add_datapoint(self, dp: DataPoint):
        self.datapoints.append(dp)

    def analyze_daily_routine(self):
        """Tagesrhythmus aus Posting-Zeiten ableiten"""
        hour_activity = defaultdict(list)

        for dp in self.datapoints:
            hour = dp.timestamp.hour
            hour_activity[hour].append({
                "source": dp.source,
                "activity": dp.activity,
                "location": dp.location
            })

        routine = {}
        for hour in sorted(hour_activity.keys()):
            activities = hour_activity[hour]
            routine[f"{hour:02d}:00"] = {
                "activity_count": len(activities),
                "common_activities": self._most_common(
                    [a["activity"] for a in activities]
                ),
                "common_locations": self._most_common(
                    [a["location"] for a in activities if a["location"]]
                )
            }

        return routine

    def analyze_weekly_pattern(self):
        """Wochenmuster erkennen"""
        day_activity = defaultdict(list)
        days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag",
                "Freitag", "Samstag", "Sonntag"]

        for dp in self.datapoints:
            day = days[dp.timestamp.weekday()]
            day_activity[day].append(dp)

        pattern = {}
        for day in days:
            dps = day_activity[day]
            locations = [dp.location for dp in dps if dp.location]
            pattern[day] = {
                "total_activity": len(dps),
                "locations": self._most_common(locations),
                "avg_first_activity": self._avg_first_time(dps),
                "avg_last_activity": self._avg_last_time(dps)
            }

        return pattern

    def find_anomalies(self, baseline_days: int = 30):
        """Abweichungen vom Normalverhalten finden"""
        if len(self.datapoints) < baseline_days:
            return []

        # Sortiere chronologisch
        sorted_dps = sorted(self.datapoints, key=lambda x: x.timestamp)

        # Baseline: erste N Tage
        cutoff = sorted_dps[0].timestamp + timedelta(days=baseline_days)
        baseline = [dp for dp in sorted_dps if dp.timestamp < cutoff]
        recent = [dp for dp in sorted_dps if dp.timestamp >= cutoff]

        # Baseline-Locations
        baseline_locations = set(
            dp.location for dp in baseline if dp.location
        )

        anomalies = []
        for dp in recent:
            # Neue Location die nie in Baseline vorkam
            if dp.location and dp.location not in baseline_locations:
                anomalies.append({
                    "type": "new_location",
                    "timestamp": dp.timestamp.isoformat(),
                    "location": dp.location,
                    "source": dp.source,
                    "note": "Person an unbekanntem Ort"
                })

            # Aktivität zu ungewöhnlicher Zeit
            baseline_hours = [
                b.timestamp.hour for b in baseline
            ]
            if baseline_hours:
                avg_hour = sum(baseline_hours) / len(baseline_hours)
                if abs(dp.timestamp.hour - avg_hour) > 4:
                    anomalies.append({
                        "type": "unusual_time",
                        "timestamp": dp.timestamp.isoformat(),
                        "note": f"Aktivität um {dp.timestamp.hour}:00 "
                                f"(normal: ~{avg_hour:.0f}:00)"
                    })

        return anomalies

    def map_contact_network(self):
        """Kontakt-Netzwerk aus allen Datenpunkten extrahieren"""
        contact_freq = defaultdict(int)
        contact_context = defaultdict(list)

        for dp in self.datapoints:
            for contact in dp.contacts:
                contact_freq[contact] += 1
                contact_context[contact].append({
                    "date": dp.timestamp.isoformat(),
                    "location": dp.location,
                    "source": dp.source
                })

        # Sortiert nach Häufigkeit
        network = []
        for contact, freq in sorted(
            contact_freq.items(), key=lambda x: x[1], reverse=True
        ):
            network.append({
                "contact": contact,
                "frequency": freq,
                "contexts": contact_context[contact][:5],  # Top 5
                "relationship_strength": self._classify_strength(freq)
            })

        return network

    def generate_pol_report(self):
        """Vollständigen Pattern of Life Report generieren"""
        routine = self.analyze_daily_routine()
        weekly = self.analyze_weekly_pattern()
        anomalies = self.find_anomalies()
        network = self.map_contact_network()

        report = {
            "subject": self.subject_id,
            "analysis_date": datetime.now().isoformat(),
            "total_datapoints": len(self.datapoints),
            "date_range": {
                "first": min(dp.timestamp for dp in self.datapoints).isoformat(),
                "last": max(dp.timestamp for dp in self.datapoints).isoformat()
            },
            "daily_routine": routine,
            "weekly_pattern": weekly,
            "anomalies": anomalies,
            "contact_network": network[:20],  # Top 20
            "key_locations": self._extract_key_locations(),
            "assessment": self._generate_assessment()
        }

        return report

    def _most_common(self, items: list, n: int = 3):
        freq = defaultdict(int)
        for item in items:
            freq[item] += 1
        return sorted(freq.items(), key=lambda x: x[1], reverse=True)[:n]

    def _avg_first_time(self, dps: list):
        if not dps:
            return None
        times = sorted([dp.timestamp.hour + dp.timestamp.minute/60 for dp in dps])
        return f"{int(times[0])}:{int((times[0] % 1) * 60):02d}" if times else None

    def _avg_last_time(self, dps: list):
        if not dps:
            return None
        times = sorted([dp.timestamp.hour + dp.timestamp.minute/60 for dp in dps])
        return f"{int(times[-1])}:{int((times[-1] % 1) * 60):02d}" if times else None

    def _classify_strength(self, freq: int):
        if freq >= 20: return "STRONG"
        if freq >= 10: return "MODERATE"
        if freq >= 3:  return "WEAK"
        return "MINIMAL"

    def _extract_key_locations(self):
        loc_freq = defaultdict(int)
        for dp in self.datapoints:
            if dp.location:
                loc_freq[dp.location] += 1
        return dict(sorted(
            loc_freq.items(), key=lambda x: x[1], reverse=True
        )[:10])

    def _generate_assessment(self):
        total = len(self.datapoints)
        sources = set(dp.source for dp in self.datapoints)
        locations = set(dp.location for dp in self.datapoints if dp.location)

        return {
            "data_quality": "HIGH" if total > 100 else
                           "MEDIUM" if total > 30 else "LOW",
            "source_diversity": len(sources),
            "location_diversity": len(locations),
            "predictability": "Analysierbar" if total > 50
                            else "Mehr Daten benötigt"
        }
```

### Praktische Übungen Woche 3-4

**Tag 15-18: PoL an dir selbst**
- Exportiere deine eigenen Google Location History (Google Takeout)
- Exportiere deine Twitter/Instagram Daten
- Analysiere dein eigenes Muster: Wann postest du? Wo bist du wann?
- Erkenne wie viel ein Analyst über dich herausfinden könnte
- **Lektion:** Verstehe die Privacy-Implikationen persönlich

**Tag 19-21: PoL an öffentlichen Figuren**
- Wähle 3 öffentliche Personen (Politiker, CEOs, Influencer)
- Sammle 30 Tage an Social-Media-Datenpunkten
- Erstelle PoL-Reports: Tagesablauf, Reisemuster, Kontaktnetzwerk
- Identifiziere Anomalien und Vorhersagen

**Tag 22-25: Strava/Fitness-App Intelligence**
- Strava Global Heatmap analysieren (hat 2018 geheime Militärbasen enthüllt)
- Suche öffentliche Strava-Profile von Zielpersonen → exakte Wohnort, Arbeitsort, Routen
- Komoot, Nike Run Club, Garmin Connect — gleiche Methodik

**Tag 26-28: Tool-Integration**
- Baue eine Pipeline: Social Media Scraping → Datenbank → PoL Analyzer → Report
- Visualisiere mit Folium (Python Maps) oder Kepler.gl

---

## WOCHE 5-6: GRAPH ANALYSIS & SOCIAL NETWORK INTELLIGENCE

### Warum Graph Analysis?

Einzelne Datenpunkte sind nützlich. **Verbindungen** zwischen Datenpunkten sind Gold. Graph Analysis zeigt:
- Wer ist der zentrale Knoten in einem Netzwerk? (Betweenness Centrality)
- Welche Gruppen/Cluster existieren? (Community Detection)
- Wer verbindet zwei ansonsten getrennte Gruppen? (Bridge Nodes)
- Welche Verbindungen sind versteckt? (Link Prediction)

### Tools

**Neo4j — Graph-Datenbank**
```
# Neo4j installieren
# macOS:
brew install neo4j

# Docker (empfohlen):
docker run -d \
    --name neo4j \
    -p 7474:7474 -p 7687:7687 \
    -e NEO4J_AUTH=neo4j/password \
    neo4j:latest

# Browser: http://localhost:7474
```

```cypher
// Cypher Query Language — Neo4j's Abfragesprache

// Personen und Beziehungen anlegen
CREATE (p1:Person {name: "Zielperson A", alias: "alpha"})
CREATE (p2:Person {name: "Kontakt B", role: "Geschäftspartner"})
CREATE (p3:Person {name: "Kontakt C", role: "Familienmitglied"})
CREATE (c1:Company {name: "Shell Corp Ltd", jurisdiction: "BVI"})
CREATE (a1:Account {type: "Bank", bank: "UBS", number: "CH..."})
CREATE (ph1:Phone {number: "+49176...", imei: "..."})

// Beziehungen
CREATE (p1)-[:KNOWS {since: 2019, context: "Business"}]->(p2)
CREATE (p1)-[:RELATED_TO {relation: "Bruder"}]->(p3)
CREATE (p1)-[:DIRECTS]->(c1)
CREATE (p2)-[:SHAREHOLDER {percent: 30}]->(c1)
CREATE (c1)-[:HAS_ACCOUNT]->(a1)
CREATE (p1)-[:USES]->(ph1)

// ABFRAGEN:

// Alle Kontakte einer Person (2 Hops)
MATCH (p:Person {name: "Zielperson A"})-[*1..2]-(connected)
RETURN p, connected

// Kürzester Pfad zwischen zwei Personen
MATCH path = shortestPath(
    (a:Person {name: "Zielperson A"})-[*]-(b:Person {name: "Kontakt X"})
)
RETURN path

// Wer hat die meisten Verbindungen? (Degree Centrality)
MATCH (p:Person)-[r]-()
RETURN p.name, count(r) as connections
ORDER BY connections DESC

// Gemeinsame Kontakte finden
MATCH (a:Person {name: "Zielperson A"})--(mutual)--(b:Person {name: "Verdächtiger"})
RETURN mutual.name, labels(mutual)

// Firmen-Netzwerk aufdecken
MATCH (p:Person)-[:DIRECTS|SHAREHOLDER*1..3]->(c:Company)
WHERE p.name = "Zielperson A"
RETURN p, c
```

**Gephi — Graph-Visualisierung**
```
# Download: https://gephi.org/
# Importiere Daten als CSV (Nodes + Edges) oder direkt aus Neo4j

# Wichtige Metriken in Gephi:
# - Betweenness Centrality: Wer ist die "Brücke" im Netzwerk?
# - PageRank: Wer ist am wichtigsten (gewichtet nach Verbindungsqualität)?
# - Modularity: Welche Cluster/Gruppen existieren?
# - Closeness Centrality: Wer erreicht alle anderen am schnellsten?

# Layout-Algorithmen:
# - ForceAtlas2: Bester Allround-Layout für Social Networks
# - Yifan Hu: Schnell für große Netzwerke
# - Fruchterman Reingold: Klassisch
```

**Python NetworkX — Programmatische Analyse**
```python
import networkx as nx
import matplotlib.pyplot as plt
from collections import defaultdict

class InvestigationGraph:
    def __init__(self, case_name: str):
        self.case = case_name
        self.G = nx.Graph()

    def add_person(self, name: str, **attributes):
        self.G.add_node(name, node_type="person", **attributes)

    def add_company(self, name: str, **attributes):
        self.G.add_node(name, node_type="company", **attributes)

    def add_account(self, identifier: str, **attributes):
        self.G.add_node(identifier, node_type="account", **attributes)

    def add_relationship(self, source: str, target: str,
                        rel_type: str, **attributes):
        self.G.add_edge(source, target,
                       relationship=rel_type, **attributes)

    def find_key_players(self, top_n: int = 10):
        """Identifiziere die wichtigsten Knoten"""
        betweenness = nx.betweenness_centrality(self.G)
        degree = nx.degree_centrality(self.G)

        # Combined Score
        scores = {}
        for node in self.G.nodes():
            scores[node] = {
                "betweenness": betweenness.get(node, 0),
                "degree": degree.get(node, 0),
                "combined": (betweenness.get(node, 0) +
                           degree.get(node, 0)) / 2
            }

        return sorted(
            scores.items(),
            key=lambda x: x[1]["combined"],
            reverse=True
        )[:top_n]

    def find_communities(self):
        """Cluster/Gruppen im Netzwerk finden"""
        communities = nx.community.greedy_modularity_communities(self.G)
        result = []
        for i, community in enumerate(communities):
            result.append({
                "cluster_id": i,
                "members": list(community),
                "size": len(community)
            })
        return result

    def find_hidden_links(self, person_a: str, person_b: str):
        """Alle Pfade zwischen zwei Personen finden"""
        try:
            paths = list(nx.all_simple_paths(
                self.G, person_a, person_b, cutoff=4
            ))
            return [{
                "path": path,
                "length": len(path) - 1,
                "intermediaries": path[1:-1]
            } for path in paths]
        except nx.NetworkXNoPath:
            return []

    def find_bridges(self):
        """Knoten die zwei Gruppen verbinden (entfernen = Netzwerk zerfällt)"""
        bridges = list(nx.bridges(self.G))
        bridge_nodes = set()
        for u, v in bridges:
            bridge_nodes.add(u)
            bridge_nodes.add(v)
        return list(bridge_nodes)

    def export_for_gephi(self, filename: str):
        """Exportiere als GEXF für Gephi-Visualisierung"""
        nx.write_gexf(self.G, f"{filename}.gexf")
        print(f"[+] Exported to {filename}.gexf — open in Gephi")

# Beispiel: Fraud-Netzwerk Investigation
investigation = InvestigationGraph("Case_2026_001")

# Personen
investigation.add_person("Hauptverdächtiger", role="CEO", country="DE")
investigation.add_person("Komplize A", role="CFO", country="CH")
investigation.add_person("Komplize B", role="Strohmann", country="BVI")
investigation.add_person("Geldwäscher", role="Intermediär", country="UAE")

# Firmen
investigation.add_company("Alpha GmbH", jurisdiction="DE", status="aktiv")
investigation.add_company("Beta Holdings Ltd", jurisdiction="BVI", status="shell")
investigation.add_company("Gamma FZE", jurisdiction="UAE-RAK", status="aktiv")

# Konten
investigation.add_account("CH-UBS-001", bank="UBS", currency="CHF")
investigation.add_account("AE-ENBD-001", bank="Emirates NBD", currency="AED")

# Beziehungen
investigation.add_relationship("Hauptverdächtiger", "Alpha GmbH", "DIRECTS")
investigation.add_relationship("Hauptverdächtiger", "Komplize A", "KNOWS", since=2018)
investigation.add_relationship("Komplize A", "Beta Holdings Ltd", "SHAREHOLDER", percent=100)
investigation.add_relationship("Beta Holdings Ltd", "CH-UBS-001", "OWNS")
investigation.add_relationship("Komplize B", "Beta Holdings Ltd", "NOMINEE_DIRECTOR")
investigation.add_relationship("Geldwäscher", "Gamma FZE", "DIRECTS")
investigation.add_relationship("Gamma FZE", "AE-ENBD-001", "OWNS")
investigation.add_relationship("Beta Holdings Ltd", "Gamma FZE", "TRANSFERS_TO", amount="2.5M EUR")

# Analyse
key_players = investigation.find_key_players()
communities = investigation.find_communities()
hidden = investigation.find_hidden_links("Hauptverdächtiger", "Geldwäscher")

print("=== KEY PLAYERS ===")
for name, scores in key_players:
    print(f"  {name}: {scores['combined']:.3f}")

print("\n=== HIDDEN LINKS ===")
for path in hidden:
    print(f"  {'→'.join(path['path'])} (via {path['intermediaries']})")

# Export für Gephi
investigation.export_for_gephi("fraud_network")
```

**i2 Analyst's Notebook**
- Industriestandard bei BKA, BND, FBI, Europol
- Kostet ~5.000-15.000 EUR/Lizenz
- Du lernst es am Arbeitsplatz (BKA, BSI, Kroll, FTI)
- Wichtig zu wissen DASS es existiert und was es kann
- Alternative zum Üben: Maltego (Community Edition kostenlos)

### Praktische Übungen Woche 5-6

**Tag 29-32: Neo4j Lab**
- Installiere Neo4j (Docker)
- Importiere einen öffentlichen Datensatz (z.B. Panama Papers — ICIJ hat sie als Neo4j-Datenbank veröffentlicht: https://offshoreleaks.icij.org/)
- Übe Cypher Queries: Finde Verbindungen, Cluster, Brücken
- Schreibe 10 Investigation-relevante Queries

**Tag 33-35: NetworkX + Gephi**
- Baue ein Investigation-Netzwerk mit NetworkX
- Exportiere nach Gephi, visualisiere mit ForceAtlas2
- Identifiziere Key Players, Cluster, Bridges
- Erstelle einen visuellen Report

**Tag 36-38: Maltego Deep Dive**
- Maltego Community Edition (kostenlos)
- Transforms: Shodan, VirusTotal, Have I Been Pwned, Social Media
- Baue ein vollständiges Personen-Netzwerk einer öffentlichen Figur
- Lerne Custom Transforms zu schreiben (Python + Maltego TRX)

**Tag 39-42: Capstone — Full Investigation**
- Wähle einen öffentlich dokumentierten Fraud-Fall (z.B. Wirecard, 1MDB, FTX)
- Rekonstruiere das Netzwerk in Neo4j aus öffentlichen Quellen
- Identifiziere Key Players, Shell Companies, Geldflüsse
- Erstelle einen Investigation Report mit Netzwerk-Visualisierungen

---

## WOCHE 7-8: SOCK PUPPETS & OPERATIONAL SECURITY

> **WICHTIG — VORBEREITUNG (Monat 24, Ende Phase 6):**
> Sock Puppet Accounts benötigen **30+ Tage Aging** bevor sie glaubwürdig sind. Da Woche 7-8 nur ~13 Tage umfasst, **müssen die Accounts bereits in Monat 24 erstellt werden**. Plan: Letzte 1-2 Wochen von Monat 24 → Persona definieren, Infrastruktur aufsetzen, Accounts registrieren, tägliche organische Aktivität starten (Posts, Likes, Follows). So sind die Accounts bei operativer Nutzung in Monat 25 bereits 30+ Tage alt.

### Sock Puppet Management

Eine Sock Puppet ist eine falsche Online-Identität die für verdeckte OSINT-Research genutzt wird. Jeder professionelle OSINT-Analyst hat mindestens 3-5 gepflegte Sock Puppets.

**Erstellung:**
1. **Persona definieren:** Name, Alter, Beruf, Interessen, Biografie — alles konsistent
2. **Foto generieren:** ThisPersonDoesNotExist.com oder StyleGAN — NIEMALS echte Fotos verwenden
3. **Digitale Infrastruktur:**
   - Dediziertes Gerät oder VM (Tails oder dedizierte Linux-VM)
   - Eigene IP: VPN auf separatem Server (nicht dein normales VPN)
   - Eigene Email: ProtonMail oder Tutanota (nicht von deiner normalen IP erstellt)
   - Eigene Telefonnummer: Prepaid SIM (bar gekauft) oder VoIP (MySudo, TextNow)
4. **Social Media aufbauen:** Facebook, Twitter, LinkedIn, Instagram — über Wochen organisch aufbauen
5. **Aging:** Mindestens 30 Tage aktiv bevor du sie für Investigation nutzt. Posts, Likes, Kommentare — normales Verhalten simulieren.

**OPSEC-Regeln:**
- NIEMALS von deiner echten IP auf Sock-Puppet-Accounts zugreifen
- NIEMALS Sock Puppet und echte Accounts im selben Browser
- Browser-Fingerprinting beachten: Canvas, WebGL, Fonts, Plugins sind unique
- Timing: Nicht um 3 Uhr nachts von einem "US-Account" posten
- Sprache: Sprachstil konsistent halten, kein Deutsch in einem "amerikanischen" Account
- Container: Firefox Multi-Account Containers oder separate Browser-Profile

### Eigene OPSEC (Counter-Intelligence)

Als Intelligence Operator musst du auch dich selbst schützen:

```
DEINE OPSEC-CHECKLISTE:
├── Separate Geräte: Investigation-Laptop ≠ persönlicher Laptop
├── OS: Tails (amnesisch) oder Whonix (alles über Tor)
├── VPN: Mullvad (bar bezahlt) → Tor → Ziel
├── Browser: Tor Browser (Investigation) / Brave (normal)
├── Email: ProtonMail für Investigation-Kommunikation
├── Telefon: Separates Prepaid für Investigation-Kontakte
├── Metadaten: MAT2 zum Strippen von Metadaten aus Dateien
├── Passwörter: Separate KeePass-Datenbank für Investigation
├── 2FA: Hardware Keys (YubiKey) für alle wichtigen Accounts
└── Physisch: Investigation-Material verschlüsselt (VeraCrypt)
```

### Praktische Übungen Woche 7-8

**Tag 43-46: Sock Puppet erstellen**
- Erstelle 2 Sock Puppets mit unterschiedlichen Personas
- Richte dedizierte VMs ein (Whonix empfohlen)
- Erstelle Email, Social Media Accounts
- Beginne mit organischem Aging (tägliche Aktivität)

**Tag 47-49: OPSEC Hardening**
- Richte einen Investigation-Laptop ein (Tails oder Whonix)
- Teste deinen Browser-Fingerprint: amiunique.org, browserleaks.com
- Übe Metadaten-Stripping mit MAT2
- Erstelle eine persönliche OPSEC-Policy

**Tag 50-52: Verdeckte Investigation**
- Nutze Sock Puppet für eine OSINT-Investigation einer öffentlichen Person
- Joined einer öffentlichen Facebook-Gruppe als Sock Puppet
- Sammle Informationen die nur für Gruppenmitglieder sichtbar sind
- Dokumentiere den Prozess und Lessons Learned

**Tag 53-56: Full Integration Exercise**
- Kombiniere ALLES: Facial Recognition + PoL + Graph Analysis + Sock Puppet
- Ziel: Erstelle ein vollständiges Intelligence-Dossier über eine öffentliche Person
- Dossier enthält: Identifikation, Netzwerk, Routine, Key Locations, Kontakte
- Format: Professioneller Intelligence Report

---

## DELIVERABLES MONAT 25-26

| # | Deliverable | Status |
|---|------------|--------|
| 1 | FaceHunter Tool (Facial Recognition Search) | [ ] |
| 2 | Pattern of Life Analyzer (eigenes Tool) | [ ] |
| 3 | PoL-Report über öffentliche Person | [ ] |
| 4 | Neo4j Investigation Database (Panama Papers) | [ ] |
| 5 | NetworkX Fraud-Netzwerk-Analyse | [ ] |
| 6 | Gephi-Visualisierung eines Investigation-Netzwerks | [ ] |
| 7 | 2 aktive Sock Puppets (30+ Tage geaged) | [ ] |
| 8 | Investigation-Laptop (Tails/Whonix) konfiguriert | [ ] |
| 9 | Full Intelligence Dossier (Capstone) | [ ] |
| 10 | Blog Post: "Introduction to Graph Analysis for Investigations" | [ ] |

---

## QUELLEN & WEITERFÜHREND

### Bücher
- **Michael Bazzell: OSINT Techniques (10th Edition)** — Sock Puppets, Person Tracking
- **Michael Bazzell: Extreme Privacy** — OPSEC auf Paranoia-Level
- **Rae Baker: Deep Dive: Exploring the Real-World Value of OSINT** — Investigation Methodology
- **Justin Seitz: Black Hat Python** — Tool-Entwicklung

### Online
- **Sector035 "Week in OSINT"** — Wöchentlicher Newsletter
- **OSINT Curious** — Podcast + Blog
- **Bellingcat Guides** — citizenlab.ca, bellingcat.com
- **Neo4j Graph Academy** — Kostenlose Kurse: graphacademy.neo4j.com
- **Gephi Tutorials** — gephi.org/users

### Videos
- **Benjamin Strick** — Geolocation + Visual Intelligence
- **The OSINT Curious Project** — YouTube + Podcast
- **Trace Labs** — Missing Persons OSINT
