const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  gender: { type: String, enum: ["male", "female"], required: true },

  instruments: {
    type: Array,
    default: [],
  },
  experience: {
    type: Number,
  },
  homeLocation: {
    lat: { type: Number, default: 32.109333 },
    lng: { type: Number, default: 34.855499 },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
