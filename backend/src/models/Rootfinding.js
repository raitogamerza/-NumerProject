const mongoose = require('mongoose');

const rootFindingSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true
    },
    method: { 
        type: String, 
        required: true,
        enum: ['Bisection', 'False Position', 'One-Point', 'Newton-Raphson', 'Secant', 'Graphical']
    },
    tolerance: { 
        type: Number, 
        required: true 
    },
    fx: { 
        type: String, 
        required: false 
    },
    gx: {
        type: String, 
        required: false 
    },
    start: { 
        type: Number,
        required: false
    },
    end: { 
        type: Number,
        required: false
    },
    x0: { 
        type: Number, 
        required: false 
    },
    x1: { 
        type: Number, 
        required: false 
    },
});

rootFindingSchema.index({ id: 1, method: 1 }, { unique: true });

module.exports = mongoose.model('RootFinding', rootFindingSchema);