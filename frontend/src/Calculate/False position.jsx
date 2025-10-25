import React from "react";
import { evaluate } from "mathjs";
import { FalsepositionMethod } from "./root of equations/Falseposition";
import PlotlyGraph from "../components/PlotlyGraph";
import { getRandomProblem } from "../services/rootproblems";

function Falseposition() {
  const [fx, setFx] = React.useState("x*x-13");
  const [x0, setX0] = React.useState("0");
  const [x1, setX1] = React.useState("10");
  const [tol, setTol] = React.useState("0.000001");
  const [root, setRoot] = React.useState(null);
  const [iterations, setIterations] = React.useState(null);
  const [falsepositionRecords, setFalsepositionRecords] = React.useState([]);

  const handleCalculate = () => {
    try {
      const { root, iterations, records } = FalsepositionMethod(
        fx,
        x0,
        x1,
        tol
      );
      setRoot(root);
      setIterations(iterations);
      setFalsepositionRecords(records);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleExample = async () => {
    try {
      const p = await getRandomProblem("False Position");
      if (p.fx) setFx(String(p.fx));
      if (p.x0 !== undefined) setX0(String(p.x0));
      if (p.x1 !== undefined) setX1(String(p.x1));
      if (p.tolerance !== undefined) setTol(String(p.tolerance));
    } catch (err) {
      alert(err.message || "Failed to load example");
    }
  };

  const dataX = [];
  const dataY = [];
  const step = (parseFloat(x1) - parseFloat(x0)) / 100;
  for (let x = parseFloat(x0); x <= parseFloat(x1); x += step) {
    dataX.push(x);
    dataY.push(evaluate(fx, { x }));
  }

  return (
    <div>
      <center>
        <h1 className="text-2xl font-bold mb-4">False position</h1>
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
        <button
          onClick={handleExample}
          className="bg-emerald-500 text-white px-4 py-2 m-2 rounded"
        >
          Example
        </button>
        <div className="mt-4">
          <h2 className="text-xl">Result:</h2>
          {root !== null && (
            <div className="mt-4">
              <p className="text-lg">Root: {root.toFixed(6)}</p>
              <p className="text-lg">Iterations: {iterations}</p>
            </div>
          )}
        </div>

        {falsepositionRecords.length > 0 && (
          <div className="mt-6 w-11/12 md:w-5/6">
            <h2 className="text-lg font-bold mb-2">Iterations Table</h2>
            <div className="max-h-96 overflow-y-auto rounded border border-gray-200">
              <table className="min-w-full border-collapse">
                <thead className="sticky top-0 bg-gray-100 shadow text-sm">
                  <tr>
                    <th className="border border-gray-300 p-2">Iteration</th>
                    <th className="border border-gray-300 p-2">xl</th>
                    <th className="border border-gray-300 p-2">xr</th>
                    <th className="border border-gray-300 p-2">xm</th>
                    <th className="border border-gray-300 p-2">Error</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {falsepositionRecords.map((record, index) => (
                    <tr key={index} className={`text-center hover:bg-gray-50 `}>
                      <td className="border border-gray-300 p-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {record.xl.toFixed(6)}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {record.xr.toFixed(6)}
                      </td>
                      <td className="border border-gray-300 p-2 font-medium">
                        {record.xm.toFixed(6)}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {record.fxm.toFixed(6)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <PlotlyGraph
              dataX={dataX}
              dataY={dataY}
              graphName="False position Method"
              iterations={falsepositionRecords}
              fx={fx}
            />
          </div>
        )}
      </center>
    </div>
  );
}

export default Falseposition;
