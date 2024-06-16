const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // if you need CORS support

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS if needed

// Endpoint to handle POST requests from the frontend form
app.post('/send-email', (req, res) => {
  const { firstname, email, services, message } = req.body;

  // Validation - ensure all required fields are filled
  if (!firstname || !email || !services || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Create transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pythonsanywhere@gmail.com',
        pass: 'adpn akqb rzkm lpsu',

    }
  });

  // Setup email data
  let mailOptions = {
    from: 'pythonsanywhere@gmail.com',
    to: `senuarchana1469@gmail.com, ${email}`, // Receiver's email address
    subject: 'Thanks for Choosing JBB Softech',
    text: `Name: ${firstname}\nEmail: ${email}\nServices: ${services}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send email. Please try again later.' });
    }
    console.log('Email sent: %s', info.messageId);
    res.status(200).json({ message: 'Email sent successfully!' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
