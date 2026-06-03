const Task = require("../models/Task");

// Add task under a goal
exports.addTask = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ USER:", req.user);

    const { title, goal, deadline } = req.body;
    if (!title || !goal) return res.status(400).json({ message: "Title and Goal required" });

    const task = await Task.create({
      user: req.user,
      title,
      goal,
      deadline
    });

    res.json(task);
  } catch (err) {
    console.log("Add Task Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// Get all tasks for a specific goal
exports.getTasks = async (req, res) => {
  try {
    const { goalId } = req.query; // pass goalId as query param
    const query = { user: req.user };
    if (goalId) query.goal = goalId;

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.log("Get Tasks Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.deadline = req.body.deadline || task.deadline;
    await task.save();

    res.json(task);
  } catch (err) {
    console.log("Update Task Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.log("Delete Task Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle completion
exports.toggleTaskCompletion = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user });
    if (!task) return res.status(404).json({ message: "Task not found" });

   task.completed = !task.completed;

if (task.completed) {
  task.completedAt = new Date();
} else {
  task.completedAt = null;
}

await task.save();

    res.json(task);
  } catch (err) {
    console.log("Toggle Task Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};