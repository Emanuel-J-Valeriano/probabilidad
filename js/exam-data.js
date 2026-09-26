/**
 * Complete Database of Parciales FI-UNJu from PDF
 */
const ExamData = [
  {
    id: "parcial-1",
    title: "Parcial 1 - Tema 1 (Presencial / Virtual)",
    subtitle: "Comisiones Ciberseguridad, Farmacias NOA, Examen Diciembre, Heladería Poisson-Gamma y Capacitación CEP",
    exercises: [
      {
        num: 1,
        title: "Ejercicio 1: Tabla de Contingencia - Capacitación en Ciberseguridad",
        statement: `
          <p>La Facultad de Ingeniería desarrolló un programa de capacitación remota en seguridad informática como respuesta a la creciente demanda de profesionales en ciberseguridad. Se inscribieron 180 estudiantes distribuidos en 5 comisiones virtuales. Al finalizar el curso, se registraron los siguientes estados académicos:</p>
          <div class="table-responsive">
            <table class="exam-table">
              <thead>
                <tr>
                  <th>COMISIONES</th>
                  <th>APROBADO</th>
                  <th>REPROBADO</th>
                  <th>DESERCION</th>
                  <th>SIN INTERNET</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>COMISION A</td><td>18</td><td>12</td><td>5</td><td><strong>C?</strong></td><td>37</td></tr>
                <tr><td>COMISION B</td><td>10</td><td>6</td><td>3</td><td>1</td><td>20</td></tr>
                <tr><td>COMISION C</td><td><strong>A?</strong></td><td>8</td><td>4</td><td>1</td><td>27</td></tr>
                <tr><td>COMISION D</td><td>22</td><td><strong>B?</strong></td><td>5</td><td>3</td><td>40</td></tr>
                <tr><td>COMISION E</td><td>25</td><td>18</td><td>7</td><td>6</td><td>56</td></tr>
                <tr class="table-total"><td>TOTAL</td><td>89</td><td>54</td><td><strong>D?</strong></td><td>13</td><td>180</td></tr>
              </tbody>
            </table>
          </div>
          <p class="mt-2"><strong>Consignas a responder:</strong></p>
          <ul>
            <li><strong>a.</strong> ¿Cuál es el ESTADO modal para los estudiantes de COMISION A?</li>
            <li><strong>b.</strong> ¿Cuál es la cantidad promedio de alumnos considerando todas las comisiones?</li>
            <li><strong>c.</strong> Grafique los ESTADOS de los alumnos en COMISION B utilizando valores relativos.</li>
            <li><strong>d.</strong> ¿Cuál es la probabilidad de que no tenga INTERNET?</li>
            <li><strong>e.</strong> ¿Cuál es la probabilidad de que asista a COMISION D o COMISION E?</li>
            <li><strong>f.</strong> ¿Cuál es la probabilidad de que esté APROBADO o asista a COMISION C?</li>
            <li><strong>g.</strong> ¿Cuál es la probabilidad de que esté APROBADO y asista a COMISION D?</li>
            <li><strong>h.</strong> ¿Cuál es la probabilidad de que asista a COMISION C dado que DESERTO?</li>
            <li><strong>i.</strong> Demuestre si los sucesos COMISION D y APROBADO son independientes.</li>
            <li><strong>j.</strong> Si se seleccionan al azar, sin reposición, 3 estudiantes ¿Cuál es la probabilidad de que los tres estén APROBADOS?</li>
            <li><strong>k.</strong> Complete la tabla con los valores faltantes: A, B, C y D.</li>
          </ul>
        `,
        solverTarget: "contingency",
        preset: {
          rows: ["COMISION A", "COMISION B", "COMISION C", "COMISION D", "COMISION E"],
          cols: ["APROBADO", "REPROBADO", "DESERCION", "SIN INTERNET"],
          rowTotals: [37, 20, 27, 40, 56],
          colTotals: [89, 54, null, 13],
          grandTotal: 180,
          matrix: [
            [18, 12, 5, "C"],
            [10, 6, 3, 1],
            ["A", 8, 4, 1],
            [22, "B", 5, 3],
            [25, 18, 7, 6]
          ]
        },
        solution: `
          <div class="solution-block">
            <h4>Paso 1: Resolución de Incógnitas (Inciso k)</h4>
            <ul>
              <li><strong>Incógnita C (Fila Comisión A):</strong> C = Total A - (18 + 12 + 5) = 37 - 35 = <strong>2</strong></li>
              <li><strong>Incógnita A (Fila Comisión C):</strong> A = Total C - (8 + 4 + 1) = 27 - 13 = <strong>14</strong></li>
              <li><strong>Incógnita B (Fila Comisión D):</strong> B = Total D - (22 + 5 + 3) = 40 - 30 = <strong>10</strong></li>
              <li><strong>Incógnita D (Total Deserción):</strong> D = 5 + 3 + 4 + 5 + 7 = <strong>24</strong> (o 180 - 89 - 54 - 13 = 24)</li>
            </ul>
            <p><strong>Valores:</strong> A = 14, B = 10, C = 2, D = 24.</p>

            <h4>Respuestas detalladas:</h4>
            <div class="result-card">
              <p><strong>a. Estado modal Comisión A:</strong> El estado con mayor frecuencia en la Comisión A es <strong>APROBADO</strong> (frecuencia = 18 alumnos).</p>
              <p><strong>b. Cantidad promedio de alumnos por comisión:</strong> Promedio = N / 5 = 180 / 5 = <strong>36 alumnos por comisión</strong>.</p>
              <p><strong>c. Estados en Comisión B (Valores relativos, Total = 20):</strong></p>
              <ul>
                <li>Aprobado: 10 / 20 = <strong>50.0%</strong> (0.50)</li>
                <li>Reprobado: 6 / 20 = <strong>30.0%</strong> (0.30)</li>
                <li>Deserción: 3 / 20 = <strong>15.0%</strong> (0.15)</li>
                <li>Sin Internet: 1 / 20 = <strong>5.0%</strong> (0.05)</li>
              </ul>
              <p><strong>d. P(Sin Internet):</strong> P(Sin Internet) = 13 / 180 = <strong>0.0722 (7.22%)</strong>.</p>
              <p><strong>e. P(Comisión D ∪ Comisión E):</strong> Sucesos mutuamente excluyentes:</p>
              <p class="math-expr">P(D ∪ E) = P(D) + P(E) = \\frac{40 + 56}{180} = \\frac{96}{180} = \\frac{8}{15} = 0.5333 \\quad (53.33%)</p>
              <p><strong>f. P(Aprobado ∪ Comisión C):</strong> Regla de la adición general:</p>
              <p class="math-expr">P(Ap ∪ C) = P(Ap) + P(C) - P(Ap ∩ C) = \\frac{89}{180} + \\frac{27}{180} - \\frac{14}{180} = \\frac{102}{180} = 0.5667 \\quad (56.67%)</p>
              <p><strong>g. P(Aprobado ∩ Comisión D):</strong> Probabilidad conjunta:</p>
              <p class="math-expr">P(Ap ∩ D) = \\frac{22}{180} = 0.1222 \\quad (12.22%)</p>
              <p><strong>h. P(Comisión C | Deserción):</strong> Probabilidad condicional:</p>
              <p class="math-expr">P(C | Des) = \\frac{P(C ∩ Des)}{P(Des)} = \\frac{4}{24} = \\frac{1}{6} = 0.1667 \\quad (16.67%)</p>
              <p><strong>i. Demostración de Independencia (Comisión D y Aprobado):</strong></p>
              <p>Probabilidad conjunta observada: <code>P(D ∩ Ap) = 22 / 180 = 0.1222</code></p>
              <p>Producto de marginales: <code>P(D) × P(Ap) = (40 / 180) × (89 / 180) = 0.2222 × 0.4944 = 0.1099</code></p>
              <p>Como <strong>0.1222 ≠ 0.1099</strong>, los sucesos <strong>NO SON INDEPENDIENTES</strong> (son dependientes).</p>
              <p><strong>j. 3 estudiantes aprobados sin reposición:</strong></p>
              <p class="math-expr">P = \\frac{89}{180} \\cdot \\frac{88}{179} \\cdot \\frac{87}{178} = \\frac{681384}{5735160} = 0.1188 \\quad (11.88%)</p>
            </div>
          </div>
        `
      },
      {
        num: 2,
        title: "Ejercicio 2: Probabilidad Total y Bayes - Farmacias del NOA",
        statement: `
          <p>La Asociación Regional de Farmacias del NOA desea analizar el funcionamiento de la nueva red de venta de medicamentos, tomando en cuenta su principal clasificación: <strong>Ambulatorio 40%</strong>, <strong>Magistrales 35%</strong> y <strong>Alto Costo 25%</strong>.</p>
          <p>Si una persona que desea adquirir una determinada medicación cuenta con una receta bien confeccionada por su médico, tiene probabilidades de <strong>98%, 99% y 95%</strong>, respectivamente, de adquirir la medicación sin inconveniente.</p>
          <ul>
            <li><strong>a.</strong> Represente adecuadamente los datos brindados (diagrama en árbol).</li>
            <li><strong>b.</strong> ¿Cuál es la probabilidad de que una persona adquiera la medicación sin inconvenientes?</li>
            <li><strong>c.</strong> Si una persona adquiere la medicación sin inconveniente, ¿cuál es la probabilidad de que el medicamento adquirido sea de Alto Costo?</li>
            <li><strong>d.</strong> Si una persona tiene inconvenientes para adquirir la medicación indicada por su médico, ¿cuál es la probabilidad de que haya intentado adquirir un medicamento Ambulatorio?</li>
          </ul>
        `,
        solverTarget: "bayes",
        preset: {
          causes: [
            { name: "Ambulatorio (A1)", prior: 0.40, likelihood: 0.98 },
            { name: "Magistrales (A2)", prior: 0.35, likelihood: 0.99 },
            { name: "Alto Costo (A3)", prior: 0.25, likelihood: 0.95 }
          ],
          eventSuccessName: "Sin Inconveniente (S)",
          eventFailureName: "Con Inconveniente (I)"
        },
        solution: `
          <div class="solution-block">
            <h4>a. Datos y Árbol de Probabilidad:</h4>
            <ul>
              <li>Partición del espacio muestral: P(A₁) = 0.40, P(A₂) = 0.35, P(A₃) = 0.25 (Σ = 1.00).</li>
              <li>Probabilidades condicionales de éxito S: P(S|A₁) = 0.98, P(S|A₂) = 0.99, P(S|A₃) = 0.95.</li>
              <li>Probabilidades de inconveniente I = Sᶜ: P(I|A₁) = 0.02, P(I|A₂) = 0.01, P(I|A₃) = 0.05.</li>
            </ul>

            <h4>b. Probabilidad Total de adquirir sin inconvenientes P(S):</h4>
            <div class="formula-box highlight">
              <p class="math-expr">P(S) = P(A₁)P(S|A₁) + P(A₂)P(S|A₂) + P(A₃)P(S|A₃)</p>
              <p class="math-expr">P(S) = (0.40 \\cdot 0.98) + (0.35 \\cdot 0.99) + (0.25 \\cdot 0.95)</p>
              <p class="math-expr">P(S) = 0.3920 + 0.3465 + 0.2375 = 0.9760 \\quad (97.60%)</p>
            </div>

            <h4>c. Teorema de Bayes - P(Alto Costo A₃ | Sin Inconveniente S):</h4>
            <div class="formula-box highlight">
              <p class="math-expr">P(A₃ | S) = \\frac{P(A₃) \\cdot P(S | A₃)}{P(S)} = \\frac{0.25 \\cdot 0.95}{0.9760} = \\frac{0.2375}{0.9760} = 0.2433 \\quad (24.33%)</p>
            </div>

            <h4>d. Teorema de Bayes - P(Ambulatorio A₁ | Con Inconveniente I):</h4>
            <p>Probabilidad de inconveniente: P(I) = 1 - P(S) = 1 - 0.9760 = <strong>0.0240</strong>.</p>
            <div class="formula-box highlight">
              <p class="math-expr">P(A₁ | I) = \\frac{P(A₁) \\cdot P(I | A₁)}{P(I)} = \\frac{0.40 \\cdot 0.02}{0.0240} = \\frac{0.0080}{0.0240} = \\frac{1}{3} = 0.3333 \\quad (33.33%)</p>
            </div>
          </div>
        `
      },
      {
        num: 3,
        title: "Ejercicio 3: Distribución Binomial y Binomial Negativa - Examen Final Diciembre",
        statement: `
          <p>Según un estudio, el <strong>80%</strong> de los alumnos que cursan la materia Probabilidad y Estadística cada año, rinden el examen final en el turno de exámenes de diciembre de ese mismo año.</p>
          <ul>
            <li><strong>a.</strong> Si se entrevista a un alumno al azar que se presenta a rendir la materia en el turno de diciembre, ¿cuál es la probabilidad de que el <strong>sexto alumno</strong> entrevistado sea el <strong>cuarto</strong> que cursó la materia ese mismo año?</li>
            <li><strong>b.</strong> Si se seleccionan <strong>10 alumnos</strong> al azar que se presentan a rendir en diciembre, ¿qué es más probable: que exactamente <strong>8 alumnos</strong> hayan cursado la materia ese mismo año o que lo hayan hecho <strong>6 o más</strong> alumnos?</li>
          </ul>
        `,
        solverTarget: "discrete",
        preset: {
          type: "negativeBinomialAndBinomial",
          r: 4,
          x: 6,
          p: 0.8,
          n: 10
        },
        solution: `
          <div class="solution-block">
            <h4>Inciso a: Distribución Binomial Negativa (Pascal)</h4>
            <p>Se define X: número de alumnos entrevistados hasta encontrar el 4° que cursó ese año (r = 4 éxitos, éxito = cursó este año con p = 0.80).</p>
            <div class="formula-box highlight">
              <p class="math-expr">P(X = x) = \\binom{x - 1}{r - 1} p^r (1 - p)^{x - r}</p>
              <p>Para x = 6, r = 4, p = 0.80:</p>
              <p class="math-expr">P(X = 6) = \\binom{6 - 1}{4 - 1} (0.80)^4 (0.20)^{6 - 4} = \\binom{5}{3} (0.80)^4 (0.20)^2</p>
              <p class="math-expr">\\binom{5}{3} = \\frac{5 \\cdot 4 \\cdot 3}{3 \\cdot 2 \\cdot 1} = 10</p>
              <p class="math-expr">P(X = 6) = 10 \\cdot 0.4096 \\cdot 0.04 = 0.16384 \\quad (16.38%)</p>
            </div>

            <h4>Inciso b: Distribución Binomial (n = 10, p = 0.80)</h4>
            <p>Se define Y: número de alumnos que cursaron ese año en la muestra de n = 10. Y ~ B(10, 0.80).</p>
            <div class="formula-box">
              <p><strong>1. Probabilidad de exactamente 8 alumnos:</strong></p>
              <p class="math-expr">P(Y = 8) = \\binom{10}{8} (0.80)^8 (0.20)^2 = 45 \\cdot 0.167772 \\cdot 0.04 = 0.30199 \\quad (30.20%)</p>
              <p><strong>2. Probabilidad de 6 o más alumnos P(Y ≥ 6):</strong></p>
              <ul>
                <li>P(Y = 6) = C(10, 6)(0.8)⁶(0.2)⁴ = 210 × 0.262144 × 0.0016 = <strong>0.08808</strong></li>
                <li>P(Y = 7) = C(10, 7)(0.8)⁷(0.2)³ = 120 × 0.209715 × 0.0080 = <strong>0.20133</strong></li>
                <li>P(Y = 8) = <strong>0.30199</strong></li>
                <li>P(Y = 9) = C(10, 9)(0.8)⁹(0.2)¹ = 10 × 0.134218 × 0.20 = <strong>0.26844</strong></li>
                <li>P(Y = 10) = (0.8)¹⁰ = <strong>0.10737</strong></li>
              </ul>
              <p class="math-expr">P(Y \\ge 6) = 0.08808 + 0.20133 + 0.30199 + 0.26844 + 0.10737 = 0.9672 \\quad (96.72%)</p>
            </div>
            <p class="alert-box"><strong>Conclusión:</strong> Es <strong>mucho más probable que lo hagan 6 o más alumnos (96.72%)</strong> frente a que lo hagan exactamente 8 alumnos (30.20%).</p>
          </div>
        `
      },
      {
        num: 4,
        title: "Ejercicio 4: Poisson y Distribución Gamma - Heladería",
        statement: `
          <p>Una reconocida heladería ubicada en un shopping, en temporada estival, recibe en promedio <strong>5 clientes por minuto</strong>.</p>
          <ul>
            <li><strong>a.</strong> Determine la distribución de la variable X y sus parámetros.</li>
            <li><strong>b.</strong> ¿Cuál es la probabilidad de que en un minuto determinado lleguen <strong>7 clientes</strong>?</li>
            <li><strong>c.</strong> ¿Cuál es la probabilidad de que en <strong>30 segundos</strong> lleguen entre <strong>3 y 7 clientes</strong>?</li>
          </ul>
          <p>Defina una nueva variable Y que responde a una <strong>distribución Gamma</strong> y determine sus parámetros expresados en segundos. Luego:</p>
          <ul>
            <li><strong>d.</strong> Calcule la probabilidad de que <strong>2 clientes</strong> tarden hasta <strong>30 segundos</strong> en llegar a la heladería.</li>
            <li><strong>e.</strong> Calcule la probabilidad de que <strong>2 clientes</strong> tarden de <strong>30 a 48 segundos</strong> en llegar a la heladería.</li>
          </ul>
        `,
        solverTarget: "poissonGamma",
        preset: {
          ratePerMin: 5,
          targetK: 7,
          gammaAlpha: 2,
          gammaBetaSec: 12
        },
        solution: `
          <div class="solution-block">
            <h4>Inciso a: Distribución de X</h4>
            <p>X = número de clientes que llegan por minuto. <strong>X ~ Poisson(λ = 5 clientes/minuto)</strong>. E(X) = 5, Var(X) = 5.</p>

            <h4>Inciso b: P(X = 7) en un minuto</h4>
            <div class="formula-box highlight">
              <p class="math-expr">P(X = 7) = \\frac{e^{-5} \\cdot 5^7}{7!} = \\frac{0.0067379 \\cdot 78125}{5040} = 0.1044 \\quad (10.44%)</p>
            </div>

            <h4>Inciso c: En 30 segundos (t = 0.5 min ⟹ μ = 5 × 0.5 = 2.5 clientes)</h4>
            <div class="formula-box highlight">
              <p class="math-expr">P(3 \\le X \\le 7) = \\sum_{k=3}^7 \\frac{e^{-2.5} \\cdot 2.5^k}{k!} = P(3) + P(4) + P(5) + P(6) + P(7)</p>
              <p>= 0.2138 + 0.1336 + 0.0668 + 0.0278 + 0.0099 = 0.4520 \\quad (45.20%)</p>
            </div>

            <h4>Definición de Variable Gamma Y:</h4>
            <p>Y: tiempo en segundos que transcurre hasta la llegada de <strong>α = 2 clientes</strong>.</p>
            <p>Tasa por segundo: λ = 5 clientes / 60 seg = 1/12 clientes/segundo.</p>
            <p>Parámetro de escala β (tiempo medio entre clientes): <strong>β = 1/λ = 12 segundos</strong>.</p>
            <p><strong>Y ~ Gamma(α = 2, β = 12 seg)</strong>.</p>

            <h4>Inciso d: P(Y ≤ 30 segundos)</h4>
            <p>Por la relación fundamental Poisson-Gamma (teorema de la cátedra): <code>P(Y ≤ t) = P(N_t ≥ α)</code> con N_t ~ Poisson(μ = t / β = 30 / 12 = 2.5):</p>
            <div class="formula-box highlight">
              <p class="math-expr">P(Y \\le 30) = 1 - P(N_{30} = 0) - P(N_{30} = 1) = 1 - e^{-2.5}(1 + 2.5) = 1 - 3.5 \\cdot 0.082085 = 0.7127 \\quad (71.27%)</p>
            </div>

            <h4>Inciso e: P(30 ≤ Y ≤ 48 segundos)</h4>
            <p>Calculamos primero P(Y ≤ 48 seg). Para t = 48, μ = 48 / 12 = 4.0:</p>
            <p class="math-expr">P(Y \\le 48) = 1 - e^{-4}(1 + 4) = 1 - 5 \\cdot 0.018316 = 1 - 0.09158 = 0.9084</p>
            <div class="formula-box highlight">
              <p class="math-expr">P(30 \\le Y \\le 48) = P(Y \\le 48) - P(Y \\le 30) = 0.9084 - 0.7127 = 0.1957 \\quad (19.57%)</p>
            </div>
          </div>
        `
      },
      {
        num: 5,
        title: "Ejercicio 5: Distribución Normal - Capacitación de Operarios (CEP)",
        statement: `
          <p>Una planta industrial capacita anualmente a los nuevos operarios en control estadístico de procesos (CEP). El Área de Recursos Humanos sabe que el tiempo medio estimado del curso es de <strong>8.2 hs</strong> con una desviación estándar de <strong>1.1 hs</strong>. (Distribución Normal).</p>
          <ul>
            <li><strong>a.</strong> Determine la probabilidad de que el curso de capacitación de este año se extienda entre <strong>7 y 10 hs</strong>.</li>
            <li><strong>b.</strong> El Área de Recursos Humanos considera que si la probabilidad del inciso a) es <strong>mayor al 75%</strong> debería contratar un servicio extra para el cierre del evento. Según los cálculos efectuados ¿qué recomendación le daría?</li>
            <li><strong>c.</strong> La planta industrial tiene planificado realizar <strong>20 encuentros de capacitación</strong> en el año en curso. ¿Cuántos encuentros de capacitación esperaría que duren entre 7 y 10 horas?</li>
          </ul>
        `,
        solverTarget: "normal",
        preset: {
          mu: 8.2,
          sigma: 1.1,
          x1: 7,
          x2: 10,
          sampleN: 20
        },
        solution: `
          <div class="solution-block">
            <h4>Inciso a: P(7 ≤ X ≤ 10 hs)</h4>
            <p>Variable X ~ N(μ = 8.2, σ = 1.1). Estandarizamos los valores a Z:</p>
            <div class="formula-box highlight">
              <p class="math-expr">z_1 = \\frac{7 - 8.2}{1.1} = \\frac{-1.2}{1.1} = -1.09</p>
              <p class="math-expr">z_2 = \\frac{10 - 8.2}{1.1} = \\frac{1.8}{1.1} = 1.64</p>
              <p class="math-expr">P(7 \\le X \\le 10) = P(-1.09 \\le Z \\le 1.64) = \\Phi(1.64) - \\Phi(-1.09)</p>
              <p>De tabla normal estándar:</p>
              <p class="math-expr">\\Phi(1.64) = 0.9495</p>
              <p class="math-expr">\\Phi(-1.09) = 1 - \\Phi(1.09) = 1 - 0.8621 = 0.1379</p>
              <p class="math-expr">P(7 \\le X \\le 10) = 0.9495 - 0.1379 = 0.8116 \\quad (81.16%)</p>
            </div>

            <h4>Inciso b: Recomendación a Recursos Humanos</h4>
            <div class="alert-box">
              <p>Dado que la probabilidad obtenida es <strong>81.16%</strong>, la cual es <strong>superior al umbral del 75%</strong> exigido (0.8116 > 0.75), <strong>SE RECOMIENDA CONTRATAR el servicio extra</strong> para el cierre del evento.</p>
            </div>

            <h4>Inciso c: Encuentros esperados para n = 20</h4>
            <p>Sea Y: número de encuentros que duran entre 7 y 10 hs en n = 20 capacitaciones. Y ~ B(n = 20, p = 0.8116).</p>
            <div class="formula-box highlight">
              <p class="math-expr">E[Y] = n \\cdot p = 20 \\cdot 0.8116 = 16.232 \\approx 16 \\text{ encuentros}</p>
            </div>
          </div>
        `
      }
    ]
  },
  {
    id: "parcial-2",
    title: "Parcial 2 - Tema 2 (Variante con Distribución Uniforme)",
    subtitle: "Encuesta Alumnos, Circo Mágico, Lead Time Distribución Uniforme Continua",
    exercises: [
      {
        num: 1,
        title: "Ejercicio 1: Tabla de Contingencia - Encuesta 'Nos Conocemos'",
        statement: `
          <p>La encuesta NOS CONOCEMOS aplicada a 144 alumnos inscriptos indaga sobre la valoración de la cursada anterior y preferencias de trabajo en grupo:</p>
          <div class="table-responsive">
            <table class="exam-table">
              <thead>
                <tr>
                  <th>PREFERENCIAS</th>
                  <th>REGULAR</th>
                  <th>BUENA</th>
                  <th>MUY BUENA</th>
                  <th>NO CURSO</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>COMPAÑEROS ESTUDIOSOS</td><td>15</td><td>32</td><td>13</td><td><strong>C?</strong></td><td>60</td></tr>
                <tr><td>AMIGOS</td><td>16</td><td>20</td><td>5</td><td>0</td><td>41</td></tr>
                <tr><td>DESCONOCIDOS</td><td><strong>A?</strong></td><td>5</td><td>4</td><td>0</td><td>19</td></tr>
                <tr><td>TRABAJAR SOLO</td><td>11</td><td><strong>B?</strong></td><td>4</td><td>1</td><td>24</td></tr>
                <tr class="table-total"><td>TOTAL</td><td>52</td><td>65</td><td><strong>D?</strong></td><td>1</td><td>144</td></tr>
              </tbody>
            </table>
          </div>
        `,
        solverTarget: "contingency",
        preset: {
          rows: ["COMPAÑEROS", "AMIGOS", "DESCONOCIDOS", "TRABAJAR SOLO"],
          cols: ["REGULAR", "BUENA", "MUY BUENA", "NO CURSO"],
          rowTotals: [60, 41, 19, 24],
          colTotals: [52, 65, null, 1],
          grandTotal: 144,
          matrix: [
            [15, 32, 13, "C"],
            [16, 20, 5, 0],
            ["A", 5, 4, 0],
            [11, "B", 4, 1]
          ]
        },
        solution: `
          <div class="solution-block">
            <h4>Valores de Incógnitas:</h4>
            <ul>
              <li><strong>C:</strong> 60 - (15 + 32 + 13) = <strong>0</strong></li>
              <li><strong>A:</strong> 19 - (5 + 4 + 0) = <strong>10</strong></li>
              <li><strong>B:</strong> 24 - (11 + 4 + 1) = <strong>8</strong></li>
              <li><strong>D:</strong> 13 + 5 + 4 + 4 = <strong>26</strong></li>
            </ul>
            <p><strong>Moda preferencia:</strong> Compañeros estudiosos (60). <strong>Moda valoración en amigos:</strong> Buena (20).</p>
            <p><strong>P(Desconocidos o Solo):</strong> (19 + 24)/144 = 43/144 = <strong>0.2986 (29.86%)</strong>.</p>
            <p><strong>P(Solo o Buena):</strong> (24 + 65 - 8)/144 = 81/144 = <strong>0.5625 (56.25%)</strong>.</p>
            <p><strong>P(Compañeros | Buena):</strong> 32/65 = <strong>0.4923 (49.23%)</strong>.</p>
            <p><strong>Independencia Desconocidos y No Curso:</strong> P(Des ∩ No) = 0. P(Des)P(No) = (19/144)(1/144) ≠ 0. Son <strong>DEPENDIENTES</strong>.</p>
          </div>
        `
      },
      {
        num: 6,
        title: "Ejercicio 6: Distribución Uniforme Continua - Lead Time de Repuesto",
        statement: `
          <p>El tiempo de reposición (lead time) de un repuesto crítico para la planta manufacturera se distribuye uniformemente entre <strong>4 y 10 días</strong>: X ~ U(4, 10).</p>
          <ul>
            <li><strong>a.</strong> Calcule la media y la desviación estándar del tiempo de reposición.</li>
            <li><strong>b.</strong> ¿Cuál es la probabilidad de que el tiempo de reposición sea mayor o igual a <strong>8 días</strong>?</li>
            <li><strong>c.</strong> ¿Cuál es la probabilidad de que el tiempo de reposición sea menor o igual a <strong>6 días</strong>?</li>
            <li><strong>d.</strong> ¿Qué es más probable: que el tiempo de reposición sea mayor a 8 días o inferior a 6 días?</li>
          </ul>
        `,
        solverTarget: "uniformContinuous",
        preset: {
          a: 4,
          b: 10,
          xGeq: 8,
          xLeq: 6
        },
        solution: `
          <div class="solution-block">
            <h4>Inciso a: Media y Desviación Estándar</h4>
            <div class="formula-box highlight">
              <p class="math-expr">\\mu = E[X] = \\frac{a + b}{2} = \\frac{4 + 10}{2} = 7.0 \\text{ días}</p>
              <p class="math-expr">\\sigma^2 = \\text{Var}(X) = \\frac{(b - a)^2}{12} = \\frac{(10 - 4)^2}{12} = \\frac{36}{12} = 3.0 \\text{ días}^2</p>
              <p class="math-expr">\\sigma = \\sqrt{3} \\approx 1.732 \\text{ días}</p>
            </div>

            <h4>Inciso b: P(X ≥ 8 días)</h4>
            <div class="formula-box highlight">
              <p class="math-expr">P(X \\ge 8) = \\frac{10 - 8}{10 - 4} = \\frac{2}{6} = \\frac{1}{3} = 0.3333 \\quad (33.33%)</p>
            </div>

            <h4>Inciso c: P(X ≤ 6 días)</h4>
            <div class="formula-box highlight">
              <p class="math-expr">P(X \\le 6) = \\frac{6 - 4}{10 - 4} = \\frac{2}{6} = \\frac{1}{3} = 0.3333 \\quad (33.33%)</p>
            </div>

            <h4>Inciso d: Comparación</h4>
            <div class="alert-box">
              <p>Ambas probabilidades son exactamente iguales: <strong>P(X ≥ 8) = P(X ≤ 6) = 1/3 (33.33%)</strong>. Por lo tanto, <strong>ambos sucesos son igualmente probables</strong>, lo cual se debe a la simetría de la distribución uniforme alrededor de su media μ = 7 días (la distancia |8 - 7| = 1 es igual a |6 - 7| = 1).</p>
            </div>
          </div>
        `
      }
    ]
  },
  {
    id: "parcial-3",
    title: "Parcial 3 (Página 5 PDF)",
    subtitle: "Trabajadores, Hipergeométrica Peces Surubíes, Poisson Accidentes y Normal Glucosa",
    exercises: [
      {
        num: 3,
        title: "Ejercicio 3: Distribución Hipergeométrica - Criadero de Peces Surubíes",
        statement: `
          <p>En un criadero hay <strong>47 peces</strong>, <strong>23</strong> de los cuales son surubíes. Un pescador captura <strong>7 peces</strong> al azar sin reemplazo.</p>
          <ul>
            <li><strong>a.</strong> Calcular la probabilidad de que se capturen exactamente <strong>2 surubíes</strong> de los 7 capturados.</li>
            <li><strong>b.</strong> Calcular la probabilidad de que por lo menos se capturen <strong>2 surubíes</strong>.</li>
            <li><strong>c.</strong> ¿Cuál es el número esperado de surubíes que pueden ser capturados?</li>
          </ul>
        `,
        solverTarget: "hypergeometric",
        preset: {
          N: 47,
          A: 23,
          n: 7,
          k: 2
        },
        solution: `
          <div class="solution-block">
            <h4>Modelo: Hipergeométrica X ~ H(N = 47, A = 23, n = 7)</h4>
            <div class="formula-box highlight">
              <p class="math-expr">P(X = x) = \\frac{\\binom{23}{x} \\binom{24}{7 - x}}{\\binom{47}{7}}</p>
              <p>Casos totales posibles: <code>C(47, 7) = 62,891,499</code></p>
            </div>

            <h4>Inciso a: P(X = 2)</h4>
            <p class="math-expr">P(X = 2) = \\frac{\\binom{23}{2} \\binom{24}{5}}{\\binom{47}{7}} = \\frac{253 \\cdot 42504}{62891499} = \\frac{10753512}{62891499} = 0.1710 \\quad (17.10%)</p>

            <h4>Inciso b: P(X ≥ 2)</h4>
            <p>Por suceso contrario: <code>P(X ≥ 2) = 1 - P(X = 0) - P(X = 1)</code></p>
            <p>P(X = 0) = C(24, 7)/C(47, 7) = 346104 / 62891499 = 0.0055</p>
            <p>P(X = 1) = [C(23, 1) × C(24, 6)] / C(47, 7) = [23 × 134596] / 62891499 = 0.0492</p>
            <div class="formula-box highlight">
              <p class="math-expr">P(X \\ge 2) = 1 - (0.0055 + 0.0492) = 0.9453 \\quad (94.53%)</p>
            </div>

            <h4>Inciso c: Número esperado de surubíes</h4>
            <div class="formula-box highlight">
              <p class="math-expr">E[X] = n \\cdot \\frac{A}{N} = 7 \\cdot \\frac{23}{47} = \\frac{161}{47} = 3.4255 \\approx 3.43 \\text{ surubíes}</p>
            </div>
          </div>
        `
      },
      {
        num: 5,
        title: "Ejercicio 5: Normal con Percentiles - Glucosa en Ayunas",
        statement: `
          <p>Nivel de glucosa en sangre en ayunas en diabéticos: distribución Normal con media <strong>1.06 mg/ml</strong> y desviación estándar <strong>0.08 mg/ml</strong>.</p>
          <ul>
            <li><strong>a.</strong> P(X < 1.20 mg/ml).</li>
            <li><strong>b.</strong> Porcentaje de diabéticos con glucosa entre 0.9 y 1.3 mg/ml.</li>
            <li><strong>c.</strong> Hallar el valor de la variable tal que el <strong>25% de todos los diabéticos</strong> tiene un nivel en ayunas inferior a dicho valor (Percentil 25).</li>
          </ul>
        `,
        solverTarget: "normalPercentile",
        preset: {
          mu: 1.06,
          sigma: 0.08,
          x1: 0.9,
          x2: 1.3,
          singleX: 1.20,
          targetP: 0.25
        },
        solution: `
          <div class="solution-block">
            <h4>Inciso a: P(X < 1.20)</h4>
            <p class="math-expr">z = \\frac{1.20 - 1.06}{0.08} = 1.75 \\implies P(Z < 1.75) = 0.9599 \\quad (95.99%)</p>

            <h4>Inciso b: P(0.9 < X < 1.3)</h4>
            <p class="math-expr">z_1 = \\frac{0.9 - 1.06}{0.08} = -2.00, \\quad z_2 = \\frac{1.3 - 1.06}{0.08} = 3.00</p>
            <p class="math-expr">P = \\Phi(3.00) - \\Phi(-2.00) = 0.99865 - 0.02275 = 0.9759 \\quad (97.59%)</p>

            <h4>Inciso c: Percentil 25 (P(X < x) = 0.25)</h4>
            <p>Buscamos z en la tabla normal tal que Φ(z) = 0.25. Por simetría: Φ(-z) = 0.75 ⟹ <strong>z = -0.674</strong>.</p>
            <div class="formula-box highlight">
              <p class="math-expr">x = \\mu + z \\cdot \\sigma = 1.06 + (-0.6745) \\cdot 0.08 = 1.06 - 0.05396 = 1.006 \\text{ mg/ml}</p>
            </div>
          </div>
        `
      }
    ]
  },
  {
    id: "parcial-4",
    title: "Parcial 4 (Página 6 PDF)",
    subtitle: "Taller Automotriz, Accidentes de Tráfico Bayes, Binomial Examen y Normal Peso Estudiantes",
    exercises: [
      {
        num: 1,
        title: "Ejercicio 1: Tabla de Contingencia - Taller Automotriz (200 autos)",
        statement: `
          <p>Taller atiende 200 autos/mes en turnos (Mañana, Tarde, Noche) y problemas (Eléctricos, Mecánicos, Chapa):</p>
          <div class="table-responsive">
            <table class="exam-table">
              <thead>
                <tr><th>HORARIO</th><th>ELÉCTRICOS</th><th>MECÁNICOS</th><th>CHAPA</th><th>TOTAL</th></tr>
              </thead>
              <tbody>
                <tr><td>Mañana</td><td>55</td><td><strong>A?</strong></td><td>12</td><td>100</td></tr>
                <tr><td>Tarde</td><td><strong>B?</strong></td><td>14</td><td><strong>C?</strong></td><td>70</td></tr>
                <tr><td>Noche</td><td>15</td><td>9</td><td><strong>D?</strong></td><td>30</td></tr>
                <tr class="table-total"><td>Total</td><td>116</td><td><strong>E?</strong></td><td>28</td><td>200</td></tr>
              </tbody>
            </table>
          </div>
        `,
        solverTarget: "contingency",
        preset: {
          rows: ["Mañana", "Tarde", "Noche"],
          cols: ["Eléctricos", "Mecánicos", "Chapa"],
          rowTotals: [100, 70, 30],
          colTotals: [116, null, 28],
          grandTotal: 200,
          matrix: [
            [55, "A", 12],
            ["B", 14, "C"],
            [15, 9, "D"]
          ]
        },
        solution: `
          <div class="solution-block">
            <h4>Cálculo de Incógnitas:</h4>
            <ul>
              <li><strong>A:</strong> 100 - (55 + 12) = <strong>33</strong></li>
              <li><strong>B:</strong> 116 - (55 + 15) = <strong>46</strong></li>
              <li><strong>D:</strong> 30 - (15 + 9) = <strong>6</strong></li>
              <li><strong>C:</strong> 28 - (12 + 6) = <strong>10</strong> (o 70 - 46 - 14 = 10)</li>
              <li><strong>E:</strong> 33 + 14 + 9 = <strong>56</strong></li>
            </ul>
            <p><strong>A = 33, B = 46, C = 10, D = 6, E = 56</strong></p>
          </div>
        `
      },
      {
        num: 2,
        title: "Ejercicio 2: Probabilidad Total y Bayes - Accidentes Fin de Semana",
        statement: `
          <p>65% de accidentes se deben a alcohol, 25% a imprudencia y 10% a fallos mecánicos. El resultado es grave el 30%, 20% y 5% de las veces respectivamente.</p>
          <ul>
            <li><strong>a.</strong> Probabilidad de que un accidente no tenga resultado grave (resultado leve).</li>
            <li><strong>b.</strong> Si se produce un accidente leve, probabilidad de que la causa haya sido ingesta de alcohol.</li>
          </ul>
        `,
        solverTarget: "bayes",
        preset: {
          causes: [
            { name: "Alcohol (A1)", prior: 0.65, likelihood: 0.70 },
            { name: "Imprudencia (A2)", prior: 0.25, likelihood: 0.80 },
            { name: "Fallo Mecánico (A3)", prior: 0.10, likelihood: 0.95 }
          ],
          eventSuccessName: "Leve / No Grave",
          eventFailureName: "Grave"
        },
        solution: `
          <div class="solution-block">
            <h4>Inciso a: P(No Grave / Leve)</h4>
            <p class="math-expr">P(Leve) = (0.65 \\cdot 0.70) + (0.25 \\cdot 0.80) + (0.10 \\cdot 0.95) = 0.455 + 0.200 + 0.095 = 0.750 \\quad (75.0%)</p>

            <h4>Inciso b: Bayes P(Alcohol | Leve)</h4>
            <div class="formula-box highlight">
              <p class="math-expr">P(Alcohol | Leve) = \\frac{0.65 \\cdot 0.70}{0.750} = \\frac{0.455}{0.750} = 0.6067 \\quad (60.67%)</p>
            </div>
          </div>
        `
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExamData;
}
