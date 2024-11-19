const mongoose = require("mongoose");

const flowSchema = new mongoose.Schema({
  elements: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Flow = mongoose.model("Flow", flowSchema);
module.exports = Flow;
