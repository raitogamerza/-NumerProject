import { det } from "mathjs";
import LinearSystemMethod from "./LinearSystemMethod";

export default class CramerRule extends LinearSystemMethod {
  static methodName = "Cramer's Rule";

  compute() {
    const { A, B, n } = this;
    const detA = det(A);
    if (Math.abs(detA) < this.eps) return LinearSystemMethod.singularResult(detA);

    const X = [];
    for (let k = 0; k < n; k++) {
      const Ak = A.map((row, i) => row.map((val, j) => (j === k ? B[i] : val)));
      X.push(det(Ak) / detA);
    }
    return { detA, X, singular: false };
  }
}
