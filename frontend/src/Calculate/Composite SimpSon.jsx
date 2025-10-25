import {useState} from 'react'

function CompositeSimpson() {
    const [fx, setFx] = useState("");
    const [x0, setX0] = useState("");
    const [x1, setX1] = useState("");
    const [n, setN] = useState("");
    const [result, setResult] = useState(null);
    const [Steps, setSteps] = useState([]);

    const handleCalculate = () => {
        if (fx === "" || x0 === "" || x1 === "" || n === "") {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return; 
        }
        const f = (x) => {
            try {
                return eval(fx);
            } catch (error) {
                alert("ฟังก์ชันไม่ถูกต้อง");
                throw error;
            }
        };
        const a = parseFloat(x0);
        const b = parseFloat(x1);
        const N = parseInt(n);

        if (isNaN(a) || isNaN(b) || isNaN(N) || N <= 0) {
            alert("กรุณากรอกค่าที่ถูกต้อง");
            return;
        }
        const intervals = 2 * N;
        const h = (b - a) / intervals;
        const fValue = [];
        let sumOdd = 0;
        let sumEven = 0;
        for (let i = 0; i <= intervals; i++) {
            const xi = a + i * h;
            const fxi = f(xi);
            fValue.push({i , xi, fxi});
            if (i !== 0 && i !== intervals) {
                if (i % 2 === 0) sumEven += fxi;
                else sumOdd += fxi;
            }
        }
        const I = (h / 3) * (fValue[0].fxi + fValue[intervals].fxi + 4 * sumOdd + 2 * sumEven);

        
        let lines = [];
        lines.push(`h = ( ${b} - ${a} ) / (2 * ${N}) = ${h}`);
        fValue.forEach(
            (item) =>
                    lines.push(`f(x${item.i} = ${item.xi}) = ${item.fxi.toFixed(4)}`)
        );
        lines.push(`I = ( ${h} / 3 ) [ ${fValue[0].fxi.toFixed(4)} +  ${fValue[intervals].fxi.toFixed(4)} +4(${sumOdd.toFixed(6)}) + 2(${sumEven.toFixed(6)}) ]`);
        lines.push(`I = ${I.toFixed(6)}`);
        setSteps(lines);
        setResult(I);
    };

  return (
    <div className="p-6">
        <h1 className="text-2xl font-bold items-center mb-4 text-center">Composite Simpson's Rule</h1>
        
        <div className="text-center">
            <input type="text" placeholder="Function f(x)" value={fx} onChange={(e) => setFx(e.target.value)} className="border p-2 m-2 w-64" />
            <input type="number" placeholder="a = x0" value={x0} onChange={(e) => setX0(e.target.value)} className="border p-2 m-2 w-32" />
            <input type="number" placeholder="b = x1" value={x1} onChange={(e) => setX1(e.target.value)} className="border p-2 m-2 w-32" />
            <input type="number" placeholder="n = 2,4,6" value={n} onChange={(e) => setN(e.target.value)} className="border p-2 m-2 w-32" />
            
        </div>
        <div className="text-center">
        <button onClick={handleCalculate} className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600">Calculate</button>
        </div>
        
        {result !== null && (
        <div className="mt-6 bg-gray-50 border p-4 rounded-lg font-mono text-lg leading-relaxed">
            <h2 className="font-semibold mb-2 text-center">Solution</h2>
            {Steps.map((line, index) => (
              <p key={index} className="text-center">
                {line}
              </p>
            ))}
          </div>
        )}
    </div>
  )
}
export default CompositeSimpson;