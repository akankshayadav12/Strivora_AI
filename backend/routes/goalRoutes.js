// const router = require("express").Router();
// const auth = require("../middleware/authMiddleware");

// const {
//   addGoal,
//   getGoals,
//   toggleGoalCompletion,
//   updateGoal,
//   deleteGoal
// } = require("../controllers/goalController");

// router.post("/", auth, addGoal);
// router.get("/", auth, getGoals);
// router.put("/:id/toggle", auth, toggleGoalCompletion);
// router.put("/:id", auth, updateGoal);
// router.delete("/:id", auth, deleteGoal);

// module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  addGoal,
  getGoals,
  toggleGoalCompletion,
  updateGoal,
  deleteGoal,
  getSingleGoal   // 👈 add this
} = require("../controllers/goalController");

router.post("/", auth, addGoal);
router.get("/", auth, getGoals);
router.get("/:id", auth, getSingleGoal);   // 👈 ADD HERE
router.put("/:id/toggle", auth, toggleGoalCompletion);
router.put("/:id", auth, updateGoal);
router.delete("/:id", auth, deleteGoal);

module.exports = router;