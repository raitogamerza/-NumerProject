import { useState } from "react";
import Plot from "react-plotly.js";
import DatabasePanel from "../components/DatabasePanel";
import useCalculator from "../hooks/useCalculator";
import { MultipleLinearRegression } from "../methods";

const keysOf = (numVars) => [...Array.from({ length: numVars }, (_, i) => `x${i + 1}`), "y"];
// ปรับขนาดตารางข้อมูลโดยคงค่าที่กรอกไว้
const resizeData = (prev, n, numVars) =>
  Array.from({ length: n }, (_, i) => Object.fromEntries(keysOf(numVars).map((k) => [k, prev[i]?.[k] ?? ""])));

function MultiLinearRegression() {
  const [numVars, setNumVars] = useState(3);
  const [data, setData] = useState(() => resizeData([], 6, 3));
  const [xValues, setXValues] = useState(() => Array(3).fill(0));
  const [result, setResult] = useState(null);
  const { run, historyVersion } = useCalculator(MultipleLinearRegression);

  const changeSize = (n, vars) => {
    setNumVars(vars);
    setData((prev) => resizeData(prev, n, vars));
    setXValues((prev) => Array.from({ length: vars }, (_, i) => prev[i] ?? 0));
    setResult(null);
  };

  const handleChange = (index, field, value) =>
    setData((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value === "" ? "" : parseFloat(value) } : p)));

  const handleXValueChange = (index, value) =>
    setXValues((prev) => prev.map((v, i) => (i === index ? (value === "" ? 0 : parseFloat(value)) : v)));

  const getInput = () => ({ numVars, points: data, xValues });
  const loadInput = (input) => {
    const vars = Number(input.numVars) || numVars;
    const points = Array.isArray(input.points) ? input.points : [];
    setNumVars(vars);
    setData(resizeData(points, Math.max(points.length, 2), vars));
    setXValues(Array.from({ length: vars }, (_, i) => Number(input.xValues?.[i]) || 0));
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
      <h1 className="text-2xl font-bold mb-4">Multiple Linear Regression</h1>

      <div className="flex gap-4 items-center mb-4">
        <input type="number" value={data.length} min={2} max={20}
          onChange={(e) => changeSize(Math.max(2, Number(e.target.value) || 2), numVars)}
          className="w-16 text-center border rounded" />
        <span>จำนวนจุด</span>

        <input type="number" value={numVars} min={1} max={5}
          onChange={(e) => changeSize(data.length, Math.min(5, Math.max(1, Number(e.target.value) || 1)))}
          className="w-16 text-center border rounded" />
        <span>จำนวนตัวแปร x</span>
      </div>

      <div className="flex gap-2 mb-4">
        {xValues.map((val, i) => (
          <input key={i} type="number" value={val} onChange={(e) => handleXValueChange(i, e.target.value)}
            placeholder={`x${i + 1} ทำนาย`} className="border rounded px-2 py-1 w-20 text-center" />
        ))}
        <span>X ที่ต้องทำนาย</span>
      </div>

      <div>
        <button onClick={calculate} className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600">
          Calculate
        </button>
        <DatabasePanel methodName={MultipleLinearRegression.methodName} getInput={getInput}
          onLoad={loadInput} historyVersion={historyVersion} />
      </div>

      <div className="border p-4 rounded-lg w-[700px] bg-white shadow mt-4">
        {data.map((point, i) => (
          <div key={i} className="flex justify-center gap-2 mb-2">
            {keysOf(numVars).map((k) => (
              <input key={k} type="number" placeholder={k === "y" ? `y${i + 1}` : `${k},${i + 1}`} value={point[k]}
                onChange={(e) => handleChange(i, k, e.target.value)} className="border rounded px-2 py-1 w-20 text-center" />
            ))}
          </div>
        ))}
      </div>

      {result && (
        <>
          <div className="mt-4 text-center bg-gray-100 p-3 rounded-lg w-[700px]">
            <p className="font-semibold">Result:</p>
            <p>yPred = {result.yPred.toFixed(6)}</p>
            <p>สมการ: {result.equation}</p>
            <p>R² = {result.r2.toFixed(6)}</p>
          </div>
          <Plot
            data={[
              {
                x: result.plot.regressionLine.x,
                y: result.plot.regressionLine.y,
                type: "scatter",
                mode: "lines",
                line: { width: 2 },
                name: "Regression Line (x1, other x fixed at mean)",
              },
              ...result.plot.points.map((p) => ({
                x: p.x,
                y: p.y,
                type: "scatter",
                mode: "markers",
                marker: { size: 8 },
                name: p.name,
              })),
            ]}
            layout={{
              width: 900,
              height: 500,
              title: "Graph",
              xaxis: { title: "x1 (projection)" },
              yaxis: { title: "y" },
              showlegend: true,
            }}
            config={{ scrollZoom: true }}
          />
        </>
      )}
    </div>
  );
}

export default MultiLinearRegression;
