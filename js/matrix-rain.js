/**
 * DAIPAYAN GHOSAL // PORTFOLIO
 * Cyber Grid Particles & Interactive Matrix Rain Canvas
 */

(function () {
  // 1. Ambient Background Particle Mesh
  const cyberCanvas = document.getElementById('cyber-canvas');
  if (cyberCanvas) {
    const ctx = cyberCanvas.getContext('2d');
    let width = (cyberCanvas.width = window.innerWidth);
    let height = (cyberCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = cyberCanvas.width = window.innerWidth;
      height = cyberCanvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 18000), 65);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 0.8,
        color: Math.random() > 0.4 ? 'rgba(0, 240, 255, 0.4)' : 'rgba(139, 92, 246, 0.35)'
      });
    }

    let mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    function renderCyberMesh() {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }

        // Connect to mouse
        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 140) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.35 * (1 - mDist / 140)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      requestAnimationFrame(renderCyberMesh);
    }
    renderCyberMesh();
  }

  // 2. Matrix Digital Rain Canvas (Easter Egg)
  const matrixCanvas = document.getElementById('matrix-canvas');
  if (matrixCanvas) {
    const mCtx = matrixCanvas.getContext('2d');
    let mWidth = (matrixCanvas.width = window.innerWidth);
    let mHeight = (matrixCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      mWidth = matrixCanvas.width = window.innerWidth;
      mHeight = matrixCanvas.height = window.innerHeight;
    });

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンOWASPIAMSAVIYNT';
    const fontSize = 16;
    let columns = Math.floor(mWidth / fontSize);
    let drops = Array(columns).fill(1);

    window.toggleMatrixMode = function (forceState) {
      const isActive = matrixCanvas.classList.contains('active');
      const shouldActive = forceState !== undefined ? forceState : !isActive;

      if (shouldActive) {
        matrixCanvas.classList.add('active');
        columns = Math.floor((matrixCanvas.width = window.innerWidth) / fontSize);
        drops = Array(columns).fill(1);
        if (window.soundEngine) window.soundEngine.playShield();
        if (window.unlockAchievement) window.unlockAchievement('matrix_unlocked', 'The Construct Revealed', 'Matrix digital rain initialized');
      } else {
        matrixCanvas.classList.remove('active');
      }
    };

    matrixCanvas.addEventListener('click', () => {
      window.toggleMatrixMode(false);
    });

    function drawMatrix() {
      if (!matrixCanvas.classList.contains('active')) {
        requestAnimationFrame(drawMatrix);
        return;
      }

      mCtx.fillStyle = 'rgba(4, 7, 12, 0.08)';
      mCtx.fillRect(0, 0, mWidth, mHeight);

      mCtx.fillStyle = '#00f0ff';
      mCtx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        mCtx.fillText(text, x, y);

        if (y > mHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      requestAnimationFrame(drawMatrix);
    }
    drawMatrix();
  }
})();
