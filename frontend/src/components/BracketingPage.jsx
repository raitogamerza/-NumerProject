import { useState } from "react";
import { MathFunction } from "../methods";
import PlotlyGraph from "./PlotlyGraph";
import DatabasePanel from "./DatabasePanel";
import useCalculator from "../hooks/useCalculator";

// หน้าใช้ร่วมของวิธีแบบปิดช่วง (Bisection, False Position)
function BracketingPage({ MethodClass, title, defaults }) {
  const [fx, setFx] = useState(defaults.fx);
  const [x0, setX0] = useState(defaults.x0);
  const [x1, setX1] = useState(defaults.x1);
  const [tol, setTol] = useState("0.000001");
  const [result, setResult] = useState(null);
  const { run, historyVersion } = useCalculator(MethodClass);

  const getInput = () => ({ fx, x0, x1, tol });
  const loadInput = (input) => {
    if (input.fx !== undefined) setFx(String(input.fx));
    if (input.x0 !== undefined) setX0(String(input.x0));
    if (input.x1 !== undefined) setX1(String(input.x1));
    if (input.tol !== undefined) setTol(String(input.tol));
  };

  const handleCalculate = () => {
    try {
      setResult(run(getInput()));
    } catch (err) {
      alert(err.message);
    }
  };

  const records = result?.records ?? [];
  const { xs: dataX, ys: dataY } = MathFunction.trySample(fx, x0, x1, 100);

  return (
    <div>
      <center>
        <h1 className="text-2xl font-bold mb-4">{title}</h1>

        <input type="text" placeholder="Enter function f(x)" value={fx}
          onChange={(e) => setFx(e.target.value)} className="border p-2 m-2 w-64" />
        <input type="number" placeholder="Enter x0" value={x0}
          onChange={(e) => setX0(e.target.value)} className="border p-2 m-2 w-32" />
        <input type="number" placeholder="Enter x1" value={x1}
          onChange={(e) => setX1(e.target.value)} className="border p-2 m-2 w-32" />
        <input type="number" placeholder="Enter tolerance" value={tol}
          onChange={(e) => setTol(e.target.value)} className="border p-2 m-2 w-32" />
        <br />

        <button onClick={handleCalculate} className="bg-blue-500 text-white px-4 py-2 m-2 rounded">
          Calculate
        </button>
        <DatabasePanel methodName={MethodClass.methodName} getInput={getInput}
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
            <div className="max-h-72 overflow-y-auto border border-gray-300 rounded shadow-sm">
              <table className="min-w-full border-collapse text-sm">
                <thead className="sticky top-0 bg-gray-100 shadow">
                  <tr>
                    <th className="border border-gray-300 px-2 py-1">iteration</th>
                    <th className="border border-gray-300 px-2 py-1">xl</th>
                    <th className="border border-gray-300 px-2 py-1">xr</th>
                    <th className="border border-gray-300 px-2 py-1">xm</th>
                    <th className="border border-gray-300 px-2 py-1">f(xm)</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec, idx) => (
                    <tr key={idx} className="text-center hover:bg-gray-50">
                      <td className="border border-gray-200 px-2 py-1">{idx + 1}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.xl.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.xr.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1 font-medium">{rec.xm.toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{rec.fxm.toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <PlotlyGraph dataX={dataX} dataY={dataY} graphName={title} iterations={records} fx={fx} />
          </div>
        )}
      </center>
    </div>
  );
}

export default BracketingPage;
