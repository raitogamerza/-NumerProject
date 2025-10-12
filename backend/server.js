require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Model โดยตรง เนื่องจากไม่มี Controller/Route แยกแล้ว
const Problem = require('./src/models/Rootfinding'); 

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. Middleware ---
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 2. MongoDB Connection ---
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));


// --- 3. API Logic Functions (Controller Logic) ---

const getProblems = async (req, res) => {
    try {
        const filter = {};
        
        // ตรวจสอบ Query Parameter สำหรับการกรองตาม method
        if (req.query.method) {
            filter.method = req.query.method;
        }

        // ค้นหาข้อมูลตาม filter และเรียงตาม method และ id
        const problems = await Problem.find(filter).sort({ method: 1, id: 1 });
        
        // ส่งข้อมูลกลับไปในรูปแบบ JSON
        res.status(200).json(problems);
    } catch (error) {
        console.error("Error fetching problems:", error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Server Error: Could not fetch problems.' 
        });
    }
};

/**
 * @desc    GET problems filtered by method name in the path
 * @route   GET /api/problems/Bisection
 */
const getProblemsByMethod = async (req, res) => {
    try {
        const { methodName } = req.params; // ดึงชื่อ method จาก URL (Path Parameter)
        
        if (!methodName) {
            // ไม่น่าจะเกิดเพราะ Route ถูกกำหนดไว้
            return res.status(400).json({ 
                success: false, 
                message: 'Method name is required in the URL path.' 
            });
        }

        // ค้นหาข้อมูลตาม method name
        const problems = await Problem.find({ method: methodName }).sort({ id: 1 });

        if (problems.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No problems found for method: ${methodName}`
            });
        }
        
        // ส่งข้อมูลกลับไปในรูปแบบ JSON
        res.status(200).json(problems);
    } catch (error) {
        console.error("Error fetching problems by method:", error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Server Error: Could not fetch problems.' 
        });
    }
};

/**
 * @desc    GET a single problem filtered by method name and problem ID
 * @route   GET /api/problems/Bisection/1
 */
const getProblemByMethodAndId = async (req, res) => {
    try {
        // ดึงชื่อ method และ ID จาก URL (Path Parameter)
        const { methodName, id } = req.params;

        if (!methodName || !id) {
            return res.status(400).json({ 
                success: false, 
                message: 'Method name and Problem ID are required in the URL path.' 
            });
        }

        // ค้นหาข้อมูลตาม method name และ ID
        // Note: ต้องแปลง id เป็น Number ก่อน เพราะใน Schema เป็น Number
        const problem = await Problem.findOne({ method: methodName, id: Number(id) });

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: `Problem ID ${id} not found for method: ${methodName}`
            });
        }
        
        // ส่งข้อมูลกลับไปในรูปแบบ JSON
        res.status(200).json(problem);
    } catch (error) {
        console.error("Error fetching single problem:", error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Server Error: Could not fetch the problem.' 
        });
    }
};


// --- 4. Route Definitions (ใช้ app.get() โดยตรง) ---

// Route 1: ดึงทั้งหมด หรือกรองด้วย Query Parameter (?method=...)
// URL ตัวอย่าง: /api/problems หรือ /api/problems?method=Bisection
app.get('/api/problems', getProblems);

// Route 2: ดึงตาม Path Parameter (การ Query ที่ง่ายขึ้น)
// URL ตัวอย่าง: /api/problems/Bisection
app.get('/api/problems/:methodName', getProblemsByMethod);

// Route 3: ดึงโจทย์เฉพาะรายการตาม Method และ ID
// URL ตัวอย่าง: /api/problems/Bisection/1
app.get('/api/problems/:methodName/:id', getProblemByMethodAndId);


// --- 5. Start Server Listener ---
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
