const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  products: Array,
  total: Number,
  status: { type: String, default: "paid" }
});

module.exports = mongoose.model("Order", orderSchema);