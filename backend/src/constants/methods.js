// รายชื่อวิธีเชิงตัวเลขทั้งหมดที่ระบบรองรับ (ต้องตรงกับ static methodName ใน frontend/src/methods)
const CATEGORIES = Object.freeze({
  ROOT: 'root-of-equations',
  LINEAR: 'linear-algebra',
  REGRESSION: 'regression',
  INTEGRATION: 'integration',
  DIFFERENTIATION: 'differentiation',
});

const METHODS = Object.freeze({
  'Bisection': CATEGORIES.ROOT,
  'False Position': CATEGORIES.ROOT,
  'One-Point': CATEGORIES.ROOT,
  'Newton-Raphson': CATEGORIES.ROOT,
  'Secant': CATEGORIES.ROOT,
  'Graphical': CATEGORIES.ROOT,

  "Cramer's Rule": CATEGORIES.LINEAR,
  'Gauss Elimination': CATEGORIES.LINEAR,
  'Gauss-Jordan': CATEGORIES.LINEAR,
  'LU Decomposition': CATEGORIES.LINEAR,
  'Matrix Inversion': CATEGORIES.LINEAR,
  'Jacobi': CATEGORIES.LINEAR,
  'Gauss-Seidel': CATEGORIES.LINEAR,
  'Conjugate Gradient': CATEGORIES.LINEAR,

  'Linear Regression': CATEGORIES.REGRESSION,
  'Polynomial Regression': CATEGORIES.REGRESSION,
  'Multiple Linear Regression': CATEGORIES.REGRESSION,

  'Trapezoidal': CATEGORIES.INTEGRATION,
  'Composite Trapezoidal': CATEGORIES.INTEGRATION,
  'Simpson': CATEGORIES.INTEGRATION,
  'Composite Simpson': CATEGORIES.INTEGRATION,

  'Numerical Differentiation': CATEGORIES.DIFFERENTIATION,
});

const METHOD_NAMES = Object.keys(METHODS);

module.exports = { CATEGORIES, METHODS, METHOD_NAMES };
