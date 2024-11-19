const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Action type (e.g., 'send_message')
  data: { type: Object, required: true }, // Action-specific data (e.g., message text)
  status: { type: String, default: "active" },
});

const Action = mongoose.model("Action", actionSchema);
module.exports = Action;
