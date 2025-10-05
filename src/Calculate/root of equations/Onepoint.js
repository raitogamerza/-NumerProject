import {evaluate} from 'mathjs';

export function onePointIteration(gx, x0, tol, maxIter = 1000) {
  let x = parseFloat(x0);
  const tolerance = parseFloat(tol);
  let iter = 0;
  let records = [];

  if (isNaN(x) || isNaN(tolerance) || typeof gx !== 'string' || gx.trim() === '') {
    throw new Error('กรุณากรอกข้อมูลให้ครบ');
  }
  

  let xNew,error;
  do {
    xNew = evaluate(gx, { x });
    error = Math.abs(xNew - x) /  xNew;
    records.push({ iter: iter + 1, xOld: x, xNew, error: Math.abs(xNew - x) });

    x = xNew;
    iter++;
  } while (iter < maxIter && error > tolerance);

  if (iter >= maxIter && error > tolerance) {
    throw new Error('ไม่ลู่เข้าในจำนวนรอบที่กำหนด');
  }

  return { root: xNew, iterations: iter , records };
}