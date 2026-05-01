const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  cart: []
});

module.exports = mongoose.model("User", userSchema);