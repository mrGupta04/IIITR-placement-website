import clientPromise from "../../../../utils/db";
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
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'));
    }
  }
}).fields([
  { name: "profilepic", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);

export const config = {
  api: {
    bodyParser: false,
  },
};

// Utility function to connect to DB
async function connectDB() {
  const client = await clientPromise;
  return { db: client.db() };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  upload(req, res, async (err) => {
    if (err) {
      // Handle specific multer errors
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size too large. Maximum 5MB allowed.' });
      }
      return res.status(500).json({ message: `File upload error: ${err.message}` });
    }

    try {
      // Validate required files
      if (!req.files?.resume?.[0]) {
        return res.status(400).json({ message: "Resume is required." });
      }

      // Parse and validate form data
      const {
        name,
        email,
        mobileno,
        batch,
        rollno,
        department,
        cgpa,
        gender,
        password,
        linkedin,
        github,
        leetcode,
        skills,
        project,
        workExperience,
        leadership,
      } = req.body;

      // Validate required fields
      const requiredFields = {
        name, email, mobileno, batch, rollno, department, cgpa, gender, password
      };
      
      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        return res.status(400).json({ 
          message: "Missing required fields.",
          missingFields 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
      }

      // Validate mobile number
      if (!/^\d{10,15}$/.test(mobileno)) {
        return res.status(400).json({ message: "Invalid mobile number." });
      }

      // Validate CGPA
      const cgpaNum = parseFloat(cgpa);
      if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
        return res.status(400).json({ message: "CGPA must be between 0 and 10." });
      }

      // Connect to database
      const { db } = await connectDB();

      // Check for existing user
      const existingUser = await db.collection("users").findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists." });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Parse optional fields safely
      const parseJSONSafe = (str) => {
        try {
          return str ? JSON.parse(str) : [];
        } catch {
          return [];
        }
      };

      // Prepare user data
      const userData = {
        ...requiredFields,
        cgpa: cgpaNum,
        password: hashedPassword,
        linkedin: linkedin || "",
        github: github || "",
        leetcode: leetcode || "",
        skills: parseJSONSafe(skills),
        project: parseJSONSafe(project),
        workExperience: parseJSONSafe(workExperience),
        leadership: parseJSONSafe(leadership),
        profilepic: req.files.profilepic?.[0] 
          ? `/uploads/${req.files.profilepic[0].filename}` 
          : null,
        resume: req.files.resume?.[0] 
          ? `/uploads/${req.files.resume[0].filename}` 
          : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Insert user
      const result = await db.collection("users").insertOne(userData);

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT secret key is missing.");
      }

      // Generate token
      const token = jwt.sign(
        { id: result.insertedId, email }, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d" } // Longer expiration for better UX
      );

      // Omit sensitive data from response
      const { password: _, ...userWithoutPassword } = userData;

      return res.status(201).json({
        message: "User registered successfully.",
        token,
        user: userWithoutPassword,
      });

    } catch (error) {
      console.error("Signup error:", error);
      
      // Clean up uploaded files if error occurred
      if (req.files) {
        Object.values(req.files).forEach((files) => {
          files.forEach((file) => {
            try {
              fs.unlinkSync(path.join("./public/uploads", file.filename));
            } catch (err) {
              console.error("Error cleaning up file:", err);
            }
          });
        });
      }

      return res.status(500).json({ 
        message: "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  });
}