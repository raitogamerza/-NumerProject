import { useState } from "react";
import Plot from "react-plotly.js";
import DatabasePanel from "../components/DatabasePanel";
import useCalculator from "../hooks/useCalculator";
import { PolynomialRegression as PolynomialRegressionMethod } from "../methods";

const resizePoints = (prev, n) => Array.from({ length: n }, (_, i) => prev[i] ?? { x: "", y: "" });

function PolynomialRegression() {
  const [data, setData] = useState(() => resizePoints([], 2));
  const [order, setOrder] = useState(2);
  const [xValue, setXValue] = useState(0);
  const [result, setResult] = useState(null);
  const { run, historyVersion } = useCalculator(PolynomialRegressionMethod);

  const handleChange = (index, field, value) =>
    setData((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value === "" ? "" : parseFloat(value) } : p)));

  const getInput = () => ({ points: data, order, xValue });
  const loadInput = (input) => {
    if (Array.isArray(input.points)) setData(input.points.map((p) => ({ x: p.x ?? "", y: p.y ?? "" })));
    if (input.order !== undefined) setOrder(Number(input.order));
    if (input.xValue !== undefined) setXValue(Number(input.xValue));
    setResult(null);
  };

  const calculate = () => {
    try {
      setResult(run(getInput()));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Polynomial Regression</h1>

      <div className="flex gap-4 items-center mb-4">
        <input type="number" value={data.length} min={2} max={20}
          onChange={(e) => setData((prev) => resizePoints(prev, Math.max(2, Number(e.target.value) || 2)))}
          className="w-16 text-center border rounded" />
        <span>จำนวนจุด</span>
        <input type="number" value={order} min={1} max={5} onChange={(e) => setOrder(Number(e.target.value))}
          className="w-16 text-center border rounded" />
        <span>ลำดับพหุนาม</span>
        <input type="number" value={xValue} onChange={(e) => setXValue(Number(e.target.value))}
          placeholder="X ที่ต้องทำนาย" className="border rounded px-3 py-1 w-24 text-center" />
        <span>X ที่ต้องทำนาย</span>
      </div>

      <div>
        <button onClick={calculate} className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600">
          Calculate
        </button>
        <DatabasePanel methodName={PolynomialRegressionMethod.methodName} getInput={getInput}
          onLoad={loadInput} historyVersion={historyVersion} />
      </div>

      <div className="border p-4 rounded-lg w-[360px] bg-white shadow mt-4">
        {data.map((point, i) => (
          <div key={i} className="flex justify-center gap-2 mb-2">
            <input type="number" placeholder={`x${i + 1}`} value={point.x}
              onChange={(e) => handleChange(i, "x", e.target.value)} className="border rounded px-2 py-1 w-20 text-center" />
            <input type="number" placeholder={`f(x${i + 1})`} value={point.y}
              onChange={(e) => handleChange(i, "y", e.target.value)} className="border rounded px-2 py-1 w-20 text-center" />
          </div>
        ))}
      </div>

      {result && (
        <>
          <div className="mt-4 text-center bg-gray-100 p-3 rounded-lg">
            <p className="font-semibold">ผลลัพธ์:</p>
            <p>{result.equation}</p>
            <p>y({xValue}) = {result.yPred.toFixed(4)}</p>
          </div>
          <Plot
            data={[
              { x: result.plot.x, y: result.plot.y, type: "scatter", mode: "lines", name: "Polynomial" },
              { x: data.map((p) => p.x), y: data.map((p) => p.y), type: "scatter", mode: "markers", name: "Data Points" },
              { x: [xValue], y: [result.yPred], type: "scatter", mode: "markers", name: "Result", marker: { color: "red", size: 10 } },
            ]}
            layout={{ width: 600, height: 400, title: "Polynomial Regression", dragmode: "pan" }}
            config={{ scrollZoom: true }}
          />
        </>
      )}
    </div>
  );
}

export default PolynomialRegression;
