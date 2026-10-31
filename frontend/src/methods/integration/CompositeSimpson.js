import IntegrationMethod from "./IntegrationMethod";

export default class CompositeSimpson extends IntegrationMethod {
  static methodName = "Composite Simpson";
  static needsN = true;

  compute() {
    const { a, b, n } = this;
    const intervals = 2 * n;
    const h = (b - a) / intervals;
    const nodes = this.nodes(intervals);
    const inner = nodes.slice(1, -1);
    const sumOdd = inner.filter((p) => p.i % 2 === 1).reduce((s, p) => s + p.fxi, 0);
    const sumEven = inner.filter((p) => p.i % 2 === 0).reduce((s, p) => s + p.fxi, 0);
    const f0 = nodes[0].fxi;
    const fN = nodes[intervals].fxi;
    const result = (h / 3) * (f0 + fN + 4 * sumOdd + 2 * sumEven);

    return {
      result,
      steps: [
        `h = ( ${b} - ${a} ) / (2 * ${n}) = ${h}`,
        ...nodes.map((p) => `f(x${p.i} = ${p.xi}) = ${p.fxi.toFixed(4)}`),
        `I = ( ${h} / 3 ) [ ${f0.toFixed(4)} + ${fN.toFixed(4)} + 4(${sumOdd.toFixed(6)}) + 2(${sumEven.toFixed(6)}) ]`,
        `I = ${result.toFixed(6)}`,
      ],
    };
  }
}
