import { connectDB } from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const { db } = await connectDB();

    if (req.method === "GET") {
      // Fetch userjobs where status is "active"
      const userjobs = await db.collection("Job").find({ status: "active" }).toArray();

      if (!userjobs || userjobs.length === 0) {
        return res.status(404).json({ message: "No active userjobs found" });
      }

      return res.status(200).json({ userjobs });
      
    } 
    
    return res.status(405).json({ message: "Method Not Allowed" });

  } catch (error) {
    console.error("Error in API:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
