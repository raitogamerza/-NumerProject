import LinearSystemMethod from "./LinearSystemMethod";

// คลาสแม่ของวิธีทำซ้ำ (Jacobi, Gauss-Seidel, Conjugate Gradient)
// subclass กำหนด step(X) ที่คืนค่า X รอบถัดไป; ลูปและการเก็บ iterations อยู่ที่นี่
export default class IterativeLinearMethod extends LinearSystemMethod {
  static iterative = true;

  constructor({ X0, maxIter = 1000, ...rest } = {}) {
    super({ X0, maxIter, ...rest });
    this.maxIter = maxIter;
  }

  validate() {
    super.validate();
    const { X0 } = this.params;
    this.X0 = Array.from({ length: this.n }, (_, i) => {
      const v = Number(X0?.[i]);
      return Number.isFinite(v) ? v : 0;
    });
  }

  initialize() {}

  step() {
    throw new Error(`${this.constructor.name} ต้อง implement step()`);
  }

  hasConverged(maxDiff) {
    return maxDiff < this.eps;
  }

  // det แบบง่าย (ผลคูณแนวทแยง) ใช้เตือนกรณีแนวทแยงเป็นศูนย์
  diagonalProduct() {
    return this.A.reduce((acc, row, i) => acc * row[i], 1);
  }

  requireNonZeroDiagonal() {
    if (this.A.some((row, i) => row[i] === 0)) {
      throw new Error(`หารด้วยศูนย์ใน ${this.methodName}! (มีสมาชิกแนวทแยงเป็น 0)`);
    }
  }

  compute() {
    let X = [...this.X0];
    const iterations = [];
    this.initialize(X);

    for (let k = 0; k < this.maxIter; k++) {
      const Xnew = this.step(X);
      const maxDiff = Math.max(...Xnew.map((v, i) => Math.abs(v - X[i])));
      X = Xnew;
      iterations.push([...X]);
      if (this.hasConverged(maxDiff)) break;
    }

    const detA = this.diagonalProduct();
    const singular = !Number.isFinite(detA) || Math.abs(detA) < this.eps;
    return { X, iterations, detA, singular };
  }
}
