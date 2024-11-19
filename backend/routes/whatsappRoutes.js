const express = require("express");
const router = express.Router();

// Import the whatsappController (or the appropriate controller)
const whatsappController = require("../controllers/whatsappController"); // Ensure the path is correct

// Define the POST route and ensure the callback is correct
router.post("/whatsapp", whatsappController.handlePostRequest);

module.exports = router;
