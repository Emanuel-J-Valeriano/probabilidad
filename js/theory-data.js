/**
 * Complete Theory Content according to Cátedra FI-UNJu
 */
const TheoryData = [
  {
    id: "unidad1",
    title: "Unidad 1: Fundamentos y Análisis Combinatorio",
    icon: "🎲",
    summary: "Espacio muestral, sucesos, axiomas de probabilidad de Kolmogorov y técnicas de conteo.",
    sections: [
      {
        title: "1.1 Conceptos Básicos y Espacio Muestral",
        content: `
          <p>Un <strong>experimento aleatorio</strong> es aquel cuyo resultado no puede predecirse con certeza antes de realizarse, aunque se conozcan todos los resultados posibles.</p>
          <p>El conjunto de todos los resultados posibles se denomina <strong>Espacio Muestral</strong> y se simboliza con <code>Ω</code> o <code>S</code>.</p>
          <ul>
            <li><strong>Suceso Elemental o Simple:</strong> cada uno de los elementos individuales de Ω.</li>
            <li><strong>Suceso Compuesto:</strong> subconjunto formado por dos o más sucesos simples.</li>
            <li><strong>Suceso Seguro:</strong> ocurre siempre y coincide con el espacio muestral <code>Ω</code>.</li>
            <li><strong>Suceso Imposible:</strong> no tiene elementos, se denota con el conjunto vacío <code>∅</code>.</li>
          </ul>
        `
      },
      {
        title: "1.2 Operaciones con Sucesos",
        content: `
          <div class="formula-box">
            <p><strong>Unión (A ∪ B):</strong> Ocurre A, o B, o ambos.</p>
            <p><strong>Intersección (A ∩ B):</strong> Ocurren simultáneamente A y B.</p>
            <p><strong>Complemento (Aᶜ o A̅):</strong> Ocurre cuando A no ocurre. P(Aᶜ) = 1 - P(A).</p>
            <p><strong>Diferencia (A - B):</strong> Ocurre A pero no B. A - B = A ∩ Bᶜ.</p>
            <p><strong>Sucesos Mutuamente Excluyentes (Disjuntos):</strong> No pueden ocurrir al mismo tiempo: <code>A ∩ B = ∅ ⟹ P(A ∩ B) = 0</code>.</p>
          </div>
        `
      },
      {
        title: "1.3 Axiomas de Kolmogorov y Propiedades",
        content: `
          <p>Axiomas fundamentales:</p>
          <ol>
            <li><strong>No negatividad:</strong> Para todo suceso A, <code>P(A) ≥ 0</code>.</li>
            <li><strong>Certeza:</strong> <code>P(Ω) = 1</code>.</li>
            <li><strong>Aditividad:</strong> Si A y B son mutuamente excluyentes (A ∩ B = ∅), entonces <code>P(A ∪ B) = P(A) + P(B)</code>.</li>
          </ol>
          <div class="formula-box highlight">
            <h4>Regla de la Adición General:</h4>
            <p class="math-expr">P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</p>
            <small>Si son mutuamente excluyentes, P(A ∩ B) = 0.</small>
          </div>
        `
      },
      {
        title: "1.4 Análisis Combinatorio",
        content: `
          <p>El análisis combinatorio estudia las distintas agrupaciones que se pueden formar con los elementos de un conjunto finito.</p>
          <div class="grid-2">
            <div class="card-inner">
              <h4>Variaciones (Importa el orden)</h4>
              <p><strong>Sin repetición:</strong> m elementos tomados de a n.</p>
              <p class="math-expr">V_m^n = \\frac{m!}{(m - n)!}</p>
              <p><strong>Con repetición:</strong></p>
              <p class="math-expr">VR_m^n = m^n</p>
            </div>
            <div class="card-inner">
              <h4>Permutaciones (Entran todos)</h4>
              <p><strong>Simples:</strong> Ordenar n elementos distintos.</p>
              <p class="math-expr">P_n = n!</p>
              <p><strong>Con elementos repetidos:</strong></p>
              <p class="math-expr">PR_n^{a, b, c} = \\frac{n!}{a! \\cdot b! \\cdot c!}</p>
            </div>
          </div>
          <div class="card-inner mt-2">
            <h4>Combinaciones (NO importa el orden)</h4>
            <p>Subconjuntos de n elementos a partir de m disponibles:</p>
            <p class="math-expr">C_m^n = \\binom{m}{n} = \\frac{m!}{n! \\cdot (m - n)!}</p>
          </div>
        `
      }
    ]
  },
  {
    id: "unidad2",
    title: "Unidad 2: Probabilidad Condicional, Bayes e Independencia",
    icon: "🌳",
    summary: "Regla del producto, sucesos independientes, Teorema de Probabilidad Total y Teorema de Bayes.",
    sections: [
      {
        title: "2.1 Probabilidad Condicional",
        content: `
          <p>La probabilidad de que ocurra el suceso <strong>A</strong> sabiendo con certeza que ya ocurrió el suceso <strong>B</strong> (con P(B) > 0) se define como:</p>
          <div class="formula-box highlight">
            <p class="math-expr">P(A | B) = \\frac{P(A ∩ B)}{P(B)}</p>
          </div>
          <p>De aquí surge la <strong>Regla de la Multiplicación</strong>:</p>
          <p class="math-expr">P(A ∩ B) = P(B) \\cdot P(A | B) = P(A) \\cdot P(B | A)</p>
        `
      },
      {
        title: "2.2 Sucesos Independientes vs Mutuamente Excluyentes",
        content: `
          <div class="grid-2">
            <div class="card-inner">
              <h4>Sucesos Independientes</h4>
              <p>La ocurrencia de uno no afecta la probabilidad del otro.</p>
              <p class="math-expr">P(A | B) = P(A) \\iff P(A ∩ B) = P(A) \\cdot P(B)</p>
              <small class="badge badge-success">Se multiplican probabilidades directas</small>
            </div>
            <div class="card-inner">
              <h4>Sucesos Mutuamente Excluyentes</h4>
              <p>No pueden ocurrir juntos (disjuntos).</p>
              <p class="math-expr">A ∩ B = ∅ \\implies P(A ∩ B) = 0</p>
              <small class="badge badge-warning">¡Son fuertemente DEPENDIENTES!</small>
            </div>
          </div>
          <div class="alert-box mt-2">
            <strong>⚠️ Tip de Parcial FI-UNJu:</strong> Si dos sucesos tienen probabilidad mayor a cero, ¡NO pueden ser al mismo tiempo independientes y excluyentes!
          </div>
        `
      },
      {
        title: "2.3 Teorema de la Probabilidad Total y Teorema de Bayes",
        content: `
          <p>Si los sucesos <code>A₁, A₂, ..., Aₖ</code> forman una <strong>partición</strong> del espacio muestral Ω (son mutuamente excluyentes dos a dos y su unión es todo Ω), y B es cualquier suceso con P(B) > 0:</p>
          <div class="formula-box">
            <h4>Teorema de la Probabilidad Total:</h4>
            <p class="math-expr">P(B) = \\sum_{i=1}^k P(A_i) \\cdot P(B | A_i)</p>
            <p class="math-expr">P(B) = P(A₁)P(B|A₁) + P(A₂)P(B|A₂) + ... + P(Aₖ)P(B|Aₖ)</p>
          </div>
          <div class="formula-box highlight mt-2">
            <h4>Teorema de Bayes (Probabilidad a Posteriori):</h4>
            <p class="math-expr">P(A_j | B) = \\frac{P(A_j) \\cdot P(B | A_j)}{P(B)} = \\frac{P(A_j) \\cdot P(B | A_j)}{\\sum_{i=1}^k P(A_i) \\cdot P(B | A_i)}</p>
          </div>
          <p><strong>Interpretación:</strong> Permite calcular la probabilidad de que una causa <code>Aⱼ</code> haya originado el efecto observado <code>B</code>.</p>
        `
      }
    ]
  },
  {
    id: "unidad3",
    title: "Unidad 3: Tablas de Contingencia Bidimensionales",
    icon: "📊",
    summary: "Frecuencias, resolución de incógnitas, distribuciones marginales, conjuntas y prueba de independencia.",
    sections: [
      {
        title: "3.1 Estructura de la Tabla Bidimensional",
        content: `
          <p>Una tabla de contingencia clasifica a un conjunto de N individuos según dos criterios cualitativos o cuantitativos (Filas F₁...Fᵣ y Columnas C₁...Cₛ).</p>
          <div class="formula-box">
            <p><strong>Total de Fila i:</strong> n_i• = Σ_j n_ij</p>
            <p><strong>Total de Columna j:</strong> n_•j = Σ_i n_ij</p>
            <p><strong>Total General N:</strong> N = Σ_i n_i• = Σ_j n_•j</p>
          </div>
        `
      },
      {
        title: "3.2 Cálculo de Incógnitas (A, B, C, D en Parciales)",
        content: `
          <p>En los parciales de la UNJu siempre se plantean celdas faltantes:</p>
          <ol>
            <li>Si falta un valor dentro de una fila cuyo total marginal se conoce: <code>Incógnita = Total_Fila - Σ(valores conocidos)</code>.</li>
            <li>Si falta un valor dentro de una columna con total conocido: <code>Incógnita = Total_Columna - Σ(valores conocidos)</code>.</li>
            <li>Si falta el total de una columna o fila: <code>Total = Σ(celdas de esa fila o columna ya completadas)</code>.</li>
          </ol>
        `
      },
      {
        title: "3.3 Probabilidades y Prueba de Independencia",
        content: `
          <div class="formula-box highlight">
            <p><strong>Probabilidad Marginal:</strong> P(F_i) = \\frac{n_i•}{N}, \\quad P(C_j) = \\frac{n_•j}{N}</p>
            <p><strong>Probabilidad Conjunta:</strong> P(F_i ∩ C_j) = \\frac{n_ij}{N}</p>
            <p><strong>Probabilidad Condicional:</strong> P(F_i | C_j) = \\frac{n_ij}{n_•j}, \\quad P(C_j | F_i) = \\frac{n_ij}{n_i•}</p>
            <p><strong>Regla de la Adición:</strong> P(F_i ∪ C_j) = P(F_i) + P(C_j) - P(F_i ∩ C_j) = \\frac{n_i• + n_•j - n_ij}{N}</p>
          </div>
          <h4>Demostración de Independencia:</h4>
          <p>Para demostrar si los sucesos F_i y C_j son independientes:</p>
          <ol>
            <li>Calcular la probabilidad conjunta observada: <code>P_obs = n_ij / N</code>.</li>
            <li>Calcular el producto de marginales: <code>P_esp = P(F_i) × P(C_j) = (n_i• / N) × (n_•j / N)</code>.</li>
            <li><strong>Conclusión:</strong> Si <code>P(F_i ∩ C_j) == P(F_i) × P(C_j)</code> son independientes. En caso contrario, <strong>son dependientes</strong>.</li>
          </ol>
        `
      },
      {
        title: "3.4 Muestreo Sin Reposición (Regla del Producto)",
        content: `
          <p>Cuando se seleccionan k individuos <em>sin reposición</em> de un total N donde m cumplen cierta condición:</p>
          <p class="math-expr">P(todos cumplan) = \\frac{m}{N} \\cdot \\frac{m - 1}{N - 1} \\cdot \\frac{m - 2}{N - 2} \\cdots</p>
          <p>Equivale a la combinación hipergeométrica: <code>C(m, k) / C(N, k)</code>.</p>
        `
      }
    ]
  },
  {
    id: "unidad4",
    title: "Unidad 4: Variables Aleatorias Discretas",
    icon: "📈",
    summary: "Bernoulli, Binomial, Poisson, Hipergeométrica, Geométrica, Binomial Negativa (Pascal) y Uniforme Discreta.",
    sections: [
      {
        title: "4.1 Definición y Propiedades Generales",
        content: `
          <p>Una variable aleatoria discreta asume un número finito o infinito numerable de valores.</p>
          <ul>
            <li><strong>Función de masa (cuantía):</strong> <code>p(x) = P(X = x) ≥ 0</code> con <code>Σ p(x) = 1</code>.</li>
            <li><strong>Función de distribución acumulada:</strong> <code>F(x) = P(X ≤ x) = Σ_{t ≤ x} p(t)</code>.</li>
            <li><strong>Esperanza Matemática:</strong> <code>E(X) = μ = Σ x · p(x)</code>.</li>
            <li><strong>Varianza:</strong> <code>Var(X) = σ² = E[X²] - (E[X])² = Σ (x - μ)² · p(x)</code>.</li>
          </ul>
        `
      },
      {
        title: "4.2 Distribución Binomial",
        content: `
          <div class="card-inner">
            <span class="badge badge-primary">X ~ B(n, p)</span>
            <p><strong>Descripción:</strong> Cuenta el número de éxitos en n pruebas idénticas e independientes de Bernoulli con probabilidad de éxito constante p (muestreo <em>Con Reemplazo</em>).</p>
            <div class="formula-box highlight">
              <p class="math-expr">P(X = x) = \\binom{n}{x} p^x (1 - p)^{n - x}, \\quad x = 0, 1, ..., n</p>
              <p><strong>Esperanza:</strong> E(X) = n · p</p>
              <p><strong>Varianza:</strong> Var(X) = n · p · (1 - p)</p>
            </div>
          </div>
        `
      },
      {
        title: "4.3 Distribución Binomial Negativa (Pascal)",
        content: `
          <div class="card-inner">
            <span class="badge badge-primary">X ~ BN(r, p)</span>
            <p><strong>Descripción (FI-UNJu):</strong> Número de ensayos independientes necesarios para obtener <strong>r</strong> éxitos.</p>
            <div class="formula-box highlight">
              <p class="math-expr">P(X = x) = \\binom{x - 1}{r - 1} p^r (1 - p)^{x - r}, \\quad x = r, r+1, r+2, ...</p>
              <p><strong>Esperanza:</strong> E(X) = \\frac{r}{p}</p>
              <p><strong>Varianza:</strong> Var(X) = \\frac{r(1 - p)}{p^2}</p>
            </div>
            <p><strong>Caso particular r = 1:</strong> Distribución Geométrica (número de ensayos hasta el 1° éxito):</p>
            <p class="math-expr">P(X = x) = p(1 - p)^{x - 1}, \\quad E(X) = 1/p, \\quad Var(X) = \\frac{1-p}{p^2}</p>
          </div>
        `
      },
      {
        title: "4.4 Distribución Hipergeométrica",
        content: `
          <div class="card-inner">
            <span class="badge badge-primary">X ~ H(N, A, n)</span>
            <p><strong>Descripción:</strong> Número de éxitos en una muestra de tamaño n seleccionada <em>Sin Reemplazo</em> de una población N con A éxitos y N - A fracasos.</p>
            <div class="formula-box highlight">
              <p class="math-expr">P(X = x) = \\frac{\\binom{A}{x} \\binom{N - A}{n - x}}{\\binom{N}{n}}</p>
              <p><strong>Esperanza:</strong> E(X) = n \\cdot \\frac{A}{N}</p>
              <p><strong>Varianza:</strong> Var(X) = n \\cdot \\frac{A}{N} \\left(1 - \\frac{A}{N}\\right) \\left(\\frac{N - n}{N - 1}\\right)</p>
            </div>
          </div>
        `
      },
      {
        title: "4.5 Distribución de Poisson",
        content: `
          <div class="card-inner">
            <span class="badge badge-primary">X ~ Poisson(μ)</span>
            <p><strong>Descripción:</strong> Número de eventos que ocurren en un intervalo de tiempo continuo t o región específica, con tasa media λ eventos por unidad de tiempo. Parámetro <strong>μ = λ · t</strong>.</p>
            <div class="formula-box highlight">
              <p class="math-expr">P(X = x) = \\frac{e^{-\\mu} \\cdot \\mu^x}{x!}, \\quad x = 0, 1, 2, ...</p>
              <p><strong>Esperanza:</strong> E(X) = μ</p>
              <p><strong>Varianza:</strong> Var(X) = μ</p>
            </div>
          </div>
        `
      }
    ]
  },
  {
    id: "unidad5",
    title: "Unidad 5: Variables Aleatorias Continuas",
    icon: "🔔",
    summary: "Uniforme continua, Normal, Exponencial, Erlang, Gamma y Weibull.",
    sections: [
      {
        title: "5.1 Función de Densidad y Distribución Acumulada",
        content: `
          <p>Para una V.A. continua X:</p>
          <ul>
            <li>Función de densidad de probabilidad f(x) ≥ 0, con <code>∫_{-∞}^{∞} f(x)dx = 1</code>.</li>
            <li>Para cualquier punto individual: <code>P(X = c) = 0</code>.</li>
            <li>Probabilidad de intervalo: <code>P(a ≤ X ≤ b) = ∫_a^b f(x)dx = F(b) - F(a)</code>.</li>
            <li>Función de distribución acumulada: <code>F(x) = P(X ≤ x) = ∫_{-∞}^x f(t)dt</code>.</li>
          </ul>
        `
      },
      {
        title: "5.2 Distribución Uniforme Continua (Rectangular)",
        content: `
          <div class="card-inner">
            <span class="badge badge-primary">X ~ U(a, b)</span>
            <div class="formula-box highlight">
              <p class="math-expr">f(x) = \\frac{1}{b - a} \\quad (a \\le x \\le b)</p>
              <p class="math-expr">F(x) = \\frac{x - a}{b - a} \\quad (a \\le x \\le b)</p>
              <p><strong>Media:</strong> E(X) = \\frac{a + b}{2}</p>
              <p><strong>Varianza:</strong> Var(X) = \\frac{(b - a)^2}{12}, \\quad \\sigma = \\sqrt{\\frac{(b - a)^2}{12}}</p>
            </div>
          </div>
        `
      },
      {
        title: "5.3 Distribución Normal (Gaussiana)",
        content: `
          <div class="card-inner">
            <span class="badge badge-primary">X ~ N(μ, σ²)</span>
            <p>Curva simétrica y acampanada centrada en la media μ. El ancho lo determina el desvío estándar σ.</p>
            <div class="formula-box highlight">
              <h4>Estandarización:</h4>
              <p class="math-expr">Z = \\frac{X - \\mu}{\\sigma} \\sim N(0, 1)</p>
              <p class="math-expr">P(X \\le x) = P\\left(Z \\le \\frac{x - \\mu}{\\sigma}\\right) = \\Phi\\left(\\frac{x - \\mu}{\\sigma}\\right)</p>
              <p class="math-expr">P(x_1 \\le X \\le x_2) = \\Phi(z_2) - \\Phi(z_1)</p>
              <p><strong>Simetría:</strong> \\Phi(-z) = 1 - \\Phi(z)</p>
            </div>
            <p><strong>Cálculo Inverso (Percentiles):</strong> Dado una probabilidad p, buscar z tal que Φ(z) = p, luego <code>x = μ + z · σ</code>.</p>
            <p><strong>Proyección en Población N:</strong> El número esperado de individuos que cumplen la condición es <code>E = N · P</code>.</p>
          </div>
        `
      },
      {
        title: "5.4 Distribución Exponencial",
        content: `
          <div class="card-inner">
            <span class="badge badge-primary">X ~ Exp(β)</span>
            <p>Tiempo transcurrido antes de la ocurrencia de un evento. Parámetro β = tiempo medio entre eventos (β = 1/λ).</p>
            <div class="formula-box highlight">
              <p class="math-expr">f(x) = \\frac{1}{\\beta} e^{-x/\\beta} \\quad (x \\ge 0)</p>
              <p class="math-expr">F(x) = P(X \\le x) = 1 - e^{-x/\\beta}</p>
              <p class="math-expr">P(X > x) = e^{-x/\\beta}</p>
              <p><strong>Esperanza:</strong> E(X) = β</p>
              <p><strong>Varianza:</strong> Var(X) = β²</p>
            </div>
          </div>
        `
      },
      {
        title: "5.5 Distribución Gamma y Erlang (Relación con Poisson)",
        content: `
          <div class="card-inner">
            <span class="badge badge-primary">Y ~ Gamma(α, β)</span>
            <p>Tiempo hasta que se presentan α eventos. Para α entero (Erlang r = α):</p>
            <div class="formula-box highlight">
              <p class="math-expr">f(y) = \\frac{1}{\\beta^\\alpha \\Gamma(\\alpha)} y^{\\alpha - 1} e^{-y/\\beta} \\quad (y > 0)</p>
              <p><strong>Esperanza:</strong> E(Y) = α · β</p>
              <p><strong>Varianza:</strong> Var(Y) = α · β²</p>
            </div>
            <h4>Teorema Fundamental Poisson - Gamma (FI-UNJu):</h4>
            <div class="formula-box">
              <p>La probabilidad de que transcurra a lo sumo un tiempo t hasta el r-ésimo evento equivale a que en el intervalo [0, t] ocurran al menos r eventos en un proceso de Poisson con tasa λ = 1/β:</p>
              <p class="math-expr">P(Y \\le t) = P(X \\ge r) = 1 - \\sum_{k=0}^{r-1} \\frac{e^{-\\mu} \\mu^k}{k!} \\quad \\text{con } \\mu = \\frac{t}{\\beta}</p>
            </div>
          </div>
        `
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TheoryData;
}
