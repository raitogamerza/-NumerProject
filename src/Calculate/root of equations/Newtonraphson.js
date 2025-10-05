import { evaluate, derivative } from "mathjs";

export function NewtonraphsonMethod(fx,x0,tol,maxIter=1000) {
    let x = parseFloat(x0);
    const tolerance = parseFloat(tol);
    let iter = 0;
    let records = [];

    if (isNaN(x) || isNaN(tolerance) || typeof fx !== 'string' || fx.trim() === '') {
      throw new Error('กรุณากรอกข้อมูลให้ครบ');
    }
    
    const f = (x) => evaluate(fx, { x });
    const df = (x) => derivative(fx, 'x').evaluate({ x });
    let xNew;
    
    do {
        const fxVal = f(x);
        const dfxVal = df(x);
        
        if (dfxVal === 0){
            throw new Error ('อนุพันธ์เป็นศูนย์ ไม่สามารถหาคำตอบต่อได้');
        }


        xNew = x - fxVal / dfxVal;
        records.push({ iter: iter + 1, x: x, fx : fxVal, dfx : dfxVal, xNext : xNew, error : Math.abs(xNew - x) });
        
        iter++
        x = xNew;
    
    } while (iter < maxIter &&  Math.abs(f(x)) > tolerance);
    
  return ({ root: xNew, iterations: iter,records });
}