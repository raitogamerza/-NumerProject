export function gaussEliminationMethod(A, B, eps = 1e-6) {
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

  // --- Forward Elimination ---
  for (let i = 0; i < n; i++) {
    // หา pivot
    let p = i;
    for (let r = i + 1; r < n; r++)
      if (Math.abs(aug[r][i]) > Math.abs(aug[p][i])) p = r;

    // ถ้า pivot ใกล้ศูนย์ → เป็นเอกฐาน
    if (Math.abs(aug[p][i]) < eps)
      return { X: null, detA: 0, singular: true };

    // สลับแถว (เปลี่ยนสัญญาณ determinant)
    if (p !== i) [aug[i], aug[p]] = [aug[p], aug[i]], (sign *= -1);

    detA *= aug[i][i]; // คูณค่า pivot เข้า det

    // ลบค่าในคอลัมน์ i ด้านล่าง
    for (let r = i + 1; r < n; r++) {
      const f = aug[r][i] / aug[i][i];
      for (let c = i; c <= n; c++) aug[r][c] -= f * aug[i][c];
    }
  }
  detA *= sign;

  // --- Back Substitution ---
  const X = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = aug[i][n];
    for (let j = i + 1; j < n; j++) sum -= aug[i][j] * X[j];
    X[i] = sum / aug[i][i];
  }

  return { X, detA, singular: false };
}
