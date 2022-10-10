const express = require('express');
const router = express.Router();

const whatsappController = require("../controller/whatsapp");

router.post("/whatsapp-api", whatsappController.whatsappFunc);

module.exports = router;
