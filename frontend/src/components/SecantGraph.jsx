import React from "react";
import Plot from "react-plotly.js";

const SecantGraph = ({
  dataX = [],
  dataY = [],
  secantRecords = [],
  graphName = "Graph",
  uiRevision = "secant",
}) => {
  if (!secantRecords || secantRecords.length === 0) return null;

  // ใช้ขอบเขตจาก dataX ถ้ามี ไม่ต้อง evaluate เพิ่ม
  const minX = Number.isFinite(Math.min(...dataX)) ? Math.min(...dataX) : -5;
  const maxX = Number.isFinite(Math.max(...dataX)) ? Math.max(...dataX) : 5;

  const traces = [];

  // เส้น f(x) จากชุดที่คำนวณไว้แล้ว (ไม่เรียก evaluate อีก)
  if (dataX.length && dataY.length) {
    traces.push({
      x: dataX,
      y: dataY,
      type: "scatter",
      mode: "lines",
      name: "f(x)",
      line: { color: "steelblue", width: 2 },
      hoverinfo: "x+y+name",
    });
  }

  // จุดและเส้น secant ในแต่ละรอบ (ใช้ค่าจาก records ตรงๆ)
  const ptsX = [];
  const ptsY = [];
  secantRecords.forEach((r, i) => {
    if (
      Number.isFinite(r.xPrev) &&
      Number.isFinite(r.fPrev) &&
      Number.isFinite(r.xCurr) &&
      Number.isFinite(r.fCurr)
    ) {
      // เส้น secant
      traces.push({
        x: [r.xPrev, r.xCurr],
        y: [r.fPrev, r.fCurr],
        type: "scatter",
        mode: "lines",
        name: `f'(x${i + 1})`,
        line: { color: "tomato", width: 2 },
        hoverinfo: "x+y+name",
      });
      // สะสมจุด
      ptsX.push(r.xPrev, r.xCurr);
      ptsY.push(r.fPrev, r.fCurr);
    }
    // แสดง x_next บนแกน x (ถ้ามีเก็บมาใน record)
    if (Number.isFinite(r.xNext)) {
      traces.push({
        x: [r.xNext],
        y: [0],
        type: "scatter",
        mode: "markers",
        name: "xₙ₊₁",
        marker: { color: "black", size: 6 },
        hoverinfo: "x+name",
      });
    }
  });

  // จุด f(xₙ₋₁), f(xₙ)
  if (ptsX.length) {
    traces.push({
      x: ptsX,
      y: ptsY,
      type: "scatter",
      mode: "markers",
      name: "f(xₙ), f(xₙ₋₁)",
      marker: { color: "black", size: 6 },
      hoverinfo: "x+y+name",
    });
  }

  // เส้นอ้างอิง y = 0
  traces.push({
    x: [minX, maxX],
    y: [0, 0],
    type: "scatter",
    mode: "lines",
    name: "y = 0",
    line: { color: "#777", width: 1 },
    hoverinfo: "skip",
  });


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
            uirevision: uiRevision, // คงช่วงแกนระหว่างพิมพ์
          }}
          style={{ width: "100%", height: "100%" }}
          config={{ responsive: true, scrollZoom: true }}
        />
      </div>
    </div>
  );
};

export default SecantGraph;
