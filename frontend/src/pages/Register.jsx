import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper
} from "@mui/material";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.95)"
          }}
        >
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            Create Account ✨
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            mb={3}
          >
            Register to start using your Goal and Task Planner
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 3,
              background: "linear-gradient(90deg, #667eea, #764ba2)"
            }}
            onClick={handleRegister}
          >
            Register
          </Button>

          {/* LOGIN SECTION */}
          <Box textAlign="center" mt={3}>
            <Typography variant="body2">
              Already have an account?
            </Typography>

            <Button
              variant="text"
              sx={{ fontWeight: "bold" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;