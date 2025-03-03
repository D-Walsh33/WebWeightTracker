const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully connected to DB!");
  } catch (error) {
    console.error("Error connecting to DB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
