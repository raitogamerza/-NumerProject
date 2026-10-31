import NumericalMethod from "../NumericalMethod";
import MathFunction from "../MathFunction";
import RootFindingMethod from "./RootFindingMethod";

// One-Point Iteration ใช้ g(x) แทน f(x)
export default class OnePoint extends RootFindingMethod {
  static methodName = "One-Point";

  constructor({ gx, ...rest } = {}) {
    super({ fx: gx, gx, ...rest });
  }

  validate() {
    this.g = new MathFunction(this.params.gx);
    this.tolerance = NumericalMethod.toNumber(this.params.tol, "tolerance");
    this.x0 = NumericalMethod.toNumber(this.params.x0, "x0");
  }

  compute() {
    const records = [];
    let x = this.x0;
    let xNew, relError;
    let iter = 0;

    do {
      xNew = this.g.at(x);
      relError = Math.abs((xNew - x) / xNew);
      records.push({ iter: iter + 1, xOld: x, xNew, error: Math.abs(xNew - x) });
      x = xNew;
      iter++;
    } while (iter < this.maxIter && relError > this.tolerance);

    if (relError > this.tolerance) throw new Error("ไม่ลู่เข้าในจำนวนรอบที่กำหนด");

    return { root: xNew, iterations: iter, records };
  }
}
