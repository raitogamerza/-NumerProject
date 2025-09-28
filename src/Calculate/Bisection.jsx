import { useState } from "react";
import { evaluate } from "mathjs";
import { bisectionMethod } from "./root of equations/bisection";
import PlotlyGraph from "../components/PlotlyGraph";

function Bisection() {
  const [fx, setFx] = useState("43x-180");
  const [x0, setX0] = useState("0");
  const [x1, setX1] = useState("10");
  const [tol, setTol] = useState("0.000001");
  const [root, setRoot] = useState(null);
  const [iterations, setIterations] = useState(null);
  const [bisectionRecords, setBisectionRecords] = useState([]);

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

  // ฟังก์ชัน f(x) สำหรับส่งไป plot
  const func = (x) => {
    try {
      return evaluate(fx, { x });
    } catch (e) {
      return NaN;
    }
  };

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
                    <th className="border border-gray-300 px-2 py-1">iteration</th>
                    <th className="border border-gray-300 px-2 py-1">a (xl)</th>
                    <th className="border border-gray-300 px-2 py-1">b (xr)</th>
                    <th className="border border-gray-300 px-2 py-1">xm</th>
                    <th className="border border-gray-300 px-2 py-1">f(x)</th>
                  </tr>
                </thead>
                <tbody>
                  {bisectionRecords.map((rec, idx) => {
                    const residual = Math.abs(evaluate(fx, { x: rec.c }));
                    return (
                      <tr key={idx} className="text-center hover:bg-gray-50">
                        <td className="border border-gray-200 px-2 py-1">{idx + 1}</td>
                        <td className="border border-gray-200 px-2 py-1">{rec.a.toFixed(6)}</td>
                        <td className="border border-gray-200 px-2 py-1">{rec.b.toFixed(6)}</td>
                        <td className="border border-gray-200 px-2 py-1 font-medium">{rec.c.toFixed(6)}</td>
                        <td className="border border-gray-200 px-2 py-1">{evaluate(fx, { x: rec.c }).toFixed(6)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Graph */}
            <PlotlyGraph
              func={func}
              a={parseFloat(x0)}
              b={parseFloat(x1)}
              iterations={bisectionRecords}
              lineMode="last"  // ให้เส้นหยุดที่ c สุดท้าย ไม่ทะลุไปต่อ
            />
          </div>
        )}
      </center>
    </div>
  );
}
export default Bisection;
