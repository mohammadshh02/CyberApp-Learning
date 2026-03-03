# ZTNA Competitive Intelligence Report: sayTEC VPSC vs. The Market
## Brutally Honest Assessment | February 2026

---

## EXECUTIVE SUMMARY

sayTEC VPSC occupies an extreme niche in the ZTNA market. It is a micro-vendor (~10-38 employees, ~$6M revenue) competing against multi-billion-dollar global players. Its "Made in Germany" and USB-hardware-token approach provides genuine differentiation for a narrow set of sovereignty-conscious buyers, but the product faces serious structural disadvantages in market presence, ecosystem maturity, scalability, and modern authentication alignment. This report provides an unvarnished competitive assessment.

---

## 1. TOP ZTNA VENDORS: THE COMPETITIVE LANDSCAPE

### Tier 1 -- Market Leaders (Gartner/Forrester recognized)

| Vendor | Product | Revenue Scale | Gartner/Forrester | Pricing (per user/month) | Key Strength |
|--------|---------|--------------|-------------------|--------------------------|-------------|
| **Zscaler** | Private Access (ZPA) | ~$2.6B+ total rev (FY2025) | SSE Leader; Forrester Wave evaluated | $8-15 | World's most deployed ZTNA; cloud-native; SAP integration (Jan 2025) |
| **Palo Alto Networks** | Prisma Access | ~$7B+ total rev | SSE Leader; Forrester evaluated | $14-22 | Best convergence story (NGFW + SASE + ZTNA); agent + agentless |
| **Netskope** | Private Access | Well-funded private | SSE Leader | Custom (enterprise) | Data-centric; strongest DLP/CASB integration |
| **Microsoft** | Entra Private Access | Bundled with E5 | Forrester Wave Leader (Q3 2025) | Bundled | Massive installed base; deep Entra ID integration |
| **Cloudflare** | Access / Zero Trust | ~$1.7B+ rev | Forrester evaluated | Free (up to 50 users); $7/user/mo paid | Free tier disruption; fastest edge network; developer-friendly |
| **Fortinet** | Universal ZTNA | ~$5.5B+ rev | **Only** Gartner Peer Insights Customers' Choice for ZTNA 2025 (4.9/5.0, 235 reviews) | $8-14 (FortiSASE) | Included free with FortiGate; existing Forti estates get ZTNA at no added cost |
| **Check Point** | Harmony SASE | ~$2.3B+ rev | Forrester Wave Leader (Q3 2025) | Custom | AI-first strategy; unified management |
| **Cisco** | Secure Access | ~$57B total rev | Forrester evaluated | Custom (enterprise) | Massive enterprise footprint; Duo MFA integration |

### Tier 2 -- Challengers / Specialists

| Vendor | Product | Pricing | Key Differentiator |
|--------|---------|---------|-------------------|
| **Appgate** | SDP | Enterprise custom | Single-packet authorization; cloaked infrastructure; strong government/defense |
| **Twingate** | Twingate | Competitive (SMB-friendly) | Developer UX; VPN replacement for backend systems; easy deployment |
| **Tailscale** | Tailscale | Free personal; paid team | WireGuard-based mesh VPN; zero-config; beloved by developers |
| **Cato Networks** | Cato SASE Cloud | Custom | Full SASE convergence; Gartner SASE MQ Leader |
| **Akamai** | Enterprise Application Access | Custom | Forrester: highest scores for segmentation; massive CDN backbone |

### Where sayTEC VPSC Sits

**sayTEC is not in any Gartner or Forrester evaluation. Period.** It does not appear in the Gartner Peer Insights ZTNA category, the Gartner SSE Magic Quadrant, the Forrester Wave for Zero Trust Platforms, or any major analyst report. This is the single most damaging competitive fact for enterprise sales.

---

## 2. EUROPEAN / GERMAN ZTNA ALTERNATIVES (Critical Finding)

This is where sayTEC's marketing claims face the most direct challenge. **There ARE other European/German alternatives**, and some are significantly more credible:

### genua GmbH (Germany) -- THE Major German Competitor

- **Parent company**: Bundesdruckerei Group (German federal printing office -- government-owned)
- **Founded**: 1992 (23 years older than sayTEC)
- **Employees**: 400+ (10-40x larger than sayTEC)
- **Key Products**:
  - **genuconnect**: BSI-approved VPN client for VS-NfD (classified data), NATO RESTRICTED, EU RESTRICTED
  - **genugate**: Only BSI-certified "highly resistant" two-tier firewall (CC EAL4+)
  - **genusecure Suite**: VS-NfD mobile workplace (VPN + disk encryption + smart card)
- **Bundeswehr deployment**: BWI GmbH purchased enterprise license for genuconnect -- up to **250,000 end users** for German armed forces
- **BSI certifications**: Multiple CC EAL4+ certifications, BSI approvals for classified networks
- **Verdict**: genua is the 800-pound gorilla of German sovereign security. They have actual government certifications, actual large-scale military deployments, and are owned by the German state. **sayTEC's "Made in Germany" claim is valid but far less credentialed compared to genua.**

### Other European Players

| Vendor | Country | Focus | Notes |
|--------|---------|-------|-------|
| **Jimber** | Belgium | European SASE | Sovereignty-first; NIS2 compliance; case studies with Belgian government and wealth managers; 58% cost reduction claims |
| **Open Systems** | Switzerland | Managed SASE | Swiss Made Software certified; acquired by Swiss Post (Sep 2024); politically neutral jurisdiction; not subject to EU/US extraterritorial laws |
| **NordLayer** | Lithuania/US | SASE/ZTNA | Started as NordVPN Teams; $8/user/month; relocated HQ to US in 2020 (undermines sovereignty argument) |
| **Barracuda CloudGen Access** | US (acquired Fyde) | ZTNA | Not truly European despite some EU presence |

### Honest Assessment of European Landscape

The European ZTNA market is **thin but not empty**. sayTEC is not unique in claiming German/EU sovereignty. genua is objectively the dominant German sovereign security vendor with credentials sayTEC cannot match (BSI certifications for classified data, Bundeswehr-scale deployments, government ownership). For sovereignty-conscious buyers who need ZTNA specifically, the competitive set is:

1. **genua** (German government-grade, but more traditional VPN/firewall than modern ZTNA)
2. **Open Systems** (Swiss sovereign, managed SASE, now Swiss Post-backed)
3. **Jimber** (Belgian, purpose-built for EU sovereignty + NIS2)
4. **sayTEC** (German, USB-hardware approach, micro-vendor)

---

## 3. MARKET SHARE DATA

### Overall ZTNA Market

- **Total market**: $1.34 billion in 2025, projected to $4.18 billion by 2030 (CAGR 25.5%)
- **Top 5 vendors** (Palo Alto, Zscaler, Cloudflare, Cisco, Microsoft): ~25-30% combined market share
- **The market is fragmented** -- even the leaders collectively hold less than a third

### Individual Vendor Scale (for context vs. sayTEC's ~$6M)

| Vendor | Annual Revenue | ZTNA Market Position |
|--------|---------------|---------------------|
| Zscaler | ~$2.6B (FY2025 run rate) | Largest pure-play ZTNA; "most deployed" |
| Palo Alto Networks | ~$7B+ | Platform play; ZTNA within SASE |
| Cloudflare | ~$1.7B+ | Disrupting with free tier |
| Fortinet | ~$5.5B+ | Unique: ZTNA free with FortiGate |
| **sayTEC** | **~$6M** | **Not ranked. Not tracked. Invisible to analysts.** |

**The scale gap is staggering.** Zscaler's revenue is approximately 430x sayTEC's entire company revenue. sayTEC is not competing in the same market -- it is operating in a micro-niche.

---

## 4. GARTNER / FORRESTER RATINGS

### Gartner

- **SSE Magic Quadrant Leaders (2024-2025)**: Zscaler, Netskope, Palo Alto Networks
- **SASE Magic Quadrant Leaders**: Palo Alto, Cato Networks, Netskope
- **Peer Insights ZTNA Customers' Choice 2025**: Fortinet (only vendor; 4.9/5.0, 235 reviews, 97% recommend)
- **sayTEC**: Not evaluated. Not listed. Zero reviews on Gartner Peer Insights.

### Forrester

- **Wave: Zero Trust Platforms, Q3 2025**: Evaluated 10 vendors -- Microsoft, Check Point, Akamai, Palo Alto, Zscaler, Cisco, Cloudflare, Fortinet, Broadcom, Trend Micro
  - **Leaders**: Microsoft (#1 in strategy), Check Point, others
  - **sayTEC**: Not evaluated. Not mentioned.

### IT-Administrator Magazin (Germany)

- The only known professional review of sayTRUST VPSC
- **Verdict**: Generally positive; praised the separation of configuration from the end device
- **Noted limitation**: USB stick deployment needed revision for self-service capability
- **Context**: This is a single trade magazine review, not an independent analyst evaluation

### What This Means

Enterprise buyers who follow analyst guidance (which is most large enterprises) will never encounter sayTEC VPSC in their evaluation process. It is invisible to the standard procurement workflow.

---

## 5. PRICING COMPARISONS

| Vendor | Model | Price Range | Notes |
|--------|-------|------------|-------|
| Cloudflare Access | Per user/month | **FREE** (up to 50 users); $7/user/mo | Market-disrupting; includes basic ZTNA |
| Fortinet ZTNA | Bundled with FortiGate | **$0 incremental** for existing customers; $8-14/user/mo for FortiSASE | Devastating for small vendors -- ZTNA is a checkbox feature |
| NordLayer | Per user/month | $8/user/mo | Budget-friendly SMB option |
| Zscaler ZPA | Per user/month | $8-15/user/mo base; $250K-400K/yr typical enterprise | Scales with modules (DLP, CASB, Browser Isolation) |
| Twingate | Per user/month | Competitive (SMB) | Easy setup; developer-focused |
| Tailscale | Per user/month | Free personal; paid teams | WireGuard-based; zero-config |
| Palo Alto Prisma | Per user/month | $14-22/user/mo | Premium pricing; full SASE platform |
| Cisco Secure Access | Enterprise contract | Custom | Large deals; Duo bundling |
| **sayTEC VPSC** | **Appliance + USB tokens** | **Not publicly listed** | **Hardware cost + per-token cost + server license = higher TCO for many scenarios** |

### Pricing Reality Check for sayTEC

The ZTNA market is experiencing severe price compression:
- **Cloudflare gives ZTNA away free** for small deployments
- **Fortinet includes ZTNA at no extra cost** with FortiGate purchases
- **Tailscale and Twingate** offer developer-friendly free/cheap tiers

sayTEC's model requires purchasing physical hardware (USB tokens, potentially appliances), which creates:
1. **Higher upfront cost** vs. cloud-native SaaS
2. **Logistics overhead** (shipping, replacing lost tokens, inventory management)
3. **Scaling friction** (need to procure and ship physical tokens for each new user)

---

## 6. sayTEC / VPSC CRITICISMS AND WEAKNESSES

### What Independent Sources Say

**IT-Administrator Magazin review** (the only known professional test):
- Positive overall, but noted that USB stick deployment process needed improvement
- Future versions planned to enable self-service USB provisioning (acknowledging the current process was cumbersome)

**General criticisms found in market research** (attributed to the traditional VPN/hardware token model that VPSC uses):
- "Difficult or impossible to integrate on clients"
- "Cumbersome hardware additionally required"
- "Connections that are too slow"

### Structural Weaknesses (Honest Assessment)

1. **No analyst coverage**: Zero presence in Gartner, Forrester, or IDC evaluations. For enterprise procurement, this is effectively disqualifying.

2. **Micro-vendor risk**: ~10-38 employees, ~$6M revenue. Enterprise buyers will question:
   - Business continuity (what if sayTEC AG goes bankrupt?)
   - Development velocity (can a team this small keep up with threat evolution?)
   - Support coverage (24/7 global support with <40 employees?)

3. **Physical token logistics**: In a post-COVID remote-first world, requiring physical USB tokens for every user creates:
   - Onboarding delays (ship token before employee can work)
   - Loss/damage replacement lag
   - International shipping complications
   - Inventory management burden

4. **Limited ecosystem**: No known integrations with major SIEM, SOAR, IAM, or MDM platforms. Modern ZTNA solutions integrate with Okta, Azure AD/Entra, CrowdStrike, Splunk, etc.

5. **Platform lock-in**: The USB approach ties users to physical hardware from a single vendor. FIDO2/passkeys are open standards supported by dozens of vendors.

6. **No cloud-native architecture**: In a market moving toward cloud-delivered SASE, a hardware-appliance + USB-token model looks architecturally outdated to many buyers.

7. **Opaque pricing**: No public pricing makes comparison difficult and creates friction in procurement.

8. **Limited customer references**: No visible case studies at enterprise scale. Claims of "intelligence services" as customers are unverifiable by design.

---

## 7. USB HARDWARE TOKEN vs. MODERN FIDO2 / PASSWORDLESS

This is perhaps the most critical architectural comparison.

### sayTEC VPSC Approach
- Proprietary USB stick containing client software
- Boots/runs from encrypted RAM on the USB device
- 2FA/3FA available on the token
- No traces left on host PC after removal
- Proprietary ecosystem -- works only with sayTEC infrastructure

### Modern FIDO2 / Passkey Approach
- **Open standard** (FIDO Alliance -- Google, Microsoft, Apple, Yubico)
- Phishing-resistant by design (cryptographic binding to origin)
- Hardware keys (YubiKey, Titan) OR software passkeys (synced via cloud)
- Built into all major OS (Windows, macOS, iOS, Android) and browsers
- AAL3 compliance achievable with hardware FIDO2 keys
- Works with ANY service that supports WebAuthn

### Head-to-Head Comparison

| Criterion | sayTEC VPSC USB Token | FIDO2 / YubiKey / Passkeys |
|-----------|----------------------|---------------------------|
| **Open standard** | No (proprietary) | Yes (FIDO Alliance) |
| **Phishing resistance** | Partial (USB required, but not cryptographically origin-bound) | Yes (cryptographic origin binding) |
| **Vendor lock-in** | High (sayTEC only) | Low (multi-vendor) |
| **OS/browser support** | Requires sayTEC client on USB | Native in all major OS/browsers |
| **User experience** | Plug in USB, authenticate, use menu | Tap key or use biometric |
| **Remote onboarding** | Must ship physical USB | Can enroll remotely (passkeys) or ship standard key |
| **Compliance (AAL3)** | No NIST AAL certification found | AAL3 with hardware FIDO2 + FIPS 140 |
| **Clean PC concept** | Yes (runs from RAM, no traces) | Not applicable (different model) |
| **Cost per token** | Proprietary (not public) | YubiKey 5: ~$50; Passkeys: $0 |
| **Ecosystem** | sayTEC only | Okta, Azure AD, Google, AWS, thousands more |
| **Life cycle management** | Unknown | FIDO2 has LCM limitations vs. PKI, but improving |

### The "Clean PC" Argument

sayTEC's strongest unique claim is the "no traces on the host PC" concept -- the USB stick runs the entire client from encrypted RAM. This IS a genuine security property that FIDO2 alone does not provide. However:

- Modern ZTNA solutions achieve similar isolation through **browser isolation** (Zscaler, Cloudflare) or **virtual desktop** approaches
- **Clientless ZTNA** (Palo Alto, Zscaler, Cloudflare) provides access through a browser with no local client at all
- The threat model this addresses (compromised endpoint data remnants) is increasingly handled by **EDR solutions** (CrowdStrike, SentinelOne) and **disk encryption** (BitLocker, FileVault)

### Verdict on Token Approach

The proprietary USB token approach is **architecturally dated**. The security industry has converged on FIDO2/passkeys as the standard for phishing-resistant authentication, with backing from every major platform vendor. sayTEC's approach provides a legitimate "air-gapped client" benefit, but this specific benefit is increasingly achievable through other means (browser isolation, clientless access, virtual desktops) without the logistical burden of proprietary hardware tokens.

---

## 8. THE "0 CVE" CLAIM: HONEST ANALYSIS

### The Claim
sayTEC markets VPSC as having zero known CVEs (Common Vulnerabilities and Exposures).

### Why This Claim is Problematic

**1. Security by Obscurity Concern**

As The New Stack article "Cure Your Zero CVE Hangover With Transparency" states: "Achieving zero CVEs is statistically impossible, and trying to do it obscures the truth of how vulnerable you are."

The zero-CVE claim is almost certainly a function of:
- **Tiny install base**: Few deployments = few security researchers examining the product
- **Closed source**: Proprietary code not subject to community audit
- **Low profile**: Not a target for bug bounty hunters or academic security researchers
- **No CVE tracking infrastructure**: Small vendors often lack formal vulnerability disclosure processes

**2. Comparison with Scrutinized Software**

OpenSSL -- one of the most audited cryptographic libraries on earth, underpinning most internet encryption -- regularly has new vulnerabilities discovered. Twelve zero-day vulnerabilities were recently disclosed in a single round. If OpenSSL cannot achieve "zero CVEs" with thousands of security researchers examining it, a closed-source product from a micro-vendor with minimal external scrutiny almost certainly has undiscovered vulnerabilities -- they just have not been found (or reported) yet.

**3. The Absence of Evidence is Not Evidence of Absence**

Products with "zero CVEs" typically fall into two categories:
- **Category A**: Extremely well-designed, formally verified, minimal attack surface (e.g., seL4 microkernel). These undergo extensive formal methods and public audits.
- **Category B**: Products that nobody has seriously tried to break because they are too small/obscure to attract attention.

sayTEC VPSC is clearly in Category B. There is no evidence of:
- Independent security audits by recognized firms (NCC Group, Cure53, Trail of Bits)
- Bug bounty programs
- Formal verification
- Common Criteria evaluation (unlike genua's CC EAL4+)
- BSI certification for classified use (unlike genua)
- Public vulnerability disclosure policy

**4. What "Zero CVE" Actually Signals to Security Professionals**

To informed buyers, a "zero CVE" claim from a small, closed-source vendor is a **red flag**, not a selling point. It suggests:
- Lack of transparency
- Lack of external security scrutiny
- Lack of mature vulnerability management processes
- Potential inability to handle vulnerability disclosure responsibly

**Contrast with Best Practice**: Major ZTNA vendors like Zscaler, Palo Alto, and Cloudflare actively publish CVEs, run bug bounty programs, and undergo regular third-party audits. Having CVEs is a sign of a **mature security posture**, not a weakness.

---

## COMPETITIVE POSITIONING MATRIX

```
                    HIGH SOVEREIGNTY / DATA CONTROL
                              |
                    genua     |     sayTEC VPSC
                   (DE/Gov)   |     (DE/Private)
                              |
    LARGE SCALE ------------- + ------------- SMALL/NICHE
                              |
         Zscaler/Palo Alto    |    Tailscale/Twingate
         Cloudflare/Fortinet  |    Jimber/Open Systems
                              |
                    LOW SOVEREIGNTY CONCERN
```

---

## BOTTOM LINE: COMPETITIVE THREATS TO sayTEC VPSC

### Existential Threats

1. **Cloudflare Access at $0/free tier**: Why would any cost-conscious SMB buy proprietary hardware when Cloudflare gives ZTNA away?
2. **Fortinet ZTNA at $0 incremental**: For existing Fortinet shops, ZTNA is already included
3. **genua genuconnect**: For German sovereignty buyers, genua has BSI certification, Bundeswehr deployment, and government ownership -- sayTEC cannot compete on credentials

### Serious Threats

4. **FIDO2/passkey adoption wave**: The entire industry is moving to open-standard passwordless authentication, making proprietary USB tokens look outdated
5. **SASE convergence**: Buyers increasingly want ZTNA as one component of a unified SASE platform, not a standalone point solution
6. **Analyst invisibility**: No Gartner/Forrester coverage means exclusion from enterprise shortlists

### Potential Advantages (Where sayTEC Could Win)

1. **Ultra-paranoid niche**: Organizations that want physical air-gapped client + German sovereignty + no cloud dependency
2. **Specific German public sector contracts**: Where "Made in Germany" procurement preferences exist (but genua is the stronger candidate)
3. **USB clean-PC use case**: Genuine unique feature for scenarios requiring zero-trace access from untrusted endpoints (though browser isolation is catching up)
4. **NIS2 compliance pressure**: European regulation creating demand for EU-sovereign solutions (but multiple competitors now serve this niche)

---

## RECOMMENDATIONS FOR HONEST ASSESSMENT

If you are evaluating sayTEC VPSC, ask these questions directly:

1. **"Can you provide reports from independent security audits by recognized firms?"** (e.g., Cure53, NCC Group, Trail of Bits)
2. **"What is your formal vulnerability disclosure policy?"**
3. **"How many security researchers have examined your codebase?"**
4. **"Do you have BSI certification for VS-NfD or any Common Criteria evaluation?"** (genua does)
5. **"What is your SLA for critical vulnerability patching?"**
6. **"How do you handle a scenario where a user loses their USB token at 11pm on a Friday and needs access for a Monday morning deadline?"**
7. **"What is your product roadmap for FIDO2/passkey support?"**
8. **"Can you provide 3 enterprise reference customers (>1000 users) we can speak with?"**
9. **"What happens to our access infrastructure if sayTEC AG ceases operations?"**
10. **"How does VPSC integrate with our existing IAM (Okta/Azure AD/etc.), SIEM, and EDR tools?"**

---

## SOURCES

- [Gartner Peer Insights: Zero Trust Network Access Reviews 2026](https://www.gartner.com/reviews/market/zero-trust-network-access)
- [Gartner SSE Magic Quadrant Analysis](https://www.bankinfosecurity.com/zscaler-netskope-palo-alto-top-sse-gartner-magic-quadrant-a-28565)
- [Forrester Wave: Zero Trust Platforms, Q3 2025](https://www.forrester.com/report/the-forrester-wave-tm-zero-trust-platforms-q3-2025/RES184512)
- [Microsoft Named Forrester Zero Trust Leader 2025](https://www.microsoft.com/en-us/security/blog/2025/07/10/forrester-names-microsoft-a-leader-in-the-2025-zero-trust-platforms-wave-report/)
- [Fortinet: Only Gartner Peer Insights Customers' Choice for ZTNA 2025](https://www.fortinet.com/blog/business-and-technology/foritnet-is-the-only-vendor-recognized-as-a-customer-choice-in-gartner-peer-insights-voc-for-ztna)
- [MarketsandMarkets: ZTNA Market $4.18B by 2030](https://www.marketsandmarkets.com/PressReleases/zero-trust-network-access-ztna.asp)
- [MarketsandMarkets: Top ZTNA Companies](https://www.marketsandmarkets.com/ResearchInsight/zero-trust-network-access-ztna-market.asp)
- [Zscaler Q2 FY2025 Financial Results](https://ir.zscaler.com/news-releases/news-release-details/zscaler-reports-second-quarter-fiscal-2025-financial-results)
- [IT-Administrator Magazin: sayTEC VPSC Test](https://www.it-administrator.de/Test-sayTEC-sayTRUST-VPSC)
- [sayTEC AG Company Profile (NorthData)](https://www.northdata.com/sayTEC%20AG,%20M%C3%BCnchen/HRB%20153821)
- [sayTEC AG Official Site](https://www.saytec.eu/en)
- [genua GmbH: IT Security Solutions Made in Germany](https://www.genua.eu/)
- [genua genuconnect Secures German Armed Forces](https://www.genua.eu/press-article/genua-vpn-software-client-genuconnect-secures-access-to-the-networks-of-the-german-armed-forces)
- [genua genugate BSI-Certified Firewall CC EAL4+](https://www.genua.eu/press-article/firewall-with-bsi-certified-patch-management-cc-eal4)
- [Jimber: European SASE Alternatives](https://jimber.io/blog/european-sase-alternatives-why-network-security-needs-the-same-sovereignty-shift/)
- [Open Systems: Swiss-Made Managed SASE](https://www.open-systems.com/blog/swiss-made-managed-sase/)
- [NordLayer Wikipedia](https://en.wikipedia.org/wiki/NordLayer)
- [Cloudflare Zero Trust Pricing](https://www.cloudflare.com/plans/zero-trust-services/)
- [Cloudflare Zero Trust Pricing Breakdown](https://controld.com/blog/cloudflare-zero-trust-pricing/)
- [Zscaler Alternatives 2025 (Pricing Benchmarks)](https://underdefense.com/blog/zscaler-alternatives-2025-9-serious-options-when-they-win/)
- [The New Stack: Cure Your Zero CVE Hangover](https://thenewstack.io/the-cure-for-your-zero-cve-hangover-is-transparency/)
- [Huntress: Security by Obscurity](https://www.huntress.com/cybersecurity-101/topic/what-is-security-by-obscurity)
- [FIDO Alliance: Passkeys](https://fidoalliance.org/passkeys/)
- [Yubico: FIDO2 Authentication](https://www.yubico.com/authentication-standards/fido2/)
- [ZTNA Vendor Directory](https://zerotrustnetworkaccess.info/)
- [NetworkWorld: ZTNA Buyer's Guide](https://www.networkworld.com/article/971137/who-is-selling-zero-trust-network-access-ztna-and-what-do-you-get.html)
- [Cato Networks SASE and ZTNA Leaders](https://www.channelfutures.com/sdn-sd-wan/cato-fortinet-among-sase-magic-quadrant-leaders)
- [PeerSpot: Appgate SDP vs Twingate](https://www.peerspot.com/products/comparisons/appgate-sdp_vs_twingate)
- [Tailscale vs Twingate Comparison](https://tailscale.com/compare/twingate)
