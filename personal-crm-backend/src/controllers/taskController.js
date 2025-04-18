const Task = require("../models/Task");

exports.getAll = async (req, res) => {
  const tasks = await Task.find().populate("customerId");
  res.json(tasks);
};

exports.create = async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
};

exports.update = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

exports.delete = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
