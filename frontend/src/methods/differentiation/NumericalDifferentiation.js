import { derivative, evaluate } from "mathjs";
import NumericalMethod from "../NumericalMethod";
import MathFunction from "../MathFunction";

// ตารางสูตร: FORMULAS[order][direction][error](f, x, h)
// อันดับ Third/Fourth มีสูตรเดียวต่อทิศทาง (ไม่ขึ้นกับ error) จึงใช้ key "any"
const FORMULAS = {
  First: {
    "Forward Difference": {
      Oh: (f, x, h) => (f(x + h) - f(x)) / h,
      "Oh^2": (f, x, h) => (-f(x + 2 * h) + 4 * f(x + h) - 3 * f(x)) / (2 * h),
      "Oh^4": (f, x, h) =>
        (-25 * f(x) + 48 * f(x + h) - 36 * f(x + 2 * h) + 16 * f(x + 3 * h) - 3 * f(x + 4 * h)) / (12 * h),
    },
    "Backward Difference": {
      Oh: (f, x, h) => (f(x) - f(x - h)) / h,
      "Oh^2": (f, x, h) => (3 * f(x) - 4 * f(x - h) + f(x - 2 * h)) / (2 * h),
      "Oh^4": (f, x, h) =>
        (25 * f(x) - 48 * f(x - h) + 36 * f(x - 2 * h) - 16 * f(x - 3 * h) + 3 * f(x - 4 * h)) / (12 * h),
    },
    "Central Difference": {
      "Oh^2": (f, x, h) => (f(x + h) - f(x - h)) / (2 * h),
      "Oh^4": (f, x, h) => (-f(x + 2 * h) + 8 * f(x + h) - 8 * f(x - h) + f(x - 2 * h)) / (12 * h),
    },
  },
  Second: {
    "Forward Difference": {
      Oh: (f, x, h) => (f(x + 2 * h) - 2 * f(x + h) + f(x)) / (h * h),
      "Oh^2": (f, x, h) => (-f(x + 3 * h) + 4 * f(x + 2 * h) - 5 * f(x + h) + 2 * f(x)) / (h * h),
    },
    "Backward Difference": {
      Oh: (f, x, h) => (f(x) - 2 * f(x - h) + f(x - 2 * h)) / (h * h),
      "Oh^2": (f, x, h) => (2 * f(x) - 5 * f(x - h) + 4 * f(x - 2 * h) - f(x - 3 * h)) / (h * h),
    },
    "Central Difference": {
      "Oh^2": (f, x, h) => (f(x + h) - 2 * f(x) + f(x - h)) / (h * h),
      "Oh^4": (f, x, h) =>
        (-f(x + 2 * h) + 16 * f(x + h) - 30 * f(x) + 16 * f(x - h) - f(x - 2 * h)) / (12 * h * h),
    },
  },
  Third: {
    "Forward Difference": {
      any: (f, x, h) => (f(x + 3 * h) - 3 * f(x + 2 * h) + 3 * f(x + h) - f(x)) / h ** 3,
    },
    "Backward Difference": {
      any: (f, x, h) => (f(x) - 3 * f(x - h) + 3 * f(x - 2 * h) - f(x - 3 * h)) / h ** 3,
    },
    "Central Difference": {
      any: (f, x, h) => (f(x + 2 * h) - 2 * f(x + h) + 2 * f(x - h) - f(x - 2 * h)) / (2 * h ** 3),
    },
  },
  Fourth: {
    "Forward Difference": {
      any: (f, x, h) => (f(x + 4 * h) - 4 * f(x + 3 * h) + 6 * f(x + 2 * h) - 4 * f(x + h) + f(x)) / h ** 4,
    },
    "Backward Difference": {
      any: (f, x, h) => (f(x) - 4 * f(x - h) + 6 * f(x - 2 * h) - 4 * f(x - 3 * h) + f(x - 4 * h)) / h ** 4,
    },
    "Central Difference": {
      any: (f, x, h) => (f(x - 2 * h) - 4 * f(x - h) + 6 * f(x) - 4 * f(x + h) + f(x + 2 * h)) / h ** 4,
    },
  },
};

const ORDER_INFO = {
  First: { n: 1, symbol: "f'(x)" },
  Second: { n: 2, symbol: "f''(x)" },
  Third: { n: 3, symbol: "f‴(x)" },
  Fourth: { n: 4, symbol: "f⁽⁴⁾(x)" },
};

export default class NumericalDifferentiation extends NumericalMethod {
  static methodName = "Numerical Differentiation";
  static category = "differentiation";
  static ORDERS = Object.keys(FORMULAS);
  static DIRECTIONS = ["Forward Difference", "Backward Difference", "Central Difference"];
  static ERRORS = ["Oh", "Oh^2", "Oh^4"];

  validate() {
    const { fx, x, h, order, direction, error } = this.params;
    this.f = new MathFunction(fx);
    this.x = NumericalMethod.toNumber(x, "x");
    this.h = NumericalMethod.toNumber(h, "h");
    const table = FORMULAS[order]?.[direction];
    this.formula = table?.[error] ?? table?.any;
    if (!this.formula) {
      throw new Error(`ไม่มีสูตร ${order} derivative แบบ ${direction} ที่ error ${error}`);
    }
    this.info = ORDER_INFO[order];
  }

  exactDerivative() {
    let expr = this.params.fx;
    for (let i = 0; i < this.info.n; i++) expr = derivative(expr, "x").toString();
    return evaluate(expr, { x: this.x });
  }

  compute() {
    const approx = this.formula((v) => this.f.at(v), this.x, this.h);
    const exact = this.exactDerivative();
    const error = Math.abs(((approx - exact) / exact) * 100);
    return { orderSymbol: this.info.symbol, approx, exact, error };
  }

  static summarize({ approx, exact, error }) {
    return { approx, exact, error };
  }
}
