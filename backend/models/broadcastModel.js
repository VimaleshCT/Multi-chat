const mongoose = require("mongoose");

const BroadcastHistorySchema = new mongoose.Schema({
  message: { type: String, required: true },
  status: { type: String, required: true },
  contacts: [
    {
      name: { type: String },
      phone: { type: String, required: true },
      status: { type: String },
      error: { type: String },
    },
  ],
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BroadcastHistory", BroadcastHistorySchema);
