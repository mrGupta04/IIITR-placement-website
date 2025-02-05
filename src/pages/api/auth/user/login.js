import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/mongodb"; // Correct import for database connection

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Ensure the DB connection is successful
    const { db } = await connectDB();
    if (!db) {
      console.error("Database connection failed.");
      return res.status(500).json({ message: "Failed to connect to the database." });
    }

    // Find the user by email
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Check if JWT_SECRET is set in environment variables
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return res.status(500).json({ message: "Internal server configuration error." });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email }, // Convert ObjectId to string
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration time (1 hour)
    );

    // Extract relevant user data for the response
    const {
      _id,
      name,
      profilepic,
      mobileno,
      batch,
      department,
      resume,
      cgpa,
      gender,
      skills = [],
      project = [],
      workExperience = [],
      leadership = [],
      linkedin,
      github,
      leetcode
    } = user;

    // Log user data before returning the response
    console.log("User logged in:", { id: _id.toString(), email: user.email });

    // Send the token and user data
    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: _id.toString(),
        name,
        profilepic,
        mobileno,
        email,
        batch,
        department,
        resume,
        cgpa,
        gender,
        skills,
        project,
        workExperience,
        leadership,
        linkedin,
        github,
        leetcode,
      },
    });
  } catch (error) {
    console.error("Error in login handler:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
}
