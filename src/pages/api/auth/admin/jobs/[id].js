import { connectDB } from "../../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Function to parse JSON body manually
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
    const { db } = await connectDB();
    const { id } = req.query;

    // Validate MongoDB ObjectId
    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid or missing Job ID" });
    }

    switch (req.method) {
      case "GET":
        console.log("Fetching job details for ID:", id);
        const job = await db.collection("Job").findOne({ _id: new ObjectId(id) });
        console.log(job);
        if (!job) {
          return res.status(404).json({ success: false, message: "Job not found" });
        }
        return res.status(200).json({ success: true, job });

      case "PUT":
        const body = await parseJsonBody(req);
        const updatedJob = await db.collection("Job").findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: body },
          { returnDocument: "after", upsert: false }
        );

        if (!updatedJob) {
          return res.status(404).json({ success: false, message: "Job not found or could not be updated" });
        }

        return res.status(200).json({ success: true, message: "Job updated successfully", job: updatedJob });


      case "DELETE":
        console.log("Deleting job with ID:", id);
        const deletedJob = await db.collection("Job").deleteOne({ _id: new ObjectId(id) });
        if (deletedJob.deletedCount === 0) {
          return res.status(404).json({ success: false, message: "Job not found or already deleted" });
        }
        return res.status(200).json({ success: true, message: "Job deleted successfully" });

      default:
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
}
