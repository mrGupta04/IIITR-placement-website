import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Connect to the database
    const dbConnection = await connectDB();
    if (!dbConnection) {
      console.error("Database connection failed.");
      return res.status(500).json({ message: "Failed to connect to the database." });
    }

    const { db } = dbConnection;

    // Find the admin by email
    const admin = await db.collection("recruiters").findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Ensure JWT secret is set
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined.");
      return res.status(500).json({ message: "Internal server configuration error." });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: admin._id.toString(), email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Extract relevant admin data
    const {
      _id,
      name,
      mobileno,
      city,
      state,
      aboutCompany,
      industryType,
      website,
      logo,
    } = admin;

    // Send the token and admin data
    return res.status(200).json({
      message: "Login successful.",
      token,
      admin: {
        id: _id.toString(),
        name,
        mobileno,
        email,
        city,
        state,
        aboutCompany,
        industryType,
        website,
        logo,
      },
    });

  } catch (error) {
    console.error("Error in admin login handler:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
}
