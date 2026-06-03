
const Goal = require("../models/Goal");
const Task = require("../models/Task")
exports.addGoal = async (req, res) => {
  try {
    const {
      title,
      description,
      importance,
      targetDate,
      generatedPlan
    } = req.body;

    if (!title || !description || !importance || !targetDate) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const goal = await Goal.create({
      user: req.user,
      title,
      description,
      importance,
      targetDate,
      generatedPlan: generatedPlan || ""
    });

    res.status(201).json(goal);

  } catch (err) {
    console.log("Add Goal Error:", err);

    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};

exports.getGoals = async (req, res) => {
  try {
  const goals = await Goal.find({ user: req.user }).sort({ importance: -1 });

    const goalsWithProgress = await Promise.all(
      goals.map(async (goal) => {
        const tasks = await Task.find({
          goal: goal._id,
          user: req.user
        });

        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(t => t.completed).length;

        const progress =
          totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

        return {
          ...goal.toObject(),
          progress
        };
      })
    );

    res.json(goalsWithProgress);
  } catch (err) {
    console.log("Get Goals Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.toggleGoalCompletion = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user
    });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found or unauthorized" });
    }

    goal.completed = !goal.completed;
    await goal.save();

    res.json(goal);

  } catch (err) {
    console.log("Toggle Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateGoal = async (req, res) => {
  try {

    console.log("PARAMS:", req.params);
    console.log("ID:", req.params.id);

    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user
    });

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found or unauthorized"
      });
    }

    goal.title = req.body.title;
    goal.description = req.body.description;
    goal.importance = req.body.importance;
    goal.targetDate = req.body.targetDate;
    goal.generatedPlan = req.body.generatedPlan || "";

    await goal.save();

    res.json(goal);

  } catch (err) {
    console.log("Update Error:", err);

    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) return res.status(404).json({ message: "Goal not found" });

    if (goal.user.toString() !== req.user.toString())
      return res.status(403).json({ message: "Unauthorized" });

    await goal.deleteOne();
    res.json({ message: "Goal deleted" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getSingleGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal)
      return res.status(404).json({ message: "Goal not found" });

    if (goal.user.toString() !== req.user.toString())
      return res.status(403).json({ message: "Unauthorized" });

    res.json(goal);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};