# 🎲 Probabilidad & Estadística - Facultad de Ingeniería (UNJu)
> **Guía Teórica Oficial, Solucionador Paso a Paso de Parciales y PWA para Celular**

Esta aplicación web interactiva está diseñada específicamente para estudiantes de la cátedra de **Probabilidad y Estadística** de la **Facultad de Ingeniería - Universidad Nacional de Jujuy (UNJu)** (apuntes de Lac Prugent, Marta Corro, Octavio Daniel Coro).

---

## 🚀 Características Principales

1. **📖 Teoría Completa de la Cátedra**:
   - **Unidad 1:** Fundamentos, axiomas de Kolmogorov, operaciones de sucesos y análisis combinatorio (variaciones, permutaciones, combinaciones).
   - **Unidad 2:** Probabilidad condicional, regla de la multiplicación, sucesos independientes vs mutuamente excluyentes, Teorema de Probabilidad Total y Teorema de Bayes.
   - **Unidad 3:** Tablas de contingencia bidimensionales, resolución algebraica de incógnitas, distribuciones marginales, conjuntas y prueba formal de independencia estocástica.
   - **Unidad 4:** Variables aleatorias discretas: Uniforme discreta, Bernoulli, Binomial, Poisson, Hipergeométrica, Geométrica y Binomial Negativa (Pascal).
   - **Unidad 5:** Variables aleatorias continuas: Uniforme continua, Normal Gaussiana (estandarización Z, cálculo de percentiles y campana), Exponencial, Erlang, Gamma (teorema Poisson-Gamma) y Weibull.

2. **🧮 Solucionadores Interactivos de Parciales**:
   - **Tablas de Contingencia:** Carga matrices dinámicas (como el Ejercicio 1 del parcial: Comisiones vs Estados), resuelve incógnitas faltantes (`A`, `B`, `C`, `D`) y calcula probabilidades marginales, uniones, condicionales, prueba de independencia y gráfico de barras.
   - **Árbol de Bayes:** Diagrama visual interactivo en Canvas, cálculo de Probabilidad Total y probabilidades a posteriori (Bayes) con sustitución paso a paso.
   - **Variables Discretas:** Binomial, Binomial Negativa (Pascal: $r$-ésimo éxito en ensayo $x$), Poisson, Hipergeométrica (muestreo sin reposición).
   - **Variables Continuas:** Normal con gráfica interactiva en tiempo real de la Campana de Gauss y área sombreada, Uniforme continua y Gamma/Erlang.
   - **Combinatoria:** Conteo rápido con fórmulas.

3. **📝 Exámenes Parciales Resueltos (del PDF)**:
   - Incluye los 4 parciales reales escaneados del PDF con todos sus enunciados y resoluciones paso a paso.
   - Cada ejercicio cuenta con el botón **"🚀 Abrir en Calculadora"** para precargar los datos exactos del examen y poder experimentar con nuevos valores.

4. **📊 Tablas Estadísticas Interactivas**:
   - Tabla de la **Normal Estándar $Z$** con buscador de valores que resalta automáticamente la fila y columna.
   - Tabla de la **Función Gamma $\Gamma(\alpha)$** para $\alpha \in [1.00, 1.99]$.

5. **📱 Optimizado para Celular (Mobile-First & PWA)**:
   - Barra de navegación inferior táctil idéntica a una aplicación nativa de iOS / Android.
   - Modo Oscuro y Modo Claro.
   - Funciona **100% Offline** mediante Service Worker.
   - Permite **"Agregar a la pantalla de inicio"** para usarla sin conexión en el aula.

---

## 📲 Cómo Usarla en el Celular

### Opción A: Mediante GitHub Pages (Recomendada - Accesible desde cualquier lugar)

1. En GitHub, crea un nuevo repositorio llamado `probabilidad` en tu cuenta:
   👉 **https://github.com/new** (Nombre del repositorio: `probabilidad`, público).

2. En tu computadora, ejecuta en la terminal:
   ```bash
   git remote add origin https://github.com/Emanuel-J-Valeriano/probabilidad.git
   git push -u origin main
   ```

3. Activa GitHub Pages:
   - Ve a tu repositorio en GitHub: `Settings` ➔ `Pages`.
   - En **Source**, selecciona `Deploy from a branch`.
   - En **Branch**, selecciona `main` / `/ (root)` y haz clic en **Save**.

4. ¡Listo! En 1 minuto tu página estará activa en:
   👉 **`https://Emanuel-J-Valeriano.github.io/probabilidad/`**
   - Ábrela desde el navegador de tu celular (Chrome o Safari).
   - En el menú del navegador toca **"Agregar a la pantalla principal"** o **"Instalar aplicación"**.

---

### Opción B: Usar en el celular en tu red Wi-Fi local

1. En tu computadora, abre una terminal en esta carpeta y ejecuta:
   ```bash
   python3 -m http.server 8080
   ```
2. Averigua la IP local de tu Mac (ej: `192.168.1.50`).
3. En el navegador de tu celular (conectado al mismo Wi-Fi), entra a:
   `http://192.168.1.50:8080`

---

## 💻 Estructura del Proyecto

```
probabilidad/
├── index.html                 # Interfaz principal completa y responsiva
├── manifest.json              # Configuración PWA para instalación móvil
├── sw.js                      # Service Worker para funcionamiento sin conexión
├── css/
│   └── styles.css             # Sistema de diseño moderno, dark/light y glassmorphism
├── js/
│   ├── math-utils.js          # Motor matemático de probabilidad y estadística
│   ├── theory-data.js         # Base de datos de teoría cátedra FI-UNJu
│   ├── exam-data.js           # Parciales del PDF resueltos con presets
│   ├── solvers.js             # Lógica de cálculo interactivo y resolución de incógnitas
│   └── app.js                 # Controlador principal, gráficos Canvas y UI
└── icons/                     # Iconos de la aplicación en alta resolución
```
