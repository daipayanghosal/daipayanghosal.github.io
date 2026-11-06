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
              Location:   Kolkata, West Bengal, India
</span>
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
        window.unlockAchievement('ach_terminal', 'Root Access Granted', 'Discovered the interactive security terminal CLI');
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
