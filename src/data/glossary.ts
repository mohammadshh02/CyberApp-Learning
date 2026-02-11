import type { GlossaryEntry, GlossaryCategory } from '@/types/index.ts';

/**
 * Helper: generates GlossaryEntry objects for a given category.
 * IDs are derived automatically from the category + term.
 */
function entries(
  category: GlossaryCategory,
  items: [string, string][],
): GlossaryEntry[] {
  return items.map(([term, definition]) => ({
    id: `${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}_${term.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    term,
    definition,
    category,
    isCustom: false,
  }));
}

// ---------------------------------------------------------------------------
// ~180 Cybersecurity-Glossar-Einträge – alle Definitionen auf Deutsch
// ---------------------------------------------------------------------------

export const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  // ── 1. Python (~12) ─────────────────────────────────────────────────────
  ...entries('Python', [
    [
      'Variable',
      'Ein benannter Speicherplatz, der einen Wert enthält. In Python werden Variablen dynamisch typisiert, d.\u202fh. der Datentyp wird zur Laufzeit bestimmt.',
    ],
    [
      'Funktion',
      'Ein wiederverwendbarer Codeblock, der mit dem Schlüsselwort def definiert wird. Funktionen nehmen Parameter entgegen und können Werte zurückgeben.',
    ],
    [
      'Klasse',
      'Eine Vorlage zur Erzeugung von Objekten in der objektorientierten Programmierung. Klassen bündeln Attribute (Daten) und Methoden (Verhalten).',
    ],
    [
      'Modul',
      'Eine Python-Datei, die Funktionen, Klassen und Variablen enthält und in andere Skripte importiert werden kann. Module fördern die Wiederverwendbarkeit von Code.',
    ],
    [
      'List Comprehension',
      'Eine kompakte Syntax zum Erzeugen von Listen aus bestehenden Iterables. Sie kombiniert Schleifen und optionale Bedingungen in einer einzigen Zeile.',
    ],
    [
      'Decorator',
      'Eine Funktion, die eine andere Funktion erweitert, ohne deren Quellcode zu verändern. Decorators werden häufig mit der @-Syntax eingesetzt.',
    ],
    [
      'Generator',
      'Eine spezielle Funktion, die mit yield Werte einzeln zurückgibt, anstatt alle auf einmal. Generatoren sind speichereffizient bei großen Datenmengen.',
    ],
    [
      'Virtual Environment',
      'Eine isolierte Python-Umgebung, in der Pakete unabhängig vom globalen System installiert werden. So werden Abhängigkeitskonflikte zwischen Projekten vermieden.',
    ],
    [
      'pip',
      'Der Standard-Paketmanager für Python. Mit pip lassen sich Bibliotheken aus dem Python Package Index (PyPI) installieren, aktualisieren und entfernen.',
    ],
    [
      'Exception Handling',
      'Ein Mechanismus zur Behandlung von Laufzeitfehlern mittels try/except-Blöcken. Dadurch kann ein Programm kontrolliert auf Fehler reagieren, anstatt abzustürzen.',
    ],
    [
      'Lambda',
      'Eine anonyme Einzeilen-Funktion, die mit dem Schlüsselwort lambda definiert wird. Lambdas werden häufig als Argumente für Funktionen wie map() oder filter() verwendet.',
    ],
    [
      'Dictionary',
      'Eine Datenstruktur, die Schlüssel-Wert-Paare speichert. Dictionaries erlauben schnellen Zugriff auf Werte über eindeutige Schlüssel.',
    ],
  ]),

  // ── 2. Linux (~13) ──────────────────────────────────────────────────────
  ...entries('Linux', [
    [
      'Shell',
      'Eine Kommandozeilen-Schnittstelle, über die Benutzer mit dem Betriebssystem interagieren. Gängige Shells sind Bash, Zsh und Fish.',
    ],
    [
      'Kernel',
      'Der Kern des Betriebssystems, der Hardware-Ressourcen verwaltet und die Kommunikation zwischen Software und Hardware ermöglicht.',
    ],
    [
      'Dateisystem',
      'Die Struktur, in der Daten auf einem Speichermedium organisiert werden. Linux unterstützt Dateisysteme wie ext4, Btrfs und XFS.',
    ],
    [
      'chmod',
      'Ein Befehl zum Ändern der Zugriffsrechte von Dateien und Verzeichnissen. Die Rechte werden für Eigentümer, Gruppe und andere Benutzer festgelegt.',
    ],
    [
      'grep',
      'Ein Befehl zur Suche nach Textmustern in Dateien oder Ausgaben. grep unterstützt reguläre Ausdrücke und ist ein unverzichtbares Werkzeug für die Log-Analyse.',
    ],
    [
      'iptables',
      'Ein Werkzeug zur Konfiguration der Netfilter-Firewall im Linux-Kernel. Damit lassen sich Regeln für den ein- und ausgehenden Netzwerkverkehr definieren.',
    ],
    [
      'cron',
      'Ein Dienst zur zeitgesteuerten Ausführung von Aufgaben. Cron-Jobs werden in der Crontab-Datei definiert und laufen automatisch zu festgelegten Zeiten.',
    ],
    [
      'SSH',
      'Secure Shell – ein verschlüsseltes Protokoll für den sicheren Fernzugriff auf entfernte Systeme. SSH ersetzt unsichere Protokolle wie Telnet.',
    ],
    [
      'sudo',
      'Ein Befehl, der es autorisierten Benutzern erlaubt, Kommandos mit Root-Rechten auszuführen, ohne sich als Root-Benutzer anzumelden.',
    ],
    [
      'systemd',
      'Ein Init-System und Dienst-Manager für Linux. systemd steuert das Starten, Stoppen und Überwachen von Systemdiensten und verwaltet den Bootprozess.',
    ],
    [
      'Package Manager',
      'Ein Werkzeug zur Installation, Aktualisierung und Entfernung von Softwarepaketen. Beispiele sind apt (Debian/Ubuntu) und dnf (Fedora/RHEL).',
    ],
    [
      'Symlink',
      'Ein symbolischer Link, der als Verweis auf eine andere Datei oder ein Verzeichnis dient. Er funktioniert ähnlich wie eine Verknüpfung unter Windows.',
    ],
    [
      'Pipe',
      'Ein Mechanismus (|), der die Ausgabe eines Befehls als Eingabe an einen anderen weiterleitet. Pipes ermöglichen die Verkettung von Kommandos in einer einzigen Zeile.',
    ],
  ]),

  // ── 3. Netzwerk (~13) ───────────────────────────────────────────────────
  ...entries('Netzwerk', [
    [
      'TCP/IP',
      'Das grundlegende Protokollpaar des Internets. TCP sorgt für zuverlässige, verbindungsorientierte Datenübertragung, während IP die Adressierung und das Routing übernimmt.',
    ],
    [
      'DNS',
      'Das Domain Name System übersetzt menschenlesbare Domainnamen (z.\u202fB. example.com) in IP-Adressen. Es funktioniert wie ein Telefonbuch des Internets.',
    ],
    [
      'DHCP',
      'Das Dynamic Host Configuration Protocol weist Geräten im Netzwerk automatisch IP-Adressen und weitere Konfigurationsparameter zu.',
    ],
    [
      'Subnetting',
      'Die Aufteilung eines Netzwerks in kleinere Teilnetze (Subnetze). Subnetting verbessert die Sicherheit und Effizienz der IP-Adressverwaltung.',
    ],
    [
      'VLAN',
      'Ein Virtual Local Area Network segmentiert ein physisches Netzwerk logisch in mehrere isolierte Broadcast-Domänen, ohne zusätzliche Hardware zu benötigen.',
    ],
    [
      'Firewall',
      'Ein Sicherheitssystem, das den Netzwerkverkehr anhand definierter Regeln filtert. Firewalls schützen Netzwerke vor unautorisiertem Zugriff.',
    ],
    [
      'NAT',
      'Network Address Translation übersetzt private IP-Adressen in öffentliche und umgekehrt. NAT ermöglicht es mehreren Geräten, eine gemeinsame öffentliche IP-Adresse zu nutzen.',
    ],
    [
      'ARP',
      'Das Address Resolution Protocol ordnet IP-Adressen den entsprechenden MAC-Adressen im lokalen Netzwerk zu. ARP-Spoofing ist ein häufiger Angriffsvektor.',
    ],
    [
      'OSI-Modell',
      'Ein Referenzmodell, das Netzwerkkommunikation in sieben Schichten unterteilt – von der physischen Übertragung bis zur Anwendungsebene. Es dient dem Verständnis und der Fehleranalyse.',
    ],
    [
      'Proxy',
      'Ein Vermittlungsserver, der Anfragen zwischen Client und Zielserver weiterleitet. Proxies können zur Anonymisierung, Filterung oder Zwischenspeicherung eingesetzt werden.',
    ],
    [
      'VPN',
      'Ein Virtual Private Network verschlüsselt den gesamten Datenverkehr und erstellt einen sicheren Tunnel über öffentliche Netzwerke wie das Internet.',
    ],
    [
      'Port',
      'Eine logische Nummer (0–65535), die einen bestimmten Dienst auf einem Gerät identifiziert. Beispielsweise nutzt HTTP Port 80 und HTTPS Port 443.',
    ],
    [
      'MAC-Adresse',
      'Eine weltweit eindeutige Hardware-Adresse einer Netzwerkschnittstelle auf Schicht 2 des OSI-Modells. Sie besteht aus 48 Bit und wird bei der Herstellung vergeben.',
    ],
  ]),

  // ── 4. OSINT (~10) ──────────────────────────────────────────────────────
  ...entries('OSINT', [
    [
      'Open Source Intelligence',
      'Die Gewinnung von Erkenntnissen aus frei zugänglichen Quellen wie Websites, sozialen Medien und öffentlichen Datenbanken. OSINT ist ein wichtiger Bestandteil der Aufklärung.',
    ],
    [
      'Google Dorking',
      'Die Nutzung spezieller Suchoperatoren in Google, um gezielt sensible oder versteckte Informationen zu finden (z.\u202fB. site:, filetype:, inurl:).',
    ],
    [
      'Shodan',
      'Eine Suchmaschine, die mit dem Internet verbundene Geräte und Dienste indiziert. Shodan wird zur Erkennung exponierter Systeme und Schwachstellen genutzt.',
    ],
    [
      'Maltego',
      'Ein OSINT- und Forensik-Tool, das Beziehungen zwischen Personen, Organisationen, Domains und IP-Adressen grafisch visualisiert.',
    ],
    [
      'WHOIS',
      'Ein Abfrageprotokoll, das Registrierungsinformationen zu Domainnamen und IP-Adressen liefert, wie Eigentümer, Registrierungsdatum und Nameserver.',
    ],
    [
      'Geolokalisierung',
      'Die Bestimmung des geografischen Standorts eines Geräts oder einer IP-Adresse anhand von Metadaten, GPS-Daten oder Netzwerkinformationen.',
    ],
    [
      'Social Media Intelligence (SOCMINT)',
      'Die gezielte Auswertung von Informationen aus sozialen Netzwerken für nachrichtendienstliche oder ermittlungstechnische Zwecke.',
    ],
    [
      'Wayback Machine',
      'Ein Dienst des Internet Archive, der historische Versionen von Webseiten speichert. In der OSINT-Analyse werden damit gelöschte oder veränderte Inhalte aufgedeckt.',
    ],
    [
      'Metadata',
      'Verborgene Zusatzinformationen in Dateien, etwa Erstellungsdatum, Autor oder GPS-Koordinaten in Bildern. Metadaten können bei Ermittlungen wertvolle Hinweise liefern.',
    ],
    [
      'theHarvester',
      'Ein OSINT-Tool zum Sammeln von E-Mail-Adressen, Subdomains und Hostnamen aus öffentlichen Quellen wie Suchmaschinen und PGP-Schlüsselservern.',
    ],
  ]),

  // ── 5. Forensik (~12) ───────────────────────────────────────────────────
  ...entries('Forensik', [
    [
      'Chain of Custody',
      'Die lückenlose Dokumentation der Beweismittelkette – von der Sicherung bis zur Vorlage vor Gericht. Sie gewährleistet die Integrität digitaler Beweise.',
    ],
    [
      'Disk Imaging',
      'Das bitgenaue Erstellen einer forensischen Kopie eines Datenträgers. Das Image enthält sämtliche Daten, einschließlich gelöschter Bereiche und Slack Space.',
    ],
    [
      'Volatility',
      'Ein Open-Source-Framework zur Analyse von Arbeitsspeicher-Dumps. Es ermöglicht die Untersuchung laufender Prozesse, Netzwerkverbindungen und Malware-Artefakte.',
    ],
    [
      'Autopsy',
      'Eine grafische Open-Source-Plattform für digitale Forensik. Autopsy unterstützt die Analyse von Festplatten, Smartphones und Dateisystemen.',
    ],
    [
      'File Carving',
      'Eine Technik zur Wiederherstellung von Dateien anhand ihrer Signaturen (Magic Bytes), auch ohne intaktes Dateisystem. Nützlich bei gelöschten oder beschädigten Daten.',
    ],
    [
      'Timeline-Analyse',
      'Die chronologische Rekonstruktion von Ereignissen auf einem System anhand von Zeitstempeln aus Dateisystem, Logs und Registry. Sie hilft, Angriffsabläufe zu verstehen.',
    ],
    [
      'Write Blocker',
      'Ein Hardware- oder Software-Werkzeug, das Schreibzugriffe auf einen Datenträger verhindert. So wird die Integrität der Beweismittel während der Analyse gewahrt.',
    ],
    [
      'Hash-Verifikation',
      'Der Vergleich kryptografischer Hashwerte (z.\u202fB. SHA-256), um sicherzustellen, dass forensische Kopien nicht verändert wurden. Jede Änderung ergibt einen völlig anderen Hash.',
    ],
    [
      'RAM-Forensik',
      'Die Analyse des flüchtigen Arbeitsspeichers zur Erkennung von Malware, Verschlüsselungsschlüsseln und laufenden Prozessen, die auf der Festplatte nicht sichtbar sind.',
    ],
    [
      'Log-Analyse',
      'Die systematische Auswertung von System-, Anwendungs- und Sicherheitsprotokollen, um verdächtige Aktivitäten, Fehler oder Sicherheitsvorfälle aufzudecken.',
    ],
    [
      'Artefakt',
      'Ein digitales Überbleibsel, das bei der Nutzung eines Systems entsteht, z.\u202fB. Browser-Verlauf, Registry-Einträge oder temporäre Dateien. Artefakte sind zentrale Beweisquellen.',
    ],
    [
      'Beweissicherung',
      'Der gesamte Prozess der Identifizierung, Sicherung und Dokumentation digitaler Beweise unter Einhaltung forensischer Standards und rechtlicher Anforderungen.',
    ],
  ]),

  // ── 6. Kryptographie (~12) ──────────────────────────────────────────────
  ...entries('Kryptographie', [
    [
      'Symmetrische Verschlüsselung',
      'Ein Verfahren, bei dem derselbe Schlüssel zum Ver- und Entschlüsseln verwendet wird. Es ist schnell, erfordert aber einen sicheren Schlüsselaustausch.',
    ],
    [
      'Asymmetrische Verschlüsselung',
      'Ein Verfahren mit einem öffentlichen und einem privaten Schlüssel. Der öffentliche Schlüssel verschlüsselt, nur der private kann entschlüsseln.',
    ],
    [
      'Hash-Funktion',
      'Eine Einwegfunktion, die beliebige Eingaben in einen Hashwert fester Länge umwandelt. Selbst minimale Änderungen erzeugen einen völlig anderen Hash.',
    ],
    [
      'AES',
      'Der Advanced Encryption Standard ist ein symmetrischer Blockverschlüsselungsalgorithmus mit Schlüssellängen von 128, 192 oder 256 Bit. AES gilt als Industriestandard.',
    ],
    [
      'RSA',
      'Ein asymmetrisches Kryptosystem, das auf der Schwierigkeit der Faktorisierung großer Zahlen basiert. RSA wird für Verschlüsselung und digitale Signaturen verwendet.',
    ],
    [
      'Diffie-Hellman',
      'Ein Schlüsselaustauschprotokoll, das es zwei Parteien ermöglicht, über einen unsicheren Kanal ein gemeinsames Geheimnis zu vereinbaren, ohne es direkt zu übertragen.',
    ],
    [
      'Public Key Infrastructure (PKI)',
      'Ein Rahmenwerk zur Erstellung, Verwaltung und Überprüfung digitaler Zertifikate. PKI bildet die Vertrauensgrundlage für verschlüsselte Kommunikation im Internet.',
    ],
    [
      'Digitale Signatur',
      'Ein kryptografisches Verfahren, das die Authentizität und Integrität einer Nachricht oder eines Dokuments gewährleistet. Sie basiert auf asymmetrischer Verschlüsselung.',
    ],
    [
      'SSL/TLS',
      'Verschlüsselungsprotokolle zur Absicherung der Kommunikation im Internet. TLS ist der Nachfolger von SSL und schützt unter anderem HTTPS-Verbindungen.',
    ],
    [
      'Zertifikat',
      'Ein digitales Dokument, das die Zugehörigkeit eines öffentlichen Schlüssels zu einer bestimmten Identität bestätigt. Zertifikate werden von Zertifizierungsstellen (CAs) ausgestellt.',
    ],
    [
      'Salting',
      'Das Hinzufügen eines zufälligen Werts (Salt) zu einem Passwort vor dem Hashen. Salting verhindert Rainbow-Table-Angriffe und sorgt dafür, dass gleiche Passwörter unterschiedliche Hashes erzeugen.',
    ],
    [
      'Key Derivation Function',
      'Eine Funktion, die aus einem Passwort oder Geheimnis einen kryptografischen Schlüssel ableitet. Beispiele sind PBKDF2, bcrypt und Argon2, die durch hohen Rechenaufwand Brute-Force erschweren.',
    ],
  ]),

  // ── 7. Penetration Testing (~12) ────────────────────────────────────────
  ...entries('Penetration Testing', [
    [
      'Reconnaissance',
      'Die erste Phase eines Penetrationstests, in der Informationen über das Ziel gesammelt werden. Man unterscheidet zwischen passiver und aktiver Aufklärung.',
    ],
    [
      'Enumeration',
      'Die gezielte Abfrage eines Systems, um Details wie Benutzernamen, Netzwerkfreigaben, Dienste und Versionsnummern zu ermitteln.',
    ],
    [
      'Exploitation',
      'Das aktive Ausnutzen einer identifizierten Schwachstelle, um Zugriff auf ein System zu erlangen oder Befehle auszuführen.',
    ],
    [
      'Privilege Escalation',
      'Die Erweiterung der eigenen Berechtigungen auf einem kompromittierten System, etwa von einem normalen Benutzer zu Root- oder Administrator-Rechten.',
    ],
    [
      'Lateral Movement',
      'Die seitliche Bewegung innerhalb eines Netzwerks nach einem initialen Zugriff, um weitere Systeme zu kompromittieren und wertvolle Ziele zu erreichen.',
    ],
    [
      'Nmap',
      'Ein Open-Source-Netzwerkscanner, der Hosts, offene Ports, Dienste und Betriebssysteme erkennt. Nmap ist eines der meistgenutzten Werkzeuge in der Sicherheitsanalyse.',
    ],
    [
      'Metasploit',
      'Ein weit verbreitetes Framework für Penetrationstests, das eine Vielzahl von Exploits, Payloads und Hilfsmodulen bereitstellt.',
    ],
    [
      'Burp Suite',
      'Ein Werkzeugsatz zum Testen der Sicherheit von Webanwendungen. Burp Suite fungiert als Proxy und ermöglicht das Abfangen, Analysieren und Manipulieren von HTTP-Anfragen.',
    ],
    [
      'SQL Injection',
      'Eine Angriffstechnik, bei der schädlicher SQL-Code in Eingabefelder eingeschleust wird, um die Datenbank zu manipulieren oder sensible Daten auszulesen.',
    ],
    [
      'Cross-Site Scripting (XSS)',
      'Eine Schwachstelle in Webanwendungen, bei der schädlicher JavaScript-Code in Seiten eingeschleust wird, der im Browser anderer Benutzer ausgeführt wird.',
    ],
    [
      'Buffer Overflow',
      'Ein Fehler, bei dem ein Programm mehr Daten in einen Puffer schreibt, als dieser fassen kann. Angreifer können dadurch beliebigen Code ausführen oder das System zum Absturz bringen.',
    ],
    [
      'Reverse Shell',
      'Eine Verbindung, bei der das Zielsystem eine Shell-Sitzung zum Angreifer aufbaut. Dies umgeht Firewalls, die eingehende Verbindungen blockieren.',
    ],
  ]),

  // ── 8. Social Engineering (~10) ─────────────────────────────────────────
  ...entries('Social Engineering', [
    [
      'Phishing',
      'Der Versuch, über gefälschte E-Mails oder Webseiten vertrauliche Informationen wie Passwörter oder Kreditkartendaten zu stehlen.',
    ],
    [
      'Spear Phishing',
      'Eine gezielte Form des Phishings, bei der Angreifer individuell zugeschnittene Nachrichten an bestimmte Personen oder Organisationen senden.',
    ],
    [
      'Pretexting',
      'Das Erfinden eines plausiblen Vorwands, um das Vertrauen des Opfers zu gewinnen und an vertrauliche Informationen zu gelangen.',
    ],
    [
      'Baiting',
      'Eine Angriffsmethode, bei der dem Opfer ein verlockender Köder angeboten wird, z.\u202fB. ein infizierter USB-Stick, der absichtlich an einem öffentlichen Ort hinterlegt wird.',
    ],
    [
      'Tailgating',
      'Das unbefugte Betreten gesicherter Bereiche, indem man einer autorisierten Person durch eine Tür folgt, ohne sich selbst zu authentifizieren.',
    ],
    [
      'Vishing',
      'Voice Phishing – ein Betrugsversuch über Telefonanrufe, bei dem sich Angreifer als vertrauenswürdige Institution ausgeben, um sensible Daten zu erfragen.',
    ],
    [
      'Smishing',
      'Phishing per SMS-Nachricht. Opfer werden mit täuschend echten Textnachrichten dazu verleitet, auf schädliche Links zu klicken oder Daten preiszugeben.',
    ],
    [
      'Watering Hole Attack',
      'Ein Angriff, bei dem eine häufig besuchte Website der Zielgruppe kompromittiert wird, um Besucher mit Malware zu infizieren.',
    ],
    [
      'Impersonation',
      'Das Ausgeben als eine andere Person oder Institution, um Vertrauen zu erschleichen und Zugang zu geschützten Bereichen oder Informationen zu erhalten.',
    ],
    [
      'Shoulder Surfing',
      'Das Ausspähen vertraulicher Informationen, indem man einer Person beim Eingeben von Passwörtern oder PINs über die Schulter schaut.',
    ],
  ]),

  // ── 9. Reverse Engineering (~10) ────────────────────────────────────────
  ...entries('Reverse Engineering', [
    [
      'Disassembler',
      'Ein Werkzeug, das Maschinencode in lesbaren Assembler-Code umwandelt. Disassembler wie IDA Pro werden zur Analyse von Binärdateien eingesetzt.',
    ],
    [
      'Decompiler',
      'Ein Programm, das kompilierten Code zurück in eine höhere Programmiersprache übersetzt. Die Ergebnisse sind oft nicht identisch mit dem Originalquellcode, aber hilfreich für die Analyse.',
    ],
    [
      'Ghidra',
      'Ein kostenloses Reverse-Engineering-Framework der NSA. Ghidra bietet Disassembler, Decompiler und umfangreiche Analysemöglichkeiten für zahlreiche Prozessorarchitekturen.',
    ],
    [
      'IDA Pro',
      'Ein führender kommerzieller Disassembler und Debugger für die Binäranalyse. IDA Pro ist ein Industriestandard im Bereich Reverse Engineering und Malware-Forschung.',
    ],
    [
      'Debugging',
      'Der Prozess der schrittweisen Programmausführung, um Fehler zu finden oder das Verhalten von Software zu verstehen. Debugger erlauben das Setzen von Breakpoints und das Inspizieren von Registern.',
    ],
    [
      'Obfuskation',
      'Die absichtliche Verschleierung von Code, um dessen Analyse und Verständnis zu erschweren. Malware-Autoren setzen Obfuskation häufig ein, um die Erkennung zu umgehen.',
    ],
    [
      'Patching',
      'Die gezielte Modifikation einer Binärdatei, z.\u202fB. um Schutzmechanismen zu umgehen oder Fehler zu beheben. Im Sicherheitskontext wird Patching auch zur Analyse von Malware eingesetzt.',
    ],
    [
      'Static Analysis',
      'Die Untersuchung von Software ohne deren Ausführung. Statische Analyse umfasst das Lesen von Quellcode, Disassemblieren und Suchen nach bekannten Mustern.',
    ],
    [
      'Dynamic Analysis',
      'Die Analyse von Software während ihrer Ausführung in einer kontrollierten Umgebung. So lassen sich Laufzeitverhalten, Netzwerkverkehr und Systemänderungen beobachten.',
    ],
    [
      'Assembly Language',
      'Eine maschinennahe Programmiersprache, die prozessorspezifische Befehle in mnemonischer Form darstellt. Assemblerkenntnisse sind essenziell für das Verständnis von Exploits und Malware.',
    ],
  ]),

  // ── 10. Malware Analysis (~10) ──────────────────────────────────────────
  ...entries('Malware Analysis', [
    [
      'Sandbox',
      'Eine isolierte Umgebung, in der verdächtige Software sicher ausgeführt und analysiert werden kann, ohne das produktive System zu gefährden.',
    ],
    [
      'Signature-Based Detection',
      'Eine Erkennungsmethode, die Malware anhand bekannter Muster (Signaturen) identifiziert. Sie ist effektiv bei bekannter Schadsoftware, aber machtlos gegen neue Varianten.',
    ],
    [
      'Heuristische Analyse',
      'Eine Erkennungsmethode, die verdächtiges Verhalten und Codestrukturen bewertet, um auch unbekannte Malware zu identifizieren, die keine bekannte Signatur aufweist.',
    ],
    [
      'Ransomware',
      'Schadsoftware, die Dateien des Opfers verschlüsselt und ein Lösegeld für die Entschlüsselung fordert. Ransomware zählt zu den größten Bedrohungen für Unternehmen und Behörden.',
    ],
    [
      'Trojaner',
      'Malware, die sich als nützliche Software tarnt, um unbemerkt schädliche Funktionen auszuführen. Trojaner können Hintertüren öffnen, Daten stehlen oder weitere Malware nachladen.',
    ],
    [
      'Rootkit',
      'Schadsoftware, die sich tief im Betriebssystem einnistet und ihre Präsenz aktiv verbirgt. Rootkits manipulieren Systemfunktionen, um der Erkennung durch Sicherheitstools zu entgehen.',
    ],
    [
      'Keylogger',
      'Ein Programm oder Gerät, das Tastatureingaben heimlich aufzeichnet. Keylogger werden eingesetzt, um Passwörter, Kreditkartennummern und andere vertrauliche Daten zu stehlen.',
    ],
    [
      'Command & Control (C2)',
      'Die Infrastruktur, über die Angreifer kompromittierte Systeme fernsteuern. C2-Server senden Befehle an Malware und empfangen gestohlene Daten.',
    ],
    [
      'Polymorphe Malware',
      'Schadsoftware, die bei jeder Verbreitung ihren Code verändert, um signaturbasierter Erkennung zu entgehen. Der schädliche Kern bleibt dabei funktional identisch.',
    ],
    [
      'Packer',
      'Ein Werkzeug, das ausführbare Dateien komprimiert und/oder verschlüsselt. Packer werden von Malware-Autoren genutzt, um die Analyse und Erkennung zu erschweren.',
    ],
  ]),

  // ── 11. Mobile Security (~8) ────────────────────────────────────────────
  ...entries('Mobile Security', [
    [
      'APK',
      'Android Package Kit – das Dateiformat für Android-Anwendungen. APK-Dateien können dekompiliert und auf Schwachstellen oder eingebettete Malware analysiert werden.',
    ],
    [
      'Jailbreak',
      'Das Umgehen der Sicherheitsbeschränkungen eines iOS-Geräts, um Root-Zugriff zu erlangen und nicht autorisierte Software zu installieren.',
    ],
    [
      'Root',
      'Das Erlangen von Administrator-Rechten auf einem Android-Gerät. Rooting ermöglicht vollen Systemzugriff, erhöht aber gleichzeitig die Angriffsfläche.',
    ],
    [
      'Mobile Device Management (MDM)',
      'Eine Lösung zur zentralen Verwaltung, Überwachung und Absicherung mobiler Endgeräte in Unternehmen. MDM erlaubt Richtliniendurchsetzung und Fernlöschung.',
    ],
    [
      'OWASP Mobile Top 10',
      'Eine Liste der zehn kritischsten Sicherheitsrisiken für mobile Anwendungen, veröffentlicht vom Open Web Application Security Project.',
    ],
    [
      'Certificate Pinning',
      'Eine Technik, bei der eine App nur bestimmte, fest hinterlegte Zertifikate akzeptiert. Dadurch werden Man-in-the-Middle-Angriffe erschwert.',
    ],
    [
      'Frida',
      'Ein dynamisches Instrumentierungstoolkit, mit dem sich Apps zur Laufzeit analysieren und manipulieren lassen. Frida wird häufig für Mobile-Security-Tests eingesetzt.',
    ],
    [
      'ADB',
      'Android Debug Bridge – ein Kommandozeilen-Tool zur Kommunikation mit Android-Geräten. ADB ermöglicht die Installation von Apps, Logauswertung und Shell-Zugriff.',
    ],
  ]),

  // ── 12. Wireless/RF (~8) ────────────────────────────────────────────────
  ...entries('Wireless/RF', [
    [
      'WPA3',
      'Die dritte Generation des Wi-Fi Protected Access-Standards. WPA3 bietet verbesserte Verschlüsselung und schützt besser gegen Offline-Wörterbuchangriffe.',
    ],
    [
      'Evil Twin',
      'Ein gefälschter WLAN-Access-Point, der einen legitimen Hotspot imitiert. Verbundene Geräte senden ihren Datenverkehr unbemerkt über das System des Angreifers.',
    ],
    [
      'Deauthentication Attack',
      'Ein Angriff, bei dem gefälschte Deauthentifizierungs-Pakete gesendet werden, um Clients von einem WLAN-Netzwerk zu trennen. Wird oft als Vorstufe für weitere Angriffe genutzt.',
    ],
    [
      'Aircrack-ng',
      'Eine Open-Source-Suite zum Testen der WLAN-Sicherheit. Aircrack-ng kann Pakete mitschneiden, WEP- und WPA-Schlüssel knacken und Netzwerke analysieren.',
    ],
    [
      'Bluetooth Sniffing',
      'Das Abfangen und Analysieren von Bluetooth-Kommunikation, um Schwachstellen aufzudecken oder übertragene Daten mitzulesen.',
    ],
    [
      'RFID',
      'Radio-Frequency Identification – eine Technologie zur kontaktlosen Identifikation über Funkwellen. RFID-Chips werden in Zugangskarten und Reisepässen verwendet und können geklont werden.',
    ],
    [
      'Wardriving',
      'Das systematische Suchen nach WLAN-Netzwerken durch Fahren mit einem Fahrzeug, ausgestattet mit Laptop und WLAN-Antenne, um Netzwerke zu kartieren und Schwachstellen zu finden.',
    ],
    [
      'Rogue Access Point',
      'Ein unautorisierter WLAN-Zugangspunkt, der in ein Netzwerk eingebracht wird. Er kann von Angreifern genutzt werden, um den Datenverkehr abzufangen oder interne Systeme anzugreifen.',
    ],
  ]),

  // ── 13. Active Directory (~10) ──────────────────────────────────────────
  ...entries('Active Directory', [
    [
      'Domain Controller',
      'Ein Server, der Authentifizierung und Autorisierung in einem Active-Directory-Netzwerk zentral verwaltet. Er speichert die AD-Datenbank und bearbeitet Anmeldeanfragen.',
    ],
    [
      'Kerberos',
      'Ein netzwerkbasiertes Authentifizierungsprotokoll, das Tickets verwendet, um Benutzer sicher zu identifizieren, ohne Passwörter im Klartext zu übertragen.',
    ],
    [
      'LDAP',
      'Das Lightweight Directory Access Protocol dient dem Zugriff auf und der Verwaltung von Verzeichnisdiensten. In Active Directory wird LDAP für Abfragen und Änderungen genutzt.',
    ],
    [
      'Group Policy',
      'Ein Mechanismus in Active Directory, mit dem Administratoren Konfigurationseinstellungen zentral für Benutzer und Computer in der Domäne festlegen können.',
    ],
    [
      'BloodHound',
      'Ein Open-Source-Tool, das Active-Directory-Beziehungen grafisch darstellt und Angriffspfade zu privilegierten Konten automatisch identifiziert.',
    ],
    [
      'Pass-the-Hash',
      'Eine Angriffstechnik, bei der der NTLM-Hash eines Passworts anstelle des Klartextpassworts zur Authentifizierung verwendet wird.',
    ],
    [
      'Golden Ticket',
      'Ein gefälschtes Kerberos-Ticket-Granting-Ticket (TGT), das mit dem Hash des krbtgt-Kontos erstellt wird. Es gewährt nahezu unbegrenzten Zugriff auf die gesamte Domäne.',
    ],
    [
      'Kerberoasting',
      'Ein Angriff, bei dem Service-Tickets für SPN-aktivierte Konten angefordert und offline geknackt werden, um Passwörter von Dienstkonten zu erlangen.',
    ],
    [
      'NTLM',
      'Ein älteres Authentifizierungsprotokoll von Microsoft, das Challenge-Response-Verfahren nutzt. NTLM gilt als unsicher und sollte durch Kerberos ersetzt werden.',
    ],
    [
      'Service Principal Name (SPN)',
      'Ein eindeutiger Bezeichner für eine Dienstinstanz in Active Directory, der die Zuordnung eines Dienstes zu einem Anmeldekonto für die Kerberos-Authentifizierung ermöglicht.',
    ],
  ]),

  // ── 14. Blockchain/Crypto Tracing (~8) ──────────────────────────────────
  ...entries('Blockchain/Crypto Tracing', [
    [
      'Blockchain',
      'Eine dezentrale, unveränderliche Datenstruktur, in der Transaktionen in verketteten Blöcken gespeichert werden. Jeder Block enthält den Hash des vorherigen Blocks.',
    ],
    [
      'Wallet',
      'Eine Software oder ein Gerät zur Verwaltung kryptografischer Schlüssel für Kryptowährungen. Die Wallet speichert nicht die Coins selbst, sondern den privaten Schlüssel.',
    ],
    [
      'Transaction Hash',
      'Eine eindeutige Kennung einer Blockchain-Transaktion, die durch Hashing aller Transaktionsdaten erzeugt wird. Er dient zur Rückverfolgung und Verifizierung.',
    ],
    [
      'Chainalysis',
      'Ein führendes Unternehmen und Tool für die Blockchain-Analyse und Rückverfolgung von Kryptowährungstransaktionen, insbesondere im Bereich der Strafverfolgung.',
    ],
    [
      'Mixer/Tumbler',
      'Ein Dienst, der Kryptowährungstransaktionen verschleiert, indem er Coins mehrerer Benutzer mischt. Ziel ist die Erschwerung der Rückverfolgbarkeit.',
    ],
    [
      'Smart Contract',
      'Ein selbstausführendes Programm auf einer Blockchain, das Vertragsbedingungen automatisch durchsetzt. Smart Contracts können Schwachstellen enthalten, die zu erheblichen finanziellen Verlusten führen.',
    ],
    [
      'DeFi',
      'Decentralized Finance – dezentrale Finanzdienstleistungen auf Blockchain-Basis ohne traditionelle Vermittler wie Banken. DeFi-Protokolle sind häufige Ziele von Cyberangriffen.',
    ],
    [
      'Blockchain Explorer',
      'Ein webbasiertes Tool zum Durchsuchen und Analysieren von Blockchain-Daten wie Transaktionen, Adressen und Blöcken. Beispiele sind Etherscan und Blockchain.com.',
    ],
  ]),

  // ── 15. AML/Compliance (~8) ─────────────────────────────────────────────
  ...entries('AML/Compliance', [
    [
      'Anti-Money Laundering (AML)',
      'Maßnahmen und Vorschriften zur Verhinderung von Geldwäsche. AML-Programme umfassen Identitätsprüfung, Transaktionsüberwachung und Meldepflichten.',
    ],
    [
      'Know Your Customer (KYC)',
      'Der Prozess der Identitätsprüfung von Kunden, bevor eine Geschäftsbeziehung eingegangen wird. KYC ist eine zentrale Anforderung im AML-Regelwerk.',
    ],
    [
      'Suspicious Activity Report (SAR)',
      'Eine Meldung über verdächtige Transaktionen, die Finanzinstitute bei der zuständigen Behörde einreichen müssen, wenn Verdacht auf Geldwäsche oder Terrorismusfinanzierung besteht.',
    ],
    [
      'FATF',
      'Die Financial Action Task Force ist ein internationales Gremium, das Standards zur Bekämpfung von Geldwäsche und Terrorismusfinanzierung setzt. Ihre Empfehlungen sind weltweit richtungsweisend.',
    ],
    [
      'Travel Rule',
      'Eine FATF-Empfehlung, die Finanzdienstleister – einschließlich Krypto-Unternehmen – verpflichtet, bei Transaktionen Absender- und Empfängerinformationen weiterzuleiten.',
    ],
    [
      'Compliance',
      'Die Einhaltung gesetzlicher Vorschriften, Regulierungen und interner Richtlinien. Im Finanz- und Cyberbereich umfasst Compliance u.\u202fa. Datenschutz, AML und Informationssicherheit.',
    ],
    [
      'Due Diligence',
      'Die sorgfältige Prüfung und Bewertung von Geschäftspartnern, Kunden oder Transaktionen zur Identifizierung von Risiken wie Geldwäsche, Betrug oder Sanktionsverstößen.',
    ],
    [
      'Sanctions Screening',
      'Die systematische Überprüfung von Personen und Organisationen gegen internationale Sanktionslisten, um sicherzustellen, dass keine Geschäfte mit sanktionierten Parteien getätigt werden.',
    ],
  ]),

  // ── 16. Threat Intelligence (~10) ───────────────────────────────────────
  ...entries('Threat Intelligence', [
    [
      'Indicator of Compromise (IoC)',
      'Ein beobachtbares Merkmal, das auf eine Kompromittierung hindeutet, z.\u202fB. verdächtige IP-Adressen, Datei-Hashes oder Domänennamen.',
    ],
    [
      'MITRE ATT&CK',
      'Ein umfassendes Wissensrahmenwerk, das Taktiken, Techniken und Verfahren (TTPs) von Angreifern systematisch kategorisiert. Es dient als Grundlage für Bedrohungsmodellierung und Verteidigung.',
    ],
    [
      'Threat Actor',
      'Eine Person, Gruppe oder Organisation, die Cyberangriffe durchführt. Threat Actors werden nach Motivation (finanziell, politisch, Spionage) und Fähigkeiten klassifiziert.',
    ],
    [
      'APT',
      'Advanced Persistent Threat – eine langfristig angelegte, hochentwickelte Angriffskampagne, die meist von staatlich unterstützten Gruppen durchgeführt wird und auf bestimmte Ziele fokussiert ist.',
    ],
    [
      'Cyber Kill Chain',
      'Ein von Lockheed Martin entwickeltes Modell, das Cyberangriffe in sieben Phasen unterteilt – von der Aufklärung bis zur Zielerreichung. Es hilft bei der strukturierten Verteidigung.',
    ],
    [
      'STIX/TAXII',
      'Standardisierte Formate und Protokolle für den Austausch von Bedrohungsinformationen. STIX beschreibt Bedrohungsdaten strukturiert, TAXII definiert den Transportmechanismus.',
    ],
    [
      'Threat Feed',
      'Ein kontinuierlicher Strom maschinenlesbarer Bedrohungsdaten (z.\u202fB. IoCs), der in Sicherheitssysteme integriert wird, um bekannte Bedrohungen automatisch zu erkennen.',
    ],
    [
      'Dark Web',
      'Ein Teil des Internets, der nur über spezielle Software wie Tor erreichbar ist. Im Dark Web werden u.\u202fa. gestohlene Daten, Exploits und illegale Dienstleistungen gehandelt.',
    ],
    [
      'TTPs',
      'Tactics, Techniques and Procedures – die Verhaltensmuster und Methoden von Angreifern. TTPs sind stabiler als IoCs und ermöglichen eine tiefgreifende Bedrohungsanalyse.',
    ],
    [
      'Diamond Model',
      'Ein analytisches Modell für Cyber-Bedrohungen, das vier Kernelemente verknüpft: Angreifer, Infrastruktur, Fähigkeit und Opfer. Es unterstützt die strukturierte Analyse von Angriffen.',
    ],
  ]),

  // ── 17. Allgemein (~12) ─────────────────────────────────────────────────
  ...entries('Allgemein', [
    [
      'Zero-Day',
      'Eine Schwachstelle, die dem Hersteller noch nicht bekannt ist und für die es noch keinen Patch gibt. Zero-Day-Exploits sind besonders gefährlich, da kein Schutz existiert.',
    ],
    [
      'CVE',
      'Common Vulnerabilities and Exposures – ein standardisiertes System zur eindeutigen Identifizierung und Katalogisierung öffentlich bekannter Sicherheitslücken.',
    ],
    [
      'Patch Management',
      'Der systematische Prozess der Identifizierung, Beschaffung, Prüfung und Installation von Software-Updates zur Behebung von Sicherheitslücken.',
    ],
    [
      'Incident Response',
      'Der strukturierte Prozess zur Erkennung, Eindämmung, Beseitigung und Nachbereitung von Sicherheitsvorfällen. Ein guter IR-Plan minimiert den Schaden und verkürzt die Wiederherstellungszeit.',
    ],
    [
      'SIEM',
      'Security Information and Event Management – eine Plattform, die Sicherheitsereignisse aus verschiedenen Quellen zentral sammelt, korreliert und analysiert, um Bedrohungen zu erkennen.',
    ],
    [
      'SOC',
      'Security Operations Center – eine zentrale Einrichtung, in der ein Sicherheitsteam rund um die Uhr Bedrohungen überwacht, erkennt und darauf reagiert.',
    ],
    [
      'Red Team',
      'Ein offensives Sicherheitsteam, das reale Angriffe simuliert, um die Verteidigungsfähigkeiten einer Organisation zu testen und Schwachstellen aufzudecken.',
    ],
    [
      'Blue Team',
      'Ein defensives Sicherheitsteam, das für die Überwachung, Erkennung und Abwehr von Cyberangriffen zuständig ist. Das Blue Team betreibt typischerweise das SOC.',
    ],
    [
      'Purple Team',
      'Ein kollaborativer Ansatz, bei dem Red Team und Blue Team zusammenarbeiten, um Angriffstechniken und Verteidigungsmaßnahmen gemeinsam zu verbessern.',
    ],
    [
      'Attack Surface',
      'Die Gesamtheit aller Angriffspunkte, über die ein unautorisierter Zugriff auf ein System möglich ist. Die Minimierung der Angriffsfläche ist ein zentrales Sicherheitsprinzip.',
    ],
    [
      'Vulnerability',
      'Eine Schwachstelle in Software, Hardware oder Prozessen, die von Angreifern ausgenutzt werden kann. Schwachstellen werden nach Schweregrad (z.\u202fB. CVSS) bewertet.',
    ],
    [
      'Exploit',
      'Ein Programm, Skript oder eine Technik, die eine Schwachstelle gezielt ausnutzt, um unautorisierten Zugriff oder Kontrolle über ein System zu erlangen.',
    ],
  ]),
];
