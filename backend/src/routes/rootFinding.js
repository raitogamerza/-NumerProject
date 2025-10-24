const express = require('express');
const router = express.Router();
const Problem = require('../models/Rootfinding');

router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.method) {
            filter.method = req.query.method;
        }
        const problems = await Problem.find(filter).sort({ method: 1, id: 1 });
        
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

module.exports = router;