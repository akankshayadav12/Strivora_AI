
import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Paper,
  IconButton,
  Stack
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

function AddGoal() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState(3);
  const [targetDate, setTargetDate] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
const generateAIPlan = async () => {
  if (!title || !description) {
    alert("Please enter title and description first");
    return;
  }

  try {
    setLoadingAI(true);

    const res = await api.post(
      "/ai/generate-plan",
      {
        goalTitle: title,
        description
      }
    );

    setGeneratedPlan(res.data.plan);

  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      "AI generation failed"
    );
  } finally {
    setLoadingAI(false);
  }
};
 const clearForm = () => {
  setTitle("");
  setDescription("");
  setImportance(3);
  setTargetDate("");
  setGeneratedPlan("");
};

const add = async () => {
  try {

    const payload = {
      title,
      description,
      importance,
      targetDate,
      generatedPlan
    };

    if (id) {
      await api.put(`/goals/${id}`, payload);
    } else {
      await api.post("/goals", payload);
    }

    navigate("/goals");

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to save goal"
    );
  }
};
  const { id } = useParams();
useEffect(() => {
  if (id) {
    api.get(`/goals/${id}`)
      .then(res => {
        const goal = res.data;

        setTitle(goal.title || "");
setDescription(goal.description || "");
setImportance(goal.importance || 3);
setTargetDate(goal.targetDate?.substring(0, 10) || "");
setGeneratedPlan(goal.generatedPlan || "");
      })
      .catch(err => {
        console.log("Error fetching goal:", err);
      });
  }
}, [id]);

  return (
  
  <>
    <Navbar />
    <Container maxWidth="sm" className="dashboard-container">
      <Paper className="add-goal-paper">

        {/* X Button */}
        <IconButton
          onClick={() => navigate("/goals")}
          className="close-btn"
        >
          <CloseIcon />
        </IconButton>

        <Typography className="dashboard-title" sx={{ fontSize: "2rem !important", mb: 3 }}>
          {id ? "Update Goal 🎯" : "Create New Goal 🎯"}
        </Typography>

        <TextField
          fullWidth
          label="Goal Title"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          
        />
<TextField
 fullWidth
 multiline
 rows={8}
 margin="normal"
 label="AI Milestones"
 value={generatedPlan}
 InputProps={{
   readOnly: true
 }}
/>
        <TextField
          select
          fullWidth
          label="Importance Level"
          margin="normal"
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
        >
          <MenuItem value={1}>1 - Very Low</MenuItem>
          <MenuItem value={2}>2 - Low</MenuItem>
          <MenuItem value={3}>3 - Medium</MenuItem>
          <MenuItem value={4}>4 - High</MenuItem>
          <MenuItem value={5}>5 - Critical</MenuItem>
        </TextField>

        <TextField
          fullWidth
          type="date"
          label="Target Date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />

        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={add}
            className="add-goal-btn"
          >
            {id ? "Update Goal" : "Add Goal"}
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={clearForm}
            className="clear-btn"
          >
            Clear
          </Button>
   <Button
  variant="contained"
  color="secondary"
  sx={{ mt: 2 }}
  onClick={generateAIPlan}
  disabled={loadingAI}
>
  {loadingAI
    ? "Generating..."
    : "Generate AI Plan"}
</Button>
        </Stack>

      </Paper>
    </Container>
  </>

  );
}

export default AddGoal;