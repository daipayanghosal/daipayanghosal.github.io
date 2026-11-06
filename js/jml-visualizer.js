/**
 * DAIPAYAN GHOSAL // PORTFOLIO
 * Interactive IAM & JML (Joiner-Mover-Leaver) Lifecycle Engine
 * Saviynt IGA + Okta + Workday + ServiceNow ITGC Architecture
 */

(function () {
  const JML_STAGES = {
    joiner: {
      title: 'Phase: Joiner (Automated Day 1 Provisioning)',
      nodes: [
        {
          system: 'Workday HR',
          title: 'Employee Profile Created',
          desc: 'HR system generates employee identity record, department code, and start date trigger.',
          action: 'STATUS: ACTIVE_PENDING',
          badge: 'TRIGGER'
        },
        {
          system: 'Saviynt IGA Level 200',
          title: 'Birthright Role Computation',
          desc: 'Saviynt maps job code to core RBAC baseline entitlements and verifies no SOD conflicts.',
          action: 'EVALUATE: LEAST_PRIVILEGE',
          badge: 'GOVERNANCE'
        },
        {
          system: 'Okta Identity Cloud',
          title: 'SSO & MFA Account Created',
          desc: 'Okta provisions user directory object, assigns enterprise groups, and enforces FIDO2 MFA.',
          action: 'PROVISION: SUCCESS (<2s)',
          badge: 'IDENTITY'
        },
        {
          system: 'ServiceNow ITGC',
          title: 'Audit Trail & Compliance Log',
          desc: 'Generates immutable change record for external SOX/ITGC audit certification verification.',
          action: 'CERTIFIED: AUDIT_READY',
          badge: 'COMPLIANCE'
        }
      ]
    },
    mover: {
      title: 'Phase: Mover (Role Transition & SOD Mitigation)',
      nodes: [
        {
          system: 'Workday HR',
          title: 'Department Transfer Trigger',
          desc: 'Employee moves from Cyber SecOps to Cloud Infrastructure team.',
          action: 'DEPT_CHANGE: DETECTED',
          badge: 'TRIGGER'
        },
        {
          system: 'Saviynt IGA Level 200',
          title: 'Segregation of Duties (SOD) Gate',
          desc: 'Detects conflicting roles between AppSec code merge authority and production admin access.',
          action: 'SOD_CONFLICT: PREVENTED',
          badge: 'GOVERNANCE'
        },
        {
          system: 'Okta Identity Cloud',
          title: 'Entitlement Revocation & Update',
          desc: 'Automatically strips obsolete security groups and attaches new cloud-infra policies.',
          action: 'DELTA_SYNC: REVOKE_OLD',
          badge: 'IDENTITY'
        },
        {
          system: 'ServiceNow ITGC',
          title: 'Manager Re-Certification',
          desc: 'Dispatches multi-tier manager attestation workflow with 7-day SLA escalation.',
          action: 'WORKFLOW: ATTESTED',
          badge: 'COMPLIANCE'
        }
      ]
    },
    leaver: {
      title: 'Phase: Leaver (Zero-Trust Immediate Revocation)',
      nodes: [
        {
          system: 'Workday HR',
          title: 'Termination Event Fired',
          desc: 'Immediate termination timestamp pushed across API webhooks to governance broker.',
          action: 'STATUS: TERMINATED',
          badge: 'TRIGGER'
        },
        {
          system: 'Okta Identity Cloud',
          title: 'Instant Session & Token Kill',
          desc: 'Revokes active OAuth tokens, invalidates desktop sessions, and locks identity in <500ms.',
          action: 'KILL_SESSIONS: ENFORCED',
          badge: 'IDENTITY'
        },
        {
          system: 'Saviynt IGA Level 200',
          title: 'Enterprise Entitlement Deprovision',
          desc: 'Deprovisions multi-cloud AWS/Azure accounts, SaaS licenses, and VPN certificates.',
          action: 'ORPHAN_ACCOUNTS: ZERO',
          badge: 'GOVERNANCE'
        },
        {
          system: 'ServiceNow ITGC',
          title: 'SOX 404 & Access Audit Seal',
          desc: 'Generates final compliance certificate confirming zero lingering access privileges.',
          action: 'COMPLIANCE: 100% SEALED',
          badge: 'COMPLIANCE'
        }
      ]
    }
  };

  function initJmlVisualizer() {
    const tabs = document.querySelectorAll('.jml-tab-btn');
    const container = document.getElementById('jml-workflow-display');
    const titleHeader = document.getElementById('jml-phase-title');

    if (!tabs.length || !container) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const mode = tab.getAttribute('data-jml');
        renderJmlPhase(mode);

        if (window.soundEngine) window.soundEngine.playClick();
        if (window.unlockAchievement && mode === 'leaver') {
          window.unlockAchievement('ach_jml', 'Identity Governance Maestro', 'Explored Joiner-Mover-Leaver automation matrix');
        }
      });
    });

    function renderJmlPhase(key) {
      const data = JML_STAGES[key] || JML_STAGES.joiner;
      if (titleHeader) titleHeader.innerText = data.title;

      container.innerHTML = data.nodes
        .map(
          (node, idx) => `
        <div class="workflow-node" style="animation: fadeIn 0.3s ease backwards; animation-delay: ${idx * 0.08}s;">
          <div class="node-system">
            <span style="color: var(--neon-cyan); font-weight: bold;">[${String(idx + 1).padStart(2, '0')}]</span>
            <span>${node.system}</span>
          </div>
          <div class="node-title">${node.title}</div>
          <div class="node-desc">${node.desc}</div>
          <div class="node-action-pill">${node.action}</div>
        </div>
      `
        )
        .join('');
    }

    renderJmlPhase('joiner');
  }

  document.addEventListener('DOMContentLoaded', initJmlVisualizer);
})();
