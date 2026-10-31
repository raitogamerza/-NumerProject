import { useCallback, useState } from "react";
import { historyService } from "../services";

// สร้าง instance ของ MethodClass, คำนวณ แล้วบันทึกลงประวัติในฐานข้อมูล (ไม่บล็อก UI ถ้าบันทึกไม่สำเร็จ)
export default function useCalculator(MethodClass) {
  const [historyVersion, setHistoryVersion] = useState(0);

  const run = useCallback(
    (input) => {
      const result = new MethodClass(input).solve();
      const output = MethodClass.summarize ? MethodClass.summarize(result) : null;
      historyService
        .record(MethodClass.methodName, input, output)
        .then(() => setHistoryVersion((v) => v + 1))
        .catch((err) => console.warn("บันทึกประวัติไม่สำเร็จ:", err.message));
      return result;
    },
    [MethodClass]
  );

  return { run, historyVersion };
}
