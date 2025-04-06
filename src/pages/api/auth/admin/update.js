import { connectDB } from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
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
}).fields([{ name: "profilepic", maxCount: 1 }, { name: "logo", maxCount: 1 }]);

// Disable Next.js bodyParser for handling file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Admin update API route handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Use multer to handle file uploads before processing request
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: `File upload error: ${err.message}` });
    }

    try {
      // Extract form data
      const { email, name, mobileno,logo,profilepic,city,state,aboutCompany,industryType,website } = req.body;

      // Validate required fields
      if (!email) {
        return res.status(400).json({ message: "Email  ID are required." });
      }

      // Connect to database
      const { db } = await connectDB();

      // Find the admin to update
      const admin = await db.collection("recruiters").findOne({ email });

      if (!admin) {
        return res.status(404).json({ message: "Admin not found." });
      }

      // Prepare update data
      const updateData = {
        name,
        mobileno,
        logo,
        profilepic,
        city,
        state,
        aboutCompany,
        industryType,
        website,

    
        
      };

      // Hash password if provided
    

      // Handle profile picture update
      if (req.files.profilepic) {
        updateData.profilepic = `/uploads/${req.files.profilepic[0].filename}`;
      }

      // Handle resume update
      if (req.files.resume) {
        updateData.resume = `/uploads/${req.files.resume[0].filename}`;
      }

      // Update admin in the database
      const result = await db.collection("recruiters").updateOne(
        { email },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Admin update failed." });
      }

      // Generate JWT token for the updated admin
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret key is missing." });
      }

      const token = jwt.sign({ id: admin._id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // Respond with success message and updated admin data
      return res.status(200).json({
        message: "Admin updated successfully.",
        token,
        admin: { ...admin, ...updateData },
        redirectUrl: "/admin-dashboard",
      });
    } catch (error) {
      console.error("Admin update error:", error);
      return res.status(500).json({ message: "Internal Server Error." });
    }
  });
}
