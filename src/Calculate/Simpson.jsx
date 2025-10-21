import {useState} from 'react'

function Simpson() {
    const [fx, setFx] = useState("");
    const [x0, setX0] = useState("");
    const [x1, setX1] = useState("");
    const [result, setResult] = useState(null);
    const [Steps, setSteps] = useState([]);

    const handleCalculate = () => {
        if (fx === "" || x0 === "" || x1 === "") {
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

        if (isNaN(a) || isNaN(b)) {
            alert("กรุณากรอกค่าที่ถูกต้อง");
            return;
        }
        const h = (b - a) / 2;
        const xMid = (a + b) / 2;
        const fa = f(a);
        const fb = f(b);
        const fMid = f(xMid);
        const I = (h / 3) * (fa + 4 * fMid + fb);
        
        let lines = [];
        lines.push(`h = ( ${b} - ${a} ) = ${h}`);
        lines.push(`f(${a}) = ${fa.toFixed(4)}`);
        lines.push(`f(${xMid}) = ${fMid.toFixed(4)}`);
        lines.push(`f(${b}) = ${fb.toFixed(4)}`);
        lines.push(`I = ( ${h} / 3 ) * ( ${fa.toFixed(4)} + 4 * ${fMid.toFixed(4)} + ${fb.toFixed(4)} ) = ${I.toFixed(6)}`);

        setSteps(lines);
        setResult(I);
    };

  return (
    <div className="p-6">
        <h1 className="text-2xl font-bold items-center mb-4 text-center">Simpson's Rule</h1>
        
        <div className="text-center">
            <input type="text" placeholder="Function f(x)" value={fx} onChange={(e) => setFx(e.target.value)} className="border p-2 m-2 w-64" />
            <input type="number" placeholder="a = x0" value={x0} onChange={(e) => setX0(e.target.value)} className="border p-2 m-2 w-32" />
            <input type="number" placeholder="b = x1" value={x1} onChange={(e) => setX1(e.target.value)} className="border p-2 m-2 w-32" />
            
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
export default Simpson;