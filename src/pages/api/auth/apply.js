import { connectDB } from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { db } = await connectDB();
    const { job_id, user_id } = req.body; 

    console.log(job_id);
    console.log(user_id);

    if (!user_id || !job_id) {
      return res.status(400).json({ message: "Missing required fields: user_id and job_id are required." });
    }

    const appliedJobData = {
      user_id,
      job_id,
      createdAt: new Date(),
    };

    const result = await db.collection("Appliedstudent").insertOne(appliedJobData);

    return res.status(201).json({ 
      message: "Job added successfully.", 
      jobId: result.insertedId 
    });

  } catch (error) {
    console.error("Error in API:", error);
    return res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
}
