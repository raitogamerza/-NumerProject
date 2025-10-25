import React, { useEffect } from 'react'
import { gaussSeidelMethod } from './Linear algebra equation/Guass Seidel';

function GaussSeidel() {
  const [n, setN] = React.useState(3);
  const [eps, setEps] = React.useState("0.000001");
  const [A, setA] = React.useState(() => Array.from({ length: 3 }, () => Array(3).fill("")));
  const [B, setB] = React.useState(() => Array(3).fill(""));
  const [X, setX] = React.useState(null);
  const [X0, setX0] = React.useState(() => Array(3).fill("0"));
  const [detA, setDetA] = React.useState(null);
  const [gsRecords, setGsRecords] = React.useState([]);
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
    setX0((prev) => Array.from({ length: N }, (_, i) => (prev[i] ?? "0")));
    setX(null);
    setDetA(null);
  }, [n]);


  const resetAll = () => {
    setA(Array.from({ length: n }, () => Array(n).fill("")));
    setB(Array(n).fill(""));
    setX0(Array(n).fill(""));
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

  const handleX0Change = (i, val) => {
    setX0((prev) => {
      const next = prev.slice();
      next[i] = val;
      return next;
    });
  };

  const handleCalculate = () => {
    try{
      const { detA, X, singular, iterations } = gaussSeidelMethod(A, B, X0, eps);
      if (singular) {
        alert("det(A) = 0 หรือใกล้ศูนย์ ระบบสมการอาจไม่มีคำตอบเอกลักษณ์");
        setX(null);
        setGsRecords([]);
        return;
      }
      setDetA(detA);
      setX(X);
      setGsRecords(Array.isArray(iterations) ? iterations : []);
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
        <h1 className = "text-2xl font-bold mb-4 text-center">Gauss Seidel</h1>
        
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

        <div className='flex flex-col items-center mt-2'>
            <span className='italic mb-1'>{'[X0]'}</span>
            <div className='grid gap-2' style={{ gridTemplateColumns: `repeat(${n}, 80px)` }}>
            {X0.map((val, i) => (
            <input
            key={i}
            type="number"
            step="any"
            placeholder={`x${i+1}`}
            value={val}
            onChange={(e) => handleX0Change(i, e.target.value)}
            className="border rounded px-2 py-1 text-center w-20"
            />
        ))}
         </div>
        </div>

        {/* Result summary removed per request */}
        
        <h2 className='meta-4 text-lg font-semibold mb-2'>Result:</h2>

            {/* Iterations Table */}
            {Array.isArray(gsRecords) && gsRecords.length > 0 && (
          <div className='mt-6 w-11/12 md:w-5/6'>
            <h2 className='text-lg font-bold mb-2'>Iterations Table</h2>
            <div className='max-h-72 overflow-y-auto border border-gray-300 rounded shadow-sm'>
              <table className='min-w-full border-collapse text-sm'>
                <thead className='sticky top-0 bg-gray-100 shadow'>
                  <tr>
                    <th className='border border-gray-300 px-2 py-1'>iteration</th>
                    {Array.from({ length: n }, (_, j) => (
                      <th key={`h-${j}`} className='border border-gray-300 px-2 py-1'>x{j + 1}</th>
                    ))}
                    <th className='border border-gray-300 px-2 py-1'>Error</th>
                  </tr>
                </thead>
                <tbody>
                  {gsRecords.map((vec, idx) => {
                    const prev = idx > 0 ? gsRecords[idx - 1] : null;
                    let err = '-';
                    if (prev && Array.isArray(prev)) {
                      const diffs = vec.map((v, j) => Math.abs(Number(v) - Number(prev[j])));
                      const maxDiff = diffs.reduce((m, d) => (Number.isFinite(d) && d > m ? d : m), 0);
                      err = Number.isFinite(maxDiff) ? maxDiff.toFixed(decimals) : 'NaN';
                    }
                    return (
                      <tr key={idx} className='text-center hover:bg-gray-50'>
                        <td className='border border-gray-200 px-2 py-1'>{idx + 1}</td>
                        {Array.from({ length: n }, (_, j) => {
                          const val = Number(vec[j]);
                          return (
                            <td key={`r-${idx}-${j}`} className='border border-gray-200 px-2 py-1'>
                              {Number.isFinite(val) ? val.toFixed(decimals) : 'NaN'}
                            </td>
                          );
                        })}
                        <td className='border border-gray-200 px-2 py-1'>{err}</td>
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

export default GaussSeidel;