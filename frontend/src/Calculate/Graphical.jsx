import { useState } from "react";
import PlotlyGraph from "../components/PlotlyGraph";
import DatabasePanel from "../components/DatabasePanel";
import useCalculator from "../hooks/useCalculator";
import { Graphical as GraphicalMethod, MathFunction } from "../methods";

function Graphical() {
  const [fx, setFx] = useState("43x-180");
  const [start, setStart] = useState("0");
  const [finish, setFinish] = useState("10");
  const [tol, setTol] = useState("0.000001");
  const [result, setResult] = useState(null);
  const { run, historyVersion } = useCalculator(GraphicalMethod);

  const getInput = () => ({ fx, start, end: finish, tol });
  const loadInput = (input) => {
    if (input.fx !== undefined) setFx(String(input.fx));
    if (input.start !== undefined) setStart(String(input.start));
    if (input.end !== undefined) setFinish(String(input.end));
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
  const { xs: dataX, ys: dataY } = MathFunction.trySample(fx, start, finish, 100);

  return (
    <div>
      <center>
        <h1 className="text-2xl font-bold mb-4">Graphical Method</h1>

        <input type="text" placeholder="Enter function f(x)" value={fx}
          onChange={(e) => setFx(e.target.value)} className="border p-2 m-2 w-64" />
        <input type="number" placeholder="Enter start" value={start}
          onChange={(e) => setStart(e.target.value)} className="border p-2 m-2 w-32" />
        <input type="number" placeholder="Enter finish" value={finish}
          onChange={(e) => setFinish(e.target.value)} className="border p-2 m-2 w-32" />
        <input type="number" placeholder="Enter tolerance" value={tol}
          onChange={(e) => setTol(e.target.value)} className="border p-2 m-2 w-32" />
        <br />
        <button onClick={handleCalculate} className="bg-blue-500 text-white px-4 py-2 m-2 rounded">
          Calculate
        </button>
        <DatabasePanel methodName={GraphicalMethod.methodName} getInput={getInput}
          onLoad={loadInput} historyVersion={historyVersion} />

        <div className="mt-4">
          <h2 className="text-xl">Result:</h2>
          {result && (
            <>
              <p>Root: {result.root !== null ? result.root.toFixed(6) : "ไม่พบรากในช่วงนี้"}</p>
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
                    <th className="border border-gray-300 px-2 py-1">x</th>
                    <th className="border border-gray-300 px-2 py-1">f(x)</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec, idx) => (
                    <tr key={idx} className="text-center hover:bg-gray-50">
                      <td className="border border-gray-200 px-2 py-1">{idx + 1}</td>
                      <td className="border border-gray-200 px-2 py-1">{Number(rec.x).toFixed(6)}</td>
                      <td className="border border-gray-200 px-2 py-1">{Number(rec.fx).toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <PlotlyGraph dataX={dataX} dataY={dataY} graphName="Graphical Method"
              iterations={records.map((r) => ({ c: r.x }))} fx={fx} />
          </div>
        )}
      </center>
    </div>
  );
}

export default Graphical;
