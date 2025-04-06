import { connectDB } from '../../../../lib/mongodb';
import { sendOtpEmail } from '../../../../lib/email';  // You can use a library like Nodemailer

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const { db } = await connectDB();

      // Generate OTP (6 digits)
      const otp = Math.floor(100000 + Math.random() * 900000);

      // Find user by email
      const user = await db.collection('users').findOne({ email });

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      // Save OTP and timestamp in the database
      const otpTimestamp = Date.now(); // current time in milliseconds
      await db.collection('users').updateOne(
        { email },
        { $set: { otp, otpTimestamp } }
      );

      // Optionally, send OTP via email (you can implement a function using Nodemailer or any other email service)
      await sendOtpEmail(email, otp);

      return res.status(200).json({ success: true, message: 'OTP sent successfully!' });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Error occurred. Please try again.' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
