import { connectDB } from "../../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, workExperience } = req.body;

    if (!email || !Array.isArray(workExperience)) {
      return res.status(400).json({ message: "Invalid input data." });
    }

    const dbConnection = await connectDB();
    if (!dbConnection || !dbConnection.db) {
      return res.status(500).json({ message: "Database connection failed." });
    }
    const db = dbConnection.db;

    // Check if the user exists
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the workExperience field
    const result = await db.collection("users").updateOne(
      { email },
      { $set: { workExperience } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: "No changes were made." });
    }

    return res.status(200).json({ message: "Projects updated successfully.", workExperience });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
}
