import RegressionMethod from "./RegressionMethod";

export default class PolynomialRegression extends RegressionMethod {
  static methodName = "Polynomial Regression";

  compute() {
    const order = Math.max(1, Number(this.params.order) || 1);
    const xs = this.points.map((p) => Number(p.x));
    const ys = this.points.map((p) => Number(p.y));
    const rows = xs.map((x) => Array.from({ length: order + 1 }, (_, i) => x ** i));

    const coefficients = RegressionMethod.solveNormalEquations(rows, ys);
    const predict = (x) => coefficients.reduce((s, a, i) => s + a * x ** i, 0);
    const xValue = Number(this.params.xValue) || 0;

    return {
      equation: "f(x) = " + coefficients.map((a, i) => `${a.toFixed(4)}x^${i}`).join(" + "),
      coefficients,
      yPred: predict(xValue),
      plot: this.curve(predict, Math.min(...xs), Math.max(...xs)),
    };
  }
}
