const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);


const Contact = require("../models/contactModel");
const XLSX = require("xlsx");

// Add a contact
exports.addContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Import contacts from Excel
exports.importContacts = async (req, res) => {
  try {
    const file = req.file;
    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const contactsData = XLSX.utils.sheet_to_json(sheet);

    // Save each contact to DB
    contactsData.forEach(async (row) => {
      const contact = new Contact({
        name: row["Name"],
        phoneNumber: row["Phone"],
        email: row["Email"],
        tags: row["Tags"] ? row["Tags"].split(",") : [],
      });
      await contact.save();
    });

    res
      .status(200)
      .json({ success: true, message: "Contacts imported successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
