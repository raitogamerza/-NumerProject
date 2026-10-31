import { useState } from "react";
import DatabasePanel from "./DatabasePanel";
import useCalculator from "../hooks/useCalculator";

// หน้าใช้ร่วมของการอินทิเกรต (Trapezoidal, Simpson และแบบ Composite)
function IntegrationPage({ MethodClass, title }) {
  const needsN = MethodClass.needsN;
  const [fx, setFx] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [n, setN] = useState("");
  const [result, setResult] = useState(null);
  const { run, historyVersion } = useCalculator(MethodClass);

  const getInput = () => (needsN ? { fx, a, b, n } : { fx, a, b });
  const loadInput = (input) => {
    if (input.fx !== undefined) setFx(String(input.fx));
    if (input.a !== undefined) setA(String(input.a));
    if (input.b !== undefined) setB(String(input.b));
    if (input.n !== undefined) setN(String(input.n));
  };

  const handleCalculate = () => {
    try {
      setResult(run(getInput()));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold items-center mb-4 text-center">{title}</h1>

      <div className="text-center">
        <input type="text" placeholder="Function f(x)" value={fx} onChange={(e) => setFx(e.target.value)}
          className="border p-2 m-2 w-64" />
        <input type="number" placeholder="a = x0" value={a} onChange={(e) => setA(e.target.value)}
          className="border p-2 m-2 w-32" />
        <input type="number" placeholder="b = x1" value={b} onChange={(e) => setB(e.target.value)}
          className="border p-2 m-2 w-32" />
        {needsN && (
          <input type="number" placeholder="n = 2,4,6" value={n} onChange={(e) => setN(e.target.value)}
            className="border p-2 m-2 w-32" />
        )}
      </div>
      <div className="text-center">
        <button onClick={handleCalculate} className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600">
          Calculate
        </button>
        <DatabasePanel methodName={MethodClass.methodName} getInput={getInput}
          onLoad={loadInput} historyVersion={historyVersion} />
      </div>

      {result && (
        <div className="mt-6 bg-gray-50 border p-4 rounded-lg font-mono text-lg leading-relaxed">
          <h2 className="font-semibold mb-2 text-center">Solution</h2>
          {result.steps.map((line, index) => (
            <p key={index} className="text-center">{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default IntegrationPage;
