// const mongoose = require("mongoose");

// const goalSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   title: String,
//   importance: { type: Number, default: 3 }, // 1–5
//   targetDate: Date,
//   completed: { type: Boolean, default: false }
// });

// module.exports = mongoose.model("Goal", goalSchema);

const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  importance: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  targetDate: {
    type: Date,
    required: true
  },

 

  completed: {   // ⚠️ You are using "completed" not "isCompleted"
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
generatedPlan: {
  type: String,
  default: ""
},
  updatedAt: {
    type: Date,
    default: Date.now
  }

});

/* =========================
   Auto Update updatedAt
========================= */
goalSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  
});

module.exports = mongoose.model("Goal", goalSchema);