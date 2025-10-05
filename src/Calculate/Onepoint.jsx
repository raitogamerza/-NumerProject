import React, { useState } from "react";
import { evaluate } from "mathjs";
import { onePointIteration } from "./root of equations/Onepoint";
import OnePointGraph from "../components/OnepointGraph";

function Onepoint() {
  const [gx, setGx] = React.useState("0.5*(x+5)");
  const [x0, setX0] = React.useState("0");
  const [tol, setTol] = React.useState("0.000001");
  const [root, setRoot] = React.useState(null);
  const [iterations, setIterations] = React.useState(null);
  const [onepointRecords, setOnepointRecords] = React.useState([]);
  const [gxInput, setGxInput] = useState(gx);
  const [plotRev, setPlotRev] = useState(0);

  const handleCalculate = () => {
    try {
      setGx(gxInput);
      const { root, iterations, records } = onePointIteration(gx, x0, tol);
      setRoot(root);
      setIterations(iterations);
      setOnepointRecords(records);
      setPlotRev((r) => r + 1);
    } catch (err) {
      alert(err.message);
    }
  };

  const xs = onepointRecords
    .flatMap((r) => [r.xOld, r.xNew])
    .filter((v) => Number.isFinite(v));
  let baseX = parseFloat(x0);
  if (!Number.isFinite(baseX)) baseX = 0;
  let minX = xs.length ? Math.min(...xs) : baseX;
  let maxX = xs.length ? Math.max(...xs) : baseX;
  if (!Number.isFinite(minX)) minX = baseX;
  if (!Number.isFinite(maxX)) maxX = baseX;
  if (minX === maxX) {
    minX -= 1;
    maxX += 1;
  }
  const span = Math.max(1e-3, maxX - minX);
  const step = span / 100;
  const dataX = [];
  const dataY = [];
  for (let x = minX; x <= maxX + 1e-12; x += step) {
    dataX.push(x);
    try {
      const y = evaluate(gx, { x });
      dataY.push(Number.isFinite(y) ? y : NaN);
    } catch (e) {
      dataY.push(NaN);
    }
  }

  return (
    <div>
      <center>
        <h1 className="text-2xl">One-Point Iteration Method </h1>

        <input
          type="text"
          placeholder="Enter function g(x)"
          value={gxInput}
          onChange={(e) => setGxInput(e.target.value)}
          className="border p-2 m-2 w-64"
        />
        <input
          type="Number"
          placeholder="Enter x0"
          value={x0}
          onChange={(e) => setX0(e.target.value)}
          className="border p-2 m-2 w-32"
        />
        <input
          type="Number"
          placeholder="Enter tolerance"
          value={tol}
          onChange={(e) => setTol(e.target.value)}
          className="border p-2 m-2 w-32"
        />
        <br />
        <button
          onClick={handleCalculate}
          className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
        >
          Calculate
        </button>
        <div className="mt-4">
          <h2 className="text-xl">Result:</h2>
          {root !== null && (
            <>
              <p>Root: {root.toFixed(6)}</p>
              <p>Iterations: {iterations}</p>
            </>
          )}
        </div>

        {onepointRecords.length > 0 && (
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
                  {onepointRecords.map((record, index) => (
                    <tr key={index} className="text-center hover:bg-gray-50">
                      <td className="border border-gray-200 px-2 py-1">
                        {record.iter}
                      </td>
                      <td className="border border-gray-200 px-2 py-1">
                        {record.xOld.toFixed(6)}
                      </td>
                      <td className="border border-gray-200 px-2 py-1">
                        {record.xNew.toFixed(6)}
                      </td>
                      <td className="border border-gray-200 px-2 py-1">
                        {record.error.toFixed(6)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <OnePointGraph
              dataX={dataX}
              dataY={dataY}
              iterations={onepointRecords}
              graphName="One-Point Iteration Method"
              uiRevision={`onepoint-${plotRev}`}
            />
          </div>
        )}
      </center>
    </div>
  );
}

export default Onepoint;
