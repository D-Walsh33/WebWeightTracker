require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const userRoutes = require("./routes/userRoutes");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

//logging for troubleshooting
app.use((req, res, next) => {
  console.log(`Serving: ${req.method} ${req.url}`);
  next();
});

// // Serve static files from the React app's dist folder
// app.use(express.static(path.join(__dirname, "../client/dist")));

connectDB();
console.log("Connected to DB:", process.env.MONGODB_URI);

app.use("/api/users/", userRoutes);

// // Handle React Router routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
