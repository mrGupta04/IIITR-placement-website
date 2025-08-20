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
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
}).single("logo"); // Using single instead of fields since you only have one file

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  upload(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ 
        message: err.message || 'File upload failed',
        ...(err.code === 'LIMIT_FILE_SIZE' && { maxSize: '5MB' })
      });
    }

    try {
      const { db } = await connectDB();
      
      // Parse form data from req.body (text fields)
      const { name, email, mobileno, city, state, aboutCompany, industryType, website, password } = req.body;

      // Validate required fields
      if (!email || !password || !name) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Check if recruiter exists
      const existingRecruiter = await db.collection("recruiters").findOne({ email });
      if (existingRecruiter) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(409).json({ message: "Recruiter already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Prepare recruiter data
      const recruiterData = {
        name,
        email,
        mobileno,
        city,
        state,
        aboutCompany,
        industryType,
        website,
        password: hashedPassword,
        logo: req.file ? `/uploads/${req.file.filename}` : null,
        createdAt: new Date(),
      };

      // Insert into database
      const result = await db.collection("recruiters").insertOne(recruiterData);

      // Generate JWT token
      const token = jwt.sign(
        { id: result.insertedId, email, role: 'recruiter' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Return response
      res.status(201).json({
        message: "Signup successful",
        token,
        recruiter: {
          ...recruiterData,
          _id: result.insertedId,
          password: undefined // Remove password from response
        }
      });

    } catch (error) {
      console.error('Server error:', error);
      // Clean up uploaded file if error occurs
      if (req.file) fs.unlinkSync(req.file.path);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
}