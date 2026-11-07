/**
 * ============================================================================
 * macOS TAHOE LIQUID GLASS OPERATING SYSTEM (SENTINEL OS v16.0)
 * Authentic Apple window manager, liquid glass dock physics, top menu bar,
 * control center, sound design, and live multitasking system.
 * ============================================================================
 */

(function () {
  'use strict';

  let highestZ = 100;
  let activeWindowId = 'about';

  const defaultWindowConfigs = {
    'about': { left: 40, top: 48, width: 680, height: 620, title: 'Mission Control & Bio', icon: '👤' },
    'terminal': { left: 540, top: 80, width: 720, height: 580, title: 'Sentinel Terminal — zsh', icon: '💻' },
    'vuln': { left: 120, top: 60, width: 840, height: 640, title: 'VulnInvestigator — Contextual AppSec', icon: '🔍' },
    'ai': { left: 160, top: 70, width: 820, height: 620, title: 'AI Threat Defense Lab', icon: '🛡️' },
    'iam': { left: 180, top: 80, width: 800, height: 600, title: 'Enterprise IGA Matrix', icon: '🔑' },
    'arcade': { left: 100, top: 50, width: 860, height: 660, title: 'Nerd Arcade — Multiverse Hub', icon: '🕹️' },
    'research': { left: 140, top: 70, width: 820, height: 640, title: 'Published Research & CV Lab', icon: '📚' },
    'certs': { left: 200, top: 90, width: 760, height: 580, title: 'Verified Credentials & Keyring', icon: '📜' },
    'experience': { left: 160, top: 60, width: 800, height: 620, title: 'Professional Flight Log', icon: '💼' },
    'badges': { left: 180, top: 120, width: 780, height: 480, title: 'Retro 88x31 Badges Marquee', icon: '🎖️' },
    'contact': { left: 320, top: 100, width: 560, height: 520, title: 'Executive Transmission', icon: '✉️' },
    'settings': { left: 280, top: 80, width: 600, height: 500, title: 'System Settings', icon: '⚙️' }
  };

  const WindowManager = {
    windows: {},

    init() {
      const windowElements = document.querySelectorAll('.macos-window');
      windowElements.forEach((el) => {
        const id = el.getAttribute('data-app');
        if (!id) return;

        this.windows[id] = {
          el: el,
          minimized: false,
          maximized: false,
          prevRect: null
        };

        // Apply initial geometry on desktop
        if (window.innerWidth > 768 && defaultWindowConfigs[id]) {
          const cfg = defaultWindowConfigs[id];
          const maxW = Math.min(cfg.width, window.innerWidth - 60);
          const maxH = Math.min(cfg.height, window.innerHeight - 120);
          el.style.width = `${maxW}px`;
          el.style.height = `${maxH}px`;
          el.style.left = `${Math.min(cfg.left, window.innerWidth - maxW - 20)}px`;
          el.style.top = `${cfg.top}px`;
        }

        this.bindWindowEvents(id, el);
      });

      // Default Open Windows
      this.openWindow('about');
      if (window.innerWidth > 1024) {
        this.openWindow('terminal');
      }
    },

    bindWindowEvents(id, el) {
      const titlebar = el.querySelector('.macos-titlebar');
      const closeBtn = el.querySelector('.traffic-light.close');
      const minBtn = el.querySelector('.traffic-light.minimize');
      const zoomBtn = el.querySelector('.traffic-light.zoom');
      const resizeHandle = el.querySelector('.macos-resize-handle');

      // Click window to focus
      el.addEventListener('mousedown', () => {
        this.focusWindow(id);
      });

      // Traffic Lights
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.closeWindow(id);
        });
      }

      if (minBtn) {
        minBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.minimizeWindow(id);
        });
      }

      if (zoomBtn) {
        zoomBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleMaximize(id);
        });
      }

      // Dragging via Titlebar
      if (titlebar) {
        this.makeDraggable(id, el, titlebar);
        titlebar.addEventListener('dblclick', () => {
          this.toggleMaximize(id);
        });
      }

      // Resizing Handle
      if (resizeHandle) {
        this.makeResizable(el, resizeHandle);
      }
    },

    openWindow(id) {
      const win = this.windows[id];
      if (!win) return;

      win.el.classList.add('open');
      win.el.classList.remove('minimized');
      win.minimized = false;

      this.focusWindow(id);
      this.updateDockState(id, true);

      // Sound
      if (window.soundEngine && typeof window.soundEngine.playSuccess === 'function') {
        window.soundEngine.playSuccess();
      }
    },

    closeWindow(id) {
      const win = this.windows[id];
      if (!win) return;

      win.el.classList.remove('open', 'active');
      this.updateDockState(id, false);

      if (window.soundEngine && typeof window.soundEngine.playClick === 'function') {
        window.soundEngine.playClick();
      }
    },

    minimizeWindow(id) {
      const win = this.windows[id];
      if (!win) return;

      win.el.classList.add('minimized');
      win.el.classList.remove('active');
      win.minimized = true;

      // Animate dock item bounce
      const dockItem = document.querySelector(`.dock-app-item[data-app="${id}"]`);
      if (dockItem) {
        dockItem.classList.add('bouncing');
        setTimeout(() => dockItem.classList.remove('bouncing'), 700);
      }

      if (window.soundEngine && typeof window.soundEngine.playClick === 'function') {
        window.soundEngine.playClick();
      }
    },

    toggleMaximize(id) {
      const win = this.windows[id];
      if (!win) return;

      if (win.maximized) {
        win.el.classList.remove('maximized');
        win.maximized = false;
        if (win.prevRect) {
          win.el.style.left = `${win.prevRect.left}px`;
          win.el.style.top = `${win.prevRect.top}px`;
          win.el.style.width = `${win.prevRect.width}px`;
          win.el.style.height = `${win.prevRect.height}px`;
        }
      } else {
        const r = win.el.getBoundingClientRect();
        win.prevRect = { left: r.left, top: r.top, width: r.width, height: r.height };
        win.el.classList.add('maximized');
        win.maximized = true;
      }

      this.focusWindow(id);
    },

    focusWindow(id) {
      const win = this.windows[id];
      if (!win) return;

      highestZ += 2;
      win.el.style.zIndex = highestZ;

      // Update active states
      Object.keys(this.windows).forEach((key) => {
        if (key === id) {
          this.windows[key].el.classList.add('active');
          this.windows[key].el.classList.remove('inactive');
        } else {
          this.windows[key].el.classList.remove('active');
          this.windows[key].el.classList.add('inactive');
        }
      });

      activeWindowId = id;

      // Update Menu Bar App Title
      const appNameEl = document.getElementById('macos-active-app-name');
      if (appNameEl && defaultWindowConfigs[id]) {
        appNameEl.textContent = defaultWindowConfigs[id].title.split('—')[0].trim();
      }
    },

    updateDockState(id, isRunning) {
      const dockItem = document.querySelector(`.dock-app-item[data-app="${id}"]`);
      if (dockItem) {
        if (isRunning) {
          dockItem.classList.add('running');
        } else {
          dockItem.classList.remove('running');
        }
      }
    },

    makeDraggable(id, el, titlebar) {
      let isDragging = false;
      let startX, startY, initialLeft, initialTop;

      const onMouseDown = (e) => {
        if (e.target.closest('.traffic-light') || e.target.closest('.macos-titlebar-actions') || this.windows[id].maximized) {
          return;
        }

        isDragging = true;
        this.focusWindow(id);

        startX = e.clientX;
        startY = e.clientY;
        const rect = el.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.preventDefault();
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        // Viewport bounds
        newTop = Math.max(30, Math.min(newTop, window.innerHeight - 80));
        newLeft = Math.max(-rBound(el) + 120, Math.min(newLeft, window.innerWidth - 120));

        el.style.left = `${newLeft}px`;
        el.style.top = `${newTop}px`;
      };

      const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      titlebar.addEventListener('mousedown', onMouseDown);

      function rBound(element) {
        return element.offsetWidth || 300;
      }
    },

    makeResizable(el, handle) {
      let isResizing = false;
      let startX, startY, initialW, initialH;

      handle.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        initialW = el.offsetWidth;
        initialH = el.offsetHeight;

        const onMouseMove = (e) => {
          if (!isResizing) return;
          const nw = Math.max(380, initialW + (e.clientX - startX));
          const nh = Math.max(260, initialH + (e.clientY - startY));
          el.style.width = `${nw}px`;
          el.style.height = `${nh}px`;
        };

        const onMouseUp = () => {
          isResizing = false;
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.stopPropagation();
        e.preventDefault();
      });
    }
  };

  const DockManager = {
    init() {
      const dock = document.getElementById('macos-dock');
      if (!dock) return;

      const items = dock.querySelectorAll('.dock-app-item');

      // Click to Open / Focus / Unminimize
      items.forEach((item) => {
        item.addEventListener('click', () => {
          const appId = item.getAttribute('data-app');
          if (!appId) return;

          // Special buttons
          if (appId === 'dossier') {
            if (typeof window.switchViewMode === 'function') {
              window.switchViewMode('dossier');
            }
            return;
          }

          if (appId === 'trash') {
            if (window.soundEngine) window.soundEngine.playError();
            alert('Trash is clean. Zero vulnerability remnants or residual access drift found.');
            return;
          }

          const win = WindowManager.windows[appId];
          if (!win) return;

          if (win.minimized) {
            WindowManager.openWindow(appId);
          } else if (win.el.classList.contains('open') && win.el.classList.contains('active')) {
            WindowManager.minimizeWindow(appId);
          } else {
            WindowManager.openWindow(appId);
          }
        });
      });

      // Parabolic Magnification Effect on Desktop
      if (window.innerWidth > 768) {
        dock.addEventListener('mousemove', (e) => {
          const rect = dock.getBoundingClientRect();
          const mouseX = e.clientX;

          items.forEach((item) => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(mouseX - itemCenter);
            const maxDistance = 140;

            if (distance < maxDistance) {
              const scale = 1 + (0.35 * (1 - distance / maxDistance));
              item.style.transform = `scale(${scale})`;
            } else {
              item.style.transform = 'scale(1)';
            }
          });
        });

        dock.addEventListener('mouseleave', () => {
          items.forEach((item) => {
            item.style.transform = 'scale(1)';
          });
        });
      }
    }
  };

  const MenuBarManager = {
    init() {
      this.initClock();
      this.initAppleMenu();
      this.initControlCenter();
      this.initSpotlightTrigger();
    },

    initClock() {
      const clockEl = document.getElementById('macos-clock');
      if (!clockEl) return;

      const update = () => {
        const now = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dStr = `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()}`;
        let hours = now.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const mins = String(now.getMinutes()).padStart(2, '0');
        const isMobile = window.innerWidth <= 640;
        clockEl.textContent = isMobile ? `${hours}:${mins} ${ampm}` : `${dStr}  ${hours}:${mins} ${ampm}`;
      };

      update();
      setInterval(update, 1000);
    },

    initAppleMenu() {
      const logoBtn = document.getElementById('macos-apple-logo');
      const menu = document.getElementById('macos-apple-menu');
      const aboutModal = document.getElementById('macos-about-modal');
      const closeAboutBtn = document.getElementById('btn-close-about');

      if (!logoBtn || !menu) return;

      logoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('open');
        logoBtn.classList.toggle('active');
        this.closeControlCenter();
      });

      document.addEventListener('click', () => {
        menu.classList.remove('open');
        logoBtn.classList.remove('active');
      });

      // Menu Actions
      const itemAbout = document.getElementById('menu-item-about');
      if (itemAbout && aboutModal) {
        itemAbout.addEventListener('click', () => {
          aboutModal.classList.add('open');
          if (window.soundEngine) window.soundEngine.playSuccess();
        });
      }

      if (closeAboutBtn && aboutModal) {
        closeAboutBtn.addEventListener('click', () => {
          aboutModal.classList.remove('open');
        });
      }

      const itemDossier = document.getElementById('menu-item-dossier');
      if (itemDossier) {
        itemDossier.addEventListener('click', () => {
          if (typeof window.switchViewMode === 'function') {
            window.switchViewMode('dossier');
          }
        });
      }

      const itemSettings = document.getElementById('menu-item-settings');
      if (itemSettings) {
        itemSettings.addEventListener('click', () => {
          WindowManager.openWindow('settings');
        });
      }

      const itemRestart = document.getElementById('menu-item-restart');
      if (itemRestart) {
        itemRestart.addEventListener('click', () => {
          window.location.reload();
        });
      }
    },

    initControlCenter() {
      const ccBtn = document.getElementById('macos-cc-btn');
      const ccPanel = document.getElementById('macos-control-center');

      if (!ccBtn || !ccPanel) return;

      ccBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        ccPanel.classList.toggle('open');
        ccBtn.classList.toggle('active');
        const appleMenu = document.getElementById('macos-apple-menu');
        if (appleMenu) appleMenu.classList.remove('open');
      });

      document.addEventListener('click', (e) => {
        if (!ccPanel.contains(e.target)) {
          this.closeControlCenter();
        }
      });

      // CC Sliders & Toggles
      const volSlider = document.getElementById('cc-volume-slider');
      if (volSlider) {
        volSlider.addEventListener('input', (e) => {
          const val = e.target.value / 100;
          if (window.soundEngine && typeof window.soundEngine.setVolume === 'function') {
            window.soundEngine.setVolume(val);
          }
        });
      }

      const brightSlider = document.getElementById('cc-bright-slider');
      if (brightSlider) {
        brightSlider.addEventListener('input', (e) => {
          const val = 0.5 + (e.target.value / 200);
          document.body.style.filter = `brightness(${val})`;
        });
      }

      const ccSfxTile = document.getElementById('cc-sfx-tile');
      if (ccSfxTile) {
        ccSfxTile.addEventListener('click', () => {
          if (window.soundEngine) {
            const enabled = window.soundEngine.toggle();
            ccSfxTile.classList.toggle('active', enabled);
            const label = ccSfxTile.querySelector('.cc-tile-sub');
            if (label) label.textContent = enabled ? 'On' : 'Off';
          }
        });
      }

      const ccModeSwitch = document.getElementById('cc-switch-dossier');
      if (ccModeSwitch) {
        ccModeSwitch.addEventListener('click', () => {
          if (typeof window.switchViewMode === 'function') {
            window.switchViewMode('dossier');
          }
        });
      }
    },

    closeControlCenter() {
      const ccBtn = document.getElementById('macos-cc-btn');
      const ccPanel = document.getElementById('macos-control-center');
      if (ccPanel) ccPanel.classList.remove('open');
      if (ccBtn) ccBtn.classList.remove('active');
    },

    initSpotlightTrigger() {
      const spotBtn = document.getElementById('macos-spotlight-btn');
      const cmdTrigger = document.getElementById('hud-cmd-trigger');

      if (spotBtn && cmdTrigger) {
        spotBtn.addEventListener('click', () => {
          cmdTrigger.click();
        });
      }
    }
  };

  const DesktopShortcuts = {
    init() {
      const shortcuts = document.querySelectorAll('.desktop-shortcut-item');
      shortcuts.forEach((sc) => {
        sc.addEventListener('click', () => {
          const appId = sc.getAttribute('data-app');
          if (appId) {
            WindowManager.openWindow(appId);
          }
        });
      });
    }
  };

  // Public API
  window.SentinelOS = {
    WindowManager,
    DockManager,
    MenuBarManager,
    DesktopShortcuts,
    openApp(id) {
      WindowManager.openWindow(id);
    },
    init() {
      WindowManager.init();
      DockManager.init();
      MenuBarManager.init();
      DesktopShortcuts.init();
    }
  };

  // Auto-init on load if in sentinel mode
  document.addEventListener('DOMContentLoaded', () => {
    window.SentinelOS.init();
  });
})();
