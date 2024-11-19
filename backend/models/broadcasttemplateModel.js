const mongoose = require("mongoose");

const BroadcastTemplateSchema = new mongoose.Schema({
  templateName: { type: String, required: true },
  contentBlocks: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BroadcastTemplate", BroadcastTemplateSchema);
