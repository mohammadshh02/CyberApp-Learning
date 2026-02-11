# MONAT 5 — CRYPTO INVESTIGATION: BTC/ETH Tracing, On-Chain Intelligence

## DAS LEVEL: Nicht "Blockchain verstehen" — ZachXBT-Level

ZachXBT ist ein einzelner Investigator der Hunderte Millionen Dollar an Crypto-Fraud aufgedeckt hat. Chainalysis und TRM Labs verkaufen ihre Tools für sechsstellige Beträge an FBI, IRS-CI, Europol. Das ist das Level das du erreichst.

---

## Monats-Ziele (nicht verhandelbar)
- [ ] Bitcoin-Tracing: 5 echte Ransomware-Transaktionsketten nachverfolgt
- [ ] Ethereum-Tracing: DeFi-Transaktionen, Token-Transfers, Smart Contract Interaction
- [ ] Mixer/Tumbler-Analyse: Verstehe wie CoinJoin, Tornado Cash funktionieren
- [ ] Chainalysis Certification: Cryptocurrency Fundamentals Certification (kostenlos)
- [ ] Tools: OXT.me, Breadcrumbs, Metasleuth, Etherscan, Blockchair beherrscht
- [ ] Cross-Chain Tracing: Bridge-Transaktionen verfolgen
- [ ] 3 historische Fälle analysiert (Silk Road, Colonial Pipeline, Bitfinex Hack)
- [ ] AML-Grundlagen: FATF Travel Rule, KYC/CDD-Prozesse verstanden
- [ ] Eigenes Tracing-Script geschrieben (Python + Blockchain APIs)
- [ ] Blog: 2+ Crypto-Investigation Write-ups

---

## WOCHE 17 — BITCOIN TRACING

### Montag (Tag 113) — Blockchain-Forensik Grundlagen

**06:30–08:30 | DEEP TECHNICAL: Bitcoin Internals für Investigatoren**

Du musst verstehen WIE Bitcoin funktioniert — nicht als Investor, als Investigator:

```python
"""
Bitcoin Transaction Analysis Tools
Für Crypto-Investigation auf professionellem Niveau
"""
import requests
import json
from datetime import datetime

class BitcoinInvestigator:
    """Bitcoin-Transaktionsanalyse über öffentliche APIs."""

    def __init__(self):
        self.base_url = "https://blockchain.info"
        self.blockchair_url = "https://api.blockchair.com/bitcoin"

    def get_address_info(self, address):
        """Adress-Details abrufen."""
        url = f"{self.base_url}/rawaddr/{address}"
        response = requests.get(url)
        data = response.json()
        return {
            'address': address,
            'total_received': data['total_received'] / 1e8,  # Satoshi → BTC
            'total_sent': data['total_sent'] / 1e8,
            'balance': data['final_balance'] / 1e8,
            'n_transactions': data['n_tx'],
            'first_seen': self._timestamp_to_date(
                data['txs'][-1]['time'] if data['txs'] else None
            ),
            'last_seen': self._timestamp_to_date(
                data['txs'][0]['time'] if data['txs'] else None
            )
        }

    def trace_transaction(self, tx_hash):
        """Einzelne Transaktion analysieren."""
        url = f"{self.base_url}/rawtx/{tx_hash}"
        response = requests.get(url)
        data = response.json()

        inputs = []
        for inp in data['inputs']:
            inputs.append({
                'address': inp['prev_out']['addr'],
                'value_btc': inp['prev_out']['value'] / 1e8
            })

        outputs = []
        for out in data['out']:
            outputs.append({
                'address': out.get('addr', 'OP_RETURN'),
                'value_btc': out['value'] / 1e8,
                'spent': out['spent']
            })

        return {
            'tx_hash': tx_hash,
            'timestamp': self._timestamp_to_date(data['time']),
            'block_height': data.get('block_height'),
            'inputs': inputs,
            'outputs': outputs,
            'fee_btc': data.get('fee', 0) / 1e8,
            'total_input': sum(i['value_btc'] for i in inputs),
            'total_output': sum(o['value_btc'] for o in outputs)
        }

    def follow_the_money(self, start_address, depth=3):
        """
        Folge dem Geldfluss von einer Adresse aus.
        depth = Wie viele Hops verfolgen.
        """
        visited = set()
        queue = [(start_address, 0)]
        flow = []

        while queue:
            address, current_depth = queue.pop(0)
            if current_depth >= depth or address in visited:
                continue
            visited.add(address)

            info = self.get_address_info(address)
            url = f"{self.base_url}/rawaddr/{address}?limit=10"
            data = requests.get(url).json()

            for tx in data.get('txs', [])[:5]:  # Limit für API
                for out in tx['out']:
                    if out.get('addr') and out['addr'] != address:
                        flow.append({
                            'from': address,
                            'to': out['addr'],
                            'amount_btc': out['value'] / 1e8,
                            'tx_hash': tx['hash'],
                            'depth': current_depth
                        })
                        queue.append((out['addr'], current_depth + 1))

        return flow

    def _timestamp_to_date(self, timestamp):
        if timestamp:
            return datetime.fromtimestamp(timestamp).isoformat()
        return None

# Nutzung:
# inv = BitcoinInvestigator()
# print(inv.get_address_info("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"))  # Satoshi's Adresse
# flow = inv.follow_the_money("RANSOMWARE_ADDRESS", depth=3)
```

**09:00–10:30 | INTELLIGENCE: Ransomware-Zahlungen tracken**
- Finde die Bitcoin-Adresse des Colonial Pipeline Ransomware-Falls
  - FBI hat 63.7 BTC (von 75 BTC) zurückgeholt
  - Quelle: DOJ Pressemitteilung + Court Documents
- Trace die Transaktionskette auf oxt.me:
  1. Initiale Zahlung identifizieren
  2. Wohin floss das Geld? (Splits, Consolidations)
  3. Wo landete es bei einer Exchange? (das ist wo FBI zugriff)
- Lerne: **Clustering-Heuristiken**
  - Common Input Ownership: Inputs in einer TX gehören wahrscheinlich dem gleichen Besitzer
  - Change Address Detection: Eine Output-Adresse ist "Wechselgeld"

**11:00–12:00 | CHALLENGES: Chainalysis Certification**
- Starte: Chainalysis Cryptocurrency Fundamentals Certification
- Kostenlos auf: chainalysis.com/cryptocurrency-certification
- Abschnitt 1-2 heute durcharbeiten

**18:30–20:00 | DEEP LEARNING: AML/KYC Framework**
- FATF 40 Recommendations (Zusammenfassung lesen auf fatf-gafi.org)
- Verstehe: Risk-Based Approach, CDD, EDD, SAR/STR Filing
- Für Deutschland: GwG (Geldwäschegesetz) — Grundzüge
- Für Schweiz: GwG (Geldwäschereigesetz) + MROS (Meldestelle)
- Für UAE: goAML System, FATF Grey List History

**21:00–22:30 | PROJEKT: Bitcoin-Tracing Write-up**
- Dokumentiere eine Ransomware-Transaktionskette als Blog-Post

---

### Dienstag-Freitag Woche 17

**Dienstag:** Ethereum-Tracing (Etherscan, Token Transfers, Smart Contract Calls) + Chainalysis Cert fortsetzen
**Mittwoch:** Mixer-Analyse (CoinJoin bei Bitcoin, Tornado Cash bei Ethereum) + Tools: Breadcrumbs
**Donnerstag:** Metasleuth Cross-Chain Tracking + DeFi Transaction Analysis
**Freitag:** Case Study: Bitfinex Hack ($4.5B) — Wie Heather Morgan & Ilya Lichtenstein getrackt wurden

---

## WOCHE 18 — ETHEREUM + DEFI INVESTIGATION

### Fokus
- Ethereum unterscheidet sich fundamental von Bitcoin (Account-based vs UTXO)
- Smart Contract Interactions tracken (Uniswap, Aave, etc.)
- Token-Transfers (ERC-20, ERC-721 NFTs) → NFT Wash Trading erkennen
- Flash Loan Attacks verstehen und tracken

```python
"""
Ethereum Investigation Tools
"""
import requests

class EthereumInvestigator:
    def __init__(self, etherscan_api_key):
        self.api_key = etherscan_api_key
        self.base_url = "https://api.etherscan.io/api"

    def get_transactions(self, address, page=1, offset=100):
        """Alle Transaktionen einer Adresse."""
        params = {
            'module': 'account',
            'action': 'txlist',
            'address': address,
            'startblock': 0,
            'endblock': 99999999,
            'page': page,
            'offset': offset,
            'sort': 'desc',
            'apikey': self.api_key
        }
        response = requests.get(self.base_url, params=params)
        return response.json()['result']

    def get_token_transfers(self, address):
        """ERC-20 Token Transfers."""
        params = {
            'module': 'account',
            'action': 'tokentx',
            'address': address,
            'startblock': 0,
            'endblock': 99999999,
            'sort': 'desc',
            'apikey': self.api_key
        }
        response = requests.get(self.base_url, params=params)
        return response.json()['result']

    def get_internal_transactions(self, address):
        """Interne Transaktionen (Smart Contract Calls)."""
        params = {
            'module': 'account',
            'action': 'txlistinternal',
            'address': address,
            'startblock': 0,
            'endblock': 99999999,
            'sort': 'desc',
            'apikey': self.api_key
        }
        response = requests.get(self.base_url, params=params)
        return response.json()['result']

    def analyze_wallet(self, address):
        """Vollständige Wallet-Analyse."""
        txs = self.get_transactions(address)
        tokens = self.get_token_transfers(address)
        internal = self.get_internal_transactions(address)

        unique_interacted = set()
        for tx in txs:
            unique_interacted.add(tx['to'])
            unique_interacted.add(tx['from'])

        return {
            'address': address,
            'total_transactions': len(txs),
            'token_transfers': len(tokens),
            'internal_txs': len(internal),
            'unique_addresses_interacted': len(unique_interacted),
            'tokens_used': list(set(t['tokenName'] for t in tokens)),
            'first_tx': txs[-1]['timeStamp'] if txs else None,
            'last_tx': txs[0]['timeStamp'] if txs else None
        }
```

---

## WOCHE 19-20 — ADVANCED INVESTIGATION + CASE STUDIES

### Woche 19: Große Fälle studieren
- **Silk Road** — Wie FBI Ross Ulbricht fand (OSINT + Crypto Tracing + Server-Fehler)
- **Colonial Pipeline** — Ransomware → Bitcoin → FBI Recovery (Warrant gegen Exchange)
- **Bitfinex Hack** — $4.5B gestohlen → Lichtenstein/Morgan → Wie IRS-CI sie fand
- **Pig Butchering Scams** — Wie die Netzwerke funktionieren, Crypto-Flows
- **OneCoin** — $4B Ponzi Scheme, Ruja Ignatova verschwunden
- Für jeden Fall: Transaktionskette nachverfolgen, IoCs dokumentieren

### Woche 20: Investigation Report + CFE-Vorbereitung
- Schreibe einen vollständigen Crypto-Investigation-Report (10+ Seiten)
- CFE-Kapitel 4-6 lesen (Financial Transactions and Fraud Schemes)
- Erstelle ein Crypto-Investigation-Toolkit auf GitHub

---

## KPI-CHECKLISTE MONAT 5

| KPI | Ziel | Status |
|-----|------|--------|
| Bitcoin Tracing | 5 Transaktionsketten verfolgt | [ ] |
| Ethereum Tracing | DeFi + Token Transfers | [ ] |
| Mixer Analysis | CoinJoin + Tornado Cash verstanden | [ ] |
| Cross-Chain | Bridge-Transaktionen getrackt | [ ] |
| Chainalysis Cert | Bestanden | [ ] |
| OXT.me | Bitcoin-Analyse beherrscht | [ ] |
| Breadcrumbs | Investigations durchgeführt | [ ] |
| Metasleuth | Cross-Chain Tracking | [ ] |
| AML Framework | FATF, GwG, KYC/CDD verstanden | [ ] |
| Case Studies | 3+ historische Fälle analysiert | [ ] |
| Python | Eigenes Tracing-Script | [ ] |
| CFE | Kapitel 4-6 gelesen | [ ] |
| Investigation Report | 10+ Seiten Crypto-Report | [ ] |
| Blog | 2+ Crypto Write-ups | [ ] |
