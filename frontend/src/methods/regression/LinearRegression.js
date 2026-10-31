import RegressionMethod from "./RegressionMethod";

export default class LinearRegression extends RegressionMethod {
  static methodName = "Linear Regression";

  compute() {
    const xs = this.points.map((p) => Number(p.x));
    const ys = this.points.map((p) => Number(p.y));
    const n = xs.length;
    const sumX = xs.reduce((a, b) => a + b, 0);
    const sumY = ys.reduce((a, b) => a + b, 0);
    const sumXY = xs.reduce((s, xi, i) => s + xi * ys[i], 0);
    const sumX2 = xs.reduce((s, xi) => s + xi * xi, 0);

    const a1 = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const a0 = (sumY - a1 * sumX) / n;
    const predict = (x) => a0 + a1 * x;
    const xValue = Number(this.params.xValue) || 0;

    return {
      equation: `f(x) = ${a0.toFixed(4)} + ${a1.toFixed(4)}x`,
      a0,
      a1,
      coefficients: [a0, a1],
      yPred: predict(xValue),
      plot: this.curve(predict, Math.min(...xs), Math.max(...xs)),
    };
  }
}
