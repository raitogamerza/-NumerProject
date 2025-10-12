const mongoose = require('mongoose');

const rootFindingSchema = new mongoose.Schema({
    // ฟิลด์หลักที่ใช้ร่วมกัน
    id: { 
        type: Number, 
        required: true
        // อย่า unique ตรงนี้ เพราะเราจะให้ id ซ้ำกันได้ข้าม method
    },
    method: { 
        type: String, 
        required: true,
        enum: ['Bisection', 'False Position', 'One-Point', 'Newton-Raphson', 'Secant', 'Graphical'] // กำหนดค่าที่ยอมรับ
    },
    tolerance: { 
        type: Number, 
        required: true 
    },
    // ฟิลด์สำหรับวิธีที่ใช้ f(x) (Bisection, False Position, Newton-Raphson, Secant)
    fx: { 
        type: String, 
        required: false 
    },
    // ฟิลด์สำหรับวิธี One-Point Iteration
    gx: { // g(x)
        type: String, 
        required: false 
    },
    // ฟิลด์สำหรับวิธี Graphical
    start: { 
        type: Number,
        required: false
    },
    end: { 
        type: Number,
        required: false
    },
    // ฟิลด์สำหรับค่าเริ่มต้น (x_start, x_lower, x_i)
    x0: { 
        type: Number, 
        required: false // บางวิธีใช้ x0 อย่างเดียว
    },
    
    // ฟิลด์สำหรับช่วงเริ่มต้น/ค่าที่สอง (x_upper, x_i+1)
    x1: { 
        type: Number, 
        required: false // ใช้ใน Bisection, False Position, Secant
    },
});

// สร้าง Compound Index เพื่อให้ id ซ้ำกันได้ใน method ที่ต่างกัน (เช่น Bisection id:1, Newton id:1)
rootFindingSchema.index({ id: 1, method: 1 }, { unique: true });

module.exports = mongoose.model('RootFinding', rootFindingSchema);