import { useState } from "react";
import SecantGraph from "../components/SecantGraph";
import DatabasePanel from "../components/DatabasePanel";
import useCalculator from "../hooks/useCalculator";
import { Secant as SecantMethod, MathFunction } from "../methods";

function Secant() {
  const [fx, setFx] = useState("x*x - 7");
  const [x0, setX0] = useState("1.5");
  const [x1, setX1] = useState("3.5");
  const [tol, setTol] = useState("0.000001");
  const [result, setResult] = useState(null);
  const [plot, setPlot] = useState({ fx, dataX: [], dataY: [] });
  const [plotRev, setPlotRev] = useState(0);
  const { run, historyVersion } = useCalculator(SecantMethod);

  const getInput = () => ({ fx, x0, x1, tol });
  const loadInput = (input) => {
    if (input.fx !== undefined) setFx(String(input.fx));
    if (input.x0 !== undefined) setX0(String(input.x0));
    if (input.x1 !== undefined) setX1(String(input.x1));
    if (input.tol !== undefined) setTol(String(input.tol));
  };

  const handleCalculate = () => {
    try {
      const res = run(getInput());
      setResult(res);

      const xs = res.records.flatMap((r) => [r.xPrev, r.xCurr]).filter(Number.isFinite);
      const baseX = parseFloat(x0) || 0;
      let minX = xs.length ? Math.min(...xs) : baseX;
      let maxX = xs.length ? Math.max(...xs) : baseX;
      if (minX === maxX) {
        minX -= 1;
        maxX += 1;
      }
      const { xs: dataX, ys: dataY } = MathFunction.trySample(fx, minX, maxX, 100);
      setPlot({ fx, dataX, dataY });
      setPlotRev((r) => r + 1);
    } catch (err) {
      alert(err.message);
    }
  };

  const records = result?.records ?? [];

  return (
    <div>
      <center>
        <h1 className="text-2xl font-bold mb-4">Secant Method</h1>
        <input type="text" placeholder="Enter function f(x)" value={fx}
          onChange={(e) => setFx(e.target.value)} className="border p-2 m-2 w-64" />
        <input type="number" placeholder="Enter x0" value={x0}
          onChange={(e) => setX0(e.target.value)} className="border p-2 m-2 w-32" />
        <input type="number" placeholder="Enter x1" value={x1}
          onChange={(e) => setX1(e.target.value)} className="border p-2 m-2 w-32" />
        <input type="number" placeholder="Enter tolerance" value={tol}
          onChange={(e) => setTol(e.target.value)} className="border p-2 m-2 w-32" />
        <br />
        <button onClick={handleCalculate} className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600">
          Calculate
        </button>
        <DatabasePanel methodName={SecantMethod.methodName} getInput={getInput}
          onLoad={loadInput} historyVersion={historyVersion} />

        <div className="mt-4">
          <h2 className="text-xl">Result:</h2>
          {result && (
            <div>
              <p>Root: {result.root.toFixed(6)}</p>
              <p>Iterations: {result.iterations}</p>
            </div>
          )}
        </div>

        {records.length > 0 && (
          <div className="mt-6 w-11/12 md:w-5/6">
            <h2 className="text-xl mb-2 font-semibold">Iterations Table:</h2>
            <div className="max-h-72 overflow-y-auto border border-gray-300 rounded shadow-sm">
              <table className="min-w-full border-collapse">
                <thead className="sticky top-0 bg-gray-100 shadow text-sm">
                  <tr>
                    <th className="border border-gray-300 px-2 py-1">Iteration</th>
                    <th className="border border-gray-300 px-2 py-1">xₙ₋₁</th>
                    <th className="border border-gray-300 px-2 py-1">xₙ</th>
                    <th className="border border-gray-300 px-2 py-1">f(xₙ₋₁)</th>
                    <th className="border border-gray-300 px-2 py-1">f(xₙ)</th>
                    <th className="border border-gray-300 px-2 py-1">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec) => (
                    <tr key={rec.iter} className="text-center hover:bg-gray-50">
                      <td className="border border-gray-200 px-2 py-1">{rec.iter}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.xPrev.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.xCurr.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.fPrev.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.fCurr.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.error.toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SecantGraph key={`secant-${plotRev}`} fx={plot.fx} dataX={plot.dataX} dataY={plot.dataY}
              graphName="Secant Method" secantRecords={records} uiRevision={`secant-${plotRev}`} />
          </div>
        )}
      </center>
    </div>
  );
}

export default Secant;
