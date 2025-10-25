import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function PolynomialRegression() {
  const [n, setN] = useState(2); 
  const [m, setM] = useState(2); 
  const [xValue, setXValue] = useState(0);
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [PlotData, setPlotData] = useState({ x: [], y: [] });

  useEffect(() => {
    setData(Array.from({ length: n }, () => ({ x: '', y: '' })));
  }, [n]);

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value === '' ? '' : parseFloat(value);
    setData(newData);
  };

  
  const calculate = () => {
    const points = data.filter(p => p.x !== '' && p.y !== '');
    if (points.length < 2) {
      alert(`ต้องมีข้อมูลอย่างน้อย 2 จุดสำหรับลำดับพหุนามนี้`);
      return;
    }

    const X = points.map(p => {
      return Array.from({ length: m + 1 }, (_, i) => Math.pow(p.x, i));
    });
    const Y = points.map(p => p.y);

    
    const XT = X[0].map((_, colIndex) => X.map(row => row[colIndex]));
    const XT_X = XT.map(row => row.map((_, j) => row.reduce((sum, val, i) => sum + val * X[i][j], 0)));
    const XT_Y = XT.map(row => row.reduce((sum, val, i) => sum + val * Y[i], 0));

    
    const A = gaussElimination(XT_X, XT_Y);

    
    const yPred = A.reduce((sum, a, i) => sum + a * Math.pow(xValue, i), 0);

    
    const equation = 'f(x) = ' + A.map((a, i) => `${a.toFixed(4)}x^${i}`).join(' + ');

    setResult({ equation, yPred, coefficients: A });
    
    const xs = points.map(p => p.x);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const PlotX = [];
    const PlotY = [];
        for (let i = minX - 1; i <= maxX; i += 0.1) {
        PlotX.push(i);
        PlotY.push(A.reduce((sum, a, j) => sum + a * Math.pow(i, j), 0));
        
    }
    setPlotData({ x: PlotX, y: PlotY });
  };


  
  const gaussElimination = (matrix, b) => {
    const n = b.length;
    matrix = matrix.map(row => [...row]);
    b = [...b];
    for (let i = 0; i < n; i++) {
      // ทำ pivot
      let maxRow = i;
      for (let k = i + 1; k < n; k++) if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) maxRow = k;
      [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
      [b[i], b[maxRow]] = [b[maxRow], b[i]];

      // ทำ elimination
      for (let k = i + 1; k < n; k++) {
        const factor = matrix[k][i] / matrix[i][i];
        for (let j = i; j < n; j++) matrix[k][j] -= factor * matrix[i][j];
        b[k] -= factor * b[i];
      }
    }

    // back-substitution
    const x = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let sum = b[i];
      for (let j = i + 1; j < n; j++) sum -= matrix[i][j] * x[j];
      x[i] = sum / matrix[i][i];
    }
    return x;
  };

  return (
    <div className="flex flex-col items-center p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Polynomial Regression</h1>

      <div className="flex gap-4 items-center mb-4">
        <input type="number" value={n} min={2} max={8} onChange={e => setN(Number(e.target.value))}
          className="w-16 text-center border rounded" />
        <span>จำนวนจุด</span>
        <input type="number" value={m} min={2} max={5} onChange={e => setM(Number(e.target.value))}
          className="w-16 text-center border rounded" />
        <span>ลำดับพหุนาม</span>
        <input type="number" value={xValue} onChange={e => setXValue(Number(e.target.value))}
          placeholder="X ที่ต้องทำนาย" className="border rounded px-3 py-1 w-24 text-center" />
          <span>X ที่ต้องทำนาย</span>
      </div>

      <button onClick={calculate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Calculate</button>

      <div className="border p-4 rounded-lg w-[360px] bg-white shadow mt-4">
        {data.map((point, i) => (
          <div key={i} className="flex justify-center gap-2 mb-2">
            <input type="number" placeholder={`x${i + 1}`} value={point.x} onChange={e => handleChange(i, "x", e.target.value)}
              className="border rounded px-2 py-1 w-20 text-center" />
            <input type="number" placeholder={`f(x${i + 1})`} value={point.y} onChange={e => handleChange(i, "y", e.target.value)}
              className="border rounded px-2 py-1 w-20 text-center" />
          </div>
        ))}
      </div>

      {result && (
        <div className="mt-4 text-center bg-gray-100 p-3 rounded-lg">
          <p className="font-semibold">ผลลัพธ์:</p>
          <p>{result.equation}</p>
          <p>y({xValue}) = {result.yPred.toFixed(4)}</p>
        </div>
      )}

      {PlotData.x.length > 0 && (
        <Plot 
            data={[
                { x : PlotData.x, y: PlotData.y, type: 'scatter', mode: 'lines', name: 'Polynomial'},
                { x: data.map(p => p.x), y: data.map(p => p.y), type: 'scatter', mode: 'markers', name: 'Data Points'},
                { x : [xValue], y : [result ? result.yPred : null], type : 'scatter', mode : 'markers', name : 'Result', marker: { color: 'red', size: 10 },}
            ]}
            layout={{ width: 600, height: 400, title: 'Polynomial Regression', dragmode: "pan" }}
            config={{ scrollZoom: true }}
        />
      )}
    </div>
  );
}

export default PolynomialRegression;
