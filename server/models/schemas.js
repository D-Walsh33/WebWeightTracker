const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  weights: [
    {
      _id: { type: Schema.Types.ObjectId, auto: true }, // Unique ID for each entry
      weight: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  goal: {
    targetWeight: Number,
    deadline: Date,
  },
  settings: {
    unit: { type: String, enum: ["kgs", "lbs"], default: "kgs" },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
