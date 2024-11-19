const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  // Combining both schemas, including all necessary fields
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  name: { type: String }, // Optional, to maintain flexibility for using a single "name" field
  phone: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String },
  consent: { type: Boolean, default: false }, // Consent field
});

module.exports = mongoose.model("Contact", contactSchema);
