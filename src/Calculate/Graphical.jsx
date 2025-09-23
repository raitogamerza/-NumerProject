import React from "react";
import { evaluate } from "mathjs";

function Graphical() {
  const [fx, setFx] = React.useState("43x-1");
  const [start, setstart] = React.useState(0);
  const [finish, setfinish] = React.useState(7);
  const [tolerance, settolerance] = React.useState(0.000001);
  const [GraphicalRecords, setGraphicalRecords] = React.useState([]);


  const func = (x) => {
    try {
      return evaluate(fx, { x });
    } catch {
      return NaN;
    }
  };

  return (
    <>
      <center>
        <h1 className="text-2xl">Graphical Method</h1>
        <input
          type="text"
          placeholder="Enter function f(x)"
          value={fx}
          onChange={(e) => setFx(e.target.value)}
          className="border p-2 m-2 w-64"
        />
        <input
          type="text"
          placeholder="Enter start"
          value={start}
          onChange={(e) => setstart(e.target.value)}
          className="border p-2 m-2 w-32"
        />
        <input
          type="text"
          placeholder="Enter finish"
          value={finish}
          onChange={(e) => setfinish(e.target.value)}
          className="border p-2 m-2 w-32"
        />
        <input
          type="text"
          placeholder="Enter tolerance"
          value={tolerance}
          onChange={(e) => settolerance(e.target.value)}
          className="border p-2 m-2 w-32"
        />
        <br />
        <button
          onClick={() => {
            try {
              const xValues = [];
              const yValues = [];
              const step = (finish - start) / 100;
              for (
                let x = parseFloat(start);
                x <= parseFloat(finish);
                x += step
              ) {
                xValues.push(x);
                yValues.push(evaluate(fx, { x }));
              }
              const data = {
                x: xValues,
                y: yValues,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "blue" },
                name: "f(x)",
              };
              const layout = {
                title: "Graphical Method",
                xaxis: { title: "x" },
                yaxis: { title: "f(x)" },
              };
              window.Plotly.newPlot("graph", [data], layout);
            } catch (err) {
              alert("กรุณากรอกข้อมูลให้ถูกต้อง");
            }
          }}
          className="bg-blue-500 text-white p-2 m-2 rounded"
        >
          Plot Graph
        </button>
        <br />
        <div id="graph" style={{ width: "100%", height: "500px" }}></div>
      </center>
      
    </>
  );
}
export default Graphical;