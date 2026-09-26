/**
 * Guía de Distribuciones TP3 y TP4 - Cátedra FI-UNJu
 * Identificador de Distribución, Ejemplos Mínimos y Plantilla "Qué poner en la hoja"
 */
const DistGuideData = [
  // -------------------------------------------------------------
  // TP 3: VARIABLES ALEATORIAS DISCRETAS
  // -------------------------------------------------------------
  {
    id: "binomial",
    tp: "TP 3 - Discretas",
    name: "Distribución Binomial",
    notation: "X ~ B(n, p)",
    icon: "🎲",
    summary: "Cuenta el número de éxitos en n ensayos independientes e idénticos.",
    keywords: [
      "Muestra de tamaño n fija",
      "Probabilidad de éxito p constante",
      "Con reposición / ensayos independientes",
      "¿Cuántos éxitos ocurren entre los n?",
      "Dicotómico (Éxito o Fracaso)"
    ],
    example: {
      statement: "En un examen final rinde un grupo de 10 alumnos. La probabilidad de que un alumno apruebe es p = 0.80. ¿Cuál es la probabilidad de que exactamente 8 alumnos aprueben? ¿Y de que aprueben 6 o más?",
      params: { n: 10, p: 0.80, k: 8 },
      calcType: "binomial"
    },
    whatToWrite: `
<div class="sheet-template">
  <div class="sheet-step"><span class="step-num">1</span> <strong>Definir la Variable Aleatoria:</strong><br>
  <em>"Sea X: número de alumnos que aprueban el examen en una muestra de n = 10 alumnos seleccionados al azar. X es una variable aleatoria discreta."</em></div>

  <div class="sheet-step"><span class="step-num">2</span> <strong>Identificar el Modelo y Parámetros:</strong><br>
  <span class="badge badge-primary">X ~ B(n = 10, p = 0.80)</span> con q = 1 - p = 0.20</div>

  <div class="sheet-step"><span class="step-num">3</span> <strong>Escribir la Función de Probabilidad:</strong><br>
  <code class="math-expr">P(X = x) = \\binom{n}{x} p^x (1 - p)^{n - x} \\quad \\text{para } x = 0, 1, 2, ..., n</code></div>

  <div class="sheet-step"><span class="step-num">4</span> <strong>Plantear y Resolver el Suceso (a): Exactamente 8 alumnos</strong><br>
  <code class="math-expr">P(X = 8) = \\binom{10}{8} (0.80)^8 (0.20)^2 = 45 \\cdot (0.167772) \\cdot (0.04) = 0.3020 \\quad (30.20%)</code></div>

  <div class="sheet-step"><span class="step-num">5</span> <strong>Plantear y Resolver el Suceso (b): 6 o más alumnos</strong><br>
  <code class="math-expr">P(X \\ge 6) = P(X=6) + P(X=7) + P(X=8) + P(X=9) + P(X=10) = 0.9672 \\quad (96.72%)</code></div>

  <div class="sheet-step"><span class="step-num">6</span> <strong>Esperanza y Varianza (si las piden):</strong><br>
  <code>E(X) = n · p = 10 × 0.80 = 8 alumnos</code><br>
  <code>Var(X) = n · p · q = 10 × 0.80 × 0.20 = 1.6</code> ⟹ <code>σ = √1.6 ≈ 1.26</code></div>

  <div class="sheet-step"><span class="step-num">7</span> <strong>Conclusión / Respuesta Redactada:</strong><br>
  <em>"Respuesta: La probabilidad de que aprueben exactamente 8 alumnos es del 30.20%, y la probabilidad de que aprueben 6 o más es del 96.72%."</em></div>
</div>
    `
  },
  {
    id: "negativeBinomial",
    tp: "TP 3 - Discretas",
    name: "Distribución Binomial Negativa (Pascal)",
    notation: "X ~ BN(r, p)",
    icon: "🎯",
    summary: "Cuenta el total de ensayos necesarios (x) para conseguir r éxitos.",
    keywords: [
      "El k-ésimo individuo sea el r-ésimo éxito",
      "Número de entrevistas/intentos hasta conseguir r éxitos",
      "El último ensayo SIEMPRE es un éxito",
      "r éxitos fijos, número de ensayos x aleatorio"
    ],
    example: {
      statement: "El 80% de los alumnos cursó la materia este año (p = 0.80). Se entrevistan alumnos al azar. ¿Cuál es la probabilidad de que el 6° alumno entrevistado sea el 4° que cursó la materia este año?",
      params: { r: 4, x: 6, p: 0.80 },
      calcType: "negativeBinomial"
    },
    whatToWrite: `
<div class="sheet-template">
  <div class="sheet-step"><span class="step-num">1</span> <strong>Definir la Variable Aleatoria:</strong><br>
  <em>"Sea X: número total de alumnos entrevistados hasta encontrar r = 4 alumnos que cursaron la materia este año. X es una V.A. discreta."</em></div>

  <div class="sheet-step"><span class="step-num">2</span> <strong>Identificar el Modelo y Parámetros:</strong><br>
  <span class="badge badge-primary">X ~ BN(r = 4, p = 0.80)</span> (Distribución Binomial Negativa o de Pascal).</div>

  <div class="sheet-step"><span class="step-num">3</span> <strong>Escribir la Función de Probabilidad Puntual:</strong><br>
  <code class="math-expr">P(X = x) = \\binom{x - 1}{r - 1} p^r (1 - p)^{x - r} \\quad \\text{para } x = r, r+1, r+2, ...</code></div>

  <div class="sheet-step"><span class="step-num">4</span> <strong>Sustitución Numérica para x = 6 ensayos y r = 4 éxitos:</strong><br>
  <code class="math-expr">P(X = 6) = \\binom{6 - 1}{4 - 1} (0.80)^4 (0.20)^{6 - 4} = \\binom{5}{3} (0.80)^4 (0.20)^2</code><br>
  <code class="math-expr">\\binom{5}{3} = \\frac{5!}{3! \\cdot 2!} = 10</code><br>
  <code class="math-expr">P(X = 6) = 10 \\cdot 0.4096 \\cdot 0.04 = 0.16384 \\quad (16.38%)</code></div>

  <div class="sheet-step"><span class="step-num">5</span> <strong>Esperanza Matemática:</strong><br>
  <code>E(X) = r / p = 4 / 0.80 = 5 ensayos esperados</code></div>

  <div class="sheet-step"><span class="step-num">6</span> <strong>Conclusión:</strong><br>
  <em>"Respuesta: La probabilidad de que el sexto alumno entrevistado sea el cuarto que cursó la materia es del 16.38%."</em></div>
</div>
    `
  },
  {
    id: "hypergeometric",
    tp: "TP 3 - Discretas",
    name: "Distribución Hipergeométrica",
    notation: "X ~ H(N, A, n)",
    icon: "🐟",
    summary: "Muestreo SIN REEMPLAZO de tamaño n en una población finita N.",
    keywords: [
      "Sin reposición / Sin reemplazo",
      "Población finita N con A éxitos y N - A fracasos",
      "Se extraen n elementos simultáneamente",
      "Las probabilidades cambian en cada extracción"
    ],
    example: {
      statement: "En un criadero hay N = 47 peces, de los cuales A = 23 son surubíes. Un pescador extrae n = 7 peces sin reemplazo. ¿Cuál es la probabilidad de capturar exactamente k = 2 surubíes? ¿Y por lo menos 2 surubíes?",
      params: { N: 47, A: 23, n: 7, k: 2 },
      calcType: "hypergeometric"
    },
    whatToWrite: `
<div class="sheet-template">
  <div class="sheet-step"><span class="step-num">1</span> <strong>Definir la Variable Aleatoria:</strong><br>
  <em>"Sea X: número de surubíes obtenidos en la muestra de tamaño n = 7 peces extraídos sin reemplazo de un total de N = 47 peces. X es una V.A. discreta."</em></div>

  <div class="sheet-step"><span class="step-num">2</span> <strong>Identificar el Modelo y Parámetros:</strong><br>
  <span class="badge badge-primary">X ~ H(N = 47, A = 23, n = 7)</span><br>
  Población total: N = 47 | Éxitos en población: A = 23 | Fracasos en población: N - A = 24 | Muestra: n = 7</div>

  <div class="sheet-step"><span class="step-num">3</span> <strong>Escribir la Función de Probabilidad:</strong><br>
  <code class="math-expr">P(X = x) = \\frac{\\binom{A}{x} \\binom{N - A}{n - x}}{\\binom{N}{n}}</code></div>

  <div class="sheet-step"><span class="step-num">4</span> <strong>Sustitución para exactamente k = 2 surubíes:</strong><br>
  <code class="math-expr">P(X = 2) = \\frac{\\binom{23}{2} \\binom{24}{7 - 2}}{\\binom{47}{7}} = \\frac{\\binom{23}{2} \\binom{24}{5}}{\\binom{47}{7}} = \\frac{253 \\cdot 42504}{62891499} = 0.1710 \\quad (17.10%)</code></div>

  <div class="sheet-step"><span class="step-num">5</span> <strong>Por lo menos 2 surubíes P(X ≥ 2):</strong><br>
  <code>P(X ≥ 2) = 1 - P(X = 0) - P(X = 1) = 1 - (0.0055 + 0.0492) = 0.9453 (94.53%)</code></div>

  <div class="sheet-step"><span class="step-num">6</span> <strong>Número Esperado de Éxitos E(X):</strong><br>
  <code>E(X) = n · (A / N) = 7 · (23 / 47) = 161 / 47 ≈ 3.43 surubíes</code></div>
</div>
    `
  },
  {
    id: "poisson",
    tp: "TP 3 - Discretas",
    name: "Distribución de Poisson",
    notation: "X ~ Poisson(μ = λ · t)",
    icon: "⏱️",
    summary: "Cuenta eventos en un intervalo de tiempo continuo t o región con tasa media λ.",
    keywords: [
      "Promedio o media por unidad de tiempo (clientes/min, llamadas/hora)",
      "Proceso de Poisson en un intervalo t",
      "Eventos raros o independientes en medio continuo",
      "Conversión de intervalo (ej: tasa en 1 min ⟹ calcular en 30 seg o 2 horas)"
    ],
    example: {
      statement: "Una heladería recibe en promedio 5 clientes por minuto (λ = 5 clientes/min). ¿Cuál es la probabilidad de que en un minuto determinado lleguen 7 clientes? ¿Y en 30 segundos entre 3 y 7 clientes?",
      params: { lambda: 5, t: 1, k: 7 },
      calcType: "poisson"
    },
    whatToWrite: `
<div class="sheet-template">
  <div class="sheet-step"><span class="step-num">1</span> <strong>Definir la Variable Aleatoria:</strong><br>
  <em>"Sea X: número de clientes que llegan a la heladería en un intervalo de amplitud t = 1 minuto. X es una V.A. discreta."</em></div>

  <div class="sheet-step"><span class="step-num">2</span> <strong>Identificar Modelo y Parámetro μ:</strong><br>
  Tasa media: λ = 5 clientes/minuto ⟹ Para t = 1 min: <span class="badge badge-primary">μ = λ · t = 5 · 1 = 5</span><br>
  <span class="badge badge-primary">X ~ Poisson(μ = 5)</span></div>

  <div class="sheet-step"><span class="step-num">3</span> <strong>Escribir la Función de Probabilidad:</strong><br>
  <code class="math-expr">P(X = x) = \\frac{e^{-\\mu} \\cdot \\mu^x}{x!} \\quad \\text{para } x = 0, 1, 2, ...</code></div>

  <div class="sheet-step"><span class="step-num">4</span> <strong>Sustitución para x = 7 clientes en 1 minuto:</strong><br>
  <code class="math-expr">P(X = 7) = \\frac{e^{-5} \\cdot 5^7}{7!} = \\frac{(0.0067379) \\cdot 78125}{5040} = 0.1044 \\quad (10.44%)</code></div>

  <div class="sheet-step"><span class="step-num">5</span> <strong>Cambio de Intervalo a 30 segundos (t = 0.5 min):</strong><br>
  Nuevo parámetro: <code>μ' = λ · t' = 5 × 0.5 = 2.5 clientes</code><br>
  <code class="math-expr">P(3 \\le X \\le 7) = \\sum_{k=3}^7 \\frac{e^{-2.5} \\cdot (2.5)^k}{k!} = P(3) + P(4) + P(5) + P(6) + P(7) = 0.4520 \\quad (45.20%)</code></div>

  <div class="sheet-step"><span class="step-num">6</span> <strong>Esperanza y Varianza:</strong><br>
  <code>E(X) = μ = 5</code>, <code>Var(X) = μ = 5</code> ⟹ <code>σ = √5 ≈ 2.236</code></div>
</div>
    `
  },
  {
    id: "geometric",
    tp: "TP 3 - Discretas",
    name: "Distribución Geométrica",
    notation: "X ~ G(p)",
    icon: "🎲",
    summary: "Número de ensayos independientes hasta obtener el PRIMER éxito.",
    keywords: [
      "Hasta el primer éxito",
      "Primer artículo defectuoso observado",
      "Caso particular de Pascal con r = 1"
    ],
    example: {
      statement: "La probabilidad de encestar un tiro libre es p = 0.70. ¿Cuál es la probabilidad de que enceste por primera vez en el 3° intento?",
      params: { p: 0.70, x: 3 },
      calcType: "geometric"
    },
    whatToWrite: `
<div class="sheet-template">
  <div class="sheet-step"><span class="step-num">1</span> <strong>Definir Variable:</strong> <em>"Sea X: número de intentos hasta encestar por primera vez. X ~ G(p = 0.70)"</em></div>
  <div class="sheet-step"><span class="step-num">2</span> <strong>Fórmula:</strong> <code class="math-expr">P(X = x) = p (1 - p)^{x - 1} \\quad \\text{para } x = 1, 2, ...</code></div>
  <div class="sheet-step"><span class="step-num">3</span> <strong>Cálculo:</strong> <code class="math-expr">P(X = 3) = (0.70)(0.30)^2 = 0.70 \\times 0.09 = 0.0630 \\quad (6.30%)</code></div>
  <div class="sheet-step"><span class="step-num">4</span> <strong>Esperanza:</strong> <code>E(X) = 1 / p = 1 / 0.70 ≈ 1.43 intentos</code></div>
</div>
    `
  },

  // -------------------------------------------------------------
  // TP 4: VARIABLES ALEATORIAS CONTINUAS
  // -------------------------------------------------------------
  {
    id: "normal",
    tp: "TP 4 - Continuas",
    name: "Distribución Normal (Gauss)",
    notation: "X ~ N(μ, σ²)",
    icon: "🔔",
    summary: "Curva simétrica en forma de campana. La reina de la inferencia estadística.",
    keywords: [
      "Distribución Normal",
      "Media μ y Desviación Estándar σ",
      "Campana simétrica centrada en la media",
      "Estandarización Z = (X - μ) / σ",
      "Percentil o cuantil inverso",
      "Multiplicar por población N para hallar cantidad esperada"
    ],
    example: {
      statement: "Un curso de capacitación tiene una duración media estimada de μ = 8.2 horas con desviación estándar de σ = 1.1 horas (Normal). Determine la probabilidad de que el curso dure entre 7 y 10 horas. Si hay 20 encuentros al año, ¿cuántos se espera que duren entre 7 y 10 hs?",
      params: { mu: 8.2, sigma: 1.1, x1: 7, x2: 10, popN: 20 },
      calcType: "normal"
    },
    whatToWrite: `
<div class="sheet-template">
  <div class="sheet-step"><span class="step-num">1</span> <strong>Definir la Variable Aleatoria:</strong><br>
  <em>"Sea X: duración en horas del curso de capacitación de operarios. X es una variable aleatoria continua."</em></div>

  <div class="sheet-step"><span class="step-num">2</span> <strong>Identificar el Modelo y Parámetros:</strong><br>
  <span class="badge badge-primary">X ~ N(μ = 8.2, σ² = 1.1²)</span> con media μ = 8.2 hs y desvío estándar σ = 1.1 hs.</div>

  <div class="sheet-step"><span class="step-num">3</span> <strong>Plantear la Estandarización a la Normal Estándar Z ~ N(0, 1):</strong><br>
  <code class="math-expr">Z = \\frac{X - \\mu}{\\sigma} \\sim N(0, 1)</code></div>

  <div class="sheet-step"><span class="step-num">4</span> <strong>Estandarizar los Límites x₁ = 7 y x₂ = 10:</strong><br>
  <code class="math-expr">z_1 = \\frac{7 - 8.2}{1.1} = \\frac{-1.2}{1.1} = -1.09</code><br>
  <code class="math-expr">z_2 = \\frac{10 - 8.2}{1.1} = \\frac{1.8}{1.1} = 1.64</code></div>

  <div class="sheet-step"><span class="step-num">5</span> <strong>Calcular la Probabilidad usando la Tabla Normal Φ(z):</strong><br>
  <code class="math-expr">P(7 \\le X \\le 10) = P(-1.09 \\le Z \\le 1.64) = \\Phi(1.64) - \\Phi(-1.09)</code><br>
  Por propiedad de simetría de la tabla: <code>Φ(-1.09) = 1 - Φ(1.09) = 1 - 0.8621 = 0.1379</code><br>
  <code class="math-expr">P(7 \\le X \\le 10) = 0.9495 - 0.1379 = 0.8116 \\quad (81.16%)</code></div>

  <div class="sheet-step"><span class="step-num">6</span> <strong>Proyección en Población N = 20 encuentros:</strong><br>
  <code>E = N · P = 20 × 0.8116 = 16.23 ≈ 16 encuentros</code></div>

  <div class="sheet-step"><span class="step-num">7</span> <strong>Conclusión:</strong><br>
  <em>"Respuesta: La probabilidad de que dure entre 7 y 10 horas es del 81.16%. Se espera que aproximadamente 16 de los 20 encuentros cumplan esta condición."</em></div>
</div>
    `
  },
  {
    id: "uniformContinuous",
    tp: "TP 4 - Continuas",
    name: "Distribución Uniforme Continua (Rectangular)",
    notation: "X ~ U(a, b)",
    icon: "📏",
    summary: "Densidad de probabilidad constante en todo el intervalo cerrado [a, b].",
    keywords: [
      "Se distribuye uniformemente en el intervalo [a, b]",
      "Equiprobable entre a y b",
      "Lead time / tiempo de reposición entre a y b días",
      "Área de un rectángulo (base × altura)"
    ],
    example: {
      statement: "El tiempo de reposición (lead time) de un repuesto crítico se distribuye uniformemente entre 4 y 10 días: X ~ U(4, 10). Calcule la media, el desvío estándar, P(X ≥ 8) y P(X ≤ 6). ¿Qué es más probable?",
      params: { a: 4, b: 10, x1: 8, x2: 6 },
      calcType: "uniformContinuous"
    },
    whatToWrite: `
<div class="sheet-template">
  <div class="sheet-step"><span class="step-num">1</span> <strong>Definir Variable:</strong><br>
  <em>"Sea X: tiempo de reposición (lead time) en días. X es una V.A. continua con distribución uniforme en [4, 10]."</em></div>

  <div class="sheet-step"><span class="step-num">2</span> <strong>Modelo y Parámetros:</strong><br>
  <span class="badge badge-primary">X ~ U(a = 4, b = 10)</span> con longitud de intervalo b - a = 6 días.</div>

  <div class="sheet-step"><span class="step-num">3</span> <strong>Función de Densidad y Distribución Acumulada:</strong><br>
  <code class="math-expr">f(x) = \\frac{1}{b - a} = \\frac{1}{6} \\quad (4 \\le x \\le 10)</code><br>
  <code class="math-expr">F(x) = \\frac{x - a}{b - a} = \\frac{x - 4}{6} \\quad (4 \\le x \\le 10)</code></div>

  <div class="sheet-step"><span class="step-num">4</span> <strong>Cálculo de Media y Desviación Estándar:</strong><br>
  <code class="math-expr">\\mu = E(X) = \\frac{a + b}{2} = \\frac{4 + 10}{2} = 7 \\text{ días}</code><br>
  <code class="math-expr">\\sigma^2 = \\text{Var}(X) = \\frac{(b - a)^2}{12} = \\frac{6^2}{12} = \\frac{36}{12} = 3 \\implies \\sigma = \\sqrt{3} \\approx 1.732 \\text{ días}</code></div>

  <div class="sheet-step"><span class="step-num">5</span> <strong>Cálculo de Probabilidades Pedidas:</strong><br>
  <code class="math-expr">P(X \\ge 8) = \\frac{10 - 8}{10 - 4} = \\frac{2}{6} = \\frac{1}{3} = 0.3333 \\quad (33.33%)</code><br>
  <code class="math-expr">P(X \\le 6) = \\frac{6 - 4}{10 - 4} = \\frac{2}{6} = \\frac{1}{3} = 0.3333 \\quad (33.33%)</code></div>

  <div class="sheet-step"><span class="step-num">6</span> <strong>Conclusión y Comparación:</strong><br>
  <em>"Respuesta: Ambos sucesos son igualmente probables (33.33% cada uno) debido a la simetría de la distribución uniforme respecto a su media μ = 7 días."</em></div>
</div>
    `
  },
  {
    id: "gamma",
    tp: "TP 4 - Continuas",
    name: "Distribución Gamma y Erlang",
    notation: "Y ~ Gamma(α, β) / Erlang(r, λ)",
    icon: "⏳",
    summary: "Tiempo que transcurre hasta que ocurren α eventos en un proceso de Poisson.",
    keywords: [
      "Tiempo hasta la ocurrencia de k eventos (α = k)",
      "Proceso de Poisson ⟹ tiempo hasta r llegadas",
      "Teorema Poisson-Gamma de la cátedra UNJu",
      "Parámetro de forma α y parámetro de escala β = 1/λ"
    ],
    example: {
      statement: "Una heladería recibe λ = 5 clientes por minuto (1 cliente cada β = 12 segundos). Se define Y como el tiempo en segundos hasta la llegada de 2 clientes (α = 2). Calcule P(Y ≤ 30 seg) y P(30 ≤ Y ≤ 48 seg).",
      params: { alpha: 2, beta: 12, t1: 30, t2: 48 },
      calcType: "gamma"
    },
    whatToWrite: `
<div class="sheet-template">
  <div class="sheet-step"><span class="step-num">1</span> <strong>Definir Variable:</strong><br>
  <em>"Sea Y: tiempo en segundos transcurrido hasta la llegada de α = 2 clientes a la heladería. Y es una V.A. continua."</em></div>

  <div class="sheet-step"><span class="step-num">2</span> <strong>Determinar Parámetros en Segundos:</strong><br>
  Tasa por segundo: <code>λ = 5/60 = 1/12 clientes/segundo</code><br>
  Parámetro de escala: <code>β = 1/λ = 12 segundos/cliente</code><br>
  <span class="badge badge-primary">Y ~ Gamma(α = 2, β = 12 seg)</span></div>

  <div class="sheet-step"><span class="step-num">3</span> <strong>Enunciar el Teorema Fundamental Poisson-Gamma (Cátedra FI-UNJu):</strong><br>
  <div class="formula-box">
    <em>"El tiempo transcurrido hasta la llegada de α clientes es menor o igual a t si y solo si en el intervalo [0, t] llegan al menos α clientes en el proceso de Poisson asociado:"</em><br>
    <code class="math-expr">P(Y \\le t) = P(N_t \\ge \\alpha) = 1 - \\sum_{k=0}^{\\alpha - 1} \\frac{e^{-\\mu} \\mu^k}{k!} \\quad \\text{con } \\mu = \\frac{t}{\\beta}</code>
  </div></div>

  <div class="sheet-step"><span class="step-num">4</span> <strong>Cálculo para t = 30 segundos (μ = 30 / 12 = 2.5):</strong><br>
  <code class="math-expr">P(Y \\le 30) = 1 - P(N_{30} = 0) - P(N_{30} = 1) = 1 - e^{-2.5}(1 + 2.5) = 1 - (3.5)(0.082085) = 0.7127 \\quad (71.27%)</code></div>

  <div class="sheet-step"><span class="step-num">5</span> <strong>Cálculo para el Intervalo [30, 48] segundos:</strong><br>
  Para t = 48 seg: <code>μ = 48 / 12 = 4</code> ⟹ <code>P(Y ≤ 48) = 1 - e⁻⁴(1 + 4) = 1 - 5(0.018316) = 0.9084</code><br>
  <code class="math-expr">P(30 \\le Y \\le 48) = P(Y \\le 48) - P(Y \\le 30) = 0.9084 - 0.7127 = 0.1957 \\quad (19.57%)</code></div>

  <div class="sheet-step"><span class="step-num">6</span> <strong>Esperanza y Varianza:</strong><br>
  <code>E(Y) = α · β = 2 × 12 = 24 segundos</code><br>
  <code>Var(Y) = α · β² = 2 × 144 = 288 seg²</code> ⟹ <code>σ = √288 ≈ 16.97 seg</code></div>
</div>
    `
  },
  {
    id: "exponential",
    tp: "TP 4 - Continuas",
    name: "Distribución Exponencial",
    notation: "X ~ Exp(β = 1/λ)",
    icon: "⚡",
    summary: "Tiempo transcurrido antes de la ocurrencia del PRIMER evento.",
    keywords: [
      "Tiempo hasta la ocurrencia del primer evento",
      "Tiempo de vida sin memoria P(X > s+t | X > s) = P(X > t)",
      "Caso particular de Gamma con α = 1",
      "Tasa constante de falla λ ⟹ media β = 1/λ"
    ],
    example: {
      statement: "El tiempo entre llegadas sucesivas a un cajero sigue una distribución exponencial con media de β = 4 minutos. ¿Cuál es la probabilidad de que pasen más de 6 minutos hasta la próxima llegada?",
      params: { beta: 4, x: 6 },
      calcType: "exponential"
    },
    whatToWrite: `
<div class="sheet-template">
  <div class="sheet-step"><span class="step-num">1</span> <strong>Definir Variable:</strong> <em>"Sea X: tiempo en minutos hasta la llegada del próximo cliente. X ~ Exp(β = 4 min)."</em></div>
  <div class="sheet-step"><span class="step-num">2</span> <strong>Función Acumulada:</strong> <code class="math-expr">F(x) = P(X \\le x) = 1 - e^{-x / \\beta} \\implies P(X > x) = e^{-x / \\beta}</code></div>
  <div class="sheet-step"><span class="step-num">3</span> <strong>Cálculo:</strong> <code class="math-expr">P(X > 6) = e^{-6 / 4} = e^{-1.5} \\approx 0.2231 \\quad (22.31%)</code></div>
  <div class="sheet-step"><span class="step-num">4</span> <strong>Esperanza y Varianza:</strong> <code>E(X) = β = 4 min</code>, <code>Var(X) = β² = 16 min²</code></div>
</div>
    `
  },
  {
    id: "weibull",
    tp: "TP 4 - Continuas",
    name: "Distribución de Weibull",
    notation: "X ~ Weibull(δ, β)",
    icon: "⚙️",
    summary: "Tiempo hasta la falla en sistemas físicos con tasa de riesgo variable (desgaste).",
    keywords: [
      "Tiempo de falla con desgaste por uso",
      "Parámetro de escala δ > 0 y parámetro de forma β > 0",
      "Función acumulada con exponencial compuesta"
    ],
    example: {
      statement: "La vida útil de un rodamiento industrial tiene distribución de Weibull con escala δ = 5000 hs y forma β = 2.0. ¿Probabilidad de que falle antes de las 3000 hs?",
      params: { delta: 5000, beta: 2.0, x: 3000 },
      calcType: "weibull"
    },
    whatToWrite: `
<div class="sheet-template">
  <div class="sheet-step"><span class="step-num">1</span> <strong>Definir Variable:</strong> <em>"Sea X: tiempo en horas hasta la falla del rodamiento. X ~ Weibull(δ = 5000, β = 2)."</em></div>
  <div class="sheet-step"><span class="step-num">2</span> <strong>Función Acumulada:</strong> <code class="math-expr">F(x) = P(X \\le x) = 1 - e^{-(x / \\delta)^\\beta} \\quad (x > 0)</code></div>
  <div class="sheet-step"><span class="step-num">3</span> <strong>Cálculo para x = 3000 hs:</strong> <code class="math-expr">P(X \\le 3000) = 1 - e^{-(3000 / 5000)^2} = 1 - e^{-(0.6)^2} = 1 - e^{-0.36} = 1 - 0.6977 = 0.3023 \\quad (30.23%)</code></div>
</div>
    `
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DistGuideData;
}
