const { userModel, Chat } = require("../Models/user");
const bcrypt = require("bcrypt");

//to get all Users exclude current user
const allUsersExceptOwnEmail = (req, res) => {
  const currentUserEmail = req.params.email; // assuming email is passed as query param

  if (!currentUserEmail) {
    return res.status(400).json({ error: "Current user email is required" });
  }

  console.log("Request received at /allUsers for:", currentUserEmail);

  userModel
    .find({ email: { $nin: [currentUserEmail] } })
    .then((users) => {
      console.log("Users fetched successfully", users);
      return res.status(200).json(users);
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Internal server error" });
    });
};

const allUsers = (req, res) => {
  userModel
    .find()
    .then((users) => {
      console.log("Users fetched successfully", users);
      return res.status(200).json(users);
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Internal server error" });
    });
};

//it is for Reset password
const resetPassword = async (req, res) => {
  console.log("Request received at /resetPassword");
  const { email, firstName, newPassword } = req.body;
  console.log("Reset password data:", { email, firstName, newPassword });

  if (!email || !firstName || !newPassword) {
    console.log("Invalid or incomplete data provided");
    return res.status(400).send("Incomplete data provided");
  }

  try {
    const user = await userModel.findOne({ email });
    if (user.firstName !== firstName) {
      console.log("First name does not match");
      return res.status(400).json({ message: "First name does not match" });
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword; // Update the password
      await user.save();
      console.log("Password reset successfully");
      return res.status(200).json({ message: "Password reset successfully" });
    }
  } catch (err) {
    console.error("Error resetting password:", err);
    return res.status(404).json({ message: "User not found" });
  }
};

//It is used for Login the data
const loginData = async (req, res) => {
  console.log("Request received at /login");
  const loginData = req.body;
  console.log("Login data:", loginData);

  if (!loginData || !loginData.email || !loginData.password) {
    console.log("Invalid or incomplete data provided");
    return res.status(400).send("Incomplete data provided");
  }
  // Validate user credentials
  try {
    const user = await userModel.findOne({ email: loginData.email });
    console.log("User data:", user.password, loginData.password);
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      console.log("You are entered Invalid password");
      return res
        .status(401)
        .json({ message: "You are entered Invalid password" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({
    message: "Login successful",
    user: { email: loginData.email, password: loginData.password },
  });
};

// New User Signup
const userSignUp = async (req, res) => {
  console.log("Request received at /signup");
  const { firstName, lastName, email, password, address, phone } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send("Incomplete data provided");
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address,
      phone,
    });

    await newUser.save();

    console.log("User created successfully", newUser);
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Signup error:", err);

    // If it's a validation error (like bad email)
    if (err.name === "ValidationError") {
      const fieldErrors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: fieldErrors.join(", ") });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

//get user by email
const getOneUser = async (req, res) => {
  const email = req.params.Email;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Email query parameter is required" });
  }

  // Call a function that gets a user by email (you need to write this)
  userModel
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};

//update by email
const updateOneByEmail = async (req, res) => {
  const email = req.params.Email;
  const updatedData = req.body;

  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { $set: updatedData },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Update failed", message: err.message });
  }
};

//delete by user Email
const deleteUserByEmail = async (req, res) => {
  const email = req.params.Email;
  try {
    const deletedUser = await userModel.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

module.exports = {
  loginData,
  userSignUp,
  allUsersExceptOwnEmail,
  allUsers,
  resetPassword,
  getOneUser,
  updateOneByEmail,
  deleteUserByEmail,
};
