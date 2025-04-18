const Interaction = require("../models/Interaction");

exports.getAll = async (req, res) => {
  const list = await Interaction.find().populate("customerId");
  res.json(list);
};

exports.create = async (req, res) => {
  const newItem = new Interaction(req.body);
  await newItem.save();
  res.status(201).json(newItem);
};

exports.update = async (req, res) => {
  const updated = await Interaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

exports.delete = async (req, res) => {
  await Interaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Interaction deleted" });
};
