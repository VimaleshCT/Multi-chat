const Contact = require("../models/contactModel"); // Contact model
const BroadcastHistory = require("../models/broadcastModel"); // Broadcast history model
const axios = require("axios");

// Function to send message to WhatsApp using the API
const sendWhatsAppMessage = async (phoneNumber, message) => {
  const url = `https://graph.facebook.com/v12.0/${process.env.PHONE_NUMBER_ID}/messages`;
  const data = {
    messaging_product: "whatsapp",
    to: phoneNumber,
    text: { body: message },
  };

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(url, data, config);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error sending WhatsApp message:",
      error.response?.data || error.message
    );
    return { success: false, error: error.response?.data || error.message };
  }
};

exports.broadcastMessage = async (req, res) => {
  const { message } = req.body;

  // Ensure message content is provided
  if (!message) {
    return res.status(400).json({ error: "Message content is required" });
  }

  try {
    // Retrieve all contacts from the Contact model
    const contacts = await Contact.find();

    // If no contacts exist, return error
    if (contacts.length === 0) {
      return res
        .status(404)
        .json({ error: "No contacts found to send message." });
    }

    const failedContacts = [];
    const successfulContacts = [];

    // Iterate over contacts and send message
    for (const contact of contacts) {
      const { success, error } = await sendWhatsAppMessage(
        contact.phone,
        message
      );
      if (success) {
        successfulContacts.push(contact.phone);
      } else {
        failedContacts.push({ phone: contact.phone, error });
      }
    }

    const status = failedContacts.length > 0 ? "Partial Success" : "Sent";

    // Save broadcast history in the database
    const broadcastHistory = await BroadcastHistory.create({
      message,
      status,
      timestamp: new Date(),
      contacts: contacts.map((contact) => ({
        name: contact.name,
        phone: contact.phone,
        status: successfulContacts.includes(contact.phone)
          ? "Success"
          : "Failed",
        error:
          failedContacts.find((fc) => fc.phone === contact.phone)?.error || "",
      })),
    });

    res.status(200).json({
      message:
        failedContacts.length > 0
          ? "Broadcast completed with some failures"
          : "Broadcast sent to all contacts",
      successfulContacts,
      failedContacts,
      broadcastId: broadcastHistory._id,
    });
  } catch (error) {
    console.error(
      "Error broadcasting message:",
      error.message || "Unknown error"
    );
    res.status(500).json({
      error: "Failed to broadcast message due to an unexpected error",
    });
  }
};
