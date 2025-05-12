const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');

router.post('/send-email', async (req, res) => {
  try {
    const { to, subject, content } = req.body;
    const result = await emailService.sendEmail(to, subject, content);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/send-interaction-notification', async (req, res) => {
  try {
    const { customerEmail, interactionDetails } = req.body;
    const result = await emailService.sendInteractionNotification(customerEmail, interactionDetails);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;