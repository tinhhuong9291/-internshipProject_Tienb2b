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
); // Add timestamps to the schema

module.exports = mongoose.model("Customer", CustomerSchema);
