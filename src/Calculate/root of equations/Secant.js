import { evaluate } from 'mathjs';

export function SecantMethod(fx, x0, x1, tol, maxIter = 1000) {
  let records = [];
  let iter = 0;
  const  f = (x ) => evaluate(fx, { x });
  let xPrev = parseFloat(x0);
  let xCurr = parseFloat(x1);
  const tolerance = parseFloat(tol);
  
  if (isNaN(xPrev) || isNaN(xCurr) || isNaN(tolerance) || typeof fx !== 'string' || fx.trim() === '') {
    throw new Error('กรุณากรอกข้อมูลให้ครบ');
  }
  
  let xNew;
  let error;
  
  do {
    const fPrev = f(xPrev);
    const fCurr = f(xCurr);

    if (fCurr - fPrev === 0) {
      throw new Error('การหารด้วยศูนย์ ไม่สามารถหาคำตอบต่อได้');
    }

    xNew = xCurr - fCurr * (xCurr - xPrev) / (fCurr - fPrev);
    error = Math.abs(xNew - xCurr);
    records.push({ iter: iter + 1, xPrev, xCurr, fPrev, fCurr, xNew, error });
    
    xPrev = xCurr;
    xCurr = xNew;
    iter++;
  } while (iter < maxIter && error > tolerance);


  return ({ root: xNew, iterations: iter, records });
}
