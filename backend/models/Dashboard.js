const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  totalGoals: Number,
  completedGoals: Number,
  remainingGoals: Number,
  disciplineScore: Number,
  weeklyCompleted: Number,
  delayedGoals: Number,
  badges: [String],
  projectedCompletion: Number
}, { timestamps: true });

module.exports = mongoose.model("Dashboard", dashboardSchema);