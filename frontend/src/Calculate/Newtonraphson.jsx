import { useState } from "react";
import NewtonGraph from "../components/Newton-RaphsonGraph";
import DatabasePanel from "../components/DatabasePanel";
import useCalculator from "../hooks/useCalculator";
import { NewtonRaphson } from "../methods";

function Newtonraphson() {
  const [fx, setFx] = useState("x*x - 7");
  const [x0, setX0] = useState("2");
  const [tol, setTol] = useState("0.000001");
  const [result, setResult] = useState(null);
  const [plotFx, setPlotFx] = useState(fx);
  const { run, historyVersion } = useCalculator(NewtonRaphson);

  const getInput = () => ({ fx, x0, tol });
  const loadInput = (input) => {
    if (input.fx !== undefined) setFx(String(input.fx));
    if (input.x0 !== undefined) setX0(String(input.x0));
    if (input.tol !== undefined) setTol(String(input.tol));
  };

  const handleCalculate = () => {
    try {
      setResult(run(getInput()));
      setPlotFx(fx);
    } catch (err) {
      alert(err.message);
    }
  };

  const records = result?.records ?? [];

  return (
    <div>
      <center>
        <h1 className="text-2xl font-bold mb-4">Newton-Raphson Method</h1>

        <input type="text" placeholder="Enter function f(x)" value={fx}
          onChange={(e) => setFx(e.target.value)} className="border p-2 m-2 w-64" />
        <input type="number" placeholder="Enter x0" value={x0}
          onChange={(e) => setX0(e.target.value)} className="border p-2 m-2 w-32" />
        <input type="number" placeholder="Enter tolerance" value={tol}
          onChange={(e) => setTol(e.target.value)} className="border p-2 m-2 w-32" />
        <br />
        <button onClick={handleCalculate} className="bg-blue-500 text-white px-4 py-2 m-2 rounded">
          Calculate
        </button>
        <DatabasePanel methodName={NewtonRaphson.methodName} getInput={getInput}
          onLoad={loadInput} historyVersion={historyVersion} />

        <h2 className="text-xl">Result:</h2>
        {result && (
          <div>
            <p>Root: {result.root.toFixed(6)}</p>
            <p>Iterations: {result.iterations}</p>
          </div>
        )}
        {records.length > 0 && (
          <div className="mt-6 w-11/12 md:w-5/6">
            <h2 className="text-xl mb-2">Iterations Table:</h2>
            <div className="max-h-72 overflow-y-auto border border-gray-300 rounded shadow-sm">
              <table className="min-w-full border-collapse">
                <thead className="sticky top-0 bg-gray-100 shadow text-sm">
                  <tr>
                    <th className="border border-gray-300 px-2 py-1">Iteration</th>
                    <th className="border border-gray-300 px-2 py-1">x</th>
                    <th className="border border-gray-300 px-2 py-1">f(x)</th>
                    <th className="border border-gray-300 px-2 py-1">f'(x)</th>
                    <th className="border border-gray-300 px-2 py-1">x Next</th>
                    <th className="border border-gray-300 px-2 py-1">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec) => (
                    <tr key={rec.iter} className="text-center hover:bg-gray-50">
                      <td className="border border-gray-200 px-2 py-1">{rec.iter}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.x.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.fx.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.dfx.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.xNext.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.error.toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <NewtonGraph iterations={records} fx={plotFx} graphName="Newton-Raphson Method" />
          </div>
        )}
      </center>
    </div>
  );
}

export default Newtonraphson;
