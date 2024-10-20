// const axios = require("axios");

// exports.sendWhatsAppMessage = async (req, res) => {
//   const { phoneNumber, message } = req.body;

//   const data = {
//     messaging_product: "whatsapp",
//     to: phoneNumber,
//     type: "text",
//     text: { body: message },
//   };

//   try {
//     const response = await axios.post(
//       `https://graph.facebook.com/v13.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.status(200).json({ success: true, data: response.data });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };
exports.handlePostRequest = (req, res) => {
  // Your logic for handling the POST request
  res.send("WhatsApp POST request received!");
};
