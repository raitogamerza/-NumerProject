require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Problem = require('./src/models/Rootfinding');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));


app.get('/api/problems', async (req, res) => {
  try {
    const filter = req.query.method ? { method: req.query.method } : {};
    const problems = await Problem.find(filter).sort({ method: 1, id: 1 });
    res.status(200).json(problems);
  } catch (err) {
    console.error(err.message); 
    res.status(500).json({ message: 'Server Error' });
  }
});


app.get('/api/problems/:methodName/:id', async (req, res) => {
  try {
    const { methodName, id } = req.params;
    const problem = await Problem.findOne({ method: methodName, id: Number(id) });
    if (!problem) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(problem);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
