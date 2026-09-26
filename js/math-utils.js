/**
 * Math Utilities for Probability & Statistics - FI-UNJu
 */
const MathUtils = {
  // Lanczos approximation coefficients for log-gamma ln(Γ(x))
  lnGamma(z) {
    if (z < 0.5) {
      // Reflection formula: Γ(1-z)Γ(z) = π / sin(πz)
      return Math.log(Math.PI / Math.sin(Math.PI * z)) - this.lnGamma(1 - z);
    }
    const p = [
      0.99999999999980993,
      676.5203681218851,
      -1259.1392167224028,
      771.32342877765313,
      -176.61502916214059,
      12.507343278686905,
      -0.138571095831109,
      9.9843695780195716e-6,
      1.5056327351493116e-7
    ];
    let x = p[0];
    for (let i = 1; i < 9; i++) {
      x += p[i] / (z + i - 1);
    }
    const t = z + 7 - 0.5;
    return 0.5 * Math.log(2 * Math.PI) + (z - 0.5) * Math.log(t) - t + Math.log(x);
  },

  gamma(z) {
    if (Number.isInteger(z) && z > 0 && z <= 20) {
      return this.factorial(z - 1);
    }
    return Math.exp(this.lnGamma(z));
  },

  factorial(n) {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) {
      res *= i;
    }
    return res;
  },

  lnFactorial(n) {
    if (n < 0) return -Infinity;
    if (n === 0 || n === 1) return 0;
    return this.lnGamma(n + 1);
  },

  combinations(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    if (k === 1 || k === n - 1) return n;
    // Use lnFactorial for stability with large numbers (e.g., N=1140)
    if (n > 30) {
      const lnVal = this.lnFactorial(n) - this.lnFactorial(k) - this.lnFactorial(n - k);
      return Math.round(Math.exp(lnVal));
    }
    let res = 1;
    k = Math.min(k, n - k);
    for (let i = 1; i <= k; i++) {
      res = (res * (n - k + i)) / i;
    }
    return Math.round(res);
  },

  variations(n, k) {
    if (k < 0 || k > n) return 0;
    let res = 1;
    for (let i = 0; i < k; i++) {
      res *= (n - i);
    }
    return res;
  },

  permutations(n) {
    return this.factorial(n);
  },

  // Error function erf(x)
  erf(x) {
    // Abramowitz & Stegun 7.1.26
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    const sign = x < 0 ? -1 : 1;
    const absX = Math.abs(x);

    const t = 1.0 / (1.0 + p * absX);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

    return sign * y;
  },

  // Standard Normal Cumulative Distribution Function Φ(z)
  standardNormalCDF(z) {
    return 0.5 * (1 + this.erf(z / Math.SQRT2));
  },

  // Normal CDF for general μ, σ
  normalCDF(x, mu = 0, sigma = 1) {
    if (sigma <= 0) return 0;
    const z = (x - mu) / sigma;
    return this.standardNormalCDF(z);
  },

  // Normal PDF
  normalPDF(x, mu = 0, sigma = 1) {
    if (sigma <= 0) return 0;
    const z = (x - mu) / sigma;
    return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
  },

  // Inverse Normal CDF (Quantile function) using Abramowitz & Stegun
  inverseNormalCDF(p, mu = 0, sigma = 1) {
    if (p <= 0) return -Infinity;
    if (p >= 1) return Infinity;
    let flip = false;
    let prob = p;
    if (prob > 0.5) {
      prob = 1 - prob;
      flip = true;
    }
    const t = Math.sqrt(-2.0 * Math.log(prob));
    const c0 = 2.515517;
    const c1 = 0.802853;
    const c2 = 0.010328;
    const d1 = 1.432788;
    const d2 = 0.189269;
    const d3 = 0.001308;

    const num = c0 + t * (c1 + t * c2);
    const den = 1.0 + t * (d1 + t * (d2 + t * d3));
    let z = t - num / den;
    if (!flip) z = -z;

    return mu + z * sigma;
  },

  // Binomial PMF: P(X = k) = C(n, k) * p^k * (1-p)^(n-k)
  binomialPMF(k, n, p) {
    if (k < 0 || k > n || p < 0 || p > 1) return 0;
    if (n > 30) {
      const lnVal = this.lnFactorial(n) - this.lnFactorial(k) - this.lnFactorial(n - k)
        + k * Math.log(p) + (n - k) * Math.log(1 - p);
      return Math.exp(lnVal);
    }
    return this.combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  },

  binomialCDF(k, n, p) {
    if (k < 0) return 0;
    if (k >= n) return 1;
    let sum = 0;
    for (let i = 0; i <= k; i++) {
      sum += this.binomialPMF(i, n, p);
    }
    return Math.min(1, Math.max(0, sum));
  },

  // Negative Binomial (Pascal) PMF as defined in FI-UNJu:
  // X = total trials to reach r successes, x = r, r+1, ...
  // P(X = x) = C(x-1, r-1) * p^r * (1-p)^(x-r)
  negativeBinomialPMF(x, r, p) {
    if (x < r || p <= 0 || p > 1) return 0;
    return this.combinations(x - 1, r - 1) * Math.pow(p, r) * Math.pow(1 - p, x - r);
  },

  // Geometric PMF: trials until 1st success
  // P(X = x) = p * (1-p)^(x-1) for x = 1, 2, ...
  geometricPMF(x, p) {
    if (x < 1 || p <= 0 || p > 1) return 0;
    return p * Math.pow(1 - p, x - 1);
  },

  geometricCDF(x, p) {
    if (x < 1) return 0;
    return 1 - Math.pow(1 - p, x);
  },

  // Poisson PMF: P(X = k) = (e^(-mu) * mu^k) / k!
  poissonPMF(k, mu) {
    if (k < 0 || mu <= 0) return 0;
    if (k > 50 || mu > 50) {
      const lnVal = -mu + k * Math.log(mu) - this.lnFactorial(k);
      return Math.exp(lnVal);
    }
    return (Math.exp(-mu) * Math.pow(mu, k)) / this.factorial(k);
  },

  poissonCDF(k, mu) {
    if (k < 0) return 0;
    let sum = 0;
    for (let i = 0; i <= k; i++) {
      sum += this.poissonPMF(i, mu);
    }
    return Math.min(1, sum);
  },

  // Hypergeometric PMF:
  // N: population, A: successes in pop, n: sample size, k: successes in sample
  // P(X = k) = [C(A, k) * C(N-A, n-k)] / C(N, n)
  hypergeometricPMF(k, N, A, n) {
    if (k < Math.max(0, n - (N - A)) || k > Math.min(n, A)) return 0;
    const lnNum = (this.lnFactorial(A) - this.lnFactorial(k) - this.lnFactorial(A - k)) +
                  (this.lnFactorial(N - A) - this.lnFactorial(n - k) - this.lnFactorial((N - A) - (n - k)));
    const lnDen = this.lnFactorial(N) - this.lnFactorial(n) - this.lnFactorial(N - n);
    return Math.exp(lnNum - lnDen);
  },

  hypergeometricCDF(k, N, A, n) {
    const minK = Math.max(0, n - (N - A));
    if (k < minK) return 0;
    const maxK = Math.min(n, A);
    if (k >= maxK) return 1;
    let sum = 0;
    for (let i = minK; i <= k; i++) {
      sum += this.hypergeometricPMF(i, N, A, n);
    }
    return Math.min(1, sum);
  },

  // Exponential CDF: P(X <= x) = 1 - e^(-x/beta)
  exponentialCDF(x, beta) {
    if (x <= 0 || beta <= 0) return 0;
    return 1 - Math.exp(-x / beta);
  },

  // Gamma CDF:
  // In UNJu theory, if alpha is an integer (Erlang distribution with shape r = alpha and scale beta = 1/lambda):
  // P(Y <= t) = P(X >= alpha) where X ~ Poisson(mu = t / beta)
  // = 1 - sum_{k=0}^{alpha - 1} e^(-t/beta) * (t/beta)^k / k!
  gammaCDF(x, alpha, beta) {
    if (x <= 0 || alpha <= 0 || beta <= 0) return 0;
    if (Number.isInteger(alpha)) {
      const mu = x / beta;
      let sum = 0;
      for (let k = 0; k < alpha; k++) {
        sum += this.poissonPMF(k, mu);
      }
      return Math.max(0, Math.min(1, 1 - sum));
    }
    // Continuous approximation using numerical integration (Simpson's 3/8 rule)
    const nSteps = 100;
    const h = x / nSteps;
    let sum = 0;
    const f = (t) => {
      if (t <= 0) return 0;
      return (1 / (Math.pow(beta, alpha) * this.gamma(alpha))) * Math.pow(t, alpha - 1) * Math.exp(-t / beta);
    };
    for (let i = 0; i <= nSteps; i++) {
      const t = i * h;
      const weight = (i === 0 || i === nSteps) ? 1 : (i % 2 === 0 ? 2 : 4);
      sum += weight * f(t);
    }
    return Math.min(1, Math.max(0, (h / 3) * sum));
  },

  // Uniform Continuous CDF: on [a, b]
  uniformCDF(x, a, b) {
    if (x <= a) return 0;
    if (x >= b) return 1;
    return (x - a) / (b - a);
  },

  // Formatter helpers
  formatProb(val, decimals = 4) {
    if (isNaN(val)) return '0.0000 (0.00%)';
    const num = Number(val);
    const fixed = num.toFixed(decimals);
    const pct = (num * 100).toFixed(2);
    return `${fixed} (${pct}%)`;
  },

  formatNumber(val, decimals = 4) {
    if (isNaN(val)) return '0';
    const num = Number(val);
    if (Math.abs(num) >= 1e6 || (Math.abs(num) > 0 && Math.abs(num) < 1e-4)) {
      return num.toExponential(4);
    }
    return parseFloat(num.toFixed(decimals)).toString();
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MathUtils;
}
