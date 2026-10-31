import NumericalMethod from "../NumericalMethod";

// คลาสแม่ของวิธีแก้ระบบสมการ AX = B: ตรวจขนาดและแปลงค่าใน A, B เป็นตัวเลข
export default class LinearSystemMethod extends NumericalMethod {
  static category = "linear-algebra";
  static iterative = false;

  constructor({ A, B, eps = 1e-6, ...rest } = {}) {
    super({ A, B, eps, ...rest });
  }

  validate() {
    const { A, B, eps } = this.params;
    if (!Array.isArray(A) || A.length === 0) throw new Error("A ต้องเป็นเมทริกซ์ N×N");
    const n = A.length;
    if (!A.every((row) => Array.isArray(row) && row.length === n)) {
      throw new Error("A ต้องเป็นเมทริกซ์ N×N");
    }
    if (!Array.isArray(B) || B.length !== n) throw new Error("B ต้องมีขนาด N");

    this.n = n;
    this.A = A.map((row) => row.map(Number));
    this.B = B.map(Number);
    if (this.A.flat().some((v) => !Number.isFinite(v))) {
      throw new Error("กรุณากรอกค่าเมทริกซ์ A ให้ครบและเป็นตัวเลข");
    }
    if (this.B.some((v) => !Number.isFinite(v))) {
      throw new Error("กรุณากรอกเวกเตอร์ B ให้ครบและเป็นตัวเลข");
    }
    const tol = Number(eps);
    this.eps = Number.isFinite(tol) && tol > 0 ? tol : 1e-6;
  }

  static singularResult(detA = 0) {
    return { X: null, detA, singular: true };
  }

  // หา det ด้วย Gaussian elimination + partial pivoting
  static determinant(A, eps = 1e-12) {
    const n = A.length;
    const U = A.map((row) => row.slice());
    let det = 1;
    for (let i = 0; i < n; i++) {
      const p = LinearSystemMethod.pivotRow(U, i);
      if (Math.abs(U[p][i]) < eps) return 0;
      if (p !== i) {
        [U[i], U[p]] = [U[p], U[i]];
        det = -det;
      }
      det *= U[i][i];
      for (let r = i + 1; r < n; r++) {
        const factor = U[r][i] / U[i][i];
        for (let c = i; c < n; c++) U[r][c] -= factor * U[i][c];
      }
    }
    return det;
  }

  // แถวที่มีค่าสัมบูรณ์มากสุดในคอลัมน์ col (ตั้งแต่แถว col ลงไป)
  static pivotRow(M, col) {
    let p = col;
    for (let r = col + 1; r < M.length; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[p][col])) p = r;
    }
    return p;
  }

  static summarize({ X, detA }) {
    return { X, detA };
  }
}
