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
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
  }),
}).fields([
  { name: "logo", maxCount: 1 },
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

  // Handle file upload and form data
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: `File upload error: ${err.message}` });
    }

    try {
      const { db } = await connectDB();
      console.log("Connected to database:", db.databaseName);

      // Extract form data from req.body and req.files
      const { email, password, ...rest } = req.body;
  
      const logo = req.files && req.files["logo"] ? `/uploads/${req.files["logo"][0].filename}` : null;

      // Check if recruiter already exists
      const existingRecruiter = await db.collection("recruiters").findOne({ email });
      if (existingRecruiter) {
        // Clean up uploaded file if recruiter exists
        if (logo) {
          fs.unlinkSync(`./public${logo}`);
        }
        return res.status(400).json({ message: "Recruiter already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Prepare recruiter data
      const recruiterData = {
        ...rest,
        email,
        password: hashedPassword,
        logo,
        createdAt: new Date(),
      };

      const result = await db.collection("recruiters").insertOne(recruiterData);

      const token = jwt.sign({ id: result.insertedId, email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Return success response
      res.status(201).json({
        message: "Signup successful.",
        token,
        recruiter: { 
          ...recruiterData, 
          _id: result.insertedId,
          password: undefined // Exclude password from response
        },
      });
    } catch (error) {
      console.error("Error in handler:", error);
      // Clean up uploaded file if error occurs
      if (req.files && req.files["logo"]) {
        fs.unlinkSync(`./public/uploads/${req.files["logo"][0].filename}`);
      }
      res.status(500).json({ message: "Internal Server Error." });
    }
  });
}