const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/add", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.cart.push(req.body.product);
  await user.save();
  res.json(user.cart);
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.cart);
});

module.exports = router;