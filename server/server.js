require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
connectDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
