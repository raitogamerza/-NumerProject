import NumericalMethod from "../NumericalMethod";
import RootFindingMethod from "./RootFindingMethod";

// วิธีแบบปิดช่วง [xl, xr]: subclass กำหนดแค่ nextPoint() ว่าจะเลือกจุดใหม่อย่างไร
export default class BracketingMethod extends RootFindingMethod {
  validate() {
    super.validate();
    this.xl = NumericalMethod.toNumber(this.params.x0, "x0");
    this.xr = NumericalMethod.toNumber(this.params.x1, "x1");
  }

  nextPoint() {
    throw new Error(`${this.constructor.name} ต้อง implement nextPoint()`);
  }

  shouldContinue(xm, fxm, xl, xr) {
    return Math.abs(fxm) > this.tolerance && Math.abs(xr - xl) > this.tolerance;
  }

  compute() {
    let { xl, xr } = this;
    let fxl = this.f.at(xl);
    let fxr = this.f.at(xr);
    if (fxl * fxr > 0) {
      console.warn("คำเตือน: f(xl) และ f(xr) มีเครื่องหมายเดียวกัน อาจไม่มีรากในช่วงนี้");
    }

    const records = [];
    let iter = 0;
    let xm, fxm;
    do {
      xm = this.nextPoint(xl, xr, fxl, fxr);
      fxm = this.f.at(xm);
      records.push({ a: xl, b: xr, c: xm, xl, xr, xm, fxl, fxr, fxm });

      if (fxm * fxl < 0) {
        xr = xm;
        fxr = fxm;
      } else {
        xl = xm;
        fxl = fxm;
      }
      iter++;
    } while (iter < this.maxIter && this.shouldContinue(xm, fxm, xl, xr));

    return { root: xm, iterations: iter, records };
  }
}
