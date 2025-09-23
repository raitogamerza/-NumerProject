
import React from 'react';
import Plot from 'react-plotly.js';

const PlotlyGraph = ({ func, a, b, iterations }) => {
	// สร้างข้อมูลแกน x และ y สำหรับ plot ฟังก์ชัน
	const step = (b - a) / 100;
	const x = Array.from({ length: 101 }, (_, i) => a + i * step);
	const y = x.map(func);

	// สร้างจุดแต่ละรอบของ bisection
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
					mode: 'markers+text',
					name: 'Bisection c',
					marker: { color: 'red', size: 10 },
					text: cPoints.map((c, i) => `c${i+1}`),
					textposition: 'top center',
				},
			]}
			layout={{
				title: 'Bisection Method Visualization',
				xaxis: { title: 'x' },
				yaxis: { title: 'f(x)' },
			}}
			style={{ width: '100%', height: '500px' }}
		/>
	);
};

export default PlotlyGraph;
