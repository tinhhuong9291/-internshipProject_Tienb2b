const Customer = require("../models/Customer");

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi server khi lấy danh sách khách hàng", error: err });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }
    res.status(200).json(customer);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi server khi lấy khách hàng", error: err });
  }
};

// Create new customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newCustomer = new Customer({ name, email, phone });
    await newCustomer.save();
    res
      .status(201)
      .json({ message: "Tạo khách hàng thành công", customer: newCustomer });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi tạo khách hàng", error: err });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }
    res.status(200).json({
      message: "Cập nhật khách hàng thành công",
      customer: updatedCustomer,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật khách hàng", error: err });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }
    res.status(200).json({ message: "Xoá khách hàng thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xoá khách hàng", error: err });
  }
};
