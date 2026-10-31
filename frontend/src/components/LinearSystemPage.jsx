import { useState } from "react";
import DatabasePanel from "./DatabasePanel";
import useCalculator from "../hooks/useCalculator";

const MAX_N = 8;
const emptyMatrix = (n) => Array.from({ length: n }, () => Array(n).fill(""));
const resizeVector = (prev, n, fill) => Array.from({ length: n }, (_, i) => prev[i] ?? fill);
const resizeMatrix = (prev, n) =>
  Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => prev[i]?.[j] ?? ""));

// จำนวนทศนิยมตาม ε เช่น 0.000001 -> 6
const decimalsOf = (eps) => {
  const m = String(eps).match(/0\.(0*)([1-9])/);
  return m ? m[1].length + 1 : 6;
};

// หน้าใช้ร่วมของวิธีแก้ระบบสมการเชิงเส้นทั้งหมด
// MethodClass.iterative บอกว่าต้องมี X0 และตาราง iteration หรือไม่
function LinearSystemPage({ MethodClass, title }) {
  const iterative = MethodClass.iterative;
  const [n, setN] = useState(3);
  const [eps, setEps] = useState("0.000001");
  const [A, setA] = useState(() => emptyMatrix(3));
  const [B, setB] = useState(() => Array(3).fill(""));
  const [X0, setX0] = useState(() => Array(3).fill("0"));
  const [result, setResult] = useState(null);
  const { run, historyVersion } = useCalculator(MethodClass);
  const decimals = decimalsOf(eps);

  const changeSize = (value) => {
    const N = Math.max(1, Math.min(MAX_N, Number(value) || 1));
    setN(N);
    setA((prev) => resizeMatrix(prev, N));
    setB((prev) => resizeVector(prev, N, ""));
    setX0((prev) => resizeVector(prev, N, "0"));
    setResult(null);
  };

  const resetAll = () => {
    setA(emptyMatrix(n));
    setB(Array(n).fill(""));
    setX0(Array(n).fill("0"));
    setResult(null);
  };

  const getInput = () => (iterative ? { n, A, B, X0, eps } : { n, A, B, eps });
  const loadInput = (input) => {
    const N = Number(input.n) || input.A?.length || n;
    setN(N);
    setA(resizeMatrix((input.A ?? []).map((r) => r.map(String)), N));
    setB(resizeVector((input.B ?? []).map(String), N, ""));
    setX0(resizeVector((input.X0 ?? []).map(String), N, "0"));
    if (input.eps !== undefined) setEps(String(input.eps));
    setResult(null);
  };

  const setCell = (setter) => (i, val) =>
    setter((prev) => {
      const next = prev.slice();
      next[i] = val;
      return next;
    });
  const handleAChange = (i, j, val) =>
    setA((prev) => {
      const next = prev.map((row) => row.slice());
      next[i][j] = val;
      return next;
    });
  const handleBChange = setCell(setB);
  const handleX0Change = setCell(setX0);

  const handleCalculate = () => {
    try {
      const res = run(getInput());
      if (res.singular) {
        alert("det(A) = 0 หรือใกล้ศูนย์ ระบบสมการอาจไม่มีคำตอบเอกลักษณ์");
        setResult(null);
        return;
      }
      setResult(res);
    } catch (e) {
      alert(e.message);
    }
  };

  const fmt = (v) => (Number.isFinite(Number(v)) ? Number(v).toFixed(decimals) : "NaN");

  const renderMatrixA = () => (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${n}, minmax(40px, 1fr))` }}>
      {A.map((row, i) =>
        row.map((val, j) => (
          <input key={`${i}-${j}`} type="number" step="any" placeholder={`a${i + 1}${j + 1}`} value={val}
            onChange={(e) => handleAChange(i, j, e.target.value)}
            className="border rounded px-2 py-1 text-center" />
        ))
      )}
    </div>
  );

  const renderVector = (arr, onChange, placeholder) => (
    <div className="grid gap-2" style={{ gridTemplateRows: `repeat(${n}, 40px)` }}>
      {Array.from({ length: n }, (_, i) => (
        <input key={i} type="number" step="any" placeholder={`${placeholder}${i + 1}`} value={arr[i]}
          onChange={(e) => onChange(i, e.target.value)}
          className="border rounded px-2 py-1 text-center w-24" />
      ))}
    </div>
  );

  const iterations = result?.iterations ?? [];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>

        <div className="flex flex-wrap items-center gap-3 justify-center mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Matrix size (N×N)</label>
            <input type="number" min={1} max={MAX_N} value={n}
              onChange={(e) => changeSize(e.target.value)} className="border rounded px-3 py-1 w-20" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">ε</label>
            <input type="number" value={eps} onChange={(e) => setEps(e.target.value)}
              className="border rounded px-3 py-1 w-36" />
          </div>
          <button onClick={resetAll} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded" title="Reset">
            Reset All
          </button>
          <button onClick={handleCalculate} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Calculate
          </button>
        </div>
        <div className="text-center mb-4">
          <DatabasePanel methodName={MethodClass.methodName} getInput={getInput}
            onLoad={loadInput} historyVersion={historyVersion} />
        </div>

        <div className="text-center text-gray-600 mb-2 flex items-center justify-center gap-8">
          <span className="italic">[A]</span>
          <span className="italic">[X]</span>
          <span>=</span>
          <span className="italic">[B]</span>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-6 mb-6">
          {renderMatrixA()}
          {renderVector(Array(n).fill(""), () => {}, "x")}
          <span className="text-2xl mt-14">=</span>
          {renderVector(B, handleBChange, "b")}
        </div>

        {iterative && (
          <div className="flex flex-col items-center mt-2">
            <span className="italic mb-1">[X0]</span>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${n}, 80px)` }}>
              {X0.map((val, i) => (
                <input key={i} type="number" step="any" placeholder={`x${i + 1}`} value={val}
                  onChange={(e) => handleX0Change(i, e.target.value)}
                  className="border rounded px-2 py-1 text-center w-20" />
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          {result && !iterative && (
            <p className="text-sm text-gray-700 mb-2">det(A) = {fmt(result.detA)}</p>
          )}
          {Array.isArray(result?.X) ? (
            <div className="grid gap-2 md:grid-cols-3">
              {result.X.map((val, i) => (
                <div key={i} className="border rounded px-3 py-2 bg-white shadow-sm">
                  x{i + 1} = {fmt(val)}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">กรอกข้อมูลแล้วกด Calculate เพื่อดูผลลัพธ์</p>
          )}
        </div>

        {iterations.length > 0 && (
          <div className="mt-6 w-11/12 md:w-5/6 mx-auto">
            <h2 className="text-lg font-bold mb-2">Iterations Table</h2>
            <div className="max-h-72 overflow-y-auto border border-gray-300 rounded shadow-sm">
              <table className="min-w-full border-collapse text-sm">
                <thead className="sticky top-0 bg-gray-100 shadow">
                  <tr>
                    <th className="border border-gray-300 px-2 py-1">iteration</th>
                    {Array.from({ length: n }, (_, j) => (
                      <th key={j} className="border border-gray-300 px-2 py-1">x{j + 1}</th>
                    ))}
                    <th className="border border-gray-300 px-2 py-1">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {iterations.map((vec, idx) => {
                    const prev = iterations[idx - 1];
                    const err = prev ? fmt(Math.max(...vec.map((v, j) => Math.abs(v - prev[j])))) : "-";
                    return (
                      <tr key={idx} className="text-center hover:bg-gray-50">
                        <td className="border border-gray-200 px-2 py-1">{idx + 1}</td>
                        {vec.map((v, j) => (
                          <td key={j} className="border border-gray-200 px-2 py-1">{fmt(v)}</td>
                        ))}
                        <td className="border border-gray-200 px-2 py-1">{err}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LinearSystemPage;
