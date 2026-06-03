import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";
import { Container, TextField, Button, Paper, Stack,Card, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function AddTask() {
  const navigate = useNavigate();
  const { goalId, taskId } = useParams();

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [naturalText, setNaturalText] = useState("");
const [generatedTasks, setGeneratedTasks] = useState("");
const [loadingAI, setLoadingAI] = useState(false);

  const [stats, setStats] = useState({});
  useEffect(() => {
    if (taskId) {
      api.get(`/tasks?goalId=${goalId}`).then(res => {
        const task = res.data.find(t => t._id === taskId);
        if (task) {
          setTitle(task.title);
          setDeadline(task.deadline?.substring(0, 10));
        }
      });
    }
  }, [taskId, goalId]);
const generateAITasks = async () => {
  if (!naturalText) {
    return alert("Please describe the goal first");
  }

  try {
    setLoadingAI(true);

    const res = await api.post(
      "/ai/generate-tasks",
      {
        taskDescription: naturalText
      }
    );

    setGeneratedTasks(res.data.tasks);

  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      "AI generation failed"
    );
  } finally {
    setLoadingAI(false);
  }
  const res = await api.post("/ai/generate-tasks", {
  taskDescription: naturalText
});

console.log("AI Response:", res.data);

setGeneratedTasks(res.data.tasks);
};
const createTasksAutomatically = async () => {
  if (!generatedTasks) {
    return alert("Generate tasks first");
  }

  if (!goalId) {
    return alert("Goal ID missing");
  }

  try {

    const lines = generatedTasks
      .split("\n")
      .filter(line => line.trim())
      .filter(line => /^\d+\./.test(line));

    for (const line of lines) {

      const cleanTitle = line
        .replace(/^\d+\.\s*/, "")
        .trim();

      await api.post("/tasks", {
        title: cleanTitle,
        goal: goalId
      });

    }

    alert("Tasks created successfully");

    navigate("/tasks");

  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      "Failed to create tasks"
    );
  }
};
const saveTask = async () => {
  if (!title) return alert("Please enter task title");
  if (!goalId) return alert("Goal not selected");

  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };

    if (taskId) {
      await api.put(`/tasks/${taskId}`, { title, deadline }, config);
    } else {
      await api.post("/tasks", { title, deadline, goal: goalId }, config);
    }

    navigate("/tasks");
  } catch (err) {
    console.log(err.response?.data || err);
  }
};
const pieData = [
  { name: "Completed", value: stats.completedGoals || 0 },
  { name: "Remaining", value: stats.remainingGoals || 0 }
];
  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, mt: 4 }}>
          <h2>{taskId ? "Edit Task" : "Add Task"}</h2>
          <TextField
  fullWidth
  multiline
  rows={3}
  label="Describe Task Naturally"
  value={naturalText}
  onChange={(e) =>
    setNaturalText(e.target.value)
  }
/><TextField
  fullWidth
  multiline
  rows={8}
  margin="normal"
  label="AI Generated Tasks"
  value={generatedTasks}
  InputProps={{
    readOnly: true
  }}
/>
          <TextField
            fullWidth
            label="Task Title"
            margin="normal"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            type="date"
            label="Deadline"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
  variant="contained"
  color="primary"
  onClick={generateAITasks}
  disabled={loadingAI}
>
  {loadingAI ? "Generating..." : "Generate AI Tasks"}
</Button>
         <Button
  variant="contained"
  color="success"
  onClick={createTasksAutomatically}
>
  Create Tasks Automatically
</Button>
            <Button variant="contained" onClick={saveTask}>
              {taskId ? "Update Task" : "Add Task"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Stack>
          <Card sx={{ mt: 4, p: 3 }}>
  <Typography variant="h6">
    Goal Analytics
  </Typography>

  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={pieData}
        dataKey="value"
        outerRadius={100}
      />
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</Card>
        </Paper>
      </Container>
    </>
  );
}

export default AddTask;