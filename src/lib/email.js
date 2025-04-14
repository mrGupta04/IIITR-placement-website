import nodemailer from 'nodemailer';

// Create reusable transporter for IIIT email
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // your-email@iiit.ac.in
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false // May be needed for some institutional email servers
  }
});

// Helper function to send emails
const sendEmail = async (options) => {
  try {
    const info = await transporter.sendMail(options);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Password reset OTP email
export async function sendPasswordResetOtp(email, otp) {
  const mailOptions = {
    from: `"IIIT Raichur Placements" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset - IIIT Raichur Placement Portal',
    text: `Your OTP for password reset is: ${otp}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://www.iiitR.ac.in/logo.png" alt="IIIT Raichur Logo" style="max-width: 150px;">
        </div>
        <h2 style="color: #2c3e50; text-align: center;">Password Reset Request</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; text-align: center;">
          <p style="font-size: 16px; color: #2c3e50;">Your password reset code is:</p>
          <h1 style="color: #dc3545; font-size: 36px; letter-spacing: 5px; margin: 20px 0;">${otp}</h1>
          <p style="color: #6c757d; font-size: 14px;">This code will expire in 5 minutes.</p>
        </div>
        <p style="color: #6c757d; font-size: 12px; text-align: center; margin-top: 20px;">
          If you didn't request this password reset, please contact the placement cell immediately.
        </p>
        <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
          <p>IIIT Raichur Placement Cell</p>
          <p>Indian Institute of Information Technology Raichur</p>
        </div>
      </div>
    `
  };

  return sendEmail(mailOptions);
}

// Signup verification OTP email
export async function sendSignupOtp(email, otp) {
  const mailOptions = {
    from: `"IIIT Raichur Placements" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Email Verification - IIIT Raichur Placement Portal',
    text: `Your OTP for email verification is: ${otp}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://www.iiitR.ac.in/logo.png" alt="IIIT Raichur Logo" style="max-width: 150px;">
        </div>
        <h2 style="color: #2c3e50; text-align: center;">Welcome to IIIT Raichur Placement Portal</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; text-align: center;">
          <p style="font-size: 16px; color: #2c3e50;">Your verification code is:</p>
          <h1 style="color: #007bff; font-size: 36px; letter-spacing: 5px; margin: 20px 0;">${otp}</h1>
          <p style="color: #6c757d; font-size: 14px;">This code will expire in 5 minutes.</p>
        </div>
        <p style="color: #6c757d; font-size: 12px; text-align: center; margin-top: 20px;">
          This is an automated message, please do not reply to this email.
        </p>
        <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
          <p>IIIT Raichur Placement Cell</p>
          <p>Indian Institute of Information Technology Raichur</p>
        </div>
      </div>
    `
  };

  return sendEmail(mailOptions);
}

// Email validation utility specifically for IIIT domain
export function validateEmail(email) {
  const iiitEmailRegex = /^[^\s@]+@iiitr\.ac\.in$/;
  return iiitEmailRegex.test(email);
}