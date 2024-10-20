const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const Contact = require("../models/contactModel");

const router = express.Router();

// Setup file storage for CSV/Excel
const upload = multer({ dest: "uploads/" });

// Utility function to delete file after processing
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Failed to delete file: ${filePath}`, err);
    } else {
      console.log(`Successfully deleted file: ${filePath}`);
    }
  });
};

// Handle CSV upload and parse
router.post("/csv", upload.single("file"), (req, res) => {
  const results = [];
  const filePath = req.file.path; // Store file path

  console.log("File uploaded:", req.file); // Log file details for debugging

  try {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        console.log("Row data from CSV:", data); // Debugging: log CSV row data

        // Validate the presence of required fields
        if (!data.firstName || !data.lastName || !data.phone || !data.email) {
          throw new Error("Missing required fields in CSV");
        }

        // Map the fields from the CSV to the contact model
        results.push({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          gender: data.gender || "Not specified", // Set default if missing
          consent: data.consent === "true", // Assuming consent is a boolean
        });
      })
      .on("end", async () => {
        try {
          console.log("Inserting data into MongoDB:", results); // Debugging: log data being inserted
          await Contact.insertMany(results); // Save the contacts to MongoDB
          res.status(200).json({ message: "CSV file uploaded and contacts saved." });
        } catch (err) {
          console.error("Failed to save contacts to MongoDB:", err);
          res.status(500).json({ error: "Failed to save contacts from CSV." });
        } finally {
          deleteFile(filePath); // Clean up file after processing
        }
      })
      .on("error", (err) => {
        console.error("Error parsing CSV file:", err);
        res.status(500).json({ error: "Failed to parse CSV file." });
        deleteFile(filePath); // Ensure file is deleted on error
      });
  } catch (error) {
    console.error("File processing error:", error);
    res.status(500).json({ error: "Failed to process the uploaded file." });
    deleteFile(filePath); // Clean up file after processing
  }
});

// Handle Excel upload and parse
router.post("/excel", upload.single("file"), (req, res) => {
  const filePath = req.file.path; // Store file path

  try {
    const workbook = XLSX.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    const formattedData = data.map((entry) => {
      // Validate required fields
      if (!entry.firstName || !entry.lastName || !entry.phone || !entry.email) {
        throw new Error("Missing required fields in Excel");
      }

      return {
        firstName: entry.firstName,
        lastName: entry.lastName,
        phone: entry.phone,
        email: entry.email,
        gender: entry.gender || "Not specified", // Set default if missing
        consent: entry.consent === "true", // Assuming consent is a boolean
      };
    });

    Contact.insertMany(formattedData)
      .then(() => {
        res.status(200).json({ message: "Excel file uploaded and contacts saved." });
      })
      .catch((err) => {
        console.error("Failed to save contacts to MongoDB:", err);
        res.status(500).json({ error: "Failed to save contacts from Excel file." });
      })
      .finally(() => {
        deleteFile(filePath); // Clean up file after processing
      });
  } catch (err) {
    console.error("Excel parsing error:", err);
    res.status(500).json({ error: "Failed to parse Excel file." });
    deleteFile(filePath); // Ensure file is deleted on error
  }
});

module.exports = router;
