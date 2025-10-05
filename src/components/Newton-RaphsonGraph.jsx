import React from "react";
import Plot from "react-plotly.js";
import { evaluate } from "mathjs";

const safeEval = (expr, scope) => {
  try {
    return evaluate(expr, scope);
  } catch {
    return NaN;
  }
};

const NewtonGraph = ({ iterations, fx, graphName, uiRevision = "newton" }) => {
  if (!iterations || iterations.length === 0) return null;

  // สร้างโดเมนจากจุด iteration
  const xs = iterations.map((it) => it.x).filter(Number.isFinite);
  let minX = Math.min(...xs);
  let maxX = Math.max(...xs);
  if (!Number.isFinite(minX) || !Number.isFinite(maxX)) {
    minX = -5;
    maxX = 5;
  }
  if (minX === maxX) {
    minX -= 1;
    maxX += 1;
  }
  const span = Math.max(1e-3, maxX - minX);
  const step = span / 200;

  // เส้น f(x) (ประเมินแบบปลอดภัย)
  const funcX = [];
  const funcY = [];
  for (let x = minX; x <= maxX + 1e-12; x += step) {
    funcX.push(x);
    funcY.push(safeEval(fx, { x })); // ใช้ค่าที่ผ่าน try/catch แล้ว
  }

  const traces = [
    {
      x: funcX,
      y: funcY,
      type: "scatter",
      mode: "lines",
      name: "f(x)",
      line: { color: "blue", width: 2 },
    },
    {
      x: iterations.map((it) => it.x),
      y: iterations.map((it) => it.fx),
      mode: "markers",
      type: "scatter",
      name: "f(xi)",
      marker: { color: "black", size: 7 },
      text: iterations.map((_, i) => `x${i}`),
      hoverinfo: "text+x+y",
    },
  ];

  // เส้นแทนเจนต์จาก (xi, f(xi)) → (xi+1, 0)
  for (let i = 0; i < iterations.length - 1; i++) {
    const { x, fx: fxi, xNext } = iterations[i]; // เปลี่ยนชื่อ fxi กันชนกับพารามิเตอร์ fx
    if (!Number.isFinite(x) || !Number.isFinite(fxi) || !Number.isFinite(xNext))
      continue;
    traces.push({
      x: [x, xNext],
      y: [fxi, 0],
      type: "scatter",
      mode: "lines+markers",
      name: `f'(x${i})`,
      line: { color: "red", width: 2 },
      marker: { color: "black", size: 5 },
      hoverinfo: "x+y+name",
    });
  }

  return (
    <div className="flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {graphName}
        </h2>
        <Plot
          data={traces}
          layout={{
            title: graphName,
            xaxis: {
          title: "x",
          zeroline: true,
          range: [minX, maxX],
          autorange: false,
        },
        yaxis: { title: "y", zeroline: true },
        margin: { t: 50, l: 50, r: 30, b: 50 },
        height: 450,
        dragmode: "pan",
        showlegend: true,
        uirevision: uiRevision, // คงช่วงแกนระหว่างพิมพ์ input
      }}
      style={{ width: "100%", height: "100%" }}
      config={{ responsive: true, scrollZoom: true }}
    />
        </div>
    </div>
  );
};

export default NewtonGraph;
