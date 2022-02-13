const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

//Connect DB
connectDB();

// Inint Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
  res.send("API Running");
});

// Define Routes
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on: http://localhost:${PORT}`);
});
