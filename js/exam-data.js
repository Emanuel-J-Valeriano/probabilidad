/**
 * Database of Solved Parciales 2025 and 2025 v4 (Official UNJu Compendium)
 */
const ExamData2025 = [
  {
    id: "parcial-2025-a",
    title: "Parcial 2025 — Temario Principal",
    subtitle: "Ciberseguridad, Farmacias NOA, Examen Diciembre, Heladería Poisson-Gamma, CEP y Lead Time",
    exercises: [
      {
        num: 1,
        title: "Ejercicio 1: Tabla de Contingencia - Ciberseguridad (180 alumnos)",
        statement: `
          <p>La Facultad de Ingeniería desarrolló un programa de capacitación remota en seguridad informática. Se inscribieron 180 estudiantes distribuidos en 5 comisiones virtuales. Al finalizar, se registraron los siguientes estados académicos:</p>
          <div class="table-responsive">
            <table class="exam-table">
              <thead>
                <tr><th>COMISIONES</th><th>APROBADO</th><th>REPROBADO</th><th>DESERCIÓN</th><th>SIN INTERNET</th><th>TOTAL</th></tr>
              </thead>
              <tbody>
                <tr><td>COMISION A</td><td>18</td><td>12</td><td>5</td><td><strong>C? (2)</strong></td><td>37</td></tr>
                <tr><td>COMISION B</td><td>10</td><td>6</td><td>3</td><td>1</td><td>20</td></tr>
                <tr><td>COMISION C</td><td><strong>A? (14)</strong></td><td>8</td><td>4</td><td>1</td><td>27</td></tr>
                <tr><td>COMISION D</td><td>22</td><td><strong>B? (10)</strong></td><td>5</td><td>3</td><td>40</td></tr>
                <tr><td>COMISION E</td><td>25</td><td>18</td><td>7</td><td>6</td><td>56</td></tr>
                <tr class="table-total"><td>TOTAL</td><td>89</td><td>54</td><td><strong>D? (24)</strong></td><td>13</td><td>180</td></tr>
              </tbody>
            </table>
          </div>
          <p class="mt-1"><strong>Consignas:</strong> a) Estado modal Comisión A. b) Promedio por comisión. c) Gráfico relativo Comisión B. d) P(Sin Internet). e) P(Comisión D o E). f) P(Aprobado o Comisión C). g) P(Aprobado y Comisión D). h) P(Comisión C | Deserción). i) Demuestre si Comisión D y Aprobado son independientes. j) 3 alumnos seleccionados sin reposición: ¿P(los 3 aprobados)? k) Calcule A, B, C y D.</p>
        `,
        distTarget: "contingency",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">k</span> <strong>Valores Faltantes:</strong><br>
            • C = 37 - (18 + 12 + 5) = <strong>2</strong><br>
            • A = 27 - (8 + 4 + 1) = <strong>14</strong><br>
            • B = 40 - (22 + 5 + 3) = <strong>10</strong><br>
            • D = 5 + 3 + 4 + 5 + 7 = <strong>24</strong> (o 180 - 89 - 54 - 13 = 24)</div>

            <div class="sheet-step"><span class="step-num">a</span> <strong>Estado Modal Comisión A:</strong> <strong>APROBADO</strong> (mayor frecuencia = 18).</div>
            <div class="sheet-step"><span class="step-num">b</span> <strong>Promedio de alumnos:</strong> 180 / 5 = <strong>36 alumnos/comisión</strong>.</div>
            <div class="sheet-step"><span class="step-num">c</span> <strong>Valores Relativos Comisión B (Total = 20):</strong> Aprobado: 10/20 = 50%, Reprobado: 6/20 = 30%, Deserción: 3/20 = 15%, Sin Internet: 1/20 = 5%.</div>
            <div class="sheet-step"><span class="step-num">d</span> <strong>P(Sin Internet):</strong> 13 / 180 = <strong>0.0722 (7.22%)</strong>.</div>
            <div class="sheet-step"><span class="step-num">e</span> <strong>P(Comisión D ∪ Comisión E):</strong> Mutuamente excluyentes: (40 + 56)/180 = 96/180 = <strong>0.5333 (53.33%)</strong>.</div>
            <div class="sheet-step"><span class="step-num">f</span> <strong>P(Aprobado ∪ Comisión C):</strong> Regla de la adición: P(Ap) + P(C) - P(Ap ∩ C) = (89 + 27 - 14)/180 = 102/180 = <strong>0.5667 (56.67%)</strong>.</div>
            <div class="sheet-step"><span class="step-num">g</span> <strong>P(Aprobado ∩ Comisión D):</strong> 22 / 180 = <strong>0.1222 (12.22%)</strong>.</div>
            <div class="sheet-step"><span class="step-num">h</span> <strong>P(Comisión C | Deserción):</strong> P(C ∩ Des)/P(Des) = 4 / 24 = <strong>0.1667 (16.67%)</strong>.</div>
            <div class="sheet-step"><span class="step-num">i</span> <strong>Demostración de Independencia:</strong><br>
            P(D ∩ Ap) = 22 / 180 = 0.1222<br>
            P(D) × P(Ap) = (40/180) × (89/180) = 0.1099<br>
            Como 0.1222 ≠ 0.1099, los sucesos <strong>NO SON INDEPENDIENTES</strong>.</div>
            <div class="sheet-step"><span class="step-num">j</span> <strong>3 aprobados sin reposición:</strong><br>
            (89/180) × (88/179) × (87/178) = 681384 / 5735160 = <strong>0.1188 (11.88%)</strong>.</div>
          </div>
        `
      },
      {
        num: 2,
        title: "Ejercicio 2: Probabilidad Total y Bayes - Farmacias del NOA",
        statement: `
          <p>Venta de medicamentos: Ambulatorio (A₁) 40%, Magistrales (A₂) 35%, Alto Costo (A₃) 25%. Probabilidad de adquirir sin inconvenientes (S): 98%, 99% y 95% respectivamente.</p>
          <p><strong>Consignas:</strong> b) P(adquiera sin inconvenientes). c) Si adquiere sin inconveniente, ¿P(sea Alto Costo)? d) Si tiene inconvenientes, ¿P(sea Ambulatorio)?</p>
        `,
        distTarget: "bayes",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">b</span> <strong>Teorema de la Probabilidad Total: P(S)</strong><br>
            P(S) = ∑ P(A_i) · P(S | A_i) = (0.40 × 0.98) + (0.35 × 0.99) + (0.25 × 0.95) = 0.3920 + 0.3465 + 0.2375 = <strong>0.9760 (97.60%)</strong></div>

            <div class="sheet-step"><span class="step-num">c</span> <strong>Teorema de Bayes: P(Alto Costo A₃ | Sin Inconveniente S)</strong><br>
            P(A₃ | S) = [P(A₃) · P(S | A₃)] / P(S) = (0.25 × 0.95) / 0.9760 = 0.2375 / 0.9760 = <strong>0.2433 (24.33%)</strong></div>

            <div class="sheet-step"><span class="step-num">d</span> <strong>Teorema de Bayes: P(Ambulatorio A₁ | Con Inconveniente Sᶜ)</strong><br>
            P(Sᶜ) = 1 - 0.9760 = 0.0240<br>
            P(A₁ | Sᶜ) = [P(A₁) · P(Sᶜ | A₁)] / P(Sᶜ) = (0.40 × 0.02) / 0.0240 = 0.0080 / 0.0240 = 1/3 = <strong>0.3333 (33.33%)</strong></div>
          </div>
        `
      },
      {
        num: 3,
        title: "Ejercicio 3: Binomial Negativa y Binomial - Examen Diciembre",
        statement: `
          <p>El 80% de los alumnos cursó la materia este año (p = 0.80).<br>
          <strong>a)</strong> Si se entrevista alumnos, ¿P(el 6° alumno sea el 4° que cursó ese año)?<br>
          <strong>b)</strong> En una muestra de 10 alumnos, ¿qué es más probable: exactamente 8 alumnos o 6 o más alumnos?</p>
        `,
        distTarget: "negativeBinomial",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">a</span> <strong>Binomial Negativa (Pascal): X ~ BN(r = 4, p = 0.80)</strong><br>
            P(X = 6) = C(6 - 1, 4 - 1) · (0.80)⁴ · (0.20)⁶⁻⁴ = C(5, 3) · (0.80)⁴ · (0.20)²<br>
            P(X = 6) = 10 · 0.4096 · 0.04 = <strong>0.1638 (16.38%)</strong></div>

            <div class="sheet-step"><span class="step-num">b</span> <strong>Binomial: Y ~ B(n = 10, p = 0.80)</strong><br>
            • P(Y = 8) = C(10, 8) · (0.80)⁸ · (0.20)² = 45 × 0.167772 × 0.04 = <strong>0.3020 (30.20%)</strong><br>
            • P(Y ≥ 6) = P(6) + P(7) + P(8) + P(9) + P(10) = 0.0881 + 0.2013 + 0.3020 + 0.2684 + 0.1074 = <strong>0.9672 (96.72%)</strong><br>
            <strong>Conclusión:</strong> Es <em>mucho más probable</em> que aprueben 6 o más alumnos (96.72% frente a 30.20%).</div>
          </div>
        `
      },
      {
        num: 4,
        title: "Ejercicio 4: Poisson y Gamma - Heladería en Shopping",
        statement: `
          <p>Heladería recibe en promedio 5 clientes por minuto (λ = 5).<br>
          <strong>a)</strong> Distribución de X y parámetros. <strong>b)</strong> P(7 clientes en 1 min). <strong>c)</strong> P(entre 3 y 7 clientes en 30 seg).<br>
          Defina Y ~ Gamma en segundos (tasa λ = 1/12 clientes/seg, β = 12 seg).<br>
          <strong>d)</strong> P(2 clientes tarden hasta 30 seg). <strong>e)</strong> P(2 clientes tarden de 30 a 48 seg).</p>
        `,
        distTarget: "poisson",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">a-b</span> <strong>X ~ Poisson(λ = 5 clientes/min)</strong><br>
            P(X = 7) = (e⁻⁵ · 5⁷) / 7! = (0.006738 · 78125) / 5040 = <strong>0.1044 (10.44%)</strong></div>

            <div class="sheet-step"><span class="step-num">c</span> <strong>En 30 seg (t = 0.5 min ⟹ μ = 2.5):</strong><br>
            P(3 ≤ X ≤ 7) = P(3) + P(4) + P(5) + P(6) + P(7) = <strong>0.4520 (45.20%)</strong></div>

            <div class="sheet-step"><span class="step-num">d-e</span> <strong>Distribución Gamma: Y ~ Gamma(α = 2, β = 12 seg)</strong><br>
            Por el Teorema Poisson-Gamma de la cátedra: P(Y ≤ t) = P(N_t ≥ 2) = 1 - P(0) - P(1) con μ = t / 12:<br>
            • Para t = 30 seg (μ = 2.5): P(Y ≤ 30) = 1 - e⁻²·⁵(1 + 2.5) = 1 - 3.5(0.082085) = <strong>0.7127 (71.27%)</strong><br>
            • Para t = 48 seg (μ = 4.0): P(Y ≤ 48) = 1 - e⁻⁴(1 + 4) = 0.9084<br>
            ⟹ P(30 ≤ Y ≤ 48) = P(Y ≤ 48) - P(Y ≤ 30) = 0.9084 - 0.7127 = <strong>0.1957 (19.57%)</strong></div>
          </div>
        `
      },
      {
        num: 5,
        title: "Ejercicio 5: Normal - Capacitación de Operarios (CEP)",
        statement: `
          <p>Tiempo medio del curso μ = 8.2 hs, desvío estándar σ = 1.1 hs (Normal).<br>
          <strong>a)</strong> P(curso dure entre 7 y 10 hs). <strong>b)</strong> Si P > 75%, ¿se recomienda contratar servicio extra? <strong>c)</strong> De 20 encuentros al año, ¿cuántos se espera que duren entre 7 y 10 hs?</p>
        `,
        distTarget: "normal",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">a</span> <strong>X ~ N(μ = 8.2, σ = 1.1). Estandarización a Z:</strong><br>
            z₁ = (7 - 8.2) / 1.1 = -1.09 | z₂ = (10 - 8.2) / 1.1 = 1.64<br>
            P(7 ≤ X ≤ 10) = Φ(1.64) - Φ(-1.09) = 0.9495 - (1 - 0.8621) = 0.9495 - 0.1379 = <strong>0.8116 (81.16%)</strong></div>

            <div class="sheet-step"><span class="step-num">b</span> <strong>Recomendación:</strong> Como 81.16% > 75%, <strong>SE RECOMIENDA contratar el servicio extra</strong>.</div>
            <div class="sheet-step"><span class="step-num">c</span> <strong>Esperados en n = 20:</strong> E = n · P = 20 × 0.8116 = <strong>16.23 ≈ 16 encuentros</strong>.</div>
          </div>
        `
      },
      {
        num: 6,
        title: "Ejercicio 6: Distribución Uniforme Continua - Lead Time de Repuesto",
        statement: `
          <p>Tiempo de reposición distribuido uniformemente entre 4 y 10 días: X ~ U(4, 10).<br>
          <strong>a)</strong> Media y desviación estándar. <strong>b)</strong> P(X ≥ 8). <strong>c)</strong> P(X ≤ 6). <strong>d)</strong> ¿Qué es más probable?</p>
        `,
        distTarget: "uniformContinuous",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">a</span> <strong>Media y Desvío Estándar:</strong><br>
            • μ = (4 + 10)/2 = <strong>7 días</strong><br>
            • Var(X) = (10 - 4)² / 12 = 36 / 12 = 3 ⟹ <strong>σ = √3 ≈ 1.732 días</strong></div>

            <div class="sheet-step"><span class="step-num">b-c</span> <strong>Probabilidades:</strong><br>
            • P(X ≥ 8) = (10 - 8) / (10 - 4) = 2/6 = <strong>0.3333 (33.33%)</strong><br>
            • P(X ≤ 6) = (6 - 4) / (10 - 4) = 2/6 = <strong>0.3333 (33.33%)</strong></div>

            <div class="sheet-step"><span class="step-num">d</span> <strong>Conclusión:</strong> Ambos sucesos son <strong>igualmente probables (33.33%)</strong> por simetría de la distribución uniforme respecto a su media μ = 7 días.</div>
          </div>
        `
      }
    ]
  },
  {
    id: "parcial-2025-v4-b",
    title: "Parcial 2025 V4 — Temario B",
    subtitle: "Trabajadores, Alumnos Temprano (Binomial), Peces Surubíes (Hipergeométrica), Accidentes (Poisson) y Glucosa (Normal)",
    exercises: [
      {
        num: 1,
        title: "Ejercicio 1: Tabla de Trabajadores (1140 personas)",
        statement: `<p>1140 trabajadores clasificados en Manual (800) e Intelectual (340) según rangos de edad. Muestra de 10 trabajadores sin reposición: ¿P(4 manuales y 6 intelectuales)?</p>`,
        distTarget: "hypergeometric",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">1</span> <strong>Hipergeométrica: N = 1140, M = 800 (manual), n = 10, k = 4</strong><br>
            P(X = 4) = [C(800, 4) · C(340, 6)] / C(1140, 10) = <strong>0.0055 (0.55%)</strong></div>
          </div>
        `
      },
      {
        num: 2,
        title: "Ejercicio 2: Alumnos que se Levantan Temprano (Binomial)",
        statement: `<p>El 30% de los alumnos se levanta temprano (p = 0.30). Muestra de n = 16 alumnos.<br>a) Identifique distribución. b) Media y varianza. c) P(X > 8). d) P(6 ≤ X ≤ 10). e) P(X ≤ 3).</p>`,
        distTarget: "binomial",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">a-b</span> <strong>X ~ B(n = 16, p = 0.30)</strong><br>
            • E(X) = 16 × 0.30 = <strong>4.8 alumnos</strong><br>
            • Var(X) = 16 × 0.30 × 0.70 = <strong>3.36</strong> ⟹ σ = 1.833</div>
            <div class="sheet-step"><span class="step-num">c</span> <strong>P(X > 8) = 1 - P(X ≤ 8) = 0.0257 (2.57%)</strong></div>
            <div class="sheet-step"><span class="step-num">d</span> <strong>P(6 ≤ X ≤ 10) = 0.3421 (34.21%)</strong></div>
            <div class="sheet-step"><span class="step-num">e</span> <strong>P(X ≤ 3) = 0.2459 (24.59%)</strong></div>
          </div>
        `
      },
      {
        num: 3,
        title: "Ejercicio 3: Criadero de Peces Surubíes (Hipergeométrica)",
        statement: `<p>N = 47 peces, A = 23 surubíes. Se pescan n = 7 sin reemplazo.<br>a) P(exactamente 2 surubíes). b) P(por lo menos 2 surubíes). c) Número esperado de surubíes.</p>`,
        distTarget: "hypergeometric",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">a</span> <strong>X ~ H(N = 47, A = 23, n = 7):</strong><br>
            P(X = 2) = [C(23, 2) · C(24, 5)] / C(47, 7) = (253 × 42504) / 62891499 = <strong>0.1710 (17.10%)</strong></div>
            <div class="sheet-step"><span class="step-num">b</span> <strong>P(X ≥ 2) = 1 - P(0) - P(1) = 1 - (0.0055 + 0.0492) = 0.9453 (94.53%)</strong></div>
            <div class="sheet-step"><span class="step-num">c</span> <strong>E(X) = n · (A / N) = 7 · (23 / 47) = 3.43 surubíes</strong></div>
          </div>
        `
      },
      {
        num: 4,
        title: "Ejercicio 4: Accidentes Ambientales (Poisson)",
        statement: `<p>Media de 10 accidentes por año (λ = 10).<br>a) P(X = 6 en 1 año). b) P(X < 6 en 1 año). c) En 6 meses (λ' = 5): P(5 ≤ X ≤ 8).</p>`,
        distTarget: "poisson",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">a</span> <strong>X ~ Poisson(λ = 10):</strong> P(X = 6) = (e⁻¹⁰ · 10⁶) / 6! = <strong>0.0631 (6.31%)</strong></div>
            <div class="sheet-step"><span class="step-num">b</span> <strong>P(X < 6) = P(X ≤ 5) = 0.0671 (6.71%)</strong></div>
            <div class="sheet-step"><span class="step-num">c</span> <strong>En 6 meses (λ' = 5):</strong> P(5 ≤ X ≤ 8) = P(X ≤ 8) - P(X ≤ 4) = 0.9319 - 0.4405 = <strong>0.4914 (49.14%)</strong></div>
          </div>
        `
      },
      {
        num: 5,
        title: "Ejercicio 5: Glucosa en Ayunas de Diabéticos (Normal y Percentil 25)",
        statement: `<p>Glucosa en sangre en ayunas X ~ N(μ = 1.06 mg/ml, σ = 0.08 mg/ml).<br>a) P(X < 1.20). b) P(0.9 < X < 1.3). c) Hallar el valor de glucosa tal que el 25% de los diabéticos tiene un nivel inferior (Percentil 25).</p>`,
        distTarget: "normal",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">a</span> <strong>P(X < 1.20):</strong> z = (1.20 - 1.06)/0.08 = 1.75 ⟹ Φ(1.75) = <strong>0.9599 (95.99%)</strong></div>
            <div class="sheet-step"><span class="step-num">b</span> <strong>P(0.90 < X < 1.30):</strong> z₁ = -2.00, z₂ = 3.00 ⟹ Φ(3.00) - Φ(-2.00) = 0.9987 - 0.0228 = <strong>0.9759 (97.59%)</strong></div>
            <div class="sheet-step"><span class="step-num">c</span> <strong>Percentil 25 (P(X < x) = 0.25):</strong><br>
            De tabla normal: z = -0.6745<br>
            x = μ + z · σ = 1.06 + (-0.6745) × 0.08 = <strong>1.0060 mg/ml</strong></div>
          </div>
        `
      }
    ]
  },
  {
    id: "parcial-2025-v4-c",
    title: "Parcial 2025 V4 — Temario C",
    subtitle: "Taller Automotriz (200 autos), Accidentes Bayes, Matemática (Binomial), Medicamento (Poisson) y Peso (Normal)",
    exercises: [
      {
        num: 1,
        title: "Ejercicio 1: Taller Automotriz (200 autos, Tabla)",
        statement: `<p>200 autos atendidos por Mañana, Tarde, Noche vs Eléctricos, Mecánicos, Chapa con incógnitas A, B, C, D, E. a) P(Tarde). b) P(Mecánicos). c) P(Mañana y Mecánicos). d) P(Mecánicos o Chapa). e) ¿Son independientes Tarde y Chapa?</p>`,
        distTarget: "contingency",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">1</span> <strong>Valores Faltantes:</strong> A = 33, B = 46, C = 70, D = 6, E = 56.</div>
            <div class="sheet-step"><span class="step-num">a</span> <strong>P(Tarde) = 70 / 200 = 0.3500 (35.00%)</strong></div>
            <div class="sheet-step"><span class="step-num">b</span> <strong>P(Mecánicos) = 56 / 200 = 0.2800 (28.00%)</strong></div>
            <div class="sheet-step"><span class="step-num">c</span> <strong>P(Mañana ∩ Mecánicos) = 33 / 200 = 0.1650 (16.50%)</strong></div>
            <div class="sheet-step"><span class="step-num">d</span> <strong>P(Mecánicos ∪ Chapa) = (56 + 28)/200 = 84 / 200 = 0.4200 (42.00%)</strong></div>
            <div class="sheet-step"><span class="step-num">e</span> <strong>Independencia Tarde y Chapa:</strong><br>
            P(Tarde) × P(Chapa) = 0.35 × 0.14 = 0.0490 ≠ P(Tarde ∩ Chapa) = 14/200 = 0.0700 ⟹ <strong>NO SON INDEPENDIENTES</strong>.</div>
          </div>
        `
      },
      {
        num: 2,
        title: "Ejercicio 2: Causa y Severidad de Accidentes (Probabilidad Total y Bayes)",
        statement: `<p>Accidentes: Alcohol 65%, Imprudencia 25%, Fallas 10%. Graves: 30%, 20%, 5%.<br>a) P(accidente NO tenga resultado grave). b) Si fue leve, ¿P(la causa sea alcohol)?</p>`,
        distTarget: "bayes",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">a</span> <strong>Probabilidad Total: P(No Grave)</strong><br>
            P(No Grave) = (0.65 × 0.70) + (0.25 × 0.80) + (0.10 × 0.95) = 0.455 + 0.200 + 0.095 = <strong>0.7500 (75.00%)</strong></div>

            <div class="sheet-step"><span class="step-num">b</span> <strong>Bayes: P(Alcohol | No Grave)</strong><br>
            P(Alcohol | No Grave) = (0.65 × 0.70) / 0.7500 = 0.455 / 0.7500 = <strong>0.6067 (60.67%)</strong></div>
          </div>
        `
      },
      {
        num: 3,
        title: "Ejercicio 3: Examen de Matemática (Binomial)",
        statement: `<p>Aprobación p = 0.55, n = 16 alumnos.<br>a) P(exactamente 4). b) P(por lo menos 6). c) P(entre 7 y 10). d) Alumnos esperados E(X).</p>`,
        distTarget: "binomial",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">a</span> <strong>X ~ B(n = 16, p = 0.55):</strong> P(X = 4) = C(16, 4)(0.55)⁴(0.45)¹² = <strong>0.0115 (1.15%)</strong></div>
            <div class="sheet-step"><span class="step-num">b</span> <strong>P(X ≥ 6) = 1 - P(X ≤ 5) = 1 - 0.0486 = 0.9514 (95.14%)</strong></div>
            <div class="sheet-step"><span class="step-num">c</span> <strong>P(7 ≤ X ≤ 10) = 0.6783 (67.83%)</strong></div>
            <div class="sheet-step"><span class="step-num">d</span> <strong>Esperanza E(X) = n · p = 16 × 0.55 = 8.8 alumnos</strong></div>
          </div>
        `
      },
      {
        num: 4,
        title: "Ejercicio 4: Demanda de Medicamento (Poisson)",
        statement: `<p>Promedio de 9 unidades/mes (λ = 9).<br>a) P(a lo sumo 6 en 1 mes). b) P(mínimo 7 en 1 mes). c) P(máximo 12 en 2 meses). d) Esperado en 1 año.</p>`,
        distTarget: "poisson",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">a</span> <strong>P(X ≤ 6) [λ = 9]: 0.2068 (20.68%)</strong></div>
            <div class="sheet-step"><span class="step-num">b</span> <strong>P(X ≥ 7) = 1 - 0.2068 = 0.7932 (79.32%)</strong></div>
            <div class="sheet-step"><span class="step-num">c</span> <strong>En 2 meses (λ' = 18): P(X ≤ 12) = 0.0917 (9.17%)</strong></div>
            <div class="sheet-step"><span class="step-num">d</span> <strong>Esperado en 1 año: E = 9 × 12 = 108 unidades</strong></div>
          </div>
        `
      },
      {
        num: 5,
        title: "Ejercicio 5: Peso de Estudiantes (Normal)",
        statement: `<p>Peso de estudiantes X ~ N(μ = 70 kg, σ = 6 kg).<br>a) Porcentaje entre 68 y 80 kg. b) De 1500 estudiantes, ¿cuántos pesan más de 70 kg?</p>`,
        distTarget: "normal",
        solution: `
          <div class="sheet-template">
            <div class="sheet-step"><span class="step-num">a</span> <strong>P(68 ≤ X ≤ 80):</strong> z₁ = -0.33, z₂ = 1.67 ⟹ Φ(1.67) - Φ(-0.33) = 0.9525 - 0.3707 = <strong>0.5818 (58.18%)</strong></div>
            <div class="sheet-step"><span class="step-num">b</span> <strong>De N = 1500 estudiantes:</strong> P(X > 70) = P(Z > 0) = 0.50 ⟹ Cantidad esperada = 1500 × 0.50 = <strong>750 estudiantes</strong>.</div>
          </div>
        `
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExamData2025;
}
