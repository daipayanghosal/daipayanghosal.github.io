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
  Org:         Wipro Limited (Kolkata, IN)
  Focus:       AI Security, Saviynt IGA, Okta SSO, OWASP LLM Top 10, DevSecOps
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
    • Saviynt IGA Level 200, Okta Identity Cloud, JML Lifecycle, RBAC, DLP, SOD Governance
  <span style="color:#10b981;">[AppSec & DevSecOps]</span>
    • Secure SDLC, Checkmarx SAST, CI/CD Pipeline Hardening, Code Reviews, Python Scripting
  <span style="color:#ec4899;">[Risk, Audit & SecOps]</span>
    • ITGC Compliance, SOX 404, EU AI Act Awareness, Qualys VMDR, Incident Remediation
`,

    exp: () => `
<span style="color:#00f0ff; font-weight:bold;">PROFESSIONAL FLIGHT LOG:</span>
--------------------------------------------------
  <span style="color:#10b981;">[Oct 2025 – Present]</span>  <span style="color:#ffffff; font-weight:bold;">Cyber Security Analyst (IAM)</span> — Wipro Limited
    • End-to-end Saviynt IGA identity governance & RBAC role architecture
    • Automated Joiner-Mover-Leaver (JML) integration across Workday & Okta
    • ServiceNow workflow automation creating immutable ITGC audit trails
    • Elimination of toxic access combinations & segregation of duties (SOD) violations

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
  [CHECK] IAM Orphan Accounts (ITGC-404):         <span style="color:#10b981;">ZERO ORPHANS (JML Synced)</span>
  [AUDIT] Threat Score: 12/100 (LOW RISK). System perimeter verified.
`,

    vuln: () => `
<span style="color:#00f0ff; font-weight:bold;">[FEATURED REPO: VulnInvestigator 🔍]</span>
--------------------------------------------------
  Name:        VulnInvestigator (Evidence-Grounded GenAI)
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
              House:      🐍 Slytherin (Emerald & Silver / Pure Ambition)
              Football:   🔵🔴 FC Barcelona (Més que un club / Tiki-Taka)
              Paddock:    🏎️ Mercedes-AMG Petronas F1 (Silver Arrows)
              Roots:      ☕ Proud Bong (City of Joy // Kolkata Adda)
              Location:   Kolkata, West Bengal, India
</span>
`,

    slytherin: () => `
<span style="color:#22c55e; font-weight:bold;">
     ---_ ......._-_--.
    (|\\ /      / /| \\  \\
    /  /     .'  -=-'   )
   /  /   .'             )   HOUSE SLYTHERIN 🐍
 _/  /   /   _..--.  .  /    ------------------------------------
( \\   ) / //' /  \\  \\  /     Motto:   "Ambition, Resourcefulness, Cunning"
 \\ '-.-' / ( (    )  ) /     Colors:  Emerald Green & Silver
  '-----'   \\ '._.'  /       Element: Water // Dungeon Enclave
             '-----'
</span>
<span style="color:#86efac;">"Or perhaps in Slytherin, you'll make your real friends,</span>
<span style="color:#86efac;">those cunning folk use any means to achieve their ends."</span>
  — The Sorting Hat verdict for Daipayan Ghosal.
  Applied to SecOps: Relentless ambition in defense architecture, strategic foresight, 
  and never taking the easy route when hardening enterprise resilience.
`,

    barca: () => `
<span style="color:#004d98; font-weight:bold;">[🔵🔴 FUTBOL CLUB BARCELONA // MÉS QUE UN CLUB]</span>
--------------------------------------------------
  Camp Nou Faithful • Est. 1899 • Blaugrana Pride
  Tiki-Taka Philosophy Applied to Cybersecurity:
    • <span style="color:#edbb00;">Continuous Movement:</span> Like Busquets, Xavi & Iniesta dictating the tempo,
      modern IAM ensures continuous entitlement verification without latency.
    • <span style="color:#edbb00;">High Press & Fast Recovery:</span> Just as Pep's Barça enforced the 6-second
      ball recovery rule, our AppSec pipeline neutralizes high-severity CVEs in real-time.
    • <span style="color:#edbb00;">Vision:</span> Total spatial awareness across the enterprise attack surface.
  <span style="color:#edbb00; font-weight:bold;">Visca el Barça i Visca Catalunya! 🔵🔴</span>
`,

    f1: () => `
<span style="color:#00d2be; font-weight:bold;">[🏎️ MERCEDES-AMG PETRONAS FORMULA ONE TEAM]</span>
--------------------------------------------------
  Brackley & Brixworth Telemetry // 8x World Constructors' Champions
  Chassis:       Mercedes-AMG F1 W16 E Performance
  Power Unit:    1.6L Turbocharged Hybrid V6
  Radio Trans:   <span style="color:#ffffff;">"Hammer Time, Daipayan! Gap to nearest threat is 0.4s."</span>
  Telemetry Ops:
    • Downforce vs Drag: Balancing strict Zero Trust friction with seamless dev velocity.
    • Sensor Array: Thousands of real-time telemetry channels mirroring XDR & SIEM log ingestion.
    • In Toto Wolff We Trust: "We don't take it easy. We optimize every single millisecond."
`,

    bong: () => `
<span style="color:#f43f5e; font-weight:bold;">[☕ PROUD BONG // কলকাতা (KOLKATA) ROOTS]</span>
--------------------------------------------------
  Born and anchored in the cultural and intellectual capital of India:
    • <span style="color:#fbbf24;">Adda Culture:</span> High-octane philosophical, political & technical debates
      at College Street Coffee House, deconstructing complex neural networks over cha & telebhaja.
    • <span style="color:#fbbf24;">The Feluda Mindset:</span> Approaching threat hunting and incident response
      with the razor-sharp analytical deduction of Satyajit Ray's legendary detective.
    • <span style="color:#fbbf24;">Football Mania:</span> Derby season fever (Mohun Bagan vs East Bengal)
      in the veins, shaping an eternal obsession with the beautiful game.
    • <span style="color:#fbbf24;">Fuel of Champions:</span> Macher jhol, kosha mangsho, and sweet roshogolla
      powering midnight secure LLM fine-tuning sessions.
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
        if (['slytherin', 'barca', 'f1', 'bong'].includes(baseCmd)) {
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
