const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign({ userId: user._id }, "secret_key", {
      expiresIn: "5h",
    });

    // sending user and token
    user.password = undefined;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// getting all users
router.get("/", async (req, res) => {
  try {
    const AllUsers = await User.find(req.query);

    const usersWithoutPassword = AllUsers.map((user) => {
      const { password, ...rest } = user.toObject();
      return rest;
    });

    res.status(200).json(usersWithoutPassword);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// get me
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("books");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
