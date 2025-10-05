import React from "react";
import Plot from "react-plotly.js";

const OnePointGraph = ({
  dataX,
  dataY,
  iterations,
  graphName,
  uiRevision = "onepoint",
}) => {
  const xs = iterations
    .flatMap((it) => [it.xOld, it.xNew])
    .filter((v) => Number.isFinite(v));
  let minX = xs.length > 0 ? Math.min(...xs) : -5;
  let maxX = xs.length > 0 ? Math.max(...xs) : 5;
  if (!Number.isFinite(minX)) minX = -5;
  if (!Number.isFinite(maxX)) maxX = 5;
  if (minX === maxX) {
    minX -= 1;
    maxX += 1;
  }

  const stairX = [];
  const stairY = [];
  iterations.forEach((item) => {
    stairX.push(item.xOld, item.xOld, item.xNew);
    stairY.push(item.xOld, item.xNew, item.xNew);
  });

  return (
    <div className="flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {graphName}
        </h2>
        <Plot
          data={[
            {
              x: dataX,
              y: dataY,
              type: "scatter",
              mode: "lines",
              name: "g(x)",
              line: { color: "green" },
            },
            {
              x: dataX,
              y: dataX,
              type: "scatter",
              mode: "lines",
              name: "y = x",
              line: { color: "blue" },
            },
            {
              x: stairX,
              y: stairY,
              type: "scatter",
              mode: "lines",
              name: "One-Point",
              line: { color: "red" },
            },
          ]}
          layout={{
            title: graphName,
            xaxis: { title: "x", range: [minX, maxX], autorange: false },
            yaxis: {
              title: "y",
              range: [minX, maxX],
              autorange: false,
              scaleanchor: "x",
              scaleratio: 1,
            },
            margin: { l: 40, r: 40, b: 40, t: 40 },
            height: 450,
            dragmode: "pan",
            uirevision: uiRevision,
          }}
          style={{ width: "100%", height: 450 }}
          config={{ responsive: true, scrollZoom: true, displayModeBar: true }}
        />
      </div>
    </div>
  );
};

export default OnePointGraph;
