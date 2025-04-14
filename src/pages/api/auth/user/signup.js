import clientPromise from "../../../../../../utils/db";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer to handle file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = "./public/uploads";
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
}).fields([
  { name: "profilepic", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

// Disable Next.js bodyParser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// API route handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Wrap multer in a promise to ensure it completes before processing the request
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: `File upload error: ${err.message}` });
    }

    try {
      // Manually parse form data after file upload
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
      } = req.body;

      // Validate required fields
      if (!name || !email || !mobileno || !batch || !rollno || !department || !cgpa || !gender || !password) {
        return res.status(400).json({ message: "All required fields must be provided." });
      }

      // Connect to the database
      const { db } = await connectDB();

      // Check if user already exists
      const existingUser = await db.collection("users").findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
      }

      // Hash the password
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
        profilepic: req.files.profilepic ? `/uploads/${req.files.profilepic[0].filename}` : null,
        resume: req.files.resume ? `/uploads/${req.files.resume[0].filename}` : null,
        createdAt: new Date(),
      };

      // Insert the user into the database
      const result = await db.collection("users").insertOne(userData);

      // Check for missing JWT_SECRET
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret key is missing." });
      }

      // Generate JWT token
      const token = jwt.sign({ id: result.insertedId, email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // Respond with success message and user data
      return res.status(201).json({
        message: "User registered successfully.",
        token,
        user: userData,
      });
    } catch (error) {
      console.error("Signup error:", error);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  });
}
