const express = require("express");
const router = express.Router();
const Analytics = require("../models/analyticsmodel"); // Import your Analytics model

// Define the analytics route
router.get("/analytics", async (req, res) => {
  try {
    // Fetch the analytics data from the database
    const analytics = await Analytics.findOne();

    console.log("Fetched analytics:", analytics); // Log the fetched data

    // If no analytics data exists, send default values
    if (!analytics) {
      return res.status(200).json({
        monthlyMessages: 7,
        totalMessages: 7,
        broadcasts: { sent: 2, failed: 5 },
        automations: { sent: 1, failed: 4 },
      });
    }

    res.json(analytics);
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({ error: "Failed to fetch analytics data" });
  }
});

module.exports = router;
