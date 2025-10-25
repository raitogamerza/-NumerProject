export function matrixInvert(AInput, BInput, eps = 1e-6) {
  const toNum = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : NaN;
  };

  if (!Array.isArray(AInput) || !AInput.length) {
    throw new Error("A ต้องเป็นเมทริกซ์ขนาด N×N");
  }
  const N = AInput.length;
  if (!AInput.every((row) => Array.isArray(row) && row.length === N)) {
    throw new Error("A ต้องเป็นเมทริกซ์สี่เหลี่ยม N×N");
  }
  if (!Array.isArray(BInput) || BInput.length !== N) {
    throw new Error("B ต้องมีขนาด N");
  }

  const A = AInput.map((row) => row.map(toNum));
  const B = BInput.map(toNum);
  if (A.some((r) => r.some((v) => !Number.isFinite(v)))) {
    throw new Error("กรุณากรอกค่าเมทริกซ์ A ให้ครบและเป็นตัวเลข");
  }
  if (B.some((v) => !Number.isFinite(v))) {
    throw new Error("กรุณากรอกเวกเตอร์ B ให้ครบและเป็นตัวเลข");
  }

  const tol = Number.isFinite(Number(eps)) ? Number(eps) : 1e-6;

  // 1) คำนวณ det(A) ด้วย Gaussian elimination + partial pivoting
  const U = A.map((row) => row.slice());
  let detSign = 1;

  for (let i = 0; i < N; i++) {
    // หา pivot แถวที่คอลัมน์ i
    let p = i;
    for (let r = i + 1; r < N; r++) {
      if (Math.abs(U[r][i]) > Math.abs(U[p][i])) p = r;
    }
    if (Math.abs(U[p][i]) < tol) {
      return { X: null, invA: null, detA: 0, singular: true };
    }
    if (p !== i) {
      [U[i], U[p]] = [U[p], U[i]];
      detSign *= -1;
    }
    // eliminate
    for (let r = i + 1; r < N; r++) {
      const factor = U[r][i] / U[i][i];
      for (let c = i; c < N; c++) U[r][c] -= factor * U[i][c];
    }
  }
  let detA = detSign;
  for (let i = 0; i < N; i++) detA *= U[i][i];

  // 2) หา inverse(A) ด้วย Gauss-Jordan (partial pivoting)
  const I = Array.from({ length: N }, (_, i) =>
    Array.from({ length: N }, (_, j) => (i === j ? 1 : 0))
  );
  const aug = A.map((row, i) => [...row, ...I[i]]);

  for (let i = 0; i < N; i++) {
    let p = i;
    for (let r = i + 1; r < N; r++) {
      if (Math.abs(aug[r][i]) > Math.abs(aug[p][i])) p = r;
    }
    if (Math.abs(aug[p][i]) < tol) {
      return { X: null, invA: null, detA, singular: true };
    }
    if (p !== i) [aug[i], aug[p]] = [aug[p], aug[i]];

    const pivot = aug[i][i];
    for (let j = 0; j < 2 * N; j++) aug[i][j] /= pivot;

    for (let k = 0; k < N; k++) {
      if (k === i) continue;
      const factor = aug[k][i];
      if (factor === 0) continue;
      for (let j = 0; j < 2 * N; j++) {
        aug[k][j] -= factor * aug[i][j];
      }
    }
  }

  const invA = aug.map((row) => row.slice(N));
  const X = invA.map((row) => row.reduce((s, v, j) => s + v * B[j], 0));

  return { X, invA, detA, singular: false };
}
