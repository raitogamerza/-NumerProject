export function gaussJordanMethod(A, B, eps = 1e-6) {
  const n = A.length;
  if (!n || !A.every(r => r.length === n)) throw new Error("A ต้องเป็นเมทริกซ์ N×N");
  if (!Array.isArray(B) || B.length !== n) throw new Error("B ต้องมีขนาด N");

  // แปลงเป็นตัวเลข
  A = A.map(r => r.map(Number));
  B = B.map(Number);
  if (A.flat().some(isNaN) || B.some(isNaN)) throw new Error("กรอกค่าไม่ถูกต้อง");

  // รวม A กับ B เป็นเมทริกซ์ขยาย [A|B]
  const aug = A.map((r, i) => [...r, B[i]]);
  let detA = 1;
  let sign = 1;

  // --- Gauss-Jordan Elimination ---
  for (let i = 0; i < n; i++) {
    // หา pivot
    let p = i;
    for (let r = i + 1; r < n; r++)
      if (Math.abs(aug[r][i]) > Math.abs(aug[p][i])) p = r;

    if (Math.abs(aug[p][i]) < eps)
      return { X: null, detA: 0, singular: true };

    if (p !== i) [aug[i], aug[p]] = [aug[p], aug[i]], (sign *= -1);

    const pivot = aug[i][i];
    detA *= pivot;

    // ทำให้ pivot เป็น 1
    for (let j = 0; j <= n; j++) aug[i][j] /= pivot;

    // กำจัดค่าในคอลัมน์อื่น
    for (let r = 0; r < n; r++) {
      if (r === i) continue;
      const f = aug[r][i];
      for (let j = 0; j <= n; j++) aug[r][j] -= f * aug[i][j];
    }
  }

  detA *= sign;

  // --- ดึงคำตอบออก ---
  const X = aug.map(r => r[n]);
  return { X, detA, singular: false };
}
