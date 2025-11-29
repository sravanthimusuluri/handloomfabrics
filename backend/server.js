const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./userModel");

const app = express();
app.use(cors());
app.use(express.json());

// ⭐ Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/handloomhub")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// ⭐ Signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.json({ success: false, message: "Email already registered" });

  await User.create({ email, password });
  return res.json({ success: true, message: "Signup successful" });
});

// ⭐ Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) return res.json({ success: false, message: "Invalid credentials" });

  return res.json({ success: true, message: "Login successful", user });
});

app.listen(5000, () => console.log("Server running on port 5000"));
