const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes"); // Import contact routes
const uploadRoutes = require("./routes/uploadRoutes"); // Import CSV/Excel upload routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Database connection
mongoose
  .connect("mongodb://localhost:27017/contactsdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/upload", uploadRoutes); // CSV/Excel file upload route

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
