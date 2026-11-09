/**
 * DAIPAYAN GHOSAL // EXECUTIVE DOSSIER
 * Core Portfolio Orchestration Engine
 * Retractable Sidebar Drawer, Command Palette (⌘K), Scrollspy, and Contact Actions
 */

(function () {
  'use strict';

  // 1. Command Palette (Ctrl+K or ⌘K)
  const PALETTE_ACTIONS = [
    { title: 'Overview & Profile', section: 'dossier-hero', icon: '👤', kbd: 'G O' },
    { title: 'VulnInvestigator (Live App)', section: 'dossier-vuln', icon: '🚀', kbd: 'G V' },
    { title: 'Enterprise Identity & Access Governance (IGA)', section: 'dossier-iam', icon: '🔑', kbd: 'G I' },
    { title: 'AI Governance & LLM Security', section: 'dossier-ai', icon: '🛡️', kbd: 'G A' },
    { title: 'Core Competencies & Skills', section: 'dossier-skills', icon: '⚡', kbd: 'G S' },
    { title: 'Professional Experience (Wipro)', section: 'dossier-experience', icon: '💼', kbd: 'G E' },
    { title: 'Published Research (Springer)', section: 'dossier-research', icon: '📚', kbd: 'G R' },
    { title: 'Certifications & Credentials', section: 'dossier-credentials', icon: '📜', kbd: 'G C' },
    { title: 'Executive Contact & Connect', section: 'dossier-contact', icon: '✉️', kbd: 'G T' },
    { title: 'Download Executive Resume (PDF)', action: 'print', icon: '📄', kbd: 'P' },
    { title: 'Launch VulnInvestigator Web App', url: 'https://daipayanghosal.github.io/VulnInvestigator', icon: '🌐', kbd: 'V' },
    { title: 'LinkedIn Profile', url: 'https://www.linkedin.com/in/daipayan-ghosal/', icon: '🔗', kbd: 'L' },
    { title: 'Google Scholar Citations', url: 'https://scholar.google.com/citations?user=eT3-swYAAAAJ', icon: '🎓', kbd: 'S' },
    { title: 'GitHub Profile', url: 'https://github.com/daipayanghosal', icon: '🐙', kbd: 'G' }
  ];

  function initCommandPalette() {
    const overlay = document.getElementById('palette-overlay');
    const input = document.getElementById('palette-input');
    const results = document.getElementById('palette-results');
    const triggerBtn = document.getElementById('hud-cmd-trigger');
    const sideTriggerBtn = document.getElementById('side-cmd-trigger');

    if (!overlay || !input || !results) return;

    let selectedIdx = 0;
    let filteredActions = [...PALETTE_ACTIONS];

    window.openPalette = function () {
      overlay.classList.add('active');
      input.value = '';
      filteredActions = [...PALETTE_ACTIONS];
      selectedIdx = 0;
      renderPaletteResults();
      input.focus();
    };

    window.closePalette = function () {
      overlay.classList.remove('active');
    };

    if (triggerBtn) {
      triggerBtn.addEventListener('click', window.openPalette);
    }
    if (sideTriggerBtn) {
      sideTriggerBtn.addEventListener('click', () => {
        if (window.closeSideNavbar) window.closeSideNavbar();
        window.openPalette();
      });
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) window.closePalette();
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (overlay.classList.contains('active')) {
          window.closePalette();
        } else {
          window.openPalette();
        }
      } else if (e.key === 'Escape' && overlay.classList.contains('active')) {
        window.closePalette();
      }
    });

    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        filteredActions = [...PALETTE_ACTIONS];
      } else {
        filteredActions = PALETTE_ACTIONS.filter(
          (a) => a.title.toLowerCase().includes(q) || (a.section && a.section.toLowerCase().includes(q))
        );
      }
      selectedIdx = 0;
      renderPaletteResults();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (filteredActions.length > 0) {
          selectedIdx = (selectedIdx + 1) % filteredActions.length;
          renderPaletteResults();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (filteredActions.length > 0) {
          selectedIdx = (selectedIdx - 1 + filteredActions.length) % filteredActions.length;
          renderPaletteResults();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIdx]) {
          executePaletteAction(filteredActions[selectedIdx]);
        }
      }
    });

    function renderPaletteResults() {
      if (filteredActions.length === 0) {
        results.innerHTML = `
          <div class="palette-empty" style="padding: 1.5rem; text-align: center; color: #64748b; font-size: 0.9rem;">
            No matching sections or actions found.
          </div>
        `;
        return;
      }

      results.innerHTML = filteredActions
        .map(
          (act, idx) => `
        <div class="palette-item ${idx === selectedIdx ? 'selected' : ''}" data-idx="${idx}">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.15rem;">${act.icon}</span>
            <span style="font-weight: 500;">${act.title}</span>
          </div>
          <kbd>${act.kbd}</kbd>
        </div>
      `
        )
        .join('');

      const items = results.querySelectorAll('.palette-item');
      items.forEach((item) => {
        item.addEventListener('click', () => {
          const idx = parseInt(item.getAttribute('data-idx'), 10);
          if (filteredActions[idx]) {
            executePaletteAction(filteredActions[idx]);
          }
        });
      });
    }

    function executePaletteAction(act) {
      window.closePalette();
      if (act.section) {
        const el = document.getElementById(act.section);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (act.action === 'print') {
        window.print();
      } else if (act.url) {
        window.open(act.url, '_blank', 'noopener,noreferrer');
      }
    }
  }

  // 2. Retractable Side Navbar Drawer Engine
  function initSideNavbar() {
    const sidebar = document.getElementById('side-navbar');
    const backdrop = document.getElementById('side-navbar-backdrop');
    const toggleBtn = document.getElementById('btn-sidebar-toggle');
    const closeBtn = document.getElementById('btn-sidebar-close');

    if (!sidebar) return;

    window.openSideNavbar = function () {
      sidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      if (toggleBtn) toggleBtn.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    window.closeSideNavbar = function () {
      sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      if (toggleBtn) toggleBtn.classList.remove('open');
      document.body.style.overflow = '';
    };

    window.toggleSideNavbar = function () {
      if (sidebar.classList.contains('open')) {
        window.closeSideNavbar();
      } else {
        window.openSideNavbar();
      }
    };

    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.toggleSideNavbar();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.closeSideNavbar();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        window.closeSideNavbar();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        window.closeSideNavbar();
      }
    });

    // Close on link click
    const sideLinks = sidebar.querySelectorAll('.side-link');
    sideLinks.forEach((link) => {
      link.addEventListener('click', () => {
        window.closeSideNavbar();
      });
    });
  }

  // 3. Scrollspy Highlighting Active Section in Sidebar
  function initDossierScrollspy() {
    const sections = [
      'dossier-hero',
      'dossier-vuln',
      'dossier-iam',
      'dossier-ai',
      'dossier-skills',
      'dossier-experience',
      'dossier-research',
      'dossier-credentials',
      'dossier-contact'
    ];
    const links = document.querySelectorAll('.side-nav-list.dossier-nav a');
    if (!links.length) return;

    window.addEventListener(
      'scroll',
      () => {
        let current = 'dossier-hero';
        const scrollPos = window.scrollY + 180;

        for (const secId of sections) {
          const el = document.getElementById(secId);
          if (el && el.offsetTop <= scrollPos) {
            current = secId;
          }
        }

        links.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${current}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      },
      { passive: true }
    );
  }

  // 4. Contact Actions & Mailto Handling
  function initContactActions() {
    const triggers = document.querySelectorAll('.trigger-contact');
    triggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('dossier-contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // 5. Dynamic Experience Calculation (from May 30, 2022)
  function initDynamicExperience() {
    const el = document.getElementById('metric-experience-val');
    const card = document.getElementById('metric-experience-card');
    if (!el) return;

    // Start date: May 30, 2022
    const start = new Date(2022, 4, 30);
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
      months--;
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const primaryText = (months > 0 || days > 0) ? `${years}+ Yrs` : `${years} Yrs`;
    const detailedText = months > 0 ? `${years}y ${months}m` : `${years} Yrs`;
    const tooltipText = `Experience calculated dynamically from May 30, 2022: ${years} years, ${months} month${months === 1 ? '' : 's'}`;

    el.textContent = primaryText;
    if (card) {
      card.setAttribute('title', `${tooltipText} (Click to toggle detailed breakdown)`);
      card.style.cursor = 'pointer';

      let toggled = false;
      card.addEventListener('click', () => {
        toggled = !toggled;
        el.textContent = toggled ? detailedText : primaryText;
      });
    }
  }

  // 6. Initialize Everything on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    // Ensure body has data-view set to dossier
    document.body.setAttribute('data-view', 'dossier');

    initSideNavbar();
    initCommandPalette();
    initDossierScrollspy();
    initContactActions();
    initDynamicExperience();

    console.log(
      '%c [DOSSIER] DAIPAYAN GHOSAL EXECUTIVE PORTFOLIO INITIALIZED %c',
      'background: #38bdf8; color: #08090e; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
      ''
    );
  });
})();
