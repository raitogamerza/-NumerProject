// src/utils/conjugateGradient.js
export const conjugateGradientMethod = (A, B, X0, tol = 1e-6, maxIter = 1000) => {
  const N = A.length;
  let x = X0.map(v => Number(v));
  const b = B.map(v => Number(v));
  const eps = Number(tol);
  const iterations = [];

  // r = b - Ax
  let r = b.map((bi, i) => bi - A[i].reduce((sum, aij, j) => sum + aij * x[j], 0));
  let p = [...r];
  let rsold = r.reduce((sum, ri) => sum + ri*ri, 0);

  for (let k = 0; k < maxIter; k++) {
    // Ap
    const Ap = A.map((row, i) => row.reduce((sum, aij, j) => sum + aij * p[j], 0));
    const alpha = rsold / p.reduce((sum, pi, i) => sum + pi * Ap[i], 0);

    // x = x + alpha * p
    x = x.map((xi, i) => xi + alpha * p[i]);

    // r = r - alpha * Ap
    r = r.map((ri, i) => ri - alpha * Ap[i]);

    const rsnew = r.reduce((sum, ri) => sum + ri*ri, 0);
    iterations.push([...x]);

    if (Math.sqrt(rsnew) < eps) break;

    // p = r + (rsnew/rsold) * p
    const beta = rsnew / rsold;
    p = r.map((ri, i) => ri + beta * p[i]);
    rsold = rsnew;
  }

  // determinant แบบง่าย (product diagonal)
  let detA = 1;
  for (let i = 0; i < N; i++) detA *= A[i][i];
  const singular = !Number.isFinite(detA) || Math.abs(detA) < eps;

  return { X: x, iterations, detA };
};
