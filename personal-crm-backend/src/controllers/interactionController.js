const mongoose = require("mongoose");
const Interaction = require("../models/Interaction");

// Get all interactions
exports.getAll = async (req, res) => {
  try {
    const interactions = await Interaction.find();
    res.status(200).json(interactions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching interactions", error: err });
  }
};

// Get interactions by customer ID
exports.getByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const interactions = await Interaction.find({
      customerId: mongoose.Types.ObjectId(customerId),
    });
    res.status(200).json(interactions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching customer interactions", error: err });
  }
};

// Create new interaction
exports.create = async (req, res) => {
  try {
    const newInteraction = new Interaction(req.body);
    await newInteraction.save();
    res.status(201).json({
      message: "Interaction created successfully",
      interaction: newInteraction,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating interaction", error: err });
  }
};

// Update interaction
exports.update = async (req, res) => {
  try {
    const updatedInteraction = await Interaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInteraction) {
      return res.status(404).json({ message: "Interaction not found" });
    }
    res.status(200).json({
      message: "Interaction updated successfully",
      interaction: updatedInteraction,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating interaction", error: err });
  }
};

// Delete interaction
exports.delete = async (req, res) => {
  try {
    const deletedInteraction = await Interaction.findByIdAndDelete(
      req.params.id
    );
    if (!deletedInteraction) {
      return res.status(404).json({ message: "Interaction not found" });
    }
    res.status(200).json({ message: "Interaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting interaction", error: err });
  }
};
