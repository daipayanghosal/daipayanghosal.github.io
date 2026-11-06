/**
 * DAIPAYAN GHOSAL // NERD ARCADE ENGINE (REVAMPED)
 * 1. 🐍 House Slytherin: Mischief Maker Spellcaster & Marauder Chaos Rig
 * 2. ⚽ FC Barcelona: El Clásico Tiki-Taka to evade Real Madrid Midfielders (Bellingham, Valverde, Camavinga, Tchouaméni)
 * 3. 🏎️ Mercedes-AMG F1: Speed Up to defeat Red Bull, Ferrari & McLaren
 * 4. ☕ Proud Bong: Ultimate Kolkata Cultural Mastery, Cuisine, Music & Para Adda Tournament
 * 5. ⚔️ Marvel Hub: Pixelated 8-Bit Arcade Fighter (6 Matchups: Cap vs Red Skull, Iron Man vs Ultron, Thor vs Loki, Spidey vs Green Goblin, Hulk vs Thanos, Black Widow vs Taskmaster)
 * 6. 🚨 Power Rangers S.P.D.: Space Patrol Delta Lineup with Judgement Scanner
 */

(function () {
  let activeChannel = 'slytherin';

  // =============================================================
  // CHANNEL 1: SLYTHERIN MISCHIEF SPELLCASTER
  // =============================================================
  let mischiefSpellsCast = 0;
  let mischiefChaos = 35;

  const SLY_MISCHIEF_SPELLS = {
    colloshoo: {
      name: 'Colloshoo (Shoe-Stick Hex)',
      incantation: 'Colloshoo!',
      desc: 'Glues passing Gryffindors\' dragon-hide boots to the stone dungeon floor. They topple headfirst into a cauldron of bubbling Bubotuber pus!',
      chaos: 15,
      verdict: 'FILCH STATUS: Confused and furious, slipping on dungeon flagstones.'
    },
    furnunculus: {
      name: 'Furnunculus & Tarantallegra',
      incantation: 'Furnunculus Tarantallegra!',
      desc: 'Causes rival prefects to sprout giant glowing pimples while compulsively tap-dancing atop the Great Hall banquet tables during dinner!',
      chaos: 20,
      verdict: 'GREAT HALL PANDEMONIUM: Ravenclaw prefects unable to cease high-speed rhythmic dancing.'
    },
    dungbomb: {
      name: 'Zonko\'s Dungbomb & Stink Pellet Barrage',
      incantation: 'Bombarda Fumos!',
      desc: 'Detonates a hidden cache of high-potency dungbombs outside the Potions classroom, causing Snape to cancel the afternoon pop-quiz!',
      chaos: 25,
      verdict: 'SLYTHERIN COMMON ROOM: Cheers erupt as double Potions is suspended for the day.'
    },
    polyjuice: {
      name: 'Polyjuice Infiltration Mischief',
      incantation: 'Morphis Illicitus!',
      desc: 'Took a sip of bubbling green Polyjuice draught brewed in Moaning Myrtle\'s bathroom; sneaked past Mrs. Norris to swap the Quidditch rulebook!',
      chaos: 20,
      verdict: 'STEALTH SCORE: 100%. Madam Hooch discovers the Slytherin pitch reservation is locked.'
    },
    rictusempra: {
      name: 'Rictusempra (The Tickling Hex)',
      incantation: 'Rictusempra!',
      desc: 'Discharges crackling emerald tickling hexes, reducing the entire rival Quidditch squad to tears of uncontrollable helpless laughter!',
      chaos: 15,
      verdict: 'MATCH STATUS: Slytherin takes the Golden Snitch while the chasers are laughing.'
    }
  };

  function initSlytherinGame() {
    const spellBtns = document.querySelectorAll('.sly-spell-btn');
    const outputEl = document.getElementById('sly-spell-output');
    const chaosEl = document.getElementById('sly-chaos-val');
    const canvas = document.getElementById('sly-spark-canvas');

    if (!spellBtns.length || !outputEl) return;

    spellBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        spellBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const key = btn.getAttribute('data-spell') || 'colloshoo';
        const spell = SLY_MISCHIEF_SPELLS[key] || SLY_MISCHIEF_SPELLS.colloshoo;

        mischiefSpellsCast++;
        mischiefChaos = Math.min(100, mischiefChaos + spell.chaos);
        if (chaosEl) chaosEl.innerText = `${mischiefChaos}%`;

        outputEl.innerHTML = `
<span style="color:#86efac; font-weight:bold; font-size:0.92rem;">🐍 INCANTATION: "${spell.incantation}"</span>
<span style="color:#22c55e; font-size:0.8rem; display:block; margin-bottom:0.4rem;">${spell.name}</span>
----------------------------------------------------------------------
<strong>MISCHIEF REPORT:</strong> ${spell.desc}
<strong>OUTCOME:</strong> <em style="color:#fbbf24;">${spell.verdict}</em>
<div style="margin-top:0.4rem; color:#94a3b8; font-size:0.72rem;">Pranks Discharged: <strong>${mischiefSpellsCast}</strong> | <em>"I solemnly swear that I am up to no good!"</em></div>
        `;

        renderSlyMischiefParticles(canvas);
        if (window.soundEngine) window.soundEngine.playKey();

        if (mischiefSpellsCast >= 3 && window.unlockAchievement) {
          window.unlockAchievement('ach_slytherin_mischief', 'Master of Dungeon Mischief', 'Discharged high-level Slytherin prank incantations in the corridors of Hogwarts!');
        }
      });
    });

    function renderSlyMischiefParticles(c) {
      if (!c) return;
      const ctx = c.getContext('2d');
      const w = (c.width = c.clientWidth);
      const h = (c.height = c.clientHeight);

      let particles = [];
      for (let i = 0; i < 35; i++) {
        particles.push({
          x: w / 2,
          y: h / 2,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          radius: Math.random() * 3 + 1.5,
          alpha: 1,
          color: Math.random() > 0.3 ? '#22c55e' : '#86efac'
        });
      }

      function step() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.025;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fill();
        });
        particles = particles.filter((p) => p.alpha > 0);
        if (particles.length > 0) requestAnimationFrame(step);
      }
      step();
    }
  }

  // =============================================================
  // CHANNEL 2: FC BARCELONA TIKI-TAKA VS REAL MADRID MIDFIELD
  // =============================================================
  let barcaPassCount = 0;
  let barcaPossession = 72;
  let barcaActivePlayer = 0; // 0: Pedri, 1: Gavi, 2: Yamal, 3: Frenkie de Jong

  const BARCA_PLAYERS = ['Pedri', 'Gavi', 'Lamine Yamal', 'Frenkie de Jong'];
  const REAL_MADRID_PRESS = [
    { name: 'Jude Bellingham', move: 'lung-busting sliding interception' },
    { name: 'Federico Valverde', move: '35 km/h high-press counter sprint' },
    { name: 'Eduardo Camavinga', move: 'elastic recovery tackle' },
    { name: 'Aurélien Tchouaméni', move: 'physical double-pivot trap' },
    { name: 'Luka Modrić', move: 'pressing shadow lane block' }
  ];

  function initBarcaGame() {
    const passBtn = document.getElementById('barca-pass-btn');
    const passCountEl = document.getElementById('barca-pass-count');
    const possessionEl = document.getElementById('barca-possession-val');
    const statusEl = document.getElementById('barca-game-status');
    const canvas = document.getElementById('barca-pitch-canvas');
    const targetPlayerEl = document.getElementById('barca-target-player');

    if (!passBtn || !canvas) return;

    drawBarcaPitch(canvas, barcaActivePlayer, 0);

    passBtn.addEventListener('click', () => {
      barcaPassCount++;
      barcaActivePlayer = (barcaActivePlayer + 1) % BARCA_PLAYERS.length;
      barcaPossession = Math.min(88, 70 + Math.floor(barcaPassCount * 1.5));

      const madridDefender = REAL_MADRID_PRESS[barcaPassCount % REAL_MADRID_PRESS.length];
      const nextPlayer = BARCA_PLAYERS[barcaActivePlayer];

      if (passCountEl) passCountEl.innerText = barcaPassCount;
      if (possessionEl) possessionEl.innerText = `${barcaPossession}%`;
      if (targetPlayerEl) targetPlayerEl.innerText = nextPlayer;

      const evadeMessages = [
        `🪄 <strong>${BARCA_PLAYERS[(barcaActivePlayer + 3) % 4]}</strong> executes a sublime La Pausa feint, leaving <strong>${madridDefender.name}</strong> sliding across the turf! Ball found ${nextPlayer} in open space.`,
        `⚡ Rapid 1-touch give-and-go! <strong>${madridDefender.name}'s</strong> ${madridDefender.move} was completely bypassed as <strong>${nextPlayer}</strong> turned effortlessly.`,
        `💎 Audacious nutmeg! The high Madrid press was shattered with an impossible through-ball into <strong>${nextPlayer}'s</strong> path.`,
        `🎯 Pinpoint diagonal switch! <strong>${madridDefender.name}</strong> caught shifting across while ${nextPlayer} dictates Camp Nou tempo.`
      ];

      statusEl.innerHTML = `
<div style="color:#edbb00; font-weight:bold; margin-bottom:0.25rem;">[EL CLÁSICO TIKI-TAKA PASS #${barcaPassCount}]</div>
<div style="color:#ffffff; font-size:0.8rem; line-height:1.45;">${evadeMessages[barcaPassCount % evadeMessages.length]}</div>
<div style="color:#38bdf8; font-size:0.72rem; margin-top:0.35rem;">Real Madrid Midfield Bypass: <strong>${madridDefender.name} Outmaneuvered!</strong></div>
      `;

      drawBarcaPitch(canvas, barcaActivePlayer, (barcaPassCount * 45) % 360);
      if (window.soundEngine) window.soundEngine.playKey();

      if (barcaPassCount === 10) {
        statusEl.innerHTML += `<div style="color:#4ade80; font-weight:bold; margin-top:0.4rem;">⚽ GOLAZO! 10-PASS MASTERPIECE! Camp Nou erupts! VISCA EL BARÇA!</div>`;
        if (window.soundEngine) window.soundEngine.playChime();
        if (window.unlockAchievement) {
          window.unlockAchievement('ach_barca_tikitaka', 'Tiki-Taka Master', 'Evaded Real Madrid midfield press with 10 consecutive passes in El Clásico!');
        }
      }
    });

    function drawBarcaPitch(c, activeIdx, rivalAngle) {
      const ctx = c.getContext('2d');
      const w = (c.width = c.clientWidth);
      const h = (c.height = c.clientHeight);

      ctx.clearRect(0, 0, w, h);

      // Pitch Grass (Dark Blaugrana night turf)
      ctx.fillStyle = '#061324';
      ctx.fillRect(0, 0, w, h);

      // Pitch lines
      ctx.strokeStyle = 'rgba(0, 77, 152, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(15, 15, w - 30, h - 30);
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 35, 0, Math.PI * 2);
      ctx.stroke();

      // Barca 4 Nodes (Diamond Formation)
      const nodes = [
        { x: w * 0.5, y: h * 0.28, name: 'Pedri' },
        { x: w * 0.25, y: h * 0.65, name: 'Gavi' },
        { x: w * 0.75, y: h * 0.65, name: 'Yamal' },
        { x: w * 0.5, y: h * 0.85, name: 'F. de Jong' }
      ];

      // Passing lines
      ctx.strokeStyle = 'rgba(237, 187, 0, 0.35)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.lineTo(nodes[1].x, nodes[1].y);
      ctx.lineTo(nodes[3].x, nodes[3].y);
      ctx.lineTo(nodes[2].x, nodes[2].y);
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Real Madrid Pressing Midfielders (White & Purple dots)
      const rad = (rivalAngle * Math.PI) / 180;
      const rivalX = w / 2 + Math.cos(rad) * (w * 0.2);
      const rivalY = h / 2 + Math.sin(rad) * (h * 0.18);

      ctx.beginPath();
      ctx.arc(rivalX, rivalY, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#7c3aed'; // Real Madrid purple
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#c4b5fd';
      ctx.font = '9px monospace';
      ctx.fillText('Press (RM)', rivalX - 22, rivalY - 10);

      // Draw Barca Player Nodes
      nodes.forEach((n, idx) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, idx === activeIdx ? 10 : 7, 0, Math.PI * 2);
        ctx.fillStyle = idx === activeIdx ? '#edbb00' : '#004d98';
        ctx.fill();
        ctx.strokeStyle = '#a50044';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.fillText(n.name, n.x - 18, n.y + (idx === 0 ? -14 : 20));

        if (idx === activeIdx) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
          ctx.strokeStyle = '#edbb00';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });
    }
  }

  // =============================================================
  // CHANNEL 3: MERCEDES-AMG PETRONAS F1 // OVERTAKE RIVALS
  // =============================================================
  let f1Speed = 295;
  let f1ErsDeploy = false;
  let f1Overtakes = { mclaren: false, ferrari: false, redbull: false };

  function initF1Game() {
    const throttleBtn = document.getElementById('f1-throttle-btn');
    const ersBtn = document.getElementById('f1-ers-btn');
    const drsToggle = document.getElementById('f1-drs-toggle');
    const speedEl = document.getElementById('f1-live-speed');
    const resultEl = document.getElementById('f1-result-display');
    const mclarenBadge = document.getElementById('f1-status-mclaren');
    const ferrariBadge = document.getElementById('f1-status-ferrari');
    const redbullBadge = document.getElementById('f1-status-redbull');

    if (!throttleBtn || !speedEl) return;

    throttleBtn.addEventListener('click', () => {
      const isDrs = drsToggle && drsToggle.checked;
      f1Speed += isDrs ? 12 : 8;
      updateF1Telemetry();
      if (window.soundEngine) window.soundEngine.playKey();
    });

    if (ersBtn) {
      ersBtn.addEventListener('click', () => {
        f1Speed += 22;
        f1ErsDeploy = true;
        ersBtn.innerHTML = '<span>⚡ ERS BOOST DEPLOYED (+160 HP ACTIVE)</span>';
        ersBtn.style.background = '#00d2be';
        ersBtn.style.color = '#000000';
        updateF1Telemetry();
        if (window.soundEngine) window.soundEngine.playShield();
      });
    }

    function updateF1Telemetry() {
      if (speedEl) speedEl.innerText = `${f1Speed} km/h`;

      // Check Overtakes
      if (f1Speed >= 322 && !f1Overtakes.mclaren) {
        f1Overtakes.mclaren = true;
        if (mclarenBadge) {
          mclarenBadge.innerText = 'OVERTAKEN! [+0.8s LEAD]';
          mclarenBadge.style.color = '#4ade80';
        }
      }

      if (f1Speed >= 338 && !f1Overtakes.ferrari) {
        f1Overtakes.ferrari = true;
        if (ferrariBadge) {
          ferrariBadge.innerText = 'OVERTAKEN! [+1.4s LEAD]';
          ferrariBadge.style.color = '#4ade80';
        }
      }

      if (f1Speed >= 350 && !f1Overtakes.redbull) {
        f1Overtakes.redbull = true;
        if (redbullBadge) {
          redbullBadge.innerText = 'OVERTAKEN! [P1 VICTORY]';
          redbullBadge.style.color = '#4ade80';
        }
      }

      // Generate Radio Comms
      if (f1Speed < 322) {
        resultEl.innerHTML = `
<strong>BONO RADIO:</strong> <em>"Lewis/Daipayan, maintain slipstream behind Lando Norris in the McLaren. Deploy DRS down the straight!"</em>
<div style="color:#00d2be; margin-top:0.35rem;">Target: McLaren (+0.3s) | Gap closing...</div>
        `;
      } else if (f1Speed < 338) {
        resultEl.innerHTML = `
<strong>BONO RADIO:</strong> <em>"Mega move into Ascari! McLaren is cleared. Now hunting down Charles Leclerc's Ferrari ahead!"</em>
<div style="color:#f97316; margin-top:0.35rem;">Target: Ferrari (+0.6s) | Silver Arrow DRS open!</div>
        `;
      } else if (f1Speed < 350) {
        resultEl.innerHTML = `
<strong>TOTO WOLFF:</strong> <em>"HAMMER TIME! Outstanding pace! Ferrari dispatched at 342 km/h. Max Verstappen's Red Bull is in your crosshairs!"</em>
<div style="color:#ef4444; margin-top:0.35rem;">Target: Red Bull (Max Verstappen) | Final straight sprint!</div>
        `;
      } else {
        resultEl.innerHTML = `
<div style="color:#00d2be; font-weight:bold; font-size:0.95rem;">🏆 P1 FINISH! MERCEDES-AMG PETRONAS TAKES THE CHEQUERED FLAG!</div>
----------------------------------------------------------------------
<strong>TOTO WOLFF RADIO:</strong> <em>"GET IN THERE DAIPAYAN! Absolute masterclass! You overtook the McLaren, Ferrari, and Red Bull on raw race pace!"</em>
<strong>TELEMETRY VERDICT:</strong> Top Speed: <strong>${f1Speed} km/h</strong> | ERS Battery: 100% Depleted | Fastest Lap: Purple Sector 1, 2 & 3!
        `;
        if (window.soundEngine) window.soundEngine.playChime();
        if (window.unlockAchievement) {
          window.unlockAchievement('ach_f1_champion', 'Silver Arrow World Champion', 'Speeded up to overtake McLaren, Ferrari, and Red Bull for P1 victory!');
        }
      }
    }
  }

  // =============================================================
  // CHANNEL 4: PROUD BONG // KOLKATA CULTURAL MASTERY & ADDA TOURNAMENT
  // =============================================================
  let chaiCupsDrunk = 1;
  let culturalResonance = 75;

  const BONG_ACTIVITIES = {
    biryani: {
      title: '🥔 The Sacred Biryani Aloo Tribunal (আলুর মাহাত্ম্য)',
      bengali: 'কলকাতার বিরিয়ানির আলু রক্ষা পরিষদ',
      desc: 'You passionately defend the golden spiced potato in Kolkata Biryani against uninitiated critics. "The Aloo is not a filler—it is slow-cooked for 6 hours absorbing marrow, saffron, and Awadhi spices! Without it, you are merely eating spiced rice!"',
      boost: 15,
      verdict: 'The Tribunal approves. A plate of royal mutton biryani is awarded with extra aloo!'
    },
    ilish: {
      title: '🐟 Sunday Morning Bazar Ilish Inspection (সকালের ইলিশ বাজার)',
      bengali: 'লাল কানকো ও রুপোলি আঁশ পরীক্ষা',
      desc: 'At 7:00 AM in the neighborhood market, you expertly examine the gills of the Hilsa catch: "Tipe dekhlam—bright red gills, iridescent silver sheen, straight from the Padma river, strictly above 1.3 kg. Shorshe bata diye bhapa hobe!"',
      boost: 15,
      verdict: 'Machwala nods in respect. True connoisseur certification granted!'
    },
    dhunuchi: {
      title: '🪔 Durga Puja Dhunuchi Dance Champion (শারদ ধুনুচি নাচ)',
      bengali: 'মহিষাসুরমর্দিনী // ধুনুচি নাচ প্রতিযোগিতা',
      desc: 'During Ashtami Sandhi Puja, you balance smoking earthen pots of burning coconut husk and fragrant frankincense in both hands and between your teeth to the furious crescendo of the Dhaak beats!',
      boost: 20,
      verdict: 'The pandal roars in celebration. Dhunuchi champion of the Para!'
    },
    coffeehouse: {
      title: '☕ College Street Coffee House Infinite Adda (কলেজ স্ট্রিট আড্ডা)',
      bengali: 'কফি হাউসের সেই আড্ডাটা আজও আছে',
      desc: 'Seated beneath the high rotating fan blades, you engage in a 6-hour marathon adda deconstructing Satyajit Ray\'s framing, zero-trust cybersecurity architectures, and the Mohun Bagan derby without ordering a single meal.',
      boost: 15,
      verdict: 'Bearer brings another round of piping hot black coffee and clay bhar er cha.'
    },
    lyadh: {
      title: '🛋️ The Supreme Art of Lyadh (লায়াদ চর্চা)',
      bengali: 'বৃষ্টিভেজা বিকেলে পরম সুখ',
      desc: 'On a stormy monsoon afternoon with rain pelting the vintage green tram tracks, you attain supreme philosophical relaxation in bed, listening to Fossils and Rabindrasangeet with hot telebhaja and luchi.',
      boost: 15,
      verdict: 'Stress eradicated. Creative brainpower recharged to maximum capacity.'
    }
  };

  function initBongGame() {
    const actSelect = document.getElementById('bong-activity-select');
    const actBtn = document.getElementById('bong-act-btn');
    const chaiBtn = document.getElementById('bong-sip-chai-btn');
    const chaiCountEl = document.getElementById('bong-chai-count');
    const vibeEl = document.getElementById('bong-culture-vibe');
    const outputEl = document.getElementById('bong-cultural-output');

    if (!actBtn || !outputEl) return;

    actBtn.addEventListener('click', () => {
      const key = actSelect ? actSelect.value : 'biryani';
      const item = BONG_ACTIVITIES[key] || BONG_ACTIVITIES.biryani;

      culturalResonance = Math.min(100, culturalResonance + item.boost);
      if (vibeEl) vibeEl.innerText = `${culturalResonance}%`;

      outputEl.innerHTML = `
<span style="color:#fbbf24; font-weight:bold; font-size:0.95rem;">${item.title}</span>
<span style="color:#fecdd3; font-size:0.8rem; display:block; margin-bottom:0.4rem;">${item.bengali}</span>
----------------------------------------------------------------------
<strong>THE NARRATIVE:</strong> ${item.desc}
<strong>OUTCOME:</strong> <em style="color:#4ade80;">${item.verdict}</em>
<div style="color:#38bdf8; font-size:0.72rem; margin-top:0.35rem;">Bong Cultural Resonance: <strong>${culturalResonance}% (খাঁটি বাঙালি)</strong></div>
      `;

      if (window.soundEngine) window.soundEngine.playKey();

      if (culturalResonance >= 95 && window.unlockAchievement) {
        window.unlockAchievement('ach_bong_culture', 'True Kolkata Connoisseur', 'Mastered the sacred biryani aloo, ilish inspection, dhunuchi dance, and supreme lyadh!');
      }
    });

    if (chaiBtn) {
      chaiBtn.addEventListener('click', () => {
        chaiCupsDrunk++;
        culturalResonance = Math.min(100, culturalResonance + 8);
        if (chaiCountEl) chaiCountEl.innerText = `${chaiCupsDrunk} Bhar (ভাড়)`;
        if (vibeEl) vibeEl.innerText = `${culturalResonance}%`;

        outputEl.innerHTML = `
<span style="color:#f43f5e; font-weight:bold;">[☕ COLLEGE STREET MATIR BHAR CHAI]</span>
----------------------------------------------------------------------
Smoked ginger Darjeeling first-flush tea poured in raw earthen clay. Fueling high-octane technical discourse and lifelong cultural passion!
        `;
        if (window.soundEngine) window.soundEngine.playClick();
      });
    }
  }

  // =============================================================
  // CHANNEL 5: MARVEL 8-BIT PIXEL ARCADE FIGHTER (6 MATCHUPS)
  // =============================================================
  const MARVEL_MATCHUPS = {
    cap: {
      hero: 'Captain America',
      villain: 'Red Skull',
      heroColor: '#3b82f6',
      villainColor: '#ef4444',
      heroHp: 100,
      villainHp: 100,
      heroSpecial: 'VIBRANIUM SHIELD RICOCHET & STAR-SPANGLED UPPERCUT',
      villainSpecial: 'TESSERACT COSMIC DISCHARGE & HYDRA CANNON',
      heroQuote: '"I can do this all day!"',
      villainQuote: '"Cut off one head, two more shall take its place!"'
    },
    ironman: {
      hero: 'Iron Man',
      villain: 'Ultron',
      heroColor: '#eab308',
      villainColor: '#94a3b8',
      heroHp: 100,
      villainHp: 100,
      heroSpecial: 'UNIBEAM CHEST CANNON & MICRO-MISSILE VOLLEY',
      villainSpecial: 'VIBRANIUM INFECTION & GRAVITY REVERSAL SLAM',
      heroQuote: '"I am Iron Man!"',
      villainQuote: '"There are no strings on me..."'
    },
    thor: {
      hero: 'Thor Odinson',
      villain: 'Loki',
      heroColor: '#38bdf8',
      villainColor: '#22c55e',
      heroHp: 100,
      villainHp: 100,
      heroSpecial: 'MJOLNIR THUNDERSTRIKE & ASGARDIAN BIFROST LIGHTNING',
      villainSpecial: 'ILLUSION CLONE AMBUSH & CHITAURI SCEPTER BEAM',
      heroQuote: '"Bring me Thanos!"',
      villainQuote: '"I am burdened with glorious purpose!"'
    },
    spidey: {
      hero: 'Spider-Man',
      villain: 'Green Goblin',
      heroColor: '#f43f5e',
      villainColor: '#10b981',
      heroHp: 100,
      villainHp: 100,
      heroSpecial: 'WEB-SLING DROPKICK & HIGH-TENSILE COCOON SLAM',
      villainSpecial: 'PUMPKIN BOMB BARRAGE & GLIDER BLADE RUSH',
      heroQuote: '"With great power comes great responsibility!"',
      villainQuote: '"Godspeed, Spider-Man!"'
    },
    hulk: {
      hero: 'The Incredible Hulk',
      villain: 'Thanos',
      heroColor: '#22c55e',
      villainColor: '#a855f7',
      heroHp: 100,
      villainHp: 100,
      heroSpecial: 'HULK SMASH! SEISMIC GROUND QUAKE & THUNDERCLAP',
      villainSpecial: 'INFINITY GAUNTLET POWER STONE PULSE & TITAN BLADE',
      heroQuote: '"HULK SMASH PUNY ADVERSARY!"',
      villainQuote: '"I am inevitable."'
    },
    widow: {
      hero: 'Black Widow',
      villain: 'Taskmaster',
      heroColor: '#64748b',
      villainColor: '#f97316',
      heroHp: 100,
      villainHp: 100,
      heroSpecial: 'WIDOW\'S BITE TAZER STUN & DUAL BATON ACROBATICS',
      villainSpecial: 'PHOTOGRAPHIC REFLEXES SHADOW COUNTER & SWORD DASH',
      heroQuote: '"I\'ve got red in my ledger, now I wipe it out!"',
      villainQuote: '"I can predict your every move."'
    }
  };

  let activeMarvelMatch = 'cap';

  function initMarvelGame() {
    const selectorBtns = document.querySelectorAll('.marvel-match-btn');
    const attackBtn = document.getElementById('marvel-attack-btn');
    const specialBtn = document.getElementById('marvel-special-btn');
    const koBtn = document.getElementById('marvel-ko-btn');
    const heroNameEl = document.getElementById('hud-hero-name');
    const villainNameEl = document.getElementById('hud-villain-name');
    const heroHpEl = document.getElementById('hud-hero-hp');
    const villainHpEl = document.getElementById('hud-villain-hp');
    const heroHpBar = document.getElementById('hud-hero-bar');
    const villainHpBar = document.getElementById('hud-villain-bar');
    const combatOutput = document.getElementById('marvel-combat-log');
    const canvas = document.getElementById('pixel-fighter-canvas');

    if (!selectorBtns.length || !canvas) return;

    render8BitFightScene(canvas, activeMarvelMatch);

    selectorBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        selectorBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        activeMarvelMatch = btn.getAttribute('data-match') || 'cap';
        const data = MARVEL_MATCHUPS[activeMarvelMatch];
        data.heroHp = 100;
        data.villainHp = 100;

        updateMarvelHud();
        render8BitFightScene(canvas, activeMarvelMatch);

        combatOutput.innerHTML = `
<span style="color:#ef4444; font-weight:bold;">[8-BIT FIGHT MATCH INITIALIZED]</span>
<strong>ROUND 1:</strong> ${data.hero} vs. ${data.villain}
<em>${data.hero}: ${data.heroQuote}</em> | <em>${data.villain}: ${data.villainQuote}</em>
        `;
        if (window.soundEngine) window.soundEngine.playKey();
      });
    });

    if (attackBtn) {
      attackBtn.addEventListener('click', () => {
        const data = MARVEL_MATCHUPS[activeMarvelMatch];
        const dmg = Math.floor(Math.random() * 12) + 15;
        data.villainHp = Math.max(0, data.villainHp - dmg);

        updateMarvelHud();
        render8BitAttackFX(canvas, true);

        combatOutput.innerHTML = `
<span style="color:#38bdf8;">[⚔️ 8-BIT HIT CONNECTED]</span> <strong>${data.hero}</strong> attacks <strong>${data.villain}</strong> for <span style="color:#ef4444; font-weight:bold;">-${dmg} HP!</span>
<em>${data.villain} HP remaining: ${data.villainHp}%</em>
        `;

        if (window.soundEngine) window.soundEngine.playKey();
        checkFightOver();
      });
    }

    if (specialBtn) {
      specialBtn.addEventListener('click', () => {
        const data = MARVEL_MATCHUPS[activeMarvelMatch];
        const dmg = Math.floor(Math.random() * 15) + 35;
        data.villainHp = Math.max(0, data.villainHp - dmg);

        updateMarvelHud();
        render8BitAttackFX(canvas, true, true);

        combatOutput.innerHTML = `
<span style="color:#fde047; font-weight:bold;">[💥 SUPER COMBO!]</span> <strong>${data.hero}</strong> unloads <strong>${data.heroSpecial}</strong>!
Massive direct hit on <strong>${data.villain}</strong> for <span style="color:#ef4444; font-weight:bold;">-${dmg} HP!</span>
        `;

        if (window.soundEngine) window.soundEngine.playShield();
        checkFightOver();
      });
    }

    if (koBtn) {
      koBtn.addEventListener('click', () => {
        const data = MARVEL_MATCHUPS[activeMarvelMatch];
        data.villainHp = 0;
        updateMarvelHud();
        render8BitAttackFX(canvas, true, true);
        checkFightOver(true);
      });
    }

    function updateMarvelHud() {
      const data = MARVEL_MATCHUPS[activeMarvelMatch];
      if (heroNameEl) heroNameEl.innerText = data.hero.toUpperCase();
      if (villainNameEl) villainNameEl.innerText = data.villain.toUpperCase();
      if (heroHpEl) heroHpEl.innerText = `${data.heroHp}%`;
      if (villainHpEl) villainHpEl.innerText = `${data.villainHp}%`;
      if (heroHpBar) heroHpBar.style.width = `${data.heroHp}%`;
      if (villainHpBar) villainHpBar.style.width = `${data.villainHp}%`;
    }

    function checkFightOver(forced = false) {
      const data = MARVEL_MATCHUPS[activeMarvelMatch];
      if (data.villainHp <= 0 || forced) {
        combatOutput.innerHTML = `
<div style="color:#fde047; font-size:1.1rem; font-weight:900;">💥 K.O.! ${data.hero.toUpperCase()} VICTORIOUS! 🏆</div>
----------------------------------------------------------------------
<strong>VERDICT:</strong> ${data.villain} has been completely neutralized in 8-bit retro arcade glory!
<em>${data.hero}: ${data.heroQuote}</em>
        `;
        render8BitKO(canvas);
        if (window.soundEngine) window.soundEngine.playChime();
        if (window.unlockAchievement) {
          window.unlockAchievement('ach_marvel_fighter', '8-Bit Avengers Champion', `Defeated ${data.villain} with ${data.hero} in the retro arcade arena!`);
        }
      }
    }

    function render8BitFightScene(c, matchKey) {
      const ctx = c.getContext('2d');
      const w = (c.width = c.clientWidth);
      const h = (c.height = c.clientHeight);
      const data = MARVEL_MATCHUPS[matchKey] || MARVEL_MATCHUPS.cap;

      ctx.clearRect(0, 0, w, h);

      // Retro 8-bit Dojo / City background
      ctx.fillStyle = '#080c18';
      ctx.fillRect(0, 0, w, h);

      // Floor grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let y = h - 45; y < h; y += 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw Pixelated Hero (Left)
      const hx = w * 0.22;
      const hy = h - 45;
      drawPixelSprite(ctx, hx, hy, data.heroColor, data.hero);

      // Draw "VS" in center
      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 14px monospace';
      ctx.fillText('VS', w / 2 - 10, h / 2 + 5);

      // Draw Pixelated Villain (Right)
      const vx = w * 0.78;
      const vy = h - 45;
      drawPixelSprite(ctx, vx, vy, data.villainColor, data.villain, true);
    }

    function drawPixelSprite(ctx, x, y, color, name, isFlipped = false) {
      ctx.save();
      ctx.translate(x, y);
      if (isFlipped) ctx.scale(-1, 1);

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pixel legs
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-8, -18, 6, 18);
      ctx.fillRect(2, -18, 6, 18);

      // Pixel Torso
      ctx.fillStyle = color;
      ctx.fillRect(-10, -42, 20, 24);

      // Pixel Head
      ctx.fillStyle = '#fde047';
      ctx.fillRect(-8, -58, 16, 16);

      // Pixel Eyes / Mask
      ctx.fillStyle = '#000000';
      ctx.fillRect(2, -52, 4, 4);

      // Pixel Arms / Weapon
      ctx.fillStyle = color;
      ctx.fillRect(10, -36, 12, 6);

      ctx.restore();

      // Label below sprite
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(name.slice(0, 10), x, y + 16);
    }

    function render8BitAttackFX(c, isHeroAttack, isSuper = false) {
      const ctx = c.getContext('2d');
      const w = c.width;
      const h = c.height;

      const targetX = isHeroAttack ? w * 0.78 : w * 0.22;
      const targetY = h - 65;

      let frame = 0;
      function anim() {
        ctx.fillStyle = isSuper ? '#fde047' : '#ef4444';
        const size = (frame + 1) * (isSuper ? 8 : 4);
        ctx.fillRect(targetX - size / 2, targetY - size / 2, size, size);

        frame++;
        if (frame < 5) requestAnimationFrame(anim);
        else render8BitFightScene(c, activeMarvelMatch);
      }
      anim();
    }

    function render8BitKO(c) {
      const ctx = c.getContext('2d');
      const w = c.width;
      const h = c.height;

      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('K. O. !', w / 2, h / 2 + 10);
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 2;
      ctx.strokeText('K. O. !', w / 2, h / 2 + 10);
    }
  }

  // =============================================================
  // CHANNEL 6: POWER RANGERS S.P.D. (SPACE PATROL DELTA)
  // =============================================================
  const SPD_RANGERS = {
    red: {
      name: 'RED RANGER // Jack Landors',
      special: 'Molecular Intangibility (Phasing) & Delta Blasters',
      zord: 'Delta Runner 1 (High-Speed Pursuit Zord)',
      color: '#ef4444'
    },
    blue: {
      name: 'BLUE RANGER // Sky Tate',
      special: 'Force Field Shield Projection & Tactical Precision',
      zord: 'Delta Runner 2 (Gyro Copters & Kinetic Barriers)',
      color: '#3b82f6'
    },
    green: {
      name: 'GREEN RANGER // Bridge Carson',
      special: 'Psychometry & Aura Sensing (Handstand Cognition)',
      zord: 'Delta Runner 3 (Heavy Armored Tactical Carrier)',
      color: '#22c55e'
    },
    yellow: {
      name: 'YELLOW RANGER // Elizabeth "Z" Delgado',
      special: 'Genetic Duplication (Multi-Hologram Clone Combat)',
      zord: 'Delta Runner 4 (Dual Sonic Armor Transport)',
      color: '#eab308'
    },
    pink: {
      name: 'PINK RANGER // Sydney "Syd" Drew',
      special: 'Molecular Alteration (Fist of Iron / Element Mimicry)',
      zord: 'Delta Runner 5 (High-Power Water & Flame Cannon)',
      color: '#ec4899'
    },
    shadow: {
      name: 'SHADOW RANGER // Commander Anubis "Doggie" Cruger',
      special: 'Shadow Saber 100-Strike Mastery & S.P.D. Supreme Commander',
      zord: 'Delta Command Megazord (Base Crawler Mode)',
      color: '#06b6d4'
    },
    omega: {
      name: 'OMEGA RANGER // Sam (Time-Travel Light Warrior)',
      special: 'Hyper-Speed Photonic Beams & Electro-Magnetic Pulse',
      zord: 'Omegamax Cycle / Megazord Mode',
      color: '#f8fafc'
    }
  };

  function initPowerRangersGame() {
    const morphBtn = document.getElementById('pr-morph-btn');
    const judgeBtn = document.getElementById('pr-judge-btn');
    const rangerSelect = document.getElementById('pr-ranger-select');
    const outputEl = document.getElementById('pr-output');
    const canvas = document.getElementById('pr-scanner-canvas');

    if (!morphBtn || !outputEl) return;

    morphBtn.addEventListener('click', () => {
      const key = rangerSelect ? rangerSelect.value : 'red';
      const data = SPD_RANGERS[key] || SPD_RANGERS.red;

      outputEl.innerHTML = `
<span style="color:${data.color}; font-weight:bold; font-size:1rem;">🚨 "S.P.D. EMERGENCY!" // ${data.name}</span>
----------------------------------------------------------------------
<strong>GENETIC SPECIALTY:</strong> ${data.special}
<strong>ASSIGNED ZORD:</strong> ${data.zord}
<strong>DELTA COMMAND STATUS:</strong> Space Patrol Delta Base authorization online. Ready for alien syndicate apprehension!
      `;

      renderSpdMorphFlash(canvas, data.color);
      if (window.soundEngine) window.soundEngine.playChime();
    });

    if (judgeBtn) {
      judgeBtn.addEventListener('click', () => {
        const key = rangerSelect ? rangerSelect.value : 'red';
        const data = SPD_RANGERS[key] || SPD_RANGERS.red;

        renderSpdJudgementScanner(canvas, () => {
          outputEl.innerHTML = `
<div style="color:#ef4444; font-weight:bold; font-size:1rem;">🚨 S.P.D. JUDGEMENT TIME: GUILTY! ❌</div>
----------------------------------------------------------------------
<strong>SUPREME COURT OF THE GALAXY VERDICT:</strong>
Adversary guilty of intergalactic zero-day tampering!
<strong>CONTAINMENT:</strong> Offender successfully sealed inside S.P.D. Confinement Card.
<strong>COMMANDER CRUGER:</strong> <em>"Case closed, Rangers. Delta Command Megazord standing down."</em>
          `;
          if (window.soundEngine) window.soundEngine.playAlert();
          if (window.unlockAchievement) {
            window.unlockAchievement('ach_spd_ranger', 'S.P.D. Delta Enforcer', 'Executed Judgement Time with the Space Patrol Delta squad!');
          }
        });
      });
    }

    function renderSpdMorphFlash(c, color) {
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
        ctx.fill();

        radius += 10;
        alpha -= 0.05;
        if (alpha > 0) requestAnimationFrame(step);
      }
      step();
    }

    function renderSpdJudgementScanner(c, callback) {
      if (!c) return;
      const ctx = c.getContext('2d');
      const w = (c.width = c.clientWidth);
      const h = (c.height = c.clientHeight);

      let ticks = 0;
      function scan() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#030712';
        ctx.fillRect(0, 0, w, h);

        // Blinking Red X and Green O
        const isRed = ticks % 2 === 0;
        ctx.fillStyle = isRed ? '#ef4444' : '#22c55e';
        ctx.font = 'bold 28px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(isRed ? '❌ GUILTY' : '⭕ INNOCENT', w / 2, h / 2 + 10);

        ticks++;
        if (ticks < 12) {
          setTimeout(scan, 120);
        } else {
          // Final Verdict: GUILTY!
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = '#030712';
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = '#ef4444';
          ctx.font = 'bold 32px monospace';
          ctx.fillText('❌ GUILTY!', w / 2, h / 2 + 10);
          if (callback) callback();
        }
      }
      scan();
    }
  }

  // =============================================================
  // MULTIVERSE CONSOLE TABS SWITCHER
  // =============================================================
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
