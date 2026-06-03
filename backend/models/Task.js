const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  goal: { type: mongoose.Schema.Types.ObjectId, ref: "Goal", required: true },
  title: { type: String, required: true },
  deadline: { type: Date },
  completed: { type: Boolean, default: false },
   completedAt: {
    type: Date,
    default: null
  },
  priorityScore: Number,
  createdAt: { type: Date, default: Date.now }
});


taskSchema.pre("save", function() {
  const today = new Date();

  if (this.deadline) {
    const diff = Math.ceil(
      (new Date(this.deadline) - today) / (1000 * 60 * 60 * 24)
    );

    if (diff <= 1) this.priorityScore = 10;
    else if (diff <= 3) this.priorityScore = 7;
    else this.priorityScore = 4;
  } else {
    this.priorityScore = 0;
  }
});
module.exports = mongoose.model("Task", taskSchema);