const bcrypt = require("bcryptjs");
const User = require("../models/schemas");

const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });
};

// Register a new user
exports.registerUser = async (req, res) => {
  console.log("Received a post request to register a new user.");
  console.log(req.body);
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      weights: [],
      goal: { targetWeight: null, deadline: null },
      settings: { unit: "kg", notifications: false },
    });

    await newUser.save();

    // Generate JWT Token
    const token = generateToken(newUser._id);
    res.status(201).json({ message: "User registered successfully!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    // Generate JWT Token
    const token = generateToken(user._id);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Add a weight entry (allows past dates)
exports.addWeightEntry = async (req, res) => {
  const { userId, weight, date } = req.body;
  try {
    const entryDate = date ? new Date(date) : new Date();
    console.log(entryDate);
    if (entryDate > new Date()) {
      return res.status(400).json({ error: "Date cannot be in the future" });
    }

    const newEntry = { weight, date: entryDate };

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { weights: newEntry } },
      { new: true }
    );
    res.status(200).json({ message: "Weight entry added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a weight entry
exports.deleteWeightEntry = async (req, res) => {
  const { userId, weightId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { weights: { _id: weightId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User or weight entry not found" });
    }

    res.status(200).json({ message: "Weight entry deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a weight entry
exports.updateWeightEntry = async (req, res) => {
  const { userId, weightId, newWeight, newDate } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, "weights._id": weightId },
      {
        $set: {
          "weights.$.weight": newWeight,
          "weights.$.date": newDate ? new Date(newDate) : new Date(),
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User or weight entry not found" });
    }

    res.status(200).json({ message: "Weight entry updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user settings (e.g., unit, notifications)
exports.updateSettings = async (req, res) => {
  const { userId, settings } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { settings } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Settings updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user goal (target weight & deadline)
exports.updateUserGoal = async (req, res) => {
  const { userId, targetWeight, deadline } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "goal.targetWeight": targetWeight,
          "goal.deadline": deadline ? new Date(deadline) : null,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Goal updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get sorted weight entries (latest to oldest)
exports.getSortedWeights = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const sortedWeights = user.weights.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    res.status(200).json(sortedWeights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user data
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password -weights"); // return user data without pw or weights
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
