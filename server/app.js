const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// Logging for troubleshooting
app.use((req, res, next) => {
  console.log(`Serving: ${req.method} ${req.url}`);
  next();
});

// Serve static files from the React app's dist folder
app.use(express.static(path.join(__dirname, "../client/dist")));

// API routes
app.use("/api/users", userRoutes);

// Handle React Router routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

module.exports = app;
