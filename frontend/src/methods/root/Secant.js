import NumericalMethod from "../NumericalMethod";
import RootFindingMethod from "./RootFindingMethod";

export default class Secant extends RootFindingMethod {
  static methodName = "Secant";

  validate() {
    super.validate();
    this.x0 = NumericalMethod.toNumber(this.params.x0, "x0");
    this.x1 = NumericalMethod.toNumber(this.params.x1, "x1");
  }

  compute() {
    const records = [];
    let xPrev = this.x0;
    let xCurr = this.x1;
    let xNew, error;
    let iter = 0;

    do {
      const fPrev = this.f.at(xPrev);
      const fCurr = this.f.at(xCurr);
      if (fCurr - fPrev === 0) throw new Error("การหารด้วยศูนย์ ไม่สามารถหาคำตอบต่อได้");

      xNew = xCurr - (fCurr * (xCurr - xPrev)) / (fCurr - fPrev);
      error = Math.abs(xNew - xCurr);
      records.push({ iter: iter + 1, xPrev, xCurr, fPrev, fCurr, xNew, xNext: xNew, error });

      xPrev = xCurr;
      xCurr = xNew;
      iter++;
    } while (iter < this.maxIter && error > this.tolerance);

    return { root: xNew, iterations: iter, records };
  }
}
