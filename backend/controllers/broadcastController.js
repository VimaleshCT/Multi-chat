const Contact = require("../models/contactModel");
const axios = require("axios");

const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

exports.broadcastMessage = async (req, res) => {
  const { message } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: "Message content is required" });
  }

  try {
    const contacts = await Contact.find();
    if (contacts.length === 0) {
      return res
        .status(404)
        .json({ error: "No contacts found to send message." });
    }

    const failedContacts = [];
    const successfulContacts = [];

    for (const contact of contacts) {
      try {
        const payload = {
          messaging_product: "whatsapp",
          to: contact.phone,
          type: "text",
          text: { body: message },
        };

        console.log("Sending payload:", payload);

        const response = await axios.post(
          `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response data:", response.data);

        if (response.data.messages) {
          successfulContacts.push(contact.phone);
        } else {
          throw new Error("Failed to send message");
        }
      } catch (err) {
        console.error(
          `Failed to send message to ${contact.phone}: ${
            err.response?.data?.message || err.message
          }`
        );
        failedContacts.push({
          contact: contact.phone,
          error: err.response?.data?.message || err.message,
        });
      }
    }

    if (failedContacts.length > 0) {
      return res.status(206).json({
        message: "Message broadcast completed with some failures",
        successfulContacts,
        failedContacts,
      });
    }

    return res.status(200).json({
      message: "Message broadcasted successfully to all contacts",
      successfulContacts,
    });
  } catch (err) {
    console.error(
      "Error broadcasting message:",
      err.message || "Unknown error"
    );
    return res.status(500).json({
      error: "Failed to broadcast message due to an unexpected error",
    });
  }
};
