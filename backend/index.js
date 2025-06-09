const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./connection");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const userRoute = require("./Routers/user");
const chatRoute = require("./Routers/chat");
const { Chat } = require("./Models/user");

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use("/api/chat", chatRoute);

// Create HTTP server & socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://192.168.0.106:5173", // your React app URL
    methods: ["GET", "POST"],
  },
});

// Start listening for socket connections
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join", (email) => {
    socket.join(email);
    console.log(`${email} joined room`);
  });

  socket.on("send_message", async (data) => {
    try {
      const timestamp = new Date();

      const chat = new Chat({
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        timestamp,
        seen: false,
        deleted: false,
      });

      await chat.save();

      // Notify receiver to update unread count
      io.to(data.receiver).emit("new_unread_message", {
        sender: data.sender,
      });

      const emittedMessage = {
        _id: chat._id,
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        timestamp,
        seen: false,
        deleted: false,
      };

      io.to(data.receiver).emit("receive_message", emittedMessage);
      socket.emit("receive_message", emittedMessage);
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

  socket.on("message_seen", async ({ sender, receiver }) => {
    try {
      await Chat.updateMany(
        { sender, receiver, seen: false },
        { $set: { seen: true } }
      );

      // Notify sender
      io.to(sender).emit("message_seen_ack", { sender, receiver });
    } catch (err) {
      console.error("Error marking messages as seen:", err);
    }
  });

  socket.on("delete_message", async ({ messageId }) => {
    try {
      await Chat.findByIdAndUpdate(messageId, { deleted: true });

      // Notify both parties to update UI
      io.emit("message_deleted", { messageId });
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  });
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://localhost:3000");
});

// Connect to MongoDB
connectToDatabase("mongodb://localhost:27017/RMS");
app.use("/api", userRoute);
