const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const { body, validationResult } = require('express-validator');

// validate name only contain letter
router.post('/customers',
    body('name').matches(/^[A-Za-z\s]+$/).withMessage('Tên chỉ được chứa chữ'),
    body('email').isEmail().withMessage('Email không hợp lệ'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      res.status(201).json({ message: 'Khách hàng được tạo!' });
    }
  );
// validate name can not contain special character
router.post('/customers',
    body('name').matches(/^[A-Za-z\s]+$/).withMessage('Tên chỉ được chứa chữ'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(201).json({ message: 'Khách hàng được tạo!' });
    }
  );
// validate name length
router.post('/customers',
    body('name').isLength({ min: 3, max: 50 }).withMessage('Tên phải có 3-50 ký tự'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(201).json({ message: 'Khách hàng được tạo!' });
    }
  );


// validate email
router.post('/customers',
    body('email').isEmail().withMessage('Email không hợp lệ'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(201).json({ message: 'Khách hàng được tạo!' });
    }
  );

// validate phone number only contain number
router.post('/customers',
    body('phone').matches(/^[0-9]+$/).withMessage('Số điện thoại chỉ được chứa số'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(201).json({ message: 'Khách hàng được tạo!' });
    }
  );
// validate phone number length
router.post('/customers',
    body('phone').isLength({ min: 10, max: 11 }).withMessage('Số điện thoại phải có 10-11 số'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(201).json({ message: 'Khách hàng được tạo!' });
    }
  );


// validate email
router.post('/customers',
    body('email').isEmail().withMessage('Email không hợp lệ'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(201).json({ message: 'Khách hàng được tạo!' });
    }
  );



router.get("/", customerController.getAllCustomers);
router.get("/:id", customerController.getCustomerById);
// router.post("/", customerController.createCustomer);
// router.put("/:id", customerController.updateCustomer);
// validate update name can not contain special character
router.put("/:id",
    body('name').matches(/^[A-Za-z\s]+$/).withMessage('Tên chỉ được chứa chữ'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(201).json({ message: 'Khách hàng được cập nhật!' });
    }
  );

// validate update name can not contain special character
router.put("/:id",
    body('name').matches(/^[A-Za-z\s]+$/).withMessage('Tên chỉ được chứa chữ'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(201).json({ message: 'Khách hàng được cập nhật!' });
    }
  );

// validate update name length
router.put("/:id",
    body('name').isLength({ min: 3, max: 50 }).withMessage('Tên phải có 3-50 ký tự'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(201).json({ message: 'Khách hàng được cập nhật!' });
    }
  );



// validate update phone number length
router.put("/:id",
    body('phone').isLength({ min: 10, max: 11 }).withMessage('Số điện thoại phải có 10-11 số'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(201).json({ message: 'Khách hàng được cập nhật!' });
    }
  );


// validate update phone number only contain number
router.put("/:id",
    body('phone').matches(/^[0-9]+$/).withMessage('Số điện thoại chỉ được chứa số'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(201).json({ message: 'Khách hàng được cập nhật!' });
    }
  );

// validate update email
router.put("/:id",
    body('email').isEmail().withMessage('Email không hợp lệ'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.status(201).json({ message: 'Khách hàng được cập nhật!' });
    }
  );

router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
