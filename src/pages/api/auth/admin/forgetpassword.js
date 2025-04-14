import nodemailer from "nodemailer";
import clientPromise from "../../../../../../utils/db";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const client = await clientPromise;
    const db = client.db("modern_site");

    const user = await db.collection("recruiters").findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Generate a secure reset token
    const resetToken = Math.random().toString(36).slice(-8);

    // Update the user with the reset token and set an expiration time
    await db.collection("recruiters").updateOne(
      { email },
      {
        $set: {
          resetToken,
          resetTokenExpire: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiration
        },
      }
    );

    // Configure the transporter for sending email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the reset token email
    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Your reset token is: ${resetToken}. This token is valid for 10 minutes.`,
      html: `<p>You requested a password reset.</p><p>Your reset token is: <strong>${resetToken}</strong></p><p>This token is valid for 10 minutes.</p>`,
    });

    res.status(200).json({ message: "Reset token sent to email." });
  } catch (error) {
    console.error("Error in password reset handler:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
