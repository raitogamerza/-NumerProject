import LinearSystemMethod from "./LinearSystemMethod";

// Doolittle's LU Decomposition
export default class LUDecomposition extends LinearSystemMethod {
  static methodName = "LU Decomposition";

  compute() {
    const { A, B, n } = this;
    const L = Array.from({ length: n }, () => Array(n).fill(0));
    const U = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
        let sum = 0;
        for (let k = 0; k < i; k++) sum += L[i][k] * U[k][j];
        U[i][j] = A[i][j] - sum;
      }
      if (Math.abs(U[i][i]) < this.eps) return LinearSystemMethod.singularResult();
      for (let j = i; j < n; j++) {
        let sum = 0;
        for (let k = 0; k < i; k++) sum += L[j][k] * U[k][i];
        L[j][i] = (A[j][i] - sum) / U[i][i];
      }
    }

    // Forward substitution: LY = B
    const Y = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let k = 0; k < i; k++) sum += L[i][k] * Y[k];
      Y[i] = B[i] - sum;
    }

    // Back substitution: UX = Y
    const X = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;
      for (let k = i + 1; k < n; k++) sum += U[i][k] * X[k];
      X[i] = (Y[i] - sum) / U[i][i];
    }

    const detA = U.reduce((acc, row, i) => acc * row[i], 1);
    return { L, U, Y, X, detA, singular: false };
  }
}
