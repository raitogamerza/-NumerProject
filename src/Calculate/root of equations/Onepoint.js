import {evaluate} from 'mathjs';

export function onePointIteration(gx, x0, tol = 0.000001, maxIter = 1000) {
  let x = parseFloat(x0);
  const tolerance = parseFloat(tol);
  let iter = 0;
  let records = [];

  if (isNaN(x) || isNaN(tolerance) || typeof gx !== 'string' || gx.trim() === '') {
    throw new Error('กรุณากรอกข้อมูลให้ครบ');
  }
  

  let xNew;
  do {
    xNew = evaluate(gx, { x }); // คำนวณ g(x)
    records.push({ iter: iter + 1, xOld: x, xNew, error: Math.abs(xNew - x) });

    if (Math.abs(xNew - x) < tolerance) break; // หยุดเมื่อเข้าใกล้ root

    x = xNew;
    iter++;
  } while (iter < maxIter);

  return { root: xNew, iterations: iter + 1, records };
}
