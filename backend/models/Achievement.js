const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  badge: String,
  unlockedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Achievement", achievementSchema);