import NumericalMethod from "../NumericalMethod";
import RootFindingMethod from "./RootFindingMethod";

export default class Graphical extends RootFindingMethod {
  static methodName = "Graphical";

  validate() {
    super.validate();
    this.start = NumericalMethod.toNumber(this.params.start, "start");
    this.end = NumericalMethod.toNumber(this.params.end, "finish");
    const step = parseFloat(this.params.step);
    const span = Math.abs(this.end - this.start);
    this.step = Number.isFinite(step) && step > 0 ? step : span > 0 ? span / 50 : 0.1;
  }

  safeAt(x) {
    try {
      return this.f.at(x);
    } catch {
      return NaN;
    }
  }

  compute() {
    const records = [];
    let root = null;
    let prevX = this.start;
    let prevY = this.safeAt(prevX);
    records.push({ x: prevX, fx: prevY, deltaX: null, absFx: Math.abs(prevY), signFlip: false });

    for (let x = this.start + this.step; x <= this.end + 1e-12; x += this.step) {
      const y = this.safeAt(x);
      const signFlip = !isNaN(prevY) && !isNaN(y) && prevY * y < 0;
      if (signFlip) root = Number(((prevX + x) / 2).toFixed(6));

      records.push({ x, fx: y, deltaX: Math.abs(x - prevX), absFx: Math.abs(y), signFlip });
      if (root !== null) break;

      prevX = x;
      prevY = y;
    }

    return { root, iterations: records.length, records };
  }
}
