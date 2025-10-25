
export const gaussSeidelMethod = (A, B, X0, tol = 1e-6, maxIter = 1000) => {
  const N = A.length;
  let X = X0.map(v => Number(v));
  const eps = Number(tol);
  const iterations = [];

  for (let k = 0; k < maxIter; k++) {
    let Xnew = [...X];
    let maxDiff = 0;

    for (let i = 0; i < N; i++) {
      let sum = 0;
      for (let j = 0; j < N; j++) {
        if (j !== i) sum += A[i][j] * Xnew[j];
      }
      if (A[i][i] === 0) throw new Error("หารด้วยศูนย์ใน Gauss-Seidel!");
      Xnew[i] = (B[i] - sum) / A[i][i];
      maxDiff = Math.max(maxDiff, Math.abs(Xnew[i] - X[i]));
    }

    X = Xnew;
    iterations.push([...X]);

    if (maxDiff < eps) break;
  }

  // determinant แบบง่าย (product of diagonal)
  let detA = 1;
  for (let i = 0; i < N; i++) detA *= A[i][i];
  const singular = !Number.isFinite(detA) || Math.abs(detA) < eps;

  return { X, iterations, detA, singular };
};
