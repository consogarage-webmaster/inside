import nodemailer from 'nodemailer';

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: 'web@consogarage.com', // Your Gmail address
    pass: 'your-app-password',   // App password (not your Gmail password)
  },
});

// Verify connection configuration
transporter.verify()
  .then(() => console.log('Server is ready to take our messages'))
  .catch(console.error);