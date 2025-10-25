import React, { useEffect } from 'react'
import { gaussJordanMethod } from './Linear algebra equation/Gauss Jordan';


function GaussJordan() {
  const [n, setN] = React.useState(3);
  const [eps, setEps] = React.useState("0.000001");
  const [A, setA] = React.useState(() => Array.from({ length: 3 }, () => Array(3).fill("")));
  const [B, setB] = React.useState(() => Array(3).fill(""));
  const [X, setX] = React.useState(null);
  const [detA, setDetA] = React.useState(null);
  const decimals = (() => {
    const m = String(eps).match(/0\.(0*)([1-9])/);
    if (!m) return 6;
    return m[1].length + 1;
  })();

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

  
  const resetAll = () => {
    setA(Array.from({ length: n }, () => Array(n).fill("")));
    setB(Array(n).fill(""));
    setX(null);
    setDetA(null);
  };

  const handleAChange = (i, j, val) => {
    setA((prev) => {
      const next = prev.map((row) => row.slice());
      next[i][j] = val;
      return next;
    });
  }
  
  const handleBChange = (i, val) => {
    setB((prev) => {
      const next = prev.slice();
      next[i] = val;
      return next;
    });
  }

  const handleCalculate = () => {
    try{
      const { detA, X, singular } = gaussJordanMethod(A, B, eps);
      if (singular) {
        alert("det(A) = 0 หรือใกล้ศูนย์ ระบบสมการอาจไม่มีคำตอบเอกลักษณ์");
        setX(null);
        return;
      }
      setDetA(detA);
      setX(X);
    } catch (e) {
      alert(e.message);
    }
  }

  const renderMatrixA = () => (
    <div className='grid gap-2' style={{ gridTemplateColumns: `repeat(${n}, minmax(40px, 1fr))` }}>
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
    <div className='grid gap-2' style={{ gridTemplateRows: `repeat(${n}, 40px)` }}>
      {Array.from({ length: n }, (_, i) => (
        <input
          key={i}
          type="number"
          step="any"
          placeholder={`${placeholder}${i+1}`}
          value={arr[i]}
          onChange={(e) => onChange(i, e.target.value)}
          className="border rounded px-2 py-1 text-center w-24"
        />
      ))}
    </div>
  )

  return (
    <div className='w-full flex justify-center'>
      <div className='w-full max-w-7xl p-4'>
        <h1 className = "text-2xl font-bold mb-4 text-center">Gauss Jordan</h1>
        
        <div className ='flex flex-wrap items-center gap-3 justify-center mb-4'>
          <div className='flex items-center gap-2'>
            <label className='text-sm text-gray-700'>Matrix size (N×N)</label>
            <input 
              type="number" 
              min={1} 
              max={8} 
              value={n} 
              onChange={(e) => setN(Number(e.target.value))} 
              className='border rounded px-3 py-1 w-20' 
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='text-sm text-gray-700'>ε</label>
            <input 
              type='number'
              value = {eps}
              onChange={(e) => setEps(e.target.value)}
              className='border rounded px-3 py-1 w-36'
            />
          </div>
          <button
            onClick={resetAll}
            className='bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded'
            title='Reset'
          >
            Reset All
          </button>
          <button 
            onClick={handleCalculate}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
          >
            Calculate
          </button>
        </div>

        {/* Labels */}
        <div className ='text-center text-gray-600 mb-2 flex items-center justify-center gap-8'>
          <span className='italic'>[A]</span>
          <span className='italic'>[X]</span>
          <span>=</span>
          <span className='italic'>[B]</span>
        </div>
        
        {/* Matrices */}
        <div className='flex flex-wrap items-start justify-center gap-6 mb-6'>
          {renderMatrixA()}
          {renderVector(Array(n).fill(""), () => {}, "x")}
          <span className="text-2xl mt-14">=</span>
          {renderVector(B,handleBChange,"b")}
        </div>

        {/* Result */}
        <div className='mt-4'>
          <h2 className='text-lg font-semibold mb-2'>Result:</h2>
          {detA !== null && (
            <p className='text-sm text-gray-700 mb-2'>det(A) = {Number.isFinite(detA) ? detA.toFixed(decimals) : "NaN"}</p>
          )}
          {Array.isArray(X) && X.length > 0 ? (
            <div className='grid gap-2 md:grid-cols-3'>
             {X.map((val, idx) => {
               const num = Number(val);
               return (
                 <div key={idx} className='border rounded px-3 py-2 bg-white shadow-sm'>
                   x{idx + 1} = {Number.isFinite(num) ? num.toFixed(decimals) : "NaN"}
                 </div>
               );
             })}
            </div>
          ) : (
            <p className="text-gray-500">กรอกข้อมูลแล้วกด Calculate เพื่อดูผลลัพธ์</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GaussJordan;