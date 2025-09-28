import React from 'react'
import { evaluate } from 'mathjs';
import { FalsepositionMethod } from './root of equations/Falseposition';
import PlotlyGraph from "../components/PlotlyGraph";


function Falseposition() {
  const [fx, setFx] = React.useState('43x-180');
  const [x0, setX0] = React.useState('0');
  const [x1, setX1] = React.useState('10');
  const [tol, setTol] = React.useState('0.000001');
  const [root, setRoot] = React.useState(null);
  const [iterations, setIterations] = React.useState(null);
  const [falsepositionRecords, setFalsepositionRecords] = React.useState([]);

  const handleCalculate = () => {
    try {
      const { root, iterations, records } = FalsepositionMethod(fx, x0, x1, tol);
      setRoot(root);
      setIterations(iterations);
      setFalsepositionRecords(records);
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

  const tolValue = parseFloat(tol);

  const formatNumber = (value, decimals = 6) => {
    if (value === null || value === undefined || isNaN(value)) return '-';
    // Round to the specified decimals (tolerance precision)
    const num = Number(value);
    return num.toFixed(decimals);
  };

  return (
    <div>
      <center>
        <h1 className='text-2xl'>False position</h1>
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
        <div className='mt-4'>
          <h2 className="text-xl">Results</h2>
        {root !== null && (
          <div className="mt-4">
            <p className="text-lg">Root: {root}</p>
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
                    <th className="border border-gray-300 p-2">Iter</th>
                    <th className="border border-gray-300 p-2">xl</th>
                    <th className="border border-gray-300 p-2">xr</th>
                    <th className="border border-gray-300 p-2">xm</th>
                    <th className="border border-gray-300 p-2">f(xm)</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {falsepositionRecords.map((record, index) => {
                    const highlight = Math.abs(record.fxm) <= tolValue;
                    return (
                      <tr
                        key={index}
                        className={`text-center hover:bg-gray-50 `}
                      >
                        <td className="border border-gray-300 p-2">{index + 1}</td>
                        <td className="border border-gray-300 p-2">{formatNumber(record.xl)}</td>
                        <td className="border border-gray-300 p-2">{formatNumber(record.xr)}</td>
                        <td className="border border-gray-300 p-2 font-medium">{formatNumber(record.xm)}</td>
                        <td className="border border-gray-300 p-2">{formatNumber(record.fxm)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-1">Values rounded to tolerance precision (6 decimals). Green row indicates |f(xm)| ≤ tolerance.</p>
          </div>
        )}
      </center>
    </div>

  )
}

export default Falseposition