import NumericalMethod from "../NumericalMethod";
import MathFunction from "../MathFunction";

// คลาสแม่ของการอินทิเกรตเชิงตัวเลข: subclass คืน { result, steps } จาก compute()
export default class IntegrationMethod extends NumericalMethod {
  static category = "integration";
  // true = ต้องกรอกจำนวนช่วง n (composite rules)
  static needsN = false;

  validate() {
    const { fx, a, b, n } = this.params;
    this.f = new MathFunction(fx);
    this.a = NumericalMethod.toNumber(a, "a");
    this.b = NumericalMethod.toNumber(b, "b");
    if (this.constructor.needsN) {
      this.n = parseInt(n, 10);
      if (!Number.isInteger(this.n) || this.n <= 0) throw new Error("n ต้องเป็นจำนวนเต็มบวก");
    }
  }

  // จุด (i, xi, f(xi)) ที่แบ่งช่วง [a, b] ออกเป็น intervals ช่วงเท่ากัน
  nodes(intervals) {
    const h = (this.b - this.a) / intervals;
    return Array.from({ length: intervals + 1 }, (_, i) => {
      const xi = this.a + i * h;
      return { i, xi, fxi: this.f.at(xi) };
    });
  }

  static summarize({ result }) {
    return { result };
  }
}
