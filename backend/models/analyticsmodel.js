const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  monthlyMessages: { type: Number, default: 7 },
  totalMessages: { type: Number, default: 7 },
  broadcasts: {
    sent: { type: Number, default: 2 },
    failed: { type: Number, default: 5 },
  },
  automations: {
    sent: { type: Number, default: 1 },
    failed: { type: Number, default: 4 },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Analytics", analyticsSchema);
