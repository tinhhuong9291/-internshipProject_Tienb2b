const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const { body, validationResult } = require("express-validator");

// GET all customers
router.get("/", customerController.getAllCustomers);

// POST create customer
router.post(
  "/",
  [
    body("name")
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("Tên chỉ được chứa chữ")
      .isLength({ min: 3, max: 50 })
      .withMessage("Tên phải có 3-50 ký tự"),
    body("email").isEmail().withMessage("Email không hợp lệ"),
    body("phone")
      .matches(/^[0-9]+$/)
      .withMessage("Số điện thoại chỉ được chứa số")
      .isLength({ min: 10, max: 11 })
      .withMessage("Số điện thoại phải có 10-11 số"),
    body("address")
      .isLength({ min: 3, max: 50 })
      .withMessage("Diachi phai co 3-50 ky tu"),
    body("tags"),

    body("type")
      .isIn(["freelance", "partner", "friend", "other"])
      .withMessage("Type phai la freelance, partner, friend hoac other"),
    body("notes")
      .isLength({ min: 3, max: 50 })
      .withMessage("Notes phai co 3-50 ky tu"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  customerController.createCustomer
);

// GET customer by id
router.get("/:id", customerController.getCustomerById);

// PUT update customer
router.put(
  "/:id",
  [
    body("name")
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("Tên chỉ được chứa chữ")
      .isLength({ min: 3, max: 50 })
      .withMessage("Tên phải có 3-50 ký tự"),
    body("email").isEmail().withMessage("Email không hợp lệ"),
    body("phone")
      .matches(/^[0-9]+$/)
      .withMessage("Số điện thoại chỉ được chứa số")
      .isLength({ min: 10, max: 11 })
      .withMessage("Số điện thoại phải có 10-11 số"),
    body("address")
      .isLength({ min: 3, max: 50 })
      .withMessage("Diachi phai co 3-50 ky tu"),
    body("tags"),
    body("type")
      .isIn(["freelance", "partner", "friend", "other"])
      .withMessage("Type phai la freelance, partner, friend hoac other"),
    body("notes")
      .isLength({ min: 3, max: 50 })
      .withMessage("Notes phai co 3-50 ky tu"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  customerController.updateCustomer
);

// DELETE
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
