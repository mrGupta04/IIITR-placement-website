import { connectDB } from '../../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, otp, newPassword } = req.body;

    try {
      const { db } = await connectDB();

      // Find user by email
      const user = await db.collection('users').findOne({ email });

      if (!user) {
        console.log(`User not found for email: ${email}`);
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      console.log(`User found: ${user.email}`);
      console.log(`Provided OTP: ${otp}, Stored OTP: ${user.otp}`);

      // Ensure OTP matches (checking as string)
      if (user.otp.toString() !== otp.toString()) {
        console.log('Invalid OTP');
        return res.status(400).json({ success: false, message: 'Invalid OTP.' });
      }

      // Check if OTP has expired (5 minutes expiration)
      const otpExpirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
      const timeElapsed = Date.now() - user.otpTimestamp;
      console.log(`OTP timestamp: ${user.otpTimestamp}, Time elapsed: ${timeElapsed}ms`);

      if (timeElapsed > otpExpirationTime) {
        console.log('OTP has expired');
        return res.status(400).json({ success: false, message: 'OTP has expired.' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password and clear the OTP
      await db.collection('users').updateOne(
        { email },
        { $set: { password: hashedPassword, otp: null, otpTimestamp: null } }
      );

      return res.status(200).json({ success: true, message: 'Password reset successfully.' });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Error occurred. Please try again.' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
