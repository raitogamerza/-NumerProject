import Plot from 'react-plotly.js';

const PlotlyGraph = ({ func, a, b, iterations, pointsName = "Points", showLabels = true }) => {
  // สร้างข้อมูลแกน x และ y สำหรับ plot ฟังก์ชัน
  const step = (b - a) / 50;
  const x = Array.from({ length: 50 }, (_, i) => a + i * step);
  const y = x.map(func);

  // ดึงจุดจาก iterations (ใช้ .c ถ้ามี, ถ้าเป็น Graphical ก็ยังใช้ได้)
  const cPoints = iterations.map((it) => it.c);
  const cValues = cPoints.map(func);

  return (
    <Plot
      data={[
        {
          x,
          y,
          type: 'scatter',
          mode: 'lines',
          name: 'f(x)',
          line: { color: 'blue' },
        },
        {
          x: cPoints,
          y: cValues,
          type: 'scatter',
          mode: showLabels ? 'markers+text' : 'markers',
          name: pointsName,
          marker: { color: 'red', size: 10 },
          text: showLabels ? cPoints.map((c, i) => `${pointsName}${i + 1}`) : [],
          textposition: 'top center',
        },
      ]}
      layout={{
        title: `${pointsName} Visualization`,
        xaxis: { title: 'x' },
        yaxis: { title: 'f(x)' },
      }}
      style={{ width: '100%', height: '500px' }}
    />
  );
};

export default PlotlyGraph;
