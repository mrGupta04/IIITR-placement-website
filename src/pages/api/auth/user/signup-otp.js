import { connectDB } from '../../../../lib/mongodb';
import { sendSignupOtp } from '../../../../lib/email';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const { db } = await connectDB();

    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store OTP in database with expiration
    await db.collection("signup_otps").updateOne(
      { email },
      { 
        $set: {
          otp,
          email,
          expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes expiration
        }
      },
      { upsert: true }
    );

    // Send OTP via email
    await sendSignupOtp(email, otp);

    return res.status(200).json({ 
      message: 'OTP sent successfully' 
    });

  } catch (error) {
    console.error('Signup OTP error:', error);
    return res.status(500).json({ 
      message: 'Failed to send OTP' 
    });
  }
}