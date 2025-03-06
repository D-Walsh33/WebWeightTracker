const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  addWeightEntry,
  deleteWeightEntry,
  updateWeightEntry,
  updateSettings,
  updateUserGoal,
  getSortedWeights,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

console.log(getUser); // This should print the function definition or [Function: getUser]

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/me", authMiddleware, getUser); // New route to get user data
router.post("/weight", authMiddleware, addWeightEntry);
router.delete("/weight", authMiddleware, deleteWeightEntry);
router.put("/weight", authMiddleware, updateWeightEntry);
router.put("/settings", authMiddleware, updateSettings);
router.put("/goal", authMiddleware, updateUserGoal);
router.get("/:userId/weights", authMiddleware, getSortedWeights);

module.exports = router;
