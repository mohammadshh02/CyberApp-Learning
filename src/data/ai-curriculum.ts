// AI Security Curriculum — 2h/Tag, passend zum Hauptcurriculum
// Jeder Monat hat 4 Wochen mit jeweils ~5 Tasks

export interface AIWeek {
  topic: string;
  tasks: { id: string; text: string }[];
}

export interface AIMonth {
  monthRange: string;
  title: string;
  weeks: AIWeek[];
}

export const AI_CURRICULUM: AIMonth[] = [
  // ===== PHASE 1: RECRUIT (Monate 1-3) — AI Grundlagen =====
  {
    monthRange: '1',
    title: 'AI Grundlagen fur Security',
    weeks: [
      {
        topic: 'Was ist AI/ML? — Grundkonzepte',
        tasks: [
          { id: 'ai_1_1_1', text: 'Video: 3Blue1Brown "But what is a neural network?" (YouTube, 19min) — Grundverstandnis aufbauen' },
          { id: 'ai_1_1_2', text: 'Lies: "AI for Cybersecurity" Einleitung auf NIST.gov — Was bedeutet AI fur Security?' },
          { id: 'ai_1_1_3', text: 'Begriffe lernen: Supervised vs Unsupervised Learning, Training Data, Model, Inference, Overfitting' },
          { id: 'ai_1_1_4', text: 'ChatGPT/Claude testen: Stelle 10 Security-Fragen und bewerte die Qualitat der Antworten' },
          { id: 'ai_1_1_5', text: 'Notiz schreiben: "Wo konnte AI in meinem Lernplan helfen?" — 5 konkrete Ideen' },
        ],
      },
      {
        topic: 'LLMs verstehen — Wie ChatGPT funktioniert',
        tasks: [
          { id: 'ai_1_2_1', text: 'Video: "How ChatGPT Works Technically" (Fireship oder similar) — Transformer-Architektur Basics' },
          { id: 'ai_1_2_2', text: 'Lies: OWASP Top 10 for LLM Applications (owasp.org/www-project-top-10-for-large-language-model-applications)' },
          { id: 'ai_1_2_3', text: 'Praktisch: Versuche Prompt Injection auf einem LLM — "Ignore previous instructions and..."' },
          { id: 'ai_1_2_4', text: 'Vergleiche: ChatGPT vs Claude vs Gemini — Welches LLM gibt bessere Security-Antworten?' },
          { id: 'ai_1_2_5', text: 'Lies: "Prompt Injection" Artikel von Simon Willison (simonwillison.net) — DER Experte fur LLM Security' },
        ],
      },
      {
        topic: 'AI-Tools fur OSINT',
        tasks: [
          { id: 'ai_1_3_1', text: 'Teste: ChatGPT/Claude fur OSINT-Analyse — Gib eine Domain und lass dir einen Investigation-Plan erstellen' },
          { id: 'ai_1_3_2', text: 'Teste: AI-basierte Bildersuche (Google Lens, TinEye) — Reverse Image Search fur Fake-Erkennung' },
          { id: 'ai_1_3_3', text: 'Lies: Wie Bellingcat AI fur Open Source Investigations nutzt (bellingcat.com)' },
          { id: 'ai_1_3_4', text: 'Praktisch: Nutze ein LLM um einen OSINT-Report zu strukturieren und zusammenzufassen' },
          { id: 'ai_1_3_5', text: 'Ubung: AI-generierte Texte erkennen — Teste GPTZero, Originality.ai auf verschiedene Texte' },
        ],
      },
      {
        topic: 'AI-generierte Bedrohungen erkennen',
        tasks: [
          { id: 'ai_1_4_1', text: 'Lies: "AI-Generated Phishing" — Wie LLMs uberzeugendere Phishing-Mails schreiben als Menschen' },
          { id: 'ai_1_4_2', text: 'Praktisch: Lass ChatGPT 5 Phishing-Mails generieren und analysiere, warum sie gut/schlecht sind' },
          { id: 'ai_1_4_3', text: 'Video: Deepfake-Erkennung Basics — Worauf achten? (Augen, Haare, Rander, Audio-Sync)' },
          { id: 'ai_1_4_4', text: 'Teste: deepware.ai oder andere Deepfake-Detection Tools mit YouTube-Videos' },
          { id: 'ai_1_4_5', text: 'Schreibe: Blog-Post "5 AI-Bedrohungen die jeder kennen sollte" (fur dein Portfolio)' },
        ],
      },
    ],
  },
  {
    monthRange: '2',
    title: 'AI fur Netzwerk-Analyse',
    weeks: [
      {
        topic: 'AI in Netzwerk-Security',
        tasks: [
          { id: 'ai_2_1_1', text: 'Lies: Wie Darktrace "Enterprise Immune System" mit Unsupervised ML funktioniert' },
          { id: 'ai_2_1_2', text: 'Konzept verstehen: Anomaly Detection — Was ist "normal" im Netzwerk? Wie erkennt ML Abweichungen?' },
          { id: 'ai_2_1_3', text: 'Video: "Machine Learning for Network Security" (SANS oder YouTube)' },
          { id: 'ai_2_1_4', text: 'Praktisch: Nutze ChatGPT um Wireshark-Captures zu analysieren — Copy/Paste Packet-Summaries' },
          { id: 'ai_2_1_5', text: 'Ubung: Schreibe ein Python-Script das mit ML-Bibliothek (scikit-learn) IP-Traffic als normal/anomal klassifiziert' },
        ],
      },
      {
        topic: 'Python + AI Libraries Basics',
        tasks: [
          { id: 'ai_2_2_1', text: 'Setup: pip install scikit-learn pandas numpy matplotlib — AI/ML Grundausstattung' },
          { id: 'ai_2_2_2', text: 'Tutorial: scikit-learn "Getting Started" — Erstes ML-Modell trainieren (Iris Dataset)' },
          { id: 'ai_2_2_3', text: 'Praktisch: Lade einen Netzwerk-Datensatz (KDD Cup 99 oder CICIDS) und exploriere ihn mit Pandas' },
          { id: 'ai_2_2_4', text: 'Baue: Einfachen Anomaly Detector mit Isolation Forest auf Netzwerk-Daten' },
          { id: 'ai_2_2_5', text: 'Verstehe: Precision, Recall, F1-Score — Warum Accuracy allein nicht reicht fur Security' },
        ],
      },
      {
        topic: 'AI-Coding-Assistenten fur Security',
        tasks: [
          { id: 'ai_2_3_1', text: 'Setup: GitHub Copilot oder Cursor AI fur VS Code einrichten' },
          { id: 'ai_2_3_2', text: 'Teste: Lass AI einen Port-Scanner schreiben — Bewerte den Code auf Security-Probleme' },
          { id: 'ai_2_3_3', text: 'Teste: Lass AI einen Web-Scraper schreiben — Findet der AI-Code Schwachstellen?' },
          { id: 'ai_2_3_4', text: 'Wichtig: AI-generierter Code kann unsicher sein! Analysiere 3 AI-generierte Scripts auf Vulnerabilities' },
          { id: 'ai_2_3_5', text: 'Lies: "GitHub Copilot generates insecure code" Paper — Risiken von AI-Code verstehen' },
        ],
      },
      {
        topic: 'AI + Web Scraping Automation',
        tasks: [
          { id: 'ai_2_4_1', text: 'Nutze LLM um CSS-Selektoren und XPath fur Scraping automatisch zu generieren' },
          { id: 'ai_2_4_2', text: 'Baue: AI-gestutzten OSINT-Scraper der Ergebnisse automatisch zusammenfasst' },
          { id: 'ai_2_4_3', text: 'Teste: Kann ein LLM aus Roh-HTML die relevanten Daten extrahieren? (Structured Output)' },
          { id: 'ai_2_4_4', text: 'Lies: "LangChain for Security" — Wie man LLMs in Security-Workflows einbindet' },
          { id: 'ai_2_4_5', text: 'Projekt: Automatisierter Threat-News-Aggregator der tl;dr-Summaries mit AI erstellt' },
        ],
      },
    ],
  },
  {
    monthRange: '3',
    title: 'AI fur Forensik & Analyse',
    weeks: [
      {
        topic: 'AI in der Forensik',
        tasks: [
          { id: 'ai_3_1_1', text: 'Lies: Wie Magnet AXIOM AI fur Artefakt-Klassifizierung nutzt' },
          { id: 'ai_3_1_2', text: 'Konzept: NLP fur Log-Analyse — Wie AI Millionen von Logzeilen sinnvoll zusammenfasst' },
          { id: 'ai_3_1_3', text: 'Praktisch: Gib ChatGPT einen Auszug aus Windows Event Logs und lass sie analysieren' },
          { id: 'ai_3_1_4', text: 'Baue: Python-Script das mit OpenAI API Log-Dateien zusammenfasst und Anomalien markiert' },
          { id: 'ai_3_1_5', text: 'Lies: "AI-Assisted Digital Forensics" Paper — Stand der Forschung' },
        ],
      },
      {
        topic: 'Malware-Klassifizierung mit ML',
        tasks: [
          { id: 'ai_3_2_1', text: 'Konzept: Wie funktioniert ML-basierte Malware-Erkennung? (Static Features vs Dynamic Behavior)' },
          { id: 'ai_3_2_2', text: 'Datensatz: Lade EMBER Malware Dataset (github.com/elastic/ember) — Exploriere die Features' },
          { id: 'ai_3_2_3', text: 'Baue: Einfachen Malware-Classifier mit Random Forest auf EMBER-Features' },
          { id: 'ai_3_2_4', text: 'Verstehe: Warum Signatur-basiert nicht reicht — Polymorphe Malware vs ML-Detection' },
          { id: 'ai_3_2_5', text: 'Lies: Wie CrowdStrike und SentinelOne ML in ihren Agents nutzen' },
        ],
      },
      {
        topic: 'Prompt Injection Deep-Dive',
        tasks: [
          { id: 'ai_3_3_1', text: 'Hands-on: gandalf.lakera.ai — Prompt Injection CTF! Alle Level durchspielen' },
          { id: 'ai_3_3_2', text: 'Lies: "Not what you signed up for" Paper — Indirect Prompt Injection erklart' },
          { id: 'ai_3_3_3', text: 'Verstehe: Direct vs Indirect Prompt Injection — Angriffsvektoren und Beispiele' },
          { id: 'ai_3_3_4', text: 'Teste: Versuche System Prompts aus verschiedenen AI-Chatbots zu extrahieren' },
          { id: 'ai_3_3_5', text: 'Schreibe: Cheat Sheet "Prompt Injection Techniken" fur dein Security-Arsenal' },
        ],
      },
      {
        topic: 'AI Ethics & Risiken in Cybersecurity',
        tasks: [
          { id: 'ai_3_4_1', text: 'Lies: EU AI Act Zusammenfassung — Was bedeutet das fur Security-Tools?' },
          { id: 'ai_3_4_2', text: 'Debatte: Sollten AI-Modelle Exploit-Code generieren konnen? Pro/Contra aufschreiben' },
          { id: 'ai_3_4_3', text: 'Lies: Wie NSO Group und ahnliche AI fur Surveillance nutzen — Ethische Grenzen' },
          { id: 'ai_3_4_4', text: 'Verstehe: AI Bias in Security — Wenn ML-Modelle bestimmte Muster bevorzugen/ubersehen' },
          { id: 'ai_3_4_5', text: 'Blog-Post: "AI in Cybersecurity — Chance oder Gefahr?" (Portfolio-Stuck)' },
        ],
      },
    ],
  },

  // ===== PHASE 2: OPERATOR (Monate 4-6) — AI in Defense =====
  {
    monthRange: '4',
    title: 'AI im SOC & Threat Intelligence',
    weeks: [
      {
        topic: 'AI-gestutzte SIEM-Systeme',
        tasks: [
          { id: 'ai_4_1_1', text: 'Lies: Wie Splunk ML Toolkit funktioniert — Anomaly Detection auf SIEM-Daten' },
          { id: 'ai_4_1_2', text: 'Lies: Elastic ML Jobs — Wie ELK Stack automatisch Anomalien in Logs erkennt' },
          { id: 'ai_4_1_3', text: 'Konzept: UEBA (User Entity Behavior Analytics) — ML lernt normales User-Verhalten' },
          { id: 'ai_4_1_4', text: 'Praktisch: Baue einen einfachen UEBA-Prototyp: Login-Zeiten analysieren, Anomalien finden' },
          { id: 'ai_4_1_5', text: 'Vergleiche: AI-Fahigkeiten von Splunk vs QRadar vs Elastic — Wer hat die beste ML-Integration?' },
        ],
      },
      {
        topic: 'AI fur Threat Intelligence',
        tasks: [
          { id: 'ai_4_2_1', text: 'Lies: Wie Recorded Future NLP nutzt um Dark Web Posts automatisch zu analysieren' },
          { id: 'ai_4_2_2', text: 'Praktisch: Nutze ein LLM um einen APT-Report (Mandiant) zusammenzufassen und IOCs zu extrahieren' },
          { id: 'ai_4_2_3', text: 'Baue: Python-Script das mit Regex + LLM IOCs (IPs, Hashes, Domains) aus Reports extrahiert' },
          { id: 'ai_4_2_4', text: 'Lies: MITRE ATLAS (atlas.mitre.org) — ATT&CK Framework fur AI/ML Systeme' },
          { id: 'ai_4_2_5', text: 'Ubung: Mappe 5 bekannte AI-Angriffe auf MITRE ATLAS Techniken' },
        ],
      },
      {
        topic: 'NLP fur Security-Analyse',
        tasks: [
          { id: 'ai_4_3_1', text: 'Setup: pip install transformers torch — Hugging Face Basics fur NLP' },
          { id: 'ai_4_3_2', text: 'Praktisch: Sentiment Analysis auf Hacker-Forum-Posts (trainiertes Modell von Hugging Face nutzen)' },
          { id: 'ai_4_3_3', text: 'Baue: Phishing-Email-Classifier mit Fine-Tuned BERT (oder simpler: TF-IDF + SVM)' },
          { id: 'ai_4_3_4', text: 'Teste: Wie gut erkennen NLP-Modelle Social Engineering in Textnachrichten?' },
          { id: 'ai_4_3_5', text: 'Projekt: Automatischer CVE-Zusammenfasser der neue CVEs nach Relevanz bewertet' },
        ],
      },
      {
        topic: 'AI fur Incident Response',
        tasks: [
          { id: 'ai_4_4_1', text: 'Lies: Wie SOAR-Plattformen (Cortex XSOAR, Splunk SOAR) AI fur Playbook-Automatisierung nutzen' },
          { id: 'ai_4_4_2', text: 'Konzept: AI-Triage — Wie ML die Priorisierung von Security Alerts automatisiert' },
          { id: 'ai_4_4_3', text: 'Praktisch: Nutze ein LLM als "IR Co-Pilot" — Gib ein Incident-Szenario und lass dir Schritte empfehlen' },
          { id: 'ai_4_4_4', text: 'Verstehe: False Positive Reduction mit ML — Warum SOCs AI dringend brauchen' },
          { id: 'ai_4_4_5', text: 'Schreibe: IR-Playbook "AI-Assisted Incident Response" mit konkreten LLM-Prompts' },
        ],
      },
    ],
  },
  {
    monthRange: '5',
    title: 'AI fur Blockchain & Crypto Analysis',
    weeks: [
      {
        topic: 'AI + Blockchain Analyse',
        tasks: [
          { id: 'ai_5_1_1', text: 'Lies: Wie Chainalysis ML fur Wallet-Clustering und Attribution nutzt' },
          { id: 'ai_5_1_2', text: 'Konzept: Graph Neural Networks fur Blockchain-Analyse — Transaktionsmuster erkennen' },
          { id: 'ai_5_1_3', text: 'Praktisch: Nutze Python + NetworkX um Blockchain-Transaktions-Graphen zu visualisieren' },
          { id: 'ai_5_1_4', text: 'Lies: "Machine Learning for Cryptocurrency Fraud Detection" Paper' },
          { id: 'ai_5_1_5', text: 'Ubung: Trainiere einen Classifier der Mixer/Tumbler-Transaktionen erkennt (simulated data)' },
        ],
      },
      {
        topic: 'AI fur AML & Compliance',
        tasks: [
          { id: 'ai_5_2_1', text: 'Lies: Wie Banken AI fur Anti-Money-Laundering Transaction Monitoring nutzen' },
          { id: 'ai_5_2_2', text: 'Konzept: Suspicious Activity Detection mit ML — False Positive Problem in AML' },
          { id: 'ai_5_2_3', text: 'Praktisch: Baue einen einfachen Transaction Anomaly Detector mit Python' },
          { id: 'ai_5_2_4', text: 'Lies: FATF "Opportunities and Challenges of AI for AML/CFT" Report' },
          { id: 'ai_5_2_5', text: 'Verstehe: Explainable AI (XAI) — Warum AML-Modelle ihre Entscheidungen erklaren mussen' },
        ],
      },
      {
        topic: 'Deepfakes & Synthetic Media',
        tasks: [
          { id: 'ai_5_3_1', text: 'Hands-on: Erstelle ein harmloses Deepfake mit Open-Source-Tools (z.B. DeepFaceLab) um die Technik zu verstehen' },
          { id: 'ai_5_3_2', text: 'Teste: Microsoft Video Authenticator oder andere Deepfake-Detection-Tools' },
          { id: 'ai_5_3_3', text: 'Lies: Falle von CEO-Fraud mit AI Voice Cloning ($25M Hong Kong Fall)' },
          { id: 'ai_5_3_4', text: 'Verstehe: Audio Deepfakes — Wie ElevenLabs-artige Tools fur Social Engineering missbraucht werden' },
          { id: 'ai_5_3_5', text: 'Schreibe: Detection-Guide "Deepfake erkennen — technische und visuelle Indikatoren"' },
        ],
      },
      {
        topic: 'AI-generierter Code & Security',
        tasks: [
          { id: 'ai_5_4_1', text: 'Studie lesen: "Security of AI-Generated Code" (Stanford/NYU) — Wie oft ist AI-Code unsicher?' },
          { id: 'ai_5_4_2', text: 'Praktisch: Lass Copilot/ChatGPT 10 Security-relevante Funktionen generieren — Code Review jede einzelne' },
          { id: 'ai_5_4_3', text: 'Teste: AI-Code-Scanner (Snyk, Semgrep) auf AI-generiertem Code — Was finden sie?' },
          { id: 'ai_5_4_4', text: 'Verstehe: Supply Chain Risk — AI-Halluzinationen konnen zu Dependency Confusion fuhren' },
          { id: 'ai_5_4_5', text: 'Baue: Script das AI-generierten Python-Code automatisch auf common vulnerabilities pruft' },
        ],
      },
    ],
  },
  {
    monthRange: '6',
    title: 'AI fur Advanced OSINT',
    weeks: [
      {
        topic: 'AI-Powered OSINT Automation',
        tasks: [
          { id: 'ai_6_1_1', text: 'Baue: LangChain/LlamaIndex Agent der automatisch OSINT-Recherchen durchfuhrt' },
          { id: 'ai_6_1_2', text: 'Praktisch: AI-Agent der Domain → WHOIS → DNS → Shodan automatisch verkettet' },
          { id: 'ai_6_1_3', text: 'Teste: Wie gut kann GPT-4/Claude Personen-Profile aus offentlichen Daten zusammenfassen?' },
          { id: 'ai_6_1_4', text: 'Lies: "AI OSINT" by Justin Seitz — Automatisierte Intelligence-Sammlung' },
          { id: 'ai_6_1_5', text: 'Projekt: Eigener AI-OSINT-Bot der auf Befehl eine vollstandige Ziel-Analyse erstellt' },
        ],
      },
      {
        topic: 'Computer Vision fur Security',
        tasks: [
          { id: 'ai_6_2_1', text: 'Setup: pip install opencv-python pillow — Bildanalyse-Grundlagen' },
          { id: 'ai_6_2_2', text: 'Praktisch: EXIF-Daten + AI-Bildanalyse kombinieren fur Geolocation' },
          { id: 'ai_6_2_3', text: 'Teste: AI-basierte Gesichtserkennung (face_recognition Library) — Ethische Grenzen verstehen' },
          { id: 'ai_6_2_4', text: 'Lies: Wie Palantir Computer Vision fur Surveillance einsetzt' },
          { id: 'ai_6_2_5', text: 'Ubung: OCR (Tesseract) + AI um Screenshots von Chats automatisch zu transkribieren und analysieren' },
        ],
      },
      {
        topic: 'AI Red Teaming Basics',
        tasks: [
          { id: 'ai_6_3_1', text: 'Lies: "Red Teaming Language Models" (Anthropic Paper) — Wie AI-Modelle getestet werden' },
          { id: 'ai_6_3_2', text: 'Hands-on: garak (github.com/leondz/garak) — LLM Vulnerability Scanner ausprobieren' },
          { id: 'ai_6_3_3', text: 'Teste: Jailbreak-Techniken auf verschiedenen LLMs (DAN, roleplay, encoding tricks)' },
          { id: 'ai_6_3_4', text: 'Verstehe: Alignment vs Capability — Warum "sicherere" Modelle nicht immer sicherer sind' },
          { id: 'ai_6_3_5', text: 'Schreibe: "AI Red Teaming Methodology" — Dein eigenes Framework fur LLM-Testing' },
        ],
      },
      {
        topic: 'AI Security Tools Landscape',
        tasks: [
          { id: 'ai_6_4_1', text: 'Recherche: Top 20 AI Security Startups 2025/2026 — Wer macht was?' },
          { id: 'ai_6_4_2', text: 'Vergleiche: AI-Features von CrowdStrike vs SentinelOne vs Darktrace vs Vectra' },
          { id: 'ai_6_4_3', text: 'Lies: Gartner "AI in Cybersecurity" Report (Summary reicht)' },
          { id: 'ai_6_4_4', text: 'Verstehe: Wo AI Marketing-Hype ist vs wo AI echten Mehrwert bringt in Security' },
          { id: 'ai_6_4_5', text: 'Portfolio: Erstelle eine "AI Security Landscape Map" als Visualisierung' },
        ],
      },
    ],
  },

  // ===== PHASE 3: SPECIALIST (Monate 7-9) — AI in Offense =====
  {
    monthRange: '7',
    title: 'AI fur Offensive Security',
    weeks: [
      {
        topic: 'AI-Assisted Penetration Testing',
        tasks: [
          { id: 'ai_7_1_1', text: 'Teste: PentestGPT oder ahnliche AI-Pentest-Assistenten — Wie gut sind sie wirklich?' },
          { id: 'ai_7_1_2', text: 'Praktisch: Nutze ChatGPT als Pentest-Planer: Gib ein Szenario, lass dir Angriffspfade vorschlagen' },
          { id: 'ai_7_1_3', text: 'Baue: AI-gestutzten Recon-Automator der Nmap + Gobuster + AI-Analyse kombiniert' },
          { id: 'ai_7_1_4', text: 'Lies: "Using LLMs for Vulnerability Discovery" — Aktuelle Forschung' },
          { id: 'ai_7_1_5', text: 'Ethik: Grenzen von AI im Pentest — Wann wird AI-Nutzung problematisch?' },
        ],
      },
      {
        topic: 'AI fur Social Engineering',
        tasks: [
          { id: 'ai_7_2_1', text: 'Analyse: Wie AI Spear-Phishing auf ein neues Level hebt — Personalisierung durch LLMs' },
          { id: 'ai_7_2_2', text: 'Praktisch: Erstelle AI-generierte Phishing-Seiten (in sicherer Testumgebung!) und teste Detection' },
          { id: 'ai_7_2_3', text: 'Lies: Vishing mit AI Voice Cloning — Wie 3 Sekunden Audio reichen um eine Stimme zu klonen' },
          { id: 'ai_7_2_4', text: 'Verstehe: AI-Chatbots als Social Engineering Tool — Automatisierte Manipulation' },
          { id: 'ai_7_2_5', text: 'Defense: Wie erkennt man AI-generierte Social Engineering Angriffe? Detection-Checkliste erstellen' },
        ],
      },
      {
        topic: 'AI-Powered Fuzzing',
        tasks: [
          { id: 'ai_7_3_1', text: 'Konzept: Was ist Fuzzing? Wie verbessert ML die Effizienz? (Coverage-Guided + ML-Guided)' },
          { id: 'ai_7_3_2', text: 'Lies: Google OSS-Fuzz + AI — Wie Google AI nutzt um Open Source Software zu fuzzen' },
          { id: 'ai_7_3_3', text: 'Setup: AFL++ installieren und ein einfaches C-Programm fuzzen' },
          { id: 'ai_7_3_4', text: 'Lies: "FuzzGPT" und ahnliche Ansatze — LLMs generieren Fuzzing-Inputs' },
          { id: 'ai_7_3_5', text: 'Praktisch: Nutze ein LLM um Fuzzing-Dictionaries fur Web-Apps zu generieren' },
        ],
      },
      {
        topic: 'AI fur Vulnerability Research',
        tasks: [
          { id: 'ai_7_4_1', text: 'Lies: Googles "Big Sleep" — AI findet echte 0-Day Vulnerabilities in Open Source' },
          { id: 'ai_7_4_2', text: 'Praktisch: Gib verwundbaren C-Code an ChatGPT/Claude — Findet die AI den Bug?' },
          { id: 'ai_7_4_3', text: 'Teste: AI Code Review Tools (CodeQL + Copilot, Semgrep AI) auf bekannt verwundbarem Code' },
          { id: 'ai_7_4_4', text: 'Verstehe: Warum AI noch keine menschlichen Vuln-Researcher ersetzt — Grenzen der Technik' },
          { id: 'ai_7_4_5', text: 'Projekt: Sammlung von "AI vs Human" Vulnerability Findings — Wo ist AI besser, wo schlechter?' },
        ],
      },
    ],
  },
  {
    monthRange: '8',
    title: 'Adversarial Machine Learning',
    weeks: [
      {
        topic: 'Adversarial Examples',
        tasks: [
          { id: 'ai_8_1_1', text: 'Konzept: Was sind Adversarial Examples? Wie tauscht man ML-Modelle mit minimalen Anderungen?' },
          { id: 'ai_8_1_2', text: 'Hands-on: Adversarial Robustness Toolbox (ART) von IBM installieren und testen' },
          { id: 'ai_8_1_3', text: 'Praktisch: FGSM-Attack auf ein Bildklassifizierungs-Modell — Panda wird zum Gibbon' },
          { id: 'ai_8_1_4', text: 'Verstehe: Adversarial Attacks auf Malware-Classifier — Wie Malware ML-Detection umgeht' },
          { id: 'ai_8_1_5', text: 'Lies: "Adversarial Machine Learning in Cybersecurity" Survey Paper' },
        ],
      },
      {
        topic: 'Model Poisoning & Data Poisoning',
        tasks: [
          { id: 'ai_8_2_1', text: 'Konzept: Training Data Poisoning — Wie manipulierte Trainingsdaten Modelle korrumpieren' },
          { id: 'ai_8_2_2', text: 'Lies: Backdoor Attacks auf Neural Networks — Wie man "Hinterturen" in ML-Modelle einbaut' },
          { id: 'ai_8_2_3', text: 'Verstehe: Supply Chain Attacks auf ML — Vergiftete Modelle auf Hugging Face' },
          { id: 'ai_8_2_4', text: 'Praktisch: Simuliere einen Data Poisoning Attack auf einen simplen Classifier' },
          { id: 'ai_8_2_5', text: 'Defense: Wie erkennt man poisoned Models? Activation Clustering, Neural Cleanse' },
        ],
      },
      {
        topic: 'Model Stealing & Extraction',
        tasks: [
          { id: 'ai_8_3_1', text: 'Konzept: Model Extraction Attacks — ML-Modelle durch Queries rekonstruieren' },
          { id: 'ai_8_3_2', text: 'Lies: "Stealing Machine Learning Models via Prediction APIs" Paper' },
          { id: 'ai_8_3_3', text: 'Praktisch: Versuche ein Black-Box ML-Modell durch systematische Queries zu klonen' },
          { id: 'ai_8_3_4', text: 'Verstehe: Model Inversion — Wie man Trainingsdaten aus einem Modell extrahiert' },
          { id: 'ai_8_3_5', text: 'Defense: Watermarking, Differential Privacy, Output Perturbation gegen Model Stealing' },
        ],
      },
      {
        topic: 'AI Evasion in der Praxis',
        tasks: [
          { id: 'ai_8_4_1', text: 'Praktisch: Wie umgeht Malware ML-basierte EDR? Techniken: Padding, Benign Feature Injection' },
          { id: 'ai_8_4_2', text: 'Lies: "Evading Machine Learning-Based Malware Classifiers" — Praktische Techniken' },
          { id: 'ai_8_4_3', text: 'Verstehe: Concept Drift — Warum ML-Modelle in der Security uber Zeit schlechter werden' },
          { id: 'ai_8_4_4', text: 'Teste: Kann ein LLM dabei helfen, Malware-Samples so zu modifizieren dass sie unerkannt bleiben?' },
          { id: 'ai_8_4_5', text: 'Schreibe: "AI Evasion Techniques" Reference Card fur dein Security-Arsenal' },
        ],
      },
    ],
  },
  {
    monthRange: '9',
    title: 'AI Security Projekte',
    weeks: [
      {
        topic: 'AI Malware & AI Defense',
        tasks: [
          { id: 'ai_9_1_1', text: 'Lies: "AI-Powered Malware" — Wie zukunftige Malware AI nutzen konnte (akademische Szenarien)' },
          { id: 'ai_9_1_2', text: 'Konzept: Polymorphe AI-Malware — Code der sich mit LLMs selbst umschreibt' },
          { id: 'ai_9_1_3', text: 'Defense: AI-basierte EDR Internals — Wie arbeiten die ML-Modelle in CrowdStrike Falcon?' },
          { id: 'ai_9_1_4', text: 'Baue: Eigenen simplen ML-basierten Malware-Detector (PE File Features + Random Forest)' },
          { id: 'ai_9_1_5', text: 'Teste: Deinen Detector gegen Adversarial Samples — Wie robust ist er?' },
        ],
      },
      {
        topic: 'LLM Security Assessment',
        tasks: [
          { id: 'ai_9_2_1', text: 'Framework: OWASP Top 10 for LLMs komplett durcharbeiten mit Beispielen fur jeden Punkt' },
          { id: 'ai_9_2_2', text: 'Hands-on: Damn Vulnerable LLM App (DVLA) durchspielen — CTF-Style LLM Hacking' },
          { id: 'ai_9_2_3', text: 'Teste: Insecure Output Handling — Wenn LLM-Output direkt in SQL/Shell/HTML landet' },
          { id: 'ai_9_2_4', text: 'Baue: Eigene "vulnerable LLM App" als Ubungsobjekt (Flask + OpenAI API)' },
          { id: 'ai_9_2_5', text: 'Schreibe: LLM Security Assessment Checklist fur Penetration Tests' },
        ],
      },
      {
        topic: 'AI Security Capstone Projekt',
        tasks: [
          { id: 'ai_9_3_1', text: 'Wahle EIN Capstone-Projekt: (A) AI Threat Detector, (B) LLM Security Scanner, (C) AI OSINT Tool' },
          { id: 'ai_9_3_2', text: 'Tag 1-2: Architecture Design und Setup' },
          { id: 'ai_9_3_3', text: 'Tag 3-4: Core Implementation' },
          { id: 'ai_9_3_4', text: 'Tag 5-6: Testing und Dokumentation' },
          { id: 'ai_9_3_5', text: 'Veroffentliche auf GitHub mit README — Portfolio-Stuck!' },
        ],
      },
      {
        topic: 'AI Security Zertifizierungen & Weiterbildung',
        tasks: [
          { id: 'ai_9_4_1', text: 'Recherche: AI Security Zertifizierungen — GIAC GAISP, CompTIA AI+, Microsoft AI Security' },
          { id: 'ai_9_4_2', text: 'Starte: Kostenloser Kurs "AI for Cybersecurity" auf Coursera oder edX' },
          { id: 'ai_9_4_3', text: 'Lies: aktuellste AI Security Blogs — Trail of Bits, NCC Group, Google Project Zero AI Posts' },
          { id: 'ai_9_4_4', text: 'Netzwerk: Finde 5 AI Security Researcher auf Twitter/LinkedIn und folge ihnen' },
          { id: 'ai_9_4_5', text: 'Schreibe: "Mein AI Security Lernpfad" — Was hast du in 9 Monaten gelernt? Wo willst du hin?' },
        ],
      },
    ],
  },

  // ===== PHASE 4-7: Advanced Topics (Monate 10+) — fortlaufend =====
  // Ab hier werden die AI-Topics spezialisierter und passen sich dem Hauptcurriculum an
  {
    monthRange: '10',
    title: 'AI + Reverse Engineering',
    weeks: [
      {
        topic: 'AI fur Binary Analysis',
        tasks: [
          { id: 'ai_10_1_1', text: 'Lies: Wie IDA Pro und Ghidra AI/ML Plugins fur Funktions-Erkennung nutzen' },
          { id: 'ai_10_1_2', text: 'Teste: Ghidra + AI Decompiler Plugin — Wie gut rekonstruiert AI C-Code aus Assembly?' },
          { id: 'ai_10_1_3', text: 'Praktisch: Gib Disassembly an ChatGPT — Kann es den Zweck der Funktion erklaren?' },
          { id: 'ai_10_1_4', text: 'Lies: "Using Neural Networks for Binary Analysis" Paper' },
          { id: 'ai_10_1_5', text: 'Verstehe: Function Similarity mit ML — Wie AI ahnliche Funktionen in verschiedenen Binaries findet' },
        ],
      },
      {
        topic: 'AI fur Exploit Development',
        tasks: [
          { id: 'ai_10_2_1', text: 'Lies: Kann AI Buffer Overflows automatisch finden und Exploits generieren? Stand der Forschung' },
          { id: 'ai_10_2_2', text: 'Teste: AI-assisted ROP Chain Generation — Gibt es Tools dafur?' },
          { id: 'ai_10_2_3', text: 'Praktisch: Nutze ChatGPT um einen einfachen Stack Buffer Overflow Exploit zu erklaren und generieren' },
          { id: 'ai_10_2_4', text: 'Verstehe: Grenzen von AI bei Exploit Dev — Warum kreatives Hacking (noch) menschlich bleibt' },
          { id: 'ai_10_2_5', text: 'Lies: DARPA Cyber Grand Challenge — Wie AI-Systeme automatisch Vulns finden und patchen' },
        ],
      },
      {
        topic: 'AI-Powered Malware Analysis',
        tasks: [
          { id: 'ai_10_3_1', text: 'Konzept: Dynamic Analysis mit ML — Sandbox-Verhalten automatisch klassifizieren' },
          { id: 'ai_10_3_2', text: 'Praktisch: Nutze YARA + ML um Malware-Familien automatisch zu clustern' },
          { id: 'ai_10_3_3', text: 'Baue: Automated Malware Report Generator — Sandbox Output → AI → strukturierter Report' },
          { id: 'ai_10_3_4', text: 'Lies: Wie VirusTotal AI (Code Insight) Malware mit LLMs analysiert' },
          { id: 'ai_10_3_5', text: 'Teste: Verschiedene AI-Tools fur Malware Analysis vergleichen — Was funktioniert am besten?' },
        ],
      },
      {
        topic: 'AI Security News & Trends',
        tasks: [
          { id: 'ai_10_4_1', text: 'Setup: AI Security News Feed — tldrsec.com, aivillage.org, Trail of Bits Blog abonnieren' },
          { id: 'ai_10_4_2', text: 'Lies: Neueste AI Security Papers von der letzten DEF CON AI Village' },
          { id: 'ai_10_4_3', text: 'Verstehe: AI Regulation Update — EU AI Act, US Executive Order on AI, China AI Laws' },
          { id: 'ai_10_4_4', text: 'Lies: "The State of AI Security" Annual Report (z.B. von HiddenLayer oder Robust Intelligence)' },
          { id: 'ai_10_4_5', text: 'Blog-Post: Monatlicher "AI Security Digest" — Was ist diese Woche in AI Security passiert?' },
        ],
      },
    ],
  },
  {
    monthRange: '11',
    title: 'AI + Active Directory & Cloud',
    weeks: [
      {
        topic: 'AI fur AD Security',
        tasks: [
          { id: 'ai_11_1_1', text: 'Lies: Wie Microsoft Defender for Identity ML nutzt um AD-Angriffe zu erkennen' },
          { id: 'ai_11_1_2', text: 'Konzept: AI-basierte Erkennung von Kerberoasting, Pass-the-Hash, DCSync' },
          { id: 'ai_11_1_3', text: 'Praktisch: Bloodhound-Daten + ML — Automatisch gefährliche Attack Paths priorisieren' },
          { id: 'ai_11_1_4', text: 'Baue: Script das AD-Event-Logs mit AI auf verdächtiges Verhalten scannt' },
          { id: 'ai_11_1_5', text: 'Verstehe: Warum AD-Anomaly-Detection schwer ist — Hohe Baseline-Variabilität' },
        ],
      },
      {
        topic: 'AI fur Cloud Security',
        tasks: [
          { id: 'ai_11_2_1', text: 'Lies: Wie Wiz und Orca Security AI fur Risk Prioritization nutzen' },
          { id: 'ai_11_2_2', text: 'Konzept: AI-basiertes Cloud Security Posture Management (CSPM)' },
          { id: 'ai_11_2_3', text: 'Praktisch: AWS GuardDuty Anomaly Detection verstehen — Welche ML-Modelle laufen im Hintergrund?' },
          { id: 'ai_11_2_4', text: 'Teste: AI-Tools fur Infrastructure-as-Code Security Scanning' },
          { id: 'ai_11_2_5', text: 'Projekt: Cloud Security Dashboard das AI-Findings aggregiert und priorisiert' },
        ],
      },
      {
        topic: 'Autonomous Security Agents',
        tasks: [
          { id: 'ai_11_3_1', text: 'Konzept: Was sind AI Security Agents? Autonomous SOC, Self-Healing Infrastructure' },
          { id: 'ai_11_3_2', text: 'Lies: Wie Microsoft Security Copilot als AI Security Agent funktioniert' },
          { id: 'ai_11_3_3', text: 'Baue: Einfachen AI Security Agent mit LangChain der automatisch Threats untersucht' },
          { id: 'ai_11_3_4', text: 'Verstehe: Risiken autonomer Security — Was wenn der AI Agent falsch reagiert?' },
          { id: 'ai_11_3_5', text: 'Debatte: Human-in-the-Loop vs Full Autonomy in Security — Wo ziehen wir die Grenze?' },
        ],
      },
      {
        topic: 'AI Security Portfolio aufbauen',
        tasks: [
          { id: 'ai_11_4_1', text: 'GitHub: Sammle alle bisherigen AI Security Projekte in einem Repository' },
          { id: 'ai_11_4_2', text: 'Blog: Schreibe 3 technische Posts uber AI Security Themen' },
          { id: 'ai_11_4_3', text: 'LinkedIn: Update dein Profil mit AI Security Skills' },
          { id: 'ai_11_4_4', text: 'Lies: Job Postings fur "AI Security Engineer" — Was wird verlangt?' },
          { id: 'ai_11_4_5', text: 'Plan: Welche AI Security Spezialisierung passt am besten zu deinem Profil?' },
        ],
      },
    ],
  },
  {
    monthRange: '12',
    title: 'AI Security Review & Capstone',
    weeks: [
      {
        topic: 'AI Security Gesamtreview',
        tasks: [
          { id: 'ai_12_1_1', text: 'Review: Alle AI Security Notizen durchgehen — Was sind die wichtigsten Konzepte?' },
          { id: 'ai_12_1_2', text: 'Skills-Matrix: Bewerte dich selbst in jedem AI Security Bereich (1-5)' },
          { id: 'ai_12_1_3', text: 'Lucken identifizieren: Wo musst du noch nachlegen?' },
          { id: 'ai_12_1_4', text: 'Lies: Die neuesten AI Security Vorfälle der letzten 12 Monate zusammenfassen' },
          { id: 'ai_12_1_5', text: 'Erstelle: "AI Security Knowledge Map" — Alle Themen als Mind Map visualisiert' },
        ],
      },
      {
        topic: 'Advanced AI Security Capstone',
        tasks: [
          { id: 'ai_12_2_1', text: 'Wahle: Großes Abschlussprojekt — AI Security Tool, Research Paper, oder Open Source Contribution' },
          { id: 'ai_12_2_2', text: 'Implementiere: Mindestens 1000 Zeilen Code, getestet, dokumentiert' },
          { id: 'ai_12_2_3', text: 'Prasentiere: Erstelle eine Prasentation deines Projekts (als ob fur eine Konferenz)' },
          { id: 'ai_12_2_4', text: 'Veroffentliche: GitHub Release mit README, License, und Demo' },
          { id: 'ai_12_2_5', text: 'Reflektiere: Was hast du in 12 Monaten AI Security gelernt? Schreibe einen Abschluss-Post' },
        ],
      },
    ],
  },
];

// Hilfsfunktion: AI-Monat fur aktuellen Curriculum-Monat finden
export function getAIMonthForCurriculumMonth(monthIndex: number): AIMonth | null {
  // Direct match
  const direct = AI_CURRICULUM.find(m => m.monthRange === String(monthIndex));
  if (direct) return direct;

  // For months > 12 without specific AI data, cycle through month 10-12 content
  // This ensures AI learning continues even when specific content isn't defined
  if (monthIndex > 12) {
    const cycleMonth = ((monthIndex - 10) % 3) + 10;
    return AI_CURRICULUM.find(m => m.monthRange === String(cycleMonth)) || null;
  }

  return null;
}
