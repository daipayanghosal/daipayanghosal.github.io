/**
 * DAIPAYAN GHOSAL // PORTFOLIO
 * Computer Vision & Research Lab Canvas Playground
 * Interactive visualization of published research algorithms:
 * - Chaotic Aquila Optimizer Superpixel Segmentation (Springer NCA 2023)
 * - Rough K-Means in CIELab (PRIA / SCSRC 2021)
 * - Histogram Fast Clustering & Morphology (ISAI 2022)
 */

(function () {
  let canvas, ctx;
  let activeAlgo = 'aquila';
  let clustersK = 4;
  let threshold = 55;
  let animFrameId = null;

  function initCvLab() {
    canvas = document.getElementById('cv-sim-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Controls
    const algoBtns = document.querySelectorAll('.cv-algo-btn');
    algoBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        algoBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeAlgo = btn.getAttribute('data-algo');
        renderCanvas();
        if (window.soundEngine) window.soundEngine.playClick();
        if (window.unlockAchievement) {
          window.unlockAchievement('ach_researcher', 'Academic Investigator', 'Explored published CV & AI segmentation models');
        }
      });
    });

    const kSlider = document.getElementById('cv-k-slider');
    const kVal = document.getElementById('cv-k-val');
    if (kSlider) {
      kSlider.addEventListener('input', (e) => {
        clustersK = parseInt(e.target.value, 10);
        if (kVal) kVal.innerText = clustersK;
        renderCanvas();
      });
    }

    const tSlider = document.getElementById('cv-thresh-slider');
    const tVal = document.getElementById('cv-thresh-val');
    if (tSlider) {
      tSlider.addEventListener('input', (e) => {
        threshold = parseInt(e.target.value, 10);
        if (tVal) tVal.innerText = threshold + '%';
        renderCanvas();
      });
    }

    canvas.addEventListener('click', () => {
      renderCanvas();
      if (window.soundEngine) window.soundEngine.playKey();
    });

    renderCanvas();
  }

  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    renderCanvas();
  }

  function renderCanvas() {
    if (!canvas || !ctx) return;
    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;

    ctx.clearRect(0, 0, w, h);

    // Dark bio-specimen background
    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 0, w, h);

    const centerX = w / 2;
    const centerY = h / 2;

    if (activeAlgo === 'aquila') {
      // Superpixel Voronoi-like white blood cell segmentation
      drawSuperpixelCell(centerX, centerY, w, h);
    } else if (activeAlgo === 'rough_kmeans') {
      // Rough K-Means in CIELab (Lower bound, boundary, outside regions)
      drawRoughKMeans(centerX, centerY, w, h);
    } else if (activeAlgo === 'crack') {
      // Crack segmentation with morphological edge operators
      drawCrackMorphology(w, h);
    } else {
      // Fast Histogram Clustering
      drawHistogramClustering(centerX, centerY, w, h);
    }

    // Update status readout
    const overlayStatus = document.getElementById('cv-readout');
    if (overlayStatus) {
      overlayStatus.innerText = `ALGO: ${activeAlgo.toUpperCase()} // K=${clustersK} // THRESH=${threshold}% // STATUS: CONVERGED`;
    }
  }

  function drawSuperpixelCell(cx, cy, w, h) {
    // Generate cluster centers (Aquila optimizer quasi-reflection)
    const points = [];
    const cellRadius = Math.min(w, h) * 0.36;

    // Center nucleus
    ctx.beginPath();
    ctx.arc(cx, cy, cellRadius * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(139, 92, 246, 0.45)';
    ctx.fill();
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Superpixel polygons
    const totalSuperpixels = clustersK * 8;
    for (let i = 0; i < totalSuperpixels; i++) {
      const angle = (i / totalSuperpixels) * Math.PI * 2;
      const dist = (cellRadius * 0.25) + Math.random() * (cellRadius * 0.7);
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;
      points.push({ x: px, y: py });
    }

    // Connect superpixel cells
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const d = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
        if (d < 45 * (threshold / 50)) {
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(points[i].x, points[i].y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#00f0ff';
      ctx.fill();
    }

    // Label
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText('WBC LEUKOCYTE MEMBRANE // QUASI-REFLECTED AQUILA OPTIMIZER', 15, 20);
  }

  function drawRoughKMeans(cx, cy, w, h) {
    // Rosette leaf rough clustering with 3 regions: Lower, Boundary, Outer
    const colors = ['#10b981', '#06b6d4', '#f59e0b', '#ec4899', '#8b5cf6'];
    const radius = Math.min(w, h) * 0.38;

    for (let k = 0; k < clustersK; k++) {
      const angleOffset = (k / clustersK) * Math.PI * 2;
      const leafX = cx + Math.cos(angleOffset) * (radius * 0.45);
      const leafY = cy + Math.sin(angleOffset) * (radius * 0.45);
      const col = colors[k % colors.length];

      // Lower Bound (Certain region)
      ctx.beginPath();
      ctx.ellipse(leafX, leafY, 28, 48, angleOffset, 0, Math.PI * 2);
      ctx.fillStyle = col + '55';
      ctx.fill();
      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Rough Boundary (Uncertainty zone)
      ctx.beginPath();
      ctx.ellipse(leafX, leafY, 38, 62, angleOffset, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText('ROSETTE PLANT CIELab // ROUGH K-MEANS BOUNDARIES', 15, 20);
  }

  function drawCrackMorphology(w, h) {
    // Concrete crack structural tracing with morphological contours
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, w, h);

    // Procedural crack path
    ctx.beginPath();
    ctx.moveTo(w * 0.1, h * 0.2);
    let curX = w * 0.1;
    let curY = h * 0.2;

    for (let i = 0; i < 15; i++) {
      curX += (w * 0.8) / 15 + (Math.random() - 0.5) * 15;
      curY += (h * 0.6) / 15 + (Math.random() - 0.5) * 25;
      ctx.lineTo(curX, curY);
    }

    // Dilation contour
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
    ctx.lineWidth = 14 * (threshold / 50);
    ctx.stroke();

    // Erosion contour
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Core fracture
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#f87171';
    ctx.font = '10px monospace';
    ctx.fillText('STRUCTURAL CRACK SEGMENTATION // FAST CLUSTERING & MORPHOLOGY', 15, 20);
  }

  function drawHistogramClustering(cx, cy, w, h) {
    const bars = clustersK * 6;
    const barW = (w - 60) / bars;

    for (let i = 0; i < bars; i++) {
      const barH = (Math.sin(i * 0.35) * 0.5 + 0.5) * (h * 0.65) * (threshold / 70);
      const bx = 30 + i * barW;
      const by = h - 35 - barH;

      ctx.fillStyle = i % clustersK === 0 ? '#00f0ff' : 'rgba(56, 189, 248, 0.4)';
      ctx.fillRect(bx, by, barW - 2, barH);
    }

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText('INTENSITY HISTOGRAM MULTI-THRESHOLD CLUSTERING', 15, 20);
  }

  document.addEventListener('DOMContentLoaded', initCvLab);
})();
