/**
 * Main Controller Application - Probabilidad & Estadística UNJu
 */
const App = {
  activeTab: 'home',
  activeSubsolver: 'contingency',
  activeDiscreteModel: 'binomial',
  activeContinuousModel: 'normal',
  contingencyData: null,
  deferredInstallPrompt: null,

  init() {
    this.initTheme();
    this.initPWA();
    this.renderTheory();
    this.renderExams();
    this.renderStatTables();
    this.loadContingencyPreset('parcial1');
    this.loadBayesPreset('farmacias');
    this.switchDiscreteModel('binomial');
    this.switchContinuousModel('normal');
    this.bindEvents();
    console.log("App Probabilidad UNJu initialized.");
  },

  // -------------------------------------------------------------
  // Theme & PWA
  // -------------------------------------------------------------
  initTheme() {
    const saved = localStorage.getItem('prob_unju_theme') || 'dark';
    document.documentElement.dataset.theme = saved;
  },

  toggleTheme() {
    const current = document.documentElement.dataset.theme || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('prob_unju_theme', next);
    // Redraw charts if visible
    if (this.activeTab === 'solvers') {
      if (this.activeSubsolver === 'continuous') this.drawNormalCurve();
      if (this.activeSubsolver === 'bayes') this.drawBayesTree();
      if (this.activeSubsolver === 'contingency') this.drawContingencyChart();
    }
  },

  initPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => {
          console.warn('SW registration skipped:', err);
        });
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredInstallPrompt = e;
      const btn = document.getElementById('installBtn');
      if (btn) btn.style.display = 'inline-flex';
    });

    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        if (!this.deferredInstallPrompt) return;
        this.deferredInstallPrompt.prompt();
        const { outcome } = await this.deferredInstallPrompt.userChoice;
        if (outcome === 'accepted') {
          installBtn.style.display = 'none';
        }
        this.deferredInstallPrompt = null;
      });
    }
  },

  bindEvents() {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Window resize redraws canvas
    window.addEventListener('resize', () => {
      if (this.activeTab === 'solvers') {
        if (this.activeSubsolver === 'continuous' && this.activeContinuousModel === 'normal') {
          this.drawNormalCurve();
        } else if (this.activeSubsolver === 'bayes') {
          this.drawBayesTree();
        }
      }
    });
  },

  // -------------------------------------------------------------
  // Navigation
  // -------------------------------------------------------------
  navigateTo(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(`tab-${tabId}`);
    if (target) target.classList.add('active');

    // Update desktop nav
    document.querySelectorAll('.desktop-nav .nav-link').forEach(el => {
      el.classList.toggle('active', el.dataset.tab === tabId);
    });

    // Update mobile nav
    document.querySelectorAll('.bottom-nav .bottom-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.tab === tabId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Handle canvas redraws when switching to solvers
    if (tabId === 'solvers') {
      setTimeout(() => {
        if (this.activeSubsolver === 'continuous' && this.activeContinuousModel === 'normal') {
          this.drawNormalCurve();
        } else if (this.activeSubsolver === 'bayes') {
          this.drawBayesTree();
        }
      }, 100);
    }
  },

  switchSubsolver(subId) {
    this.activeSubsolver = subId;
    document.querySelectorAll('.pills-nav .pill-item').forEach(el => {
      el.classList.toggle('active', el.dataset.subsolver === subId);
    });
    document.querySelectorAll('.subsolver-view').forEach(el => el.style.display = 'none');
    const target = document.getElementById(`subsolver-${subId}`);
    if (target) target.style.display = 'block';

    if (subId === 'continuous' && this.activeContinuousModel === 'normal') {
      setTimeout(() => this.drawNormalCurve(), 50);
    } else if (subId === 'bayes') {
      setTimeout(() => this.drawBayesTree(), 50);
    }
  },

  openSolver(subsolverId, presetId) {
    this.navigateTo('solvers');
    this.switchSubsolver(subsolverId);

    if (subsolverId === 'contingency') {
      const select = document.getElementById('contingencyPresetSelect');
      if (select) {
        select.value = presetId;
        this.loadContingencyPreset(presetId);
      }
    } else if (subsolverId === 'bayes') {
      const select = document.getElementById('bayesPresetSelect');
      if (select) {
        select.value = presetId;
        this.loadBayesPreset(presetId);
      }
    } else if (subsolverId === 'discrete') {
      if (presetId === 'negativeBinomial') {
        document.getElementById('discreteModelSelect').value = 'negativeBinomial';
        this.switchDiscreteModel('negativeBinomial');
      } else if (presetId === 'poissonGamma') {
        document.getElementById('discreteModelSelect').value = 'poisson';
        this.switchDiscreteModel('poisson');
      }
    } else if (subsolverId === 'continuous') {
      if (presetId === 'normal') {
        document.getElementById('continuousModelSelect').value = 'normal';
        this.switchContinuousModel('normal');
      } else if (presetId === 'uniform') {
        document.getElementById('continuousModelSelect').value = 'uniform';
        this.switchContinuousModel('uniform');
      }
    }
  },

  // -------------------------------------------------------------
  // Theory Tab
  // -------------------------------------------------------------
  renderTheory() {
    const container = document.getElementById('theoryContainer');
    if (!container || !TheoryData) return;

    container.innerHTML = TheoryData.map(unit => `
      <div class="exam-accordion" id="accordion-${unit.id}">
        <div class="exam-accordion-header" onclick="App.toggleAccordion('${unit.id}')">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span style="font-size:1.3rem;">${unit.icon}</span>
            <span>${unit.title}</span>
          </div>
          <span id="chevron-${unit.id}">▼</span>
        </div>
        <div class="exam-accordion-body" id="body-${unit.id}">
          <p class="hero-desc" style="margin-bottom:1rem;">${unit.summary}</p>
          ${unit.sections.map(sec => `
            <div class="exercise-card">
              <h4 style="margin-bottom:0.5rem; color:var(--primary); font-size:1rem;">${sec.title}</h4>
              <div>${sec.content}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  },

  toggleAccordion(id) {
    const body = document.getElementById(`body-${id}`);
    const chevron = document.getElementById(`chevron-${id}`);
    if (!body) return;
    const isHidden = body.style.display === 'none';
    body.style.display = isHidden ? 'block' : 'none';
    if (chevron) chevron.textContent = isHidden ? '▼' : '▶';
  },

  filterTheory() {
    const term = (document.getElementById('theorySearchInput').value || '').toLowerCase().trim();
    document.querySelectorAll('#theoryContainer .exam-accordion').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(term) ? 'block' : 'none';
    });
  },

  // -------------------------------------------------------------
  // Contingency Table Solver
  // -------------------------------------------------------------
  loadContingencyPreset(key) {
    let preset;
    if (key === 'parcial1') {
      preset = ExamData[0].exercises[0].preset;
    } else if (key === 'parcial2') {
      preset = ExamData[1].exercises[0].preset;
    } else if (key === 'parcial4') {
      preset = ExamData[3].exercises[0].preset;
    } else {
      preset = {
        rows: ["Fila 1", "Fila 2", "Fila 3"],
        cols: ["Col 1", "Col 2", "Col 3"],
        rowTotals: [100, 70, 30],
        colTotals: [116, null, 28],
        grandTotal: 200,
        matrix: [
          [55, "A", 12],
          ["B", 14, "C"],
          [15, 9, "D"]
        ]
      };
    }

    this.contingencyData = JSON.parse(JSON.stringify(preset));
    this.renderContingencyTableInput();
    const resBox = document.getElementById('contingencyResults');
    if (resBox) resBox.style.display = 'none';
    const chartBox = document.getElementById('contingencyChartBox');
    if (chartBox) chartBox.style.display = 'none';
  },

  renderContingencyTableInput() {
    const container = document.getElementById('contingencyTableWrapper');
    if (!container || !this.contingencyData) return;

    const data = this.contingencyData;
    let html = `
      <table class="exam-table">
        <thead>
          <tr>
            <th>CATEGORÍA</th>
            ${data.cols.map(c => `<th>${c}</th>`).join('')}
            <th>TOTAL FILA</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (let i = 0; i < data.rows.length; i++) {
      html += `<tr><td><strong>${data.rows[i]}</strong></td>`;
      for (let j = 0; j < data.cols.length; j++) {
        const val = data.matrix[i][j];
        const displayVal = val !== null && val !== undefined ? val : '';
        html += `<td><input type="text" class="table-input" id="cell_${i}_${j}" value="${displayVal}"></td>`;
      }
      const rTot = data.rowTotals[i] !== null && data.rowTotals[i] !== undefined ? data.rowTotals[i] : '';
      html += `<td><input type="text" class="table-input font-bold" id="row_tot_${i}" value="${rTot}"></td></tr>`;
    }

    // Column totals row
    html += `<tr class="table-total"><td>TOTAL COLUMNA</td>`;
    for (let j = 0; j < data.cols.length; j++) {
      const cTot = data.colTotals[j] !== null && data.colTotals[j] !== undefined ? data.colTotals[j] : '';
      html += `<td><input type="text" class="table-input font-bold" id="col_tot_${j}" value="${cTot}"></td>`;
    }
    const gTot = data.grandTotal !== null && data.grandTotal !== undefined ? data.grandTotal : '';
    html += `<td><input type="text" class="table-input font-bold text-primary" id="grand_total_input" value="${gTot}"></td></tr>`;

    html += `</tbody></table>`;
    container.innerHTML = html;
  },

  calculateContingency() {
    const data = this.contingencyData;
    const numRows = data.rows.length;
    const numCols = data.cols.length;

    // Read values from inputs
    const matrix = [];
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        const raw = (document.getElementById(`cell_${i}_${j}`).value || '').trim();
        const num = Number(raw);
        row.push(!isNaN(num) && raw !== '' ? num : (raw || `V_${i}_${j}`));
      }
      matrix.push(row);
    }

    const rowTotals = [];
    for (let i = 0; i < numRows; i++) {
      const raw = (document.getElementById(`row_tot_${i}`).value || '').trim();
      const num = Number(raw);
      rowTotals.push(!isNaN(num) && raw !== '' ? num : null);
    }

    const colTotals = [];
    for (let j = 0; j < numCols; j++) {
      const raw = (document.getElementById(`col_tot_${j}`).value || '').trim();
      const num = Number(raw);
      colTotals.push(!isNaN(num) && raw !== '' ? num : null);
    }

    const rawG = (document.getElementById('grand_total_input').value || '').trim();
    const grandTotal = (!isNaN(Number(rawG)) && rawG !== '') ? Number(rawG) : null;

    const result = Solvers.solveContingency(matrix, data.rows, data.cols, rowTotals, colTotals, grandTotal);

    // Update inputs with solved numbers
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const inp = document.getElementById(`cell_${i}_${j}`);
        if (inp) inp.value = result.solvedGrid[i][j];
      }
      const rInp = document.getElementById(`row_tot_${i}`);
      if (rInp) rInp.value = result.rowTotals[i];
    }
    for (let j = 0; j < numCols; j++) {
      const cInp = document.getElementById(`col_tot_${j}`);
      if (cInp) cInp.value = result.colTotals[j];
    }
    document.getElementById('grand_total_input').value = result.grandTotal;

    // Display formatted results
    const N = result.grandTotal;
    let solvedVarsText = Object.keys(result.solvedVars).length > 0 ?
      `<p><strong>Incógnitas resueltas:</strong> ` + Object.entries(result.solvedVars).map(([k, v]) => `<code>${k} = ${v}</code>`).join(', ') + `</p>` : '';

    // Calculate Modal state for row 0
    let maxVal = -1;
    let maxColIdx = 0;
    for (let j = 0; j < numCols; j++) {
      if (result.solvedGrid[0][j] > maxVal) {
        maxVal = result.solvedGrid[0][j];
        maxColIdx = j;
      }
    }
    const modalRow0 = data.cols[maxColIdx];

    // Independence demo (e.g., Row 3 vs Col 0 or Row 0 vs Col 0)
    const testR = Math.min(3, numRows - 1);
    const testC = 0;
    const pJoint = result.solvedGrid[testR][testC] / N;
    const pR = result.rowTotals[testR] / N;
    const pC = result.colTotals[testC] / N;
    const pProd = pR * pC;
    const isIndep = Math.abs(pJoint - pProd) < 1e-6;

    const resBox = document.getElementById('contingencyResults');
    resBox.style.display = 'block';
    resBox.innerHTML = `
      <h4>✅ Análisis Completo de la Tabla</h4>
      ${solvedVarsText}
      <div class="grid-2 mt-2">
        <div class="formula-box">
          <p><strong>Total de observaciones (N):</strong> ${N}</p>
          <p><strong>Promedio por fila:</strong> ${(N / numRows).toFixed(2)}</p>
          <p><strong>Categoría Modal en ${data.rows[0]}:</strong> <span class="badge badge-success">${modalRow0} (${maxVal})</span></p>
        </div>
        <div class="formula-box">
          <p><strong>Prueba de Independencia Estocástica:</strong></p>
          <p><small>${data.rows[testR]} y ${data.cols[testC]}:</small></p>
          <p class="math-expr">P(A ∩ B) = ${pJoint.toFixed(4)}</p>
          <p class="math-expr">P(A) × P(B) = ${pProd.toFixed(4)}</p>
          <p><strong>Conclusión:</strong> <span class="badge ${isIndep ? 'badge-success' : 'badge-warning'}">${isIndep ? 'Son INDEPENDIENTES' : 'Son DEPENDIENTES (No independientes)'}</span></p>
        </div>
      </div>
    `;

    // Render Bar Chart
    this.drawContingencyChart(result, data);
  },

  drawContingencyChart(result, data) {
    if (!result || !data) return;
    const chartBox = document.getElementById('contingencyChartBox');
    chartBox.style.display = 'flex';
    const canvas = document.getElementById('contingencyCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth || 500;
    const height = 240;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    // Draw Column Totals Bar Chart
    const cols = data.cols;
    const totals = result.colTotals;
    const maxVal = Math.max(...totals, 1);
    const padX = 40;
    const padY = 30;
    const chartW = width - padX * 2;
    const chartH = height - padY * 2;

    const barW = chartW / cols.length * 0.6;
    const gap = chartW / cols.length;

    // Draw Axis
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, height - padY);
    ctx.lineTo(width - padX, height - padY);
    ctx.stroke();

    const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];

    cols.forEach((colName, idx) => {
      const val = totals[idx];
      const h = (val / maxVal) * (chartH - 20);
      const x = padX + idx * gap + (gap - barW) / 2;
      const y = height - padY - h;

      // Bar gradient
      const grad = ctx.createLinearGradient(x, y, x, y + h);
      grad.addColorStop(0, colors[idx % colors.length]);
      grad.addColorStop(1, 'rgba(31, 41, 55, 0.8)');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, barW, h);

      // Value label
      ctx.fillStyle = '#f3f4f6';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      const pct = ((val / result.grandTotal) * 100).toFixed(1) + '%';
      ctx.fillText(`${val} (${pct})`, x + barW / 2, y - 6);

      // Col name
      ctx.fillStyle = '#9ca3af';
      ctx.fillText(colName.substring(0, 10), x + barW / 2, height - padY + 16);
    });
  },

  resetContingencyTable() {
    const select = document.getElementById('contingencyPresetSelect');
    this.loadContingencyPreset(select ? select.value : 'parcial1');
  },

  // -------------------------------------------------------------
  // Bayes & Total Probability Solver
  // -------------------------------------------------------------
  loadBayesPreset(key) {
    let preset;
    if (key === 'farmacias') {
      preset = ExamData[0].exercises[1].preset;
    } else if (key === 'circo') {
      preset = {
        causes: [
          { name: "Elefantes (A1)", prior: 0.40, likelihood: 0.98 },
          { name: "Leones (A2)", prior: 0.35, likelihood: 0.99 },
          { name: "Monos (A3)", prior: 0.25, likelihood: 0.95 }
        ],
        eventSuccessName: "Sin Inconvenientes (S)",
        eventFailureName: "Con Inconvenientes (I)"
      };
    } else if (key === 'accidentes') {
      preset = ExamData[3].exercises[1].preset;
    } else {
      preset = {
        causes: [
          { name: "Causa 1 (A1)", prior: 0.50, likelihood: 0.90 },
          { name: "Causa 2 (A2)", prior: 0.50, likelihood: 0.80 }
        ],
        eventSuccessName: "Éxito (B)",
        eventFailureName: "Fallo (Bᶜ)"
      };
    }

    this.renderBayesCauses(preset.causes, preset.eventSuccessName, preset.eventFailureName);
    this.calculateBayes();
  },

  renderBayesCauses(causes, succName = "Éxito (B)", failName = "Fallo (Bᶜ)") {
    const container = document.getElementById('bayesCausesContainer');
    if (!container) return;

    let html = `
      <div class="grid-2 mb-2">
        <div class="form-group">
          <label class="form-label">Nombre Suceso Principal (B)</label>
          <input type="text" class="form-control" id="bayesSuccessName" value="${succName}">
        </div>
        <div class="form-group">
          <label class="form-label">Nombre Suceso Complementario (Bᶜ)</label>
          <input type="text" class="form-control" id="bayesFailureName" value="${failName}">
        </div>
      </div>
      <div class="table-responsive">
        <table class="exam-table">
          <thead>
            <tr>
              <th>CAUSA / RAMA (Aᵢ)</th>
              <th>PROBABILIDAD A PRIORI P(Aᵢ)</th>
              <th>VEROSIMILITUD CONDICIONAL P(B | Aᵢ)</th>
              <th>ACCIÓN</th>
            </tr>
          </thead>
          <tbody id="bayesTbody">
    `;

    causes.forEach((c, idx) => {
      html += `
        <tr id="bayesRow_${idx}">
          <td><input type="text" class="table-input" value="${c.name}"></td>
          <td><input type="number" step="0.01" class="table-input" value="${c.prior}" min="0" max="1"></td>
          <td><input type="number" step="0.01" class="table-input" value="${c.likelihood}" min="0" max="1"></td>
          <td><button class="btn btn-secondary btn-sm" onclick="App.removeBayesCause(${idx})">🗑️</button></td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;
    container.innerHTML = html;
  },

  addBayesCause() {
    const tbody = document.getElementById('bayesTbody');
    if (!tbody) return;
    const idx = tbody.children.length;
    const tr = document.createElement('tr');
    tr.id = `bayesRow_${idx}`;
    tr.innerHTML = `
      <td><input type="text" class="table-input" value="Causa ${idx + 1} (A${idx + 1})"></td>
      <td><input type="number" step="0.01" class="table-input" value="0.20" min="0" max="1"></td>
      <td><input type="number" step="0.01" class="table-input" value="0.90" min="0" max="1"></td>
      <td><button class="btn btn-secondary btn-sm" onclick="App.removeBayesCause(${idx})">🗑️</button></td>
    `;
    tbody.appendChild(tr);
  },

  removeBayesCause(idx) {
    const row = document.getElementById(`bayesRow_${idx}`);
    if (row) row.remove();
  },

  calculateBayes() {
    const tbody = document.getElementById('bayesTbody');
    if (!tbody) return;
    const causes = [];
    for (let tr of tbody.children) {
      const inputs = tr.querySelectorAll('input');
      if (inputs.length >= 3) {
        causes.push({
          name: inputs[0].value.trim(),
          prior: parseFloat(inputs[1].value) || 0,
          likelihood: parseFloat(inputs[2].value) || 0
        });
      }
    }

    if (causes.length === 0) return;

    const res = Solvers.solveBayes(causes);
    const succName = document.getElementById('bayesSuccessName').value || 'B';
    const failName = document.getElementById('bayesFailureName').value || 'Bᶜ';

    const resBox = document.getElementById('bayesResults');
    resBox.style.display = 'block';

    let stepsFormula = causes.map(c => `(${c.prior} × ${c.likelihood})`).join(' + ');
    let stepsVal = res.termsSuccess.map(t => t.joint.toFixed(4)).join(' + ');

    resBox.innerHTML = `
      <h4>🌳 Resultados: Teorema de la Probabilidad Total</h4>
      <div class="formula-box highlight">
        <p><strong>P(${succName}):</strong></p>
        <p class="math-expr">P(${succName}) = Σ P(Aᵢ) · P(${succName} | Aᵢ)</p>
        <p class="math-expr">P(${succName}) = ${stepsFormula}</p>
        <p class="math-expr">P(${succName}) = ${stepsVal} = <strong class="text-success">${res.totalProbSuccess.toFixed(4)} (${(res.totalProbSuccess * 100).toFixed(2)}%)</strong></p>
      </div>

      <h4 class="mt-2">🎯 Probabilidades a Posteriori (Teorema de Bayes):</h4>
      <div class="grid-2">
        <div class="formula-box">
          <p><strong>Dado ${succName}:</strong></p>
          ${res.posteriorSuccess.map(p => `
            <p>P(${p.name} | ${succName}) = <code>${p.posterior.toFixed(4)} (${(p.posterior * 100).toFixed(2)}%)</code></p>
          `).join('')}
        </div>
        <div class="formula-box">
          <p><strong>Dado ${failName}:</strong></p>
          ${res.posteriorFailure.map(p => `
            <p>P(${p.name} | ${failName}) = <code>${p.posterior.toFixed(4)} (${(p.posterior * 100).toFixed(2)}%)</code></p>
          `).join('')}
        </div>
      </div>
    `;

    this.drawBayesTree(causes, res, succName, failName);
  },

  drawBayesTree(causes, res, succName = 'B', failName = 'Bᶜ') {
    const canvas = document.getElementById('bayesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth || 500;
    const height = 300;
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    if (!causes || causes.length === 0) return;

    const startX = 30;
    const midX = width * 0.42;
    const endX = width * 0.88;
    const cy = height / 2;

    // Draw Root
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(startX, cy, 6, 0, Math.PI * 2);
    ctx.fill();

    const n = causes.length;
    const stepY = (height - 40) / n;

    causes.forEach((c, idx) => {
      const my = 20 + idx * stepY + stepY / 2;

      // Line from root to cause
      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(startX, cy);
      ctx.lineTo(midX, my);
      ctx.stroke();

      // Prior label
      ctx.fillStyle = '#a5b4fc';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`P=${c.prior}`, (startX + midX) / 2, (cy + my) / 2 - 5);

      // Cause Node
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(midX, my, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f3f4f6';
      ctx.fillText(c.name.substring(0, 10), midX, my - 8);

      // Branch to Success
      const ySucc = my - stepY * 0.22;
      ctx.strokeStyle = '#34d399';
      ctx.beginPath();
      ctx.moveTo(midX, my);
      ctx.lineTo(endX, ySucc);
      ctx.stroke();

      ctx.fillStyle = '#34d399';
      ctx.fillText(`${succName}: ${c.likelihood}`, (midX + endX) / 2, ySucc - 3);

      // Branch to Failure
      const yFail = my + stepY * 0.22;
      ctx.strokeStyle = '#f87171';
      ctx.beginPath();
      ctx.moveTo(midX, my);
      ctx.lineTo(endX, yFail);
      ctx.stroke();

      ctx.fillStyle = '#f87171';
      ctx.fillText(`${failName}: ${(1 - c.likelihood).toFixed(2)}`, (midX + endX) / 2, yFail + 11);
    });
  },

  // -------------------------------------------------------------
  // Discrete Distributions Solver
  // -------------------------------------------------------------
  switchDiscreteModel(model) {
    this.activeDiscreteModel = model;
    const container = document.getElementById('discreteInputsContainer');
    if (!container) return;

    if (model === 'binomial') {
      container.innerHTML = `
        <div class="grid-3">
          <div class="form-group">
            <label class="form-label">Ensayos (n)</label>
            <input type="number" id="discN" class="form-control" value="10" min="1">
          </div>
          <div class="form-group">
            <label class="form-label">Prob. Éxito (p)</label>
            <input type="number" step="0.01" id="discP" class="form-control" value="0.80" min="0" max="1">
          </div>
          <div class="form-group">
            <label class="form-label">Operación</label>
            <select id="discOp" class="form-control" onchange="App.toggleDiscreteSecondK()">
              <option value="eq">P(X = k) Exacto</option>
              <option value="leq">P(X ≤ k) Acumulada Menor</option>
              <option value="geq">P(X ≥ k) Acumulada Mayor</option>
              <option value="between">P(k1 ≤ X ≤ k2) Intervalo</option>
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Valor k (o k1)</label>
            <input type="number" id="discK" class="form-control" value="8" min="0">
          </div>
          <div class="form-group" id="discK2Group" style="display:none;">
            <label class="form-label">Valor k2</label>
            <input type="number" id="discK2" class="form-control" value="10" min="0">
          </div>
        </div>
      `;
    } else if (model === 'negativeBinomial') {
      container.innerHTML = `
        <div class="grid-3">
          <div class="form-group">
            <label class="form-label">Éxitos Requeridos (r)</label>
            <input type="number" id="discR" class="form-control" value="4" min="1">
          </div>
          <div class="form-group">
            <label class="form-label">Total Ensayos (x)</label>
            <input type="number" id="discX" class="form-control" value="6" min="1">
          </div>
          <div class="form-group">
            <label class="form-label">Prob. Éxito (p)</label>
            <input type="number" step="0.01" id="discP" class="form-control" value="0.80" min="0" max="1">
          </div>
        </div>
        <p class="hero-desc"><small>Resuelve por ejemplo: "¿Cuál es la probabilidad de que el 6° alumno entrevistado sea el 4° que cursó la materia?" (r=4, x=6, p=0.8)</small></p>
      `;
    } else if (model === 'poisson') {
      container.innerHTML = `
        <div class="grid-3">
          <div class="form-group">
            <label class="form-label">Tasa λ (por unidad t)</label>
            <input type="number" step="0.1" id="discLambda" class="form-control" value="5" min="0">
          </div>
          <div class="form-group">
            <label class="form-label">Intervalo t (μ = λ · t)</label>
            <input type="number" step="0.1" id="discT" class="form-control" value="1.0" min="0">
          </div>
          <div class="form-group">
            <label class="form-label">Operación</label>
            <select id="discOp" class="form-control" onchange="App.toggleDiscreteSecondK()">
              <option value="eq">P(X = k) Exacto</option>
              <option value="leq">P(X ≤ k) Acumulada Menor</option>
              <option value="geq">P(X ≥ k) Acumulada Mayor</option>
              <option value="between">P(k1 ≤ X ≤ k2) Intervalo</option>
            </select>
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Valor k</label>
            <input type="number" id="discK" class="form-control" value="7" min="0">
          </div>
          <div class="form-group" id="discK2Group" style="display:none;">
            <label class="form-label">Valor k2</label>
            <input type="number" id="discK2" class="form-control" value="7" min="0">
          </div>
        </div>
      `;
    } else if (model === 'hypergeometric') {
      container.innerHTML = `
        <div class="grid-4">
          <div class="form-group">
            <label class="form-label">Población (N)</label>
            <input type="number" id="discHN" class="form-control" value="47" min="1">
          </div>
          <div class="form-group">
            <label class="form-label">Éxitos en Población (A)</label>
            <input type="number" id="discHA" class="form-control" value="23" min="0">
          </div>
          <div class="form-group">
            <label class="form-label">Muestra (n)</label>
            <input type="number" id="discHn" class="form-control" value="7" min="1">
          </div>
          <div class="form-group">
            <label class="form-label">Éxitos Muestra (k)</label>
            <input type="number" id="discHk" class="form-control" value="2" min="0">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Operación</label>
          <select id="discOp" class="form-control">
            <option value="eq">P(X = k)</option>
            <option value="geq">P(X ≥ k)</option>
            <option value="leq">P(X ≤ k)</option>
          </select>
        </div>
        <p class="hero-desc"><small>Ejemplo Parcial: 47 peces en criadero, 23 surubíes, muestra de 7 peces.</small></p>
      `;
    } else if (model === 'geometric') {
      container.innerHTML = `
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Probabilidad de Éxito (p)</label>
            <input type="number" step="0.01" id="discP" class="form-control" value="0.25" min="0" max="1">
          </div>
          <div class="form-group">
            <label class="form-label">Ensayo del 1° Éxito (x)</label>
            <input type="number" id="discX" class="form-control" value="4" min="1">
          </div>
        </div>
      `;
    }

    const resBox = document.getElementById('discreteResults');
    if (resBox) resBox.style.display = 'none';
  },

  toggleDiscreteSecondK() {
    const op = document.getElementById('discOp').value;
    const group = document.getElementById('discK2Group');
    if (group) group.style.display = op === 'between' ? 'block' : 'none';
  },

  calculateDiscrete() {
    const model = this.activeDiscreteModel;
    const resBox = document.getElementById('discreteResults');
    resBox.style.display = 'block';

    if (model === 'binomial') {
      const n = parseInt(document.getElementById('discN').value);
      const p = parseFloat(document.getElementById('discP').value);
      const k = parseInt(document.getElementById('discK').value);
      const op = document.getElementById('discOp').value;
      const k2 = op === 'between' ? parseInt(document.getElementById('discK2').value) : null;

      const res = Solvers.solveBinomial(n, p, k, op, k2);

      resBox.innerHTML = `
        <h4>🎲 Distribución Binomial B(n = ${n}, p = ${p})</h4>
        <div class="result-number">${MathUtils.formatProb(res.prob)}</div>
        <div class="formula-box highlight">
          <p><strong>Probabilidad calculada:</strong> ${res.description} = ${res.prob.toFixed(5)} (${(res.prob * 100).toFixed(2)}%)</p>
          <p><strong>Esperanza E(X):</strong> μ = n · p = ${n} × ${p} = <strong>${res.mu.toFixed(2)}</strong></p>
          <p><strong>Varianza Var(X):</strong> σ² = n · p · (1 - p) = <strong>${res.variance.toFixed(4)}</strong></p>
          <p><strong>Desviación estándar:</strong> σ = <strong>${res.sigma.toFixed(4)}</strong></p>
        </div>
      `;
    } else if (model === 'negativeBinomial') {
      const r = parseInt(document.getElementById('discR').value);
      const x = parseInt(document.getElementById('discX').value);
      const p = parseFloat(document.getElementById('discP').value);

      const res = Solvers.solveNegativeBinomial(r, p, x);

      resBox.innerHTML = `
        <h4>🎲 Distribución Binomial Negativa (Pascal) BN(r = ${r}, p = ${p})</h4>
        <div class="result-number">${MathUtils.formatProb(res.prob, 5)}</div>
        <div class="formula-box highlight">
          <p class="math-expr">P(X = ${x}) = \\binom{${x} - 1}{${r} - 1} (${p})^{${r}} (${(1 - p).toFixed(2)})^{${x - r}}</p>
          <p class="math-expr">P(X = ${x}) = \\binom{${x - 1}}{${r - 1}} (${p})^{${r}} (${(1 - p).toFixed(2)})^{${x - r}} = ${res.comb} × ${Math.pow(p, r).toFixed(4)} × ${Math.pow(1 - p, x - r).toFixed(4)}</p>
          <p><strong>Esperanza E(X):</strong> r / p = ${r} / ${p} = <strong>${res.mu.toFixed(2)} ensayos</strong></p>
          <p><strong>Varianza Var(X):</strong> r(1-p)/p² = <strong>${res.variance.toFixed(4)}</strong></p>
        </div>
      `;
    } else if (model === 'poisson') {
      const lambda = parseFloat(document.getElementById('discLambda').value);
      const t = parseFloat(document.getElementById('discT').value);
      const k = parseInt(document.getElementById('discK').value);
      const op = document.getElementById('discOp').value;
      const k2 = op === 'between' ? parseInt(document.getElementById('discK2').value) : null;

      const res = Solvers.solvePoisson(lambda, t, k, op, k2);

      resBox.innerHTML = `
        <h4>⏱️ Distribución de Poisson (λ = ${lambda}, t = ${t} ⟹ μ = ${res.mu})</h4>
        <div class="result-number">${MathUtils.formatProb(res.prob)}</div>
        <div class="formula-box highlight">
          <p><strong>Cálculo:</strong> ${res.description} = ${res.prob.toFixed(5)} (${(res.prob * 100).toFixed(2)}%)</p>
          <p><strong>Parámetro de media:</strong> μ = λ · t = <strong>${res.mu}</strong></p>
          <p><strong>Varianza:</strong> σ² = μ = <strong>${res.variance}</strong></p>
          <p><strong>Desviación estándar:</strong> σ = <strong>${res.sigma.toFixed(4)}</strong></p>
        </div>
      `;
    } else if (model === 'hypergeometric') {
      const N = parseInt(document.getElementById('discHN').value);
      const A = parseInt(document.getElementById('discHA').value);
      const n = parseInt(document.getElementById('discHn').value);
      const k = parseInt(document.getElementById('discHk').value);
      const op = document.getElementById('discOp').value;

      const res = Solvers.solveHypergeometric(N, A, n, k, op);

      resBox.innerHTML = `
        <h4>🐟 Distribución Hipergeométrica H(N = ${N}, A = ${A}, n = ${n})</h4>
        <div class="result-number">${MathUtils.formatProb(res.prob)}</div>
        <div class="formula-box highlight">
          <p><strong>Probabilidad:</strong> ${res.description} = ${res.prob.toFixed(5)} (${(res.prob * 100).toFixed(2)}%)</p>
          <p><strong>Esperanza E(X):</strong> n · (A / N) = ${n} × (${A} / ${N}) = <strong>${res.mu.toFixed(4)}</strong></p>
          <p><strong>Varianza Var(X):</strong> <strong>${res.variance.toFixed(4)}</strong> (σ = ${res.sigma.toFixed(4)})</p>
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // Continuous Distributions Solver
  // -------------------------------------------------------------
  switchContinuousModel(model) {
    this.activeContinuousModel = model;
    const container = document.getElementById('continuousInputsContainer');
    const chartBox = document.getElementById('normalChartContainer');
    if (!container) return;

    if (model === 'normal') {
      chartBox.style.display = 'flex';
      container.innerHTML = `
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Media (μ)</label>
            <input type="number" step="0.1" id="contMu" class="form-control" value="8.2" oninput="App.drawNormalCurve()">
          </div>
          <div class="form-group">
            <label class="form-label">Desvío Estándar (σ)</label>
            <input type="number" step="0.1" id="contSigma" class="form-control" value="1.1" min="0.001" oninput="App.drawNormalCurve()">
          </div>
        </div>
        <div class="grid-3">
          <div class="form-group">
            <label class="form-label">Operación</label>
            <select id="contOp" class="form-control" onchange="App.toggleNormalInputs()">
              <option value="between">P(x1 ≤ X ≤ x2) Intervalo</option>
              <option value="leq">P(X ≤ x) Menor o Igual</option>
              <option value="geq">P(X ≥ x) Mayor o Igual</option>
              <option value="percentile">Percentil Inverso: Hallar x para P(X < x)</option>
            </select>
          </div>
          <div class="form-group" id="contX1Group">
            <label class="form-label" id="contX1Label">Límite x1</label>
            <input type="number" step="0.1" id="contX1" class="form-control" value="7.0" oninput="App.drawNormalCurve()">
          </div>
          <div class="form-group" id="contX2Group">
            <label class="form-label">Límite x2</label>
            <input type="number" step="0.1" id="contX2" class="form-control" value="10.0" oninput="App.drawNormalCurve()">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Población / Muestra para estimar cantidad esperada (Opcional N)</label>
          <input type="number" id="contPopSize" class="form-control" value="20" placeholder="Ej: 20 encuentros o 1500 estudiantes">
        </div>
      `;
      setTimeout(() => this.drawNormalCurve(), 50);
    } else if (model === 'uniform') {
      chartBox.style.display = 'none';
      container.innerHTML = `
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Límite Inferior (a)</label>
            <input type="number" step="0.1" id="uniA" class="form-control" value="4.0">
          </div>
          <div class="form-group">
            <label class="form-label">Límite Superior (b)</label>
            <input type="number" step="0.1" id="uniB" class="form-control" value="10.0">
          </div>
        </div>
        <div class="grid-3">
          <div class="form-group">
            <label class="form-label">Operación</label>
            <select id="uniOp" class="form-control">
              <option value="geq">P(X ≥ x1)</option>
              <option value="leq">P(X ≤ x1)</option>
              <option value="between">P(x1 ≤ X ≤ x2)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Valor x1</label>
            <input type="number" step="0.1" id="uniX1" class="form-control" value="8.0">
          </div>
          <div class="form-group">
            <label class="form-label">Valor x2 (si es intervalo)</label>
            <input type="number" step="0.1" id="uniX2" class="form-control" value="10.0">
          </div>
        </div>
        <p class="hero-desc"><small>Ejemplo Parcial: Lead time de repuesto distribuido uniformemente entre 4 y 10 días.</small></p>
      `;
    } else if (model === 'gamma') {
      chartBox.style.display = 'none';
      container.innerHTML = `
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Parámetro de Forma α (o eventos r)</label>
            <input type="number" step="1" id="gammaAlpha" class="form-control" value="2" min="1">
          </div>
          <div class="form-group">
            <label class="form-label">Parámetro de Escala β (tiempo medio entre eventos)</label>
            <input type="number" step="0.1" id="gammaBeta" class="form-control" value="12" min="0.1">
          </div>
        </div>
        <div class="grid-3">
          <div class="form-group">
            <label class="form-label">Operación</label>
            <select id="gammaOp" class="form-control">
              <option value="leq">P(Y ≤ t1)</option>
              <option value="between">P(t1 ≤ Y ≤ t2)</option>
              <option value="geq">P(Y ≥ t1)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Tiempo t1</label>
            <input type="number" step="1" id="gammaT1" class="form-control" value="30">
          </div>
          <div class="form-group">
            <label class="form-label">Tiempo t2</label>
            <input type="number" step="1" id="gammaT2" class="form-control" value="48">
          </div>
        </div>
        <p class="hero-desc"><small>Ejemplo Parcial Heladería: Y ~ Gamma(α=2 clientes, β=12 seg). Hallar P(Y ≤ 30) y P(30 ≤ Y ≤ 48).</small></p>
      `;
    } else if (model === 'exponential') {
      chartBox.style.display = 'none';
      container.innerHTML = `
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Parámetro β (media = 1/λ)</label>
            <input type="number" step="0.1" id="expBeta" class="form-control" value="12.0" min="0.01">
          </div>
          <div class="form-group">
            <label class="form-label">Tiempo x</label>
            <input type="number" step="0.1" id="expX" class="form-control" value="15.0">
          </div>
        </div>
      `;
    }

    const resBox = document.getElementById('continuousResults');
    if (resBox) resBox.style.display = 'none';
  },

  toggleNormalInputs() {
    const op = document.getElementById('contOp').value;
    const x2Group = document.getElementById('contX2Group');
    const x1Label = document.getElementById('contX1Label');

    if (op === 'percentile') {
      x1Label.textContent = 'Probabilidad deseada p (ej: 0.25)';
      x2Group.style.display = 'none';
    } else if (op === 'between') {
      x1Label.textContent = 'Límite x1';
      x2Group.style.display = 'block';
    } else {
      x1Label.textContent = 'Límite x';
      x2Group.style.display = 'none';
    }
    this.drawNormalCurve();
  },

  calculateContinuous() {
    const model = this.activeContinuousModel;
    const resBox = document.getElementById('continuousResults');
    resBox.style.display = 'block';

    if (model === 'normal') {
      const mu = parseFloat(document.getElementById('contMu').value);
      const sigma = parseFloat(document.getElementById('contSigma').value);
      const op = document.getElementById('contOp').value;
      const x1 = parseFloat(document.getElementById('contX1').value);
      const x2 = op === 'between' ? parseFloat(document.getElementById('contX2').value) : null;
      const popSize = parseFloat(document.getElementById('contPopSize').value) || null;

      if (op === 'percentile') {
        const p = x1;
        const res = Solvers.solveNormalPercentile(mu, sigma, p);
        resBox.innerHTML = `
          <h4>🔔 Cálculo Inverso / Percentil en Distribución Normal</h4>
          <div class="result-number">x = ${res.x.toFixed(4)}</div>
          <div class="formula-box highlight">
            <p><strong>Probabilidad acumulada deseada:</strong> P(X < x) = ${p}</p>
            <p><strong>Valor estandarizado Z:</strong> z = ${res.z.toFixed(4)}</p>
            <p class="math-expr">x = \\mu + z \\cdot \\sigma = ${mu} + (${res.z.toFixed(4)}) \\cdot ${sigma} = <strong>${res.x.toFixed(4)}</strong></p>
          </div>
        `;
      } else {
        const res = Solvers.solveNormal(mu, sigma, x1, x2, op, popSize);
        let zText = '';
        if (res.z1 !== null && res.z2 !== null) {
          zText = `<p class="math-expr">z_1 = \\frac{${Math.min(x1, x2)} - ${mu}}{${sigma}} = ${res.z1.toFixed(2)}, \\quad z_2 = \\frac{${Math.max(x1, x2)} - ${mu}}{${sigma}} = ${res.z2.toFixed(2)}</p>`;
        } else if (res.z1 !== null) {
          zText = `<p class="math-expr">z = \\frac{${x1} - ${mu}}{${sigma}} = ${res.z1.toFixed(2)}</p>`;
        }

        let popText = res.expectedCount !== null ?
          `<p><strong>Cantidad esperada en población N = ${popSize}:</strong> E = N · P = ${popSize} × ${res.prob.toFixed(4)} = <strong class="text-success">${res.expectedCount.toFixed(2)} individuos</strong></p>` : '';

        resBox.innerHTML = `
          <h4>🔔 Distribución Normal N(μ = ${mu}, σ = ${sigma})</h4>
          <div class="result-number">${MathUtils.formatProb(res.prob)}</div>
          <div class="formula-box highlight">
            <p><strong>Estandarización Z:</strong></p>
            ${zText}
            <p><strong>Probabilidad:</strong> ${res.description} = <strong>${res.prob.toFixed(4)} (${(res.prob * 100).toFixed(2)}%)</strong></p>
            ${popText}
          </div>
        `;
      }
      this.drawNormalCurve();
    } else if (model === 'uniform') {
      const a = parseFloat(document.getElementById('uniA').value);
      const b = parseFloat(document.getElementById('uniB').value);
      const op = document.getElementById('uniOp').value;
      const x1 = parseFloat(document.getElementById('uniX1').value);
      const x2 = parseFloat(document.getElementById('uniX2').value);

      const res = Solvers.solveUniformContinuous(a, b, x1, x2, op);

      resBox.innerHTML = `
        <h4>📏 Distribución Uniforme Continua U(${a}, ${b})</h4>
        <div class="result-number">${MathUtils.formatProb(res.prob)}</div>
        <div class="formula-box highlight">
          <p><strong>Probabilidad:</strong> ${res.description} = <strong>${res.prob.toFixed(4)} (${(res.prob * 100).toFixed(2)}%)</strong></p>
          <p><strong>Media E(X):</strong> (a + b) / 2 = (${a} + ${b}) / 2 = <strong>${res.mu.toFixed(2)}</strong></p>
          <p><strong>Varianza Var(X):</strong> (b - a)² / 12 = (${b} - ${a})² / 12 = <strong>${res.variance.toFixed(4)}</strong></p>
          <p><strong>Desvío Estándar σ:</strong> <strong>${res.sigma.toFixed(4)}</strong></p>
        </div>
      `;
    } else if (model === 'gamma') {
      const alpha = parseFloat(document.getElementById('gammaAlpha').value);
      const beta = parseFloat(document.getElementById('gammaBeta').value);
      const op = document.getElementById('gammaOp').value;
      const t1 = parseFloat(document.getElementById('gammaT1').value);
      const t2 = parseFloat(document.getElementById('gammaT2').value);

      const res = Solvers.solveGamma(alpha, beta, t1, t2, op);

      resBox.innerHTML = `
        <h4>⏱️ Distribución Gamma & Erlang (α = ${alpha}, β = ${beta})</h4>
        <div class="result-number">${MathUtils.formatProb(res.prob)}</div>
        <div class="formula-box highlight">
          <p><strong>Probabilidad calculada:</strong> ${res.description} = <strong>${res.prob.toFixed(4)} (${(res.prob * 100).toFixed(2)}%)</strong></p>
          <p><strong>Teorema de la Cátedra (Relación Poisson-Gamma):</strong></p>
          <p class="math-expr">P(Y \\le t) = P(N_t \\ge \\alpha) \\quad \\text{con } \\mu = t / \\beta</p>
          <p><strong>Media E(Y):</strong> α · β = ${alpha} × ${beta} = <strong>${res.mu.toFixed(2)}</strong></p>
          <p><strong>Varianza Var(Y):</strong> α · β² = <strong>${res.variance.toFixed(2)}</strong> (σ = ${res.sigma.toFixed(2)})</p>
        </div>
      `;
    }
  },

  drawNormalCurve() {
    const canvas = document.getElementById('normalCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth || 500;
    const height = 260;
    canvas.width = width;
    canvas.height = height;

    const mu = parseFloat(document.getElementById('contMu').value) || 0;
    const sigma = parseFloat(document.getElementById('contSigma').value) || 1;
    const op = document.getElementById('contOp').value;
    const x1 = parseFloat(document.getElementById('contX1').value) || 0;
    const x2 = parseFloat(document.getElementById('contX2').value) || 0;

    ctx.clearRect(0, 0, width, height);

    // X Range: μ ± 3.6σ
    const xMin = mu - 3.6 * sigma;
    const xMax = mu + 3.6 * sigma;
    const padX = 35;
    const padY = 30;
    const chartW = width - padX * 2;
    const chartH = height - padY * 2;

    const maxDensity = MathUtils.normalPDF(mu, mu, sigma);

    function toCanvasX(x) {
      return padX + ((x - xMin) / (xMax - xMin)) * chartW;
    }

    function toCanvasY(y) {
      return height - padY - (y / maxDensity) * (chartH - 20);
    }

    // Determine shaded bounds
    let shadeMin = -Infinity;
    let shadeMax = Infinity;
    if (op === 'leq') {
      shadeMin = xMin;
      shadeMax = x1;
    } else if (op === 'geq') {
      shadeMin = x1;
      shadeMax = xMax;
    } else if (op === 'between') {
      shadeMin = Math.min(x1, x2);
      shadeMax = Math.max(x1, x2);
    }

    // Draw shaded polygon
    ctx.beginPath();
    ctx.moveTo(toCanvasX(shadeMin < xMin ? xMin : shadeMin), height - padY);
    const numPoints = 120;
    for (let i = 0; i <= numPoints; i++) {
      const curX = xMin + (i / numPoints) * (xMax - xMin);
      if (curX >= shadeMin && curX <= shadeMax) {
        const pdf = MathUtils.normalPDF(curX, mu, sigma);
        ctx.lineTo(toCanvasX(curX), toCanvasY(pdf));
      }
    }
    ctx.lineTo(toCanvasX(shadeMax > xMax ? xMax : shadeMax), height - padY);
    ctx.closePath();

    const shadeGrad = ctx.createLinearGradient(0, padY, 0, height - padY);
    shadeGrad.addColorStop(0, 'rgba(99, 102, 241, 0.65)');
    shadeGrad.addColorStop(1, 'rgba(6, 182, 212, 0.15)');
    ctx.fillStyle = shadeGrad;
    ctx.fill();

    // Draw the Bell Curve outline
    ctx.beginPath();
    for (let i = 0; i <= numPoints; i++) {
      const curX = xMin + (i / numPoints) * (xMax - xMin);
      const pdf = MathUtils.normalPDF(curX, mu, sigma);
      const cx = toCanvasX(curX);
      const cy = toCanvasY(pdf);
      if (i === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw Baseline Axis
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, height - padY);
    ctx.lineTo(width - padX, height - padY);
    ctx.stroke();

    // Draw Mean line
    const meanX = toCanvasX(mu);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(meanX, toCanvasY(maxDensity));
    ctx.lineTo(meanX, height - padY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Text labels
    ctx.fillStyle = '#f3f4f6';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`μ = ${mu}`, meanX, height - padY + 16);

    // Standard deviation markers
    [-2, -1, 1, 2].forEach(k => {
      const markX = toCanvasX(mu + k * sigma);
      ctx.fillStyle = '#9ca3af';
      ctx.fillText(`${k > 0 ? '+' : ''}${k}σ`, markX, height - padY + 16);
    });
  },

  // -------------------------------------------------------------
  // Combinatorics Solver
  // -------------------------------------------------------------
  calculateCombinatorics() {
    const m = parseInt(document.getElementById('combM').value);
    const n = parseInt(document.getElementById('combN').value);

    const res = Solvers.solveCombinatorics(m, n);
    const resBox = document.getElementById('combinatoricsResults');
    resBox.style.display = 'block';

    resBox.innerHTML = `
      <h4>🔢 Resultados de Conteo (m = ${m}, n = ${n})</h4>
      <div class="grid-2 mt-2">
        <div class="formula-box">
          <p><strong>Combinaciones C(m, n)</strong> (No importa el orden):</p>
          <div class="result-number" style="font-size:1.4rem;">${res.combinations.toLocaleString()}</div>
          <p class="math-expr">C_{${m}}^{${n}} = \\frac{${m}!}{${n}!(${m}-${n})!}</p>
        </div>
        <div class="formula-box">
          <p><strong>Variaciones V(m, n)</strong> (Importa el orden):</p>
          <div class="result-number" style="font-size:1.4rem;">${res.variations.toLocaleString()}</div>
          <p class="math-expr">V_{${m}}^{${n}} = \\frac{${m}!}{(${m}-${n})!}</p>
        </div>
      </div>
      <div class="grid-2 mt-1">
        <div class="formula-box">
          <p><strong>Variaciones con Repetición VR(m, n):</strong></p>
          <p class="math-expr">m^n = ${m}^{${n}} = <strong>${res.variationsRep.toLocaleString()}</strong></p>
        </div>
        <div class="formula-box">
          <p><strong>Permutaciones P(m) = m!:</strong></p>
          <p class="math-expr">${m}! = <strong>${res.permutations.toLocaleString()}</strong></p>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // Parciales View
  // -------------------------------------------------------------
  renderExams() {
    const container = document.getElementById('examsContainer');
    if (!container || !ExamData) return;

    container.innerHTML = ExamData.map((exam, examIdx) => `
      <div class="exam-accordion" id="examAccordion_${exam.id}">
        <div class="exam-accordion-header" onclick="App.toggleExamAccordion('${exam.id}')">
          <div>
            <div style="font-size:1.05rem; font-weight:700;">${exam.title}</div>
            <small style="color:var(--text-secondary);">${exam.subtitle}</small>
          </div>
          <span id="examChevron_${exam.id}">▼</span>
        </div>
        <div class="exam-accordion-body" id="examBody_${exam.id}">
          ${exam.exercises.map((ex, exIdx) => `
            <div class="exercise-card">
              <div class="exercise-card-header">
                <div class="exercise-card-title">${ex.title}</div>
                <div style="display:flex; gap:0.4rem;">
                  <button class="btn btn-primary btn-sm" onclick="App.loadExerciseInSolver('${exam.id}', ${ex.num})">🚀 Abrir en Calculadora</button>
                  <button class="solution-toggle-btn" onclick="App.toggleSolution('sol_${exam.id}_${ex.num}')">👁️ Ver Solución</button>
                </div>
              </div>
              <div>${ex.statement}</div>
              <div id="sol_${exam.id}_${ex.num}" class="solution-content">
                ${ex.solution}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  },

  toggleExamAccordion(id) {
    const body = document.getElementById(`examBody_${id}`);
    const chevron = document.getElementById(`examChevron_${id}`);
    if (!body) return;
    const isHidden = body.style.display === 'none';
    body.style.display = isHidden ? 'block' : 'none';
    if (chevron) chevron.textContent = isHidden ? '▼' : '▶';
  },

  toggleSolution(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('open');
  },

  loadExerciseInSolver(examId, exNum) {
    const exam = ExamData.find(e => e.id === examId);
    if (!exam) return;
    const ex = exam.exercises.find(x => x.num === exNum);
    if (!ex) return;

    if (ex.solverTarget === 'contingency') {
      this.openSolver('contingency', examId === 'parcial-2' ? 'parcial2' : (examId === 'parcial-4' ? 'parcial4' : 'parcial1'));
    } else if (ex.solverTarget === 'bayes') {
      this.openSolver('bayes', examId === 'parcial-4' ? 'accidentes' : 'farmacias');
    } else if (ex.solverTarget === 'discrete') {
      this.openSolver('discrete', 'negativeBinomial');
    } else if (ex.solverTarget === 'poissonGamma') {
      this.openSolver('discrete', 'poissonGamma');
    } else if (ex.solverTarget === 'normal' || ex.solverTarget === 'normalPercentile') {
      this.openSolver('continuous', 'normal');
    } else if (ex.solverTarget === 'uniformContinuous') {
      this.openSolver('continuous', 'uniform');
    } else if (ex.solverTarget === 'hypergeometric') {
      this.openSolver('discrete', 'binomial');
      document.getElementById('discreteModelSelect').value = 'hypergeometric';
      this.switchDiscreteModel('hypergeometric');
    }
  },

  viewExam(id) {
    this.navigateTo('exams');
    const body = document.getElementById(`examBody_${id}`);
    const chevron = document.getElementById(`examChevron_${id}`);
    if (body) {
      body.style.display = 'block';
      if (chevron) chevron.textContent = '▼';
    }
    const acc = document.getElementById(`examAccordion_${id}`);
    if (acc) acc.scrollIntoView({ behavior: 'smooth' });
  },

  // -------------------------------------------------------------
  // Statistical Tables Tab
  // -------------------------------------------------------------
  switchStatTable(tableType) {
    const secNormal = document.getElementById('statTableNormalSection');
    const secGamma = document.getElementById('statTableGammaSection');
    const pillN = document.getElementById('pillTabNormal');
    const pillG = document.getElementById('pillTabGamma');

    if (tableType === 'normal') {
      secNormal.style.display = 'block';
      secGamma.style.display = 'none';
      pillN.classList.add('active');
      pillG.classList.remove('active');
    } else {
      secNormal.style.display = 'none';
      secGamma.style.display = 'block';
      pillN.classList.remove('active');
      pillG.classList.add('active');
    }
  },

  renderStatTables() {
    this.renderNormalTable();
    this.renderGammaTable();
  },

  renderNormalTable() {
    const container = document.getElementById('normalTableContainer');
    if (!container) return;

    let html = `
      <table class="stat-table">
        <thead>
          <tr>
            <th>z</th>
            <th>0.00</th><th>0.01</th><th>0.02</th><th>0.03</th><th>0.04</th>
            <th>0.05</th><th>0.06</th><th>0.07</th><th>0.08</th><th>0.09</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (let r = 0; r <= 35; r++) {
      const zRow = (r / 10).toFixed(1);
      html += `<tr id="normRow_${r}"><td class="col-z">${zRow}</td>`;
      for (let c = 0; c < 10; c++) {
        const z = parseFloat(zRow) + c * 0.01;
        const prob = MathUtils.standardNormalCDF(z);
        html += `<td id="normCell_${r}_${c}">${prob.toFixed(4)}</td>`;
      }
      html += `</tr>`;
    }

    html += `</tbody></table>`;
    container.innerHTML = html;
  },

  highlightZTable(val) {
    const z = parseFloat(val);
    if (isNaN(z) || z < 0 || z > 3.59) return;

    const rowIdx = Math.floor(z * 10);
    const colIdx = Math.round((z - rowIdx / 10) * 100);

    document.querySelectorAll('.stat-table td').forEach(td => td.style.background = '');

    const target = document.getElementById(`normCell_${rowIdx}_${colIdx}`);
    if (target) {
      target.style.background = '#6366f1';
      target.style.color = '#ffffff';
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  },

  renderGammaTable() {
    const container = document.getElementById('gammaTableContainer');
    if (!container) return;

    let html = `
      <table class="stat-table">
        <thead>
          <tr>
            <th>α</th><th>Γ(α)</th>
            <th>α</th><th>Γ(α)</th>
            <th>α</th><th>Γ(α)</th>
            <th>α</th><th>Γ(α)</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (let i = 0; i < 25; i++) {
      html += `<tr>`;
      for (let c = 0; c < 4; c++) {
        const alpha = 1.00 + (i + c * 25) * 0.01;
        if (alpha <= 1.99) {
          const val = MathUtils.gamma(alpha);
          html += `<td class="col-z">${alpha.toFixed(2)}</td><td>${val.toFixed(5)}</td>`;
        }
      }
      html += `</tr>`;
    }

    html += `</tbody></table>`;
    container.innerHTML = html;
  }
};

// Auto initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());
