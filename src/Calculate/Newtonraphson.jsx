import React from "react";
import { NewtonraphsonMethod } from "./root of equations/Newtonraphson";
import { evaluate } from "mathjs";
import PlotlyGraph from "../components/PlotlyGraph";

function Newtonraphson() {
  const [fx, setFx] = React.useState("x*x - 7");
  const [x0, setX0] = React.useState("2");
  const [tol, setTol] = React.useState("0.000001");
  const [root, setRoot] = React.useState(null);
  const [iterations, setIterations] = React.useState(null);
  const [newtonraphsonRecords, setNewtonraphsonRecords] = React.useState([]);

  const handleCalculate = () => {
    try {
      const { root, iterations, records } = NewtonraphsonMethod(fx, x0, tol);
      setRoot(root);
      setIterations(iterations);
      setNewtonraphsonRecords(records);
    } catch (error) {
      alert(error.message);
    }
  };

  const dataX = [];
  const dataY = [];
  const step = 0.1;
  for (let x = parseFloat(x0) - 10; x <= parseFloat(x0) + 10; x += step) {
    dataX.push(x);
    dataY.push(evaluate(fx, { x }));
  }
  return (
    <div>
      <center>
        <h1 className="text-2xl">Newton-Raphson Method </h1>

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
        <h2 className="text-xl">Result:</h2>
        {root !== null && (
          <div>
            <p>Root: {root.toFixed(6)}</p>
            <p>Iterations: {iterations}</p>
          </div>
        )}
        {newtonraphsonRecords.length > 0 && (
          <div className="mt-6 w-11/12 md:w-5/6">
            <h2 className="text-xl mb-2">Iterations Table:</h2>
            <div className="max-h-72 overflow-y-auto border border-gray-300 rounded shadow-sm">
              <table className="min-w-full border-collapse ">
                <thead className="sticky top-0 bg-gray-100 shadow text-sm">
                  <tr>
                    <th className="border border-gray-300 px-2 py-1">
                      Iteration
                    </th>
                    <th className="border border-gray-300 px-2 py-1">x</th>
                    <th className="border border-gray-300 px-2 py-1">f(x)</th>
                    <th className="border border-gray-300 px-2 py-1">f'(x)</th>
                    <th className="border border-gray-300 px-2 py-1">x Next</th>
                    <th className="border border-gray-300 px-2 py-1">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {newtonraphsonRecords.map((record, idx) => (
                    <tr key={idx} className="text-center hover:bg-gray-50">
                      <td className="border border-gray-200 px-2 py-1">
                        {record.iter}
                      </td>
                      <td className="border border-gray-200 px-2 py-1">
                        {record.x.toFixed(6)}
                      </td>
                      <td className="border border-gray-200 px-2 py-1">
                        {record.fx.toFixed(6)}
                      </td>
                      <td className="border border-gray-200 px-2 py-1">
                        {record.dfx.toFixed(6)}
                      </td>
                      <td className="border border-gray-200 px-2 py-1">
                        {record.xNext.toFixed(6)}
                      </td>
                      <td className="border border-gray-200 px-2 py-1">
                        {record.error.toFixed(6)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <PlotlyGraph
              dataX={dataX}
              dataY={dataY}
              graphName={"Newton-Raphson Method"}
              iterations={newtonraphsonRecords}
              fx={fx}
            />
          </div>
        )}
      </center>
    </div>
  );
}

export default Newtonraphson;
