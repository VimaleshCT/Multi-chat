// backend/routes/broadcastRoutes.js
const express = require("express");
const { broadcastMessage } = require("../controllers/broadcastController");
const router = express.Router();

router.post("/broadcast", (req, res) => {
  console.log("Broadcast route accessed"); // Debugging log
  broadcastMessage(req, res);
});

module.exports = router;
