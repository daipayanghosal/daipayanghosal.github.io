/**
 * DAIPAYAN GHOSAL // PORTFOLIO
 * Interactive CLI Security Terminal Engine
 * Unix-styled command shell with history, tab autocomplete & rich outputs
 */

(function () {
  const COMMANDS = {
    help: () => `
Available Security Shell Commands:
  <span style="color:#00f0ff;">whoami</span>        - Display operator profile & current session identity
  <span style="color:#00f0ff;">skills</span>        - List core cybersecurity, AI governance & AppSec competencies
  <span style="color:#00f0ff;">exp</span>           - View professional timeline at Wipro Limited (IAM & AppSec)
  <span style="color:#00f0ff;">papers</span>        - List 4 published academic research papers in ML & Image Processing
  <span style="color:#00f0ff;">certs</span>         - Display verified security certifications (Saviynt, Qualys, CEH, SC-200)
  <span style="color:#00f0ff;">threat-model</span>  - Run automated OWASP LLM & IAM STRIDE risk checklist
  <span style="color:#00f0ff;">vuln</span>          - Inspect featured project: VulnInvestigator GenAI prototype
  <span style="color:#00f0ff;">personality</span>   - ♏ Scorpio • ENTJ-A 8w7 Commander psychometric profile
  <span style="color:#00f0ff;">spiderman</span>     - 🕷️ Spider-Sense anomaly detection & web-shooters
  <span style="color:#00f0ff;">thor</span>          - ⚡ Asgardian Mjolnir worthiness evaluation
  <span style="color:#00f0ff;">morph</span>         - 🦖 Power Rangers "It's Morphin' Time!" Dinozord matrix
  <span style="color:#00f0ff;">slytherin</span>     - 🐍 Hogwarts House allegiance (Ambition & Resourcefulness)
  <span style="color:#00f0ff;">barca</span>         - ⚽ Visca el Barça! (Blaugrana tiki-taka philosophy)
  <span style="color:#00f0ff;">f1</span>            - 🏎️ Mercedes-AMG Petronas F1 telemetry & Silver Arrows
  <span style="color:#00f0ff;">bong</span>          - ☕ Kolkata heritage, intellectual adda & cultural roots
  <span style="color:#00f0ff;">neofetch</span>      - Output cyber system configuration & telemetry specs
  <span style="color:#00f0ff;">matrix</span>        - Toggle interactive full-screen Matrix rain construct
  <span style="color:#00f0ff;">contact</span>       - Open encrypted communication channels (Email, WhatsApp, LinkedIn)
  <span style="color:#00f0ff;">view [mode]</span>   - Switch interface mode: <span style="color:#f59e0b;">view sentinel</span> or <span style="color:#f59e0b;">view executive</span>
  <span style="color:#00f0ff;">hack</span>          - Simulate cyber intrusion detection & guardrail containment
  <span style="color:#00f0ff;">clear</span>         - Clear console screen buffer
`,

    whoami: () => `
<span style="color:#00f0ff; font-weight:bold;">OPERATOR IDENTITY CARD:</span>
--------------------------------------------------
  Name:        Daipayan Ghosal
  Role:        Cybersecurity Analyst (IAM / AppSec / AI Governance)
  Archetype:   Scorpio ♏ • ENTJ-A (The Commander) • Enneagram 8w7 (The Challenger)
  Org:         Wipro Limited (Kolkata, IN)
  Focus:       AI Security, Saviynt IGA, Okta SSO, OWASP LLM Top 10, DevSecOps
  Alliances:   Slytherin 🐍 // FC Barcelona 🔵🔴 // Mercedes F1 🏎️ // Marvel (Spidey/Thor) ⚡ // Power Rangers 🦖
  Email:       daipayanghosal@outlook.com // daipayanghosal.dev@gmail.com
  Location:    Kolkata, West Bengal, India [UTC+5:30]
  Academic:    Published Researcher in Neural Computing & Computer Vision
  Status:      [ACTIVE] Available for high-impact security engineering roles
`,

    skills: () => `
<span style="color:#00f0ff; font-weight:bold;">TACTICAL SKILL MATRIX:</span>
--------------------------------------------------
  <span style="color:#f59e0b;">[AI Security & Governance]</span>
    • LLM & RAG Security, Prompt Injection Testing, AI Risk Assessments, OWASP Top 10 for LLMs
  <span style="color:#38bdf8;">[Identity & Access Governance]</span>
    • Saviynt EIC Level 200, Okta Identity Cloud, Enterprise IGA Architecture, Continuous Certification, SoD Mitigation, Dynamic RBAC/ABAC
  <span style="color:#10b981;">[AppSec & DevSecOps]</span>
    • Secure SDLC, Checkmarx SAST, CI/CD Pipeline Hardening, Code Reviews, Python Scripting
  <span style="color:#ec4899;">[Risk, Audit & SecOps]</span>
    • ITGC Compliance, SOX 404, EU AI Act Awareness, Qualys VMDR, Incident Remediation
`,

    exp: () => `
<span style="color:#00f0ff; font-weight:bold;">PROFESSIONAL FLIGHT LOG:</span>
--------------------------------------------------
  <span style="color:#10b981;">[Oct 2025 – Present]</span>  <span style="color:#ffffff; font-weight:bold;">Cyber Security Analyst (IAM)</span> — Wipro Limited
    • Enterprise Saviynt IGA governance, dynamic RBAC/ABAC role engineering, & Zero Standing Privileges
    • Authoritative Workday & Okta integration for event-driven identity lifecycle orchestration
    • ServiceNow workflow automation creating immutable ITGC Section 404 audit trails
    • Elimination of toxic access combinations & predictive Segregation of Duties (SoD) governance

  <span style="color:#38bdf8;">[June 2022 – Oct 2025]</span>  <span style="color:#ffffff; font-weight:bold;">Cyber Security Analyst (AppSec & DevSecOps)</span> — Wipro Limited
    • Application risk assessments during early onboarding & secure SDLC integration
    • Static Application Security Testing (SAST) with Checkmarx; vulnerability remediation
    • CI/CD pipeline security controls and developer security liaison
`,

    papers: () => `
<span style="color:#00f0ff; font-weight:bold;">PEER-REVIEWED RESEARCH PUBLICATIONS:</span>
--------------------------------------------------
  <span style="color:#f59e0b;">[1] Springer NCA (2023)</span>
      "Chaotic fitness-dependent quasi-reflected Aquila optimizer for superpixel based white blood cell segmentation"
      Neural Computing and Applications 35 (21), 15315-15332.
  <span style="color:#f59e0b;">[2] Springer ISAI (2022)</span>
      "Concrete Crack Segmentation Using Histogram Based Fast Clustering and Morphological Operators"
      Intl Symposium on Artificial Intelligence, 305-313.
  <span style="color:#f59e0b;">[3] PRIA (2022)</span>
      "A comparative study among clustering techniques for leaf segmentation in rosette plants"
      Pattern Recognition and Image Analysis 32 (1), 129-141.
  <span style="color:#f59e0b;">[4] SCSRC (2021)</span>
      "Leaf Segmentation of Rosette Plants using Rough K-Means in CIELab Color Space"
      Proc. of 2021 7th Student Computer Science Research Conference, 19.

  * Google Scholar Citations profile: <a href="https://scholar.google.com/citations?user=eT3-swYAAAAJ" target="_blank" style="color:#00f0ff;">https://scholar.google.com/citations?user=eT3-swYAAAAJ</a>
`,

    certs: () => `
<span style="color:#00f0ff; font-weight:bold;">VERIFIED CREDENTIALS:</span>
--------------------------------------------------
  [✓] Saviynt IGA Level 200 (Certified 2026)
  [✓] Saviynt IGA Level 100 (Certified 2026)
  [✓] Qualys Certified Specialist - VMDR (Qualys 2024)
  [✓] Certified Ethical Hacker (C|EH) (EC-Council 2023)
  [⟳] Microsoft Azure Security Operations Analyst (SC-200) [In Progress]
  [✓] Bachelor of Computer Applications (BCA) - Midnapore College (81.75%)
`,

    'threat-model': () => `
<span style="color:#ef4444; font-weight:bold;">[RUNNING STRIDE & OWASP LLM THREAT MODEL]</span>
..................................................
  [SCANNING] AI Model Boundary: Ollama / DeepSeek R1 Isolated Enclave
  [CHECK] Prompt Injection Vulnerability (LLM01): <span style="color:#10b981;">HARDENED via Semantic Filter</span>
  [CHECK] Insecure Output Handling (LLM02):       <span style="color:#10b981;">NEUTRALIZED via Sanitizer</span>
  [CHECK] Excessive Agency (LLM06):               <span style="color:#10b981;">RESTRICTED via Saviynt RBAC</span>
  [CHECK] IAM Orphan Accounts (ITGC-404):         <span style="color:#10b981;">ZERO ORPHANS (IGA Reconciled)</span>
  [AUDIT] Threat Score: 12/100 (LOW RISK). System perimeter verified.
`,

    vuln: () => `
<span style="color:#00f0ff; font-weight:bold;">[FEATURED REPO: VulnInvestigator 🔍]</span>
--------------------------------------------------
  Name:        VulnInvestigator (Evidence-Grounded GenAI)
  Live App:    <a href="https://daipayanghosal.github.io/VulnInvestigator" target="_blank" style="color:#10b981; font-weight:bold;">https://daipayanghosal.github.io/VulnInvestigator ↗</a>
  GitHub:      <a href="https://github.com/daipayanghosal/VulnInvestigator" target="_blank" style="color:#00f0ff;">https://github.com/daipayanghosal/VulnInvestigator.git</a>
  Description: Evidence-grounded cybersecurity prototype combining contextual vulnerability risk scoring (NVD, CISA KEV, MITRE ATT&CK) with verifiable threat investigation.
  Tech Stack:  Python 3.12, Pandas, NVD REST API v2, CISA KEV, MITRE ATT&CK STIX, Google Gemini / Ollama, Streamlit, SQLite
  Formula:     Risk = 0.35*(CVSS/10) + 0.30*KEV + 0.20*Criticality + 0.15*Exposure
  Evaluation:  Rank displacement evaluated via Kendall's τ & nDCG with hallucination validation.
`,

    neofetch: () => `
<span style="color:#00f0ff;">
    /\\        OS:         SENTINEL-X SecOps Kernel v4.12
   /  \\       Host:       Daipayan Ghosal Portfolio Workstation
  / /\\ \\      Kernel:     AI-Governance-IAM-Hybrid
 / ____ \\     Uptime:     4+ Years in Cyber Defense & Research
/_/    \\_\\    Shell:      zsh / sentinel-cli 2.4.0
              Resolution: 3840x2160 @ 144Hz (Retina HUD)
              Identity:   Saviynt IGA Level 200 // Okta IAM
              AppSec:     Checkmarx SAST // DevSecOps CI/CD
              ML Engine:  Ollama / DeepSeek R1 / Aquila Optimizer
              Archetype:  ♏ Scorpio • ENTJ-A (Commander) • 8w7
              House:      🐍 Slytherin (Emerald & Silver / Pure Ambition)
              Football:   🔵🔴 FC Barcelona (Més que un club / Tiki-Taka)
              Paddock:    🏎️ Mercedes-AMG Petronas F1 (Silver Arrows)
              Heroes:     🕷️ Spider-Man // ⚡ Thor (Mjolnir Worthy)
              Squad:      ⚡ Power Rangers ("It's Morphin' Time!")
              Roots:      ☕ Proud Bong (City of Joy // Kolkata Adda)
              Location:   Kolkata, West Bengal, India
</span>
`,

    slytherin: () => `
<span style="color:#22c55e; font-weight:bold;">
     ---_ ......._-_--.
    (|\\ /      / /| \\  \\
    /  /     .'  -=-'   )
   /  /   .'             )   HOUSE SLYTHERIN 🐍 // DUNGEON MISCHIEF
 _/  /   /   _..--.  .  /    ------------------------------------
( \\   ) / //' /  \\  \\  /     Motto:   "Ambition, Resourcefulness, Mischief"
 \\ '-.-' / ( (    )  ) /     Spells:  Colloshoo, Furnunculus, Dungbombs
  '-----'   \\ '._.'  /       Element: Water // Dungeon Enclave
             '-----'
</span>
<span style="color:#86efac;">"I solemnly swear that I am up to no good."</span>
  • <span style="color:#fde047;">Dungeon Mischief:</span> Deploying Colloshoo shoe-stick hexes and Polyjuice draughts
    to bypass strict prefect patrols and outmaneuver bureaucratic gatekeepers.
  • <span style="color:#22c55e;">Applied to SecOps:</span> Thinking like an adversary to expose structural flaws
    and zero-days before unauthorized actors exploit enterprise perimeters.
`,

    barca: () => `
<span style="color:#004d98; font-weight:bold;">[🔵🔴 FUTBOL CLUB BARCELONA // EL CLÁSICO TIKI-TAKA]</span>
--------------------------------------------------
  Camp Nou Faithful • Est. 1899 • Blaugrana Pride
  Tiki-Taka Midfield Dominance vs. Real Madrid:
    • <span style="color:#edbb00;">Evading Bellingham & Valverde:</span> One-touch rapid circulation bypassing 
      Jude Bellingham's sliding box-to-box press and Fede Valverde's 35 km/h counter-sprint.
    • <span style="color:#edbb00;">La Pausa & Line Breaking:</span> Pedri and Gavi dictating spatial tempo to slip through 
      Camavinga and Tchouaméni's double-pivot block.
    • <span style="color:#edbb00;">Lamine Yamal Flair:</span> Unlocking low blocks with audacious nutmegs and diagonal lasers.
  <span style="color:#edbb00; font-weight:bold;">Visca el Barça i Visca Catalunya! 🔵🔴</span>
`,

    f1: () => `
<span style="color:#00d2be; font-weight:bold;">[🏎️ MERCEDES-AMG PETRONAS FORMULA ONE TEAM]</span>
--------------------------------------------------
  Brackley & Brixworth Telemetry // 8x World Constructors' Champions
  Chassis:       Mercedes-AMG F1 W16 E Performance
  Power Unit:    1.6L Turbocharged Hybrid V6 (100% ERS Deploy)
  Radio Trans:   <span style="color:#ffffff;">"Hammer Time, Daipayan! Hunt down the McLaren, Ferrari, and Red Bull!"</span>
  Telemetry Ops:
    • <span style="color:#f97316;">McLaren Overtake:</span> Cleared Lando Norris in Curva Grande with superior DRS slipstream.
    • <span style="color:#ef4444;">Ferrari Overtake:</span> Dispatched Charles Leclerc into Ascari on late-braking balance.
    • <span style="color:#3b82f6;">Red Bull Overtake:</span> Passed Max Verstappen on the start-finish straight for P1 victory!
    • <span style="color:#00d2be;">Toto Wolff:</span> "We optimize every single millisecond. P1 is where we belong."
`,

    bong: () => `
<span style="color:#f43f5e; font-weight:bold;">[☕ PROUD BONG // কলকাতা (KOLKATA) CUISINE, MUSIC & CULTURE]</span>
--------------------------------------------------
  Anchored in the timeless cultural, musical, and culinary soul of Bengal:
    • <span style="color:#fbbf24;">Gastronomic Royalty:</span> Kolkata Mutton Biryani (with the revered slow-cooked Aloo & Dim),
      pungent Shorshe Ilish Bhapa, velvety Kosha Mangsho with hot Luchis, and terracotta Mishti Doi.
    • <span style="color:#38bdf8;">Musical Baseline:</span> The haunting depth of Rabindrasangeet, the pioneering rebellion of 
      Mohiner Ghoraguli & Bangla Rock (Fossils, Cactus), and the rustic acoustic drone of Baul Ektara.
    • <span style="color:#f43f5e;">The Kolkata Adda:</span> Unhurried, high-octane intellectual debates over steaming earthen
      clay cups of tea (*matir bhar er cha*) at College Street Boi Para, deconstructing philosophy and code.
    • <span style="color:#fbbf24;">Sharodotsav Energy:</span> The thunderous syncopation of Durga Puja Dhaak beats, Dhunuchi Naach,
      autumn skies with Kash Phool, and eternal football passion at Salt Lake Stadium.
`,

    personality: () => `
<span style="color:#c084fc; font-weight:bold;">[PSYCHOMETRIC PROFILE: SCORPIO ♏ • ENTJ-A 8w7]</span>
--------------------------------------------------
  • <span style="color:#38bdf8;">Sun Sign:</span> Scorpio ♏
    Relentless investigative depth, natural threat hunter, strategic secrecy, 
    uncompromising loyalty, and laser focus when debugging complex security vulnerabilities.
  • <span style="color:#38bdf8;">MBTI:</span> ENTJ-A (The Commander - Assertive)
    Decisive strategic leadership, long-range architectural vision, high efficiency,
    natural authority in enterprise governance, and zero fear of systemic complexity.
  • <span style="color:#38bdf8;">Enneagram:</span> Type 8w7 (The Challenger with 7-wing "The Maverick")
    Fierce protector of enterprise perimeters, direct communication, fearless in high-stakes
    audits, high energy, and relentlessly driven to build resilient, unbreachable systems.
`,

    spiderman: () => `
<span style="color:#ef4444; font-weight:bold;">[🕷️ YOUR FRIENDLY NEIGHBORHOOD CYBERSEC ANALYST]</span>
--------------------------------------------------
  Peter Parker's Principle Applied to IAM:
  <span style="color:#ffffff; font-weight:bold;">"WITH GREAT PRIVILEGE COMES GREAT ACCESS GOVERNANCE!"</span>
    • <span style="color:#38bdf8;">Spider-Sense:</span> Real-time instinctual anomaly detection firing off
      whenever prompt injection heuristics or unauthorized token escalations touch the perimeter.
    • <span style="color:#38bdf8;">Web-Shooters:</span> Instantaneous session quarantine trapping rogue API actors.
    • <span style="color:#38bdf8;">Resilience:</span> Getting knocked down by novel algorithmic zero-days
      and swinging right back up with automated patch orchestration.
`,

    thor: () => `
<span style="color:#38bdf8; font-weight:bold;">[⚡ GOD OF THUNDER // THE MJOLNIR AUDIT]</span>
--------------------------------------------------
  <span style="color:#fde047; font-weight:bold;">"WHOSOEVER HOLDS THIS HAMMER, IF HE BE WORTHY,</span>
  <span style="color:#fde047; font-weight:bold;">SHALL POSSESS THE POWER OF THOR!"</span>
  Asgardian Resiliency in Enterprise SecOps:
    • <span style="color:#ffffff;">The Worthiness Check:</span> Strict integrity verification. Only uncompromised,
      fully attested identity tokens may invoke root permissions.
    • <span style="color:#ffffff;">Lightning Strike:</span> Rapid automated static code analysis (SAST)
      vaporizing structural code flaws before reaching staging environments.
    • <span style="color:#ffffff;">Stormbreaker Scale:</span> Multi-tenant identity governance capable of
      shielding enterprise workloads across multi-cloud realms (AWS, Azure, GCP).
`,

    morph: () => `
<span style="color:#0284c7; font-weight:bold;">[🚨 "S.P.D. EMERGENCY!" // POWER RANGERS SPACE PATROL DELTA]</span>
--------------------------------------------------
  🔴 <span style="color:#ef4444; font-weight:bold;">RED RANGER // Jack Landors:</span> Molecular Intangibility & Delta Blasters
  🔵 <span style="color:#3b82f6; font-weight:bold;">BLUE RANGER // Sky Tate:</span> Force Field Barriers & Elite Tactical Command
  🟢 <span style="color:#22c55e; font-weight:bold;">GREEN RANGER // Bridge Carson:</span> Psychometry & Aura Sensing (Handstand Intel)
  🟡 <span style="color:#eab308; font-weight:bold;">YELLOW RANGER // Z Delgado:</span> Genetic Replication Clones
  🌸 <span style="color:#ec4899; font-weight:bold;">PINK RANGER // Syd Drew:</span> Molecular Fist of Iron & Elemental Mimicry
  🐺 <span style="color:#06b6d4; font-weight:bold;">SHADOW RANGER // Commander Cruger:</span> Shadow Saber 100-Strike Mastery
  ⚪ <span style="color:#f8fafc; font-weight:bold;">OMEGA RANGER // Sam:</span> Photonic Light Warrior & Omegamax Cycle
  <span style="color:#ef4444; font-weight:bold;">JUDGEMENT TIME SCANNER:</span>
  Adversary scanned... VERDICT: ❌ GUILTY! Offender sealed in S.P.D. Confinement Card!
`,

    marvel: () => `
<span style="color:#ef4444; font-weight:bold;">[⚔️ 8-BIT MARVEL PIXEL ARCADE FIGHTER]</span>
--------------------------------------------------
  6 Legendary Hero vs. Arch-Villain Matchups:
    • <span style="color:#3b82f6;">Captain America</span> vs. <span style="color:#ef4444;">Red Skull</span> (Vibranium Shield vs Tesseract)
    • <span style="color:#eab308;">Iron Man</span> vs. <span style="color:#94a3b8;">Ultron</span> (Unibeam Cannon vs Vibranium Infection)
    • <span style="color:#38bdf8;">Thor Odinson</span> vs. <span style="color:#22c55e;">Loki</span> (Mjolnir Thunderstrike vs Illusion Clone)
    • <span style="color:#f43f5e;">Spider-Man</span> vs. <span style="color:#10b981;">Green Goblin</span> (Web-Sling Dropkick vs Pumpkin Bombs)
    • <span style="color:#22c55e;">Hulk</span> vs. <span style="color:#a855f7;">Thanos</span> (Hulk Smash vs Infinity Gauntlet)
    • <span style="color:#64748b;">Black Widow</span> vs. <span style="color:#f97316;">Taskmaster</span> (Widow's Bite vs Photographic Reflexes)
`,

    matrix: () => {
      if (window.toggleMatrixMode) {
        window.toggleMatrixMode();
        return 'Toggling Matrix construct... (Click screen to exit)';
      }
      return 'Matrix module not initialized.';
    },

    hack: () => `
<span style="color:#ef4444; font-weight:bold;">[SIMULATING RED-TEAM ATTACK VECTOR]</span>
  [+] Probing Okta endpoints... BLOCKED by rate limiter.
  [+] Attempting Prompt Injection payload... INTERCEPTED by LLM Guardrail.
  [+] Testing Privilege Escalation in Saviynt... REJECTED by SOD rule #402.
  <span style="color:#10b981;">[RESULT] Red-Team vector mitigated. SecOps Incident #8942 resolved.</span>
`,

    contact: () => {
      if (window.openContactModal) window.openContactModal();
      return `
Dispatching contact channels:
  • Email:    daipayanghosal@outlook.com
  • GitHub:   https://github.com/daipayanghosal
  • LinkedIn: https://www.linkedin.com/in/daipayan-ghosal/
  • Scholar:  https://scholar.google.com/citations?user=eT3-swYAAAAJ
(Contact modal launched on screen)
`;
    },

    clear: () => '__CLEAR__'
  };

  function initTerminal() {
    const input = document.getElementById('term-input');
    const body = document.getElementById('terminal-body');
    const quickCmds = document.querySelectorAll('.quick-cmd-pill');

    if (!input || !body) return;

    let history = [];
    let historyIdx = -1;

    quickCmds.forEach((pill) => {
      pill.addEventListener('click', () => {
        const cmd = pill.getAttribute('data-cmd');
        executeCommand(cmd);
      });
    });

    input.addEventListener('keydown', (e) => {
      if (window.soundEngine) window.soundEngine.playKey();

      if (e.key === 'Enter') {
        const val = input.value.trim();
        if (val) {
          history.push(val);
          historyIdx = history.length;
          executeCommand(val);
          input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        if (historyIdx > 0) {
          historyIdx--;
          input.value = history[historyIdx];
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (historyIdx < history.length - 1) {
          historyIdx++;
          input.value = history[historyIdx];
        } else {
          historyIdx = history.length;
          input.value = '';
        }
        e.preventDefault();
      } else if (e.key === 'Tab') {
        // Autocomplete
        e.preventDefault();
        const current = input.value.trim().toLowerCase();
        const matches = Object.keys(COMMANDS).filter((c) => c.startsWith(current));
        if (matches.length === 1) {
          input.value = matches[0];
        }
      }
    });

    function executeCommand(cmdStr) {
      const parts = cmdStr.trim().split(' ');
      const baseCmd = parts[0].toLowerCase();

      // Log the prompt
      const promptLine = document.createElement('div');
      promptLine.className = 'term-output';
      promptLine.innerHTML = `<span style="color:#00f0ff;">daipayan@sentinel:~$</span> ${cmdStr}`;
      body.appendChild(promptLine);

      if (baseCmd === 'clear') {
        body.innerHTML = '';
        return;
      }

      if (baseCmd === 'view') {
        const target = parts[1] ? parts[1].toLowerCase() : 'toggle';
        if (window.switchViewMode) {
          window.switchViewMode(target === 'executive' ? 'executive' : 'sentinel');
          appendOutput(`Interface mode switched to: ${target}`);
        }
        return;
      }

      if (COMMANDS[baseCmd]) {
        const res = COMMANDS[baseCmd]();
        appendOutput(res);
      } else {
        appendOutput(`<span style="color:#ef4444;">Command not recognized: '${baseCmd}'. Type <span style="color:#00f0ff;">help</span> to inspect valid commands.</span>`);
      }

      if (window.unlockAchievement) {
        if (['slytherin', 'barca', 'f1', 'bong', 'personality', 'spiderman', 'thor', 'morph'].includes(baseCmd)) {
          window.unlockAchievement('ach_lore', 'Lore Master', `Discovered Daipayan's ${baseCmd.toUpperCase()} Easter egg!`);
        } else {
          window.unlockAchievement('ach_terminal', 'Root Access Granted', 'Discovered the interactive security terminal CLI');
        }
      }

      body.scrollTop = body.scrollHeight;
    }

    function appendOutput(content) {
      const outputLine = document.createElement('div');
      outputLine.className = 'term-output';
      outputLine.innerHTML = content;
      body.appendChild(outputLine);
    }
  }

  document.addEventListener('DOMContentLoaded', initTerminal);
})();
