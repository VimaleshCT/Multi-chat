const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const XLSX = require("xlsx");
const fs = require("fs");
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

// Common function to validate and insert data
const processContacts = async (contacts, res, filePath) => {
  try {
    await Contact.insertMany(contacts);
    res.status(200).json({ message: "File uploaded and contacts saved." });
  } catch (err) {
    console.error("Failed to save contacts to MongoDB:", err);
    res.status(500).json({ error: "Failed to save contacts from file." });
  } finally {
    deleteFile(filePath); // Clean up file after processing
  }
};

// Handle CSV upload and parse
router.post("/csv", upload.single("file"), (req, res) => {
  const results = [];
  const filePath = req.file.path; // Store file path

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => {
      const mappedData = {
        firstName: data["First Name"], // Mapping CSV field to backend field
        lastName: data["Last Name"],
        phone: data["Phone"],
        email: data["Email"],
        gender: data["Gender"] || "Not specified", // Set default if missing
        consent: data["Consent"] === "TRUE", // Assuming consent is a boolean
      };

      if (
        !mappedData.firstName ||
        !mappedData.lastName ||
        !mappedData.phone ||
        !mappedData.email
      ) {
        console.error("Missing required fields in CSV row:", data);
        return; // Skip this row
      }

      results.push(mappedData);
    })
    .on("end", async () => {
      await processContacts(results, res, filePath); // Process contacts
    })
    .on("error", (err) => {
      console.error("Error parsing CSV file:", err);
      res.status(500).json({ error: "Failed to parse CSV file." });
      deleteFile(filePath); // Ensure file is deleted on error
    });
});

// Handle Excel upload and parse
router.post("/excel", upload.single("file"), (req, res) => {
  const filePath = req.file.path; // Store file path

  try {
    const workbook = XLSX.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    const formattedData = data
      .map((entry) => {
        const mappedData = {
          firstName: entry["First Name"], // Mapping Excel field to backend field
          lastName: entry["Last Name"],
          phone: entry["Phone"],
          email: entry["Email"],
          gender: entry["Gender"] || "Not specified", // Set default if missing
          consent: entry["Consent"] === "TRUE", // Assuming consent is a boolean
        };

        // Validate required fields
        if (
          !mappedData.firstName ||
          !mappedData.lastName ||
          !mappedData.phone ||
          !mappedData.email
        ) {
          console.error("Missing required fields in Excel row:", entry);
          return null; // Skip this row
        }

        return mappedData;
      })
      .filter(Boolean); // Filter out any null rows

    processContacts(formattedData, res, filePath); // Process contacts
  } catch (err) {
    console.error("Error processing Excel file:", err);
    res.status(500).json({ error: "Failed to process Excel file." });
    deleteFile(filePath); // Ensure file is deleted on error
  }
});

module.exports = router;
