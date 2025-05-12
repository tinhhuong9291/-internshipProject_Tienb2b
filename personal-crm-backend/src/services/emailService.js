const transporter = require('../config/emailConfig');

const emailService = {
  async sendEmail(to, subject, content) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: content
      };

      const info = await transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },

  async sendInteractionNotification(customerEmail, interactionDetails) {
    const subject = 'New Interaction Recorded';
    const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #5932ea;">New Interaction Details</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
          <p><strong>Type:</strong> ${interactionDetails.type}</p>
          <p><strong>Content:</strong> ${interactionDetails.content}</p>
          <p><strong>Date:</strong> ${new Date(interactionDetails.date).toLocaleDateString()}</p>
          <p><strong>Follow-up Date:</strong> ${interactionDetails.followUpDate ? new Date(interactionDetails.followUpDate).toLocaleDateString() : 'Not set'}</p>
        </div>
      </div>
    `;

    return this.sendEmail(customerEmail, subject, content);
  }
};

module.exports = emailService;