import { compile, derivative } from "mathjs";

// ห่อสมการ f(x) ที่ผู้ใช้พิมพ์ (compile ครั้งเดียว แล้วเรียก at() ได้หลายครั้ง)
export default class MathFunction {
  constructor(expression) {
    if (typeof expression !== "string" || expression.trim() === "") {
      throw new Error("กรุณากรอกสมการ");
    }
    this.expression = expression;
    try {
      this.compiled = compile(expression);
    } catch {
      throw new Error(`สมการไม่ถูกต้อง: ${expression}`);
    }
  }

  at(x) {
    return Number(this.compiled.evaluate({ x }));
  }

  derivative() {
    return new MathFunction(derivative(this.expression, "x").toString());
  }

  // จุดสำหรับวาดกราฟ: ค่าที่คำนวณไม่ได้จะเป็น NaN แทนการ throw
  sample(start, end, count = 100) {
    const a = Number(start);
    const b = Number(end);
    const xs = [];
    const ys = [];
    if (!Number.isFinite(a) || !Number.isFinite(b) || a === b) return { xs, ys };
    const step = (b - a) / count;
    for (let i = 0; i <= count; i++) {
      const x = a + i * step;
      let y;
      try {
        y = this.at(x);
      } catch {
        y = NaN;
      }
      xs.push(x);
      ys.push(y);
    }
    return { xs, ys };
  }

  static trySample(expression, start, end, count) {
    try {
      return new MathFunction(expression).sample(start, end, count);
    } catch {
      return { xs: [], ys: [] };
    }
  }
}
