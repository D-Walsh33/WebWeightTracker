require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const PORT = process.env.PORT || 4000;

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/users/", userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
