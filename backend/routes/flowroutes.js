const express = require("express");
const multer = require("multer");
const Flow = require("../models/Flow");

const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" }); // Directory to store uploaded files

// Route for saving a flow
router.post("/save-flow", async (req, res) => {
  try {
    const { elements } = req.body;
    const newFlow = new Flow({ elements });
    await newFlow.save();
    res.status(201).json({ message: "Flow saved successfully" });
  } catch (error) {
    console.error("Error saving flow:", error);
    res.status(500).json({ error: "Failed to save flow" });
  }
});

// Route for image upload
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imagePath = req.file.path;
    res.status(200).json({ imagePath });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
});

module.exports = router;
