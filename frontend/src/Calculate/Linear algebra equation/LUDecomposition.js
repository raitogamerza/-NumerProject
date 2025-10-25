export function luDecompositionMethod(A, B, eps = 1e-6) {
  const n = A.length;
  if (!n || !A.every(r => r.length === n)) throw new Error("A ต้องเป็นเมทริกซ์ N×N");
  if (!Array.isArray(B) || B.length !== n) throw new Error("B ต้องมีขนาด N");

  // แปลงเป็นตัวเลข
  A = A.map(r => r.map(Number));
  B = B.map(Number);
  if (A.flat().some(isNaN) || B.some(isNaN)) throw new Error("กรอกค่าไม่ถูกต้อง");

  // เตรียม L และ U
  const L = Array.from({ length: n }, () => Array(n).fill(0));
  const U = Array.from({ length: n }, () => Array(n).fill(0));

  // --- Doolittle's LU Decomposition ---
  for (let i = 0; i < n; i++) {
    // คำนวณ U[i][j]
    for (let j = i; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < i; k++) sum += L[i][k] * U[k][j];
      U[i][j] = A[i][j] - sum;
    }

    // คำนวณ L[j][i]
    for (let j = i; j < n; j++) {
      if (Math.abs(U[i][i]) < eps) return { X: null, detA: 0, singular: true };
      let sum = 0;
      for (let k = 0; k < i; k++) sum += L[j][k] * U[k][i];
      L[j][i] = (A[j][i] - sum) / U[i][i];
    }
  }

  // --- Forward Substitution: L * Y = B ---
  const Y = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let k = 0; k < i; k++) sum += L[i][k] * Y[k];
    Y[i] = B[i] - sum;
  }

  // --- Back Substitution: U * X = Y ---
  const X = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let k = i + 1; k < n; k++) sum += U[i][k] * X[k];
    if (Math.abs(U[i][i]) < eps) return { X: null, detA: 0, singular: true };
    X[i] = (Y[i] - sum) / U[i][i];
  }

  // --- determinant ---
  const detA = U.reduce((acc, row, i) => acc * row[i], 1);

  return { L, U, Y, X, detA, singular: false };
}
