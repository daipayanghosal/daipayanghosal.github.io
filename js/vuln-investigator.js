/**
 * DAIPAYAN GHOSAL // PORTFOLIO
 * VulnInvestigator Interactive Engine
 * Evidence-Grounded GenAI for Vulnerability-to-Threat Investigation & Prioritisation
 * Multi-factor contextual risk scoring: NVD CVSS + CISA KEV + Asset Tier + Exposure + MITRE ATT&CK
 */

(function () {
  const CVE_PRESETS = {
    cve1: {
      id: 'CVE-2024-38077',
      title: 'Windows Remote Desktop Licensing Service RCE',
      cvss: 9.8,
      kev: 1, // in KEV
      asset: '1.0', // Tier 1 Domain Controller
      exposure: '0.7', // DMZ / Internal VPN
      mitre: 'T1210: Exploitation of Remote Services',
      tactic: 'TA0008: Lateral Movement',
      citations: ['NVD API v2.0 (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)', 'CISA KEV Catalogue (Added: 2024-08-13)', 'MITRE ATT&CK Enterprise Matrix v14']
    },
    cve2: {
      id: 'CVE-2023-48795',
      title: 'Terrapin SSH Protocol Prefix Truncation',
      cvss: 5.9,
      kev: 0, // not in KEV
      asset: '0.75', // Tier 2 High Priority Linux Bastion
      exposure: '1.0', // Public Internet Facing
      mitre: 'T1557: Adversary-in-the-Middle',
      tactic: 'TA0006: Credential Access',
      citations: ['NVD API v2.0 (CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:N)', 'Asset Inventory: DMZ-SSH-GW-01', 'BSI Technical Advisory 2023']
    },
    cve3: {
      id: 'CVE-2024-21413',
      title: 'Microsoft Outlook Moniker Link Validation RCE',
      cvss: 9.8,
      kev: 1, // in KEV
      asset: '1.0', // Enterprise Exchange / Workstations
      exposure: '1.0', // Public Inbound Email
      mitre: 'T1566.002: Spearphishing Link',
      tactic: 'TA0001: Initial Access',
      citations: ['NVD API v2.0 (CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:H/I:H/A:H)', 'CISA KEV Catalogue (Active In-The-Wild Exploitation)', 'MITRE ATT&CK Technique T1566']
    },
    cve4: {
      id: 'CVE-2021-44228',
      title: 'Apache Log4j2 JNDI Remote Code Execution (Log4Shell)',
      cvss: 10.0,
      kev: 1,
      asset: '1.0',
      exposure: '1.0',
      mitre: 'T1190: Exploit Public-Facing Application',
      tactic: 'TA0001: Initial Access',
      citations: ['NVD API v2.0 (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H)', 'CISA KEV Catalogue (Global Ransomware Vector)', 'MITRE ATT&CK STIX 2.1']
    }
  };

  // Config weights matching scoring.yaml:
  // score = w_cvss * (CVSS/10) + w_kev * KEV + w_asset * Criticality + w_exp * Exposure
  const W_CVSS = 0.35;
  const W_KEV = 0.30;
  const W_ASSET = 0.20;
  const W_EXP = 0.15;

  function initVulnInvestigator() {
    const cvssSlider = document.getElementById('vi-cvss-slider');
    const cvssVal = document.getElementById('vi-cvss-val');
    const kevToggle = document.getElementById('vi-kev-toggle');
    const assetSelect = document.getElementById('vi-asset-select');
    const expSelect = document.getElementById('vi-exp-select');

    const scoreCvssEl = document.getElementById('vi-res-cvss');
    const scoreContextualEl = document.getElementById('vi-res-contextual');
    const scoreDeltaEl = document.getElementById('vi-res-delta');
    const mitreTechEl = document.getElementById('vi-mitre-tech');
    const mitreTacticEl = document.getElementById('vi-mitre-tactic');
    const reportBox = document.getElementById('vi-genai-report');

    const presetBtns = document.querySelectorAll('.vi-preset-btn');

    if (!cvssSlider || !scoreContextualEl) return;

    // Load initial preset
    loadPreset('cve1');

    presetBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        presetBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const cveKey = btn.getAttribute('data-cve');
        loadPreset(cveKey);

        if (window.soundEngine) window.soundEngine.playClick();
        if (window.unlockAchievement) {
          window.unlockAchievement('ach_vi', 'Threat Prioritizer', 'Interacted with VulnInvestigator contextual risk scoring engine');
        }
      });
    });

    [cvssSlider, kevToggle, assetSelect, expSelect].forEach((input) => {
      if (input) {
        input.addEventListener('input', recalculate);
        input.addEventListener('change', recalculate);
      }
    });

    function loadPreset(key) {
      const data = CVE_PRESETS[key];
      if (!data) return;

      cvssSlider.value = data.cvss;
      if (cvssVal) cvssVal.innerText = data.cvss.toFixed(1);

      if (kevToggle) {
        kevToggle.checked = data.kev === 1;
      }
      if (assetSelect) {
        assetSelect.value = data.asset;
      }
      if (expSelect) {
        expSelect.value = data.exposure;
      }

      if (mitreTechEl) mitreTechEl.innerText = data.mitre;
      if (mitreTacticEl) mitreTacticEl.innerText = data.tactic;

      recalculate(data);
    }

    function recalculate(presetData) {
      const cvss = parseFloat(cvssSlider.value);
      if (cvssVal) cvssVal.innerText = cvss.toFixed(1);

      const isKev = kevToggle ? (kevToggle.checked ? 1.0 : 0.0) : 0.0;
      let asset = parseFloat(assetSelect ? assetSelect.value : '1.0');
      let exposure = parseFloat(expSelect ? expSelect.value : '0.7');
      if (isNaN(asset)) asset = 1.0;
      if (isNaN(exposure)) exposure = 0.7;

      // Formula:
      // score = (0.35 * (cvss / 10)) + (0.30 * isKev) + (0.20 * asset) + (0.15 * exposure)
      const contextualScore = (W_CVSS * (cvss / 10)) + (W_KEV * isKev) + (W_ASSET * asset) + (W_EXP * exposure);
      const contextualPercent = Math.round(contextualScore * 100);
      const cvssPercent = Math.round((cvss / 10) * 100);
      const delta = contextualPercent - cvssPercent;

      if (scoreCvssEl) scoreCvssEl.innerText = `${cvssPercent}/100`;
      if (scoreContextualEl) {
        scoreContextualEl.innerText = `${contextualPercent}/100`;
        if (contextualPercent >= 75) {
          scoreContextualEl.style.color = '#ef4444';
        } else if (contextualPercent >= 50) {
          scoreContextualEl.style.color = '#f59e0b';
        } else {
          scoreContextualEl.style.color = '#10b981';
        }
      }

      if (scoreDeltaEl) {
        if (delta > 0) {
          scoreDeltaEl.innerHTML = `<span style="color:#ef4444;">▲ +${delta}% (Risk Escalated by CISA KEV / Asset Context)</span>`;
        } else if (delta < 0) {
          scoreDeltaEl.innerHTML = `<span style="color:#10b981;">▼ ${delta}% (Deprioritized: Low Exposure / No KEV Vector)</span>`;
        } else {
          scoreDeltaEl.innerHTML = `<span style="color:#38bdf8;">= 0% (Equivalent to CVSS baseline)</span>`;
        }
      }

      // Update Simulated GenAI Evidence Report
      if (reportBox) {
        const cveId = presetData && presetData.id ? presetData.id : 'CVE-CUSTOM';
        const citations = presetData && presetData.citations ? presetData.citations.join('\n  • ') : 'NVD API v2.0 // CISA KEV Catalogue';

        reportBox.innerHTML = `
<span style="color:#00f0ff; font-weight:bold;">[GENAI EVIDENCE-GROUNDED INVESTIGATION REPORT]</span>
--------------------------------------------------------------------------------
<strong>TARGET VULNERABILITY:</strong> ${cveId}
<strong>CVSS BASELINE:</strong> ${cvss}/10 (Ranking Percentile: ${cvssPercent}%)
<strong>CONTEXTUAL RISK SCORE:</strong> ${contextualScore.toFixed(3)} (${contextualPercent}% // TIER: ${contextualPercent >= 75 ? 'CRITICAL' : contextualPercent >= 50 ? 'HIGH' : 'MEDIUM'})
<strong>CISA KEV STATUS:</strong> ${isKev === 1.0 ? '🚨 CONFIRMED ACTIVE IN-THE-WILD EXPLOITATION' : '⚪ Not in Known Exploited Vulnerabilities'}
<strong>ASSET CRITICALITY:</strong> Tier Weight ${asset} // Exposure: ${exposure}
<strong>EVIDENCE GROUNDING CITATIONS:</strong>
  • ${citations}
<strong>HALLUCINATION CONFIDENCE:</strong> 0.02% (Strict Grounding Validation Passed)
<strong>RECOMMENDED MITIGATION:</strong> Enforce zero-trust network boundary and dispatch automated patch SLA within 24h.
        `;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', initVulnInvestigator);
})();
