const { connectDB } = require("../../../../../lib/mongodb");
const { ObjectId } = require("mongodb");

exports.config = {
  api: {
    bodyParser: false,
  },
};

async function parseJsonBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        resolve({});
      }
    });
  });
}

exports.default = async function handler(req, res) {
  try {
    const { db } = await connectDB();
    const { id } = req.query;

    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid or missing Job ID" 
      });
    }

    const jobId = new ObjectId(id);

    switch (req.method) {
      case 'GET':
        const job = await db.collection("Job").findOne({ _id: jobId });
        
        if (!job) {
          return res.status(404).json({ 
            success: false, 
            message: "Job not found" 
          });
        }

        const responseData = {
          _id: job._id?.toString() || "",
          title: job.title || "No Title Available",
          status: job.status || "draft",
          jobType: job.jobType || "Not Specified",
          location: job.location || "Location Not Specified",
          salary: job.salary || "Not Disclosed",
          duration: job.duration || "Not Specified",
          description: job.description || "No description provided",
          skills: Array.isArray(job.skills) ? job.skills : [],
          eligibleBatch: Array.isArray(job.eligibleBatch) ? job.eligibleBatch : [],
          eligibleBranch: Array.isArray(job.eligibleBranch) ? job.eligibleBranch : [],
          email: job.email || null,
          createdAt: job.createdAt?.toISOString() || new Date().toISOString(),
          updatedAt: job.updatedAt?.toISOString() || new Date().toISOString()
        };

        return res.status(200).json({ 
          success: true, 
          job: responseData 
        });

      case 'PUT':
        const updateData = await parseJsonBody(req);
        
        if (typeof updateData !== 'object' || updateData === null) {
          return res.status(400).json({ 
            success: false, 
            message: "Invalid request body" 
          });
        }

        // Add updatedAt field
        updateData.updatedAt = new Date();

        const updateResult = await db.collection("Job").findOneAndUpdate(
          { _id: jobId },
          { $set: updateData },
          { 
            returnDocument: 'after',
            projection: {
              title: 1,
              status: 1,
              jobType: 1,
              location: 1,
              salary: 1,
              duration: 1,
              description: 1,
              skills: 1,
              eligibleBatch: 1,
              eligibleBranch: 1,
              email: 1,
              createdAt: 1,
              updatedAt: 1
            }
          }
        );

        if (!updateResult.value) {
          return res.status(404).json({ 
            success: false, 
            message: "Job not found" 
          });
        }

        // Ensure all fields have values
        const updatedJob = {
          ...updateResult.value,
          _id: updateResult.value._id?.toString() || "",
          title: updateResult.value.title || "No Title Available",
          status: updateResult.value.status || "draft",
          jobType: updateResult.value.jobType || "Not Specified",
          location: updateResult.value.location || "Location Not Specified",
          salary: updateResult.value.salary || "Not Disclosed",
          duration: updateResult.value.duration || "Not Specified",
          description: updateResult.value.description || "No description provided",
          skills: Array.isArray(updateResult.value.skills) ? updateResult.value.skills : [],
          eligibleBatch: Array.isArray(updateResult.value.eligibleBatch) ? updateResult.value.eligibleBatch : [],
          eligibleBranch: Array.isArray(updateResult.value.eligibleBranch) ? updateResult.value.eligibleBranch : [],
          email: updateResult.value.email || null
        };

        return res.status(200).json({ 
          success: true, 
          message: "Job updated successfully",
          job: updatedJob 
        });

      case 'DELETE':
        const deleteResult = await db.collection("Job").deleteOne({ _id: jobId });
        
        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ 
            success: false, 
            message: "Job not found" 
          });
        }

        return res.status(200).json({ 
          success: true, 
          message: "Job deleted successfully" 
        });

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ 
          success: false, 
          message: `Method ${req.method} not allowed` 
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
};