import { evaluate } from 'mathjs';

export function FalsepositionMethod(fx, x0, x1, tol = 0.000001, maxIter = 1000) {
    let xl = parseFloat(x0);
    let xr = parseFloat(x1);
    const tolerance = parseFloat(tol);
    let iter = 0;
    const records = [];
    let prevXm = null;

    if (isNaN(xl) || isNaN(xr) || isNaN(tolerance) || typeof fx !== 'string' || fx.trim() === '') {
        throw new Error('กรุณากรอกข้อมูลให้ครบ');
    }

    // Evaluate endpoints first (เดิมใช้ก่อนนิยามทำให้ fxr undefined)
    let fxl = evaluate(fx, { x: xl });
    let fxr = evaluate(fx, { x: xr });

    if (fxl * fxr > 0) {
        console.warn('คำเตือน: f(xl) และ f(xr) มีเครื่องหมายเดียวกัน อาจไม่มีรากในช่วงนี้');
    }

    let xm, fxm;
    do {
        // False position formula
        xm = (xl * fxr - xr * fxl) / (fxr - fxl);
        fxm = evaluate(fx, { x: xm });

        // Push record with both naming styles for compatibility
        records.push({a: xl,b: xr,c: xm,xl,xr,xm,fxl,fxr,fxm});
        prevXm = xm;

        // Update interval
        if (fxm * fxl < 0) {
            xr = xm;
            fxr = fxm;
        } else {
            xl = xm;
            fxl = fxm;
        }
        iter++;
    } while (Math.abs(xr - xl) > tolerance && iter < maxIter && Math.abs(fxm) > tolerance);

    return { root: xm, iterations: iter, records };
}