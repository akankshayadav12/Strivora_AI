import { useEffect, useState } from "react";
import { Container, List, ListItem, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function SelectGoalForTask() {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/goals").then(res => setGoals(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h5" mb={2}>Select a Goal to Add Task</Typography>
        <Paper>
          <List>
            {goals.map(goal => (
              <ListItem
                key={goal._id}
                sx={{ borderBottom: "1px solid #ddd", cursor: "pointer" }}
                onClick={() => navigate(`/add-task/${goal._id}`)}
              >
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Typography>{goal.title}</Typography>
                  <Typography variant="caption">Progress: {goal.progress}%</Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
}

export default SelectGoalForTask;