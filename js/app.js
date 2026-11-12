/**
 * DAIPAYAN GHOSAL // EXECUTIVE DOSSIER
 * Core Portfolio Orchestration Engine
 * Retractable Sidebar Drawer, Command Palette (⌘K), Scrollspy, and Contact Actions
 */

(function () {
  'use strict';

  // 1. Command Palette (Ctrl+K or ⌘K)
  const PALETTE_ACTIONS = [
    { title: 'Overview & Profile', section: 'dossier-hero', badge: '00', kbd: 'G O' },
    { title: 'VulnInvestigator (Live App)', section: 'dossier-vuln', badge: '01', kbd: 'G V' },
    { title: 'Identity & Access Governance (IGA)', section: 'dossier-iam', badge: '02', kbd: 'G I' },
    { title: 'AI Security & LLM Threat Defense', section: 'dossier-ai', badge: '03', kbd: 'G A' },
    { title: 'Core Skills & Technical Expertise', section: 'dossier-skills', badge: '04', kbd: 'G S' },
    { title: 'Professional Experience (Wipro)', section: 'dossier-experience', badge: '05', kbd: 'G E' },
    { title: 'Published Research (Springer)', section: 'dossier-research', badge: '06', kbd: 'G R' },
    { title: 'Certifications & Education', section: 'dossier-credentials', badge: '07', kbd: 'G C' },
    { title: 'Contact & Direct Mail', section: 'dossier-contact', badge: '08', kbd: 'G T' },
    { title: 'Download Resume (PDF)', action: 'print', badge: 'PDF', kbd: 'P' },
    { title: 'Open VulnInvestigator Web App', url: 'https://daipayanghosal.github.io/VulnInvestigator', badge: 'APP', kbd: 'V' },
    { title: 'LinkedIn Profile', url: 'https://www.linkedin.com/in/daipayan-ghosal/', badge: 'EXT', kbd: 'L' },
    { title: 'Google Scholar Citations', url: 'https://scholar.google.com/citations?user=eT3-swYAAAAJ', badge: 'EXT', kbd: 'S' },
    { title: 'GitHub Profile', url: 'https://github.com/daipayanghosal', badge: 'EXT', kbd: 'G' }
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
          <div class="palette-item-left">
            <span class="palette-item-badge">${act.badge || ''}</span>
            <span>${act.title}</span>
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
      if (window.__syncDossierScrollspy) window.__syncDossierScrollspy();
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

  // 3. Scrollspy Highlighting Active Section in Sidebar (Zero Scroll-Time Layout/Paint)
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
    const sidebar = document.getElementById('side-navbar');
    const links = Array.from(document.querySelectorAll('.side-nav-list.dossier-nav a'));
    if (!links.length) return;

    const linkByHref = new Map();
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href) linkByHref.set(href, link);
    });

    let currentSection = 'dossier-hero';
    let appliedSection = 'dossier-hero';

    function applyActiveLink() {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      const targetSection = nearBottom ? 'dossier-contact' : currentSection;
      if (targetSection === appliedSection) return;
      const prev = linkByHref.get(`#${appliedSection}`);
      const next = linkByHref.get(`#${targetSection}`);
      if (prev) prev.classList.remove('active');
      if (next) next.classList.add('active');
      appliedSection = targetSection;
    }

    window.__syncDossierScrollspy = applyActiveLink;

    if ('IntersectionObserver' in window) {
      const visibleRatios = new Map();
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleRatios.set(entry.target.id, entry.intersectionRatio);
            } else {
              visibleRatios.delete(entry.target.id);
            }
          });
          let bestId = null;
          let bestRatio = -1;
          for (const secId of sections) {
            const ratio = visibleRatios.get(secId);
            if (ratio !== undefined && ratio > bestRatio) {
              bestRatio = ratio;
              bestId = secId;
            }
          }
          if (bestId) {
            currentSection = bestId;
            if (sidebar && sidebar.classList.contains('open')) {
              applyActiveLink();
            }
          }
        },
        { rootMargin: '-12% 0px -28% 0px', threshold: [0, 0.25, 0.5] }
      );

      sections.forEach((secId) => {
        const el = document.getElementById(secId);
        if (el) observer.observe(el);
      });
    }
  }

  // 3b. Single-Toggle Pointer-Events Guard During Active Scroll Burst
  function initScrollHoverGuard() {
    const mainEl = document.querySelector('.dossier-container');
    if (!mainEl) return;
    let isScrolling = false;
    let stopTimer = null;

    function endScroll() {
      if (!isScrolling) return;
      isScrolling = false;
      mainEl.style.pointerEvents = '';
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!isScrolling) {
          isScrolling = true;
          mainEl.style.pointerEvents = 'none';
        }
        clearTimeout(stopTimer);
        stopTimer = setTimeout(endScroll, 120);
      },
      { passive: true }
    );

    window.addEventListener('pointerdown', endScroll, { passive: true });
  }

  // 4. Contact Actions & Mail Handling
  function initContactActions() {
    const copyBtn = document.getElementById('btn-copy-email');
    const copyLabel = document.getElementById('copy-email-label');
    const emailPill = document.getElementById('dossier-email-pill');
    const copyHint = document.getElementById('copy-hint');

    const email = 'daipayanghosal@outlook.com';

    function legacyCopy(feedbackFn) {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      let ok = false;
      try {
        ok = document.execCommand('copy');
      } catch (e) {
        ok = false;
      }
      document.body.removeChild(textarea);
      if (feedbackFn) feedbackFn(ok);
    }

    function copyToClipboard(feedbackFn) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          if (feedbackFn) feedbackFn(true);
        }).catch(() => {
          legacyCopy(feedbackFn);
        });
      } else {
        legacyCopy(feedbackFn);
      }
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        copyToClipboard((success) => {
          if (copyLabel) {
            const original = copyLabel.dataset.original || copyLabel.textContent;
            copyLabel.dataset.original = original;
            copyLabel.textContent = success ? 'Copied Email' : email;
            copyBtn.classList.add('copied');
            clearTimeout(copyBtn._copyTimer);
            copyBtn._copyTimer = setTimeout(() => {
              copyLabel.textContent = original;
              copyBtn.classList.remove('copied');
            }, 2500);
          }
        });
      });
    }

    if (emailPill) {
      emailPill.addEventListener('click', () => {
        copyToClipboard((success) => {
          if (copyHint) {
            const original = copyHint.dataset.original || copyHint.textContent;
            copyHint.dataset.original = original;
            copyHint.textContent = success ? 'Copied' : email;
            emailPill.classList.add('copied');
            clearTimeout(emailPill._copyTimer);
            emailPill._copyTimer = setTimeout(() => {
              copyHint.textContent = original;
              emailPill.classList.remove('copied');
            }, 2500);
          }
        });
      });
    }

    // Ensure Send Mail link works smoothly and opens mail client
    const sendMailBtn = document.getElementById('btn-send-mail');
    if (sendMailBtn) {
      sendMailBtn.addEventListener('click', () => {
        // Native mailto is allowed to execute freely
        sendMailBtn.style.transform = 'scale(0.98)';
        setTimeout(() => {
          sendMailBtn.style.transform = '';
        }, 150);
      });
    }
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
    initScrollHoverGuard();
    initContactActions();
    initDynamicExperience();

    console.log(
      '%c [DOSSIER] DAIPAYAN GHOSAL EXECUTIVE PORTFOLIO INITIALIZED %c',
      'background: #38bdf8; color: #08090e; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
      ''
    );
  });
})();
