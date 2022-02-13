const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 32,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 32,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 128,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
