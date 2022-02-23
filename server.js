const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");

const app = express();

//Connect DB
connectDB();

// Init Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Running");
});

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on: http://localhost:${PORT}`);
});
