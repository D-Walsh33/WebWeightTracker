const express = require("express");
const User = require("../models/schemas");
const authMiddleWare = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleWare, async (req, res) => {
  const results = await User.findById(req.user.userId);
  res.json(results);
});

router.post("/", authMiddleWare, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.weights.push(req.body);
    const results = await user.save();
    res.status(201).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
