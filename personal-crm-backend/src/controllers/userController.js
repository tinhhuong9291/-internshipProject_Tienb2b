const User = require("../models/User");

exports.getAll = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.create = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
};

exports.update = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

exports.delete = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
