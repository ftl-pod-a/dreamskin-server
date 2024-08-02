const express = require("express");
const router = express.Router();
//import controller
const { chatHandler, chatBotHandler } = require("../controller/chatController");

// call the controller
router.post("/", chatHandler);
router.post("/bot", chatBotHandler);

module.exports = router;

