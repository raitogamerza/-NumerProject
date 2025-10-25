import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function LinearRegression() {
  const [n, setN] = useState(2);
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
      alert("ต้องมีข้อมูลอย่างน้อย 2 จุด");
      return;
    }

    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);

    const n = xs.length;
    const sumX = xs.reduce((a, b) => a + b, 0);
    const sumY = ys.reduce((a, b) => a + b, 0);
    const sumXY = xs.reduce((sum, xi, i) => sum + xi * ys[i], 0);
    const sumX2 = xs.reduce((sum, xi) => sum + xi * xi, 0);

    const a1 = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const a0 = (sumY - a1 * sumX) / n;

    const yPred = a0 + a1 * xValue;

    setResult({
      equation: `f(x) = ${a0.toFixed(4)} + ${a1.toFixed(4)}x`,
      a0,
      a1,
      yPred
    });

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const PlotX = [];
    const PlotY = [];
     for (let i = minX - 1; i <= maxX; i += 0.1) {
        PlotX.push(i);
        PlotY.push(a0 + a1 * i);
    }
    setPlotData({ x: PlotX, y: PlotY });
  };

  
  return (
    <div className="flex flex-col items-center p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Linear Regression</h1>

      {/* ปุ่มเพิ่ม/ลดจำนวนข้อมูล */}
      <div className="flex gap-4 items-center mb-4">
        <input
          type="number"
          value={n}
          min={2}
          max={8}
          onChange={(e) => setN(Number(e.target.value))}
          className="w-16 text-center border rounded"
        />
        <span> จุดข้อมูล (n)</span>
      </div>

      {/* ค่าที่ต้องการทำนาย */}
      <div className="flex gap-4 items-center mb-4">
        <input
          type="number"
          value={xValue}
          placeholder="X value"
          onChange={(e) => setXValue(Number(e.target.value))}
          className="border rounded px-3 py-1 w-24 text-center"
        />
        <span>X ที่ต้องการทำนาย</span>
      </div>

      <button
        onClick={calculate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Calculate
      </button>

      {/* กล่องกรอกข้อมูล */}
      <div className="border p-4 rounded-lg w-[360px] bg-white shadow mt-4">
        {data.map((point, i) => (
          <div key={i} className="flex justify-center gap-2 mb-2">
            <input
              type="number"
              placeholder={`x${i + 1}`}
              value={point.x}
              onChange={(e) => handleChange(i, "x", e.target.value)}
              className="border rounded px-2 py-1 w-20 text-center"
            />
            <input
              type="number"
              placeholder={`f(x${i + 1})`}
              value={point.y}
              onChange={(e) => handleChange(i, "y", e.target.value)}
              className="border rounded px-2 py-1 w-20 text-center"
            />
          </div>
        ))}
      </div>

      {/* แสดงผล */}
      {result && (
        <div className="mt-4 text-center bg-gray-100 p-3 rounded-lg">
          <p className="font-semibold">ผลลัพธ์:</p>
          <p>{result.equation}</p>
          <p>y({xValue}) = {result.yPred.toFixed(4)}</p>
        </div>
      )}

        {/* กราฟ */}
      {PlotData.x.length > 0 &&(
        <Plot
            data ={[
                {x : PlotData.x , y : PlotData.y ,type : 'scatter', mode : 'lines', name : 'Regression',},
                {x : data.map(p => p.x), y : data.map(p => p.y), type : 'scatter', mode : 'markers', name : 'Data Points', marker: { color: 'red', size: 8 },},
                {x : [xValue], y : [result ? result.yPred : null], type : 'scatter', mode : 'markers', name : 'Result', marker: { color: 'green', size: 10  }},
            ]}
            layout={{ width: 600, height: 400, title: 'Linear Regression Plot',dragmode: "pan"}}
            config={{
              scrollZoom: true,
          }}
        />
        )}
    </div>
  );
}

export default LinearRegression;
