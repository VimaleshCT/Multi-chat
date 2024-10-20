const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const XLSX = require("xlsx");
const fs = require("fs");
const Contact = require("../models/contactModel");

const router = express.Router();

// Setup file storage for CSV/Excel
const upload = multer({ dest: "uploads/" });

// Handle CSV upload and parse
router.post("/csv", upload.single("file"), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      await Contact.insertMany(results);
      res
        .status(200)
        .json({ message: "CSV file uploaded and contacts saved." });
    });
});

// Handle Excel upload and parse
router.post("/excel", upload.single("file"), (req, res) => {
  const workbook = XLSX.readFile(req.file.path);
  const sheet_name_list = workbook.SheetNames;
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  Contact.insertMany(data)
    .then(() => {
      res
        .status(200)
        .json({ message: "Excel file uploaded and contacts saved." });
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to upload Excel file" })
    );
});

module.exports = router;
