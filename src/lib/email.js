import nodemailer from 'nodemailer';

export async function sendOtpEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use your email service here (like Gmail, SendGrid, etc.)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP for resetting the password is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
}
