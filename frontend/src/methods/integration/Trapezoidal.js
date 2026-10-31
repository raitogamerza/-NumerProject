import IntegrationMethod from "./IntegrationMethod";

export default class Trapezoidal extends IntegrationMethod {
  static methodName = "Trapezoidal";

  compute() {
    const { a, b } = this;
    const h = b - a;
    const fa = this.f.at(a);
    const fb = this.f.at(b);
    const result = (h / 2) * (fa + fb);

    return {
      result,
      steps: [
        `h = ( ${b} - ${a} ) = ${h}`,
        `f(x0 = ${a}) = ${fa.toFixed(4)}`,
        `f(x1 = ${b}) = ${fb.toFixed(4)}`,
        `I = ( ${h} / 2 ) * ( ${fa.toFixed(4)} + ${fb.toFixed(4)} ) = ${result.toFixed(6)}`,
      ],
    };
  }
}
