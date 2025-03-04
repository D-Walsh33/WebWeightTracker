const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const weightSchema = new Schema({
  weight: {
    required: true,
    type: Schema.Types.Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  weights: [weightSchema],
});

module.exports = mongoose.model("User", userSchema);
