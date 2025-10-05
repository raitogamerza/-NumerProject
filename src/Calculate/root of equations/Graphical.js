import { evaluate } from "mathjs";

export function graphicalMethod(fx, a, b, step = 0.1) {
  const records = [];
  let root = null;

  let start = parseFloat(a);
  let end = parseFloat(b);
  let stepSize = parseFloat(step);
  if (isNaN(start) || isNaN(end)) throw new Error("ค่า start/finish ไม่ถูกต้อง");
  if (isNaN(stepSize) || stepSize <= 0) {
    const span = Math.abs(end - start);
    stepSize = span > 0 ? span / 50 : 0.1;
  }

  let prevX = start;
  let prevY;
  try { prevY = Number(evaluate(fx, { x: prevX })); } catch { prevY = NaN; }
  records.push({ x: prevX, fx: prevY, deltaX: null, absFx: Math.abs(prevY), signFlip: false });

  for (let currentX = start + stepSize; currentX <= end + 1e-12; currentX += stepSize) {
    let currentY;
    try { currentY = Number(evaluate(fx, { x: currentX })); } catch { currentY = NaN; }

    const signFlip = !isNaN(prevY) && !isNaN(currentY) && prevY * currentY < 0;
    if (signFlip && root === null) {
      root = Number(((prevX + currentX) / 2).toFixed(6));
    }

    records.push({
      x: currentX,
      fx: currentY,
      deltaX: Math.abs(currentX - prevX),
      absFx: Math.abs(currentY),
      signFlip,
    });

    if (root !== null) break; // หยุดเมื่อเจอ root แล้ว (ถ้าต้องการเก็บต่อคอมเมนต์บรรทัดนี้ออกได้)

    prevX = currentX;
    prevY = currentY;
  }

  return {
    root,
    iterations: records.length,
    records,
  };
}
