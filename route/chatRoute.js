const express = require("express");
const router = express.Router();
//import controller
const { chatHandler } = require("../controller/chatController");

// call the controller
router.post("/", chatHandler);

module.exports = router;