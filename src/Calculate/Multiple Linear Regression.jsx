import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function MultiLinearRegression() {
  const [n, setN] = useState(6);
  const [numVars, setNumVars] = useState(3);
  const [data, setData] = useState([]);
  const [xValues, setXValues] = useState([]);
  const [result, setResult] = useState(null);
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    setData(
      Array.from({ length: n }, () => {
        const point = {};
        for (let i = 0; i < numVars; i++) point[`x${i + 1}`] = '';
        point.y = '';
        return point;
      })
    );
    setXValues(Array(numVars).fill(0));
  }, [n, numVars]);

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value === '' ? '' : parseFloat(value);
    setData(newData);
  };

  const handleXValueChange = (index, value) => {
    const newX = [...xValues];
    newX[index] = value === '' ? 0 : parseFloat(value);
    setXValues(newX);
  };

  const invertMatrix = (m) => {
    const size = m.length;
    const I = m.map((_, i) => m[0].map((__, j) => (i === j ? 1 : 0)));
    const M = m.map((row, i) => [...row, ...I[i]]);

    for (let i = 0; i < size; i++) {
      let diag = M[i][i];
      if (Math.abs(diag) < 1e-12) throw new Error('Matrix is singular or near-singular');
      for (let j = 0; j < M[i].length; j++) M[i][j] /= diag;
      for (let k = 0; k < size; k++) {
        if (k !== i) {
          const factor = M[k][i];
          for (let j = 0; j < M[k].length; j++) {
            M[k][j] -= factor * M[i][j];
          }
        }
      }
    }
    return M.map(row => row.slice(size));
  };

  const calculate = () => {
    // filter valid points (ทุก x_i และ y ต้องมีค่า)
    const points = data.filter((p) => {
      for (let i = 0; i < numVars; i++) if (p[`x${i + 1}`] === '') return false;
      return p.y !== '';
    });

    if (points.length < numVars + 1) {
      alert(`ต้องมีข้อมูลอย่างน้อย ${numVars + 1} จุด`);
      return;
    }

    // สร้างเมทริกซ์ X และ Y
    const X = points.map((p) => [1, ...Array.from({ length: numVars }, (_, i) => p[`x${i + 1}`])]);
    const Y = points.map((p) => [p.y]);

    // XT, XT_X, XT_Y
    const XT = X[0].map((_, i) => X.map(row => row[i]));
    const XT_X = XT.map(row => X[0].map((_, j) =>
      row.reduce((sum, val, k) => sum + val * X[k][j], 0)
    ));
    const XT_Y = XT.map(row =>
      [row.reduce((sum, val, k) => sum + val * Y[k][0], 0)]
    );

    let A;
    try {
      const inv = invertMatrix(XT_X);
      A = inv.map(row => row.reduce((sum, val, j) => sum + val * XT_Y[j][0], 0)); // coefficients [a0, a1, ...]
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการอินเวิร์สเมทริกซ์: ' + err.message);
      return;
    }

    // ทำนายสำหรับค่าที่ผู้ใช้กรอก (xValues)
    let yPred = A[0];
    for (let i = 0; i < numVars; i++) yPred += A[i + 1] * xValues[i];

    // คำนวณ R^2
    const yMean = points.reduce((s, p) => s + p.y, 0) / points.length;
    const yHat = points.map((p) => {
      let yh = A[0];
      for (let i = 0; i < numVars; i++) yh += A[i + 1] * p[`x${i + 1}`];
      return yh;
    });
    const ssRes = points.reduce((s, p, idx) => s + Math.pow(p.y - yHat[idx], 2), 0);
    const ssTot = points.reduce((s, p) => s + Math.pow(p.y - yMean, 2), 0);
    const r2 = 1 - ssRes / ssTot;

    setResult({ coefficients: A, yPred, r2 });

    // สร้าง regression line สำหรับ plotting ในแกน x1:
    // วิธี: สร้างช่วงค่า x1 (min..max) แล้วตรึง x2..xn ที่ค่าเฉลี่ยของตัวแปรนั้นๆ
    const means = Array.from({ length: numVars }, (_, i) => {
      const arr = points.map(p => p[`x${i + 1}`]);
      return arr.reduce((s, v) => s + v, 0) / arr.length;
    });

    const xs1 = (() => {
      const arr = points.map(p => p.x1);
      const min = Math.min(...arr);
      const max = Math.max(...arr);
      const step = (max - min) / 60 || 1;
      const res = [];
      for (let v = min - step * 2; v <= max + step * 2; v += step) res.push(v);
      return res;
    })();

    const lineY = xs1.map((x1v) => {
      let y = A[0] + A[1] * x1v;
      for (let i = 1; i < numVars; i++) { // i is index for x2..xn (A[i+1])
        y += A[i + 1] * means[i];
      }
      return y;
    });

    setPlotData({
      regressionLine: { x: xs1, y: lineY },
      points: Array.from({ length: numVars }).map((_, i) => ({
        x: points.map((p) => p[`x${i + 1}`]),
        y: points.map((p) => p.y),
        name: `x${i + 1}`,
      })),
    });
  };

  return (
    <div className="flex flex-col items-center p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Multiple Linear Regression</h1>

      <div className="flex gap-4 items-center mb-4">
        <input type="number" value={n} min={2} max={20} onChange={(e) => setN(Number(e.target.value))} className="w-16 text-center border rounded" />
        <span>จำนวนจุด</span>

        <input type="number" value={numVars} min={1} max={5} onChange={(e) => setNumVars(Number(e.target.value))} className="w-16 text-center border rounded" />
        <span>จำนวนตัวแปร x</span>
      </div>

      <div className="flex gap-2 mb-4">
        {xValues.map((val, i) => (
          <input key={i} type="number" value={val} onChange={(e) => handleXValueChange(i, e.target.value)} placeholder={`x${i + 1} ทำนาย`} className="border rounded px-2 py-1 w-20 text-center" />
        ))}
        <span>X ที่ต้องทำนาย</span>
      </div>

      <button onClick={calculate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Calculate
      </button>

      <div className="border p-4 rounded-lg w-[700px] bg-white shadow mt-4">
        {data.map((point, i) => (
          <div key={i} className="flex justify-center gap-2 mb-2">
            {Array.from({ length: numVars }).map((_, j) => (
              <input
                key={j}
                type="number"
                placeholder={`x${j + 1},${i + 1}`}
                value={point[`x${j + 1}`]}
                onChange={(e) => handleChange(i, `x${j + 1}`, e.target.value)}
                className="border rounded px-2 py-1 w-20 text-center"
              />
            ))}
            <input
              type="number"
              placeholder={`y${i + 1}`}
              value={point.y}
              onChange={(e) => handleChange(i, 'y', e.target.value)}
              className="border rounded px-2 py-1 w-20 text-center"
            />
          </div>
        ))}
      </div>

      {result && (
        <div className="mt-4 text-center bg-gray-100 p-3 rounded-lg w-[700px]">
          <p className="font-semibold">Result:</p>
          <p>yPred = {result.yPred.toFixed(6)}</p>
          <p>สมการ (coeffs): {result.coefficients.map((c, i) => (i === 0 ? c.toFixed(4) : ` + (${c.toFixed(4)})x${i}`)).join('')}</p>
        </div>
      )}

      {plotData && (
        <Plot
          data={[
            {
              x: plotData.regressionLine.x,
              y: plotData.regressionLine.y,
              type: 'scatter',
              mode: 'lines',
              line: { width: 2 },
              name: 'Regression Line (x1, other x fixed at mean)',
            },
            ...plotData.points.map((p, i) => ({
              x: p.x,
              y: p.y,
              type: 'scatter',
              mode: 'markers',
              marker: { size: 8 },
              name: p.name,
            })),
          ]}
          layout={{
            width: 900,
            height: 500,
            title: 'Graph',
            xaxis: { title: 'x1 (projection)' },
            yaxis: { title: 'y' },
            showlegend: true,
          }}
          config={{ scrollZoom: true }}
        />
      )}
    </div>
  );
}

export default MultiLinearRegression;
