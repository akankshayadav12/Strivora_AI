
// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const token = req.header("Authorization")?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded.id;   // ✅ IMPORTANT — only ID
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user._id; // <- req.user must be set
    next();
  } catch (err) {
    console.log("Auth Middleware Error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;