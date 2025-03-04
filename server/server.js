require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const PORT = process.env.PORT || 4000;

const authRouter = require("./routes/authRoutes");
const weightRouter = require("./routes/weightRoutes");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/auth", authRouter);
app.use("/weight", weightRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
