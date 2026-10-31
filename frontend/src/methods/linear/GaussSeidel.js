import IterativeLinearMethod from "./IterativeLinearMethod";

export default class GaussSeidel extends IterativeLinearMethod {
  static methodName = "Gauss-Seidel";

  initialize() {
    this.requireNonZeroDiagonal();
  }

  // ใช้ค่า X ที่เพิ่งคำนวณได้ในรอบเดียวกันทันที
  step(X) {
    const Xnew = [...X];
    for (let i = 0; i < this.n; i++) {
      let sum = 0;
      for (let j = 0; j < this.n; j++) if (j !== i) sum += this.A[i][j] * Xnew[j];
      Xnew[i] = (this.B[i] - sum) / this.A[i][i];
    }
    return Xnew;
  }
}
