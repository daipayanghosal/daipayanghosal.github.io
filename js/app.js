/**
 * DAIPAYAN GHOSAL // PORTFOLIO ORCHESTRATION ENGINE
 * Bilingual Engine (EN / BN), Light & Dark Theme Manager,
 * Interactive Bento Project Filters, Retractable Drawer, ⌘K Palette, and Performance Guard
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. DUAL THEME ENGINE (Light & Dark)
  // ==========================================================================
  function initTheme() {
    const saved = localStorage.getItem('portfolio_theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme = saved || (systemPrefersLight ? 'light' : 'dark');

    applyTheme(initialTheme);

    const themeToggleBtn = document.getElementById('btn-theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }

    // Listen to OS theme changes if user has not set explicit manual choice
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem('portfolio_theme')) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
  }

  // ==========================================================================
  // 2. PROJECT BENTO FILTER CHIPS
  // ==========================================================================
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-pill-btn');
    const cards = document.querySelectorAll('.project-bento-card');

    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter') || 'all';

        cards.forEach((card) => {
          const cat = card.getAttribute('data-category') || '';
          if (filter === 'all' || cat.includes(filter)) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // ==========================================================================
  // 4. COMMAND PALETTE (Ctrl+K or ⌘K)
  // ==========================================================================
  const PALETTE_ACTIONS = [
    { title: 'Overview & Profile', section: 'dossier-hero', badge: '00', kbd: 'G O' },
    { title: 'Shipped Systems & Featured Builds', section: 'dossier-projects', badge: '01', kbd: 'G P' },
    { title: 'Identity & Access Governance (IGA)', section: 'dossier-iam', badge: '02', kbd: 'G I' },
    { title: 'AI Security & LLM Threat Defense', section: 'dossier-ai', badge: '03', kbd: 'G A' },
    { title: 'Core Skills & Technical Stack', section: 'dossier-skills', badge: '04', kbd: 'G S' },
    { title: 'Professional Experience (Wipro)', section: 'dossier-experience', badge: '05', kbd: 'G E' },
    { title: 'Published Research (Springer Nature)', section: 'dossier-research', badge: '06', kbd: 'G R' },
    { title: 'Certifications & Education', section: 'dossier-credentials', badge: '07', kbd: 'G C' },
    { title: 'Connect & Direct Contact', section: 'dossier-contact', badge: '08', kbd: 'G T' },
    { title: 'Download Resume (PDF)', action: 'print', badge: 'PDF', kbd: 'P' },
    { title: 'Open VulnInvestigator Live', url: 'https://daipayanghosal.github.io/VulnInvestigator', badge: 'APP', kbd: 'V' },
    { title: 'Open Kahon Audio Sanctuary', url: 'https://kahonstory.com', badge: 'WEB', kbd: 'K' },
    { title: 'Open Creative Studio (Vercel)', url: 'https://studio-beta-nine-42.vercel.app', badge: 'APP', kbd: 'W' },
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
          <div class="palette-empty" style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
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

  // ==========================================================================
  // 5. RETRACTABLE SIDEBAR DRAWER
  // ==========================================================================
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

    const sideLinks = sidebar.querySelectorAll('.side-link');
    sideLinks.forEach((link) => {
      link.addEventListener('click', () => {
        window.closeSideNavbar();
      });
    });
  }

  // ==========================================================================
  // 6. SCROLLSPY (High Performance, Zero Frame Jitter)
  // ==========================================================================
  function initDossierScrollspy() {
    const sections = [
      'dossier-hero',
      'dossier-projects',
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

  // ==========================================================================
  // 7. SCROLL HOVER GUARD (120-144fps Guaranteed)
  // ==========================================================================
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

  // ==========================================================================
  // 8. CONTACT ACTIONS & CLIPBOARD COPY
  // ==========================================================================
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
            copyLabel.textContent = success ? 'Copied!' : email;
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

    const sendMailBtn = document.getElementById('btn-send-mail');
    if (sendMailBtn) {
      sendMailBtn.addEventListener('click', () => {
        sendMailBtn.style.transform = 'scale(0.97)';
        setTimeout(() => {
          sendMailBtn.style.transform = '';
        }, 150);
      });
    }
  }

  // ==========================================================================
  // 9. DYNAMIC EXPERIENCE CALCULATION (from June 1, 2022)
  // ==========================================================================
  function initDynamicExperience() {
    const el = document.getElementById('metric-experience-val');
    const card = document.getElementById('metric-experience-card');
    if (!el) return;

    let isToggled = false;

    function renderExp() {
      const start = new Date(2022, 5, 1); // June 1, 2022 (Resume: June 2022)
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

      el.textContent = isToggled ? detailedText : primaryText;

      if (card) {
        const tooltip = `Experience calculated dynamically from June 2022: ${years} years, ${months} months`;
        card.setAttribute('title', tooltip);
      }
    }

    window.__updateDynamicExperience = renderExp;
    renderExp();

    if (card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        isToggled = !isToggled;
        renderExp();
      });
    }
  }

  // ==========================================================================
  // 10. DOM READY BOOTSTRAP
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    document.body.setAttribute('data-view', 'dossier');
    initTheme();
    initProjectFilters();
    initSideNavbar();
    initCommandPalette();
    initDossierScrollspy();
    initScrollHoverGuard();
    initContactActions();
    initDynamicExperience();
  });
})();
