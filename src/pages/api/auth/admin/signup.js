import { connectDB } from "../../../../lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

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
  { name: "logo", maxCount: 1 },
]);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: `File upload error: ${err.message}` });

    try {
      const { db } = await connectDB();
      const { email, password, reenterpassword, ...rest } = req.body;

      if (password !== reenterpassword) return res.status(400).json({ message: "Passwords do not match." });

      const existingRecruiter = await db.collection("recruiters").findOne({ email });
      if (existingRecruiter) return res.status(400).json({ message: "Recruiter already exists." });

      const hashedPassword = await bcrypt.hash(password, 12);
      const recruiterData = { ...rest, email, password: hashedPassword };

      const result = await db.collection("recruiters").insertOne(recruiterData);
      const token = jwt.sign({ id: result.insertedId, email }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(201).json({ message: "Signup successful.", token, recruiter: recruiterData });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error." });
    }
  });
}
