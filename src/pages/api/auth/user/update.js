import { connectDB } from "../../../../lib/mongodb";
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
}).fields([{ name: "profilepic", maxCount: 1 }, { name: "resume", maxCount: 1 }]);

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
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: `File upload error: ${err.message}` });
    }

    try {
      // Manually parse form data after file upload
      const { email, name, mobileno, batch, rollno, department, cgpa, password } = req.body;

      // Validate required fields
      if (!email) {
        return res.status(400).json({ message: "Email is required." });
      }

      // Connect to database
      const { db } = await connectDB();

      // Find the user to update
      const user = await db.collection("users").findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Prepare updated data
      const updateData = {
        name,
        mobileno,
        batch,
        rollno,
        department,
        cgpa: parseFloat(cgpa),
      };

      // If a new password is provided, hash it
      if (password) {
        updateData.password = await bcrypt.hash(password, 12);
      }

      // If a new profilepic is provided, update the user's profile picture
      if (req.files.profilepic) {
        const profilePicPath = `/uploads/${req.files.profilepic[0].filename}`;
        updateData.profilepic = profilePicPath;
      }

      // If a new resume is provided, update the user's resume
      if (req.files.resume) {
        const resumePath = `/uploads/${req.files.resume[0].filename}`;
        updateData.resume = resumePath;
      }

      // Update user in the database
      const result = await db.collection("users").updateOne(
        { email },
        { $set: updateData }
      );

      // If no document was updated, return an error
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "User update failed." });
      }

      // Generate JWT token for the updated user
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret key is missing." });
      }

      const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // Respond with success message and updated user data
      return res.status(200).json({
        message: "User updated successfully.",
        token,
        user: { ...user, ...updateData },
        redirectUrl: "/dashboard",  // Add the redirect URL here
      });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  });
}
