const router = require("express").Router();

// const {
//   generatePlan,
//   chat
// } = require("../controllers/aiController");

// router.post("/generate-plan", generatePlan);
// router.post("/chat", chat);

module.exports = router;const {
  generatePlan,
  chat,
  generateTasks
} = require("../controllers/aiController");

router.post("/generate-plan", generatePlan);
router.post("/chat", chat);
router.post("/generate-tasks", generateTasks);

module.exports = router;