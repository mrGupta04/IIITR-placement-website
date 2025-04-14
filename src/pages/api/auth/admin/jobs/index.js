import { connectDB } from "../../../../../lib/mongodb";

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
    const { db } = await connectDB();

    if (req.method === "GET") {

      const { email } = req.query;

      if (!email) {
        return res.status(400).json({ message: "Missing email parameter" });
      }

      console.log("Fetching jobs for email:", email);

      const jobs = await db.collection("Job").find({ email: email }).toArray();

      if (!jobs || jobs.length === 0) {
        return res.status(404).json({ message: "No jobs found for this admin" });
      }

      return res.status(200).json({ jobs });
    }

    else if (req.method === "POST") {

      const body = await parseJsonBody(req);
      const { jobType, title, email,name, location, salary, description, duration, status, skills, eligibleBatch, eligibleBranch } = body;

      if (!jobType || !title || !email || !name||!location || !salary || !description) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      const JobData = {
        jobType,
        title,
        email,
        name,
        location,
        salary,
        description,
        duration,
        skills,
        eligibleBatch,
        eligibleBranch,
        status,
        createdAt: new Date(),
      };

      const result = await db.collection("Job").insertOne(JobData);
      return res.status(201).json({ message: "Job added successfully.", jobId: result.insertedId });
    }

    else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in API:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
