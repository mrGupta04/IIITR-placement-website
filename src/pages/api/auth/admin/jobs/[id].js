import { connectDB } from "../../../../../lib/mongodb";
import Job from "../../../../../models/jobs";
import mongoose from "mongoose";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

export default async function handler(req, res) {
  try {
    // ✅ Ensure MongoDB is connected before queries
    await connectDB(); 

    const { id } = req.query;

    // ✅ Validate MongoDB Object ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid or missing Job ID" });
    }

    if (req.method === "GET") {
      console.log("Fetching job details for ID:", id);

      const job = await Job.findById(id);

      if (!job) {
        return res.status(404).json({ success: false, message: "Job not found" });
      }

      return res.status(200).json({ success: true, job });
    }

    if (req.method === "PUT") {
      const body = await parseJsonBody(req);

      const updatedJob = await Job.findByIdAndUpdate(id, body, { new: true, runValidators: true });

      if (!updatedJob) {
        return res.status(404).json({ success: false, message: "Job not found or could not be updated" });
      }

      return res.status(200).json({ success: true, message: "Job updated successfully", job: updatedJob });
    }

    if (req.method === "DELETE") {
      console.log("Deleting job with ID:", id);

      const deletedJob = await Job.findByIdAndDelete(id);

      if (!deletedJob) {
        return res.status(404).json({ success: false, message: "Job not found or already deleted" });
      }

      return res.status(200).json({ success: true, message: "Job deleted successfully" });
    }

    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
}
