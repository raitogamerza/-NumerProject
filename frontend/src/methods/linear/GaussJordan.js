import LinearSystemMethod from "./LinearSystemMethod";

export default class GaussJordan extends LinearSystemMethod {
  static methodName = "Gauss-Jordan";

  compute() {
    const { n } = this;
    const aug = this.A.map((row, i) => [...row, this.B[i]]);
    let detA = 1;

    for (let i = 0; i < n; i++) {
      const p = LinearSystemMethod.pivotRow(aug, i);
      if (Math.abs(aug[p][i]) < this.eps) return LinearSystemMethod.singularResult();
      if (p !== i) {
        [aug[i], aug[p]] = [aug[p], aug[i]];
        detA = -detA;
      }

      const pivot = aug[i][i];
      detA *= pivot;
      for (let j = 0; j <= n; j++) aug[i][j] /= pivot;

      for (let r = 0; r < n; r++) {
        if (r === i) continue;
        const f = aug[r][i];
        for (let j = 0; j <= n; j++) aug[r][j] -= f * aug[i][j];
      }
    }

    return { X: aug.map((row) => row[n]), detA, singular: false };
  }
}
