// ตัวอย่างไฟล์ routes/problemRoutes.js (รวม Logic)
const express = require('express');
const router = express.Router();
const Problem = require('../models/Rootfinding');

// GET /api/problems
router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.method) {
            filter.method = req.query.method;
        }
        
        // Logic ดึงข้อมูลอยู่ที่นี่เลย
        const problems = await Problem.find(filter).sort({ method: 1, id: 1 });
        
        res.status(200).json(problems);
    } catch (error) {
        // Logic จัดการ Error อยู่ที่นี่เลย
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

module.exports = router;