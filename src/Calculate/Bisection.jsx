import React from "react";
import { evaluate } from "mathjs";
import { bisectionMethod } from "./root of equations/bisection";
import PlotlyGraph from "../components/PlotlyGraph";

function Bisection() {
  const [fx, setFx] = React.useState("43x-180");
  const [x0, setX0] = React.useState("0");
  const [x1, setX1] = React.useState("10");
  const [tol, setTol] = React.useState("0.000001");
  const [root, setRoot] = React.useState(null);
  const [iterations, setIterations] = React.useState(null);
  const [bisectionRecords, setBisectionRecords] = React.useState([]);

  const handleCalculate = () => {
    try {
      const { root, iterations, records } = bisectionMethod(fx, x0, x1, tol);
      setRoot(root);
      setIterations(iterations);
      setBisectionRecords(records);
    } catch (err) {
      alert(err.message);
    }
  };

  const dataX = [];
  const dataY = [];
  const step = 0.1
  for (let x = parseFloat(x0); x <= parseFloat(x1); x += step) {
    dataX.push(x);
    dataY.push(evaluate(fx, { x }));
  }

  return (
    <div>
      <center>
        <h1 className="text-2xl">Bisection Method</h1>

        <input
          type="text"
          placeholder="Enter function f(x)"
          value={fx}
          onChange={(e) => setFx(e.target.value)}
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
          placeholder="Enter x1"
          value={x1}
          onChange={(e) => setX1(e.target.value)}
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

        {bisectionRecords.length > 0 && (
          <div className="mt-6 w-11/12 md:w-5/6">
            <h2 className="text-lg font-bold mb-2">Iterations Table</h2>
            <div className="max-h-72 overflow-y-auto border border-gray-300 rounded shadow-sm">
              <table className="min-w-full border-collapse text-sm">
                <thead className="sticky top-0 bg-gray-100 shadow">
                  <tr>
                    <th className="border border-gray-300 px-2 py-1">
                      iteration
                    </th>
                    <th className="border border-gray-300 px-2 py-1">xl</th>
                    <th className="border border-gray-300 px-2 py-1">xr</th>
                    <th className="border border-gray-300 px-2 py-1">xm</th>
                    <th className="border border-gray-300 px-2 py-1">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {bisectionRecords.map((rec, idx) => (
                    <tr key={idx} className="text-center hover:bg-gray-50">
                      <td className="border border-gray-200 px-2 py-1">
                        {idx + 1}
                      </td>
                      <td className="border border-gray-200 px-2 py-1">
                        {rec.a.toFixed(6)}
                      </td>
                      <td className="border border-gray-200 px-2 py-1">
                        {rec.b.toFixed(6)}
                      </td>
                      <td className="border border-gray-200 px-2 py-1 font-medium">
                        {rec.c.toFixed(6)}
                      </td>
                      <td className="border border-gray-200 px-2 py-1">
                        {evaluate(fx, { x: rec.c }).toFixed(6)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Graph */}
            <PlotlyGraph
              dataX={dataX}
              dataY={dataY}
              graphName="Bisection Method"
              iterations={bisectionRecords}
              fx={fx}
            />
          </div>
        )}
      </center>
    </div>
  );
}
export default Bisection;
