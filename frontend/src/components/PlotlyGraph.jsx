import React from "react";
import Plot from "react-plotly.js";
import { evaluate } from "mathjs";

const PlotlyGraph = ({ dataX, dataY, graphName, iterations, fx }) => {
  const iterX =
    iterations.length > 0 ? iterations.map((item) => Number(item.c)) : [];
  const iterY = iterX.map((x) => evaluate(fx, { x }));

  const rootX = iterX.length > 0 ? iterX[iterX.length - 1] : null;
  const rootY = iterY.length > 0 ? iterY[iterY.length - 1] : null;

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
              name: "f(x)",
              line: { color: "red", width: 2 },
            },
            // จุด iteration
            {
              x: iterX,
              y: iterY,
              type: "scatter",
              mode: "markers",
              name: "Iterations",
              marker: { color: "blue", size: 8 },
              text: iterX.map(
                (x, i) => `iteration = ${i + 1}, x = ${x}, f(x) = ${iterY[i]}`
              ),
              hoverinfo: "text",
            },
          ]}
          layout={{
            title: graphName,
            xaxis: { title: "X", zeroline: true },
            yaxis: { title: "Y", zeroline: true },
            margin: { t: 50, l: 50, r: 30, b: 50 },
            dragmode: "pan",
          }}
          style={{ width: "100%", height: "100%" }}
          config={{
            responsive: true,
            scrollZoom: true,
          }}
        />
      </div>
    </div>
  );
};

export default PlotlyGraph;
