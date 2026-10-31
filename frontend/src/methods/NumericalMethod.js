// คลาสแม่ (abstract) ของทุกวิธีเชิงตัวเลข
// ใช้ Template Method: solve() = validate() -> compute(); subclass override compute() (และ validate() ถ้าจำเป็น)
export default class NumericalMethod {
  // ชื่อวิธี ใช้เป็น key ในฐานข้อมูล (ต้องตรงกับ backend/src/constants/methods.js)
  static methodName = "";

  constructor(params = {}) {
    if (new.target === NumericalMethod) {
      throw new Error("NumericalMethod เป็น abstract class");
    }
    this.params = params;
  }

  get methodName() {
    return this.constructor.methodName;
  }

  validate() {}

  compute() {
    throw new Error(`${this.constructor.name} ต้อง implement compute()`);
  }

  solve() {
    this.validate();
    return this.compute();
  }

  static toNumber(value, label = "ค่า") {
    const n = typeof value === "number" ? value : parseFloat(value);
    if (!Number.isFinite(n)) throw new Error(`${label} ไม่ถูกต้อง`);
    return n;
  }
}
