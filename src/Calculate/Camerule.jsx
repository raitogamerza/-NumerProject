import React, { useEffect, useMemo, useState } from "react";
import { CameruleMethod } from "./Linear algebra equation/Cameruler";

function Camerule() {
  const [n, setN] = useState(3);
  const [eps, setEps] = useState("0.000001");
  const [A, setA] = useState(() => Array.from({ length: 3 }, () => Array(3).fill("")));
  const [B, setB] = useState(() => Array(3).fill(""));
  const [X, setX] = useState(null); 
  const [detA, setDetA] = useState(null);
  const decimals = useMemo(() => {
    const m = String(eps).match(/0\.(0*)([1-9])/);
    if (!m) return 6;
    return m[1].length + 1;
  }, [eps]);

  useEffect(() => {
    const N = Math.max(1, Math.min(8, Number(n) || 1));
    setA((prev) => {
      const next = Array.from({ length: N }, (_, i) =>
        Array.from({ length: N }, (_, j) => (prev[i]?.[j] ?? ""))
      );
      return next;
    });
    setB((prev) => Array.from({ length: N }, (_, i) => (prev[i] ?? "")));
    setX(null);
    setDetA(null);
  }, [n]);

  const handleAChange = (i, j, val) => {
    setA((prev) => {
      const next = prev.map((row) => row.slice());
      next[i][j] = val;
      return next;
    });
  };
  const handleBChange = (i, val) => {
    setB((prev) => {
      const next = prev.slice();
      next[i] = val;
      return next;
    });
  };

  const resetAll = () => {
    setA(Array.from({ length: n }, () => Array(n).fill("")));
    setB(Array(n).fill(""));
    setX(null);
    setDetA(null);
  };

  const toNum = (v) => {
    const num = Number(v);
    return Number.isFinite(num) ? num : NaN;
  };

  const handleCalculate = () => {
    try {
      const { detA, X, singular } = CameruleMethod(A, B, eps);
      setDetA(detA);
      if (singular) {
        alert("det(A) = 0 หรือใกล้ศูนย์ ระบบสมการอาจไม่มีคำตอบเอกลักษณ์");
        setX(null);
        return;
      }
      setX(X);
    } catch (e) {
      alert("เกิดข้อผิดพลาดระหว่างคำนวณ: " + e.message);
    }
  };

  // UI: กล่องอินพุตเมทริกซ์
  const renderMatrixA = () => (
    <div className="grid gap-2"
         style={{ gridTemplateColumns: `repeat(${n}, minmax(60px, 1fr))` }}>
      {A.map((row, i) =>
        row.map((val, j) => (
          <input
            key={`${i}-${j}`}
            type="number"
            step="any"
            placeholder={`a${i + 1}${j + 1}`}
            value={val}
            onChange={(e) => handleAChange(i, j, e.target.value)}
            className="border rounded px-2 py-1 text-center"
          />
        ))
      )}
    </div>
  );

  const renderVector = (arr, onChange, placeholder) => (
    <div className="grid gap-2" style={{ gridTemplateRows: `repeat(${n}, 40px)` }}>
      {Array.from({ length: n }, (_, i) => (
        <input
          key={i}
          type="number"
          step="any"
          placeholder={`${placeholder}${i + 1}`}
          value={arr[i]}
          onChange={(e) => onChange(i, e.target.value)}
          className="border rounded px-2 py-1 text-center w-24"
        />
      ))}
    </div>
  );

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Cramer's Rule</h1>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 justify-center mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Matrix size (N×N)</label>
            <input
              type="number"
              min={1}
              max={8}
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              className="border rounded px-3 py-1 w-20"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">ε</label>
            <input
              type="text"
              value={eps}
              onChange={(e) => setEps(e.target.value)}
              className="border rounded px-3 py-1 w-36"
            />
          </div>

          <button
            onClick={resetAll}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
            title="Reset"
          >
            ↻
          </button>
          <button
            onClick={handleCalculate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Calculate!
          </button>
        </div>

        {/* Labels */}
        <div className="text-center text-gray-600 mb-2 flex items-center justify-center gap-8">
          <span className="italic">[A]</span>
          <span className="italic">{'{x}'}</span>
          <span>=</span>
          <span className="italic">{'{B}'}</span>
        </div>

        {/* Matrices */}
        <div className="flex flex-wrap items-start justify-center gap-6 mb-6">
          {renderMatrixA()}
          {renderVector(Array(n).fill("").map((_, i) => `x${i+1}`), () => {}, "x")}
          <span className="text-2xl mt-14">=</span>
          {renderVector(B, handleBChange, "b")}
        </div>

        {/* Result */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Result</h2>
          {detA !== null && (
            <p className="text-sm text-gray-700 mb-2">det(A) = {detA.toFixed(decimals)}</p>
          )}
          {Array.isArray(X) ? (
            <div className="grid gap-2 md:grid-cols-3">
              {X.map((v, i) => (
                <div key={i} className="border rounded px-3 py-2 bg-white shadow-sm">
                  x{i + 1} = {Number.isFinite(v) ? v.toFixed(decimals) : "NaN"}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">กรอกข้อมูลแล้วกด Calculate เพื่อดูผลลัพธ์</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Camerule;