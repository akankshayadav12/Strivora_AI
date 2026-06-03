import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";
import api from "../api/axios";
import AIChat from "../components/AIChat";
import Navbar from "../components/Navbar";
import "../App.css";function Dashboard() {
  const [stats, setStats] = useState({});
  

  useEffect(() => {
    api.get("/dashboard").then(res => setStats(res.data));
  }, []);
const downloadWeeklyReport = () => {
  const pdf = new jsPDF();
pdf.text(
  `Task Completion Rate: ${stats.taskCompletionRate || 0}%`,
  20,
  125
);
  pdf.setFontSize(20);
  pdf.text("Goal Tracker Weekly Report", 20, 20);

  pdf.setFontSize(12);

  pdf.text(
    `Generated On: ${new Date().toLocaleDateString()}`,
    20,
    35
  );

  pdf.line(20, 40, 190, 40);

  pdf.text(
    `Total Goals: ${stats.totalGoals || 0}`,
    20,
    55
  );

  pdf.text(
    `Completed Goals: ${stats.completedGoals || 0}`,
    20,
    65
  );

  pdf.text(
    `Remaining Goals: ${stats.remainingGoals || 0}`,
    20,
    75
  );

  pdf.text(
    `Delayed Goals: ${stats.delayedGoals || 0}`,
    20,
    85
  );

  pdf.text(
    `Discipline Score: ${stats.disciplineScore || 0}%`,
    20,
    95
  );

  pdf.text(
    `Weekly Completed Goals: ${stats.weeklyCompleted || 0}`,
    20,
    105
  );

  pdf.text(
    `Projected Completion: ${stats.projectedCompletion || 0}`,
    20,
    115
  );

  let y = 130;

  pdf.setFontSize(15);
  pdf.text("Achievements", 20, y);

  y += 10;

  stats.badges?.forEach((badge) => {
    pdf.setFontSize(12);
    pdf.text(`• ${badge}`, 25, y);
    y += 8;
  });

  y += 10;

  pdf.setFontSize(15);
  pdf.text("AI Productivity Insights", 20, y);

  y += 10;

  stats.insights?.forEach((insight) => {
    pdf.setFontSize(12);
    pdf.text(`• ${insight}`, 25, y);
    y += 8;
  });

  pdf.save(
    `Weekly_Report_${new Date()
      .toISOString()
      .split("T")[0]}.pdf`
  );
};
const pieData = [
  {
    name: "Completed",
    value: stats.completedGoals || 0
  },
  {
    name: "Pending",
    value: stats.remainingGoals || 0
  }
];
 return (
<>
  <Navbar />
  <Container maxWidth="lg" className="dashboard-container">

    <Typography variant="h4" className="dashboard-title">
      Welcome Back 👋
    </Typography>

    <Typography className="discipline-score">
      Discipline Score: {stats.disciplineScore}%
    </Typography>

    {/* BIG STAT CARDS */}
    <Grid container spacing={4} mt={4}>

      <Grid item xs={12} sm={6} md={6} lg={3}>
        <Card className="stat-card">
          <CardContent style={{ textAlign: "center" }}>
            <Typography className="stat-title">Total Goals</Typography>
            <Typography className="stat-number">
              {stats.totalGoals}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={3}>
        <Card className="stat-card">
          <CardContent style={{ textAlign: "center" }}>
            <Typography className="stat-title">Completed</Typography>
            <Typography className="stat-number">
              {stats.completedGoals}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={3}>
        <Card className="stat-card">
          <CardContent style={{ textAlign: "center" }}>
            <Typography className="stat-title">Remaining</Typography>
            <Typography className="stat-number">
              {stats.remainingGoals}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={3}>
        <Card className="stat-card">
          <CardContent style={{ textAlign: "center" }}>
            <Typography className="stat-title">Delayed</Typography>
            <Typography className="stat-number">
              {stats.delayedGoals}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
<Grid container spacing={2} sx={{ mt: 3 }}>

  {/* Pie Chart */}
  <Grid item xs={12} sm={6} md={6} lg={3}>
    <Card sx={{ p: 2, height: 320 }}>
      <Typography variant="h6" align="center">
        Goal Completion
      </Typography>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  </Grid>

  {/* Bar Chart */}
  <Grid item s={12} md={4}>
    <Card sx={{ p: 2, height: 320 }}>
      <Typography variant="h6" align="center">
        Weekly Tasks
      </Typography>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={stats.weeklyTaskData || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completed" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  </Grid>

  {/* Line Chart */}
  <Grid item xs={12} md={4}>
    <Card sx={{ p: 2, height: 320 }}>
      <Typography variant="h6" align="center">
        Discipline Trend
      </Typography>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={stats.disciplineTrend || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  </Grid>

</Grid>
    {/* UPCOMING DEADLINES */}
    <Typography className="section-title">
      Upcoming Deadlines
    </Typography>
<div className="deadlines-wrapper">
    {stats.upcomingDeadlines?.map((goal, i) => (
      <div
        key={i}
        className={`deadline-box ${
          goal.urgency === "urgent"
            ? "deadline-urgent"
            : goal.urgency === "warning"
            ? "deadline-warning"
            : ""
        }`}
      >
        <div className="deadline-title">{goal.title}</div>
        <div className="deadline-days">
          {goal.daysLeft} days left
        </div>
      </div>
    ))}
</div>
    {/* ACHIEVEMENTS */}
    <Typography className="section-title">
      Achievements 🏅
    </Typography>

    <div className="badge-container">
      {stats.badges?.map((badge, i) => (
        <div key={i} className="badge-item">
          {badge}
        </div>
      ))}
    </div>
<Card sx={{ mt: 4 }}>
  <CardContent>

    <Typography variant="h6">
      AI Productivity Insights
    </Typography>

    {stats.insights?.map(
      (item, index) => (
        <Typography
          key={index}
          sx={{ mt: 1 }}
        >
          • {item}
        </Typography>
      )
    )}

  </CardContent>
</Card>
    {/* SUMMARY */}
    <div className="summary-text">
      Weekly Completed Goals: {stats.weeklyCompleted}
    </div>

    <div className="summary-text">
      If you continue like this, you may complete {stats.projectedCompletion} goals soon 🔮
    </div>
<Button

  variant="contained"
  color="success"
  onClick={downloadWeeklyReport}
  sx={{ mt: 2 }}
>
  Download Weekly Report
</Button>
<AIChat />
  </Container>
</>
);

}

export default Dashboard;