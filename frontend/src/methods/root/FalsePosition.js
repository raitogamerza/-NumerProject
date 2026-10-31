import BracketingMethod from "./BracketingMethod";

export default class FalsePosition extends BracketingMethod {
  static methodName = "False Position";

  nextPoint(xl, xr, fxl, fxr) {
    return (xl * fxr - xr * fxl) / (fxr - fxl);
  }
}
