import { connectDB } from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, otp, userData } = req.body; // Add userData to receive signup data

    if (!email || !otp || !userData) {
      return res.status(400).json({ 
        message: "Email, OTP and user data are required." 
      });
    }

    const { db } = await connectDB();

    // Verify OTP first
    const storedOtp = await db.collection("signup_otps").findOne({
      email,
      expiresAt: { $gt: new Date() }
    });

    if (!storedOtp) {
      return res.status(400).json({ 
        message: "OTP has expired. Please request a new one." 
      });
    }

    if (storedOtp.otp.toString() !== otp.toString()) {
      return res.status(400).json({ 
        message: "Invalid OTP." 
      });
    }

    // Delete verified OTP
    await db.collection("signup_otps").deleteOne({ email });

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    // Prepare user data for insertion
    const newUser = {
      ...userData,
      password: hashedPassword,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert new user
    const result = await db.collection("users").insertOne(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: result.insertedId.toString(),
        email,
        emailVerified: true 
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return success with token and user data
    return res.status(200).json({
      message: "User verified and registered successfully.",
      token,
      user: {
        ...newUser,
        _id: result.insertedId,
        password: undefined // Remove password from response
      }
    });

  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({ message: "Failed to verify OTP and register user." });
  }
}