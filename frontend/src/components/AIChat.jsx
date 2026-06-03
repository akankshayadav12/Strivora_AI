import { useState } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import api from "../api/axios";

function AIChat() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const res = await api.post("/ai/chat", {
        message: question
      });

      setResponse(res.data.reply);
    } catch (err) {
      console.log(err);

      setResponse(
        "AI service is currently unavailable."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 25,
          right: 25,
          zIndex: 9999
        }}
        onClick={() => setOpen(true)}
      >
        <ChatIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          AI Productivity Assistant
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Ask anything..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
          />

          <Box mt={3}>
            <Typography variant="subtitle1">
              Response
            </Typography>

            <Typography>
              {loading
                ? "Thinking..."
                : response}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
          >
            Close
          </Button>

          <Button
            variant="contained"
            onClick={askAI}
          >
            Ask AI
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AIChat;