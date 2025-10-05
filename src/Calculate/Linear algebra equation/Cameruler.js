import { det } from "mathjs";

export function CameruleMethod(AInput, BInput, eps = 1e-6) {
  const toNum = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : NaN;
  };

  if (!Array.isArray(AInput) || !Array.isArray(BInput)) {
    throw new Error("A และ B ต้องเป็นอาเรย์");
  }
  const N = AInput.length;
  if (N === 0) throw new Error("เมทริกซ์ว่าง");
  if (!AInput.every((row) => Array.isArray(row) && row.length === N)) {
    throw new Error("A ต้องเป็นเมทริกซ์ N×N");
  }
  if (BInput.length !== N) {
    throw new Error("B ต้องมีขนาด N");
  }

  const A = AInput.map((row) => row.map(toNum));
  const B = BInput.map(toNum);

  if (A.some((row) => row.some((v) => !Number.isFinite(v))))
    throw new Error("กรุณากรอกค่าเมทริกซ์ A ให้ครบและเป็นตัวเลข");
  if (B.some((v) => !Number.isFinite(v)))
    throw new Error("กรุณากรอกเวกเตอร์ B ให้ครบและเป็นตัวเลข");

  const tolerance = Number.isFinite(Number(eps)) ? Number(eps) : 1e-12;

  const dA = det(A);
  if (Math.abs(dA) < tolerance) {
    // singular หรือเกือบเอกฐาน
    return { detA: dA, X: null, singular: true };
  }

  const X = [];
  for (let k = 0; k < N; k++) {
    const Ak = A.map((row, i) => row.map((val, j) => (j === k ? B[i] : val)));
    const dAk = det(Ak);
    X.push(dAk / dA);
  }

  return { detA: dA, X, singular: false };
}