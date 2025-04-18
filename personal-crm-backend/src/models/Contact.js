// server/models/Contact.js
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      enum: ["Client", "Partner", "Friend", "Family", "Other"],
      default: "Other",
    },
    notes: {
      type: String,
      required: false,
    },
    interactions: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        type: {
          type: String,
          enum: ["Meeting", "Call", "Email", "Other"],
          required: true,
        },
        notes: String,
      },
    ],
    tags: [String],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
