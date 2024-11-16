const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String },
  consent: { type: Boolean, default: false },
});

module.exports = mongoose.model("Contact", contactSchema);