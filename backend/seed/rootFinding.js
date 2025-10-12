require('dotenv').config();
const mongoose = require('mongoose');
const Problem = require('../src/models/Rootfinding');

// 2. ข้อมูลตัวอย่าง (Seed Data)
const allProblemData = [
    // --- Bisection ---
    { id: 1, method: "Bisection", fx: "x^3 - x - 2", x0: 1, x1: 2, tolerance: 0.000001 },
    { id: 2, method: "Bisection", fx: "x^2 - 5", x0: 2, x1: 3, tolerance: 0.000001 },
    { id: 3, method: "Bisection", fx: "cos(x) - x", x0: 0, x1: 1, tolerance: 0.000001 },
    { id: 4, method: "Bisection", fx: "x^3 - 7", x0: 1, x1: 3, tolerance: 0.000001 },
    { id: 5, method: "Bisection", fx: "e^x - 3x", x0: 0, x1: 1, tolerance: 0.000001 },
    
    
    // --- Newton-Raphson ---
    { id: 1, method: "Newton-Raphson", fx: "x^3 - x - 2", x0: 1, tolerance: 0.000001 },
    { id: 2, method: "Newton-Raphson", fx: "x^2 - 5", x0: 2, tolerance: 0.000001 },
    { id: 3, method: "Newton-Raphson", fx: "cos(x) - x", x0: 0.5, tolerance: 0.000001 },
    { id: 4, method: "Newton-Raphson", fx: "x^3 - 7", x0: 2, tolerance: 0.000001 },
    { id: 5, method: "Newton-Raphson", fx: "e^x - 3x", x0: 0.5, tolerance: 0.000001 },

    // --- False Position ---
    { id: 1, method: "False Position", fx: "x^3 - x - 2", x0: 1, x1: 2, tolerance: 0.000001 },
    { id: 2, method: "False Position", fx: "x^2 - 5", x0: 2, x1: 3, tolerance: 0.000001 },
    { id: 3, method: "False Position", fx: "cos(x) - x", x0: 0, x1: 1, tolerance: 0.000001 },
    { id: 4, method: "False Position", fx: "x^3 - 7", x0: 1, x1: 3, tolerance: 0.000001 },
    { id: 5, method: "False Position", fx: "e^x - 3x", x0: 0, x1: 1, tolerance: 0.000001 },
    
    // --- One-Point Iteration (Fixed-Point) ---
    { id: 1, method: "One-Point", gx: "0.5*(x+5)", x0: 0, tolerance: 0.000001 },
    { id: 2, method: "One-Point", gx: "sqrt(5)", x0: 2, tolerance: 0.000001 },
    { id: 3, method: "One-Point", gx: "cos(x)", x0: 0.5, tolerance: 0.000001 },
    { id: 4, method: "One-Point", gx: "cube_root(7)", x0: 2, tolerance: 0.000001 },
    { id: 5, method: "One-Point", gx: "ln(3x)", x0: 0.5, tolerance: 0.000001 },

    // --- Secant ---
    { id: 1, method: "Secant", fx: "x^2 - 4", x0: 1, x1: 3, tolerance: 0.0001 },
    { id: 2, method: "Secant", fx: "x^2 - 9", x0: 2, x1: 4, tolerance: 0.0001 },
    { id: 3, method: "Secant", fx: "x^2 - 16", x0: 3, x1: 5, tolerance: 0.0001 },
    { id: 4, method: "Secant", fx: "x^2 - 25", x0: 4, x1: 6, tolerance: 0.0001 },
    { id: 5, method: "Secant", fx: "x^2 - 36", x0: 5, x1: 7, tolerance: 0.0001 },

    // --- Graphical --- //
    { id: 1, method: "Graphical", fx: "x^2 - 4", start: -5, end: 5, tolerance: 0.000001 },
    { id: 2, method: "Graphical", fx: "x^2 - 9", start: -5, end: 5, tolerance: 0.000001 },
    { id: 3, method: "Graphical", fx: "x^3 - 8", start: 0, end: 5, tolerance: 0.000001 },
    { id: 4, method: "Graphical", fx: "x^2 - 1", start: -2, end: 2, tolerance: 0.000001 },
    { id: 5, method: "Graphical", fx: "x^2 - 16", start: -5, end: 5, tolerance: 0.000001 }
];

// Function to assign Ids starting from 1 for each method
const assignIdsByMethod = (data) => {
  const grouped = {};
  data.forEach(item => {
    if (!grouped[item.method]) grouped[item.method] = [];
    grouped[item.method].push(item);
  });

  const result = [];
  Object.keys(grouped).forEach(method => {
    grouped[method].forEach((item, index) => {
      result.push({
        ...item,
        Id: index + 1, // Start from 1 for each method
      });
    });
  });

  return result;
};

const allProblemDataWithIds = assignIdsByMethod(allProblemData);

// 3. ฟังก์ชัน seedDB
const seedDB = async () => {
    try {
    await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected!');

        // --- A. ล้างข้อมูลเก่า ---
    // ลบข้อมูลทั้งหมดใน Collection 'RootFinding'
    await Problem.deleteMany({});
        console.log('Existing problem data cleared.');

        // --- B. ใส่ข้อมูลใหม่ ---
    await Problem.insertMany(allProblemDataWithIds);
         console.log(`✅ Inserted ${allProblemDataWithIds.length} problems`);

    await mongoose.connection.close();
        console.log('MongoDB Connection Closed.');

    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    }
};

seedDB();