import User from "./model.js";
import jwt from "jsonwebtoken";
export const addUser = function (req, res) {
  const { name, email, mobile, password } = req.body;

  // Check if all required fields are present
  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Create a new user object
  const newUser = new User({
    name,
    email,
    mobile,
    password,
  });

  // Save the user to the database
  newUser
    .save()
    .then((user) => {
      res.status(201).json({ message: "User created successfully", user });
    })
    .catch((error) => {
      console.error("Error saving user to database:", error);
      res
        .status(500)
        .json({ error: "An error occurred while saving the user" });
    });
};

export const loginUser = async (req, res) => {
  const { email, mobile, password } = req.body;

  try {
    // Find the user by email or mobile
    const user = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password === password) {
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, "secret-key", {
        expiresIn: "2h",
      });

      res.status(200).json({ message: "Login successful", user, token });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserDetails = async (req, res) => {
  const email = req.params.email;

  User.findOne({ email }, (err, user) => {
    if (err) {
      console.error("Error retrieving user:", err);
      res.status(500).json({ message: "Server error" });
    } else if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
};
//http://localhost:8085/userDetails/getUserDetails/john.doe@example.com
