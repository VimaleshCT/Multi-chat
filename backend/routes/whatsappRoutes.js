const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const whatsappController = require("../controllers/whatsappController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/add", contactController.addContact);
router.get("/all", contactController.getContacts);
router.post("/import", upload.single("file"), contactController.importContacts);
router.post("/whatsapp/send", whatsappController.sendWhatsAppMessage);

module.exports = router;
