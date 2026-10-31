import LinearSystemMethod from "./LinearSystemMethod";

export default class GaussElimination extends LinearSystemMethod {
  static methodName = "Gauss Elimination";

  compute() {
    const { n } = this;
    const aug = this.A.map((row, i) => [...row, this.B[i]]);
    let detA = 1;

    // Forward elimination
    for (let i = 0; i < n; i++) {
      const p = LinearSystemMethod.pivotRow(aug, i);
      if (Math.abs(aug[p][i]) < this.eps) return LinearSystemMethod.singularResult();
      if (p !== i) {
        [aug[i], aug[p]] = [aug[p], aug[i]];
        detA = -detA;
      }
      detA *= aug[i][i];

      for (let r = i + 1; r < n; r++) {
        const f = aug[r][i] / aug[i][i];
        for (let c = i; c <= n; c++) aug[r][c] -= f * aug[i][c];
      }
    }

    // Back substitution
    const X = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let sum = aug[i][n];
      for (let j = i + 1; j < n; j++) sum -= aug[i][j] * X[j];
      X[i] = sum / aug[i][i];
    }

    return { X, detA, singular: false };
  }
}
