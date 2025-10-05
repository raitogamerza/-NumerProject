import React from "react";
import { evaluate } from "mathjs";
import PlotlyGraph from "../components/PlotlyGraph";
import { graphicalMethod } from "./root of equations/Graphical";

function Graphical() {
  const [fx, setFx] = React.useState("43x-180");
  const [start, setStart] = React.useState("0");
  const [finish, setFinish] = React.useState("10");
  const [tol, setTol] = React.useState("0.000001");
  const [root, setRoot] = React.useState(null);
  const [iterations, setIterations] = React.useState(null);
  const [GraphicalRecords, setGraphicalRecords] = React.useState([]);


  const handleCalculate = () => {
    try {
      const { root, iterations, records } = graphicalMethod(fx,start,finish);
      setRoot(root);
      setIterations(iterations);
      setGraphicalRecords(records);
    } catch (err) {
      alert(err.message);
    }
  };

  const dataX = [];
  const dataY = [];
  for (
    let x = parseFloat(start);
    x <= parseFloat(finish);
    x += 0.1
  ) {
    dataX.push(x);
    dataY.push(evaluate(fx, { x }));
  }


  return (
    <div>
      <center>
        <h1 className="text-2xl">Graphical Method</h1>

        <input
          type="text"
          placeholder="Enter function f(x)"
          value={fx}
          onChange={(e) => setFx(e.target.value)}
          className="border p-2 m-2 w-64"
        />
        <input
          type="Number"
          placeholder="Enter start"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border p-2 m-2 w-32"
        />
        <input
          type="Number"
          placeholder="Enter finish"
          value={finish}
          onChange={(e) => setFinish(e.target.value)}
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
              <p>Iterations: {iterations !== null ? iterations : "-"}</p>
            </>
          )}
        </div>

        {GraphicalRecords.length > 0 && (
          <div className="mt-6 w-11/12 md:w-5/6">
            <h2 className="text-lg font-bold mb-2">Iterations Table</h2>
            <div className="max-h-72 overflow-y-auto border border-gray-300 rounded shadow-sm">
              <table className="min-w-full border-collapse text-sm">
                <thead className="sticky top-0 bg-gray-100 shadow">
                  <tr>
                    <th className="border border-gray-300 px-2 py-1">iteration</th>
                    <th className="border border-gray-300 px-2 py-1">x</th>
                    <th className="border border-gray-300 px-2 py-1">f(x)</th>
                  </tr>
                </thead>
                <tbody>
                  {GraphicalRecords.map((rec, idx) => (
                    <tr key={idx} className="text-center hover:bg-gray-50">
                      <td className="border border-gray-200 px-2 py-1">{idx + 1}</td>
                      <td className="border border-gray-200 px-2 py-1">{Number(rec.x).toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{Number(rec.fx).toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <PlotlyGraph
              dataX={dataX}
              dataY={dataY}
              graphName="Graphical Method"
              iterations={GraphicalRecords}
              fx={fx}
            />
          </div>
        )}
      </center>
    </div>
  );
}

export default Graphical;
