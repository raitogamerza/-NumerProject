const mongoose = require('mongoose');
const { METHOD_NAMES, METHODS } = require('../constants/methods');

// ประวัติการคำนวณ: เก็บอินพุตและผลลัพธ์สรุปของแต่ละครั้งที่กด Calculate
const historySchema = new mongoose.Schema(
  {
    method: { type: String, required: true, enum: METHOD_NAMES, index: true },
    category: { type: String },
    input: { type: mongoose.Schema.Types.Mixed, required: true },
    output: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

historySchema.pre('validate', function setCategory() {
  if (this.method) this.category = METHODS[this.method];
});

module.exports = mongoose.model('History', historySchema);
