// โจทย์ตัวอย่างสำหรับทุกวิธี: รูปแบบ input ต้องตรงกับ getInput()/setInput() ของแต่ละหน้าใน frontend
const rootBracket = (method, list) =>
  list.map(([fx, x0, x1, tol = 0.000001]) => ({ method, title: fx, input: { fx, x0, x1, tol } }));

const SPD_3 = { A: [[4, -1, 0], [-1, 4, -1], [0, -1, 4]], B: [2, 4, 10] };
const SPD_3B = { A: [[5, 2, 0], [2, 5, 2], [0, 2, 5]], B: [12, 17, 14] };
const GENERAL_3 = { A: [[2, 1, -1], [-3, -1, 2], [-2, 1, 2]], B: [8, -11, -3] };
const GENERAL_3B = { A: [[1, 2, 3], [2, 5, 3], [1, 0, 8]], B: [14, 21, 25] };

const linearDirect = (method) =>
  [GENERAL_3, GENERAL_3B, SPD_3].map(({ A, B }, i) => ({
    method,
    title: `ระบบ 3×3 #${i + 1}`,
    input: { n: 3, A, B, eps: 0.000001 },
  }));

const linearIterative = (method) =>
  [SPD_3, SPD_3B].map(({ A, B }, i) => ({
    method,
    title: `ระบบ 3×3 (diagonally dominant) #${i + 1}`,
    input: { n: 3, A, B, X0: [0, 0, 0], eps: 0.000001 },
  }));

const integration = (method, list) =>
  list.map(([fx, a, b, n]) => ({
    method,
    title: `∫ ${fx} dx [${a}, ${b}]`,
    input: n === undefined ? { fx, a, b } : { fx, a, b, n },
  }));

module.exports = [
  ...rootBracket('Bisection', [
    ['x^3 - x - 2', 1, 2],
    ['x^2 - 5', 2, 3],
    ['cos(x) - x', 0, 1],
    ['x^3 - 7', 1, 3],
    ['e^x - 3x', 0, 1],
  ]),
  ...rootBracket('False Position', [
    ['x^3 - x - 2', 1, 2],
    ['x^2 - 5', 2, 3],
    ['cos(x) - x', 0, 1],
    ['x^3 - 7', 1, 3],
    ['e^x - 3x', 0, 1],
  ]),
  ...rootBracket('Secant', [
    ['x^2 - 4', 1, 3, 0.0001],
    ['x^2 - 9', 2, 4, 0.0001],
    ['x^2 - 16', 3, 5, 0.0001],
    ['x^2 - 25', 4, 6, 0.0001],
    ['x^2 - 36', 5, 7, 0.0001],
  ]),
  ...[
    ['x^3 - x - 2', 1],
    ['x^2 - 5', 2],
    ['cos(x) - x', 0.5],
    ['x^3 - 7', 2],
    ['e^x - 3x', 0.5],
  ].map(([fx, x0]) => ({ method: 'Newton-Raphson', title: fx, input: { fx, x0, tol: 0.000001 } })),
  ...[
    ['0.5*(x+5)', 0],
    ['(x + 5/x) / 2', 2],
    ['cos(x)', 0.5],
    ['(2x + 7/x^2) / 3', 2],
    ['exp(x) / 3', 0.5],
  ].map(([gx, x0]) => ({ method: 'One-Point', title: `x = ${gx}`, input: { gx, x0, tol: 0.000001 } })),
  ...[
    ['x^2 - 4', -5, 5],
    ['x^2 - 9', -5, 5],
    ['x^3 - 8', 0, 5],
    ['x^2 - 1', -2, 2],
    ['x^2 - 16', -5, 5],
  ].map(([fx, start, end]) => ({ method: 'Graphical', title: fx, input: { fx, start, end, tol: 0.000001 } })),

  ...linearDirect("Cramer's Rule"),
  ...linearDirect('Gauss Elimination'),
  ...linearDirect('Gauss-Jordan'),
  ...linearDirect('LU Decomposition'),
  ...linearDirect('Matrix Inversion'),
  ...linearIterative('Jacobi'),
  ...linearIterative('Gauss-Seidel'),
  ...linearIterative('Conjugate Gradient'),

  {
    method: 'Linear Regression',
    title: 'ข้อมูล 5 จุด',
    input: {
      points: [{ x: 10, y: 5 }, { x: 15, y: 9 }, { x: 20, y: 15 }, { x: 30, y: 18 }, { x: 40, y: 22 }],
      xValue: 65,
    },
  },
  {
    method: 'Polynomial Regression',
    title: 'ข้อมูล 6 จุด, อันดับ 2',
    input: {
      points: [
        { x: 0, y: 2.1 }, { x: 1, y: 7.7 }, { x: 2, y: 13.6 },
        { x: 3, y: 27.2 }, { x: 4, y: 40.9 }, { x: 5, y: 61.1 },
      ],
      order: 2,
      xValue: 6,
    },
  },
  {
    method: 'Multiple Linear Regression',
    title: 'ข้อมูล 6 จุด, 2 ตัวแปร',
    input: {
      numVars: 2,
      points: [
        { x1: 0, x2: 0, y: 5 }, { x1: 2, x2: 1, y: 10 }, { x1: 2.5, x2: 2, y: 9 },
        { x1: 1, x2: 3, y: 0 }, { x1: 4, x2: 6, y: 3 }, { x1: 7, x2: 2, y: 27 },
      ],
      xValues: [3, 4],
    },
  },

  ...integration('Trapezoidal', [['4x^5 - 3x^4 + x^3 - 6x + 2', 2, 8], ['x^2', 0, 3]]),
  ...integration('Composite Trapezoidal', [['4x^5 - 3x^4 + x^3 - 6x + 2', 2, 8, 4], ['sin(x)', 0, 3.14159, 6]]),
  ...integration('Simpson', [['2x^3 - 5x^2 + 3x + 1', 0, 2], ['x^2', 0, 3]]),
  ...integration('Composite Simpson', [['2x^3 - 5x^2 + 3x + 1', 0, 2, 2], ['e^x', 0, 1, 4]]),

  {
    method: 'Numerical Differentiation',
    title: "f'(2) ของ e^x",
    input: { fx: 'e^x', x: 2, h: 0.25, order: 'First', direction: 'Central Difference', error: 'Oh^2' },
  },
  {
    method: 'Numerical Differentiation',
    title: "f''(2) ของ e^(x/3) + x^2",
    input: { fx: 'e^(x/3) + x^2', x: 2, h: 0.25, order: 'Second', direction: 'Forward Difference', error: 'Oh' },
  },
];
