const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Invalid email format. Only @gmail.com addresses allowed.",
    ],
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  photo: {
    type: String, // store as base64 string or image URL
  },
  address: { type: String }, // ✅ new field
  phone: {
    type: String,
  },
});
const userModel = mongoose.model("User", userSchema);

const chatSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // sender email
  receiver: { type: String, required: true }, // receiver email
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = {
  userModel,
  Chat,
};
