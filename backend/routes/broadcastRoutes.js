const express = require("express");
const router = express.Router();
const BroadcastTemplate = require("../models/broadcasttemplateModel"); // Model to save broadcast template

// Endpoint to save broadcast data
router.post("/save", async (req, res) => {
  const { contentBlocks } = req.body;

  if (!contentBlocks || !Array.isArray(contentBlocks)) {
    return res.status(400).json({ error: "Invalid broadcast content" });
  }

  try {
    const broadcastTemplate = new BroadcastTemplate({
      templateName: "Sample Broadcast", // You can add logic for dynamic naming
      contentBlocks,
    });
    await broadcastTemplate.save();
    res
      .status(201)
      .json({ message: "Broadcast saved successfully", broadcastTemplate });
  } catch (error) {
    console.error("Error saving broadcast:", error);
    res.status(500).json({ error: "Failed to save broadcast" });
  }
});

module.exports = router;
