require("dotenv").config();
const express = require("express");
const axios = require("axios");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Importing route files
const analyticsRoutes = require("./routes/analyticsRoutes");
const broadcastRoutes = require("./routes/broadcastRoutes");
const contactRoutes = require("./routes/contactRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Socket.IO for real-time communication

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// MongoDB Setup
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Use analytics route
app.use("/api", analyticsRoutes);

// Broadcast Routes
app.use("/api/broadcast", broadcastRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/upload", uploadRoutes);

// Real-time socket connection handling
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Broadcast Route to handle broadcasting messages
app.post("/api/broadcast", async (req, res) => {
  const { message, recipient } = req.body;
  if (!message || !recipient)
    return res
      .status(400)
      .json({ error: "Message and recipient are required" });

  // Save Broadcast to DB
  const broadcast = new Broadcast({ message, status: "Pending", recipient });
  await broadcast.save();

  // Simulate sending message and update status
  try {
    await sendWhatsAppMessage(recipient, message);
    broadcast.status = "Sent";
    await broadcast.save();

    // Emit real-time update to frontend
    io.emit("broadcastStatusUpdate", {
      id: broadcast._id,
      status: "Sent",
      recipient,
    });

    res.status(200).json({ message: "Broadcast sent successfully" });
  } catch (error) {
    broadcast.status = "Failed";
    await broadcast.save();

    res.status(500).json({ error: "Failed to send broadcast message" });
  }
});

// WhatsApp API - Send message to WhatsApp
const sendWhatsAppMessage = async (phoneNumber, message) => {
  const url = `https://graph.facebook.com/v12.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  const data = {
    messaging_product: "whatsapp",
    to: phoneNumber,
    text: { body: message },
  };

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(url, data, config);
    console.log("WhatsApp message sent:", response.data);
  } catch (error) {
    console.error(
      "Error sending WhatsApp message:",
      error.response?.data || error.message
    );
  }
};

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
