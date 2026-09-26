/**
 * Main Controller Application - Probabilidad & Estadística UNJu (Parciales 2025)
 * Streamlined 2-Tab Architecture: Calculadora & Hoja de Examen + Parciales 2025 Resueltos
 */
const App = {
  activeTab: 'calculator',
  currentDist: 'binomial',
  currentExam: 'parcial-2025-a',

  init() {
    this.initTheme();
    this.initPWA();
    this.selectDist('binomial');
    this.renderExams();
    this.bindEvents();
    console.log("App Probabilidad 2025 initialized.");
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
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => console.warn(err));
      });
    }
  },

  bindEvents() {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) themeBtn.addEventListener('click', () => this.toggleTheme());
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
  },

  // -------------------------------------------------------------
  // TAB 1: CALCULADORA & QUÉ PONER EN LA HOJA
  // -------------------------------------------------------------
  selectDist(distId) {
    this.currentDist = distId;
    document.querySelectorAll('#distSelectorPills .pill-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.dist === distId);
    });

    this.renderDistCard(distId);
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
          <h4 style="color:var(--primary); margin-bottom:0.6rem;">🧮 Calculadora de Probabilidad:</h4>
          <div class="grid-4">
            <div><label class="form-label">Ensayos (n)</label><input type="number" id="calc_bin_n" class="form-control" value="16" min="1"></div>
            <div><label class="form-label">Prob. Éxito (p)</label><input type="number" step="0.05" id="calc_bin_p" class="form-control" value="0.30" min="0" max="1"></div>
            <div><label class="form-label">Operación</label>
              <select id="calc_bin_op" class="form-control" onchange="App.toggleBinomialK2()">
                <option value="eq">P(X = k)</option>
                <option value="geq">P(X ≥ k)</option>
                <option value="leq">P(X ≤ k)</option>
                <option value="between">P(k1 ≤ X ≤ k2)</option>
              </select>
            </div>
            <div><label class="form-label">Valor k</label><input type="number" id="calc_bin_k" class="form-control" value="4"></div>
          </div>
          <div id="calc_bin_k2_row" class="grid-2 mt-1" style="display:none;">
            <div><label class="form-label">Límite k2</label><input type="number" id="calc_bin_k2" class="form-control" value="10"></div>
          </div>
          <button class="btn btn-primary mt-2" onclick="App.runCalcBinomial()">⚡ Calcular Probabilidad</button>
          <div id="calcRes_binomial" class="result-card mt-2" style="display:none;"></div>
        </div>

        <!-- Ejemplo Mínimo del Parcial 2025 -->
        <div class="formula-box highlight mt-2">
          <strong style="color:var(--secondary);">📌 Ejemplo Típico del Parcial 2025 V4 (Temario B, Ej 2):</strong>
          <p style="margin-top:0.3rem;"><em>"El 30% de los alumnos de una facultad se levanta temprano para estudiar (p = 0.30). Se encuesta a 16 alumnos (n = 16). Calcule la probabilidad de que exactamente 4 se levanten temprano, la probabilidad de que más de 8 lo hagan, y entre 6 y 10."</em></p>
        </div>

        <!-- Qué poner en la hoja del parcial -->
        <div class="mt-2">
          <h4 style="color:#34d399; margin-bottom:0.5rem;">📝 CÓMO TENGO QUE PONER EN MI HOJA (Paso a Paso para 10/10):</h4>
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">1</span> <strong>Definición formal de la Variable:</strong><br>
            <em>"Sea X: número de alumnos que se levantan temprano en una muestra de n = 16 alumnos encuestados. X es una variable aleatoria discreta."</em></div>

            <div class="sheet-step"><span class="step-num">2</span> <strong>Modelo y Parámetros:</strong><br>
            <span class="badge badge-primary">X ~ B(n = 16, p = 0.30)</span> con q = 1 - p = 0.70</div>

            <div class="sheet-step"><span class="step-num">3</span> <strong>Función de Probabilidad Puntual:</strong><br>
            <code class="math-expr">P(X = x) = \\binom{n}{x} p^x (1 - p)^{n - x} \\quad \\text{para } x = 0, 1, ..., n</code></div>

            <div class="sheet-step"><span class="step-num">4</span> <strong>Sustitución Numérica para exactamente 4 alumnos P(X = 4):</strong><br>
            <code class="math-expr">P(X = 4) = \\binom{16}{4} (0.30)^4 (0.70)^{12} = 1820 \\cdot (0.0081) \\cdot (0.01384) = 0.2040 \\quad (20.40%)</code></div>

            <div class="sheet-step"><span class="step-num">5</span> <strong>Sustitución para más de 8 alumnos P(X > 8):</strong><br>
            <code class="math-expr">P(X > 8) = 1 - P(X \\le 8) = 1 - 0.9743 = 0.0257 \\quad (2.57%)</code></div>

            <div class="sheet-step"><span class="step-num">6</span> <strong>Esperanza y Varianza:</strong><br>
            <code>E(X) = n · p = 16 × 0.30 = 4.8 alumnos</code><br>
            <code>Var(X) = n · p · q = 16 × 0.30 × 0.70 = 3.36</code> ⟹ <code>σ = √3.36 ≈ 1.833</code></div>

            <div class="sheet-step"><span class="step-num">7</span> <strong>Conclusión redactada:</strong><br>
            <em>"Respuesta: La probabilidad de que exactamente 4 alumnos se levanten temprano es del 20.40%, y el valor esperado es de 4.8 alumnos."</em></div>
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

        <!-- Ejemplo Mínimo del Parcial 2025 -->
        <div class="formula-box highlight mt-2">
          <strong style="color:var(--secondary);">📌 Ejemplo Exacto del Parcial 2025 (Temario A, Ej 3a):</strong>
          <p style="margin-top:0.3rem;"><em>"El 80% de los alumnos cursó la materia este año (p = 0.80). Si se entrevista alumnos que se presentan a rendir en diciembre, ¿cuál es la probabilidad de que el sexto alumno entrevistado (x = 6) sea el cuarto (r = 4) que cursó este año?"</em></p>
        </div>

        <!-- Qué poner en la hoja del parcial -->
        <div class="mt-2">
          <h4 style="color:#34d399; margin-bottom:0.5rem;">📝 CÓMO TENGO QUE PONER EN MI HOJA (Paso a Paso para 10/10):</h4>
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">1</span> <strong>Definición formal de la Variable:</strong><br>
            <em>"Sea X: número total de alumnos entrevistados hasta encontrar r = 4 alumnos que cursaron la materia este año. X es una variable aleatoria discreta."</em></div>

            <div class="sheet-step"><span class="step-num">2</span> <strong>Identificación del Modelo y Parámetros:</strong><br>
            <span class="badge badge-primary">X ~ BN(r = 4, p = 0.80)</span> (Distribución Binomial Negativa o de Pascal).</div>

            <div class="sheet-step"><span class="step-num">3</span> <strong>Función de Probabilidad Puntual:</strong><br>
            <code class="math-expr">P(X = x) = \\binom{x - 1}{r - 1} p^r (1 - p)^{x - r} \\quad \\text{para } x = r, r+1, r+2, ...</code></div>

            <div class="sheet-step"><span class="step-num">4</span> <strong>Sustitución para x = 6 y r = 4:</strong><br>
            <code class="math-expr">P(X = 6) = \\binom{6 - 1}{4 - 1} (0.80)^4 (0.20)^{6 - 4} = \\binom{5}{3} (0.80)^4 (0.20)^2</code><br>
            <code class="math-expr">\\binom{5}{3} = \\frac{5 \\cdot 4 \\cdot 3}{3 \\cdot 2 \\cdot 1} = 10</code><br>
            <code class="math-expr">P(X = 6) = 10 \\cdot 0.4096 \\cdot 0.04 = 0.16384 \\quad (16.38%)</code></div>

            <div class="sheet-step"><span class="step-num">5</span> <strong>Esperanza Matemática:</strong><br>
            <code>E(X) = r / p = 4 / 0.80 = 5 alumnos a entrevistar</code></div>

            <div class="sheet-step"><span class="step-num">6</span> <strong>Conclusión redactada:</strong><br>
            <em>"Respuesta: La probabilidad de que el sexto alumno entrevistado sea el cuarto que cursó este año es del 16.38%."</em></div>
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
        <p class="hero-desc">Muestreo <strong>SIN REPOSICIÓN</strong> de tamaño n en una población finita N que contiene A éxitos.</p>

        <!-- Calculadora -->
        <div class="calc-mini-box">
          <h4 style="color:var(--primary); margin-bottom:0.6rem;">🧮 Calculadora Hipergeométrica:</h4>
          <div class="grid-4">
            <div><label class="form-label">Población (N)</label><input type="number" id="calc_hyp_N" class="form-control" value="47"></div>
            <div><label class="form-label">Éxitos Totales (A)</label><input type="number" id="calc_hyp_A" class="form-control" value="23"></div>
            <div><label class="form-label">Muestra (n)</label><input type="number" id="calc_hyp_n" class="form-control" value="7"></div>
            <div><label class="form-label">Éxitos Muestra (k)</label><input type="number" id="calc_hyp_k" class="form-control" value="2"></div>
          </div>
          <button class="btn btn-primary mt-2" onclick="App.runCalcHypergeometric()">⚡ Calcular Probabilidad</button>
          <div id="calcRes_hypergeometric" class="result-card mt-2" style="display:none;"></div>
        </div>

        <!-- Ejemplo Mínimo del Parcial 2025 -->
        <div class="formula-box highlight mt-2">
          <strong style="color:var(--secondary);">📌 Ejemplo Exacto del Parcial 2025 V4 (Temario B, Ej 3):</strong>
          <p style="margin-top:0.3rem;"><em>"En un criadero hay 47 peces, 23 de los cuales son surubíes. Un pescador captura 7 peces al azar sin reemplazo. a) ¿P(exactamente 2 surubíes)? b) ¿P(por lo menos 2)? c) ¿Número esperado de surubíes?"</em></p>
        </div>

        <!-- Qué poner en la hoja del parcial -->
        <div class="mt-2">
          <h4 style="color:#34d399; margin-bottom:0.5rem;">📝 CÓMO TENGO QUE PONER EN MI HOJA (Paso a Paso para 10/10):</h4>
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">1</span> <strong>Definición formal de la Variable:</strong><br>
            <em>"Sea X: número de surubíes obtenidos en la muestra de tamaño n = 7 capturados sin reemplazo de una población total N = 47. X es una V.A. discreta."</em></div>

            <div class="sheet-step"><span class="step-num">2</span> <strong>Modelo y Parámetros:</strong><br>
            <span class="badge badge-primary">X ~ H(N = 47, A = 23, n = 7)</span> con N - A = 24 peces que no son surubíes.</div>

            <div class="sheet-step"><span class="step-num">3</span> <strong>Función de Probabilidad Hipergeométrica:</strong><br>
            <code class="math-expr">P(X = x) = \\frac{\\binom{A}{x} \\binom{N - A}{n - x}}{\\binom{N}{n}}</code></div>

            <div class="sheet-step"><span class="step-num">4</span> <strong>Sustitución para exactamente 2 surubíes P(X = 2):</strong><br>
            <code class="math-expr">P(X = 2) = \\frac{\\binom{23}{2} \\binom{24}{5}}{\\binom{47}{7}} = \\frac{253 \\cdot 42504}{62891499} = \\frac{10753512}{62891499} = 0.1710 \\quad (17.10%)</code></div>

            <div class="sheet-step"><span class="step-num">5</span> <strong>Por lo menos 2 surubíes P(X ≥ 2):</strong><br>
            <code>P(X ≥ 2) = 1 - P(X = 0) - P(X = 1) = 1 - (0.0055 + 0.0492) = 0.9453 (94.53%)</code></div>

            <div class="sheet-step"><span class="step-num">6</span> <strong>Número esperado de surubíes:</strong><br>
            <code class="math-expr">E(X) = n \\cdot \\frac{A}{N} = 7 \\cdot \\frac{23}{47} = \\frac{161}{47} = 3.4255 \\approx 3.43 \\text{ surubíes}</code></div>

            <div class="sheet-step"><span class="step-num">7</span> <strong>Conclusión:</strong><br>
            <em>"Respuesta: La probabilidad de capturar exactamente 2 surubíes es del 17.10%, y el número esperado es de aproximadamente 3.43 surubíes."</em></div>
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
        <p class="hero-desc">Número de eventos en un intervalo de tiempo continuo t con tasa media constante λ.</p>

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

        <!-- Ejemplo Mínimo del Parcial 2025 -->
        <div class="formula-box highlight mt-2">
          <strong style="color:var(--secondary);">📌 Ejemplo Exacto del Parcial 2025 (Temario A, Ej 4):</strong>
          <p style="margin-top:0.3rem;"><em>"Una heladería recibe en promedio 5 clientes por minuto (λ = 5). a) ¿P(en 1 min lleguen 7 clientes)? b) ¿En 30 segundos lleguen entre 3 y 7 clientes?"</em></p>
        </div>

        <!-- Qué poner en la hoja del parcial -->
        <div class="mt-2">
          <h4 style="color:#34d399; margin-bottom:0.5rem;">📝 CÓMO TENGO QUE PONER EN MI HOJA (Paso a Paso para 10/10):</h4>
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">1</span> <strong>Definición de la Variable:</strong><br>
            <em>"Sea X: número de clientes que llegan a la heladería en el intervalo considerado. X es una V.A. discreta."</em></div>

            <div class="sheet-step"><span class="step-num">2</span> <strong>Parámetro para 1 minuto (t = 1 min):</strong><br>
            <code>μ = λ · t = 5 × 1 = 5</code> ⟹ <span class="badge badge-primary">X ~ Poisson(μ = 5)</span></div>

            <div class="sheet-step"><span class="step-num">3</span> <strong>Función de Probabilidad:</strong><br>
            <code class="math-expr">P(X = x) = \\frac{e^{-\\mu} \\cdot \\mu^x}{x!} \\quad \\text{para } x = 0, 1, 2, ...</code></div>

            <div class="sheet-step"><span class="step-num">4</span> <strong>Sustitución para x = 7 clientes:</strong><br>
            <code class="math-expr">P(X = 7) = \\frac{e^{-5} \\cdot 5^7}{7!} = \\frac{(0.0067379) \\cdot 78125}{5040} = 0.1044 \\quad (10.44%)</code></div>

            <div class="sheet-step"><span class="step-num">5</span> <strong>Cambio de Escala para 30 segundos (t = 0.5 min):</strong><br>
            <code>μ' = λ · t' = 5 × 0.5 = 2.5 clientes</code><br>
            <code class="math-expr">P(3 \\le X \\le 7) = P(3) + P(4) + P(5) + P(6) + P(7) = 0.4520 \\quad (45.20%)</code></div>

            <div class="sheet-step"><span class="step-num">6</span> <strong>Esperanza y Varianza:</strong><br>
            <code>E(X) = μ = 5</code>, <code>Var(X) = μ = 5</code></div>
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

        <!-- Ejemplo Mínimo del Parcial 2025 -->
        <div class="formula-box highlight mt-2">
          <strong style="color:var(--secondary);">📌 Ejemplo Exacto del Parcial 2025 (Temario A, Ej 5):</strong>
          <p style="margin-top:0.3rem;"><em>"Una planta industrial capacita operarios en CEP. El tiempo medio estimado del curso es μ = 8.2 hs con desvío estándar σ = 1.1 hs. a) ¿P(el curso dure entre 7 y 10 hs)? b) Si P > 75%, ¿se recomienda contratar servicio extra? c) De 20 encuentros al año, ¿cuántos durarán entre 7 y 10 hs?"</em></p>
        </div>

        <!-- Qué poner en la hoja del parcial -->
        <div class="mt-2">
          <h4 style="color:#34d399; margin-bottom:0.5rem;">📝 CÓMO TENGO QUE PONER EN MI HOJA (Paso a Paso para 10/10):</h4>
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">1</span> <strong>Definición formal de la Variable:</strong><br>
            <em>"Sea X: duración en horas del curso de capacitación de operarios. X es una variable aleatoria continua."</em></div>

            <div class="sheet-step"><span class="step-num">2</span> <strong>Modelo y Parámetros:</strong><br>
            <span class="badge badge-primary">X ~ N(μ = 8.2, σ = 1.1)</span> con varianza σ² = 1.21.</div>

            <div class="sheet-step"><span class="step-num">3</span> <strong>Estandarización a la Normal Estándar Z ~ N(0, 1):</strong><br>
            <code class="math-expr">Z = \\frac{X - \\mu}{\\sigma} = \\frac{X - 8.2}{1.1}</code></div>

            <div class="sheet-step"><span class="step-num">4</span> <strong>Estandarizar Límites x₁ = 7 y x₂ = 10:</strong><br>
            <code class="math-expr">z_1 = \\frac{7 - 8.2}{1.1} = \\frac{-1.2}{1.1} = -1.09 \\quad | \\quad z_2 = \\frac{10 - 8.2}{1.1} = \\frac{1.8}{1.1} = 1.64</code></div>

            <div class="sheet-step"><span class="step-num">5</span> <strong>Cálculo de Probabilidad por Tabla Normal Φ(z):</strong><br>
            <code class="math-expr">P(7 \\le X \\le 10) = P(-1.09 \\le Z \\le 1.64) = \\Phi(1.64) - \\Phi(-1.09)</code><br>
            Por simetría: <code>Φ(-1.09) = 1 - Φ(1.09) = 1 - 0.8621 = 0.1379</code><br>
            <code class="math-expr">P(7 \\le X \\le 10) = 0.9495 - 0.1379 = 0.8116 \\quad (81.16%)</code></div>

            <div class="sheet-step"><span class="step-num">6</span> <strong>Proyección en Población N = 20 encuentros:</strong><br>
            <code>E = N · P = 20 × 0.8116 = 16.23 ≈ 16 encuentros</code></div>

            <div class="sheet-step"><span class="step-num">7</span> <strong>Conclusión redactada:</strong><br>
            <em>"Respuesta: Como la probabilidad 81.16% > 75%, SE RECOMIENDA contratar el servicio extra. Se espera que 16 de los 20 encuentros duren entre 7 y 10 horas."</em></div>
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
        <p class="hero-desc">Densidad de probabilidad constante en todo el intervalo cerrado [a, b].</p>

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

        <!-- Ejemplo Mínimo del Parcial 2025 -->
        <div class="formula-box highlight mt-2">
          <strong style="color:var(--secondary);">📌 Ejemplo Exacto del Parcial 2025 (Temario A, Ej 6):</strong>
          <p style="margin-top:0.3rem;"><em>"El tiempo de reposición (lead time) de un repuesto crítico se distribuye uniformemente entre 4 y 10 días: X ~ U(4, 10). a) Calcule media y desvío estándar. b) ¿P(X ≥ 8)? c) ¿P(X ≤ 6)? d) ¿Qué es más probable?"</em></p>
        </div>

        <!-- Qué poner en la hoja del parcial -->
        <div class="mt-2">
          <h4 style="color:#34d399; margin-bottom:0.5rem;">📝 CÓMO TENGO QUE PONER EN MI HOJA (Paso a Paso para 10/10):</h4>
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">1</span> <strong>Definición formal de la Variable:</strong><br>
            <em>"Sea X: tiempo de reposición (lead time) en días. X es una V.A. continua uniforme en [4, 10]."</em></div>

            <div class="sheet-step"><span class="step-num">2</span> <strong>Modelo y Parámetros:</strong><br>
            <span class="badge badge-primary">X ~ U(a = 4, b = 10)</span> con longitud de base b - a = 6 días.</div>

            <div class="sheet-step"><span class="step-num">3</span> <strong>Función de Densidad y Distribución:</strong><br>
            <code class="math-expr">f(x) = \\frac{1}{b - a} = \\frac{1}{6} \\quad (4 \\le x \\le 10)</code><br>
            <code class="math-expr">F(x) = \\frac{x - a}{b - a} = \\frac{x - 4}{6} \\quad (4 \\le x \\le 10)</code></div>

            <div class="sheet-step"><span class="step-num">4</span> <strong>Cálculo de Media y Desviación Estándar:</strong><br>
            <code class="math-expr">\\mu = E(X) = \\frac{a + b}{2} = \\frac{4 + 10}{2} = 7 \\text{ días}</code><br>
            <code class="math-expr">\\sigma^2 = \\frac{(b - a)^2}{12} = \\frac{36}{12} = 3 \\implies \\sigma = \\sqrt{3} \\approx 1.732 \\text{ días}</code></div>

            <div class="sheet-step"><span class="step-num">5</span> <strong>Cálculo de Probabilidades:</strong><br>
            <code class="math-expr">P(X \\ge 8) = \\frac{10 - 8}{10 - 4} = \\frac{2}{6} = 0.3333 \\quad (33.33%)</code><br>
            <code class="math-expr">P(X \\le 6) = \\frac{6 - 4}{10 - 4} = \\frac{2}{6} = 0.3333 \\quad (33.33%)</code></div>

            <div class="sheet-step"><span class="step-num">6</span> <strong>Conclusión:</strong><br>
            <em>"Respuesta: Ambos sucesos son igualmente probables (33.33% cada uno) debido a la simetría de la distribución uniforme respecto a su media μ = 7 días."</em></div>
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

        <!-- Ejemplo Mínimo del Parcial 2025 -->
        <div class="formula-box highlight mt-2">
          <strong style="color:var(--secondary);">📌 Ejemplo Exacto del Parcial 2025 (Temario A, Ej 4d-e):</strong>
          <p style="margin-top:0.3rem;"><em>"Una heladería recibe 5 clientes/min (1 cliente cada 12 segundos). Se define Y como el tiempo en segundos hasta que lleguen 2 clientes (α = 2, β = 12 seg). Calcule P(Y ≤ 30 seg) y P(30 ≤ Y ≤ 48 seg)."</em></p>
        </div>

        <!-- Qué poner en la hoja del parcial -->
        <div class="mt-2">
          <h4 style="color:#34d399; margin-bottom:0.5rem;">📝 CÓMO TENGO QUE PONER EN MI HOJA (Paso a Paso para 10/10):</h4>
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">1</span> <strong>Definición formal de la Variable:</strong><br>
            <em>"Sea Y: tiempo en segundos hasta la llegada de α = 2 clientes. Y es una V.A. continua."</em></div>

            <div class="sheet-step"><span class="step-num">2</span> <strong>Parámetros en Segundos:</strong><br>
            Tasa por segundo: <code>λ = 5/60 = 1/12 clientes/seg</code><br>
            Parámetro de escala: <code>β = 1/λ = 12 segundos</code> ⟹ <span class="badge badge-primary">Y ~ Gamma(α = 2, β = 12 seg)</span></div>

            <div class="sheet-step"><span class="step-num">3</span> <strong>Teorema Fundamental Poisson-Gamma (Cátedra UNJu):</strong><br>
            <code class="math-expr">P(Y \\le t) = P(N_t \\ge \\alpha) = 1 - \\sum_{k=0}^{\\alpha - 1} \\frac{e^{-\\mu} \\mu^k}{k!} \\quad \\text{con } \\mu = \\frac{t}{\\beta}</code></div>

            <div class="sheet-step"><span class="step-num">4</span> <strong>Sustitución para t = 30 seg (μ = 30 / 12 = 2.5):</strong><br>
            <code class="math-expr">P(Y \\le 30) = 1 - e^{-2.5}(1 + 2.5) = 1 - 3.5(0.082085) = 0.7127 \\quad (71.27%)</code></div>

            <div class="sheet-step"><span class="step-num">5</span> <strong>Para t = 48 seg (μ = 48 / 12 = 4):</strong><br>
            <code>P(Y ≤ 48) = 1 - e⁻⁴(1 + 4) = 0.9084</code><br>
            <code class="math-expr">P(30 \\le Y \\le 48) = P(Y \\le 48) - P(Y \\le 30) = 0.9084 - 0.7127 = 0.1957 \\quad (19.57%)</code></div>
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
        <p class="hero-desc">Resolución algebraica de incógnitas (A, B, C, D) y cálculo de probabilidades marginales, uniones, condicionales y prueba formal de independencia estocástica.</p>

        <!-- Calculadora de Tabla -->
        <div class="calc-mini-box">
          <h4 style="color:var(--primary); margin-bottom:0.6rem;">🧮 Solucionador de Tablas (Carga los datos del parcial):</h4>
          <button class="btn btn-primary btn-sm" onclick="App.loadContingencyDemo()">⚡ Resolver Tabla Parcial 2025 (Ciberseguridad)</button>
          <div id="contingencySolvedBox" class="result-card mt-2" style="display:none;"></div>
        </div>

        <!-- Qué poner en la hoja del parcial -->
        <div class="mt-2">
          <h4 style="color:#34d399; margin-bottom:0.5rem;">📝 CÓMO TENGO QUE PONER EN MI HOJA (Paso a Paso para 10/10):</h4>
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">1</span> <strong>Cálculo de Incógnitas por Balance de Filas/Columnas:</strong><br>
            • C = Total A - (18 + 12 + 5) = 37 - 35 = <strong>2</strong><br>
            • A = Total C - (8 + 4 + 1) = 27 - 13 = <strong>14</strong><br>
            • B = Total D - (22 + 5 + 3) = 40 - 30 = <strong>10</strong><br>
            • D = 5 + 3 + 4 + 5 + 7 = <strong>24</strong> (Total Deserción)</div>

            <div class="sheet-step"><span class="step-num">2</span> <strong>Probabilidad Marginal:</strong> <code>P(Sin Internet) = 13 / 180 = 0.0722 (7.22%)</code></div>
            <div class="sheet-step"><span class="step-num">3</span> <strong>Probabilidad de Unión Mutuamente Excluyente:</strong> <code>P(D ∪ E) = (40 + 56)/180 = 96/180 = 0.5333</code></div>
            <div class="sheet-step"><span class="step-num">4</span> <strong>Regla General de la Adición:</strong> <code>P(Ap ∪ C) = P(Ap) + P(C) - P(Ap ∩ C) = (89 + 27 - 14)/180 = 102/180 = 0.5667</code></div>
            <div class="sheet-step"><span class="step-num">5</span> <strong>Probabilidad Condicional:</strong> <code>P(C | Deserción) = P(C ∩ Des) / P(Des) = 4 / 24 = 1/6 = 0.1667</code></div>
            <div class="sheet-step"><span class="step-num">6</span> <strong>Demostración de Independencia (Comisión D y Aprobado):</strong><br>
            <code>P(D ∩ Ap) = 22 / 180 = 0.1222</code><br>
            <code>P(D) × P(Ap) = (40/180) × (89/180) = 0.1099</code><br>
            Como <strong>0.1222 ≠ 0.1099</strong>, los sucesos <strong>NO SON INDEPENDIENTES</strong>.</div>
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

        <!-- Qué poner en la hoja del parcial -->
        <div class="mt-2">
          <h4 style="color:#34d399; margin-bottom:0.5rem;">📝 CÓMO TENGO QUE PONER EN MI HOJA (Paso a Paso para 10/10):</h4>
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">1</span> <strong>Partición del Espacio Muestral (Causas Aᵢ):</strong><br>
            P(Ambulatorio A₁) = 0.40 | P(Magistrales A₂) = 0.35 | P(Alto Costo A₃) = 0.25 (Σ = 1.00)</div>

            <div class="sheet-step"><span class="step-num">2</span> <strong>Probabilidades Condicionales (Verosimilitud):</strong><br>
            Sin inconvenientes (S): P(S|A₁) = 0.98, P(S|A₂) = 0.99, P(S|A₃) = 0.95<br>
            Con inconvenientes (Sᶜ): P(Sᶜ|A₁) = 0.02, P(Sᶜ|A₂) = 0.01, P(Sᶜ|A₃) = 0.05</div>

            <div class="sheet-step"><span class="step-num">3</span> <strong>Teorema de la Probabilidad Total: P(S)</strong><br>
            <code class="math-expr">P(S) = \\sum_{i=1}^3 P(A_i) \\cdot P(S | A_i) = (0.40)(0.98) + (0.35)(0.99) + (0.25)(0.95) = 0.9760 \\quad (97.60%)</code></div>

            <div class="sheet-step"><span class="step-num">4</span> <strong>Teorema de Bayes: P(Alto Costo A₃ | Sin Inconveniente S)</strong><br>
            <code class="math-expr">P(A_3 | S) = \\frac{P(A_3) \\cdot P(S | A_3)}{P(S)} = \\frac{0.25 \\cdot 0.95}{0.9760} = \\frac{0.2375}{0.9760} = 0.2433 \\quad (24.33%)</code></div>

            <div class="sheet-step"><span class="step-num">5</span> <strong>Teorema de Bayes: P(Ambulatorio A₁ | Con Inconveniente Sᶜ)</strong><br>
            P(Sᶜ) = 1 - 0.9760 = 0.0240<br>
            <code class="math-expr">P(A_1 | S^c) = \\frac{P(A_1) \\cdot P(S^c | A_1)}{P(S^c)} = \\frac{0.40 \\cdot 0.02}{0.0240} = \\frac{0.0080}{0.0240} = 0.3333 \\quad (33.33%)</code></div>
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
          <p>Tiempo hasta el primer evento. Media β = 1/λ. Función Acumulada: <code>F(x) = 1 - e^(-x/β)</code>.</p>
        </div>
      `;
    }
  },

  // Toggle k2 for binomial interval
  toggleBinomialK2() {
    const op = document.getElementById('calc_bin_op').value;
    const row = document.getElementById('calc_bin_k2_row');
    if (row) row.style.display = op === 'between' ? 'block' : 'none';
  },

  // Calculators execution
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
              <strong style="color:#34d399; font-size:0.88rem; display:block; margin-bottom:0.4rem;">📝 DESARROLLO Y RESOLUCIÓN OFICIAL PARA LA HOJA:</strong>
              ${ex.solution}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  openDistInCalculator(distId) {
    this.navigateTo('calculator');
    this.selectDist(distId);
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => App.init());
