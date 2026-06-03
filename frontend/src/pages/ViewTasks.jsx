import { useEffect, useState } from "react";
import { Container, List, ListItem, Typography, Box, IconButton, Button, Paper } from "@mui/material";
import { Edit, Delete, CheckCircle, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function ViewTasks() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [tasks, setTasks] = useState({}); // tasks grouped by goalId

  // Fetch all goals
  const fetchGoals = async () => {
    const res = await api.get("/goals");
    setGoals(res.data);
  };

  // Fetch tasks for all goals
  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    const grouped = res.data.reduce((acc, task) => {
      if (!acc[task.goal]) acc[task.goal] = [];
      acc[task.goal].push(task);
      return acc;
    }, {});
    setTasks(grouped);
  };

  useEffect(() => {
    fetchGoals();
    fetchTasks();
  }, []);

  // Delete task
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  // Toggle completion
  const toggleComplete = async (id) => {
    await api.put(`/tasks/${id}/toggle`);
    fetchTasks();
  };

  // Delete goal
  const deleteGoal = async (id) => {
    await api.delete(`/goals/${id}`);
    fetchGoals();
    fetchTasks();
  };

 return (
    <>
      <Navbar />

      <Container maxWidth="md" className="dashboard-container">

        <Typography className="dashboard-title">
          Your Tasks 📋
        </Typography>

        <Paper className="goals-paper">

          <div className="goals-scroll-container">

            {goals.map(goal => (
              <Box key={goal._id} className="goal-card">

                {/* GOAL HEADER */}
                <Box className="goal-top">

                  <Typography className="goal-title">
                    {goal.title}
                  </Typography>

                  <Button
                    size="small"
                    startIcon={<Add />}
                    onClick={() => navigate(`/add-task/${goal._id}`)}
                  >
                    Add Task
                  </Button>

                </Box>

                {/* TASK LIST */}
                <List>

                  {(tasks[goal._id] || []).map(task => (
                    <ListItem key={task._id} sx={{ borderBottom: "1px solid #eee" }}>

                      <Box display="flex" justifyContent="space-between" width="100%">

                        <Typography>
                          {task.title}{" "}
                          {task.deadline
                            ? `(Due: ${task.deadline.substring(0, 10)})`
                            : ""}
                        </Typography>

                        <Box>

                          <IconButton onClick={() => toggleComplete(task._id)}>
                            <CheckCircle
                              color={task.completed ? "success" : "disabled"}
                            />
                          </IconButton>

                          <IconButton
                            onClick={() =>
                              navigate(`/add-task/${goal._id}/${task._id}`)
                            }
                          >
                            <Edit />
                          </IconButton>

                          <IconButton onClick={() => deleteTask(task._id)}>
                            <Delete color="error" />
                          </IconButton>

                        </Box>

                      </Box>

                    </ListItem>
                  ))}

                </List>

              </Box>
            ))}

          </div>

        </Paper>

      </Container>
    </>
  );
}

export default ViewTasks;