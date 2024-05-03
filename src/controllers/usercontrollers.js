import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user_models.js";

const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if username is provided
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ username, password, role });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { register, login };
