const { Chat } = require("../Models/user");

// Save a new message
const sendMessage = async (req, res) => {
  const { sender, receiver, message } = req.body;
  if (!sender || !receiver || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const chat = new Chat({ sender, receiver, message });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

// Get messages between 2 users
const getMessages = async (req, res) => {
  const { sender, receiver } = req.params;
  try {
    const messages = await Chat.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 }); // oldest to newest
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

const getUnreadCounts = async (req, res) => {
  const { receiver } = req.params;

  try {
    const counts = await Chat.aggregate([
      {
        $match: {
          receiver,
          seen: false,
        },
      },
      {
        $group: {
          _id: "$sender",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = {};
    counts.forEach(({ _id, count }) => {
      result[_id] = count;
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch unread counts" });
  }
};

module.exports = { sendMessage, getMessages, getUnreadCounts };
