import BracketingMethod from "./BracketingMethod";

export default class Bisection extends BracketingMethod {
  static methodName = "Bisection";

  nextPoint(xl, xr) {
    return (xl + xr) / 2;
  }

  shouldContinue(xm, fxm) {
    return Math.abs(fxm) > this.tolerance;
  }
}
