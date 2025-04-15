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
  fileFilter: (req, file, cb) => {
    // Validate file types if needed
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).fields([
  { name: "logo", maxCount: 1 },
  { name: "profilepic", maxCount: 1 }
]);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ message: `File upload error: ${err.message}` });
    }

    try {
      // Extract form data
      const { email, name, mobileno, city, state, aboutCompany, industryType, website } = req.body;

      // Validate required fields
      if (!email) {
        return res.status(400).json({ message: "Email is required." });
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
        city,
        state,
        aboutCompany,
        industryType,
        website,
        updatedAt: new Date()
      };

      // Handle file uploads
      if (req.files?.logo) {
        // Delete old logo if exists
        if (admin.logo) {
          try {
            fs.unlinkSync(`./public${admin.logo}`);
          } catch (err) {
            console.error("Error deleting old logo:", err);
          }
        }
        updateData.logo = `/uploads/${req.files.logo[0].filename}`;
      }

      if (req.files?.profilepic) {
        // Delete old profile pic if exists
        if (admin.profilepic) {
          try {
            fs.unlinkSync(`./public${admin.profilepic}`);
          } catch (err) {
            console.error("Error deleting old profile picture:", err);
          }
        }
        updateData.profilepic = `/uploads/${req.files.profilepic[0].filename}`;
      }

      // Update admin in the database
      const result = await db.collection("recruiters").updateOne(
        { email },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Admin update failed." });
      }

      // Generate JWT token
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret key is missing." });
      }

      const token = jwt.sign(
        { id: admin._id, email, role: "admin" }, 
        process.env.JWT_SECRET, 
        { expiresIn: "1h" }
      );

      // Get updated admin data
      const updatedAdmin = await db.collection("recruiters").findOne({ email });

      // Respond with success
      return res.status(200).json({
        message: "Admin updated successfully",
        token,
        admin: {
          ...updatedAdmin,
          password: undefined // Never send password back
        },
        redirectUrl: "/admin-dashboard"
      });

    } catch (error) {
      console.error("Admin update error:", error);
      
      // Clean up uploaded files if error occurred
      if (req.files?.logo) {
        fs.unlinkSync(`./public/uploads/${req.files.logo[0].filename}`);
      }
      if (req.files?.profilepic) {
        fs.unlinkSync(`./public/uploads/${req.files.profilepic[0].filename}`);
      }
      
      return res.status(500).json({ 
        message: error.message || "Internal Server Error" 
      });
    }
  });
}