import { connectDB } from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

// ...existing multer configuration and export config...

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: `File upload error: ${err.message}` });
    }

    try {
      // Get all form data
      const {
        name,
        email,
        mobileno,
        batch,
        rollno,
        department,
        cgpa,
        gender,
        linkedin,
        github,
        leetcode,
        password,
        skills,
        project,
        workExperience,
        leadership,
        otp // Add OTP field
      } = req.body;

      // Validate required fields
      if (!name || !email || !mobileno || !batch || !rollno || !department || !cgpa || !gender || !password || !otp) {
        return res.status(400).json({ message: "All required fields must be provided." });
      }

      const { db } = await connectDB();

      // Verify OTP
      const storedOtp = await db.collection("signup_otps").findOne({
        email,
        expiresAt: { $gt: new Date() }
      });

      if (!storedOtp) {
        return res.status(400).json({ message: "OTP has expired. Please request a new one." });
      }

      if (storedOtp.otp.toString() !== otp.toString()) {
        return res.status(400).json({ message: "Invalid OTP." });
      }

      // Delete used OTP
      await db.collection("signup_otps").deleteOne({ email });

      // Check if user exists
      const existingUser = await db.collection("users").findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
      }

      // Validate email domain
      if (!email.endsWith('@iiitr.ac.in')) {
        return res.status(400).json({ message: "Please use your IIIT email address." });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Prepare user data
      const userData = {
        name,
        email,
        mobileno,
        batch,
        rollno,
        department,
        cgpa: parseFloat(cgpa),
        gender,
        linkedin: linkedin || "",
        github: github || "",
        leetcode: leetcode || "",
        password: hashedPassword,
        skills: skills ? JSON.parse(skills) : [],
        project: project ? JSON.parse(project) : [],
        workExperience: workExperience ? JSON.parse(workExperience) : [],
        leadership: leadership ? JSON.parse(leadership) : [],
        profilepic: req.files?.profilepic ? `/uploads/${req.files.profilepic[0].filename}` : null,
        resume: req.files?.resume ? `/uploads/${req.files.resume[0].filename}` : null,
        emailVerified: true, // Add this field since email is verified through OTP
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Insert user
      const result = await db.collection("users").insertOne(userData);

      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret key is missing." });
      }

      // Generate token
      const token = jwt.sign(
        { 
          id: result.insertedId, 
          email,
          emailVerified: true 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d" } // Increased token expiry to 7 days
      );

      return res.status(201).json({
        message: "User registered successfully.",
        token,
        user: {
          ...userData,
          _id: result.insertedId,
          password: undefined // Remove password from response
        }
      });

    } catch (error) {
      console.error("Signup error:", error);
      return res.status(500).json({ 
        message: "Internal Server Error.",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });
}