import { connectDB } from "../../../../../lib/mongodb";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseJsonBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        console.error("JSON parse error:", error);
        resolve({});
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
        return res.status(400).json({ 
          success: false,
          message: "Email parameter is required" 
        });
      }

      const jobs = await db.collection("Job")
                         .find({ email: email })
                         .toArray();

      // Ensure we always return an array, even if empty
      const safeJobs = (jobs || []).map(job => ({
        _id: job._id?.toString() || "",
        title: job.title || "Untitled Job",
        status: job.status || "draft",
        jobType: job.jobType || "Full-time",
        location: job.location || "Remote",
        salary: job.salary || "Not specified",
        description: job.description || "No description",
        duration: job.duration || "Not specified",
        skills: Array.isArray(job.skills) ? job.skills : [],
        eligibleBatch: Array.isArray(job.eligibleBatch) ? job.eligibleBatch : [],
        eligibleBranch: Array.isArray(job.eligibleBranch) ? job.eligibleBranch : [],
        email: job.email || email,
        name: job.name || "Unknown",
        logo: job.logo || "",
        createdAt: job.createdAt?.toISOString() || new Date().toISOString()
      }));

      return res.status(200).json({ 
        success: true,
        jobs: safeJobs 
      });
    }
    else if (req.method === "POST") {
      const body = await parseJsonBody(req);

      const requiredFields = ['jobType', 'title', 'email', 'name', 'location', 'salary', 'description'];
      const missingFields = requiredFields.filter(field => !body[field]);
      
      if (missingFields.length > 0) {
        return res.status(400).json({ 
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}` 
        });
      }

      const jobData = {
        jobType: body.jobType,
        title: body.title,
        email: body.email,
        name: body.name,
        logo: body.logo || "",
        location: body.location,
        salary: body.salary,
        description: body.description,
        duration: body.duration || "Not specified",
        status: body.status || "draft",
        skills: Array.isArray(body.skills) ? body.skills : [],
        eligibleBatch: Array.isArray(body.eligibleBatch) ? body.eligibleBatch : [],
        eligibleBranch: Array.isArray(body.eligibleBranch) ? body.eligibleBranch : [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await db.collection("Job").insertOne(jobData);
      
      return res.status(201).json({ 
        success: true,
        message: "Job created successfully",
        jobId: result.insertedId.toString(),
        job: {
          ...jobData,
          _id: result.insertedId.toString()
        }
      });
    }
    else {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ 
        success: false,
        message: `Method ${req.method} not allowed` 
      });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}