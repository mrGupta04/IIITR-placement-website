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
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  },
  limits: { fileSize: 5 * 1024 * 1024 }
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
      const { email, name, mobileno, city, state, aboutCompany, industryType, website } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required." });
      }

      const { db } = await connectDB();

      const admin = await db.collection("recruiters").findOne({ email });

      if (!admin) {
        return res.status(404).json({ message: "Admin not found." });
      }

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

      if (req.files?.logo) {
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
        if (admin.profilepic) {
          try {
            fs.unlinkSync(`./public${admin.profilepic}`);
          } catch (err) {
            console.error("Error deleting old profile picture:", err);
          }
        }
        updateData.profilepic = `/uploads/${req.files.profilepic[0].filename}`;
      }

      const result = await db.collection("recruiters").updateOne(
        { email },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Admin update failed." });
      }

      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret key is missing." });
      }

      const token = jwt.sign(
        { id: admin._id, email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      const updatedAdmin = await db.collection("recruiters").findOne({ email });

      return res.status(200).json({
        message: "Admin updated successfully",
        token,
        admin: {
          ...updatedAdmin,
          password: undefined
        },
        redirectUrl: "/admin-dashboard"
      });

    } catch (error) {
      console.error("Admin update error:", error);

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