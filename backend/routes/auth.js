const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = new User({ username: req.body.username, password: hashed });
  await user.save();
  res.json({ message: "Registered" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.json({ message: "User not found" });

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;