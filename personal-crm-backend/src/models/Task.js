const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  title: { type: String, required: true },
  dueDate: Date,
  completed: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
});

module.exports = mongoose.model("Task", TaskSchema);
