/**
 * DAIPAYAN GHOSAL // PORTFOLIO
 * Nerd Arcade & Multiverse Console Engine
 * 4 Playable Gamified Channels:
 * 1. 🐍 Slytherin Parseltongue Spellcaster & Serpent Vault
 * 2. ⚽ FC Barcelona Tiki-Taka Rhythm Passing Challenge
 * 3. 🏎️ Mercedes-AMG F1 "Lights Out" Reaction & DRS Tester
 * 4. ☕ Proud Bong Feluda Deduction Lab & Kolkata Adda
 */

(function () {
  let activeChannel = 'slytherin';

  // -------------------------------------------------------------
  // CHANNEL 1: SLYTHERIN SPELLCASTER & SERPENT CIPHER
  // -------------------------------------------------------------
  const SLYTHERIN_SPELLS = {
    serpensortia: {
      incantation: 'SERPENSORTIA // সর্পসর্শিয়া',
      effect: 'Conjures a spectral emerald serpent patrolling the DMZ perimeter.',
      cipher: 'Sssss-hash-256-ssss-cipher-matrix-locked',
      power: 96
    },
    zerotrust: {
      incantation: 'AVADA ZERO-TRUST // পরম সুরক্ষা',
      effect: 'Instantly severs unauthorized token connections across all multi-cloud tenants.',
      cipher: 'Sssss-revoke-okta-bearer-ssss-null',
      power: 99
    },
    legilimens: {
      incantation: 'LEGILIMENS AUDIT // চিত্তসন্ধানী',
      effect: 'Probes adversarial neural memory for prompt injection signatures.',
      cipher: 'Sssss-inspect-attention-heads-ssss',
      power: 92
    },
    imperio: {
      incantation: 'IMPERIO GOVERNANCE // অনুশাসন',
      effect: 'Enforces strict Saviynt role-based access control and SOD policies.',
      cipher: 'Sssss-enforce-least-privilege-ssss',
      power: 94
    }
  };

  function initSlytherinGame() {
    const spellBtns = document.querySelectorAll('.sly-spell-btn');
    const displayBox = document.getElementById('sly-spell-output');
    const canvas = document.getElementById('sly-spark-canvas');

    if (!spellBtns.length || !displayBox) return;

    spellBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        spellBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const spellKey = btn.getAttribute('data-spell');
        castSpell(spellKey);

        if (window.soundEngine) window.soundEngine.playShield();
      });
    });

    function castSpell(key) {
      const data = SLYTHERIN_SPELLS[key] || SLYTHERIN_SPELLS.serpensortia;
      displayBox.innerHTML = `
<span style="color:#4ade80; font-weight:bold;">[INCANTATION CAST: ${data.incantation}]</span>
----------------------------------------------------------------------
<strong>DEFENSE EFFECT:</strong> ${data.effect}
<strong>PARSELTONGUE CIPHER:</strong> <code style="color:#86efac;">${data.cipher}</code>
<strong>EMERALD RUNIC POWER:</strong> <span style="color:#22c55e;">${data.power}/100 [MAXIMUM AMBITION]</span>
<strong>SORTING HAT VERDICT:</strong> <em>"Cunning, leadership, and unyielding defense mastery."</em>
      `;

      renderSlytherinSparks(canvas);
      if (window.unlockAchievement) {
        window.unlockAchievement('ach_slytherin', 'Heir of Ambition', 'Cast Slytherin runic defenses in the Multiverse Console');
      }
    }

    function renderSlytherinSparks(c) {
      if (!c) return;
      const ctx = c.getContext('2d');
      const w = (c.width = c.clientWidth);
      const h = (c.height = c.clientHeight);

      let particles = [];
      for (let i = 0; i < 35; i++) {
        particles.push({
          x: w / 2,
          y: h / 2,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          radius: Math.random() * 3 + 1,
          alpha: 1,
          color: Math.random() > 0.3 ? '#22c55e' : '#86efac'
        });
      }

      function step() {
        ctx.clearRect(0, 0, w, h);
        let alive = false;
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.03;
          if (p.alpha > 0) {
            alive = true;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
          }
        });
        ctx.globalAlpha = 1;
        if (alive) requestAnimationFrame(step);
      }
      step();
    }
  }

  // -------------------------------------------------------------
  // CHANNEL 2: FC BARCELONA TIKI-TAKA RHYTHM CHALLENGE
  // -------------------------------------------------------------
  let barcaPassCount = 0;
  let barcaPossession = 72;
  let barcaTargetPlayer = 0;
  const BARCA_PLAYERS = ['Pedri (Mid)', 'Gavi (Interior)', 'Lamine Yamal (Wing)', 'Cubarsí (Defense)'];

  function initBarcaGame() {
    const passBtn = document.getElementById('barca-pass-btn');
    const countEl = document.getElementById('barca-pass-count');
    const posEl = document.getElementById('barca-possession-val');
    const targetEl = document.getElementById('barca-target-player');
    const statusEl = document.getElementById('barca-game-status');
    const pitchCanvas = document.getElementById('barca-pitch-canvas');

    if (!passBtn || !countEl) return;

    passBtn.addEventListener('click', () => {
      barcaPassCount++;
      barcaPossession = Math.min(88, 65 + Math.floor(barcaPassCount * 1.5));
      barcaTargetPlayer = (barcaTargetPlayer + 1) % BARCA_PLAYERS.length;

      countEl.innerText = barcaPassCount;
      if (posEl) posEl.innerText = barcaPossession + '%';
      if (targetEl) targetEl.innerText = BARCA_PLAYERS[barcaTargetPlayer];

      if (window.soundEngine) window.soundEngine.playClick();

      if (barcaPassCount % 10 === 0) {
        if (statusEl) {
          statusEl.innerHTML = `<span style="color:#edbb00; font-weight:bold;">⚽ GOLAZO! Blaugrana masterclass! 10-pass tiki-taka sequence completed!</span>`;
        }
        if (window.soundEngine) window.soundEngine.playChime();
        if (window.unlockAchievement) {
          window.unlockAchievement('ach_barca', 'Camp Nou Maestro', 'Achieved a double-digit Tiki-Taka sequence!');
        }
      } else {
        if (statusEl) {
          statusEl.innerText = `Ball circulating smoothly. Press evaded. 6-second recovery rule active.`;
        }
      }

      drawBarcaPitch(pitchCanvas, barcaTargetPlayer);
    });

    drawBarcaPitch(pitchCanvas, 0);
  }

  function drawBarcaPitch(c, activeIdx) {
    if (!c) return;
    const ctx = c.getContext('2d');
    const w = (c.width = c.clientWidth);
    const h = (c.height = c.clientHeight);

    ctx.clearRect(0, 0, w, h);

    // Dark Pitch Base with Blaugrana Lines
    ctx.fillStyle = '#061324';
    ctx.fillRect(0, 0, w, h);

    // Pitch markings
    ctx.strokeStyle = 'rgba(0, 77, 152, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(15, 15, w - 30, h - 30);
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 35, 0, Math.PI * 2);
    ctx.stroke();

    // 4 Player Nodes (Diamond formation)
    const nodes = [
      { x: w * 0.5, y: h * 0.28 }, // Pedri
      { x: w * 0.25, y: h * 0.65 }, // Gavi
      { x: w * 0.75, y: h * 0.65 }, // Yamal
      { x: w * 0.5, y: h * 0.85 }  // Cubarsí
    ];

    // Passing lines
    ctx.strokeStyle = 'rgba(237, 187, 0, 0.3)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);
    ctx.lineTo(nodes[1].x, nodes[1].y);
    ctx.lineTo(nodes[3].x, nodes[3].y);
    ctx.lineTo(nodes[2].x, nodes[2].y);
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Player Dots
    nodes.forEach((n, idx) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, idx === activeIdx ? 9 : 6, 0, Math.PI * 2);
      ctx.fillStyle = idx === activeIdx ? '#edbb00' : '#004d98';
      ctx.fill();
      ctx.strokeStyle = '#a50044';
      ctx.lineWidth = 2;
      ctx.stroke();

      if (idx === activeIdx) {
        // Gold pulse ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
        ctx.strokeStyle = '#edbb00';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  }

  // -------------------------------------------------------------
  // CHANNEL 3: MERCEDES-AMG PETRONAS F1 "LIGHTS OUT" TESTER
  // -------------------------------------------------------------
  let f1State = 'idle'; // idle | waiting | lights_out | finished
  let f1StartTime = 0;
  let f1TimeoutId = null;

  function initF1Game() {
    const launchBtn = document.getElementById('f1-launch-btn');
    const lights = document.querySelectorAll('.f1-light');
    const resultEl = document.getElementById('f1-result-display');
    const drsToggle = document.getElementById('f1-drs-toggle');

    if (!launchBtn || !lights.length) return;

    launchBtn.addEventListener('click', () => {
      if (f1State === 'idle' || f1State === 'finished') {
        startF1Countdown();
      } else if (f1State === 'waiting') {
        // Jump start / False start!
        handleF1FalseStart();
      } else if (f1State === 'lights_out') {
        // Successful reaction!
        handleF1Reaction();
      }
    });

    if (drsToggle) {
      drsToggle.addEventListener('change', () => {
        if (window.soundEngine) window.soundEngine.playShield();
      });
    }

    function startF1Countdown() {
      f1State = 'waiting';
      launchBtn.innerHTML = '<span>⚡ READY... CLICK WHEN LIGHTS GO OUT!</span>';
      launchBtn.style.background = '#ef4444';
      resultEl.innerHTML = `<span style="color:#94a3b8;">5 Red Lights engaging... Maintain revs at 12,500 RPM.</span>`;

      // Turn off all lights
      lights.forEach((l) => (l.style.background = '#1e293b'));

      // Turn on 5 red lights sequentially (every 400ms)
      lights.forEach((l, idx) => {
        setTimeout(() => {
          if (f1State === 'waiting') {
            l.style.background = '#ef4444';
            l.style.boxShadow = '0 0 14px #ef4444';
            if (window.soundEngine) window.soundEngine.playKey();
          }
        }, (idx + 1) * 350);
      });

      // Random delay between 2.0s and 4.2s for LIGHTS OUT
      const randomHold = 2000 + Math.random() * 2000;
      f1TimeoutId = setTimeout(() => {
        if (f1State === 'waiting') {
          f1State = 'lights_out';
          f1StartTime = performance.now();
          // Extinguish lights!
          lights.forEach((l) => {
            l.style.background = '#030712';
            l.style.boxShadow = 'none';
          });
          launchBtn.innerHTML = '<span>🟢 LIGHTS OUT! GO GO GO!</span>';
          launchBtn.style.background = '#00d2be';
          launchBtn.style.color = '#000000';
          if (window.soundEngine) window.soundEngine.playAlert();
        }
      }, 5 * 350 + randomHold);
    }

    function handleF1FalseStart() {
      clearTimeout(f1TimeoutId);
      f1State = 'finished';
      launchBtn.innerHTML = '<span>❌ JUMP START! RESET TELEMETRY</span>';
      launchBtn.style.background = '#374151';
      launchBtn.style.color = '#ffffff';

      resultEl.innerHTML = `
<span style="color:#ef4444; font-weight:bold;">🚨 FALSE START / JUMP START DETECTED!</span>
5-second time penalty issued by the FIA Stewards. Toto Wolff is inspecting the clutch telemetry.
      `;

      if (window.soundEngine) window.soundEngine.playAlert();
    }

    function handleF1Reaction() {
      const reactionTime = Math.round(performance.now() - f1StartTime);
      f1State = 'finished';
      launchBtn.innerHTML = '<span>🔄 TEST AGAIN</span>';
      launchBtn.style.background = '#00d2be';
      launchBtn.style.color = '#000000';

      const isDrs = drsToggle && drsToggle.checked ? 'ENABLED (+18 km/h delta)' : 'DISABLED';

      let rating = '';
      if (reactionTime < 210) {
        rating = '<span style="color:#00d2be; font-weight:bold;">POLE POSITION PACE! Faster than Lewis & George off the line!</span>';
      } else if (reactionTime < 270) {
        rating = '<span style="color:#22c55e;">SOLID START! P2 into Turn 1 at Monza!</span>';
      } else {
        rating = '<span style="color:#f59e0b;">WHEELSPIN! Toto Wolff is pounding the table. Warm up the softs and try again.</span>';
      }

      resultEl.innerHTML = `
<span style="color:#00d2be; font-weight:bold;">[MERCEDES F1 TELEMETRY // LAUNCH DATA]</span>
----------------------------------------------------------------------
<strong>REACTION TIME:</strong> <span style="font-size:1.2rem; color:#ffffff;">${reactionTime} ms</span>
<strong>TELEMETRY VERDICT:</strong> ${rating}
<strong>DRS STATUS:</strong> ${isDrs} // Power Unit: M16 Turbo-Hybrid (100% ERS Deploy)
<strong>RADIO:</strong> <em>"Get in there, Daipayan! Brilliant launch execution!"</em>
      `;

      if (window.soundEngine) window.soundEngine.playChime();
      if (window.unlockAchievement) {
        window.unlockAchievement('ach_f1', 'Silver Arrow Pilot', `Recorded a ${reactionTime}ms launch reaction time in Mercedes F1 telemetry!`);
      }
    }
  }

  // -------------------------------------------------------------
  // CHANNEL 4: PROUD BONG // FELUDA'S KOLKATA DEDUCTION LAB
  // -------------------------------------------------------------
  let chaiCupsDrunk = 0;
  let brainpower = 40;

  function initBongGame() {
    const sipBtn = document.getElementById('bong-sip-chai-btn');
    const deduceBtn = document.getElementById('bong-deduce-btn');
    const brainVal = document.getElementById('bong-brainpower-val');
    const chaiCountEl = document.getElementById('bong-chai-count');
    const deductionOutput = document.getElementById('bong-deduction-output');
    const clueChips = document.querySelectorAll('.bong-clue-chip');

    if (!sipBtn || !deduceBtn) return;

    sipBtn.addEventListener('click', () => {
      chaiCupsDrunk++;
      brainpower = Math.min(100, brainpower + 15);

      if (chaiCountEl) chaiCountEl.innerText = `${chaiCupsDrunk} Bhar (ভাড়)`;
      if (brainVal) brainVal.innerText = `${brainpower}%`;

      if (window.soundEngine) window.soundEngine.playClick();
    });

    clueChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('selected');
        brainpower = Math.min(100, brainpower + 10);
        if (brainVal) brainVal.innerText = `${brainpower}%`;
        if (window.soundEngine) window.soundEngine.playKey();
      });
    });

    deduceBtn.addEventListener('click', () => {
      if (brainpower < 70) {
        deductionOutput.innerHTML = `
<span style="color:#f59e0b;">[MAGAJASTRA STANDBY] Brainpower at ${brainpower}%. Sip more College Street chai and inspect the clues to sharpen your deduction!</span>
        `;
        return;
      }

      deductionOutput.innerHTML = `
<span style="color:#f43f5e; font-weight:bold;">[MAGAJASTRA DEPLOYED // ফেলুদার মগজাস্ত্র জয়ী]</span>
----------------------------------------------------------------------
<strong>CASE RESOLVED:</strong> "The Mystery of the Exfiltrated RAG Embeddings at College Street"
<strong>DEDUCTIVE ANALYSIS:</strong>
  1. The earthen clay cup (*bhar*) proved the adversary was operating out of an adda stall near Coffee House.
  2. The yellow Ambassador taxi log verified an attempt to route traffic through an unmonitored proxy node.
  3. The classic Feluda conclusion: <em>"Apnar magajastra thik moto kaaj korche!"</em> The rogue scraper was intercepted before a single byte crossed the Howrah Bridge perimeter!
<strong>REWARD:</strong> A plate of authentic Sandesh & intellectual victory.
      `;

      if (window.soundEngine) window.soundEngine.playChime();
      if (window.unlockAchievement) {
        window.unlockAchievement('ach_feluda', 'Magajastra Master', 'Solved the Kolkata threat mystery with Feluda deduction!');
      }
    });
  }

  // -------------------------------------------------------------
  // CHANNEL 5: MARVEL AVENGERS HUB (SPIDER-MAN & THOR)
  // -------------------------------------------------------------
  let spiderWebsShot = 0;

  function initMarvelGame() {
    const thwipBtn = document.getElementById('marvel-thwip-btn');
    const mjolnirBtn = document.getElementById('marvel-mjolnir-btn');
    const webCountEl = document.getElementById('marvel-web-count');
    const marvelOutput = document.getElementById('marvel-output');
    const lightningCanvas = document.getElementById('marvel-lightning-canvas');

    if (!thwipBtn || !mjolnirBtn) return;

    thwipBtn.addEventListener('click', () => {
      spiderWebsShot++;
      if (webCountEl) webCountEl.innerText = `${spiderWebsShot} Webs Fired`;

      marvelOutput.innerHTML = `
<span style="color:#ef4444; font-weight:bold;">[🕸️ THWIP! SPIDER-SENSE ANOMALY TRAPPED]</span>
----------------------------------------------------------------------
<strong>STATUS:</strong> Perimeter vulnerability cocooned in reinforced tensile webbing.
<strong>PETER's PRINCIPLE:</strong> <em>"With great privilege comes great access governance!"</em>
<strong>SPIDER-SENSE TELEMETRY:</strong> Anomaly neutralized before reaching core database.
      `;

      if (window.soundEngine) window.soundEngine.playKey();
      if (window.unlockAchievement && spiderWebsShot >= 3) {
        window.unlockAchievement('ach_spidey', 'Friendly Neighborhood SecOps', 'Neutralized threats with Spider-Sense web-shooters!');
      }
    });

    mjolnirBtn.addEventListener('click', () => {
      marvelOutput.innerHTML = `
<span style="color:#38bdf8; font-weight:bold;">[⚡ MJOLNIR AUDIT: WHOSOEVER BE WORTHY...]</span>
----------------------------------------------------------------------
<strong>OPERATOR IDENTITY:</strong> Daipayan Ghosal (C|EH Certified Ethical Hacker)
<strong>CODE INTEGRITY AUDIT:</strong> 100% CLEAN
<strong>VERDICT:</strong> <span style="color:#fde047; font-size:1.1rem; font-weight:bold;">YOU ARE DEEMED WORTHY! ⚡</span>
<em>"Whosoever holds this hammer, if he be worthy, shall possess the power of Thor."</em>
Asgardian lightning channeled into enterprise cyber resilience.
      `;

      renderThorLightning(lightningCanvas);
      if (window.soundEngine) window.soundEngine.playShield();
      if (window.unlockAchievement) {
        window.unlockAchievement('ach_thor', 'God of Thunder', 'Proven worthy to wield Mjolnir in the SecOps arena!');
      }
    });

    function renderThorLightning(c) {
      if (!c) return;
      const ctx = c.getContext('2d');
      const w = (c.width = c.clientWidth);
      const h = (c.height = c.clientHeight);

      let bolts = [];
      for (let b = 0; b < 3; b++) {
        let path = [{ x: w / 2, y: 0 }];
        let curX = w / 2;
        let curY = 0;
        while (curY < h) {
          curX += (Math.random() - 0.5) * 25;
          curY += Math.random() * 15 + 10;
          path.push({ x: curX, y: curY });
        }
        bolts.push(path);
      }

      let alpha = 1.0;
      function step() {
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 12;

        bolts.forEach((bolt) => {
          ctx.beginPath();
          ctx.moveTo(bolt[0].x, bolt[0].y);
          for (let i = 1; i < bolt.length; i++) {
            ctx.lineTo(bolt[i].x, bolt[i].y);
          }
          ctx.stroke();
        });

        alpha -= 0.08;
        if (alpha > 0) requestAnimationFrame(step);
      }
      step();
    }
  }

  // -------------------------------------------------------------
  // CHANNEL 6: POWER RANGERS COMMAND CENTER ("IT'S MORPHIN' TIME!")
  // -------------------------------------------------------------
  const RANGER_ZORDS = {
    green: {
      ranger: 'GREEN RANGER // TOMMY OLIVER 🎺',
      zord: 'Dragonzord Defense Grid',
      weapon: 'Dragon Dagger Flute Frequency',
      color: '#22c55e',
      desc: 'Summons underwater cyber dragonzord shielding against advanced persistent threats (APTs).'
    },
    red: {
      ranger: 'RED RANGER // JASON 🦖',
      zord: 'Tyrannosaurus Dinozord',
      weapon: 'Power Sword Executioner',
      color: '#ef4444',
      desc: 'Unleashes raw perimeter firewall firepower against high-volume DDoS floods.'
    },
    white: {
      ranger: 'WHITE RANGER // TIGERZORD 🐅',
      zord: 'White Tigerzord Warrior Mode',
      weapon: 'Saba Enchanted Talking Saber',
      color: '#f8fafc',
      desc: 'Orchestrates pure light zero-trust verification across all identity tenants.'
    }
  };

  function initPowerRangersGame() {
    const morphBtn = document.getElementById('pr-morph-btn');
    const zordSelect = document.getElementById('pr-zord-select');
    const prOutput = document.getElementById('pr-output');
    const prCanvas = document.getElementById('pr-morph-canvas');

    if (!morphBtn || !prOutput) return;

    morphBtn.addEventListener('click', () => {
      const selected = zordSelect ? zordSelect.value : 'green';
      const data = RANGER_ZORDS[selected] || RANGER_ZORDS.green;

      prOutput.innerHTML = `
<span style="color:${data.color}; font-weight:bold; font-size:1rem;">⚡ "IT'S MORPHIN' TIME!" // ${data.ranger}</span>
----------------------------------------------------------------------
<strong>ACTIVE ZORD:</strong> ${data.zord}
<strong>PRIMARY ARSENAL:</strong> ${data.weapon}
<strong>TACTICAL MATRIX:</strong> ${data.desc}
<strong>MEGAZORD STATUS:</strong> <span style="color:#fde047;">DINO MEGAZORD ONLINE & ASSEMBLED!</span>
      `;

      renderMorphFlash(prCanvas, data.color);
      if (window.soundEngine) window.soundEngine.playChime();
      if (window.unlockAchievement) {
        window.unlockAchievement('ach_ranger', 'Mighty Morphin Guardian', 'Triggered the Power Rangers Morphin Grid!');
      }
    });

    function renderMorphFlash(c, color) {
      if (!c) return;
      const ctx = c.getContext('2d');
      const w = (c.width = c.clientWidth);
      const h = (c.height = c.clientHeight);

      let radius = 5;
      let alpha = 1.0;

      function step() {
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 20;
        ctx.fill();

        radius += 8;
        alpha -= 0.05;
        if (alpha > 0) requestAnimationFrame(step);
      }
      step();
    }
  }

  // -------------------------------------------------------------
  // MULTIVERSE CONSOLE TABS SWITCHER
  // -------------------------------------------------------------
  function initMultiverseTabs() {
    const tabBtns = document.querySelectorAll('.mv-tab-btn');
    const channels = document.querySelectorAll('.mv-channel-view');

    if (!tabBtns.length) return;

    tabBtns.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabBtns.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        activeChannel = tab.getAttribute('data-channel');
        channels.forEach((c) => {
          if (c.getAttribute('data-channel') === activeChannel) {
            c.classList.add('active');
          } else {
            c.classList.remove('active');
          }
        });

        if (window.soundEngine) window.soundEngine.playClick();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMultiverseTabs();
    initSlytherinGame();
    initBarcaGame();
    initF1Game();
    initBongGame();
    initMarvelGame();
    initPowerRangersGame();
  });
})();
