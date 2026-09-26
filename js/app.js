/**
 * Main Controller Application - Probabilidad & Estadística UNJu (Parciales 2025)
 * Streamlined 2-Tab Architecture: Calculadora & Hoja de Examen + Parciales 2025 Resueltos
 * Includes Clean Math Formatting, One-Click Copy for Carpeta, and Camera Urgency Scanner
 */
const App = {
  activeTab: 'calculator',
  currentDist: 'binomial',
  currentExam: 'parcial-2025-a',
  cameraStream: null,
  viewMode: localStorage.getItem('prob_view_mode') || 'both', // 'both' | 'calcOnly'

  init() {
    this.initTheme();
    this.initPWA();
    this.updateViewModeUI();
    this.selectDist('binomial');
    this.renderExams();
    this.bindEvents();
    this.renderMath();
    console.log("App Probabilidad 2025 initialized.");
  },

  setViewMode(mode) {
    this.viewMode = mode;
    localStorage.setItem('prob_view_mode', mode);
    this.updateViewModeUI();
    const folder = document.getElementById('resolutionFolderSection');
    const banner = document.getElementById('calcOnlyBanner');
    if (folder) folder.style.display = mode === 'calcOnly' ? 'none' : 'block';
    if (banner) banner.style.display = mode === 'calcOnly' ? 'block' : 'none';
  },

  updateViewModeUI() {
    const btnBoth = document.getElementById('btnModeBoth');
    const btnCalc = document.getElementById('btnModeCalcOnly');
    if (btnBoth) btnBoth.classList.toggle('active', this.viewMode === 'both');
    if (btnCalc) btnCalc.classList.toggle('active', this.viewMode === 'calcOnly');
  },

  initTheme() {
    const saved = localStorage.getItem('prob_unju_theme') || 'dark';
    document.documentElement.dataset.theme = saved;
  },

  toggleTheme() {
    const current = document.documentElement.dataset.theme || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('prob_unju_theme', next);
  },

  initPWA() {
    this.checkAppVersion();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
    }
    if ('caches' in window) {
      caches.keys().then((keys) => {
        keys.forEach((key) => caches.delete(key));
      });
    }
  },

  checkAppVersion() {
    const CURRENT_VERSION = 'v6_clean_formulas_2026';
    const saved = localStorage.getItem('prob_app_version');
    if (saved !== CURRENT_VERSION) {
      localStorage.setItem('prob_app_version', CURRENT_VERSION);
      if ('caches' in window) {
        caches.keys().then(keys => {
          return Promise.all(keys.map(k => {
            if (k !== 'probabilidad-unju-v6') return caches.delete(k);
          }));
        });
      }
    }
  },

  forceRefreshApp() {
    if ('caches' in window) {
      caches.keys().then(names => Promise.all(names.map(name => caches.delete(name)))).then(() => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(regs => {
            regs.forEach(r => r.unregister());
            window.location.reload(true);
          });
        } else {
          window.location.reload(true);
        }
      });
    } else {
      window.location.reload(true);
    }
  },

  bindEvents() {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) themeBtn.addEventListener('click', () => this.toggleTheme());
  },

  // -------------------------------------------------------------
  // Math Auto-Renderer (KaTeX + Unicode Fallback)
  // -------------------------------------------------------------
  renderMath() {
    // If KaTeX is loaded and available, use it on all .math-expr
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(document.body, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false
        });
      } catch (e) {
        console.warn('KaTeX render error:', e);
      }
    }
  },

  // Copy Clean Text to Clipboard for Folder/Notebook
  copySheetText(elementId, btnElement) {
    const el = document.getElementById(elementId);
    if (!el) return;

    // Get text and clean any remaining markup
    let text = el.innerText || el.textContent;
    // Clean multiple linebreaks
    text = text.replace(/\n\s*\n\s*\n/g, '\n\n').trim();

    navigator.clipboard.writeText(text).then(() => {
      if (btnElement) {
        const originalText = btnElement.innerHTML;
        btnElement.innerHTML = '✅ ¡Copiado!';
        btnElement.classList.add('copied');
        setTimeout(() => {
          btnElement.innerHTML = originalText;
          btnElement.classList.remove('copied');
        }, 2000);
      }
    }).catch(err => {
      console.warn('Clipboard failed:', err);
    });
  },

  // -------------------------------------------------------------
  // Navigation between the 2 tabs
  // -------------------------------------------------------------
  navigateTo(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(`tab-${tabId}`);
    if (target) target.classList.add('active');

    // Desktop nav
    document.querySelectorAll('.desktop-nav .nav-link').forEach(el => {
      el.classList.toggle('active', el.dataset.tab === tabId);
    });

    // Mobile bottom nav
    document.querySelectorAll('.bottom-nav .bottom-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.tab === tabId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => this.renderMath(), 50);
  },

  // -------------------------------------------------------------
  // TAB 1: CALCULADORA & CÓMO PONER EN LA HOJA
  // -------------------------------------------------------------
  selectDist(distId) {
    this.currentDist = distId;
    document.querySelectorAll('#distSelectorPills .pill-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.dist === distId);
    });

    this.renderDistCard(distId);
    setTimeout(() => this.renderMath(), 50);
  },

  renderDistCard(distId) {
    const container = document.getElementById('activeDistCard');
    if (!container) return;

    if (distId === 'binomial') {
      container.innerHTML = `
        <div class="guide-card-header">
          <div class="guide-card-title">
            <span>🎲</span>
            <span>Distribución Binomial</span>
            <span class="badge badge-primary">TP 3 - Discretas</span>
          </div>
          <span class="badge badge-success" style="font-size:0.95rem; font-family:monospace;">X ~ B(n, p)</span>
        </div>
        <p class="hero-desc">Número de éxitos en n ensayos independientes con probabilidad constante p (con reposición).</p>

        <!-- Calculadora Interactiva -->
        <div class="calc-mini-box">
          <h4 style="color:var(--primary); margin-bottom:0.6rem;">🧮 Calculadora de Probabilidad Binomial:</h4>
          <div class="grid-4">
            <div><label class="form-label">Ensayos (n)</label><input type="number" id="calc_bin_n" class="form-control" value="5" min="1"></div>
            <div><label class="form-label">Prob. Éxito (p)</label><input type="number" step="0.05" id="calc_bin_p" class="form-control" value="0.20" min="0" max="1"></div>
            <div><label class="form-label">Operación</label>
              <select id="calc_bin_op" class="form-control" onchange="App.toggleBinomialK2()">
                <option value="eq">P(X = k)</option>
                <option value="geq">P(X ≥ k)</option>
                <option value="leq">P(X ≤ k)</option>
                <option value="between">P(k1 ≤ X ≤ k2)</option>
              </select>
            </div>
            <div><label class="form-label">Valor k</label><input type="number" id="calc_bin_k" class="form-control" value="1"></div>
          </div>
          <div id="calc_bin_k2_row" class="grid-2 mt-1" style="display:none;">
            <div><label class="form-label">Límite k2</label><input type="number" id="calc_bin_k2" class="form-control" value="4"></div>
          </div>
          <button class="btn btn-primary mt-2" onclick="App.runCalcBinomial()">⚡ Calcular Probabilidad</button>
          <div id="calcRes_binomial" class="result-card mt-2" style="display:none;"></div>
        </div>

        <div id="calcOnlyBanner" class="alert-box mt-2" style="display:${this.viewMode === 'calcOnly' ? 'block' : 'none'}; cursor:pointer;" onclick="App.setViewMode('both')">
          💡 <strong>Modo Solo Calculadora activo:</strong> El desarrollo de la carpeta está oculto para agilizar cálculos. Toca aquí o en "📝 Calculadora + Carpeta" para verlo.
        </div>

        <div id="resolutionFolderSection" class="resolution-folder-view" style="display:${this.viewMode === 'calcOnly' ? 'none' : 'block'};">
          <div class="unju-slide-container" id="sheet_binomial">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
              <div class="unju-res-header" style="margin:0;">
                <div class="unju-circle-num">7</div>
                <div class="unju-res-title">
                  <h3>Semáforo en la esquina</h3>
                  <span>Distribución Binomial • Evaluación de Competencia UNJu</span>
                </div>
              </div>
              <button class="copy-btn" onclick="App.copySheetText('sheet_binomial', this)">📋 Copiar para mi Carpeta</button>
            </div>

            <div class="unju-problem-text">
              Una persona pasa todas las mañanas por una esquina donde el semáforo está en verde el 20% de las veces. Cada mañana es un ensayo independiente. Se consideran 5 mañanas consecutivas.
            </div>

            <div class="unju-pills-row">
              <span class="unju-pill-tag">X = Nº de mañanas en verde</span>
              <span class="unju-pill-tag">n = 5</span>
              <span class="unju-pill-tag">p = 0.2</span>
              <span class="unju-pill-tag">X ~ Binomial(5, 0.2)</span>
            </div>

            <div class="unju-formula-bar">
              P(X = k) = C(n, k) · p^k · (1 - p)^(n - k)
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">a) P(en verde por lo menos 4 días) = P(X ≥ 4)</div>
              <div class="unju-step-line">P(X ≥ 4) = P(X = 4) + P(X = 5)</div>
              <div class="unju-step-line">P(X = 4) = C(5, 4) · (0.2)⁴ · (0.8)¹ = 5 · 0.0016 · 0.8 = 0.0064</div>
              <div class="unju-step-line">P(X = 5) = C(5, 5) · (0.2)⁵ · (0.8)⁰ = 0.00032</div>
              <div class="unju-result-pill green">P(X ≥ 4) = 0.00672 ≈ 0.67%</div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">b) P(en verde exactamente 1 día) = P(X = 1)</div>
              <div class="unju-step-line">P(X = 1) = C(5, 1) · (0.2)¹ · (0.8)⁴ = 5 · 0.2 · 0.4096</div>
              <div class="unju-result-pill green">P(X = 1) = 0.4096 ≈ 40.96%</div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">c) P(en verde exactamente 2 días) = P(X = 2)</div>
              <div class="unju-step-line">P(X = 2) = C(5, 2) · (0.2)² · (0.8)³ = 10 · 0.04 · 0.512</div>
              <div class="unju-result-pill green">P(X = 2) = 0.2048 ≈ 20.48%</div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">d) Número esperado de mañanas en verde</div>
              <div class="unju-step-line">E(X) = n · p = 5 · 0.2</div>
              <div class="unju-metric-box">
                <span class="unju-big-number">1</span>
                <span class="unju-metric-text">mañana en verde, en promedio, de las 5 mañanas.</span>
              </div>
            </div>

            <!-- Segundo Ejemplo: Parcial 2025 V4 Alumnos Temprano -->
            <details class="mt-2" style="background:rgba(15,23,42,0.4); border-radius:12px; padding:0.8rem 1rem; border:1px solid rgba(255,255,255,0.06);">
              <summary style="font-weight:700; color:#38bdf8; cursor:pointer;">
                📖 Ver También: Ejercicio 2 Parcial 2025 V4 (Alumnos Temprano n = 16, p = 0.30)
              </summary>
              <div style="margin-top:0.8rem;">
                <div class="unju-step-line"><strong>Variable:</strong> Sea X: número de alumnos que se levantan temprano en muestra n = 16. X ~ B(16, 0.30).</div>
                <div class="unju-step-line"><strong>P(X = 4):</strong> C(16, 4) · (0.30)⁴ · (0.70)¹² = 1820 · (0.0081) · (0.01384) = <strong>0.2040 (20.40%)</strong></div>
                <div class="unju-step-line"><strong>P(X > 8):</strong> 1 - P(X ≤ 8) = 1 - 0.9743 = <strong>0.0257 (2.57%)</strong></div>
                <div class="unju-step-line"><strong>Esperanza:</strong> E(X) = 16 × 0.30 = <strong>4.8 alumnos</strong> (Var = 3.36, σ = 1.833)</div>
              </div>
            </details>
          </div>
        </div>
      `;
    } else if (distId === 'negativeBinomial') {
      container.innerHTML = `
        <div class="guide-card-header">
          <div class="guide-card-title">
            <span>🎯</span>
            <span>Distribución Binomial Negativa (Pascal)</span>
            <span class="badge badge-primary">TP 3 - Discretas</span>
          </div>
          <span class="badge badge-success" style="font-size:0.95rem; font-family:monospace;">X ~ BN(r, p)</span>
        </div>
        <p class="hero-desc">Número total de ensayos independientes necesarios (x) hasta obtener r éxitos. El último ensayo SIEMPRE es un éxito.</p>

        <!-- Calculadora -->
        <div class="calc-mini-box">
          <h4 style="color:var(--primary); margin-bottom:0.6rem;">🧮 Calculadora Binomial Negativa:</h4>
          <div class="grid-3">
            <div><label class="form-label">Éxitos deseados (r)</label><input type="number" id="calc_nb_r" class="form-control" value="4" min="1"></div>
            <div><label class="form-label">Total ensayos (x)</label><input type="number" id="calc_nb_x" class="form-control" value="6" min="1"></div>
            <div><label class="form-label">Prob. Éxito (p)</label><input type="number" step="0.05" id="calc_nb_p" class="form-control" value="0.80" min="0" max="1"></div>
          </div>
          <button class="btn btn-primary mt-2" onclick="App.runCalcNegativeBinomial()">⚡ Calcular P(X = x)</button>
          <div id="calcRes_negativeBinomial" class="result-card mt-2" style="display:none;"></div>
        </div>

        <div id="calcOnlyBanner" class="alert-box mt-2" style="display:${this.viewMode === 'calcOnly' ? 'block' : 'none'}; cursor:pointer;" onclick="App.setViewMode('both')">
          💡 <strong>Modo Solo Calculadora activo:</strong> El desarrollo de la carpeta está oculto para agilizar cálculos. Toca aquí o en "📝 Calculadora + Carpeta" para verlo.
        </div>

        <div id="resolutionFolderSection" class="resolution-folder-view" style="display:${this.viewMode === 'calcOnly' ? 'none' : 'block'};">
          <div class="unju-slide-container" id="sheet_negativeBinomial">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
              <div class="unju-res-header" style="margin:0;">
                <div class="unju-circle-num">3</div>
                <div class="unju-res-title">
                  <h3>Examen en Diciembre</h3>
                  <span>Distribución Binomial Negativa (Pascal) • Parcial 2025 UNJu</span>
                </div>
              </div>
              <button class="copy-btn" onclick="App.copySheetText('sheet_negativeBinomial', this)">📋 Copiar para mi Carpeta</button>
            </div>

            <div class="unju-problem-text">
              El 80% de los alumnos cursó la materia este año (p = 0.80). Si se entrevista alumnos que se presentan a rendir en diciembre, ¿cuál es la probabilidad de que el 6° alumno entrevistado sea el 4° que cursó este año?
            </div>

            <div class="unju-pills-row">
              <span class="unju-pill-tag">r = 4 éxitos deseados</span>
              <span class="unju-pill-tag">p = 0.80</span>
              <span class="unju-pill-tag">x = 6 ensayos</span>
              <span class="unju-pill-tag">X ~ BN(r = 4, p = 0.80)</span>
            </div>

            <div class="unju-formula-bar">
              P(X = x) = C(x - 1, r - 1) · p^r · (1 - p)^(x - r)
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">a) P(el 6° alumno sea el 4° que cursó) = P(X = 6)</div>
              <div class="unju-step-line">P(X = 6) = C(6 - 1, 4 - 1) · (0.80)⁴ · (0.20)⁶⁻⁴ = C(5, 3) · (0.80)⁴ · (0.20)²</div>
              <div class="unju-step-line">C(5, 3) = (5 · 4 · 3) / (3 · 2 · 1) = 10</div>
              <div class="unju-step-line">P(X = 6) = 10 · 0.4096 · 0.04 = 0.16384</div>
              <div class="unju-result-pill green">P(X = 6) = 0.1638 ≈ 16.38%</div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">b) Número esperado de alumnos a entrevistar</div>
              <div class="unju-step-line">E(X) = r / p = 4 / 0.80</div>
              <div class="unju-metric-box">
                <span class="unju-big-number">5</span>
                <span class="unju-metric-text">alumnos entrevistados en promedio para encontrar 4 que hayan cursado.</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (distId === 'hypergeometric') {
      container.innerHTML = `
        <div class="guide-card-header">
          <div class="guide-card-title">
            <span>🐟</span>
            <span>Distribución Hipergeométrica</span>
            <span class="badge badge-primary">TP 3 - Discretas</span>
          </div>
          <span class="badge badge-success" style="font-size:0.95rem; font-family:monospace;">X ~ H(N, A, n)</span>
        </div>
        <p class="hero-desc">Muestreo <strong>SIN REPOSICIÓN</strong> de tamaño n en una población finita N que contiene K éxitos.</p>

        <!-- Calculadora -->
        <div class="calc-mini-box">
          <h4 style="color:var(--primary); margin-bottom:0.6rem;">🧮 Calculadora Hipergeométrica:</h4>
          <div class="grid-4">
            <div><label class="form-label">Población (N)</label><input type="number" id="calc_hyp_N" class="form-control" value="12"></div>
            <div><label class="form-label">Éxitos Totales (K)</label><input type="number" id="calc_hyp_A" class="form-control" value="7"></div>
            <div><label class="form-label">Muestra (n)</label><input type="number" id="calc_hyp_n" class="form-control" value="6"></div>
            <div><label class="form-label">Éxitos Muestra (k)</label><input type="number" id="calc_hyp_k" class="form-control" value="5"></div>
          </div>
          <button class="btn btn-primary mt-2" onclick="App.runCalcHypergeometric()">⚡ Calcular Probabilidad</button>
          <div id="calcRes_hypergeometric" class="result-card mt-2" style="display:none;"></div>
        </div>

        <div id="calcOnlyBanner" class="alert-box mt-2" style="display:${this.viewMode === 'calcOnly' ? 'block' : 'none'}; cursor:pointer;" onclick="App.setViewMode('both')">
          💡 <strong>Modo Solo Calculadora activo:</strong> El desarrollo de la carpeta está oculto para agilizar cálculos. Toca aquí o en "📝 Calculadora + Carpeta" para verlo.
        </div>

        <div id="resolutionFolderSection" class="resolution-folder-view" style="display:${this.viewMode === 'calcOnly' ? 'none' : 'block'};">
          <div class="unju-slide-container" id="sheet_hypergeometric">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
              <div class="unju-res-header" style="margin:0;">
                <div class="unju-circle-num">11</div>
                <div class="unju-res-title">
                  <h3>Refrigeradores defectuosos</h3>
                  <span>Distribución Hipergeométrica • Evaluación de Competencia UNJu</span>
                </div>
              </div>
              <button class="copy-btn" onclick="App.copySheetText('sheet_hypergeometric', this)">📋 Copiar para mi Carpeta</button>
            </div>

            <div class="unju-problem-text">
              12 refrigeradores fueron devueltos: 7 tienen compresor defectuoso y 5 tienen problemas menos serios. Se seleccionan al azar 6 refrigeradores (sin reemplazo) para examinar.
            </div>

            <div class="unju-pills-row">
              <span class="unju-pill-tag">N = 12</span>
              <span class="unju-pill-tag">K = 7 (defectuosos)</span>
              <span class="unju-pill-tag">n = 6 (muestra)</span>
              <span class="unju-pill-tag">X ~ Hipergeométrica(12, 7, 6)</span>
            </div>

            <div class="unju-formula-bar">
              P(X = k) = [ C(K, k) · C(N - K, n - k) ] / C(N, n) &nbsp;•&nbsp; C(12, 6) = 924
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">a) P(exactamente 5 con compresor defectuoso) = P(X = 5)</div>
              <div class="unju-step-line">P(X = 5) = [ C(7, 5) · C(5, 1) ] / C(12, 6) = (21 · 5) / 924</div>
              <div class="unju-result-pill pink">P(X = 5) ≈ 0.1136 ≈ 11.36%</div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">b) P(por lo menos 4 con compresor defectuoso) = P(X ≥ 4)</div>
              <table class="unju-table">
                <thead>
                  <tr><th>k</th><th>C(7, k)</th><th>C(5, 6 - k)</th><th>Producto</th><th>P(X = k)</th></tr>
                </thead>
                <tbody>
                  <tr><td>4</td><td>35</td><td>10</td><td>350</td><td>0.3788</td></tr>
                  <tr><td>5</td><td>21</td><td>5</td><td>105</td><td>0.1136</td></tr>
                  <tr><td>6</td><td>7</td><td>1</td><td>7</td><td>0.0076</td></tr>
                </tbody>
              </table>
              <div class="unju-step-line">P(X ≥ 4) = (350 + 105 + 7) / 924 = 462 / 924</div>
              <div class="unju-result-pill pink">P(X ≥ 4) = 0.5 = 50%</div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">c) Número esperado de refrigeradores defectuosos</div>
              <div class="unju-step-line">E(X) = n · (K / N) = 6 · (7 / 12)</div>
              <div class="unju-metric-box">
                <span class="unju-big-number">4</span>
                <span class="unju-metric-text">refrigeradores con compresor defectuoso, en promedio, de los 6 examinados.</span>
              </div>
            </div>

            <!-- Segundo Ejemplo: Peces Surubíes -->
            <details class="mt-2" style="background:rgba(15,23,42,0.4); border-radius:12px; padding:0.8rem 1rem; border:1px solid rgba(255,255,255,0.06);">
              <summary style="font-weight:700; color:#38bdf8; cursor:pointer;">
                📖 Ver También: Ejercicio 3 Parcial 2025 V4 (Peces Surubíes N = 47, A = 23, n = 7)
              </summary>
              <div style="margin-top:0.8rem;">
                <div class="unju-step-line"><strong>Variable:</strong> Sea X: número de surubíes en muestra n = 7 sin reemplazo. X ~ H(47, 23, 7).</div>
                <div class="unju-step-line"><strong>P(X = 2):</strong> [ C(23, 2) · C(24, 5) ] / C(47, 7) = (253 × 42504) / 62891499 = <strong>0.1710 (17.10%)</strong></div>
                <div class="unju-step-line"><strong>P(X ≥ 2):</strong> 1 - P(0) - P(1) = 1 - (0.0055 + 0.0492) = <strong>0.9453 (94.53%)</strong></div>
                <div class="unju-step-line"><strong>Esperado:</strong> E(X) = 7 · (23/47) = <strong>3.43 surubíes</strong></div>
              </div>
            </details>
          </div>
        </div>
      `;
    } else if (distId === 'poisson') {
      container.innerHTML = `
        <div class="guide-card-header">
          <div class="guide-card-title">
            <span>⏱️</span>
            <span>Distribución de Poisson</span>
            <span class="badge badge-primary">TP 3 - Discretas</span>
          </div>
          <span class="badge badge-success" style="font-size:0.95rem; font-family:monospace;">X ~ Poisson(μ = λ · t)</span>
        </div>
        <p class="hero-desc">Número de eventos en un intervalo continuo t con tasa constante λ.</p>

        <!-- Calculadora -->
        <div class="calc-mini-box">
          <h4 style="color:var(--primary); margin-bottom:0.6rem;">🧮 Calculadora de Poisson:</h4>
          <div class="grid-4">
            <div><label class="form-label">Tasa λ</label><input type="number" step="0.5" id="calc_poi_lambda" class="form-control" value="5"></div>
            <div><label class="form-label">Intervalo t</label><input type="number" step="0.1" id="calc_poi_t" class="form-control" value="1.0"></div>
            <div><label class="form-label">Operación</label>
              <select id="calc_poi_op" class="form-control">
                <option value="eq">P(X = k)</option>
                <option value="leq">P(X ≤ k)</option>
                <option value="geq">P(X ≥ k)</option>
              </select>
            </div>
            <div><label class="form-label">Valor k</label><input type="number" id="calc_poi_k" class="form-control" value="7"></div>
          </div>
          <button class="btn btn-primary mt-2" onclick="App.runCalcPoisson()">⚡ Calcular Probabilidad</button>
          <div id="calcRes_poisson" class="result-card mt-2" style="display:none;"></div>
        </div>

        <div id="calcOnlyBanner" class="alert-box mt-2" style="display:${this.viewMode === 'calcOnly' ? 'block' : 'none'}; cursor:pointer;" onclick="App.setViewMode('both')">
          💡 <strong>Modo Solo Calculadora activo:</strong> El desarrollo de la carpeta está oculto para agilizar cálculos. Toca aquí o en "📝 Calculadora + Carpeta" para verlo.
        </div>

        <div id="resolutionFolderSection" class="resolution-folder-view" style="display:${this.viewMode === 'calcOnly' ? 'none' : 'block'};">
          <div class="unju-slide-container" id="sheet_poisson">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
              <div class="unju-res-header" style="margin:0;">
                <div class="unju-circle-num">4</div>
                <div class="unju-res-title">
                  <h3>Heladería en Shopping</h3>
                  <span>Distribución de Poisson • Parcial 2025 UNJu</span>
                </div>
              </div>
              <button class="copy-btn" onclick="App.copySheetText('sheet_poisson', this)">📋 Copiar para mi Carpeta</button>
            </div>

            <div class="unju-problem-text">
              Una reconocida heladería ubicada en un shopping recibe en promedio 5 clientes por minuto (λ = 5). a) ¿P(en 1 min lleguen 7 clientes)? b) ¿En 30 segundos lleguen entre 3 y 7 clientes?
            </div>

            <div class="unju-pills-row">
              <span class="unju-pill-tag">X = Clientes por minuto</span>
              <span class="unju-pill-tag">λ = 5 clientes/min</span>
              <span class="unju-pill-tag">t = 1 min</span>
              <span class="unju-pill-tag">X ~ Poisson(μ = 5)</span>
            </div>

            <div class="unju-formula-bar">
              P(X = x) = [ e^(-μ) · μ^x ] / x!
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">a) P(7 clientes en 1 minuto) = P(X = 7)</div>
              <div class="unju-step-line">P(X = 7) = [ e⁻⁵ · 5⁷ ] / 7! = [ 0.0067379 · 78125 ] / 5040</div>
              <div class="unju-result-pill green">P(X = 7) = 0.1044 ≈ 10.44%</div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">b) En 30 segundos (t = 0.5 min ⟹ μ = 2.5 clientes): P(3 ≤ X ≤ 7)</div>
              <div class="unju-step-line">P(3 ≤ X ≤ 7) = P(3) + P(4) + P(5) + P(6) + P(7)</div>
              <div class="unju-result-pill green">P(3 ≤ X ≤ 7) = 0.4520 ≈ 45.20%</div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">c) Esperanza y Desvío Estándar</div>
              <div class="unju-step-line">E(X) = μ = 5 clientes &nbsp;|&nbsp; Var(X) = 5 ⟹ σ = √5 ≈ 2.236 clientes</div>
              <div class="unju-metric-box">
                <span class="unju-big-number">5</span>
                <span class="unju-metric-text">clientes en promedio por minuto en la heladería.</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (distId === 'normal') {
      container.innerHTML = `
        <div class="guide-card-header">
          <div class="guide-card-title">
            <span>🔔</span>
            <span>Distribución Normal (Gaussiana)</span>
            <span class="badge badge-secondary">TP 4 - Continuas</span>
          </div>
          <span class="badge badge-success" style="font-size:0.95rem; font-family:monospace;">X ~ N(μ, σ²)</span>
        </div>
        <p class="hero-desc">Curva continua simétrica en forma de campana centrada en la media μ con dispersión σ.</p>

        <!-- Calculadora -->
        <div class="calc-mini-box">
          <h4 style="color:var(--primary); margin-bottom:0.6rem;">🧮 Calculadora Normal (con Estandarización Z):</h4>
          <div class="grid-4">
            <div><label class="form-label">Media (μ)</label><input type="number" step="0.1" id="calc_norm_mu" class="form-control" value="8.2"></div>
            <div><label class="form-label">Desvío (σ)</label><input type="number" step="0.1" id="calc_norm_sigma" class="form-control" value="1.1" min="0.001"></div>
            <div><label class="form-label">Límite x1</label><input type="number" step="0.1" id="calc_norm_x1" class="form-control" value="7.0"></div>
            <div><label class="form-label">Límite x2</label><input type="number" step="0.1" id="calc_norm_x2" class="form-control" value="10.0"></div>
          </div>
          <div class="grid-2 mt-1">
            <div><label class="form-label">Población N (Opcional)</label><input type="number" id="calc_norm_N" class="form-control" value="20" placeholder="Ej: 20 encuentros"></div>
          </div>
          <button class="btn btn-primary mt-2" onclick="App.runCalcNormal()">⚡ Calcular Probabilidad & Z</button>
          <div id="calcRes_normal" class="result-card mt-2" style="display:none;"></div>
        </div>

        <div id="calcOnlyBanner" class="alert-box mt-2" style="display:${this.viewMode === 'calcOnly' ? 'block' : 'none'}; cursor:pointer;" onclick="App.setViewMode('both')">
          💡 <strong>Modo Solo Calculadora activo:</strong> El desarrollo de la carpeta está oculto para agilizar cálculos. Toca aquí o en "📝 Calculadora + Carpeta" para verlo.
        </div>

        <div id="resolutionFolderSection" class="resolution-folder-view" style="display:${this.viewMode === 'calcOnly' ? 'none' : 'block'};">
          <div class="unju-slide-container" id="sheet_normal">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
              <div class="unju-res-header" style="margin:0;">
                <div class="unju-circle-num">5</div>
                <div class="unju-res-title">
                  <h3>Capacitación de Operarios (CEP)</h3>
                  <span>Distribución Normal • Parcial 2025 UNJu</span>
                </div>
              </div>
              <button class="copy-btn" onclick="App.copySheetText('sheet_normal', this)">📋 Copiar para mi Carpeta</button>
            </div>

            <div class="unju-problem-text">
              Una planta industrial capacita operarios en CEP. El tiempo medio estimado del curso es μ = 8.2 hs con desvío estándar σ = 1.1 hs. a) ¿P(curso dure entre 7 y 10 hs)? b) Si P > 75%, ¿se recomienda contratar servicio extra? c) De 20 encuentros al año, ¿cuántos durarán entre 7 y 10 hs?
            </div>

            <div class="unju-pills-row">
              <span class="unju-pill-tag">μ = 8.2 hs</span>
              <span class="unju-pill-tag">σ = 1.1 hs</span>
              <span class="unju-pill-tag">σ² = 1.21 hs²</span>
              <span class="unju-pill-tag">X ~ N(8.2, 1.21)</span>
            </div>

            <div class="unju-formula-bar">
              Z = (X - μ) / σ ~ N(0, 1) &nbsp;•&nbsp; P(a ≤ X ≤ b) = Φ(z₂) - Φ(z₁)
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">a) P(curso dure entre 7 y 10 hs) = P(7 ≤ X ≤ 10)</div>
              <div class="unju-step-line">z₁ = (7 - 8.2) / 1.1 = -1.2 / 1.1 = -1.09</div>
              <div class="unju-step-line">z₂ = (10 - 8.2) / 1.1 = 1.8 / 1.1 = 1.64</div>
              <div class="unju-step-line">P(7 ≤ X ≤ 10) = Φ(1.64) - Φ(-1.09) = 0.9495 - (1 - 0.8621) = 0.9495 - 0.1379</div>
              <div class="unju-result-pill green">P(7 ≤ X ≤ 10) = 0.8116 ≈ 81.16%</div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">b) Decisión de Servicio Extra de Cafetería (P > 75%)</div>
              <div class="unju-result-pill green">Como 81.16% > 75%, SE RECOMIENDA contratar el servicio extra.</div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">c) Encuentros esperados de N = 20 al año</div>
              <div class="unju-step-line">E = N · P = 20 × 0.8116 = 16.23</div>
              <div class="unju-metric-box">
                <span class="unju-big-number">16</span>
                <span class="unju-metric-text">encuentros de capacitación se espera que duren entre 7 y 10 horas.</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (distId === 'uniformContinuous') {
      container.innerHTML = `
        <div class="guide-card-header">
          <div class="guide-card-title">
            <span>📏</span>
            <span>Distribución Uniforme Continua (Rectangular)</span>
            <span class="badge badge-secondary">TP 4 - Continuas</span>
          </div>
          <span class="badge badge-success" style="font-size:0.95rem; font-family:monospace;">X ~ U(a, b)</span>
        </div>
        <p class="hero-desc">Densidad constante en el intervalo cerrado [a, b].</p>

        <!-- Calculadora -->
        <div class="calc-mini-box">
          <h4 style="color:var(--primary); margin-bottom:0.6rem;">🧮 Calculadora Uniforme Continua:</h4>
          <div class="grid-3">
            <div><label class="form-label">Límite Inferior (a)</label><input type="number" step="0.5" id="calc_uni_a" class="form-control" value="4"></div>
            <div><label class="form-label">Límite Superior (b)</label><input type="number" step="0.5" id="calc_uni_b" class="form-control" value="10"></div>
            <div><label class="form-label">Límite de Prueba x1</label><input type="number" step="0.5" id="calc_uni_x1" class="form-control" value="8"></div>
          </div>
          <button class="btn btn-primary mt-2" onclick="App.runCalcUniform()">⚡ Calcular P(X ≥ x1), Media y Desvío</button>
          <div id="calcRes_uniform" class="result-card mt-2" style="display:none;"></div>
        </div>

        <div id="calcOnlyBanner" class="alert-box mt-2" style="display:${this.viewMode === 'calcOnly' ? 'block' : 'none'}; cursor:pointer;" onclick="App.setViewMode('both')">
          💡 <strong>Modo Solo Calculadora activo:</strong> El desarrollo de la carpeta está oculto para agilizar cálculos. Toca aquí o en "📝 Calculadora + Carpeta" para verlo.
        </div>

        <div id="resolutionFolderSection" class="resolution-folder-view" style="display:${this.viewMode === 'calcOnly' ? 'none' : 'block'};">
          <div class="unju-slide-container" id="sheet_uniformContinuous">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
              <div class="unju-res-header" style="margin:0;">
                <div class="unju-circle-num">6</div>
                <div class="unju-res-title">
                  <h3>Lead Time de Repuesto Crítico</h3>
                  <span>Distribución Uniforme Continua • Parcial 2025 UNJu</span>
                </div>
              </div>
              <button class="copy-btn" onclick="App.copySheetText('sheet_uniformContinuous', this)">📋 Copiar para mi Carpeta</button>
            </div>

            <div class="unju-problem-text">
              El tiempo de reposición de un repuesto crítico se distribuye uniformemente entre 4 y 10 días: X ~ U(4, 10). a) Media y desvío estándar. b) P(X ≥ 8 días). c) P(X ≤ 6 días). d) ¿Qué es más probable?
            </div>

            <div class="unju-pills-row">
              <span class="unju-pill-tag">a = 4 días</span>
              <span class="unju-pill-tag">b = 10 días</span>
              <span class="unju-pill-tag">b - a = 6 días</span>
              <span class="unju-pill-tag">X ~ U(4, 10)</span>
            </div>

            <div class="unju-formula-bar">
              f(x) = 1 / (b - a) = 1 / 6 &nbsp;•&nbsp; P(X ≥ x) = (b - x) / (b - a)
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">a) Media y Desvío Estándar</div>
              <div class="unju-step-line">μ = E(X) = (4 + 10) / 2 = 7 días</div>
              <div class="unju-step-line">Var(X) = (10 - 4)² / 12 = 36 / 12 = 3 ⟹ σ = √3 ≈ 1.732 días</div>
              <div class="unju-metric-box">
                <span class="unju-big-number">7</span>
                <span class="unju-metric-text">días de tiempo medio de reposición del repuesto.</span>
              </div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">b) P(X ≥ 8) y c) P(X ≤ 6)</div>
              <div class="unju-step-line">P(X ≥ 8) = (10 - 8) / (10 - 4) = 2/6 = 0.3333 (33.33%)</div>
              <div class="unju-step-line">P(X ≤ 6) = (6 - 4) / (10 - 4) = 2/6 = 0.3333 (33.33%)</div>
              <div class="unju-result-pill green">Ambos sucesos son igualmente probables (33.33%) por simetría.</div>
            </div>
          </div>
        </div>
      `;
    } else if (distId === 'gamma') {
      container.innerHTML = `
        <div class="guide-card-header">
          <div class="guide-card-title">
            <span>⏳</span>
            <span>Distribución Gamma y Erlang</span>
            <span class="badge badge-secondary">TP 4 - Continuas</span>
          </div>
          <span class="badge badge-success" style="font-size:0.95rem; font-family:monospace;">Y ~ Gamma(α, β)</span>
        </div>
        <p class="hero-desc">Tiempo continuo hasta la ocurrencia de α eventos en un proceso de Poisson.</p>

        <!-- Calculadora -->
        <div class="calc-mini-box">
          <h4 style="color:var(--primary); margin-bottom:0.6rem;">🧮 Calculadora Gamma (Teorema Poisson-Gamma):</h4>
          <div class="grid-3">
            <div><label class="form-label">Eventos (α)</label><input type="number" id="calc_gam_alpha" class="form-control" value="2"></div>
            <div><label class="form-label">Escala β (seg)</label><input type="number" step="1" id="calc_gam_beta" class="form-control" value="12"></div>
            <div><label class="form-label">Tiempo t1 (seg)</label><input type="number" step="1" id="calc_gam_t1" class="form-control" value="30"></div>
          </div>
          <button class="btn btn-primary mt-2" onclick="App.runCalcGamma()">⚡ Calcular P(Y ≤ t1)</button>
          <div id="calcRes_gamma" class="result-card mt-2" style="display:none;"></div>
        </div>

        <div id="calcOnlyBanner" class="alert-box mt-2" style="display:${this.viewMode === 'calcOnly' ? 'block' : 'none'}; cursor:pointer;" onclick="App.setViewMode('both')">
          💡 <strong>Modo Solo Calculadora activo:</strong> El desarrollo de la carpeta está oculto para agilizar cálculos. Toca aquí o en "📝 Calculadora + Carpeta" para verlo.
        </div>

        <div id="resolutionFolderSection" class="resolution-folder-view" style="display:${this.viewMode === 'calcOnly' ? 'none' : 'block'};">
          <div class="unju-slide-container" id="sheet_gamma">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
              <div class="unju-res-header" style="margin:0;">
                <div class="unju-circle-num">4</div>
                <div class="unju-res-title">
                  <h3>Heladería en Shopping (Tiempo Gamma)</h3>
                  <span>Distribución Gamma • Parcial 2025 UNJu</span>
                </div>
              </div>
              <button class="copy-btn" onclick="App.copySheetText('sheet_gamma', this)">📋 Copiar para mi Carpeta</button>
            </div>

            <div class="unju-problem-text">
              Heladería recibe 5 clientes/min (λ = 1/12 clientes/seg, β = 12 seg). Se define Y como el tiempo en segundos hasta que lleguen 2 clientes (α = 2, β = 12 seg). Calcule P(Y ≤ 30 seg) y P(30 ≤ Y ≤ 48 seg).
            </div>

            <div class="unju-pills-row">
              <span class="unju-pill-tag">α = 2 clientes</span>
              <span class="unju-pill-tag">β = 12 seg</span>
              <span class="unju-pill-tag">λ = 1/12</span>
              <span class="unju-pill-tag">Y ~ Gamma(2, 12 seg)</span>
            </div>

            <div class="unju-formula-bar">
              P(Y ≤ t) = P(N_t ≥ α) = 1 - ∑ [ e^(-μ) · μ^k ] / k! &nbsp;•&nbsp; μ = t / β
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">a) P(2 clientes tarden hasta 30 seg) = P(Y ≤ 30) con μ = 30/12 = 2.5</div>
              <div class="unju-step-line">P(Y ≤ 30) = 1 - P(0) - P(1) = 1 - e⁻²·⁵(1 + 2.5) = 1 - 3.5 · (0.082085)</div>
              <div class="unju-result-pill green">P(Y ≤ 30) = 0.7127 ≈ 71.27%</div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">b) P(30 ≤ Y ≤ 48) con μ(48) = 48/12 = 4</div>
              <div class="unju-step-line">P(Y ≤ 48) = 1 - e⁻⁴(1 + 4) = 0.9084</div>
              <div class="unju-step-line">P(30 ≤ Y ≤ 48) = 0.9084 - 0.7127 = 0.1957</div>
              <div class="unju-result-pill green">P(30 ≤ Y ≤ 48) = 0.1957 ≈ 19.57%</div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">c) Tiempo esperado de espera</div>
              <div class="unju-step-line">E(Y) = α · β = 2 × 12 seg</div>
              <div class="unju-metric-box">
                <span class="unju-big-number">24</span>
                <span class="unju-metric-text">segundos de espera en promedio hasta la llegada de los 2 clientes.</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (distId === 'contingency') {
      container.innerHTML = `
        <div class="guide-card-header">
          <div class="guide-card-title">
            <span>📊</span>
            <span>Tablas de Contingencia e Independencia</span>
            <span class="badge badge-primary">TP 3 - Bivariadas</span>
          </div>
        </div>
        <p class="hero-desc">Resolución algebraica de incógnitas y prueba formal de independencia estocástica.</p>

        <!-- Calculadora de Tabla -->
        <div class="calc-mini-box">
          <h4 style="color:var(--primary); margin-bottom:0.6rem;">🧮 Solucionador de Tablas (Carga los datos del parcial):</h4>
          <button class="btn btn-primary btn-sm" onclick="App.loadContingencyDemo()">⚡ Resolver Tabla Parcial 2025 (Ciberseguridad)</button>
          <div id="contingencySolvedBox" class="result-card mt-2" style="display:none;"></div>
        </div>

        <div id="calcOnlyBanner" class="alert-box mt-2" style="display:${this.viewMode === 'calcOnly' ? 'block' : 'none'}; cursor:pointer;" onclick="App.setViewMode('both')">
          💡 <strong>Modo Solo Calculadora activo:</strong> El desarrollo de la carpeta está oculto para agilizar cálculos. Toca aquí o en "📝 Calculadora + Carpeta" para verlo.
        </div>

        <div id="resolutionFolderSection" class="resolution-folder-view" style="display:${this.viewMode === 'calcOnly' ? 'none' : 'block'};">
          <div class="unju-slide-container" id="sheet_contingency">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
              <div class="unju-res-header" style="margin:0;">
                <div class="unju-circle-num">1</div>
                <div class="unju-res-title">
                  <h3>Ciberseguridad (180 alumnos)</h3>
                  <span>Tabla Bidimensional • Parcial 2025 UNJu</span>
                </div>
              </div>
              <button class="copy-btn" onclick="App.copySheetText('sheet_contingency', this)">📋 Copiar para mi Carpeta</button>
            </div>

            <div class="unju-pills-row">
              <span class="unju-pill-tag">N = 180 alumnos</span>
              <span class="unju-pill-tag">5 comisiones</span>
              <span class="unju-pill-tag">4 estados académicos</span>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">k) Valores Faltantes por Balance de Filas y Columnas</div>
              <div class="unju-step-line">• C = Total A - (18 + 12 + 5) = 37 - 35 = <strong>2</strong></div>
              <div class="unju-step-line">• A = Total C - (8 + 4 + 1) = 27 - 13 = <strong>14</strong></div>
              <div class="unju-step-line">• B = Total D - (22 + 5 + 3) = 40 - 30 = <strong>10</strong></div>
              <div class="unju-step-line">• D = 5 + 3 + 4 + 5 + 7 = <strong>24</strong> (Total Deserción)</div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">d, e, f, h) Probabilidades Marginales, Uniones y Condicionales</div>
              <div class="unju-step-line">P(Sin Internet) = 13 / 180 = <strong>0.0722 (7.22%)</strong></div>
              <div class="unju-step-line">P(D ∪ E) = (40 + 56)/180 = 96/180 = <strong>0.5333 (53.33%)</strong></div>
              <div class="unju-step-line">P(Ap ∪ C) = P(Ap) + P(C) - P(Ap ∩ C) = (89 + 27 - 14)/180 = 102/180 = <strong>0.5667 (56.67%)</strong></div>
              <div class="unju-step-line">P(C | Deserción) = 4 / 24 = <strong>0.1667 (16.67%)</strong></div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">i) Demostración Formal de Independencia (Comisión D y Aprobado)</div>
              <div class="unju-step-line">P(D ∩ Ap) = 22 / 180 = 0.1222</div>
              <div class="unju-step-line">P(D) × P(Ap) = (40/180) × (89/180) = 0.1099</div>
              <div class="unju-result-pill pink">Como 0.1222 ≠ 0.1099, los sucesos NO SON INDEPENDIENTES.</div>
            </div>
          </div>
        </div>
      `;
    } else if (distId === 'bayes') {
      container.innerHTML = `
        <div class="guide-card-header">
          <div class="guide-card-title">
            <span>🌳</span>
            <span>Teorema de la Probabilidad Total y Bayes</span>
            <span class="badge badge-primary">TP 2 y TP 3</span>
          </div>
        </div>
        <p class="hero-desc">Cálculo de la probabilidad total del efecto y de las probabilidades a posteriori de las causas (Teorema de Bayes).</p>

        <div id="calcOnlyBanner" class="alert-box mt-2" style="display:${this.viewMode === 'calcOnly' ? 'block' : 'none'}; cursor:pointer;" onclick="App.setViewMode('both')">
          💡 <strong>Modo Solo Calculadora activo:</strong> El desarrollo de la carpeta está oculto para agilizar cálculos. Toca aquí o en "📝 Calculadora + Carpeta" para verlo.
        </div>

        <div id="resolutionFolderSection" class="resolution-folder-view" style="display:${this.viewMode === 'calcOnly' ? 'none' : 'block'};">
          <div class="unju-slide-container" id="sheet_bayes">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
              <div class="unju-res-header" style="margin:0;">
                <div class="unju-circle-num">2</div>
                <div class="unju-res-title">
                  <h3>Farmacias del NOA</h3>
                  <span>Probabilidad Total y Bayes • Parcial 2025 UNJu</span>
                </div>
              </div>
              <button class="copy-btn" onclick="App.copySheetText('sheet_bayes', this)">📋 Copiar para mi Carpeta</button>
            </div>

            <div class="unju-problem-text">
              Venta de medicamentos: Ambulatorio (A₁) 40%, Magistrales (A₂) 35%, Alto Costo (A₃) 25%. Probabilidad de adquirir sin inconvenientes (S): 98%, 99% y 95% respectivamente.
            </div>

            <div class="unju-pills-row">
              <span class="unju-pill-tag">P(A₁) = 0.40</span>
              <span class="unju-pill-tag">P(A₂) = 0.35</span>
              <span class="unju-pill-tag">P(A₃) = 0.25</span>
              <span class="unju-pill-tag">P(S|A₁) = 0.98</span>
              <span class="unju-pill-tag">P(S|A₂) = 0.99</span>
              <span class="unju-pill-tag">P(S|A₃) = 0.95</span>
            </div>

            <div class="unju-formula-bar">
              P(A_j | S) = [ P(A_j) · P(S | A_j) ] / P(S)
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">b) Teorema de la Probabilidad Total: P(S)</div>
              <div class="unju-step-line">P(S) = ∑ P(A_i) · P(S | A_i) = (0.40)(0.98) + (0.35)(0.99) + (0.25)(0.95)</div>
              <div class="unju-step-line">P(S) = 0.3920 + 0.3465 + 0.2375 = 0.9760</div>
              <div class="unju-result-pill green">P(S) = 0.9760 ≈ 97.60%</div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">c) Teorema de Bayes: P(Alto Costo A₃ | Sin Inconveniente S)</div>
              <div class="unju-step-line">P(A₃ | S) = [ P(A₃) · P(S | A₃) ] / P(S) = (0.25 · 0.95) / 0.9760 = 0.2375 / 0.9760</div>
              <div class="unju-result-pill green">P(A₃ | S) = 0.2433 ≈ 24.33%</div>
            </div>

            <div class="unju-inciso-card">
              <div class="unju-inciso-title">d) Teorema de Bayes: P(Ambulatorio A₁ | Con Inconveniente Sᶜ)</div>
              <div class="unju-step-line">P(Sᶜ) = 1 - 0.9760 = 0.0240</div>
              <div class="unju-step-line">P(A₁ | Sᶜ) = [ P(A₁) · P(Sᶜ | A₁) ] / P(Sᶜ) = (0.40 · 0.02) / 0.0240 = 0.0080 / 0.0240</div>
              <div class="unju-result-pill green">P(A₁ | Sᶜ) = 0.3333 ≈ 33.33% (1/3)</div>
            </div>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="guide-card-header">
          <div class="guide-card-title"><span>⚡</span><span>Distribución Exponencial</span></div>
          <span class="badge badge-success">X ~ Exp(β)</span>
        </div>
        <div class="formula-box">
          <p>Tiempo hasta el primer evento. Media β = 1/λ. Función Acumulada: F(x) = 1 - e^(-x/β).</p>
        </div>
      `;
    }
  },

  toggleBinomialK2() {
    const op = document.getElementById('calc_bin_op').value;
    const row = document.getElementById('calc_bin_k2_row');
    if (row) row.style.display = op === 'between' ? 'block' : 'none';
  },

  runCalcBinomial() {
    const n = parseInt(document.getElementById('calc_bin_n').value);
    const p = parseFloat(document.getElementById('calc_bin_p').value);
    const op = document.getElementById('calc_bin_op').value;
    const k = parseInt(document.getElementById('calc_bin_k').value);
    const k2 = op === 'between' ? parseInt(document.getElementById('calc_bin_k2').value) : null;
    const res = Solvers.solveBinomial(n, p, k, op, k2);

    const out = document.getElementById('calcRes_binomial');
    out.style.display = 'block';
    out.innerHTML = `
      <h4>✅ Resultado: ${res.description}</h4>
      <div class="result-number">${(res.prob * 100).toFixed(2)}% <small style="font-size:1rem; color:var(--text-secondary);">(P = ${res.prob.toFixed(5)})</small></div>
      <p>Esperanza E(X) = n · p = <strong>${res.mu.toFixed(2)}</strong> | Varianza Var(X) = <strong>${res.variance.toFixed(4)}</strong> (σ = ${res.sigma.toFixed(3)})</p>
    `;
  },

  runCalcNegativeBinomial() {
    const r = parseInt(document.getElementById('calc_nb_r').value);
    const x = parseInt(document.getElementById('calc_nb_x').value);
    const p = parseFloat(document.getElementById('calc_nb_p').value);
    const res = Solvers.solveNegativeBinomial(r, p, x);

    const out = document.getElementById('calcRes_negativeBinomial');
    out.style.display = 'block';
    out.innerHTML = `
      <h4>✅ Resultado: P(X = ${x} ensayos para ${r} éxitos)</h4>
      <div class="result-number">${(res.prob * 100).toFixed(2)}% <small style="font-size:1rem; color:var(--text-secondary);">(P = ${res.prob.toFixed(5)})</small></div>
      <p>C(${x}-1, ${r}-1) = ${res.comb} | Esperanza E(X) = r/p = <strong>${res.mu.toFixed(2)} ensayos</strong></p>
    `;
  },

  runCalcHypergeometric() {
    const N = parseInt(document.getElementById('calc_hyp_N').value);
    const A = parseInt(document.getElementById('calc_hyp_A').value);
    const n = parseInt(document.getElementById('calc_hyp_n').value);
    const k = parseInt(document.getElementById('calc_hyp_k').value);
    const res = Solvers.solveHypergeometric(N, A, n, k, 'eq');

    const out = document.getElementById('calcRes_hypergeometric');
    out.style.display = 'block';
    out.innerHTML = `
      <h4>✅ Resultado: P(X = ${k})</h4>
      <div class="result-number">${(res.prob * 100).toFixed(2)}% <small style="font-size:1rem; color:var(--text-secondary);">(P = ${res.prob.toFixed(5)})</small></div>
      <p>Esperanza E(X) = n · (A/N) = <strong>${res.mu.toFixed(4)}</strong> | Varianza = <strong>${res.variance.toFixed(4)}</strong></p>
    `;
  },

  runCalcPoisson() {
    const lambda = parseFloat(document.getElementById('calc_poi_lambda').value);
    const t = parseFloat(document.getElementById('calc_poi_t').value);
    const op = document.getElementById('calc_poi_op').value;
    const k = parseInt(document.getElementById('calc_poi_k').value);
    const res = Solvers.solvePoisson(lambda, t, k, op);

    const out = document.getElementById('calcRes_poisson');
    out.style.display = 'block';
    out.innerHTML = `
      <h4>✅ Resultado: ${res.description} (μ = ${res.mu})</h4>
      <div class="result-number">${(res.prob * 100).toFixed(2)}% <small style="font-size:1rem; color:var(--text-secondary);">(P = ${res.prob.toFixed(5)})</small></div>
      <p>Media μ = ${res.mu} | Desvío σ = <strong>${res.sigma.toFixed(3)}</strong></p>
    `;
  },

  runCalcNormal() {
    const mu = parseFloat(document.getElementById('calc_norm_mu').value);
    const sigma = parseFloat(document.getElementById('calc_norm_sigma').value);
    const x1 = parseFloat(document.getElementById('calc_norm_x1').value);
    const x2 = parseFloat(document.getElementById('calc_norm_x2').value);
    const N = parseFloat(document.getElementById('calc_norm_N').value) || null;
    const res = Solvers.solveNormal(mu, sigma, x1, x2, 'between', N);

    const out = document.getElementById('calcRes_normal');
    out.style.display = 'block';
    let popText = res.expectedCount !== null ? `<p>Esperado en población N = ${N}: <strong>${res.expectedCount.toFixed(2)}</strong> individuos</p>` : '';
    out.innerHTML = `
      <h4>✅ Resultado: P(${Math.min(x1, x2)} ≤ X ≤ ${Math.max(x1, x2)})</h4>
      <div class="result-number">${(res.prob * 100).toFixed(2)}% <small style="font-size:1rem; color:var(--text-secondary);">(P = ${res.prob.toFixed(4)})</small></div>
      <p>Estandarización: z₁ = <strong>${res.z1.toFixed(2)}</strong>, z₂ = <strong>${res.z2.toFixed(2)}</strong></p>
      ${popText}
    `;
  },

  runCalcUniform() {
    const a = parseFloat(document.getElementById('calc_uni_a').value);
    const b = parseFloat(document.getElementById('calc_uni_b').value);
    const x1 = parseFloat(document.getElementById('calc_uni_x1').value);
    const res = Solvers.solveUniformContinuous(a, b, x1, null, 'geq');

    const out = document.getElementById('calcRes_uniform');
    out.style.display = 'block';
    out.innerHTML = `
      <h4>✅ Resultado: P(X ≥ ${x1})</h4>
      <div class="result-number">${(res.prob * 100).toFixed(2)}% <small style="font-size:1rem; color:var(--text-secondary);">(P = ${res.prob.toFixed(4)})</small></div>
      <p>Media E(X) = <strong>${res.mu.toFixed(2)}</strong> | Desvío σ = <strong>${res.sigma.toFixed(3)}</strong> (Var = ${res.variance.toFixed(2)})</p>
    `;
  },

  runCalcGamma() {
    const alpha = parseFloat(document.getElementById('calc_gam_alpha').value);
    const beta = parseFloat(document.getElementById('calc_gam_beta').value);
    const t1 = parseFloat(document.getElementById('calc_gam_t1').value);
    const res = Solvers.solveGamma(alpha, beta, t1, null, 'leq');

    const out = document.getElementById('calcRes_gamma');
    out.style.display = 'block';
    out.innerHTML = `
      <h4>✅ Resultado: P(Y ≤ ${t1} seg)</h4>
      <div class="result-number">${(res.prob * 100).toFixed(2)}% <small style="font-size:1rem; color:var(--text-secondary);">(P = ${res.prob.toFixed(4)})</small></div>
      <p>Esperanza E(Y) = α · β = <strong>${res.mu.toFixed(2)} seg</strong> | Varianza = ${res.variance.toFixed(2)}</p>
    `;
  },

  loadContingencyDemo() {
    const out = document.getElementById('contingencySolvedBox');
    out.style.display = 'block';
    out.innerHTML = `
      <h4>✅ Incógnitas Resueltas del Parcial 2025:</h4>
      <p>• <strong>C</strong> = 37 - 35 = <strong>2</strong> (Sin Internet Comisión A)</p>
      <p>• <strong>A</strong> = 27 - 13 = <strong>14</strong> (Aprobados Comisión C)</p>
      <p>• <strong>B</strong> = 40 - 30 = <strong>10</strong> (Reprobados Comisión D)</p>
      <p>• <strong>D</strong> = 5 + 3 + 4 + 5 + 7 = <strong>24</strong> (Total Deserción)</p>
      <p>Total General = <strong>180 estudiantes</strong>.</p>
    `;
  },

  // -------------------------------------------------------------
  // TAB 2: PARCIALES 2025 RESUELTOS
  // -------------------------------------------------------------
  switchExamView(examId) {
    this.currentExam = examId;
    document.querySelectorAll('#tab-exams .pills-nav .pill-item').forEach(b => {
      b.classList.toggle('active', b.dataset.exam === examId);
    });
    this.renderExams();
  },

  renderExams() {
    const container = document.getElementById('examsContainer');
    if (!container || typeof ExamData2025 === 'undefined') return;

    const exam = ExamData2025.find(e => e.id === this.currentExam) || ExamData2025[0];

    container.innerHTML = `
      <div class="solver-card">
        <div class="solver-header">
          <div>
            <h3 style="font-size:1.2rem; font-weight:800;">${exam.title}</h3>
            <p class="hero-desc" style="margin-bottom:0;">${exam.subtitle}</p>
          </div>
          <span class="badge badge-success">${exam.exercises.length} Ejercicios</span>
        </div>

        ${exam.exercises.map(ex => `
          <div class="exercise-card">
            <div class="exercise-card-header">
              <div class="exercise-card-title">${ex.title}</div>
              <button class="btn btn-primary btn-sm" onclick="App.openDistInCalculator('${ex.distTarget}')">🧮 Abrir en Calculadora</button>
            </div>
            <div>${ex.statement}</div>
            <div class="mt-2">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                <strong style="color:#34d399; font-size:0.88rem;">📝 RESOLUCIÓN OFICIAL PARA LA HOJA:</strong>
                <button class="copy-btn" onclick="App.copySheetText('exam_sol_${ex.num}', this)">📋 Copiar</button>
              </div>
              <div id="exam_sol_${ex.num}">
                ${ex.solution}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    setTimeout(() => this.renderMath(), 50);
  },

  openDistInCalculator(distId) {
    this.navigateTo('calculator');
    this.selectDist(distId);
  },

  // -------------------------------------------------------------
  // CAMERA SCANNER & URGENCY MODAL
  // -------------------------------------------------------------
  openCameraModal() {
    const modal = document.getElementById('cameraModal');
    if (modal) modal.classList.add('active');
  },

  closeCameraModal() {
    const modal = document.getElementById('cameraModal');
    if (modal) modal.classList.remove('active');
    this.stopCameraStream();
  },

  stopCameraStream() {
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach(track => track.stop());
      this.cameraStream = null;
    }
    const video = document.getElementById('liveVideo');
    if (video) video.style.display = 'none';
  },

  handleImageSelected(input) {
    if (!input || !input.files || input.files.length === 0) return;
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = document.getElementById('capturedImage');
      const placeholder = document.getElementById('cameraPlaceholderText');
      const video = document.getElementById('liveVideo');
      const resolver = document.getElementById('cameraResolverSection');

      if (video) video.style.display = 'none';
      if (placeholder) placeholder.style.display = 'none';
      if (img) {
        img.src = e.target.result;
        img.style.display = 'block';
      }
      if (resolver) resolver.style.display = 'block';
    };

    reader.readAsDataURL(file);
  },

  quickSolveFromCamera(distId) {
    this.closeCameraModal();
    this.navigateTo('calculator');
    this.selectDist(distId);
  }
};

// Auto Initialize
document.addEventListener('DOMContentLoaded', () => App.init());
