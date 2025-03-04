const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/schemas");
const router = express.Router();

//handle new users
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPW = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPW });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//handle sign in
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log("Found a user!", user);
    const verifyPW = await bcrypt.compare(password, user.password);
    console.log(verifyPW);
    if (!user || !verifyPW) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
