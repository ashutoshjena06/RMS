const express = require("express");
const router = express.Router();

const {
  loginData,
  userSignUp,
  allUsersExceptOwnEmail,
  allUsers,
  resetPassword,
  getOneUser,
  updateOneByEmail,
  deleteUserByEmail,
  sendMessage,
  getMessages,
} = require("../Controllers/user");

//to get all Users exclude current user
router.get("/getAll/:email", (req, res) => {
  allUsersExceptOwnEmail(req, res);
});

router.get("/allusers", (req, res) => {
  allUsers(req, res);
});

//to get one Users by using email
router.get("/getUsersByEmail/:Email", (req, res) => {
  getOneUser(req, res);
});

// To login the user
router.post("/login", (req, res) => {
  loginData(req, res);
});

//To create a new user
router.post("/signup", (req, res) => {
  userSignUp(req, res);
});
// To forgot the password
router.put("/resetPassword", (req, res) => {
  resetPassword(req, res);
});

//To update the user data by Email
router.put("/update/:Email", (req, res) => {
  updateOneByEmail(req, res);
});

//To delete the user by email by admin
router.delete("/delete/:Email", (req, res) => {
  deleteUserByEmail(req, res);
});

module.exports = router;
