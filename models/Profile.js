const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
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
  trk: [{ lat: Number, lng: Number }],
  date: {
    type: Date,
    default: Date.now,
  },
});

function arrayLimit(val) {
  console.log(value.length);
  if (value.length > 10) {
    throw new Error("Assigned person's size can't be greater than 10!");
  }
}

module.exports = Profile = mongoose.model("profile", ProfileSchema);
