const Goal = require("../models/Goal");
const Task = require("../models/Task");
const Dashboard = require("../models/Dashboard");

exports.getDashboard = async (req, res) => {
  try {
    const today = new Date();

    const goals = await Goal.find({ user: req.user });
    const tasks = await Task.find({
  user: req.user
});
const weeklyTaskData = [
  {
    week: "Week 1",
    completed: tasks.filter(
      t =>
        t.completed &&
        t.completedAt
    ).length
  }
];
const totalTasks = tasks.length;

const completedTasksCount =
  tasks.filter(t => t.completed).length;

const taskCompletionRate =
  totalTasks
    ? Math.round(
        (completedTasksCount /
          totalTasks) *
          100
      )
    : 0;
    const totalGoals = goals.length;
    const completedGoals = goals.filter(g => g.completed).length;
    const remainingGoals = totalGoals - completedGoals;

    const disciplineScore = totalGoals
      ? Math.round((completedGoals / totalGoals) * 100)
      : 0;

    /* UPCOMING DEADLINES */
    const upcomingDeadlines = goals
      .filter(g => !g.completed)
      .map(g => {
        const diff = Math.ceil(
          (new Date(g.targetDate) - today) / (1000 * 60 * 60 * 24)
        );

        let urgency = "safe";
        if (diff <= 1) urgency = "urgent";
        else if (diff <= 3) urgency = "warning";

        return {
          title: g.title,
          daysLeft: diff,
          urgency
        };
      });

    /* WEEKLY SUMMARY */
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);

    const weeklyCompleted = goals.filter(
      g => g.completed && g.updatedAt >= weekAgo
    ).length;

    /* DELAYED GOALS */
    const delayedGoals = goals.filter(
      g => !g.completed && new Date(g.targetDate) < today
    );
const disciplineTrend = [
  {
    day: "Mon",
    score:
      disciplineScore - 20
  },
  {
    day: "Tue",
    score:
      disciplineScore - 15
  },
  {
    day: "Wed",
    score:
      disciplineScore - 10
  },
  {
    day: "Thu",
    score:
      disciplineScore - 5
  },
  {
    day: "Fri",
    score:
      disciplineScore
  }
];
    /* BADGES */
    const badges = [];

    if (completedGoals >= 1) badges.push("Starter 🚀");
    if (completedGoals >= 5) badges.push("Achiever 🏆");
    if (disciplineScore >= 80) badges.push("Discipline Master 💪");

    /* FUTURE PROJECTION */
    const projectedCompletion =
      Math.floor(disciplineScore / 50) + completedGoals;

    /* SAVE DASHBOARD */
   await Dashboard.findOneAndUpdate(
  { user: req.user },
  {
    totalGoals,
    completedGoals,
    remainingGoals,
    disciplineScore,
    weeklyCompleted,
    delayedGoals: delayedGoals.length,
    badges,
    projectedCompletion,
    weeklyTaskData,
    disciplineTrend,
  },
  {
    upsert: true,
    returnDocument: "after"
  }
);
const insights = [];

const completedTasks =
  tasks.filter(t => t.completed);

const morningCompleted =
  completedTasks.filter(task => {
    if (!task.completedAt) return false;

    const hour =
      new Date(task.completedAt).getHours();

    return hour < 12;
  });

if (completedTasks.length > 0) {

  const morningPercentage =
    Math.round(
      (morningCompleted.length /
        completedTasks.length) * 100
    );

  insights.push(
    `You complete ${morningPercentage}% of your tasks before noon.`
  );
}
const dayMap = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};

const dayCounts = {};

completedTasks.forEach(task => {
  if (!task.completedAt) return;

  const day = new Date(task.completedAt).getDay();

  dayCounts[day] =
    (dayCounts[day] || 0) + 1;
});

let bestDay = null;
let maxCount = 0;

Object.keys(dayCounts).forEach(day => {
  if (dayCounts[day] > maxCount) {
    maxCount = dayCounts[day];
    bestDay = day;
  }
});

if (bestDay !== null) {
  insights.push(
    `${dayMap[bestDay]} is your most productive day.`
  );
}

const highPriorityTasks =
  tasks.filter(
    t =>
      t.priorityScore >= 7 &&
      t.completed
  );

if (highPriorityTasks.length >= 3) {
  insights.push(
    "You tend to finish high-priority tasks quickly."
  );
}

const completionRate =
  totalGoals
    ? Math.round(
        (completedGoals /
          totalGoals) *
          100
      )
    : 0;

if (completionRate >= 80) {
  insights.push(
    "Your completion rate is excellent this week."
  );
} else if (completionRate >= 60) {
  insights.push(
    "Your consistency is improving steadily."
  );
} else {
  insights.push(
    "Focus on completing a few more tasks to improve momentum."
  );
}
    res.json({
      totalGoals,
      completedGoals,
      remainingGoals,
      disciplineScore,
      upcomingDeadlines,   // ✅ THIS WAS MISSING
      weeklyCompleted,
      delayedGoals: delayedGoals.length,
      badges,
      insights,
      projectedCompletion,
      taskCompletionRate,
    });

  } catch (err) {
    console.log("Dashboard Error:", err);
    res.status(500).json({ message: "Server error" });
  }
  
};
