import bcrypt from "bcryptjs"; // Use bcryptjs for better compatibility
import clientPromise from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, resetToken, newPassword } = req.body;

    // Validate input
    if (!email || !resetToken || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const client = await clientPromise;
    const db = client.db("modern_site");

    // Find the user by email
    const user = await db.collection("users").findOne({ email });

    if (!user || user.resetToken !== resetToken) {
      return res.status(400).json({ message: "Invalid reset token or email." });
    }

    // Check if the reset token is expired (optional, if implemented)
    if (user.resetTokenExpire && user.resetTokenExpire < new Date()) {
      return res.status(400).json({ message: "Reset token has expired." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpire: null,
        },
      }
    );

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}
