const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    phone: String,
    address: String,
    tags: [String],
    type: {
      type: String,
      enum: ["freelance", "partner", "friend", "other"],
      default: "other",
    },
    notes: String,
  },
  { timestamps: true }
); // tự động thêm createdAt và updatedAt

module.exports = mongoose.model("Customer", CustomerSchema);
