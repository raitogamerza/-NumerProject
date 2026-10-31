import { useState } from "react";
import DatabasePanel from "../components/DatabasePanel";
import useCalculator from "../hooks/useCalculator";
import { NumericalDifferentiation as Differentiation } from "../methods";

function NumericalDifferentiation() {
  const [order, setOrder] = useState(Differentiation.ORDERS[0]);
  const [direction, setDirection] = useState(Differentiation.DIRECTIONS[0]);
  const [error, setError] = useState(Differentiation.ERRORS[0]);
  const [fx, setFx] = useState("");
  const [x, setX] = useState("");
  const [h, setH] = useState("");
  const [result, setResult] = useState(null);
  const { run, historyVersion } = useCalculator(Differentiation);

  const getInput = () => ({ fx, x, h, order, direction, error });
  const loadInput = (input) => {
    if (input.fx !== undefined) setFx(String(input.fx));
    if (input.x !== undefined) setX(String(input.x));
    if (input.h !== undefined) setH(String(input.h));
    if (input.order) setOrder(input.order);
    if (input.direction) setDirection(input.direction);
    if (input.error) setError(input.error);
    setResult(null);
  };

  const handleCalculate = () => {
    try {
      setResult({ ...run(getInput()), x });
    } catch (e) {
      alert(e.message);
    }
  };

  const select = (label, value, onChange, options) => (
    <div>
      <label className="block text-sm font-semibold">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="border p-2 rounded-md">
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  const symbolAt = result ? result.orderSymbol.replace("(x)", `(${result.x})`) : "";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold items-center mb-4 text-center">Numerical Differentiation</h1>

      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {select("Order", order, setOrder, Differentiation.ORDERS)}
        {select("Method", direction, setDirection, Differentiation.DIRECTIONS)}
        {select("Error", error, setError, Differentiation.ERRORS)}
      </div>
      <div className="text-center">
        <input type="text" placeholder="Function f(x)" value={fx} onChange={(e) => setFx(e.target.value)}
          className="border p-2 m-2 w-64" />
        <input type="number" placeholder="x" value={x} onChange={(e) => setX(e.target.value)}
          className="border p-2 m-2 w-32" />
        <input type="number" placeholder="h" value={h} onChange={(e) => setH(e.target.value)}
          className="border p-2 m-2 w-32" />
        <button onClick={handleCalculate} className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600">
          Calculate
        </button>
        <br />
        <DatabasePanel methodName={Differentiation.methodName} getInput={getInput}
          onLoad={loadInput} historyVersion={historyVersion} />
      </div>
      {result && (
        <div className="text-center mt-4 bg-gray-100 p-4 rounded-md w-fit mx-auto">
          <p>{symbolAt} ≈ <b>{result.approx.toFixed(6)}</b></p>
          <p>Exact {symbolAt} = <b>{result.exact.toFixed(6)}</b></p>
          <p>Error = <b>{result.error.toFixed(2)}%</b></p>
        </div>
      )}
    </div>
  );
}

export default NumericalDifferentiation;
