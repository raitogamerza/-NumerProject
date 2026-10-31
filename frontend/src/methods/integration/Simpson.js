import IntegrationMethod from "./IntegrationMethod";

export default class Simpson extends IntegrationMethod {
  static methodName = "Simpson";

  compute() {
    const { a, b } = this;
    const h = (b - a) / 2;
    const xMid = (a + b) / 2;
    const fa = this.f.at(a);
    const fMid = this.f.at(xMid);
    const fb = this.f.at(b);
    const result = (h / 3) * (fa + 4 * fMid + fb);

    return {
      result,
      steps: [
        `h = ( ${b} - ${a} ) / 2 = ${h}`,
        `f(${a}) = ${fa.toFixed(4)}`,
        `f(${xMid}) = ${fMid.toFixed(4)}`,
        `f(${b}) = ${fb.toFixed(4)}`,
        `I = ( ${h} / 3 ) * ( ${fa.toFixed(4)} + 4 * ${fMid.toFixed(4)} + ${fb.toFixed(4)} ) = ${result.toFixed(6)}`,
      ],
    };
  }
}
