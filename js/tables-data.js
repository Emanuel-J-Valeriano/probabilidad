/**
 * Tablas y Fórmulas TP3 y TP4 - Cátedra de Probabilidad y Estadística FI-UNJu
 * Contiene:
 * - Tabla A.3: Normal Estándar Z (Negativos y Positivos) con buscador interactivo
 * - Tabla A.23: Función Gamma Incompleta F(x; α)
 * - Valores Notables de la Función Gamma Γ(n)
 * - Tablas y Generadores Interactivos para TP3 (Binomial y Poisson)
 * - Compendio Completo de Fórmulas Oficiales del TP3 (Discretas) y TP4 (Continuas)
 */

const TablesModule = {
  activeSubTab: 'all', // 'all' | 'tp3' | 'tp4' | 'search'
  normalView: 'pos',    // 'pos' | 'neg'
  
  // Tabla A.23 Función Gamma Incompleta F(x; α) oficial Cátedra UNJu (pág 767)
  gammaIncompleteData: {
    alphas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    rows: [
      { x: 1,  vals: ['0.6320', '0.2640', '0.0800', '0.0190', '0.0040', '0.0010', '0.0000', '0.0000', '0.0000', '0.0000'] },
      { x: 2,  vals: ['0.8650', '0.5940', '0.3230', '0.1430', '0.0530', '0.0170', '0.0050', '0.0010', '0.0000', '0.0000'] },
      { x: 3,  vals: ['0.9500', '0.8010', '0.5770', '0.3530', '0.1850', '0.0840', '0.0340', '0.0120', '0.0040', '0.0010'] },
      { x: 4,  vals: ['0.9820', '0.9080', '0.7620', '0.5670', '0.3710', '0.2150', '0.1110', '0.0510', '0.0210', '0.0080'] },
      { x: 5,  vals: ['0.9930', '0.9600', '0.8750', '0.7350', '0.5600', '0.3840', '0.2380', '0.1330', '0.0680', '0.0320'] },
      { x: 6,  vals: ['0.9980', '0.9830', '0.9380', '0.8490', '0.7150', '0.5540', '0.3940', '0.2560', '0.1530', '0.0840'] },
      { x: 7,  vals: ['0.9990', '0.9930', '0.9700', '0.9180', '0.8270', '0.6990', '0.5500', '0.4010', '0.2710', '0.1700'] },
      { x: 8,  vals: ['1.0000', '0.9970', '0.9860', '0.9580', '0.9000', '0.8090', '0.6870', '0.5470', '0.4070', '0.2830'] },
      { x: 9,  vals: ['1.0000', '0.9990', '0.9940', '0.9790', '0.9450', '0.8840', '0.7930', '0.6760', '0.5440', '0.4130'] },
      { x: 10, vals: ['1.0000', '1.0000', '0.9970', '0.9900', '0.9710', '0.9330', '0.8700', '0.7800', '0.6670', '0.5420'] },
      { x: 11, vals: ['1.0000', '1.0000', '0.9990', '0.9950', '0.9850', '0.9620', '0.9210', '0.8570', '0.7680', '0.6590'] },
      { x: 12, vals: ['1.0000', '1.0000', '1.0000', '0.9980', '0.9920', '0.9800', '0.9540', '0.9110', '0.8450', '0.7580'] },
      { x: 13, vals: ['1.0000', '1.0000', '1.0000', '0.9990', '0.9960', '0.9890', '0.9740', '0.9460', '0.9000', '0.8340'] },
      { x: 14, vals: ['1.0000', '1.0000', '1.0000', '1.0000', '0.9980', '0.9940', '0.9860', '0.9680', '0.9380', '0.8910'] },
      { x: 15, vals: ['1.0000', '1.0000', '1.0000', '1.0000', '0.9990', '0.9970', '0.9920', '0.9820', '0.9630', '0.9300'] }
    ]
  },

  // Valores notables de la Función Gamma (Oficial Cátedra UNJu)
  gammaNotableValues: [
    { expr: "Γ(1)", val: "0! = 1", num: "1.0" },
    { expr: "Γ(2)", val: "1! = 1", num: "1.0" },
    { expr: "Γ(3)", val: "2! = 2", num: "2.0" },
    { expr: "Γ(4)", val: "3! = 6", num: "6.0" },
    { expr: "Γ(n)", val: "(n - 1)!", note: "Para todo n entero positivo (n ∈ ℕ)" },
    { expr: "Γ(α)", val: "(α - 1) · Γ(α - 1)", note: "Propiedad recursiva fundamental" },
    { expr: "Γ(1/2)", val: "√π", num: "≈ 1.7724538509" },
    { expr: "Γ(3/2)", val: "(1/2) · √π", num: "≈ 0.8862269255" },
    { expr: "Γ(5/2)", val: "(3/4) · √π", num: "≈ 1.3293403882" },
    { expr: "Γ(7/2)", val: "(15/8) · √π", num: "≈ 3.3233509704" },
    { expr: "Γ(-1/2)", val: "-2 · √π", num: "≈ -3.5449077018" },
    { expr: "Γ(-3/2)", val: "(4/3) · √π", num: "≈ 2.3632718012" }
  ],

  // Genera la matriz de la Tabla Normal Z estándar (exacta 4 decimales)
  generateNormalTable(isNegative) {
    const cols = ['0.00', '0.01', '0.02', '0.03', '0.04', '0.05', '0.06', '0.07', '0.08', '0.09'];
    const rows = [];
    if (isNegative) {
      // De -3.4 a -0.0
      for (let r = 34; r >= 0; r--) {
        const rowVal = -(r / 10);
        const rowLabel = rowVal.toFixed(1);
        const cells = [];
        for (let c = 0; c < 10; c++) {
          const z = rowVal - (c / 100);
          const p = MathUtils.standardNormalCDF(z);
          cells.push({
            z: z.toFixed(2),
            probStr: p.toFixed(4),
            probNum: p
          });
        }
        rows.push({ label: rowLabel, cells });
      }
    } else {
      // De 0.0 a 3.4
      for (let r = 0; r <= 34; r++) {
        const rowVal = r / 10;
        const rowLabel = rowVal.toFixed(1);
        const cells = [];
        for (let c = 0; c < 10; c++) {
          const z = rowVal + (c / 100);
          const p = MathUtils.standardNormalCDF(z);
          cells.push({
            z: z.toFixed(2),
            probStr: p.toFixed(4),
            probNum: p
          });
        }
        rows.push({ label: rowLabel, cells });
      }
    }
    return { cols, rows };
  },

  // Inicialización y enlace con la app principal
  init() {
    this.render();
  },

  setSubTab(tab) {
    this.activeSubTab = tab;
    document.querySelectorAll('.tab-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.subtab === tab);
    });
    const secTp3 = document.getElementById('tablesSecTP3');
    const secTp4 = document.getElementById('tablesSecTP4');
    const secSearch = document.getElementById('tablesSecSearch');
    
    if (secTp3) secTp3.style.display = (tab === 'all' || tab === 'tp3') ? 'block' : 'none';
    if (secTp4) secTp4.style.display = (tab === 'all' || tab === 'tp4') ? 'block' : 'none';
    if (secSearch) secSearch.style.display = (tab === 'all' || tab === 'search') ? 'block' : 'none';
  },

  setNormalView(view) {
    this.normalView = view;
    document.getElementById('btnNormalPos')?.classList.toggle('active', view === 'pos');
    document.getElementById('btnNormalNeg')?.classList.toggle('active', view === 'neg');
    this.renderNormalTable();
  },

  render() {
    const container = document.getElementById('tablesModuleContainer');
    if (!container) return;

    container.innerHTML = `
      <!-- Sub-filtro de navegación interno -->
      <div class="tables-subnav">
        <button class="tab-filter-btn active" data-subtab="all" onclick="TablesModule.setSubTab('all')">
          📑 Todo el Compendio
        </button>
        <button class="tab-filter-btn" data-subtab="tp3" onclick="TablesModule.setSubTab('tp3')">
          🔵 TP3: Tablas & Fórmulas Discretas
        </button>
        <button class="tab-filter-btn" data-subtab="tp4" onclick="TablesModule.setSubTab('tp4')">
          🟣 TP4: Tablas & Fórmulas Continuas
        </button>
        <button class="tab-filter-btn" data-subtab="search" onclick="TablesModule.setSubTab('search')">
          🔍 Buscador Rápido de Tabla Z
        </button>
      </div>

      <!-- BUSCADOR RÁPIDO INTERACTIVO DE TABLA NORMAL Z -->
      <div id="tablesSecSearch" class="tables-section mb-3">
        <div class="card p-3">
          <div class="section-badge">🔍 HERRAMIENTA RÁPIDA DE PARCIAL</div>
          <h3 style="color:var(--primary); margin-top:0.3rem;">Buscador Rápido de la Tabla Normal Estándar Z</h3>
          <p class="text-muted" style="font-size:0.88rem;">
            Introduce un puntaje <strong>Z</strong> para encontrar su probabilidad exacta sin buscar con el dedo, o ingresa una <strong>probabilidad acumulada</strong> para hallar el valor crítico Z (útil para intervalos de confianza y percentiles).
          </p>

          <div class="grid-2 mt-2">
            <!-- Buscar Probabilidad a partir de Z -->
            <div class="tool-box-card">
              <label class="form-label" style="font-weight:700;">1. Hallar Probabilidad para un Z conocido:</label>
              <div style="display:flex; gap:0.5rem; align-items:center;">
                <input type="number" step="0.01" id="lookup_z_input" class="form-control" value="1.96" placeholder="Ej: 1.96 o -1.64">
                <button class="btn btn-primary" onclick="TablesModule.doLookupZ()">Buscar Z</button>
              </div>
              <div id="lookup_z_result" class="mt-2 result-box" style="display:block;">
                <div class="d-flex-between"><span>P(Z ≤ 1.96):</span> <strong class="text-success">0.9750 (97.50%)</strong></div>
                <div class="d-flex-between"><span>P(Z > 1.96) [Cola Derecha]:</span> <strong>0.0250 (2.50%)</strong></div>
                <div class="d-flex-between"><span>P(-1.96 ≤ Z ≤ 1.96) [Bilateral]:</span> <strong>0.9500 (95.00%)</strong></div>
                <div class="mt-1" style="font-size:0.8rem; color:var(--text-muted);">
                  📍 Ubicación en tabla: Fila <strong>1.9</strong>, Columna <strong>.06</strong>
                </div>
              </div>
            </div>

            <!-- Buscar Z a partir de una Probabilidad -->
            <div class="tool-box-card">
              <label class="form-label" style="font-weight:700;">2. Hallar Z para una Probabilidad dada (Inversa):</label>
              <div style="display:flex; gap:0.5rem; align-items:center;">
                <input type="number" step="0.001" min="0.0001" max="0.9999" id="lookup_p_input" class="form-control" value="0.9500" placeholder="Ej: 0.95 o 0.975">
                <button class="btn btn-secondary" onclick="TablesModule.doLookupP()">Buscar P</button>
              </div>
              <div id="lookup_p_result" class="mt-2 result-box" style="display:block;">
                <div class="d-flex-between"><span>Probabilidad deseada:</span> <strong>0.9500 (95.00%)</strong></div>
                <div class="d-flex-between"><span>Valor Crítico Z exacto:</span> <strong class="text-primary" style="font-size:1.15rem;">z = 1.6449 ≈ 1.645</strong></div>
                <div class="mt-1" style="font-size:0.8rem; color:var(--text-muted);">
                  📍 En tabla está entre <strong>z = 1.64</strong> (0.9495) y <strong>z = 1.65</strong> (0.9505)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- =================================================================
           SECCIÓN TP3: VARIABLES ALEATORIAS DISCRETAS (TABLAS Y FÓRMULAS)
           ================================================================= -->
      <div id="tablesSecTP3" class="tables-section mb-4">
        
        <div class="tp-header-banner tp3-gradient">
          <div class="tp-tag">TRABAJO PRÁCTICO Nº 3 • CÁTEDRA FI-UNJu</div>
          <h2>🔵 Variables Aleatorias Discretas — Tablas & Fórmulas</h2>
          <p>
            Compendio de tablas de probabilidad, generadores numéricos acumulados y formulario completo de todas las distribuciones discretas.
          </p>
        </div>

        <!-- 1. TABLA RESUMEN OFICIAL DE DISTRIBUCIONES DISCRETAS (MAYO 2020) -->
        <div class="card p-3 mb-3">
          <div class="section-badge">TABLA OFICIAL DE CÁTEDRA • MAYO 2020</div>
          <h3 class="mb-2" style="color:var(--text-primary);">📊 Tabla de Distribuciones Discretas de Probabilidad</h3>
          <p class="text-muted" style="font-size:0.88rem; margin-bottom:1rem;">
            Desliza horizontalmente para consultar la definición, función de masa $p_X(x)$, parámetros, esperanza $E(X)$ y varianza $\\text{Var}(X)$.
          </p>

          <div class="table-responsive-box">
            <table class="table-custom">
              <thead>
                <tr>
                  <th>Distribución</th>
                  <th>Descripción & Definición de X</th>
                  <th>Función de Masa / Probabilidad</th>
                  <th>Parámetros</th>
                  <th>Esperanza E(X)</th>
                  <th>Varianza Var(X)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Uniforme Discreta</strong></td>
                  <td>X toma k valores posibles {x₁, ..., xₖ}, todos con idéntica probabilidad.</td>
                  <td><code>p(x) = 1 / k</code></td>
                  <td>k valores</td>
                  <td><code>(1/k) · ∑ xᵢ</code></td>
                  <td><code>(1/k) · ∑ xᵢ² - [E(X)]²</code></td>
                </tr>
                <tr>
                  <td><strong>Uniforme Discreta (Enteros 1 a k)</strong></td>
                  <td>X toma valores enteros 1, 2, 3, ..., k con igual probabilidad.</td>
                  <td><code>p(x) = 1 / k</code><br><small>para x = 1, 2, ..., k</small></td>
                  <td>k</td>
                  <td><code>(k + 1) / 2</code></td>
                  <td><code>(k² - 1) / 12</code></td>
                </tr>
                <tr>
                  <td><strong>Bernoulli</strong></td>
                  <td>Experimento dicotómico con 1 ensayo: Éxito (X=1) o Fracaso (X=0).</td>
                  <td><code>p(1) = p</code><br><code>p(0) = q = 1 - p</code></td>
                  <td>p = P(Éxito)</td>
                  <td><code>p</code></td>
                  <td><code>p · (1 - p) = p · q</code></td>
                </tr>
                <tr>
                  <td><strong>Binomial</strong><br><small class="text-primary">X ~ B(n, p)</small></td>
                  <td>Número de éxitos en n ensayos independientes. Con reemplazo, p constante.</td>
                  <td><code>P(X = x) = C(n, x) · pˣ · (1-p)ⁿ⁻ˣ</code><br><small>x = 0, 1, ..., n</small></td>
                  <td>n, p</td>
                  <td><code>n · p</code></td>
                  <td><code>n · p · (1 - p)</code></td>
                </tr>
                <tr>
                  <td><strong>Hipergeométrica</strong><br><small class="text-primary">X ~ H(N, n, A)</small></td>
                  <td>Número de éxitos en muestra n <strong>SIN reemplazo</strong> de población N con A éxitos.</td>
                  <td><code>P(X = x) = [C(A, x) · C(N-A, n-x)] / C(N, n)</code></td>
                  <td>N, A, n</td>
                  <td><code>n · (A / N)</code></td>
                  <td><code>n · (A/N) · (1 - A/N) · [(N-n)/(N-1)]</code><br><small>Corrección por población finita</small></td>
                </tr>
                <tr>
                  <td><strong>Poisson</strong><br><small class="text-primary">X ~ P(μ)</small></td>
                  <td>Número de ocurrencias en un intervalo continuo de tiempo o espacio t.</td>
                  <td><code>P(X = x) = (e⁻ᵐᵘ · μˣ) / x!</code><br><small>μ = λ · t,  x = 0, 1, 2, ...</small></td>
                  <td>μ = λ · t</td>
                  <td><code>μ</code></td>
                  <td><code>μ</code><br><small>Var(X) = E(X) = μ</small></td>
                </tr>
                <tr>
                  <td><strong>Geométrica</strong></td>
                  <td>Número de intentos hasta la ocurrencia del <strong>primer éxito</strong>.</td>
                  <td><code>P(X = x) = p · (1 - p)ˣ⁻¹</code><br><small>x = 1, 2, 3, ...</small></td>
                  <td>p</td>
                  <td><code>1 / p</code></td>
                  <td><code>(1 - p) / p²</code></td>
                </tr>
                <tr>
                  <td><strong>Binomial Negativa (Pascal)</strong></td>
                  <td>Número de ensayos independientes necesarios para obtener <strong>r éxitos</strong>.</td>
                  <td><code>P(X = x) = C(x-1, r-1) · pʳ · (1-p)ˣ⁻ʳ</code><br><small>x = r, r+1, r+2, ...</small></td>
                  <td>r, p</td>
                  <td><code>r / p</code></td>
                  <td><code>r · (1 - p) / p²</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 2. GENERADOR INTERACTIVO DE TABLA BINOMIAL P(X=k) y P(X<=k) -->
        <div class="card p-3 mb-3">
          <div class="section-badge">TABLA ESTADÍSTICA INTERACTIVA</div>
          <h3 style="color:var(--primary);">🧮 Tabla Estadística Binomial Acumulada P(X ≤ k) y Puntual</h3>
          <p class="text-muted" style="font-size:0.88rem;">
            Genera la tabla tabulada como en los apéndices de los libros para cualquier tamaño de muestra <strong>n</strong> y probabilidad <strong>p</strong>:
          </p>

          <div class="grid-3 mb-2">
            <div>
              <label class="form-label">Tamaño n:</label>
              <select id="tab_bin_n" class="form-control" onchange="TablesModule.updateBinomialTable()">
                <option value="5" selected>n = 5 (Semáforo / Competencia)</option>
                <option value="10">n = 10</option>
                <option value="15">n = 15</option>
                <option value="16">n = 16 (Parcial 2025 V4)</option>
                <option value="20">n = 20</option>
                <option value="25">n = 25</option>
              </select>
            </div>
            <div>
              <label class="form-label">Probabilidad p:</label>
              <select id="tab_bin_p" class="form-control" onchange="TablesModule.updateBinomialTable()">
                <option value="0.05">p = 0.05 (5%)</option>
                <option value="0.10">p = 0.10 (10%)</option>
                <option value="0.20" selected>p = 0.20 (20%)</option>
                <option value="0.25">p = 0.25 (25%)</option>
                <option value="0.30">p = 0.30 (30% Parcial)</option>
                <option value="0.40">p = 0.40 (40%)</option>
                <option value="0.50">p = 0.50 (50%)</option>
              </select>
            </div>
            <div style="display:flex; align-items:flex-end;">
              <button class="btn btn-primary btn-block" onclick="TablesModule.updateBinomialTable()">🔄 Actualizar Tabla</button>
            </div>
          </div>

          <div id="tab_bin_table_wrapper" class="table-responsive-box">
            <!-- Rendered by JS -->
          </div>
        </div>

        <!-- 3. FÓRMULAS OFICIALES DETALLADAS DEL TP3 (ABAJO DE LAS TABLAS) -->
        <div class="card p-3 mb-3">
          <div class="section-badge">COMPENDIO DE FÓRMULAS TP3</div>
          <h3 class="mb-2" style="color:var(--secondary);">📐 Fórmulas Detalladas para la Hoja del Parcial (TP3)</h3>
          <p class="text-muted" style="font-size:0.88rem; margin-bottom:1.2rem;">
            Todas las fórmulas analíticas paso a paso listas para transcribir directamente a tu carpeta o examen:
          </p>

          <div class="formula-grid">
            
            <div class="formula-card">
              <div class="f-header">
                <span class="f-badge">1</span>
                <h4>Distribución Binomial</h4>
              </div>
              <div class="f-body">
                <div class="f-row"><strong>Modelo:</strong> <code>X ~ B(n, p)</code></div>
                <div class="f-row"><strong>Fórmula Puntual:</strong> <code>P(X = k) = C(n, k) · pᵏ · (1 - p)ⁿ⁻ᵏ</code></div>
                <div class="f-row"><strong>Combinatoria:</strong> <code>C(n, k) = n! / [k! · (n - k)!]</code></div>
                <div class="f-row"><strong>Esperanza:</strong> <code>E(X) = n · p</code></div>
                <div class="f-row"><strong>Varianza:</strong> <code>Var(X) = n · p · (1 - p)</code></div>
                <div class="f-row"><strong>Desvío Estándar:</strong> <code>σ = √[n · p · (1 - p)]</code></div>
                <div class="f-tip">💡 <strong>Clave de identificación:</strong> Muestras con reemplazo o población infinita donde p se mantiene constante en cada intento.</div>
              </div>
            </div>

            <div class="formula-card">
              <div class="f-header">
                <span class="f-badge">2</span>
                <h4>Distribución Hipergeométrica</h4>
              </div>
              <div class="f-body">
                <div class="f-row"><strong>Modelo:</strong> <code>X ~ H(N, n, A)</code></div>
                <div class="f-row"><strong>Fórmula Puntual:</strong> <code>P(X = k) = [C(A, k) · C(N - A, n - k)] / C(N, n)</code></div>
                <div class="f-row"><strong>Soporte:</strong> <code>máx(0, n - (N - A)) ≤ k ≤ mín(n, A)</code></div>
                <div class="f-row"><strong>Esperanza:</strong> <code>E(X) = n · (A / N)</code></div>
                <div class="f-row"><strong>Varianza:</strong> <code>Var(X) = n · (A/N) · [1 - (A/N)] · [(N - n) / (N - 1)]</code></div>
                <div class="f-tip">💡 <strong>Clave de identificación:</strong> Muestreo <strong>SIN reemplazo</strong> de un lote finito conocido N donde las probabilidades cambian en cada extracción.</div>
              </div>
            </div>

            <div class="formula-card">
              <div class="f-header">
                <span class="f-badge">3</span>
                <h4>Distribución de Poisson</h4>
              </div>
              <div class="f-body">
                <div class="f-row"><strong>Modelo:</strong> <code>X ~ P(μ)</code> donde <code>μ = λ · t</code></div>
                <div class="f-row"><strong>Fórmula Puntual:</strong> <code>P(X = k) = (e⁻ᵐᵘ · μᵏ) / k!</code></div>
                <div class="f-row"><strong>Dominio:</strong> <code>k = 0, 1, 2, 3, ...</code></div>
                <div class="f-row"><strong>Esperanza:</strong> <code>E(X) = μ = λ · t</code></div>
                <div class="f-row"><strong>Varianza:</strong> <code>Var(X) = μ = λ · t</code></div>
                <div class="f-row"><strong>Desvío:</strong> <code>σ = √μ</code></div>
                <div class="f-tip">💡 <strong>Clave de identificación:</strong> Eventos raros que ocurren en un intervalo de tiempo continuo, longitud o área (ej. llamadas/minuto, fallas/metro).</div>
              </div>
            </div>

            <div class="formula-card">
              <div class="f-header">
                <span class="f-badge">4</span>
                <h4>Distribución Geométrica</h4>
              </div>
              <div class="f-body">
                <div class="f-row"><strong>Modelo:</strong> <code>X ~ G(p)</code> (Ensayos hasta el 1º éxito)</div>
                <div class="f-row"><strong>Fórmula Puntual:</strong> <code>P(X = x) = p · (1 - p)ˣ⁻¹</code></div>
                <div class="f-row"><strong>Acumulada:</strong> <code>P(X ≤ x) = 1 - (1 - p)ˣ</code></div>
                <div class="f-row"><strong>Esperanza:</strong> <code>E(X) = 1 / p</code></div>
                <div class="f-row"><strong>Varianza:</strong> <code>Var(X) = (1 - p) / p²</code></div>
                <div class="f-tip">💡 <strong>Clave de identificación:</strong> Cuántos intentos o pruebas se necesitan para lograr el <strong>primer éxito</strong>.</div>
              </div>
            </div>

            <div class="formula-card">
              <div class="f-header">
                <span class="f-badge">5</span>
                <h4>Distribución Binomial Negativa (Pascal)</h4>
              </div>
              <div class="f-body">
                <div class="f-row"><strong>Modelo:</strong> <code>X ~ BN(r, p)</code> (Ensayos hasta r éxitos)</div>
                <div class="f-row"><strong>Fórmula:</strong> <code>P(X = x) = C(x - 1, r - 1) · pʳ · (1 - p)ˣ⁻ʳ</code></div>
                <div class="f-row"><strong>Dominio:</strong> <code>x = r, r+1, r+2, ...</code></div>
                <div class="f-row"><strong>Esperanza:</strong> <code>E(X) = r / p</code></div>
                <div class="f-row"><strong>Varianza:</strong> <code>Var(X) = r · (1 - p) / p²</code></div>
                <div class="f-tip">💡 <strong>Clave de identificación:</strong> Cuántas pruebas independientes se requieren hasta acumular exactamente <strong>r éxitos</strong>.</div>
              </div>
            </div>

            <div class="formula-card">
              <div class="f-header">
                <span class="f-badge">6</span>
                <h4>Distribución Uniforme Discreta</h4>
              </div>
              <div class="f-body">
                <div class="f-row"><strong>Modelo:</strong> <code>X ~ U{1, ..., k}</code></div>
                <div class="f-row"><strong>Fórmula Puntual:</strong> <code>P(X = x) = 1 / k</code></div>
                <div class="f-row"><strong>Esperanza:</strong> <code>E(X) = (k + 1) / 2</code></div>
                <div class="f-row"><strong>Varianza:</strong> <code>Var(X) = (k² - 1) / 12</code></div>
                <div class="f-tip">💡 <strong>Clave de identificación:</strong> Lanzamiento de un dado equilibrado de k caras o sorteo equiprobable entre k opciones.</div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- =================================================================
           SECCIÓN TP4: VARIABLES ALEATORIAS CONTINUAS (TABLAS Y FÓRMULAS)
           ================================================================= -->
      <div id="tablesSecTP4" class="tables-section mb-4">
        
        <div class="tp-header-banner tp4-gradient">
          <div class="tp-tag">TRABAJO PRÁCTICO Nº 4 • CÁTEDRA FI-UNJu</div>
          <h2>🟣 Variables Aleatorias Continuas — Tablas & Fórmulas</h2>
          <p>
            Tabla A.3 de la Curva Normal Z oficial, Tabla A.23 de Función Gamma Incompleta, Valores Notables de Γ(n) y compendio de fórmulas analíticas.
          </p>
        </div>

        <!-- 1. TABLA A.3 OFICIAL: ÁREAS BAJO LA CURVA NORMAL ESTÁNDAR Z -->
        <div class="card p-3 mb-3">
          <div class="section-badge">TABLA A.3 OFICIAL • APÉNDICE FI-UNJu (PÁGS. 735 - 736)</div>
          <div class="d-flex-between flex-wrap gap-1 mb-2">
            <div>
              <h3 style="color:var(--text-primary); margin:0;">📈 Tabla A.3: Áreas bajo la Curva Normal Estándar</h3>
              <span class="text-muted" style="font-size:0.85rem;">Probabilidad acumulada Φ(z) = P(Z ≤ z) para Z ~ N(0, 1)</span>
            </div>
            <!-- Switcher Positivos / Negativos -->
            <div class="mode-toggles">
              <button class="mode-btn active" id="btnNormalPos" onclick="TablesModule.setNormalView('pos')">
                <span>➕</span> <span>Z Positivos (0.0 a 3.4)</span>
              </button>
              <button class="mode-btn" id="btnNormalNeg" onclick="TablesModule.setNormalView('neg')">
                <span>➖</span> <span>Z Negativos (-3.4 a -0.0)</span>
              </button>
            </div>
          </div>

          <!-- Container de la tabla Normal -->
          <div id="normalTableContainer" class="table-responsive-box">
            <!-- Injected by JS -->
          </div>

          <div class="alert-box mt-2" style="font-size:0.85rem;">
            <strong>📌 Propiedades de Simetría para la Hoja:</strong><br>
            • <code>P(Z ≤ -z) = 1 - P(Z ≤ z) = 1 - Φ(z)</code><br>
            • <code>P(Z > z) = 1 - P(Z ≤ z) = 1 - Φ(z)</code><br>
            • <code>P(a ≤ Z ≤ b) = Φ(b) - Φ(a)</code><br>
            • <code>P(-z ≤ Z ≤ z) = 2 · Φ(z) - 1</code>
          </div>
        </div>

        <!-- 2. TABLA A.23 OFICIAL: FUNCIÓN GAMMA INCOMPLETA F(x; α) -->
        <div class="card p-3 mb-3">
          <div class="section-badge">TABLA A.23 OFICIAL • APÉNDICE FI-UNJu (PÁG. 767)</div>
          <h3 class="mb-1" style="color:var(--text-primary);">⏳ Tabla A.23: La Función Gamma Incompleta</h3>
          <p class="text-muted" style="font-size:0.85rem; margin-bottom:1rem;">
            Valores de <code>F(x; α) = ∫₀ˣ [1 / Γ(α)] · y^(α - 1) · e⁻ʸ dy</code> para parámetros de forma α = 1 a 10 y límite x = 1 a 15:
          </p>

          <div id="gammaTableContainer" class="table-responsive-box">
            <!-- Injected by JS -->
          </div>

          <div class="formula-box mt-2">
            <strong>📌 Cómo usar esta tabla en problemas de Distribución Gamma:</strong><br>
            Para una variable <code>X ~ Gamma(α, β)</code>, la probabilidad acumulada hasta un valor t es:<br>
            <code>P(X ≤ t) = F(t / β ; α)</code>. Se busca en la tabla en la columna <strong>α</strong> y en la fila <strong>x = t / β</strong>.
          </div>
        </div>

        <!-- 3. HOJA DE VALORES NOTABLES DE LA FUNCIÓN GAMMA (FunciónGammaValores.pdf) -->
        <div class="card p-3 mb-3">
          <div class="section-badge">HOJA OFICIAL DE CÁTEDRA • VALORES EXACTOS</div>
          <h3 class="mb-1" style="color:var(--text-primary);">✨ Valores Notables de la Función Gamma Γ(n)</h3>
          <p class="text-muted" style="font-size:0.85rem; margin-bottom:1rem;">
            Valores exactos impresos en la hoja de cátedra oficial para simplificar cálculos manuales en el parcial:
          </p>

          <div class="grid-2">
            <div class="table-responsive-box">
              <table class="table-custom">
                <thead>
                  <tr>
                    <th>Expresión</th>
                    <th>Valor Exacto</th>
                    <th>Aproximación Decimal</th>
                  </tr>
                </thead>
                <tbody id="gammaNotableTableBody">
                  <!-- Injected by JS -->
                </tbody>
              </table>
            </div>
            <div class="alert-box" style="display:flex; flex-direction:column; justify-content:center;">
              <h4 style="color:var(--primary); margin-bottom:0.5rem;">📚 Propiedades Esenciales de Γ(α):</h4>
              <ul style="font-size:0.88rem; line-height:1.7; padding-left:1.2rem; margin:0;">
                <li><code>Γ(1) = 0! = 1</code></li>
                <li><code>Γ(α) = (α - 1) · Γ(α - 1)</code> para todo α > 1</li>
                <li><code>Γ(n) = (n - 1)!</code> si n es un entero positivo (n ∈ ℕ)</li>
                <li><code>Γ(1/2) = √π ≈ 1.77245</code></li>
                <li><code>Γ(3/2) = (1/2) · Γ(1/2) = (1/2) · √π ≈ 0.88623</code></li>
                <li><code>Γ(5/2) = (3/2) · (1/2) · √π = (3/4) · √π ≈ 1.32934</code></li>
                <li><code>Γ(7/2) = (5/2) · (3/4) · √π = (15/8) · √π ≈ 3.32335</code></li>
                <li>Para semienteros negativos: <code>Γ(-1/2) = -2 · √π ≈ -3.5449</code></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 4. FÓRMULAS OFICIALES DETALLADAS DEL TP4 (ABAJO DE LAS TABLAS) -->
        <div class="card p-3 mb-3">
          <div class="section-badge">COMPENDIO DE FÓRMULAS TP4</div>
          <h3 class="mb-2" style="color:var(--secondary);">📐 Fórmulas Detalladas para la Hoja del Parcial (TP4)</h3>
          <p class="text-muted" style="font-size:0.88rem; margin-bottom:1.2rem;">
            Todas las funciones de densidad f(x), acumulada F(x), media y varianza de variables continuas:
          </p>

          <div class="formula-grid">

            <div class="formula-card">
              <div class="f-header">
                <span class="f-badge">1</span>
                <h4>Distribución Rectangular / Uniforme Continua</h4>
              </div>
              <div class="f-body">
                <div class="f-row"><strong>Modelo:</strong> <code>X ~ U(a, b)</code> en el intervalo [a, b]</div>
                <div class="f-row"><strong>Función de Densidad:</strong> <code>f(x) = 1 / (b - a)</code> para a ≤ x ≤ b</div>
                <div class="f-row"><strong>Función Acumulada:</strong> <code>F(x) = (x - a) / (b - a)</code></div>
                <div class="f-row"><strong>Esperanza:</strong> <code>E(X) = (a + b) / 2</code></div>
                <div class="f-row"><strong>Varianza:</strong> <code>Var(X) = (b - a)² / 12</code></div>
                <div class="f-row"><strong>Desvío:</strong> <code>σ = (b - a) / √12</code></div>
                <div class="f-tip">💡 <strong>En el parcial:</strong> Se elige un punto al azar en [a, b] con igual densidad en todo el tramo.</div>
              </div>
            </div>

            <div class="formula-card">
              <div class="f-header">
                <span class="f-badge">2</span>
                <h4>Distribución Normal de Gauss</h4>
              </div>
              <div class="f-body">
                <div class="f-row"><strong>Modelo:</strong> <code>X ~ N(μ, σ²)</code></div>
                <div class="f-row"><strong>Estandarización:</strong> <code>Z = (X - μ) / σ ~ N(0, 1)</code></div>
                <div class="f-row"><strong>Densidad:</strong> <code>f(x) = [1 / (σ · √(2π))] · e^[ -0.5 · ((x - μ)/σ)² ]</code></div>
                <div class="f-row"><strong>Cálculo:</strong> <code>P(x₁ ≤ X ≤ x₂) = Φ((x₂ - μ)/σ) - Φ((x₁ - μ)/σ)</code></div>
                <div class="f-row"><strong>Esperanza & Varianza:</strong> <code>E(X) = μ</code>, <code>Var(X) = σ²</code></div>
                <div class="f-tip">💡 <strong>Regla Empírica:</strong> μ ± 1σ cubre el 68.26%, μ ± 2σ el 95.44%, μ ± 3σ el 99.73%.</div>
              </div>
            </div>

            <div class="formula-card">
              <div class="f-header">
                <span class="f-badge">3</span>
                <h4>Distribución Exponencial</h4>
              </div>
              <div class="f-body">
                <div class="f-row"><strong>Modelo:</strong> <code>X ~ Exp(β)</code> donde <code>β = 1 / λ</code></div>
                <div class="f-row"><strong>Densidad:</strong> <code>f(x) = (1 / β) · e^(-x / β) = λ · e^(-λ · x)</code></div>
                <div class="f-row"><strong>Acumulada:</strong> <code>F(x) = P(X ≤ x) = 1 - e^(-x / β)</code></div>
                <div class="f-row"><strong>Cola Derecha (Supervivencia):</strong> <code>P(X > x) = e^(-x / β)</code></div>
                <div class="f-row"><strong>Esperanza & Varianza:</strong> <code>E(X) = β = 1 / λ</code>, <code>Var(X) = β² = 1 / λ²</code></div>
                <div class="f-tip">💡 <strong>Falta de Memoria:</strong> <code>P(X > s + t | X > s) = P(X > t)</code>. Modela tiempo entre eventos.</div>
              </div>
            </div>

            <div class="formula-card">
              <div class="f-header">
                <span class="f-badge">4</span>
                <h4>Distribución Erlang</h4>
              </div>
              <div class="f-body">
                <div class="f-row"><strong>Modelo:</strong> Tiempo hasta ocurrir <code>r eventos</code> en Poisson</div>
                <div class="f-row"><strong>Densidad:</strong> <code>f(x) = [λʳ · xʳ⁻¹ · e^(-λ · x)] / (r - 1)!</code></div>
                <div class="f-row"><strong>Relación Exponencial:</strong> Es un caso particular de Gamma con α = r (entero). Si r = 1, es Exponencial.</div>
                <div class="f-row"><strong>Esperanza:</strong> <code>E(X) = r / λ = r · β</code></div>
                <div class="f-row"><strong>Varianza:</strong> <code>Var(X) = r / λ² = r · β²</code></div>
              </div>
            </div>

            <div class="formula-card">
              <div class="f-header">
                <span class="f-badge">5</span>
                <h4>Distribución Gamma</h4>
              </div>
              <div class="f-body">
                <div class="f-row"><strong>Modelo:</strong> <code>X ~ Gamma(α, β)</code> con forma α > 0 y escala β > 0</div>
                <div class="f-row"><strong>Densidad:</strong> <code>f(x) = [1 / (βᵃˡᵖʰᵃ · Γ(α))] · x^(α - 1) · e^(-x / β)</code></div>
                <div class="f-row"><strong>Uso de Tabla A.23:</strong> <code>P(X ≤ t) = F(t / β ; α)</code></div>
                <div class="f-row"><strong>Esperanza:</strong> <code>E(X) = α · β</code></div>
                <div class="f-row"><strong>Varianza:</strong> <code>Var(X) = α · β²</code></div>
                <div class="f-tip">💡 <strong>Nota cátedra UNJu:</strong> Utilizada ampliamente en teoría de colas y confiabilidad de componentes eléctricos.</div>
              </div>
            </div>

            <div class="formula-card">
              <div class="f-header">
                <span class="f-badge">6</span>
                <h4>Distribución de Weibull</h4>
              </div>
              <div class="f-body">
                <div class="f-row"><strong>Modelo:</strong> Modela tiempo hasta falla con tasa de desgaste variable</div>
                <div class="f-row"><strong>Parámetros:</strong> Escala <code>δ > 0</code>, Forma <code>β > 0</code></div>
                <div class="f-row"><strong>Densidad:</strong> <code>f(x) = (β / δ) · (x / δ)^(β - 1) · e^[ -(x / δ)ᵇᵉᵗᵃ ]</code></div>
                <div class="f-row"><strong>Acumulada:</strong> <code>F(x) = 1 - e^[ -(x / δ)ᵇᵉᵗᵃ ]</code></div>
                <div class="f-row"><strong>Esperanza:</strong> <code>E(X) = δ · Γ(1 + 1/β)</code></div>
                <div class="f-row"><strong>Varianza:</strong> <code>Var(X) = δ² · [ Γ(1 + 2/β) - (Γ(1 + 1/β))² ]</code></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    `;

    // Renderizar componentes interactivos
    this.renderNormalTable();
    this.renderGammaTable();
    this.renderGammaNotableValues();
    this.updateBinomialTable();
  },

  renderNormalTable() {
    const container = document.getElementById('normalTableContainer');
    if (!container) return;

    const isNeg = this.normalView === 'neg';
    const data = this.generateNormalTable(isNeg);

    let html = `
      <table class="table-custom normal-z-table">
        <thead>
          <tr>
            <th style="background:var(--primary); color:#fff; position:sticky; left:0; z-index:2;">z</th>
            ${data.cols.map(c => `<th>${c}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
    `;

    data.rows.forEach(r => {
      html += `
        <tr>
          <th style="background:var(--bg-tertiary); font-weight:700; position:sticky; left:0; z-index:1;">${r.label}</th>
          ${r.cells.map(c => `
            <td id="cell_z_${c.z.replace('.', '_').replace('-', 'm')}" class="z-cell" onclick="TablesModule.onCellClick('${c.z}', '${c.probStr}')" title="z = ${c.z} ⟹ Φ(z) = ${c.probStr}">
              ${c.probStr}
            </td>
          `).join('')}
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;

    container.innerHTML = html;
  },

  onCellClick(z, prob) {
    const pNum = parseFloat(prob);
    const pTail = (1 - pNum).toFixed(4);
    const pCent = (Math.abs(2 * pNum - 1)).toFixed(4);

    alert(`📍 Valor de Tabla A.3:\n• z = ${z}\n• Probabilidad acumulada Φ(z) = ${prob} (${(pNum * 100).toFixed(2)}%)\n• Cola derecha P(Z > z) = ${pTail}\n• Área bilateral P(-|z| ≤ Z ≤ |z|) = ${pCent}`);
  },

  renderGammaTable() {
    const container = document.getElementById('gammaTableContainer');
    if (!container) return;

    const data = this.gammaIncompleteData;
    let html = `
      <table class="table-custom">
        <thead>
          <tr>
            <th rowspan="2" style="vertical-align:middle; background:var(--primary); color:#fff;">x</th>
            <th colspan="10" style="text-align:center; background:rgba(99, 102, 241, 0.2);">Parámetro de forma α</th>
          </tr>
          <tr>
            ${data.alphas.map(a => `<th style="text-align:center;">${a}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
    `;

    data.rows.forEach(row => {
      html += `
        <tr>
          <th style="background:var(--bg-tertiary); font-weight:700; text-align:center;">${row.x}</th>
          ${row.vals.map((v, idx) => `
            <td style="text-align:center; ${parseFloat(v) >= 0.5 ? 'color:#38bdf8;' : ''}" title="x = ${row.x}, α = ${data.alphas[idx]} ⟹ F = ${v}">
              ${v}
            </td>
          `).join('')}
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;

    container.innerHTML = html;
  },

  renderGammaNotableValues() {
    const tbody = document.getElementById('gammaNotableTableBody');
    if (!tbody) return;

    let html = '';
    this.gammaNotableValues.forEach(item => {
      html += `
        <tr>
          <td><strong style="color:var(--primary);">${item.expr}</strong></td>
          <td><code>${item.val}</code> ${item.note ? `<br><small class="text-muted">${item.note}</small>` : ''}</td>
          <td>${item.num ? `<span class="badge-accent">${item.num}</span>` : '—'}</td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  },

  updateBinomialTable() {
    const n = parseInt(document.getElementById('tab_bin_n')?.value || '5', 10);
    const p = parseFloat(document.getElementById('tab_bin_p')?.value || '0.20');
    const container = document.getElementById('tab_bin_table_wrapper');
    if (!container) return;

    let html = `
      <table class="table-custom">
        <thead>
          <tr>
            <th>k</th>
            <th>P(X = k) [Puntual]</th>
            <th>P(X ≤ k) [Acumulada]</th>
            <th>P(X ≥ k) [Cola Superior]</th>
            <th>Porcentaje %</th>
          </tr>
        </thead>
        <tbody>
    `;

    let cumulative = 0;
    for (let k = 0; k <= n; k++) {
      const pmf = MathUtils.binomialPMF(k, n, p);
      cumulative += pmf;
      const tail = 1 - cumulative + pmf;
      html += `
        <tr>
          <td><strong>k = ${k}</strong></td>
          <td><code>${pmf.toFixed(4)}</code></td>
          <td><span class="text-primary font-weight-bold">${cumulative.toFixed(4)}</span></td>
          <td><span>${tail.toFixed(4)}</span></td>
          <td><span class="badge-accent">${(pmf * 100).toFixed(2)}%</span></td>
        </tr>
      `;
    }

    html += `
        </tbody>
      </table>
    `;

    container.innerHTML = html;
  },

  doLookupZ() {
    const input = document.getElementById('lookup_z_input');
    const resDiv = document.getElementById('lookup_z_result');
    if (!input || !resDiv) return;

    const z = parseFloat(input.value);
    if (isNaN(z)) {
      resDiv.innerHTML = '<span class="text-danger">Por favor ingresa un número válido para Z.</span>';
      return;
    }

    const pAcc = MathUtils.standardNormalCDF(z);
    const pTail = 1 - pAcc;
    const pBilateral = Math.abs(2 * pAcc - 1);

    const sign = z < 0 ? '-' : '';
    const absZ = Math.abs(z);
    const row = (Math.floor(absZ * 10) / 10).toFixed(1);
    const col = (Math.round((absZ - parseFloat(row)) * 100) / 100).toFixed(2).substring(1);

    resDiv.innerHTML = `
      <div class="d-flex-between"><span>P(Z ≤ ${z}):</span> <strong class="text-success" style="font-size:1.1rem;">${pAcc.toFixed(4)} (${(pAcc * 100).toFixed(2)}%)</strong></div>
      <div class="d-flex-between"><span>P(Z > ${z}) [Cola Derecha]:</span> <strong>${pTail.toFixed(4)} (${(pTail * 100).toFixed(2)}%)</strong></div>
      <div class="d-flex-between"><span>P(-|z| ≤ Z ≤ |z|) [Bilateral]:</span> <strong>${pBilateral.toFixed(4)} (${(pBilateral * 100).toFixed(2)}%)</strong></div>
      <div class="mt-1" style="font-size:0.82rem; color:var(--text-muted); background:var(--bg-tertiary); padding:0.4rem; border-radius:6px;">
        📍 <strong>Ubicación en Tabla A.3:</strong> ${z < 0 ? 'Pestaña <strong>Z Negativos</strong>' : 'Pestaña <strong>Z Positivos</strong>'}, Fila <strong>${sign}${row}</strong>, Columna <strong>${col}</strong>
      </div>
    `;

    // Cambiar vista a pos/neg según el z y resaltar celda
    const targetView = z < 0 ? 'neg' : 'pos';
    if (this.normalView !== targetView) {
      this.setNormalView(targetView);
    }
    const cleanId = `cell_z_${z.toFixed(2).replace('.', '_').replace('-', 'm')}`;
    const cell = document.getElementById(cleanId);
    if (cell) {
      document.querySelectorAll('.z-cell.highlight-cell').forEach(c => c.classList.remove('highlight-cell'));
      cell.classList.add('highlight-cell');
      cell.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },

  doLookupP() {
    const input = document.getElementById('lookup_p_input');
    const resDiv = document.getElementById('lookup_p_result');
    if (!input || !resDiv) return;

    const p = parseFloat(input.value);
    if (isNaN(p) || p <= 0 || p >= 1) {
      resDiv.innerHTML = '<span class="text-danger">Ingresa una probabilidad entre 0 y 1 (ej: 0.95).</span>';
      return;
    }

    const z = MathUtils.inverseNormalCDF(p);
    resDiv.innerHTML = `
      <div class="d-flex-between"><span>Probabilidad deseada:</span> <strong>${p.toFixed(4)} (${(p * 100).toFixed(2)}%)</strong></div>
      <div class="d-flex-between"><span>Valor Crítico Z exacto:</span> <strong class="text-primary" style="font-size:1.15rem;">z = ${z.toFixed(4)}</strong></div>
      <div class="mt-1" style="font-size:0.82rem; color:var(--text-muted); background:var(--bg-tertiary); padding:0.4rem; border-radius:6px;">
        💡 Útil para intervalos de confianza o percentiles. Por ejemplo: para 95% bilateral usa <code>z = ±1.960</code>, para 90% bilateral usa <code>z = ±1.645</code>, para 99% usa <code>z = ±2.576</code>.
      </div>
    `;
  }
};

window.TablesModule = TablesModule;
