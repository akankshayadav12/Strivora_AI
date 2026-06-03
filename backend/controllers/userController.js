const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* ========================
   GET USER PROFILE
======================== */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ========================
   UPDATE PROFILE (Name & optional avatar)
======================== */
exports.updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (avatar) user.avatar = avatar; // store URL or base64

    await user.save();

    const { password, ...rest } = user._doc;
    res.json(rest);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

/* ========================
   CHANGE PASSWORD
======================== */
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Old password incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Password update failed" });
  }
};

/* ========================
   LOGOUT (optional)
======================== */
exports.logout = async (req, res) => {
  res.json({ message: "Logged out successfully" });
};