const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  getUnreadCounts,
} = require("../Controllers/chat");

router.post("/send", sendMessage);
router.get("/messages/:sender/:receiver", getMessages);
router.get("/unread-counts/:receiver", getUnreadCounts);

module.exports = router;
