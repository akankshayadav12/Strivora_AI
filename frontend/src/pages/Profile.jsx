
import { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, Stack, Avatar } from "@mui/material";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      setUser(res.data);
      setName(res.data.name);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateName = async () => {
    try {
      const res = await api.put("/users/profile", { name });
      setUser(res.data);
      alert("Name updated successfully!");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const handleChangePassword = async () => {
    try {
      await api.put("/users/change-password", { oldPassword, newPassword });
      alert("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" mb={2}>Profile</Typography>

        {user.avatar && <Avatar src={user.avatar} sx={{ width: 80, height: 80, mb: 2 }} />}

        <Typography><strong>Name:</strong> {user.name}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>Joined:</strong> {new Date(user.joinedDate).toLocaleDateString()}</Typography>

        <Stack spacing={2} mt={4}>
          <Typography variant="h6">Update Name</Typography>
          <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth />
          <Button variant="contained" onClick={handleUpdateName}>Update Name</Button>
        </Stack>

        <Stack spacing={2} mt={4}>
          <Typography variant="h6">Change Password</Typography>
          <TextField label="Old Password" type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} fullWidth />
          <TextField label="New Password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} fullWidth />
          <Button variant="contained" color="secondary" onClick={handleChangePassword}>Change Password</Button>
        </Stack>
      </Container>
    </>
  );
}

export default Profile;