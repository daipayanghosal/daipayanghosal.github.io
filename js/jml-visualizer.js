/**
 * DAIPAYAN GHOSAL // PORTFOLIO
 * Enterprise Identity Governance & Administration (IGA) Matrix Engine
 * Saviynt EIC Level 200 + Okta Identity Cloud + Workday HCM + ServiceNow ITGC Architecture
 * Implements Continuous Access Attestation, Predictive SoD Mitigation, and Zero Standing Privileges
 */

(function () {
  const IGA_STAGES = {
    lifecycle: {
      title: 'Dimension 01 // Authoritative Lifecycle Orchestration & Dynamic ABAC/RBAC',
      desc: 'Automates canonical identity ingestion from HR authoritative sources into Saviynt EIC, computing birthright entitlements dynamically based on attribute-based policies (ABAC) and role mining.',
      nodes: [
        {
          system: 'Workday HCM',
          title: 'Canonical Identity Ingestion',
          desc: 'Authoritative HR record parsed; dynamic attribute mapping reconciles employee type, department, cost center, and effective start dates.',
          action: 'STATE: RECONCILED_CANONICAL',
          badge: 'AUTHORITATIVE'
        },
        {
          system: 'Saviynt EIC Level 200',
          title: 'Dynamic ABAC/RBAC Policy Engine',
          desc: 'Evaluates attribute-based policies and historical peer clusters to compute baseline birthright roles with zero standing excess privilege.',
          action: 'EVALUATE: LEAST_PRIVILEGE_STAMP',
          badge: 'GOVERNANCE'
        },
        {
          system: 'Okta Identity Cloud',
          title: 'Event-Driven SCIM 2.0 Provisioning',
          desc: 'Dispatches automated SCIM 2.0 payloads to Azure AD/Entra, AWS IAM Identity Center, and SaaS directories with FIDO2 MFA enforcement.',
          action: 'PROVISION: SCIM_SYNC (<1.2s)',
          badge: 'IDENTITY'
        },
        {
          system: 'ServiceNow ITGC',
          title: 'SOX Baseline Audit Stamping',
          desc: 'Generates immutable change ticket and cryptographic signature validating pre-approved birthright entitlements for SOX Section 404 audit.',
          action: 'COMPLIANCE: BASELINE_SEALED',
          badge: 'COMPLIANCE'
        }
      ]
    },
    sod: {
      title: 'Dimension 02 // Predictive Segregation of Duties (SoD) & Toxic Combination Mitigation',
      desc: 'Continuous multi-application policy ruleset inspection preventing toxic combinations (e.g. AP invoice creation vs payment disbursement) during role transitions and delta assignment.',
      nodes: [
        {
          system: 'Workday HCM',
          title: 'Contextual Role Transition Ingestion',
          desc: 'Cross-functional transfer event detected (e.g., transition from Cyber AppSec to Cloud Infrastructure / Treasury operations).',
          action: 'TRANSITION: DETECTED',
          badge: 'TRIGGER'
        },
        {
          system: 'Saviynt EIC Level 200',
          title: 'Multi-System SoD Conflict Gate',
          desc: 'Evaluates real-time SoD conflict matrix across SAP ERP, Salesforce, and AWS IAM; intercepts conflicting entitlement requests prior to provisioning.',
          action: 'SOD_RULE_GATE: 0_VIOLATIONS',
          badge: 'GOVERNANCE'
        },
        {
          system: 'Okta & Cloud Broker',
          title: 'Delta Revocation & Privilege Pruning',
          desc: 'Executes automated delta stripping of legacy operational roles, eradicating accumulated privilege creep and lingering group memberships.',
          action: 'PRIVILEGE_CREEP: ERADICATED',
          badge: 'IDENTITY'
        },
        {
          system: 'ServiceNow ITGC',
          title: 'Line Manager Risk Attestation',
          desc: 'Dispatches contextual risk-scored certification task to business unit director with 72-hour SLA and automatic escalation workflows.',
          action: 'ATTESTATION: SIGNED_OFF',
          badge: 'COMPLIANCE'
        }
      ]
    },
    certification: {
      title: 'Dimension 03 // Continuous Access Attestation & Ephemeral JIT Elevation',
      desc: 'Machine learning outlier detection and risk-based micro-certification paired with Just-In-Time (JIT) ephemeral credential minting, guaranteeing Zero Standing Privileges (ZSP).',
      nodes: [
        {
          system: 'Saviynt Access Analytics',
          title: 'ML Outlier Profiling & Micro-Cert',
          desc: 'Unsupervised peer clustering flags anomalous high-privilege entitlements; triggers out-of-band micro-certification for elevated roles.',
          action: 'OUTLIER_SCORE: 0.12 (LOW)',
          badge: 'ANALYTICS'
        },
        {
          system: 'Saviynt Cloud PAM',
          title: 'Just-In-Time (JIT) Ephemeral Minting',
          desc: 'Grants time-bounded, dual-authorized administrative access to production cloud tenants with automatic expiration timer (TTL: 120 min).',
          action: 'ELEVATION: JIT_TIME_BOUND',
          badge: 'GOVERNANCE'
        },
        {
          system: 'Okta PAM & Target APIs',
          title: 'Cryptographic Enclave Session Log',
          desc: 'Monitors interactive cloud admin CLI sessions, recording API calls and enforcing mandatory hardware-backed MFA re-verification.',
          action: 'SESSION: AUDITED_REALTIME',
          badge: 'IDENTITY'
        },
        {
          system: 'Automated Revoker Engine',
          title: 'Zero Standing Privilege (ZSP) Revocation',
          desc: 'Automatically invalidates ephemeral tokens upon task completion or TTL expiry, returning the attack surface to zero standing privileges.',
          action: 'STANDING_PRIVILEGES: ZERO',
          badge: 'GOVERNANCE'
        }
      ]
    },
    deprovision: {
      title: 'Dimension 04 // Deterministic Deprovisioning & Blast-Radius Invalidation',
      desc: 'Sub-second authoritative kill-switch executing instant session termination, OAuth/SAML token revocation, and comprehensive orphan account elimination across hybrid clouds.',
      nodes: [
        {
          system: 'Workday HCM',
          title: 'Authoritative Departure Event',
          desc: 'Emergency or scheduled offboarding webhook broadcast across high-throughput enterprise event bus to the identity governance broker.',
          action: 'STATUS: TERMINATED_IMMEDIATE',
          badge: 'TRIGGER'
        },
        {
          system: 'Okta Identity Cloud',
          title: 'Sub-Second Session & Token Kill',
          desc: 'Revokes active OAuth/OIDC refresh tokens, invalidates federated SAML sessions, and disables Active Directory / Entra accounts in <300ms.',
          action: 'TOKEN_PURGE: ENFORCED (<300ms)',
          badge: 'IDENTITY'
        },
        {
          system: 'Saviynt EIC Level 200',
          title: 'Multi-Cloud Orphan Account Scrubbing',
          desc: 'Sweeps AWS IAM, Azure AD, GCP, GitHub Enterprise, and corporate VPN gateways; wipes downstream entitlements and eliminates orphan accounts.',
          action: 'ORPHAN_ACCOUNTS: ZERO',
          badge: 'GOVERNANCE'
        },
        {
          system: 'ServiceNow ITGC',
          title: 'Cryptographic Proof of Deprovisioning',
          desc: 'Generates immutable SOX 404 audit certificate verifying 100% deprovisioning completeness across all enterprise and cloud boundaries.',
          action: 'COMPLIANCE: 100% VERIFIED',
          badge: 'COMPLIANCE'
        }
      ]
    }
  };

  function initIgaVisualizer() {
    const tabs = document.querySelectorAll('.jml-tab-btn, .iga-tab-btn');
    const container = document.getElementById('jml-workflow-display');
    const titleHeader = document.getElementById('jml-phase-title');

    if (!tabs.length || !container) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const mode = tab.getAttribute('data-iga') || tab.getAttribute('data-jml') || 'lifecycle';
        renderIgaPhase(mode);

        if (window.soundEngine) window.soundEngine.playClick();
        if (window.unlockAchievement && (mode === 'deprovision' || mode === 'certification' || mode === 'leaver')) {
          window.unlockAchievement('ach_iga_maestro', 'Enterprise IGA Architect', 'Explored authoritative lifecycle orchestration, predictive SoD mitigation, and Zero Standing Privileges!');
        }
      });
    });

    function renderIgaPhase(key) {
      // Map legacy jml keys if any
      const mappedKey = key === 'joiner' ? 'lifecycle' : key === 'mover' ? 'sod' : key === 'leaver' ? 'deprovision' : key;
      const data = IGA_STAGES[mappedKey] || IGA_STAGES.lifecycle;
      
      if (titleHeader) {
        titleHeader.innerHTML = `
          <div style="font-size:0.95rem; font-weight:700; color:var(--neon-cyan); margin-bottom:0.35rem;">${data.title}</div>
          <div style="font-size:0.75rem; color:var(--text-dim); line-height:1.4;">${data.desc}</div>
        `;
      }

      container.innerHTML = data.nodes
        .map(
          (node, idx) => `
        <div class="workflow-node" style="animation: fadeIn 0.3s ease backwards; animation-delay: ${idx * 0.08}s;">
          <div class="node-system">
            <span style="color: var(--neon-cyan); font-weight: bold;">[${String(idx + 1).padStart(2, '0')}]</span>
            <span style="font-weight: 600;">${node.system}</span>
            <span style="float: right; font-size: 0.65rem; background: rgba(0, 240, 255, 0.12); color: var(--neon-cyan); padding: 1px 6px; border-radius: 4px; border: 1px solid rgba(0, 240, 255, 0.25);">${node.badge}</span>
          </div>
          <div class="node-title" style="margin-top: 0.5rem; color: #ffffff;">${node.title}</div>
          <div class="node-desc" style="color: #94a3b8; font-size: 0.76rem; line-height: 1.45;">${node.desc}</div>
          <div class="node-action-pill" style="margin-top: 0.75rem;">${node.action}</div>
        </div>
      `
        )
        .join('');
    }

    renderIgaPhase('lifecycle');
  }

  document.addEventListener('DOMContentLoaded', initIgaVisualizer);
})();
