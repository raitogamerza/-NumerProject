import NumericalMethod from "../NumericalMethod";
import MathFunction from "../MathFunction";

// คลาสแม่ของวิธีหารากสมการ: เตรียม f(x), tolerance และ maxIter ให้ subclass
export default class RootFindingMethod extends NumericalMethod {
  static category = "root-of-equations";

  constructor({ fx, tol, maxIter = 1000, ...rest } = {}) {
    super({ fx, tol, maxIter, ...rest });
    this.maxIter = maxIter;
  }

  validate() {
    this.f = new MathFunction(this.params.fx);
    this.tolerance = NumericalMethod.toNumber(this.params.tol, "tolerance");
  }

  static summarize({ root, iterations }) {
    return { root, iterations };
  }
}
