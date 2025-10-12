import React from "react";
import { SecantMethod } from "./root of equations/Secant";
import { evaluate } from "mathjs";
import SecantGraph from "../components/SecantGraph";
import { getRandomProblem } from "../services/problems";

function Secant() {
  const [fx, setFx] = React.useState("x*x - 7");
  const [x0, setX0] = React.useState("1.5");
  const [x1, setX1] = React.useState("3.5");
  const [tol, setTol] = React.useState("0.000001");
  const [root, setRoot] = React.useState(null);
  const [iterations, setIterations] = React.useState(null);
  const [secantRecords, setSecantRecords] = React.useState([]);
  const [dataX, setDataX] = React.useState([]);
  const [dataY, setDataY] = React.useState([]);
  const [fxStable, setFxStable] = React.useState("x*x - 7");
  const [plotRev, setPlotRev] = React.useState(0);

  const handleCalculate = () => {
    try {
      const fxLocal = fx;             
      setFxStable(fxLocal);

      const { root, iterations, records } = SecantMethod(fxLocal, x0, x1, tol);
      setRoot(root);
      setIterations(iterations);
      setSecantRecords(records);

      const xs = records.flatMap(r => [r.xPrev, r.xCurr]).filter(Number.isFinite);
      const baseX = parseFloat(x0) || 0;
      let minX = xs.length ? Math.min(...xs) : baseX;
      let maxX = xs.length ? Math.max(...xs) : baseX;
      if (minX === maxX) { minX -= 1; maxX += 1; }

      const step = Math.max(1e-3, maxX - minX) / 100;
      const tempX = Array.from({ length: 101 }, (_, i) => minX + i * step);
      const tempY = tempX.map(x => {
        try { return evaluate(fxLocal, { x }); } catch { return NaN; }
      });

      setDataX(tempX);
      setDataY(tempY);
      setPlotRev(r => r + 1);          
    } catch (error) {
      alert(error.message);
    }
  };

  const handleExample = async () => {
    try {
      const p = await getRandomProblem("Secant");
      if (p.fx) setFx(String(p.fx));
      if (p.x0 !== undefined) setX0(String(p.x0));
      if (p.x1 !== undefined) setX1(String(p.x1));
      if (p.tolerance !== undefined) setTol(String(p.tolerance));
    } catch (err) {
      alert(err.message || "Failed to load example");
    }
  };

  return (
    <div>
      <center>
        <h1 className="text-2xl font-bold mb-4">Secant Method</h1>
        {/* Inputs */}
        <input
          type="text"
          placeholder="Enter function f(x)"
          value={fx}
          onChange={(e) => setFx(e.target.value)}
          className="border p-2 m-2 w-64"
        />
        <input
          type="number"
          placeholder="Enter x0"
          value={x0}
          onChange={(e) => setX0(e.target.value)}
          className="border p-2 m-2 w-32"
        />
        <input
          type="number"
          placeholder="Enter x1"
          value={x1}
          onChange={(e) => setX1(e.target.value)}
          className="border p-2 m-2 w-32"
        />
        <input
          type="number"
          placeholder="Enter tolerance"
          value={tol}
          onChange={(e) => setTol(e.target.value)}
          className="border p-2 m-2 w-32"
        />

        <br />
        <button
          onClick={handleCalculate}
          className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600"
        >
          Calculate
        </button>
        <button
          onClick={handleExample}
          className="bg-emerald-500 text-white px-4 py-2 m-2 rounded"
        >
          Example
        </button>

        {/* Result */}
        <div className="mt-4">
          <h2 className="text-xl">Result:</h2>
          {root !== null && (
            <div>
              <p>Root: {root.toFixed(6)}</p>
              <p>Iterations: {iterations}</p>
            </div>
          )}
        </div>

        {/* Table + Graph */}
        {secantRecords.length > 0 && (
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
                  {secantRecords.map((record, index) => (
                    <tr key={index} className="text-center hover:bg-gray-50">
                      <td className="border border-gray-200 px-2 py-1">{record.iter}</td>
                      <td className="border border-gray-200 px-2 py-1">{record.xPrev.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{record.xCurr.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{record.fPrev.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{record.fCurr.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{record.error.toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Graph */}
            <SecantGraph
              key={`secant-${plotRev}`}
              fx={fxStable}
              dataX={dataX}
              dataY={dataY}
              graphName="Secant Method"
              secantRecords={secantRecords}
              uiRevision={`secant-${plotRev}`}
            />
          </div>
        )}
      </center>
    </div>
  );
}

export default Secant;
