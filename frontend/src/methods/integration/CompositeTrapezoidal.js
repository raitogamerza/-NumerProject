import IntegrationMethod from "./IntegrationMethod";

export default class CompositeTrapezoidal extends IntegrationMethod {
  static methodName = "Composite Trapezoidal";
  static needsN = true;

  compute() {
    const { a, b, n } = this;
    const h = (b - a) / n;
    const nodes = this.nodes(n);
    const inner = nodes.slice(1, -1).reduce((s, p) => s + p.fxi, 0);
    const result = (h / 2) * (nodes[0].fxi + nodes[n].fxi + 2 * inner);

    return {
      result,
      steps: [
        `h = ( ${b} - ${a} ) / ${n} = ${h}`,
        ...nodes.map((p) => `f(x${p.i} = ${p.xi}) = ${p.fxi.toFixed(4)}`),
        `I = ${result.toFixed(6)}`,
      ],
    };
  }
}
