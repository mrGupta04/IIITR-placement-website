import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Respond with protected content and decoded user data
    res.status(200).json({ 
      message: "Protected content accessed.", 
      user: decoded 
    });
  } catch (error) {
    console.error("Token verification error:", error);

    // Differentiate between expired and invalid tokens for better debugging
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired. Please log in again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token. Please provide a valid token." });
    }

    // Handle any other unexpected errors
    return res.status(500).json({ message: "Internal Server Error." });
  }
}
