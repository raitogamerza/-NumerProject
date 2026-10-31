import RegressionMethod from "./RegressionMethod";

// แต่ละจุดมีรูปแบบ { x1, x2, ..., xk, y }
export default class MultipleLinearRegression extends RegressionMethod {
  static methodName = "Multiple Linear Regression";

  get numVars() {
    return Math.max(1, Number(this.params.numVars) || 1);
  }

  minPoints() {
    return this.numVars + 1;
  }

  isFilled(point) {
    const keys = [...Array.from({ length: this.numVars }, (_, i) => `x${i + 1}`), "y"];
    return keys.every((k) => point[k] !== "" && point[k] != null);
  }

  compute() {
    const k = this.numVars;
    const xsOf = (p) => Array.from({ length: k }, (_, i) => Number(p[`x${i + 1}`]));
    const rows = this.points.map((p) => [1, ...xsOf(p)]);
    const ys = this.points.map((p) => Number(p.y));

    const A = RegressionMethod.solveNormalEquations(rows, ys);
    const predict = (xv) => A[0] + xv.reduce((s, v, i) => s + A[i + 1] * v, 0);
    const xValues = Array.from({ length: k }, (_, i) => Number(this.params.xValues?.[i]) || 0);

    // R²
    const yMean = ys.reduce((s, y) => s + y, 0) / ys.length;
    const yHat = this.points.map((p) => predict(xsOf(p)));
    const ssRes = ys.reduce((s, y, i) => s + (y - yHat[i]) ** 2, 0);
    const ssTot = ys.reduce((s, y) => s + (y - yMean) ** 2, 0);

    const equation =
      "y = " + A.map((c, i) => (i === 0 ? c.toFixed(4) : ` + (${c.toFixed(4)})x${i}`)).join("");

    return {
      coefficients: A,
      equation,
      yPred: predict(xValues),
      r2: 1 - ssRes / ssTot,
      plot: this.projection(A, xsOf),
    };
  }

  // เส้น regression บนแกน x1 โดยตรึง x2..xk ไว้ที่ค่าเฉลี่ย
  projection(A, xsOf) {
    const k = this.numVars;
    const all = this.points.map(xsOf);
    const means = Array.from({ length: k }, (_, i) => all.reduce((s, r) => s + r[i], 0) / all.length);
    const x1s = all.map((r) => r[0]);
    const min = Math.min(...x1s);
    const max = Math.max(...x1s);
    const step = (max - min) / 60 || 1;

    const lineX = [];
    for (let v = min - step * 2; v <= max + step * 2; v += step) lineX.push(v);
    const lineY = lineX.map((x1) => A[0] + A[1] * x1 + means.slice(1).reduce((s, m, i) => s + A[i + 2] * m, 0));

    return {
      regressionLine: { x: lineX, y: lineY },
      points: Array.from({ length: k }, (_, i) => ({
        x: all.map((r) => r[i]),
        y: this.points.map((p) => Number(p.y)),
        name: `x${i + 1}`,
      })),
    };
  }
}
