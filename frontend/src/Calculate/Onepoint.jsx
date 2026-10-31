import { useState } from "react";
import OnePointGraph from "../components/OnepointGraph";
import DatabasePanel from "../components/DatabasePanel";
import useCalculator from "../hooks/useCalculator";
import { OnePoint, MathFunction } from "../methods";

function Onepoint() {
  const [gx, setGx] = useState("0.5*(x+5)");
  const [x0, setX0] = useState("0");
  const [tol, setTol] = useState("0.000001");
  const [result, setResult] = useState(null);
  const [plotGx, setPlotGx] = useState(gx);
  const [plotRev, setPlotRev] = useState(0);
  const { run, historyVersion } = useCalculator(OnePoint);

  const getInput = () => ({ gx, x0, tol });
  const loadInput = (input) => {
    const g = input.gx ?? input.fx;
    if (g !== undefined) setGx(String(g));
    if (input.x0 !== undefined) setX0(String(input.x0));
    if (input.tol !== undefined) setTol(String(input.tol));
  };

  const handleCalculate = () => {
    try {
      setResult(run(getInput()));
      setPlotGx(gx);
      setPlotRev((r) => r + 1);
    } catch (err) {
      alert(err.message);
    }
  };

  const records = result?.records ?? [];

  // ช่วงกราฟครอบคลุมทุกค่า x ที่เกิดระหว่างทำซ้ำ
  const xs = records.flatMap((r) => [r.xOld, r.xNew]).filter(Number.isFinite);
  const baseX = Number.isFinite(parseFloat(x0)) ? parseFloat(x0) : 0;
  let minX = xs.length ? Math.min(...xs) : baseX;
  let maxX = xs.length ? Math.max(...xs) : baseX;
  if (minX === maxX) {
    minX -= 1;
    maxX += 1;
  }
  const { xs: dataX, ys: dataY } = MathFunction.trySample(plotGx, minX, maxX, 100);

  return (
    <div>
      <center>
        <h1 className="text-2xl font-bold mb-4">One-Point Iteration Method</h1>

        <input type="text" placeholder="Enter function g(x)" value={gx}
          onChange={(e) => setGx(e.target.value)} className="border p-2 m-2 w-64" />
        <input type="number" placeholder="Enter x0" value={x0}
          onChange={(e) => setX0(e.target.value)} className="border p-2 m-2 w-32" />
        <input type="number" placeholder="Enter tolerance" value={tol}
          onChange={(e) => setTol(e.target.value)} className="border p-2 m-2 w-32" />
        <br />
        <button onClick={handleCalculate} className="bg-blue-500 text-white px-4 py-2 m-2 rounded">
          Calculate
        </button>
        <DatabasePanel methodName={OnePoint.methodName} getInput={getInput}
          onLoad={loadInput} historyVersion={historyVersion} />

        <div className="mt-4">
          <h2 className="text-xl">Result:</h2>
          {result && (
            <>
              <p>Root: {result.root.toFixed(6)}</p>
              <p>Iterations: {result.iterations}</p>
            </>
          )}
        </div>

        {records.length > 0 && (
          <div className="mt-6 w-11/12 md:w-5/6">
            <h2 className="text-lg font-bold mb-2">Iterations Table</h2>
            <div className="max-h-96 overflow-y-auto rounded border border-gray-200">
              <table className="min-w-full border-collapse">
                <thead className="sticky top-0 bg-gray-100 shadow text-sm">
                  <tr>
                    <th className="border border-gray-300 p-2">Iteration</th>
                    <th className="border border-gray-300 px-2 py-1">xOld</th>
                    <th className="border border-gray-300 px-2 py-1">xNew</th>
                    <th className="border border-gray-300 px-2 py-1">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec) => (
                    <tr key={rec.iter} className="text-center hover:bg-gray-50">
                      <td className="border border-gray-200 px-2 py-1">{rec.iter}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.xOld.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.xNew.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.error.toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <OnePointGraph dataX={dataX} dataY={dataY} iterations={records}
              graphName="One-Point Iteration Method" uiRevision={`onepoint-${plotRev}`} />
          </div>
        )}
      </center>
    </div>
  );
}

export default Onepoint;
