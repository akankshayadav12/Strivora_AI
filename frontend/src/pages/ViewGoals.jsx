
import { useEffect, useState } from "react";
import {
  Container,
  List,
  ListItem,
  Typography,
  Button,
  Box,
  Paper,
  IconButton,
  LinearProgress
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

import "../App.css"; // ✅ Import your CSS file

function ViewGoals() {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  const fetchGoals = () => {
    api.get("/goals").then(res => setGoals(res.data));
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const deleteGoal = async (id) => {
    await api.delete(`/goals/${id}`);
    fetchGoals();
  };

  const toggleComplete = async (id) => {
    await api.put(`/goals/${id}/toggle`);
    fetchGoals();
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" className="dashboard-container">

        <Box display="flex" justifyContent="space-between" mb={4}>
          <Typography className="dashboard-title">
            Your Goals 🎯
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className="add-goal-btn"
            onClick={() => navigate("/add-goal")}
          >
            Add Goal
          </Button>
        </Box>

        <Paper className="goals-paper">
  <div className="goals-scroll-container">
    <List>
            {goals.map(g => (
              <ListItem
                key={g._id}
                className="goal-card"
              >
                <Box className="goal-top">
                  <Typography className="goal-title">
                    {g.title}
                  </Typography>

                  <Box>
                    <IconButton onClick={() => navigate(`/add-goal/${g._id}`)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => deleteGoal(g._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>

                    <IconButton onClick={() => toggleComplete(g._id)}>
                      <CheckCircleIcon color={g.completed ? "success" : "disabled"} />
                    </IconButton>
                  </Box>
                </Box>

                <Typography className="goal-description">
                  {g.description}
                </Typography>
<Typography
  className="goal-importance"
  sx={{
    color:
      g.importance === 5 ? "red" :
      g.importance === 4 ? "orange" :
      g.importance === 3 ? "blue" :
      g.importance === 2 ? "gray" : "green"
  }}
>
  Importance: {
    ["Very Low", "Low", "Medium", "High", "Critical"][g.importance - 1]
  }
</Typography>
                <LinearProgress
                  variant="determinate"
                  value={g.progress}
                  className="goal-progress"
                />

                <Typography className="goal-progress-text">
                  Progress: {g.progress}%
                </Typography>

              </ListItem>
            ))}
          </List>
          </div>
        </Paper>
      </Container>
    </>
  );
}

export default ViewGoals;