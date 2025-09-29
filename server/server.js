require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("Connected to DB:", process.env.MONGODB_URI);

    // Start server
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });
