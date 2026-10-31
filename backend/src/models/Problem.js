const mongoose = require('mongoose');
const { METHOD_NAMES, METHODS } = require('../constants/methods');

// โจทย์ตัวอย่างของทุกวิธี: อินพุตแต่ละวิธีมีรูปแบบต่างกัน จึงเก็บไว้ใน input (Mixed)
const problemSchema = new mongoose.Schema(
  {
    method: { type: String, required: true, enum: METHOD_NAMES, index: true },
    category: { type: String },
    title: { type: String, default: '' },
    input: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

problemSchema.pre('validate', function setCategory() {
  if (this.method) this.category = METHODS[this.method];
});

module.exports = mongoose.model('Problem', problemSchema);
