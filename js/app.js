/**
 * DAIPAYAN GHOSAL // PORTFOLIO
 * Main Application Orchestration Engine
 * View Switcher, Command Palette, Gamification, Contact Modal & HUD Telemetry
 */

(function () {
  // 1. Dual Mode System: Sentinel OS vs Executive Dossier
  const savedView = localStorage.getItem('sentinel_view') || 'sentinel';
  document.body.setAttribute('data-view', savedView);

  window.switchViewMode = function (mode) {
    document.body.setAttribute('data-view', mode);
    localStorage.setItem('sentinel_view', mode);

    const btnSentinel = document.getElementById('btn-mode-sentinel');
    const btnExecutive = document.getElementById('btn-mode-executive');

    if (btnSentinel && btnExecutive) {
      if (mode === 'executive') {
        btnExecutive.classList.add('active');
        btnSentinel.classList.remove('active');
      } else {
        btnSentinel.classList.add('active');
        btnExecutive.classList.remove('active');
      }
    }

    if (window.soundEngine) window.soundEngine.playChime();
    if (window.unlockAchievement && mode === 'executive') {
      window.unlockAchievement('ach_dossier', 'Executive Briefing', 'Switched to clean Executive Dossier view');
    }
  };

  // 2. Gamified Achievement System
  const UNLOCKED_ACHIEVEMENTS = JSON.parse(localStorage.getItem('sentinel_achievements') || '{}');

  window.unlockAchievement = function (key, title, desc) {
    if (UNLOCKED_ACHIEVEMENTS[key]) return; // already unlocked

    UNLOCKED_ACHIEVEMENTS[key] = { title, desc, time: Date.now() };
    localStorage.setItem('sentinel_achievements', JSON.stringify(UNLOCKED_ACHIEVEMENTS));

    // Show toast
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <div class="toast-icon">🏆</div>
      <div class="toast-body">
        <h5>ACHIEVEMENT UNLOCKED: ${title}</h5>
        <p>${desc}</p>
      </div>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);

    if (window.soundEngine) window.soundEngine.playChime();

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);

    updateAchievementCounter();
  };

  function updateAchievementCounter() {
    const badge = document.getElementById('achievement-count-badge');
    if (badge) {
      const count = Object.keys(UNLOCKED_ACHIEVEMENTS).length;
      badge.innerText = `[🏆 ${count}/5 ACHIEVEMENTS]`;
    }
  }

  // 3. Command Palette (Ctrl+K or ⌘K)
  const PALETTE_ACTIONS = [
    { title: 'Overview & Profile', section: 'hero', icon: '👤', kbd: 'G O' },
    { title: 'VulnInvestigator (Flagship GenAI Repo)', section: 'vulninvestigator', icon: '🔍', kbd: 'G V' },
    { title: 'AI Threat Defense Lab', section: 'ai-threat-lab', icon: '🛡️', kbd: 'G T' },
    { title: 'IAM & JML Lifecycle Matrix', section: 'iam-matrix', icon: '🔑', kbd: 'G I' },
    { title: 'Skills & Enterprise Expertise', section: 'skills', icon: '⚡', kbd: 'G S' },
    { title: 'Work Experience (Wipro)', section: 'experience', icon: '💼', kbd: 'G E' },
    { title: 'Research & CV Superpixel Lab', section: 'research', icon: '🔬', kbd: 'G R' },
    { title: 'Certifications & Credentials', section: 'certifications', icon: '📜', kbd: 'G C' },
    { title: 'Interactive CLI Terminal', section: 'terminal-section', icon: '💻', kbd: 'G X' },
    { title: 'Slytherin Lore & Ambition', action: 'slytherin', icon: '🐍', kbd: 'S L' },
    { title: 'FC Barcelona (Més que un club)', action: 'barca', icon: '⚽', kbd: 'F C' },
    { title: 'Mercedes-AMG Petronas F1 Team', action: 'f1', icon: '🏎️', kbd: 'F 1' },
    { title: 'Proud Bong // Kolkata Roots', action: 'bong', icon: '☕', kbd: 'B O' },
    { title: 'Toggle Sentinel OS / Executive Mode', action: 'toggleView', icon: '🔄', kbd: 'T' },
    { title: 'Toggle Matrix Digital Rain', action: 'matrix', icon: '🟩', kbd: 'M' },
    { title: 'Open Encrypted Contact Channels', action: 'contact', icon: '✉️', kbd: 'C' },
    { title: 'Print / Save Executive Resume (PDF)', action: 'print', icon: '📄', kbd: 'P' },
    { title: 'Toggle Audio Synthesizer (SFX)', action: 'sfx', icon: '🔊', kbd: 'S' }
  ];

  function initCommandPalette() {
    const overlay = document.getElementById('palette-overlay');
    const input = document.getElementById('palette-input');
    const results = document.getElementById('palette-results');
    const triggerBtn = document.getElementById('hud-cmd-trigger');

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
      if (window.soundEngine) window.soundEngine.playClick();
    };

    window.closePalette = function () {
      overlay.classList.remove('active');
    };

    if (triggerBtn) {
      triggerBtn.addEventListener('click', window.openPalette);
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
      const q = e.target.value.toLowerCase();
      filteredActions = PALETTE_ACTIONS.filter(
        (a) => a.title.toLowerCase().includes(q) || (a.section && a.section.toLowerCase().includes(q))
      );
      selectedIdx = 0;
      renderPaletteResults();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        selectedIdx = (selectedIdx + 1) % filteredActions.length;
        renderPaletteResults();
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        selectedIdx = (selectedIdx - 1 + filteredActions.length) % filteredActions.length;
        renderPaletteResults();
        e.preventDefault();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIdx]) {
          executePaletteAction(filteredActions[selectedIdx]);
        }
      }
    });

    function renderPaletteResults() {
      results.innerHTML = filteredActions
        .map(
          (act, idx) => `
        <div class="palette-item ${idx === selectedIdx ? 'selected' : ''}" data-idx="${idx}">
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <span>${act.icon}</span>
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
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (act.action === 'toggleView') {
        const current = document.body.getAttribute('data-view');
        window.switchViewMode(current === 'sentinel' ? 'executive' : 'sentinel');
      } else if (act.action === 'matrix') {
        window.toggleMatrixMode();
      } else if (act.action === 'contact') {
        window.openContactModal();
      } else if (act.action === 'print') {
        window.print();
      } else if (act.action === 'sfx') {
        toggleSoundBtn();
      } else if (['slytherin', 'barca', 'f1', 'bong'].includes(act.action)) {
        const termInput = document.getElementById('term-input');
        const termSection = document.getElementById('terminal-section');
        if (termInput && termSection) {
          termSection.scrollIntoView({ behavior: 'smooth' });
          termInput.value = act.action;
          termInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        }
      }
    }
  }

  // 4. Sound FX Button Orchestration
  function initSoundButton() {
    const sfxBtn = document.getElementById('hud-sfx-toggle');
    if (!sfxBtn) return;

    function updateLabel(enabled) {
      sfxBtn.innerHTML = enabled
        ? '<span>🔊 SFX: ON</span>'
        : '<span style="opacity: 0.6;">🔈 SFX: OFF</span>';
    }

    updateLabel(window.soundEngine.enabled);

    sfxBtn.addEventListener('click', () => {
      const state = window.soundEngine.toggle();
      updateLabel(state);
    });

    window.toggleSoundBtn = () => {
      const state = window.soundEngine.toggle();
      updateLabel(state);
    };
  }

  // 5. Contact Modal with Copy & WhatsApp fallback
  function initContactModal() {
    const modal = document.getElementById('contact-modal-overlay');
    const closeBtn = document.getElementById('contact-modal-close');
    const copyEmailBtn = document.getElementById('btn-copy-email');
    const copyFeedback = document.getElementById('email-copy-feedback');

    window.openContactModal = function () {
      if (modal) modal.classList.add('active');
      if (window.soundEngine) window.soundEngine.playClick();
    };

    window.closeContactModal = function () {
      if (modal) modal.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', window.closeContactModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) window.closeContactModal();
      });
    }

    const contactTriggers = document.querySelectorAll('.trigger-contact');
    contactTriggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.openContactModal();
      });
    });

    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('daipayanghosal@outlook.com').then(() => {
          if (copyFeedback) {
            copyFeedback.style.display = 'inline-block';
            setTimeout(() => (copyFeedback.style.display = 'none'), 2500);
          }
          if (window.soundEngine) window.soundEngine.playChime();
        });
      });
    }

    // Direct Contact Form Simulation
    const form = document.getElementById('contact-direct-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-form-name').value;
        const msg = document.getElementById('contact-form-msg').value;

        // Open mailto fallback
        const mailtoUrl = `mailto:daipayanghosal@outlook.com?subject=Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg)}`;
        window.location.href = mailtoUrl;

        alert('Dispatching transmission to daipayanghosal@outlook.com via your email client.');
        window.closeContactModal();
      });
    }
  }

  // 6. Live Time & Mouse Ambient Glow
  function initLiveTelemetry() {
    const clockEl = document.getElementById('telemetry-clock');
    function updateClock() {
      if (!clockEl) return;
      const now = new Date();
      // Format in IST (Kolkata)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
      clockEl.innerText = `${timeStr} (Kolkata, IN)`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Mouse Glow
    const glow = document.querySelector('.mouse-glow');
    if (glow) {
      window.addEventListener('mousemove', (e) => {
        glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      });
    }

    // Random Webring button
    const randomRingBtn = document.getElementById('webring-random-btn');
    if (randomRingBtn) {
      const ringMembers = [
        'https://0xmukesh.github.io',
        'https://rohith.net',
        'https://shoobham84.github.io/',
        'https://syswraith.com/',
        'https://nielandvoid.com',
        'https://lab.afreen.tech/',
        'https://rehan-builds.vercel.app/',
        'https://isoumya.is-a.dev/'
      ];
      randomRingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = ringMembers[Math.floor(Math.random() * ringMembers.length)];
        window.open(target, '_blank');
      });
    }
  }

  // 7. Initialize Everything on Load
  document.addEventListener('DOMContentLoaded', () => {
    // Mode switcher buttons
    const btnSentinel = document.getElementById('btn-mode-sentinel');
    const btnExecutive = document.getElementById('btn-mode-executive');

    if (btnSentinel) {
      btnSentinel.addEventListener('click', () => window.switchViewMode('sentinel'));
    }
    if (btnExecutive) {
      btnExecutive.addEventListener('click', () => window.switchViewMode('executive'));
    }

    // Initial view sync
    window.switchViewMode(savedView);

    initSoundButton();
    initCommandPalette();
    initContactModal();
    initLiveTelemetry();
    updateAchievementCounter();

    // Sound effects on buttons & links
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        if (window.soundEngine) window.soundEngine.playHover();
      });
      el.addEventListener('click', () => {
        if (window.soundEngine) window.soundEngine.playClick();
      });
    });

    console.log(
      '%c [SENTINEL-X] DAIPAYAN GHOSAL CYBER PORTFOLIO INITIALIZED %c',
      'background: #00f0ff; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
      ''
    );
  });
})();
