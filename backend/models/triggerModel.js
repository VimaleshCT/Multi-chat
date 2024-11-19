const mongoose = require("mongoose");

const triggerSchema = new mongoose.Schema({
  event: { type: String, required: true },
  data: Object,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Trigger", triggerSchema);
