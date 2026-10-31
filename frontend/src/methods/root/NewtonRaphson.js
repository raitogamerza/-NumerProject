import NumericalMethod from "../NumericalMethod";
import RootFindingMethod from "./RootFindingMethod";

export default class NewtonRaphson extends RootFindingMethod {
  static methodName = "Newton-Raphson";

  validate() {
    super.validate();
    this.x0 = NumericalMethod.toNumber(this.params.x0, "x0");
    this.df = this.f.derivative();
  }

  compute() {
    const records = [];
    let x = this.x0;
    let xNew;
    let iter = 0;

    do {
      const fx = this.f.at(x);
      const dfx = this.df.at(x);
      if (dfx === 0) throw new Error("อนุพันธ์เป็นศูนย์ ไม่สามารถหาคำตอบต่อได้");

      xNew = x - fx / dfx;
      records.push({ iter: iter + 1, x, fx, dfx, xNext: xNew, error: Math.abs(xNew - x) });
      iter++;
      x = xNew;
    } while (iter < this.maxIter && Math.abs(this.f.at(x)) > this.tolerance);

    return { root: xNew, iterations: iter, records };
  }
}
