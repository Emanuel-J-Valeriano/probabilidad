/**
 * Interactive Solvers Engine for Probability & Statistics - FI-UNJu
 */
const Solvers = {
  // -------------------------------------------------------------
  // 1. Contingency Table Solver
  // -------------------------------------------------------------
  solveContingency(matrix, rowLabels, colLabels, rowTotals, colTotals, grandTotal) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    
    // Create copy for calculations
    const grid = matrix.map(r => [...r]);
    const rTotals = [...rowTotals];
    const cTotals = [...colTotals];
    let gTotal = grandTotal;

    // Iteratively solve missing values
    let solvedVars = {};
    let changed = true;
    let iterations = 0;
    while (changed && iterations < 30) {
      changed = false;
      iterations++;

      // Check rows with 1 unknown
      for (let i = 0; i < numRows; i++) {
        let unknowns = [];
        let sumKnown = 0;
        for (let j = 0; j < numCols; j++) {
          const val = grid[i][j];
          if (typeof val === 'number') {
            sumKnown += val;
          } else {
            unknowns.push({ row: i, col: j, name: val });
          }
        }
        if (unknowns.length === 1 && typeof rTotals[i] === 'number') {
          const missing = rTotals[i] - sumKnown;
          const u = unknowns[0];
          grid[u.row][u.col] = missing;
          solvedVars[u.name] = missing;
          changed = true;
        } else if (unknowns.length === 0 && rTotals[i] === null) {
          rTotals[i] = sumKnown;
          changed = true;
        }
      }

      // Check cols with 1 unknown
      for (let j = 0; j < numCols; j++) {
        let unknowns = [];
        let sumKnown = 0;
        for (let i = 0; i < numRows; i++) {
          const val = grid[i][j];
          if (typeof val === 'number') {
            sumKnown += val;
          } else {
            unknowns.push({ row: i, col: j, name: val });
          }
        }
        if (unknowns.length === 1 && typeof cTotals[j] === 'number') {
          const missing = cTotals[j] - sumKnown;
          const u = unknowns[0];
          grid[u.row][u.col] = missing;
          solvedVars[u.name] = missing;
          changed = true;
        } else if (unknowns.length === 0 && cTotals[j] === null) {
          cTotals[j] = sumKnown;
          changed = true;
        }
      }

      // Grand total check
      if (gTotal === null) {
        const sumR = rTotals.filter(t => typeof t === 'number').reduce((a, b) => a + b, 0);
        if (rTotals.every(t => typeof t === 'number')) {
          gTotal = sumR;
          changed = true;
        }
      }
    }

    // Ensure all row/col totals are populated
    for (let i = 0; i < numRows; i++) {
      if (rTotals[i] === null) {
        rTotals[i] = grid[i].reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
      }
    }
    for (let j = 0; j < numCols; j++) {
      if (cTotals[j] === null) {
        let s = 0;
        for (let i = 0; i < numRows; i++) {
          s += (typeof grid[i][j] === 'number' ? grid[i][j] : 0);
        }
        cTotals[j] = s;
      }
    }
    if (!gTotal) {
      gTotal = rTotals.reduce((a, b) => a + b, 0);
    }

    return {
      solvedGrid: grid,
      solvedVars,
      rowTotals: rTotals,
      colTotals: cTotals,
      grandTotal: gTotal,
      numRows,
      numCols
    };
  },

  // -------------------------------------------------------------
  // 2. Bayes & Total Probability Solver
  // -------------------------------------------------------------
  solveBayes(causes, targetCauseIndex = 0) {
    // causes: [ { name, prior: P(Ai), likelihood: P(B|Ai) }, ... ]
    let sumPrior = 0;
    for (let c of causes) {
      sumPrior += c.prior;
    }

    // Calculate joint and total prob
    let termsSuccess = [];
    let termsFailure = [];
    let totalProbSuccess = 0;

    causes.forEach((c, idx) => {
      const pJointSuccess = c.prior * c.likelihood;
      const pJointFailure = c.prior * (1 - c.likelihood);
      termsSuccess.push({
        name: c.name,
        prior: c.prior,
        likelihood: c.likelihood,
        joint: pJointSuccess
      });
      termsFailure.push({
        name: c.name,
        prior: c.prior,
        likelihood: 1 - c.likelihood,
        joint: pJointFailure
      });
      totalProbSuccess += pJointSuccess;
    });

    const totalProbFailure = 1 - totalProbSuccess;

    // Posterior probabilities P(Ai | B) and P(Ai | B^c)
    const posteriorSuccess = termsSuccess.map(t => ({
      name: t.name,
      posterior: totalProbSuccess > 0 ? (t.joint / totalProbSuccess) : 0
    }));

    const posteriorFailure = termsFailure.map(t => ({
      name: t.name,
      posterior: totalProbFailure > 0 ? (t.joint / totalProbFailure) : 0
    }));

    return {
      sumPrior,
      termsSuccess,
      termsFailure,
      totalProbSuccess,
      totalProbFailure,
      posteriorSuccess,
      posteriorFailure,
      targetCause: causes[targetCauseIndex] ? causes[targetCauseIndex].name : null
    };
  },

  // -------------------------------------------------------------
  // 3. Discrete Distributions Solvers
  // -------------------------------------------------------------
  solveBinomial(n, p, k, op = 'eq', k2 = null) {
    const mu = n * p;
    const variance = n * p * (1 - p);
    const sigma = Math.sqrt(variance);

    let prob = 0;
    let description = '';

    if (op === 'eq') {
      prob = MathUtils.binomialPMF(k, n, p);
      description = `P(X = ${k})`;
    } else if (op === 'leq') {
      prob = MathUtils.binomialCDF(k, n, p);
      description = `P(X ≤ ${k})`;
    } else if (op === 'geq') {
      prob = 1 - (k > 0 ? MathUtils.binomialCDF(k - 1, n, p) : 0);
      description = `P(X ≥ ${k})`;
    } else if (op === 'between' && k2 !== null) {
      const minK = Math.min(k, k2);
      const maxK = Math.max(k, k2);
      const cdfMax = MathUtils.binomialCDF(maxK, n, p);
      const cdfMinPrev = minK > 0 ? MathUtils.binomialCDF(minK - 1, n, p) : 0;
      prob = cdfMax - cdfMinPrev;
      description = `P(${minK} ≤ X ≤ ${maxK})`;
    }

    // Distribution table for visualization
    const table = [];
    const maxTableN = Math.min(n, 25);
    for (let i = 0; i <= maxTableN; i++) {
      table.push({
        x: i,
        pmf: MathUtils.binomialPMF(i, n, p),
        cdf: MathUtils.binomialCDF(i, n, p)
      });
    }

    return {
      n, p, k, op,
      prob,
      description,
      mu,
      variance,
      sigma,
      table
    };
  },

  solveNegativeBinomial(r, p, x) {
    const prob = MathUtils.negativeBinomialPMF(x, r, p);
    const mu = r / p;
    const variance = (r * (1 - p)) / (p * p);
    const sigma = Math.sqrt(variance);

    return {
      r, p, x,
      prob,
      mu,
      variance,
      sigma,
      comb: MathUtils.combinations(x - 1, r - 1)
    };
  },

  solvePoisson(lambda, t, k, op = 'eq', k2 = null) {
    const mu = lambda * t;
    const variance = mu;
    const sigma = Math.sqrt(mu);

    let prob = 0;
    let description = '';

    if (op === 'eq') {
      prob = MathUtils.poissonPMF(k, mu);
      description = `P(X = ${k})`;
    } else if (op === 'leq') {
      prob = MathUtils.poissonCDF(k, mu);
      description = `P(X ≤ ${k})`;
    } else if (op === 'geq') {
      prob = 1 - (k > 0 ? MathUtils.poissonCDF(k - 1, mu) : 0);
      description = `P(X ≥ ${k})`;
    } else if (op === 'between' && k2 !== null) {
      const minK = Math.min(k, k2);
      const maxK = Math.max(k, k2);
      const cdfMax = MathUtils.poissonCDF(maxK, mu);
      const cdfMinPrev = minK > 0 ? MathUtils.poissonCDF(minK - 1, mu) : 0;
      prob = cdfMax - cdfMinPrev;
      description = `P(${minK} ≤ X ≤ ${maxK})`;
    }

    return {
      lambda, t, mu,
      variance, sigma,
      k, op, prob,
      description
    };
  },

  solveHypergeometric(N, A, n, k, op = 'eq', k2 = null) {
    const mu = n * (A / N);
    const variance = n * (A / N) * (1 - A / N) * ((N - n) / (N - 1));
    const sigma = Math.sqrt(variance);

    let prob = 0;
    let description = '';

    if (op === 'eq') {
      prob = MathUtils.hypergeometricPMF(k, N, A, n);
      description = `P(X = ${k})`;
    } else if (op === 'leq') {
      prob = MathUtils.hypergeometricCDF(k, N, A, n);
      description = `P(X ≤ ${k})`;
    } else if (op === 'geq') {
      prob = 1 - (k > 0 ? MathUtils.hypergeometricCDF(k - 1, N, A, n) : 0);
      description = `P(X ≥ ${k})`;
    } else if (op === 'between' && k2 !== null) {
      const minK = Math.min(k, k2);
      const maxK = Math.max(k, k2);
      prob = MathUtils.hypergeometricCDF(maxK, N, A, n) - (minK > 0 ? MathUtils.hypergeometricCDF(minK - 1, N, A, n) : 0);
      description = `P(${minK} ≤ X ≤ ${maxK})`;
    }

    return {
      N, A, n, k, op,
      prob,
      description,
      mu,
      variance,
      sigma
    };
  },

  // -------------------------------------------------------------
  // 4. Continuous Distributions Solvers
  // -------------------------------------------------------------
  solveNormal(mu, sigma, x1, x2 = null, op = 'between', popSize = null) {
    let prob = 0;
    let z1 = null;
    let z2 = null;
    let description = '';

    if (op === 'leq') {
      z1 = (x1 - mu) / sigma;
      prob = MathUtils.standardNormalCDF(z1);
      description = `P(X ≤ ${x1}) = Φ(${z1.toFixed(2)})`;
    } else if (op === 'geq') {
      z1 = (x1 - mu) / sigma;
      prob = 1 - MathUtils.standardNormalCDF(z1);
      description = `P(X ≥ ${x1}) = 1 - Φ(${z1.toFixed(2)})`;
    } else if (op === 'between') {
      const minX = Math.min(x1, x2 !== null ? x2 : x1);
      const maxX = Math.max(x1, x2 !== null ? x2 : x1);
      z1 = (minX - mu) / sigma;
      z2 = (maxX - mu) / sigma;
      const phi1 = MathUtils.standardNormalCDF(z1);
      const phi2 = MathUtils.standardNormalCDF(z2);
      prob = phi2 - phi1;
      description = `P(${minX} ≤ X ≤ ${maxX}) = Φ(${z2.toFixed(2)}) - Φ(${z1.toFixed(2)})`;
    }

    const expectedCount = popSize ? popSize * prob : null;

    return {
      mu, sigma, x1, x2, op,
      z1, z2,
      prob,
      description,
      expectedCount
    };
  },

  solveNormalPercentile(mu, sigma, p) {
    const z = (MathUtils.inverseNormalCDF(p, 0, 1));
    const x = mu + z * sigma;
    return {
      mu, sigma, p, z, x
    };
  },

  solveUniformContinuous(a, b, x1, x2 = null, op = 'between') {
    const mu = (a + b) / 2;
    const variance = Math.pow(b - a, 2) / 12;
    const sigma = Math.sqrt(variance);

    let prob = 0;
    let description = '';

    if (op === 'leq') {
      prob = MathUtils.uniformCDF(x1, a, b);
      description = `P(X ≤ ${x1})`;
    } else if (op === 'geq') {
      prob = 1 - MathUtils.uniformCDF(x1, a, b);
      description = `P(X ≥ ${x1})`;
    } else if (op === 'between') {
      const minX = Math.max(a, Math.min(x1, x2 !== null ? x2 : x1));
      const maxX = Math.min(b, Math.max(x1, x2 !== null ? x2 : x1));
      prob = MathUtils.uniformCDF(maxX, a, b) - MathUtils.uniformCDF(minX, a, b);
      description = `P(${minX} ≤ X ≤ ${maxX})`;
    }

    return {
      a, b, mu, variance, sigma,
      prob, description
    };
  },

  solveGamma(alpha, beta, t1, t2 = null, op = 'leq') {
    const mu = alpha * beta;
    const variance = alpha * beta * beta;
    const sigma = Math.sqrt(variance);

    let prob = 0;
    let description = '';

    if (op === 'leq') {
      prob = MathUtils.gammaCDF(t1, alpha, beta);
      description = `P(Y ≤ ${t1})`;
    } else if (op === 'geq') {
      prob = 1 - MathUtils.gammaCDF(t1, alpha, beta);
      description = `P(Y ≥ ${t1})`;
    } else if (op === 'between') {
      const minT = Math.min(t1, t2 !== null ? t2 : t1);
      const maxT = Math.max(t1, t2 !== null ? t2 : t1);
      prob = MathUtils.gammaCDF(maxT, alpha, beta) - MathUtils.gammaCDF(minT, alpha, beta);
      description = `P(${minT} ≤ Y ≤ ${maxT})`;
    }

    return {
      alpha, beta, mu, variance, sigma,
      prob, description,
      t1, t2, op
    };
  },

  // -------------------------------------------------------------
  // 5. Combinatorics Solvers
  // -------------------------------------------------------------
  solveCombinatorics(m, n) {
    return {
      m, n,
      variations: MathUtils.variations(m, n),
      variationsRep: Math.pow(m, n),
      permutations: MathUtils.permutations(m),
      combinations: MathUtils.combinations(m, n)
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Solvers;
}
