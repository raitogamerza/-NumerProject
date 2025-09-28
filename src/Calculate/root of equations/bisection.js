import { evaluate } from 'mathjs';

// บันทึก error ต่อรอบ: ใช้สองแบบ
//   errApprox = |c_k - c_{k-1}| (เริ่มรอบแรก = null)
//   errFunc   = |f(c_k)|
export function bisectionMethod(fx, x0, x1, tol = 0.000001, maxIter = 1000) {
  let xl = parseFloat(x0);
  let xr = parseFloat(x1);
  const tolerance = parseFloat(tol);
  let iter = 0;
  let xm, fxl, fxr, fxm;
  let prevC = null;
  const records = [];

  if (isNaN(xl) || isNaN(xr) || isNaN(tolerance) || typeof fx !== 'string' || fx.trim() === '') {
    throw new Error('กรุณากรอกข้อมูลให้ครบ');
  }

  do {
    xm = (xl + xr) / 2;
    fxl = evaluate(fx, { x: xl });
    fxr = evaluate(fx, { x: xr });
    fxm = evaluate(fx, { x: xm });

    
    records.push({ a: xl, b: xr, c: xm});
    prevC = xm;

    if (fxm * fxl < 0) {
      xr = xm;
    } else {
      xl = xm;
    }
    iter++;
  } while (Math.abs(fxm) > tolerance && iter < maxIter);

  return { root: xm, iterations: iter, records };
}