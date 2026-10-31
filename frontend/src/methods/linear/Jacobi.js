import IterativeLinearMethod from "./IterativeLinearMethod";

export default class Jacobi extends IterativeLinearMethod {
  static methodName = "Jacobi";

  initialize() {
    this.requireNonZeroDiagonal();
  }

  // ใช้ค่า X ของรอบก่อนทั้งหมด
  step(X) {
    return X.map((_, i) => {
      let sum = 0;
      for (let j = 0; j < this.n; j++) if (j !== i) sum += this.A[i][j] * X[j];
      return (this.B[i] - sum) / this.A[i][i];
    });
  }
}
