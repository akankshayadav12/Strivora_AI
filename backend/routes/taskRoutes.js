const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTaskCompletion
} = require("../controllers/taskController");

router.post("/", auth, addTask);
router.get("/", auth, getTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);
router.put("/:id/toggle", auth, toggleTaskCompletion);

module.exports = router;