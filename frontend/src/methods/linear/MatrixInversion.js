import LinearSystemMethod from "./LinearSystemMethod";

export default class MatrixInversion extends LinearSystemMethod {
  static methodName = "Matrix Inversion";

  // หา inverse ด้วย Gauss-Jordan (partial pivoting); คืน null ถ้าเป็นเอกฐาน
  static invert(A, eps = 1e-6) {
    const n = A.length;
    const aug = A.map((row, i) => [...row, ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))]);

    for (let i = 0; i < n; i++) {
      const p = LinearSystemMethod.pivotRow(aug, i);
      if (Math.abs(aug[p][i]) < eps) return null;
      if (p !== i) [aug[i], aug[p]] = [aug[p], aug[i]];

      const pivot = aug[i][i];
      for (let j = 0; j < 2 * n; j++) aug[i][j] /= pivot;

      for (let k = 0; k < n; k++) {
        if (k === i) continue;
        const factor = aug[k][i];
        if (factor === 0) continue;
        for (let j = 0; j < 2 * n; j++) aug[k][j] -= factor * aug[i][j];
      }
    }
    return aug.map((row) => row.slice(n));
  }

  compute() {
    const detA = LinearSystemMethod.determinant(this.A, this.eps);
    const invA = detA === 0 ? null : MatrixInversion.invert(this.A, this.eps);
    if (!invA) return { ...LinearSystemMethod.singularResult(detA), invA: null };

    const X = invA.map((row) => row.reduce((s, v, j) => s + v * this.B[j], 0));
    return { X, invA, detA, singular: false };
  }
}
