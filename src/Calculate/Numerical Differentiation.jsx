import { useState } from "react";
import { evaluate,derivative } from "mathjs";

function NumericalDifferentiation() {
    const [order, setOrder] = useState("");
    const [method, setMethod] = useState("");
    const [error, setError] = useState("");
    const [fx, setFx] = useState("");
    const [x, setX] = useState("");
    const [h, setH] = useState("");
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
    if (fx === "" || x === "" || h === "" || order === "" || method === "" || error === "") {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const X = parseFloat(x);
    const H = parseFloat(h);

    let approx = 0;
    const f = (val) => evaluate(fx, { x: val });

    try {
      // First Derivative
      if (order === "First") {
        if (method === "Forward Difference") {
          if (error === "Oh") approx = (f(X + H) - f(X)) / H;
          else if (error === "Oh^2") approx = (-f(X + 2 * H) + 4 * f(X + H) - 3 * f(X)) / (2 * H);
          else if (error === "Oh^4")
            approx =
              (-25 * f(X) + 48 * f(X + H) - 36 * f(X + 2 * H) + 16 * f(X + 3 * H) - 3 * f(X + 4 * H)) /
              (12 * H);
        } else if (method === "Backward Difference") {
          if (error === "Oh") approx = (f(X) - f(X - H)) / H;
          else if (error === "Oh^2") approx = (3 * f(X) - 4 * f(X - H) + f(X - 2 * H)) / (2 * H);
          else if (error === "Oh^4")
            approx =
              (25 * f(X) - 48 * f(X - H) + 36 * f(X - 2 * H) - 16 * f(X - 3 * H) + 3 * f(X - 4 * H)) /
              (12 * H);
        } else if (method === "Central Difference") {
          if (error === "Oh^2") approx = (f(X + H) - f(X - H)) / (2 * H);
          else if (error === "Oh^4")
            approx = (-f(X + 2 * H) + 8 * f(X + H) - 8 * f(X - H) + f(X - 2 * H)) / (12 * H);
        }
      }

      // Second Derivative
      else if (order === "Second") {
        if (method === "Forward Difference") {
          if (error === "Oh") approx = (f(X + 2 * H) - 2 * f(X + H) + f(X)) / (H * H);
          else if (error === "Oh^2")
            approx = (-f(X + 3 * H) + 4 * f(X + 2 * H) - 5 * f(X + H) + 2 * f(X)) / (H * H);
        } else if (method === "Backward Difference") {
          if (error === "Oh") approx = (f(X) - 2 * f(X - H) + f(X - 2 * H)) / (H * H);
          else if (error === "Oh^2")
            approx = (2 * f(X) - 5 * f(X - H) + 4 * f(X - 2 * H) - f(X - 3 * H)) / (H * H);
        } else if (method === "Central Difference") {
          if (error === "Oh^2") approx = (f(X + H) - 2 * f(X) + f(X - H)) / (H * H);
          else if (error === "Oh^4")
            approx =
              (-f(X + 2 * H) + 16 * f(X + H) - 30 * f(X) + 16 * f(X - H) - f(X - 2 * H)) /
              (12 * H * H);
        }
      }

      // Third Derivative
      else if (order === "Third") {
        if (method === "Forward Difference") {
          approx = (f(X + 3 * H) - 3 * f(X + 2 * H) + 3 * f(X + H) - f(X)) / (H ** 3);
        } else if (method === "Backward Difference") {
          approx = (f(X) - 3 * f(X - H) + 3 * f(X - 2 * H) - f(X - 3 * H)) / (H ** 3);
        } else if (method === "Central Difference") {
          approx = (f(X + 2 * H) - 2 * f(X + H) + 2 * f(X - H) - f(X - 2 * H)) / (2 * H ** 3);
        }
      }

      // Fourth Derivative
      else if (order === "Fourth") {
        if (method === "Forward Difference") {
          approx = (f(X + 4 * H) - 4 * f(X + 3 * H) + 6 * f(X + 2 * H) - 4 * f(X + H) + f(X)) / (H ** 4);
        } else if (method === "Backward Difference") {
          approx = (f(X) - 4 * f(X - H) + 6 * f(X - 2 * H) - 4 * f(X - 3 * H) + f(X - 4 * H)) / (H ** 4);
        } else if (method === "Central Difference") {
          approx = (f(X - 2 * H) - 4 * f(X - H) + 6 * f(X) - 4 * f(X + H) + f(X + 2 * H)) / (H ** 4);
        }
      }

      let d = fx;
      const n =
        order === "First"
          ? 1
          : order === "Second"
          ? 2
          : order === "Third"
          ? 3
          : order === "Fourth"
          ? 4
          : 1;
      for (let i = 0; i < n; i++) {
        d = derivative(d, "x").toString();
      }

      const exact = evaluate(d, { x: X });
      const err = Math.abs(((approx - exact) / exact) * 100);

      setResult({
        orderSymbol:
          order === "First"
            ? "f'(x)"
            : order === "Second"
            ? "f''(x)"
            : order === "Third"
            ? "f‴(x)"
            : "f⁽⁴⁾(x)",
        approx: approx.toFixed(6),
        exact: exact.toFixed(6),
        error: err.toFixed(2),
      });
    } catch (e) {
      alert("เกิดข้อผิดพลาดในการคำนวณ ตรวจสอบสมการ f(x)");
    }
  };

  return (
    <div className='p-6'>
        <h1 className="text-2xl font-bold items-center mb-4 text-center">Numerical Differentiation</h1>
        
        < div className="flex flex-wrap justify-center gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold">Order</label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option>First</option>
            <option>Second</option>
            <option>Third</option>
            <option>Fourth</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold">Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option>Forward Difference</option>
            <option>Backward Difference</option>
            <option>Central Difference</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold">Error</label>
          <select
            value={error}
            onChange={(e) => setError(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option>Oh</option>
            <option>Oh^2</option>
            <option>Oh^4</option>
          </select> 
        </div>
        </div>
        <div className="text-center">
            <input type="text" placeholder="Function f(x)" value={fx} onChange={(e) => setFx(e.target.value)} className="border p-2 m-2 w-64" />
            <input type="number" placeholder="x" value={x} onChange={(e) => setX(e.target.value)} className="border p-2 m-2 w-32" />
            <input type="number" placeholder="h" value={h} onChange={(e) => setH(e.target.value)} className="border p-2 m-2 w-32" />
            <button onClick={handleCalculate} className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600">Calculate</button>
        </div>
        {result && (
        <div className="text-center mt-4 bg-gray-100 p-4 rounded-md w-fit mx-auto">
          <p>{result.orderSymbol.replace("(x)", `(${x})`)} ≈ <b>{result.approx}</b></p>
          <p>Exact {result.orderSymbol.replace("(x)", `(${x})`)} = <b>{result.exact}</b></p>
          <p>Error = <b>{result.error}%</b></p>
        </div>
      )}
    </div>

  )
}

export default NumericalDifferentiation