const mongoose = require("mongoose");

const InteractionSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  date: { type: Date, default: Date.now },
  type: {
    type: String,
    enum: ["email", "call", "meeting", "message"],
    required: true,
  },
  content: String,
  followUpDate: Date,
});

module.exports = mongoose.model("Interaction", InteractionSchema);
