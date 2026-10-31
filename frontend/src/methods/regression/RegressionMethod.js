import NumericalMethod from "../NumericalMethod";
import GaussElimination from "../linear/GaussElimination";

// คลาสแม่ของ regression: กรองจุดที่กรอกครบ แล้วให้ subclass หา coefficients
export default class RegressionMethod extends NumericalMethod {
  static category = "regression";
  // จำนวนจุดขั้นต่ำ (subclass override ได้)
  minPoints() {
    return 2;
  }

  isFilled(point) {
    return point.x !== "" && point.y !== "" && point.x != null && point.y != null;
  }

  validate() {
    const points = (this.params.points ?? []).filter((p) => this.isFilled(p));
    if (points.length < this.minPoints()) {
      throw new Error(`ต้องมีข้อมูลอย่างน้อย ${this.minPoints()} จุด`);
    }
    this.points = points;
  }

  // แก้ normal equations (XᵀX)a = Xᵀy ด้วย Gauss Elimination (ใช้คลาสเดิมซ้ำ)
  static solveNormalEquations(rows, ys) {
    const cols = rows[0].length;
    const XtX = Array.from({ length: cols }, (_, i) =>
      Array.from({ length: cols }, (_, j) => rows.reduce((s, r) => s + r[i] * r[j], 0))
    );
    const XtY = Array.from({ length: cols }, (_, i) => rows.reduce((s, r, k) => s + r[i] * ys[k], 0));

    const { X, singular } = new GaussElimination({ A: XtX, B: XtY, eps: 1e-12 }).solve();
    if (singular) throw new Error("เมทริกซ์ XᵀX เป็นเอกฐาน ไม่สามารถหาสมการได้");
    return X;
  }

  // จุดของเส้นกราฟสำหรับ regression ตัวแปรเดียว
  curve(predict, minX, maxX, step = 0.1) {
    const xs = [];
    const ys = [];
    for (let x = minX - 1; x <= maxX; x += step) {
      xs.push(x);
      ys.push(predict(x));
    }
    return { x: xs, y: ys };
  }

  static summarize({ equation, yPred }) {
    return { equation, yPred };
  }
}
